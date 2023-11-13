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

    // Check if the username is empty
    if (formData.username.trim() === '') {
      alert('Username cannot be empty.');
      return;
    }

    // Directly insert a new row into the UserAuth table
    try {
      const { data, error } = await supabase
        .from('UserAuth')
        .upsert(
          [
            { username: formData.username, password: formData.password },
          ],
          {
            onConflict: ['username'],
          }
        );
  
      if (error) {
        alert('Username Issue:', error);
        return;
      }
  
      // Redirect to a success page or perform other actions.
      navigate('/login');
    } catch (error) {
      alert('Username Issue:', error);
      
    }
  };
  
  
  
  
  
  
  

  
  
 
  return (
    <div className="center">
    <form className="form" style={{ backgroundColor: '#212529', maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }} onSubmit={handleSubmit}>
  <p id="heading" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>Registration</p>
  
  <div className="field" style={{ marginBottom: '15px' }}>
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      placeholder="Username"
      style={{ width: '90%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
    />
  </div>

  <div className="field" style={{ marginBottom: '15px' }}>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder="Email"
      style={{ width: '90%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
    />
  </div>

  <div className="field" style={{ marginBottom: '20px' }}>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      placeholder="Password"
      style={{ width: '90%', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da' }}
    />
  </div>

  <div className="text-center mt-3">
    <button type="submit" onClick={handleSubmit} className="button1" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
  </div>
</form>


  </div>
  );
}

export default Registration;
