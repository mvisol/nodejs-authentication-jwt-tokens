'use strict'

// Imports
const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users-model');
const keys = require('../config/keys');

// Middleware

/**
 * JWT STRATEGY
 */
passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),           // Where token is obtained
    secretOrKey :  keys.JWT_SECRET                                                // To decode token
}, async (payload, done )=>{
    try {
        //Find user specified in the token (in payload as sub)
        const user = await User.findById(payload.sub);
        //If user doesnt exist handle it
        if(!user)  return done(null , false);
        //Otherwise return the user
        done(null, true);
    } catch (error) {
        next(error);
    }
}));

/**
 * LOCAL STRATEGY
 */
passport.use(new LocalStrategy({
    usernameField : 'email'
}, async (email, password, done)=> {
    // Find user given the email
    const user = await User.findOne({email : email});
    // If not exist handle
    if(!user) return done(null, false);
    // Check if the password is correct

    // Otherwise return the user
    
}))