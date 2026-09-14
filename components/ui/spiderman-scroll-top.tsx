import React, { useState, useEffect, useRef, useCallback } from "react";

interface WebAnchor {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

export default function SpidermanScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isShooting, setIsShooting] = useState(false);
  const [webProgress, setWebProgress] = useState(0);
  const [anchor, setAnchor] = useState<WebAnchor | null>(null);
  const [buttonRecoil, setButtonRecoil] = useState<"idle" | "tension" | "pulling" | "settle">("idle");
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  // Monitor scroll position to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      // Show button after user scrolls past 320px
      const scrolled = window.scrollY > 320;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Superhero Web-Shoot & Smooth Scroll Animation
  const handleScrollToTop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const btn = buttonRef.current;
    if (!btn) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      isAnimatingRef.current = false;
      return;
    }

    const rect = btn.getBoundingClientRect();
    // Hand origin: slightly toward top-left of the badge where Spidey shoots
    const startX = rect.left + rect.width * 0.42;
    const startY = rect.top + rect.height * 0.38;

    // Helper: Find exact center of the visible CONTACT button in the navbar
    const getContactTarget = () => {
      const contactElements = Array.from(
        document.querySelectorAll<HTMLElement>('header a[href="#contact"], a[href="#contact"]')
      );
      const visibleContact = contactElements.find(
        (el) => el.offsetParent !== null && el.getBoundingClientRect().width > 0
      );
      if (visibleContact) {
        const cRect = visibleContact.getBoundingClientRect();
        return {
          targetX: cRect.left + cRect.width * 0.5,
          targetY: 0, // Reaches all the way to top of the screen
        };
      }
      return {
        targetX: Math.min(window.innerWidth - 60, Math.max(120, window.innerWidth * 0.85)),
        targetY: 0, // Reaches all the way to top of the screen
      };
    };

    const { targetX, targetY } = getContactTarget();
    setAnchor({ startX, startY, targetX, targetY });
    setIsShooting(true);
    setWebProgress(0);
    setButtonRecoil("tension");

    const shootStartTime = performance.now();
    const shootDuration = 220; // 220ms snappy web shoot

    const animateWebShoot = (now: number) => {
      const elapsed = now - shootStartTime;
      const progress = Math.min(1, elapsed / shootDuration);
      
      // Easing for snappy web ejection
      const easedProgress = Math.min(1, Math.pow(progress, 0.7));
      setWebProgress(easedProgress);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateWebShoot);
      } else {
        // Web has anchored at the CONTACT button!
        // 2. Trigger elastic recoil and smooth cinematic scroll upward
        setButtonRecoil("pulling");
        startSmoothScrollUp();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateWebShoot);

    const startSmoothScrollUp = () => {
      const startScrollY = window.scrollY;
      const targetScrollY = 0;
      const scrollDistance = startScrollY - targetScrollY;
      
      if (scrollDistance <= 0) {
        finishAnimation();
        return;
      }

      // Proportional duration: smooth and cinematic (800ms to 1200ms)
      const scrollDuration = Math.min(1250, Math.max(750, scrollDistance * 0.32));
      const scrollStartTime = performance.now();

      // Custom Superhero EaseInOut curve
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animateScroll = (now: number) => {
        const elapsed = now - scrollStartTime;
        const rawT = Math.min(1, elapsed / scrollDuration);
        const easedT = easeInOutCubic(rawT);

        const currentScroll = startScrollY - scrollDistance * easedT;
        window.scrollTo(0, currentScroll);

        // Update web line anchor dynamically while scrolling
        if (buttonRef.current) {
          const updatedRect = buttonRef.current.getBoundingClientRect();
          const currentContact = getContactTarget();
          setAnchor({
            startX: updatedRect.left + updatedRect.width * 0.42,
            startY: updatedRect.top + updatedRect.height * 0.38,
            targetX: currentContact.targetX,
            targetY: currentContact.targetY,
          });
        }

        if (rawT < 1) {
          animationFrameRef.current = requestAnimationFrame(animateScroll);
        } else {
          // Reached top!
          window.scrollTo(0, 0);
          setButtonRecoil("settle");
          setTimeout(finishAnimation, 250);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateScroll);
    };

    const finishAnimation = () => {
      setIsShooting(false);
      setAnchor(null);
      setWebProgress(0);
      setButtonRecoil("idle");
      isAnimatingRef.current = false;
    };
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleScrollToTop();
    }
  };

  // Real Spider-Man Web Shooter
  const renderWebLine = () => {
    if (!anchor || !isShooting) return null;

    const { startX, startY, targetX, targetY } = anchor;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const totalDist = Math.hypot(dx, dy);
    if (totalDist < 10) return null;

    // Angle of trajectory from Spidey's hand to CONTACT button
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;

    // Current animated head length along the web axis
    const currentLen = totalDist * webProgress;

    // Compact spread web fan size focused around the CONTACT button
    const fanW = 190;
    const fanH = 190;
    const fanCenterY = fanH / 2;

    // Position of the fan image so its right edge reaches totalDist (the CONTACT button)
    const fanX = totalDist - fanW;
    const fanY = -fanCenterY;

    // Where the silk rope joins into the fan image
    const ropeTargetDist = Math.max(0, fanX + fanW * 0.48);

    // Generate repeating segments of the authentic twisted spider silk rope from Spidey's hand to fan
    const segStep = 95;
    const segW = 115;
    const segH = 18;
    const ropeSegments: number[] = [];
    for (let x = 0; x < ropeTargetDist; x += segStep) {
      ropeSegments.push(x);
    }

    // Dynamic recoil tension deflection
    const tensionSag = buttonRecoil === "pulling" ? 3.5 : (buttonRecoil === "tension" ? -5 : -1.5);

    return (
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
        style={{ width: "100vw", height: "100vh" }}
      >
        <svg className="w-full h-full overflow-visible">
          <defs>
            {/* Luminous Spider Silk Glow Filter */}
            <filter id="realWebGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="#ffffff" floodOpacity="0.95" />
              <feDropShadow dx="0" dy="0" stdDeviation="5.5" floodColor="#ff1e2d" floodOpacity="0.6" />
            </filter>

            {/* Silk Splat Anchor Gradient */}
            <radialGradient id="realWebAnchorGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="45%" stopColor="#ff4d5a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff1e2d" stopOpacity="0" />
            </radialGradient>

            {/* Dynamic Shooting Reveal ClipPath (Shoots from Spidey to CONTACT button) */}
            <clipPath id="webShootClip">
              <rect x="-60" y="-300" width={currentLen + 60} height="600" />
            </clipPath>
          </defs>

          {/* Web Shoot Trajectory Group */}
          <g
            transform={`translate(${startX}, ${startY}) rotate(${angleDeg})`}
            clipPath="url(#webShootClip)"
          >
            {/* Underlying micro-tensile guide filament */}
            <line
              x1={0}
              y1={tensionSag * 0.3}
              x2={totalDist - 15}
              y2={tensionSag}
              stroke="#ffffff"
              strokeWidth={1.5}
              strokeOpacity={0.4}
              strokeLinecap="round"
            />

            {/* 1. PHOTOREALISTIC BRAIDED SILK ROPE SEGMENTS (Starting from Spidey's hand all the way to fan) */}
            {/* Crimson Tension Aura for Rope */}
            {ropeSegments.map((segX) => (
              <image
                key={`aura-${segX}`}
                href="/assets/spiderman-silk-rope.png"
                x={segX}
                y={-segH / 2 + tensionSag}
                width={segW}
                height={segH}
                preserveAspectRatio="none"
                style={{ filter: "drop-shadow(0 0 6px rgba(255, 30, 45, 0.7))" }}
              />
            ))}

            {/* Core Glowing Twisted Silk Rope */}
            {ropeSegments.map((segX) => (
              <image
                key={`core-${segX}`}
                href="/assets/spiderman-silk-rope.png"
                x={segX}
                y={-segH / 2 + tensionSag}
                width={segW}
                height={segH}
                preserveAspectRatio="none"
                filter="url(#realWebGlow)"
              />
            ))}

            {/* 2. COMPACT SPREAD WEB FAN AT CONTACT BUTTON */}
            {/* Red Aura for Web Fan */}
            <image
              href="/assets/spiderman-real-web.png"
              x={fanX}
              y={fanY + tensionSag}
              width={fanW}
              height={fanH}
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: "drop-shadow(0 0 8px rgba(255, 30, 45, 0.75))" }}
            />

            {/* Core Glowing Web Fan */}
            <image
              href="/assets/spiderman-real-web.png"
              x={fanX}
              y={fanY + tensionSag}
              width={fanW}
              height={fanH}
              preserveAspectRatio="xMidYMid meet"
              filter="url(#realWebGlow)"
            />

            {/* 3. CONTACT Button Anchor Impact Flash */}
            {webProgress > 0.88 && (
              <g transform={`translate(${totalDist}, 0)`}>
                <circle cx={0} cy={0} r={16 * webProgress} fill="url(#realWebAnchorGrad)" />
                <circle cx={0} cy={0} r={4.5} fill="#ffffff" filter="url(#realWebGlow)" />
              </g>
            )}
          </g>

          {/* Leading Ejection Particle while shooting */}
          {webProgress < 0.96 && (
            <circle
              cx={startX + (dx / totalDist) * currentLen}
              cy={startY + (dy / totalDist) * currentLen}
              r={5}
              fill="#ffffff"
              filter="url(#realWebGlow)"
            />
          )}
        </svg>
      </div>
    );
  };

  return (
    <>
      {/* Full-Screen Web-Shooting Canvas/SVG */}
      {renderWebLine()}

      {/* Floating Spider-Man Scroll-To-Top Button */}
      <div
        className={`fixed bottom-[24px] sm:bottom-[30px] right-[18px] sm:right-[30px] z-[1001] transition-all duration-400 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-6 pointer-events-none scale-75"
        }`}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={handleScrollToTop}
          onKeyDown={handleKeyDown}
          tabIndex={isVisible ? 0 : -1}
          aria-label="Scroll to top"
          title="Spider-Man Scroll to Top"
          className={`spiderman-scroll-btn group relative flex items-center justify-center w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] rounded-full p-0 border-0 cursor-pointer select-none outline-none focus-visible:ring-4 focus-visible:ring-[#ff1e2d] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-transform duration-300 ${
            buttonRecoil === "tension"
              ? "scale-90 translate-y-1 rotate-2"
              : buttonRecoil === "pulling"
              ? "scale-105 -translate-y-3 -rotate-3"
              : buttonRecoil === "settle"
              ? "scale-100 translate-y-0 rotate-0"
              : "hover:scale-110 active:scale-95"
          }`}
        >
          {/* Ambient Multi-Layer Crimson Glow */}
          <div
            className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#ff1e2d] via-[#b30b17] to-[#ff4d5a] opacity-70 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10 animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* High-Tech Outer Glass Ring & Red Border */}
          <div className="absolute inset-0 rounded-full border-2 border-[#ff1e2d] shadow-[0_0_20px_rgba(255,30,45,0.7),inset_0_0_12px_rgba(255,30,45,0.4)] bg-[#0a0304]/90 backdrop-blur-md overflow-hidden flex items-center justify-center">
            
            {/* The Spider-Man Artwork (Clearly visible, centered, not heavily cropped) */}
            <img
              src="/assets/spiderman-badge.png"
              alt="Spider-Man"
              className="w-full h-full object-cover rounded-full select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
              draggable={false}
            />

            {/* Subtle Glass Glare Accent Reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/40 pointer-events-none" />
          </div>

          {/* Tooltip on Hover (Desktop) */}
          <span className="spiderman-tooltip pointer-events-none absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-black/90 border border-[#ff1e2d]/60 text-white text-[11px] font-mono tracking-wider uppercase whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_10px_rgba(255,30,45,0.3)] hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e2d] animate-ping" />
            Top of Portfolio
          </span>
        </button>
      </div>
    </>
  );
}
