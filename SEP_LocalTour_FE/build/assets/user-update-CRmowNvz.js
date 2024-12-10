import{K as b,aJ as B,r as c,j as e,B as C,f as N,k as j,A as U,H as y}from"./index-DUX23g0E.js";import{C as F}from"./config-global-BwHnWRtc.js";import{a as O}from"./index-Br0q4W-C.js";import{G as i}from"./Grid-Bx36BDWb.js";import{T as u}from"./TextField-DgaCIWDs.js";import"./Select-CoLeV2jR.js";import"./InputLabel-6HE52FsW.js";function w(){var h;const m=b(),a=(h=B().state)==null?void 0:h.user,[t,d]=c.useState({fullName:"",dateOfBirth:"",address:"",gender:"",profilePicture:null}),[f,p]=c.useState(null);c.useEffect(()=>{a&&(d({fullName:a.fullName||"",dateOfBirth:a.dateOfBirth||"",address:a.address||"",gender:a.gender||"",profilePicture:null}),a.profilePictureUrl&&p(a.profilePictureUrl))},[a]);const l=n=>{const{name:r,value:o}=n.target;d({...t,[r]:o})},v=n=>{const r=n.target.files?n.target.files[0]:null;d({...t,profilePicture:r}),r&&p(URL.createObjectURL(r))},P=async n=>{var x,g;n.preventDefault();const r=localStorage.getItem("accessToken");if(!r){alert("No token found. Please log in."),m("/sign-in");return}const o=new FormData;Object.keys(t).forEach(s=>{t[s]&&o.append(s,t[s])});try{(await O.put("https://api.localtour.space/api/User",o,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"multipart/form-data"}})).status===200&&(alert("Profile updated successfully!"),m("/admin"))}catch(s){console.error("Error updating profile:",s),alert(((g=(x=s.response)==null?void 0:x.data)==null?void 0:g.message)||"Failed to update profile.")}};return e.jsxs(C,{sx:{maxWidth:600,mx:"auto",mt:5,p:3,boxShadow:2,borderRadius:2},children:[e.jsx(N,{variant:"h5",gutterBottom:!0,children:"Update Profile"}),e.jsx("form",{onSubmit:P,children:e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{item:!0,xs:12,children:e.jsx(u,{label:"Full Name",name:"fullName",value:t.fullName,onChange:l,fullWidth:!0,variant:"outlined"})}),e.jsx(i,{item:!0,xs:12,children:e.jsx(u,{type:"date",label:"Date of Birth",name:"dateOfBirth",value:t.dateOfBirth,onChange:l,fullWidth:!0,InputLabelProps:{shrink:!0}})}),e.jsx(i,{item:!0,xs:12,children:e.jsx(u,{label:"Address",name:"address",value:t.address,onChange:l,fullWidth:!0,variant:"outlined"})}),e.jsx(i,{item:!0,xs:12,children:e.jsx(u,{label:"Gender",name:"gender",value:t.gender,onChange:l,fullWidth:!0,variant:"outlined"})}),e.jsxs(i,{item:!0,xs:12,children:[e.jsxs(j,{variant:"contained",component:"label",children:["Upload Profile Picture",e.jsx("input",{type:"file",hidden:!0,accept:"image/*",onChange:v})]}),f&&e.jsx(U,{src:f,alt:"Preview",sx:{width:100,height:100,mt:2}})]}),e.jsx(i,{item:!0,xs:12,children:e.jsx(j,{type:"submit",variant:"contained",color:"primary",fullWidth:!0,children:"Update Profile"})})]})})]})}function G(){return e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsxs("title",{children:[" ",`Blog - ${F.appName}`]})}),e.jsx(w,{})]})}export{G as default};
