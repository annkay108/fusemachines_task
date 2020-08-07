import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";

import SideBar from "../components/Sidebar";
import fileService from "../services/file";
import AddFile from "../components/AddFile";

interface IFile{
    _id: string,
    lastModified: Date,
    dateAdded: Date,
    fileUri: string,
    courseId: string,
    fileName: string
}

const Files = (props:any) => {
    const [fileArr, setFileArr] = useState<IFile[]|null>(null);
    const [ modalShow, setModalShow ] = useState(false);

    useEffect(()=>{
        fileService.getListOfFilesByCourseId(props.match.params.id)
        .then(data=> setFileArr(data))
        .catch(err =>{ throw err })
    },[])

    const updateCourseList = ()=>{
        fileService.getListOfFilesByCourseId(props.match.params.id)
        .then(data => setFileArr(data))
        .catch(err => {throw err})
    }

    return (
        <div>
            <SideBar courseId={props.match.params.id}/>
            <div>
                {
                    fileArr?
                    fileArr.length?
                        fileArr.map(el=>{
                            return(
                                <div key={el._id}>
                                    {el.fileName}
                                    <a href={`localhost:5000/file/${el._id}/download`} target="_blank" download>Download</a>
                                </div>
                            )
                        })
                    :<h1>No File</h1>
                    :null
                }
            </div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Add File
            </Button>
            <AddFile 
                courseId={props.match.params.id}
                show={modalShow}
                onHide={() => setModalShow(false)}
                updatelist ={()=>updateCourseList()}
            />
        </div>
    )
}
export default Files;