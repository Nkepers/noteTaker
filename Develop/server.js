//json dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


// Asynchronous Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// Deploy server
const app = express();
const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static middleware
app.use(express.static('./develop/public'));


// "GET" API Route
app.get('/api/notes', function(req, res) {
    readFileAsync('./develop/db/db.json', 'utf8').then(function(data) {
        notes = [].concat.apply(JSON.parse(data))
        res.json(notes);
    })
});


//  "POST" API Route
app.post('/api/notes', function(req, res) {
    const note = req.body;
    readFileAsync('./develop/db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync('./develop/db/db.json', JSON.stringify(notes))
        res.json(note);
    })
});


// "DELETE" API Route
app.delete('/api/notes/:id', function(req, res) {
    const noteDelete = parseInt(req.params.id);
    readFileAsync('./develop/db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNote = []
        for (let i = 0; i < notes.length; i++) {
            if(noteDelete !== notes[i].id) {
                newNote.push(notes[i])
            }
        }
        return newNote
    }).then(function(notes) {
        writeFileAsync('./develop/db/db.json', JSON.stringify(notes))
        res.send('Note saved successfully!');
    })
})