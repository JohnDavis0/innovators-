import React from "react";
import './NavBar.css';
let NavBar = ()=>{
    return(
        <React.Fragment>
            <nav class="navbar navbar-dark bg-dark navbar-expand-sm">
    <div class="container">
        <a class="navbar-brand nav-link ms-2" href="/contacts/list">CONTACT MANAGER</a>
        <div class="navbar-nav ms-auto d-flex align-items-center"> 
            <div class="nav-item mx-2 rounded-pill bg-secondary">
                <a class="nav-link text-light" href="/contacts/login/registration">Create Account</a>
            </div>
           
            <div class="nav-item mx-2 rounded-pill bg-secondary">
                <a class="nav-link text-light" href='/login'>Logout</a>
            </div>
           
            <div class="nav-item mx-2 rounded-pill bg-secondary">
                <a class="nav-link text-light" href="/contacts/about">About Us</a>
            </div>
        </div>
    </div>
</nav>



<body>

</body>
        </React.Fragment>

    )
}
export default NavBar;