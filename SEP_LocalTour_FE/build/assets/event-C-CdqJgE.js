import{j as e,m as T,n as p,B as w,T as C,r as l,K as $,Z as N,A as D,I as f,$ as E,R as S,y as F,M as O,z as k,E as y,l as L,a0 as H,N as z,O as M,F as W,Q as R,D as B,C as V,W as G,i as Q,k as K,o as U,Y,H as Z}from"./index-JURld8WI.js";import{C as q}from"./config-global-BwHnWRtc.js";import{a as J}from"./axiosInstance-CjnSQzAP.js";function X({searchQuery:t,...n}){return e.jsx(T,{...n,children:e.jsx(p,{align:"center",colSpan:7,children:e.jsxs(w,{sx:{py:15,textAlign:"center"},children:[e.jsx(C,{variant:"h6",sx:{mb:1},children:"Not found"}),e.jsxs(C,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}function _({emptyRows:t,height:n,sx:s,...a}){return t?e.jsx(T,{sx:{...n&&{height:n*t},...s},...a,children:e.jsx(p,{colSpan:9})}):null}const ee={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function te(t,n,s){return t?Math.max(0,(1+t)*n-s):0}function A(t,n,s){return n[s]<t[s]?-1:n[s]>t[s]?1:0}function se(t,n){return t==="desc"?(s,a)=>A(s,a,n):(s,a)=>-A(s,a,n)}function ne({inputData:t,comparator:n,filterName:s}){const a=t.map((o,c)=>[o,c]);return a.sort((o,c)=>{const r=n(o[0],c[0]);return r!==0?r:o[1]-c[1]}),t=a.map(o=>o[0]),t}function ae({row:t,selected:n,onSelectRow:s}){var x,v,d,m;const[a,o]=l.useState(null),c=$(),r=l.useCallback(g=>{g.stopPropagation(),o(g.currentTarget)},[]),i=l.useCallback(()=>{o(null)},[]),j=g=>{g.stopPropagation(),c(`/owner/event/place/${t.id}`)},P=g=>{g.target instanceof HTMLButtonElement||g.target instanceof HTMLInputElement||c(`/owner/event/place/${t.id}`)};return e.jsxs(e.Fragment,{children:[e.jsxs(T,{hover:!0,tabIndex:-1,role:"checkbox",selected:n,onClick:P,children:[e.jsx(p,{padding:"checkbox",children:e.jsx(N,{disableRipple:!0,checked:n,onChange:s})}),e.jsx(p,{component:"th",scope:"row",children:e.jsxs(w,{gap:2,display:"flex",alignItems:"center",children:[e.jsx(D,{alt:((x=t.placeTranslation[0])==null?void 0:x.name)||"N/A",src:t.photoDisplay}),((v=t.placeTranslation[0])==null?void 0:v.name)||"N/A"]})}),e.jsx(p,{children:((d=t.placeTranslation[0])==null?void 0:d.address)||"N/A"}),e.jsx(p,{children:((m=t.placeTranslation[0])==null?void 0:m.description)||"N/A"}),e.jsx(p,{align:"center",children:t.status==="Pending"?"-":e.jsx(f,{width:22,icon:"solar:check-circle-bold",sx:{color:"success.main"}})}),e.jsx(p,{children:e.jsx(E,{color:t.status==="Pending"?"warning":t.status==="Approved"?"success":t.status==="Rejected"?"error":"default",children:t.status})}),e.jsx(p,{align:"right",children:e.jsxs(S,{onClick:j,children:[" ",e.jsx(f,{icon:"eva:arrow-forward-outline",width:22})]})}),e.jsx(p,{align:"right",children:e.jsxs(S,{onClick:r,children:[" ",e.jsx(f,{icon:"eva:more-vertical-fill",width:22})]})})]}),e.jsx(F,{open:!!a,anchorEl:a,onClose:i,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsxs(O,{disablePadding:!0,sx:{p:.5,gap:.5,width:140,display:"flex",flexDirection:"column",[`& .${y.root}`]:{px:1,gap:2,borderRadius:.75,[`&.${y.selected}`]:{bgcolor:"action.selected"}}},children:[e.jsxs(k,{onClick:i,children:[e.jsx(f,{icon:"solar:pen-bold"}),"Edit"]}),e.jsxs(k,{onClick:i,sx:{color:"error.main"},children:[e.jsx(f,{icon:"solar:trash-bin-trash-bold"}),"Delete"]})]})})]})}function oe({order:t,onSort:n,orderBy:s,rowCount:a,headLabel:o,numSelected:c,onSelectAllRows:r}){return e.jsx(L,{children:e.jsxs(T,{children:[e.jsx(p,{padding:"checkbox",children:e.jsx(N,{indeterminate:c>0&&c<a,checked:a>0&&c===a,onChange:i=>r(i.target.checked)})}),o.map(i=>e.jsx(p,{align:i.align||"left",sortDirection:s===i.id?t:!1,sx:{width:i.width,minWidth:i.minWidth},children:e.jsxs(H,{hideSortIcon:!0,active:s===i.id,direction:s===i.id?t:"asc",onClick:()=>n(i.id),children:[i.label,s===i.id?e.jsx(w,{sx:{...ee},children:t==="desc"?"sorted descending":"sorted ascending"}):null]})},i.id))]})})}function re({numSelected:t,filterName:n,onFilterName:s}){return e.jsxs(z,{sx:{height:96,display:"flex",justifyContent:"space-between",p:a=>a.spacing(0,1,0,3),...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?e.jsxs(C,{component:"div",variant:"subtitle1",children:[t," selected"]}):e.jsx(M,{fullWidth:!0,value:n,onChange:s,placeholder:"Search place...",startAdornment:e.jsx(W,{position:"start",children:e.jsx(f,{width:20,icon:"eva:search-fill",sx:{color:"text.disabled"}})}),sx:{maxWidth:320}}),t>0?e.jsx(R,{title:"Delete",children:e.jsx(S,{children:e.jsx(f,{icon:"solar:trash-bin-trash-bold"})})}):e.jsx(R,{title:"Filter list",children:e.jsx(S,{children:e.jsx(f,{icon:"ic:round-filter-list"})})})]})}const ie=async(t=1,n=5,s="vi",a="",o="Approved")=>{const c=localStorage.getItem("accessToken");if(console.log("Access Token:",c),!c)return console.error("No access token found"),{items:[],totalCount:0};try{const r=await J.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${s}&Page=${t}&Size=${n}&SearchTerm=${encodeURIComponent(a)}&Status=${o}`,{headers:{Authorization:`Bearer ${c}`}});return console.log("API Response:",r.data),{items:r.data.items,totalCount:r.data.totalCount}}catch(r){return console.error("Error fetching places",r),{items:[],totalCount:0}}};function le(){const[t,n]=l.useState([]),[s,a]=l.useState(0),[o,c]=l.useState(""),[r,i]=l.useState("vi"),[j,P]=l.useState(1),[x,v]=l.useState(5);l.useEffect(()=>{(async()=>{const{items:h,totalCount:b}=await ie(j,x,r,o);n(h),a(b)})()},[j,x,r,o]);const d=ce(),m=ne({inputData:t,comparator:se(d.order,d.orderBy),filterName:o}),g=!m.length&&!!o;return e.jsxs(B,{children:[e.jsx(w,{display:"flex",alignItems:"center",mb:5,children:e.jsx(C,{variant:"h4",flexGrow:1,children:"Places"})}),e.jsxs(V,{children:[e.jsx(re,{numSelected:d.selected.length,filterName:o,onFilterName:u=>{c(u.target.value),P(1)}}),e.jsx(G,{children:e.jsx(Q,{sx:{overflow:"unset"},children:e.jsxs(K,{sx:{minWidth:800},children:[e.jsx(oe,{order:d.order,orderBy:d.orderBy,rowCount:t.length,numSelected:d.selected.length,onSort:d.onSort,onSelectAllRows:u=>d.onSelectAllRows(u,t.map(h=>h.id)),headLabel:[{id:"name",label:"Name"},{id:"address",label:"Address"},{id:"description",label:"Description"},{id:"isVerify",label:"isVerify"},{id:"status",label:"Status"},{id:"View details",label:"View details"},{id:""}]}),e.jsxs(U,{children:[m.slice(d.page*x,d.page*x+x).map(u=>e.jsx(ae,{row:u,selected:d.selected.includes(u.id),onSelectRow:()=>d.onSelectRow(u.id)},u.id)),e.jsx(_,{height:68,emptyRows:te(d.page,d.rowsPerPage,t.length)}),g&&e.jsx(X,{searchQuery:o})]})]})})}),e.jsx(Y,{component:"div",page:j-1,count:s,rowsPerPage:x,onPageChange:(u,h)=>P(h+1),rowsPerPageOptions:[5,10,25],onRowsPerPageChange:u=>{v(parseInt(u.target.value,10)),P(1)}})]})]})}function ce(){const[t,n]=l.useState(0),[s,a]=l.useState("name"),[o,c]=l.useState(5),[r,i]=l.useState([]),[j,P]=l.useState("asc"),x=l.useCallback(h=>{P(s===h&&j==="asc"?"desc":"asc"),a(h)},[j,s]),v=l.useCallback((h,b)=>{if(h){i(b);return}i([])},[]),d=l.useCallback(h=>{const b=r.includes(h)?r.filter(I=>I!==h):[...r,h];i(b)},[r]),m=l.useCallback(()=>{n(0)},[]),g=l.useCallback((h,b)=>{n(b)},[]),u=l.useCallback(h=>{c(parseInt(h.target.value,10)),m()},[m]);return{page:t,order:j,onSort:x,orderBy:s,selected:r,rowsPerPage:o,onSelectRow:d,onResetPage:m,onChangePage:g,onSelectAllRows:v,onChangeRowsPerPage:u}}function pe(){return e.jsxs(e.Fragment,{children:[e.jsx(Z,{children:e.jsxs("title",{children:[" ",`Event - ${q.appName}`]})}),e.jsx(le,{})]})}export{pe as default};
