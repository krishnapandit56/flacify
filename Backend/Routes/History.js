const express = require('express')
const router = express.Router()
const verifyToken = require('../Middlewares/verifyToken')
const historyModel = require('../Schemas/historySchema')
const SongModel = require('../Schemas/songSchema')

router.post('/',verifyToken,async(req,res)=>{
    const audiourl = req.body.audiourl;
    const username = req.body.username;
    let song = await SongModel.findOne({audiourl})
    let genre = song.genre;
    let mood = song.mood;
    let language = song.language;
    

    let historyArray = await historyModel.find({username}).sort({_id:-1})
    if(historyArray.length===20){
        const oldest = historyArray[19];
        await historyModel.findByIdAndDelete(oldest._id);
        let r = historyModel({username,audiourl,genre,mood,language})
        await r.save();
    }
    else{
        let r = historyModel({username,audiourl,genre,mood,language})
        await r.save();
        console.log('history saved !!')
    }


})

module.exports = router