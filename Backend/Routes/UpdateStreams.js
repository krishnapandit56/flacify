const express = require('express')
const verifyToken=require('../Middlewares/verifyToken')
const router = express.Router()
const songModel = require('../Schemas/songSchema')

router.post('/',verifyToken,async(req,res)=>{
    console.log(req.body)
 await songModel.updateOne({audiourl:req.body.audiourl},{ $inc: { streams: 1 }})
})

module.exports = router