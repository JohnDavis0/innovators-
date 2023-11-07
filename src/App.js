import './App.css'
import React from 'react';
import NavBar from './component/NavBar/navabar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/NavBar/Login'; // Import the Login component
import { Navigate } from 'react-router-dom';
import Registration from './component/NavBar/Registration';
import contactlist from './component/NavBar/contactlist';
import addcontact from './component/NavBar/addcontact';
import editcontactlist from './component/NavBar/editcontactlist';
import viewcontact from './component/NavBar/viewcontact';

function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<Navigate to={'/login'} />} />
          <Route path={'/login'} element={<Login />} /> {/* Add this line */}
          <Route path={'/registration'} element={<Registration />} />
          <Route path={'/addcontact'} element = {<addcontact />} />
          <Route path={'/contactlist'} element = {<contactlist />} />
          <Route path={'/editcontactlist'} element = {<editcontactlist />} />
          <Route path={'/viewcontact'} element = {<viewcontact />} />
          {/* Other routes for your contact manager */}
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
