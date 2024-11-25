const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Models/user')  

const protect = asyncHandler(async (req,res,next)=>{
let token 
let user
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
     token = req.headers.authorization.split(' ')[1]
     
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     
         user = await User.findById(decoded.id)
     
     
     req.user = user
     console.log(req.user)
     
     

     next()
    }catch(error){
        console.log(error)
        res.status(401)
        throw new Error('not authorized')

    }
}
if(!token){
    res.status(401)
    throw new Error('no token')
}
})
module.exports = { protect };