import express from 'express';
//import data from './backend/assets/programs_50_years.json' assert {type: 'json'};
import { readFile } from 'fs/promises';

const app = express();

const path = import.meta.dirname;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${path}/public/pages/dash.html`);
})

app.get('/division-data', async (req, res) => {
    const division = req.query.division;
    const jsonData = await readFile('./backend/assets/programs_50_years_filled.json', 'utf-8');
    const data = JSON.parse(jsonData);

    const result = data.filter(item => item.Division === division);

    const sorted = [...result].sort((a, b) =>
        new Date(b['Date Submitted']) - new Date(a['Date Submitted'])
    );

    res.json(sorted);
})

const PORT = 3003;
app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
