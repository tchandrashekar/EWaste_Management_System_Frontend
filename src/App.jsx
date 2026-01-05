import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import AdminDashboard from './admin/AdminDashboard'
import UserDashboard from './user/UserDashboard'
import PickupDashboard from './pick-up/PickupDashboard'
import Register from './auth/Register'
import CreateRequest from './user/CreateRequest'
import MyRequests from './user/MyRequests'
import AdminRequests from './admin/AdminRequests'
import AssignPickup from './admin/AssignPickup'
import MyPickups from './pick-up/MyPickups'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return(
  
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />

        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/requests" element={<AdminRequests />} />
         <Route path="/admin/assign/:id" element={<AssignPickup />} />

        <Route path="/user" element={<UserDashboard/>} />
        <Route path="/user/create-request" element={<CreateRequest/>} />
        <Route path="/user/my-requests" element={<MyRequests />} />
        
        <Route path="/pickup" element={<PickupDashboard/>} />
        <Route path="/pickup/my-pickups" element={<MyPickups />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
