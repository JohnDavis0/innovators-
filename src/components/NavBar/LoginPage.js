import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loginpage.css'; 
import './Registration.js';
import supabase from '../../backend/supabase.js';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const { user, error } = await supabase.auth.signIn({
        email: username, // You can use the username as the email for login
        password,
      });
  
      if (error) {
        alert('Login failed. Please check your username and password.');
      } else {
        alert('Login successful!'); // You can also redirect the user to another page.
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in.');
    }
  };
  
  

  const handleRegistration = () => {
    navigate('/contacts/login/registration');
  }

  return (
    <div className="center" >
      <br></br>
      <br></br>
      <form className="form" style={{ backgroundColor: '#212529' }}>
        <p id="heading">Login</p>
        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          </svg>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="login-input" />
        </div>
        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          </svg>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="login-input" />
        </div>
        <div className="text-center mt-3"> {/* Centering the button */}
          <button type="submit" onClick={handleLogin} className="button1">Login</button>
        </div>
      </form>
    </div>
  );
  
}

export default LoginPage;