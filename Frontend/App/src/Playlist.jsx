import { useState,useEffect } from "react"

export default function Playlist({username,audiourl,setSongName,setAudioUrl,setImageUrl,setSinger,setMusicProducer,setComposer,setLyricswriter,setsongUserName}){

    const [LikedArray,setLikedArray]=useState([])

    async function FetchSong(audiourl){
        
        let result = await fetch('http://localhost:7000/FetchSong',{
            method:'post',
            body:JSON.stringify({audiourl}),
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            }
        })
        let r = await result.json()
        setComposer(r.result.composer)
        setMusicProducer(r.result.musicproducer)
        setSinger(r.result.singer)
        setLyricswriter(r.result.lyricswriter)
        setsongUserName(r.result.username)
        
        console.log(r.result)

    }


    async function FetchLikedSongs(){
            let result = await fetch('http://localhost:7000/FetchLikedSongs',{
            method:'post',
            body:JSON.stringify({username}),
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            }
        })
        let r = await result.json()
        console.log(r.result)
        setLikedArray(r.result)
    }

    useEffect(()=>{FetchLikedSongs()},[username,audiourl])

return(
    <>
    <div className="bg-gradient-to-b [#121212] from-slate-900 h-[678px] w-[260px] border-[2px] overflow-auto border-gray-800  p-2 ">
        <div className="">
            <h2 className="text-white flex justify-center text-[30px]"><b>Liked Songs</b></h2>
        </div>

<div className="flex flex-col gap-3 pt-2">
            {
            LikedArray.map((element,index)=>{
              return(
                <div className="h-[80px] w-[230px] bg-gray-800 shadow-md shadow-black" role="button" onClick={()=>{FetchSong(element.audiourl);setSongName(element.songname);setAudioUrl(element.audiourl);setImageUrl(element.imageurl);setComposer(element.composer);setSinger(element.singer)}}>
                    <div className="h-[50px] w-[50px] relative top-[15px] left-[4px]">
                        <img src={element.imageurl} className=""></img>
                    </div>
                    <div className="bg-gray-800 flex items-center flex-col w-[160px] relative left-[60px] bottom-[45px]">
                        <h2 className="text-white text-[15px]"><b>{element.songname}</b></h2>
                        <h2 className="text-white ">{element.UploadedBy}</h2>
                    
                    </div>
                </div>
              )
            })
        }

</div>


    </div>
    </>
)
}