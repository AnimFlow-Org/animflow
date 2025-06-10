/*!
 * AnimFlow v2.0.0 (Temporary Build)
 * A lightweight, high-performance animation library - TEMPORARY VERSION
 * (c) 2025 AnimFlow Team
 * MIT License
 * https://github.com/AnimFlowOrg/animflow
 * 
 * NOTE: This is a temporary build for development and testing purposes only.
 * Use the main build for production environments.
 */

(function(global){'use strict';class AnimFlow{constructor(options={}){this.options={...AnimFlow.defaults,...options};this.elements=new Set();this.observer=null;this.batchQueue=new Set();this.weakCache=new WeakMap();this.setupBatchProcessor()}
static init(options={}){if(!AnimFlow.instance){AnimFlow.instance=new AnimFlow(options)}
return AnimFlow.instance.init()}
init(){if(this.options.disableOnLowPerformance&&this.isLowPerformanceDevice()){console.info('AnimFlow: Animations disabled due to low performance device detection');return this}
this.setupIntersectionObserver();this.setupElements();return this}
setupBatchProcessor(){this.processBatch=()=>{this.batchQueue.forEach(animation=>{if(animation.element&&document.body.contains(animation.element)){this.processAnimation(animation)}});this.batchQueue.clear();this.animationFrame=null}}
setupIntersectionObserver(){this.observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>this.handleIntersection(entry))},{root:this.options.root,threshold:this.options.threshold,rootMargin:this.options.rootMargin})}
setupElements(){document.querySelectorAll('[data-anim]').forEach(element=>{this.setupElement(element)})}
setupElement(element){if(this.elements.has(element))return;const effect=element.getAttribute('data-anim')||'fade-in';element.style.opacity='0';if(effect.includes('slide')){element.style.transform='translateY(30px)'}else if(effect.includes('scale')){element.style.transform='scale(0.8)'}
element.style.transition=`opacity ${this.options.duration}ms ${this.options.easing}, transform ${this.options.duration}ms ${this.options.easing}`;this.elements.add(element);this.observer.observe(element)}
handleIntersection(entry){if(!entry.isIntersecting)return;const element=entry.target;const effect=element.getAttribute('data-anim');requestAnimationFrame(()=>{element.style.opacity='1';element.style.transform='none'});if(this.options.once){this.observer.unobserve(element);this.elements.delete(element)}}
processAnimation(animation){const{element,effect}=animation;element.style.opacity='1';element.style.transform='none'}
isLowPerformanceDevice(){return(!window.requestAnimationFrame||/Mobile|Android|iP(hone|od|ad)/i.test(navigator.userAgent)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2))}}
AnimFlow.defaults={root:null,threshold:0.1,rootMargin:'0px',once:!0,duration:1000,easing:'cubic-bezier(0.4, 0, 0.2, 1)',disableOnLowPerformance:!1};if(typeof module!=='undefined'&&module.exports){module.exports=AnimFlow}else{global.AnimFlow=AnimFlow}})(typeof window!=='undefined'?window:this)