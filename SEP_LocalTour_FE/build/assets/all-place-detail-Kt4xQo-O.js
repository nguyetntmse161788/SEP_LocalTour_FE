import{aH as C,r as l,O as P,j as e,D as o,B as i,w as T,T as t,h as g,I as f,G as a,C as d,H as I}from"./index-z39hXFLl.js";import{C as D}from"./config-global-BwHnWRtc.js";import{a as w}from"./axiosInstance-Xq098mIU.js";function S(){var j,p,u,m;const{id:h}=C(),[s,v]=l.useState(null),[y,x]=l.useState(!0),b=P();return l.useEffect(()=>{(async()=>{const r=localStorage.getItem("accessToken");if(!r){console.error("No access token found");return}try{const c=await w.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${h}`,{headers:{Authorization:`Bearer ${r}`}});v(c.data),x(!1)}catch(c){console.error("Error fetching place details",c),x(!1)}})()},[h]),y?e.jsx(o,{children:e.jsx(i,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(T,{})})}):s?(s.status,s.status,s.status,e.jsxs(o,{children:[e.jsxs(i,{mb:4,display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx(g,{variant:"outlined",color:"primary",startIcon:e.jsx(f,{icon:"eva:arrow-back-fill"}),onClick:()=>b("/owner/created"),children:"Back to List"}),e.jsx(t,{variant:"h4",children:"Place Detail"}),e.jsx(g,{variant:"contained",color:"secondary",startIcon:e.jsx(f,{icon:"mingcute:edit-line"}),children:"Edit"})]}),e.jsxs(a,{container:!0,spacing:3,children:[e.jsx(a,{item:!0,xs:12,md:4,children:e.jsx(d,{sx:{p:2,boxShadow:3},children:e.jsx(i,{mb:2,display:"flex",justifyContent:"center",children:e.jsx("img",{src:s.photoDisplay,alt:(j=s.placeTranslations[0])==null?void 0:j.name,style:{width:"100%",height:"auto",maxHeight:"400px",objectFit:"cover"}})})})}),e.jsxs(a,{item:!0,xs:12,md:8,children:[e.jsxs(d,{sx:{p:3,boxShadow:3},children:[e.jsx(t,{variant:"h5",mb:2,children:(p=s.placeTranslations[0])==null?void 0:p.name}),e.jsxs(t,{variant:"body1",mb:2,children:["Address: ",(u=s.placeTranslations[0])==null?void 0:u.address]}),e.jsxs(t,{variant:"body1",mb:2,children:["Description: ",(m=s.placeTranslations[0])==null?void 0:m.description]}),e.jsxs(a,{container:!0,spacing:2,children:[e.jsx(a,{item:!0,xs:6,children:e.jsxs(t,{variant:"h6",children:["Opening Time: ",s.timeOpen]})}),e.jsx(a,{item:!0,xs:6,children:e.jsxs(t,{variant:"h6",children:["Closing Time: ",s.timeClose]})}),e.jsx(a,{item:!0,xs:6,children:e.jsxs(t,{variant:"h6",children:["Longitude: ",s.longitude]})}),e.jsx(a,{item:!0,xs:6,children:e.jsxs(t,{variant:"h6",children:["Latitude: ",s.latitude]})}),e.jsx(a,{item:!0,xs:6,children:e.jsxs(t,{variant:"h6",children:["Status: ",s.status==="Approved"?"Approved":s.status==="Rejected"?"Rejected":"Pending"]})})]})]}),s.placeTranslations.length>1&&e.jsxs(d,{sx:{mt:3,p:3,boxShadow:3},children:[e.jsx(t,{variant:"h6",mb:2,children:"Other Translations:"}),s.placeTranslations.map((n,r)=>e.jsxs(i,{mb:2,children:[e.jsxs(t,{variant:"body1",children:["Name: ",n.name]}),e.jsxs(t,{variant:"body1",children:["Description: ",n.description]}),e.jsxs(t,{variant:"body1",children:["Address: ",n.address]}),e.jsxs(t,{variant:"body1",children:["Contact: ",n.contact]})]},r))]})]})]})]})):e.jsx(o,{children:e.jsx(i,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(t,{variant:"h5",children:"Place not found"})})})}function E(){return e.jsxs(e.Fragment,{children:[e.jsx(I,{children:e.jsxs("title",{children:[" ",`Place Details - ${D.appName}`]})}),e.jsx(S,{})]})}export{E as default};
