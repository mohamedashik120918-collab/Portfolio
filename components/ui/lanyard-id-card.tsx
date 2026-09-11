import React, { useEffect, useRef, useState } from "react";

export default function LanyardIdCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    const strap = strapRef.current;
    if (!wrapper || !card) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let vx = 0;
    let vy = 0;
    let stretchP = 0;
    let animId: number | null = null;

    // Render 2D translation, 3D tilt, and strap stretching
    const renderTransforms = () => {
      const rot = 0.16 * currentX;
      const rotX = Math.min(22, Math.max(-22, -(0.07 * currentY)));
      const rotY = Math.min(22, Math.max(-22, 0.07 * currentX));

      wrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) rotate(${rot}deg)`;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if (strap) {
        strap.style.transform = `scaleY(${1 + stretchP})`;
      }
    };

    // Spring physics & idle pendulum loop
    const physicsLoop = (time: number) => {
      if (isDragging) return;

      const springForceX = -0.048 * currentX;
      const springForceY = -0.048 * currentY;

      vx = (vx + springForceX) * 0.915; // Damping
      vy = (vy + springForceY) * 0.915;

      currentX += vx;
      currentY += vy;
      stretchP = Math.max(-0.1, 0.0035 * currentY);

      // Check if settled -> switch to ambient idle sine wave sway
      if (
        Math.abs(currentX) < 0.08 &&
        Math.abs(currentY) < 0.08 &&
        Math.abs(vx) < 0.08 &&
        Math.abs(vy) < 0.08
      ) {
        currentX = 0;
        currentY = 0;
        const idleRot = 4.5 * Math.sin(0.0016 * time);
        wrapper.style.transform = `translate3d(0px, 0px, 0px) rotate(${idleRot}deg)`;
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
        if (strap) strap.style.transform = "scaleY(1)";
        animId = requestAnimationFrame(physicsLoop);
        return;
      }

      renderTransforms();
      animId = requestAnimationFrame(physicsLoop);
    };

    // Drag start
    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      if (e.cancelable && e.type !== "touchstart") e.preventDefault();
      isDragging = true;
      if (animId) cancelAnimationFrame(animId);

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      startX = clientX - currentX;
      startY = clientY - currentY;

      card.style.transition = "none";
      if (strap) strap.style.transition = "none";
      wrapper.style.transition = "none";
    };

    // Drag move
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rawX = (clientX - startX) * 0.85;
      const rawY = (clientY - startY) * 0.85;

      // Elastic limit for extreme drag distances (> 380px)
      const dist = Math.hypot(rawX, rawY);
      const factor = dist > 380 ? (380 + (dist - 380) * 0.3) / dist : 1;

      const targetX = rawX * factor;
      const targetY = rawY * factor;

      vx = (targetX - currentX) * 0.7;
      vy = (targetY - currentY) * 0.7;

      currentX = targetX;
      currentY = targetY;
      stretchP = Math.max(-0.1, 0.0035 * currentY);

      renderTransforms();

      // Glare reflection on card
      const rect = card.getBoundingClientRect();
      const glareX = ((clientX - rect.left) / rect.width) * 100;
      const glareY = ((clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--glare-x", `${glareX}%`);
      card.style.setProperty("--glare-y", `${glareY}%`);
    };

    // Drag end
    const handleDragEnd = () => {
      if (isDragging) {
        isDragging = false;
        animId = requestAnimationFrame(physicsLoop);
      }
    };

    wrapper.addEventListener("mousedown", handleDragStart);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    wrapper.addEventListener("touchstart", handleDragStart, { passive: false });
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    animId = requestAnimationFrame(physicsLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      wrapper.removeEventListener("mousedown", handleDragStart);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);

      wrapper.removeEventListener("touchstart", handleDragStart);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center select-none" style={{ zIndex: 20 }}>
      {/* Fixed Circular Rotating Badge - Stationary on the upper right of the strap (matches reference) */}
      <div
        className="rotating-badge-wrapper"
        style={{
          position: "absolute",
          top: "8px",
          left: "calc(50% + 8px)",
          width: "98px",
          height: "98px",
          overflow: "visible",
          pointerEvents: "none",
          animation: "spinSlow 20s linear infinite",
          zIndex: 3,
        }}
      >
        <svg
          className="rotating-svg"
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            id="idCardCirclePath"
            fill="none"
            stroke="none"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
          <text
            fill="#ffffff"
            fontSize="8.2"
            fontWeight="800"
            letterSpacing="2.2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <textPath href="#idCardCirclePath">
              • SOFTWARE DEVELOPER • REACT &amp; NODE.JS •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Draggable/Pullable ID Card Container - Moves and springs freely */}
      <div
        ref={wrapperRef}
        className="id-card-lanyard-wrapper cursor-grab active:cursor-grabbing select-none"
        style={{
          position: "relative",
          width: "250px",
          height: "462px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 0,
          padding: 0,
          overflow: "visible",
          transformOrigin: "top center",
          willChange: "transform",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Pull & Release Me!"
      >
        {/* 1. Lanyard Strap (Exact 44px x 90px with Woven Ribbing Gradient) */}
        <div
          ref={strapRef}
          className="lanyard-strap"
          style={{
            position: "relative",
            width: "44px",
            height: "90px",
            zIndex: 5,
            borderRadius: "3px 3px 0 0",
            overflow: "hidden",
            transformOrigin: "top center",
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0px, rgba(0, 0, 0, 0.35) 1.5px, transparent 1.5px, transparent 4px),
              linear-gradient(90deg, rgb(80, 0, 8) 0%, rgb(139, 0, 0) 15%, rgb(192, 0, 15) 30%, rgb(232, 0, 26) 50%, rgb(192, 0, 15) 70%, rgb(139, 0, 0) 85%, rgb(80, 0, 8) 100%)
            `,
            boxShadow: "rgba(0, 0, 0, 0.8) 4px 0px 10px 0px, rgba(0, 0, 0, 0.8) -4px 0px 10px 0px",
          }}
        />

        {/* 2. Lanyard Clip (Exact 44px x 22px Metallic Swivel Fastener) */}
        <div
          className="lanyard-clip"
          style={{
            position: "relative",
            width: "44px",
            height: "22px",
            marginTop: "-3px",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "2.5px solid rgb(220, 220, 220)",
              background: "linear-gradient(to bottom, #dcdcdc, #808080)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "28px",
              height: "8px",
              background: "linear-gradient(90deg, #666 0%, #e0e0e0 50%, #666 100%)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* 3. Main Hanging ID Card (Exact 240px x 355px with Metallic Bevel) */}
        <div
          ref={cardRef}
          className="hanging-id-card"
          style={{
            position: "relative",
            width: "240px",
            height: "355px",
            boxSizing: "border-box",
            marginTop: "-2px",
            padding: "6px",
            borderRadius: "18px",
            backgroundImage:
              "linear-gradient(145deg, rgb(245, 245, 245) 0%, rgb(200, 200, 200) 20%, rgb(232, 232, 232) 35%, rgb(176, 176, 176) 50%, rgb(216, 216, 216) 65%, rgb(160, 160, 160) 80%, rgb(206, 206, 206) 100%)",
            boxShadow:
              "rgba(0, 0, 0, 0.95) 0px 30px 60px 0px, rgba(255, 255, 255, 0.3) 0px 0px 0px 1px, rgba(255, 255, 255, 0.6) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.4) 0px -1px 0px 0px inset",
            transformStyle: "preserve-3d",
            pointerEvents: "auto",
          }}
        >
          {/* 4 Metallic Rivets in Corners (Exact 11px Diameter) */}
          <div
            className="card-rivet tl"
            style={{
              position: "absolute",
              top: "9px",
              left: "9px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              zIndex: 15,
              backgroundImage:
                "radial-gradient(circle at 35% 35%, rgb(232, 232, 232) 20%, rgb(160, 160, 160) 55%, rgb(136, 136, 136) 100%)",
              boxShadow: "rgba(0, 0, 0, 0.8) 0px 1px 3px 0px, rgba(255, 255, 255, 0.6) 0px 1px 1px 0px inset",
            }}
          />
          <div
            className="card-rivet tr"
            style={{
              position: "absolute",
              top: "9px",
              right: "9px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              zIndex: 15,
              backgroundImage:
                "radial-gradient(circle at 35% 35%, rgb(232, 232, 232) 20%, rgb(160, 160, 160) 55%, rgb(136, 136, 136) 100%)",
              boxShadow: "rgba(0, 0, 0, 0.8) 0px 1px 3px 0px, rgba(255, 255, 255, 0.6) 0px 1px 1px 0px inset",
            }}
          />
          <div
            className="card-rivet bl"
            style={{
              position: "absolute",
              bottom: "9px",
              left: "9px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              zIndex: 15,
              backgroundImage:
                "radial-gradient(circle at 35% 35%, rgb(232, 232, 232) 20%, rgb(160, 160, 160) 55%, rgb(136, 136, 136) 100%)",
              boxShadow: "rgba(0, 0, 0, 0.8) 0px 1px 3px 0px, rgba(255, 255, 255, 0.6) 0px 1px 1px 0px inset",
            }}
          />
          <div
            className="card-rivet br"
            style={{
              position: "absolute",
              bottom: "9px",
              right: "9px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              zIndex: 15,
              backgroundImage:
                "radial-gradient(circle at 35% 35%, rgb(232, 232, 232) 20%, rgb(160, 160, 160) 55%, rgb(136, 136, 136) 100%)",
              boxShadow: "rgba(0, 0, 0, 0.8) 0px 1px 3px 0px, rgba(255, 255, 255, 0.6) 0px 1px 1px 0px inset",
            }}
          />

          {/* Dynamic Specular Sheen on Glass */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: "18px",
              zIndex: 20,
              background:
                "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 30%), rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 42%, transparent 72%)",
              mixBlendMode: "screen",
              opacity: isHovered ? 0.8 : 0.35,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Card Inner Area (Exact 228px x 343px with Deep Crimson Studio Vignette) */}
          <div
            className="card-inner"
            style={{
              position: "relative",
              width: "228px",
              height: "343px",
              borderRadius: "13px",
              background:
                "radial-gradient(ellipse at 42% 42%, #a80c19 0%, #68050e 45%, #250105 80%, #0c0002 100%)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Top-Left Constellation / Network Emblem (Matches Reference) */}
            <div
              className="card-network-emblem"
              style={{
                position: "absolute",
                top: "-4px",
                left: "-6px",
                width: "74px",
                height: "90px",
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              <svg width="74" height="90" viewBox="0 0 74 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Connecting Web / Filament Lines */}
                <line x1="32" y1="26" x2="42" y2="64" stroke="rgba(255, 120, 130, 0.45)" strokeWidth="0.75" />
                <line x1="18" y1="20" x2="42" y2="64" stroke="rgba(255, 120, 130, 0.4)" strokeWidth="0.7" />
                <line x1="6" y1="30" x2="42" y2="64" stroke="rgba(255, 120, 130, 0.3)" strokeWidth="0.6" />
                <line x1="6" y1="30" x2="18" y2="20" stroke="rgba(255, 190, 200, 0.7)" strokeWidth="0.85" />
                <line x1="18" y1="20" x2="32" y2="26" stroke="rgba(255, 190, 200, 0.7)" strokeWidth="0.85" />
                <line x1="32" y1="26" x2="45" y2="30" stroke="rgba(255, 190, 200, 0.7)" strokeWidth="0.85" />
                <line x1="42" y1="64" x2="28" y2="84" stroke="rgba(255, 120, 130, 0.35)" strokeWidth="0.6" strokeDasharray="2 2" />
                <line x1="6" y1="30" x2="2" y2="86" stroke="rgba(255, 120, 130, 0.25)" strokeWidth="0.5" strokeDasharray="2 3" />

                {/* Outer Glowing Circle Emblem */}
                <circle cx="27" cy="26" r="23" stroke="rgba(235, 30, 50, 0.85)" strokeWidth="1.6" />
                <circle cx="27" cy="26" r="23" fill="rgba(220, 20, 40, 0.2)" />
                <circle cx="27" cy="26" r="18" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.7" strokeDasharray="3 3" />

                {/* Glowing Red Nodes with Specular Highlights */}
                <circle cx="6" cy="30" r="4.5" fill="#e51025" filter="drop-shadow(0 0 5px #ff3344)" />
                <circle cx="6" cy="30" r="1.6" fill="#ffffff" />

                <circle cx="18" cy="20" r="5" fill="#e51025" filter="drop-shadow(0 0 6px #ff3344)" />
                <circle cx="18" cy="20" r="1.9" fill="#ffffff" />

                <circle cx="32" cy="26" r="4.5" fill="#e51025" filter="drop-shadow(0 0 5px #ff3344)" />
                <circle cx="32" cy="26" r="1.6" fill="#ffffff" />

                <circle cx="45" cy="30" r="3.8" fill="#e51025" filter="drop-shadow(0 0 4px #ff3344)" />
                <circle cx="45" cy="30" r="1.3" fill="#ffffff" />

                {/* Lower Hanging Web Node */}
                <circle cx="42" cy="64" r="3.5" fill="#e51025" filter="drop-shadow(0 0 4px #ff3344)" />
                <circle cx="42" cy="64" r="1.3" fill="#ffffff" />
              </svg>
            </div>

            {/* Photo Wrap with Mohamed Ashik's Crimson Studio Portrait */}
            <div
              className="card-photo-wrap"
              style={{
                position: "relative",
                width: "228px",
                height: "295px",
                zIndex: 2,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/portraits/ashik_id_card_bg.jpg"
                alt="Mohamed Ashik"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 12%",
                  transform: "scale(1.2)",
                  transformOrigin: "center 22%",
                  pointerEvents: "none",
                  filter: "contrast(1.04) brightness(1.02)",
                }}
                draggable={false}
              />
            </div>

            {/* Bottom Name Strip (Exact 228px x 48px with Solid Crimson Red Finish) */}
            <div
              className="card-name-strip"
              style={{
                position: "relative",
                width: "228px",
                height: "48px",
                boxSizing: "border-box",
                zIndex: 4,
                padding: "6px 14px 7px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "linear-gradient(180deg, #c4121e 0%, #9e0a15 100%)",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.45)",
                borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              {/* White Name Block */}
              <div
                className="card-name-block"
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 6px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "21px",
                    lineHeight: "21px",
                    letterSpacing: "2.5px",
                    color: "#b80c19",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  ASHIK
                </span>
              </div>

              {/* Italic Role Script */}
              <div className="card-role-italic" style={{ paddingRight: "4px" }}>
                <span
                  className="role-main"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "20px",
                    fontStyle: "italic",
                    lineHeight: "20px",
                    color: "#ffffff",
                    letterSpacing: "0.5px",
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  }}
                >
                  Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
