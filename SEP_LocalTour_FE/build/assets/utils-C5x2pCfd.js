const d={border:0,margin:-1,padding:0,width:"1px",height:"1px",overflow:"hidden",position:"absolute",whiteSpace:"nowrap",clip:"rect(0 0 0 0)"};function c(n,a,o){return n?Math.max(0,(1+n)*a-o):0}function r(n,a,o){return a[o]<n[o]?-1:a[o]>n[o]?1:0}function u(n,a){return n==="desc"?(o,i)=>r(o,i,a):(o,i)=>-r(o,i,a)}function w({inputData:n,comparator:a,filterName:o}){const i=n.map((t,e)=>[t,e]);i.sort((t,e)=>{const l=a(t[0],e[0]);return l!==0?l:t[1]-e[1]});let s=i.map(t=>t[0]);if(o){const t=o.toLowerCase();s=s.filter(e=>e.username&&e.username.toLowerCase().includes(t)||e.email&&e.email.toLowerCase().includes(t)||e.fullName&&e.fullName.toLowerCase().includes(t)||e.phoneNumber&&e.phoneNumber.toLowerCase().includes(t)||e.address&&e.address.toLowerCase().includes(t)||e.gender&&e.gender.toLowerCase().includes(t)||e.role&&e.role.toLowerCase().includes(t)||e.roles&&e.roles.some(l=>l.toLowerCase().includes(t))||e.dateOfBirth&&e.dateOfBirth.toLowerCase().includes(t)||e.profilePictureUrl&&e.profilePictureUrl.toLowerCase().includes(t)||e.endDate&&e.endDate.toISOString().toLowerCase().includes(t))}return s}function C({reportData:n,comparator:a,filterName:o}){const i=n.map((t,e)=>[t,e]);i.sort((t,e)=>{const l=a(t[0],e[0]);return l!==0?l:t[1]-e[1]});let s=i.map(t=>t[0]);if(o){const t=o.toLowerCase();s=s.filter(e=>e.content&&e.content.toLowerCase().includes(t)||e.userReportId&&e.userReportId.toLowerCase().includes(t)||e.userId&&e.userId.toLowerCase().includes(t)||e.status&&e.status.toLowerCase().includes(t)||e.reportDate&&e.reportDate.toLowerCase().includes(t))}return s}export{w as a,C as b,c as e,u as g,d as v};
