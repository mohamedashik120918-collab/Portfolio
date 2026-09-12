import React, { useEffect, useRef, useCallback } from "react";
import FRAME_PATHS from "@/src/data/video-frames";

export default function CinematicScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedSetRef = useRef<Set<number>>(new Set());

  const totalFrames = FRAME_PATHS.length;
  const targetFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // Draw frame with pristine quality and aspect ratio preservation (cover)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Pick requested image or fallback to nearest loaded frame to avoid flickering
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
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

    // 14. Contain-style scaling: render complete image inside canvas without cropping
    const scale = Math.min(canvasW / imgW, canvasH / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    // 15. Center the image horizontally and vertically
    const offsetX = (canvasW - renderW) / 2;
    const offsetY = (canvasH - renderH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.fillStyle = "#0c0204";
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    renderedFrameRef.current = frameIndex;
  }, []);

  // Resize canvas to match display window using high-DPI scaling for ultra-sharp clarity
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Retina / 4K high-density pixel ratio (capped at 2 for silky 60fps performance)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      const frameToDraw = renderedFrameRef.current >= 0 ? renderedFrameRef.current : 0;
      drawFrame(frameToDraw);
    }
  }, [drawFrame]);

  // Preload all 240 frames into cache
  useEffect(() => {
    if (totalFrames === 0) return;

    imagesRef.current = new Array(totalFrames).fill(null);
    loadedSetRef.current = new Set();

    // 1. High priority: Load frame 1 immediately and draw onto canvas
    const firstImg = new Image();
    firstImg.src = FRAME_PATHS[0];
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      loadedSetRef.current.add(0);
      resizeCanvas();
      drawFrame(0);
    };

    // 2. Progressive preloading of remaining frames
    const loadBatch = (indices: number[]) => {
      indices.forEach((i) => {
        if (i === 0) return;
        const img = new Image();
        img.src = FRAME_PATHS[i];
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedSetRef.current.add(i);
          if (Math.round(targetFrameRef.current) === i) {
            drawFrame(i);
          }
        };
      });
    };

    // Fast keyframe pass (every 5th frame)
    const priorityIndices: number[] = [];
    for (let i = 1; i < totalFrames; i += 5) {
      priorityIndices.push(i);
    }
    loadBatch(priorityIndices);

    // Full preloading of remaining frames in background
    const timer = setTimeout(() => {
      const remaining: number[] = [];
      for (let i = 1; i < totalFrames; i++) {
        if (!priorityIndices.includes(i)) {
          remaining.push(i);
        }
      }
      loadBatch(remaining);
    }, 100);

    return () => clearTimeout(timer);
  }, [totalFrames, drawFrame, resizeCanvas]);

  // Window resize listener
  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeCanvas]);

  // Whole website scroll listener with smooth LERP interpolation
  useEffect(() => {
    let currentSmoothedFrame = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;

      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    const renderLoop = () => {
      const target = targetFrameRef.current;
      const diff = target - currentSmoothedFrame;

      if (Math.abs(diff) > 0.001) {
        currentSmoothedFrame += diff * 0.14;
      } else {
        currentSmoothedFrame = target;
      }

      const frameIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(currentSmoothedFrame)));

      if (frameIndex !== renderedFrameRef.current) {
        drawFrame(frameIndex);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, drawFrame]);

  return (
    <div
      id="site-background-container"
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0 bg-[#0d0204]"
      aria-hidden="true"
    >
      {/* High-Resolution HTML5 Canvas for Scroll-Controlled Video Frames */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block select-none"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />

      {/* Subtle soft edge blend so letterboxed edges transition naturally into the site */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0a0204]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0204]/80 via-transparent to-[#0a0204]/40 pointer-events-none" />
    </div>
  );
}
