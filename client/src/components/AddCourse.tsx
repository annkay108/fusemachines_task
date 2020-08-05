import React, { useState } from 'react';
import { Modal } from "react-bootstrap";

import courseService from "../services/course";

const AddCourse = (props: any) => {
    const [coursename, setCoursename] = useState<string>("");
    const [lastModified, setLastModified] = useState<string>(new Date().toISOString().slice(0,10));

    const handleFormSubmit = (event:any ) =>{
        event.preventDefault();
        setLastModified(new Date().toISOString().slice(0,10))
        const newCourse = { coursename, lastModified}
        courseService.addCourse (newCourse)
        .then(data => props.updatelist())
        .catch(err =>{throw err})
        props.onHide();
    }

    const handleChange = (event: any) =>{
        const { value } = event.target;
        setCoursename(value);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Course
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleFormSubmit} >
                    <div>
                        <input
                            onChange={handleChange}
                            name="coursename"
                        />
                    </div>
                    <br/>
                    <button 
                        type="button" 
                        className="btn btn-link"
                        onClick={props.onHide}
                    >
                        Close
                    </button>
                    <button
                        type = "submit" 
                        className="btn btn-success" 
                    >
                        Done
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddCourse;
