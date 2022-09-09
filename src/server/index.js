// load secrets and config information
const dotenv = require('dotenv');
dotenv.config();

// set up express and app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// PORT is set in the .env file
const PORT = process.env.PORT || 8080;

// create express app
const app = express();

// set up dist folder for static files
app.use(express.static('dist'));

// configure cors
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)
let projectData = {};

// get request to the root url
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

// post request for the trip data
app.post('/trip', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// get request for all trip data
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// test server
app.get('/test', (req, res) => {
    res.send({ message: "Hello from the server!" });
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
});

// export the app for testing
module.exports = app;

