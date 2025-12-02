import express from 'express';
import mysql2 from 'mysql2'
import dotenv from 'dotenv'
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

app.get('/', async(req, res) => {
  const [list] = await pool.query(`SELECT division_name FROM divisions`);
  res.render('dash.ejs', {currentUrl: req.path, divisions: list});
})

app.get('/sign-in', (req, res) => {
    res.render('signin');
})

//get division data and all of the programs in it
app.get('/division-data', async (req, res) => {
    const division = req.query.division;
    const [divisionResult] = await pool.query(`SELECT * FROM divisions WHERE division_name = ?`, [division]);
    const [divisionPrograms] = await pool.query(`SELECT * from divisiondata`, [division])
    res.send({divisionInfo: divisionResult, programs: divisionPrograms});
})

app.get('/get-programs/:division', async(req, res) => {
  const division = req.body.division;
  const [programs] = await pool.query('SELECT academic_programs FROM divisiondata WHERE division = ?', [division])
  res.send(programs);
})



app.get('/summary', async(req, res) => { 
    try{
      const [LOCData] = await pool.query('SELECT * FROM divisiondata ORDER BY division DESC');
      res.render('summary', { LOCData, currentUrl: req.path });
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
      notes: 'Notes'
    };
    const changedKeys = Object.keys(changes || {});
    let summaryText = divisionLabel ? `${divisionLabel} (${newValues.academic_program}) updated` : 'Record updated';
    const details = { changes, newValues: newValuesForDetails };
    await pool.execute('INSERT INTO edit_history (division, summary, details, timestamp) VALUES (?, ?, ?, ?)', [divisionLabel, summaryText, JSON.stringify(details), new Date()]);

    const [LOCData] = await pool.query('SELECT * FROM divisiondata ORDER BY division DESC');
    res.render('summary', { LOCData, currentUrl: '/summary' });
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
    const [rows] = await pool.query('SELECT * FROM edit_history ORDER BY timestamp DESC LIMIT 5');
    res.json(rows);
  } catch (err) {
    console.error('Failed to read edit history', err);
  }
});



//year by year
app.get('/year-by-year', async(req, res) => {
    try {
      const [LOCData] = await pool.query('SELECT * FROM divisiondata ORDER BY division ASC, academic_program ASC');
      const [reviews] = await pool.query('SELECT program_id, review_year FROM program_reviews');

      const currentYear = new Date().getFullYear();
      const startYear = currentYear;
      const numYears = 6; 
      const academicYears = [];
      for (let i = 0; i < numYears; i++) {
        const year = startYear + i;
        const nextYear = (year + 1).toString().slice(-2);
        academicYears.push(`${year}-${nextYear}`);
      }

      const reviewMap = {};
      reviews.forEach(r => {
        if (!reviewMap[r.program_id]) reviewMap[r.program_id] = [];
        reviewMap[r.program_id].push(r.review_year);
      });

      const programsByDivision = {};
      const divisionOrder = [];

      LOCData.forEach(program => {
        const division = program.division;
        if (!programsByDivision[division]) {
          programsByDivision[division] = [];
          divisionOrder.push(division);
        }

        const programReviewYears = reviewMap[program.id] ? reviewMap[program.id].slice() : [];

        programsByDivision[division].push({
          id: program.id,
          division: division,
          academic_program: program.academic_program,
          division_chair: program.division_chair,
          dean: program.dean,
          loc_rep: program.loc_rep,
          pen_contact: program.pen_contact,
          last_reviewed: program.date_submitted ? new Date(program.date_submitted).getFullYear() : null,
          reviewYears: programReviewYears
        });
      });

      res.render('yearbyyear', { 
        programsByDivision, 
        divisionOrder,
        academicYears, 
        startYear, 
        currentYear, 
        currentUrl: req.path 
      });
    } catch(err){
      console.error('Database error:', err);
    }
});

//adding a year to review
app.post('/programs/:id/review-years', async (req, res) => {
  try {
    const programId = parseInt(req.params.id, 10);
    const { year } = req.body;
    const reviewYear = parseInt(year, 10);
    if (!programId || !reviewYear) return res.status(400).json({ error: 'Invalid program id or year' });
    await pool.execute('INSERT IGNORE INTO program_reviews (program_id, review_year) VALUES (?, ?)', [programId, reviewYear]);
    res.json({ success: true, programId, reviewYear });
  } catch (err) {
    console.error('Failed to add review year', err);
  }
});

//unchecking a year from review
app.delete('/programs/:id/review-years/:year', async (req, res) => {
  try {
    const programId = parseInt(req.params.id, 10);
    const reviewYear = parseInt(req.params.year, 10);
    if (!programId || !reviewYear) return res.status(400).json({ error: 'Invalid program id or year' });

    await pool.execute('DELETE FROM program_reviews WHERE program_id = ? AND review_year = ?', [programId, reviewYear]);
    res.json({ success: true, programId, reviewYear });
  } catch (err) {
    console.error('Failed to remove review year', err);
  }
});
//year by year end
const PORT = 3003;
app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
