import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import {Typography, Button, Stack} from "@mui/material";
import CustomButton from '../../CustomButton'

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, uiSchema, id, formContext, disabled, onChange, value} = props;
    const privateUpload = uiSchema["ui:options"] ? uiSchema["ui:options"].private : false
    const parsedId = id.replace('root_', '');
    const [files, setFiles] = useState<any>({})
    const [parsedValue, setParsedValue] = useState<any>({})


    useEffect(() => {
        if (formContext) {
            if (formContext.hasOwnProperty(parsedId)) {
                const filesData = formContext[parsedId]

                setFiles((prevState: any) => ({...prevState,...filesData}))

                const uploaded: any = {}
                Object.keys(filesData).forEach(filename => {
                    if (filesData[filename].isFinished) {
                        uploaded[filename] = filesData[filename].storagePath
                    }
                })
                if (Object.keys(uploaded).length > 0) {
                    const parsed = value && typeof value === "string" ? JSON.parse(value) : {}
                    const allFiles = JSON.stringify({...parsed, ...uploaded})
                    props.onChange(allFiles)
                }
            }
        }
    }, [id, formContext])

    useEffect(() => {
        if (value) {
            console.log("value useEffect", value)
            const parsed: any = value && typeof value === "string" ? JSON.parse(value) : {}
            setParsedValue(parsed)
            let f:any = {}
            Object.keys(parsed).forEach(filename => {
                const path = parsed[filename]
                f[filename] = {storagePath: path, isFinished: true}
            })
            setFiles(f)
        }
    }, [value])

    const handleVideoClick = () => {
        if ("Android" in window) {
            window.Android.pickVideos(parsedId, privateUpload);
        }
    }

    const handlePhotoClick = () => {
        if ("Android" in window) {
            window.Android.pickPhotos(parsedId, privateUpload);
        }
    };

    const removeFile = async (filename: string) => {
        if ("Android" in window) {
            window.Android.deleteFile(parsedId, filename);
        }

        const parsed = parsedValue
        const newFiles = {...files}

        if (filename in newFiles) {
            delete newFiles[filename]
            setFiles(newFiles)
        }

        if (filename in parsed) {
            delete parsed[filename]
            setParsedValue(parsed)
            await props.onChange(JSON.stringify(parsed))
            _onBlur()
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

    const _onBlur = () => props.onBlur(id, "");
    const _onFocus = () => props.onFocus(id, "");

    const ControlButtons = (props: { isFinished: boolean, name: string, path: string }) => {
        const {isFinished, name, path} = props;

        if (isFinished) {
            return (
                <>
                    <Button variant="text" size="small"
                            onClick={() => removeFile(name)}
                            onBlur={_onBlur}
                            onFocus={_onFocus}>Удалить</Button>
                    <Button variant="text" size="small"
                            onClick={() => previewFile(path)}
                            onBlur={_onBlur}
                            onFocus={_onFocus}>Посмотреть файл</Button>
                </>
            )
        } else {
            return (
                <Button variant="text" size="small"
                        onClick={() => cancelWork(name)}
                        onBlur={_onBlur}
                        onFocus={_onFocus}>Отменить загрузку</Button>
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
                    onBlur={_onBlur}
                    onFocus={_onFocus}
                >
                    Фото
                </CustomButton>
                <CustomButton
                    disabled={disabled}
                    onClick={handleVideoClick}
                    size="small"
                    onBlur={_onBlur}
                    onFocus={_onFocus}
                >
                    Видео
                </CustomButton>
            </Stack>


            {Object.keys(files).map((filename: any, i: number) => {
                const progress = typeof files[filename].progress === "string" ? parseInt(files[filename].progress) : files[filename].progress;
                const path = files[filename].storagePath
                const isFinished = files[filename].isFinished
                const workTag : "TAG_COMPRESS" | "TAG_UPLOAD" = files[filename].workTag ?? "TAG_UPLOAD"

                return (
                    <div key={`${filename}_${i}`} style={{paddingTop: 10}}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography noWrap>{filename}</Typography>
                            <ControlButtons name={filename} path={path} isFinished={isFinished}/>
                        </Stack>
                        {!isFinished && <div>
                            <Typography>{workTag === "TAG_COMPRESS" ? "Сжатие файла" : "Загрузка файла"}</Typography>
                            <LinearProgressWithLabel value={progress ?? 0}/>
                        </div>}
                    </div>
                )
            })}
        </div>
    )
}

export default CustomFileWidget
