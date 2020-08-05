import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import courseService from "../services/course";

interface ICourse{
    _id: string,
    courseFile: Array<string>,
    coursename: string,
    lastModified: Date
}

const Course = () => {
    const [ courseArr , setCourse ] = useState<ICourse[]|null>(null);

    useEffect(()=>{
        courseService.getAllCourse()
        .then(data => setCourse(data))
        .catch(err => {throw err})
    },[]);
    
    return (
        <div>
            {
                courseArr?
                courseArr.length?
                courseArr.map(el=>{
                    return(
                        <div key={el._id}>
                            <Link to = {`/course/${el._id}`}>
                                {el.coursename}
                            </Link>
                        </div>
                    )
                }):<h1>No courses</h1>
                :null
            }
        </div>
    )
}
export default Course;