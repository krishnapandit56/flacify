const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    songname:String,
    singer:String,
    composer:String,
    musicproducer:String,
    lyricswriter:String,
    audiourl:String,
    imageurl:String,
    username:String,
    genre:String,
    mood:String,
    language:String,
    streams:Number,
    

})

const songModel = mongoose.model('songs',songSchema)

module.exports = songModel 