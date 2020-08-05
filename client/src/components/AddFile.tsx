import React, { useState, useMemo } from 'react';
import { Modal } from "react-bootstrap";
import {useDropzone} from 'react-dropzone';


import fileService from "../services/file";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

const AddFile = (props: any) => {
    // const [coursename, setCoursename] = useState<string>("");
    // const [lastModified, setLastModified] = useState<Date>(new Date());

    // const handleFormSubmit = (event:any ) =>{
    //     event.preventDefault();
    //     props.onHide();
    // }

    // const handleChange = (event: any) =>{
    //     const { value } = event.target;
    //     setCoursename(value);
    // }
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: 'image/*'});
    
      const files = acceptedFiles.map((file:any) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

      const style:any = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Files
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside>
                        <ul>{files}</ul>
                    </aside>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-link" onClick={props.onHide}>Close</button>
                <button type="button" className="btn btn-success" >Done</button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddFile;