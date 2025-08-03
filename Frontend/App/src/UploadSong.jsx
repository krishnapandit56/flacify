import { useState,useEffect } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import UploadAudio from "./UploadAudio"
import UploadImage from "./UploadImage"

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";


export default function(){

    const location = useLocation();
    const username = location.state;

    const Navigate = useNavigate()
    const [showaudioupload,showAudioUpload] = useState(false)
    const [showimageupload,showImageUpload] = useState(false)
    const [audiofile,setaudiofile]=useState(null)
    const [imagefile,setimagefile]=useState(null)
    const [isuploaded,setIsUploaded]=useState(false)
    const [uploadmessage,setUploadMessage]=useState('')
    const [gotimg,setGotImg]=useState(false)
    const [gotaudio,setGotAudio]=useState(false)


    const [songname,setSongName]=useState('')
    const [musicproducer,setMusicProducer]=useState('')
    const [singer,setSinger]=useState('')
    const [composer,setComposer]=useState('')
    const [lyricswriter,setLyricswriter]=useState('')
    const [imageurl,setImageUrl]=useState(null)
    const [audiourl,setAudioUrl]=useState(null)
    const [genre,setGenre]=useState('')
    const [mood,setMood]=useState('')
    const [language,setLanguage]=useState('')

    

    useEffect(()=>{
      if(gotimg ==true && gotaudio == true){
        UploadSong()
        
      }
    },[gotimg,gotaudio])

    // //////////////////////////////////////////////////////////////////////////////////
    async function uploadImage(){

      const formData = new FormData();
      formData.append('file',imagefile)
      formData.append('upload_preset','flacifyAudio')
      formData.append('cloud_name','dvvjgdoqp')

      const res = await fetch('https://api.cloudinary.com/v1_1/dvvjgdoqp/image/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json();
      setImageUrl(data.secure_url)
      

      if(data.secure_url){
        setGotImg(true)
      }

    }
    // ////////////////////////////////////////////////////////////////////////////////////
   
        async function uploadAudio(){

      const formData = new FormData();
      formData.append('file',audiofile)
      formData.append('upload_preset','flacifyAudio')
      formData.append('cloud_name','dvvjgdoqp')

      const res = await fetch('https://api.cloudinary.com/v1_1/dvvjgdoqp/video/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json();
      setAudioUrl(data.secure_url)

      if(data.secure_url){
        setGotAudio(true)
      }
    

    }
    // ////////////////////////////////////////////////////////////////////////////

    function uploadingStatus(){
      setUploadMessage('Uploading Audio And Image ...')
    }

    // ///////////////////////////////////////////////////////////////////////////

    async function UploadSong(){
      console.log('upload song called !!')
      let result = await fetch('https://flacify.onrender.com/UploadSong',{
        method:'post',
        body:JSON.stringify({songname,singer,composer,musicproducer,lyricswriter,imageurl,audiourl,username,genre,mood,language,streams:0}),
        credentials:'include',
        headers:{
          'Content-type':'application/json'
        }
      })

      let r = await result.json()
      setUploadMessage(r.message)
    }

    return(
        <>
        
        <div className="h-screen w-screen bg-gradient-to-b from-slate-900 to-black flex justify-center overflow-auto ">
            {/* ============================================== */}
            <h2 className="text-[30px] absolute top-[2px] text-white"><b>Song Details</b></h2>

            <div className="bg-white border-[3px] h-[669px] w-[500px] relative top-[55px] overflow-auto flex flex-col gap-5 shadow-lg shadow-white">
                

              <div className="relative left-2 w-[400px] h-[60px]">
                <h2 className="text-black"><b>Song Name</b> (Only Song Name No Artist Name)</h2>
              <input type='text' onChange={(e)=>{setSongName(e.target.value)}} placeholder="Enter Song Name" className="bg-white text-black border-[2px] border-dotted w-[300px] "></input>
              </div>

                            <div className="relative left-2 w-[400px] h-[60px]">
                <h2 className="text-black"><b>Singer</b></h2>
              <input type='text' onChange={(e)=>{setSinger(e.target.value)}} placeholder="Enter Singer Name" className="bg-white text-black border-[2px] border-dotted w-[300px] "></input>
              </div>

              <div className="relative left-2 w-[455px] h-[60px]">
                <h2 className="text-black"><b>Composer</b> ( Enter Real Name Not Artist Name )</h2>
              <input type='text' onChange={(e)=>{setComposer(e.target.value)}} placeholder="Enter composer Name" className="bg-white text-black border-[2px] border-dotted w-[300px]"></input>
              <h2 className="text-[15px] text-red-600 relative">(if there are multiple composers then write their names with comma)</h2>
              </div>

               <div className="relative left-2 top-[10px] w-[400px] h-[60px]">
                <h2 className="text-black"><b>Music Producer</b></h2>
              <input type='text' onChange={(e)=>{setMusicProducer(e.target.value)}} placeholder="Enter Music Producer Name" className="bg-white text-black border-[2px] border-dotted w-[300px]"></input>
              
              </div>

              <div className="relative left-2 w-[440px] h-[60px]">
                <h2 className="text-black"><b>Lyrics Writers</b></h2>
              <input type='text' onChange={(e)=>{setLyricswriter(e.target.value)}} placeholder="Enter Lyrics Writer Name" className="bg-white text-black border-[2px] border-dotted w-[300px] "></input>
              <h2 className="text-[15px] text-red-600 relative">(if there are multiple lyricist then write their names with comma)</h2>
              </div>

<div>
                <label className="text-black relative left-2 w-[400px] h-[60px]"><b>Select Mood</b></label>
                <br></br>
                <select  className="relative left-2 bg-white text-gray-600 border-gray-500 border-[1px] border-dotted" onChange={(e)=>{setMood(e.target.value)}}>
<option value="">Select</option>
<option value="happy">Happy</option>
<option value="sad">Sad</option>
<option value="romantic">Romantic</option>
<option value='dark'>Dark</option>
<option value="uplifting">Uplifting</option>
<option value="energetic">Energetic</option>
<option value="calm">Calm</option>
<option value="chill">Chill</option>
<option value="epic">Epic</option>
                </select>
              </div>
<div>
  <label className="text-black relative left-2 w-[400px] h-[60px]">
    <b>Select Language</b>
  </label>
  <br />
  <select
    
    className="relative left-2 bg-white text-gray-600 border-gray-500 border-[1px] border-dotted"
    onChange={(e) => {
      setLanguage(e.target.value);
    }}
  >
    <option value="">Select</option>

    <option value="arabic">Arabic</option>
    <option value="bengali">Bengali</option>
    <option value="chinese">Chinese (Mandarin)</option>
    <option value="english">English</option>
    <option value="french">French</option>
    <option value="german">German</option>
    <option value="gujarati">Gujarati</option>
    <option value="hindi">Hindi</option>
    <option value="italian">Italian</option>
    <option value="japanese">Japanese</option>
    <option value="kannada">Kannada</option>
    <option value="korean">Korean</option>
    <option value="malayalam">Malayalam</option>
    <option value="marathi">Marathi</option>
    <option value="portuguese">Portuguese</option>
    <option value="punjabi">Punjabi</option>
    <option value="russian">Russian</option>
    <option value="spanish">Spanish</option>
    <option value="tamil">Tamil</option>
    <option value="telugu">Telugu</option>
    <option value="urdu">Urdu</option>

    <option value="other">Other</option>
  </select>
</div>

              <div className="relative left-2 w-[400px] h-[60px]">
                <h2 className="text-black"><b>Upload Audio File</b></h2>
                
                <button onClick={()=>{showAudioUpload(true)}} className="text-gray-600 rounded-none bg-white border-[1px] border-gray-600 h-[10px] flex justify-end items-center">Upload Wav File</button>
              </div>

              <div className="relative left-2 w-[400px] h-[60px]">
                <h2 className="text-black"><b>Upload Cover</b></h2>
                <h2 className="text-[15px] text-red-600 relative">(Resolution must be 1080x1080 or greater)</h2>
                <button onClick={()=>{showImageUpload(true)}} className="text-gray-600 rounded-none bg-white border-[1px] border-gray-600 h-[10px] flex justify-end items-center">Upload Image</button>
              </div>

              <div>
                <label className="text-black relative left-2 w-[400px] h-[60px]"><b>Select Genre</b></label>
                <br></br>
                <select id='genre' className="relative left-2 bg-white text-gray-600 border-gray-500 border-[1px] border-dotted" onChange={(e)=>{setGenre(e.target.value)}}>
<option value="">Select</option>
<option value="acoustic">Acoustic</option>
<option value="alternative">Alternative</option>
<option value="blues">Blues</option>
<option value='bollywood'>Bollywood</option>
<option value="classical">Classical</option>
<option value="country">Country</option>
<option value="dance">Dance</option>
<option value="edm">EDM</option>
<option value="folk">Folk</option>
<option value="funk">Funk</option>
<option value="gospel">Gospel</option>
<option value="hiphop">Hip-Hop</option>
<option value='indian'>Indian</option>
<option value="indie">Indie</option>
<option value="jazz">Jazz</option>
<option value="kpop">K-Pop</option>
<option value="latin">Latin</option>
<option value="lofi">Lo-fi</option>
<option value="metal">Metal</option>
<option value="pop">Pop</option>
<option value="punk">Punk</option>
<option value="rnb">R&B</option>
<option value="rap">Rap</option>
<option value="reggae">Reggae</option>
<option value="rock">Rock</option>
<option value="soul">Soul</option>
<option value="techno">Techno</option>
<option value="trap">Trap</option>
<option value="world">World</option>

                </select>
              </div>

              <div className="relative left-2 w-[400px] h-[60px]">
                <input type='checkbox' className='  bg-white  border-[2px] border-black h-[15px] w-[15px] accent-black'></input>
                 <span className="text-black relative bottom-[2px] left-[2px]">I accecpt the terms and conditions below</span>
                 <br></br>
                 <a href='/TermsAndConditions'>Terms And Conditions</a>
              </div> 

              <div className="relative bottom-[10px]">
                <button onClick={()=>{uploadingStatus();uploadAudio();uploadImage();}} className="text-black rounded-none bg-white border-[1px] border-gray-600 h-[10px] flex justify-end items-center relative left-[190px] bottom-[20px]">Submit</button>
              </div>

              
                <h2 className="text-black absolute top-[635px] left-[140px] animate-pulse ">{uploadmessage}</h2>
              

        
            </div>
            {showaudioupload && (
            <div className="fixed z-50 flex justify-center items-center bg-black bg-opacity-30 h-screen w-screen">
                <div className="bg-white p-6 rounded shadow-lg z-50 max-h-[90vh] overflow-auto h-[400px] w-[600px] flex items-center justify-center ">
                    <UploadAudio sendaudiofile={(audiofile)=>{setaudiofile(audiofile)}}/>
                        
                    <button onClick={()=>{showAudioUpload(false)}} className="absolute top-[480px] bg-white border-[1px] border-black text-black">Go Back</button>
                </div>
                </div>
                )}

                            {showimageupload && (
            <div className="fixed z-50 flex justify-center items-center bg-black bg-opacity-30 h-screen w-screen">
                <div className="bg-white p-6 rounded shadow-lg z-50 max-h-[90vh] overflow-auto h-[400px] w-[600px] flex items-center justify-center ">
                    <UploadImage sendimagefile={(imagefile)=>{setimagefile(imagefile)}}/>
                        
                    <button onClick={()=>{showImageUpload(false)}} className="absolute top-[480px] bg-white border-[1px] border-black text-black">Go Back</button>
                </div>
                </div>
                )}

            {/* ============================================== */}
        </div>
        </>
    )
}