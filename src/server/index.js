// load secrets and config information
const dotenv = require('dotenv');
dotenv.config();

// set up express and app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// create express app
const app = express();

// configure cors
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get request to the root url
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
});

//

