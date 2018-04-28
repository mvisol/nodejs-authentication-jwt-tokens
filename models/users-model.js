
'use strict'

// Imports
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys')

// UserSchema
const UserSchema = new mongoose.Schema({

    // Authentication methods
    method : {
        type : String,
        enum : ['local', 'google', 'facebook'],
        required : true
    },

    // Local Authentcation
    local :{
        email : {
            type : String,
            //required : true,
            lowercase : true,
            //unique : true 
        },
    
        password : {
            type : String,
            //required : true
        }
    },

    // Google OAuth
    google : {
        id :{
            type : String
        },

        email : {
            type : String,
            lowercase :true
        }
    },

    // Facebook OAuth
    facebook : {

    },
    
});

// Presave 
UserSchema.pre('save', async function(next) {
    try {
      if(this.method !== 'local') next();  
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.local.password, salt);
      // Re-assign hashed version over original, plain text password
      this.local.password = passwordHash;
      console.log(salt);
      console.log(passwordHash);
      next();
    } catch(error) {
      next(error);
    }
});
  
UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.local.password);
    } catch(error) {
      throw new Error(error);
    }
}
  
// Model
const User = mongoose.model('user', UserSchema);

// Export Model
module.exports = User;
