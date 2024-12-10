import{g as A,a as N,r,a1 as W,a2 as F,u as M,_ as O,a3 as D,b as m,j as n,q as z,a4 as T,c as U,s as E,h as _,a5 as G,a6 as S,p as J,a7 as w,B,T as j,L as H,F as q,R as L,I as k,t as V,H as Y}from"./index-JURld8WI.js";import{C as K}from"./config-global-BwHnWRtc.js";import{T as R}from"./TextField-BAa1lkAG.js";import"./InputLabel-CrY5KikR.js";function Q(t){return A("MuiLoadingButton",t)}const d=N("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),X=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],Z=t=>{const{loading:o,loadingPosition:l,classes:g}=t,f={root:["root",o&&"loading"],startIcon:[o&&`startIconLoading${T(l)}`],endIcon:[o&&`endIconLoading${T(l)}`],loadingIndicator:["loadingIndicator",o&&`loadingIndicator${T(l)}`]},c=U(f,Q,g);return m({},g,c)},oo=t=>t!=="ownerState"&&t!=="theme"&&t!=="sx"&&t!=="as"&&t!=="classes",to=E(_,{shouldForwardProp:t=>oo(t)||t==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(t,o)=>[o.root,o.startIconLoadingStart&&{[`& .${d.startIconLoadingStart}`]:o.startIconLoadingStart},o.endIconLoadingEnd&&{[`& .${d.endIconLoadingEnd}`]:o.endIconLoadingEnd}]})(({ownerState:t,theme:o})=>m({[`& .${d.startIconLoadingStart}, & .${d.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0}},t.loadingPosition==="center"&&{transition:o.transitions.create(["background-color","box-shadow","border-color"],{duration:o.transitions.duration.short}),[`&.${d.loading}`]:{color:"transparent"}},t.loadingPosition==="start"&&t.fullWidth&&{[`& .${d.startIconLoadingStart}, & .${d.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginRight:-8}},t.loadingPosition==="end"&&t.fullWidth&&{[`& .${d.startIconLoadingStart}, & .${d.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginLeft:-8}})),no=E("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(t,o)=>{const{ownerState:l}=t;return[o.loadingIndicator,o[`loadingIndicator${T(l.loadingPosition)}`]]}})(({theme:t,ownerState:o})=>m({position:"absolute",visibility:"visible",display:"flex"},o.loadingPosition==="start"&&(o.variant==="outlined"||o.variant==="contained")&&{left:o.size==="small"?10:14},o.loadingPosition==="start"&&o.variant==="text"&&{left:6},o.loadingPosition==="center"&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},o.loadingPosition==="end"&&(o.variant==="outlined"||o.variant==="contained")&&{right:o.size==="small"?10:14},o.loadingPosition==="end"&&o.variant==="text"&&{right:6},o.loadingPosition==="start"&&o.fullWidth&&{position:"relative",left:-10},o.loadingPosition==="end"&&o.fullWidth&&{position:"relative",right:-10})),eo=r.forwardRef(function(o,l){const g=r.useContext(W),f=F(g,o),c=M({props:f,name:"MuiLoadingButton"}),{children:I,disabled:y=!1,id:P,loading:h=!1,loadingIndicator:x,loadingPosition:v="center",variant:b="text"}=c,C=O(c,X),e=D(P),s=x??n.jsx(z,{"aria-labelledby":e,color:"inherit",size:16}),a=m({},c,{disabled:y,loading:h,loadingIndicator:s,loadingPosition:v,variant:b}),i=Z(a),p=h?n.jsx(no,{className:i.loadingIndicator,ownerState:a,children:s}):null;return n.jsxs(to,m({disabled:y||h,id:e,ref:l},C,{variant:b,classes:i,ownerState:a,children:[a.loadingPosition==="end"?I:p,a.loadingPosition==="end"?p:I]}))});function so(){const t=G(),[o,l]=r.useState(""),[g,f]=r.useState(""),[c,I]=r.useState(!1),[y,P]=r.useState(!1),[h,x]=r.useState(""),v=r.useCallback(async()=>{const e=S.get("refreshToken");if(!e)return null;try{const s=await J.post("https://api.localtour.space/api/Authen/refreshToken",{refreshToken:e});console.log("response",s.data);const{accessToken:a,refreshToken:i}=s.data;return localStorage.setItem("accessToken",a),S.set("refreshToken",i,{expires:7,path:"/"}),a}catch(s){return console.error("Refresh token failed:",s),null}},[]);r.useEffect(()=>{const e=localStorage.getItem("accessToken"),s=localStorage.getItem("user"),a=localStorage.getItem("currentPath")||"/";if(e&&s)try{const i=w(e),p=Math.floor(Date.now()/1e3);i.exp&&i.exp>p?t.replace(a):v().then(u=>{u?t.replace(a):(localStorage.clear(),t.push("/sign-in"))})}catch(i){console.error("Invalid token:",i),localStorage.clear(),t.push("/sign-in")}},[t,v]);const b=r.useCallback(async()=>{P(!0),x("");try{const e=await fetch("https://api.localtour.space/api/Authen/login",{method:"POST",headers:{Accept:"*/*","Content-Type":"application/json"},body:JSON.stringify({phoneNumber:o,password:g})});if(!e.ok)throw new Error("Failed to sign in");const s=await e.json();localStorage.setItem("accessToken",s.accessToken),localStorage.setItem("userId",s.userId),S.set("refreshToken",s.refreshToken,{expires:7,path:"/"});const a=w(s.accessToken),i=Array.isArray(a["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])?a["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]:[a["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]],p=["Administrator","Moderator","Service Owner"],u=i.filter($=>p.includes($));if(u.length===0)throw new Error("You do not have permission to access this page");localStorage.setItem("user",JSON.stringify(s)),localStorage.setItem("role",JSON.stringify(u)),localStorage.setItem("currentPath","/"),u.includes("Administrator")?t.replace("/"):u.includes("Moderator")?t.replace("/place"):u.includes("Service Owner")?t.replace("/owner/place"):t.replace("/404")}catch(e){x(e.message||"Invalid phone number or password")}finally{P(!1)}},[o,g,t]),C=n.jsxs(B,{display:"flex",flexDirection:"column",alignItems:"flex-end",children:[n.jsx(R,{fullWidth:!0,name:"phoneNumber",label:"Phone Number",value:o,onChange:e=>l(e.target.value),InputLabelProps:{shrink:!0},sx:{mb:3}}),n.jsx(R,{fullWidth:!0,name:"password",label:"Password",value:g,onChange:e=>f(e.target.value),InputLabelProps:{shrink:!0},type:c?"text":"password",InputProps:{endAdornment:n.jsx(q,{position:"end",children:n.jsx(L,{onClick:()=>I(!c),edge:"end",children:n.jsx(k,{icon:c?"solar:eye-bold":"solar:eye-closed-bold"})})})},sx:{mb:3}}),h&&n.jsx(j,{color:"error",sx:{mb:2},children:h}),n.jsx(eo,{fullWidth:!0,size:"large",type:"button",color:"inherit",variant:"contained",onClick:b,loading:y,children:"Sign in"})]});return n.jsxs(n.Fragment,{children:[n.jsxs(B,{gap:1.5,display:"flex",flexDirection:"column",alignItems:"center",sx:{mb:5},children:[n.jsx(j,{variant:"h5",children:"Sign in"}),n.jsxs(j,{variant:"body2",color:"text.secondary",children:["Don’t have an account?",n.jsx(H,{variant:"subtitle2",sx:{ml:.5},children:"Get started"})]})]}),C,n.jsx(V,{sx:{my:3,"&::before, &::after":{borderTopStyle:"dashed"}},children:n.jsx(j,{variant:"overline",sx:{color:"text.secondary",fontWeight:"fontWeightMedium"},children:"OR"})}),n.jsxs(B,{gap:1,display:"flex",justifyContent:"center",children:[n.jsx(L,{color:"inherit",children:n.jsx(k,{icon:"logos:google-icon"})}),n.jsx(L,{color:"inherit",children:n.jsx(k,{icon:"eva:github-fill"})}),n.jsx(L,{color:"inherit",children:n.jsx(k,{icon:"ri:twitter-x-fill"})})]})]})}function co(){return n.jsxs(n.Fragment,{children:[n.jsx(Y,{children:n.jsxs("title",{children:[" ",`Sign in - ${K.appName}`]})}),n.jsx(so,{})]})}export{co as default};
