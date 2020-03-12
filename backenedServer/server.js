const express = require("express");
const server = express();
const BodyParser = require("body-parser");
cors = require('cors');
path = require('path');
server.set('view engine', 'pug')
const userModel = require('./models/userSchema');
// Setting up port with express js
const willowRoute = require('../backenedServer/routes/willowRoute')
server.use(express.urlencoded({extended:true}))
server.use(BodyParser.json());
server.use(cors()); 
server.use(express.static(path.join(__dirname, 'dist/frontWillow')));
server.use('/', express.static(path.join(__dirname, 'dist/frontWillow')));
server.use('/api', willowRoute)

const port = 4000;




server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

// Find 404 and hand over to error handler
server.use((req, res, next) => {
  next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
 console.error(err.message); // Log error message in our server's console
 if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
 res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});