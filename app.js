import express from 'express';

const app = express();

const path = import.meta.dirname;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${path}/public/pages/dash.html`);
})

const PORT = 3003;
app.listen(PORT, (req, res) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})