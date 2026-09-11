"use client";
import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./black-hole-utils/renderer";

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = createRenderer({ canvas });
    void renderer.ready.catch(() => setFailed(true));
    return () => renderer.dispose();
  }, []);
  return <div className="black-hole-canvas-wrap" data-failed={failed || undefined}><canvas ref={canvasRef} /></div>;
}
