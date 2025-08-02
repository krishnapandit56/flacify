import { useState } from "react"

export default function UploadAudio({sendaudiofile}){
    
  
    
    const [audiofile,setAudioFile] = useState(null)
    sendaudiofile(audiofile)
    

    return(
        <>
        <div className="bg-white h-[350px] w-[550px] border-[1px] border-gray-900 flex justify-center items-center">
         
          <h2 className="text-black text-[20px] relative bottom-[50px] left-[145px]"><b>Upload your Audio File</b></h2>
          <input type='file' accept="audio/*" onChange={(e)=>{setAudioFile(e.target.files[0])}} className="relative right-[5px] text-black"></input>
          
        </div>
        </>
    )
}


