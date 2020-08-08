import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props:any) => {
    return (
        <nav>
            <Link to= {`/course`}>
                <h4 className="path-bar"> COURSE </h4>
            </Link>
        </nav>
    )
}

export default Sidebar;