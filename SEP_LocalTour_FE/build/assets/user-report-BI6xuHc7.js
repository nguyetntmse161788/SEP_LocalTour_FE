import{j as e,m as P,n as h,B as S,T as R,Q as N,R as D,K as U,I as f,U as T,V as k,O as w,h as I,t as v,r,aY as B,X as F,C as E,Y as O,i as $,k as z,o as L,Z as H,$ as W,H as G}from"./index-z39hXFLl.js";import{C as Q}from"./config-global-BwHnWRtc.js";import{U as Y}from"./user-table-head-DC_sk3Cn.js";import{a as J}from"./axiosInstance-Xq098mIU.js";function K({emptyRows:t,height:n,sx:i,...l}){return t?e.jsx(P,{sx:{...n&&{height:n*t},...i},...l,children:e.jsx(h,{colSpan:9})}):null}function M({searchQuery:t,...n}){return e.jsx(P,{...n,children:e.jsx(h,{align:"center",colSpan:7,children:e.jsxs(S,{sx:{py:15,textAlign:"center"},children:[e.jsx(R,{variant:"h6",sx:{mb:1},children:"Not found"}),e.jsxs(R,{variant:"body2",children:["No results found for  ",e.jsxs("strong",{children:['"',t,'"']}),".",e.jsx("br",{})," Try checking for typos or using complete words."]})]})})})}function X({numSelected:t,filterName:n,onFilterName:i}){return e.jsxs(N,{sx:{height:96,display:"flex",justifyContent:"space-between",p:l=>l.spacing(0,1,0,3),...t>0&&{color:"primary.main",bgcolor:"primary.lighter"}},children:[t>0?e.jsxs(R,{component:"div",variant:"subtitle1",children:[t," selected"]}):e.jsx(D,{fullWidth:!0,value:n,onChange:i,placeholder:"Search user...",startAdornment:e.jsx(U,{position:"start",children:e.jsx(f,{width:20,icon:"eva:search-fill",sx:{color:"text.disabled"}})}),sx:{maxWidth:320}}),t>0?e.jsx(T,{title:"Delete",children:e.jsx(k,{children:e.jsx(f,{icon:"solar:trash-bin-trash-bold"})})}):e.jsx(T,{title:"Filter list",children:e.jsx(k,{children:e.jsx(f,{icon:"ic:round-filter-list"})})})]})}function Z({row:t,selected:n,onSelectRow:i}){w();const l=async(j,g)=>{var x,s,d;const p=localStorage.getItem("accessToken");if(!p){alert("No access token found. Please log in.");return}try{const c={id:t.id,userReportId:t.userReportId,userId:t.userId,content:t.content,reportDate:t.reportDate,status:g};await J.put(`https://api.localtour.space/api/UserReport/${j}`,c,{headers:{Authorization:`Bearer ${p}`}}),alert(`Report has been updated to: ${g}`)}catch(c){v.isAxiosError(c)?(console.error("Error message:",c.message),console.error("Response data:",(x=c.response)==null?void 0:x.data),alert(`Failed to update report: ${((d=(s=c.response)==null?void 0:s.data)==null?void 0:d.message)||c.message}`)):(console.error("Unexpected error",c),alert("An unexpected error occurred."))}};return e.jsxs(P,{hover:!0,tabIndex:-1,role:"checkbox",selected:n,children:[e.jsx(h,{children:t.id}),e.jsx(h,{children:t.userId}),e.jsx(h,{children:t.content}),e.jsx(h,{children:new Date(t.reportDate).toLocaleString()}),e.jsx(h,{children:t.status}),e.jsxs(h,{children:[e.jsx(I,{variant:"outlined",color:"success",size:"small",onClick:()=>l(t.id,"Accepted"),children:"Accept"}),e.jsx(I,{variant:"outlined",color:"error",size:"small",onClick:()=>l(t.id,"Rejected"),style:{marginLeft:"8px"},children:"Reject"})]})]})}function _(){const[t,n]=r.useState([]),[i,l]=r.useState(!0),[j,g]=r.useState(""),[p,x]=r.useState(""),s=q(),d=w(),c=r.useCallback(()=>d("/some-path"),[d]),b=r.useCallback(a=>{g(a),l(!1),d("/sign-in")},[d]);r.useEffect(()=>{const a=localStorage.getItem("accessToken");if(!a){b("No access token found. Please log in.");return}const o=JSON.parse(atob(a.split(".")[1])),u=Math.floor(Date.now()/1e3);if(o.exp<u){b("Token has expired. Please log in again.");return}y(a)},[c,b]);const y=async a=>{l(!0);try{const o=await v.get("https://api.localtour.space/api/UserReport",{headers:{Authorization:`Bearer ${a}`}});n(o.data)}catch{g("Failed to fetch user reports")}finally{l(!1)}},m=B({reportData:t,comparator:F(s.order,s.orderBy),filterName:p}),C=!m.length&&!!p;return i?e.jsx("div",{children:"Loading..."}):e.jsxs(S,{sx:{p:3},children:[e.jsxs(S,{display:"flex",alignItems:"center",mb:5,children:[e.jsx(R,{variant:"h4",sx:{flexGrow:1},children:"User Reports"}),e.jsx(I,{variant:"contained",color:"inherit",startIcon:e.jsx(f,{icon:"mingcute:add-line"}),onClick:()=>d("/create-report"),children:"New Report"})]}),e.jsxs(E,{children:[e.jsx(X,{filterName:p,onFilterName:a=>{x(a.target.value),s.onResetPage()},numSelected:0}),e.jsx(O,{children:e.jsx($,{sx:{overflow:"unset"},children:e.jsxs(z,{sx:{minWidth:800},children:[e.jsx(Y,{order:s.order,orderBy:s.orderBy,rowCount:t.length,numSelected:s.selected.length,onSort:s.onSort,headLabel:[{id:"id",label:"ID"},{id:"userId",label:"User ID"},{id:"content",label:"Content"},{id:"reportDate",label:"Report Date"},{id:"status",label:"Status"},{id:"action",label:"Action"}]}),e.jsxs(L,{children:[j&&e.jsx(P,{children:e.jsx(h,{colSpan:6,align:"center",sx:{color:"error.main"},children:j})}),m.slice(s.page*s.rowsPerPage,s.page*s.rowsPerPage+s.rowsPerPage).map(a=>e.jsx(Z,{row:a,selected:s.selected.includes(a.userId),onSelectRow:()=>s.onSelectRow(a.userId)},a.userId)),e.jsx(K,{height:68,emptyRows:H(s.page,s.rowsPerPage,t.length)}),C&&e.jsx(M,{searchQuery:p})]})]})})}),e.jsx(W,{component:"div",page:s.page,count:t.length,rowsPerPage:s.rowsPerPage,onPageChange:s.onChangePage,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:s.onChangeRowsPerPage})]})]})}function q(){const[t,n]=r.useState(0),[i,l]=r.useState("userReportId"),[j,g]=r.useState(5),[p,x]=r.useState([]),[s,d]=r.useState("asc"),c=r.useCallback(o=>{d(i===o&&s==="asc"?"desc":"asc"),l(o)},[s,i]),b=r.useCallback((o,u)=>{if(o){x(u);return}x([])},[]),y=r.useCallback(o=>{x(u=>u.includes(o)?u.filter(A=>A!==o):[...u,o])},[]),m=r.useCallback(()=>n(0),[]),C=r.useCallback((o,u)=>{n(u)},[]),a=r.useCallback(o=>{g(parseInt(o.target.value,10)),m()},[m]);return{page:t,order:s,orderBy:i,rowsPerPage:j,selected:p,onSort:c,onSelectRow:y,onSelectAllRows:b,onResetPage:m,onChangePage:C,onChangeRowsPerPage:a}}function re(){return e.jsxs(e.Fragment,{children:[e.jsx(G,{children:e.jsxs("title",{children:[" ",`Report User - ${Q.appName}`]})}),e.jsx(_,{})]})}export{re as default};