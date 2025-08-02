const express = require('express')
const router = express.Router()
const userModel = require('../Schemas/userSchema')
let {getotp:getotp} = require('./sendOTP')
let {clearotp:clearotp} = require('./sendOTP')

router.post('/',async(req,res)=>{
   let otp = getotp(req.email);
let userExist = await userModel.findOne({$or:[{username:req.body.username},{email:req.body.email}]})
if(userExist){
    if(userExist.username===req.body.username){
    res.json({message:'Username already exist !!',userexist:true})
}
else if(userExist.email===req.body.email){
 res.json({message:'Email already exist !!',userexist:true})
}
}
else{
  if(otp==req.body.otp){
let result = userModel(req.body)
let r = await result.save();
res.json({message:'Account created ! please sign in now ',userexist:false})
clearotp(req.body.email)
  }
  else{
    res.json({message:'Invalid OTP'})
  }

}

})

module.exports = router