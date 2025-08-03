import {useLocation, useNavigate} from 'react-router-dom'
import Playlist from './Playlist'
import { useRef } from 'react';
import { useState } from 'react';
import CustomAudioPlayer from './CustomAudioPlayer';
import Card from './Card'
import '@fontsource/poppins';
import { useEffect } from 'react';

export default function Home(){

const Navigate = useNavigate();
const location = useLocation()
const username=location.state;


    const [songname,setSongName]=useState('')
    const [musicproducer,setMusicProducer]=useState('')
    const [singer,setSinger]=useState('')
    const [composer,setComposer]=useState('')
    const [lyricswriter,setLyricswriter]=useState('')
    const [imageurl,setImageUrl]=useState(null)
    const [audiourl,setAudioUrl]=useState(null)
    const [songUserName,setsongUserName]=useState()

    const [searchsong,setsearchsong]=useState('')
    const [songArray,setSongArray]=useState([])
    const [showprofile,setShowProfile]=useState(false)
    const [recommendArray,setRecommendArray]=useState([])
    const [showRecommend,setShowRecommend]=useState(true)
    const [recommendLoaded,setRecommendLoaded]=useState(false)

    useEffect(()=>{
     recommend();
    },[])

useEffect(()=>{
      if(searchsong===''){
      setShowRecommend(true)
      setSongArray([])
    }
},[searchsong])


    function toggleprofile(){
      if(showprofile==true){
        setShowProfile(false)
      }
      else{
        setShowProfile(true)
      }
    }




    async function recommend(){
                     console.log('recommend called')
                  let r = await fetch('https://flacify.onrender.com/api/Recommend',{
                   method:'post',
                   body:JSON.stringify({username}),
                    credentials: 'include',
                   headers:{
                     'Content-Type':'application/json'
                   }})

                   const result = await r.json()
                   console.log('suggestion sare',result.songs)
                   setRecommendArray(result.songs)
                   setRecommendLoaded(true)
             
                 }

    
                   async function updatestreams(audiourl){
                     console.log('fun called audio')
                   await fetch('https://flacify.onrender.com/api/UpdateStreams',{
                   method:'post',
                   body:JSON.stringify({audiourl}),
                    credentials: 'include',
                   headers:{
                     'Content-Type':'application/json'
                   }})
             
                 }
    

    async function SearchSong(){
      console.log('search called')
      
           let result = await fetch('https://flacify.onrender.com/api/Searchsong',{
               method:'post',
               body:JSON.stringify({searchsong}),
                credentials: 'include',
               headers:{
                 'Content-Type':'application/json'
               }})

           let r = await result.json()
           setSongArray(r)
           setShowRecommend(false)

    }


async function logout(){

           let result = await fetch('https://flacify.onrender.com/api/Logout',{
               method:'post',
               body:JSON.stringify({}),
                credentials: 'include',
               headers:{
                 'Content-Type':'application/json'
               }})

               Navigate('/',{replace:true})

           let r = await result.json()


}
console.log(singer,composer)
    
return(
    <>
     <div className="h-screen w-screen bg-black">
      {/* =============================================================================== */}


      
      <div className="w-screen h-[50px] bg-gradient-to-b from-black to to-blue-950 flex items-center shadow-lg shadow-black ">
        
        <div className=' h-[50px] w-[90px] bg-white'>
          <img src='https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png' className='h-[50px] w-[130px]' role='button' onClick={()=>{toggleprofile()}}></img>
          
        </div>
        <div className='h-[10px] w-[150px] relative bottom-[25px]'>
          
        </div>

        
        
       <button onClick={()=>{logout()}} className="bg-gradient-to-r from-slate-600 to-blue-900 text-white rounded-none absolute left-[1434px] shadow-lg shadow-black" >Log Out </button>
       <button onClick={()=>{Navigate('/UploadSong',{state:username})}} className="bg-gradient-to-r from-slate-600 to-blue-900 text-white rounded-none absolute left-[1280px]  shadow-lg shadow-black">Upload Song <span className=''></span></button>

       <input type='text' onChange={(e)=>{setsearchsong(e.target.value);}} placeholder='What do you want to play ?' className='pl-4 h-[40px] w-[400px] bg-gradient-to-r from-slate-600 to-blue-900 text-white relative left-[320px] rounded-md  shadow-lg shadow-black'></input>
       <button onClick={()=>{SearchSong()}} className='relative pl-4 left-[325px] h-[40px] flex items-center bg-gradient-to-r from-slate-600 to-blue-900 text-white  shadow-lg shadow-black'>Search</button>
       <button onClick={()=>{Navigate('/YourSongs',{state:username})}} className="bg-gradient-to-r from-slate-600 to-blue-900 text-white rounded-none absolute left-[1136.5px]  shadow-lg shadow-black">Your Songs</button>
      </div>

      <Playlist username={username} audiourl={audiourl} setSongName={setSongName} setAudioUrl={setAudioUrl} setImageUrl={setImageUrl} setSinger={setSinger} setMusicProducer={setMusicProducer} setComposer={setComposer} setLyricswriter={setLyricswriter} setsongUserName={setsongUserName}/>
        {
          showprofile?<div className='bg-white h-[60px] w-[210px] absolute top-[50px] left-[0px] flex items-center justify-center rounded-md border-[2px] border-blue-700 '><h2 className='text-black text-[30px] font-poppins'>{username}</h2></div>:<div></div>
        }


      {/* ///////////////////////////////////////// AUDIO PLAYER ///////////////////////////////// */}

      <div className=' bg-from-black to to-blue-950 h-[677px] w-[400px] absolute bottom-[2px] right-[0px] border-[2px] border-gray-800'>
       
       <div className=''>
        <div className='p-2'>
          <img src={imageurl} className='border-[1px] border-blue-800'></img>
        </div>
        <CustomAudioPlayer songname={songname} audiourl={audiourl} singer={singer} composer={composer} lyricist={lyricswriter} UploadedBy={songUserName} musicproducer={musicproducer} username={username} imageurl={imageurl}/>
       </div>

       

       

       
      </div>
      {/* ////////////////////////////////middle component/////////////////////////////// */}

      <div className=' p-4 bg-gradient-to-b [#121212] from-slate-900 h-[679px] w-[886px] absolute left-[250px] top-[50px] flex flex-wrap gap-4 overflow-auto '>
         
    
        {songArray.map(
          (element,index)=>{
            return(<Card key={index} username={element.username} songname={element.songname} imageurl={element.imageurl} streams={element.streams}
              onClick={()=>{
                setSongName(element.songname);
                setSinger(element.singer);
                setComposer(element.composer);
                setMusicProducer(element.musicproducer);
                setLyricswriter(element.lyricswriter);
                setAudioUrl(element.audiourl);
                setImageUrl(element.imageurl);
                setsongUserName(element.username);
                updatestreams(element.audiourl);
                
              }


              } >

              </Card>)
          }
        )}

         {showRecommend?recommendArray.map(
          (element,index)=>{
            return(<Card key={index} username={element.username} songname={element.songname} imageurl={element.imageurl} streams={element.streams}
              onClick={()=>{
                setSongName(element.songname);
                setSinger(element.singer);
                setComposer(element.composer);
                setMusicProducer(element.musicproducer);
                setLyricswriter(element.lyricswriter);
                setAudioUrl(element.audiourl);
                setImageUrl(element.imageurl);
                setsongUserName(element.username);
                updatestreams(element.audiourl);
                
              }


              } >

              </Card>)
          }
        ):<div></div>}

            {
          recommendLoaded?<div/>: <div className='flex absolute top-[320px] left-[290px] animate-pulse'>
          <h2 className='text-[30px] text-gray-400'>Loading Recommendation...</h2>
         </div>
        }

        </div>

      {/* =============================================================================== */}
     </div>
    </>
)
}


