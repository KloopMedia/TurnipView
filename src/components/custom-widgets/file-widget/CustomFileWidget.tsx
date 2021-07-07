import {Button} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import LinearProgressWithLabel from './LinearProgressWithLabel'

window.Android = window.Android || {};

const CustomFileWidget = (props: any) => {
    const {schema, id } = props;

    // useEffect(() => {
    //     props.onChange(formData)
    // }, [formData])
    //
    // console.log(props)

    const handleChange = (event: any) => {
        const lFiles = [...event.target.files]
        // setFiles(lFiles)
        // if ("Android" in window) {
        //     window.Android.showToast(test);
        // }
        // console.log("Files selected: ", file)
        // var reader = new FileReader();
        // reader.onload = function (event:any) {
        //     // The file's text will be printed here
        //     let blob = new Blob([new Uint8Array(event.target.result)], {type: file.type });
        //     console.log(event.target.result)
        //     console.log(blob)
        // };
        //
        // reader.readAsDataURL(file);
        // return (event: any) => {
        //     setFormData(files)
        // };
    }

    const handleClick = () => {
        if ("Android" in window) {
            window.Android.pickVideo();
        }
    }

    return (
        <div>
            <label className={"form-label"}>{schema?.title}</label>
            <br/>
            <input
                // onChange={handleChange}
                type="file"
                onClick={handleClick}
            />
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
