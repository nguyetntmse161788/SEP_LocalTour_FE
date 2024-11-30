import{r as s,j as t,k as F,y as ee,B as te,f as ae,I as se,S as ne,H as oe}from"./index-BP3v-hLU.js";import{C as re}from"./config-global-BwHnWRtc.js";import{a as W}from"./index-Br0q4W-C.js";import{a as le,g as ce,P as ie,b as de,c as pe,T as ue,e as he,d as ge}from"./place-table-toolbar-9-QuLi_8.js";import{D as E,a as B,b as V,c as me}from"./DialogTitle-DG1GI5PK.js";import{A as $}from"./Autocomplete-xhUJ0eEm.js";import{T as y}from"./TextField-8DPyH5il.js";import{G as O}from"./Grid-BQRRLhak.js";import{C as fe}from"./Card-lDiFzRbA.js";import{d as xe,e as Ce,f as ye,g as je}from"./TableSortLabel-CQH1L_JY.js";import"./Checkbox-BMVmTwfm.js";import"./Select-DTOhA_m3.js";import"./LastPage-CUb5BTNb.js";const Pe=({latitude:C,longitude:g,onLocationSelect:P,onCloseMap:o})=>{const c=s.useRef(null),[j,u]=s.useState(!1),[b,T]=s.useState(null),[M,w]=s.useState(null),[k,m]=s.useState([]),[L,v]=s.useState("");s.useEffect(()=>{const l=()=>{window.vietmapgl?u(!0):setTimeout(l,500)};l()},[]),s.useEffect(()=>{if(j){const l=new window.vietmapgl.Map({container:c.current,style:"https://maps.vietmap.vn/mt/tm/style.json?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46",center:[g,C],zoom:9}),f=new window.vietmapgl.Marker().setLngLat([g,C]).addTo(l);T(f),w(l),l.on("click",n=>{const{lng:p,lat:S}=n.lngLat;f.setLngLat([p,S])})}else console.error("VietMap API không tải được")},[C,g,j]);const D=async l=>{const f=l.target.value;if(v(f),f.length>2)try{const p=await(await fetch(`https://maps.vietmap.vn/api/search/v3?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46&text=${f}`)).json();m(p||[])}catch(n){console.error("Lỗi khi tìm kiếm địa điểm:",n)}else m([])},h=async(l,f)=>{try{const n=await fetch(`https://maps.vietmap.vn/api/place/v3?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46&refid=${f}`);if(!n.ok){console.error("Lỗi API:",n.status,n.statusText);return}const p=await n.json();if(p&&p.lng&&p.lat){const{lng:S,lat:A}=p;j&&b&&(b.setLngLat([S,A]),M.flyTo({center:[S,A],zoom:500})),P(S.toString(),A.toString()),m([]),v(l);const R=l||`${p.result.district}, ${p.result.city}`;console.log("Địa chỉ đầy đủ:",R)}else console.error("Dữ liệu không hợp lệ từ API: Không tìm thấy tọa độ.",p)}catch(n){console.error("Lỗi khi lấy tọa độ từ API:",n)}},i=()=>{if(b){const{lng:l,lat:f}=b.getLngLat();P(l.toString(),f.toString()),o()}};return t.jsxs("div",{children:[t.jsx("input",{type:"text",value:L,onChange:D,placeholder:"Nhập địa chỉ..."}),k.length>0&&t.jsx("div",{style:{maxHeight:"200px",overflowY:"auto",border:"1px solid #ccc"},children:k.map(l=>t.jsx("div",{style:{padding:"8px",cursor:"pointer"},role:"button",tabIndex:0,onClick:()=>h(l.address,l.ref_id),onKeyDown:f=>{(f.key==="Enter"||f.key===" ")&&h(l.address,l.ref_id)},children:l.display},l.ref_id))}),t.jsx("div",{ref:c,style:{width:"100%",height:"300px"}}),t.jsxs("div",{className:"map-actions",children:[t.jsx("button",{onClick:i,className:"btn-select",type:"button",children:"Select Location"}),t.jsx("button",{onClick:o,className:"btn-close",type:"button",children:"Close"})]})]})};function Se({open:C,onClose:g,onPlaceCreated:P}){const[o,c]=s.useState({wardId:"",timeOpen:"",timeClose:"",longitude:"",latitude:"",contactLink:"",tags:[],placeTranslations:[],photoDisplay:null,placeMedia:[],isVerified:!1,status:"0"}),[j,u]=s.useState([]),[b,T]=s.useState(!1),[M,w]=s.useState(""),[k,m]=s.useState(""),[L,v]=s.useState([]),[D,h]=s.useState([]),[i,l]=s.useState([]),[f,n]=s.useState(""),[p,S]=s.useState(""),A=(a,e)=>{w(parseFloat(a).toFixed(6)),m(parseFloat(e).toFixed(6)),c(r=>({...r,longitude:parseFloat(a).toFixed(6),latitude:parseFloat(e).toFixed(6)}))},R=()=>{T(!0)},_=()=>{T(!1)};s.useEffect(()=>{(async()=>{try{const e=await W.get("https://api.localtour.space/api/Tag/getAll");u(e.data.items)}catch(e){console.error("Error fetching tags:",e)}})()},[]);const I=(a,e)=>{const{name:r,value:x}=a.target;c(e!==void 0?d=>{const N=[...d.placeTranslations];return N[e]={...N[e],[r]:x},{...d,placeTranslations:N}}:d=>({...d,[r]:x}))},G=a=>{const e=a.target.files;e&&e[0]&&c(r=>({...r,photoDisplay:e[0]}))},H=(a,e)=>{const r=a.target.files;r&&r.length>0?c(x=>{const d=[...x.placeMedia];return d[e]=r[0],{...x,placeMedia:d}}):c(x=>{const d=[...x.placeMedia];return d[e]=null,{...x,placeMedia:d}})},Q=()=>{c(a=>({...a,placeTranslations:[...a.placeTranslations,{languageCode:"",name:"",description:"",address:"",contact:""}]}))},q=a=>{c(e=>{const r=e.placeTranslations.filter((x,d)=>d!==a);return{...e,placeTranslations:r}})},K=()=>{c(a=>({...a,placeMedia:[...a.placeMedia,null]}))},J=a=>{c(e=>{const r=e.placeMedia.filter((x,d)=>d!==a);return{...e,placeMedia:r}})},U=(a,e)=>{c(r=>({...r,tags:e.map(x=>x.id)}))},Y=async()=>{try{const a=localStorage.getItem("accessToken"),e=new FormData;if(!o.wardId){alert("Please select a ward.");return}e.append("WardId",o.wardId),e.append("TimeOpen",o.timeOpen),e.append("TimeClose",o.timeClose),e.append("Longitude",parseFloat(o.longitude).toFixed(6)),e.append("Latitude",parseFloat(o.latitude).toFixed(6)),e.append("ContactLink",o.contactLink),o.tags.forEach(d=>{e.append("Tags",d)}),o.placeTranslations.forEach(d=>{e.append("PlaceTranslation",JSON.stringify(d))}),o.photoDisplay&&e.append("PhotoDisplay",o.photoDisplay),o.placeMedia.forEach((d,N)=>{d&&e.append("PlaceMedia",d)});const x=(await W.post("https://api.localtour.space/api/Place/create",e,{headers:{Authorization:`Bearer ${a}`,"Content-Type":"multipart/form-data"}})).data;console.log("newPlace",x),alert("Place created successfully!"),P(x),g()}catch(a){console.error("Error creating place:",a),alert("Failed to create place.")}};s.useEffect(()=>{(async()=>{try{const e=await W.get("https://api.localtour.space/api/Address/Province");v(e.data)}catch(e){console.error("Error fetching provinces:",e)}})()},[]);const X=async a=>{try{const e=await W.get(`https://api.localtour.space/api/Address/District?provinceI=${a}`);h(e.data)}catch(e){console.error("Error fetching districts:",e)}},Z=async a=>{try{const e=await W.get(`https://api.localtour.space/api/Address/Ward?cityId=${a}`);console.log("Wards Response:",e.data),l(e.data)}catch(e){console.error("Error fetching wards:",e)}};return t.jsxs(E,{open:C,onClose:g,maxWidth:"sm",fullWidth:!0,children:[t.jsx(B,{children:"New Place"}),t.jsxs(V,{children:[t.jsx($,{fullWidth:!0,options:L,getOptionLabel:a=>a.name,onChange:(a,e)=>{n((e==null?void 0:e.id)||""),S(""),l([]),X(e==null?void 0:e.id)},renderInput:a=>t.jsx(y,{...a,label:"Province"})}),t.jsx($,{fullWidth:!0,options:D,getOptionLabel:a=>a.name,onChange:(a,e)=>{S((e==null?void 0:e.id)||""),Z(e==null?void 0:e.id)},renderInput:a=>t.jsx(y,{...a,label:"District"})}),t.jsx($,{fullWidth:!0,options:i,getOptionLabel:a=>a.wardName||"",value:i.find(a=>a.id===o.wardId)||null,onChange:(a,e)=>{c(r=>({...r,wardId:(e==null?void 0:e.id)||""}))},renderInput:a=>t.jsx(y,{...a,label:"Ward"}),isOptionEqualToValue:(a,e)=>a.id===(e==null?void 0:e.id)}),t.jsx(y,{fullWidth:!0,label:"Time Open",name:"timeOpen",type:"time",value:o.timeOpen,onChange:I,margin:"normal",inputProps:{step:300}}),t.jsx(y,{fullWidth:!0,label:"Time Close",name:"timeClose",type:"time",value:o.timeClose,onChange:I,margin:"normal",inputProps:{step:300}}),t.jsx(y,{fullWidth:!0,label:"Longitude",name:"longitude",value:o.longitude,onChange:a=>w(a.target.value),margin:"normal"}),t.jsx(y,{fullWidth:!0,label:"Latitude",name:"latitude",value:o.latitude,onChange:a=>m(a.target.value),margin:"normal"}),t.jsx(F,{onClick:R,variant:"outlined",children:"Choose on Map"}),t.jsxs(E,{open:b,onClose:()=>T(!1),maxWidth:"md",fullWidth:!0,children:[t.jsx(B,{children:"Select Location on Map"}),t.jsx(V,{children:t.jsx(Pe,{latitude:parseFloat(k)||10.762622,longitude:parseFloat(M)||106.827153,onLocationSelect:A,onCloseMap:_})})]}),t.jsx(y,{fullWidth:!0,label:"Contact Link",name:"contactLink",value:o.contactLink,onChange:I,margin:"normal"}),t.jsx($,{multiple:!0,id:"tags",options:j,getOptionLabel:a=>a.tagName,onChange:U,renderInput:a=>t.jsx(y,{...a,label:"Tags"})}),t.jsxs("div",{style:{marginTop:"20px"},children:[t.jsx("div",{style:{fontWeight:"bold"},children:"Photo Display"}),t.jsx("input",{type:"file",accept:"image/*",id:"photoDisplay",onChange:G})]}),t.jsxs("div",{style:{marginTop:"20px"},children:[t.jsx(F,{variant:"outlined",onClick:K,children:"Add Place Media"}),o.placeMedia.map((a,e)=>t.jsxs(O,{container:!0,spacing:2,alignItems:"center",style:{marginTop:"10px"},children:[t.jsxs(O,{item:!0,children:[t.jsxs("label",{htmlFor:`placeMedia-${e}`,children:["Media ",e+1]}),t.jsx("input",{type:"file",accept:"image/*",id:`placeMedia-${e}`,onChange:r=>H(r,e)})]}),t.jsx(O,{item:!0,children:t.jsx(F,{variant:"contained",color:"error",onClick:()=>J(e),children:"Remove"})})]},e))]}),t.jsxs("div",{style:{marginTop:"20px"},children:[t.jsx(F,{variant:"outlined",onClick:Q,children:"Add Place Translation"}),o.placeTranslations.map((a,e)=>t.jsxs("div",{style:{marginTop:"15px"},children:[t.jsx(y,{fullWidth:!0,label:`Language Code ${e+1}`,name:"languageCode",value:a.languageCode,onChange:r=>I(r,e),margin:"normal"}),t.jsx(y,{fullWidth:!0,label:`Name ${e+1}`,name:"name",value:a.name,onChange:r=>I(r,e),margin:"normal"}),t.jsx(y,{fullWidth:!0,label:`Description ${e+1}`,name:"description",value:a.description,onChange:r=>I(r,e),margin:"normal"}),t.jsx(y,{fullWidth:!0,label:`Address ${e+1}`,name:"address",value:a.address,onChange:r=>I(r,e),margin:"normal"}),t.jsx(y,{fullWidth:!0,label:`Contact ${e+1}`,name:"contact",value:a.contact,onChange:r=>I(r,e),margin:"normal"}),t.jsx(F,{variant:"outlined",color:"error",onClick:()=>q(e),style:{marginTop:"10px"},children:"Remove Translation"})]},e))]})]}),t.jsxs(me,{children:[t.jsx(F,{onClick:g,color:"secondary",children:"Cancel"}),t.jsx(F,{onClick:Y,color:"primary",children:"Submit"})]})]})}const z=async(C=1,g=5,P="vi",o="",c="")=>{const j=localStorage.getItem("accessToken");if(console.log("Access Token:",j),!j)return console.error("No access token found"),{items:[],totalCount:0};try{const u=await W.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${P}&Page=${C}&Size=${g}&SearchTerm=${encodeURIComponent(o)}&Status=${c}`,{headers:{Authorization:`Bearer ${j}`}});return console.log("API Response:",u.data),{items:u.data.items,totalCount:u.data.totalCount}}catch(u){return console.error("Error fetching places",u),{items:[],totalCount:0}}};function be(){const[C,g]=s.useState([]),[P,o]=s.useState(0),[c,j]=s.useState(""),[u,b]=s.useState("vi"),[T,M]=s.useState(!1),[w,k]=s.useState(1),[m,L]=s.useState(5),[v,D]=s.useState("");s.useEffect(()=>{(async()=>{const{items:p,totalCount:S}=await z(w,m,u,c,v);g(p),o(S)})()},[w,m,u,c,v]);const h=async n=>{const p={...n,status:n.status??"0",isVerified:n.isVerified??!1,photoDisplay:n.photoDisplay};g(R=>[...R,p]),o(R=>R+1);const{items:S,totalCount:A}=await z(w,m,u);g(S),o(A)},i=Te(),l=le({inputData:C,comparator:ce(i.order,i.orderBy),filterName:c,filterStatus:v}),f=!l.length&&!!c;return t.jsxs(ee,{children:[t.jsxs(te,{display:"flex",alignItems:"center",mb:5,children:[t.jsx(ae,{variant:"h4",flexGrow:1,children:"Places"}),t.jsx(F,{variant:"contained",color:"inherit",startIcon:t.jsx(se,{icon:"mingcute:add-line"}),onClick:()=>M(!0),children:"New place"})]}),t.jsxs(fe,{children:[t.jsx(ie,{numSelected:i.selected.length,filterName:c,onFilterName:n=>{j(n.target.value),k(1)},onFilterStatus:n=>{D(n||""),k(1)}}),t.jsx(ne,{children:t.jsx(xe,{sx:{overflow:"unset"},children:t.jsxs(Ce,{sx:{minWidth:800},children:[t.jsx(de,{order:i.order,orderBy:i.orderBy,rowCount:C.length,numSelected:i.selected.length,onSort:i.onSort,onSelectAllRows:n=>i.onSelectAllRows(n,C.map(p=>p.id)),headLabel:[{id:"name",label:"Name"},{id:"address",label:"Address"},{id:"description",label:"Description"},{id:"isVerify",label:"isVerify"},{id:"status",label:"Status"},{id:"View details",label:"View details"},{id:""}]}),t.jsxs(ye,{children:[l.slice(i.page*m,i.page*m+m).map(n=>t.jsx(pe,{row:n,selected:i.selected.includes(n.id),onSelectRow:()=>i.onSelectRow(n.id)},n.id)),t.jsx(ue,{height:68,emptyRows:he(i.page,i.rowsPerPage,C.length)}),f&&t.jsx(ge,{searchQuery:c})]})]})})}),t.jsx(je,{component:"div",page:w-1,count:P,rowsPerPage:m,onPageChange:(n,p)=>k(p+1),rowsPerPageOptions:[5,10,25],onRowsPerPageChange:n=>{L(parseInt(n.target.value,10)),k(1)}})]}),t.jsx(Se,{open:T,onClose:()=>M(!1),onPlaceCreated:h})]})}function Te(){const[C,g]=s.useState(0),[P,o]=s.useState("name"),[c,j]=s.useState(5),[u,b]=s.useState([]),[T,M]=s.useState("asc"),w=s.useCallback(h=>{M(P===h&&T==="asc"?"desc":"asc"),o(h)},[T,P]),k=s.useCallback((h,i)=>{if(h){b(i);return}b([])},[]),m=s.useCallback(h=>{const i=u.includes(h)?u.filter(l=>l!==h):[...u,h];b(i)},[u]),L=s.useCallback(()=>{g(0)},[]),v=s.useCallback((h,i)=>{g(i)},[]),D=s.useCallback(h=>{j(parseInt(h.target.value,10)),L()},[L]);return{page:C,order:T,onSort:w,orderBy:P,selected:u,rowsPerPage:c,onSelectRow:m,onResetPage:L,onChangePage:v,onSelectAllRows:k,onChangeRowsPerPage:D}}function Oe(){return t.jsxs(t.Fragment,{children:[t.jsx(oe,{children:t.jsxs("title",{children:[" ",`Places Created - ${re.appName}`]})}),t.jsx(be,{})]})}export{Oe as default};
