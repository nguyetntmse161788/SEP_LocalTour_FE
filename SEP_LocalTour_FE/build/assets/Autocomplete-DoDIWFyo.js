import{a3 as To,r as C,af as co,aH as So,aI as eo,aJ as Do,b as m,aa as No,j as I,g as Io,a as yo,u as Oo,_ as je,ag as Po,al as bo,a4 as g,c as ko,d as X,s as j,ae as H,aK as zo,P as Lo,aL as Ro,aM as Mo,aN as Eo,aO as Re,aP as be,aQ as xo,aR as po,R as Ao}from"./index-JURld8WI.js";function mo(e){return typeof e.normalize<"u"?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}function Fo(e={}){const{ignoreAccents:a=!0,ignoreCase:p=!0,limit:c,matchFrom:$="any",stringify:P,trim:y=!1}=e;return(d,{inputValue:k,getOptionLabel:D})=>{let A=y?k.trim():k;p&&(A=A.toLowerCase()),a&&(A=mo(A));const M=A?d.filter(se=>{let N=(P||D)(se);return p&&(N=N.toLowerCase()),a&&(N=mo(N)),$==="start"?N.indexOf(A)===0:N.indexOf(A)>-1}):d;return typeof c=="number"?M.slice(0,c):M}}function oo(e,a){for(let p=0;p<e.length;p+=1)if(a(e[p]))return p;return-1}const Vo=Fo(),ho=5,wo=e=>{var a;return e.current!==null&&((a=e.current.parentElement)==null?void 0:a.contains(document.activeElement))},Ho=[];function jo(e){const{unstable_isActiveElementInListbox:a=wo,unstable_classNamePrefix:p="Mui",autoComplete:c=!1,autoHighlight:$=!1,autoSelect:P=!1,blurOnSelect:y=!1,clearOnBlur:d=!e.freeSolo,clearOnEscape:k=!1,componentName:D="useAutocomplete",defaultValue:A=e.multiple?Ho:null,disableClearable:M=!1,disableCloseOnSelect:se=!1,disabled:N,disabledItemsFocusable:W=!1,disableListWrap:xe=!1,filterOptions:Ae=Vo,filterSelectedOptions:ce=!1,freeSolo:Y=!1,getOptionDisabled:G,getOptionKey:Te,getOptionLabel:me=t=>{var o;return(o=t.label)!=null?o:t},groupBy:ae,handleHomeEndKeys:Z=!e.freeSolo,id:Se,includeInputInList:De=!1,inputValue:he,isOptionEqualToValue:ee=(t,o)=>t===o,multiple:f=!1,onChange:le,onClose:_,onHighlightChange:ve,onInputChange:B,onOpen:pe,open:Ne,openOnFocus:L=!1,options:ze,readOnly:ue=!1,selectOnFocus:Me=!e.freeSolo,value:We}=e,V=To(Se);let z=me;z=t=>{const o=me(t);return typeof o!="string"?String(o):o};const Ee=C.useRef(!1),_e=C.useRef(!0),O=C.useRef(null),w=C.useRef(null),[Ce,to]=C.useState(null),[E,Fe]=C.useState(-1),Be=$?0:-1,T=C.useRef(Be),[r,uo]=co({controlled:We,default:A,name:D}),[b,ne]=co({controlled:he,default:"",name:D,state:"inputValue"}),[$e,Ke]=C.useState(!1),de=C.useCallback((t,o)=>{if(!(f?r.length<o.length:o!==null)&&!d)return;let l;if(f)l="";else if(o==null)l="";else{const i=z(o);l=typeof i=="string"?i:""}b!==l&&(ne(l),B&&B(t,l,"reset"))},[z,b,f,B,ne,d,r]),[ie,Ue]=co({controlled:Ne,default:!1,name:D,state:"open"}),[ao,Ge]=C.useState(!0),qe=!f&&r!=null&&b===z(r),F=ie&&!ue,h=F?Ae(ze.filter(t=>!(ce&&(f?r:[r]).some(o=>o!==null&&ee(t,o)))),{inputValue:qe&&ao?"":b,getOptionLabel:z}):[],q=So({filteredOptions:h,value:r,inputValue:b});C.useEffect(()=>{const t=r!==q.value;$e&&!t||Y&&!t||de(null,r)},[r,de,$e,q.value,Y]);const Ve=ie&&h.length>0&&!ue,Ie=eo(t=>{t===-1?O.current.focus():Ce.querySelector(`[data-tag-index="${t}"]`).focus()});C.useEffect(()=>{f&&E>r.length-1&&(Fe(-1),Ie(-1))},[r,f,E,Ie]);function ye(t,o){if(!w.current||t<0||t>=h.length)return-1;let n=t;for(;;){const l=w.current.querySelector(`[data-option-index="${n}"]`),i=W?!1:!l||l.disabled||l.getAttribute("aria-disabled")==="true";if(l&&l.hasAttribute("tabindex")&&!i)return n;if(o==="next"?n=(n+1)%h.length:n=(n-1+h.length)%h.length,n===t)return-1}}const oe=eo(({event:t,index:o,reason:n="auto"})=>{if(T.current=o,o===-1?O.current.removeAttribute("aria-activedescendant"):O.current.setAttribute("aria-activedescendant",`${V}-option-${o}`),ve&&ve(t,o===-1?null:h[o],n),!w.current)return;const l=w.current.querySelector(`[role="option"].${p}-focused`);l&&(l.classList.remove(`${p}-focused`),l.classList.remove(`${p}-focusVisible`));let i=w.current;if(w.current.getAttribute("role")!=="listbox"&&(i=w.current.parentElement.querySelector('[role="listbox"]')),!i)return;if(o===-1){i.scrollTop=0;return}const x=w.current.querySelector(`[data-option-index="${o}"]`);if(x&&(x.classList.add(`${p}-focused`),n==="keyboard"&&x.classList.add(`${p}-focusVisible`),i.scrollHeight>i.clientHeight&&n!=="mouse"&&n!=="touch")){const v=x,U=i.clientHeight+i.scrollTop,Ze=v.offsetTop+v.offsetHeight;Ze>U?i.scrollTop=Ze-i.clientHeight:v.offsetTop-v.offsetHeight*(ae?1.3:0)<i.scrollTop&&(i.scrollTop=v.offsetTop-v.offsetHeight*(ae?1.3:0))}}),J=eo(({event:t,diff:o,direction:n="next",reason:l="auto"})=>{if(!F)return;const x=ye((()=>{const v=h.length-1;if(o==="reset")return Be;if(o==="start")return 0;if(o==="end")return v;const U=T.current+o;return U<0?U===-1&&De?-1:xe&&T.current!==-1||Math.abs(o)>1?0:v:U>v?U===v+1&&De?-1:xe||Math.abs(o)>1?v:0:U})(),n);if(oe({index:x,reason:l,event:t}),c&&o!=="reset")if(x===-1)O.current.value=b;else{const v=z(h[x]);O.current.value=v,v.toLowerCase().indexOf(b.toLowerCase())===0&&b.length>0&&O.current.setSelectionRange(b.length,v.length)}}),Oe=()=>{const t=(o,n)=>{const l=o?z(o):"",i=n?z(n):"";return l===i};if(T.current!==-1&&q.filteredOptions&&q.filteredOptions.length!==h.length&&q.inputValue===b&&(f?r.length===q.value.length&&q.value.every((o,n)=>z(r[n])===z(o)):t(q.value,r))){const o=q.filteredOptions[T.current];if(o)return oo(h,n=>z(n)===z(o))}return-1},we=C.useCallback(()=>{if(!F)return;const t=Oe();if(t!==-1){T.current=t;return}const o=f?r[0]:r;if(h.length===0||o==null){J({diff:"reset"});return}if(w.current){if(o!=null){const n=h[T.current];if(f&&n&&oo(r,i=>ee(n,i))!==-1)return;const l=oo(h,i=>ee(i,o));l===-1?J({diff:"reset"}):oe({index:l});return}if(T.current>=h.length-1){oe({index:h.length-1});return}oe({index:T.current})}},[h.length,f?!1:r,ce,J,oe,F,b,f]),lo=eo(t=>{Do(w,t),t&&we()});C.useEffect(()=>{we()},[we]);const K=t=>{ie||(Ue(!0),Ge(!0),pe&&pe(t))},re=(t,o)=>{ie&&(Ue(!1),_&&_(t,o))},te=(t,o,n,l)=>{if(f){if(r.length===o.length&&r.every((i,x)=>i===o[x]))return}else if(r===o)return;le&&le(t,o,n,l),uo(o)},Pe=C.useRef(!1),fe=(t,o,n="selectOption",l="options")=>{let i=n,x=o;if(f){x=Array.isArray(r)?r.slice():[];const v=oo(x,U=>ee(o,U));v===-1?x.push(o):l!=="freeSolo"&&(x.splice(v,1),i="removeOption")}de(t,x),te(t,x,i,{option:o}),!se&&(!t||!t.ctrlKey&&!t.metaKey)&&re(t,i),(y===!0||y==="touch"&&Pe.current||y==="mouse"&&!Pe.current)&&O.current.blur()};function Je(t,o){if(t===-1)return-1;let n=t;for(;;){if(o==="next"&&n===r.length||o==="previous"&&n===-1)return-1;const l=Ce.querySelector(`[data-tag-index="${n}"]`);if(!l||!l.hasAttribute("tabindex")||l.disabled||l.getAttribute("aria-disabled")==="true")n+=o==="next"?1:-1;else return n}}const Qe=(t,o)=>{if(!f)return;b===""&&re(t,"toggleInput");let n=E;E===-1?b===""&&o==="previous"&&(n=r.length-1):(n+=o==="next"?1:-1,n<0&&(n=0),n===r.length&&(n=-1)),n=Je(n,o),Fe(n),Ie(n)},Xe=t=>{Ee.current=!0,ne(""),B&&B(t,"","clear"),te(t,f?[]:null,"clear")},no=t=>o=>{if(t.onKeyDown&&t.onKeyDown(o),!o.defaultMuiPrevented&&(E!==-1&&["ArrowLeft","ArrowRight"].indexOf(o.key)===-1&&(Fe(-1),Ie(-1)),o.which!==229))switch(o.key){case"Home":F&&Z&&(o.preventDefault(),J({diff:"start",direction:"next",reason:"keyboard",event:o}));break;case"End":F&&Z&&(o.preventDefault(),J({diff:"end",direction:"previous",reason:"keyboard",event:o}));break;case"PageUp":o.preventDefault(),J({diff:-ho,direction:"previous",reason:"keyboard",event:o}),K(o);break;case"PageDown":o.preventDefault(),J({diff:ho,direction:"next",reason:"keyboard",event:o}),K(o);break;case"ArrowDown":o.preventDefault(),J({diff:1,direction:"next",reason:"keyboard",event:o}),K(o);break;case"ArrowUp":o.preventDefault(),J({diff:-1,direction:"previous",reason:"keyboard",event:o}),K(o);break;case"ArrowLeft":Qe(o,"previous");break;case"ArrowRight":Qe(o,"next");break;case"Enter":if(T.current!==-1&&F){const n=h[T.current],l=G?G(n):!1;if(o.preventDefault(),l)return;fe(o,n,"selectOption"),c&&O.current.setSelectionRange(O.current.value.length,O.current.value.length)}else Y&&b!==""&&qe===!1&&(f&&o.preventDefault(),fe(o,b,"createOption","freeSolo"));break;case"Escape":F?(o.preventDefault(),o.stopPropagation(),re(o,"escape")):k&&(b!==""||f&&r.length>0)&&(o.preventDefault(),o.stopPropagation(),Xe(o));break;case"Backspace":if(f&&!ue&&b===""&&r.length>0){const n=E===-1?r.length-1:E,l=r.slice();l.splice(n,1),te(o,l,"removeOption",{option:r[n]})}break;case"Delete":if(f&&!ue&&b===""&&r.length>0&&E!==-1){const n=E,l=r.slice();l.splice(n,1),te(o,l,"removeOption",{option:r[n]})}break}},fo=t=>{Ke(!0),L&&!Ee.current&&K(t)},ke=t=>{if(a(w)){O.current.focus();return}Ke(!1),_e.current=!0,Ee.current=!1,P&&T.current!==-1&&F?fe(t,h[T.current],"blur"):P&&Y&&b!==""?fe(t,b,"blur","freeSolo"):d&&de(t,r),re(t,"blur")},S=t=>{const o=t.target.value;b!==o&&(ne(o),Ge(!1),B&&B(t,o,"input")),o===""?!M&&!f&&te(t,null,"clear"):K(t)},R=t=>{const o=Number(t.currentTarget.getAttribute("data-option-index"));T.current!==o&&oe({event:t,index:o,reason:"mouse"})},Q=t=>{oe({event:t,index:Number(t.currentTarget.getAttribute("data-option-index")),reason:"touch"}),Pe.current=!0},go=t=>{const o=Number(t.currentTarget.getAttribute("data-option-index"));fe(t,h[o],"selectOption"),Pe.current=!1},ro=t=>o=>{const n=r.slice();n.splice(t,1),te(o,n,"removeOption",{option:r[t]})},io=t=>{ie?re(t,"toggleInput"):K(t)},so=t=>{t.currentTarget.contains(t.target)&&t.target.getAttribute("id")!==V&&t.preventDefault()},Ye=t=>{t.currentTarget.contains(t.target)&&(O.current.focus(),Me&&_e.current&&O.current.selectionEnd-O.current.selectionStart===0&&O.current.select(),_e.current=!1)},He=t=>{!N&&(b===""||!ie)&&io(t)};let ge=Y&&b.length>0;ge=ge||(f?r.length>0:r!==null);let Le=h;return ae&&(Le=h.reduce((t,o,n)=>{const l=ae(o);return t.length>0&&t[t.length-1].group===l?t[t.length-1].options.push(o):t.push({key:n,index:n,group:l,options:[o]}),t},[])),N&&$e&&ke(),{getRootProps:(t={})=>m({"aria-owns":Ve?`${V}-listbox`:null},t,{onKeyDown:no(t),onMouseDown:so,onClick:Ye}),getInputLabelProps:()=>({id:`${V}-label`,htmlFor:V}),getInputProps:()=>({id:V,value:b,onBlur:ke,onFocus:fo,onChange:S,onMouseDown:He,"aria-activedescendant":F?"":null,"aria-autocomplete":c?"both":"list","aria-controls":Ve?`${V}-listbox`:void 0,"aria-expanded":Ve,autoComplete:"off",ref:O,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:N}),getClearProps:()=>({tabIndex:-1,type:"button",onClick:Xe}),getPopupIndicatorProps:()=>({tabIndex:-1,type:"button",onClick:io}),getTagProps:({index:t})=>m({key:t,"data-tag-index":t,tabIndex:-1},!ue&&{onDelete:ro(t)}),getListboxProps:()=>({role:"listbox",id:`${V}-listbox`,"aria-labelledby":`${V}-label`,ref:lo,onMouseDown:t=>{t.preventDefault()}}),getOptionProps:({index:t,option:o})=>{var n;const l=(f?r:[r]).some(x=>x!=null&&ee(o,x)),i=G?G(o):!1;return{key:(n=Te==null?void 0:Te(o))!=null?n:z(o),tabIndex:-1,role:"option",id:`${V}-option-${t}`,onMouseMove:R,onClick:go,onTouchStart:Q,"data-option-index":t,"aria-disabled":i,"aria-selected":l}},id:V,inputValue:b,value:r,dirty:ge,expanded:F&&Ce,popupOpen:F,focused:$e||E!==-1,anchorEl:Ce,setAnchorEl:to,focusedTag:E,groupedOptions:Le}}const Wo=No(I.jsx("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");function _o(e){return Io("MuiChip",e)}const u=yo("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),Bo=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant","tabIndex","skipFocusWhenDisabled"],Ko=e=>{const{classes:a,disabled:p,size:c,color:$,iconColor:P,onDelete:y,clickable:d,variant:k}=e,D={root:["root",k,p&&"disabled",`size${g(c)}`,`color${g($)}`,d&&"clickable",d&&`clickableColor${g($)}`,y&&"deletable",y&&`deletableColor${g($)}`,`${k}${g($)}`],label:["label",`label${g(c)}`],avatar:["avatar",`avatar${g(c)}`,`avatarColor${g($)}`],icon:["icon",`icon${g(c)}`,`iconColor${g(P)}`],deleteIcon:["deleteIcon",`deleteIcon${g(c)}`,`deleteIconColor${g($)}`,`deleteIcon${g(k)}Color${g($)}`]};return ko(D,_o,a)},Uo=j("div",{name:"MuiChip",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:p}=e,{color:c,iconColor:$,clickable:P,onDelete:y,size:d,variant:k}=p;return[{[`& .${u.avatar}`]:a.avatar},{[`& .${u.avatar}`]:a[`avatar${g(d)}`]},{[`& .${u.avatar}`]:a[`avatarColor${g(c)}`]},{[`& .${u.icon}`]:a.icon},{[`& .${u.icon}`]:a[`icon${g(d)}`]},{[`& .${u.icon}`]:a[`iconColor${g($)}`]},{[`& .${u.deleteIcon}`]:a.deleteIcon},{[`& .${u.deleteIcon}`]:a[`deleteIcon${g(d)}`]},{[`& .${u.deleteIcon}`]:a[`deleteIconColor${g(c)}`]},{[`& .${u.deleteIcon}`]:a[`deleteIcon${g(k)}Color${g(c)}`]},a.root,a[`size${g(d)}`],a[`color${g(c)}`],P&&a.clickable,P&&c!=="default"&&a[`clickableColor${g(c)})`],y&&a.deletable,y&&c!=="default"&&a[`deletableColor${g(c)}`],a[k],a[`${k}${g(c)}`]]}})(({theme:e,ownerState:a})=>{const p=e.palette.mode==="light"?e.palette.grey[700]:e.palette.grey[300];return m({maxWidth:"100%",fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(e.vars||e).palette.text.primary,backgroundColor:(e.vars||e).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${u.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${u.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:e.vars?e.vars.palette.Chip.defaultAvatarColor:p,fontSize:e.typography.pxToRem(12)},[`& .${u.avatarColorPrimary}`]:{color:(e.vars||e).palette.primary.contrastText,backgroundColor:(e.vars||e).palette.primary.dark},[`& .${u.avatarColorSecondary}`]:{color:(e.vars||e).palette.secondary.contrastText,backgroundColor:(e.vars||e).palette.secondary.dark},[`& .${u.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)},[`& .${u.icon}`]:m({marginLeft:5,marginRight:-6},a.size==="small"&&{fontSize:18,marginLeft:4,marginRight:-4},a.iconColor===a.color&&m({color:e.vars?e.vars.palette.Chip.defaultIconColor:p},a.color!=="default"&&{color:"inherit"})),[`& .${u.deleteIcon}`]:m({WebkitTapHighlightColor:"transparent",color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.26)`:H(e.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.4)`:H(e.palette.text.primary,.4)}},a.size==="small"&&{fontSize:16,marginRight:4,marginLeft:-4},a.color!=="default"&&{color:e.vars?`rgba(${e.vars.palette[a.color].contrastTextChannel} / 0.7)`:H(e.palette[a.color].contrastText,.7),"&:hover, &:active":{color:(e.vars||e).palette[a.color].contrastText}})},a.size==="small"&&{height:24},a.color!=="default"&&{backgroundColor:(e.vars||e).palette[a.color].main,color:(e.vars||e).palette[a.color].contrastText},a.onDelete&&{[`&.${u.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:H(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},a.onDelete&&a.color!=="default"&&{[`&.${u.focusVisible}`]:{backgroundColor:(e.vars||e).palette[a.color].dark}})},({theme:e,ownerState:a})=>m({},a.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:H(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)},[`&.${u.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:H(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)},"&:active":{boxShadow:(e.vars||e).shadows[1]}},a.clickable&&a.color!=="default"&&{[`&:hover, &.${u.focusVisible}`]:{backgroundColor:(e.vars||e).palette[a.color].dark}}),({theme:e,ownerState:a})=>m({},a.variant==="outlined"&&{backgroundColor:"transparent",border:e.vars?`1px solid ${e.vars.palette.Chip.defaultBorder}`:`1px solid ${e.palette.mode==="light"?e.palette.grey[400]:e.palette.grey[700]}`,[`&.${u.clickable}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${u.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`& .${u.avatar}`]:{marginLeft:4},[`& .${u.avatarSmall}`]:{marginLeft:2},[`& .${u.icon}`]:{marginLeft:4},[`& .${u.iconSmall}`]:{marginLeft:2},[`& .${u.deleteIcon}`]:{marginRight:5},[`& .${u.deleteIconSmall}`]:{marginRight:3}},a.variant==="outlined"&&a.color!=="default"&&{color:(e.vars||e).palette[a.color].main,border:`1px solid ${e.vars?`rgba(${e.vars.palette[a.color].mainChannel} / 0.7)`:H(e.palette[a.color].main,.7)}`,[`&.${u.clickable}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[a.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:H(e.palette[a.color].main,e.palette.action.hoverOpacity)},[`&.${u.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[a.color].mainChannel} / ${e.vars.palette.action.focusOpacity})`:H(e.palette[a.color].main,e.palette.action.focusOpacity)},[`& .${u.deleteIcon}`]:{color:e.vars?`rgba(${e.vars.palette[a.color].mainChannel} / 0.7)`:H(e.palette[a.color].main,.7),"&:hover, &:active":{color:(e.vars||e).palette[a.color].main}}})),Go=j("span",{name:"MuiChip",slot:"Label",overridesResolver:(e,a)=>{const{ownerState:p}=e,{size:c}=p;return[a.label,a[`label${g(c)}`]]}})(({ownerState:e})=>m({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},e.variant==="outlined"&&{paddingLeft:11,paddingRight:11},e.size==="small"&&{paddingLeft:8,paddingRight:8},e.size==="small"&&e.variant==="outlined"&&{paddingLeft:7,paddingRight:7}));function vo(e){return e.key==="Backspace"||e.key==="Delete"}const qo=C.forwardRef(function(a,p){const c=Oo({props:a,name:"MuiChip"}),{avatar:$,className:P,clickable:y,color:d="default",component:k,deleteIcon:D,disabled:A=!1,icon:M,label:se,onClick:N,onDelete:W,onKeyDown:xe,onKeyUp:Ae,size:ce="medium",variant:Y="filled",tabIndex:G,skipFocusWhenDisabled:Te=!1}=c,me=je(c,Bo),ae=C.useRef(null),Z=Po(ae,p),Se=L=>{L.stopPropagation(),W&&W(L)},De=L=>{L.currentTarget===L.target&&vo(L)&&L.preventDefault(),xe&&xe(L)},he=L=>{L.currentTarget===L.target&&(W&&vo(L)?W(L):L.key==="Escape"&&ae.current&&ae.current.blur()),Ae&&Ae(L)},ee=y!==!1&&N?!0:y,f=ee||W?bo:k||"div",le=m({},c,{component:f,disabled:A,size:ce,color:d,iconColor:C.isValidElement(M)&&M.props.color||d,onDelete:!!W,clickable:ee,variant:Y}),_=Ko(le),ve=f===bo?m({component:k||"div",focusVisibleClassName:_.focusVisible},W&&{disableRipple:!0}):{};let B=null;W&&(B=D&&C.isValidElement(D)?C.cloneElement(D,{className:X(D.props.className,_.deleteIcon),onClick:Se}):I.jsx(Wo,{className:X(_.deleteIcon),onClick:Se}));let pe=null;$&&C.isValidElement($)&&(pe=C.cloneElement($,{className:X(_.avatar,$.props.className)}));let Ne=null;return M&&C.isValidElement(M)&&(Ne=C.cloneElement(M,{className:X(_.icon,M.props.className)})),I.jsxs(Uo,m({as:f,className:X(_.root,P),disabled:ee&&A?!0:void 0,onClick:N,onKeyDown:De,onKeyUp:he,ref:Z,tabIndex:Te&&A?-1:G,ownerState:le},ve,me,{children:[pe||Ne,I.jsx(Go,{className:X(_.label),ownerState:le,children:se}),B]}))});function Jo(e){return Io("MuiAutocomplete",e)}const s=yo("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]);var Co,$o;const Qo=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionKey","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],Xo=["ref"],Yo=["key"],Zo=["key"],et=e=>{const{classes:a,disablePortal:p,expanded:c,focused:$,fullWidth:P,hasClearIcon:y,hasPopupIcon:d,inputFocused:k,popupOpen:D,size:A}=e,M={root:["root",c&&"expanded",$&&"focused",P&&"fullWidth",y&&"hasClearIcon",d&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",k&&"inputFocused"],tag:["tag",`tagSize${g(A)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",D&&"popupIndicatorOpen"],popper:["popper",p&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return ko(M,Jo,a)},ot=j("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:p}=e,{fullWidth:c,hasClearIcon:$,hasPopupIcon:P,inputFocused:y,size:d}=p;return[{[`& .${s.tag}`]:a.tag},{[`& .${s.tag}`]:a[`tagSize${g(d)}`]},{[`& .${s.inputRoot}`]:a.inputRoot},{[`& .${s.input}`]:a.input},{[`& .${s.input}`]:y&&a.inputFocused},a.root,c&&a.fullWidth,P&&a.hasPopupIcon,$&&a.hasClearIcon]}})({[`&.${s.focused} .${s.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${s.clearIndicator}`]:{visibility:"visible"}},[`& .${s.tag}`]:{margin:3,maxWidth:"calc(100% - 6px)"},[`& .${s.inputRoot}`]:{[`.${s.hasPopupIcon}&, .${s.hasClearIcon}&`]:{paddingRight:30},[`.${s.hasPopupIcon}.${s.hasClearIcon}&`]:{paddingRight:56},[`& .${s.input}`]:{width:0,minWidth:30}},[`& .${po.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${po.root}.${be.sizeSmall}`]:{[`& .${po.input}`]:{padding:"2px 4px 3px 0"}},[`& .${xo.root}`]:{padding:9,[`.${s.hasPopupIcon}&, .${s.hasClearIcon}&`]:{paddingRight:39},[`.${s.hasPopupIcon}.${s.hasClearIcon}&`]:{paddingRight:65},[`& .${s.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${s.endAdornment}`]:{right:9}},[`& .${xo.root}.${be.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${s.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${Re.root}`]:{paddingTop:19,paddingLeft:8,[`.${s.hasPopupIcon}&, .${s.hasClearIcon}&`]:{paddingRight:39},[`.${s.hasPopupIcon}.${s.hasClearIcon}&`]:{paddingRight:65},[`& .${Re.input}`]:{padding:"7px 4px"},[`& .${s.endAdornment}`]:{right:9}},[`& .${Re.root}.${be.sizeSmall}`]:{paddingBottom:1,[`& .${Re.input}`]:{padding:"2.5px 4px"}},[`& .${be.hiddenLabel}`]:{paddingTop:8},[`& .${Re.root}.${be.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${s.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${Re.root}.${be.hiddenLabel}.${be.sizeSmall}`]:{[`& .${s.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${s.input}`]:{flexGrow:1,textOverflow:"ellipsis",opacity:0},variants:[{props:{fullWidth:!0},style:{width:"100%"}},{props:{size:"small"},style:{[`& .${s.tag}`]:{margin:2,maxWidth:"calc(100% - 4px)"}}},{props:{inputFocused:!0},style:{[`& .${s.input}`]:{opacity:1}}},{props:{multiple:!0},style:{[`& .${s.inputRoot}`]:{flexWrap:"wrap"}}}]}),tt=j("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(e,a)=>a.endAdornment})({position:"absolute",right:0,top:"50%",transform:"translate(0, -50%)"}),at=j(Ao,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(e,a)=>a.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),lt=j(Ao,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:e},a)=>m({},a.popupIndicator,e.popupOpen&&a.popupIndicatorOpen)})({padding:2,marginRight:-2,variants:[{props:{popupOpen:!0},style:{transform:"rotate(180deg)"}}]}),nt=j(Ro,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(e,a)=>{const{ownerState:p}=e;return[{[`& .${s.option}`]:a.option},a.popper,p.disablePortal&&a.popperDisablePortal]}})(({theme:e})=>({zIndex:(e.vars||e).zIndex.modal,variants:[{props:{disablePortal:!0},style:{position:"absolute"}}]})),rt=j(Lo,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(e,a)=>a.paper})(({theme:e})=>m({},e.typography.body1,{overflow:"auto"})),it=j("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(e,a)=>a.loading})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),st=j("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(e,a)=>a.noOptions})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),ct=j("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(e,a)=>a.listbox})(({theme:e})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${s.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[e.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${s.focused}`]:{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${s.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:H(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${s.focused}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:H(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(e.vars||e).palette.action.selected}},[`&.${s.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:H(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}}}})),pt=j(Eo,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(e,a)=>a.groupLabel})(({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,top:-8})),ut=j("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(e,a)=>a.groupUl})({padding:0,[`& .${s.option}`]:{paddingLeft:24}}),ft=C.forwardRef(function(a,p){var c,$,P,y;const d=Oo({props:a,name:"MuiAutocomplete"}),{autoComplete:k=!1,autoHighlight:D=!1,autoSelect:A=!1,blurOnSelect:M=!1,ChipProps:se,className:N,clearIcon:W=Co||(Co=I.jsx(zo,{fontSize:"small"})),clearOnBlur:xe=!d.freeSolo,clearOnEscape:Ae=!1,clearText:ce="Clear",closeText:Y="Close",componentsProps:G={},defaultValue:Te=d.multiple?[]:null,disableClearable:me=!1,disableCloseOnSelect:ae=!1,disabled:Z=!1,disabledItemsFocusable:Se=!1,disableListWrap:De=!1,disablePortal:he=!1,filterSelectedOptions:ee=!1,forcePopupIcon:f="auto",freeSolo:le=!1,fullWidth:_=!1,getLimitTagsText:ve=l=>`+${l}`,getOptionLabel:B,groupBy:pe,handleHomeEndKeys:Ne=!d.freeSolo,includeInputInList:L=!1,limitTags:ze=-1,ListboxComponent:ue="ul",ListboxProps:Me,loading:We=!1,loadingText:V="Loading…",multiple:z=!1,noOptionsText:Ee="No options",openOnFocus:_e=!1,openText:O="Open",PaperComponent:w=Lo,PopperComponent:Ce=Ro,popupIcon:to=$o||($o=I.jsx(Mo,{})),readOnly:E=!1,renderGroup:Fe,renderInput:Be,renderOption:T,renderTags:r,selectOnFocus:uo=!d.freeSolo,size:b="medium",slotProps:ne={}}=d,$e=je(d,Qo),{getRootProps:Ke,getInputProps:de,getInputLabelProps:ie,getPopupIndicatorProps:Ue,getClearProps:ao,getTagProps:Ge,getListboxProps:qe,getOptionProps:F,value:h,dirty:q,expanded:Ve,id:Ie,popupOpen:ye,focused:oe,focusedTag:J,anchorEl:Oe,setAnchorEl:we,inputValue:lo,groupedOptions:K}=jo(m({},d,{componentName:"Autocomplete"})),re=!me&&!Z&&q&&!E,te=(!le||f===!0)&&f!==!1,{onMouseDown:Pe}=de(),{ref:fe}=Me??{},Je=qe(),{ref:Qe}=Je,Xe=je(Je,Xo),no=Po(Qe,fe),ke=B||(l=>{var i;return(i=l.label)!=null?i:l}),S=m({},d,{disablePortal:he,expanded:Ve,focused:oe,fullWidth:_,getOptionLabel:ke,hasClearIcon:re,hasPopupIcon:te,inputFocused:J===-1,popupOpen:ye,size:b}),R=et(S);let Q;if(z&&h.length>0){const l=i=>m({className:R.tag,disabled:Z},Ge(i));r?Q=r(h,l,S):Q=h.map((i,x)=>{const v=l({index:x}),{key:U}=v,Ze=je(v,Yo);return I.jsx(qo,m({label:ke(i),size:b},Ze,se),U)})}if(ze>-1&&Array.isArray(Q)){const l=Q.length-ze;!oe&&l>0&&(Q=Q.splice(0,ze),Q.push(I.jsx("span",{className:R.tag,children:ve(l)},Q.length)))}const ro=Fe||(l=>I.jsxs("li",{children:[I.jsx(pt,{className:R.groupLabel,ownerState:S,component:"div",children:l.group}),I.jsx(ut,{className:R.groupUl,ownerState:S,children:l.children})]},l.key)),so=T||((l,i)=>{const{key:x}=l,v=je(l,Zo);return I.jsx("li",m({},v,{children:ke(i)}),x)}),Ye=(l,i)=>{const x=F({option:l,index:i});return so(m({},x,{className:R.option}),l,{selected:x["aria-selected"],index:i,inputValue:lo},S)},He=(c=ne.clearIndicator)!=null?c:G.clearIndicator,ge=($=ne.paper)!=null?$:G.paper,Le=(P=ne.popper)!=null?P:G.popper,t=(y=ne.popupIndicator)!=null?y:G.popupIndicator,o=l=>I.jsx(nt,m({as:Ce,disablePortal:he,style:{width:Oe?Oe.clientWidth:null},ownerState:S,role:"presentation",anchorEl:Oe,open:ye},Le,{className:X(R.popper,Le==null?void 0:Le.className),children:I.jsx(rt,m({ownerState:S,as:w},ge,{className:X(R.paper,ge==null?void 0:ge.className),children:l}))}));let n=null;return K.length>0?n=o(I.jsx(ct,m({as:ue,className:R.listbox,ownerState:S},Xe,Me,{ref:no,children:K.map((l,i)=>pe?ro({key:l.key,group:l.group,children:l.options.map((x,v)=>Ye(x,l.index+v))}):Ye(l,i))}))):We&&K.length===0?n=o(I.jsx(it,{className:R.loading,ownerState:S,children:V})):K.length===0&&!le&&!We&&(n=o(I.jsx(st,{className:R.noOptions,ownerState:S,role:"presentation",onMouseDown:l=>{l.preventDefault()},children:Ee}))),I.jsxs(C.Fragment,{children:[I.jsx(ot,m({ref:p,className:X(R.root,N),ownerState:S},Ke($e),{children:Be({id:Ie,disabled:Z,fullWidth:!0,size:b==="small"?"small":void 0,InputLabelProps:ie(),InputProps:m({ref:we,className:R.inputRoot,startAdornment:Q,onClick:l=>{l.target===l.currentTarget&&Pe(l)}},(re||te)&&{endAdornment:I.jsxs(tt,{className:R.endAdornment,ownerState:S,children:[re?I.jsx(at,m({},ao(),{"aria-label":ce,title:ce,ownerState:S},He,{className:X(R.clearIndicator,He==null?void 0:He.className),children:W})):null,te?I.jsx(lt,m({},Ue(),{disabled:Z,"aria-label":ye?Y:O,title:ye?Y:O,ownerState:S},t,{className:X(R.popupIndicator,t==null?void 0:t.className),children:to})):null]})}),inputProps:m({className:R.input,disabled:Z,readOnly:E},de())})})),Oe?n:null]})});export{ft as A,s as a};
