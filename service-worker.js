if(!self.define){let e,s={};const i=(i,l)=>(i=new URL(i+".js",l).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(l,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const u=e=>i(e,n),t={module:{uri:n},exports:o,require:u};s[n]=Promise.all(l.map((e=>t[e]||u(e)))).then((e=>(r(...e),o)))}}define(["./workbox-03ef139c"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vue2-ts-webpack5"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/735.f1c45761.css",revision:null},{url:"/css/applicationAbout.01829042.css",revision:null},{url:"/css/applicationHelloWorld.443b5879.css",revision:null},{url:"/index.html",revision:"25a083288b51050ac117ef8971687675"},{url:"/js/297.4e5a5798.js",revision:null},{url:"/js/369.c9cd9e33.js",revision:null},{url:"/js/735.e56d6455.js",revision:null},{url:"/js/935.8575630a.js",revision:null},{url:"/js/app.9e65e31e.js",revision:null},{url:"/js/applicationAbout.2c942c9d.js",revision:null},{url:"/js/applicationExtend.8b3fa8e8.js",revision:null},{url:"/js/applicationHelloWorld.2e39ef0a.js",revision:null},{url:"/js/applicationHome.077d6870.js",revision:null},{url:"/js/overwrite-applicationChild.ba5e6841.js",revision:null},{url:"/js/overwriteExtend.958a6af5.js",revision:null},{url:"/js/overwriteParent.9887635f.js",revision:null},{url:"/manifest.json",revision:"1b4bd193c200df9d051e82ecf4f6cd88"},{url:"/remoteEntry.js",revision:"c2c65a5a0e558f90afd3866f2d85634c"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
