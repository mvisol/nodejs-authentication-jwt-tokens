'use strict'

// Imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const usersRoutes = require('./routes/user-routes');
const keys = require('./config/keys');

const app = express();

// Connect MongoDb
mongoose.connect(keys.mongodb.dbURI, err => {
    if (err) console.log(err);
    else console.log(`Database Connected ${path.basename(keys.mongodb.dbURI)}`);
})

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