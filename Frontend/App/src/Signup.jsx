import { Link } from "react-router"
import {useState} from 'react'

export default function Signup(){

    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const [otp,setOTP] = useState('')
    const [userExist,setUserExist] = useState(false)
    const [otpsent,setotpsent] = useState('Send OTP')
////////////////////////////////////////////////////
    async function signup(){
        
      let result = await fetch('https://flacify.onrender.com/api/Signup',{
      method:'post',
      body:JSON.stringify({username,email,password,otp}),
      headers:{
        'Content-Type':'application/json'
      }})

      let r = await result.json()
      setMessage(r.message)
      setUserExist(r.userexist)
    }
/////////////////////////////////////////////////////////////////

async function sendotp(){
        let result = await fetch('https://flacify.onrender.com/api/sendOTP',{
      method:'post',
      body:JSON.stringify({email}),
      headers:{
        'Content-Type':'application/json'
      }})

      let r1 = await result.json()
      setMessage(r1.message)
      setOTP(r1.otp)
      setotpsent(r1.otpsent)
      
}
////////////////////////////////////////////////
    return(
        <>
         <div className="h-screen w-screen bg-white  ">
            <div className="h-[500px] w-[500px] absolute left-[490px] bottom-[350px]">
                <img src='flacify.png'></img>
            </div>
            <div style={{backgroundColor:"#0078D4"}} className="flex flex-col gap-2 absolute top-[190px] left-[570px] border-[1px] border-black border-dotted h-[490px] w-[350px] items-center rounded-md">
                <h2 className="text-white text-[40px] text-center"><b>Sign Up</b></h2>
                <h2 className="text-white text-[20px]">username</h2>
                <input type='text'  placeholder="enter username" onChange={(e)=>{setUserName(e.target.value)}} className="bg-white border-2 h-[30px] w-[250px] text-black"></input>
                <h2 className="text-white text-[20px]">email</h2>
                <input type='text'  placeholder="enter email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-white border-2 h-[30px] w-[250px] text-black"></input>
                <h2 className="text-white text-[20px]">password</h2>
                <input type='password'  placeholder="enter password" onChange={(e)=>{setPassword(e.target.value)}} className="bg-white border-2 h-[30px] w-[250px] text-black"></input>
                <button className="bg-white text-black" onClick={()=>{sendotp()}}>{otpsent}</button>
                
                <input type='text' placeholder="Enter 6 Digit OTP" maxLength={6} onChange={(e)=>{setOTP(e.target.value)}} className="bg-white text-black"></input>

                <button onClick={()=>{signup()}} className="bg-white text-black relative top-[8px]">Sign Up</button>
                <Link to={'/Signin'} className="text-white hover:text-blue-200"><u>already have an account ?</u></Link>
                <h2 className={`${userExist?"text-red-400":"text-green-400"} bg-white text-center`}><b>{message}</b></h2>
            </div>
           

           
         </div>
        </>
    )
}