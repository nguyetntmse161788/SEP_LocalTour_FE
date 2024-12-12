import{w as P,j as e,h as f,l as b,r as d,B as j,T as S,H as T}from"./index-Cc_uhaw2.js";import{C as y}from"./config-global-DYC5wpSI.js";import{a as R}from"./axiosInstance-DxRYDP1x.js";import{c as I,d as o,T as C,a as k,e as U}from"./TableRow-D6UDr9Xq.js";import{a as v,g as A}from"./utils-DIknCzrT.js";import{u as B}from"./user-view-xkFNJZZU.js";import{C as F}from"./Card-aOnlRS-j.js";import{b as N}from"./TableSortLabel-B-9zB2P1.js";import"./Select-DNzxC7qm.js";import"./useFormControl-La3rWkRi.js";import"./InputAdornment-CxX4agxn.js";import"./Popper-CNsN0Zo1.js";import"./LastPage-CV_-hBrB.js";function $({row:r,selected:p,onSelectRow:x,onStatusUpdate:u}){P();const n=async(m,c)=>{var t,i,g;const h=localStorage.getItem("accessToken");if(!h){alert("No access token found. Please log in.");return}try{const a={id:r.id,userReportId:r.userReportId,userId:r.userId,content:r.content,reportDate:r.reportDate,status:c};await R.put(`https://api.localtour.space/api/UserReport/${m}`,a,{headers:{Authorization:`Bearer ${h} `}}),alert(`Report has been updated to: ${c}`);const s=await R.get("https://localhost:44388/api/UserReport/GetAll",{headers:{Authorization:`Bearer ${h} `}});u(s.data)}catch(a){b.isAxiosError(a)?(console.error("Error message:",a.message),console.error("Response data:",(t=a.response)==null?void 0:t.data),alert(`Failed to update report: ${((g=(i=a.response)==null?void 0:i.data)==null?void 0:g.message)||a.message}`)):(console.error("Unexpected error",a),alert("An unexpected error occurred."))}};return e.jsxs(I,{hover:!0,tabIndex:-1,role:"checkbox",selected:p,children:[e.jsx(o,{children:r.id}),e.jsx(o,{children:r.userId}),e.jsx(o,{children:r.content}),e.jsx(o,{children:new Date(r.reportDate).toLocaleString()}),e.jsx(o,{children:r.status}),e.jsxs(o,{children:[e.jsx(f,{variant:"outlined",color:"success",size:"small",onClick:()=>n(r.id,"Accepted"),children:"Accept"}),e.jsx(f,{variant:"outlined",color:"error",size:"small",onClick:()=>n(r.id,"Rejected"),style:{marginLeft:"8px"},children:"Reject"})]})]})}function w(){const[r,p]=d.useState([]),[x,u]=d.useState(!0),[n,m]=d.useState(""),[c,h]=d.useState(""),t=B();P(),d.useEffect(()=>{const s=localStorage.getItem("accessToken");if(!s){alert("No access token found. Please log in.");return}i(s)},[]);const i=async s=>{u(!0);try{const l=await b.get("https://api.localtour.space/api/UserReport",{headers:{Authorization:`Bearer ${s} `}});p(l.data)}catch{m("Failed to fetch user reports")}finally{u(!1)}},g=async s=>{p(s);const l=localStorage.getItem("accessToken");l&&i(l)},a=v({reportData:r,comparator:A(t.order,t.orderBy),filterName:c});return a.length,x?e.jsx("div",{children:"Loading..."}):e.jsxs(j,{sx:{p:3},children:[e.jsx(j,{display:"flex",alignItems:"center",mb:5,children:e.jsx(S,{variant:"h4",sx:{flexGrow:1},children:"User Reports"})}),e.jsxs(F,{children:[e.jsx(C,{sx:{overflow:"unset"},children:e.jsx(k,{sx:{minWidth:800},children:e.jsxs(U,{children:[n&&e.jsx(I,{children:e.jsx(o,{colSpan:6,align:"center",sx:{color:"error.main"},children:n})}),a.slice(t.page*t.rowsPerPage,t.page*t.rowsPerPage+t.rowsPerPage).map(s=>e.jsx($,{row:s,selected:t.selected.includes(s.userId),onSelectRow:()=>t.onSelectRow(s.userId),onStatusUpdate:g},s.id))]})})}),e.jsx(N,{component:"div",page:t.page,count:r.length,rowsPerPage:t.rowsPerPage,onPageChange:t.onChangePage,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:t.onChangeRowsPerPage})]})]})}function Q(){return e.jsxs(e.Fragment,{children:[e.jsx(T,{children:e.jsxs("title",{children:[" ",`Report User - ${y.appName}`]})}),e.jsx(w,{})]})}export{Q as default};
