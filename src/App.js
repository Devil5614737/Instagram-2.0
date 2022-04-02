import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import {Context} from './context/Context';
import { useEffect, useState } from "react";

function App() {
  const[currentUser,setCurrentUser]=useState()


useEffect(async()=>{
const res=await fetch('https://instagram12122.herokuapp.com/users',{
  method:'GET',
  headers:({
    'x-auth-token':localStorage.getItem('token'),
    'Content-Type':'application/json'
  })
})
const data=await res.json()
setCurrentUser(data)
},[localStorage.getItem('token')])


console.log(currentUser)
  return (
    <Context.Provider value={{currentUser}} >
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </Context.Provider>
  );
}

export default App;
