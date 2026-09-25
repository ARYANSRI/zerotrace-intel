---
name: backlit-ui
description: Skill for implementing backlit UI components, glowing neon borders, ambient dark mode aesthetics, glassmorphism, dynamic lighting, and reactive spotlight effects.
---

# Backlit UI & Ambient Glowing Effects

## Design Philosophy
Backlit UI uses radial gradients, dynamic box shadows, blur backdrops, and mouse tracking to create futuristic, luminous, and tactile dark-mode interfaces.

## Key CSS Patterns

### 1. Ambient Glow Card
```css
.backlit-card {
  position: relative;
  background: rgba(18, 18, 24, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 25px rgba(99, 102, 241, 0.15);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.backlit-card:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 35px rgba(99, 102, 241, 0.35), inset 0 0 15px rgba(99, 102, 241, 0.1);
}
```

### 2. Interactive Mouse Spotlight Glow
```javascript
const card = document.querySelector('.backlit-card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
});
```

```css
.backlit-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    rgba(99, 102, 241, 0.25), 
    transparent 40%
  );
  z-index: 0;
  pointer-events: none;
}
```
