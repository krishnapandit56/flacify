const express = require('express')
const router = express.Router()
const verifyToken = require('../Middlewares/verifyToken')
const songModel = require('../Schemas/songSchema')
const likedModel = require('../Schemas/likedSongSchema')


router.post('/',verifyToken,async(req,res)=>{
 console.log(req.body)

try{
    console.log(req.body)
     let result = await songModel.deleteOne({imageurl:req.body.imageurl,username:req.body.username1,songname:req.body.songname})
     let r = await likedModel.deleteOne({audiourl:req.body.audiourl})
     res.json({deleted:true})

}
 catch(e){
   res.json({message:'there was an error , please try again .'})
 }
}
)

module.exports = router