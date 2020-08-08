import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import courseService from "../services/course";
import AddCourse from "../components/AddCourse";

interface ICourse{
    _id: string,
    courseFile: Array<string>,
    coursename: string,
    lastModified: string
}

const Course = () => {
    const [ courseArr , setCourse ] = useState<ICourse[]|null>(null);
    const [ modalShow, setModalShow ] = useState(false);

    useEffect(()=>{
        courseService.getAllCourse()
        .then(data => setCourse(data))
        .catch(err => {throw err})
    },[]);

    const updateCourseList = ()=>{
        courseService.getAllCourse()
        .then(data => setCourse(data))
        .catch(err => {throw err})
    }

    const handleDelete = (courseId: string)=>{
        if(window.confirm("Are you sure you want to delete it?")){
            courseService.deleteCourse(courseId)
            .then(data => updateCourseList())
            .catch(err => {throw err})
        }
    }

    return (
        <div>
            <div>
                {
                    courseArr?
                    courseArr.length?
                    courseArr.map(el=>{
                        return(
                            <div key={el._id}>
                                <div className="dropdown">
                                <Link to = {`/course/${el._id}`}>
                                    {el.coursename}
                                </Link>
                                {
                                    el.lastModified.slice(0,10)
                                }
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Option
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link className="dropdown-item" to = "/course" onClick={()=>handleDelete(el._id)}>Delete</Link>
                                </div>
                            </div>
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
                updatelist ={()=> updateCourseList()}
            />
        </div>
    )
}
export default Course;