import React, { useState, useMemo, useEffect } from 'react';
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
    
    const [arrUpdatedFileName, setUpdatedFileName] = useState<string[][]>([]);
    const [validationArr, setValidationArr] = useState<number[]>([]);
     
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone();
    
    const [updatedFileArr, setUpdateFile] = useState<File[]>([]);

    const handleRemoveList = (updatedList:File[],updatedFileName:string[][])=>{
        setUpdateFile([...updatedList])
        setUpdatedFileName([...updatedFileName])
    }
    
    const onRenameFile = (updatedFileName:string[][]) =>{
        setUpdatedFileName([...updatedFileName])
    }

    const handleClose = () =>{
        setUpdateFile([])
        acceptedFiles.length = 0;
        props.onHide();
    }

    const updateValidationArr = (updatedValidationArr:number[])=>{
       setValidationArr(updatedValidationArr)
       console.log("from updateFunction",updatedValidationArr)
    }

    // useEffect(() => {
    //     setUpdateFile([...acceptedFiles])
    // }, [])

    useEffect(() => {
        setUpdateFile([...updatedFileArr,...acceptedFiles])
    }, [acceptedFiles])

    const handleFileUpload = () =>{
        let sum = validationArr.reduce((a,b)=>a+b,0)
        console.log(validationArr,"validationArr")
        if(sum===0){
            let dateNow = new Date().toISOString();
            let formdata = new FormData();
            updatedFileArr.map((file,index)=>{
                formdata.append(`file`,file,arrUpdatedFileName[index][0]+arrUpdatedFileName[index][1])
            })
            formdata.append("lastModified",dateNow);
            formdata.append("dateAdded",dateNow);
            
            fileService.addFiles(formdata, props.courseId)
            .then((data)=>props.updatelist())
            .catch(err=>{throw err})
            setUpdateFile([])
            acceptedFiles.length = 0
            props.onHide();
        }
    }

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
                        {
                            acceptedFiles.length===0?
                                null:
                                <UpdateFileListInput 
                                    onValidation={updateValidationArr} 
                                    onRemoveFile={handleRemoveList} 
                                    onRenameFile={onRenameFile} 
                                    //files={acceptedFiles}
                                    files={[...updatedFileArr,...acceptedFiles]}
                                />
                        }
                    </aside>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-link" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleFileUpload} >Done</button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddFile;