(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9927],{4050:e=>{e.exports={code:"RevealSnippet_code__Mytgz",wrap:"RevealSnippet_wrap__jnUv1",reveal:"RevealSnippet_reveal__wVsfY"}},27458:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=new Set(["line","stacked_bar","table","number","pie","bar"]);function i(e){let r=function(e){let r,t=e[0],i=1;for(;i<e.length;){let o=e[i],a=e[i+1];if(i+=2,("optionalAccess"===o||"optionalCall"===o)&&null==t)return;"access"===o||"optionalAccess"===o?(r=t,t=a(t)):("call"===o||"optionalCall"===o)&&(t=a((...e)=>t.call(r,...e)),r=void 0)}return t}([e,"optionalAccess",e=>e.config]);if(null==r||"object"!=typeof r)return!1;let i="configType"in r?r.configType:void 0,o="displayType"in r?r.displayType:void 0;return"promql"===i||null==o||"sql"===i&&"string"==typeof o&&!t.has(o)}r.a=function(e){return"saved_search"===e.source||null==e.source&&!!e.savedSearchId},r.b=i,r.c=function(e){return(Array.isArray(e)?e:[]).some(i)},r.d=function(e){return!e.provisioned&&!e.unexportableTiles},r.e=function(e){return"promql"!==e.kind}},60478:(e,r,t)=>{"use strict";t.d(r,{h:()=>_});var i=t(6029),o=t(75155),a=t(55729),n=t(70770),l=t(17183),s=t(56562),c=t(5177),d=t(30682),u=t(59029),p=t(33193),h=t(12060),f=t(90515),m=t(45172),v=t(4050),y=t.n(v);let b=(0,a.createContext)(null),k=[];function g(e){let r=(0,a.use)(b);if(!r)throw Error(`${e} must be used within <RevealSnippet>`);return r}function x(e){if("string"==typeof e){let r,t,i;return e?[e,(r=Math.min(4,Math.floor(e.length/2)),t=e.slice(0,r),i=Math.max(0,e.length-t.length),`${t}${"•".repeat(i)}`)]:null}return Array.isArray(e)&&e[0]?e:null}function _(e){let r,t,n,l,s,c=(0,o.c)(16),{value:d,secrets:u,canReveal:p,children:h}=e,[f,m]=(0,a.useState)(!1),[v,y]=(0,a.useState)(d);d!==v&&(y(d),m(!1));e:{let e;if(!u){r=k;break e}c[0]!==u?(e=u.map(x).filter(w),c[0]=u,c[1]=e):e=c[1],r=e}let g=r;if(c[2]!==g||c[3]!==d)t=[...g].sort((e,r)=>r[0].length-e[0].length).reduce((e,[r,t])=>e.split(r).join(t),d),c[2]=g,c[3]=d,c[4]=t;else t=c[4];let _=t,C=g.length>0,A=(void 0===p||p)&&C,$=A&&f;c[5]!==A?(n=A?()=>m(j):null,c[5]=A,c[6]=n):n=c[6],c[7]!==C||c[8]!==_||c[9]!==$||c[10]!==n||c[11]!==d?(l={realText:d,redactedText:_,revealed:$,toggle:n,hasSecrets:C},c[7]=C,c[8]=_,c[9]=$,c[10]=n,c[11]=d,c[12]=l):l=c[12];let S=l;return c[13]!==h||c[14]!==S?(s=(0,i.jsx)(b,{value:S,children:h}),c[13]=h,c[14]=S,c[15]=s):s=c[15],s}function j(e){return!e}function w(e){return null!==e}_.Reveal=function(e){let r,t,a=(0,o.c)(13),{showLabel:l,hideLabel:s,children:c}=e,{revealed:d,toggle:u}=g("RevealSnippet.Reveal");if(!u)return null;let f=d?void 0===s?"Hide key":s:void 0===l?"Reveal key":l;if(c){let e,r;return a[0]!==c||a[1]!==f||a[2]!==d||a[3]!==u?(e=c({revealed:d,toggle:u,label:f}),a[0]=c,a[1]=f,a[2]=d,a[3]=u,a[4]=e):e=a[4],a[5]!==e?(r=(0,i.jsx)(i.Fragment,{children:e}),a[5]=e,a[6]=r):r=a[6],r}return a[7]!==d?(r=d?(0,i.jsx)(p.A,{size:14}):(0,i.jsx)(h.A,{size:14}),a[7]=d,a[8]=r):r=a[8],a[9]!==f||a[10]!==r||a[11]!==u?(t=(0,i.jsx)(n.$,{onClick:u,variant:"subtle",color:"gray",c:"inherit",size:"xs",className:y().reveal,"aria-label":f,leftSection:r,children:f}),a[9]=f,a[10]=r,a[11]=u,a[12]=t):t=a[12],t},_.Code=function(e){let r,t=(0,o.c)(3),{wrap:a}=e,{realText:n,redactedText:l,revealed:s}=g("RevealSnippet.Code"),c=void 0===a||a?`${y().code} ${y().wrap}`:y().code,d=s?n:l;return t[0]!==c||t[1]!==d?(r=(0,i.jsx)("pre",{className:c,"data-testid":"reveal-snippet-code",children:d}),t[0]=c,t[1]=d,t[2]=r):r=t[2],r},_.Input=function(e){let r,t,a,n,v,y,b=(0,o.c)(19),{"aria-label":k,revealLabel:x,copyLabel:_,"data-testid":j}=e,w=void 0===x?"Reveal value":x,C=void 0===_?"Copy":_,{realText:A,redactedText:$,revealed:S,toggle:T}=g("RevealSnippet.Input"),R=S?A:$;b[0]===Symbol.for("react.memo_cache_sentinel")?(r={input:{fontFamily:"var(--mantine-font-family-monospace)"}},b[0]=r):r=b[0];let I=T?64:36;return b[1]!==w||b[2]!==S||b[3]!==T?(t=T?(0,i.jsx)(l.m,{label:S?"Hide":w,children:(0,i.jsx)(s.M,{onClick:T,variant:"subtle",color:"gray","aria-label":S?"Hide value":w,children:S?(0,i.jsx)(p.A,{size:16}):(0,i.jsx)(h.A,{size:16})})}):null,b[1]=w,b[2]=S,b[3]=T,b[4]=t):t=b[4],b[5]!==C?(a=e=>{let{copied:r,copy:t}=e;return(0,i.jsx)(l.m,{label:r?"Copied":C,children:(0,i.jsx)(s.M,{onClick:t,variant:"subtle",color:"gray","aria-label":C,children:r?(0,i.jsx)(f.A,{size:16}):(0,i.jsx)(m.A,{size:16})})})},b[5]=C,b[6]=a):a=b[6],b[7]!==A||b[8]!==a?(n=(0,i.jsx)(c.i,{value:A,timeout:2e3,children:a}),b[7]=A,b[8]=a,b[9]=n):n=b[9],b[10]!==t||b[11]!==n?(v=(0,i.jsxs)(d.Y,{gap:2,wrap:"nowrap",children:[t,n]}),b[10]=t,b[11]=n,b[12]=v):v=b[12],b[13]!==k||b[14]!==j||b[15]!==R||b[16]!==I||b[17]!==v?(y=(0,i.jsx)(u.k,{readOnly:!0,value:R,"aria-label":k,"data-testid":j,styles:r,rightSectionWidth:I,rightSection:v}),b[13]=k,b[14]=j,b[15]=R,b[16]=I,b[17]=v,b[18]=y):y=b[18],y},_.Copy=function(e){let r,t,a=(0,o.c)(6),{label:d,variant:u}=e,p=void 0===d?"Copy":d,h=void 0===u?"icon":u,{realText:v}=g("RevealSnippet.Copy");return a[0]!==p||a[1]!==h?(r=e=>{let{copied:r,copy:t}=e;return"button"===h?(0,i.jsx)(n.$,{onClick:t,variant:"subtle",color:"gray",c:"inherit",size:"xs",className:y().reveal,leftSection:r?(0,i.jsx)(f.A,{size:14}):(0,i.jsx)(m.A,{size:14}),children:r?"Copied":p}):(0,i.jsx)(l.m,{label:r?"Copied":p,children:(0,i.jsx)(s.M,{onClick:t,variant:"subtle",color:"gray","aria-label":p,children:r?(0,i.jsx)(f.A,{size:16}):(0,i.jsx)(m.A,{size:16})})})},a[0]=p,a[1]=h,a[2]=r):r=a[2],a[3]!==v||a[4]!==r?(t=(0,i.jsx)(c.i,{value:v,timeout:2e3,children:r}),a[3]=v,a[4]=r,a[5]=t):t=a[5],t}},63585:(e,r,t)=>{"use strict";t.d(r,{X:()=>f});var i=t(6029),o=t(75155),a=t(96804),n=t(30682),l=t(18430),s=t(93747),c=t(5177),d=t(70770),u=t(90515),p=t(45172),h=t(60478);function f(e){let r,t,d,u,p=(0,o.c)(22),{label:f,snippet:v,accessKey:y}=e;if(y){let e,r,t,o,s,c,d;return p[0]!==y?(e=[y],p[0]=y,p[1]=e):e=p[1],p[2]!==f?(r=f?(0,i.jsx)(a.E,{size:"sm",fw:500,children:f}):(0,i.jsx)("span",{}),p[2]=f,p[3]=r):r=p[3],p[4]===Symbol.for("react.memo_cache_sentinel")?(t=(0,i.jsxs)(n.Y,{gap:"xs",wrap:"nowrap",children:[(0,i.jsx)(h.h.Reveal,{}),(0,i.jsx)(h.h.Copy,{variant:"button"})]}),p[4]=t):t=p[4],p[5]!==r?(o=(0,i.jsxs)(n.Y,{justify:"space-between",align:"center",wrap:"nowrap",children:[r,t]}),p[5]=r,p[6]=o):o=p[6],p[7]===Symbol.for("react.memo_cache_sentinel")?(s=(0,i.jsx)(h.h.Code,{}),p[7]=s):s=p[7],p[8]!==o?(c=(0,i.jsxs)(l.B,{gap:"xs",children:[o,s]}),p[8]=o,p[9]=c):c=p[9],p[10]!==v||p[11]!==e||p[12]!==c?(d=(0,i.jsx)(h.h,{value:v,secrets:e,children:c}),p[10]=v,p[11]=e,p[12]=c,p[13]=d):d=p[13],d}return p[14]!==f?(r=f?(0,i.jsx)(a.E,{size:"sm",fw:500,children:f}):null,p[14]=f,p[15]=r):r=p[15],p[16]===Symbol.for("react.memo_cache_sentinel")?(t={whiteSpace:"pre-wrap",wordBreak:"break-all",fontFamily:"var(--mantine-font-family-monospace)"},p[16]=t):t=p[16],p[17]!==v?(d=(0,i.jsxs)(n.Y,{align:"flex-start",w:"100%",gap:"xs",children:[(0,i.jsx)(s.C,{block:!0,flex:1,style:t,children:v}),(0,i.jsx)(c.i,{value:v,children:m})]}),p[17]=v,p[18]=d):d=p[18],p[19]!==r||p[20]!==d?(u=(0,i.jsxs)(l.B,{gap:"xs",children:[r,d]}),p[19]=r,p[20]=d,p[21]=u):u=p[21],u}function m(e){let{copied:r,copy:t}=e;return(0,i.jsx)(d.$,{onClick:t,variant:"subtle",size:"xs",leftSection:r?(0,i.jsx)(u.A,{size:14}):(0,i.jsx)(p.A,{size:14}),children:r?"Copied":"Copy"})}},82599:(e,r,t)=>{"use strict";var i=t(27458);t(53190);var o=r.e8=1e3,a={dashboard:"clickhouse_clickstack_dashboard",alert:"clickhouse_clickstack_alert",saved_search:"clickhouse_clickstack_saved_search",source:"clickhouse_clickstack_source",connection:"clickhouse_clickstack_connection",webhook:"clickhouse_clickstack_webhook"};function n({type:e,id:r}){return`${e}_${r.toLowerCase().replace(/[^a-z0-9]/g,"")}`}function l(e){let r=function(e){let r,t=e[0],i=1;for(;i<e.length;){let o=e[i],a=e[i+1];if(i+=2,("optionalAccess"===o||"optionalCall"===o)&&null==t)return;"access"===o||"optionalAccess"===o?(r=t,t=a(t)):("call"===o||"optionalCall"===o)&&(t=a((...e)=>t.call(r,...e)),r=void 0)}return t}([e,"optionalAccess",e=>e.replace,"call",e=>e(/[\s\u0000-\u001f\u007f]+/g," "),"access",e=>e.trim,"call",e=>e()]);return r?r.slice(0,120):void 0}var s=/^[0-9a-fA-F]{24}$/;function c(e,r="id"){if(!s.test(e))throw Error(`Refusing to emit Terraform for a non-ObjectId ${r}: ${e}`);return e}function d(e,r){let t=l(e.name);return`${t?`# ${t}
`:""}import {
  to = ${a[e.type]}.${n(e)}
  id = "${c(r,"team id")}/${c(e.id,"resource id")}"
}`}function u(e){return`terraform {
  required_version = ">= 1.5.0"
  required_providers {
    clickhouse = {
      source  = "ClickHouse/clickhouse"
      version = ">= 3.25.0"
    }
  }
}

variable "clickstack_endpoint" {
  description = "ClickStack API endpoint. Defaulted from the browser that generated this file \u2014 override if Terraform runs somewhere that origin does not resolve, or if your deployment is served under a path prefix."
  type        = string
  default     = "${e}"
}

provider "clickhouse" {
  clickstack_endpoint = var.clickstack_endpoint
  # Set the CLICKSTACK_API_KEY environment variable to your Personal API
  # Access Key (Team Settings -> API & Agents). Avoid committing keys.
}`}r.e8=o,r.rc=d,r.q_=function({endpoint:e,teamId:r,resources:t,connectionLocals:i=[],truncatedTypes:a=[],skipNotices:s=[]}){let p=[u(e),...i.length?[`# These connections are either platform-provisioned or of unrecorded
# provenance, so Terraform cannot manage them. Reference them by id instead.
locals {
${i.flatMap(e=>{let r=l(e.name),t=n({type:"connection",id:e.id});return[...r?[`  # ${r}`]:[],`  ${t}_id = "${c(e.id)}"`]}).join(`
`)}
}`]:[],...t.map(e=>d(e,r))],h=a.length?`#
# ! PARTIAL EXPORT. These resource types had more than ${o}
#   entries and were capped, so this file covers only the first
#   ${o} of each: ${a.join(", ")}.
#   The remainder is not in this file and re-exporting returns the same page.
`:"",f=s.length?`#
# Some resources were left out as ineligible:
${s.map(e=>`#   - ${e}`).join(`
`)}
`:"";return`# HyperDX Terraform import file
# Generated by HyperDX. Review before committing to your repository.
${h}${f}#
# 1. Place this file in your Terraform project.
#    If your project already declares the ClickHouse provider, delete the
#    "terraform" and "provider" blocks below \u2014 Terraform allows only one of
#    each per module.
# 2. export CLICKSTACK_API_KEY=<your Personal API Access Key>
# 3. terraform init          # installs the ClickHouse provider declared above
# 4. terraform plan -generate-config-out=generated.tf
# 5. Review generated.tf carefully, then: terraform apply
#
# Before you apply:
#
# * Review generated.tf against the real resource. The provider's ClickStack
#   resources are alpha and do not model every HyperDX feature \u2014 PromQL tiles
#   in particular have no representation. A dashboard's configuration is
#   written back whole, so applying a config that omits something deletes it.
# * Check the clickstack_endpoint default above. It comes from the browser that
#   generated this file, so it may not resolve from wherever Terraform runs.
# * Resource addresses below are derived from each resource's id, so they
#   survive a rename in HyperDX. The name in the comment above each block is
#   a label for humans only.
# * Import ids are "<team_id>/<resource_id>", so each imported resource gets a
#   "team" attribute. Keep it in generated.tf: the provider marks that
#   attribute RequiresReplace, so removing or changing it plans a destroy and
#   recreate rather than an update.
# * Team-scoped ids need the provider configured with clickstack_endpoint, as
#   the block below does. A provider configured against the Cloud API instead
#   (clickstack_service_id) rejects any team-scoped call \u2014 on that path a
#   service is a single ClickStack, so drop the "<team_id>/" prefix.
# * The provider version constraint below is a floor, not decoration. If you
#   delete the "terraform" block per step 1, check your own declaration
#   requires >= 3.25.0 \u2014 older providers write server-only ids into the config
#   generated for a dashboard, and applying that churns its tile ids and
#   deletes the tile alerts attached to them.
# * Re-exporting later does NOT produce an additive file. It re-emits every
#   resource, including the ones already in state, so two of these files in one
#   module means duplicate "to" addresses \u2014 which Terraform rejects for the
#   whole plan, not just the clashing blocks. Delete the previous file, or the
#   blocks for anything already imported, before adding a new one.
# * ClickStack resources in the provider are in alpha; behaviour may change
#   between provider versions.

${p.join(`

`)}
`},r.zI=u,r.vx=function(e,r){let t=[],o=0,a=0,n=0,l=(e,i)=>{if(r.includes(e))for(let r of i)t.push({type:e,id:r.id,name:r.name})};if(r.includes("source"))for(let r of e.sources){if(!i.e.call(void 0,r)){n+=1;continue}t.push({type:"source",id:r.id,name:r.name})}if(l("saved_search",e.savedSearches),l("webhook",e.webhooks),r.includes("alert"))for(let r of e.alerts){if(!i.a.call(void 0,r)){o+=1;continue}t.push({type:"alert",id:r.id,name:r.name})}if(r.includes("dashboard"))for(let r of e.dashboards){if(!i.d.call(void 0,r)){a+=1;continue}t.push({type:"dashboard",id:r.id,name:r.name})}let s=r.includes("connection"),c=[];if(s)for(let r of e.connections)!1===r.platformProvisioned?t.push({type:"connection",id:r.id,name:r.name}):c.push(r);return{resources:t,connectionLocals:c,skippedAlerts:o,skippedDashboards:a,skippedSources:n}},r.B=i.c,r.ge=i.a,r.yu=i.d,i.e,i.b,r.nh=function(e,r=""){return`${e}${r}/api`}}}]);