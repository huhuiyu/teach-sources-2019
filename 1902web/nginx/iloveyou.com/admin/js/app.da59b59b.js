(function(e){function t(t){for(var r,o,c=t[0],u=t[1],l=t[2],s=0,f=[];s<c.length;s++)o=c[s],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2d0b2168":"5afb604e","chunk-2d0c82a2":"85e97d78","chunk-2d22db0b":"210205b5","chunk-57bc33ff":"933ac636","chunk-78c9a9ce":"86fce567"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-57bc33ff":1,"chunk-78c9a9ce":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0b2168":"31d6cfe0","chunk-2d0c82a2":"31d6cfe0","chunk-2d22db0b":"31d6cfe0","chunk-57bc33ff":"a199902e","chunk-78c9a9ce":"445e922d"}[e]+".css",a=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var l=i[c],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===r||s===a))return t()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){l=f[c],s=l.getAttribute("data-href");if(s===r||s===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],d.parentNode.removeChild(d),n(i)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=c(e);var f=new Error;l=function(t){s.onerror=s.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/admin/",u.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var f=0;f<l.length;f++)t(l[f]);var d=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"38a0":function(e,t,n){},"54fb":function(e,t,n){"use strict";n("38a0")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],i=(n("54fb"),n("2877")),c={},u=Object(i["a"])(c,o,a,!1,null,"3cf2cfe0",null),l=u.exports,s=(n("99af"),n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),f=[{path:"/test",name:"Test",component:function(){return n.e("chunk-2d22db0b").then(n.bind(null,"f924"))}}],d=f,p=[{path:"/portable",name:"Portable",component:function(){return n.e("chunk-2d0c82a2").then(n.bind(null,"545b"))}},{path:"/portable/info",name:"PortableInfo",component:function(){return n.e("chunk-2d0b2168").then(n.bind(null,"232c"))}}],h=p;r["default"].use(s["a"]);var g=[{path:"/",name:"Home",component:function(){return n.e("chunk-57bc33ff").then(n.bind(null,"bb51"))}},{path:"/main",name:"Main",component:function(){return n.e("chunk-78c9a9ce").then(n.bind(null,"cd56"))}}].concat(h).concat(d),v=new s["a"]({routes:g}),m=v;r["default"].directive("focus",{inserted:function(e,t){console.debug("directive:focus-inserted==>",e,t),t.value&&e.focus()},update:function(e,t){console.debug("directive:focus-==>update",e,t),t.value&&e.focus()}});n("4de4"),n("5319"),n("ac1f"),n("466d");var b=n("8237"),y=n.n(b),k={md5:function(e){return y()(e)},formatDate:function(e,t){try{if(t=t||"yyyy-MM-dd hh:mm:ss",!isNaN(e)&&!(e instanceof Date)){var n=new Date;n.setTime(parseInt(e)),e=n}var r=e.getFullYear()+"",o=e.getMonth()+1,a=e.getDate(),i=e.getHours(),c=e.getMinutes(),u=e.getSeconds();return o=o<10?"0"+o:""+o,a=a<10?"0"+a:""+a,i=i<10?"0"+i:""+i,c=c<10?"0"+c:""+c,u=u<10?"0"+u:""+u,t=t.replace(/yyyy/g,r),t=t.replace(/MM/g,o),t=t.replace(/dd/g,a),t=t.replace(/hh/g,i),t=t.replace(/mm/g,c),t=t.replace(/ss/g,u),t}catch(l){return console.error(l),""}},isMobile:function(){return k.getBrowserInfo().versions.mobile},isIos:function(){return k.getBrowserInfo().versions.ios},isAndroid:function(){return k.getBrowserInfo().versions.android},isWx:function(){return k.getBrowserInfo().versions.weixin},getBrowserInfo:function(){var e={versions:function(){var e=navigator.userAgent;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&-1==e.indexOf("KHTML"),mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Adr")>-1,iPhone:e.indexOf("iPhone")>-1,iPad:e.indexOf("iPad")>-1,webApp:-1==e.indexOf("Safari"),weixin:e.indexOf("MicroMessenger")>-1,qq:" qq"==e.match(/\sQQ/i)}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()};return e}},w={key:"color: red",string:"color: fuchsia",number:"color: green",boolean:"color: maroon",other:"color: maroon"};k.formatJson=function(e,t){var n=JSON.stringify(e,void 0,4);return t?k.jsonSyntaxHighlight(n):n},k.jsonSyntaxHighlight=function(e){return e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e=e.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,(function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="other"),'<span style="'+w[t]+'">'+e+"</span>"})),e},k.openFile=function(e){var t=document.createElement("input");t.setAttribute("type","file"),t.addEventListener("change",(function(){t.files&&1==t.files.length?e(t.files[0]):e(null)})),t.addEventListener("cancel",(function(){e(null)})),t.click()},k.isImage=function(e){var t=e.type.substr(0,6);return"image/"==t},k.readImage=function(e,t){var n=new FileReader;n.addEventListener("error",(function(){t("")})),n.addEventListener("abort",(function(){t("")})),n.addEventListener("load",(function(e){t(e.target.result)})),n.readAsDataURL(e)};var x=k,O=n("4328"),T=n.n(O),P=n("bc3a"),E=n.n(P),S={baseUrl:"https://huhuiyu.top/teach-demo-service",tokenKey:"token",localTokeyKey:"localToken",getToken:function(){var e=localStorage.getItem(S.localTokeyKey);return e=e||"",e},saveToken:function(e){e&&e.token&&localStorage.setItem(S.localTokeyKey,e.token)},ajax:function(e,t,n,r,o){o=o||this,t=T.a.stringify(t,{allowDots:!0}),r=r||"post",e=S.baseUrl+e;var a=E()({method:r,url:e,data:t,headers:{token:S.getToken()}});a.then((function(e){S.saveToken(e.data),n.call(o,e.data)})).catch((function(e){n.call(o,{code:500,success:!1,message:"访问数据失败！",error:e})}))}},j=1887436.8;S.sendFile=function(e,t,n,r){if(null!=t&&t)if(t.size>j)r({message:"文件大小超过限制",code:500,success:!1});else{e=S.baseUrl+e;var o=new FormData;for(var a in o.append("file",t),n)o.append(a,n[a]);var i=E()({method:"POST",url:e,data:o,headers:{token:S.getToken(),"Content-Type":"multipart/form-data"}});i.then((function(e){S.saveToken(e.data),r(e.data)})).catch((function(e){console.error("上传发生错误",e),r({code:500,message:"上传发生错误",success:!1,error:e})}))}else r({message:"请选择文件",code:500,success:!1})};var M=S;r["default"].filter("formatDate",(function(e,t){return e?x.formatDate(e,t):""})),r["default"].filter("showDeptName",(function(e,t){for(var n=0;n<t.length;n++){var r=t[n];if(r.deptId==e)return r.deptName}return"查无部门"})),r["default"].filter("showProvince",(function(e,t){for(var n=0;n<t.length;n++){var r=t[n];if(r.pid==e)return r.province}return e})),r["default"].filter("showCity",(function(e,t){for(var n=0;n<t.length;n++){var r=t[n];if(r.cid==e)return r.city}return e})),r["default"].filter("filesize",(function(e){return e+"字节"})),r["default"].filter("fileurl",(function(e){var t=M.baseUrl+"/file/download";return t=t+"?tbFile.fid="+e+"&request_token="+M.getToken(),t}));var A=n("5c96"),I=n.n(A),L=(n("0fae"),{install:function(e){e.prototype.$accessKey="808d413c-dcb4-4f21-9e8a-521bec008124",e.prototype.$ajax=function(e,t,n,r){M.ajax(e,t,n,r,this)},e.prototype.$md5=function(e){return x.md5(e)},e.prototype.$sendFile=function(e,t,n,r){M.sendFile(e,t,n,r)},e.prototype.$download=function(e){var t=M.baseUrl+"/file/download";return t=t+"?tbFile.fid="+e+"&request_token="+M.getToken(),t},e.prototype.$regValidate=function(e,t,n,r,o){console.log(e),r.test(t)?n():n(new Error(o))}}}),_=L;r["default"].use(I.a),r["default"].use(_),r["default"].config.productionTip=!1,new r["default"]({router:m,render:function(e){return e(l)}}).$mount("#app")}});