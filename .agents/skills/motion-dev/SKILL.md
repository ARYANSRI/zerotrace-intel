---
name: motion-dev
description: Official Motion (Framer Motion / Motion One) skill for modern web animations, gestures, keyframes, scroll-driven animations, and React/JS integration.
---

# Motion Dev (Framer Motion / Motion One)

## Overview
Motion (`motion`) is a fast, lightweight, and modern animation engine for JavaScript and React.

## Usage in Vanilla JS
```javascript
import { animate, scroll, inView } from "motion";

// Basic animation
animate(".box", { x: 100, opacity: 1 }, { duration: 0.8, easing: "ease-in-out" });

// Scroll-linked animation
scroll(animate(".progress-bar", { scaleX: [0, 1] }));

// In-view trigger
inView(".card", ({ target }) => {
  animate(target, { opacity: 1, y: [50, 0] }, { duration: 0.5 });
});
```

## Usage in React
```jsx
import { motion } from "motion/react";

export function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      Interactive Card
    </motion.div>
  );
}
```
