(this.webpackJsonpturnipview=this.webpackJsonpturnipview||[]).push([[0],{258:function(e){e.exports=JSON.parse('{"type":"object","properties":{"files":{"title":"Files","type":"string","description":"ATAIA WAS BHEHE"},"newInput1":{"title":"New Input 1","type":"string","description":"asd"}},"dependencies":{},"required":[],"title":"Files Test","description":"Stage for testing Files"}')},259:function(e){e.exports=JSON.parse('{"files":{"ui:widget":"file"},"ui:order":["files","newInput1"]}')},273:function(e,n,i){},526:function(e,n,i){},528:function(e,n,i){"use strict";i.r(n);var t=i(0),o=i.n(t),r=i(238),d=i.n(r),a=(i(273),i(26)),s=i(260),c=i(262),l=i(544),u=i(542),f=i(540),w=i(8),j=function(e){return Object(w.jsxs)(u.a,{display:"flex",alignItems:"center",children:[Object(w.jsx)(u.a,{width:"100%",mr:1,children:Object(w.jsx)(l.a,Object(c.a)({variant:"determinate"},e))}),Object(w.jsx)(u.a,{minWidth:35,children:Object(w.jsx)(f.a,{variant:"body2",color:"textSecondary",children:"".concat(Math.round(e.value),"%")})})]})},v=i(106);window.Android=window.Android||{};var b=function(e){var n=e.schema,i=e.id,o=e.formContext,r=e.disabled,d=e.value,s=Object(t.useState)([]),c=Object(a.a)(s,2),l=c[0],u=c[1],b=Object(t.useState)({}),g=Object(a.a)(b,2);g[0],g[1];Object(t.useEffect)((function(){if(o&&(console.log("formContext",JSON.stringify(o)),o.hasOwnProperty(i))){console.log("SAME ID");var e=o[i];console.log("filesData",JSON.stringify(e)),u(e)}}),[i,o]),Object(t.useEffect)((function(){if(console.log("value",d),d){var e=JSON.parse(d),n=Object.keys(e).map((function(n){return{fileName:n,downloadUri:e[n].url,storagePath:e[n].storagePath,progress:100}}));u(n)}}),[d]),Object(t.useEffect)((function(){if(l&&(null===l||void 0===l?void 0:l.length)>0){var n={};l.forEach((function(e){e.downloadUri?n[e.fileName]={url:e.downloadUri,storagePath:e.storagePath}:n[e.fileName]={url:"",storagePath:""}}));var i=JSON.stringify(n);e.onChange(i)}}),[l]);return Object(w.jsxs)("div",{children:[Object(w.jsx)("label",{className:"form-label",children:null===n||void 0===n?void 0:n.title}),Object(w.jsx)("br",{}),Object(w.jsx)(v.a,{disabled:r,onClick:function(){"Android"in window&&window.Android.pickPhotos(i)},style:{backgroundColor:"#1EB980",marginRight:5},size:"sm",children:"Photo"}),Object(w.jsx)(v.a,{disabled:r,onClick:function(){"Android"in window&&window.Android.pickVideos(i)},style:{backgroundColor:"#1EB980"},size:"sm",children:"Video"}),l&&l.map((function(e,n){var i;return e&&Object(w.jsxs)("div",{style:{paddingTop:10},children:[Object(w.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(w.jsx)(f.a,{children:e.fileName}),100==e.progress&&Object(w.jsx)(v.a,{onClick:function(){return function(e,n,i){if("Android"in window){var t=n+e;100===i?(console.log("Delete File",e,n),window.Android.deleteFile(t)):(console.log("Cancel File",e,n),window.Android.cancelWork(e))}}(e.fileName,e.storagePath,e.progress)},children:"Remove"}),parseInt(e.progress)<100&&Object(w.jsx)(v.a,{onClick:function(){return n=e.fileName,void("Android"in window&&(console.log("Cancel File",n),window.Android.cancelWork(n)));var n},children:"Clear"}),100==e.progress&&Object(w.jsx)(v.a,{onClick:function(){return n=e.downloadUri,void("Android"in window&&(console.log("Preview File",n),window.Android.previewFile(n)));var n},children:"Preview"})]}),parseInt(e.progress)<100&&Object(w.jsx)(j,{value:null!==(i=parseInt(e.progress))&&void 0!==i?i:0})]},"".concat(e.fileName,"_").concat(n))}))]})},g=(i(526),i(258)),O=i(259);i(527);window.Android=window.Android||{};var p=function(){var e,n=Object(t.useState)({}),i=Object(a.a)(n,2),o=i[0],r=i[1],d=Object(t.useState)({}),c=Object(a.a)(d,2),l=c[0],u=c[1],f=Object(t.useState)({}),j=Object(a.a)(f,2),p=j[0],h=j[1],m=Object(t.useState)({}),S=Object(a.a)(m,2),x=S[0],A=S[1],y=Object(t.useState)(!1),E=Object(a.a)(y,2),N=E[0],C=E[1],F={customfile:b};return Object(t.useEffect)((function(){return window.addEventListener("android_schema_event",(function(e){console.log(JSON.stringify(e.detail));var n=JSON.parse(e.detail);r(n.jsonSchema),u(n.uiSchema),C(n.isComplete)})),window.addEventListener("android_data_event",(function(e){console.log("JS FORMDATA",JSON.stringify(e.detail)),h(JSON.parse(e.detail))})),window.addEventListener("android_file_event",(function(e){console.log("FILEDATA",JSON.stringify(e.detail)),A(JSON.parse(e.detail))})),window.Android.listenersReady(),function(){window.removeEventListener("android_json_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_ui_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_data_event",(function(e){return console.log("Event inside webview",e.detail)})),window.removeEventListener("android_file_event",(function(e){return console.log("Event inside webview",e.detail)}))}}),[]),Object(w.jsx)("div",{style:{padding:4},children:Object(w.jsx)(s.a,{schema:null!==(e=o)&&void 0!==e?e:g,uiSchema:null!==l&&void 0!==l?l:O,formData:p,widgets:F,disabled:N,formContext:x,onChange:function(e){h(e.formData)},onSubmit:function(e){h(e.formData);var n=JSON.stringify(e.formData);"Android"in window&&window.Android.onFormSubmit(n)},children:Object(w.jsx)(v.a,{type:"submit",style:{backgroundColor:"#1EB980"},disabled:N,children:"Submit"})})})},h=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,546)).then((function(n){var i=n.getCLS,t=n.getFID,o=n.getFCP,r=n.getLCP,d=n.getTTFB;i(e),t(e),o(e),r(e),d(e)}))};d.a.render(Object(w.jsx)(o.a.StrictMode,{children:Object(w.jsx)(p,{})}),document.getElementById("root")),h()}},[[528,1,2]]]);
//# sourceMappingURL=main.b19a52fe.chunk.js.map