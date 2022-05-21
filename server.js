const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


const { notes } = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.use(express.static('public'));

//html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log('API server is now on port ${PORT}!');
});