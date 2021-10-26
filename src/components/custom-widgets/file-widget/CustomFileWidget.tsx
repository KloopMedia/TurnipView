import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import {Typography, Button, Stack} from "@mui/material";
import CustomButton from '../../CustomButton'


type fileParams = { fileName: string, progress: number, downloadUri?: string, storagePath?: string }

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, uiSchema, id, formContext, disabled, onChange, value} = props;
    const privateUpload = uiSchema["ui:options"] ? uiSchema["ui:options"].private : false
    const parsedId = id.replace('root_', '');
    const [files, setFiles] = useState<any>({})
    const [loadingFiles, setLoadingFiles] = useState<any>({})
    const [parsedValue, setParsedValue] = useState<any>({})

    console.log("FORM PROPS", JSON.stringify(props))
    console.log("VALUE", JSON.stringify(value))

    useEffect(() => {
        if (formContext) {
            console.log("formContext", JSON.stringify(formContext))
            if (formContext.hasOwnProperty(parsedId)) {
                let filesData = formContext[parsedId]
                console.log("filesData", JSON.stringify(filesData))

                setFiles(filesData)
                // setLoadingFiles(filesData)
                const uploaded:any = {}
                Object.keys(filesData).forEach(filename => {
                    if (filesData[filename].isFinished) {
                        uploaded[filename] = filesData[filename].storagePath
                    }
                })
                if (Object.keys(uploaded).length > 0) {
                    const allFiles = {...value, ...uploaded}
                    console.log("UPLOADED FILES", JSON.stringify(allFiles))
                    props.onChange(allFiles)
                }
            }
        }
    }, [id, formContext])

    useEffect(() => {
        if (value) {
            console.log("value useEffect", value)
            setParsedValue(value)
            Object.keys(value).forEach(filename => {
                const path = value[filename]
                setFiles((prevState: any) => ({
                    ...prevState,
                    [filename]: {storagePath: path, isFinished: true}
                }))
            })
        }
    }, [value])


    // Return value to Form
    // useEffect(() => {
    //     if (Object.keys(loadingFiles).length > 0) {
    //         console.log("Loading Files: ", loadingFiles)
    //         const finishedUpload: any = {}
    //         Object.keys(loadingFiles).forEach(filename => {
    //             if (loadingFiles[filename].isFinished && loadingFiles[filename].workTag === "TAG_UPLOAD") {
    //                 finishedUpload[filename] = loadingFiles[filename].storagePath
    //             }
    //         })
    //         const allFiles = {...value, ...finishedUpload};
    //         const stringify = JSON.stringify(allFiles)
    //         console.log("VALUE STRING", stringify)
    //         onChange(allFiles)
    //     }
    // }, [loadingFiles])

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

    const removeFile = (filename: string, storagePath: string) => {
        // if ("Android" in window) {
        //     const filePath = storagePath + fileName
        //     console.log("Delete File", fileName, storagePath)
        //     window.Android.deleteFile(filePath)
        // }

        const parsed = parsedValue
        console.log("DELETE LOG VALUE: ", JSON.stringify(value), filename)
        const newFiles = {...files}

        const loadedFiles = {...loadingFiles}
        if (filename in loadedFiles) {
            delete loadedFiles[filename]
            setLoadingFiles(loadedFiles)
        }

        if (filename in newFiles) {
            delete newFiles[filename]
            setFiles(newFiles)
        }

        if (filename in parsed) {
            console.log("DELETE LOG PARSED: ", JSON.stringify(parsed))
            delete parsed[filename]
            const stringify = JSON.stringify(parsed)
            console.log("DELETE LOG AFTER: ", stringify)
            setParsedValue(parsed)
            props.onChange(parsed)
        }

        console.log("DELETE LOG newfiles", JSON.stringify(newFiles))
        console.log("DELETE LOG loading", JSON.stringify(loadedFiles))
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
        const {isFinished, name, path} = props;

        if (isFinished) {
            return (
                <>
                    <Button variant="text" size="small" onClick={() => removeFile(name, path)}>Remove</Button>
                    <Button variant="text" size="small" onClick={() => previewFile(path)}>Preview</Button>
                </>
            )
        } else {
            return (
                <Button variant="text" size="small" onClick={() => cancelWork(name)}>Cancel</Button>
            )
        }
    }

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
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
                console.log("FILES: ", JSON.stringify(files))

                return (
                    <div key={`${filename}_${i}`} style={{paddingTop: 10}}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography noWrap>{filename}</Typography>
                            <ControlButtons name={filename} path={path} isFinished={isFinished}/>
                        </Stack>
                        {!isFinished && <LinearProgressWithLabel value={progress ?? 0}/>}
                    </div>
                )
            })}
        </div>
    )
}

export default CustomFileWidget
