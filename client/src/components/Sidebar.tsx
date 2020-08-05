import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props:any) => {
    return (
        <nav>
            <Link to= {`/course/${props.courseId}`}>
                <h4> Files </h4>
            </Link>
        </nav>
    )
}

export default Sidebar;