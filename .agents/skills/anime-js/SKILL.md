---
name: anime-js
description: Official Anime.js skill for complex JavaScript animations, SVG morphing, path tracking, timeline orchestration, and staggered animations.
---

# Anime.js

## Overview
Anime.js is a flexible JavaScript animation library that works with CSS properties, SVG, DOM attributes, and JavaScript Objects.

## Basic Usage
```javascript
import anime from 'animejs';

anime({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800,
  easing: 'easeInOutQuad'
});
```

## Staggered Animations
```javascript
anime({
  targets: '.grid-item',
  scale: [0.1, 1],
  opacity: [0, 1],
  delay: anime.stagger(100, { grid: [14, 5], from: 'center' }),
  easing: 'easeOutQuad'
});
```

## Timeline Sequencing
```javascript
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl.add({
  targets: '.element-1',
  translateX: 250,
}).add({
  targets: '.element-2',
  translateY: 250,
}, '-=600');
```
