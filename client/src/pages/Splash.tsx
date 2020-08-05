import React from 'react'
import { Link } from "react-router-dom";


const Splash = () => {
    return (
        <div>
            hello its sFlash
            <div>
                <Link to = "/course">
                    My Course
                </Link>
            </div>
        </div>
    )
}
export default Splash;