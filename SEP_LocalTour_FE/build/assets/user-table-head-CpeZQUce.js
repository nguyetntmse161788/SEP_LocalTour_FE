import{j as l,B as c}from"./index-DUX23g0E.js";import{f as u,T as w,a as f,g as m}from"./TableSortLabel-2OFHYdxw.js";const p={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function x(o,s,i){return o?Math.max(0,(1+o)*s-i):0}function d(o,s,i){return s[i]<o[i]?-1:s[i]>o[i]?1:0}function g(o,s){return o==="desc"?(i,a)=>d(i,a,s):(i,a)=>-d(i,a,s)}function h({inputData:o,comparator:s,filterName:i}){const a=o.map((t,e)=>[t,e]);a.sort((t,e)=>{const n=s(t[0],e[0]);return n!==0?n:t[1]-e[1]});let r=a.map(t=>t[0]);if(i){const t=i.toLowerCase();r=r.filter(e=>e.username&&e.username.toLowerCase().includes(t)||e.email&&e.email.toLowerCase().includes(t)||e.fullName&&e.fullName.toLowerCase().includes(t)||e.phoneNumber&&e.phoneNumber.toLowerCase().includes(t)||e.address&&e.address.toLowerCase().includes(t)||e.gender&&e.gender.toLowerCase().includes(t)||e.role&&e.role.toLowerCase().includes(t)||e.roles&&e.roles.some(n=>n.toLowerCase().includes(t))||e.dateOfBirth&&e.dateOfBirth.toLowerCase().includes(t)||e.profilePictureUrl&&e.profilePictureUrl.toLowerCase().includes(t)||e.endDate&&e.endDate.toISOString().toLowerCase().includes(t))}return r}function b({reportData:o,comparator:s,filterName:i}){const a=o.map((t,e)=>[t,e]);a.sort((t,e)=>{const n=s(t[0],e[0]);return n!==0?n:t[1]-e[1]});let r=a.map(t=>t[0]);if(i){const t=i.toLowerCase();r=r.filter(e=>e.content&&e.content.toLowerCase().includes(t)||e.userReportId&&e.userReportId.toLowerCase().includes(t)||e.userId&&e.userId.toLowerCase().includes(t)||e.status&&e.status.toLowerCase().includes(t)||e.reportDate&&e.reportDate.toLowerCase().includes(t))}return r}function T({order:o,onSort:s,orderBy:i,rowCount:a,headLabel:r,numSelected:t,onSelectAllRows:e}){return l.jsx(u,{children:l.jsx(w,{children:r.map(n=>l.jsx(f,{align:n.align||"left",sortDirection:i===n.id?o:!1,sx:{width:n.width,minWidth:n.minWidth},children:l.jsxs(m,{hideSortIcon:!0,active:i===n.id,direction:i===n.id?o:"asc",onClick:()=>s(n.id),children:[n.label,i===n.id?l.jsx(c,{sx:{...p},children:o==="desc"?"sorted descending":"sorted ascending"}):null]})},n.id))})})}export{T as U,h as a,b,x as e,g};
