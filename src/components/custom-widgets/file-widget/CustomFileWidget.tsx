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
    const [files, setFiles] = useState<fileParams[] | undefined>()
    const [loadingFiles, setLoadingFiles] = useState<fileParams[] | undefined>([])

    useEffect(() => {
        if (formContext) {
            console.log("formContext", JSON.stringify(formContext))
            if (formContext.hasOwnProperty(id)) {
                console.log("SAME ID")
                let filesData = formContext[id]
                console.log("filesData", JSON.stringify(filesData))
                setFiles(filesData)
                setLoadingFiles(filesData)
            }
        }
    }, [id, formContext])

    useEffect(() => {
        console.log("value", value)
        if (value) {
            let parsed = JSON.parse(value)
            let newFiles = Object.keys(parsed).map(filename => {
                return { fileName: filename, storagePath: parsed[filename].storagePath, progress: 100 }
            })
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
            const parsed = JSON.parse(value);
            const allFiles = { ...parsed, ...filesObj };
            let stringify = JSON.stringify(allFiles)
            onChange(stringify)
        }
    }, [loadingFiles])

    const handleVideoClick = () => {
        if ("Android" in window) {
            console.log("PARSED ID", parsedId)
            window.Android.pickVideos(parsedId, privateUpload);
        }
    }

    const handlePhotoClick = () => {
        if ("Android" in window) {
            window.Android.pickPhotos(parsedId, privateUpload);
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

    const ControlButtons = (props: { progress: number, url: string, name: string, path: string }) => {
        const { progress, name, url, path } = props;

        if (progress < 100) {
            return (
                <Button variant="text" size="small" onClick={() => cancelWork(name)}>Cancel</Button>
            )
        }
        if (progress === 100) {
            return (
                <>
                    <Button variant="text" size="small" onClick={() => removeFile(name, path)}>Remove</Button>
                    <Button variant="text" size="small" onClick={() => previewFile(url)}>Preview</Button>
                </>
            )
        }
        return null;
    }



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



            {files && files.map((file: any, i: number) => {
                const progress = typeof file.progress === "string" ? parseInt(file.progress) : file.progress;
                const name = file.fileName;
                const path = file.storagePath ?? "";

                return (
                    <div key={`${name}_${i}`} style={{ paddingTop: 10 }}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography noWrap >{name}</Typography>
                            <ControlButtons name={name} url={""} path={path} progress={progress} />
                        </Stack>
                        {progress < 100 && <LinearProgressWithLabel value={progress ?? 0} />}
                    </div>
                )
            })}
        </div>
    )
}

export default CustomFileWidget
