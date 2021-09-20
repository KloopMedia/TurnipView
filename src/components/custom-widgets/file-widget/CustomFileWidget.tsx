import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import {Button} from "react-bootstrap";
import {Typography, IconButton} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';


type fileParams = { fileName: string, progress: number, downloadUri?: string, storagePath?: string }

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, id, formContext, disabled, value} = props;
    const [files, setFiles] = useState<fileParams[] | undefined>([])
    const [storage, setStorage] = useState<any>({})

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
    }, [id, formContext])

    useEffect(() => {
        console.log("value", value)
        if (value) {
            let parsed = JSON.parse(value)
            let newFiles = Object.keys(parsed).map(filename => {
                return {fileName: filename, downloadUri: parsed[filename].url, storagePath: parsed[filename].storagePath, progress: 100}
            })
            setFiles(newFiles)
        }
    }, [value])


    // Return value to Form
    useEffect(() => {
        if (files && files?.length > 0) {
            let filesObj: any = {}
            files.forEach(file => {
                if (file.downloadUri) {
                    filesObj[file.fileName] = {url: file.downloadUri, storagePath: file.storagePath}
                }
                else {
                    filesObj[file.fileName] = {url: "", storagePath: ""}
                }
            })
            let stringify = JSON.stringify(filesObj)
            props.onChange(stringify)
        }
    }, [files])

    const handleVideoClick = () => {
        if ("Android" in window) {
            window.Android.pickVideos(id);
            // window.Android.pickFile(id);
        }
    }

    const handlePhotoClick = () => {
        if ("Android" in window) {
            window.Android.pickPhotos(id);
        }
    };

    const removeFile = (fileName: string, storagePath: string, progress: number) => {
        // TODO: If file is loading, stops loading. If file is already loaded, removes file
        if ("Android" in window) {
            const filePath = storagePath + fileName
            if (progress === 100) {
                console.log("Delete File", fileName, storagePath)
                window.Android.deleteFile(filePath)
            }
            else {
                console.log("Cancel File", fileName, storagePath)
                window.Android.cancelWork(fileName)
            }
            
        }
    }

    const cancelWork = (fileName: string) => {
        if ("Android" in window) {
            console.log("Cancel File", fileName)
            window.Android.cancelWork(fileName)
        }
    }

    const previewFile = (url: string) => {
        if ("Android" in window) {
            console.log("Preview File", url)
            window.Android.previewFile(url)
        }
    }

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


            {files && files.map((file: any, i: number) => file && (
                <div key={`${file.fileName}_${i}`} style={{paddingTop: 10}}>
                    <div style={{display: 'flex', alignItems: "center"}}>
                        <Typography>{file.fileName}</Typography>
                        {file.progress == 100 && <Button onClick={() => removeFile(file.fileName, file.storagePath, file.progress)}>Remove</Button>}
                        {parseInt(file.progress) < 100 && <Button onClick={() => cancelWork(file.fileName)}>Clear</Button>}
                        {file.progress == 100 && <Button onClick={() => previewFile(file.downloadUri)}>Preview</Button>}
                        {/* {file.progress == 100 && <a className="text-success" href={file.downloadUri} style={{paddingLeft: 10}}>File Saved</a>} */}
                    </div>
                    {parseInt(file.progress) < 100 && <LinearProgressWithLabel value={parseInt(file.progress) ?? 0}/>}
                </div>
            ))}
        </div>
    )
}

export default CustomFileWidget
