import{j as s,l as e,m as o,n as d,a0 as l,B as r,aX as x}from"./index-JURld8WI.js";function w({order:t,onSort:a,orderBy:n,rowCount:m,headLabel:c,numSelected:u,onSelectAllRows:b}){return s.jsx(e,{children:s.jsx(o,{children:c.map(i=>s.jsx(d,{align:i.align||"left",sortDirection:n===i.id?t:!1,sx:{width:i.width,minWidth:i.minWidth},children:s.jsxs(l,{hideSortIcon:!0,active:n===i.id,direction:n===i.id?t:"asc",onClick:()=>a(i.id),children:[i.label,n===i.id?s.jsx(r,{sx:{...x},children:t==="desc"?"sorted descending":"sorted ascending"}):null]})},i.id))})})}export{w as U};
