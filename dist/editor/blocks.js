(()=>{var t={251:(t,e,o)=>{"use strict";var n=o(196),r=Symbol.for("react.element"),l=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function c(t,e,o){var n,l={},c=null,p=null;for(n in void 0!==o&&(c=""+o),void 0!==e.key&&(c=""+e.key),void 0!==e.ref&&(p=e.ref),e)a.call(e,n)&&!i.hasOwnProperty(n)&&(l[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps)void 0===l[n]&&(l[n]=e[n]);return{$$typeof:r,type:t,key:c,ref:p,props:l,_owner:s.current}}e.Fragment=l,e.jsx=c,e.jsxs=c},893:(t,e,o)=>{"use strict";t.exports=o(251)},196:t=>{"use strict";t.exports=window.React},967:(t,e)=>{var o;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var t="",e=0;e<arguments.length;e++){var o=arguments[e];o&&(t=a(t,l(o)))}return t}function l(t){if("string"==typeof t||"number"==typeof t)return t;if("object"!=typeof t)return"";if(Array.isArray(t))return r.apply(null,t);if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]"))return t.toString();var e="";for(var o in t)n.call(t,o)&&t[o]&&(e=a(e,o));return e}function a(t,e){return e?t?t+" "+e:t+e:t}t.exports?(r.default=r,t.exports=r):void 0===(o=function(){return r}.apply(e,[]))||(t.exports=o)}()}},e={};function o(n){var r=e[n];if(void 0!==r)return r.exports;var l=e[n]={exports:{}};return t[n](l,l.exports,o),l.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";var t={};o.r(t),o.d(t,{name:()=>z,settings:()=>E});var e={};o.r(e),o.d(e,{name:()=>P,settings:()=>M});var n={};o.r(n),o.d(n,{name:()=>A,settings:()=>N});var r={};o.r(r),o.d(r,{name:()=>G,settings:()=>L});var l={};o.r(l),o.d(l,{name:()=>$,settings:()=>W});const a=window.wp.blocks;var s=o(893);const i=window.wp.i18n,c=window.wp.blockEditor;var p=o(196);const d=window.wp.primitives,u=(0,p.createElement)(d.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,p.createElement)(d.Path,{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v3.5h-15V5c0-.3.2-.5.5-.5zm8 5.5h6.5v3.5H13V10zm-1.5 3.5h-7V10h7v3.5zm-7 5.5v-4h7v4.5H5c-.3 0-.5-.2-.5-.5zm14.5.5h-6V15h6.5v4c0 .3-.2.5-.5.5z"})),v=window.wp.element,h=window.wp.components,m=window.wp.data;var b=o(967),w=o.n(b);function k(t){const{setAttributes:e,clientId:o}=t,[n,r]=(0,v.useState)(2),[l,a]=(0,v.useState)(2);return(0,s.jsx)(h.Placeholder,{label:(0,i.__)("Table","tp"),icon:(0,s.jsx)(c.BlockIcon,{icon:u,showColors:!0}),instructions:(0,i.__)("Insert a table for sharing data.","tp"),children:(0,s.jsxs)("form",{className:"travelopia-table__placeholder-form",onSubmit:t=>{t.preventDefault(),e({rows:n,columns:l}),F("tbody",o)},children:[(0,s.jsx)(h.TextControl,{type:"number",label:(0,i.__)("Column count","tp"),value:l,onChange:t=>a(parseInt(t)),min:"1",className:"travelopia-table__placeholder-input"}),(0,s.jsx)(h.TextControl,{type:"number",label:(0,i.__)("Row count","tp"),value:n,onChange:t=>r(parseInt(t)),min:"1",className:"travelopia-table__placeholder-input"}),(0,s.jsx)(h.Button,{variant:"primary",type:"submit",children:(0,i.__)("Create Table","tp")})]})})}const f=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,p.createElement)(d.Path,{d:"M6.656 6.464h2.88v2.88h1.408v-2.88h2.88V5.12h-2.88V2.24H9.536v2.88h-2.88zM0 17.92V0h20.48v17.92H0zm7.68-2.56h5.12v-3.84H7.68v3.84zm-6.4 0H6.4v-3.84H1.28v3.84zM19.2 1.28H1.28v9.024H19.2V1.28zm0 10.24h-5.12v3.84h5.12v-3.84zM6.656 6.464h2.88v2.88h1.408v-2.88h2.88V5.12h-2.88V2.24H9.536v2.88h-2.88zM0 17.92V0h20.48v17.92H0zm7.68-2.56h5.12v-3.84H7.68v3.84zm-6.4 0H6.4v-3.84H1.28v3.84zM19.2 1.28H1.28v9.024H19.2V1.28zm0 10.24h-5.12v3.84h5.12v-3.84z"})),_=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,p.createElement)(d.Path,{d:"M13.824 10.176h-2.88v-2.88H9.536v2.88h-2.88v1.344h2.88v2.88h1.408v-2.88h2.88zM0 17.92V0h20.48v17.92H0zM6.4 1.28H1.28v3.84H6.4V1.28zm6.4 0H7.68v3.84h5.12V1.28zm6.4 0h-5.12v3.84h5.12V1.28zm0 5.056H1.28v9.024H19.2V6.336z"})),g=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,p.createElement)(d.Path,{d:"M17.728 11.456L14.592 8.32l3.2-3.2-1.536-1.536-3.2 3.2L9.92 3.648 8.384 5.12l3.2 3.2-3.264 3.264 1.536 1.536 3.264-3.264 3.136 3.136 1.472-1.536zM0 17.92V0h20.48v17.92H0zm19.2-6.4h-.448l-1.28-1.28H19.2V6.4h-1.792l1.28-1.28h.512V1.28H1.28v3.84h6.208l1.28 1.28H1.28v3.84h7.424l-1.28 1.28H1.28v3.84H19.2v-3.84z"})),y=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,p.createElement)(d.Path,{d:"M6.4 3.776v3.648H2.752v1.792H6.4v3.648h1.728V9.216h3.712V7.424H8.128V3.776zM0 17.92V0h20.48v17.92H0zM12.8 1.28H1.28v14.08H12.8V1.28zm6.4 0h-5.12v3.84h5.12V1.28zm0 5.12h-5.12v3.84h5.12V6.4zm0 5.12h-5.12v3.84h5.12v-3.84z"})),x=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,p.createElement)(d.Path,{d:"M14.08 12.864V9.216h3.648V7.424H14.08V3.776h-1.728v3.648H8.64v1.792h3.712v3.648zM0 17.92V0h20.48v17.92H0zM6.4 1.28H1.28v3.84H6.4V1.28zm0 5.12H1.28v3.84H6.4V6.4zm0 5.12H1.28v3.84H6.4v-3.84zM19.2 1.28H7.68v14.08H19.2V1.28z"})),I=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},(0,p.createElement)(d.Path,{d:"M6.4 9.98L7.68 8.7v-.256L6.4 7.164V9.98zm6.4-1.532l1.28-1.28V9.92L12.8 8.64v-.192zm7.68 9.472V0H0v17.92h20.48zm-1.28-2.56h-5.12v-1.024l-.256.256-1.024-1.024v1.792H7.68v-1.792l-1.024 1.024-.256-.256v1.024H1.28V1.28H6.4v2.368l.704-.704.576.576V1.216h5.12V3.52l.96-.96.32.32V1.216h5.12V15.36zm-5.76-2.112l-3.136-3.136-3.264 3.264-1.536-1.536 3.264-3.264L5.632 5.44l1.536-1.536 3.136 3.136 3.2-3.2 1.536 1.536-3.2 3.2 3.136 3.136-1.536 1.536z"})),B=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,p.createElement)(d.Path,{d:"M20 11.2H6.8l3.7-3.7-1-1L3.9 12l5.6 5.5 1-1-3.7-3.7H20z"})),V=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,p.createElement)(d.Path,{d:"m14.5 6.5-1 1 3.7 3.7H4v1.6h13.2l-3.7 3.7 1 1 5.6-5.5z"})),j=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,p.createElement)(d.Path,{d:"M12 3.9 6.5 9.5l1 1 3.8-3.7V20h1.5V6.8l3.7 3.7 1-1z"})),S=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,p.createElement)(d.Path,{d:"m16.5 13.5-3.7 3.7V4h-1.5v13.2l-3.8-3.7-1 1 5.5 5.6 5.5-5.6z"})),C=(0,p.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,p.createElement)(d.Path,{d:"M4 6v11.5h16V6H4zm1.5 1.5h6V11h-6V7.5zm0 8.5v-3.5h6V16h-6zm13 0H13v-3.5h5.5V16zM13 11V7.5h5.5V11H13z"}));const H=function(t){const{attributes:e,setAttributes:o}=t,n=(0,c.useBlockProps)({className:"travelopia-table__cell"});return(0,s.jsx)(c.RichText,Object.assign({tagName:"span"},n,{placeholder:(0,i.__)("Cell content","tp"),onChange:t=>o({content:t}),value:e.content}))},z="travelopia/table-cell",E={apiVersion:3,icon:u,title:(0,i.__)("Cell","tp"),description:(0,i.__)("Individual cell of the table.","tp"),parent:["travelopia/table-column"],category:"text",keywords:[(0,i.__)("cell","tp")],attributes:{content:{type:"string",source:"html"}},supports:{html:!0,className:!1},transforms:{to:[{type:"block",blocks:["core/heading"],transform:(t,e)=>(0,a.createBlock)("core/heading",Object.assign(Object.assign({},t),{level:"3"}),e)},{type:"block",blocks:["core/paragraph"],transform:(t,e)=>(0,a.createBlock)("core/paragraph",t,e)},{type:"block",blocks:["core/list"],transform:(t,e)=>(0,a.createBlock)("core/list",{},[(0,a.createBlock)("core/list-item",t,e)])}]},edit:H,save:({attributes:t})=>(0,s.jsx)(c.RichText.Content,{value:t.content})};function O({isSelected:t,tableId:e,tableRow:o,tableColumn:n,rowContainerId:r,columnId:l}){const{getBlock:p,canInsertBlockType:d,getBlockAttributes:u,canRemoveBlock:b,getAdjacentBlockClientId:w}=(0,m.select)("core/block-editor"),{removeBlock:k,removeBlocks:H,insertBlock:E,updateBlockAttributes:O,moveBlocksToPosition:T}=(0,m.dispatch)("core/block-editor"),[M,D]=(0,v.useState)(0),N=(0,v.useMemo)((()=>{var t,e;return null===(e=null===(t=p(r))||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.type}),[r,p]);(0,v.useEffect)((()=>{const t=p(e);t?t.innerBlocks.some(((t,e)=>!(t.name!==A||e+1!==o||!t.innerBlocks.length)&&(D(t.innerBlocks.length),!0))):D(0)}),[o,n,p,e]);const R=(t=0)=>{var n,l;const s=p(e);if(!s)return;if(!d(A,r))return;const i=[];for(let t=0;t<(null===(n=s.attributes)||void 0===n?void 0:n.columns);t++)i.push((0,a.createBlock)(P,{},[(0,a.createBlock)(z)]));const c=(0,a.createBlock)(A,{},i);E(c,o+t,r),O(e,{rows:(null===(l=s.attributes)||void 0===l?void 0:l.rows)+1})},L=(t=0)=>{var o;const l=p(e);if(!l)return;p(r)&&(l.innerBlocks.forEach((e=>{e.name===G&&e.innerBlocks.forEach((e=>{if(e.name!==A)return;if(!d(P,e.clientId))return;const o=(0,a.createBlock)(P,{},[(0,a.createBlock)(z)]);E(o,n+t,e.clientId)}))})),O(e,{columns:(null===(o=l.attributes)||void 0===o?void 0:o.columns)+1}))},F=(t,e)=>{var o,n,r,l;const a=u(e.clientId),s=u(t.clientId);if(parseInt(null!==(o=null==a?void 0:a.rowSpan)&&void 0!==o?o:1)!==parseInt(null!==(n=null==s?void 0:s.rowSpan)&&void 0!==n?n:1))return;const i=parseInt(null!==(r=null==a?void 0:a.colSpan)&&void 0!==r?r:1),c=parseInt(null!==(l=null==s?void 0:s.colSpan)&&void 0!==l?l:1);O(e.clientId,{colSpan:i+c}),T(t.innerBlocks.map((t=>t.clientId)),t.clientId,e.clientId),k(t.clientId)},U=(t,e)=>{var o,n,r,l;const a=u(e.clientId),s=u(t.clientId);if(parseInt(null!==(o=null==a?void 0:a.colSpan)&&void 0!==o?o:1)!==parseInt(null!==(n=null==s?void 0:s.colSpan)&&void 0!==n?n:1))return;const i=parseInt(null!==(r=null==a?void 0:a.rowSpan)&&void 0!==r?r:1),c=parseInt(null!==(l=null==s?void 0:s.rowSpan)&&void 0!==l?l:1);O(e.clientId,{rowSpan:i+c}),T(t.innerBlocks.map((t=>t.clientId)),t.clientId,e.clientId),k(t.clientId)},Y=[{icon:f,title:(0,i.__)("Insert row before","tp"),isDisabled:!t||"tfoot"===N||"thead"===N,onClick:()=>R(-1)},{icon:_,title:(0,i.__)("Insert row after","tp"),isDisabled:!t||"tfoot"===N||"thead"===N,onClick:R},{icon:g,title:(0,i.__)("Delete row","tp"),isDisabled:!t||"tfoot"===N||"thead"===N,onClick:()=>{var t;const n=p(e);if(!n)return;const l=p(r);if(!l)return;const a=l.innerBlocks[o-1];(null==a?void 0:a.clientId)&&b(a.clientId)&&(k(a.clientId),O(e,{rows:(null===(t=n.attributes)||void 0===t?void 0:t.rows)-1}))}},{icon:y,title:(0,i.__)("Insert column before","tp"),isDisabled:!t,onClick:()=>L(-1)},{icon:x,title:(0,i.__)("Insert column after","tp"),isDisabled:!t,onClick:L},{icon:I,title:(0,i.__)("Delete column","tp"),isDisabled:!t,onClick:()=>{var t;const o=p(e);if(!o)return;const r=[];o.innerBlocks.forEach((t=>{t.name===G&&t.innerBlocks.forEach((t=>{if(t.name!==A)return;const e=t.innerBlocks[n-1];(null==e?void 0:e.clientId)&&b(e.clientId)&&r.push(e.clientId)}))})),H(r),O(e,{columns:(null===(t=o.attributes)||void 0===t?void 0:t.columns)-1})}},{icon:B,title:(0,i.__)("Merge column left","tp"),isDisabled:n<2,onClick:()=>{if(!p(e))return;const t=p(l);if(!t)return;const o=w(l,-1);if(!o)return;const n=p(o);n&&F(t,n)}},{icon:V,title:(0,i.__)("Merge column right","tp"),isDisabled:n===M,onClick:()=>{if(!p(e))return;const t=p(l);if(!t)return;const o=w(l,1);if(!o)return;const n=p(o);n&&F(n,t)}},{icon:j,title:(0,i.__)("Merge column up","tp"),isDisabled:o<2||"tfoot"===N||"thead"===N,onClick:()=>{const t=p(e);if(!t)return;const l=p(r);if(!l)return;let a,s;t.innerBlocks.some((t=>{var e;if(t.name!==G)return!1;const r=u(t.clientId);return(null==r?void 0:r.type)===(null===(e=null==l?void 0:l.attributes)||void 0===e?void 0:e.type)&&t.innerBlocks.some(((t,e)=>{const r=e+1;return!(t.name!==A||r!==o&&r!==o-1||!t.innerBlocks.length)&&(t.innerBlocks.some(((t,e)=>{const l=e+1;return l===n&&r===o?s=t:l===n&&r===o-1&&(a=t),!(!a||!s)})),!(!s||!a)&&(U(s,a),!0))}))}))}},{icon:S,title:(0,i.__)("Merge column down","tp"),isDisabled:"tfoot"===N||"thead"===N,onClick:()=>{const t=p(e);if(!t)return;const l=p(r);if(!l)return;let a,s;t.innerBlocks.some((t=>{var e;if(t.name!==G)return!1;const r=u(t.clientId);return(null==r?void 0:r.type)===(null===(e=null==l?void 0:l.attributes)||void 0===e?void 0:e.type)&&t.innerBlocks.some(((t,e)=>{const r=e+1;return!(t.name!==A||r!==o&&r!==o+1||!t.innerBlocks.length)&&(t.innerBlocks.some(((t,e)=>{const l=e+1;return l===n&&r===o?a=t:l===n&&r===o+1&&(s=t),!(!a||!s)})),!(!s||!a)&&(U(s,a),!0))}))}))}}];return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(c.BlockControls,{group:"other",children:(0,s.jsx)(h.ToolbarDropdownMenu,{icon:C,label:(0,i.__)("Edit table","tp"),controls:Y})})})}const T=function({className:t,clientId:e,attributes:o,setAttributes:n,isSelected:r,context:l}){const a=(0,c.useBlockProps)({className:w()(t,"travelopia-table__column",{"travelopia-table__column--sticky":o.isSticky})}),p=l["travelopia/table-id"],d=l["travelopia/table-row-container-type"],u=l["travelopia/table-row-container-id"],b=(0,c.useInnerBlocksProps)(Object.assign(Object.assign({},a),{colSpan:o.colSpan,rowSpan:o.rowSpan}),{template:[[z]],templateLock:!1}),{row:k,column:f}=(0,m.useSelect)((t=>{const o=t(c.store).getBlockIndex(e),n=t(c.store).getBlockRootClientId(e);return{row:t(c.store).getBlockIndex(n)+1,column:o+1,rowClientId:n}}),[e]);(0,v.useEffect)((()=>{n({row:k,column:f})}),[k,f,n]),(0,v.useEffect)((()=>{n({blockId:e})}),[e,n]);let _="td";return"tbody"!==d&&(_="th"),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c.InspectorControls,{children:(0,s.jsx)(h.PanelBody,{title:(0,i.__)("Column Options","tp"),children:(0,s.jsx)(h.ToggleControl,{label:(0,i.__)("Is Sticky","tp"),checked:o.isSticky,onChange:t=>n({isSticky:t}),help:(0,i.__)("Is this column sticky?","tp")})})}),(0,s.jsx)(O,{isSelected:r,tableRow:k,tableColumn:f,tableId:p,rowContainerId:u,columnId:e}),(0,s.jsx)(_,Object.assign({},b))]})},P="travelopia/table-column",M={apiVersion:3,icon:u,title:(0,i.__)("Column","tp"),description:(0,i.__)("Individual column of the table.","tp"),parent:["travelopia/table-row"],category:"text",keywords:[(0,i.__)("column","tp")],attributes:{row:{type:"number"},column:{type:"number"},colSpan:{type:"number"},rowSpan:{type:"number"},isSticky:{type:"boolean"},blockId:{type:"string"}},providesContext:{"travelopia/table-row":"row","travelopia/table-column":"column","travelopia/table-column-id":"blockId"},usesContext:["travelopia/table-row-container-type","travelopia/table-row-container-id"],supports:{html:!0,color:{text:!0,background:!0},align:["left","center","right"]},edit:T,save:()=>(0,s.jsx)(c.InnerBlocks.Content,{})};const D=function(t){const{className:e,clientId:o,setAttributes:n}=t,r=(0,c.useBlockProps)({className:w()(e,"travelopia-table__row")}),l=(0,c.useInnerBlocksProps)(Object.assign({},r),{allowedBlocks:[P],templateLock:!1});return(0,v.useEffect)((()=>{n({blockId:o})}),[o]),(0,s.jsx)("tr",Object.assign({},l))},A="travelopia/table-row",N={apiVersion:3,icon:u,title:(0,i.__)("Row","tp"),description:(0,i.__)("Individual row of the table.","tp"),parent:["travelopia/table-row-container"],category:"text",keywords:[(0,i.__)("row","tp")],attributes:{blockId:{type:"string"}},usesContext:["travelopia/table-row-container-type"],supports:{html:!0,color:{text:!0,background:!0}},edit:D,save:()=>(0,s.jsx)(c.InnerBlocks.Content,{})};const R=function(t){const{className:e,attributes:o,setAttributes:n,clientId:r}=t,l=(0,c.useBlockProps)({className:w()(e,"travelopia-table__row-container",{"travelopia-table__row-container--sticky":o.isSticky})}),a=(0,c.useInnerBlocksProps)(Object.assign({},l),{allowedBlocks:[A]}),p=o.type;return(0,v.useEffect)((()=>{n({blockId:r})}),[r,n]),(0,s.jsxs)(s.Fragment,{children:["thead"===o.type&&(0,s.jsx)(c.InspectorControls,{children:(0,s.jsx)(h.PanelBody,{title:(0,i.__)("Row Container Options","tp"),children:(0,s.jsx)(h.ToggleControl,{label:(0,i.__)("Is Sticky vertically","tp"),checked:o.isSticky,onChange:t=>n({isSticky:t}),help:(0,i.__)("Is this container sticky?","tp")})})}),(0,s.jsx)(p,Object.assign({},a))]})},G="travelopia/table-row-container",L={apiVersion:3,icon:u,title:(0,i.__)("Row Container","tp"),description:(0,i.__)("A container for a row (THEAD, TBODY, TFOOT).","tp"),parent:["travelopia/table"],category:"text",keywords:[(0,i.__)("thead","tp"),(0,i.__)("tbody","tp"),(0,i.__)("tfoot","tp")],attributes:{type:{type:"string",default:"tbody"},isSticky:{type:"boolean",default:!1},blockId:{type:"string"}},providesContext:{"travelopia/table-row-container-type":"type","travelopia/table-row-container-sticky":"isSticky","travelopia/table-row-container-id":"blockId"},supports:{html:!1},edit:R,save:()=>(0,s.jsx)(c.InnerBlocks.Content,{})},F=(t="tbody",e="")=>{const o=(0,m.select)("core/block-editor").getBlock(e);if(!o)return;const n=(0,a.createBlock)(G,{type:t});let r=o.attributes.rows;"tbody"!==t&&(r=1);for(let t=0;t<r;t++){const t=[];for(let e=0;e<o.attributes.columns;e++)t.push((0,a.createBlock)(P,{},[(0,a.createBlock)(z)]));n.innerBlocks.push((0,a.createBlock)(A,{},t))}if("tbody"===t)(0,m.dispatch)("core/block-editor").replaceInnerBlocks(e,[n]);else{const r="thead"===t?0:o.innerBlocks.length;(0,m.dispatch)("core/block-editor").insertBlock(n,r,e)}},U=(t="thead",e="")=>{const o=(0,m.select)("core/block-editor").getBlock(e);o&&o.innerBlocks.length&&o.innerBlocks.forEach((e=>{var o;(null===(o=e.attributes)||void 0===o?void 0:o.type)===t&&(0,m.dispatch)("core/block-editor").removeBlock(e.clientId)}))};const Y=function(t){const{className:e,attributes:o,clientId:n,setAttributes:r}=t,l=(0,c.useBlockProps)({className:w()(e,"travelopia-table")}),a=(0,c.useInnerBlocksProps)({},{allowedBlocks:[G],renderAppender:void 0});return(0,v.useEffect)((()=>{r({blockId:n})}),[n,r]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c.InspectorControls,{children:(0,s.jsxs)(h.PanelBody,{title:(0,i.__)("Table Options","tp"),children:[(0,s.jsx)(h.ToggleControl,{label:(0,i.__)("Has THEAD","tp"),checked:o.hasThead,onChange:t=>{t?F("thead",n):U("thead",n),r({hasThead:t})},help:(0,i.__)("Does this table have a header?","tp")}),(0,s.jsx)(h.ToggleControl,{label:(0,i.__)("Has TFOOT","tp"),checked:o.hasTfoot,onChange:t=>{t?F("tfoot",n):U("tfoot",n),r({hasTfoot:t})},help:(0,i.__)("Does this table have a footer?","tp")})]})}),(0,s.jsxs)("figure",Object.assign({},l,{children:[(0===o.rows||0===o.columns)&&(0,s.jsx)(k,Object.assign({},t)),(0!==o.rows||0!==o.columns)&&(0,s.jsx)("table",Object.assign({},a))]}))]})},$="travelopia/table",W={apiVersion:3,icon:u,title:(0,i.__)("Table","tp"),description:(0,i.__)("Create structured content in rows and columns to display information.","tp"),category:"text",keywords:[(0,i.__)("table","tp")],attributes:{anchor:{type:"string"},rows:{type:"number",default:0},columns:{type:"number",default:0},blockId:{type:"string"},hasThead:{type:"boolean",default:!1},hasTfoot:{type:"boolean",default:!1}},providesContext:{"travelopia/table-id":"blockId","travelopia/table-total-rows":"rows","travelopia/table-total-columns":"columns","travelopia/table-has-thead":"hasThead","travelopia/table-has-tfoot":"hasTfoot"},supports:{anchor:!0},edit:Y,save:()=>(0,s.jsx)(c.InnerBlocks.Content,{})},q=window.wp.hooks;(0,q.addFilter)("blocks.registerBlockType","travelopia/table-row-column-context",(t=>{const e=["travelopia/table-row","travelopia/table-column","travelopia/table-id","travelopia/table-row-container-id","travelopia/table-column-id"];return t.usesContext&&Array.isArray(t.usesContext)&&e.forEach((e=>{var o,n;(null===(o=t.usesContext)||void 0===o?void 0:o.includes(e))||null===(n=t.usesContext)||void 0===n||n.push(e)})),t})),(0,q.addFilter)("editor.BlockEdit","travelopia/table-toolbar",(t=>e=>{const{context:o,isSelected:n}=e;if(!o)return(0,s.jsx)(t,Object.assign({},e));const r=o["travelopia/table-row"],l=o["travelopia/table-column"],a=o["travelopia/table-id"],i=o["travelopia/table-row-container-id"],c=o["travelopia/table-column-id"];return!r||!l||!a||l<1||r<1?(0,s.jsx)(t,Object.assign({},e)):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(O,{isSelected:n,tableRow:r,tableColumn:l,tableId:a,rowContainerId:i,columnId:c}),(0,s.jsx)(t,Object.assign({},e))]})}));[l,r,n,e,t].forEach((({name:t,settings:e})=>(0,a.registerBlockType)(t,e)))})()})();