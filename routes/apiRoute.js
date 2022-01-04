const express = require("express");
const router = express.Router();
const { createNewNote } = require("../lib/notes");
const fs = require("fs");

router.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", (error, notes) => {
        if (error) {
            return res.json(error)
        }
        notes = JSON.parse(notes)
        res.json(notes)
    });
});

router.post("/notes", (req, res) => {
    fs.readFile("./db/db.json", (error, notes) => {
        if (error) {
            return res.json(error)
        }
        notes = JSON.parse(notes)
       

        req.body.id = notes.length.toString();
    
        const newNotes = createNewNote(req.body, notes)
        res.json(newNotes)
    });
});

router.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id
    console.log(noteId)

    fs.readFile("./db/db.json", (error, notes) => {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)

        notes = notes.filter(val => val.id !== noteId)

        fs.writeFile("./db/db.json", JSON.stringify(notes), (error, data) => {
            if (error) {
                return error
            }
            res.json(notes)
        })
    })
});

module.exports = router;