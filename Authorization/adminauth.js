const util=require('util')
const jwt=require('jsonwebtoken')
const CustomError = require('../CustomError')
const asycverify=util.promisify(jwt.verify)
const secrtkey="kkkkkk"
const Authoradmin=async(req,res,next)=>{
   //const {token} =req.headers.authorization
    const{authorization:token}=req.headers
    const decoded=await asycverify(token,secrtkey)
    
        // const authHeader = req.headers.token;
        
        // if (authHeader) {
            
        //     const token = authHeader.split(" ")[1];
            
        //     jwt.verify(token, process,(err, user) => {
                
        //     if (err) res.status(403).json("Token is not valid!");
                
        //     req.user = user;
                
        //     next(CustomError({
        //         statusCode:401,
        //         message:"NOT Authorized"
        //         }))

        //   });

        

        
        
    
    if(decoded.isAdmin!==true) 
    next(CustomError({
    statusCode:401,
    message:"NOT Authorized"
    }))
    next()
}
module.exports=Authoradmin