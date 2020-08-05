import React, { useState } from 'react';
import { Modal } from "react-bootstrap";

const AddCourse = (props: any) => {
    const [coursname, setCoursename] = useState<string>("");
    const [lastModified, setLastModified] = useState<Date>(new Date());

    const handleFormSubmit = (event:any ) =>{
        event.preventDefault();
    }

    const handleChange = (event: any) =>{
        
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
