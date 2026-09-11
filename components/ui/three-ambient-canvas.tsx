import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeAmbientCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";
    container.appendChild(renderer.domElement);

    // 1. Primary glowing particle cloud
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColorA = new THREE.Color("#937bff"); // Electric violet
    const baseColorB = new THREE.Color("#65dfc4"); // Mint neon
    const baseColorC = new THREE.Color("#ffffff"); // Star white

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 35 + Math.random() * 85;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 160;

      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = (Math.random() - 0.5) * 90;

      const rand = Math.random();
      const color = rand > 0.6 ? baseColorA : rand > 0.2 ? baseColorB : baseColorC;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas texture for clean circular particles with soft glow
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, "rgba(200,190,255,0.85)");
      grad.addColorStop(0.6, "rgba(147,123,255,0.25)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.4,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. Floating geometric wireframe meshes
    const geomGroup = new THREE.Group();
    scene.add(geomGroup);

    const wireMatViolet = new THREE.MeshBasicMaterial({
      color: 0x937bff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMatMint = new THREE.MeshBasicMaterial({
      color: 0x65dfc4,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });

    // Mesh 1: Octahedron
    const mesh1 = new THREE.Mesh(new THREE.OctahedronGeometry(6, 1), wireMatViolet);
    mesh1.position.set(-42, 25, -20);
    geomGroup.add(mesh1);

    // Mesh 2: Icosahedron
    const mesh2 = new THREE.Mesh(new THREE.IcosahedronGeometry(7, 0), wireMatMint);
    mesh2.position.set(46, -30, -15);
    geomGroup.add(mesh2);

    // Mesh 3: Torus wire
    const mesh3 = new THREE.Mesh(
      new THREE.TorusGeometry(8, 0.4, 8, 36),
      new THREE.MeshBasicMaterial({
        color: 0xa890ff,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      })
    );
    mesh3.position.set(-35, -45, -25);
    geomGroup.add(mesh3);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) / halfW;
      targetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Handle scroll parallax
    let scrollY = 0;
    let targetScrollY = 0;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.06;

      particles.rotation.y = elapsedTime * 0.03 + mouseX * 0.25;
      particles.rotation.x = -mouseY * 0.15;

      mesh1.rotation.x = elapsedTime * 0.2;
      mesh1.rotation.y = elapsedTime * 0.28;
      mesh1.position.y = 25 + Math.sin(elapsedTime * 0.8) * 3;

      mesh2.rotation.x = -elapsedTime * 0.18;
      mesh2.rotation.z = elapsedTime * 0.22;
      mesh2.position.y = -30 + Math.cos(elapsedTime * 0.7) * 4;

      mesh3.rotation.x = elapsedTime * 0.15;
      mesh3.rotation.y = elapsedTime * 0.2;

      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollRatio = Math.min(1, Math.max(0, scrollY / maxScroll));
      camera.position.y = -scrollRatio * 45;
      camera.position.x = mouseX * 6;
      camera.position.z = 85 + Math.sin(scrollRatio * Math.PI) * 10;
      camera.lookAt(0, -scrollRatio * 45, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      particleMaterial.dispose();
      texture.dispose();
      wireMatViolet.dispose();
      wireMatMint.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-ambient-container"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    />
  );
}

export default ThreeAmbientCanvas;
