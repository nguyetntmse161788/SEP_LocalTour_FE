import{av as I,r as x,R as k,j as e,y as p,B as i,f as a,k as o,I as A,H as D}from"./index-B2v2_DKC.js";import{C as N}from"./config-global-BwHnWRtc.js";import{a as P}from"./index-Br0q4W-C.js";import{C as $}from"./CircularProgress-AqbkGrV7.js";import{G as r}from"./Grid-DvJR57Hl.js";import{C as d}from"./Card-DGcZmdxA.js";function B(){var g,f,y,v,b;const{id:h}=I(),[t,u]=x.useState(null),[w,j]=x.useState(!0),S=k();x.useEffect(()=>{(async()=>{const n=localStorage.getItem("accessToken");if(!n){console.error("No access token found");return}try{const c=await P.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${h}`,{headers:{Authorization:`Bearer ${n}`}});u(c.data),j(!1)}catch(c){console.error("Error fetching place details",c),j(!1)}})()},[h]);const m=async s=>{const n=localStorage.getItem("accessToken");if(!n){console.error("No access token found");return}try{console.log(`Changing status to: ${s}`),(await P.put(`https://api.localtour.space/api/Place/changeStatusPlace?placeid=${h}&status=${s}`,{},{headers:{Authorization:`Bearer ${n}`}})).status===200&&(console.log(`Status updated to: ${s}`),u(l=>({...l,status:s})))}catch(c){console.error("Error changing status",c)}};return w?e.jsx(p,{children:e.jsx(i,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx($,{})})}):t?(t.status,t.status,t.status,e.jsxs(p,{children:[e.jsxs(i,{mb:4,display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{variant:"outlined",color:"primary",startIcon:e.jsx(A,{icon:"eva:arrow-back-fill"}),onClick:()=>S("/place"),children:"Back to List"}),e.jsx(a,{variant:"h4",children:"Place Detail"}),e.jsx(o,{variant:"contained",color:"secondary",startIcon:e.jsx(A,{icon:"mingcute:edit-line"}),children:"Edit"})]}),e.jsxs(r,{container:!0,spacing:3,children:[e.jsx(r,{item:!0,xs:12,md:4,children:e.jsx(d,{sx:{p:2,boxShadow:3},children:e.jsx(i,{mb:2,display:"flex",justifyContent:"center",children:e.jsx("img",{src:t.photoDisplay,alt:(g=t.placeTranslations[0])==null?void 0:g.name,style:{width:"100%",height:"auto",maxHeight:"400px",objectFit:"cover"}})})})}),e.jsxs(r,{item:!0,xs:12,md:8,children:[e.jsxs(d,{sx:{p:3,boxShadow:3},children:[e.jsx(a,{variant:"h5",mb:2,children:(f=t.placeTranslations[0])==null?void 0:f.name}),e.jsxs(a,{variant:"body1",mb:2,children:["Address: ",(y=t.placeTranslations[0])==null?void 0:y.address]}),e.jsxs(a,{variant:"body1",mb:2,children:["Description: ",(v=t.placeTranslations[0])==null?void 0:v.description]}),e.jsxs(r,{container:!0,spacing:2,children:[e.jsx(r,{item:!0,xs:6,children:e.jsxs(a,{variant:"h6",children:["Opening Time: ",t.timeOpen]})}),e.jsx(r,{item:!0,xs:6,children:e.jsxs(a,{variant:"h6",children:["Closing Time: ",t.timeClose]})}),e.jsx(r,{item:!0,xs:6,children:e.jsxs(a,{variant:"h6",children:["Longitude: ",t.longitude]})}),e.jsx(r,{item:!0,xs:6,children:e.jsxs(a,{variant:"h6",children:["Latitude: ",t.latitude]})}),e.jsx(r,{item:!0,xs:6,children:e.jsxs(a,{variant:"h6",children:["Status: ",t.status==="1"?"Approved":t.status==="2"?"Rejected":"Pending"]})})]}),e.jsxs(i,{mt:3,display:"flex",gap:2,children:[e.jsx(o,{variant:"contained",color:"success",onClick:()=>m("1"),disabled:t.status==="1",children:"Approved"}),e.jsx(o,{variant:"contained",color:"error",onClick:()=>m("2"),disabled:t.status==="2",children:"Rejected"})]})]}),t.placeTranslations.length>1&&e.jsxs(d,{sx:{mt:3,p:3,boxShadow:3},children:[e.jsx(a,{variant:"h6",mb:2,children:"Other Translations:"}),t.placeTranslations.map((s,n)=>e.jsxs(i,{mb:2,children:[e.jsxs(a,{variant:"body1",children:["Name: ",s.name]}),e.jsxs(a,{variant:"body1",children:["Description: ",s.description]}),e.jsxs(a,{variant:"body1",children:["Address: ",s.address]}),e.jsxs(a,{variant:"body1",children:["Contact: ",s.contact]})]},n))]})]})]}),((b=t.placeActivities)==null?void 0:b.length)>0&&e.jsxs(i,{mt:4,children:[e.jsx(a,{variant:"h5",mb:3,children:"Place Activity"}),e.jsx(r,{container:!0,spacing:3,children:t.placeActivities.map(s=>{var n,c,l,C,T;return e.jsx(r,{item:!0,xs:12,sm:6,md:4,lg:3,children:e.jsxs(d,{sx:{p:2,boxShadow:2,borderRadius:2},children:[e.jsxs(i,{position:"relative",mb:2,children:[e.jsx("img",{src:s.photoDisplay,alt:((n=s.placeActivityTranslations[0])==null?void 0:n.activityName)||"Activity",style:{width:"100%",height:"auto",borderRadius:"8px",objectFit:"cover"}}),((c=s.placeActivityTranslations[0])==null?void 0:c.discount)>0&&e.jsx(i,{position:"absolute",top:8,right:8,bgcolor:"error.main",color:"white",px:1,py:.5,borderRadius:1,fontSize:"12px",fontWeight:"bold",children:"SALE"})]}),e.jsx(a,{variant:"h6",fontWeight:"bold",textAlign:"center",mb:1,children:(l=s.placeActivityTranslations[0])==null?void 0:l.activityName}),e.jsxs(i,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsx(i,{children:e.jsx(a,{variant:"subtitle1",color:"text.secondary",children:new Intl.NumberFormat("vi-VN",{style:"currency",currency:((C=s.placeActivityTranslations[0])==null?void 0:C.priceType)||"VND"}).format((T=s.placeActivityTranslations[0])==null?void 0:T.price)})}),e.jsx(o,{variant:"outlined",size:"small",color:"primary",children:"View"})]})]})},s.id)})})]})]})):e.jsx(p,{children:e.jsx(i,{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",children:e.jsx(a,{variant:"h5",children:"Place not found"})})})}function V(){return e.jsxs(e.Fragment,{children:[e.jsx(D,{children:e.jsxs("title",{children:[" ",`Place Details - ${N.appName}`]})}),e.jsx(B,{})]})}export{V as default};
