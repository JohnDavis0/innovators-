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
import app from './App.css';
function App() {
  return (
    <Router>
      <React.Fragment>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<Navigate to={'/login'} />} />
          <Route path={'/login'} element={<Login />} /> {/* Add this line */}
          <Route path={'/registration'} element={<Registration />} />
          
          {/* Other routes for your contact manager */}
        </Routes>
      </React.Fragment>
    </Router>
  );
}


let App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={'/contacts/list'}/>}/>
        <Route path={"/NavBar/login"} element={<Login />} /> {/* Add this line */}
        <Route path={"/contacts/list"} element={<ContactList/>}/>
        <Route path={'/NavBar/registration'} element={<Registration />} />
        <Route path={"/contacts/add"} element={<AddContact/>}/>
        <Route path={"/contacts/view/:contactId"} element={<ViewContact/>}/>
        <Route path={"/contacts/edit/:contactId"} element={<EditContact/>}/>
      </Routes>
    </React.Fragment>
  );
};
export default App;
