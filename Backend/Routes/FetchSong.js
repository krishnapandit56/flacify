const express = require('express')
const verifyToken = require('../Middlewares/verifyToken')
const router = express.Router()
const SongModel = require('../Schemas/songSchema')

router.post('/',verifyToken,async(req,res)=>{
    
const result = await SongModel.findOne(req.body)
res.json({result})
console.log('fetch is : ',result)

})

module.exports = router;