import{j as e,m as D,n as b,B as k,T as v,r as i,K as M,Z as Q,A as Z,I as A,$ as _,R as I,h as y,l as J,a0 as X,N as ee,O as te,F as se,Q as ne,y as ae,D as re,C as oe,W as le,i as ie,k as ce,o as de,Y as he,H as ue}from"./index-JURld8WI.js";import{C as pe}from"./config-global-BwHnWRtc.js";import{a as O}from"./axiosInstance-CjnSQzAP.js";import{D as W,a as z,b as V,c as H}from"./DialogTitle-CQRIIkos.js";import{A as xe}from"./Autocomplete-DoDIWFyo.js";import{T as ge}from"./TextField-BAa1lkAG.js";import"./InputLabel-CrY5KikR.js";function fe({searchQuery:t,...s}){return e.jsx(D,{...s,children:e.jsx(b,{align:"center",colSpan:7,children:e.jsxs(k,{sx:{py:15,textAlign:"center"},children:[e.jsx(v,{variant:"h6",sx:{mb:1},children:"Not found"}),e.jsxs(v,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}function me({row:t,selected:s,onSelectRow:a,onDeletePlace:u,onUpdatePlace:n}){var U,B,$,E;const[h,r]=i.useState(!1),[c,m]=i.useState([]),[j,g]=i.useState(null),[C,o]=i.useState(""),[x,l]=i.useState(!1),S=M(),N=localStorage.getItem("userId"),R=async()=>{r(!0);try{const p=localStorage.getItem("accessToken"),f=await O.get("https://api.localtour.space/api/User/getListByRole?roleName=Service%20Owner",{headers:{Authorization:`Bearer ${p}`}});if(f.status===200){const q=f.data.filter(K=>K.id!==N);m(q)}}catch(p){console.error("Error fetching users:",p)}},P=()=>{r(!1),g(null)},d=async()=>{if(!j){alert("Please select a user to transfer ownership.");return}try{const p=localStorage.getItem("accessToken"),f=await O.put(`https://api.localtour.space/api/Place/transferAuthor?placeid=${t.id}&userIdTransfer=${j.id}`,{},{headers:{Authorization:`Bearer ${p}`}});f.status===200&&(alert("Ownership transferred successfully."),P(),n(f.data))}catch(p){console.error("Error transferring ownership:",p),alert("Failed to transfer ownership.")}},T=p=>{p.stopPropagation(),S(`/owner/place/${t.id}`)},w=()=>{l(!0)},F=()=>{l(!1)},Y=()=>{l(!1),d()};return e.jsxs(e.Fragment,{children:[e.jsxs(D,{hover:!0,tabIndex:-1,role:"checkbox",selected:s,children:[e.jsx(b,{padding:"checkbox",children:e.jsx(Q,{disableRipple:!0,checked:s,onChange:a})}),e.jsx(b,{component:"th",scope:"row",children:e.jsxs(k,{gap:2,display:"flex",alignItems:"center",children:[e.jsx(Z,{alt:((U=t.placeTranslation[0])==null?void 0:U.name)||"N/A",src:t.photoDisplay}),((B=t.placeTranslation[0])==null?void 0:B.name)||"N/A"]})}),e.jsx(b,{children:(($=t.placeTranslation[0])==null?void 0:$.address)||"N/A"}),e.jsx(b,{children:((E=t.placeTranslation[0])==null?void 0:E.description)||"N/A"}),e.jsx(b,{align:"center",children:t.status==="Pending"?"-":e.jsx(A,{width:22,icon:"solar:check-circle-bold",sx:{color:"success.main"}})}),e.jsx(b,{children:e.jsx(_,{color:t.status==="Pending"?"warning":t.status==="Approved"?"success":t.status==="Rejected"?"error":"default",children:t.status})}),e.jsx(b,{align:"right",children:e.jsx(I,{onClick:T,children:e.jsx(A,{icon:"eva:arrow-forward-outline",width:22})})}),e.jsx(b,{children:e.jsx(y,{variant:"outlined",color:"primary",size:"small",onClick:R,children:"User Transfer"})})]}),e.jsxs(W,{open:x,onClose:F,children:[e.jsx(z,{children:"Confirm Transfer"}),e.jsx(V,{children:e.jsx(v,{variant:"body1",children:"Are you sure you want to transfer this place to another user?"})}),e.jsxs(H,{children:[e.jsx(y,{onClick:F,color:"secondary",children:"No"}),e.jsx(y,{onClick:Y,color:"primary",children:"Yes"})]})]}),e.jsxs(W,{open:h,onClose:P,children:[e.jsx(z,{children:"Transfer Ownership"}),e.jsx(V,{children:e.jsx(xe,{options:c,getOptionLabel:p=>`${p.username}`,value:j,onChange:(p,f)=>g(f),renderInput:p=>e.jsx(ge,{...p,label:"Select User",variant:"outlined",fullWidth:!0,margin:"normal"}),isOptionEqualToValue:(p,f)=>p.id===(f==null?void 0:f.id),filterOptions:(p,f)=>p.filter(L=>L.username.toLowerCase().includes(f.inputValue.toLowerCase()))})}),e.jsxs(H,{children:[e.jsx(y,{onClick:P,color:"secondary",children:"Cancel"}),e.jsx(y,{onClick:w,color:"primary",variant:"contained",children:"Transfer"})]})]})]})}const je={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function be(t,s,a){return t?Math.max(0,(1+t)*s-a):0}const Te=(t,s)=>(a,u)=>{if(s==="status"){const n=Number(a.status),h=Number(u.status);return t==="asc"?n-h:h-n}return 0},Ce=({inputData:t,comparator:s,filterName:a,filterStatus:u})=>{const n=[...t];return n.sort(s),n};function Se({order:t,onSort:s,orderBy:a,rowCount:u,headLabel:n,numSelected:h,onSelectAllRows:r}){return e.jsx(J,{children:e.jsxs(D,{children:[e.jsx(b,{padding:"checkbox",children:e.jsx(Q,{indeterminate:h>0&&h<u,checked:u>0&&h===u,onChange:c=>r(c.target.checked)})}),n.map(c=>e.jsx(b,{align:c.align||"left",sortDirection:a===c.id?t:!1,sx:{width:c.width,minWidth:c.minWidth},children:e.jsxs(X,{hideSortIcon:!0,active:a===c.id,direction:a===c.id?t:"asc",onClick:()=>s(c.id),children:[c.label,a===c.id?e.jsx(k,{sx:{...je},children:t==="desc"?"sorted descending":"sorted ascending"}):null]})},c.id))]})})}function ye({emptyRows:t,height:s,sx:a,...u}){return t?e.jsx(D,{sx:{...s&&{height:s*t},...a},...u,children:e.jsx(b,{colSpan:9})}):null}function Pe({numSelected:t,filterName:s,onFilterName:a,onFilterStatus:u}){const[n,h]=i.useState(null),[r,c]=i.useState(null),m=o=>{const x=o==="All"?"":o;c(x),u(x),h(null)},j=o=>{h(o.currentTarget)},g=()=>{h(null)},C=!!n;return e.jsxs(ee,{sx:{height:96,display:"flex",justifyContent:"space-between",p:o=>o.spacing(0,1,0,3),...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?e.jsxs(v,{component:"div",variant:"subtitle1",children:[t," selected"]}):e.jsx(te,{fullWidth:!0,value:s,onChange:a,placeholder:"Search place...",startAdornment:e.jsx(se,{position:"start",children:e.jsx(A,{width:20,icon:"eva:search-fill",sx:{color:"text.disabled"}})}),sx:{maxWidth:320}}),t>0?e.jsx(I,{children:e.jsx(A,{icon:"solar:trash-bin-trash-bold"})}):e.jsxs(e.Fragment,{children:[e.jsx(ne,{title:"Filter list",children:e.jsx(I,{onClick:j,children:e.jsx(A,{icon:"ic:round-filter-list"})})}),e.jsx(ae,{open:C,anchorEl:n,onClose:g,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(k,{sx:{p:2,display:"flex",flexDirection:"column",gap:1},children:["All","Pending","Approved","Rejected"].map(o=>e.jsx(y,{variant:r===(o==="All"?null:o)?"contained":"outlined",onClick:()=>m(o==="All"?null:o),sx:{color:r===(o==="All"?null:o)?"text.primary":"text.secondary",borderColor:"text.secondary"},children:o},o))})})]})]})}const G=async(t=1,s=5,a="vi",u="",n="")=>{const h=localStorage.getItem("accessToken");if(console.log("Access Token:",h),!h)return console.error("No access token found"),{items:[],totalCount:0};try{const r=await O.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${a}&Page=${t}&Size=${s}&SearchTerm=${encodeURIComponent(u)}&Status=${n}`,{headers:{Authorization:`Bearer ${h}`}});return console.log("API Response:",r.data),{items:r.data.items,totalCount:r.data.totalCount}}catch(r){return console.error("Error fetching places",r),{items:[],totalCount:0}}};function we(){const[t,s]=i.useState([]),[a,u]=i.useState(0),[n,h]=i.useState(""),[r,c]=i.useState("vi"),[m,j]=i.useState(1),[g,C]=i.useState(5),[o,x]=i.useState("");i.useEffect(()=>{(async()=>{const{items:T,totalCount:w}=await G(m,g,r,n,o);s(T),u(w)})()},[m,g,r,n,o]);const l=Ae(),S=Ce({inputData:t,comparator:Te(l.order,l.orderBy),filterName:n,filterStatus:o}),N=d=>{s(T=>T.filter(w=>w.id!==d))},R=async()=>{const{items:d,totalCount:T}=await G(m,g,r,n,o);s(d),u(T)},P=!S.length&&!!n;return e.jsxs(re,{children:[e.jsx(k,{display:"flex",alignItems:"center",mb:5,children:e.jsx(v,{variant:"h4",flexGrow:1,children:"Places"})}),e.jsxs(oe,{children:[e.jsx(Pe,{numSelected:l.selected.length,filterName:n,onFilterName:d=>{h(d.target.value),j(1)},onFilterStatus:d=>{x(d||""),j(1)}}),e.jsx(le,{children:e.jsx(ie,{sx:{overflow:"unset"},children:e.jsxs(ce,{sx:{minWidth:800},children:[e.jsx(Se,{order:l.order,orderBy:l.orderBy,rowCount:t.length,numSelected:l.selected.length,onSort:l.onSort,onSelectAllRows:d=>l.onSelectAllRows(d,t.map(T=>T.id)),headLabel:[{id:"name",label:"Name"},{id:"address",label:"Address"},{id:"description",label:"Description"},{id:"isVerify",label:"isVerify"},{id:"status",label:"Status"},{id:"View details",label:"View details"},{id:"User Tranfer",label:"User Tranfer"}]}),e.jsxs(de,{children:[S.slice(l.page*g,l.page*g+g).map(d=>e.jsx(me,{row:d,selected:l.selected.includes(d.id),onSelectRow:()=>l.onSelectRow(d.id),onDeletePlace:N,onUpdatePlace:R},d.id)),e.jsx(ye,{height:68,emptyRows:be(l.page,l.rowsPerPage,t.length)}),P&&e.jsx(fe,{searchQuery:n})]})]})})}),e.jsx(he,{component:"div",page:m-1,count:a,rowsPerPage:g,onPageChange:(d,T)=>j(T+1),rowsPerPageOptions:[5,10,25],onRowsPerPageChange:d=>{C(parseInt(d.target.value,10)),j(1)}})]})]})}function Ae(){const[t,s]=i.useState(0),[a,u]=i.useState("name"),[n,h]=i.useState(5),[r,c]=i.useState([]),[m,j]=i.useState("asc"),g=i.useCallback(x=>{j(a===x&&m==="asc"?"desc":"asc"),u(x)},[m,a]),C=i.useCallback((x,l)=>{if(x){c(l);return}c([])},[]),o=i.useCallback(x=>{const l=r.includes(x)?r.filter(S=>S!==x):[...r,x];c(l)},[r]);return{order:m,orderBy:a,rowsPerPage:n,selected:r,page:t,onSort:g,onSelectAllRows:C,onSelectRow:o,onResetPage:()=>s(0)}}function Fe(){return e.jsxs(e.Fragment,{children:[e.jsx(ue,{children:e.jsxs("title",{children:[" ",`User Tranfer - ${pe.appName}`]})}),e.jsx(we,{})]})}export{Fe as default};
