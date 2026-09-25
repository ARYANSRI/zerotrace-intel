/**
 * ZeroTrace Intel - Robust Animation Engine
 * GSAP + ScrollTrigger, Motion One & Anime.js
 */

function initAnimations() {
  console.log("Initializing ZeroTrace Motion Suite...");

  if (typeof gsap === "undefined") {
    console.error("GSAP library script missing!");
    return;
  }

  // Register ScrollTrigger
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    console.log("ScrollTrigger Registered.");
  }

  // 1. HERO ANIMATION (GSAP Timeline)
  setupHeroAnimation();

  // 2. HOW IT WORKS PIPELINE (GSAP ScrollTrigger Step-by-Step Focus)
  setupPipelineAnimation();

  // 3. TEAM GRID (Motion One / GSAP Hover & Touch spring)
  setupTeamGridAnimations();

  // 4. TECH STACK & TIMELINE STAGGER (Anime.js)
  setupStaggerAnimations();
}

/**
 * Hero Section Animation
 * Character split assembly + photo strip fan out
 */
function setupHeroAnimation() {
  const heroTitle = document.getElementById("hero-title");
  if (!heroTitle) return;

  // Split title text into character spans
  const rawText = heroTitle.textContent.trim();
  heroTitle.innerHTML = "";
  
  const chars = [];
  for (let i = 0; i < rawText.length; i++) {
    const char = rawText[i];
    const span = document.createElement("span");
    if (char === " ") {
      span.className = "space";
      span.innerHTML = "&nbsp;";
    } else {
      span.className = "char";
      span.textContent = char;
      chars.push(span);
    }
    heroTitle.appendChild(span);
  }

  // Master Hero Timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 1. Character assembly
  tl.from(chars, {
    y: 90,
    opacity: 0,
    rotateX: -45,
    duration: 1.1,
    stagger: 0.04,
    ease: "back.out(1.5)"
  });

  // 2. Photo strip fan-out
  tl.from(".fanned-photo-strip .photo-card", {
    y: 120,
    opacity: 0,
    scale: 0.75,
    stagger: 0.12,
    duration: 1.2,
    ease: "power3.out"
  }, "-=0.7");
}

/**
 * How It Works Pinned Pipeline (ScrollTrigger Scrub)
 * Highlights each step card smoothly 1 by 1 as the user scrolls
 */
function setupPipelineAnimation() {
  const steps = gsap.utils.toArray(".pipeline-step");
  if (!steps.length || typeof ScrollTrigger === "undefined") return;

  steps.forEach((step) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: step,
        start: "top 75%",
        end: "bottom 35%",
        toggleActions: "play reverse play reverse",
        onEnter: () => step.classList.add("active-step"),
        onLeave: () => step.classList.remove("active-step"),
        onEnterBack: () => step.classList.add("active-step"),
        onLeaveBack: () => step.classList.remove("active-step")
      }
    })
    .to(step, {
      opacity: 1,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
  });
}

/**
 * Team Grid Interactivity (Motion One + Spring Physics)
 */
function setupTeamGridAnimations() {
  const cards = document.querySelectorAll(".team-member-item");

  cards.forEach((card) => {
    const handleEnter = () => {
      card.classList.add("active-hover");
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        boxShadow: "0 20px 40px rgba(255, 0, 0, 0.35)",
        borderColor: "#FF0000",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleLeave = () => {
      card.classList.remove("active-hover");
      gsap.to(card, {
        scale: 1.0,
        y: 0,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
        borderColor: "rgba(255, 0, 0, 0.22)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);
    card.addEventListener("touchstart", handleEnter, { passive: true });
    card.addEventListener("touchend", handleLeave, { passive: true });
  });
}

/**
 * Tech Stack & Timeline Scroll Animations (Anime.js)
 */
function setupStaggerAnimations() {
  if (typeof anime === "undefined") return;

  // Tech Stack Cards Stagger
  const techGrid = document.querySelector(".tech-grid");
  if (techGrid) {
    let animatedTech = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedTech) {
          animatedTech = true;
          anime({
            targets: ".tech-item",
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(90),
            duration: 850,
            easing: "easeOutExpo"
          });
        }
      });
    }, { threshold: 0.15 });

    observer.observe(techGrid);
  }

  // Timeline Items Stagger
  const timelineList = document.querySelector(".timeline-list");
  if (timelineList) {
    let animatedTimeline = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedTimeline) {
          animatedTimeline = true;
          anime({
            targets: ".timeline-item",
            translateX: [-40, 0],
            opacity: [0, 1],
            delay: anime.stagger(120),
            duration: 900,
            easing: "easeOutQuart"
          });
        }
      });
    }, { threshold: 0.15 });

    observer.observe(timelineList);
  }
}

// Execute initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}
