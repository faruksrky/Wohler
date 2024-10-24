import{K as _,af as oe,ag as re,r as d,ah as ce,ai as ue,_ as de,j as t,N as me,aj as pe,O as fe,a4 as ge,E as be,J as xe,u as ye,b as he,B as Se,I as $e,c as ve,d as Ge,q as Ne}from"./index-B-3kSAm5.js";import{n as je,z as N,i as ke,u as Oe,t as we,a as _e,F as j,L as Ee}from"./form-provider-BgBmkDiz.js";import{s as Ce,a as Pe,S as Te,M as qe}from"./Snackbar-nOJ019OU.js";import{a as Be}from"./new-password-icon-KCEoU_5D.js";const Me=(e,s)=>e.filter(n=>s.includes(n)),k=(e,s,n)=>{const i=e.keys[0];Array.isArray(s)?s.forEach((l,a)=>{n((o,u)=>{a<=e.keys.length-1&&(a===0?Object.assign(o,u):o[e.up(e.keys[a])]=u)},l)}):s&&typeof s=="object"?(Object.keys(s).length>e.keys.length?e.keys:Me(e.keys,Object.keys(s))).forEach(a=>{if(e.keys.indexOf(a)!==-1){const o=s[a];o!==void 0&&n((u,f)=>{i===a?Object.assign(u,f):u[e.up(a)]=f},o)}}):(typeof s=="number"||typeof s=="string")&&n((l,a)=>{Object.assign(l,a)},s)};function p(e){return e?`Level${e}`:""}function E(e){return e.unstable_level>0&&e.container}function F(e){return function(n){return`var(--Grid-${n}Spacing${p(e.unstable_level)})`}}function M(e){return function(n){return e.unstable_level===0?`var(--Grid-${n}Spacing)`:`var(--Grid-${n}Spacing${p(e.unstable_level-1)})`}}function z(e){return e.unstable_level===0?"var(--Grid-columns)":`var(--Grid-columns${p(e.unstable_level-1)})`}const ze=({theme:e,ownerState:s})=>{const n=F(s),i={};return k(e.breakpoints,s.gridSize,(l,a)=>{let o={};a===!0&&(o={flexBasis:0,flexGrow:1,maxWidth:"100%"}),a==="auto"&&(o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}),typeof a=="number"&&(o={flexGrow:0,flexBasis:"auto",width:`calc(100% * ${a} / ${z(s)}${E(s)?` + ${n("column")}`:""})`}),l(i,o)}),i},Ae=({theme:e,ownerState:s})=>{const n={};return k(e.breakpoints,s.gridOffset,(i,l)=>{let a={};l==="auto"&&(a={marginLeft:"auto"}),typeof l=="number"&&(a={marginLeft:l===0?"0px":`calc(100% * ${l} / ${z(s)})`}),i(n,a)}),n},De=({theme:e,ownerState:s})=>{if(!s.container)return{};const n=E(s)?{[`--Grid-columns${p(s.unstable_level)}`]:z(s)}:{"--Grid-columns":12};return k(e.breakpoints,s.columns,(i,l)=>{i(n,{[`--Grid-columns${p(s.unstable_level)}`]:l})}),n},Re=({theme:e,ownerState:s})=>{if(!s.container)return{};const n=M(s),i=E(s)?{[`--Grid-rowSpacing${p(s.unstable_level)}`]:n("row")}:{};return k(e.breakpoints,s.rowSpacing,(l,a)=>{var o;l(i,{[`--Grid-rowSpacing${p(s.unstable_level)}`]:typeof a=="string"?a:(o=e.spacing)==null?void 0:o.call(e,a)})}),i},Ke=({theme:e,ownerState:s})=>{if(!s.container)return{};const n=M(s),i=E(s)?{[`--Grid-columnSpacing${p(s.unstable_level)}`]:n("column")}:{};return k(e.breakpoints,s.columnSpacing,(l,a)=>{var o;l(i,{[`--Grid-columnSpacing${p(s.unstable_level)}`]:typeof a=="string"?a:(o=e.spacing)==null?void 0:o.call(e,a)})}),i},Le=({theme:e,ownerState:s})=>{if(!s.container)return{};const n={};return k(e.breakpoints,s.direction,(i,l)=>{i(n,{flexDirection:l})}),n},Ie=({ownerState:e})=>{const s=F(e),n=M(e);return _({minWidth:0,boxSizing:"border-box"},e.container&&_({display:"flex",flexWrap:"wrap"},e.wrap&&e.wrap!=="wrap"&&{flexWrap:e.wrap},{margin:`calc(${s("row")} / -2) calc(${s("column")} / -2)`},e.disableEqualOverflow&&{margin:`calc(${s("row")} * -1) 0px 0px calc(${s("column")} * -1)`}),(!e.container||E(e))&&_({padding:`calc(${n("row")} / 2) calc(${n("column")} / 2)`},(e.disableEqualOverflow||e.parentDisableEqualOverflow)&&{padding:`${n("row")} 0px 0px ${n("column")}`}))},Fe=e=>{const s=[];return Object.entries(e).forEach(([n,i])=>{i!==!1&&i!==void 0&&s.push(`grid-${n}-${String(i)}`)}),s},We=(e,s="xs")=>{function n(i){return i===void 0?!1:typeof i=="string"&&!Number.isNaN(Number(i))||typeof i=="number"&&i>0}if(n(e))return[`spacing-${s}-${String(e)}`];if(typeof e=="object"&&!Array.isArray(e)){const i=[];return Object.entries(e).forEach(([l,a])=>{n(a)&&i.push(`spacing-${l}-${String(a)}`)}),i}return[]},Ve=e=>e===void 0?[]:typeof e=="object"?Object.entries(e).map(([s,n])=>`direction-${s}-${n}`):[`direction-xs-${String(e)}`],He=["className","children","columns","container","component","direction","wrap","spacing","rowSpacing","columnSpacing","disableEqualOverflow","unstable_level"],Je=oe(),Qe=re("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,s)=>s.root});function Xe(e){return pe({props:e,name:"MuiGrid",defaultTheme:Je})}function Ye(e={}){const{createStyledComponent:s=Qe,useThemeProps:n=Xe,componentName:i="MuiGrid"}=e,l=d.createContext(void 0),a=(f,r)=>{const{container:h,direction:S,spacing:O,wrap:g,gridSize:$}=f,x={root:["root",h&&"container",g!=="wrap"&&`wrap-xs-${String(g)}`,...Ve(S),...Fe($),...h?We(O,r.breakpoints.keys[0]):[]]};return fe(x,v=>ge(i,v),{})},o=s(De,Ke,Re,ze,Le,Ie,Ae),u=d.forwardRef(function(r,h){var S,O,g,$,x,v,m,b;const P=ce(),W=n(r),T=ue(W),C=d.useContext(l),{className:V,children:H,columns:J=12,container:Q=!1,component:X="div",direction:Y="row",wrap:Z="wrap",spacing:q=0,rowSpacing:U=q,columnSpacing:ee=q,disableEqualOverflow:A,unstable_level:y=0}=T,se=de(T,He);let w=A;y&&A!==void 0&&(w=r.disableEqualOverflow);const D={},R={},K={};Object.entries(se).forEach(([c,G])=>{P.breakpoints.values[c]!==void 0?D[c]=G:P.breakpoints.values[c.replace("Offset","")]!==void 0?R[c.replace("Offset","")]=G:K[c]=G});const ne=(S=r.columns)!=null?S:y?void 0:J,ae=(O=r.spacing)!=null?O:y?void 0:q,ie=(g=($=r.rowSpacing)!=null?$:r.spacing)!=null?g:y?void 0:U,le=(x=(v=r.columnSpacing)!=null?v:r.spacing)!=null?x:y?void 0:ee,L=_({},T,{level:y,columns:ne,container:Q,direction:Y,wrap:Z,spacing:ae,rowSpacing:ie,columnSpacing:le,gridSize:D,gridOffset:R,disableEqualOverflow:(m=(b=w)!=null?b:C)!=null?m:!1,parentDisableEqualOverflow:C}),te=a(L,P);let B=t.jsx(o,_({ref:h,as:X,ownerState:L,className:me(te.root,V)},K,{children:d.Children.map(H,c=>{if(d.isValidElement(c)&&je(c,["Grid"])){var G;return d.cloneElement(c,{unstable_level:(G=c.props.unstable_level)!=null?G:y+1})}return c})}));return w!==void 0&&w!==(C??!1)&&(B=t.jsx(l.Provider,{value:w,children:B})),B});return u.muiName="Grid",u}const I=Ye({createStyledComponent:be("div",{name:"MuiGrid2",slot:"Root",overridesResolver:(e,s)=>s.root}),componentName:"MuiGrid2",useThemeProps:e=>xe({props:e,name:"MuiGrid2"})}),Ze=N.object({userName:N.string().min(1,{message:"Kullanıcı adı bilgisi gereklidir!"}),firstName:N.string().min(1,{message:"Ad bilgisi gereklidir!"}),lastName:N.string().min(1,{message:"Soyad bilgisi gereklidir!"}),email:N.string().min(1,{message:"Email bilgisi gereklidir!"}).email({message:"Geçerli bir mail adresi girilmelidir!"}),phoneNumber:Ce.phoneNumber({isValidPhoneNumber:ke}),password:N.string().min(6,{message:"Şifre en az 6 karakter uzunluğunda olmalıdır!"})});function as({currentUser:e}){ye();const[s,n]=d.useState(!1),[i,l]=d.useState(""),[a,o]=d.useState("success"),u=d.useMemo(()=>({firstName:(e==null?void 0:e.firstName)||"",lastName:(e==null?void 0:e.lastName)||"",email:(e==null?void 0:e.email)||"",phoneNumber:(e==null?void 0:e.phoneNumber)||"",password:(e==null?void 0:e.password)||"",userName:(e==null?void 0:e.userName)||""}),[e]),f=Oe({mode:"onSubmit",resolver:we(Ze),defaultValues:u}),r=he(),{reset:h,watch:S,control:O,handleSubmit:g,formState:{isSubmitting:$}}=f;S();const x=(m,b)=>{b!=="clickaway"&&n(!1)},v=g(async m=>{try{await Be({userName:m.email,email:m.email,password:m.password,firstName:m.firstName,lastName:m.lastName}),l("Kullanıcı başarıyla kaydedildi."),o("success"),n(!0),h()}catch(b){console.log("error",b),b.response&&b.response.status===409?l("Bu e-posta adresi veya kullanıcı adı zaten kullanımda."):l("Kullanıcı kaydedilemedi, lütfen tekrar deneyin."),o("error"),n(!0)}});return t.jsxs(t.Fragment,{children:[t.jsx(_e,{methods:f,onSubmit:g(v),children:t.jsx(I,{container:!0,spacing:3,children:t.jsx(I,{xs:12,md:5,children:t.jsxs(Pe,{sx:{p:3},children:[t.jsxs(Se,{rowGap:3,columnGap:2,display:"grid",gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(1, 1fr)"},children:[t.jsx(j.Text,{name:"userName",label:"Kullanıcı Adı"}),t.jsx(j.Text,{name:"firstName",label:"Ad"}),t.jsx(j.Text,{name:"lastName",label:"Soyad"}),t.jsx(j.Text,{name:"email",label:"Email"}),t.jsx(j.Phone,{name:"phoneNumber",label:"Telefon"}),t.jsx(j.Text,{name:"password",label:"Şifre",placeholder:"6+ karakter",type:r.value?"text":"password",InputLabelProps:{shrink:!0},InputProps:{endAdornment:t.jsx($e,{position:"end",children:t.jsx(ve,{onClick:r.onToggle,edge:"end",children:t.jsx(Ge,{icon:r.value?"solar:eye-bold":"solar:eye-closed-bold"})})})}})]}),t.jsx(Ne,{alignItems:"flex-end",sx:{mt:1},children:t.jsx(Ee,{type:"submit",variant:"contained",loading:$,children:e?"Değişiklikleri Kaydet":"Kullanıcı Oluştur"})})]})})})}),t.jsx(Te,{open:s,autoHideDuration:6e3,onClose:x,children:t.jsx(qe,{onClose:x,severity:a,sx:{width:"100%"},children:i})})]})}export{as as U};