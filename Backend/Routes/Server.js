const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config({path:'../env files/.env'})
const Signup = require('./Signup')
const Signin = require('./Signin')
const {router:sendOTP} = require('./sendOTP')
const Logout = require('./Logout')
const UploadSong = require('./UploadSong')
const cookieParser=require('cookie-parser')
const Searchsong = require('./Searchsong')
const YourSongs = require('./YourSongs')
const UpdateStreams = require('./UpdateStreams')
const Liked = require('./Liked')
const CheckLiked = require('./CheckLiked')
const FetchLikedSongs = require('./FetchLikedSongs')
const DeleteSong = require('./DeleteSong')
const FetchSong = require('./FetchSong')
const History = require('./History')
const Recommend = require('./Recommend')

app.use(cors({
  origin: 'https://flacify.vercel.app', // your frontend URL
  credentials: true                // allows cookies
}))

app.use(express.json())
app.use(cookieParser());
const MONGOURL = process.env.MONGOURL 

///////////////// Mongo connection ////////////////// 

    async function connect(){

    try{
        await mongoose.connect(MONGOURL)
    console.log('Mongodb connected !!')  
    }
    catch(e){
        console.log('Mongo cannot be connected !! ')
    }
    }
connect();

///////////////////////////////////////////////////

app.use('/Signup',Signup)
app.use('/Signin',Signin)
app.use('/sendOTP',sendOTP)
app.use('/Logout',Logout)
app.use('/UploadSong',UploadSong)
app.use('/Searchsong',Searchsong)
app.use('/YourSongs',YourSongs)
app.use('/UpdateStreams',UpdateStreams)
app.use('/CheckLiked',CheckLiked)
app.use('/Liked',Liked)
app.use('/FetchLikedSongs',FetchLikedSongs)
app.use('/DeleteSong',DeleteSong)
app.use('/FetchSong',FetchSong)
app.use('/History',History)
app.use('/Recommend',Recommend)

app.listen(7000,'0.0.0.0',()=>{
    console.log('App is running on port 7000')
})

app.get("/", (req, res) => {
  res.send("Backend working!");
});

