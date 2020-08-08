import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link className = "homeLink" to= "/">
                <img src="/images/logo.svg" width="30" height="30" className="d-inline-block align-top logo" alt=""/>
                Classroom
            </Link>
            <img src="/images/profile.png" width="30" height="30" className="d-inline-block align-top profile" alt=""/>
        </nav>
    )
}

export default Navbar;