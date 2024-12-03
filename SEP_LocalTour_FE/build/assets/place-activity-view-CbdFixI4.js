import{r,j as e,k as p,av as K,K as V,y as W,B as y,f as l,I as E,H as q}from"./index-CqOrFkS9.js";import{C as Q}from"./config-global-BwHnWRtc.js";import{a as O}from"./index-Br0q4W-C.js";import{D as X,a as Y,b as Z,c as ee}from"./DialogTitle-BsU-8_3e.js";import{T as u}from"./TextField-W0bFp4Lb.js";import{G as s}from"./Grid-DWmz2QwA.js";import{C as te}from"./CircularProgress-DXol546A.js";import{C as B}from"./Card-BGRQsCGj.js";import"./Select-BH5qWtTR.js";import"./InputLabel-_37qWNMV.js";function ae({open:f,onClose:i,onActivityCreated:P,placeId:N}){const[m,R]=r.useState(""),[x,M]=r.useState(""),[C,S]=r.useState(0),[g,k]=r.useState(""),[j,w]=r.useState(0),[d,c]=r.useState("vi"),[h,b]=r.useState(null),[A,L]=r.useState(1),[T,I]=r.useState([{languageCode:d,activityName:m,price:C,description:x,priceType:g,discount:j}]),[D,F]=r.useState([]),$=async()=>{const n=localStorage.getItem("accessToken");if(!n){console.error("No access token found");return}const a=new FormData;a.append("placeid",N),a.append("DisplayNumber",A.toString()),T.forEach(t=>{a.append("PlaceActivityTranslations",JSON.stringify(t))}),h&&a.append("PhotoDisplay",h),D.forEach(t=>{t&&a.append("PlaceActivityMedium",t)});try{const t=await O.post(`https://api.localtour.space/api/PlaceActivity/create?placeid=${N}`,a,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"multipart/form-data"}});console.log("Activity created response:",t.data),P(t.data),i(),H()}catch(t){console.error("Error creating activity",t)}},H=()=>{R(""),M(""),S(0),k(""),w(0),c("vi"),b(null),L(1),I([{languageCode:d,activityName:m,price:C,description:x,priceType:g,discount:j}]),F([])},G=()=>{I([...T,{languageCode:d,activityName:m,price:C,description:x,priceType:g,discount:j}])},z=n=>{const a=T.filter((t,o)=>o!==n);I(a)},U=()=>{F([...D,null])},_=n=>{const a=D.filter((t,o)=>o!==n);F(a)},v=(n,a,t)=>{const o=[...T];o[n]={...o[n],[a]:t},I(o)},J=(n,a)=>{const t=n.target.files;if(t&&t[0]){const o=[...D];o[a]=t[0],F(o)}};return e.jsxs(X,{open:f,onClose:i,children:[e.jsx(Y,{children:"Create Activity"}),e.jsxs(Z,{children:[e.jsx(u,{label:"Display Number",type:"number",fullWidth:!0,value:A,onChange:n=>L(Number(n.target.value)),margin:"normal"}),e.jsxs("div",{children:[e.jsx(p,{variant:"outlined",onClick:G,children:"Add Translation"}),T.map((n,a)=>e.jsxs("div",{children:[e.jsx(u,{label:"Activity Name",fullWidth:!0,value:n.activityName,onChange:t=>v(a,"activityName",t.target.value),margin:"normal"}),e.jsx(u,{label:"Language Code",fullWidth:!0,value:n.languageCode,onChange:t=>v(a,"languageCode",t.target.value),margin:"normal"}),e.jsx(u,{label:"Description",fullWidth:!0,value:n.description,onChange:t=>v(a,"description",t.target.value),margin:"normal"}),e.jsx(u,{label:"Price",type:"number",fullWidth:!0,value:n.price,onChange:t=>v(a,"price",Number(t.target.value)),margin:"normal"}),e.jsx(u,{label:"Price Type",fullWidth:!0,value:n.priceType,onChange:t=>v(a,"priceType",t.target.value),margin:"normal"}),e.jsx(u,{label:"Discount",type:"number",fullWidth:!0,value:n.discount,onChange:t=>v(a,"discount",Number(t.target.value)),margin:"normal"}),e.jsx(p,{onClick:()=>z(a),children:"Remove Translation"})]},a))]}),e.jsxs("div",{children:[e.jsx(p,{variant:"outlined",onClick:U,children:"Add Media"}),D.map((n,a)=>e.jsxs(s,{container:!0,children:[e.jsx(s,{item:!0,children:e.jsx("input",{type:"file",accept:"image/*",onChange:t=>J(t,a)})}),e.jsx(s,{item:!0,children:e.jsx(p,{onClick:()=>_(a),children:"Remove"})})]},a))]}),e.jsxs("div",{children:["Photo Display:",e.jsx("input",{type:"file",accept:"image/*",onChange:n=>b(n.target.files?n.target.files[0]:null)})]})]}),e.jsxs(ee,{children:[e.jsx(p,{onClick:i,color:"primary",children:"Cancel"}),e.jsx(p,{onClick:$,color:"primary",children:"Create"})]})]})}function ie(){var S,g,k,j,w;const{id:f}=K(),[i,P]=r.useState(null),[N,m]=r.useState(!0),[R,x]=r.useState(!1),M=V(),C=d=>{P(c=>({...c,placeActivities:[...c.placeActivities||[],d]}))};return r.useEffect(()=>{(async()=>{const c=localStorage.getItem("accessToken");if(!c){console.error("No access token found");return}try{const h=await O.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${f}`,{headers:{Authorization:`Bearer ${c}`}});P(h.data),m(!1)}catch(h){console.error("Error fetching place details",h),m(!1)}})()},[f]),N?e.jsx(W,{children:e.jsx(y,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(te,{})})}):i?(i.status,i.status,i.status,e.jsxs(W,{children:[e.jsxs(y,{mb:4,display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx(p,{variant:"outlined",color:"primary",startIcon:e.jsx(E,{icon:"eva:arrow-back-fill"}),onClick:()=>M("/owner/activity"),children:"Back to List"}),e.jsx(l,{variant:"h4",children:"Place Detail"}),e.jsx(p,{variant:"contained",color:"secondary",startIcon:e.jsx(E,{icon:"mingcute:edit-line"}),children:"Edit"})]}),e.jsxs(s,{container:!0,spacing:3,children:[e.jsx(s,{item:!0,xs:12,md:4,children:e.jsx(B,{sx:{p:2,boxShadow:3},children:e.jsx(y,{mb:2,display:"flex",justifyContent:"center",children:e.jsx("img",{src:i.photoDisplay||"/placeholder.png",alt:((S=i.placeTranslations[0])==null?void 0:S.name)||"No name available",style:{width:"100%",height:"auto",maxHeight:"400px",objectFit:"cover"}})})})}),e.jsx(s,{item:!0,xs:12,md:8,children:e.jsxs(B,{sx:{p:3,boxShadow:3},children:[e.jsx(l,{variant:"h5",mb:2,children:(g=i.placeTranslations[0])==null?void 0:g.name}),e.jsxs(l,{variant:"body1",mb:2,children:["Address: ",(k=i.placeTranslations[0])==null?void 0:k.address]}),e.jsxs(l,{variant:"body1",mb:2,children:["Description: ",(j=i.placeTranslations[0])==null?void 0:j.description]}),e.jsxs(s,{container:!0,spacing:2,children:[e.jsx(s,{item:!0,xs:6,children:e.jsxs(l,{variant:"h6",children:["Opening Time: ",i.timeOpen]})}),e.jsx(s,{item:!0,xs:6,children:e.jsxs(l,{variant:"h6",children:["Closing Time: ",i.timeClose]})}),e.jsx(s,{item:!0,xs:6,children:e.jsxs(l,{variant:"h6",children:["Longitude: ",i.longitude]})}),e.jsx(s,{item:!0,xs:6,children:e.jsxs(l,{variant:"h6",children:["Latitude: ",i.latitude]})}),e.jsx(s,{item:!0,xs:6,children:e.jsxs(l,{variant:"h6",children:["Status: ",i.status==="Approved"?"Approved":i.status==="Rejected"?"Rejected":"Pending"]})})]})]})})]}),e.jsxs(l,{variant:"h5",mb:3,display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx("span",{children:"Place Activity"}),e.jsx(p,{variant:"contained",color:"primary",startIcon:e.jsx(E,{icon:"mingcute:add-line"}),onClick:()=>x(!0),children:"Create Activity"})]}),((w=i.placeActivities)==null?void 0:w.length)>0&&e.jsx(y,{mt:4,children:e.jsx(s,{container:!0,spacing:3,children:i.placeActivities.map(d=>{var c,h,b,A;return e.jsx(s,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsxs(B,{sx:{p:2,boxShadow:2,borderRadius:2},children:[e.jsx(y,{display:"flex",justifyContent:"center",alignItems:"center",style:{width:"100%",height:"auto",maxHeight:"400px",backgroundColor:"#f0f0f0",borderRadius:"8px",position:"relative",overflow:"hidden"},children:i.photoDisplay?e.jsx("img",{src:i.photoDisplay,alt:((c=i.placeTranslations[0])==null?void 0:c.name)||"Unnamed Place",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx(l,{variant:"h3",style:{color:"#fff",backgroundColor:"#3f51b5",borderRadius:"50%",width:"80px",height:"80px",display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"},children:((b=(h=i.placeTranslations[0])==null?void 0:h.name)==null?void 0:b.charAt(0).toUpperCase())||"N"})}),e.jsx(l,{variant:"h6",fontWeight:"bold",textAlign:"center",mb:1,children:(A=d.placeActivityTranslations[0])==null?void 0:A.activityName})]})},d.id)})})}),e.jsx(ae,{open:R,onClose:()=>x(!1),onActivityCreated:C,placeId:f||""})]})):e.jsx(W,{children:e.jsx(y,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(l,{variant:"h5",children:"Place not found"})})})}function me(){return e.jsxs(e.Fragment,{children:[e.jsx(q,{children:e.jsxs("title",{children:[" ",`Place Details - ${Q.appName}`]})}),e.jsx(ie,{})]})}export{me as default};
