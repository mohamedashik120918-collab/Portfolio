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

    // 1. Calculate web shooting trajectory from Spider-Man's hand to the top of the viewport
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
    
    // Shoot straight up toward top edge with slight angle toward center for dynamic hero feel
    const targetX = Math.max(40, Math.min(window.innerWidth - 40, startX - 25));
    const targetY = 0;

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
        // Web has anchored at the top!
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
          setAnchor((prev) =>
            prev
              ? {
                  ...prev,
                  startX: updatedRect.left + updatedRect.width * 0.42,
                  startY: updatedRect.top + updatedRect.height * 0.38,
                }
              : null
          );
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

  // Web line dynamic path calculation
  const renderWebLine = () => {
    if (!anchor || !isShooting) return null;

    const { startX, startY, targetX, targetY } = anchor;
    // Current animated head of the web line
    const currentHeadX = startX + (targetX - startX) * webProgress;
    const currentHeadY = startY + (targetY - startY) * webProgress;

    // Subtle natural arc/tension sag
    const midX = (startX + currentHeadX) / 2 + (buttonRecoil === "pulling" ? 4 : -8);
    const midY = (startY + currentHeadY) / 2;

    return (
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
        style={{ width: "100vw", height: "100vh" }}
      >
        <svg
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Luminous Spider Silk Glow Filter */}
            <filter id="spiderSilkGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffffff" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ff1e2d" floodOpacity="0.6" />
            </filter>
            
            {/* Silk Splat Anchor Gradient */}
            <radialGradient id="silkSplatGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="60%" stopColor="#ff4d5a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff1e2d" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Outer Crimson Silk Tension Halo */}
          <path
            d={`M ${startX} ${startY} Q ${midX} ${midY} ${currentHeadX} ${currentHeadY}`}
            fill="none"
            stroke="#ff1e2d"
            strokeWidth="5"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />

          {/* 2. Core High-Tensile White Silk Filament */}
          <path
            d={`M ${startX} ${startY} Q ${midX} ${midY} ${currentHeadX} ${currentHeadY}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="url(#spiderSilkGlow)"
          />

          {/* 3. Secondary Intertwined Micro-Silk Thread */}
          <path
            d={`M ${startX} ${startY} Q ${midX - 5} ${midY} ${currentHeadX} ${currentHeadY}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.8"
            strokeDasharray="4 2"
          />

          {/* 4. Silk Anchor Splat at Ceiling Contact Point */}
          {webProgress > 0.85 && (
            <g transform={`translate(${targetX}, ${targetY})`} className="animate-pulse">
              {/* Radial Web Splat Anchors */}
              <circle cx="0" cy="0" r="14" fill="url(#silkSplatGrad)" />
              <line x1="0" y1="0" x2="-16" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="16" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-8" y2="18" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="0" y1="0" x2="8" y2="18" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="0" y1="0" x2="0" y2="20" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="0" cy="0" r="3.5" fill="#ffffff" filter="url(#spiderSilkGlow)" />
            </g>
          )}

          {/* 5. Shooting Tip Particle */}
          {webProgress < 0.95 && (
            <circle
              cx={currentHeadX}
              cy={currentHeadY}
              r="4"
              fill="#ffffff"
              filter="url(#spiderSilkGlow)"
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
