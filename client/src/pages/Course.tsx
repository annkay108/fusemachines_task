import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import courseService from "../services/course";
import AddCourse from "../components/AddCourse";

interface ICourse{
    _id: string,
    courseFile: Array<string>,
    coursename: string,
    lastModified: Date
}

const Course = () => {
    const [ courseArr , setCourse ] = useState<ICourse[]|null>(null);
    const [ modalShow, setModalShow ] = useState(false);

    useEffect(()=>{
        courseService.getAllCourse()
        .then(data => setCourse(data))
        .catch(err => {throw err})
    },[]);

    return (
        <div>
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
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Add Course
            </Button>
            <AddCourse 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}
export default Course;