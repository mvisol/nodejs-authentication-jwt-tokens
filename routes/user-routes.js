'use strict'

// Imports
const express = require('express');
const router = require('express-promise-router')();
//const router = express.Router;
const UsersController = require('../controllers/users-controller');


// Routes
router.route('/signup')
    .post(UsersController.signUp);


router.route('/signin')
    .post(UsersController.signIn);
    

router.route('/secret')
    .get(UsersController.secret);    


module.exports = router;   

