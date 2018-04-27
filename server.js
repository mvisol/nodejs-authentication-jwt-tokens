'use strict'

// Imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const usersRoutes = require('./routes/user-routes');

const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/users', usersRoutes);


// Routes



// Start Server
const port = process.env.PORT || 3000;
app.listen(port, err => {
    console.log(`Server Listening on port ${port}`);
});