if(!self.define){let s,e={};const c=(c,a)=>(c=new URL(c+".js",a).href,e[c]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=c,s.onload=e,document.head.appendChild(s)}else s=c,importScripts(c),e()})).then((()=>{let s=e[c];if(!s)throw new Error(`Module ${c} didn’t register its module`);return s})));self.define=(a,r)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let d={};const n=s=>c(s,i),b={module:{uri:i},exports:d,require:n};e[i]=Promise.all(a.map((s=>b[s]||n(s)))).then((s=>(r(...s),d)))}}define(["./workbox-8afda3cc"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.clientsClaim(),s.precacheAndRoute([{url:"/favicon.ico",revision:"9d0d022bbaef20deee3e9aaff36fd099"},{url:"/index.html",revision:"264b884ad832752e8d5733098b943ac9"},{url:"/index.js",revision:"c41ece6e66967590f5d9455eb5eae648"},{url:"/src/assets/pngs/map.png",revision:"097a633046e8bb4c4721a956967029b5"},{url:"/src/assets/pngs/onboarding-bg.png",revision:"17a511bf7882d632dcd0a73972a0cdba"},{url:"/src/assets/pngs/sentinel-logo.png",revision:"e85085304b650837ad73db587960b435"},{url:"/src/assets/pngs/subscription.png",revision:"af72d781f951672068e4704dd0db2fc6"},{url:"/src/assets/svgs/back-icon.svg",revision:"be32a4afc99ea3e01072ba895521b38b"},{url:"/src/assets/svgs/balance-icon.svg",revision:"ddb0a5288ec793a5f25bfaf63c9c3aad"},{url:"/src/assets/svgs/built-on-cosmos.svg",revision:"e437a5cb5084d8147aec8036d2f77d6c"},{url:"/src/assets/svgs/check-icon.svg",revision:"a3c08168e0424ff406fcf093ee4874f2"},{url:"/src/assets/svgs/checkbox-icon.svg",revision:"25ef8904010faf3c76fc9f5ddce4ab2e"},{url:"/src/assets/svgs/dns-icon.svg",revision:"ecd439a19bdc39416f02d7267e482e12"},{url:"/src/assets/svgs/fee-granter-icon.svg",revision:"f535547665fd1058edebdb439a03e37c"},{url:"/src/assets/svgs/filter-icon.svg",revision:"4d21e3d26fab30b0883b03f975415e54"},{url:"/src/assets/svgs/github-icon.svg",revision:"5623babcda20cb81ab67f737d75cdedd"},{url:"/src/assets/svgs/globe-icon.svg",revision:"3ac98388b10c6bd0cb04d6a3a8c742b9"},{url:"/src/assets/svgs/info-icon.svg",revision:"270c68a6b48115b3c32f068fd0a3e07c"},{url:"/src/assets/svgs/language-icon.svg",revision:"c75d3a783ace74f27306a0f083b30550"},{url:"/src/assets/svgs/legal-doc-icon.svg",revision:"0dff503a3038293fb45cd63f8e87bb53"},{url:"/src/assets/svgs/logout-icon.svg",revision:"2e95ed38c7e658940c632d4151fa743b"},{url:"/src/assets/svgs/magnifier-icon.svg",revision:"c21763127d3321cc985338087629c8b4"},{url:"/src/assets/svgs/offline-icon.svg",revision:"b33270252c879ea37bb08d9ae2194e0d"},{url:"/src/assets/svgs/onboarding-home.svg",revision:"c9eb0bbf8845ad81de3398833917b0bf"},{url:"/src/assets/svgs/onboarding-lock.svg",revision:"c791595d921d888402606b0d3a0948e1"},{url:"/src/assets/svgs/online-icon.svg",revision:"7b74f660dd0f2f997c822a5d65bbd0b1"},{url:"/src/assets/svgs/payments.svg",revision:"d8c70edb1ee01c35dd167ae8d510a7e7"},{url:"/src/assets/svgs/powered-by-cosmos.svg",revision:"7ab51f2e263bacd07371ca30dac0e34c"},{url:"/src/assets/svgs/purchase-icon.svg",revision:"c32a5d0893e20dbdf6325657d2b4a475"},{url:"/src/assets/svgs/quick-connect-icon.svg",revision:"1b86677a5ed919633c08af7bede98bac"},{url:"/src/assets/svgs/reload-icon.svg",revision:"56569a25566bb0babbedee026112a619"},{url:"/src/assets/svgs/right-arrow-icon.svg",revision:"0800e9bb6021968d80e14aeae43400c6"},{url:"/src/assets/svgs/rpc-icon.svg",revision:"646d074fb075b05fbe2259900fea9c4d"},{url:"/src/assets/svgs/share-logs-icon.svg",revision:"38ad17c5ef98b251d6e86eba71ddcada"},{url:"/src/assets/svgs/subscriptions-icon.svg",revision:"39049b3907af5415f3e3dc3056c1b626"},{url:"/src/assets/svgs/swap-icon.svg",revision:"da8e36450230d6d6b51679cc4fb7ede7"},{url:"/src/assets/svgs/tab-account-icon.svg",revision:"a84bdda26137f2f6f3336f120a703bdf"},{url:"/src/assets/svgs/tab-home-icon.svg",revision:"2337265e18db0535ff5c532565e2f659"},{url:"/src/assets/svgs/tab-nodes-icon.svg",revision:"97ca56370143e74dfae43519a8f7c8d2"},{url:"/src/assets/svgs/tab-recents-icon.svg",revision:"55632862e66f74dc4449ee6d9ae2f1d4"},{url:"/src/assets/svgs/tab-settings-icon.svg",revision:"ca475fffc6f8152eac6be6e95f0cbe3a"},{url:"/src/assets/svgs/telegram-icon.svg",revision:"dc02ee7d026f9484caa988ca7b97cf8b"},{url:"/src/assets/svgs/trash-icon.svg",revision:"d19daec96f486f6d761ccb4d862f4cb8"},{url:"/src/assets/svgs/twitter-icon.svg",revision:"d401c0281764e16cfd6e5a38a0b815e7"},{url:"/src/assets/svgs/version-icon.svg",revision:"17231bd58d7cf37ed270239f2dfc59d9"},{url:"/src/assets/svgs/wallet-details-icon.svg",revision:"97c2404b9bb26a2d1701d2c01400df4d"},{url:"/src/css/8ab3689a04d6666ebf18bf2d315dc69f.css",revision:"fbbab94dc9d76481bf96f9a6b84468ad"},{url:"/src/css/93e6eaaeae374c78f7b3f4e1bbffc313.css",revision:"89a4ce51edff30ff73c469452d7a071b"},{url:"/src/css/a8d1574740348179683d1cd1ba898ab3.css",revision:"b0644d3243db917414e7f42046217a84"},{url:"/src/js/chunks/01a01063b74da592f378b78e9b1fc6aa.js",revision:"e1d6a5eb4bfc2c42dd37e320448b5184"},{url:"/src/js/chunks/1469268e28fb070e164832404642d527.js",revision:"c10404d26d5094925e0bdd759842814c"},{url:"/src/js/chunks/26881b6796b0b3d9db77a2da6d7a6ac5.js",revision:"a8741979e2edb09403b5ba5176771a91"},{url:"/src/js/chunks/4acbd44a9e3a45fe56a928e66fba0ce5.js",revision:"c83086e725214184db1598012eb372cf"},{url:"/src/js/chunks/4c581996bd89addcd86eb54eb7088680.js",revision:"7bad4b810a9505e9d201db1408140a24"},{url:"/src/js/chunks/5edb1f33d4b36d075423ed1006522ddb.js",revision:"3858c2fc1269a725bcb86eb0bc9c5231"},{url:"/src/js/chunks/7b49f5e132b480e4169465609dfa7a59.js",revision:"331c388ef13fda77b258e0f9fc6219ba"},{url:"/src/js/chunks/8ab3689a04d6666ebf18bf2d315dc69f.js",revision:"86d9af803f5bf0f9e8a8c5b5b44ee9aa"},{url:"/src/js/chunks/a8d1574740348179683d1cd1ba898ab3.js",revision:"d4ed699dc25aae4b04db1b4c80781cc6"},{url:"/src/js/chunks/cccb66544e6775a70bfa42d84e1d3774.js",revision:"e706fedf760c5081ee4eceb178f787aa"},{url:"/src/js/chunks/cf1cb19d07698fa5209910508d15cf8f.js",revision:"3295ed7b809b55e42934815c526f7b9b"},{url:"/src/js/chunks/d0d5a67dc26aae5b5717392244313999.js",revision:"16e5b28d906502883c96aec78be5b06f"},{url:"/src/js/chunks/e700ff07f1cd647b212dfb88bac4556c.js",revision:"3b6d7b64fd732ed56cd2cfdb7da1ca9e"},{url:"/src/js/chunks/ebaaae940f5c121495cb9c5d1fd90643.js",revision:"d0f624407416e662e5d4892706a09a0c"},{url:"/src/js/packages/react-dom.js",revision:"ba246e41ef32535ee8e96fcfdfb98f96"},{url:"/src/js/packages/runtime.js",revision:"2b3a5578aaa8284a380702e0bae459a2"},{url:"/src/js/packages/workbox-core.js",revision:"689a32cf972c38cc61cd3819345cb7e2"},{url:"/src/js/packages/workbox-expiration.js",revision:"443f33da502c54f41ad26a1833c5e621"},{url:"/src/js/packages/workbox-routing.js",revision:"7f284b039500909a5106d8a08d602aa3"},{url:"/src/js/packages/workbox-strategies.js",revision:"31f4d1093b6c6d24bac856c17aba57e4"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(/\.(html)$/,new s.StaleWhileRevalidate({cacheName:"html",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(css)$/,new s.StaleWhileRevalidate({cacheName:"css",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(js)$/,new s.StaleWhileRevalidate({cacheName:"js",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(json)$/,new s.StaleWhileRevalidate({cacheName:"json",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(woff2|woff)$/,new s.CacheFirst({cacheName:"fonts",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(png|jpg|jpeg|gif|svg|ico)$/,new s.CacheFirst({cacheName:"images",plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/^https:\/\/flagcdn\.com\/.*\.svg$/,new s.StaleWhileRevalidate({cacheName:"flags",plugins:[new s.ExpirationPlugin({maxEntries:200,maxAgeSeconds:2592e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/.*\.mapbox\.com\/$/,new s.StaleWhileRevalidate({cacheName:"map",plugins:[new s.ExpirationPlugin({maxEntries:200,maxAgeSeconds:2592e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
