import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialData = {
    name: "",
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)

      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        setUser(initialData)
        navigate("/login")

      } else {
        toast.error(data.message)
      }
    } catch (error) {

      console.log(error)

    } finally {
      setLoading(false)
    }

  }
  return (
    <section className='auth-page'>
      <div className="overlay">
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" className='form-input' placeholder='Enter Your Name' name='name' value={user.name} onChange={handleChange} required autoComplete='off' />
            <input type="email" className='form-input' placeholder='Enter Your Email' name='email' value={user.email} onChange={handleChange} required autoComplete='off' />
            <input type="password" className='form-input' placeholder='Enter Your Password' name='password' value={user.password} onChange={handleChange} required autoComplete='off' />
            <button className='form-btn'>{loading ? 'Loading...' : 'Sign Up'}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register