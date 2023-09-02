const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const dotenv = require("dotenv");
const _ = require('lodash')
require("dotenv").config();
const saltRound=12;
const util=require('util')
const jwi=require('jsonwebtoken');

const asycasign=util.promisify(jwi.sign)

const secrtkey= process.env.secrtkey


const productschema = mongoose.Schema({
    ProductName :{
        
    }, 
    Price:{ 
        type:Number,
        default:0
       
    } ,
    Description:{
        
    } 


},
{
    toJSON:{
        transform:(doc,retuDoc)=>_.omit(retuDoc,['__v'])
    }
})

module.exports = productschema

