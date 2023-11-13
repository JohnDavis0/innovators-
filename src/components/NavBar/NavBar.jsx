import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <a className="navbar-brand nav-link ms-2" href="/contacts/list">
            CONTACT MANAGER
          </a>
          <div className="navbar-nav ms-auto d-flex align-items-center">
            <div className="nav-item mx-2">
              <a
                className="nav-link btn btn-secondary text-light"
                href="/contacts/login/registration"
              >
                Create Account
              </a>
            </div>

            <div className="nav-item mx-2">
              <a
                className="nav-link btn btn-secondary text-light"
                href="/login"
              >
                Logout
              </a>
            </div>

            <div className="nav-item mx-2">
              <a
                className="nav-link btn btn-secondary text-light"
                href="/contacts/about"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
