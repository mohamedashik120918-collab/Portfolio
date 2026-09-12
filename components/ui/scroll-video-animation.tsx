import React, { useEffect, useRef, useState, useCallback } from "react";
import FRAME_PATHS from "@/src/data/video-frames.json";

interface ScrollVideoAnimationProps {
  id?: string;
  framePaths?: string[];
  trackHeight?: string; // e.g. "350vh"
  className?: string;
}

export default function ScrollVideoAnimation({
  id = "cinematic-vision",
  framePaths = FRAME_PATHS,
  trackHeight = "350vh",
  className = "",
}: ScrollVideoAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedSetRef = useRef<Set<number>>(new Set());

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const totalFrames = framePaths.length;
  const targetFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // Helper to draw a specific frame on canvas with aspect ratio preservation (cover)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Find the requested image or fall back to nearest loaded frame to avoid flickering
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let nearestIdx = -1;
      let minDiff = Infinity;
      loadedSetRef.current.forEach((idx) => {
        const diff = Math.abs(idx - frameIndex);
        if (diff < minDiff) {
          minDiff = diff;
          nearestIdx = idx;
        }
      });
      if (nearestIdx !== -1) {
        img = imagesRef.current[nearestIdx];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const imgAspect = imgW / imgH;
    const canvasAspect = canvasW / canvasH;

    let renderW: number;
    let renderH: number;
    let offsetX: number;
    let offsetY: number;

    // "cover" math: fill canvas completely without stretching or distorting
    if (canvasAspect > imgAspect) {
      renderW = canvasW;
      renderH = canvasW / imgAspect;
      offsetX = 0;
      offsetY = (canvasH - renderH) / 2;
    } else {
      renderH = canvasH;
      renderW = canvasH * imgAspect;
      offsetX = (canvasW - renderW) / 2;
      offsetY = 0;
    }

    ctx.fillStyle = "#0c0204";
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    renderedFrameRef.current = frameIndex;
  }, []);

  // Resize canvas to container with Device Pixel Ratio for Retina sharpness
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      // Re-draw current frame after resizing
      const frameToDraw = renderedFrameRef.current >= 0 ? renderedFrameRef.current : 0;
      drawFrame(frameToDraw);
    }
  }, [drawFrame]);

  // Preload all frames progressively
  useEffect(() => {
    if (totalFrames === 0) return;

    imagesRef.current = new Array(totalFrames).fill(null);
    loadedSetRef.current = new Set();
    let loadedCounter = 0;

    // 1. High-priority: Load first frame immediately and draw as soon as available
    const firstImg = new Image();
    firstImg.src = framePaths[0];
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      loadedSetRef.current.add(0);
      loadedCounter++;
      setLoadedCount(loadedCounter);
      resizeCanvas();
      drawFrame(0);
    };

    // 2. Load the rest of the frames in background chunks
    const loadBatch = (indices: number[]) => {
      indices.forEach((i) => {
        if (i === 0) return;
        const img = new Image();
        img.src = framePaths[i];
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedSetRef.current.add(i);
          loadedCounter++;
          setLoadedCount(loadedCounter);

          // If this frame is the one we're currently trying to show, draw it!
          if (Math.round(targetFrameRef.current) === i) {
            drawFrame(i);
          }
        };
      });
    };

    // Priority 1: Keyframe samples throughout the video
    const priorityIndices: number[] = [];
    for (let i = 1; i < totalFrames; i += 6) {
      priorityIndices.push(i);
    }
    loadBatch(priorityIndices);

    // Priority 2: Fill in remaining frames slightly deferred to preserve initial page responsiveness
    const remainingTimer = setTimeout(() => {
      const remainingIndices: number[] = [];
      for (let i = 1; i < totalFrames; i++) {
        if (!priorityIndices.includes(i)) {
          remainingIndices.push(i);
        }
      }
      loadBatch(remainingIndices);
    }, 150);

    return () => {
      clearTimeout(remainingTimer);
    };
  }, [framePaths, totalFrames, drawFrame, resizeCanvas]);

  // Window resize observer
  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeCanvas]);

  // Smooth scroll sync with requestAnimationFrame interpolation
  useEffect(() => {
    let currentSmoothedFrame = 0;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Calculate progress from 0 to 1 as the section travels through viewport
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(progress);

      // Map progress directly to frame index [0, totalFrames - 1]
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    // 60FPS / 120FPS Render Loop with buttery LERP interpolation
    const renderLoop = () => {
      const target = targetFrameRef.current;
      // Smooth lerp: 0.16 gives instant responsiveness while removing scroll stepping
      const diff = target - currentSmoothedFrame;

      if (Math.abs(diff) > 0.001) {
        currentSmoothedFrame += diff * 0.16;
      } else {
        currentSmoothedFrame = target;
      }

      const frameIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(currentSmoothedFrame)));

      if (frameIndex !== renderedFrameRef.current) {
        drawFrame(frameIndex);
        setCurrentFrameDisplay(frameIndex);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, drawFrame]);

  // Dynamic cinematic subtitle phase based on scroll progress
  const getCinematicCue = (progress: number) => {
    if (progress < 0.3) {
      return {
        tag: "PHASE 01 // IDENTITY",
        title: "VISION IN MOTION",
        desc: "Designing responsive, scalable full-stack applications with architectural precision.",
      };
    } else if (progress < 0.72) {
      return {
        tag: "PHASE 02 // EXECUTION",
        title: "FOCUS & DISCIPLINE",
        desc: "Transforming ambitious client requirements into production software like Tevolt.",
      };
    } else {
      return {
        tag: "PHASE 03 // READINESS",
        title: "ENGINEERING FUTURE",
        desc: "Ready to build innovative solutions. Explore my capabilities and projects below.",
      };
    }
  };

  const cue = getCinematicCue(scrollProgress);
  const pctDisplay = Math.round(scrollProgress * 100);
  
  // Gracefully fade out text overlays as user reaches the end of the pinned section (92% to 100%)
  const exitOpacity = scrollProgress > 0.90 ? Math.max(0, 1 - (scrollProgress - 0.90) / 0.08) : 1;

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: trackHeight }}
      aria-label="Interactive Scroll Video Animation — Mohamed Ashik"
    >
      {/* Sticky Fullscreen Canvas Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0204]">
        {/* The HTML5 Canvas rendering video frames */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block select-none pointer-events-none"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        />

        {/* Ambient Dark Crimson Vignettes & Gradients for Seamless Integration */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0305] via-transparent to-[#0a0305]/60 z-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0305]/70 via-transparent to-[#0a0305]/70 z-10" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(10,3,5,0.85)] z-10" />

        {/* Top HUD Framing Badges (Clearing the top navbar) */}
        <div
          className="pointer-events-none absolute top-20 sm:top-24 left-6 sm:left-10 z-20 flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-[#ff4d5a] uppercase transition-opacity duration-200"
          style={{ opacity: exitOpacity }}
        >
          <span className="w-2 h-2 rounded-full bg-[#ff1e2d] animate-ping" />
          <span className="font-bold text-white tracking-widest">CINEMATIC FRAME SCRUBBER</span>
          <span className="text-zinc-500 hidden sm:inline">// 60 FPS</span>
        </div>

        <div
          className="pointer-events-none absolute top-20 sm:top-24 right-6 sm:right-10 z-20 flex items-center gap-3 text-[10px] sm:text-xs font-mono text-zinc-400 transition-opacity duration-200"
          style={{ opacity: exitOpacity }}
        >
          <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-2">
            <span className="text-[#ff1e2d] font-bold">
              FRAME {String(currentFrameDisplay + 1).padStart(3, "0")}
            </span>
            <span className="text-zinc-600">/</span>
            <span>{String(totalFrames).padStart(3, "0")}</span>
          </div>
        </div>

        {/* Cinematic Dynamic Text Overlays that Shift as You Scrub */}
        <div
          className="pointer-events-none absolute left-6 right-6 sm:left-12 sm:right-auto bottom-28 sm:bottom-32 z-20 max-w-xl transition-opacity duration-200"
          style={{ opacity: exitOpacity }}
        >
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff4d5a] tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 bg-[#ff1e2d] rounded-xs shadow-[0_0_8px_#ff1e2d]" />
            <span>{cue.tag}</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-none mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {cue.title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-md">
            {cue.desc}
          </p>
        </div>

        {/* Bottom Scroll Telemetry & Progress Indicator */}
        <div
          className="pointer-events-none absolute bottom-8 sm:bottom-10 left-6 right-6 sm:left-10 sm:right-10 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono transition-opacity duration-200"
          style={{ opacity: exitOpacity }}
        >
          <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
            <span className="text-[#ff1e2d] font-bold">SCROLL PROGRESS</span>
            <div className="w-32 sm:w-48 h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-[#b30b17] to-[#ff1e2d] rounded-full transition-all duration-75 shadow-[0_0_10px_#ff1e2d]"
                style={{ width: `${pctDisplay}%` }}
              />
            </div>
            <span className="text-white font-bold">{pctDisplay}%</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
            <span className="animate-bounce">↓</span>
            <span>SCROLL TO SCRUB THE TIMELINE</span>
          </div>
        </div>

        {/* Subtle Preload Badge (Fades away once fully cached) */}
        {loadedCount < totalFrames && (
          <div className="absolute top-32 right-6 sm:right-10 z-20 pointer-events-none px-2.5 py-1 rounded bg-black/70 border border-white/10 text-[9px] font-mono text-zinc-400 backdrop-blur-md">
            CACHING FRAMES: {Math.round((loadedCount / totalFrames) * 100)}%
          </div>
        )}
      </div>
    </section>
  );
}
