import React, { useEffect, useState } from 'react';
import Form from '@rjsf/bootstrap-4'
import CustomFileWidget from "./components/custom-widgets/file-widget/CustomFileWidget";
import './App.css';
import schemaJson from './schema.json'
import schemaUi from './ui.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomButton from './components/CustomButton'
import TextViewer from './components/text-editor/TextViewer';

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
    const [previousTasks, setPreviousTasks] = useState<any>([])
    const [richText, setRichText] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    const widgets = {
        customfile: CustomFileWidget
    };

    useEffect(() => {
        // @ts-ignore
        window.addEventListener('android_schema_event', (e: any) => {
            console.log("SCHEMA", JSON.stringify(e.detail))
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
            console.log("FILEDATA", JSON.stringify(e.detail))
            setFileData(JSON.parse(e.detail))
        }
        )
        window.addEventListener('android_rich_text_event', (e: any) => {
            console.log("RICH TEXT", JSON.stringify(e.detail))
            setRichText(e.detail)
        }
        )
        window.addEventListener('android_previous_tasks_event', (e: any) => {
            console.log("PREVIOUS TASKS", JSON.stringify(e.detail))
            setPreviousTasks(JSON.parse(e.detail))
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
            // @ts-ignore
            window.removeEventListener('android_rich_text_event', e => console.log("Event inside webview", e.detail));
            // @ts-ignore
            window.removeEventListener('android_previous_tasks_event', e => console.log("Event inside webview", e.detail));
        };
    }, []);

    // @ts-ignore
    const handleChange = (e) => {
        setData(e.formData)
        let stringData = JSON.stringify(e.formData)
        if ("Android" in window) {
            window.Android.onChange(stringData);
        }
    };

    const handleSubmit = (e: any) => {
        setData(e.formData)
        let stringData = JSON.stringify(e.formData)
        if ("Android" in window) {
            window.Android.onFormSubmit(stringData);
        }
    }

    const renderPreviousTasks = () => {
        console.log("atai test", previousTasks)
        return previousTasks.map((task: { jsonSchema: string, uiSchema: string, responses: any }, i: number) => {
            const parsedJson = task.jsonSchema
            const parsedUi = task.uiSchema
            const parsedResponses = task.responses
            console.log("Prev Task", task)

            return (
                <Form key={i} 
                    schema={parsedJson as any}
                    uiSchema={parsedUi as any}
                    formData={parsedResponses}
                    widgets={widgets}
                    disabled={true}
                    formContext={fileData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                >  </Form>
            )
        })
    }

    const renderTextViewer = () => {
        console.log("TEXT VIEWER", richText)
        return <TextViewer data={richText} />
    }

    return (
        <div style={{ padding: 4 }}>
            {richText && renderTextViewer()}
            {renderPreviousTasks()}
            <Form schema={schema as any}
                uiSchema={uiSchema}
                formData={data}
                widgets={widgets}
                disabled={isComplete}
                formContext={fileData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            >
                <CustomButton type={"submit"} disabled={isComplete}>Submit</CustomButton>
            </Form>
        </div>
    );
}

export default App;
