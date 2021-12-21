import React from "react";

import {WidgetProps} from "@rjsf/core";
import {Box, Grid} from "@mui/material";
import CustomButton from "../../CustomButton";

const AudioWidget = ({
                         id,
                         options,
                         value,
                         required,
                         disabled,
                         readonly,
                         label,
                     }: WidgetProps) => {

    const privateUpload = options.private ? options.private : false
    const parsedId = id.replace('root_', '');

    const handleStartRecording = () => {
        if ("Android" in window) {
            console.log("Record audio")
            window.Android.recordAudio(parsedId, privateUpload)
        }
    }

    return (
        <Box>
            <label className={"form-label"}>{label}{required && "*"}</label>
            <Grid container alignItems={"center"}>
                <CustomButton onClick={handleStartRecording} disabled={disabled || readonly}>
                    Запись
                </CustomButton>
            </Grid>
            {/*{record && <audio controls src={record}/>}*/}
        </Box>
    );
};

export default AudioWidget;