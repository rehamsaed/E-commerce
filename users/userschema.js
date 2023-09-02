const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const dotenv = require("dotenv");
require("dotenv").config();
const saltRound=12;
const util=require('util')
const jwi=require('jsonwebtoken');
const _ = require('lodash')
const asycasign=util.promisify(jwi.sign)

const secrtkey= process.env.secrtkey


//*********************//name of model */
const userSchema = new mongoose.Schema({

 

    
    email:{

    },firstname:{

 

    },lastname:{

 

    },username:{

    },

    password:{
    },phonenumber:{

 

    },address:{

 

    },
    isAdmin:{
    type:Boolean,
    default:"false"
    },
    cart:{
        type:[String]
 
    }

    },{
        toJSON:{
            transform:(doc,retuDoc)=>_.omit(retuDoc,['__v','password','isAdmin'])
        }
    })
    //if update password =>new pass will be hashed
    //Hooks mongoose
    userSchema.pre('save',async function(){
    if(this.isModified('password')){
        const hashedpass=await bcrypt.hash(this.password,saltRound)
        this.password=hashedpass
    }
    })

userSchema.methods.generateToken=function(){
    const token= asycasign({
            //playload
            id:this.id,
            username:this.username ,
            isAdmin:this.isAdmin 
        },secrtkey)
        return token
}
module.exports = userSchema