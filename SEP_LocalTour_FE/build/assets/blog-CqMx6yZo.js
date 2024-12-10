import{j as e,A as w,L as I,B as l,I as u,T as b,x as S,S as k,C as A,v as g,r as p,h as y,y as O,M as B,z as T,E as j,F,D as z,J as v,H as D}from"./index-JURld8WI.js";import{C as E}from"./config-global-BwHnWRtc.js";import{b as G}from"./format-number-DWNBwNMe.js";import{A as N,a as P}from"./Autocomplete-DoDIWFyo.js";import{T as $}from"./TextField-BAa1lkAG.js";import{G as f,P as H}from"./Pagination-CFxr9IAZ.js";import"./InputLabel-CrY5KikR.js";function M({sx:a,post:n,latestPost:o,latestPostLarge:t,...i}){const s=e.jsx(w,{alt:n.author.name,src:n.author.avatarUrl,sx:{left:24,zIndex:9,bottom:-24,position:"absolute",...(t||o)&&{top:24}}}),c=e.jsx(I,{color:"inherit",variant:"subtitle2",underline:"hover",sx:{height:44,overflow:"hidden",WebkitLineClamp:2,display:"-webkit-box",WebkitBoxOrient:"vertical",...t&&{typography:"h5",height:60},...(t||o)&&{color:"common.white"}},children:n.title}),m=e.jsx(l,{gap:1.5,display:"flex",flexWrap:"wrap",justifyContent:"flex-end",sx:{mt:3,color:"text.disabled"},children:[{number:n.totalComments,icon:"solar:chat-round-dots-bold"},{number:n.totalViews,icon:"solar:eye-bold"},{number:n.totalShares,icon:"solar:share-bold"}].map((d,C)=>e.jsxs(l,{display:"flex",sx:{...(t||o)&&{opacity:.64,color:"common.white"}},children:[e.jsx(u,{width:16,icon:d.icon,sx:{mr:.5}}),e.jsx(b,{variant:"caption",children:G(d.number)})]},C))}),h=e.jsx(l,{component:"img",alt:n.title,src:n.coverUrl,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}}),x=e.jsx(b,{variant:"caption",component:"div",sx:{mb:1,color:"text.disabled",...(t||o)&&{opacity:.48,color:"common.white"}},children:S(n.postedAt)}),r=e.jsx(k,{width:88,height:36,src:"/assets/icons/shape-avatar.svg",sx:{left:0,zIndex:9,bottom:-16,position:"absolute",color:"background.paper",...(t||o)&&{display:"none"}}});return e.jsxs(A,{sx:a,...i,children:[e.jsxs(l,{sx:d=>({position:"relative",pt:"calc(100% * 3 / 4)",...(t||o)&&{pt:"calc(100% * 4 / 3)","&:after":{top:0,content:"''",width:"100%",height:"100%",position:"absolute",bgcolor:g(d.palette.grey["900Channel"],.72)}},...t&&{pt:{xs:"calc(100% * 4 / 3)",sm:"calc(100% * 3 / 4.66)"}}}),children:[r,s,h]}),e.jsxs(l,{sx:d=>({p:d.spacing(6,3,3,3),...(t||o)&&{width:1,bottom:0,position:"absolute"}}),children:[x,c,m]})]})}function R({options:a,sortBy:n,onSort:o,sx:t,...i}){var x;const[s,c]=p.useState(null),m=p.useCallback(r=>{c(r.currentTarget)},[]),h=p.useCallback(()=>{c(null)},[]);return e.jsxs(e.Fragment,{children:[e.jsx(y,{disableRipple:!0,color:"inherit",onClick:m,endIcon:e.jsx(u,{icon:s?"eva:chevron-up-fill":"eva:chevron-down-fill",sx:{ml:-.5}}),sx:{bgcolor:r=>g(r.vars.palette.grey["500Channel"],.08),...t},...i,children:(x=a.find(r=>r.value===n))==null?void 0:x.label}),e.jsx(O,{open:!!s,anchorEl:s,onClose:h,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(B,{disablePadding:!0,sx:{p:.5,gap:.5,width:160,display:"flex",flexDirection:"column",[`& .${j.root}`]:{px:1,gap:2,borderRadius:.75,[`&.${j.selected}`]:{bgcolor:"action.selected"}}},children:a.map(r=>e.jsx(T,{selected:r.value===n,onClick:()=>{o(r.value),h()},children:r.label},r.value))})})]})}function V({posts:a,sx:n}){return e.jsx(N,{sx:{width:280},autoHighlight:!0,popupIcon:null,slotProps:{paper:{sx:{width:320,[`& .${P.option}`]:{typography:"body2"},...n}}},options:a,getOptionLabel:o=>o.title,isOptionEqualToValue:(o,t)=>o.id===t.id,renderInput:o=>e.jsx($,{...o,placeholder:"Search post...",InputProps:{...o.InputProps,startAdornment:e.jsx(F,{position:"start",children:e.jsx(u,{icon:"eva:search-fill",sx:{ml:1,width:20,height:20,color:"text.disabled"}})})}})})}function W(){const[a,n]=p.useState("latest"),o=p.useCallback(t=>{n(t)},[]);return e.jsxs(z,{children:[e.jsxs(l,{display:"flex",alignItems:"center",mb:5,children:[e.jsx(b,{variant:"h4",flexGrow:1,children:"Blog"}),e.jsx(y,{variant:"contained",color:"inherit",startIcon:e.jsx(u,{icon:"mingcute:add-line"}),children:"New post"})]}),e.jsxs(l,{display:"flex",alignItems:"center",justifyContent:"space-between",sx:{mb:5},children:[e.jsx(V,{posts:v}),e.jsx(R,{sortBy:a,onSort:o,options:[{value:"latest",label:"Latest"},{value:"popular",label:"Popular"},{value:"oldest",label:"Oldest"}]})]}),e.jsx(f,{container:!0,spacing:3,children:v.map((t,i)=>{const s=i===0,c=i===1||i===2;return e.jsx(f,{xs:12,sm:s?12:6,md:s?6:3,children:e.jsx(M,{post:t,latestPost:c,latestPostLarge:s})},t.id)})}),e.jsx(H,{count:10,color:"primary",sx:{mt:8,mx:"auto"}})]})}function Y(){return e.jsxs(e.Fragment,{children:[e.jsx(D,{children:e.jsxs("title",{children:[" ",`Blog - ${E.appName}`]})}),e.jsx(W,{})]})}export{Y as default};
