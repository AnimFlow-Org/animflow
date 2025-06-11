/*!
 * AnimFlow v2.0.0
 * A lightweight, high-performance animation library
 * (c) 2025 AnimFlow Team
 * MIT License
 * https://github.com/AnimFlowOrg/animflow
 */

(function (global) {
    'use strict'; const ResourceManager = {
        preloadQueue: new Map(), loadedResources: new WeakMap(), imageObserver: null, init() { this.setupImageObserver() }, setupImageObserver() { this.imageObserver = new IntersectionObserver((entries) => this.handleImageIntersection(entries), { rootMargin: '50px 0px' }) }, handleImageIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target; if (img.dataset.src) { this.loadImage(img) }
                    this.imageObserver.unobserve(img)
                }
            })
        }, loadImage(img) { const src = img.dataset.src; img.src = src; img.removeAttribute('data-src'); this.loadedResources.set(img, !0) }, observeImage(img) { if (!this.loadedResources.has(img)) { this.imageObserver.observe(img) } }
    }; const SVGOptimizer = {
        pathCache: new WeakMap(), optimizePath(path) {
            if (this.pathCache.has(path)) { return this.pathCache.get(path) }
            const length = path.getTotalLength(); path.style.strokeDasharray = length; path.style.strokeDashoffset = length; this.pathCache.set(path, length); return length
        }, animatePath(path, duration = 2000, easing = 'ease-in-out') { const length = this.optimizePath(path); path.style.transition = `stroke-dashoffset ${duration}ms ${easing}`; path.style.strokeDashoffset = '0' }
    }; const VirtualScroller = { containers: new WeakMap(), init(container, itemHeight) { if (this.containers.has(container)) return; const config = { itemHeight, items: Array.from(container.children), visibleItems: new Set(), totalHeight: 0 }; this.containers.set(container, config); this.setupContainer(container) }, setupContainer(container) { const config = this.containers.get(container); config.totalHeight = config.items.length * config.itemHeight; container.style.height = config.totalHeight + 'px'; this.updateVisibleItems(container); container.addEventListener('scroll', () => this.updateVisibleItems(container)) }, updateVisibleItems(container) { const config = this.containers.get(container); const scrollTop = container.scrollTop; const containerHeight = container.clientHeight; const startIndex = Math.floor(scrollTop / config.itemHeight); const endIndex = Math.ceil((scrollTop + containerHeight) / config.itemHeight); config.items.forEach((item, index) => { if (index >= startIndex && index <= endIndex) { if (!config.visibleItems.has(item)) { item.style.transform = `translateY(${index * config.itemHeight}px)`; container.appendChild(item); config.visibleItems.add(item) } } else { if (config.visibleItems.has(item)) { item.remove(); config.visibleItems.delete(item) } } }) } }; class AnimFlow {
        constructor(options = {}) { this.options = { ...AnimFlow.defaults, ...options }; this.elements = new Set(); this.observer = null; this.batchQueue = new Set(); this.weakCache = new WeakMap(); this.eventHandlers = new Map(); ResourceManager.init(); this.setupBatchProcessor(); this.setupEventSystem() }
        static init(options = {}) {
            if (!AnimFlow.instance) { AnimFlow.instance = new AnimFlow(options) }
            return AnimFlow.instance.init()
        }
        init() {
            if (this.options.disableOnLowPerformance && this.isLowPerformanceDevice()) { console.info('AnimFlow: Animations disabled due to low performance device detection'); return this }
            this.setupIntersectionObserver(); this.setupElements(); return this
        }
        setupEventSystem() { this.eventHandlers.set('animationStart', new Set()); this.eventHandlers.set('animationEnd', new Set()); this.eventHandlers.set('animationCancel', new Set()) }
        on(event, handler) {
            if (this.eventHandlers.has(event)) { this.eventHandlers.get(event).add(handler) }
            return this
        }
        off(event, handler) {
            if (this.eventHandlers.has(event)) { this.eventHandlers.get(event).delete(handler) }
            return this
        }
        trigger(event, data) {
            if (this.eventHandlers.has(event)) { this.eventHandlers.get(event).forEach(handler => handler(data)) }
            return this
        }
        setupBatchProcessor() { this.processBatch = () => { this.batchQueue.forEach(animation => { if (animation.element && document.body.contains(animation.element)) { this.processAnimation(animation) } }); this.batchQueue.clear(); this.animationFrame = null } }
        setupIntersectionObserver() { this.observer = new IntersectionObserver((entries) => { entries.forEach(entry => this.handleIntersection(entry)) }, { root: this.options.root, threshold: this.options.threshold, rootMargin: this.options.rootMargin }) }
        setupElements() { document.querySelectorAll('[data-anim]').forEach(element => { this.setupElement(element) }) }
        setupElement(element) {
            const effect = element.getAttribute('data-anim'); if (!effect) return; element.style.willChange = 'transform, opacity'; element.style.backfaceVisibility = 'hidden'; element.style.opacity = '0'; if (element instanceof SVGElement) { this.setupSVGElement(element, effect) } else if (element instanceof HTMLImageElement && !element.complete) { this.setupLazyImage(element, effect) } else { this.setupRegularElement(element, effect) }
            const sequence = element.getAttribute('data-anim-sequence'); if (sequence) { element.style.animationDelay = `${parseInt(sequence) * 100}ms` }
            this.elements.add(element); this.observer.observe(element)
        }
        setupSVGElement(element, effect) { 
            if (effect.includes('draw')) { 
                const duration = element.getAttribute('data-anim-duration') || 2000;
                const easing = element.getAttribute('data-anim-easing') || 'ease-in-out';
                
                SVGOptimizer.optimizePath(element); 
                element.style.willChange = 'stroke-dashoffset, stroke-dasharray';
                

                setTimeout(() => {
                    element.style.transition = `stroke-dashoffset ${duration}ms ${easing}`;
                    element.style.strokeDashoffset = '0';
                }, 50);
            } else { 
                this.setupRegularElement(element, effect); 
            } 
        }
        setupLazyImage(element, effect) { const onLoad = () => { this.setupRegularElement(element, effect); element.removeEventListener('load', onLoad) }; element.addEventListener('load', onLoad); ResourceManager.observeImage(element) }
        setupRegularElement(element, effect) {
            if (effect.includes('slide')) { element.style.transform = 'translateY(30px)' } else if (effect.includes('scale')) { element.style.transform = 'scale(0.8)' }
            const duration = element.getAttribute('data-anim-duration') || this.options.duration; const easing = element.getAttribute('data-anim-easing') || this.options.easing; element.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`
        }
        handleIntersection(entry) { const element = entry.target; if (entry.isIntersecting) { this.trigger('animationStart', { element }); requestAnimationFrame(() => { if (element instanceof SVGElement && element.getAttribute('data-anim').includes('draw')) { SVGOptimizer.animatePath(element, this.options.duration, this.options.easing) } else { element.style.opacity = '1'; element.style.transform = 'none' } }); if (this.options.repeat === 'once' || this.options.once) { this.observer.unobserve(element); this.elements.delete(element); this.trigger('animationEnd', { element }) } } else if (this.options.repeat === 'always') { this.trigger('animationCancel', { element }); element.style.opacity = '0'; const effect = element.getAttribute('data-anim'); if (effect.includes('slide')) { element.style.transform = 'translateY(30px)' } else if (effect.includes('scale')) { element.style.transform = 'scale(0.8)' } else if (effect.includes('draw') && element instanceof SVGElement) { SVGOptimizer.optimizePath(element) } } }
        syncAnimate(elements, options = {}) { const group = new Set(elements); const groupOptions = { ...this.options, ...options }; elements.forEach(element => { this.setupElement(element); element.style.transition = `opacity ${groupOptions.duration}ms ${groupOptions.easing}, transform ${groupOptions.duration}ms ${groupOptions.easing}` }); requestAnimationFrame(() => { elements.forEach(element => { element.style.opacity = '1'; element.style.transform = 'none' }) }); return { reset: () => { elements.forEach(element => { element.style.opacity = '0'; const effect = element.getAttribute('data-anim'); if (effect.includes('slide')) { element.style.transform = 'translateY(30px)' } else if (effect.includes('scale')) { element.style.transform = 'scale(0.8)' } }) } } }
        sequenceAnimate(elements, options = {}) { const delay = options.delay || 100; elements.forEach((element, index) => { element.setAttribute('data-anim-sequence', index.toString()); this.setupElement(element) }) }
        isLowPerformanceDevice() { return (!window.requestAnimationFrame || /Mobile|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)) }
        processAnimation(animation) { const { element, effect } = animation; element.style.opacity = '1'; element.style.transform = 'none' }
    }
    AnimFlow.defaults = { root: null, threshold: 0.1, rootMargin: '0px', once: !1, repeat: 'always', duration: 1000, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', disableOnLowPerformance: !1, enableLazyLoading: !0, enableVirtualScroll: !1, virtualScrollItemHeight: 50, sequenceDelay: 100, rtl: !1, performance: { useGPU: !0, batchSize: 10, debounceTime: 10 } }; if (typeof module !== 'undefined' && module.exports) { module.exports = AnimFlow } else { global.AnimFlow = AnimFlow }
})(typeof window !== 'undefined' ? window : this)