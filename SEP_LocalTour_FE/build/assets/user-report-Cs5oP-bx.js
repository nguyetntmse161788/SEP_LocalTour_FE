import{j as e,B as S,f as P,N as A,J as D,I as b,O as T,l as k,K as w,k as I,r,S as B,H as U}from"./index-DUX23g0E.js";import{C as F}from"./config-global-BwHnWRtc.js";import{a as v}from"./index-Br0q4W-C.js";import{T as R,a as h,b as E,c as O,d as $,e as z}from"./TableSortLabel-2OFHYdxw.js";import{b as L,g as H,U as W,e as G}from"./user-table-head-CpeZQUce.js";import{O as J}from"./Select-CoLeV2jR.js";import{a as K}from"./axiosInstance-DCuNI-kV.js";import{C as M}from"./Card-CfNpMCOC.js";import"./LastPage-B31ot4Y2.js";function Q({emptyRows:t,height:n,sx:i,...l}){return t?e.jsx(R,{sx:{...n&&{height:n*t},...i},...l,children:e.jsx(h,{colSpan:9})}):null}function _({searchQuery:t,...n}){return e.jsx(R,{...n,children:e.jsx(h,{align:"center",colSpan:7,children:e.jsxs(S,{sx:{py:15,textAlign:"center"},children:[e.jsx(P,{variant:"h6",sx:{mb:1},children:"Not found"}),e.jsxs(P,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}function q({numSelected:t,filterName:n,onFilterName:i}){return e.jsxs(A,{sx:{height:96,display:"flex",justifyContent:"space-between",p:l=>l.spacing(0,1,0,3),...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?e.jsxs(P,{component:"div",variant:"subtitle1",children:[t," selected"]}):e.jsx(J,{fullWidth:!0,value:n,onChange:i,placeholder:"Search user...",startAdornment:e.jsx(D,{position:"start",children:e.jsx(b,{width:20,icon:"eva:search-fill",sx:{color:"text.disabled"}})}),sx:{maxWidth:320}}),t>0?e.jsx(T,{title:"Delete",children:e.jsx(k,{children:e.jsx(b,{icon:"solar:trash-bin-trash-bold"})})}):e.jsx(T,{title:"Filter list",children:e.jsx(k,{children:e.jsx(b,{icon:"ic:round-filter-list"})})})]})}function X({row:t,selected:n,onSelectRow:i}){w();const l=async(j,g)=>{var x,s,d;const p=localStorage.getItem("accessToken");if(!p){alert("No access token found. Please log in.");return}try{const c={id:t.id,userReportId:t.userReportId,userId:t.userId,content:t.content,reportDate:t.reportDate,status:g};await K.put(`https://api.localtour.space/api/UserReport/${j}`,c,{headers:{Authorization:`Bearer ${p}`}}),alert(`Report has been updated to: ${g}`)}catch(c){v.isAxiosError(c)?(console.error("Error message:",c.message),console.error("Response data:",(x=c.response)==null?void 0:x.data),alert(`Failed to update report: ${((d=(s=c.response)==null?void 0:s.data)==null?void 0:d.message)||c.message}`)):(console.error("Unexpected error",c),alert("An unexpected error occurred."))}};return e.jsxs(R,{hover:!0,tabIndex:-1,role:"checkbox",selected:n,children:[e.jsx(h,{children:t.id}),e.jsx(h,{children:t.userId}),e.jsx(h,{children:t.content}),e.jsx(h,{children:new Date(t.reportDate).toLocaleString()}),e.jsx(h,{children:t.status}),e.jsxs(h,{children:[e.jsx(I,{variant:"outlined",color:"success",size:"small",onClick:()=>l(t.id,"Accepted"),children:"Accept"}),e.jsx(I,{variant:"outlined",color:"error",size:"small",onClick:()=>l(t.id,"Rejected"),style:{marginLeft:"8px"},children:"Reject"})]})]})}function Y(){const[t,n]=r.useState([]),[i,l]=r.useState(!0),[j,g]=r.useState(""),[p,x]=r.useState(""),s=Z(),d=w(),c=r.useCallback(()=>d("/some-path"),[d]),f=r.useCallback(a=>{g(a),l(!1),d("/sign-in")},[d]);r.useEffect(()=>{const a=localStorage.getItem("accessToken");if(!a){f("No access token found. Please log in.");return}const o=JSON.parse(atob(a.split(".")[1])),u=Math.floor(Date.now()/1e3);if(o.exp<u){f("Token has expired. Please log in again.");return}y(a)},[c,f]);const y=async a=>{l(!0);try{const o=await v.get("https://api.localtour.space/api/UserReport",{headers:{Authorization:`Bearer ${a}`}});n(o.data)}catch{g("Failed to fetch user reports")}finally{l(!1)}},m=L({reportData:t,comparator:H(s.order,s.orderBy),filterName:p}),C=!m.length&&!!p;return i?e.jsx("div",{children:"Loading..."}):e.jsxs(S,{sx:{p:3},children:[e.jsxs(S,{display:"flex",alignItems:"center",mb:5,children:[e.jsx(P,{variant:"h4",sx:{flexGrow:1},children:"User Reports"}),e.jsx(I,{variant:"contained",color:"inherit",startIcon:e.jsx(b,{icon:"mingcute:add-line"}),onClick:()=>d("/create-report"),children:"New Report"})]}),e.jsxs(M,{children:[e.jsx(q,{filterName:p,onFilterName:a=>{x(a.target.value),s.onResetPage()},numSelected:0}),e.jsx(B,{children:e.jsx(E,{sx:{overflow:"unset"},children:e.jsxs(O,{sx:{minWidth:800},children:[e.jsx(W,{order:s.order,orderBy:s.orderBy,rowCount:t.length,numSelected:s.selected.length,onSort:s.onSort,headLabel:[{id:"id",label:"ID"},{id:"userId",label:"User ID"},{id:"content",label:"Content"},{id:"reportDate",label:"Report Date"},{id:"status",label:"Status"},{id:"action",label:"Action"}]}),e.jsxs($,{children:[j&&e.jsx(R,{children:e.jsx(h,{colSpan:6,align:"center",sx:{color:"error.main"},children:j})}),m.slice(s.page*s.rowsPerPage,s.page*s.rowsPerPage+s.rowsPerPage).map(a=>e.jsx(X,{row:a,selected:s.selected.includes(a.userId),onSelectRow:()=>s.onSelectRow(a.userId)},a.userId)),e.jsx(Q,{height:68,emptyRows:G(s.page,s.rowsPerPage,t.length)}),C&&e.jsx(_,{searchQuery:p})]})]})})}),e.jsx(z,{component:"div",page:s.page,count:t.length,rowsPerPage:s.rowsPerPage,onPageChange:s.onChangePage,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:s.onChangeRowsPerPage})]})]})}function Z(){const[t,n]=r.useState(0),[i,l]=r.useState("userReportId"),[j,g]=r.useState(5),[p,x]=r.useState([]),[s,d]=r.useState("asc"),c=r.useCallback(o=>{d(i===o&&s==="asc"?"desc":"asc"),l(o)},[s,i]),f=r.useCallback((o,u)=>{if(o){x(u);return}x([])},[]),y=r.useCallback(o=>{x(u=>u.includes(o)?u.filter(N=>N!==o):[...u,o])},[]),m=r.useCallback(()=>n(0),[]),C=r.useCallback((o,u)=>{n(u)},[]),a=r.useCallback(o=>{g(parseInt(o.target.value,10)),m()},[m]);return{page:t,order:s,orderBy:i,rowsPerPage:j,selected:p,onSort:c,onSelectRow:y,onSelectAllRows:f,onResetPage:m,onChangePage:C,onChangeRowsPerPage:a}}function ce(){return e.jsxs(e.Fragment,{children:[e.jsx(U,{children:e.jsxs("title",{children:[" ",`Report User - ${F.appName}`]})}),e.jsx(Y,{})]})}export{ce as default};
