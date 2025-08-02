const mongoose = require('mongoose')

const likedSongSchema = new mongoose.Schema({username:String,audiourl:String,songname:String,imageurl:String,UploadedBy:String,singer:String,composer:String,musicproducer:String,lyricist:String})

const likedSongModel = mongoose.model('likedsongs',likedSongSchema)

module.exports = likedSongModel