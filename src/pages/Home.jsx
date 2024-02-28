import React, { useEffect } from 'react'
import Loading from './Loading';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading } from '../redux/slices/authSlice';
import Login from './Login';


const Home = () => {
  const loading = useSelector(state => state.auth.loading)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const getUser = async () => {
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user`,{
       
        credentials: 'include'
      });
      const data = await res.json()
      if (data.success) {
        dispatch(login(data.user));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUser()
  }, [])

  if (loading) {
    return <Loading/>
  }

  if (!user) {
    return <Login />
  }

  return (
    <div>
      <Navbar />
      
     
    </div>
  )
}

export default Home