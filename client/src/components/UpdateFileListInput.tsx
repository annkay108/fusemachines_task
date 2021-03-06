import React, { useState, useEffect } from 'react'

const UpdateFileListInput = (props:any) => {

    const [allFiles, setAllFiles] = useState<File[]>(props.files);
    const [nameArr, setNameArr] = useState<string[][]>([]);
    const [validation, setValidation] = useState<number[]>([]);
    
    const inputValidationChecks:any = {
        0:"no error",
        1:"Supported files: pdf,pptx,docx,xlsx,ipynb,jpg,jpeg,png",
        2:"File should be less than 50MB",
        3:"Duplicate resource title",
        4:"Field cannot be empty"
    }

    const handleRemoveClick = (index:number)=>{
        allFiles.splice(index,1)
        nameArr.splice(index,1)
        const updatedValidation = checkForDuplicates(allFiles,[...nameArr]);
        props.onRemoveFile([...allFiles],[...nameArr])
        setAllFiles([...allFiles]);
        setNameArr([...nameArr]);
        props.onValidation([...updatedValidation])
        setValidation([...updatedValidation])
    }
    
    const handleChange = (e:any, index:number)=>{
        nameArr[index][0] = e.target.value;
        setNameArr([...nameArr])
        props.onRenameFile([...nameArr])
        const updatedValidation = checkForDuplicates(allFiles,[...nameArr]);
        if(e.target.value==="") updatedValidation[index] = 4;
        console.log("fromonchange",updatedValidation)
        props.onValidation([...updatedValidation])
        setValidation([...updatedValidation])
    }
    
    const checkForDuplicates = (files:File[], fileNamesExts:string[][])=>{
        let updatedValidation = [];
        let checkType = ['application/pdf',"image/png","image/jpeg","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/x-ipynb+json"]
        for(let k of files){
            if (!checkType.includes(k.type)) updatedValidation.push(1)
            else if (k.size>50000000) updatedValidation.push(2)
            else updatedValidation.push(0)
        }

        let duplicates:string[] = [];
        let fileNames:string[] = [];

        for (let j of fileNamesExts){
            fileNames.push(j[0]+j[1])
        }
        for (let i = 0; i< fileNames.length; i++){
            if(duplicates.includes(fileNames[i])){
                if(updatedValidation[i]===0) updatedValidation[i]=3
            }
            else if (fileNames.lastIndexOf(fileNames[i])!==i){
                duplicates.push(fileNames[i])
                if(updatedValidation[i]===0) updatedValidation[i]=3
            }
        }
        return updatedValidation;
    }

    useEffect(()=>{
        let arrName = [];
        let validationArr = [];
        for(let i of allFiles){
            let nameExt = []
            let name = i.name.slice(0,i.name.lastIndexOf("."))
            nameExt.push(name)
            let ext = i.name.slice(i.name.lastIndexOf("."))
            nameExt.push(ext)
            arrName.push(nameExt)
        }
        validationArr = checkForDuplicates(allFiles,[...arrName])
        setNameArr([...arrName])
        setValidation([...validationArr])
        props.onRenameFile([...arrName])
        props.onValidation([...validationArr])
    },[])

    return (
        <div>
            {allFiles.map((file:any, index:number) => (
                <li key={index}>
                    {
                        nameArr.length?
                        <div>
                            <input  onChange={(e)=>handleChange(e,index)} value={nameArr[index][0]}/>{nameArr[index][1]}
                            {
                                parseInt(Math.round(file.size/1000/1000).toFixed(2))>=1?
                                ` (${Math.round(file.size/1000/1000).toFixed(2)} MB)`
                                :` (${Math.round(file.size/1000).toFixed(2)} KB)`
                            }
                            <button 
                                type="button" 
                                className="btn btn-link error" 
                                onClick ={()=>handleRemoveClick(index)}
                            >
                                Remove
                            </button>
                            <div>
                                {validation[index]===0?null:<span className="error">
                                    {inputValidationChecks[validation[index]]}
                                </span>}
                            </div>
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