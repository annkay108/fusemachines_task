import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";

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
            <div className="file">
                <div className="file-header">
                    <h1>FILES AND FOLDERS</h1>
                    <Button variant="success" onClick={() => setModalShow(true)}>
                        Add File
                    </Button>
                </div>
                <div>
                    <table className="table file-no-border">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DATE ADDED</th>
                                <th scope="col">LAST MODIFIED</th>
                                <th scope="col">SIZE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            fileArr?
                            fileArr.length?
                                currentFiles.map(el=>{
                                    return(
                                        <tr key={el._id}>
                                            <td>
                                                {el.fileName}
                                                <a href={`localhost:5000/file/${el._id}/download`} target="_blank" download>
                                                    <img className="download-image" alt="Download" src="/images/LogoMakr_3EJHnJ.png"/>
                                                </a>
                                            </td>
                                            <td>
                                                {el.dateAdded.toString().slice(0,10)}
                                            </td>
                                            <td>
                                                {el.lastModified.toString().slice(0,10)}
                                            </td>
                                            <td>
                                                {
                                                    parseInt(Math.round(el.size/1000/1000).toFixed(2))>=1?
                                                    ` (${Math.round(el.size/1000/1000).toFixed(2)} MB)`
                                                    :` (${Math.round(el.size/1000).toFixed(2)} KB)`
                                                }
                                            </td>
                                        </tr>
                                    )
                                    }
                                )
                            :<h1 className="no-data">No Data</h1>
                            :null
                        }
                        </tbody>
                    </table>
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