import{a3 as a,$ as f}from"./index-Cc_uhaw2.js";function g(t,r=0,n=1){return f(t,r,n)}function h(t){t=t.slice(1);const r=new RegExp(`.{1,${t.length>=6?2:1}}`,"g");let n=t.match(r);return n&&n[0].length===1&&(n=n.map(e=>e+e)),n?`rgb${n.length===4?"a":""}(${n.map((e,s)=>s<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3).join(", ")})`:""}function p(t){if(t.type)return t;if(t.charAt(0)==="#")return p(h(t));const r=t.indexOf("("),n=t.substring(0,r);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(a(9,t));let e=t.substring(r+1,t.length-1),s;if(n==="color"){if(e=e.split(" "),s=e.shift(),e.length===4&&e[3].charAt(0)==="/"&&(e[3]=e[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(s)===-1)throw new Error(a(10,s))}else e=e.split(",");return e=e.map(i=>parseFloat(i)),{type:n,values:e,colorSpace:s}}function u(t){const{type:r,colorSpace:n}=t;let{values:e}=t;return r.indexOf("rgb")!==-1?e=e.map((s,i)=>i<3?parseInt(s,10):s):r.indexOf("hsl")!==-1&&(e[1]=`${e[1]}%`,e[2]=`${e[2]}%`),r.indexOf("color")!==-1?e=`${n} ${e.join(" ")}`:e=`${e.join(", ")}`,`${r}(${e})`}function m(t,r){return t=p(t),r=g(r),(t.type==="rgb"||t.type==="hsl")&&(t.type+="a"),t.type==="color"?t.values[3]=`/${r}`:t.values[3]=r,u(t)}export{m as a};
