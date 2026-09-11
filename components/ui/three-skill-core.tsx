import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeSkillCore() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTech, setActiveTech] = useState("FULL STACK CORE");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth || 380;
    const height = mount.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 28;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Outer Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(7.2, 1);
    const outerWireMat = new THREE.MeshBasicMaterial({
      color: 0xff1e2d,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerWireMat);
    rootGroup.add(outerMesh);

    // Glowing Vertex Points on Outer Mesh
    const pointsGeo = new THREE.IcosahedronGeometry(7.2, 1);
    const pointsMat = new THREE.PointsMaterial({
      color: 0xff5e6a,
      size: 0.55,
      transparent: true,
      opacity: 0.95,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    rootGroup.add(pointsMesh);

    // 2. Inner Crystal / Octahedron Core
    const innerGeo = new THREE.OctahedronGeometry(4, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x1f0609,
      emissive: 0xaa0e1c,
      emissiveIntensity: 0.7,
      wireframe: false,
      shininess: 90,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    const innerWire = new THREE.Mesh(
      innerGeo,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
    );
    innerMesh.add(innerWire);

    // 3. Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(10.2, 0.08, 12, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xff1e2d,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.35;
    rootGroup.add(ring1);

    // 4. Orbital Ring 2 (tilted other way)
    const ring2Geo = new THREE.TorusGeometry(11.4, 0.08, 12, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xff707a,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI * 0.4;
    ring2.rotation.x = Math.PI * 0.15;
    rootGroup.add(ring2);

    // 5. Orbiting Tech Satellites
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satGeo = new THREE.SphereGeometry(0.5, 12, 12);
    const satMat1 = new THREE.MeshBasicMaterial({ color: 0x65dfc4 });
    const satMat2 = new THREE.MeshBasicMaterial({ color: 0xa890ff });
    const satMat3 = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const sat1 = new THREE.Mesh(satGeo, satMat1);
    const sat2 = new THREE.Mesh(satGeo, satMat2);
    const sat3 = new THREE.Mesh(satGeo, satMat3);
    satelliteGroup.add(sat1, sat2, sat3);

    // Lighting
    const pointLight = new THREE.PointLight(0xa58eff, 2.5, 50);
    pointLight.position.set(10, 10, 15);
    scene.add(pointLight);

    const mintLight = new THREE.PointLight(0x65dfc4, 1.8, 40);
    mintLight.position.set(-10, -10, 10);
    scene.add(mintLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Drag / Interaction State
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      velX = deltaX * 0.005;
      velY = deltaY * 0.005;

      rootGroup.rotation.y += velX;
      rootGroup.rotation.x += velY;

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.style.cursor = "grab";
    domEl.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevX;
      const deltaY = e.touches[0].clientY - prevY;
      velX = deltaX * 0.006;
      velY = deltaY * 0.006;
      rootGroup.rotation.y += velX;
      rootGroup.rotation.x += velY;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Double click to trigger spin impulse
    const onDblClick = () => {
      velX = 0.12;
      velY = 0.04;
    };
    domEl.addEventListener("dblclick", onDblClick);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();
    const techLabels = ["REACT.JS", "NODE.JS", "TYPESCRIPT", "MONGODB", "REST APIS", "FULL STACK CORE"];

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Inertia / damping
      if (!isDragging) {
        velX *= 0.95;
        velY *= 0.95;

        if (!prefersReducedMotion) {
          // Base idle rotation
          rootGroup.rotation.y += 0.007 + velX;
          rootGroup.rotation.x += 0.003 + velY;
        }
      }

      // Orbital animations
      ring1.rotation.z = time * 0.4;
      ring2.rotation.z = -time * 0.35;

      innerMesh.rotation.y = -time * 0.6;
      innerMesh.rotation.x = Math.sin(time * 0.5) * 0.3;

      // Satellites orbiting
      sat1.position.x = Math.cos(time * 1.2) * 10.2;
      sat1.position.z = Math.sin(time * 1.2) * 10.2;
      sat1.position.y = Math.sin(time * 2.4) * 2;

      sat2.position.y = Math.cos(time * 0.9) * 11.4;
      sat2.position.z = Math.sin(time * 0.9) * 11.4;
      sat2.position.x = Math.cos(time * 1.8) * 2.5;

      sat3.position.x = Math.sin(time * 1.5) * 8.5;
      sat3.position.y = Math.cos(time * 1.5) * 8.5;

      // Cycle active tech name based on rotation
      const idx = Math.floor(Math.abs(rootGroup.rotation.y * 1.5) % techLabels.length);
      setActiveTech(techLabels[idx]);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      domEl.removeEventListener("dblclick", onDblClick);
      window.removeEventListener("resize", onResize);

      outerGeo.dispose();
      outerWireMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat1.dispose();
      satMat2.dispose();
      satMat3.dispose();
      renderer.dispose();
      if (domEl && mount.contains(domEl)) {
        mount.removeChild(domEl);
      }
    };
  }, []);

  return (
    <div
      className="skill-3d-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="skill-3d-header">
        <span className="skill-3d-badge">
          <span className="pulse-dot" /> 3D INTERACTIVE CORE
        </span>
        <span className="skill-3d-active">{activeTech}</span>
      </div>

      <div ref={mountRef} className="skill-3d-canvas-box" />

      <div className="skill-3d-footer">
        <span className="hint-text">
          <i /> DRAG TO ROTATE · DOUBLE CLICK TO SPIN
        </span>
      </div>
    </div>
  );
}

export default ThreeSkillCore;
