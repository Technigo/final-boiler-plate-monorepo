import { userStore } from '../store/userStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import './Register.css'

// // Define the 'Login' functional component.
export const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = userStore((state) => state.handleLogin)

  const onLoginClick = async () => {
    if (!userName || !password) {
      alert('Please enter username and password')
      return
    }
    try {
      await handleLogin(userName, password)
      const isLoggedIn = userStore.getState().isLoggedIn

      if (isLoggedIn) {
        navigate('/')
      }

    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred during registration')
    }
  }

  return (
    <div className="page-section">
      <div className="register-container">
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={onLoginClick}> Login </button>
        <p>or </p>
        <Link to="/register" className='register-button'>Sign Up</Link>
      </div>
    </div>

  )
}

