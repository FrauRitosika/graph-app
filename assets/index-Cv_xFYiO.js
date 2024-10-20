var z=Object.defineProperty;var G=(t,e,n)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var h=(t,e,n)=>G(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();var a=(t=>(t[t.x=0]="x",t[t.y=1]="y",t))(a||{});function s(t){return t===0?"x":"y"}function b(t,e){return[t.position[s(e)]-.5*t.size[e?"height":"width"],t.position[s(e)]+.5*t.size[e?"height":"width"]]}function X(t,e){t=t.sort(n=>n);for(let n of e)if(n>t[0]&&n<t[1])return!1;return!0}function W(t,e){return e=e.sort(n=>n),!!(t.every(n=>n<=e[0])||t.every(n=>n>=e[1]))}function d(t,e){const n=t[0].x===t[1].x?a.x:a.y;for(let i of e){const o=[i.cornerPointsWithBorder[0].y,i.cornerPointsWithBorder[1].y],r=[i.cornerPointsWithBorder[0].x,i.cornerPointsWithBorder[3].x];if(!X(n?o:r,[t[0][s(n)]])&&!W([t[0][s(1-n)],t[1][s(1-n)]],1-n?o:r))return!1}return!0}function k(t,e){return!(!m(t.cornerPoints).every(n=>d(n,[e]))||!m(e.cornerPoints).every(n=>d(n,[t])))}function m(t){return t.map((e,n)=>[e,n+1<t.length-1?t[n+1]:t[0]])}class M{constructor(e,n){h(this,"rectStart");h(this,"rectEnd");this.rectStart=e,this.rectEnd=n,this.validateIntersectionRect()}validateIntersectionRect(){if(!k(this.rectStart,this.rectEnd))throw new Error("Ошибка: Прямоугольники расположены слишком близко друг к другу. Между их гранями должно быть минимальное расстояние в 10 пикселей. Пожалуйста, отредактируйте положение прямоугольников.")}}const S=10,l={rectGap:S};class x{constructor(e,n){h(this,"rect");h(this,"cPoint");h(this,"_sideX");h(this,"_sideY");this.rect=e,this.cPoint=n,this._sideX=this.sidePoints(a.x),this._sideY=this.sidePoints(a.y);const i=this.getSide();this.validateConnectionPoint(i),this.validateAngle(i)}getSide(){const e=[this.sideX,this.sideY];for(let n=0;n<2;n++)if(e[n].includes(this.cPoint.point[s(n)]))return n;throw new Error("Ошибка: Точка соединения должна находиться на грани прямоугольника.")}validateConnectionPoint(e){if(X(1-e?this.sideY:this.sideX,[this.cPoint.point[s(1-e)]]))throw new Error("Ошибка: Точка соединения должна находиться на грани прямоугольника.")}sidePoints(e){const n=b(this.rect,e);switch(e){case a.x:this._sideX=n;break;case a.y:this._sideY=n;break;default:throw new Error("Ошибка: Не удалось определить грань прямоугольника")}return n}validateAngle(e){switch(e){case a.x:if(this.cPoint.point[s(e)]===Math.max(...this._sideX)&&this.cPoint.angle===0||this.cPoint.point[s(e)]===Math.min(...this._sideX)&&this.cPoint.angle===180)return;break;case a.y:if(this.cPoint.point[s(e)]===Math.max(...this._sideY)&&this.cPoint.angle===90||this.cPoint.point[s(e)]===Math.min(...this._sideY)&&this.cPoint.angle===270)return;break;default:throw new Error("Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ")}throw new Error("Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ")}get cornerPoints(){return[{x:this.sideX[0],y:this.sideY[0]},{x:this.sideX[0],y:this.sideY[1]},{x:this.sideX[1],y:this.sideY[1]},{x:this.sideX[1],y:this.sideY[0]}]}get cornerPointsWithBorder(){const e=[{x:-l.rectGap,y:-l.rectGap},{x:-l.rectGap,y:l.rectGap},{x:l.rectGap,y:l.rectGap},{x:l.rectGap,y:-l.rectGap}];return this.cornerPoints.map((n,i)=>({x:n.x+e[i].x,y:n.y+e[i].y}))}get sideX(){return this._sideX??this.sidePoints(a.x)}get sideY(){return this._sideY??this.sidePoints(a.y)}}function _(t,e,n){for(let i of[{...t,x:e.x},{...t,y:e.y}])if(d([t,i],n)&&d([i,e],n))return{result:!0,point:i};return{result:!1}}function $(t,e){const n=[t.cPoint.point,w(t)],i=w(e);let o=!1;for(let r=0;r<10;r++){const u=_(n[n.length-1],i,[t,e]);if(u.result&&u.point){n.push(u.point),o=!0;break}const P=C(n,i,[t,e]);P&&n.push(P)}if(o)return[...n,i,e.cPoint.point];throw new Error("Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.")}function w(t){switch(t.cPoint.angle){case 0:return{...t.cPoint.point,x:t.cornerPointsWithBorder[2].x};case 180:return{...t.cPoint.point,x:t.cornerPointsWithBorder[0].x};case 90:return{...t.cPoint.point,y:t.cornerPointsWithBorder[2].y};case 270:return{...t.cPoint.point,y:t.cornerPointsWithBorder[0].y};default:throw new Error("Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ")}}function C(t,e,n){const i=t[t.length-1].x===t[t.length-2].x?a.x:a.y,o=t[t.length-1];let r;if((o[s(1-i)]-t[t.length-2][s(1-i)])*(e[s(1-i)]-o[s(1-i)])>0&&(r=u(),r.result&&r.point&&d([o,r.point],n))||o[s(i)]<e[s(i)]&&(r=E(o,1-i,n),r.result&&r.point&&d([o,r.point],n))||(r=B(o,1-i,n),r.result&&r.point&&d([o,r.point],n)))return r.point;if(r=u(),r.result&&r.point&&d([o,r.point],n))return r.point;throw new Error("Не удалось получить путь между точками");function u(){return o[s(1-i)]-t[t.length-2][s(1-i)]>0?E(o,i,n):B(o,i,n)}}function E(t,e,n){const i=n.map(o=>[o.cornerPointsWithBorder[0][s(1-e)],o.cornerPointsWithBorder[3][s(1-e)]]).reduce((o,r)=>o.concat(r),[]).filter(o=>o>t[s(1-e)]);return i.length===0?{result:!1}:{result:!0,point:{x:e?Math.min(...i):t.x,y:e?t.y:Math.min(...i)}}}function B(t,e,n){const i=n.map(o=>[o.cornerPointsWithBorder[0][s(1-e)],o.cornerPointsWithBorder[2][s(1-e)]]).reduce((o,r)=>r.concat(o),[]).filter(o=>o<t[s(1-e)]);return i.length===0?{result:!1}:{result:!0,point:{x:e?Math.max(...i):t.x,y:e?t.y:Math.max(...i)}}}function L(t,e,n,i){const o=new M(new x(t,n),new x(e,i));return $(o.rectStart,o.rectEnd)}function v(t,e){return{x:t.x+e.x,y:t.y+e.y}}function Y(t,e){document.getElementById(`${t}cPointX`).value=e.point.x.toString(),document.getElementById(`${t}cPointY`).value=e.point.y.toString(),document.getElementById(`${t}cPointAngle`).value=e.angle.toString()}function A(t,e){document.getElementById(`${t}X`).value=e.x.toString(),document.getElementById(`${t}Y`).value=e.y.toString()}function f(t){return{position:{x:parseFloat(document.getElementById(`${t}X`).value),y:parseFloat(document.getElementById(`${t}Y`).value)},size:{width:parseFloat(document.getElementById(`${t}Width`).value),height:parseFloat(document.getElementById(`${t}Height`).value)}}}function g(t){return{point:{x:parseFloat(document.getElementById(`${t}cPointX`).value),y:parseFloat(document.getElementById(`${t}cPointY`).value)},angle:parseFloat(document.getElementById(`${t}cPointAngle`).value)}}function F(t,e){const n=f(t);if(n.position.x>0&&n.position.y>0&&n.size.height>0&&n.size.width>0)switch(e){case"right":return{point:{x:n.position.x+.5*n.size.width,y:n.position.y},angle:0};case"left":return{point:{x:n.position.x-.5*n.size.width,y:n.position.y},angle:180};case"up":return{point:{x:n.position.x,y:n.position.y+.5*n.size.height},angle:90};default:return{point:{x:n.position.x,y:n.position.y-.5*n.size.height},angle:270}}throw new Error("Ошибка: все параметры прямоугольника должны быть заданы положительными числами")}const N=document.getElementById("errorMessage"),p=document.getElementById("canvas"),R=document.getElementsByClassName("js-rect-coordinator"),T=document.getElementsByClassName("js-cpoint-coordinator"),c=p.getContext("2d");y();document.getElementById("redrawButton").addEventListener("click",function(t){t.preventDefault(),y()});function H(t,e,n){c&&(c.clearRect(0,0,p.width,p.height),c.fillStyle="rgba(168, 210, 255)",[t,e].forEach(i=>{c.fillRect(i.position.x-.5*i.size.width,i.position.y-.5*i.size.height,i.size.width,i.size.height),c.strokeStyle="black",c.lineWidth=2,c.strokeRect(i.position.x-.5*i.size.width,i.position.y-.5*i.size.height,i.size.width,i.size.height)}),c.strokeStyle="black",c.lineWidth=2,c.beginPath(),c.moveTo(n[0].x,n[0].y),n.forEach((i,o)=>{o&&c.lineTo(i.x,i.y)}),c.stroke())}function y(){I("");try{const t={rect1:f("rect1"),rect2:f("rect2"),cPoint1:g("rect1"),cPoint2:g("rect2")},e=L(t.rect1,t.rect2,t.cPoint1,t.cPoint2);H(t.rect1,t.rect2,e)}catch(t){let e="Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.";t instanceof Error&&(e=t.message),I(e);return}}function I(t){N.textContent=t}Array.prototype.forEach.call(R,t=>{t.addEventListener("click",function(e){if(e.target instanceof HTMLButtonElement&&e.target.dataset.action&&e.target.dataset.rect){const n=e.target.dataset.action,i=e.target.dataset.rect,o={x:["left","right"].includes(n)?n==="left"?0-l.rectGap:l.rectGap:0,y:["up","down"].includes(n)?n==="down"?0-l.rectGap:l.rectGap:0};A(i,v(f(i).position,o)),Y(i,{point:v(g(i).point,o),angle:g(i).angle}),y()}})});Array.prototype.forEach.call(T,t=>{t.addEventListener("click",function(e){e.target instanceof HTMLButtonElement&&e.target.dataset.action&&e.target.dataset.rect&&(Y(e.target.dataset.rect,F(e.target.dataset.rect,e.target.dataset.action)),y())})});