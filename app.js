import express from 'express';

const app = express();

const path = import.meta.dirname;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${path}/public/pages/dash.html`);
})

const PORT = 3003;
app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`);
})