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
  const [isTouch, setIsTouch] = useState(false);

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
    let currentTilt = 0;
    let targetTilt = 0;
    let animId = 0;

    // Spider-Web Trail & Click Burst System
    interface WebNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      isCompanion: boolean;
      isClickBurst?: boolean;
      spokeIndex?: number;
      ringLevel?: number;
      originX?: number;
      originY?: number;
      decay: number;
    }

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }

    const webNodes: WebNode[] = [];
    const shockwaves: Shockwave[] = [];
    let lastSpawnX = mouseX;
    let lastSpawnY = mouseY;

    const canvas = canvasRef.current;
    let ctx = canvas ? canvas.getContext("2d") : null;

    const setupCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const deltaX = mouseX - prevMouseX;
      prevMouseX = mouseX;

      // Subtle dynamic tilt in direction of movement
      targetTilt = Math.max(-18, Math.min(18, deltaX * 0.9));

      // Spawn Spider-Web trail points when moving
      const moveDist = Math.hypot(mouseX - lastSpawnX, mouseY - lastSpawnY);
      if (moveDist > 9) {
        const angle = Math.atan2(mouseY - lastSpawnY, mouseX - lastSpawnX);
        const perpAngle = angle + Math.PI / 2;

        // Primary trajectory node
        webNodes.unshift({
          x: mouseX,
          y: mouseY,
          vx: 0,
          vy: 0,
          life: 1.0,
          isCompanion: false,
          decay: 0.024,
        });

        // Lateral companion node to create triangular web mesh lattice
        const offset = Math.random() * 18 - 9;
        webNodes.unshift({
          x: mouseX + Math.cos(perpAngle) * offset,
          y: mouseY + Math.sin(perpAngle) * offset,
          vx: 0,
          vy: 0,
          life: 0.9,
          isCompanion: true,
          decay: 0.024,
        });

        lastSpawnX = mouseX;
        lastSpawnY = mouseY;

        // Keep trail size bounded
        if (webNodes.length > 70) {
          webNodes.length = 70;
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const clickX = e.clientX;
      const clickY = e.clientY;

      // 1. Immediately remove any existing click burst web nodes & shockwaves
      // so if clicked a second time, the previous click web disappears before the second click web effect appears!
      for (let i = webNodes.length - 1; i >= 0; i--) {
        if (webNodes[i].isClickBurst) {
          webNodes.splice(i, 1);
        }
      }
      shockwaves.length = 0;

      // 2. Concentric expanding Spider-Web Burst (spreads wide outwards!)
      const SPOKES = 12;
      for (let s = 0; s < SPOKES; s++) {
        const angle = (Math.PI * 2 * s) / SPOKES;

        // Inner web ring nodes (speed ~4.8px/frame -> expands ~45-55px)
        const innerSpeed = 4.8 + Math.random() * 1.2;
        webNodes.unshift({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * innerSpeed,
          vy: Math.sin(angle) * innerSpeed,
          life: 1.0,
          isCompanion: false,
          isClickBurst: true,
          spokeIndex: s,
          ringLevel: 0,
          originX: clickX,
          originY: clickY,
          decay: 0.017,
        });

        // Outer web ring nodes (speed ~10px/frame -> expands ~100-120px)
        const outerSpeed = 10.2 + Math.random() * 2.0;
        webNodes.unshift({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * outerSpeed,
          vy: Math.sin(angle) * outerSpeed,
          life: 1.0,
          isCompanion: true,
          isClickBurst: true,
          spokeIndex: s,
          ringLevel: 1,
          originX: clickX,
          originY: clickY,
          decay: 0.016,
        });
      }

      // Add dynamic expanding web shockwave
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 8,
        maxRadius: 130,
        alpha: 0.85,
      });
    };

    const onMouseUp = () => setIsClicking(false);

    const onMouseLeaveWindow = () => setIsVisible(false);
    const onMouseEnterWindow = () => setIsVisible(true);

    const handleHoverTargets = () => {
      const interactiveEls = document.querySelectorAll(
        "a, button, [role='button'], input, .tilt, .skill-list > div, .menu-btn, .project-tab, .glass-card, [data-interactive]"
      );

      const enterHandler = () => setIsHovered(true);
      const leaveHandler = () => setIsHovered(false);

      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", enterHandler);
        el.addEventListener("mouseleave", leaveHandler);
      });

      return () => {
        interactiveEls.forEach((el) => {
          el.removeEventListener("mouseenter", enterHandler);
          el.removeEventListener("mouseleave", leaveHandler);
        });
      };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    const cleanupHover = handleHoverTargets();

    // 60fps Loop for Spiderman Mask, Orbital Ring & Spider-Web Trail Canvas
    const loop = () => {
      animId = requestAnimationFrame(loop);

      // Spring tilt damping
      currentTilt += (targetTilt - currentTilt) * 0.15;
      targetTilt *= 0.9;

      // Update Spiderman Mask
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${currentTilt.toFixed(2)}deg)`;
      }

      // Update Orbital Ring with smooth lag
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // Render Spider-Web System on Canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // A. Draw & Update Shockwaves (Soft, ethereal silk pulse)
        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i];
          sw.radius += (sw.maxRadius - sw.radius) * 0.12;
          sw.alpha *= 0.91;

          if (sw.alpha > 0.02) {
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 30, 45, ${sw.alpha * 0.35})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Subtle inner white ring
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius * 0.88, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          } else {
            shockwaves.splice(i, 1);
          }
        }

        // B. Update Velocities for Click Burst Web Nodes (Silky smooth deceleration)
        for (let i = 0; i < webNodes.length; i++) {
          const n = webNodes[i];
          if (n.vx !== 0 || n.vy !== 0) {
            n.x += n.vx;
            n.y += n.vy;
            n.vx *= 0.89; // Silky deceleration
            n.vy *= 0.89;
          }
        }

        // C. Draw Spider-Web Connecting Strands
        if (webNodes.length > 0) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          const maxTrailDist = isHovered ? 78 : 65;

          // 1. Lead threads from current cursor to nearest trail nodes (only non-burst)
          for (let i = 0; i < Math.min(webNodes.length, 4); i++) {
            const n1 = webNodes[i];
            if (!n1.isClickBurst) {
              const leadDist = Math.hypot(mouseX - n1.x, mouseY - n1.y);
              if (leadDist < 85) {
                const leadAlpha = (1 - leadDist / 85) * Math.pow(n1.life, 1.3) * 0.42;
                ctx.beginPath();
                ctx.moveTo(mouseX, mouseY);
                ctx.lineTo(n1.x, n1.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${leadAlpha})`;
                ctx.lineWidth = 0.85;
                ctx.stroke();
              }
            }
          }

          // 2. Structured Spider-Man Web Burst (Radial spokes + Concentric rings)
          const SPOKES = 12;
          const inNodes: (WebNode | null)[] = new Array(SPOKES).fill(null);
          const outNodes: (WebNode | null)[] = new Array(SPOKES).fill(null);

          for (let i = 0; i < webNodes.length; i++) {
            const n = webNodes[i];
            if (n.isClickBurst && n.spokeIndex !== undefined) {
              if (n.ringLevel === 0 && !inNodes[n.spokeIndex]) inNodes[n.spokeIndex] = n;
              else if (n.ringLevel === 1 && !outNodes[n.spokeIndex]) outNodes[n.spokeIndex] = n;
            }
          }

          // 2a. Draw Radial Spokes: origin -> inner node -> outer node
          for (let s = 0; s < SPOKES; s++) {
            const inn = inNodes[s];
            const out = outNodes[s];
            if (inn && inn.originX !== undefined && inn.originY !== undefined) {
              const spokeAlpha = Math.pow(inn.life, 1.3) * 0.45;
              ctx.beginPath();
              ctx.moveTo(inn.originX, inn.originY);
              ctx.lineTo(inn.x, inn.y);
              if (out) ctx.lineTo(out.x, out.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${spokeAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // 2b. Inner Concentric Web Ring (connects adjacent inner nodes)
          for (let s = 0; s < SPOKES; s++) {
            const n1 = inNodes[s];
            const n2 = inNodes[(s + 1) % SPOKES];
            if (n1 && n2) {
              const alpha = Math.min(Math.pow(n1.life, 1.2), Math.pow(n2.life, 1.2)) * 0.42;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }

          // 2c. Outer Concentric Web Ring (connects adjacent outer nodes with crimson tint)
          for (let s = 0; s < SPOKES; s++) {
            const n1 = outNodes[s];
            const n2 = outNodes[(s + 1) % SPOKES];
            if (n1 && n2) {
              const alpha = Math.min(Math.pow(n1.life, 1.2), Math.pow(n2.life, 1.2)) * 0.38;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(255, 45, 60, ${alpha * 0.85})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }

          // 2d. Delicate Spiral Web Strands (inner spoke to next outer spoke)
          for (let s = 0; s < SPOKES; s++) {
            const n1 = inNodes[s];
            const n2 = outNodes[(s + 1) % SPOKES];
            if (n1 && n2) {
              const alpha = Math.min(Math.pow(n1.life, 1.3), Math.pow(n2.life, 1.3)) * 0.22;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = 0.55;
              ctx.stroke();
            }
          }

          // 3. Connect Movement Trail Nodes (Only trail to trail, never into click burst)
          for (let i = 0; i < webNodes.length; i++) {
            const n1 = webNodes[i];
            if (n1.isClickBurst) continue;

            for (let j = i + 1; j < webNodes.length; j++) {
              const n2 = webNodes[j];
              if (n2.isClickBurst) continue;

              const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
              if (dist < maxTrailDist) {
                const smoothLife = Math.min(Math.pow(n1.life, 1.25), Math.pow(n2.life, 1.25));
                const alpha = (1 - dist / maxTrailDist) * smoothLife;

                if (alpha > 0.02) {
                  ctx.beginPath();
                  ctx.moveTo(n1.x, n1.y);
                  ctx.lineTo(n2.x, n2.y);
                  if (n1.isCompanion || n2.isCompanion) {
                    ctx.strokeStyle = `rgba(255, 30, 45, ${alpha * 0.3})`;
                    ctx.lineWidth = 0.65;
                  } else {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.38})`;
                    ctx.lineWidth = 0.75;
                  }
                  ctx.stroke();
                }
              }
            }
          }

          // 4. Draw Crimson Glowing Node Dots (Softer glow & decreased opacity)
          for (let i = 0; i < webNodes.length; i++) {
            const node = webNodes[i];
            const baseRad = node.isClickBurst ? (node.isCompanion ? 2.0 : 2.6) : (node.isCompanion ? 1.6 : 2.3);
            const radius = baseRad * Math.max(0.2, node.life);
            const dotAlpha = Math.pow(node.life, 1.2);

            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 30, 45, ${dotAlpha * 0.62})`;
            ctx.shadowColor = "#ff1e2d";
            ctx.shadowBlur = node.isClickBurst ? 5 : 3.5;
            ctx.fill();

            // Inner subtle pinpoint
            if (!node.isCompanion && node.life > 0.25) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius * 0.45, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha * 0.55})`;
              ctx.shadowBlur = 0;
              ctx.fill();
            }

            // Decay life smoothly
            node.life -= node.decay;
          }

          ctx.shadowBlur = 0;

          // Remove expired nodes
          for (let i = webNodes.length - 1; i >= 0; i--) {
            if (webNodes[i].life <= 0) {
              webNodes.splice(i, 1);
            }
          }
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
      cleanupHover();
    };
  }, [isVisible, isHovered]);

  if (isTouch) return null;

  return (
    <>
      {/* 0. Fullscreen Spider-Web Trail Canvas */}
      <canvas
        ref={canvasRef}
        className={`cursor-web-canvas ${isVisible ? "visible" : ""}`}
        aria-hidden="true"
      />

      <div
        className={`cursor-portal ${isVisible ? "visible" : ""} ${isHovered ? "hovered" : ""} ${
          isClicking ? "clicking" : ""
        }`}
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
