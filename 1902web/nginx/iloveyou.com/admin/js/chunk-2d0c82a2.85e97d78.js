(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c82a2"],{"545b":function(e,s,a){"use strict";a.r(s);var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",[a("div",[e._v(e._s(e.title))]),a("div",{staticStyle:{display:"flex"}},[a("el-input",{attrs:{placeholder:"分组信息"},model:{value:e.queryInfo.messageGroup,callback:function(s){e.$set(e.queryInfo,"messageGroup",s)},expression:"queryInfo.messageGroup"}}),a("el-button",{on:{click:e.query}},[e._v("查询")]),a("el-button",{on:{click:function(s){e.addVisible=!0}}},[a("i",{staticClass:"iconfont"},[e._v("")]),e._v(" 添加 ")])],1),a("div",[a("el-table",{attrs:{data:e.list}},[a("el-table-column",{attrs:{label:"信息分组",prop:"messageGroup"}}),a("el-table-column",{attrs:{label:"关键字",prop:"messageKey"}}),a("el-table-column",{attrs:{label:"信息内容",prop:"message"}}),a("el-table-column",{attrs:{label:"操纵"},scopedSlots:e._u([{key:"default",fn:function(s){return[a("el-button",{on:{click:function(a){return e.delMessage(s.row)}}},[e._v("删除")])]}}])})],1)],1),a("div",[a("el-dialog",{attrs:{visible:e.addVisible,"close-on-click-modal":!1},on:{"update:visible":function(s){e.addVisible=s},closed:e.query}},[a("div",{attrs:{slot:"title"},slot:"title"},[e._v(" 添加门户信息 ")]),a("div",[a("el-form",[a("el-form-item",[a("el-input",{attrs:{placeholder:"信息分组"},model:{value:e.addInfo.messageGroup,callback:function(s){e.$set(e.addInfo,"messageGroup",s)},expression:"addInfo.messageGroup"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:"关键字"},model:{value:e.addInfo.messageKey,callback:function(s){e.$set(e.addInfo,"messageKey",s)},expression:"addInfo.messageKey"}})],1),a("el-form-item",[a("el-input",{attrs:{placeholder:"内容"},model:{value:e.addInfo.message,callback:function(s){e.$set(e.addInfo,"message",s)},expression:"addInfo.message"}})],1),a("el-form-item",[a("el-button",{on:{click:e.addMessage}},[e._v("添加")])],1)],1)],1)])],1)])},l=[],o={name:"Portable",data:function(){return{title:"门户信息管理首页",list:[],page:{pageSize:10,pageNumber:1},queryInfo:{accessKey:this.$accessKey,messageGroup:""},addInfo:{accessKey:this.$accessKey,messageGroup:"",messageKey:"",message:""},addVisible:!1}},methods:{delMessage:function(e){var s=this;s.$confirm("是否删除："+e.messageGroup+"."+e.messageKey,"确认删除",{type:"warning"}).then((function(){s.$ajax("/portable/message/delete",{tbPortableMessage:{accessKey:e.accessKey,pmid:e.pmid}},(function(e){s.$message(e.message),s.query()}))})).catch((function(){}))},addMessage:function(){this.$ajax("/portable/message/add",{tbPortableMessage:this.addInfo},(function(e){this.$message(e.message)}))},query:function(){this.$ajax("/portable/message/queryAll",{tbPortableMessage:this.queryInfo,page:this.page},(function(e){e.success?(this.list=e.resultData.list,this.page=e.resultData.page):this.$message.error(e.message)}))}},created:function(){this.query()}},n=o,i=a("2877"),r=Object(i["a"])(n,t,l,!1,null,null,null);s["default"]=r.exports}}]);