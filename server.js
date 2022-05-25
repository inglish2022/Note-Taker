const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const fs = require("fs");
const {uuid}= require("uuidv4");

//var notes = require('./db/db.json');

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

let notes = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
currentID = notes.length; 

app.get('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
    res.json(notes);
});

app.post('/api/notes', (req, res) =>  {
    let notes = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
    var newNote = req.body;

    newNote.id = currentID +1;
    currentID++;
    console.log(newNote);

    let allNotes = [...notes, newNote]
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes))

    // rewriteNotes();
    res.json(allNotes);
    
});

app.delete('/api/notes/:id', (req, res)  =>  {
    let deleteNote = req.params.id
    let oldNotes = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
    let updatedNotes = oldNotes.filter((note) =>  note.id !=deleteNote )

    fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes))
    res.json(updatedNotes);
})




//html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}!`);
});