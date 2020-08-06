import React, { useState } from 'react'

const UpdateFileListInput = (props:any) => {

    const [allFiles, setAllFiles] = useState<File[]>(props.files);

    const handleRemoveClick = (index:number)=>{
        allFiles.splice(index,1)
        setAllFiles(allFiles);
        console.log(allFiles);
    }
    
    return (
        <div>
            {allFiles.map((file:any, index:number) => (
                <li key={file.path}>
                    {file.path} - {
                        parseInt(Math.round(file.size/1000/1000).toFixed(2))>=1?
                        Math.round(file.size/1000/1000).toFixed(2)+" MB"
                        :Math.round(file.size/1000).toFixed(2) +" KB"
                    }
                    <button type="button" className="btn btn-link" onClick ={()=>handleRemoveClick(index)}>Remove</button>
                </li>
            ))
            }
            {console.log('render updateFile')}

    )
}
export default UpdateFileListInput;