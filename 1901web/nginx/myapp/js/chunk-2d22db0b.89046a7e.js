(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22db0b"],{f924:function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[t._v(" "+t._s(t.title)+" "),n("i",{staticClass:"iconfont"},[t._v("")])]),n("div",[n("el-input",{model:{value:t.echo,callback:function(e){t.echo=e},expression:"echo"}}),n("el-button",{on:{click:t.ajaxTest}},[t._v("ajax测试")])],1),n("div",[t._v(t._s(t.result))])])},i=[],s={name:"Test",data:function(){return{title:"测试页",echo:"",result:{}}},methods:{ajaxTest:function(){this.$ajax("/",{echo:this.echo},(function(t){this.result=t}))}}},o=s,a=n("2877"),l=Object(a["a"])(o,c,i,!1,null,null,null);e["default"]=l.exports}}]);