import React from 'react'
import { Link } from "react-router-dom";


const Splash = () => {
    return (
        <div className="splash">
            <div className="splash-content">
                <h1>
                    Welcome
                </h1>
                <div>
                    <Link className = "btn btn-primary course" to = "/course">
                        COURSE
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Splash;