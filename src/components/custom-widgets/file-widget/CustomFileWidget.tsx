import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import {Button} from "react-bootstrap";
import {Typography} from "@material-ui/core";

type fileParams = { fileName: string, progress: number, url?: string }

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, id, formContext, disabled} = props;
    const [files, setFiles] = useState<fileParams[] | undefined>([])

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

    useEffect(() => {
        if (files && files?.length > 0) {
            let filesObj: any = {}
            files.forEach(file => {
                if (file.url) {
                    filesObj[file.fileName] = file.url
                }
            })
            let parsed = JSON.stringify(filesObj)
            props.onChange(parsed)
        }
    }, [files])

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
                style={{backgroundColor: "#1EB980"}}
                size="sm"
            >
                Upload File
            </Button>

            {files && files.map((file: any, i: number) => (
                <div key={`${file?.fileName}_${i}`} style={{paddingTop: 10}}>
                    <div style={{display: 'flex'}}>
                        <p>{file?.fileName}</p>
                        {file?.progress == 100 && <p className="text-success" style={{paddingRight: 5}}>File Saved</p>}
                    </div>
                    {parseInt(file?.progress) < 100 && <LinearProgressWithLabel value={file?.progress ?? 0}/>}
                </div>
            ))}
        </div>
    )
}

export default CustomFileWidget
