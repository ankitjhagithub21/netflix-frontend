import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../redux/slices/authSlice'

const Login = () => {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialData = {
    email: "",
    password: "",
  }

  const [user, setUser] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        credentials:"include",
        body: JSON.stringify(user)

      })
      const data = await res.json()
      
      if (data.success) {
        toast.success(data.message)
        dispatch(login(data.user))
        setUser(initialData)
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Failed to login.")
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <section className='auth-page'>
      <div className="overlay">
        <div className="form-container">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" className='form-input' placeholder='Enter Your Email' name='email' value={user.email} onChange={handleChange} required autoComplete='off' />
            <input type="password" className='form-input' placeholder='Enter Your Password' name='password' value={user.password} onChange={handleChange} required autoComplete='off' />
            <button className='form-btn' type='submit'>{loading ? 'Loading...' : 'Sign In'}</button>
          </form>
          <p className='sign-up-now'>New to Netflix? <Link to={"/register"}> Sign up now</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login