const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({username:String,audiourl:String,genre:String,mood:String,language:String})

const historyModel = mongoose.model('history',historySchema)

module.exports = historyModel;