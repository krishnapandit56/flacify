import CustomAudioPlayer from "./CustomAudioPlayer"
import { Eye } from "lucide-react"

export default function ({username,songname,imageurl,onClick,streams}){
    
    

    return(
        <>
         <div onClick={onClick} className="h-[290px] w-[190px] bg-gray-800 border-[1px] border-dotted border-black flex justify-center shadow-lg shadow-gray-950 " role="button" >
            <div>
                <img src={imageurl}></img>
                <div className="flex items-center flex-col">
                    <h2 className="text-white text-[17px] px-2 flex justify-center items-center break-words line-clamp-2"><b>{songname}</b></h2>
                <h2 className="text-white flex justify-center">{username}</h2>
                </div>
               
                <h2 className="text-gray-400 flex justify-around ">{streams} streams</h2>
            </div>

            
 
         </div>
        </>
    )
}