import React, {useEffect, useState} from 'react';
import Form from '@rjsf/core';
import './App.css';

declare global {
    interface Window { Android: any; }
}
window.Android = window.Android || {};
// const evt = new Event('android_event', {'bubbles':true, 'cancelable':false});

function App() {
    const [schema, setSchema] = useState({});
    const [uiSchema, setUiSchema] = useState({});
    const [data, setData] = useState({});
    const [exampleText, setExampleText] = useState("")

    useEffect(() => {
        //const evt = new Event('android_event', {'bubbles':true, 'cancelable':false});
        // @ts-ignore
        window.addEventListener('android_event', e => setExampleText(e.detail));
        return () => {
            //window.removeEventListener('android_event', e => {setExampleText(e + "Something is happening!")});
            // @ts-ignore
            window.removeEventListener('android_event', e => setExampleText(e.detail));
        };
    }, []);

    // @ts-ignore
    const handleChange = (v) => {
        if ("Android" in window) {
            window.Android.showToast(v);
        }
        // for (let prop in window)
        //     console.log(prop);
        // if ("Android" in window)
        //     console.log(window.Android);
    };

    return (
        <div>
            <textarea value={exampleText}
                      onChange={(e) => { handleChange(e.target.value); }} />
            {/*<Form schema={schema}*/}
            {/*      uiSchema={uiSchema}*/}
            {/*      formData={data}*/}
            {/*      onSubmit={handleSubmit}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
