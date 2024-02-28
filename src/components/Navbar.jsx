import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import toast from 'react-hot-toast'

const Navbar = () => {
  const user = useSelector((state)=>state.auth.user)
  const dispatch =  useDispatch()
  const handleLogout = async() =>{
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{
        credentials: 'include'
      });

      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        dispatch(logout());

      }
    } catch (error) {
      console.log(error.message);
    } 
  }
  return (
   <nav className='navbar'>
    <div>
      <img src="/netflix-1.png" alt="netflix logo"  width={150} />
    </div>
    {
      user && <div className='nav-right'>
        <h2>Welcome, {user.name}</h2>
        <button className='form-btn' onClick={handleLogout}>Logout</button>
      </div>
    }
   </nav>
  )
}

export default Navbar