import React, { useState, Component } from 'react'

const UpdateFileListInput = (props:any) => {

    const [allFiles, setAllFiles] = useState<File[]>(props.files);

    const handleRemoveClick = (index:number)=>{
        allFiles.splice(index,1)
        props.onRemoveFile([...allFiles])
        setAllFiles([...allFiles]);
        console.log(allFiles);
    }

    const handleInputClick = ()=>{
        console.log("i clicked")
    }
    
    const error = (file:any)=>(
        file.size>500?<p>big size</p>:null
    )

    return (
        <div>
            {allFiles.map((file:any, index:number) => (
                <li key={file.path}>
                    <p onClick={handleInputClick}>
                        {file.path} - {
                            parseInt(Math.round(file.size/1000/1000).toFixed(2))>=1?
                            Math.round(file.size/1000/1000).toFixed(2)+" MB"
                            :Math.round(file.size/1000).toFixed(2) +" KB"
                        }
                    </p>
                    {error(file)}
                    <button type="button" className="btn btn-link" onClick ={()=>handleRemoveClick(index)}>Remove</button>
                </li>
            ))
            }
        </div>
    )
}
export default UpdateFileListInput;