import React, { useState, useMemo } from 'react';
import { Modal } from "react-bootstrap";
import {useDropzone} from 'react-dropzone';


import fileService from "../services/file";
import UpdateFileListInput from "./UpdateFileListInput";

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

    const [error, setError] = useState<boolean>(false);

    const checkError = (file:File) => {
        if(file.size>500) setError(true)
    }

    
    const handleRemoveList = (updatedFileList:File[])=>{
        updatedFiles = updatedFileList
        console.log("updateFiles removeList",updatedFiles)
    }
    
    const handleFileUpload = () =>{
        acceptedFiles.map(file=>{
            checkError(file);
        })
        if(!error)
        {
            let dateNow = new Date().toISOString();
            let formdata = new FormData();
            updatedFiles.map((file,index)=>{
                formdata.append(`file`,file)
            })
            formdata.append("lastModified",dateNow);
            formdata.append("dateAdded",dateNow);
            
            fileService.addFiles(formdata, props.courseId)
            .then((data)=>props.updatelist())
            .catch(err=>{throw err})
            props.onHide();
        }
    }
    
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone();
    
    let updatedFiles = acceptedFiles;

    const files = acceptedFiles.map((file:any, index:number) => (
        <li key={index}>
            {file.path} - {
                parseInt(Math.round(file.size/1000/1000).toFixed(2))>=1?
                    Math.round(file.size/1000/1000).toFixed(2)+" MB"
                    :Math.round(file.size/1000).toFixed(2) +" KB"
            }
            </li>
        ));
        // acceptedfiles property lastModified, name, path, size, type

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
                    <form encType= "multipart/form-data">
                        <div {...getRootProps({style})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </form>
                    <aside>
                        {acceptedFiles.length===0?
                                <ul>{files}</ul>:
                                <UpdateFileListInput onRemoveFile={handleRemoveList} files={acceptedFiles}/>}
                    </aside>
                    {error?<p>Resolve the issue first</p>:null}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-link" onClick={props.onHide}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleFileUpload} >Done</button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddFile;