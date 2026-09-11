import React, { useEffect, useRef } from "react";

export default function CinematicScrollCanvas() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(1);

  const smoothTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is initially paused at 0
    video.pause();

    let isSeeking = false;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;

      // Smooth target scale from 1.0x to 1.35x
      targetScaleRef.current = 1 + progress * 0.35;

      // Smooth target video playback time
      if (video.duration && !isNaN(video.duration)) {
        const maxTime = Math.max(0, video.duration - 0.05);
        targetTimeRef.current = Math.min(maxTime, Math.max(0, progress * maxTime));
      }
    };

    const onSeeking = () => {
      isSeeking = true;
    };

    const onSeeked = () => {
      isSeeking = false;
      if (!video) return;
      const diff = smoothTimeRef.current - video.currentTime;
      // If user is actively scrolling while seeking, immediately catch up to latest position
      if (Math.abs(diff) > 0.02) {
        isSeeking = true;
        video.currentTime = Math.max(0, Math.min(video.duration - 0.05, smoothTimeRef.current));
      }
    };

    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);

    let animId: number;

    const renderLoop = () => {
      if (!video) return;

      // 1. Silky Smooth Scale Zoom via LERP
      currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.09;
      video.style.transform = `scale(${currentScaleRef.current.toFixed(4)}) translateZ(0)`;

      // 2. High-Performance Fluid Bidirectional Video Forward & Reverse Controller
      if (video.duration && !isNaN(video.duration)) {
        const delta = targetTimeRef.current - smoothTimeRef.current;
        // Dynamic responsiveness: quick catchup on fast reverse/forward scroll, fluid easing on gentle scroll
        const responsiveness = Math.abs(delta) > 1.2 ? 0.28 : Math.abs(delta) > 0.5 ? 0.22 : 0.16;
        smoothTimeRef.current += delta * responsiveness;

        const timeDiff = smoothTimeRef.current - video.currentTime;

        if (Math.abs(timeDiff) > 0.018 && !isSeeking) {
          isSeeking = true;
          video.currentTime = Math.max(0, Math.min(video.duration - 0.05, smoothTimeRef.current));
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    const handleLoaded = () => {
      video.pause();
      handleScroll();
      if (video.duration && !isNaN(video.duration)) {
        smoothTimeRef.current = targetTimeRef.current;
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoaded);
        video.removeEventListener("seeking", onSeeking);
        video.removeEventListener("seeked", onSeeked);
        video.pause();
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="video-container fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
        backgroundColor: "#0a0404",
      }}
      aria-hidden="true"
    >
      {/* Background Video: Hardware-accelerated smooth playback on scroll down & reverse on scroll up */}
      <video
        id="bgVideo"
        ref={videoRef}
        src="/gallery/Man_puts_on_sunglasses_20260910115705.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          transformOrigin: "center center",
          willChange: "transform",
          display: "block",
        }}
      />

      {/* Cinematic Contrast Vignette: keeps portfolio text readable while letting video shine through */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10, 4, 4, 0.2) 0%, rgba(10, 4, 4, 0.5) 65%, rgba(10, 4, 4, 0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Soft Top/Bottom edge fades */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: "linear-gradient(180deg, rgba(10, 4, 4, 0.75) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(0deg, rgba(10, 4, 4, 0.85) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
