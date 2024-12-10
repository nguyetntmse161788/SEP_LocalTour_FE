import{r as s,j as a,D as y,B as T,T as R,C as A,W as B,i as N,k as D,o as F,Y as k,H as v}from"./index-JURld8WI.js";import{C as I}from"./config-global-BwHnWRtc.js";import{a as $}from"./axiosInstance-CjnSQzAP.js";import{a as E,g as O,P as H,b as L,c as U,T as V,e as z,d as G}from"./place-table-toolbar-DSxNmNhR.js";import"./DialogTitle-CQRIIkos.js";import"./Autocomplete-DoDIWFyo.js";import"./TextField-BAa1lkAG.js";import"./InputLabel-CrY5KikR.js";const W=async(c=1,d=5,u="vi",P="",n="")=>{const m=localStorage.getItem("accessToken");if(console.log("Access Token:",m),!m)return console.error("No access token found"),{items:[],totalCount:0};try{const o=await $.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${u}&Page=${c}&Size=${d}&SearchTerm=${encodeURIComponent(P)}&Status=${n}`,{headers:{Authorization:`Bearer ${m}`}});return console.log("API Response:",o.data),{items:o.data.items,totalCount:o.data.totalCount}}catch(o){return console.error("Error fetching places",o),{items:[],totalCount:0}}};function Q(){const[c,d]=s.useState([]),[u,P]=s.useState(0),[n,m]=s.useState(""),[o,b]=s.useState("vi"),[g,p]=s.useState(1),[i,f]=s.useState(5),[S,r]=s.useState("");s.useEffect(()=>{(async()=>{const{items:l,totalCount:h}=await W(g,i,o,n,S);d(l),P(h)})()},[g,i,o,n,S]);const e=Y(),x=E({inputData:c,comparator:O(e.order,e.orderBy),filterName:n,filterStatus:S}),C=t=>{d(l=>l.filter(h=>h.id!==t))},w=t=>{d(l=>l.map(h=>h.id===t.id?t:h))},j=!x.length&&!!n;return a.jsxs(y,{children:[a.jsx(T,{display:"flex",alignItems:"center",mb:5,children:a.jsx(R,{variant:"h4",flexGrow:1,children:"Places"})}),a.jsxs(A,{children:[a.jsx(H,{numSelected:e.selected.length,filterName:n,onFilterName:t=>{m(t.target.value),p(1)},onFilterStatus:t=>{r(t||""),p(1)}}),a.jsx(B,{children:a.jsx(N,{sx:{overflow:"unset"},children:a.jsxs(D,{sx:{minWidth:800},children:[a.jsx(L,{order:e.order,orderBy:e.orderBy,rowCount:c.length,numSelected:e.selected.length,onSort:e.onSort,onSelectAllRows:t=>e.onSelectAllRows(t,c.map(l=>l.id)),headLabel:[{id:"name",label:"Name"},{id:"address",label:"Address"},{id:"description",label:"Description"},{id:"isVerify",label:"isVerify"},{id:"status",label:"Status"},{id:"View details",label:"View details"},{id:""}]}),a.jsxs(F,{children:[x.slice(e.page*i,e.page*i+i).map(t=>a.jsx(U,{row:t,selected:e.selected.includes(t.id),onSelectRow:()=>e.onSelectRow(t.id),onDeletePlace:C,onUpdatePlace:w},t.id)),a.jsx(V,{height:68,emptyRows:z(e.page,e.rowsPerPage,c.length)}),j&&a.jsx(G,{searchQuery:n})]})]})})}),a.jsx(k,{component:"div",page:g-1,count:u,rowsPerPage:i,onPageChange:(t,l)=>p(l+1),rowsPerPageOptions:[5,10,25],onRowsPerPageChange:t=>{f(parseInt(t.target.value,10)),p(1)}})]})]})}function Y(){const[c,d]=s.useState(0),[u,P]=s.useState("name"),[n,m]=s.useState(5),[o,b]=s.useState([]),[g,p]=s.useState("asc"),i=s.useCallback(r=>{p(u===r&&g==="asc"?"desc":"asc"),P(r)},[g,u]),f=s.useCallback((r,e)=>{if(r){b(e);return}b([])},[]),S=s.useCallback(r=>{const e=o.includes(r)?o.filter(x=>x!==r):[...o,r];b(e)},[o]);return{order:g,orderBy:u,rowsPerPage:n,selected:o,page:c,onSort:i,onSelectAllRows:f,onSelectRow:S,onResetPage:()=>d(0)}}function te(){return a.jsxs(a.Fragment,{children:[a.jsx(v,{children:a.jsxs("title",{children:[" ",`Places - ${I.appName}`]})}),a.jsx(Q,{})]})}export{te as default};
