import React, { useState, useEffect } from 'react'

const UpdateFileListInput = (props:any) => {

    const [allFiles, setAllFiles] = useState<File[]>(props.files);
    const [nameArr, setNameArr] = useState<string[][]>([]);
    
    const handleRemoveClick = (index:number)=>{
        allFiles.splice(index,1)
        nameArr.splice(index,1)
        props.onRemoveFile([...allFiles],[...nameArr])
        setAllFiles([...allFiles]);
        setNameArr([...nameArr]);
    }
    
    const handleChange = (e:any, index:number)=>{
        nameArr[index][0] = e.target.value;
        setNameArr([...nameArr])
        props.onRenameFile([...nameArr])
    }

    const error = (file:any)=>(
        file.size>500?<div>big size</div>:null
    )

    useEffect(()=>{
        let arrName = [];
        for(let i of allFiles){
            let nameExt = []
            let name = i.name.slice(0,i.name.lastIndexOf("."))
            nameExt.push(name)
            let ext = i.name.slice(i.name.lastIndexOf("."))
            nameExt.push(ext)
            arrName.push(nameExt)
        }
        setNameArr([...arrName])
    },[])

    return (
        <div>
            {allFiles.map((file:any, index:number) => (
                <li key={index}>
                    {
                        nameArr.length?
                        <div>
                            <input onChange={(e)=>handleChange(e,index)} value={nameArr[index][0]}/>{nameArr[index][1]}
                            {
                                parseInt(Math.round(file.size/1000/1000).toFixed(2))>=1?
                                ` (${Math.round(file.size/1000/1000).toFixed(2)} MB)`
                                :` (${Math.round(file.size/1000).toFixed(2)} KB)`
                            }
                            <button type="button" className="btn btn-link" onClick ={()=>handleRemoveClick(index)}>Remove</button>
                            {error(file)}
                        </div>
                        :null
                    }
                </li>
            ))
            }
        </div>
    )
}
export default UpdateFileListInput;