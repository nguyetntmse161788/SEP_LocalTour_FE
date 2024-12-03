import{j as e,A as C,F as I,B as l,I as m,f as b,G as S,w as k,v as g,r as p,k as y,P as A,M as O,m as B,n as j,J as F,y as T,z as v,H as z}from"./index-CqOrFkS9.js";import{C as G}from"./config-global-BwHnWRtc.js";import{b as P,G as f}from"./format-number-OlPjuFms.js";import{C as D}from"./Card-BGRQsCGj.js";import{A as E,a as N}from"./Autocomplete-UY2rsLaJ.js";import{T as $}from"./TextField-W0bFp4Lb.js";import{P as H}from"./Pagination-B9Vd7Wc5.js";import"./Select-BH5qWtTR.js";import"./InputLabel-_37qWNMV.js";import"./LastPage-DAK7OL3M.js";function M({sx:a,post:r,latestPost:o,latestPostLarge:t,...i}){const s=e.jsx(C,{alt:r.author.name,src:r.author.avatarUrl,sx:{left:24,zIndex:9,bottom:-24,position:"absolute",...(t||o)&&{top:24}}}),c=e.jsx(I,{color:"inherit",variant:"subtitle2",underline:"hover",sx:{height:44,overflow:"hidden",WebkitLineClamp:2,display:"-webkit-box",WebkitBoxOrient:"vertical",...t&&{typography:"h5",height:60},...(t||o)&&{color:"common.white"}},children:r.title}),u=e.jsx(l,{gap:1.5,display:"flex",flexWrap:"wrap",justifyContent:"flex-end",sx:{mt:3,color:"text.disabled"},children:[{number:r.totalComments,icon:"solar:chat-round-dots-bold"},{number:r.totalViews,icon:"solar:eye-bold"},{number:r.totalShares,icon:"solar:share-bold"}].map((d,w)=>e.jsxs(l,{display:"flex",sx:{...(t||o)&&{opacity:.64,color:"common.white"}},children:[e.jsx(m,{width:16,icon:d.icon,sx:{mr:.5}}),e.jsx(b,{variant:"caption",children:P(d.number)})]},w))}),h=e.jsx(l,{component:"img",alt:r.title,src:r.coverUrl,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}}),x=e.jsx(b,{variant:"caption",component:"div",sx:{mb:1,color:"text.disabled",...(t||o)&&{opacity:.48,color:"common.white"}},children:S(r.postedAt)}),n=e.jsx(k,{width:88,height:36,src:"/assets/icons/shape-avatar.svg",sx:{left:0,zIndex:9,bottom:-16,position:"absolute",color:"background.paper",...(t||o)&&{display:"none"}}});return e.jsxs(D,{sx:a,...i,children:[e.jsxs(l,{sx:d=>({position:"relative",pt:"calc(100% * 3 / 4)",...(t||o)&&{pt:"calc(100% * 4 / 3)","&:after":{top:0,content:"''",width:"100%",height:"100%",position:"absolute",bgcolor:g(d.palette.grey["900Channel"],.72)}},...t&&{pt:{xs:"calc(100% * 4 / 3)",sm:"calc(100% * 3 / 4.66)"}}}),children:[n,s,h]}),e.jsxs(l,{sx:d=>({p:d.spacing(6,3,3,3),...(t||o)&&{width:1,bottom:0,position:"absolute"}}),children:[x,c,u]})]})}function R({options:a,sortBy:r,onSort:o,sx:t,...i}){var x;const[s,c]=p.useState(null),u=p.useCallback(n=>{c(n.currentTarget)},[]),h=p.useCallback(()=>{c(null)},[]);return e.jsxs(e.Fragment,{children:[e.jsx(y,{disableRipple:!0,color:"inherit",onClick:u,endIcon:e.jsx(m,{icon:s?"eva:chevron-up-fill":"eva:chevron-down-fill",sx:{ml:-.5}}),sx:{bgcolor:n=>g(n.vars.palette.grey["500Channel"],.08),...t},...i,children:(x=a.find(n=>n.value===r))==null?void 0:x.label}),e.jsx(A,{open:!!s,anchorEl:s,onClose:h,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsx(O,{disablePadding:!0,sx:{p:.5,gap:.5,width:160,display:"flex",flexDirection:"column",[`& .${j.root}`]:{px:1,gap:2,borderRadius:.75,[`&.${j.selected}`]:{bgcolor:"action.selected"}}},children:a.map(n=>e.jsx(B,{selected:n.value===r,onClick:()=>{o(n.value),h()},children:n.label},n.value))})})]})}function V({posts:a,sx:r}){return e.jsx(E,{sx:{width:280},autoHighlight:!0,popupIcon:null,slotProps:{paper:{sx:{width:320,[`& .${N.option}`]:{typography:"body2"},...r}}},options:a,getOptionLabel:o=>o.title,isOptionEqualToValue:(o,t)=>o.id===t.id,renderInput:o=>e.jsx($,{...o,placeholder:"Search post...",InputProps:{...o.InputProps,startAdornment:e.jsx(F,{position:"start",children:e.jsx(m,{icon:"eva:search-fill",sx:{ml:1,width:20,height:20,color:"text.disabled"}})})}})})}function W(){const[a,r]=p.useState("latest"),o=p.useCallback(t=>{r(t)},[]);return e.jsxs(T,{children:[e.jsxs(l,{display:"flex",alignItems:"center",mb:5,children:[e.jsx(b,{variant:"h4",flexGrow:1,children:"Blog"}),e.jsx(y,{variant:"contained",color:"inherit",startIcon:e.jsx(m,{icon:"mingcute:add-line"}),children:"New post"})]}),e.jsxs(l,{display:"flex",alignItems:"center",justifyContent:"space-between",sx:{mb:5},children:[e.jsx(V,{posts:v}),e.jsx(R,{sortBy:a,onSort:o,options:[{value:"latest",label:"Latest"},{value:"popular",label:"Popular"},{value:"oldest",label:"Oldest"}]})]}),e.jsx(f,{container:!0,spacing:3,children:v.map((t,i)=>{const s=i===0,c=i===1||i===2;return e.jsx(f,{xs:12,sm:s?12:6,md:s?6:3,children:e.jsx(M,{post:t,latestPost:c,latestPostLarge:s})},t.id)})}),e.jsx(H,{count:10,color:"primary",sx:{mt:8,mx:"auto"}})]})}function ee(){return e.jsxs(e.Fragment,{children:[e.jsx(z,{children:e.jsxs("title",{children:[" ",`Blog - ${G.appName}`]})}),e.jsx(W,{})]})}export{ee as default};
