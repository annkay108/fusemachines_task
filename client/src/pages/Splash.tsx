import React from 'react'
import { Link } from "react-router-dom";


const Splash = () => {
    return (
        <div className="Splash">
            <h1>
                Welcome
            </h1>
            <div>
                <Link to = "/course">
                    My Course
                </Link>
            </div>
        </div>
    )
}
export default Splash;