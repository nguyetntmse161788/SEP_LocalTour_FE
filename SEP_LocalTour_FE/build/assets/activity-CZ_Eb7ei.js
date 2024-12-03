import{j as e,B as w,f as v,r as l,K as O,A as $,I as b,Q as E,l as T,P as L,M as F,m as k,n as y,N as D,J as H,O as R,y as M,S as z,H as B}from"./index-CqOrFkS9.js";import{C as W}from"./config-global-BwHnWRtc.js";import{a as V}from"./index-Br0q4W-C.js";import{T as S,a as p,f as G,g as Q,b as J,c as K,d as U,e as q}from"./TableSortLabel-Bt7vdYS2.js";import{C as I}from"./Checkbox-C3wUofvP.js";import{O as X}from"./Select-BH5qWtTR.js";import{C as Y}from"./Card-BGRQsCGj.js";import"./LastPage-DAK7OL3M.js";function Z({searchQuery:t,...n}){return e.jsx(S,{...n,children:e.jsx(p,{align:"center",colSpan:7,children:e.jsxs(w,{sx:{py:15,textAlign:"center"},children:[e.jsx(v,{variant:"h6",sx:{mb:1},children:"Not found"}),e.jsxs(v,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}function _({emptyRows:t,height:n,sx:s,...o}){return t?e.jsx(S,{sx:{...n&&{height:n*t},...s},...o,children:e.jsx(p,{colSpan:9})}):null}const ee={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function te(t,n,s){return t?Math.max(0,(1+t)*n-s):0}function A(t,n,s){return n[s]<t[s]?-1:n[s]>t[s]?1:0}function se(t,n){return t==="desc"?(s,o)=>A(s,o,n):(s,o)=>-A(s,o,n)}function ne({inputData:t,comparator:n,filterName:s}){const o=t.map((a,c)=>[a,c]);return o.sort((a,c)=>{const r=n(a[0],c[0]);return r!==0?r:a[1]-c[1]}),t=o.map(a=>a[0]),s&&(t=t.filter(a=>a.name.toLowerCase().indexOf(s.toLowerCase())!==-1)),t}function ae({row:t,selected:n,onSelectRow:s}){var x,C,d,j;const[o,a]=l.useState(null),c=O(),r=l.useCallback(g=>{g.stopPropagation(),a(g.currentTarget)},[]),i=l.useCallback(()=>{a(null)},[]),m=g=>{g.stopPropagation(),c(`/owner/activity/place/${t.id}`)},P=g=>{g.target instanceof HTMLButtonElement||g.target instanceof HTMLInputElement||c(`/owner/activity/place/${t.id}`)};return e.jsxs(e.Fragment,{children:[e.jsxs(S,{hover:!0,tabIndex:-1,role:"checkbox",selected:n,onClick:P,children:[e.jsx(p,{padding:"checkbox",children:e.jsx(I,{disableRipple:!0,checked:n,onChange:s})}),e.jsx(p,{component:"th",scope:"row",children:e.jsxs(w,{gap:2,display:"flex",alignItems:"center",children:[e.jsx($,{alt:((x=t.placeTranslation[0])==null?void 0:x.name)||"N/A",src:t.photoDisplay}),((C=t.placeTranslation[0])==null?void 0:C.name)||"N/A"]})}),e.jsx(p,{children:((d=t.placeTranslation[0])==null?void 0:d.address)||"N/A"}),e.jsx(p,{children:((j=t.placeTranslation[0])==null?void 0:j.description)||"N/A"}),e.jsx(p,{align:"center",children:t.status==="Pending"?"-":e.jsx(b,{width:22,icon:"solar:check-circle-bold",sx:{color:"success.main"}})}),e.jsx(p,{children:e.jsx(E,{color:t.status==="Pending"?"warning":t.status==="Approved"?"success":t.status==="Rejected"?"error":"default",children:t.status})}),e.jsx(p,{align:"right",children:e.jsxs(T,{onClick:m,children:[" ",e.jsx(b,{icon:"eva:arrow-forward-outline",width:22})]})}),e.jsx(p,{align:"right",children:e.jsxs(T,{onClick:r,children:[" ",e.jsx(b,{icon:"eva:more-vertical-fill",width:22})]})})]}),e.jsx(L,{open:!!o,anchorEl:o,onClose:i,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsxs(F,{disablePadding:!0,sx:{p:.5,gap:.5,width:140,display:"flex",flexDirection:"column",[`& .${y.root}`]:{px:1,gap:2,borderRadius:.75,[`&.${y.selected}`]:{bgcolor:"action.selected"}}},children:[e.jsxs(k,{onClick:i,children:[e.jsx(b,{icon:"solar:pen-bold"}),"Edit"]}),e.jsxs(k,{onClick:i,sx:{color:"error.main"},children:[e.jsx(b,{icon:"solar:trash-bin-trash-bold"}),"Delete"]})]})})]})}function oe({order:t,onSort:n,orderBy:s,rowCount:o,headLabel:a,numSelected:c,onSelectAllRows:r}){return e.jsx(G,{children:e.jsxs(S,{children:[e.jsx(p,{padding:"checkbox",children:e.jsx(I,{indeterminate:c>0&&c<o,checked:o>0&&c===o,onChange:i=>r(i.target.checked)})}),a.map(i=>e.jsx(p,{align:i.align||"left",sortDirection:s===i.id?t:!1,sx:{width:i.width,minWidth:i.minWidth},children:e.jsxs(Q,{hideSortIcon:!0,active:s===i.id,direction:s===i.id?t:"asc",onClick:()=>n(i.id),children:[i.label,s===i.id?e.jsx(w,{sx:{...ee},children:t==="desc"?"sorted descending":"sorted ascending"}):null]})},i.id))]})})}function re({numSelected:t,filterName:n,onFilterName:s}){return e.jsxs(D,{sx:{height:96,display:"flex",justifyContent:"space-between",p:o=>o.spacing(0,1,0,3),...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?e.jsxs(v,{component:"div",variant:"subtitle1",children:[t," selected"]}):e.jsx(X,{fullWidth:!0,value:n,onChange:s,placeholder:"Search place...",startAdornment:e.jsx(H,{position:"start",children:e.jsx(b,{width:20,icon:"eva:search-fill",sx:{color:"text.disabled"}})}),sx:{maxWidth:320}}),t>0?e.jsx(R,{title:"Delete",children:e.jsx(T,{children:e.jsx(b,{icon:"solar:trash-bin-trash-bold"})})}):e.jsx(R,{title:"Filter list",children:e.jsx(T,{children:e.jsx(b,{icon:"ic:round-filter-list"})})})]})}const ie=async(t=1,n=5,s="vi",o="",a="Approved")=>{const c=localStorage.getItem("accessToken");if(console.log("Access Token:",c),!c)return console.error("No access token found"),{items:[],totalCount:0};try{const r=await V.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${s}&Page=${t}&Size=${n}&SearchTerm=${encodeURIComponent(o)}&Status=${a}`,{headers:{Authorization:`Bearer ${c}`}});return console.log("API Response:",r.data),{items:r.data.items,totalCount:r.data.totalCount}}catch(r){return console.error("Error fetching places",r),{items:[],totalCount:0}}};function le(){const[t,n]=l.useState([]),[s,o]=l.useState(0),[a,c]=l.useState(""),[r,i]=l.useState("vi"),[m,P]=l.useState(1),[x,C]=l.useState(5);l.useEffect(()=>{(async()=>{const{items:h,totalCount:f}=await ie(m,x,r,a);n(h),o(f)})()},[m,x,r,a]);const d=ce(),j=ne({inputData:t,comparator:se(d.order,d.orderBy),filterName:a}),g=!j.length&&!!a;return e.jsxs(M,{children:[e.jsx(w,{display:"flex",alignItems:"center",mb:5,children:e.jsx(v,{variant:"h4",flexGrow:1,children:"Places"})}),e.jsxs(Y,{children:[e.jsx(re,{numSelected:d.selected.length,filterName:a,onFilterName:u=>{c(u.target.value),P(1)}}),e.jsx(z,{children:e.jsx(J,{sx:{overflow:"unset"},children:e.jsxs(K,{sx:{minWidth:800},children:[e.jsx(oe,{order:d.order,orderBy:d.orderBy,rowCount:t.length,numSelected:d.selected.length,onSort:d.onSort,onSelectAllRows:u=>d.onSelectAllRows(u,t.map(h=>h.id)),headLabel:[{id:"name",label:"Name"},{id:"address",label:"Address"},{id:"description",label:"Description"},{id:"isVerify",label:"isVerify"},{id:"status",label:"Status"},{id:"View details",label:"View details"},{id:""}]}),e.jsxs(U,{children:[j.slice(d.page*x,d.page*x+x).map(u=>e.jsx(ae,{row:u,selected:d.selected.includes(u.id),onSelectRow:()=>d.onSelectRow(u.id)},u.id)),e.jsx(_,{height:68,emptyRows:te(d.page,d.rowsPerPage,t.length)}),g&&e.jsx(Z,{searchQuery:a})]})]})})}),e.jsx(q,{component:"div",page:m-1,count:s,rowsPerPage:x,onPageChange:(u,h)=>P(h+1),rowsPerPageOptions:[5,10,25],onRowsPerPageChange:u=>{C(parseInt(u.target.value,10)),P(1)}})]})]})}function ce(){const[t,n]=l.useState(0),[s,o]=l.useState("name"),[a,c]=l.useState(5),[r,i]=l.useState([]),[m,P]=l.useState("asc"),x=l.useCallback(h=>{P(s===h&&m==="asc"?"desc":"asc"),o(h)},[m,s]),C=l.useCallback((h,f)=>{if(h){i(f);return}i([])},[]),d=l.useCallback(h=>{const f=r.includes(h)?r.filter(N=>N!==h):[...r,h];i(f)},[r]),j=l.useCallback(()=>{n(0)},[]),g=l.useCallback((h,f)=>{n(f)},[]),u=l.useCallback(h=>{c(parseInt(h.target.value,10)),j()},[j]);return{page:t,order:m,onSort:x,orderBy:s,selected:r,rowsPerPage:a,onSelectRow:d,onResetPage:j,onChangePage:g,onSelectAllRows:C,onChangeRowsPerPage:u}}function fe(){return e.jsxs(e.Fragment,{children:[e.jsx(B,{children:e.jsxs("title",{children:[" ",`Event - ${W.appName}`]})}),e.jsx(le,{})]})}export{fe as default};
