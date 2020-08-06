import React, { useMemo } from 'react';
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

const DragNDrop = (props:any) => {

    const handleFileUpload = () =>{
        let dateNow = new Date().toISOString();
        let formdata = new FormData();
        acceptedFiles.map((file,index)=>{
            formdata.append(`file`,file)
        })
        formdata.append("lastModified",dateNow);
        formdata.append("dateAdded",dateNow);
        console.log("append formdata",formdata);
        fileService.addFiles(formdata, props.courseId)
        .then((data)=>props.updatelist())
        .catch(err=>{throw err})
        acceptedFiles.length = 0;
        props.onHide();
    }
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone();
    
    // const files = acceptedFiles.map((file:any, index) => (
    //     <li key={file.path}>
    //         {file.path} - {
    //             parseInt(Math.round(file.size/1000/1000).toFixed(2))>=1?
    //             Math.round(file.size/1000/1000).toFixed(2)+" MB"
    //             :Math.round(file.size/1000).toFixed(2) +" KB"
    //         }
    //     </li>
    // ));
    
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
        <div className="container">
                    <form encType= "multipart/form-data">
                        <div {...getRootProps({style})}>
                            <input {...getInputProps()}/>
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </form>
                    <aside>
                        {/* <ul>{files}</ul> */}
                        {
                            acceptedFiles.length===0?
                                <ul></ul>:
                                <UpdateFileListInput files={acceptedFiles}/>
                        }
                    </aside>
                    <button type="button" className="btn btn-link" onClick={props.onHide}>Close</button>
                    <button type="button" className="btn btn-success" onClick={handleFileUpload} >Done</button>
                    {console.log("render drag and drop")}
        </div>
    )
}


export default DragNDrop;