const express = require('express')
const likedSongModel = require('../Schemas/likedSongSchema')
const router = express.Router()
const verifyToken = require('../Middlewares/verifyToken')

router.post('/',verifyToken,async(req,res)=>{
    const username=req.body.username
    const audiourl = req.body.audiourl
    const songname = req.body.songname
    

    const result = await likedSongModel.findOne({username,audiourl,songname})
    
    let liked=null
    if(result){
        liked=true
    }
    else{
        liked=false
    }
    console.log(songname,'song is : ',liked)
    res.json({liked})

})

module.exports = router