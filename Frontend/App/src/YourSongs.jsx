import {useState,useEffect} from 'react'
import { useLocation } from 'react-router'
import { Trash } from "lucide-react";


export default function YourSongs(){

    const location = useLocation()
    const username1 = location.state
    const[array,setArray]=useState([])
    const[deleted,setDeleted]=useState(false)
    console.log(username1)


                async function fetchdata(){
                    console.log('called')
            
            let result = await fetch('https://flacify.onrender.com/api/YourSongs',{
            method:'post',
            body:JSON.stringify({username1}),
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const r = await result.json()
        setArray(r.result)
        console.log(r.result)


        }

    useEffect( ()=>{
    
        fetchdata()
        

    },[])

    
    async function deletesong(imageurl,songname){
        let result = await fetch('https://flacify.onrender.com/api/DeleteSong',{
            method:'post',
            body:JSON.stringify({imageurl,songname,username1}),
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            }}
        )
        let r = await result.json()
        if(r.deleted==true){
            window.location.reload()
        }
        
    }



    return(
        <>
        <div className="h-screen w-screen bg-gradient-to-b from-slate-900 to-black flex-col gap-3 flex items-center justify-center">
         <h1 className='text-white'><b>Your Uploaded Songs</b></h1>

<div className='flex flex-col gap-2 items-center overflow-auto h-[600px] w-[600px] p-4'>
             {
            array.map((element,index)=>(
                
                    <div key={index} className='h-[145px] w-[500px] rounded-md border-[1px] bg-white border-gray-500 flex justify-start items-center shadow-sm shadow-black relative top-[120px]'>
                        <div className='h-[140px] w-[140px] flex justify-center items-center'>
                            <img src={element.imageurl}></img>
                            </div>
                     <div className='relative left-[30px]'>
                        <h2 className='text-black '><b>Song -</b> {element.songname}</h2>
                        <h2 className='text-black '><b>Singer -</b> {element.singer}</h2>
                        <h2 className='text-black '><b>Composer -</b> {element.composer}</h2>
                        <h2 className='text-black '><b>Music Producer -</b> {element.musicproducer}</h2>
                        <h2 className='text-black '><b>Lyricist -</b> {element.lyricswriter}</h2>
                        </div>

                        <div className='bg-gray-500 h-[30px w-[30px] flex justify-center' role='button' onClick={()=>{deletesong(element.imageurl,element.songname)}}>
                            <Trash className='h-[20px] w-[20px] text-black absolute top-2 right-2 hover:opacity-45'></Trash>
                        </div>
                    </div>
                    
                
            ))

         }

</div>
        </div>
        </>
    )
}