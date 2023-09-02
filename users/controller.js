const express = require("express");
const router = express.Router();
const customError = require("../CustomError");
const usermodel = require("./usermodel");
const productmodel = require("../products/productmodel")
const schema=require("./validation")
const bcrypt=require("bcrypt")
const saltRound=12;
const util=require('util')
const jwi=require('jsonwebtoken');
const asycasign=util.promisify(jwi.sign)



// sign up
const signup = async (req, res,next) => {

    const { error } = schema.validate(req.body);
    if (error) {
    const errorMessage = `Validation error: ${error.details[0].message}`;
    return res.status(400).send(errorMessage);
    }

    let { email,firstname,lastname,username,password,phonenumber,address,isAdmin} = req.body;
    const userexite=await usermodel.findOne({username})
    if(userexite){
        next(customError({
            statusCode:401,
            message:"User is exist enter another user"
        }))
    }
else{
    const newuser = await usermodel.create({
        email,firstname,lastname,username,password,phonenumber,address,isAdmin
    });
    res.status(200).send(newuser);
}

}


//login 
const login=async(req,res,next)=>{
    const{username,password}=req.body
    const finduser=await usermodel.findOne({username})
    if(!finduser){
        next(customError({
            statusCode:401,
            message:"User or password invalid"
        }))
    }
    const passcompar=await bcrypt.compare(password,finduser.password)
    if(!passcompar){
        next(customError({
                statusCode:401,
                message:"User or password invalid"
            }))
    }

    const token=await finduser.generateToken()
    if(!token){
        next(customError({
            statusCode:401,
            message:"User or password invalid"
        }))
    }
    const products = await productmodel.find()
    let urId = await finduser.id

    res.send({urId,products,token}) 
    
}



//edit user

const Edituser= async(req, res,next) =>{
    try{
    const { id } = req.params;
    let { email,firstname,lastname,username,password,phonenumber,address} = req.body;
        
        const hassedpassword=await bcrypt.hash(password,saltRound)
        password=hassedpassword
        
    const edituser=await usermodel.findByIdAndUpdate(id,{
        email,firstname,lastname,username,password,phonenumber,address
    })
    if(edituser){
        res.status(200).send("updated")
    }
        
}
    catch{
        next(customError({
            statusCode:400,
            message:'user not found'
        }))
    }
    
}
// logout

const Deletuser=async(req, res,next) => {
        try{
            const { id } = req.params;
        
        const del=await usermodel.findByIdAndRemove(id)
            
        if(del){ res.status(200).send("deleted")}
        }
        catch{
            next(customError({
                statusCode:400,
                message:'user not found'
            }))
            
        }
        
        
        }

// show users

const showusers=async(req,res,next)=>{
    
    const finduser=await usermodel.find()
        res.send(finduser)

        next(customerrorr({
            statusCode:400,
            message:'users not found'
        }))
}


//find user by id 

const findOne = async(req,res,next)=>{
    try{
        const{id}=req.params;
    const finduser= await usermodel.findById(id)
if(finduser) res.send(finduser)
res.status(200).send(finduser)

    }
//next('error')
catch{
    next(customError({
        statusCode:400,
        message:'user not found'
    }))
}
}

//fill card 

const fillcart = async (req, res, next) => {

  try {

    let { id } = req.params;

    let cart = req.body.cart ;

    let User = await usermodel.findByIdAndUpdate(id, {

      cart,

    });

    const s = User.cart;

    let x = User.cart[0];

    var price = 0;

    for (var i in User.cart) {

      var z = User.cart[i];

      var findproduct = await productmodel.findOne({ ProductName: z });

      price = parseInt(price) + findproduct.Price;

    }

    res.send(`Your cart : ${s}
     total your cart: ${price}
     if you want to confirm your order enter/ok
     if you want to cancel your order enter/cancel
     `);


  } catch {

    next(

      customError({

        statusCode: 400,

        message: "faild fill the cart",

      })

    );

  }

};

// confirm order 

const fillcartOk =  async (req, res, next) => {
    try {
      let { id } = req.params;
      let cart = req.body.cart;
      let User = await usermodel.findByIdAndUpdate(id, {
        cart,
      });
      let x = User.cart[0];
      var price = 0;
      for (var i in User.cart) {
        var z = User.cart[i];
        var findproduct = await productmodel.findOne({ ProductName: z });
        price = parseInt(price) + findproduct.Price;
      }
      const s = User.cart;
      let j = await usermodel.findByIdAndUpdate(id, {
        cart: [],
      });
      res.send(` You verified the order 
                Your cart : ${s}
                Total Your Cart : ${price}
                Thanks for visiting our shop `);
    } catch {
      next(
        customError({
          statusCode: 400,
          message: "Error in verify order API",
        })
      );
    }
  };
  // cancel order
  const fillcartCancel =  async (req, res, next) => {
    try {
      let { id } = req.params;
      let cart = [];
      let User = await usermodel.findByIdAndUpdate(id, {
        cart,
      });
      res.send(`  You canceled the order 
                  Your cart has been emptied 
                  Thanks for visiting our shop `);
    } catch {
      next(
        customError({
          statusCode: 400,
          message: "faild cancel order ",
        })
      );
    }
  };



module.exports={signup,Edituser,Deletuser,login,showusers,findOne,fillcart,fillcartOk,fillcartCancel}