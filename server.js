// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 5000;
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log(`Running on port ${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
    response.send(projectData);
}

// Post Route - adds incoming data to projectData object
app.post('/dataEntry', dataEntry);

function dataEntry (request, response) {
    console.log(request.body);
    newDataEntry = {
        date: request.body.date,
        name: request.body.name,
        temp: request.body.temp,
        content: request.body.content
    }
    projectData.push(newDataEntry);
}

