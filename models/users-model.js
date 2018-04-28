'use strict'

// Imports
const express = require('express');
const mongoose = require('mongoose');

// UserSchema
const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true 
    },

    password : {
        type : String,
        required : true
    }
});

// Model
const User = mongoose.model('user', UserSchema);

// Export Model
module.exports = User;
