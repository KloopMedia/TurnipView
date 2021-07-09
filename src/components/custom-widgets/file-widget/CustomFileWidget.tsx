import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import {Button} from "react-bootstrap";

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, id, formContext, disabled} = props;
    const [files, setFiles] = useState<{ fileName: string, progress: number } | undefined>()

    useEffect(() => {
        if (formContext) {
            console.log("formContext", JSON.stringify(formContext))
            if (formContext.hasOwnProperty(id)) {
                console.log("SAME ID")
                let filesData = formContext[id]
                console.log("filesData", JSON.stringify(filesData))
                setFiles(filesData)
            }
        }
    }, [formContext])

    // useEffect(() => {
    //     props.onChange(formData)
    // }, [formData])

    const handleClick = () => {
        if ("Android" in window) {
            window.Android.pickFile(id);
        }
    }

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <Button
                disabled={disabled}
                onClick={handleClick}
                size="sm"
            >
                Upload File
            </Button>
            {/*<input*/}
            {/*    style={{background: 'blue'}}*/}
            {/*    type="file"*/}
            {/*    disabled={disabled}*/}
            {/*    onClick={handleClick}*/}
            {/*/>*/}
            {files && <div key={`${files?.fileName}`} style={{paddingTop: 10}}>
                <p>{files?.fileName}</p>
                <LinearProgressWithLabel value={files?.progress ?? 0}/>
            </div>}
            {/*{files.map((file: any, i: number) => {*/}
            {/*    <div key={`${file.filename}_${i}`}>*/}
            {/*        <p>{file.filename}</p>*/}
            {/*        <LinearProgressWithLabel value={file.progress}/>*/}
            {/*    </div>*/}
            {/*})}*/}
        </div>
    )
}

export default CustomFileWidget
