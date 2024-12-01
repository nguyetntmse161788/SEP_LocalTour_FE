import{r as o,j as e,k as h,av as F,K as B,y as I,B as l,f as n,I as N,H as O}from"./index-DLLpggCp.js";import{C as R}from"./config-global-BwHnWRtc.js";import{a as T}from"./index-Br0q4W-C.js";import{D as W,a as $,b as z,c as L}from"./DialogTitle-CtaROk3G.js";import{T as S}from"./TextField-CmysNO-A.js";import{C as G}from"./CircularProgress-BCyXAyXz.js";import{G as i}from"./Grid-BZV5O7sk.js";import{C as P}from"./Card-CoWpxzdt.js";import"./Select-DNJzF_Xw.js";import"./InputLabel-CZzWmdNV.js";function H({open:c,onClose:a,onEventCreated:w,placeId:f}){const[p,v]=o.useState(""),[m,y]=o.useState(""),[x,b]=o.useState(""),[C,u]=o.useState(""),[j,g]=o.useState(null),D=t=>{t.target.files&&t.target.files.length>0&&g(t.target.files[0])},s=async()=>{const t=localStorage.getItem("accessToken");if(!t){console.error("No access token found");return}const k=new Date(x).toISOString(),A=new Date(C).toISOString(),d=new FormData;d.append("placeid",f),d.append("eventName",p),d.append("description",m),d.append("startDate",k),d.append("endDate",A),j&&d.append("eventPhoto",j),console.log("Data being sent to API:",d);try{const E=await T.post("https://api.localtour.space/api/Event/create",d,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"multipart/form-data"}});console.log("Event created response:",E.data),w(E.data),a(),r()}catch(E){console.error("Error creating event",E)}},r=()=>{v(""),y(""),b(""),u(""),g(null)};return e.jsxs(W,{open:c,onClose:a,children:[e.jsx($,{children:"Create Event"}),e.jsxs(z,{children:[e.jsx(S,{label:"Event Name",fullWidth:!0,value:p,onChange:t=>v(t.target.value),margin:"normal"}),e.jsx(S,{label:"Description",fullWidth:!0,value:m,onChange:t=>y(t.target.value),margin:"normal"}),e.jsx(S,{label:"Start Date",type:"datetime-local",fullWidth:!0,value:x,onChange:t=>b(t.target.value),margin:"normal"}),e.jsx(S,{label:"End Date",type:"datetime-local",fullWidth:!0,value:C,onChange:t=>u(t.target.value),margin:"normal"}),e.jsx("input",{id:"event-photo",type:"file",accept:"image/*",onChange:D,style:{marginTop:"1rem"}})]}),e.jsxs(L,{children:[e.jsx(h,{onClick:a,color:"primary",children:"Cancel"}),e.jsx(h,{onClick:s,color:"primary",children:"Create"})]})]})}function V(){var u,j,g,D;const{id:c}=F(),[a,w]=o.useState(null),[f,p]=o.useState([]),[v,m]=o.useState(!0),[y,x]=o.useState(!1),b=B(),C=s=>{p(r=>[...r,s])};return o.useEffect(()=>{(async()=>{const r=localStorage.getItem("accessToken");if(!r){console.error("No access token found");return}try{const t=await T.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${c}`,{headers:{Authorization:`Bearer ${r}`}});w(t.data),m(!1)}catch(t){console.error("Error fetching place details",t),m(!1)}})()},[c]),o.useEffect(()=>{c&&(async()=>{const r=localStorage.getItem("accessToken");if(!r){console.error("No access token found");return}try{const t=await T.get(`https://api.localtour.space/api/Event/getall?placeid=${c}&languageCode=vi`,{headers:{Authorization:`Bearer ${r}`}});console.log("Place events data:",t.data.items),p(t.data.items)}catch(t){console.error("Error fetching place events",t)}})()},[c]),v?e.jsx(I,{children:e.jsx(l,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(G,{})})}):a?(a.status,a.status,a.status,e.jsxs(I,{children:[e.jsxs(l,{mb:4,display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx(h,{variant:"outlined",color:"primary",startIcon:e.jsx(N,{icon:"eva:arrow-back-fill"}),onClick:()=>b("/owner/event"),children:"Back to List"}),e.jsx(n,{variant:"h4",children:"Place Detail"}),e.jsx(h,{variant:"contained",color:"secondary",startIcon:e.jsx(N,{icon:"mingcute:edit-line"}),children:"Edit"})]}),e.jsxs(i,{container:!0,spacing:3,children:[e.jsx(i,{item:!0,xs:12,md:4,children:e.jsx(P,{sx:{p:2,boxShadow:3},children:e.jsx(l,{mb:2,display:"flex",justifyContent:"center",children:e.jsx("img",{src:a.photoDisplay,alt:(u=a.placeTranslations[0])==null?void 0:u.name,style:{width:"100%",height:"auto",maxHeight:"400px",objectFit:"cover"}})})})}),e.jsxs(i,{item:!0,xs:12,md:8,children:[e.jsxs(P,{sx:{p:3,boxShadow:3},children:[e.jsx(n,{variant:"h5",mb:2,children:(j=a.placeTranslations[0])==null?void 0:j.name}),e.jsxs(n,{variant:"body1",mb:2,children:["Address: ",(g=a.placeTranslations[0])==null?void 0:g.address]}),e.jsxs(n,{variant:"body1",mb:2,children:["Description: ",(D=a.placeTranslations[0])==null?void 0:D.description]}),e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{item:!0,xs:6,children:e.jsxs(n,{variant:"h6",children:["Opening Time: ",a.timeOpen]})}),e.jsx(i,{item:!0,xs:6,children:e.jsxs(n,{variant:"h6",children:["Closing Time: ",a.timeClose]})}),e.jsx(i,{item:!0,xs:6,children:e.jsxs(n,{variant:"h6",children:["Longitude: ",a.longitude]})}),e.jsx(i,{item:!0,xs:6,children:e.jsxs(n,{variant:"h6",children:["Latitude: ",a.latitude]})}),e.jsx(i,{item:!0,xs:6,children:e.jsxs(n,{variant:"h6",children:["Status: ",a.status==="Approved"?"Approved":a.status==="Rejected"?"Rejected":"Pending"]})})]})]}),a.placeTranslations.length>1&&e.jsxs(P,{sx:{mt:3,p:3,boxShadow:3},children:[e.jsx(n,{variant:"h6",mb:2,children:"Other Translations:"}),a.placeTranslations.map((s,r)=>e.jsxs(l,{mb:2,children:[e.jsxs(n,{variant:"body1",children:["Name: ",s.name]}),e.jsxs(n,{variant:"body1",children:["Description: ",s.description]}),e.jsxs(n,{variant:"body1",children:["Address: ",s.address]}),e.jsxs(n,{variant:"body1",children:["Contact: ",s.contact]})]},r))]})]})]}),e.jsxs(l,{display:"flex",justifyContent:"space-between",alignItems:"center",mb:3,children:[e.jsx(n,{variant:"h5",children:"Place Events"}),e.jsx(h,{variant:"contained",color:"primary",startIcon:e.jsx(N,{icon:"mingcute:add-line"}),onClick:()=>x(!0),children:"Create Event"})]}),f.length>0?e.jsx(l,{mt:4,children:e.jsx(i,{container:!0,spacing:3,children:f.map(s=>{var r;return e.jsx(i,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsxs(P,{sx:{p:2,boxShadow:2,borderRadius:2},children:[e.jsx(l,{position:"relative",mb:2,children:s.eventPhotoDisplay?e.jsx("img",{src:s.eventPhotoDisplay,alt:s.eventName||"Event",style:{width:"100%",height:"auto",borderRadius:"8px",objectFit:"cover"}}):e.jsx(l,{display:"flex",justifyContent:"center",alignItems:"center",sx:{width:"100%",height:200,borderRadius:"8px",backgroundColor:"#f0f0f0",fontSize:"3rem",fontWeight:"bold",color:"#888"},children:(r=s.eventName)==null?void 0:r.charAt(0)})}),e.jsx(n,{variant:"h6",fontWeight:"bold",textAlign:"center",mb:1,children:s.eventName}),e.jsxs(n,{variant:"body2",color:"text.secondary",mb:1,children:["Start Date: ",s.startDate]}),e.jsxs(n,{variant:"body2",color:"text.secondary",mb:1,children:["End Date: ",s.endDate]}),e.jsx(l,{display:"flex",justifyContent:"space-between",alignItems:"center",children:e.jsx(h,{variant:"outlined",size:"small",color:"primary",children:"View"})})]})},s.id)})})}):e.jsx(n,{variant:"body1",color:"text.secondary",mt:3,children:"No events found for this place."}),e.jsx(H,{open:y,onClose:()=>x(!1),onEventCreated:C,placeId:c||""})]})):e.jsx(I,{children:e.jsx(l,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(n,{variant:"h5",children:"Place not found"})})})}function ee(){return e.jsxs(e.Fragment,{children:[e.jsx(O,{children:e.jsxs("title",{children:[" ",`Place Details - ${R.appName}`]})}),e.jsx(V,{})]})}export{ee as default};
