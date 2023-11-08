// Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
// ...
import './Loginpage.css';

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

  return (
    <div className="center">
    <form class="form" onSubmit={handleSubmit}>
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
      <div class="btn">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
  );
}

export default Registration;
