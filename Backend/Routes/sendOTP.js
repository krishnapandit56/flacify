const express = require('express')
const router  = express.Router()
const nodemailer = require('nodemailer')
let otpmap = {}

router.post('/',async(req,res)=>{

const otp = Math.floor(100000 + Math.random() * 900000);
otpmap[req.email]=otp
  
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'krishnapandit52005@gmail.com',
        pass:'ytkxrphtfydoakfo'
    }
})

  await transport.sendMail({
    from: 'krishnapandit2005@gmail.com',
    to: req.body.email,
    subject: 'OTP For SignUp In Flacify',
    text: `Your OTP is: ${otp} . Use this otp to create your account on flacify`
  });

  res.json({otp:otp,message:'6 digit OTP sent to your email',otpsent:'Resend OTP'})

})

function getotp(email){
    return otpmap[email];
}

function clearotp(email) {
  delete otpMap[email];
}

module.exports = {router,getotp,clearotp};