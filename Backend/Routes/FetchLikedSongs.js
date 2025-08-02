const express = require('express')
const likedSongModel = require('../Schemas/likedSongSchema')
const router = express.Router()
const verifyToken = require('../Middlewares/verifyToken')

router.post('/',verifyToken,async(req,res)=>{
let result = await likedSongModel.find(req.body)

res.json({result})
console.log(result)
})

module.exports = router