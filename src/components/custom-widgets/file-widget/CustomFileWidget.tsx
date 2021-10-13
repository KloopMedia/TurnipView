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
    const [files, setFiles] = useState<any>({})
    const [loadingFiles, setLoadingFiles] = useState<any>({})

    console.log("FORM PROPS", JSON.stringify(props))
    console.log("VALUE", value)

    useEffect(() => {
        if (formContext) {
            console.log("formContext", JSON.stringify(formContext))
            if (formContext.hasOwnProperty(parsedId)) {
                let filesData = formContext[parsedId]
                console.log("filesData", JSON.stringify(filesData))

                setFiles(filesData)
                setLoadingFiles(filesData)
            }
        }
    }, [id, formContext])

    useEffect(() => {
        if (value) {
            console.log("value useEffect", value)
            Object.keys(value).forEach(filename => {
                const path = value[filename]
                setFiles((prevState: any) => ({
                    ...prevState,
                    [filename]: { storagePath: path, isFinished: true }
                }))
            })
        }
    }, [value])


    // Return value to Form
    useEffect(() => {
        if (Object.keys(loadingFiles).length > 0) {
            const finishedUpload: any = {}
            Object.keys(loadingFiles).forEach(filename => {
                if (loadingFiles[filename].isFinished && loadingFiles[filename].workTag === "TAG_UPLOAD") {
                    finishedUpload[filename] = loadingFiles[filename].storagePath
                }
            })
            console.log("VALUE loading", value)
            let stringify = ""
            const allFiles = { ...value, ...finishedUpload };
            stringify = JSON.stringify(allFiles)
            console.log("VALUE STRING", stringify)
            onChange(allFiles)
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

    const previewFile = (storagePath: string) => {
        if ("Android" in window) {
            console.log("Preview File", storagePath)
            window.Android.previewFile(storagePath)
        }
    }

    const ControlButtons = (props: { isFinished: boolean, name: string, path: string }) => {
        const { isFinished, name, path } = props;

        if (isFinished) {
            return (
                <>
                    <Button variant="text" size="small" onClick={() => removeFile(name, path)}>Remove</Button>
                    <Button variant="text" size="small" onClick={() => previewFile(path)}>Preview</Button>
                </>
            )
        }
        else {
            return (
                <Button variant="text" size="small" onClick={() => cancelWork(name)}>Cancel</Button>
            )
        }
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


            {Object.keys(files).map((filename: any, i: number) => {
                const progress = typeof files[filename].progress === "string" ? parseInt(files[filename].progress) : files[filename].progress;
                const path = files[filename].storagePath
                const isFinished = files[filename].isFinished

                return (
                    <div key={`${filename}_${i}`} style={{ paddingTop: 10 }}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography noWrap >{filename}</Typography>
                            <ControlButtons name={filename} path={path} isFinished={isFinished} />
                        </Stack>
                        {!isFinished && <LinearProgressWithLabel value={progress ?? 0} />}
                    </div>
                )
            })}
        </div>
    )
}

export default CustomFileWidget
