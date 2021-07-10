import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import {Button} from "react-bootstrap";

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, id, formContext, disabled} = props;
    const [files, setFiles] = useState<{ fileName: string, progress: number }[] | undefined>([])

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

            {files && files.map((file: any, i: number) => (
                <div key={`${file?.fileName}_${i}`} style={{paddingTop: 10}}>
                    <p>{file?.fileName}</p>
                    <LinearProgressWithLabel value={file?.progress ?? 0}/>
                </div>
            ))}
        </div>
    )
}

export default CustomFileWidget
