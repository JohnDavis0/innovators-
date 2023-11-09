import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css'; 
import supabase from '../../backend/supabase.js';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('UserData')
        .select('*')
        .eq('user_id', userId); // Assuming there's a column 'user_id' in 'UserData' linking to 'UserAuth' id

      if (error) {
        console.error(error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check if the user with the provided username and password exists in the 'UserAuth' table
      const { data: users, error } = await supabase
        .from('UserAuth')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) {
        alert('An error occurred while checking credentials.');
        console.error(error);
        return;
      }

      if (users) {
        alert('Login successful!'); 
        navigate('');
      } else {
        alert('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in.');
    }
  };
  

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