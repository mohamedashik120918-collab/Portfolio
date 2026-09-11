import React, { useEffect, useRef, useState } from "react";

function SpidermanMaskSvg({ isHovered, isClicking }: { isHovered: boolean; isClicking: boolean }) {
  return (
    <div className={`spidey-mask-container ${isHovered ? "is-hovered" : ""} ${isClicking ? "is-clicking" : ""}`}>
      {/* Spider-Sense Sensory Arcs (tingles on hover) */}
      <svg
        className={`spidey-sense-aura ${isHovered ? "active" : ""}`}
        viewBox="0 0 80 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 28 26 Q 40 14, 52 26" stroke="#ff3845" strokeWidth="2" strokeLinecap="round" className="sense-arc arc-1" />
        <path d="M 18 18 Q 40 2, 62 18" stroke="#ff5c68" strokeWidth="2.2" strokeLinecap="round" className="sense-arc arc-2" />
        <path d="M 8 10 Q 40 -10, 72 10" stroke="#ff9ca5" strokeWidth="2" strokeLinecap="round" className="sense-arc arc-3" />
      </svg>

      {/* The Premium Spider-Man Mask Vector */}
      <svg
        className="spidey-mask-svg"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Rich 3D Crimson Mask Radial Shading */}
          <radialGradient id="spideyMaskShading" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#ff3a48" />
            <stop offset="38%" stopColor="#e50914" />
            <stop offset="75%" stopColor="#9c040e" />
            <stop offset="100%" stopColor="#4f0006" />
          </radialGradient>

          {/* Mask Edge Rim Light */}
          <linearGradient id="spideyEdgeBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7b87" />
            <stop offset="45%" stopColor="#b80916" />
            <stop offset="100%" stopColor="#2b0003" />
          </linearGradient>

          {/* High-Gloss Eye Lens Gradient */}
          <linearGradient id="spideyLensGradient" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f2f7fc" />
            <stop offset="100%" stopColor="#c5dcfa" />
          </linearGradient>

          {/* Eye Lens Glow Filter */}
          <filter id="spideyEyeGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ff1e2d" floodOpacity="0.8" />
          </filter>

          {/* Mask Base Drop Shadow */}
          <filter id="spideyMaskShadowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#ff1e2d" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Mask Silhouette */}
        <g filter="url(#spideyMaskShadowFilter)">
          <path
            d="M 50 5 C 76 5, 95 24, 95 56 C 95 86, 73 111, 50 117 C 27 111, 5 86, 5 56 C 5 24, 24 5, 50 5 Z"
            fill="url(#spideyMaskShading)"
            stroke="url(#spideyEdgeBevel)"
            strokeWidth="2.2"
          />
        </g>

        {/* 2. Webbing Grid Lines */}
        <g stroke="#1a0204" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.8">
          {/* Vertical Center Spine */}
          <path d="M 50 5 L 50 117" />

          {/* Radiating Spokes from Center Bridge */}
          <path d="M 50 50 L 22 7" />
          <path d="M 50 50 L 78 7" />
          <path d="M 50 50 L 6 27" />
          <path d="M 50 50 L 94 27" />
          <path d="M 50 50 L 5 52" />
          <path d="M 50 50 L 95 52" />
          <path d="M 50 50 L 9 78" />
          <path d="M 50 50 L 91 78" />
          <path d="M 50 50 L 25 105" />
          <path d="M 50 50 L 75 105" />

          {/* Concentric Web Arches */}
          {/* Forehead */}
          <path d="M 36 12 Q 50 19, 64 12" />
          <path d="M 24 23 Q 50 35, 76 23" />
          <path d="M 15 37 Q 50 51, 85 37" />
          {/* Lower Face */}
          <path d="M 20 74 Q 50 63, 80 74" />
          <path d="M 30 92 Q 50 82, 70 92" />
          <path d="M 40 107 Q 50 100, 60 107" />
        </g>

        {/* 3. Authentic Spider-Man Comic Eyes */}
        <g filter={isHovered ? "url(#spideyEyeGlowFilter)" : undefined}>
          {/* Left Eye: Outer Bold Black Frame */}
          <path
            d="M 46 54 C 38 44, 27 38, 14 36 C 11 46, 15 65, 26 73 C 36 75, 44 65, 46 54 Z"
            fill="#060102"
            stroke="#1a0406"
            strokeWidth="1.2"
          />

          {/* Right Eye: Outer Bold Black Frame (Perfect Mirror) */}
          <path
            d="M 54 54 C 62 44, 73 38, 86 36 C 89 46, 85 65, 74 73 C 64 75, 56 65, 54 54 Z"
            fill="#060102"
            stroke="#1a0406"
            strokeWidth="1.2"
          />

          {/* Left Eye: Inner Glowing White Lens */}
          <path
            d="M 43 54 C 36 45, 27 40, 17 39 C 14 47, 18 63, 26 69 C 34 71, 41 62, 43 54 Z"
            fill="url(#spideyLensGradient)"
          />
          {/* Left Eye: High-Gloss Specular Glint */}
          <path
            d="M 22 43 C 28 42, 34 44, 39 48 C 34 47, 28 46, 22 45 Z"
            fill="#ffffff"
            opacity="0.85"
          />

          {/* Right Eye: Inner Glowing White Lens (Perfect Mirror) */}
          <path
            d="M 57 54 C 64 45, 73 40, 83 39 C 86 47, 82 63, 74 69 C 66 71, 59 62, 57 54 Z"
            fill="url(#spideyLensGradient)"
          />
          {/* Right Eye: High-Gloss Specular Glint */}
          <path
            d="M 78 43 C 72 42, 66 44, 61 48 C 66 47, 72 46, 78 45 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Persistent refs so animation loop and event handlers NEVER restart or jump
  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isDisabledRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let ringX = mouseX;
    let ringY = mouseY;
    let currentScale = 1.0;
    let currentTilt = 0;
    let targetTilt = 0;
    let animId = 0;

    // Authentic Spiderman Spider-Web Click Splat System
    interface RealSpiderWeb {
      x: number;
      y: number;
      maxRadius: number;
      createdAt: number;
      duration: number;
      spokes: number;
      rings: number;
      angles: number[];
      spokeLengths: number[];
    }

    interface MotionTrailPoint {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
    }

    const activeWebs: RealSpiderWeb[] = [];
    const motionTrail: MotionTrailPoint[] = [];
    let lastTrailX = mouseX;
    let lastTrailY = mouseY;

    const canvas = canvasRef.current;
    let ctx = canvas ? canvas.getContext("2d") : null;

    const setupCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if mouse is hovering over the contact form where custom cursor is disabled
      const target = e.target as HTMLElement | null;
      const isFormZone = Boolean(
        target?.closest("#contact form, [data-no-cursor], .no-custom-cursor")
      );
      if (isFormZone !== isDisabledRef.current) {
        isDisabledRef.current = isFormZone;
        setIsDisabled(isFormZone);
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
        // Instant snap ring to mouse on initial appearance
        ringX = mouseX;
        ringY = mouseY;
      }

      const deltaX = mouseX - prevMouseX;
      prevMouseX = mouseX;

      // Dynamic tilt in direction of movement
      targetTilt = Math.max(-16, Math.min(16, deltaX * 0.8));

      // Subtle motion trail (only if not over form)
      if (!isFormZone) {
        const moveDist = Math.hypot(mouseX - lastTrailX, mouseY - lastTrailY);
        if (moveDist > 14) {
          motionTrail.unshift({
            x: mouseX,
            y: mouseY,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            life: 1.0,
            decay: 0.038,
          });

          lastTrailX = mouseX;
          lastTrailY = mouseY;

          if (motionTrail.length > 20) {
            motionTrail.length = 20;
          }
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Do not trigger click animation or webs when clicking inside form
      if (isDisabledRef.current) return;

      isClickingRef.current = true;
      setIsClicking(true);

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Original iconic 10-spoke Spider-Man web design, scaled down to a compact size
      const SPOKES = 10;
      const angles: number[] = [];
      const spokeLengths: number[] = [];
      const baseAngle = Math.random() * Math.PI * 2;

      for (let i = 0; i < SPOKES; i++) {
        angles.push(baseAngle + (i * Math.PI * 2) / SPOKES + (Math.random() - 0.5) * 0.08);
        spokeLengths.push(0.9 + Math.random() * 0.2);
      }

      activeWebs.push({
        x: clickX,
        y: clickY,
        maxRadius: 65 + Math.random() * 12, // Compact smaller size (~65px-77px)
        createdAt: performance.now(),
        duration: 1300, // Lingers gracefully for ~1.3s with gradual gentle fade-out
        spokes: SPOKES,
        rings: 4, // 4 concentric sagging web rings
        angles,
        spokeLengths,
      });

      // Keep only up to 4 concurrent webs
      if (activeWebs.length > 4) {
        activeWebs.shift();
      }
    };

    const onMouseUp = () => {
      isClickingRef.current = false;
      setIsClicking(false);
    };

    const onMouseLeaveWindow = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnterWindow = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ringX = mouseX;
      ringY = mouseY;
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    // Reliable event delegation for interactive hover targets
    // NOTE: Excluded broad '.glass-card' container to prevent hover flickering & lag when traversing card grids
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check disabled form zone
      const isFormZone = Boolean(
        target.closest("#contact form, [data-no-cursor], .no-custom-cursor")
      );
      if (isFormZone !== isDisabledRef.current) {
        isDisabledRef.current = isFormZone;
        setIsDisabled(isFormZone);
      }

      const interactive = Boolean(
        target.closest(
          "a, button, [role='button'], input, textarea, select, .menu-btn, .project-tab, [data-interactive], .shimmer-btn, .cursor-pointer"
        )
      );
      if (interactive !== isHoveredRef.current) {
        isHoveredRef.current = interactive;
        setIsHovered(interactive);
      }
    };

    document.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    // 60fps Lock Animation Loop for Spiderman Mask, Orbital Ring & Real Spider-Web Canvas
    const loop = () => {
      animId = requestAnimationFrame(loop);

      // 1. Tilt damping
      currentTilt += (targetTilt - currentTilt) * 0.15;
      targetTilt *= 0.88;

      // 2. Spiderman Mask: Instant zero-latency lock with tilt
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${currentTilt.toFixed(2)}deg)`;
      }

      // 3. Orbital Ring: Adaptive tight tracking (fixes the lagging behind / bug in cards section)
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      const dist = Math.hypot(dx, dy);

      // If cursor jumps a huge distance (e.g. window re-entry), snap immediately
      if (dist > 300) {
        ringX = mouseX;
        ringY = mouseY;
      } else {
        // Adaptive lerp: smooth when micro-moving, snappy when traversing cards so it never falls far behind
        const lerpFactor = Math.min(0.62, 0.38 + dist * 0.0014);
        ringX += dx * lerpFactor;
        ringY += dy * lerpFactor;
      }

      // Smooth scale interpolation in JS
      const targetScale = isClickingRef.current ? 0.78 : isHoveredRef.current ? 1.35 : 1.0;
      currentScale += (targetScale - currentScale) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) scale(${currentScale.toFixed(3)})`;
      }

      // 4. Render Spider-Web & Motion Silk Canvas
      if (ctx && canvas) {
        // Clear canvas with full DPR support
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        const now = performance.now();

        // A. Draw Authentic Spider-Web Click Splats (Original Design, Compact Size & Smooth Fade)
        for (let w = activeWebs.length - 1; w >= 0; w--) {
          const web = activeWebs[w];
          const elapsed = now - web.createdAt;
          if (elapsed >= web.duration) {
            activeWebs.splice(w, 1);
            continue;
          }

          // Smooth initial shoot-out expansion in first 140ms with smooth cubic ease-out
          const shootProgress = Math.min(1, elapsed / 140);
          const shootEase = 1 - Math.pow(1 - shootProgress, 3);
          const currentR = web.maxRadius * shootEase;

          // Gradual, soft "lite lite ah" fade out starting gently after shoot-out
          const fadeStart = 140;
          const fadeProgress = Math.max(0, (elapsed - fadeStart) / (web.duration - fadeStart));
          const alpha = Math.pow(1 - fadeProgress, 1.4);

          if (alpha <= 0.005) continue;

          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Expanding silk shockwave halo
          if (shootProgress < 1.0) {
            const shockR = currentR * 1.06;
            ctx.beginPath();
            ctx.arc(web.x, web.y, shockR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 30, 45, ${(1 - shootProgress) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // 1. Radial Spokes
          const spokePoints: { x: number; y: number }[] = [];
          for (let i = 0; i < web.spokes; i++) {
            const angle = web.angles[i];
            const len = currentR * web.spokeLengths[i];
            const tipX = web.x + Math.cos(angle) * len;
            const tipY = web.y + Math.sin(angle) * len;
            spokePoints.push({ x: tipX, y: tipY });

            // Core spoke thread
            ctx.beginPath();
            ctx.moveTo(web.x, web.y);
            ctx.lineTo(tipX, tipY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.82})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();

            // Spoke tip anchor silk forks (Spiderman web anchor splat at tips, scaled for compact size)
            if (shootProgress > 0.7) {
              const forkLen = 7.5 * web.spokeLengths[i] * shootEase;
              const forkA1 = angle - 0.38;
              const forkA2 = angle + 0.38;
              ctx.beginPath();
              ctx.moveTo(tipX, tipY);
              ctx.lineTo(tipX + Math.cos(forkA1) * forkLen, tipY + Math.sin(forkA1) * forkLen);
              ctx.moveTo(tipX, tipY);
              ctx.lineTo(tipX + Math.cos(forkA2) * forkLen, tipY + Math.sin(forkA2) * forkLen);
              ctx.strokeStyle = `rgba(255, 30, 45, ${alpha * 0.75})`;
              ctx.lineWidth = 0.95;
              ctx.stroke();
            }
          }

          // 2. Concentric Spiderweb Rings with iconic inward catenary arcs!
          for (let r = 1; r <= web.rings; r++) {
            const ringFraction = r / (web.rings + 0.25);
            const ringRadius = currentR * ringFraction;
            if (ringRadius < 5) continue;

            const ringAlpha = alpha * Math.max(0, 1 - (r / web.rings) * 0.28 * fadeProgress);
            if (ringAlpha <= 0.01) continue;

            for (let i = 0; i < web.spokes; i++) {
              const nextI = (i + 1) % web.spokes;
              const a1 = web.angles[i];
              const a2 = web.angles[nextI];
              const r1 = ringRadius * web.spokeLengths[i];
              const r2 = ringRadius * web.spokeLengths[nextI];

              const p1x = web.x + Math.cos(a1) * r1;
              const p1y = web.y + Math.sin(a1) * r1;
              const p2x = web.x + Math.cos(a2) * r2;
              const p2y = web.y + Math.sin(a2) * r2;

              // Inward Sag Control Point (curving towards web center)
              const midX = (p1x + p2x) / 2;
              const midY = (p1y + p2y) / 2;
              const sag = 0.24; // Real spiderweb inward curvature
              const ctrlX = midX + (web.x - midX) * sag;
              const ctrlY = midY + (web.y - midY) * sag;

              ctx.beginPath();
              ctx.moveTo(p1x, p1y);
              ctx.quadraticCurveTo(ctrlX, ctrlY, p2x, p2y);

              // Alternating ring colors between crisp white silk and crimson silk
              if (r % 2 === 0) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha * 0.75})`;
                ctx.lineWidth = 0.95;
              } else {
                ctx.strokeStyle = `rgba(255, 30, 45, ${ringAlpha * 0.88})`;
                ctx.lineWidth = 1.1;
              }
              ctx.stroke();

              // Glistening silk droplet at each spoke-ring intersection
              ctx.beginPath();
              ctx.arc(p1x, p1y, 1.25, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${ringAlpha * 0.9})`;
              ctx.fill();
            }
          }

          // 3. Central Web Impact Knot (Glowing crimson-and-white core)
          ctx.beginPath();
          ctx.arc(web.x, web.y, Math.max(1, 5.5 * (1 - fadeProgress * 0.5)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 30, 45, ${alpha * 0.3})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(web.x, web.y, Math.max(1, 2.8 * (1 - fadeProgress * 0.4)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 30, 45, ${alpha * 0.95})`;
          ctx.shadowColor = "#ff1e2d";
          ctx.shadowBlur = 7 * alpha;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(web.x, web.y, Math.max(0.8, 1.3 * (1 - fadeProgress * 0.4)), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.98})`;
          ctx.shadowBlur = 0;
          ctx.fill();

          ctx.restore();
        }

        // B. Draw Movement Silk Trail
        if (motionTrail.length > 1) {
          ctx.save();
          ctx.lineCap = "round";

          for (let i = 0; i < motionTrail.length - 1; i++) {
            const p1 = motionTrail[i];
            const p2 = motionTrail[i + 1];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 80) {
              const alpha = Math.min(p1.life, p2.life) * 0.42;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 30, 45, ${alpha})`;
              ctx.lineWidth = 0.95;
              ctx.stroke();

              // Lead thread to current cursor
              if (i === 0) {
                const leadDist = Math.hypot(mouseX - p1.x, mouseY - p1.y);
                if (leadDist < 70) {
                  const leadAlpha = (1 - leadDist / 70) * p1.life * 0.5;
                  ctx.beginPath();
                  ctx.moveTo(mouseX, mouseY);
                  ctx.lineTo(p1.x, p1.y);
                  ctx.strokeStyle = `rgba(255, 255, 255, ${leadAlpha})`;
                  ctx.lineWidth = 1.0;
                  ctx.stroke();
                }
              }
            }

            p1.life -= p1.decay;
            p1.x += p1.vx;
            p1.y += p1.vy;
          }

          // Remove expired trail points
          for (let i = motionTrail.length - 1; i >= 0; i--) {
            if (motionTrail[i].life <= 0) {
              motionTrail.splice(i, 1);
            }
          }

          ctx.restore();
        }
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []); // Run ONCE on mount: fixes the circle lag / bugging out!

  if (isTouch) return null;

  return (
    <>
      {/* 0. Fullscreen Spider-Web Trail Canvas */}
      <canvas
        ref={canvasRef}
        className={`cursor-web-canvas ${isVisible && !isDisabled ? "visible" : ""}`}
        aria-hidden="true"
      />

      <div
        className={`cursor-portal ${isVisible && !isDisabled ? "visible" : ""} ${
          isHovered ? "hovered" : ""
        } ${isClicking ? "clicking" : ""}`}
        aria-hidden="true"
      >
        {/* 1. The Core Spider-Man Mask Logo */}
        <div ref={dotRef} className="cursor-spidey-anchor">
          <SpidermanMaskSvg isHovered={isHovered} isClicking={isClicking} />
        </div>

        {/* 2. Concentric Orbital Halo Ring */}
        <div ref={ringRef} className="cursor-orbital-ring">
          <span className="ring-pulse" />
          <span className="ring-crosshair ch-top" />
          <span className="ring-crosshair ch-bottom" />
          <span className="ring-crosshair ch-left" />
          <span className="ring-crosshair ch-right" />
        </div>
      </div>
    </>
  );
}

export default CustomCursor;
