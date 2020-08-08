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
        <div className="course">
            <div className="header">
                <h1>Course</h1>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Add Course
                </Button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last Modified</th>
                        <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courseArr?
                        courseArr.length?
                        courseArr.map(el=>{
                            return(
                                <tr key={el._id}>
                                        <td>
                                            <Link to = {`/course/${el._id}`}>
                                                {el.coursename}
                                            </Link>
                                        </td>
                                        <td>
                                            {
                                                el.lastModified.slice(0,10)
                                            }
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Option
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <Link className="dropdown-item" to = "/course" onClick={()=>handleDelete(el._id)}>Delete</Link>
                                                </div>
                                            </div>
                                        </td>
                                </tr>
                            )
                        }):<h1>No courses</h1>
                        :null
                    }
                    
                </tbody>
            </table>

            <AddCourse 
                show={modalShow}
                onHide={() => setModalShow(false)}
                updatelist ={()=> updateCourseList()}
            />
        </div>
    )
}
export default Course;