import React from 'react'
import Home from './pages/Home'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "./App.css"
import {Toaster} from "react-hot-toast"
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
   <BrowserRouter>
   <Toaster/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
   
   </Routes>
   </BrowserRouter>
  )
}

export default App