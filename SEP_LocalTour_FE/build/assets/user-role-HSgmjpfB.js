import{aI as R,K as S,r as s,j as e,B as c,f as r,m as a,k as g,H as B}from"./index-DLLpggCp.js";import{C as I}from"./config-global-BwHnWRtc.js";import{a as w}from"./index-Br0q4W-C.js";import{C as b}from"./Card-CoWpxzdt.js";import{C as N}from"./CardContent-ClLjPmXh.js";import{F as A,I as F}from"./InputLabel-CZzWmdNV.js";import{S as P}from"./Select-DNJzF_Xw.js";function k(){const j=R(),p=S(),{user:o,userId:n,userName:d,role:m}=j.state||{},[i,f]=s.useState(m||""),[h,l]=s.useState(""),[u,v]=s.useState(""),x=localStorage.getItem("accessToken");s.useEffect(()=>{o||l("No user data found!")},[o]);const y=t=>{f(t.target.value)},C=async()=>{if(!x){l("Authentication required. Please log in again.");return}try{const t=`https://api.localtour.space/api/User/addRole?userId=${n}&role=${i}`;(await w.post(t,{userId:n,userName:d,role:i},{headers:{Authorization:`Bearer ${x}`}})).status===200&&v("Role updated successfully!")}catch{l("Failed to update role. Please try again.")}};return e.jsx(c,{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"70vh",bgcolor:"#f9f9f9",sx:{maxWidth:"90vw",padding:2},children:e.jsx(b,{sx:{width:400,padding:3},children:e.jsxs(N,{children:[e.jsx(r,{variant:"h5",align:"center",marginBottom:2,children:"User Role Page"}),h&&e.jsx(r,{color:"error",variant:"body2",align:"center",marginBottom:2,children:h}),u&&e.jsx(r,{color:"success.main",variant:"body2",align:"center",marginBottom:2,children:u}),o&&e.jsxs(e.Fragment,{children:[e.jsxs(r,{variant:"body1",marginBottom:1,children:[e.jsx("strong",{children:"ID:"})," ",n]}),e.jsxs(r,{variant:"body1",marginBottom:1,children:[e.jsx("strong",{children:"User Name:"})," ",d]}),e.jsxs(r,{variant:"body1",marginBottom:1,children:[e.jsx("strong",{children:"Current Role:"})," ",m]}),e.jsxs(A,{fullWidth:!0,margin:"normal",children:[e.jsx(F,{children:"New Role"}),e.jsxs(P,{value:i,onChange:y,label:"New Role",children:[e.jsx(a,{value:"Moderator",children:"Moderator"}),e.jsx(a,{value:"Administrator",children:"Administrator"}),e.jsx(a,{value:"Visitor",children:"Visitor"}),e.jsx(a,{value:"Service Owner",children:"Service Owner"})]})]}),e.jsx(c,{textAlign:"center",marginTop:2,children:e.jsx(g,{variant:"contained",color:"primary",onClick:C,sx:{width:"100%"},children:"Save Role"})})]}),e.jsx(c,{textAlign:"center",marginTop:2,children:e.jsx(g,{variant:"text",onClick:()=>p("/profile"),sx:{width:"100%"},children:"Go to Profile"})})]})})})}function L(){return e.jsxs(e.Fragment,{children:[e.jsx(B,{children:e.jsxs("title",{children:[" ",`Blog - ${I.appName}`]})}),e.jsx(k,{})]})}export{L as default};
