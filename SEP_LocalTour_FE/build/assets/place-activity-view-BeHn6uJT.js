import{r as l,j as e,h as d,aI as Y,F as z,G as o,aH as Z,O as ee,D as O,B as A,w as te,T as c,I as R,C as $,H as ae}from"./index-z39hXFLl.js";import{C as ie}from"./config-global-BwHnWRtc.js";import{a as H}from"./axiosInstance-Xq098mIU.js";import{D as G,a as q,b as U,c as V}from"./DialogTitle-Dgc1Aws8.js";import{T as D}from"./TextField-B2lMQ9Li.js";import{F as ne,I as se}from"./InputLabel-D6bSjKO1.js";function re({open:m,onClose:a,onActivityCreated:w,placeId:I}){const[x,L]=l.useState(""),[g,W]=l.useState(""),[T,P]=l.useState(0),[j,B]=l.useState(""),[N,F]=l.useState(0),[v,k]=l.useState("vi"),[y,f]=l.useState(null),[C,b]=l.useState(1);l.useEffect(()=>{m||(f(null),k("vi"),b(1),s([{languageCode:"vi",activityName:"",price:0,description:"",priceType:"",discount:0}]))},[m]);const[p,s]=l.useState([{languageCode:v,activityName:x,price:T,description:g,priceType:j,discount:N}]),[r,u]=l.useState([]),E=async()=>{if(!y||r.length<1||!C){alert("Please fill out all required fields");return}const n=localStorage.getItem("accessToken");if(!n){console.error("No access token found");return}const i=new FormData;i.append("placeid",I),i.append("DisplayNumber",C.toString()),p.forEach(t=>{if(!t.activityName||t.price<=0||!t.description||!t.priceType){alert("Please fill out all required fields");return}i.append("PlaceActivityTranslations",JSON.stringify(t))}),y&&i.append("PhotoDisplay",y),r.forEach(t=>{t&&i.append("PlaceActivityMedium",t)});try{const t=await H.post(`https://api.localtour.space/api/PlaceActivity/create?placeid=${I}`,i,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"multipart/form-data"}});console.log("Activity created response:",t.data),w(t.data),a(),M()}catch(t){console.error("Error creating activity",t)}},M=()=>{L(""),W(""),P(0),B(""),F(0),k("vi"),f(null),b(1),s([{languageCode:v,activityName:x,price:T,description:g,priceType:j,discount:N}]),u([])},_=()=>{s([...p,{languageCode:v,activityName:x,price:T,description:g,priceType:j,discount:N}])},J=n=>{const i=p.filter((t,h)=>h!==n);s(i)},K=()=>{u([...r,null])},Q=n=>{const i=r.filter((t,h)=>h!==n);u(i)},S=(n,i,t)=>{const h=[...p];h[n]={...h[n],[i]:t},s(h)},X=(n,i)=>{const t=n.target.files;if(t&&t[0]){const h=[...r];h[i]=t[0],u(h)}};return e.jsxs(G,{open:m,onClose:a,children:[e.jsx(q,{children:"Create Activity"}),e.jsxs(U,{children:[e.jsx(D,{label:"Display Number",type:"number",fullWidth:!0,value:C,onChange:n=>b(Number(n.target.value)),margin:"normal"}),e.jsxs("div",{children:[e.jsx(d,{variant:"outlined",onClick:_,children:"Add Translation"}),p.map((n,i)=>e.jsxs("div",{children:[e.jsx(D,{label:"Activity Name",fullWidth:!0,value:n.activityName,onChange:t=>S(i,"activityName",t.target.value),margin:"normal"}),e.jsxs(ne,{fullWidth:!0,margin:"normal",children:[e.jsx(se,{children:"Language"}),e.jsxs(Y,{value:v,onChange:t=>k(t.target.value),label:"Language",children:[e.jsx(z,{value:"vi",children:"VN"})," ",e.jsx(z,{value:"en",children:"EN"})," "]})]}),e.jsx(D,{label:"Description",fullWidth:!0,value:n.description,onChange:t=>S(i,"description",t.target.value),margin:"normal"}),e.jsx(D,{label:"Price",type:"number",fullWidth:!0,value:n.price,onChange:t=>S(i,"price",Number(t.target.value)),margin:"normal"}),e.jsx(D,{label:"Price Type",fullWidth:!0,value:n.priceType,onChange:t=>S(i,"priceType",t.target.value),margin:"normal"}),e.jsx(D,{label:"Discount",type:"number",fullWidth:!0,value:n.discount,onChange:t=>S(i,"discount",Number(t.target.value)),margin:"normal"}),e.jsx(d,{onClick:()=>J(i),children:"Remove Translation"})]},i))]}),e.jsxs("div",{children:[e.jsx(d,{variant:"outlined",onClick:K,children:"Add Media"}),r.map((n,i)=>e.jsxs(o,{container:!0,children:[e.jsx(o,{item:!0,children:e.jsx("input",{type:"file",accept:"image/*",onChange:t=>X(t,i)})}),e.jsx(o,{item:!0,children:e.jsx(d,{onClick:()=>Q(i),children:"Remove"})})]},i))]}),e.jsxs("div",{children:["Photo Display:",e.jsx("input",{type:"file",accept:"image/*",onChange:n=>f(n.target.files?n.target.files[0]:null)})]})]}),e.jsxs(V,{children:[e.jsx(d,{onClick:a,color:"primary",children:"Cancel"}),e.jsx(d,{onClick:E,color:"primary",children:"Create"})]})]})}function le(){var y,f,C,b,p;const{id:m}=Z(),[a,w]=l.useState(null),[I,x]=l.useState(!0),[L,g]=l.useState(!1),W=ee(),[T,P]=l.useState(!1),[j,B]=l.useState(null),N=s=>{B(s),P(!0)},F=()=>{P(!1)},v=async()=>{if(j)try{const s=localStorage.getItem("accessToken");if(!s){console.error("No access token found");return}const r=await H.delete(`https://api.localtour.space/api/PlaceActivity/delete?placeid=${a.id}&activityid=${j.id}`,{headers:{Authorization:`Bearer ${s}`}});console.log("Activity deleted",r.data),P(!1)}catch(s){console.error("Error deleting activity",s)}},k=s=>{w(r=>({...r,placeActivities:[...r.placeActivities||[],s]}))};return l.useEffect(()=>{(async()=>{const r=localStorage.getItem("accessToken");if(!r){console.error("No access token found");return}try{const u=await H.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${m}`,{headers:{Authorization:`Bearer ${r}`}});w(u.data),x(!1)}catch(u){console.error("Error fetching place details",u),x(!1)}})()},[m]),I?e.jsx(O,{children:e.jsx(A,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(te,{})})}):a?(a.status,a.status,a.status,e.jsxs(O,{children:[e.jsxs(A,{mb:4,display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx(d,{variant:"outlined",color:"primary",startIcon:e.jsx(R,{icon:"eva:arrow-back-fill"}),onClick:()=>W("/owner/activity"),children:"Back to List"}),e.jsx(c,{variant:"h4",children:"Place Detail"}),e.jsx(d,{variant:"contained",color:"secondary",startIcon:e.jsx(R,{icon:"mingcute:edit-line"}),children:"Edit"})]}),e.jsxs(o,{container:!0,spacing:3,children:[e.jsx(o,{item:!0,xs:12,md:4,children:e.jsx($,{sx:{p:2,boxShadow:3},children:e.jsx(A,{mb:2,display:"flex",justifyContent:"center",children:e.jsx("img",{src:a.photoDisplay||"/placeholder.png",alt:((y=a.placeTranslations[0])==null?void 0:y.name)||"No name available",style:{width:"100%",height:"auto",maxHeight:"400px",objectFit:"cover"}})})})}),e.jsx(o,{item:!0,xs:12,md:8,children:e.jsxs($,{sx:{p:3,boxShadow:3},children:[e.jsx(c,{variant:"h5",mb:2,children:(f=a.placeTranslations[0])==null?void 0:f.name}),e.jsxs(c,{variant:"body1",mb:2,children:["Address: ",(C=a.placeTranslations[0])==null?void 0:C.address]}),e.jsxs(c,{variant:"body1",mb:2,children:["Description: ",(b=a.placeTranslations[0])==null?void 0:b.description]}),e.jsxs(o,{container:!0,spacing:2,children:[e.jsx(o,{item:!0,xs:6,children:e.jsxs(c,{variant:"h6",children:["Opening Time: ",a.timeOpen]})}),e.jsx(o,{item:!0,xs:6,children:e.jsxs(c,{variant:"h6",children:["Closing Time: ",a.timeClose]})}),e.jsx(o,{item:!0,xs:6,children:e.jsxs(c,{variant:"h6",children:["Longitude: ",a.longitude]})}),e.jsx(o,{item:!0,xs:6,children:e.jsxs(c,{variant:"h6",children:["Latitude: ",a.latitude]})}),e.jsx(o,{item:!0,xs:6,children:e.jsxs(c,{variant:"h6",children:["Status: ",a.status==="Approved"?"Approved":a.status==="Rejected"?"Rejected":"Pending"]})})]})]})})]}),e.jsxs(c,{variant:"h5",mb:3,display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx("span",{children:"Place Activity"}),e.jsx(d,{variant:"contained",color:"primary",startIcon:e.jsx(R,{icon:"mingcute:add-line"}),onClick:()=>g(!0),children:"Create Activity"})]}),((p=a.placeActivities)==null?void 0:p.length)>0&&e.jsx(A,{mt:4,children:e.jsx(o,{container:!0,spacing:3,children:a.placeActivities.map(s=>{var r,u,E,M;return e.jsx(o,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsxs($,{sx:{p:2,boxShadow:2,borderRadius:2},children:[e.jsx(A,{display:"flex",justifyContent:"center",alignItems:"center",style:{width:"100%",height:"auto",maxHeight:"400px",backgroundColor:"#f0f0f0",borderRadius:"8px",position:"relative",overflow:"hidden"},children:a.photoDisplay?e.jsx("img",{src:a.photoDisplay,alt:((r=a.placeTranslations[0])==null?void 0:r.name)||"Unnamed Place",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx(c,{variant:"h3",style:{color:"#fff",backgroundColor:"#3f51b5",borderRadius:"50%",width:"80px",height:"80px",display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"},children:((E=(u=a.placeTranslations[0])==null?void 0:u.name)==null?void 0:E.charAt(0).toUpperCase())||"N"})}),e.jsx(c,{variant:"h6",fontWeight:"bold",textAlign:"center",mb:1,children:(M=s.placeActivityTranslations[0])==null?void 0:M.activityName}),e.jsx(d,{variant:"outlined",color:"error",onClick:()=>N(s),startIcon:e.jsx(R,{icon:"eva:trash-2-fill"}),sx:{marginLeft:"auto",display:"block"}})]})},s.id)})})}),e.jsx(re,{open:L,onClose:()=>g(!1),onActivityCreated:k,placeId:m||""}),e.jsxs(G,{open:T,onClose:F,children:[e.jsx(q,{children:"Are you sure you want to delete this activity?"}),e.jsx(U,{children:e.jsx(c,{variant:"body1",children:"This action cannot be undone. Please confirm if you want to delete this activity."})}),e.jsxs(V,{children:[e.jsx(d,{onClick:F,color:"primary",children:"Cancel"}),e.jsx(d,{onClick:v,color:"error",children:"Delete"})]})]})]})):e.jsx(O,{children:e.jsx(A,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(c,{variant:"h5",children:"Place not found"})})})}function me(){return e.jsxs(e.Fragment,{children:[e.jsx(ae,{children:e.jsxs("title",{children:[" ",`Place Details - ${ie.appName}`]})}),e.jsx(le,{})]})}export{me as default};