(this.webpackJsonpturnipview=this.webpackJsonpturnipview||[]).push([[0],{205:function(e,n,t){},382:function(e,n,t){},384:function(e,n,t){"use strict";t.r(n);var i=t(0),o=t.n(i),a=t(181),r=t.n(a),c=(t(205),t(11)),s=t(115),d=t(7),l=t(27),u=t(405),j=t(406),O=t(407),b=t(5),v=function(e){return Object(b.jsxs)(j.a,{display:"flex",alignItems:"center",children:[Object(b.jsx)(j.a,{width:"100%",mr:1,children:Object(b.jsx)(u.a,Object(l.a)({variant:"determinate"},e))}),Object(b.jsx)(j.a,{minWidth:35,children:Object(b.jsx)(O.a,{variant:"body2",color:"textSecondary",children:"".concat(Math.round(e.value),"%")})})]})},f=t(403),w=t(402),g=t(12),h=t(35),m=Object(g.a)(f.a)((function(e){return{color:e.theme.palette.getContrastText(h.a[300]),backgroundColor:h.a[300],"&:hover":{backgroundColor:h.a[400]}}}));window.Android=window.Android||{};var E=function(e){var n=e.schema,t=e.uiSchema,o=e.id,a=e.formContext,r=e.disabled,s=e.onChange,u=e.value,j=!!t["ui:options"]&&t["ui:options"].private,g=o.replace("root_",""),h=Object(i.useState)({}),E=Object(c.a)(h,2),S=E[0],p=E[1],x=Object(i.useState)({}),A=Object(c.a)(x,2),y=A[0],_=A[1],L=Object(i.useState)({}),C=Object(c.a)(L,2),T=C[0],N=C[1];console.log("FORM PROPS",JSON.stringify(e)),console.log("VALUE",JSON.stringify(u)),Object(i.useEffect)((function(){if(a&&(console.log("formContext",JSON.stringify(a)),a.hasOwnProperty(g))){var e=a[g];console.log("filesData",JSON.stringify(e)),p(e),_(e)}}),[o,a]),Object(i.useEffect)((function(){u&&(console.log("value useEffect",u),N(u),Object.keys(u).forEach((function(e){var n=u[e];p((function(t){return Object(l.a)(Object(l.a)({},t),{},Object(d.a)({},e,{storagePath:n,isFinished:!0}))}))})))}),[u]),Object(i.useEffect)((function(){if(Object.keys(y).length>0){console.log("Loading Files: ",y);var e={};Object.keys(y).forEach((function(n){y[n].isFinished&&"TAG_UPLOAD"===y[n].workTag&&(e[n]=y[n].storagePath)}));var n=Object(l.a)(Object(l.a)({},u),e),t=JSON.stringify(n);console.log("VALUE STRING",t),s(n)}}),[y]);var J=function(n,t){var i=T;console.log("DELETE LOG VALUE: ",JSON.stringify(u),n);var o=Object(l.a)({},S),a=Object(l.a)({},y);if(n in a&&(delete a[n],_(a)),n in o&&(delete o[n],p(o)),n in i){console.log("DELETE LOG PARSED: ",JSON.stringify(i)),delete i[n];var r=JSON.stringify(i);console.log("DELETE LOG AFTER: ",r),N(i),e.onChange(i)}console.log("DELETE LOG newfiles",JSON.stringify(o)),console.log("DELETE LOG loading",JSON.stringify(a))},F=function(e){var n=e.isFinished,t=e.name,i=e.path;return n?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(f.a,{variant:"text",size:"small",onClick:function(){return J(t)},children:"Remove"}),Object(b.jsx)(f.a,{variant:"text",size:"small",onClick:function(){return e=i,void("Android"in window&&(console.log("Preview File",e),window.Android.previewFile(e)));var e},children:"Preview"})]}):Object(b.jsx)(f.a,{variant:"text",size:"small",onClick:function(){return e=t,void("Android"in window&&(console.log("Cancel File",e),window.Android.cancelWork(e)));var e},children:"Cancel"})};return Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{className:"form-label",children:null===n||void 0===n?void 0:n.title}),Object(b.jsx)("br",{}),Object(b.jsxs)(w.a,{spacing:1,direction:"row",children:[Object(b.jsx)(m,{disabled:r,onClick:function(){"Android"in window&&window.Android.pickPhotos(g,j)},size:"small",children:"Photo"}),Object(b.jsx)(m,{disabled:r,onClick:function(){"Android"in window&&(console.log("PARSED ID",g),window.Android.pickVideos(g,j))},size:"small",children:"Video"})]}),Object.keys(S).map((function(e,n){var t="string"===typeof S[e].progress?parseInt(S[e].progress):S[e].progress,i=S[e].storagePath,o=S[e].isFinished;return console.log("FILES: ",JSON.stringify(S)),Object(b.jsxs)("div",{style:{paddingTop:10},children:[Object(b.jsxs)(w.a,{spacing:1,direction:"row",alignItems:"center",children:[Object(b.jsx)(O.a,{noWrap:!0,children:e}),Object(b.jsx)(F,{name:e,path:i,isFinished:o})]}),!o&&Object(b.jsx)(v,{value:null!==t&&void 0!==t?t:0})]},"".concat(e,"_").concat(n))}))]})},S=(t(382),t(383),t(195)),p=function(e){var n=e.data;return Object(b.jsx)(S.a,{id:"ViewerTinyMCE",value:n,toolbar:!1,inline:!1,disabled:!0,tinymceScriptSrc:"/TurnipView/tinymce/tinymce.min.js",init:{plugins:"autoresize",menubar:!1,image_advtab:!0,importcss_append:!0}})};window.Android=window.Android||{};var x=function(){var e=Object(i.useState)({}),n=Object(c.a)(e,2),t=n[0],o=n[1],a=Object(i.useState)({}),r=Object(c.a)(a,2),d=r[0],l=r[1],u=Object(i.useState)({}),j=Object(c.a)(u,2),O=j[0],v=j[1],f=Object(i.useState)({}),w=Object(c.a)(f,2),g=w[0],h=w[1],S=Object(i.useState)([]),x=Object(c.a)(S,2),A=x[0],y=x[1],_=Object(i.useState)(""),L=Object(c.a)(_,2),C=L[0],T=L[1],N=Object(i.useState)(!1),J=Object(c.a)(N,2),F=J[0],k=J[1],D={customfile:E};return Object(i.useEffect)((function(){return window.addEventListener("android_schema_event",(function(e){console.log("SCHEMA",JSON.stringify(e.detail));var n=JSON.parse(e.detail);o(n.jsonSchema),l(n.uiSchema),k(n.isComplete)})),window.addEventListener("android_data_event",(function(e){console.log("JS FORMDATA",e.detail),v(JSON.parse(e.detail))})),window.addEventListener("android_file_event",(function(e){console.log("FILEDATA",e.detail),h(JSON.parse(e.detail))})),window.addEventListener("android_rich_text_event",(function(e){console.log("RICH TEXT",e.detail),T(e.detail.replace('{"rich_text":',"").replace('"',"").replace('"}',""))})),window.addEventListener("android_previous_tasks_event",(function(e){console.log("PREVIOUS TASKS",JSON.stringify(e.detail)),y(JSON.parse(e.detail))})),window.Android.listenersReady(),function(){window.removeEventListener("android_json_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_ui_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_data_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_file_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_rich_text_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_previous_tasks_event",(function(e){return console.log("Event inside webview",e.detail)}))}}),[]),console.log("FORM DATA",O),Object(b.jsxs)("div",{style:{padding:4},children:[C&&(console.log("TEXT VIEWER",C),Object(b.jsx)(p,{data:C})),A.map((function(e,n){var t=e.jsonSchema,i=e.uiSchema,o=e.responses;return console.log("Prev Task",e),Object(b.jsx)(s.a,{schema:t,uiSchema:i,formData:o,widgets:D,disabled:!0,children:"  "},n)})),Object(b.jsx)(s.a,{schema:t,uiSchema:d,formData:O,widgets:D,disabled:F,formContext:g,onChange:function(e){v(e.formData);var n=JSON.stringify(e.formData);console.log("ON CHANGE",n),"Android"in window&&window.Android.onChange(n)},onSubmit:function(e){v(e.formData);var n=JSON.stringify(e.formData);"Android"in window&&window.Android.onFormSubmit(n)},children:Object(b.jsx)(m,{type:"submit",disabled:F,children:"Submit"})})]})},A=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,408)).then((function(n){var t=n.getCLS,i=n.getFID,o=n.getFCP,a=n.getLCP,r=n.getTTFB;t(e),i(e),o(e),a(e),r(e)}))};r.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(x,{})}),document.getElementById("root")),A()}},[[384,1,2]]]);
//# sourceMappingURL=main.0aff785d.chunk.js.map