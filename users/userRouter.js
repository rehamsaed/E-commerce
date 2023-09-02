const express=require("express")
const fs=require('fs/promises')
const router=express.Router()
const { signup,Edituser ,Deletuser,login,showusers,findOne,fillcart,fillcartOk,fillcartCancel} = require("./controller")
const Authorized=require('../Authorization/userauth')
const Authoradmin=require('../Authorization/adminauth')
//user
router.post("/signup",signup)
router.post("/login",login)
router.patch("/edit/:id",Authorized,Edituser)
router.delete("/deletuser/:id",Authorized,Deletuser)
router.patch("/fillcart/:id",fillcart)
router.post("/fillcart/:id/ok",fillcartOk)
router.post("/fillcart/:id/cancel",fillcartCancel)

//admin
router.get("/findOne/:id",Authoradmin,findOne)
router.get("/showusers",Authoradmin,showusers)
router.delete("/deleteuser/:id",Authoradmin,Deletuser)


module.exports=router