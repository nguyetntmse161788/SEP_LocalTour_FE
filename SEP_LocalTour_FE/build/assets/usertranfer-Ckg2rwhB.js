import{j as e,B as k,T as v,r as i,w as _,A as J,I as A,x as K,y as R,h as y,z as X,p as Z,D as ee,C as te,H as se}from"./index-Cc_uhaw2.js";import{C as re}from"./config-global-DYC5wpSI.js";import{a as O}from"./axiosInstance-DxRYDP1x.js";import{c as D,d as b,b as ne,T as ae,a as oe,e as le}from"./TableRow-D6UDr9Xq.js";import{C as q}from"./Checkbox-vnf7N2Ff.js";import{D as z,a as W,b as V,c as H}from"./DialogTitle-DsJ-pNoJ.js";import{A as ie}from"./Autocomplete-CE2ucrPx.js";import{T as ce}from"./TextField-D9kvPmME.js";import{T as de,a as he,b as ue}from"./TableSortLabel-B-9zB2P1.js";import{O as pe}from"./Select-DNzxC7qm.js";import{I as xe}from"./InputAdornment-CxX4agxn.js";import{C as ge}from"./Card-aOnlRS-j.js";import"./useFormControl-La3rWkRi.js";import"./Popper-CNsN0Zo1.js";import"./usePreviousProps-B5FCVLHW.js";import"./InputLabel-CpWSz3oH.js";import"./LastPage-CV_-hBrB.js";function fe({searchQuery:t,...s}){return e.jsx(D,{...s,children:e.jsx(b,{align:"center",colSpan:7,children:e.jsxs(k,{sx:{py:15,textAlign:"center"},children:[e.jsx(v,{variant:"h6",sx:{mb:1},children:"Not found"}),e.jsxs(v,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}function me({row:t,selected:s,onSelectRow:n,onDeletePlace:u,onUpdatePlace:r}){var U,B,$,E;const[h,a]=i.useState(!1),[c,j]=i.useState([]),[f,g]=i.useState(null),[C,o]=i.useState(""),[x,l]=i.useState(!1),S=_(),I=localStorage.getItem("userId"),N=async()=>{a(!0);try{const p=localStorage.getItem("accessToken"),m=await O.get("https://api.localtour.space/api/User/getListByRole?roleName=Service%20Owner",{headers:{Authorization:`Bearer ${p}`}});if(m.status===200){const Q=m.data.filter(Y=>Y.id!==I);j(Q)}}catch(p){console.error("Error fetching users:",p)}},P=()=>{a(!1),g(null)},d=async()=>{if(!f){alert("Please select a user to transfer ownership.");return}try{const p=localStorage.getItem("accessToken"),m=await O.put(`https://api.localtour.space/api/Place/transferAuthor?placeid=${t.id}&userIdTransfer=${f.id}`,{},{headers:{Authorization:`Bearer ${p}`}});m.status===200&&(alert("Ownership transferred successfully."),P(),r(m.data))}catch(p){console.error("Error transferring ownership:",p),alert("Failed to transfer ownership.")}},T=p=>{p.stopPropagation(),S(`/owner/place/${t.id}`)},w=()=>{if(!f){alert("Please select a user to transfer ownership.");return}l(!0)},F=()=>{l(!1)},M=()=>{l(!1),d()};return e.jsxs(e.Fragment,{children:[e.jsxs(D,{hover:!0,tabIndex:-1,role:"checkbox",selected:s,children:[e.jsx(b,{padding:"checkbox",children:e.jsx(q,{disableRipple:!0,checked:s,onChange:n})}),e.jsx(b,{component:"th",scope:"row",children:e.jsxs(k,{gap:2,display:"flex",alignItems:"center",children:[e.jsx(J,{alt:((U=t.placeTranslation[0])==null?void 0:U.name)||"N/A",src:t.photoDisplay}),((B=t.placeTranslation[0])==null?void 0:B.name)||"N/A"]})}),e.jsx(b,{children:(($=t.placeTranslation[0])==null?void 0:$.address)||"N/A"}),e.jsx(b,{children:((E=t.placeTranslation[0])==null?void 0:E.description)||"N/A"}),e.jsx(b,{align:"center",children:t.status==="Pending"?"-":e.jsx(A,{width:22,icon:"solar:check-circle-bold",sx:{color:"success.main"}})}),e.jsx(b,{children:e.jsx(K,{color:t.status==="Pending"?"warning":t.status==="Approved"?"success":t.status==="Rejected"?"error":"default",children:t.status})}),e.jsx(b,{align:"right",children:e.jsx(R,{onClick:T,children:e.jsx(A,{icon:"eva:arrow-forward-outline",width:22})})}),e.jsx(b,{children:e.jsx(y,{variant:"outlined",color:"primary",size:"small",onClick:N,children:"User Transfer"})})]}),e.jsxs(z,{open:x,onClose:F,children:[e.jsx(W,{children:"Confirm Transfer"}),e.jsx(V,{children:e.jsx(v,{variant:"body1",children:"Are you sure you want to transfer this place to another user?"})}),e.jsxs(H,{children:[e.jsx(y,{onClick:F,color:"secondary",children:"No"}),e.jsx(y,{onClick:M,color:"primary",children:"Yes"})]})]}),e.jsxs(z,{open:h,onClose:P,children:[e.jsx(W,{children:"Transfer Ownership"}),e.jsx(V,{children:e.jsx(ie,{options:c,getOptionLabel:p=>`${p.username}`,value:f,onChange:(p,m)=>g(m),renderInput:p=>e.jsx(ce,{...p,label:"Select User",variant:"outlined",fullWidth:!0,margin:"normal"}),isOptionEqualToValue:(p,m)=>p.id===(m==null?void 0:m.id),filterOptions:(p,m)=>p.filter(L=>L.username.toLowerCase().includes(m.inputValue.toLowerCase()))})}),e.jsxs(H,{children:[e.jsx(y,{onClick:P,color:"secondary",children:"Cancel"}),e.jsx(y,{onClick:w,color:"primary",variant:"contained",children:"Transfer"})]})]})]})}const je={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function be(t,s,n){return t?Math.max(0,(1+t)*s-n):0}const Te=(t,s)=>(n,u)=>{if(s==="status"){const r=Number(n.status),h=Number(u.status);return t==="asc"?r-h:h-r}return 0},Ce=({inputData:t,comparator:s,filterName:n,filterStatus:u})=>{const r=[...t];return r.sort(s),r};function Se({order:t,onSort:s,orderBy:n,rowCount:u,headLabel:r,numSelected:h,onSelectAllRows:a}){return e.jsx(ne,{children:e.jsxs(D,{children:[e.jsx(b,{padding:"checkbox",children:e.jsx(q,{indeterminate:h>0&&h<u,checked:u>0&&h===u,onChange:c=>a(c.target.checked)})}),r.map(c=>e.jsx(b,{align:c.align||"left",sortDirection:n===c.id?t:!1,sx:{width:c.width,minWidth:c.minWidth},children:e.jsxs(de,{hideSortIcon:!0,active:n===c.id,direction:n===c.id?t:"asc",onClick:()=>s(c.id),children:[c.label,n===c.id?e.jsx(k,{sx:{...je},children:t==="desc"?"sorted descending":"sorted ascending"}):null]})},c.id))]})})}function ye({emptyRows:t,height:s,sx:n,...u}){return t?e.jsx(D,{sx:{...s&&{height:s*t},...n},...u,children:e.jsx(b,{colSpan:9})}):null}function Pe({numSelected:t,filterName:s,onFilterName:n,onFilterStatus:u}){const[r,h]=i.useState(null),[a,c]=i.useState(null),j=o=>{const x=o==="All"?"":o;c(x),u(x),h(null)},f=o=>{h(o.currentTarget)},g=()=>{h(null)},C=!!r;return e.jsxs(X,{sx:{height:96,display:"flex",justifyContent:"space-between",p:o=>o.spacing(0,1,0,3),...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?e.jsxs(v,{component:"div",variant:"subtitle1",children:[t," selected"]}):e.jsx(pe,{fullWidth:!0,value:s,onChange:n,placeholder:"Search place...",startAdornment:e.jsx(xe,{position:"start",children:e.jsx(A,{width:20,icon:"eva:search-fill",sx:{color:"text.disabled"}})}),sx:{maxWidth:320}}),t>0?e.jsx(R,{children:e.jsx(A,{icon:"solar:trash-bin-trash-bold"})}):e.jsxs(e.Fragment,{children:[e.jsx(he,{title:"Filter list",children:e.jsx(R,{onClick:f,children:e.jsx(A,{icon:"ic:round-filter-list"})})}),e.jsx(Z,{open:C,anchorEl:r,onClose:g,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(k,{sx:{p:2,display:"flex",flexDirection:"column",gap:1},children:["All","Pending","Approved","Rejected"].map(o=>e.jsx(y,{variant:a===(o==="All"?null:o)?"contained":"outlined",onClick:()=>j(o==="All"?null:o),sx:{color:a===(o==="All"?null:o)?"text.primary":"text.secondary",borderColor:"text.secondary"},children:o},o))})})]})]})}const G=async(t=1,s=5,n="vi",u="",r="")=>{const h=localStorage.getItem("accessToken");if(console.log("Access Token:",h),!h)return console.error("No access token found"),{items:[],totalCount:0};try{const a=await O.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${n}&Page=${t}&Size=${s}&SearchTerm=${encodeURIComponent(u)}&Status=${r}`,{headers:{Authorization:`Bearer ${h}`}});return console.log("API Response:",a.data),{items:a.data.items,totalCount:a.data.totalCount}}catch(a){return console.error("Error fetching places",a),{items:[],totalCount:0}}};function we(){const[t,s]=i.useState([]),[n,u]=i.useState(0),[r,h]=i.useState(""),[a,c]=i.useState("vi"),[j,f]=i.useState(1),[g,C]=i.useState(5),[o,x]=i.useState("");i.useEffect(()=>{(async()=>{const{items:T,totalCount:w}=await G(j,g,a,r,o);s(T),u(w)})()},[j,g,a,r,o]);const l=Ae(),S=Ce({inputData:t,comparator:Te(l.order,l.orderBy),filterName:r,filterStatus:o}),I=d=>{s(T=>T.filter(w=>w.id!==d))},N=async()=>{const{items:d,totalCount:T}=await G(j,g,a,r,o);s(d),u(T)},P=!S.length&&!!r;return e.jsxs(ee,{children:[e.jsx(k,{display:"flex",alignItems:"center",mb:5,children:e.jsx(v,{variant:"h4",flexGrow:1,children:"Places"})}),e.jsxs(ge,{children:[e.jsx(Pe,{numSelected:l.selected.length,filterName:r,onFilterName:d=>{h(d.target.value),f(1)},onFilterStatus:d=>{x(d||""),f(1)}}),e.jsx(te,{children:e.jsx(ae,{sx:{overflow:"unset"},children:e.jsxs(oe,{sx:{minWidth:800},children:[e.jsx(Se,{order:l.order,orderBy:l.orderBy,rowCount:t.length,numSelected:l.selected.length,onSort:l.onSort,onSelectAllRows:d=>l.onSelectAllRows(d,t.map(T=>T.id)),headLabel:[{id:"name",label:"Name"},{id:"address",label:"Address"},{id:"description",label:"Description"},{id:"isVerify",label:"isVerify"},{id:"status",label:"Status"},{id:"View details",label:"View details"},{id:"User Tranfer",label:"User Tranfer"}]}),e.jsxs(le,{children:[S.slice(l.page*g,l.page*g+g).map(d=>e.jsx(me,{row:d,selected:l.selected.includes(d.id),onSelectRow:()=>l.onSelectRow(d.id),onDeletePlace:I,onUpdatePlace:N},d.id)),e.jsx(ye,{height:68,emptyRows:be(l.page,l.rowsPerPage,t.length)}),P&&e.jsx(fe,{searchQuery:r})]})]})})}),e.jsx(ue,{component:"div",page:j-1,count:n,rowsPerPage:g,onPageChange:(d,T)=>f(T+1),rowsPerPageOptions:[5,10,25],onRowsPerPageChange:d=>{C(parseInt(d.target.value,10)),f(1)}})]})]})}function Ae(){const[t,s]=i.useState(0),[n,u]=i.useState("name"),[r,h]=i.useState(5),[a,c]=i.useState([]),[j,f]=i.useState("asc"),g=i.useCallback(x=>{f(n===x&&j==="asc"?"desc":"asc"),u(x)},[j,n]),C=i.useCallback((x,l)=>{if(x){c(l);return}c([])},[]),o=i.useCallback(x=>{const l=a.includes(x)?a.filter(S=>S!==x):[...a,x];c(l)},[a]);return{order:j,orderBy:n,rowsPerPage:r,selected:a,page:t,onSort:g,onSelectAllRows:C,onSelectRow:o,onResetPage:()=>s(0)}}function Ge(){return e.jsxs(e.Fragment,{children:[e.jsx(se,{children:e.jsxs("title",{children:[" ",`User Tranfer - ${re.appName}`]})}),e.jsx(we,{})]})}export{Ge as default};
