import{r as l,O as ce,j as e,m as de,n as A,a0 as pe,B as X,A as ue,I as R,a1 as he,V as K,E as ge,M as me,F as _,h as w,G as z,aI as fe,D as xe,T as Ce,C as je,Y as Te,i as Pe,k as be,o as ye,$ as Se,H as ke}from"./index-z39hXFLl.js";import{C as Ie}from"./config-global-BwHnWRtc.js";import{a as E}from"./axiosInstance-Xq098mIU.js";import{U as we,M as De,a as Le,g as Me,P as ve,b as Oe,T as Ae,e as Ee,c as Fe}from"./place-table-toolbar-nCcx8wMk.js";import{D as J,a as Q,b as Y,c as Z}from"./DialogTitle-Dgc1Aws8.js";import{A as U}from"./Autocomplete-_rkQI0np.js";import{T as P,F as Ne}from"./TextField-B2lMQ9Li.js";import{F as Be,I as Re}from"./InputLabel-D6bSjKO1.js";function We({row:c,selected:g,onSelectRow:y,onDeletePlace:s,onUpdatePlace:d}){var T,L,O,q;const[b,h]=l.useState(null),[M,j]=l.useState(!1),[v,x]=l.useState(!1),[S,f]=l.useState(""),k=ce(),[D,F]=l.useState([]),m=l.useCallback(u=>{u.stopPropagation(),h(u.currentTarget)},[]),i=l.useCallback(()=>{h(null)},[]),I=u=>{u.stopPropagation(),k(`/owner/created/${c.id}`)},W=u=>{f(u),x(!0),i()},N=u=>{u.target instanceof HTMLButtonElement||u.target instanceof HTMLInputElement||k(`/owner/created/${c.id}`)},$=async()=>{const u=localStorage.getItem("accessToken");if(!u){console.error("No access token found");return}try{await E.delete(`https://api.localtour.space/api/Place/delete?placeid=${c.id}`,{headers:{Authorization:`Bearer ${u}`}}),s(c.id)}catch(H){console.error("Error deleting place:",H)}j(!1)},r=()=>{j(!1)},o=u=>{d(u),x(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs(de,{hover:!0,tabIndex:-1,role:"checkbox",selected:g,onClick:N,children:[e.jsx(A,{padding:"checkbox",children:e.jsx(pe,{disableRipple:!0,checked:g,onChange:y})}),e.jsx(A,{component:"th",scope:"row",children:e.jsxs(X,{gap:2,display:"flex",alignItems:"center",children:[e.jsx(ue,{alt:((T=c.placeTranslation[0])==null?void 0:T.name)||"N/A",src:c.photoDisplay}),((L=c.placeTranslation[0])==null?void 0:L.name)||"N/A"]})}),e.jsx(A,{children:((O=c.placeTranslation[0])==null?void 0:O.address)||"N/A"}),e.jsx(A,{children:((q=c.placeTranslation[0])==null?void 0:q.description)||"N/A"}),e.jsx(A,{align:"center",children:c.status==="Pending"?"-":e.jsx(R,{width:22,icon:"solar:check-circle-bold",sx:{color:"success.main"}})}),e.jsx(A,{children:e.jsx(he,{color:c.status==="Pending"?"warning":c.status==="Approved"?"success":c.status==="Rejected"?"error":"default",children:c.status})}),e.jsx(A,{align:"right",children:e.jsx(K,{onClick:I,children:e.jsx(R,{icon:"eva:arrow-forward-outline",width:22})})}),e.jsx(A,{align:"right",children:e.jsx(K,{onClick:m,children:e.jsx(R,{icon:"eva:more-vertical-fill",width:22})})})]}),e.jsx(ge,{open:!!b,anchorEl:b,onClose:i,children:e.jsxs(me,{disablePadding:!0,sx:{p:.5,gap:.5,width:140,display:"flex",flexDirection:"column"},children:[e.jsxs(_,{onClick:()=>{W(c.id),i()},children:[e.jsx(R,{icon:"solar:pen-bold"}),"Edit"]}),e.jsxs(_,{onClick:()=>{j(!0),i()},sx:{color:"error.main"},children:[e.jsx(R,{icon:"solar:trash-bin-trash-bold"}),"Delete"]})]})}),e.jsxs(J,{open:M,onClose:r,children:[e.jsx(Q,{children:"Confirm Deletion"}),e.jsx(Y,{children:"Are you sure you want to delete this place?"}),e.jsxs(Z,{children:[e.jsx(w,{onClick:r,color:"primary",children:"Cancel"}),e.jsx(w,{onClick:$,color:"error",children:"Delete"})]})]}),e.jsx(we,{open:v,placeId:S,onClose:()=>x(!1),onPlaceUpdated:o})]})}const $e=[{label:"VN",value:"vi"},{label:"EN",value:"en"}];function qe({open:c,onClose:g,onPlaceCreated:y}){const[s,d]=l.useState({wardId:"",timeOpen:"",timeClose:"",longitude:"",latitude:"",contactLink:"",tags:[],placeTranslations:[],photoDisplay:null,placeMedia:[],isVerified:!1,status:"0"}),[b,h]=l.useState([]),[M,j]=l.useState(!1),[v,x]=l.useState(""),[S,f]=l.useState(""),[k,D]=l.useState([]),[F,m]=l.useState([]),[i,I]=l.useState([]),[W,N]=l.useState(""),[$,r]=l.useState(""),[o,T]=l.useState({wardId:"",timeOpen:"",timeClose:"",longitude:"",latitude:"",contactLink:"",placeMedia:"",photoDisplay:"",tags:"",placeTranslations:s.placeTranslations.map(()=>"")});l.useEffect(()=>{c||(d({wardId:"",timeOpen:"",timeClose:"",longitude:"",latitude:"",contactLink:"",tags:[],placeTranslations:[],photoDisplay:null,placeMedia:[],isVerified:!1,status:"0"}),x(""),f(""),N(""),r(""),I([]),T({wardId:"",timeOpen:"",timeClose:"",longitude:"",latitude:"",contactLink:"",placeMedia:"",photoDisplay:"",tags:"",placeTranslations:s.placeTranslations.map(()=>"")}))},[c,s.placeTranslations]);const L=(a,t)=>{x(a),f(t),d(n=>({...n,longitude:a,latitude:t}))},O=()=>{j(!0)},q=()=>{j(!1)};l.useEffect(()=>{(async()=>{try{const t=await E.get("https://api.localtour.space/api/Tag/getAll?Size=1000");h(t.data.items)}catch(t){console.error("Error fetching tags:",t)}})()},[]);const u=(a,t)=>{const{name:n,value:p}=a.target;d(t!==void 0?C=>{const B=[...C.placeTranslations];return B[t]={...B[t],[n]:p},{...C,placeTranslations:B}}:C=>({...C,[n]:p}))},H=a=>{const t=a.target.files;t&&t[0]&&d(n=>({...n,photoDisplay:t[0]}))},ee=(a,t)=>{const n=a.target.files;n&&n.length>0?d(p=>{const C=[...p.placeMedia];return C[t]=n[0],{...p,placeMedia:C}}):d(p=>{const C=[...p.placeMedia];return C[t]=null,{...p,placeMedia:C}})},te=()=>{d(a=>({...a,placeTranslations:[...a.placeTranslations,{languageCode:"vi",name:"",description:"",address:"",contact:""}]}))},ae=a=>{d(t=>{const n=t.placeTranslations.filter((p,C)=>C!==a);return{...t,placeTranslations:n}})},se=()=>{d(a=>({...a,placeMedia:[...a.placeMedia,null]}))},ne=a=>{d(t=>{const n=t.placeMedia.filter((p,C)=>C!==a);return{...t,placeMedia:n}})},oe=(a,t)=>{d(n=>({...n,tags:t.map(p=>p.id)}))},le=async()=>{let a=!1;const t={wardId:"",timeOpen:"",timeClose:"",longitude:"",latitude:"",contactLink:"",placeMedia:"",photoDisplay:"",tags:"",placeTranslations:s.placeTranslations.map(()=>"")};if(s.wardId||(t.wardId="Please select a ward.",a=!0),s.timeOpen||(t.timeOpen="Time Open is required.",a=!0),s.timeClose||(t.timeClose="Time Close is required.",a=!0),s.longitude||(t.longitude="Longitude is required.",a=!0),s.latitude||(t.latitude="Latitude is required.",a=!0),s.photoDisplay||(t.photoDisplay="PhotoDisplay is required.",a=!0),s.contactLink||(t.contactLink="Contact Link is required.",a=!0),s.tags.length===0&&(t.tags="At least one tag is required.",a=!0),s.placeMedia.length===0&&(t.placeMedia="At least one media is required.",a=!0),s.placeTranslations.forEach((n,p)=>{!n.name||!n.description||!n.address||!n.contact?(t.placeTranslations[p]="All fields are required for each translation.",a=!0):t.placeTranslations[p]=""}),a){T(t);return}try{const n=localStorage.getItem("accessToken"),p=new FormData;if(!s.wardId){alert("Please select a ward.");return}p.append("WardId",s.wardId),p.append("TimeOpen",s.timeOpen),p.append("TimeClose",s.timeClose),p.append("Longitude",parseFloat(s.longitude).toFixed(6)),p.append("Latitude",parseFloat(s.latitude).toFixed(6)),p.append("ContactLink",s.contactLink),console.log("longitude",s.longitude),console.log("latitude",s.latitude),s.tags.forEach(V=>{p.append("Tags",V)}),p.append("PlaceTranslation",JSON.stringify(s.placeTranslations)),s.photoDisplay&&p.append("PhotoDisplay",s.photoDisplay),s.placeMedia.forEach((V,He)=>{V&&p.append("PlaceMedia",V)});const B=(await E.post("https://api.localtour.space/api/Place/create",p,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"multipart/form-data"}})).data;console.log("newPlace",B),alert("Place created successfully!"),y(B),g()}catch(n){console.error("Error creating place:",n),alert("Failed to create place.")}};l.useEffect(()=>{(async()=>{try{const t=await E.get("https://api.localtour.space/api/Address/Province");D(t.data)}catch(t){console.error("Error fetching provinces:",t)}})()},[]);const re=async a=>{try{const t=await E.get(`https://api.localtour.space/api/Address/District?provinceI=${a}`);m(t.data)}catch(t){console.error("Error fetching districts:",t)}},ie=async a=>{try{const t=await E.get(`https://api.localtour.space/api/Address/Ward?cityId=${a}`);console.log("Wards Response:",t.data),I(t.data)}catch(t){console.error("Error fetching wards:",t)}};return e.jsxs(J,{open:c,onClose:g,maxWidth:"sm",fullWidth:!0,children:[e.jsx(Q,{sx:{pb:2,paddingBottom:"16px"},children:"New Place"}),"  ",e.jsxs(Y,{sx:{paddingTop:"24px"},children:[e.jsx(U,{fullWidth:!0,options:k,getOptionLabel:a=>a.name,onChange:(a,t)=>{N((t==null?void 0:t.id)||""),r(""),I([]),re(t==null?void 0:t.id)},renderInput:a=>e.jsx(P,{...a,label:"Province",InputLabelProps:{shrink:!0}})}),e.jsx(U,{fullWidth:!0,options:F,getOptionLabel:a=>a.name,onChange:(a,t)=>{r((t==null?void 0:t.id)||""),ie(t==null?void 0:t.id)},renderInput:a=>e.jsx(P,{...a,label:"District",InputLabelProps:{shrink:!0}})}),e.jsx(U,{fullWidth:!0,options:i,getOptionLabel:a=>a.wardName||"",value:i.find(a=>a.id===s.wardId)||null,onChange:(a,t)=>{d(n=>({...n,wardId:(t==null?void 0:t.id)||""}))},renderInput:a=>e.jsxs(e.Fragment,{children:[e.jsx(P,{...a,label:"Ward",error:!!o.wardId,InputLabelProps:{shrink:!0}}),o.wardId&&e.jsx(Ne,{error:!0,children:o.wardId})]}),isOptionEqualToValue:(a,t)=>a.id===(t==null?void 0:t.id)}),e.jsx(P,{fullWidth:!0,label:"Time Open",name:"timeOpen",type:"time",value:s.timeOpen,onChange:u,margin:"normal",InputLabelProps:{shrink:!0},inputProps:{step:300},error:!!o.timeOpen,helperText:o.timeOpen}),e.jsx(P,{fullWidth:!0,label:"Time Close",name:"timeClose",type:"time",value:s.timeClose,onChange:u,margin:"normal",InputLabelProps:{shrink:!0},inputProps:{step:300},error:!!o.timeClose,helperText:o.timeClose}),e.jsx(P,{fullWidth:!0,label:"Longitude",name:"longitude",value:s.longitude,onChange:a=>x(a.target.value),margin:"normal",InputLabelProps:{shrink:!0},error:!!o.longitude,helperText:o.longitude}),e.jsx(P,{fullWidth:!0,label:"Latitude",name:"latitude",value:s.latitude,onChange:a=>f(a.target.value),margin:"normal",InputLabelProps:{shrink:!0},error:!!o.latitude,helperText:o.latitude}),e.jsx(w,{onClick:O,variant:"outlined",children:"Choose on Map"}),e.jsxs(J,{open:M,onClose:()=>j(!1),maxWidth:"md",fullWidth:!0,children:[e.jsx(Q,{children:"Select Location on Map"}),e.jsx(Y,{children:e.jsx(De,{latitude:parseFloat(S)||10.762622,longitude:parseFloat(v)||106.827153,onLocationSelect:L,onCloseMap:q})})]}),e.jsx(P,{fullWidth:!0,label:"Contact Link",name:"contactLink",value:s.contactLink,onChange:u,margin:"normal",InputLabelProps:{shrink:!0},error:!!o.contactLink,helperText:o.contactLink}),e.jsx(U,{multiple:!0,id:"tags",options:b,getOptionLabel:a=>a.tagName,onChange:oe,renderInput:a=>e.jsx(P,{...a,label:"Tags",error:!!o.tags,helperText:o.tags,InputLabelProps:{shrink:!0}})}),e.jsxs("div",{style:{marginTop:"20px"},children:[e.jsx("div",{style:{fontWeight:"bold"},children:"Photo Display"}),e.jsx("input",{type:"file",accept:"image/*",id:"photoDisplay",onChange:H}),o.photoDisplay&&e.jsx("div",{style:{color:"red"},children:o.photoDisplay})]}),e.jsxs("div",{style:{marginTop:"20px"},children:[e.jsx(w,{variant:"outlined",onClick:se,children:"Add Place Media"}),s.placeMedia.map((a,t)=>e.jsxs(z,{container:!0,spacing:2,alignItems:"center",style:{marginTop:"10px"},children:[e.jsxs(z,{item:!0,children:[e.jsxs("label",{htmlFor:`placeMedia-${t}`,children:["Media ",t+1]}),e.jsx("input",{type:"file",accept:"image/*",id:`placeMedia-${t}`,onChange:n=>ee(n,t)})]}),e.jsx(z,{item:!0,children:e.jsx(w,{variant:"contained",color:"error",onClick:()=>ne(t),children:"Remove"})})]},t)),o.placeMedia&&e.jsx("div",{style:{color:"red"},children:o.placeMedia})]}),e.jsxs("div",{style:{marginTop:"20px"},children:[e.jsx(w,{variant:"outlined",onClick:te,children:"Add Place Translation"}),s.placeTranslations.map((a,t)=>e.jsxs("div",{style:{marginTop:"15px"},children:[e.jsxs(Be,{fullWidth:!0,margin:"normal",children:[e.jsx(Re,{children:"Language Code"}),e.jsx(fe,{label:"Language Code",name:"languageCode",value:a.languageCode,onChange:n=>u(n,t),children:$e.map(n=>e.jsx(_,{value:n.value,children:n.label},n.value))})]}),e.jsx(P,{fullWidth:!0,label:`Name ${t+1}`,name:"name",value:a.name,onChange:n=>u(n,t),margin:"normal",error:!!o.placeTranslations[t],helperText:o.placeTranslations[t]}),e.jsx(P,{fullWidth:!0,label:`Description ${t+1}`,name:"description",value:a.description,onChange:n=>u(n,t),margin:"normal",error:!!o.placeTranslations[t],helperText:o.placeTranslations[t]}),e.jsx(P,{fullWidth:!0,label:`Address ${t+1}`,name:"address",value:a.address,onChange:n=>u(n,t),margin:"normal",error:!!o.placeTranslations[t],helperText:o.placeTranslations[t]}),e.jsx(P,{fullWidth:!0,label:`Contact ${t+1}`,name:"contact",value:a.contact,onChange:n=>u(n,t),margin:"normal",error:!!o.placeTranslations[t],helperText:o.placeTranslations[t]}),e.jsx(w,{variant:"outlined",color:"error",onClick:()=>ae(t),style:{marginTop:"10px"},children:"Remove Translation"})]},t))]})]}),e.jsxs(Z,{children:[e.jsx(w,{onClick:g,color:"secondary",children:"Cancel"}),e.jsx(w,{onClick:le,color:"primary",children:"Submit"})]})]})}const G=async(c=1,g=5,y="vi",s="",d="")=>{const b=localStorage.getItem("accessToken");if(console.log("Access Token:",b),!b)return console.error("No access token found"),{items:[],totalCount:0};try{const h=await E.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${y}&Page=${c}&Size=${g}&SearchTerm=${encodeURIComponent(s)}&Status=${d}`,{headers:{Authorization:`Bearer ${b}`}});return console.log("API Response:",h.data),{items:h.data.items,totalCount:h.data.totalCount}}catch(h){return console.error("Error fetching places",h),{items:[],totalCount:0}}};function Ve(){const[c,g]=l.useState([]),[y,s]=l.useState(0),[d,b]=l.useState(""),[h,M]=l.useState("vi"),[j,v]=l.useState(!1),[x,S]=l.useState(1),[f,k]=l.useState(5),[D,F]=l.useState("");l.useEffect(()=>{(async()=>{const{items:o,totalCount:T}=await G(x,f,h,d,D);g(o),s(T)})()},[x,f,h,d,D]);const m=async r=>{const o={...r,status:r.status??"0",isVerified:r.isVerified??!1,photoDisplay:r.photoDisplay};g(O=>[...O,o]),s(O=>O+1);const{items:T,totalCount:L}=await G(x,f,h);g(T),s(L)},i=Ue(),I=Le({inputData:c,comparator:Me(i.order,i.orderBy),filterName:d,filterStatus:D}),W=r=>{g(o=>o.filter(T=>T.id!==r))},N=async r=>{g(T=>T.map(L=>L.id===r.id?r:L));const{items:o}=await G(x,f,h,d,D);g(o)},$=!I.length&&!!d;return e.jsxs(xe,{children:[e.jsxs(X,{display:"flex",alignItems:"center",mb:5,children:[e.jsx(Ce,{variant:"h4",flexGrow:1,children:"Places"}),e.jsx(w,{variant:"contained",color:"inherit",startIcon:e.jsx(R,{icon:"mingcute:add-line"}),onClick:()=>v(!0),children:"New place"})]}),e.jsxs(je,{children:[e.jsx(ve,{numSelected:i.selected.length,filterName:d,onFilterName:r=>{b(r.target.value),S(1)},onFilterStatus:r=>{F(r||""),S(1)}}),e.jsx(Te,{children:e.jsx(Pe,{sx:{overflow:"unset"},children:e.jsxs(be,{sx:{minWidth:800},children:[e.jsx(Oe,{order:i.order,orderBy:i.orderBy,rowCount:c.length,numSelected:i.selected.length,onSort:i.onSort,onSelectAllRows:r=>i.onSelectAllRows(r,c.map(o=>o.id)),headLabel:[{id:"name",label:"Name"},{id:"address",label:"Address"},{id:"description",label:"Description"},{id:"isVerify",label:"isVerify"},{id:"status",label:"Status"},{id:"View details",label:"View details"},{id:""}]}),e.jsxs(ye,{children:[I.slice(i.page*f,i.page*f+f).map(r=>e.jsx(We,{row:r,selected:i.selected.includes(r.id),onSelectRow:()=>i.onSelectRow(r.id),onDeletePlace:W,onUpdatePlace:N},r.id)),e.jsx(Ae,{height:68,emptyRows:Ee(i.page,i.rowsPerPage,c.length)}),$&&e.jsx(Fe,{searchQuery:d})]})]})})}),e.jsx(Se,{component:"div",page:x-1,count:y,rowsPerPage:f,onPageChange:(r,o)=>S(o+1),rowsPerPageOptions:[5,10,25],onRowsPerPageChange:r=>{k(parseInt(r.target.value,10)),S(1)}})]}),e.jsx(qe,{open:j,onClose:()=>v(!1),onPlaceCreated:m})]})}function Ue(){const[c,g]=l.useState(0),[y,s]=l.useState("name"),[d,b]=l.useState(5),[h,M]=l.useState([]),[j,v]=l.useState("asc"),x=l.useCallback(m=>{v(y===m&&j==="asc"?"desc":"asc"),s(m)},[j,y]),S=l.useCallback((m,i)=>{if(m){M(i);return}M([])},[]),f=l.useCallback(m=>{const i=h.includes(m)?h.filter(I=>I!==m):[...h,m];M(i)},[h]),k=l.useCallback(()=>{g(0)},[]),D=l.useCallback((m,i)=>{g(i)},[]),F=l.useCallback(m=>{b(parseInt(m.target.value,10)),k()},[k]);return{page:c,order:j,onSort:x,orderBy:y,selected:h,rowsPerPage:d,onSelectRow:f,onResetPage:k,onChangePage:D,onSelectAllRows:S,onChangeRowsPerPage:F}}function Ze(){return e.jsxs(e.Fragment,{children:[e.jsx(ke,{children:e.jsxs("title",{children:[" ",`Places Created - ${Ie.appName}`]})}),e.jsx(Ve,{})]})}export{Ze as default};
