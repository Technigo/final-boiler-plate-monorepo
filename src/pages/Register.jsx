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
        appContainer.innerText = `Registration successful`;
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <div className="app-container" id="app-container">
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
  );
};
