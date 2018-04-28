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
        const email = req.value.body.email;
        const password = req.value.body.password;
        //Check if User Already Exists
        const foundUser = await User.findOne({email : email});
        //If User Already Exists Do Not Create Or Else
        if(foundUser){
            return res.status(403).json({error : 'Email Already Exists!!!!!'});
        }
        //Create New User With Email and Password
        const newUser = new User({
            email : email,
            password : password
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
    },

    //Secret
    secret: async (req, res, next)=>{
        console.log('secret reached');
        console.log('secret document reched');
        res.json({secret : 'Secret Info Reached'});
    }
}