const express = require('express');
const verifyToken = require('../Middlewares/verifyToken');
const router = express.Router();
const songModel = require('../Schemas/songSchema');


router.post('/',verifyToken,async(req,res)=>{
    
    let result = await songModel.find({
      $or: [
        { singer: { $regex: req.body.searchsong, $options: 'i' } },
        { songname: { $regex: req.body.searchsong, $options: 'i' } },
        { composer: { $regex: req.body.searchsong, $options: 'i' } },
        { musicproducer: { $regex: req.body.searchsong, $options: 'i' } },
        { lyricswriter: { $regex: req.body.searchsong, $options: 'i' } },
        { username: { $regex: req.body.searchsong, $options: 'i' } },
      ],
    })
    res.json(result)

})

module.exports = router