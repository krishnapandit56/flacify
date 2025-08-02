const express = require('express')
const likedSongModel = require('../Schemas/likedSongSchema')
const router = express.Router()
const verifyToken = require('../Middlewares/verifyToken')

router.post('/',verifyToken,async(req,res)=>{
    const username = req.body.username;
    const songname = req.body.songname
    const audiourl = req.body.audiourl


if(req.body.liked==true){
    console.log('this is liked',req.body)
    let result = likedSongModel(req.body)
    let r  = await result.save()
}
else{
    let result = await likedSongModel.deleteOne({username,audiourl,songname})
}

})

module.exports = router