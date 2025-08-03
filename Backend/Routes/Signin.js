const express = require('express')
const router = express.Router()
const userModel = require('../Schemas/userSchema')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config({path:'../env files/.env'})

const secretkey = process.env.secretkey


router.post('/',async(req,res)=>{

let userExist = await userModel.findOne(req.body)

if(userExist){
    let token = jwt.sign({username:req.body.username},secretkey,{expiresIn:'1h'})
    res.cookie('token',token,{
          httpOnly: true,
  secure: false,
  sameSite: "None",
  maxAge: 2*3600000
    })
    res.json({message:'User Found !!',userexist:true,username:req.body.username})
}
else{
res.json({message:'Invalid Credential !! ',userexist:false})
}

})

module.exports = router