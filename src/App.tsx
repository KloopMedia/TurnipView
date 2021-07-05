import React, {useEffect, useState} from 'react';
import Form from '@rjsf/bootstrap-4'
import CustomFileWidget from "./components/custom-widgets/file-widget/CustomFileWidget";
import './App.css';
import schemaJson from './schema.json'
import schemaUi from './ui.json'
import 'bootstrap/dist/css/bootstrap.min.css';

declare global {
    interface Window { Android: any; }
}
window.Android = window.Android || {};
// const evt = new Event('android_event', {'bubbles':true, 'cancelable':false});

function App() {
    const [schema, setSchema] = useState();
    const [uiSchema, setUiSchema] = useState();
    const [data, setData] = useState({});
    const [exampleText, setExampleText] = useState("")

    const widgets = {
        file: CustomFileWidget
    };

    useEffect(() => {
        //const evt = new Event('android_event', {'bubbles':true, 'cancelable':false});
        // @ts-ignore
        window.addEventListener('android_formdata_event', e => setExampleText(e.detail));
        return () => {
            //window.removeEventListener('android_event', e => {setExampleText(e + "Something is happening!")});
            // @ts-ignore
            window.removeEventListener('android_formdata_event', e => setExampleText(e.detail));
        };
    }, []);

    const handleFileChange = (change: any) => {
        console.log(change)
    }

    // @ts-ignore
    const handleChange = (v) => {
        setData(v.formData)
        let stringData = JSON.stringify(v.formData)
        if ("Android" in window) {
            window.Android.setFormData(stringData);
        }
        // for (let prop in window)
        //     console.log(prop);
        // if ("Android" in window)
        //     console.log(window.Android);
    };

    const handleSubmit = (e: any) => {
        setData(e.formData)
    }

    return (
        <div style={{padding: 15}}>
            <Form schema={schemaJson as any}
                  uiSchema={schemaUi}
                  formData={data}
                  widgets={widgets}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;