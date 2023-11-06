import React from 'react';
import NavBar from './component/NavBar/navabar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/NavBar/Login'; // Import the Login component
import { Navigate } from 'react-router-dom';
import Registration from './component/NavBar/Registration';
function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<Navigate to={'/login'} />} />
          <Route path={'/login'} element={<Login />} /> {/* Add this line */}
          <Route path={'/registration'} element={<Registration />} />
          <Route path={'/contact/list'} element={<contactlist />} />
          {/* Other routes for your contact manager */}
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
