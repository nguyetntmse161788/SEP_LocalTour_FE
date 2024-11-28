import{g as R,a as N,r as d,U as W,V as D,b as U,_ as F,W as A,c as I,j as n,p as C,e as M,s as B,k as O,X as z,B as S,f as j,F as J,J as _,l as L,I as k,D as G,H}from"./index-B2v2_DKC.js";import{C as V}from"./config-global-BwHnWRtc.js";import{T as $}from"./TextField-D6uFeavD.js";import{C as X}from"./CircularProgress-AqbkGrV7.js";import"./Select-TXDlS2nK.js";function Y(t){return R("MuiLoadingButton",t)}const l=N("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),q=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],K=t=>{const{loading:o,loadingPosition:e,classes:i}=t,c={root:["root",o&&"loading"],startIcon:[o&&`startIconLoading${C(e)}`],endIcon:[o&&`endIconLoading${C(e)}`],loadingIndicator:["loadingIndicator",o&&`loadingIndicator${C(e)}`]},a=M(c,Y,i);return I({},i,a)},Q=t=>t!=="ownerState"&&t!=="theme"&&t!=="sx"&&t!=="as"&&t!=="classes",Z=B(O,{shouldForwardProp:t=>Q(t)||t==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(t,o)=>[o.root,o.startIconLoadingStart&&{[`& .${l.startIconLoadingStart}`]:o.startIconLoadingStart},o.endIconLoadingEnd&&{[`& .${l.endIconLoadingEnd}`]:o.endIconLoadingEnd}]})(({ownerState:t,theme:o})=>I({[`& .${l.startIconLoadingStart}, & .${l.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0}},t.loadingPosition==="center"&&{transition:o.transitions.create(["background-color","box-shadow","border-color"],{duration:o.transitions.duration.short}),[`&.${l.loading}`]:{color:"transparent"}},t.loadingPosition==="start"&&t.fullWidth&&{[`& .${l.startIconLoadingStart}, & .${l.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginRight:-8}},t.loadingPosition==="end"&&t.fullWidth&&{[`& .${l.startIconLoadingStart}, & .${l.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginLeft:-8}})),oo=B("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(t,o)=>{const{ownerState:e}=t;return[o.loadingIndicator,o[`loadingIndicator${C(e.loadingPosition)}`]]}})(({theme:t,ownerState:o})=>I({position:"absolute",visibility:"visible",display:"flex"},o.loadingPosition==="start"&&(o.variant==="outlined"||o.variant==="contained")&&{left:o.size==="small"?10:14},o.loadingPosition==="start"&&o.variant==="text"&&{left:6},o.loadingPosition==="center"&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},o.loadingPosition==="end"&&(o.variant==="outlined"||o.variant==="contained")&&{right:o.size==="small"?10:14},o.loadingPosition==="end"&&o.variant==="text"&&{right:6},o.loadingPosition==="start"&&o.fullWidth&&{position:"relative",left:-10},o.loadingPosition==="end"&&o.fullWidth&&{position:"relative",right:-10})),to=d.forwardRef(function(o,e){const i=d.useContext(W),c=D(i,o),a=U({props:c,name:"MuiLoadingButton"}),{children:b,disabled:v=!1,id:y,loading:h=!1,loadingIndicator:f,loadingPosition:w="center",variant:P="text"}=a,s=F(a,q),g=A(y),u=f??n.jsx(X,{"aria-labelledby":g,color:"inherit",size:16}),r=I({},a,{disabled:v,loading:h,loadingIndicator:u,loadingPosition:w,variant:P}),p=K(r),m=h?n.jsx(oo,{className:p.loadingIndicator,ownerState:r,children:u}):null;return n.jsxs(Z,I({disabled:v||h,id:g,ref:e},s,{variant:P,classes:p,ownerState:r,children:[r.loadingPosition==="end"?b:m,r.loadingPosition==="end"?m:b]}))});class x extends Error{}x.prototype.name="InvalidTokenError";function no(t){return decodeURIComponent(atob(t).replace(/(.)/g,(o,e)=>{let i=e.charCodeAt(0).toString(16).toUpperCase();return i.length<2&&(i="0"+i),"%"+i}))}function eo(t){let o=t.replace(/-/g,"+").replace(/_/g,"/");switch(o.length%4){case 0:break;case 2:o+="==";break;case 3:o+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return no(o)}catch{return atob(o)}}function E(t,o){if(typeof t!="string")throw new x("Invalid token specified: must be a string");o||(o={});const e=o.header===!0?0:1,i=t.split(".")[e];if(typeof i!="string")throw new x(`Invalid token specified: missing part #${e+1}`);let c;try{c=eo(i)}catch(a){throw new x(`Invalid token specified: invalid base64 for part #${e+1} (${a.message})`)}try{return JSON.parse(c)}catch(a){throw new x(`Invalid token specified: invalid json for part #${e+1} (${a.message})`)}}function io(){const t=z(),[o,e]=d.useState(""),[i,c]=d.useState(""),[a,b]=d.useState(!1),[v,y]=d.useState(!1),[h,f]=d.useState("");d.useEffect(()=>{const s=localStorage.getItem("accessToken"),g=localStorage.getItem("user"),u=localStorage.getItem("currentPath")||"/";if(s&&g)try{const r=E(s),p=Math.floor(Date.now()/1e3);r.exp&&r.exp>p?t.replace(u):(localStorage.clear(),t.push("/sign-in"))}catch(r){console.error("Invalid token:",r),localStorage.clear(),t.push("/sign-in")}},[t]);const w=d.useCallback(async()=>{y(!0),f("");try{const s=await fetch("https://api.localtour.space/api/Authen/login",{method:"POST",headers:{Accept:"*/*","Content-Type":"application/json"},body:JSON.stringify({phoneNumber:o,password:i})});if(!s.ok)throw new Error("Failed to sign in");const g=await s.json();localStorage.setItem("accessToken",g.accessToken);const u=E(g.accessToken),r=Array.isArray(u["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])?u["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]:[u["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]],p=["Administrator","Moderator","Service Owner"],m=r.filter(T=>p.includes(T));if(m.length===0)throw new Error("You do not have permission to access this page");localStorage.setItem("user",JSON.stringify(g)),localStorage.setItem("role",JSON.stringify(m)),localStorage.setItem("currentPath","/"),t.replace("/")}catch(s){f(s.message||"Invalid phone number or password")}finally{y(!1)}},[o,i,t]),P=n.jsxs(S,{display:"flex",flexDirection:"column",alignItems:"flex-end",children:[n.jsx($,{fullWidth:!0,name:"phoneNumber",label:"Phone Number",value:o,onChange:s=>e(s.target.value),InputLabelProps:{shrink:!0},sx:{mb:3}}),n.jsx($,{fullWidth:!0,name:"password",label:"Password",value:i,onChange:s=>c(s.target.value),InputLabelProps:{shrink:!0},type:a?"text":"password",InputProps:{endAdornment:n.jsx(_,{position:"end",children:n.jsx(L,{onClick:()=>b(!a),edge:"end",children:n.jsx(k,{icon:a?"solar:eye-bold":"solar:eye-closed-bold"})})})},sx:{mb:3}}),h&&n.jsx(j,{color:"error",sx:{mb:2},children:h}),n.jsx(to,{fullWidth:!0,size:"large",type:"button",color:"inherit",variant:"contained",onClick:w,loading:v,children:"Sign in"})]});return n.jsxs(n.Fragment,{children:[n.jsxs(S,{gap:1.5,display:"flex",flexDirection:"column",alignItems:"center",sx:{mb:5},children:[n.jsx(j,{variant:"h5",children:"Sign in"}),n.jsxs(j,{variant:"body2",color:"text.secondary",children:["Don’t have an account?",n.jsx(J,{variant:"subtitle2",sx:{ml:.5},children:"Get started"})]})]}),P,n.jsx(G,{sx:{my:3,"&::before, &::after":{borderTopStyle:"dashed"}},children:n.jsx(j,{variant:"overline",sx:{color:"text.secondary",fontWeight:"fontWeightMedium"},children:"OR"})}),n.jsxs(S,{gap:1,display:"flex",justifyContent:"center",children:[n.jsx(L,{color:"inherit",children:n.jsx(k,{icon:"logos:google-icon"})}),n.jsx(L,{color:"inherit",children:n.jsx(k,{icon:"eva:github-fill"})}),n.jsx(L,{color:"inherit",children:n.jsx(k,{icon:"ri:twitter-x-fill"})})]})]})}function go(){return n.jsxs(n.Fragment,{children:[n.jsx(H,{children:n.jsxs("title",{children:[" ",`Sign in - ${V.appName}`]})}),n.jsx(io,{})]})}export{go as default};
