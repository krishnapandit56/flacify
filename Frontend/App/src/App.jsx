import { useState } from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import Home from './Home'
import Playlist from './Playlist'
import UploadSong from './UploadSong'
import TermsAndConditions from './TermsAndConditions'
import Upload from './UploadAudio'
import YourSongs from'./YourSongs'

function App() {


  return (
    <>
    <Routes>
      <Route path='/Signin' element={<Signin/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/' element={<Signin/>}></Route>
      <Route path='/Playlist' element={<Playlist/>}></Route>
      <Route path='/UploadSong' element={<UploadSong/>}></Route>
      <Route path='/TermsAndConditions' element={<TermsAndConditions/>}></Route>
      <Route path='/Upload' element={<Upload/>}></Route>
      <Route path='/YourSongs' element={<YourSongs/>}></Route>
    </Routes>

    </>
  )
}

export default App
