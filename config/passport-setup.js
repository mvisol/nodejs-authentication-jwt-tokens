'use strict'

// Imports
const express = require('express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');

const User = require('../models/users-model');
const keys = require('../config/keys');

// Middleware

/**
 * JWT STRATEGY
 */
passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),           // Where token is obtained
    secretOrKey :  keys.JWT_SECRET                                     // To decode token
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
    try {
        // Find user given the email
        const user = await User.findOne({"local.email" : email});
        // If not exist handle
        if(!user) return done(null, false);
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        // If entered password is incorrect
        if(!isMatch)    return done(null, false);
        // Otherwise return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));


/**
 * GOOGLE STRATEGY
 */

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: keys.google.GOOGLE_CLIENT_ID,
    clientSecret: keys.google.GOOGLE_CLIENT_SECRET,
    //callbackURL: keys.google.GOOGLE_CALLBACK_URI
}, async(accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        // Check if user already exists
        const existingUser = await User.findOne({ "google.id": profile.id });
        // If User Already Exist
        if (existingUser) {
            console.log('User Already Exists');
            return done(null, existingUser);
        }

        // If User Doesnt Exist Create New User
        console.log('User Doesnt Exist Creating New User');
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        console.log('New User Created');
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }   
}));

