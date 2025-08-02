const express = require('express')
const router = express.Router()
const verifyToken = require('../Middlewares/verifyToken')
const songModel = require('../Schemas/songSchema')


router.post('/',verifyToken,async(req,res)=>{
 console.log(req.body)

try{
     let result = new songModel(req.body)
     let r = await result.save()
     res.json({message:'Uploaded sucessfully , You can go back now .'})
}
 catch(e){
   res.json({message:'there was an error , please try again .'})
 }
}
)

module.exports = router