'use strict'

// Imports
const User = require('../models/users-model');


// Code to handle routes
module.exports ={

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
        //Save NewUser to Database
        await newUser.save();
        res.json({user : 'user created'})
    },

    signIn: async (req, res, next)=>{
        console.log('signIn() reached');
    },

    secret: async (req, res, next)=>{
        console.log('secret reached');
    }
}