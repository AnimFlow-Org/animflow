# AnimFlow

A powerful, lightweight animation library for creating high-performance web animations with advanced features and minimal effort.

## Features

### Core Features
- **High Performance**: Hardware-accelerated animations with GPU optimization
- **Responsive**: Seamless performance across all devices and screen sizes
- **Zero Dependencies**: Standalone functionality with no external requirements
- **Lightweight**: Only 12.06KB compressed (CSS: 7.47KB, JS: 4.59KB), ~4KB minified

### Animation Features
- **Multiple Effects**: 10+ built-in animation effects
- **Sequence Animations**: Create choreographed animation sequences
- **Synchronized Animations**: Coordinate multiple animations together
- **Custom Timing**: Control animation duration and easing per element

### Performance Features
- **Virtual Scrolling**: Efficient handling of large lists
- **Lazy Loading**: Optimized image and resource loading
- **Batch Processing**: Smart animation queuing system
- **Performance Mode**: Automatic optimization for low-end devices
- **Memory Management**: Efficient resource cleanup and optimization

### Advanced Features
- **Event System**: Complete animation lifecycle events
- **RTL Support**: Full Right-to-Left language support
- **Flexible API**: Both attribute-based and programmatic control
- **Group Animations**: Coordinated animation patterns for groups

## Installation

### Using CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animflow@latest/dist/css/AnimFlow.css">
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/animflow@latest/dist/js/AnimFlow.js"></script>
```

### NPM Installation

```bash
npm install animflow
```

## Quick Start

```html
<!-- Add animation to any element using data-anim attribute -->
<div data-anim="fade-in">Fade in element</div>

<script>
// Initialize AnimFlow with options
AnimFlow.init({
    repeat: 'always',  // 'always', 'once', or 'none'
    enableLazyLoading: true,
    performance: {
        useGPU: true,
        batchSize: 10
    }
});
</script>
```

## Advanced Usage

### Animation Control
```javascript
// Initialize with advanced options
const anim = AnimFlow.init({
    threshold: 0.1,
    rootMargin: '0px',
    repeat: 'always',
    enableLazyLoading: true,
    enableVirtualScroll: true,
    virtualScrollItemHeight: 50,
    rtl: true,
    performance: {
        useGPU: true,
        batchSize: 10,
        debounceTime: 10
    }
});

// Event handling
anim.on('animationStart', data => console.log('Animation started', data));
anim.on('animationEnd', data => console.log('Animation completed', data));
```

### Virtual Scrolling
```javascript
// Initialize virtual scrolling for large lists
AnimFlow.VirtualScroller.init(container, 50);
```

### Sequence Animations
```html
<div class="sequence-group">
    <div data-anim="slide-in" data-anim-sequence="0">First</div>
    <div data-anim="slide-in" data-anim-sequence="1">Second</div>
    <div data-anim="slide-in" data-anim-sequence="2">Third</div>
</div>
```

### Lazy Loading
```html
<img data-src="image.jpg" data-anim="fade-in" alt="Lazy loaded image">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (basic support)

## Performance Considerations

- Automatically detects low-performance devices
- Optimizes animations for better performance
- Uses hardware acceleration when available
- Implements efficient resource management
- Provides virtual scrolling for large lists

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License - see the LICENSE file for details.

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/animflow@latest/dist/js/AnimFlow.js"></script>
```

#### unpkg
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/animflow@latest/dist/css/AnimFlow.css">

<!-- JavaScript -->
<script src="https://unpkg.com/animflow@latest/dist/js/AnimFlow.js"></script>
```

### Using npm

```bash
npm install animflow
```

Then use in your project:

```javascript
// Require CSS
require('animflow/dist/css/AnimFlow.main.css');

// Require JavaScript
const AnimFlow = require('animflow/dist/js/AnimFlow.main.js');
```

## Basic Usage

1. Add the `data-anim` attribute to elements you want to animate:

```html
<div data-anim="fade-in">
    This will fade in when scrolled into view
</div>
```

2. Initialize AnimFlow:

```javascript
const animFlow = new AnimFlow({
    duration: 1000,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    once: false,
    mirror: true,
    stagger: 200,
    performanceMode: 'auto',
    batchSize: 10
});
```

## Available Effects

- `fade-in`: Fade in with slight upward movement
- `slide-in`: Slide in from bottom
- `slide-left`: Slide in from left
- `slide-right`: Slide in from right
- `scale-in`: Scale up smoothly
- `scale-bounce`: Scale up with bounce effect
- `parallax`: Smooth parallax scrolling effect
- `fade-up`: Fade in with upward movement
- `rotate-in`: Rotate and scale in

## Advanced Usage

### SVG Path Animation

```html
<svg data-anim="draw-path">
    <path d="M10 10 L90 90" />
</svg>
```

### Group Animations

```html
<div data-anim-group="cards" data-anim-mode="sequence">
    <div data-anim="fade-in">Card 1</div>
    <div data-anim="fade-in">Card 2</div>
    <div data-anim="fade-in">Card 3</div>
</div>
```

### Custom Timing

```html
<div 
    data-anim="slide-in"
    data-anim-delay="200"
    data-anim-duration="1500"
    data-anim-easing="cubic-bezier(0.34, 1.56, 0.64, 1)">
    Custom timing animation
</div>
```

## Configuration Options

```javascript
{
    offset: 100,          // Parallax scroll offset
    delay: 0,            // Base delay for animations
    duration: 1000,      // Animation duration in ms
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Animation timing function
    once: false,         // Run animation only once
    mirror: true,        // Reset animation when scrolling up
    stagger: 200,        // Delay between group animations
    threshold: [0, 0.2], // Intersection observer thresholds
    drawDuration: 1500,  // SVG path drawing duration
    performanceMode: 'auto', // Performance optimization mode
    batchSize: 10,      // Batch size for performance mode
    groupModes: {
        sequence: true,  // Enable sequence mode for groups
        random: true    // Enable random mode for groups
    }
}
```

## Performance Features

### Performance Mode

AnimFlow includes an intelligent performance optimization system that automatically adjusts animation processing based on the number of animated elements and device capabilities:

- `auto`: Automatically switches to batch processing when needed
- `force`: Always uses batch processing for animations
- `off`: Processes all animations immediately

### Batch Processing

When performance mode is active, AnimFlow processes animations in batches to maintain smooth performance:

```javascript
const animFlow = new AnimFlow({
    performanceMode: 'auto',
    batchSize: 10
});
```

### Group Animation Modes

Different animation patterns for grouped elements:

- `sequence`: Animate elements one after another
- `random`: Animate elements in random order
- `sync`: Animate all elements simultaneously

```html
<div data-anim-group="cards" data-anim-mode="sequence">
    
</div>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Android Chrome

## Performance Tips

1. Use `transform` and `opacity` for smooth animations
2. Enable hardware acceleration for better performance
3. Use appropriate thresholds for intersection observer
4. Optimize SVG paths for smoother animations
5. Use performance mode for large number of animations
6. Choose appropriate batch sizes based on device capabilities
7. Use group modes effectively for complex animations

## License

MIT License - Feel free to use in personal and commercial projects.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Support

For issues and feature requests, please use the GitHub issues page.
