import express from 'express';
import mysql2 from 'mysql2'
import dotenv from 'dotenv'
//import data from './backend/assets/programs_50_years.json' assert {type: 'json'};
import { readFile } from 'fs/promises';

dotenv.config();

const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const path = import.meta.dirname;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('dash2.ejs');
})

app.get('/sign-in', (req, res) => {
    res.render('signin');
})

app.get('/division-data', async (req, res) => {
    const division = req.query.division;

    //const result = LOCData.filter(item => item.division === division);

    const [result] = await pool.query(`SELECT * FROM divisions WHERE division_name = '${division}'`);

    // let sortedLOCData = [...result].sort((a, b) =>
    //     new Date(b['dateSubmitted']) - new Date(a['dateSubmitted'])
    // );

    // res.json(sortedLOCData);
    console.log({resultDivisons: result});
    res.send(result[0]);
})

app.get('/summary', async(req, res) => { 
    try{
      const [LOCData] = await pool.query('SELECT * FROM divisiondata ORDER BY division DESC');
      res.render('summary', { LOCData });
    } catch(err){
      console.error('Database error:', err);
    }
});

app.post('/submit-data', async(req, res) => {

  const datainput = req.body;

  //pulling data for the sake of edit history checking.
  const id = datainput['id-summary'];
  const newValues = {
    division: datainput['division-summary'],
    academic_program: datainput['program-summary'],
    payees: datainput['payee-summary'],
    has_been_paid: datainput['paid-summary'],
    report_submitted: datainput['report-summary'],
    notes: datainput['notes-summary']
  };

  try {
    const [rows] = await pool.query('SELECT * FROM divisiondata WHERE id = ?', [id]);
    const prev = rows && rows[0] ? rows[0] : {};

    //need to check for P&I tool changes too, change here too!!
    const fieldMap = [
      { col: 'division', key: 'division' },
      { col: 'academic_program', key: 'academicProgram' },
      { col: 'payees', key: 'payees' },
      { col: 'has_been_paid', key: 'hasBeenPaid' },
      { col: 'report_submitted', key: 'reportSubmitted' },
      { col: 'notes', key: 'notes' }
    ];

    const changes = {};
    const newValuesForDetails = {};

    //check if anything has changed from what we're trying to submit vs whats in the divisiondata.
    fieldMap.forEach(({ col, key }) => {
      const oldVal = prev[col];
      const newVal = newValues[col];
      const oldNorm = (typeof oldVal === 'undefined' || oldVal === null) ? null : String(oldVal);
      const newNorm = (typeof newVal === 'undefined' || newVal === null) ? null : String(newVal);
      if (oldNorm !== newNorm) {
        changes[key] = { from: oldVal ?? null, to: newVal ?? null };
      }
      newValuesForDetails[key] = newVal ?? null;
    });

    const sql = 'UPDATE divisiondata SET division = ?, academic_program = ?, payees = ?, has_been_paid = ?, report_submitted = ?, notes = ? WHERE id = ?';
    const params = [
      newValues.division,
      newValues.academic_program,
      newValues.payees,
      newValues.has_been_paid,
      newValues.report_submitted,
      newValues.notes,
      id
    ];

    //then update the new data.
    const [result] = await pool.execute(sql, params);

    const divisionLabel = newValues.division || prev['division'] || null;
    const fieldLabels = {
      division: 'Division',
      academicProgram: 'Program',
      payees: 'Payees',
      hasBeenPaid: 'Paid',
      reportSubmitted: 'Report submitted',
      notes: 'Notes'
    };
    const changedKeys = Object.keys(changes || {});
    let summaryText = divisionLabel ? `${divisionLabel} (${newValues.academic_program}) updated` : 'Record updated';
    const details = { changes, newValues: newValuesForDetails };
    await pool.execute('INSERT INTO edit_history (division, summary, details, timestamp) VALUES (?, ?, ?, ?)', [divisionLabel, summaryText, JSON.stringify(details), new Date()]);

    const [LOCData] = await pool.query('SELECT * FROM divisiondata ORDER BY division DESC');
    res.render('summary', { LOCData });
  } catch (err) {
    console.log('Database Error', err);
  }
});

//if we have a post request to this url then we're trying to insert into edit history
app.post('/edit-history', async (req, res) => {
  try {
    const { division, summary, details, timestamp } = req.body;
    const ts = timestamp ? new Date(timestamp) : new Date();
    const sql = 'INSERT INTO edit_history (division, summary, details, timestamp) VALUES (?, ?, ?, ?)';
    await pool.execute(sql, [division || null, summary || null, JSON.stringify(details || {}), ts]);
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to insert edit history', err);
  }
});

//get the history
app.get('/edit-history', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM edit_history ORDER BY timestamp DESC');
    res.json(rows);
  } catch (err) {
    console.error('Failed to read edit history', err);
  }
});

const PORT = 3003;
app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
