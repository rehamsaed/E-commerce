const express = require("express");
const router = express.Router();
const customError = require("../CustomError");
const productmodel = require("./productmodel")
const productschema = require("./productschema");

const schema=require("./validation")
const bcrypt=require("bcrypt")
const saltRound=12;
const util=require('util')
const jwi=require('jsonwebtoken');



const asycasign=util.promisify(jwi.sign) 

//creat product
const addproduct = async (req, res, next) => {
    try {
      let { ProductName, Price, Description } = req.body;
      const newProduct = await productmodel.create({
        ProductName,
        Price,
        Description,
      });
      res.status(200).send(newProduct);
    } catch {
      next(
        customError({
          statusCode: 401,
          message: "faild to add new product",
        })
      );
    }
}
  // show all prouducts
const showproducts = async (req, res, next) => {
    try {
      const allpro = await productmodel.find();
      res.status(200).send(allpro);
    } catch {
      next(
        customError({
          statusCode: 401,
          message: "faild in show all products",
        })
      );
    }
  };

  //edit product

  const editproduct =  async (req, res, next) => {
    try {
      const { id } = req.params;
      let { ProductName, Price, Description } = req.body;
      const edited_Product = await productmodel.findByIdAndUpdate(id, {
        ProductName,
        Price,
        Description,
      });
      res.status(200).send({ edited_Product });
    } catch {
      next(
        customError({
          statusCode: 400,
          message: "Error in edit this product ",
        })
      );
    }
  }

  // Delete product

  const Deletproduct=async(req, res,next) => {
    try{
        const { id } = req.params;
    
    const del=await productmodel.findByIdAndRemove(id)
        
    if(del){ res.status(200).send("deleted")}
    }
    catch{
        next(customError({
            statusCode:400,
            message:'product not found'
        }))
        
    }
    
    
    }

  module.exports = {addproduct,showproducts,editproduct,Deletproduct}