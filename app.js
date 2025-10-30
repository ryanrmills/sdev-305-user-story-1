import express from 'express';
//import data from './backend/assets/programs_50_years.json' assert {type: 'json'};
import { readFile } from 'fs/promises';

const app = express();

const path = import.meta.dirname;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const jsonData = await readFile('./backend/assets/programs_50_years_filled_modified.json', 'utf-8');
let LOCData = JSON.parse(jsonData);

app.get('/', (req, res) => {
    res.render('dash.ejs');
})

app.get('/division-data', async (req, res) => {
    const division = req.query.division;

    const result = LOCData.filter(item => item.division === division);

    let sortedLOCData = [...result].sort((a, b) =>
        new Date(b['dateSubmitted']) - new Date(a['dateSubmitted'])
    );

    res.json(sortedLOCData);
})

app.get('/summary', (req, res) => { 
    res.render('summary', {LOCData});
})

const PORT = 3003;
app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
