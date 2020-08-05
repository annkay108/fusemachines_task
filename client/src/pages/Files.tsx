import React, { useState, useEffect } from 'react';

import SideBar from "../components/Sidebar";
import fileService from "../services/file";

interface IFile{
    _id: string,
    lastModified: Date,
    dateAdded: Date,
    fileUri: string,
    courseId: string,
    fileName: string
}

const Files = (props:any) => {
    const [courseId, setcourseId] =useState<string>(props.match.params.id);
    const [fileArr, setFileArr] = useState<IFile[]|null>(null);

    useEffect(()=>{
        fileService.getListOfFilesByCourseId(courseId)
        .then(data=> setFileArr(data))
        .catch(err =>{ throw err })
    },[])

    return (
        <div>
            <SideBar courseId={courseId}/>
            <div>
                {
                    fileArr?
                    fileArr.length?
                        fileArr.map(el=>{
                            return(
                                <div key={el._id}>
                                    {el.fileName}
                                </div>
                            )
                        })
                    :<h1>No File</h1>
                    :null
                }
            </div>
        </div>
    )
}
export default Files;