'use strict'

// Imports
const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
//const router = express.Router;

const UsersController = require('../controllers/users-controller');
const { validateBody, schemas } = require('../helpers/users-helper');
const passportSetup = require('../config/passport-setup');

// Routes
router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(UsersController.signIn);

router.route('/secret')
  .get(passport.authenticate('jwt',{ session : false }), UsersController.secret);   


module.exports = router;   

