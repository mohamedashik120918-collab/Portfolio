'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const SEROTONIN_LIP_PATH =
  'M94.5053 14.6345C101.806 21.8528 109.576 28.4892 117.183 35.3664C117.5 35.6528 118.143 36.1983 118.391 36.4777C118.488 36.586 118.486 36.8137 118.583 36.8866C118.626 36.919 118.776 36.8339 118.94 36.9271C119.6 37.3015 120.309 38.3035 121 38.7073C119.258 40.2498 117.259 41.4714 115.196 42.5291C111.659 51.5094 106.633 60.1751 101.083 68.0401C97.8398 72.6351 94.5254 76.9982 89.8775 80.236C83.5141 84.67 75.4141 87.7104 67.7704 88.9421C66.7866 89.101 65.7837 89.1475 64.8229 89.3641L64.7727 88.9593L64.5214 89.2123L64.7214 89.3631C63.5999 89.4694 62.4773 89.6728 61.3538 89.768C54.7181 90.3297 47.6582 89.9663 41.3773 87.6223C35.851 85.5596 31.0704 81.9727 26.533 78.2786V77.726C26.3532 77.6622 26.2848 77.8909 26.1823 77.894C26.0014 77.899 23.7433 75.8455 23.4157 75.551C19.9707 72.4519 16.7739 69.0664 13.6143 65.6769L13.6686 65.1759C13.0294 65.3388 13.2998 65.2639 13.0214 64.9704C10.2759 62.0809 7.78657 58.9545 5.32644 55.8139L0.100663 54.5468C0.306679 54.3292 -0.0219412 54.1126 0.00117277 53.9952C0.0162471 53.9162 0.230302 53.8707 0.304669 53.7644C0.692582 53.2098 1.20813 52.2847 1.65433 51.81C1.81512 51.639 2.17891 51.5206 2.19499 51.4943C2.25228 51.4001 2.18193 51.1684 2.26032 51.0044C2.32664 50.8657 2.59597 50.805 2.70953 50.636C2.78892 50.5186 2.72461 50.3425 2.7638 50.2888C2.82912 50.2008 3.00901 50.2969 3.06529 50.2028C3.16076 50.0429 3.18789 49.7231 3.33663 49.4559C4.94456 46.5825 7.1635 43.7001 8.86188 40.7498C13.6475 32.4364 17.2563 22.875 22.6308 15.0434C29.4715 5.07617 41.4999 -0.321381 51.9042 8.29668C52.5886 8.86346 53.3966 9.8877 54.0156 10.3199C54.101 10.3796 54.1151 10.4606 54.2668 10.4191C55.911 4.51951 61.7437 1.02472 67.4951 0.208961C73.7771 -0.68169 80.8248 1.30709 85.5753 5.55793C88.6354 8.29668 91.5447 11.7105 94.5013 14.6345H94.5053Z';

const LIP_MASK_SVG_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 90" fill="%23000000"><path d="${SEROTONIN_LIP_PATH}"/></svg>`;

export interface LipScrollZoominAnimationProps {
  title?: string;
  subtitle?: React.ReactNode;
  outroTitle?: React.ReactNode;
  outroSubtitle?: React.ReactNode;
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

function Corner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const paths = {
    tl: 'M10 0V1H1V10H0V0H10Z', tr: 'M10 0V10H9V1H0V0H10Z',
    bl: 'M0 0H1V9H10V10H0V0Z', br: 'M10 10H0V9H9V0H10V10Z',
  };
  const positions = { tl: 'top-[10px] left-[10px]', tr: 'top-[10px] right-[10px]', bl: 'bottom-[10px] left-[10px]', br: 'bottom-[10px] right-[10px]' };
  return <div className={`absolute ${positions[position]} z-30 pointer-events-none w-4 h-4 sm:w-5 sm:h-5 text-black`}><svg viewBox="0 0 10 10" fill="none" className="w-full h-full"><path d={paths[position]} fill="currentColor" style={{ mixBlendMode: 'difference' }} /></svg></div>;
}

export function LipScrollZoominAnimation({
  title = 'A VISION IN MOTION.',
  subtitle = <>EXPERIENCE DIGITAL STORYTELLING THROUGH <span className="text-violet-600 font-black">MOTION</span>, DEPTH AND INTERACTION.</>,
  outroTitle = <>THE JOURNEY <span className="text-violet-600 font-black">CONTINUES.</span></>,
  outroSubtitle = <>THOUGHTFUL EXPERIENCES BUILT WITH <span className="text-violet-600 font-black">DESIGN, CODE, AND CURIOSITY.</span></>,
  videoSrc = 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
  posterSrc = 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.jpg',
  className = '',
}: LipScrollZoominAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
    const ctx = gsap.context(() => {
      const getInitialSize = () => window.innerWidth < 640 ? 260 : window.innerWidth < 1024 ? 340 : 420;
      const initialSize = getInitialSize();
      if (maskLayerRef.current) {
        maskLayerRef.current.style.setProperty('--maskW', `${initialSize}px`);
        maskLayerRef.current.style.webkitMaskSize = `${initialSize}px`;
        maskLayerRef.current.style.maskSize = `${initialSize}px`;
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', end: '+=260%', scrub: 1.2,
          pin: pinRef.current, pinSpacing: true, anticipatePin: 1,
          onUpdate: self => {
            const currentSize = getInitialSize() + Math.pow(self.progress, 2.3) * 4500;
            if (maskLayerRef.current) {
              maskLayerRef.current.style.setProperty('--maskW', `${currentSize}px`);
              maskLayerRef.current.style.webkitMaskSize = `${currentSize}px`;
              maskLayerRef.current.style.maskSize = `${currentSize}px`;
            }
          },
        },
      });
      tl.to(videoRef.current, { scale: 1.22, ease: 'none' }, 0);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`lip-scroll-section w-full bg-white text-black selection:bg-violet-600 selection:text-white ${className}`}>
      <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-12 select-none">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-2 sm:px-4">
          <p className="mb-8 text-[10px] font-black tracking-[.28em] text-violet-600">MOHAMED ASHIK / CREATIVE DEVELOPMENT</p>
          <h1 className="text-[10vw] sm:text-[8vw] md:text-[6.5rem] lg:text-[7.8rem] font-black uppercase leading-[0.88] tracking-[-0.04em] text-black mb-6 select-none">{title}</h1>
          <p className="max-w-3xl text-xs sm:text-sm md:text-base uppercase font-bold leading-relaxed tracking-wider text-black opacity-90">{subtitle}</p>
        </div>
      </section>

      <div ref={containerRef} className="relative w-full bg-white text-black" style={{ minHeight: '360vh' }}>
        <div ref={pinRef} className="motion-section__pin sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-white select-none relative">
          <Corner position="tl"/><Corner position="tr"/><Corner position="bl"/><Corner position="br"/>
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none z-0"><span className="text-[20vw] font-black uppercase tracking-tighter text-black">CREATE</span></div>
          <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
            <div ref={maskLayerRef} className="motion-section__bottom w-full h-full relative overflow-hidden flex items-center justify-center" style={{ WebkitMaskImage: `url('${LIP_MASK_SVG_URI}')`, maskImage: `url('${LIP_MASK_SVG_URI}')`, WebkitMaskPosition: '50% 50%', maskPosition: '50% 50%', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'var(--maskW, 420px)', maskSize: 'var(--maskW, 420px)', transition: 'mask-size .04s linear, -webkit-mask-size .04s linear' }}>
              <video ref={videoRef} className="motion-section__video w-full h-full object-cover will-change-transform bg-black" loop muted playsInline autoPlay preload="auto" poster={posterSrc} style={{ transform: 'scale(1)', transformOrigin: '50% 50%' }}>
                <source src={videoSrc} type="video/mp4"/><source src="https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4" type="video/mp4"/>
              </video>
            </div>
          </div>
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 text-[8px] font-black tracking-[.25em] mix-blend-difference text-white">SCROLL TO ENTER THE FRAME</div>
        </div>
      </div>

      <footer className="relative z-10 w-full min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-12 select-none">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-2 sm:px-4">
          <h2 className="text-[10vw] sm:text-[8vw] md:text-[6.5rem] lg:text-[7.8rem] font-black uppercase leading-[0.88] tracking-[-0.04em] text-black mb-6">{outroTitle}</h2>
          <p className="max-w-3xl text-xs sm:text-sm md:text-base uppercase font-bold leading-relaxed tracking-wider text-black opacity-90">{outroSubtitle}</p>
        </div>
      </footer>
    </div>
  );
}

export default LipScrollZoominAnimation;
