// Registration.js
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
// ...
import './Loginpage.css';
import LoginPage from './LoginPage';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // Include other registration fields here
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-api-endpoint.com/register', formData);
      console.log('Registration successful:', response.data);
      // Redirect to a success page or perform other actions.
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure (e.g., display an error message).
    }
  };
  const handlereg = ()=> {
    Navigate('/login');
  }
  return (
    <div className="center">
    <form class="form" style={{ backgroundColor: '#212529' }} onSubmit={handleSubmit}>
      {/* Your registration form fields go here */}


      <p id="heading">Registration</p>
      <div class="field">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
        />
      </div>
      <div class="field">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
      </div>
      <div class="field">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
        />
      </div>
      {/* Add other registration fields here */}
      <div class="text-center mt-3">
        <button type="submit" onClick={handlereg} className="button1">Register</button>
      </div>
    </form>
  </div>
  );
}

export default Registration;
