import React, { useEffect, useRef } from "react";

export default function CinematicScrollCanvas() {
  const imgRef = useRef<HTMLImageElement>(null);
  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(1);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;
      // Ultra-smooth subtle scaling on scroll for depth
      targetScaleRef.current = 1 + progress * 0.06;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animId: number;
    const renderLoop = () => {
      if (imgRef.current) {
        currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.08;
        imgRef.current.style.transform = `scale(${currentScaleRef.current.toFixed(4)}) translateZ(0)`;
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      id="site-background-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#0d0204",
      }}
      aria-hidden="true"
    >
      {/* High-Resolution Full-Site Artwork Background */}
      <img
        ref={imgRef}
        src="/site-bg.png"
        alt="Portfolio Whole Website Background"
        decoding="sync"
        loading="eager"
        fetchPriority="high"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          transformOrigin: "center center",
          willChange: "transform",
          display: "block",
          imageRendering: "auto",
        }}
      />
    </div>
  );
}
