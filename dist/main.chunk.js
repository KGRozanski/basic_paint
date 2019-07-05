!function(e){function t(t){for(var r,o,i=t[0],s=t[1],a=t[2],c=0,d=[];c<i.length;c++)o=i[c],P[o]&&d.push(P[o][0]),P[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(T&&T(t);d.length;)d.shift()();return k.push.apply(k,a||[]),n()}function n(){for(var e,t=0;t<k.length;t++){for(var n=k[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==P[i]&&(r=!1)}r&&(k.splice(t--,1),e=A(A.s=n[0]))}return e}var r=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!_[e]||!j[e])return;for(var n in j[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(v[n]=t[n]);0==--w&&0===b&&H()}(e,t),r&&r(e,t)};var o,i=!0,s="2c041080e9e186b564d1",a=1e4,c={},d=[],l=[];function u(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:o!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:x,apply:D,status:function(e){if(!e)return f;p.push(e)},addStatusHandler:function(e){p.push(e)},removeStatusHandler:function(e){var t=p.indexOf(e);t>=0&&p.splice(t,1)},data:c[e]};return o=void 0,t}var p=[],f="idle";function h(e){f=e;for(var t=0;t<p.length;t++)p[t].call(null,e)}var y,v,m,w=0,b=0,g={},j={},_={};function O(e){return+e+""===e?+e:e}function x(e){if("idle"!==f)throw new Error("check() is only allowed in idle status");return i=e,h("check"),(t=a,t=t||1e4,new Promise(function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,o=A.p+""+s+".hot-update.json";r.open("GET",o,!0),r.timeout=t,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+o+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+o+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(e){return void n(e)}e(t)}}})).then(function(e){if(!e)return h("idle"),null;j={},g={},_=e.c,m=e.h,h("prepare");var t=new Promise(function(e,t){y={resolve:e,reject:t}});for(var n in v={},P)E(n);return"prepare"===f&&0===b&&0===w&&H(),t});var t}function E(e){_[e]?(j[e]=!0,w++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=A.p+""+e+"."+s+".hot-update.js",document.head.appendChild(t)}(e)):g[e]=!0}function H(){h("ready");var e=y;if(y=null,e)if(i)Promise.resolve().then(function(){return D(i)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in v)Object.prototype.hasOwnProperty.call(v,n)&&t.push(O(n));e.resolve(t)}}function D(t){if("ready"!==f)throw new Error("apply() is only allowed in ready status");var n,r,o,i,a;function l(e){for(var t=[e],n={},r=t.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),s=o.id,a=o.chain;if((i=M[s])&&!i.hot._selfAccepted){if(i.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:s};if(i.hot._main)return{type:"unaccepted",chain:a,moduleId:s};for(var c=0;c<i.parents.length;c++){var d=i.parents[c],l=M[d];if(l){if(l.hot._declinedDependencies[s])return{type:"declined",chain:a.concat([d]),moduleId:s,parentId:d};-1===t.indexOf(d)&&(l.hot._acceptedDependencies[s]?(n[d]||(n[d]=[]),u(n[d],[s])):(delete n[d],t.push(d),r.push({chain:a.concat([d]),id:d})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}t=t||{};var p={},y=[],w={},b=function(){console.warn("[HMR] unexpected require("+j.moduleId+") to disposed module")};for(var g in v)if(Object.prototype.hasOwnProperty.call(v,g)){var j;a=O(g);var x=!1,E=!1,H=!1,D="";switch((j=v[g]?l(a):{type:"disposed",moduleId:g}).chain&&(D="\nUpdate propagation: "+j.chain.join(" -> ")),j.type){case"self-declined":t.onDeclined&&t.onDeclined(j),t.ignoreDeclined||(x=new Error("Aborted because of self decline: "+j.moduleId+D));break;case"declined":t.onDeclined&&t.onDeclined(j),t.ignoreDeclined||(x=new Error("Aborted because of declined dependency: "+j.moduleId+" in "+j.parentId+D));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(j),t.ignoreUnaccepted||(x=new Error("Aborted because "+a+" is not accepted"+D));break;case"accepted":t.onAccepted&&t.onAccepted(j),E=!0;break;case"disposed":t.onDisposed&&t.onDisposed(j),H=!0;break;default:throw new Error("Unexception type "+j.type)}if(x)return h("abort"),Promise.reject(x);if(E)for(a in w[a]=v[a],u(y,j.outdatedModules),j.outdatedDependencies)Object.prototype.hasOwnProperty.call(j.outdatedDependencies,a)&&(p[a]||(p[a]=[]),u(p[a],j.outdatedDependencies[a]));H&&(u(y,[j.moduleId]),w[a]=b)}var k,I=[];for(r=0;r<y.length;r++)a=y[r],M[a]&&M[a].hot._selfAccepted&&I.push({module:a,errorHandler:M[a].hot._selfAccepted});h("dispose"),Object.keys(_).forEach(function(e){!1===_[e]&&function(e){delete P[e]}(e)});for(var W,S,T=y.slice();T.length>0;)if(a=T.pop(),i=M[a]){var L={},q=i.hot._disposeHandlers;for(o=0;o<q.length;o++)(n=q[o])(L);for(c[a]=L,i.hot.active=!1,delete M[a],delete p[a],o=0;o<i.children.length;o++){var C=M[i.children[o]];C&&((k=C.parents.indexOf(a))>=0&&C.parents.splice(k,1))}}for(a in p)if(Object.prototype.hasOwnProperty.call(p,a)&&(i=M[a]))for(S=p[a],o=0;o<S.length;o++)W=S[o],(k=i.children.indexOf(W))>=0&&i.children.splice(k,1);for(a in h("apply"),s=m,w)Object.prototype.hasOwnProperty.call(w,a)&&(e[a]=w[a]);var U=null;for(a in p)if(Object.prototype.hasOwnProperty.call(p,a)&&(i=M[a])){S=p[a];var R=[];for(r=0;r<S.length;r++)if(W=S[r],n=i.hot._acceptedDependencies[W]){if(-1!==R.indexOf(n))continue;R.push(n)}for(r=0;r<R.length;r++){n=R[r];try{n(S)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:a,dependencyId:S[r],error:e}),t.ignoreErrored||U||(U=e)}}}for(r=0;r<I.length;r++){var G=I[r];a=G.module,d=[a];try{A(a)}catch(e){if("function"==typeof G.errorHandler)try{G.errorHandler(e)}catch(n){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:a,error:n,originalError:e}),t.ignoreErrored||U||(U=n),U||(U=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:a,error:e}),t.ignoreErrored||U||(U=e)}}return U?(h("fail"),Promise.reject(U)):(h("idle"),new Promise(function(e){e(y)}))}var M={},P={0:0},k=[];function A(t){if(M[t])return M[t].exports;var n=M[t]={i:t,l:!1,exports:{},hot:u(t),parents:(l=d,d=[],l),children:[]};return e[t].call(n.exports,n,n.exports,function(e){var t=M[e];if(!t)return A;var n=function(n){return t.hot.active?(M[n]?-1===M[n].parents.indexOf(e)&&M[n].parents.push(e):(d=[e],o=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),d=[]),A(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return A[e]},set:function(t){A[e]=t}}};for(var i in A)Object.prototype.hasOwnProperty.call(A,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(n,i,r(i));return n.e=function(e){return"ready"===f&&h("prepare"),b++,A.e(e).then(t,function(e){throw t(),e});function t(){b--,"prepare"===f&&(g[e]||E(e),0===b&&0===w&&H())}},n.t=function(e,t){return 1&t&&(e=n(e)),A.t(e,-2&t)},n}(t)),n.l=!0,n.exports}A.m=e,A.c=M,A.d=function(e,t,n){A.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},A.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},A.t=function(e,t){if(1&t&&(e=A(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(A.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)A.d(n,r,function(t){return e[t]}.bind(null,r));return n},A.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return A.d(t,"a",t),t},A.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},A.p="",A.h=function(){return s};var I=window.webpackJsonp=window.webpackJsonp||[],W=I.push.bind(I);I.push=t,I=I.slice();for(var S=0;S<I.length;S++)t(I[S]);var T=W;k.push(["./src/assets/js/app.js",1]),n()}({"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/assets/scss/style.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([e.i,".pointer {\n  position: fixed; }\n  .pointer::before {\n    position: absolute;\n    content: ' ';\n    width: 2px;\n    height: 20px;\n    background-color: #000; }\n  .pointer::after {\n    position: absolute;\n    transform: rotate(90deg);\n    content: ' ';\n    width: 2px;\n    height: 20px;\n    background-color: #000; }\n",""])},"./src/assets/js/app.js":function(e,t,n){"use strict";n.r(t);n("./src/assets/scss/style.scss"),n("./node_modules/jquery/dist/jquery.js");var r=n("./node_modules/rxjs/_esm5/internal/observable/fromEvent.js"),o=n("./node_modules/rxjs/_esm5/internal/operators/throttleTime.js"),i=n("./node_modules/konva/lib/index.js"),s=n.n(i);var a=function e(t,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=t,this.x=n,this.y=r,this.path=o};function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var d=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.width=t,this.height=n,this.tileHeight=r/2||25,this.tileWidth=Math.round(Math.tan(1.04719755)*this.tileHeight),this.mapArray=[],this.generateMap()}var t,n,r;return t=e,(n=[{key:"generateMap",value:function(){for(var e=0,t=-this.tileHeight,n={height:this.tileHeight,width:this.tileWidth},r={x:0,y:t},o=0;o<this.height;o++){this.mapArray.push([]),r.x=o%2?n.width:0;for(var i=0;i<this.width;i++){var c=new a(e,r.x,r.y,new s.a.Path({data:"M".concat(r.x," ").concat(r.y," l ").concat(n.width," ").concat(n.height," l -").concat(n.width," ").concat(n.height," l -").concat(n.width," -").concat(n.height),fill:"green"}));this.mapArray[o].push(c),r.x+=2*n.width,e++}r.y+=n.height}return this.mapArray}},{key:"selectTile",value:function(e,t){var n,r,o,i=Math.ceil(t/this.tileHeight),c=i*this.tileHeight-t,d=0;return(r=i%2?e-(n=Math.abs(Math.floor(e/(2*this.tileWidth))))*(2*this.tileWidth):e-((n=Math.abs(Math.ceil((e-this.tileWidth)/(2*this.tileWidth))))*(2*this.tileWidth)-this.tileWidth))>this.tileWidth&&(r=2*this.tileWidth-r,d=1),o=this.mapArray[i][n],c>r*(this.tileHeight/this.tileWidth)&&(o=i%2?this.mapArray[i-1][n+d]:1==d?this.mapArray[i-1][n]:this.mapArray[i-1][n-1]),new a(o.id,o.x,o.y,new s.a.Path({data:"M".concat(o.x," ").concat(o.y," l ").concat(this.tileWidth," ").concat(this.tileHeight," l -").concat(this.tileWidth," ").concat(this.tileHeight," l -").concat(this.tileWidth," -").concat(this.tileHeight),fill:"blue"}))}}])&&c(t.prototype,n),r&&c(t,r),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.canvas=document.getElementsByTagName("canvas"),this.stage=new s.a.Stage({container:"container",width:1800,height:850}),this.mapLayer=new s.a.Layer,this.stage.add(this.mapLayer)}var t,n,r;return t=e,(n=[{key:"renderMap",value:function(e){var t=this;e.forEach(function(e){e.forEach(function(e){t.mapLayer.add(e.path)})}),this.stage.add(this.mapLayer),this.mapLayer.draw()}},{key:"render",value:function(e){this.mapLayer.add(e.path),e.path.draw()}}])&&l(t.prototype,n),r&&l(t,r),e}();function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=new function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.map=new d(50,70,30)};(new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.view=new u}var t,n,i;return t=e,(n=[{key:"startGame",value:function(){this.view.renderMap(f.map.mapArray),this.initEventHandlers()}},{key:"initEventHandlers",value:function(){var e=this;Object(r.a)(this.view.canvas,"mousemove").pipe(Object(o.a)(50)).subscribe(function(t){e.view.render(f.map.selectTile(t.offsetX,t.offsetY))})}}])&&p(t.prototype,n),i&&p(t,i),e}())).startGame()},"./src/assets/scss/style.scss":function(e,t,n){var r=n("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/assets/scss/style.scss");"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0},i=n("./node_modules/style-loader/lib/addStyles.js")(r,o);r.locals&&(e.exports=r.locals),e.hot.accept("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/assets/scss/style.scss",function(){var t=n("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/assets/scss/style.scss");if("string"==typeof t&&(t=[[e.i,t,""]]),!function(e,t){var n,r=0;for(n in e){if(!t||e[n]!==t[n])return!1;r++}for(n in t)r--;return 0===r}(r.locals,t.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");i(t)}),e.hot.dispose(function(){i()})}});