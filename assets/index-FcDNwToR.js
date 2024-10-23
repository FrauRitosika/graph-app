var _=Object.defineProperty;var N=(t,e,n)=>e in t?_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>N(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function z(t,e){return{x:t.x+e.x,y:t.y+e.y}}function m(t,e){document.getElementById(`${t}cPointX`).value=e.point.x.toString(),document.getElementById(`${t}cPointY`).value=e.point.y.toString(),document.getElementById(`${t}cPointAngle`).value=e.angle.toString()}function B(t,e,n){document.getElementById(`${t}X`).value=e.x.toString(),document.getElementById(`${t}Y`).value=e.y.toString(),n&&(document.getElementById(`${t}Width`).value=n.width.toString(),document.getElementById(`${t}Height`).value=n.height.toString())}function F(t){B("rect1",t.rectStart.rect.position,t.rectStart.rect.size),m("rect1",t.rectStart.cPoint),B("rect2",t.rectEnd.rect.position,t.rectEnd.rect.size),m("rect2",t.rectEnd.cPoint)}function w(t){return{position:{x:parseFloat(document.getElementById(`${t}X`).value),y:parseFloat(document.getElementById(`${t}Y`).value)},size:{width:parseFloat(document.getElementById(`${t}Width`).value),height:parseFloat(document.getElementById(`${t}Height`).value)}}}function E(t){return{point:{x:parseFloat(document.getElementById(`${t}cPointX`).value),y:parseFloat(document.getElementById(`${t}cPointY`).value)},angle:parseFloat(document.getElementById(`${t}cPointAngle`).value)}}function O(t,e){const n=w(t);if(n.position.x>0&&n.position.y>0&&n.size.height>0&&n.size.width>0)switch(e){case"right":return{point:{x:n.position.x+.5*n.size.width,y:n.position.y},angle:0};case"left":return{point:{x:n.position.x-.5*n.size.width,y:n.position.y},angle:180};case"up":return{point:{x:n.position.x,y:n.position.y+.5*n.size.height},angle:90};default:return{point:{x:n.position.x,y:n.position.y-.5*n.size.height},angle:270}}throw new Error("Ошибка: все параметры прямоугольника должны быть заданы положительными числами")}function T(t,e){t&&([e.rectStart,e.rectEnd].forEach(n=>{t.fillRect(n.rect.position.x-.5*n.rect.size.width,n.rect.position.y-.5*n.rect.size.height,n.rect.size.width,n.rect.size.height),t.strokeStyle="black",t.lineWidth=1,t.strokeRect(n.rect.position.x-.5*n.rect.size.width,n.rect.position.y-.5*n.rect.size.height,n.rect.size.width,n.rect.size.height)}),t.strokeStyle="black",t.lineWidth=1,t.beginPath(),t.moveTo(e.path[0].x,e.path[0].y),e.path.forEach((n,o)=>{o&&t.lineTo(n.x,n.y)}),t.stroke())}function $(t,e){t.strokeStyle="blue",t.lineWidth=2,t.strokeRect(e.position.x-.5*e.size.width,e.position.y-.5*e.size.height,e.size.width,e.size.height)}var a=(t=>(t[t.x=0]="x",t[t.y=1]="y",t))(a||{});function s(t){return t===0?"x":"y"}function W(t,e){return[t.position[s(e)]-.5*t.size[e?"height":"width"],t.position[s(e)]+.5*t.size[e?"height":"width"]]}function M(t,e){t=t.sort(n=>n);for(let n of e)if(n>t[0]&&n<t[1])return!1;return!0}function H(t,e){return e=e.sort(n=>n),!!(t.every(n=>n<=e[0])||t.every(n=>n>=e[1]))}const j=20,U=10,c={rectGap:j,rectLineGap:U};function d(t,e,n){const o=e[0].x===e[1].x?a.x:a.y;for(let i of n){const r=[i.cornerPoints[0].y-t,i.cornerPoints[1].y+t],l=[i.cornerPoints[0].x-t,i.cornerPoints[3].x+t];if(!M(o?r:l,[e[0][s(o)]])&&!H([e[0][s(1-o)],e[1][s(1-o)]],1-o?r:l))return!1}return!0}function q(t,e){return!(!k(t.cornerPoints).every(n=>d(c.rectGap,n,[e]))||!k(e.cornerPoints).every(n=>d(c.rectGap,n,[t])))}function k(t){return t.map((e,n)=>[e,n+1<t.length-1?t[n+1]:t[0]])}class x{constructor(e,n){f(this,"rect");f(this,"cPoint");f(this,"_sideX");f(this,"_sideY");this.rect=e,this.cPoint=n,this._sideX=this.sidePoints(a.x),this._sideY=this.sidePoints(a.y);const o=this.getSide();this.validateConnectionPoint(o),this.validateAngle(o)}getSide(){const e=[this.sideX,this.sideY];for(let n=0;n<2;n++)if(e[n].includes(this.cPoint.point[s(n)]))return n;throw new Error("Ошибка: Точка соединения должна находиться на грани прямоугольника.")}validateConnectionPoint(e){if(M(1-e?this.sideY:this.sideX,[this.cPoint.point[s(1-e)]]))throw new Error("Ошибка: Точка соединения должна находиться на грани прямоугольника.")}sidePoints(e){const n=W(this.rect,e);switch(e){case a.x:this._sideX=n;break;case a.y:this._sideY=n;break;default:throw new Error("Ошибка: Не удалось определить грань прямоугольника")}return n}validateAngle(e){switch(e){case a.x:if(this.cPoint.point[s(e)]===Math.max(...this._sideX)&&this.cPoint.angle===0||this.cPoint.point[s(e)]===Math.min(...this._sideX)&&this.cPoint.angle===180)return;break;case a.y:if(this.cPoint.point[s(e)]===Math.max(...this._sideY)&&this.cPoint.angle===90||this.cPoint.point[s(e)]===Math.min(...this._sideY)&&this.cPoint.angle===270)return;break;default:throw new Error("Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ")}throw new Error("Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ")}get cornerPoints(){return[{x:this.sideX[0],y:this.sideY[0]},{x:this.sideX[0],y:this.sideY[1]},{x:this.sideX[1],y:this.sideY[1]},{x:this.sideX[1],y:this.sideY[0]}]}get sideX(){return this._sideX??this.sidePoints(a.x)}get sideY(){return this._sideY??this.sidePoints(a.y)}}function K(t,e,n){for(let o of[{...t,x:e.x},{...t,y:e.y}])if(d(c.rectLineGap,[t,o],n)&&d(c.rectLineGap,[o,e],n))return{result:!0,point:o};return{result:!1}}const J=(t,e,n,o)=>{const i=new x(t,n),r=new x(e,o),l=[i.cPoint.point,X(i)],L=X(r);let G=!1;for(let I=0;I<10;I++){const v=K(l[l.length-1],L,[i,r]);if(v.result&&v.point){l.push(v.point),G=!0;break}const S=Q(l,L,[i,r]);S&&l.push(S)}if(G)return[...l,L,r.cPoint.point];throw new Error("Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.")};function X(t){switch(t.cPoint.angle){case 0:return{...t.cPoint.point,x:t.cornerPoints[2].x+c.rectLineGap};case 180:return{...t.cPoint.point,x:t.cornerPoints[0].x-c.rectLineGap};case 90:return{...t.cPoint.point,y:t.cornerPoints[2].y+c.rectLineGap};case 270:return{...t.cPoint.point,y:t.cornerPoints[0].y-c.rectLineGap};default:throw new Error("Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ")}}function Q(t,e,n){const o=t[t.length-1].x===t[t.length-2].x?a.x:a.y,i=t[t.length-1];let r;if((i[s(1-o)]-t[t.length-2][s(1-o)])*(e[s(1-o)]-i[s(1-o)])>0&&(r=l(),r.result&&r.point&&d(c.rectLineGap,[i,r.point],n))||i[s(o)]<e[s(o)]&&(r=Y(i,1-o,n),r.result&&r.point&&d(c.rectLineGap,[i,r.point],n))||(r=b(i,1-o,n),r.result&&r.point&&d(c.rectLineGap,[i,r.point],n)))return r.point;if(r=l(),r.result&&r.point&&d(c.rectLineGap,[i,r.point],n))return r.point;throw new Error("Не удалось получить путь между точками");function l(){return i[s(1-o)]-t[t.length-2][s(1-o)]>0?Y(i,o,n):b(i,o,n)}}function Y(t,e,n){const o=n.map(i=>[i.cornerPoints[0][s(1-e)]-c.rectLineGap,i.cornerPoints[2][s(1-e)]+c.rectLineGap]).reduce((i,r)=>i.concat(r),[]).filter(i=>i>t[s(1-e)]);return o.length===0?{result:!1}:{result:!0,point:{x:e?Math.min(...o):t.x,y:e?t.y:Math.min(...o)}}}function b(t,e,n){const o=n.map(i=>[i.cornerPoints[0][s(1-e)]-c.rectLineGap,i.cornerPoints[2][s(1-e)]+c.rectLineGap]).reduce((i,r)=>r.concat(i),[]).filter(i=>i<t[s(1-e)]);return o.length===0?{result:!1}:{result:!0,point:{x:e?Math.max(...o):t.x,y:e?t.y:Math.max(...o)}}}class C{constructor(e,n,o,i){f(this,"rectStart");f(this,"rectEnd");f(this,"path");this.rectStart=new x(e,o),this.rectEnd=new x(n,i),this.validateIntersectionRect(),this.path=J(e,n,o,i)}validateIntersectionRect(){if(!q(this.rectStart,this.rectEnd))throw new Error(`Ошибка: Прямоугольники расположены слишком близко друг к другу. Между их гранями должно быть минимальное расстояние в ${c.rectGap} пикселей. Пожалуйста, отредактируйте положение прямоугольников.`)}}const P={rect1:{position:{x:150,y:200},size:{width:100,height:100}},rect2:{position:{x:350,y:300},size:{width:100,height:200}},cPoint1:{point:{x:100,y:200},angle:180},cPoint2:{point:{x:300,y:300},angle:180}},V=new C(P.rect1,P.rect2,P.cPoint1,P.cPoint2);function Z(t,e){var n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}function D(t,e,n){const o=Z(t,e);let i=1;for(let r of[n.rectStart,n.rectEnd]){if(!d(0,[o,o],[r]))return{prefix:`rect${i}`,rectangle:r};i++}return null}function A(t,e){const n={x:["left","right"].includes(e)?e==="left"?0-c.rectGap:c.rectGap:0,y:["up","down"].includes(e)?e==="down"?0-c.rectGap:c.rectGap:0};B(t,z(w(t).position,n)),m(t,{point:z(E(t).point,n),angle:E(t).angle})}const tt=document.getElementById("errorMessage"),y=document.getElementById("canvas"),et=document.getElementsByClassName("js-rect-coordinator"),nt=document.getElementsByClassName("js-cpoint-coordinator");let g=V,h=null;F(g);const u=y.getContext("2d");u&&p(u);document.getElementById("redrawButton").addEventListener("click",function(t){t.preventDefault(),u&&p(u)});y.addEventListener("click",function(t){if(u){const e=D(y,t,g);e?(h=e,$(u,e.rectangle.rect)):h=null,p(u)}});window.addEventListener("keydown",function(t){const e={ArrowRight:"right",ArrowLeft:"left",ArrowUp:"down",ArrowDown:"up"};h&&t.key in e&&(A(h.prefix,e[t.key]),u&&p(u))});Array.prototype.forEach.call(et,t=>{t.addEventListener("click",function(e){e.target instanceof HTMLButtonElement&&e.target.dataset.action&&e.target.dataset.rect&&(A(e.target.dataset.rect,e.target.dataset.action),u&&p(u))})});Array.prototype.forEach.call(nt,t=>{t.addEventListener("click",function(e){e.target instanceof HTMLButtonElement&&e.target.dataset.action&&e.target.dataset.rect&&(m(e.target.dataset.rect,O(e.target.dataset.rect,e.target.dataset.action)),u&&p(u))})});function it(t){R("");try{g=new C(w("rect1"),w("rect2"),E("rect1"),E("rect2")),h&&(h.rectangle=h.prefix==="rect1"?g.rectStart:g.rectEnd),T(t,g),h&&$(t,h.rectangle.rect)}catch(e){let n="Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.";e instanceof Error&&(n=e.message),R(n);return}}function p(t){t.clearRect(0,0,y.width,y.height),t.fillStyle="rgba(168, 210, 255)",it(t)}function R(t){tt.textContent=t}