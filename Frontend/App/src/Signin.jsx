import { Link ,useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Signin(){

    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const [userExist,setUserExist] = useState(false)
    const Navigate = useNavigate();
    let token=''

         
             async function signin(){
                 
               let result = await fetch('https://flacify.onrender.com/api/Signin',{
               method:'post',
               body:JSON.stringify({username,password}),
                credentials: 'include',
               headers:{
                 'Content-Type':'application/json'
               }})
         
               let r = await result.json()
               
               setMessage(r.message)
               setUserExist(r.userexist)
               token = r.token
               if(r.userexist==true){
                setUserName(r.username)
                Navigate('/Home',{state:r.username})
               }
             }

    return(
        <>
         <div className="h-screen w-screen bg-white  ">
            <div className="h-[500px] w-[500px] absolute left-[490px] bottom-[350px]">
                <img src='flacify.png'></img>
            </div>
            <div style={{backgroundColor:"#0078D4"}} className="flex flex-col gap-2 absolute top-[210px] left-[570px] border-[1px] border-black border-dotted h-[410px] w-[350px] items-center rounded-md">
                <h2 className="text-white text-[40px] text-center"><b>Sign In</b></h2>
                <h2 className="text-white text-[20px]">username</h2>
                <input type='text' placeholder="enter username" onChange={(e)=>{setUserName(e.target.value)}} className="bg-white border-2 h-[30px] w-[250px] text-black"></input>
                {/* <h2 className="text-white text-[20px]">email</h2> */}
                {/* <input type='text' placeholder="enter email" onChange={(e)=>{setEmail(e.target.value)}} className="bg-white border-2 h-[30px] w-[250px] text-black"></input> */}
                <h2 className="text-white text-[20px]">password</h2>
                <input type='password' placeholder="enter password" onChange={(e)=>{setPassword(e.target.value)}} className="bg-white border-2 h-[30px] w-[250px] text-black"></input>

                <button className="bg-white text-black relative top-[8px]" onClick={()=>{signin()}}>Sign In</button>
                <Link to={'/Signup'} className="text-white hover:text-blue-200"><u>don't have an account ?</u></Link>
                <h2 className="text-red-600 bg-white"><b>{message}</b></h2>
            </div>
           

           
         </div>
        </>
    )
}