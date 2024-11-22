const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({'extended': true}));
server.use(logger('dev'));

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Handle GET request to serve the Mad Lib form
server.get('/ITC505/lab-7', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle POST request to process the Mad Lib form
server.post('/ITC505/lab-7', (req, res) => {
    const { noun, verb, adjective, pluralNoun, place } = req.body;

    if (!noun || !verb || !adjective || !pluralNoun || !place) {
        return res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/ITC505/lab-7">Go Back to Form</a>
        `);
    }

    const madLib = `
        <h1>Your Mad Lib</h1>
        <p>Once upon a time, a ${adjective} ${noun} decided to ${verb} in the ${place}. 
        Along the way, it met several ${pluralNoun} who helped it on its journey.</p>
        <a href="/ITC505/lab-7">Go Back to Form</a>
    `;
    res.send(madLib);
});

// Setup port for local or default
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log('Server is ready on localhost!'));

