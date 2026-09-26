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

  // 1. PRELOADER OVERLAY & HERO SEQUENCING
  setupPreloader(() => {
    // Hero entrance animation runs only after preloader finishes exit
    setupHeroAnimation();
  });

  // 2. HOW IT WORKS PIPELINE (GSAP ScrollTrigger Step-by-Step Focus)
  setupPipelineAnimation();

  // 3. TEAM GRID (Motion One / GSAP Hover & Touch spring)
  setupTeamGridAnimations();

  // 4. TECH STACK & TIMELINE STAGGER (Anime.js)
  setupStaggerAnimations();
}

/**
 * Preloader Animation
 * Multilingual cycling greetings + crimson progress indicator
 */
function setupPreloader(onCompleteCallback) {
  const preloader = document.getElementById("preloader");
  const fillEl = document.getElementById("preloader-fill");
  const counterEl = document.getElementById("preloader-counter");
  const wordEls = preloader ? preloader.querySelectorAll(".preloader-word") : [];

  if (!preloader || !wordEls.length || typeof gsap === "undefined") {
    if (typeof onCompleteCallback === "function") onCompleteCallback();
    return;
  }

  let isTimelineFinished = false;
  let isWindowLoaded = (document.readyState === "complete");

  const exitPreloader = () => {
    gsap.to(preloader, {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        preloader.style.display = "none";
        if (typeof onCompleteCallback === "function") {
          onCompleteCallback();
        }
      }
    });
  };

  const tryExit = () => {
    if (isTimelineFinished && isWindowLoaded) {
      exitPreloader();
    }
  };

  if (!isWindowLoaded) {
    window.addEventListener("load", () => {
      isWindowLoaded = true;
      tryExit();
    });
  }

  // Build GSAP Timeline for word cycle + progress
  const mainTl = gsap.timeline({
    onComplete: () => {
      isTimelineFinished = true;
      tryExit();
    }
  });

  const stepIn = 0.25;
  const stepHold = 0.12;
  const stepOut = 0.25;
  const totalDuration = wordEls.length * (stepIn + stepHold + stepOut);

  // Progress Bar & Counter Animation
  if (fillEl) {
    mainTl.to(fillEl, {
      scaleX: 1,
      duration: totalDuration,
      ease: "none"
    }, 0);
  }

  if (counterEl) {
    const counterObj = { val: 0 };
    mainTl.to(counterObj, {
      val: 100,
      duration: totalDuration,
      ease: "none",
      onUpdate: () => {
        counterEl.textContent = `${Math.floor(counterObj.val)}%`;
      }
    }, 0);
  }

  // Word Animation Sequence across all 8 language elements
  let currentTime = 0;
  wordEls.forEach((el) => {
    mainTl.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: stepIn, ease: "power2.out", immediateRender: false },
      currentTime
    );

    const fadeOutStart = currentTime + stepIn + stepHold;
    mainTl.to(
      el,
      { opacity: 0, y: -20, duration: stepOut, ease: "power2.in" },
      fadeOutStart
    );

    currentTime += stepIn + stepHold + stepOut;
  });
}

/**
 * Hero Section Animation
 * Character split assembly + photo strip fan out
 */
function setupHeroAnimation() {
  const heroTitle = document.getElementById("hero-title");
  if (!heroTitle) return;

  // Render separate word spans for "ZERO", "TRACE", "INTEL"
  const words = ["ZERO", "TRACE", "INTEL"];
  heroTitle.innerHTML = "";
  
  const chars = [];
  words.forEach((wordText, wIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";

    for (let i = 0; i < wordText.length; i++) {
      const charSpan = document.createElement("span");
      charSpan.className = "char";
      charSpan.textContent = wordText[i];
      wordSpan.appendChild(charSpan);
      chars.push(charSpan);
    }

    heroTitle.appendChild(wordSpan);

    if (wIndex < words.length - 1) {
      const spaceNode = document.createTextNode(" ");
      heroTitle.appendChild(spaceNode);
    }
  });

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
 * Team Grid Interactivity (GSAP 3D Card Flip Engine)
 */
function setupTeamGridAnimations() {
  const cards = document.querySelectorAll(".team-member-item");
  let activeFlippedCard = null;

  cards.forEach((card) => {
    const inner = card.querySelector(".team-card-inner");
    if (!inner) return;

    card._isFlipped = false;

    const toggleFlip = (e) => {
      // Allow social link clicks to proceed without triggering card flip
      if (e.target.closest("a")) return;

      e.preventDefault();

      // If another card is already flipped, flip it back first
      if (activeFlippedCard && activeFlippedCard !== card) {
        const prevInner = activeFlippedCard.querySelector(".team-card-inner");
        if (prevInner) {
          const prevTl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.inOut" } });
          prevTl.to(prevInner, { rotateY: 0 }, 0)
                .to(prevInner, { scale: 1.03, duration: 0.3 }, 0)
                .to(prevInner, { scale: 1, duration: 0.3 }, 0.3);
          activeFlippedCard._isFlipped = false;
        }
        activeFlippedCard = null;
      }

      const nextState = !card._isFlipped;
      card._isFlipped = nextState;

      const flipTl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.inOut" } });

      if (nextState) {
        activeFlippedCard = card;
        flipTl.to(inner, { rotateY: 180 }, 0)
              .to(inner, { scale: 1.03, duration: 0.3 }, 0)
              .to(inner, { scale: 1, duration: 0.3 }, 0.3);
      } else {
        activeFlippedCard = null;
        flipTl.to(inner, { rotateY: 0 }, 0)
              .to(inner, { scale: 1.03, duration: 0.3 }, 0)
              .to(inner, { scale: 1, duration: 0.3 }, 0.3);
      }
    };

    const handleEnter = () => {
      if (!card._isFlipped) {
        gsap.to(inner, {
          scale: 1.03,
          y: -6,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleLeave = () => {
      if (!card._isFlipped) {
        gsap.to(inner, {
          scale: 1.0,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    card.addEventListener("click", toggleFlip);
    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);
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
