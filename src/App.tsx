import React, {useEffect, useState} from 'react';
import Form from '@rjsf/bootstrap-4'
import CustomFileWidget from "./components/custom-widgets/file-widget/CustomFileWidget";
import './App.css';
import schemaJson from './schema.json'
import schemaUi from './ui.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

declare global {
    interface Window {
        Android: any;
    }
}
window.Android = window.Android || {};

// const evt = new Event('android_event', {'bubbles':true, 'cancelable':false});

function App() {
    const [schema, setSchema] = useState({});
    const [uiSchema, setUiSchema] = useState({});
    const [data, setData] = useState({});
    const [fileData, setFileData] = useState({})
    const [isComplete, setIsComplete] = useState(false)

    const widgets = {
        customfile: CustomFileWidget
    };

    useEffect(() => {
        // @ts-ignore
        window.addEventListener('android_schema_event', (e: any) => {
                console.log(JSON.stringify(e.detail))
                const stageData = JSON.parse(e.detail)
                setSchema(stageData.jsonSchema)
                setUiSchema(stageData.uiSchema)
                setIsComplete(stageData.isComplete)
            }
        )
        // @ts-ignore
        window.addEventListener('android_data_event', (e: any) => {
                console.log("JS FORMDATA", JSON.stringify(e.detail))
                setData(JSON.parse(e.detail))
            }
        )
        // @ts-ignore
        window.addEventListener('android_file_event', (e: any) => {
                console.log(JSON.stringify(e.detail))
                setFileData(JSON.parse(e.detail))
            }
        )
        window.Android.listenersReady();
        return () => {
            // @ts-ignore
            window.removeEventListener('android_json_event', e => console.log("Event inside webview", e.detail));
            // @ts-ignore
            window.removeEventListener('android_ui_event', e => console.log("Event inside webview", e.detail));
            // @ts-ignore
            window.removeEventListener('android_data_event', e => console.log("Event inside webview", e.detail));
            // @ts-ignore
            window.removeEventListener('android_file_event', e => console.log("Event inside webview", e.detail));
        };
    }, []);

    // @ts-ignore
    const handleChange = (v) => {
        setData(v.formData)
    };

    const handleSubmit = (e: any) => {
        setData(e.formData)
        let stringData = JSON.stringify(e.formData)
        if ("Android" in window) {
            window.Android.onFormSubmit(stringData);
        }
    }

    return (
        <div style={{padding: 4}}>
            <Form schema={schema as any}
                  uiSchema={uiSchema}
                  formData={data}
                  widgets={widgets}
                  disabled={isComplete}
                  formContext={fileData}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
            >
                <Button type={"submit"} style={{backgroundColor: "#1EB980"}} disabled={isComplete}>Submit</Button>
            </Form>
        </div>
    );
}

export default App;
