//json dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
const htmlRoute = require('./routes/htmlRoute.js');
const apiRoute = require('./routes/apiRoute')


// Deploy server
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static middleware
app.use(express.static('public'));


// Routing
app.use('/api', apiRoute);
app.use('/', htmlRoute)


// Server is listening
app.listen(PORT, function() {
    console.log('App is listening on PORT:' + PORT);
});


// // "GET" API Route
// app.get('/api/notes', function(req, res) {
//     fs.readFile('./db/db.json').then(function(data) {
//         notes = [].concat.apply(JSON.parse(data))
//         res.json(notes);
//     })
// });


// //  "POST" API Route
// app.post('/api/notes', function(req, res) {
//     const note = req.body;
//     fs.readFile('./db/db.json').then(function(data) {
//         const notes = [].concat(JSON.parse(data));
//         note.id = notes.length + 1
//         notes.push(note);
//         return notes
//     }).then(function(notes) {
//         writeFileAsync('./db/db.json', JSON.stringify(notes))
//         res.json(note);
//     })
// });


// // "DELETE" API Route
// app.delete('/api/notes/:id', function(req, res) {
//     const noteDelete = parseInt(req.params.id);
//     readFileAsync('./db/db.json').then(function(data) {
//         const notes = [].concat(JSON.parse(data));
//         const newNote = []
//         for (let i = 0; i < notes.length; i++) {
//             if(noteDelete !== notes[i].id) {
//                 newNote.push(notes[i])
//             }
//         }
//         return newNote
//     }).then(function(notes) {
//         writeFileAsync('./db/db.json', JSON.stringify(notes))
//         res.send('Note saved successfully!');
//     })
// })


// // Routes for HTML
// app.get('/notes', function(req, res) {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });