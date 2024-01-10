import { userStore } from '../store/userStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userStoreState = userStore.getState();

  const onRegisterClick = async () => {
    if (!username || !email || !password) {
      alert('Please enter username, email, and password');
      return;
    }

    try {
      await userStoreState.handleRegister(username, email, password);
      console.log('username ', username);

      if (username && password) {
        const appContainer = document.getElementById('app-container');
        appContainer.innerText = `Registration successful click on HOME`;
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    }
  };

  //   Render the component content.
  return (
    // <>
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
    //       {/* Render the 'Logos' component. */}
    //       <Logos />
    <div
      className="app-container"
      id="app-container"
    >
      <div className="input-container">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={onRegisterClick}>Register</button>
      </div>
    </div>
    //  </>
  )
}

// // SUMMARY

// // This code defines the Register component, which handles user registration functionality. It imports necessary components, hooks, and the user store, and it defines state variables for email, username, and password. The component provides a form for entering registration details, handles the signup button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.
