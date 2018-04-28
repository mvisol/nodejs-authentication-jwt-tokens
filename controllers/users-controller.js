'use strict'

// Imports
const JWT = require('jsonwebtoken');

const User = require('../models/users-model');
const keys = require('../config/keys');


/**
 * Generates Token
 * @param {*} user
 */
const signToken = user => {
        return  JWT.sign({
        iss : 'Shopify',                                        // Issuer of token
        sub :  user._id,                                     // Subject
        iat :  new Date().getTime(),                            // Issued Time
        exp : new Date().setDate(new Date().getDate() + 1)      // Token Expiry date
    }, keys.JWT_SECRET);
}

// Code to handle routes
module.exports ={

    //Sign Up
    signUp: async (req, res, next) => {
        console.log('signUp() reached');
        // Password and Email sent with request
        const { email, password } = req.value.body;
        //Check if User Already Exists
        const foundUser = await User.findOne({"local.email" : email});
        //If User Already Exists Do Not Create Or Else
        if(foundUser){
            return res.status(403).json({error : 'Email Already Exists!!!!!'});
        }
        //Create New User With Email and Password
        const newUser = new User({
            method: 'local',
            local : {
                email : email,
                password : password
            }    
        });
        //Save NewUser to Database and Respond With Token
        await newUser.save();
        //res.json({user : 'user created'});
        //Generate Token
        const token = signToken(newUser);
       
        //respond with token
        res.status(200).json({token : token});
    },

    //SignIn : Exchange already existing user for a new token 
    signIn: async (req, res, next)=>{
        console.log('signIn() reached');
        console.log('\n Successful Login');
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        console.log('req.user ', req.user)
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    //Secret
    secret: async (req, res, next)=>{
        console.log('secret reached');
        console.log('secret document reched');
        res.json({secret : 'Secret Info Reached'});
    }
}