import React, {useEffect, useState} from 'react';
import Form from '@rjsf/bootstrap-4'
import CustomFileWidget from "./components/custom-widgets/file-widget/CustomFileWidget";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomButton from './components/CustomButton'
import TextViewer from './components/text-editor/TextViewer';
import AutoCompleteWidget from "./components/custom-widgets/autocomplete/AutoCompleteWidget";
import FixedRadioWidget from "./components/custom-widgets/fixed-radio-widget/FixedRadioWidget";
import CustomLinkWidget from "./components/custom-widgets/link-widget/CustomLinkWidget";
import {Box} from "@mui/material";

declare global {
    interface Window {
        Android: any;
    }
}
window.Android = window.Android || {};

function App() {
    const [schema, setSchema] = useState({});
    const [uiSchema, setUiSchema] = useState({});
    const [data, setData] = useState({});
    const [fileData, setFileData] = useState({})
    const [previousTasks, setPreviousTasks] = useState<any>([])
    const [richText, setRichText] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const [allowChange, setAllowChange] = useState(false)
    const [allowGoBack, setAllowGoBack] = useState(false)

    const widgets = {
        customfile: CustomFileWidget,
        autocomplete: AutoCompleteWidget,
        RadioWidget: FixedRadioWidget,
        customlink: CustomLinkWidget
    };

    useEffect(() => {
        window.addEventListener('android_schema_event', (e: any) => {
                const stageData = e.detail
                setSchema(stageData.jsonSchema)
                setUiSchema(stageData.uiSchema)
                setIsComplete(stageData.isComplete)
                setAllowGoBack(stageData.canGoBack)
                setAllowChange(true)
            }
        )
        window.addEventListener('android_data_event', (e: any) => {
                console.log("JS FORMDATA", JSON.stringify(e.detail))
                setData(e.detail)
            }
        )
        window.addEventListener('android_file_event', (e: any) => {
                console.log("FILEDATA", e.detail)
                setFileData(e.detail)
            }
        )
        window.addEventListener('android_rich_text_event', (e: any) => {
                console.log("RICH TEXT", JSON.stringify(e.detail))
                setRichText(e.detail.rich_text)
            }
        )
        window.addEventListener('android_previous_tasks_event', (e: any) => {
                console.log("PREVIOUS TASKS", JSON.stringify(e.detail))
                setPreviousTasks(e.detail)
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
    const handleChange = (e, v) => {
        if (allowChange) {
            setData(e.formData)
            const stringData = JSON.stringify(e.formData)
            console.log("ON CHANGE", stringData)
            window.Android.onChange(stringData);
        }
    };

    const handleSubmit = (e: any) => {
        setData(e.formData)
        const stringData = JSON.stringify(e.formData)
        if ("Android" in window) {
            window.Android.onFormSubmit(stringData);
        }
    }

    const handleOpenPrevious = () => {
        if ("Android" in window) {
            window.Android.onGoToPrevious();
        }
    }

    const renderPreviousTasks = () => {
        return previousTasks.map((task: { jsonSchema: string, uiSchema: string, responses: any }, i: number) => {
            const parsedJson = task.jsonSchema
            const parsedUi = task.uiSchema
            const parsedResponses = task.responses

            return (
                <Form key={i}
                      schema={parsedJson as any}
                      uiSchema={parsedUi as any}
                      formData={parsedResponses}
                      widgets={widgets}
                      disabled={true}
                > </Form>
            )
        })
    }

    const renderTextViewer = () => {
        if (richText) {
            return <TextViewer data={richText}/>
        } else {
            return null
        }
    }

    return (
        <div style={{paddingTop: "8px", paddingBottom: "16px"}}>
            {renderTextViewer()}
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
                <Box display={"flex"}>
                    <CustomButton type={"submit"} disabled={isComplete}>Отправить</CustomButton>
                    {allowGoBack &&
                    <CustomButton style={{margin: "0 8px"}} disabled={isComplete} onClick={handleOpenPrevious}>К
                        предыдущему таску</CustomButton>}
                </Box>
            </Form>
        </div>
    );
}

export default App;
