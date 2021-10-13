import React, { useEffect, useState } from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import { Typography, Button, Stack } from "@mui/material";
import CustomButton from '../../CustomButton'


type fileParams = { fileName: string, progress: number, downloadUri?: string, storagePath?: string }

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const { schema, uiSchema, id, formContext, disabled, onChange, value } = props;
    const privateUpload = uiSchema["ui:options"] ? uiSchema["ui:options"].private : false
    const parsedId = id.replace('root_', '');
    const [files, setFiles] = useState<fileParams[]>([])
    const [loadingFiles, setLoadingFiles] = useState<fileParams[]>([])

    useEffect(() => {
        if (formContext) {
            console.log("formContext", JSON.stringify(formContext))
            if (formContext.hasOwnProperty(id)) {
                console.log("SAME ID")
                let filesData = formContext[id]
                console.log("filesData", JSON.stringify(filesData))
                // setFiles(filesData)
                // setLoadingFiles(filesData)
            }
        }
    }, [id, formContext])

    useEffect(() => {
        console.log("value", value)
        if (value) {
            let parsed = JSON.parse(value)
            let newFiles = Object.keys(parsed).map(filename => {
                return { fileName: filename, storagePath: parsed[filename], progress: 100 }
            })
            console.log("NEW FILES", JSON.stringify(newFiles))
            setFiles(newFiles)
        }
    }, [value])


    // Return value to Form
    useEffect(() => {
        if (loadingFiles && loadingFiles?.length > 0) {
            let filesObj: any = {}
            loadingFiles.forEach(file => {
                filesObj[file.fileName] = file.storagePath
            })
            if (value) {
                console.log("Parsed Value", value)
                const parsed = JSON.parse(value);
                const allFiles = { ...parsed, ...filesObj };
                let stringify = JSON.stringify(allFiles)
                console.log("STRING ALL FILES", stringify)
                onChange(stringify)
            } else {
                let stringify = JSON.stringify(filesObj)
                console.log("STRING ALL FILES ELSE", stringify)
                onChange(stringify)
            }
        }
    }, [loadingFiles])

    const handleVideoClick = () => {
        if ("Android" in window) {
            console.log("PARSED ID", parsedId)
            window.Android.pickVideos(id, privateUpload);
        }
    }

    const handlePhotoClick = () => {
        if ("Android" in window) {
            window.Android.pickPhotos(id, privateUpload);
        }
    };

    const removeFile = (fileName: string, storagePath: string) => {
        if ("Android" in window) {
            const filePath = storagePath + fileName
            console.log("Delete File", fileName, storagePath)
            window.Android.deleteFile(filePath)
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

    const ControlButtons = (props: { progress: number, name: string, path: string }) => {
        const { progress, name, path } = props;

        if (progress < 100) {
            return (
                <Button variant="text" size="small" onClick={() => cancelWork(name)}>Cancel</Button>
            )
        }
        if (progress === 100) {
            return (
                <>
                    <Button variant="text" size="small" onClick={() => removeFile(name, path)}>Remove</Button>
                    <Button variant="text" size="small" onClick={() => previewFile("")}>Preview</Button>
                </>
            )
        }
        return null;
    }

    console.log("FILES", JSON.stringify(files))

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br />
            <Stack spacing={1} direction="row">
                <CustomButton
                    disabled={disabled}
                    onClick={handlePhotoClick}
                    size="small"
                >
                    Photo
                </CustomButton>
                <CustomButton
                    disabled={disabled}
                    onClick={handleVideoClick}
                    size="small"
                >
                    Video
                </CustomButton>
            </Stack>

            {files.map(f => <p>{f.fileName}</p>)}

            {files.map((file: any, i: number) => {
                const progress = typeof file.progress === "string" ? parseInt(file.progress) : file.progress;
                const name = file.fileName;
                const path = file.storagePath ?? "";
                const isFinished = file.isFinished ? file.isFinished : false

                return (
                    <div key={`${name}_${i}`} style={{ paddingTop: 10 }}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography noWrap >{name}</Typography>
                            <ControlButtons name={name} path={path} progress={progress} />
                        </Stack>
                        {!isFinished && <LinearProgressWithLabel value={progress ?? 0} />}
                    </div>
                )
            })}
        </div>
    )
}

export default CustomFileWidget
