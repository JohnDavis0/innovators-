import React from "react";
import './NavBar.css';
let NavBar = ()=>{
    return(
        <React.Fragment>
            <nav class="navbar navbar-dark bg-dark navbar-expand-sm">
                <div class="container">
                <a class="navbar-brand" href="/contacts/about">INNOVERTERS</a>
                </div>
            </nav>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-md">
                    
                <a class="navbar-brand" href="/contacts/list"><center>CONTACT MANAGER</center></a>
                    
                </div>
                <div className="nav-button"><a href='/login'>logout</a></div>
            </nav>
<body>
    <header>
        <nav>
            <ul>
                <li class="nav-button"><a href="/contacts/login/registration">add new account</a></li>
            </ul>
        </nav>
    </header>

</body>
        </React.Fragment>

    )
}
export default NavBar;