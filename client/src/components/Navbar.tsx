import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to={"/"}>
                <h4> Home </h4>
            </Link>
            <h4> Avatar </h4>
        </nav>
    )
}

export default Navbar;