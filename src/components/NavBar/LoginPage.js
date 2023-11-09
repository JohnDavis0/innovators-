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
      .eq('id', userId)
      .single();
  
      return data;
    } catch (error) {
       throw new Error('An error occurred while fetching user data.');
}
  };
  useEffect(() => {
    if (userData) {
    // Navigate to the contacts list page.
    navigate('/contacts/list', { state: { userData } });
    }
    }, [userData]);

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
        const userData = await fetchUserData(users.id);
        navigate('/contacts/list', {state:{userData}});
        

        

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