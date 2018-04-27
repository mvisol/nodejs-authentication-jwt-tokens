'use strict'

module.exports ={

    signUp: async (req, res, next)=>{
        console.log('signUp() reached')
    },

    signIn: async (req, res, next)=>{
        console.log('signIn() reached')
    },

    secret: async (req, res, next)=>{
        console.log('secret reached')
    }
}