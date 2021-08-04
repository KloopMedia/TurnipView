import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import {Button} from "react-bootstrap";
import {Typography} from "@material-ui/core";

type fileParams = { fileName: string, progress: number, downloadUri?: string }

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, id, formContext, disabled, value} = props;
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
        console.log("value", value)
        if (value) {
            let parsed = JSON.parse(value)
            let newFiles = Object.keys(parsed).map(filename => {
                return {fileName: filename, downloadUri: parsed[filename], progress: 100}
            })
            setFiles(newFiles)
        }
    }, [value])

    useEffect(() => {
        if (files && files?.length > 0) {
            let filesObj: any = {}
            files.forEach(file => {
                if (file.downloadUri) {
                    filesObj[file.fileName] = file.downloadUri
                }
            })
            let stringify = JSON.stringify(filesObj)
            props.onChange(stringify)
        }
    }, [files])

    const handleVideoClick = () => {
        if ("Android" in window) {
            window.Android.pickVideo(id);
            // window.Android.pickFile(id);
        }
    }

    const handlePhotoClick = () => {
        if ("Android" in window) {
            window.Android.pickPhoto(id);
        }
    };

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <Button
                disabled={disabled}
                onClick={handlePhotoClick}
                style={{backgroundColor: "#1EB980", marginRight: 5}}
                size="sm"
            >
                Photo
            </Button>
            <Button
                disabled={disabled}
                onClick={handleVideoClick}
                style={{backgroundColor: "#1EB980"}}
                size="sm"
            >
                Video
            </Button>

            {files && files.map((file: any, i: number) => (
                <div key={`${file?.fileName}_${i}`} style={{paddingTop: 10}}>
                    <div style={{display: 'flex'}}>
                        <p>{file?.fileName}</p>
                        {file?.progress == 100 && <a className="text-success" href={file?.downloadUri} style={{paddingLeft: 10}}>File Saved</a>}
                    </div>
                    {parseInt(file?.progress) < 100 && <LinearProgressWithLabel value={file?.progress ?? 0}/>}
                </div>
            ))}
        </div>
    )
}

export default CustomFileWidget
