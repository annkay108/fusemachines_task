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
    fileName: string,
    size: any
}

const Files = (props:any) => {
    const [fileArr, setFileArr] = useState<IFile[]>([]);
    const [ modalShow, setModalShow ] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filesPerPage] = useState(10);

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

    const paginate = (number:number)=> setCurrentPage(number);

    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = fileArr.reverse().slice(indexOfFirstFile, indexOfLastFile);

    const pageNumbers = [];
    for (let i = 1; i<=Math.ceil(fileArr.length/filesPerPage);i++){
        pageNumbers.push(i)
    }
    return (
        <div>
            <SideBar courseId={props.match.params.id}/>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Add File
            </Button>
            <div>
                {
                    fileArr?
                    fileArr.length?
                    <ul className="list-group mb-4">
                        {
                            currentFiles.map(el=>{
                                return(
                                    <li key={el._id} className="list-group-item">
                                        {el.fileName}
                                        <a href={`localhost:5000/file/${el._id}/download`} target="_blank" download>Download</a>
                                        {el.dateAdded.toString().slice(0,10)}
                                        {el.lastModified.toString().slice(0,10)}
                                        {
                                            parseInt(Math.round(el.size/1000/1000).toFixed(2))>=1?
                                            ` (${Math.round(el.size/1000/1000).toFixed(2)} MB)`
                                            :` (${Math.round(el.size/1000).toFixed(2)} KB)`
                                        }
                                    </li>
                                )
                                }
                            )
                        }
                    </ul>
                    :<h1>No File</h1>
                    :null
                }
            </div>
            <nav>
                <ul className = "pagination">
                    {
                        pageNumbers.map(number =>{
                            return(
                            <li key={number} className="page-item">
                                <a onClick={()=>paginate(number)} className="page-link">{number}</a>
                            </li>
                            )
                        }
                        )
                    }
                </ul>
            </nav>
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