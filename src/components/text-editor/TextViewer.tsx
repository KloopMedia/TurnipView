import {Editor} from "@tinymce/tinymce-react";
import React from "react";


const TextViewer = (props: {data: string}) => {
    const {data} = props;

    return (
        <Editor
            id={"ViewerTinyMCE"}
            value={data}
            inline={false}
            disabled={true}
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            init={{
                plugins: 'autoresize',
                toolbar: false,
                menubar: false,
                image_advtab: true,
                importcss_append: true,
            }}
        />
    )
}

export default TextViewer