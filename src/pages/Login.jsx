import { userStore } from '../store/userStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from "react-router-dom";
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

      //       const isLoggedIn = userStore.getState().isLoggedIn;
      //       if (isLoggedIn) {
      //         // If the user is logged in, navigate to the "/home" route.
      //         navigate("/home");
      //       }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred during registration')
    }
  }

  // Text content for the heading and paragraphs.
  //   const text = {
  //     heading: "Login Page",
  //     intro: "login here...",
  //     loremIpsum:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
  //   };

  //   // Render the component content.
  return (
    //     <>
    //       <nav>
    //         {/* Create a navigation menu with links to the login and sign-up routes. */}
    //         <ul className="app-ul">
    //           <li className="app-li">
    //             <Link to="/">Login</Link>
    //           </li>
    //           <li className="app-li">
    //             <Link to="/register">Sign Up</Link>
    //           </li>
    //         </ul>
    //       </nav>
    //
    <div className="app-container">
      <div className="input-container">
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
      </div>
    </div>
    //     </>
  )
}

// // SUMMARY

// // This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.
