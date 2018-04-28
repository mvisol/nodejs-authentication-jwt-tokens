
'use strict'

// Imports
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys')

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

// Presave 
UserSchema.pre('save', async function(next) {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.password, salt);
      // Re-assign hashed version over original, plain text password
      this.password = passwordHash;
      console.log(salt);
      console.log(passwordHash);
      next();
    } catch(error) {
      next(error);
    }
});
  
UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
      throw new Error(error);
    }
}
  
// Model
const User = mongoose.model('user', UserSchema);

// Export Model
module.exports = User;
