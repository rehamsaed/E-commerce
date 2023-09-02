const util=require('util')
const jwt=require('jsonwebtoken')
const CustomError = require('./CustomError')
const asycverify=util.promisify(jwt.verify)
const secrtkey="kkkkkk"
const AuthorieUser=async(req,res,next)=>{
   //const {token} =req.headers.authorization
    const{authorization:token}=req.headers
    const decoded=await asycverify(token,secrtkey)
    if(decoded.id!==req.params.id) 
    next(CustomError({
    statusCode:401,
    message:"NOT Authorized"
}))
    next()
}
module.exports=AuthorieUser