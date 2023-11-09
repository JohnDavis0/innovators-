// Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../backend/supabase';
import './Loginpage.css';


function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // Include other registration fields here
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Directly insert a new row into the UserAuth table
    const { data, error } = await supabase
      .from('UserAuth')
     .upsert([
    { username: formData.username, password: formData.password },
    ], {
    onConflict: ['username'],
  });

if (error) {
  alert('User with the same username already exists. Please choose a different username.');
  return;
}
  
    // Redirect to a success page or perform other actions.
    navigate('/login');
  };
  
 
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
        <button type="submit" onClick={handleSubmit} className="button1">Register</button>
      </div>
    </form>
  </div>
  );
}

export default Registration;
