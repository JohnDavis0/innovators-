import React from "react";
import "./styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ContactList from "./components/contacts/ContactList/ContactList";
import AddContact from "./components/contacts/AddContact/AddContact";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import EditContact from "./components/contacts/EditContact/EditContact";
import Spinner from "./components/Spinner/Spinner";
import Registration from "./components/NavBar/Registration";
import LoginPage from "./components/NavBar/LoginPage";
import About from "./components/NavBar/about";
let App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={'/login'}/>}/>
        <Route path={"/contacts/list"} element={<ContactList/>}/>
        <Route path={"/contacts/add"} element={<AddContact/>}/>
        <Route path={"/contacts/view/:table_id"} element={<ViewContact/>} />
        <Route path={"/contacts/edit/:table_id"} element={<EditContact/>}/>
        <Route path={"/contacts/login"} element={<LoginPage/>}/>
        <Route path={"/contacts/about"} element={<About/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/contacts/login/registration"} element={<Registration/>}/>
        
      </Routes>
    </React.Fragment>
  );
};
export default App;