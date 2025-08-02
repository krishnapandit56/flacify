const express = require('express')
const songModel = require('../Schemas/songSchema')
const router = express.Router()
const verifyToken = require('../Middlewares/verifyToken')

router.post('/',verifyToken,async(req,res)=>{
   
    const username = req.body.username1

    const result = await songModel.find({username:username})
    console.log(result)
    res.json({result})

})

module.exports = router