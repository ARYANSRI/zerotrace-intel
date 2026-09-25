---
name: coconut-ui
description: Skill for implementing Coconut UI design patterns, animated React components, Bento grids, Framer Motion transitions, and interactive dark-mode components.
---

# Coconut UI

## Overview
Coconut UI is a modern React/Next.js UI design system featuring interactive, highly animated, copy-and-paste styled components using Tailwind CSS and Framer Motion / Motion.

## Design Principles
- **Motion-First**: Every interactive component (buttons, cards, menus) features fluid micro-interactions.
- **Glassmorphism & Gradients**: Deep dark mode backdrops with translucent borders and soft glow highlights.
- **Bento Layouts**: Responsive grid systems for feature showcases.

## Example: Coconut Animated Card Component
```jsx
import { motion } from "motion/react";

export function CoconutCard({ title, description, badge }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl shadow-xl hover:border-zinc-700 overflow-hidden group"
    >
      {/* Coconut Glow Effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {badge && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </motion.div>
  );
}
```
