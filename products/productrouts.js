const express=require("express")
const fs=require('fs/promises')
const { editproduct, addproduct, showproducts, Deletproduct } = require("./controller")
const router=express.Router();
const Authoradmin = require("../Authorization/adminauth")
router.post("/addproduct",Authoradmin,addproduct)
router.get("/showproducts",showproducts)
router.delete("/Deletproduct/:id",Authoradmin,Deletproduct)
router.patch("/editprroduct/:id",Authoradmin,editproduct)


module.exports=router