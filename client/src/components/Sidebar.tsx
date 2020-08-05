import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <nav>
            <Link to= "/course">
                <h4> Course </h4>
            </Link>
        </nav>
    )
}

export default Sidebar;