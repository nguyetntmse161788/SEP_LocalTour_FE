import{j as e,B as G,f as Z,r,k as D,K as ve,A as Ce,I as F,Q as Te,l as Q,P as ce,M as ke,m as re,N as De,J as Pe,O as we}from"./index-DUX23g0E.js";import{T as J,a as T,f as Se,g as Ie}from"./TableSortLabel-2OFHYdxw.js";import{a as O}from"./axiosInstance-DCuNI-kV.js";import{a as le}from"./index-Br0q4W-C.js";import{D as ee,a as te,b as ae,c as de}from"./DialogTitle-Bksj2ejr.js";import{A as K}from"./Autocomplete-DBpAOSAN.js";import{T as b}from"./TextField-DgaCIWDs.js";import{G as X}from"./Grid-Bx36BDWb.js";import{C as pe}from"./Checkbox-2R0jymSI.js";import{O as Le}from"./Select-CoLeV2jR.js";function Ve({searchQuery:o,...l}){return e.jsx(J,{...l,children:e.jsx(T,{align:"center",colSpan:7,children:e.jsxs(G,{sx:{py:15,textAlign:"center"},children:[e.jsx(Z,{variant:"h6",sx:{mb:1},children:"Not found"}),e.jsxs(Z,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',o,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}const Me=({latitude:o,longitude:l,onLocationSelect:p,onCloseMap:f})=>{const n=r.useRef(null),[i,C]=r.useState(!1),[h,S]=r.useState(null),[I,L]=r.useState(null),[M,u]=r.useState([]),[P,$]=r.useState("");r.useEffect(()=>{const c=()=>{window.vietmapgl?C(!0):setTimeout(c,500)};c()},[]),r.useEffect(()=>{if(i){const c=new window.vietmapgl.Map({container:n.current,style:"https://maps.vietmap.vn/mt/tm/style.json?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46",center:[l,o],zoom:9}),m=new window.vietmapgl.Marker().setLngLat([l,o]).addTo(c);S(m),L(c),c.on("click",y=>{const{lng:x,lat:w}=y.lngLat;m.setLngLat([x,w])})}else console.error("VietMap API không tải được")},[o,l,i]);const B=async c=>{const m=c.target.value;if($(m),m.length>2)try{const x=await(await fetch(`https://maps.vietmap.vn/api/autocomplete/v3?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46&text=${m}`)).json();u(x||[])}catch(y){console.error("Lỗi khi tìm kiếm địa điểm:",y)}else u([])},N=async(c,m)=>{try{const y=await fetch(`https://maps.vietmap.vn/api/place/v3?apikey=9e37b843f972388f80a9e51612cad4c1bc3877c71c107e46&refid=${m}`);if(!y.ok){console.error("Lỗi API:",y.status,y.statusText);return}const x=await y.json();if(x&&x.lng&&x.lat){const{lng:w,lat:A}=x;i&&h&&(h.setLngLat([w,A]),I.flyTo({center:[w,A],zoom:500})),p(w.toString(),A.toString()),u([]),$(c);const R=c||`${x.result.district}, ${x.result.city}`;console.log("Địa chỉ đầy đủ:",R)}else console.error("Dữ liệu không hợp lệ từ API: Không tìm thấy tọa độ.",x)}catch(y){console.error("Lỗi khi lấy tọa độ từ API:",y)}},W=()=>{if(h){const{lng:c,lat:m}=h.getLngLat();p(c.toString(),m.toString()),f()}};return e.jsxs("div",{children:[e.jsx("input",{type:"text",value:P,onChange:B,placeholder:"Nhập địa chỉ..."}),M.length>0&&e.jsx("div",{style:{maxHeight:"200px",overflowY:"auto",border:"1px solid #ccc"},children:M.map(c=>e.jsx("div",{style:{padding:"8px",cursor:"pointer"},role:"button",tabIndex:0,onClick:()=>N(c.address,c.ref_id),onKeyDown:m=>{(m.key==="Enter"||m.key===" ")&&N(c.address,c.ref_id)},children:c.display},c.ref_id))}),e.jsx("div",{ref:n,style:{width:"100%",height:"300px"}}),e.jsxs("div",{className:"map-actions",children:[e.jsx("button",{onClick:W,className:"btn-select",type:"button",children:"Select Location"}),e.jsx("button",{onClick:f,className:"btn-close",type:"button",children:"Close"})]})]})};function Ae({open:o,onClose:l,placeId:p,onPlaceUpdated:f}){const[n,i]=r.useState({wardId:"",timeOpen:"",timeClose:"",longitude:"",latitude:"",contactLink:"",tags:[],placeTranslations:[],photoDisplay:null,placeMedia:[],isVerified:!1,status:"0"}),[C,h]=r.useState([]),[S,I]=r.useState(!1),[L,M]=r.useState(""),[u,P]=r.useState(""),[$,B]=r.useState([]),[N,W]=r.useState([]),[c,m]=r.useState([]),[y,x]=r.useState(""),[w,A]=r.useState(""),[R,z]=r.useState(n);r.useEffect(()=>{(async()=>{var t,s;try{const d=(await O.get(`https://api.localtour.space/api/Place/getPlaceById?placeid=${p}`)).data,E={wardId:d.wardId||"",timeOpen:d.timeOpen||"",timeClose:d.timeClose||"",longitude:((t=d.longitude)==null?void 0:t.toString())||"",latitude:((s=d.latitude)==null?void 0:s.toString())||"",contactLink:d.contactLink||"",tags:d.tags||[],placeTranslations:d.placeTranslations||[],photoDisplay:d.photoDisplay,placeMedia:d.placeMedia.map(ie=>({type:ie.type,url:ie.url})),isVerified:d.isVerified||!1,status:d.status||"0"};i(E),z(E);const k=(await O.get(`https://api.localtour.space/api/Address/getDistrictByWardId?wardId=${d.wardId}`)).data;A(k.id);const oe=(await O.get(`https://api.localtour.space/api/Address/getProvinceByDistrictId?districtId=${k.id}`)).data;x(oe.id),ne(oe.id),se(k.id),V(p)}catch(g){console.error("Error fetching place data:",g)}})()},[o,p]);const H=()=>{i(R),l()},V=async a=>{try{const s=(await O.get(`https://api.localtour.space/api/Place/getTagsInPlace?placeId=${a}`)).data;i(g=>({...g,tags:s.map(d=>d.id)}))}catch(t){console.error("Error fetching tags for place:",t)}},j=(a,t)=>{M(a),P(t),i(s=>({...s,longitude:a,latitude:t}))},Y=()=>{I(!0)},he=()=>{I(!1)};r.useEffect(()=>{(async()=>{try{const t=await O.get("https://api.localtour.space/api/Tag/getAll?Size=1000");h(t.data.items)}catch(t){console.error("Error fetching tags:",t)}})()},[]),r.useEffect(()=>{(async()=>{try{const t=await O.get("https://api.localtour.space/api/Address/Province");B(t.data)}catch(t){console.error("Error fetching provinces:",t)}})()},[]);const ne=async a=>{try{const t=await O.get(`https://api.localtour.space/api/Address/District?provinceI=${a}`);W(t.data)}catch(t){console.error("Error fetching districts:",t)}},se=async a=>{try{const t=await O.get(`https://api.localtour.space/api/Address/Ward?cityId=${a}`);console.log("Wards Response:",t.data),m(t.data)}catch(t){console.error("Error fetching wards:",t)}},ue=()=>{i(a=>({...a,placeTranslations:[...a.placeTranslations,{languageCode:"",name:"",description:"",address:"",contact:""}]}))},ge=a=>{i(t=>{const s=t.placeTranslations.filter((g,d)=>d!==a);return{...t,placeTranslations:s}})},me=a=>{const t=a.target.files;t&&t[0]&&i(s=>({...s,photoDisplay:t[0]}))},fe=async(a,t)=>{const s=a.target.files;if(s&&s.length>0){const g=s[0],d=[...n.placeMedia];try{const E=new FormData;E.append("files",g);const v=await fetch("https://api.localtour.space/api/File/createlink",{method:"POST",body:E});if(!v.ok)throw new Error("Failed to upload file");const k=await v.json();let _="";if(g.type.includes("image")&&k.imageUrls&&k.imageUrls.length>0)_=k.imageUrls[0];else if(g.type.includes("video")&&k.videoUrls&&k.videoUrls.length>0)_=k.videoUrls[0];else throw new Error("No URL returned for the uploaded file");d[t]={type:g.type.includes("image")?"Image":"Video",url:_},i({...n,placeMedia:d})}catch(E){console.error("Error uploading file:",E)}}},xe=a=>{const t=n.placeMedia.filter((s,g)=>g!==a);i({...n,placeMedia:t})},je=()=>n.placeMedia.map((a,t)=>e.jsxs(X,{container:!0,spacing:2,alignItems:"center",children:[e.jsx(X,{item:!0,xs:6,children:a.url?a.type==="Image"?e.jsx("img",{src:a.url,alt:"Media",style:{width:"100%",maxHeight:"200px",objectFit:"cover"}}):e.jsxs("video",{width:"100%",height:"auto",controls:!0,children:[e.jsx("source",{src:a.url,type:"video/mp4"}),"Your browser does not support the video tag."]}):e.jsx("div",{children:"No media selected"})}),e.jsxs(X,{item:!0,xs:6,children:[!a.url&&e.jsx(e.Fragment,{children:e.jsx("input",{type:"file",accept:"image/*,video/*",onChange:s=>fe(s,t)})}),e.jsx(D,{variant:"contained",color:"error",onClick:()=>xe(t),children:"Remove"})]})]},t)),U=(a,t)=>{const{name:s,value:g}=a.target,d=[...n.placeTranslations];d[t]={...d[t],[s]:g},i({...n,placeTranslations:d})},q=a=>{const{name:t,value:s}=a.target;i(g=>({...g,[t]:s}))},ye=(a,t)=>{i(s=>({...s,tags:t.map(g=>g.id)}))},be=async()=>{var a;try{const t=localStorage.getItem("accessToken"),s=new FormData;s.append("WardId",n.wardId),s.append("TimeOpen",n.timeOpen),s.append("TimeClose",n.timeClose),s.append("Longitude",n.longitude),s.append("Latitude",n.latitude),s.append("ContactLink",n.contactLink),n.tags.forEach(v=>s.append("Tags",v)),s.append("PlaceTranslation",JSON.stringify(n.placeTranslations));let g=n.photoDisplay;if(n.photoDisplay&&n.photoDisplay instanceof File){const v=new FormData;v.append("file",n.photoDisplay),g=(a=(await le.post("https://api.localtour.space/api/File/link",v)).data)==null?void 0:a.data}s.append("PhotoDisplay",g),n.placeMedia.forEach(v=>{v.url&&(v.url,s.append("PlaceMedia",v.url))});const E=(await le.put(`https://api.localtour.space/api/Place/update?placeid=${p}`,s,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"multipart/form-data"}})).data;alert("Place updated successfully!"),f(E),l()}catch(t){console.error("Error updating place:",t),alert("Failed to update place.")}};return e.jsxs(ee,{open:o,onClose:l,maxWidth:"sm",fullWidth:!0,children:[e.jsx(te,{children:"New Place"}),e.jsxs(ae,{children:[e.jsx(K,{fullWidth:!0,options:$,getOptionLabel:a=>a.name,onChange:(a,t)=>{x((t==null?void 0:t.id)||""),A(""),m([]),ne(t==null?void 0:t.id)},value:$.find(a=>a.id===y)||null,renderInput:a=>e.jsx(b,{...a,label:"Province"})}),e.jsx(K,{fullWidth:!0,options:N,getOptionLabel:a=>a.name,onChange:(a,t)=>{A((t==null?void 0:t.id)||""),se(t==null?void 0:t.id)},value:N.find(a=>a.id===w)||null,renderInput:a=>e.jsx(b,{...a,label:"District"})}),e.jsx(K,{fullWidth:!0,options:c,getOptionLabel:a=>a.wardName||"",value:c.find(a=>a.id===n.wardId)||null,onChange:(a,t)=>{i(s=>({...s,wardId:(t==null?void 0:t.id)||""}))},renderInput:a=>e.jsx(b,{...a,label:"Ward"})}),e.jsx(b,{fullWidth:!0,label:"Time Open",name:"timeOpen",type:"time",value:n.timeOpen,onChange:q,margin:"normal",inputProps:{step:300}}),e.jsx(b,{fullWidth:!0,label:"Time Close",name:"timeClose",type:"time",value:n.timeClose,onChange:q,margin:"normal",inputProps:{step:300}}),e.jsx(b,{fullWidth:!0,label:"Longitude",name:"longitude",value:n.longitude,onChange:a=>M(a.target.value),margin:"normal"}),e.jsx(b,{fullWidth:!0,label:"Latitude",name:"latitude",value:n.latitude,onChange:a=>P(a.target.value),margin:"normal"}),e.jsx(D,{onClick:Y,variant:"outlined",children:"Choose on Map"}),e.jsxs(ee,{open:S,onClose:()=>I(!1),maxWidth:"md",fullWidth:!0,children:[e.jsx(te,{children:"Select Location on Map"}),e.jsx(ae,{children:e.jsx(Me,{latitude:parseFloat(u)||10.762622,longitude:parseFloat(L)||106.827153,onLocationSelect:j,onCloseMap:he})})]}),e.jsx(b,{fullWidth:!0,label:"Contact Link",name:"contactLink",value:n.contactLink,onChange:q,margin:"normal"}),e.jsx(K,{multiple:!0,id:"tags",options:C,getOptionLabel:a=>a.tagName,onChange:ye,value:C.filter(a=>n.tags.includes(a.id)),renderInput:a=>e.jsx(b,{...a,label:"Tags"}),disableCloseOnSelect:!0}),e.jsxs("div",{style:{marginTop:"20px"},children:[e.jsx("div",{style:{fontWeight:"bold"},children:"Photo Display"}),n.photoDisplay?e.jsxs("div",{style:{position:"relative",width:"100%",maxWidth:"200px",marginBottom:"10px"},children:[e.jsx("img",{src:typeof n.photoDisplay=="string"?n.photoDisplay:URL.createObjectURL(n.photoDisplay),alt:"Display of the place",style:{width:"100%",height:"auto",maxHeight:"200px",objectFit:"cover",borderRadius:"10px"}}),e.jsx(D,{variant:"contained",color:"error",onClick:()=>i({...n,photoDisplay:null}),style:{position:"absolute",top:"5px",right:"5px",padding:"5px",minWidth:"unset",borderRadius:"50%",fontSize:"16px",backgroundColor:"rgba(255, 0, 0, 0.7)",color:"#fff"},children:"X"})]}):e.jsx("input",{type:"file",accept:"image/*",id:"photoDisplay",onChange:me})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"Place Media"}),je()]}),e.jsx(D,{variant:"contained",color:"primary",onClick:()=>i({...n,placeMedia:[...n.placeMedia,{type:"",url:""}]}),children:"Add Media"}),e.jsxs("div",{style:{marginTop:"20px"},children:[e.jsx(D,{variant:"outlined",onClick:ue,children:"Add Place Translation"}),n.placeTranslations.map((a,t)=>e.jsxs("div",{style:{marginTop:"15px"},children:[e.jsx(b,{fullWidth:!0,label:`Language Code ${t+1}`,name:"languageCode",value:a.languageCode,onChange:s=>U(s,t),margin:"normal"}),e.jsx(b,{fullWidth:!0,label:`Name ${t+1}`,name:"name",value:a.name,onChange:s=>U(s,t),margin:"normal"}),e.jsx(b,{fullWidth:!0,label:`Description ${t+1}`,name:"description",value:a.description,onChange:s=>U(s,t),margin:"normal"}),e.jsx(b,{fullWidth:!0,label:`Address ${t+1}`,name:"address",value:a.address,onChange:s=>U(s,t),margin:"normal"}),e.jsx(b,{fullWidth:!0,label:`Contact ${t+1}`,name:"contact",value:a.contact,onChange:s=>U(s,t),margin:"normal"}),e.jsx(D,{variant:"outlined",color:"error",onClick:()=>ge(t),style:{marginTop:"10px"},children:"Remove Translation"})]},t))]})]}),e.jsxs(de,{children:[e.jsx(D,{onClick:H,color:"secondary",children:"Cancel"}),e.jsx(D,{onClick:be,color:"primary",children:"Submit"})]})]})}function _e({row:o,selected:l,onSelectRow:p,onDeletePlace:f,onUpdatePlace:n}){var R,z,H,V;const[i,C]=r.useState(null),[h,S]=r.useState(!1),[I,L]=r.useState(!1),[M,u]=r.useState(""),P=ve(),[$,B]=r.useState([]),N=r.useCallback(j=>{j.stopPropagation(),C(j.currentTarget)},[]),W=r.useCallback(()=>{C(null)},[]),c=j=>{j.stopPropagation(),P(`/owner/place/${o.id}`)},m=j=>{u(j),L(!0),W()},y=j=>{j.target instanceof HTMLButtonElement||j.target instanceof HTMLInputElement||P(`/owner/place/${o.id}`)},x=async()=>{const j=localStorage.getItem("accessToken");if(!j){console.error("No access token found");return}try{await O.delete(`https://api.localtour.space/api/Place/delete?placeid=${o.id}`,{headers:{Authorization:`Bearer ${j}`}}),f(o.id)}catch(Y){console.error("Error deleting place:",Y)}S(!1)},w=()=>{S(!1)},A=j=>{n(j),L(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs(J,{hover:!0,tabIndex:-1,role:"checkbox",selected:l,onClick:y,children:[e.jsx(T,{padding:"checkbox",children:e.jsx(pe,{disableRipple:!0,checked:l,onChange:p})}),e.jsx(T,{component:"th",scope:"row",children:e.jsxs(G,{gap:2,display:"flex",alignItems:"center",children:[e.jsx(Ce,{alt:((R=o.placeTranslation[0])==null?void 0:R.name)||"N/A",src:o.photoDisplay}),((z=o.placeTranslation[0])==null?void 0:z.name)||"N/A"]})}),e.jsx(T,{children:((H=o.placeTranslation[0])==null?void 0:H.address)||"N/A"}),e.jsx(T,{children:((V=o.placeTranslation[0])==null?void 0:V.description)||"N/A"}),e.jsx(T,{align:"center",children:o.status==="Pending"?"-":e.jsx(F,{width:22,icon:"solar:check-circle-bold",sx:{color:"success.main"}})}),e.jsx(T,{children:e.jsx(Te,{color:o.status==="Pending"?"warning":o.status==="Approved"?"success":o.status==="Rejected"?"error":"default",children:o.status})}),e.jsx(T,{align:"right",children:e.jsx(Q,{onClick:c,children:e.jsx(F,{icon:"eva:arrow-forward-outline",width:22})})}),e.jsx(T,{align:"right",children:e.jsx(Q,{onClick:N,children:e.jsx(F,{icon:"eva:more-vertical-fill",width:22})})})]}),e.jsx(ce,{open:!!i,anchorEl:i,onClose:W,children:e.jsxs(ke,{disablePadding:!0,sx:{p:.5,gap:.5,width:140,display:"flex",flexDirection:"column"},children:[e.jsxs(re,{onClick:()=>{m(o.id),W()},children:[e.jsx(F,{icon:"solar:pen-bold"}),"Edit"]}),e.jsxs(re,{onClick:()=>{S(!0),W()},sx:{color:"error.main"},children:[e.jsx(F,{icon:"solar:trash-bin-trash-bold"}),"Delete"]})]})}),e.jsxs(ee,{open:h,onClose:w,children:[e.jsx(te,{children:"Confirm Deletion"}),e.jsx(ae,{children:"Are you sure you want to delete this place?"}),e.jsxs(de,{children:[e.jsx(D,{onClick:w,color:"primary",children:"Cancel"}),e.jsx(D,{onClick:x,color:"error",children:"Delete"})]})]}),e.jsx(Ae,{open:I,placeId:M,onClose:()=>L(!1),onPlaceUpdated:A})]})}const Ee={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function Ke(o,l,p){return o?Math.max(0,(1+o)*l-p):0}const Qe=(o,l)=>(p,f)=>{if(l==="status"){const n=Number(p.status),i=Number(f.status);return o==="asc"?n-i:i-n}return 0},Ge=({inputData:o,comparator:l,filterName:p,filterStatus:f})=>{const n=[...o];return n.sort(l),n};function Je({order:o,onSort:l,orderBy:p,rowCount:f,headLabel:n,numSelected:i,onSelectAllRows:C}){return e.jsx(Se,{children:e.jsxs(J,{children:[e.jsx(T,{padding:"checkbox",children:e.jsx(pe,{indeterminate:i>0&&i<f,checked:f>0&&i===f,onChange:h=>C(h.target.checked)})}),n.map(h=>e.jsx(T,{align:h.align||"left",sortDirection:p===h.id?o:!1,sx:{width:h.width,minWidth:h.minWidth},children:e.jsxs(Ie,{hideSortIcon:!0,active:p===h.id,direction:p===h.id?o:"asc",onClick:()=>l(h.id),children:[h.label,p===h.id?e.jsx(G,{sx:{...Ee},children:o==="desc"?"sorted descending":"sorted ascending"}):null]})},h.id))]})})}function Ye({emptyRows:o,height:l,sx:p,...f}){return o?e.jsx(J,{sx:{...l&&{height:l*o},...p},...f,children:e.jsx(T,{colSpan:9})}):null}function qe({numSelected:o,filterName:l,onFilterName:p,onFilterStatus:f}){const[n,i]=r.useState(null),[C,h]=r.useState(null),S=u=>{const P=u==="All"?"":u;h(P),f(P),i(null)},I=u=>{i(u.currentTarget)},L=()=>{i(null)},M=!!n;return e.jsxs(De,{sx:{height:96,display:"flex",justifyContent:"space-between",p:u=>u.spacing(0,1,0,3),...o>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[o>0?e.jsxs(Z,{component:"div",variant:"subtitle1",children:[o," selected"]}):e.jsx(Le,{fullWidth:!0,value:l,onChange:p,placeholder:"Search place...",startAdornment:e.jsx(Pe,{position:"start",children:e.jsx(F,{width:20,icon:"eva:search-fill",sx:{color:"text.disabled"}})}),sx:{maxWidth:320}}),o>0?e.jsx(Q,{children:e.jsx(F,{icon:"solar:trash-bin-trash-bold"})}):e.jsxs(e.Fragment,{children:[e.jsx(we,{title:"Filter list",children:e.jsx(Q,{onClick:I,children:e.jsx(F,{icon:"ic:round-filter-list"})})}),e.jsx(ce,{open:M,anchorEl:n,onClose:L,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(G,{sx:{p:2,display:"flex",flexDirection:"column",gap:1},children:["All","Pending","Approved","Rejected"].map(u=>e.jsx(D,{variant:C===(u==="All"?null:u)?"contained":"outlined",onClick:()=>S(u==="All"?null:u),sx:{color:C===(u==="All"?null:u)?"text.primary":"text.secondary",borderColor:"text.secondary"},children:u},u))})})]})]})}export{Me as M,qe as P,Ye as T,Ge as a,Je as b,_e as c,Ve as d,Ke as e,Qe as g};
