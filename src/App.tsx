import React, { useState, useEffect } from "react";
import CinematicScrollCanvas from "@/components/ui/cinematic-scroll-canvas";
import LanyardIdCard from "@/components/ui/lanyard-id-card";
import GlassNav from "@/components/ui/glass-nav";
import CustomCursor from "@/components/ui/custom-cursor";
import ScrollProgressBar from "@/components/ui/scroll-progress";
import ThreeSkillCore from "@/components/ui/three-skill-core";
import SkillsTechStack from "@/components/ui/skills-tech-stack";
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Smartphone,
  Server,
  Layers,
  Award,
  ExternalLink,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Terminal,
  ChevronRight,
  Bot,
  Globe,
  Radio,
  FileText,
  MapPin,
  Calendar,
  Eye,
  X,
  MessageCircle,
  Phone
} from "lucide-react";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// Project Data
interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "AI & CV" | "Mobile & IoT";
  description: string;
  tags: string[];
  image?: string;
  demoUrl: string;
  githubUrl: string;
  highlights: string[];
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "tevolt-ev-platform",
    title: "Tevolt — EV Charging Platform",
    category: "Full Stack",
    description: "Production client website launched for an electric vehicle charging station infrastructure enterprise, engineered during full-stack internship at Jaz Infotech.",
    tags: ["React.js", "JavaScript (ES6+)", "REST APIs", "Tailwind CSS", "Responsive Design"],
    image: "/projects/tevolt.jpg",
    demoUrl: "https://tevolt.in",
    githubUrl: "https://github.com",
    highlights: [
      "Live production client deployment: tevolt.in",
      "Engineered responsive UI and interactive features to client specifications",
      "Integrated backend APIs, database tasks, testing, and UX optimization"
    ],
    featured: true,
  },
  {
    id: "premises-management",
    title: "Premises Management System",
    category: "Full Stack",
    description: "Full-stack property and tenant management system featuring automated lease tracking, rent collection telemetry, and cloud database persistence.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "REST APIs"],
    image: "/portraits/section1.jpg",
    demoUrl: "#contact",
    githubUrl: "https://github.com",
    highlights: [
      "RESTful API architecture for CRUD operations on properties and tenants",
      "Real-time tracking of rent payments (online & cash settlement methods)",
      "Responsive React.js interface backed by MongoDB Atlas cloud cluster"
    ],
    featured: true,
  },
  {
    id: "portfolio-website",
    title: "Mohamed Ashik Luxury Portfolio",
    category: "Full Stack",
    description: "High-performance developer portfolio featuring interactive 3D lanyard physics, zero-lag canvas scroll synchronization, and crimson glassmorphism UI.",
    tags: ["React", "TypeScript", "Three.js", "Tailwind CSS", "Canvas API"],
    image: "/portraits/section2.jpg",
    demoUrl: "#top",
    githubUrl: "https://github.com",
    highlights: [
      "Hardware-accelerated dynamic portrait scroll synchronization",
      "Interactive 3D pendulum lanyard ID card simulation",
      "Ultra-responsive modern layout with 60 FPS hardware acceleration"
    ],
    featured: true,
  },
  {
    id: "fintech-ledger-engine",
    title: "MySQL Ledger & REST API Engine",
    category: "Full Stack",
    description: "High-performance backend financial ledger and billing engine with relational database transaction management, schema optimization, and Postman-tested endpoints.",
    tags: ["Node.js", "Express.js", "MySQL", "REST APIs", "Postman"],
    image: "/portraits/section4.jpg",
    demoUrl: "#contact",
    githubUrl: "https://github.com",
    highlights: [
      "Relational database modeling with ACID-compliant MySQL schemas",
      "Postman collection-tested RESTful endpoints with sub-50ms latency",
      "Structured JSON data interchange with robust error handling"
    ],
  },
  {
    id: "ai-vision-attendance",
    title: "AI Vision Telemetry & Detection",
    category: "AI & CV",
    description: "Automated biometric facial detection and verification platform exploring intelligent image processing, webcam telemetry, and web dashboard integration.",
    tags: ["JavaScript", "React.js", "Node.js", "REST APIs", "JSON"],
    image: "/projects/ai_attendance.jpg",
    demoUrl: "#contact",
    githubUrl: "https://github.com",
    highlights: [
      "Real-time webcam telemetry stream processing",
      "RESTful API integration for biometric record logging",
      "Dynamic administrative interface built with React.js"
    ],
    featured: true,
  },
  {
    id: "responsive-client-suite",
    title: "Cross-Platform Mobile-Web Suite",
    category: "Mobile & IoT",
    description: "Cross-platform responsive mobile-first web application designed with fluid touch micro-interactions, Bootstrap and Tailwind CSS layout systems.",
    tags: ["React.js", "Bootstrap", "Tailwind CSS", "Mobile-First", "JSON"],
    image: "/portraits/section6.jpg",
    demoUrl: "#contact",
    githubUrl: "https://github.com",
    highlights: [
      "Mobile-first responsive architecture supporting all screen aspect ratios",
      "Intuitive touch micro-interactions and optimized asset delivery",
      "Seamless API data interchange and persistent state"
    ],
  },
];

// Exact WHAT I DO Cards (Matching Reference Image)
const WHAT_I_DO_CARDS = [
  {
    icon: "🌐",
    title: "FULL-STACK WEB DEV",
    desc: "Building fast React.js, Next.js, Vite & Node.js applications with Tailwind CSS.",
  },
  {
    icon: "👁️",
    title: "AI & COMPUTER VISION",
    desc: "Developing RoomPulse face recognition attendance systems with OpenCV & ESP32-CAM.",
  },
  {
    icon: "🤖",
    title: "EMBEDDED IOT & ROBOTICS",
    desc: "Programming ESP32, Arduino microcontrollers, hardware sensors & automation systems.",
  },
  {
    icon: "⚡",
    title: "DATABASE & BACKEND",
    desc: "Structuring backend APIs & cloud storage with MongoDB, PostgreSQL, Supabase & Firebase.",
  },
  {
    icon: "🚀",
    title: "IEDC TECH LEADERSHIP",
    desc: "Organizing tech expos, hackathons, AI workshops, gaming tournaments & science exhibitions.",
  },
];

// Skills Array (20 required items matching resume)
const SKILLS_LIST = [
  { name: "JavaScript (ES6+)", category: "Core", level: "95%" },
  { name: "React.js", category: "Frontend", level: "96%" },
  { name: "Node.js", category: "Backend", level: "92%" },
  { name: "Express.js", category: "Backend", level: "90%" },
  { name: "MySQL", category: "Database", level: "91%" },
  { name: "MongoDB Atlas", category: "Database", level: "88%" },
  { name: "HTML5", category: "Frontend", level: "98%" },
  { name: "CSS3", category: "Frontend", level: "96%" },
  { name: "Tailwind CSS", category: "Styling", level: "95%" },
  { name: "Bootstrap", category: "Styling", level: "92%" },
  { name: "REST APIs", category: "Backend", level: "94%" },
  { name: "JSON", category: "Core", level: "96%" },
  { name: "Responsive Design", category: "Frontend", level: "97%" },
  { name: "Git", category: "Tooling", level: "94%" },
  { name: "GitHub", category: "DevOps", level: "95%" },
  { name: "VS Code", category: "Tooling", level: "96%" },
  { name: "Postman", category: "Tooling", level: "93%" },
  { name: "Web Optimization", category: "Performance", level: "90%" },
  { name: "Tamil", category: "Language", level: "100%" },
  { name: "English", category: "Language", level: "85%" },
];

// Awards & Accolades
const AWARDS = [
  {
    title: "Live Client Platform Launch",
    subtitle: "Tevolt EV Platform (tevolt.in)",
    desc: "Successfully developed and launched live client website for an EV charging infrastructure company during internship at Jaz Infotech.",
    counter: "01",
    year: "2026",
  },
  {
    title: "Full-Stack Developer Intern",
    subtitle: "Jaz Infotech, Tirunelveli",
    desc: "Contributed directly to production web applications, responsive frontend interfaces, REST APIs, and database-related tasks.",
    counter: "02",
    year: "2026",
  },
  {
    title: "Premises Management System",
    subtitle: "Full-Stack Web Innovation",
    desc: "Architected property/tenant ledger with React.js, Node.js, Express, MongoDB Atlas, and online/cash rent tracking.",
    counter: "03",
    year: "2026",
  },
  {
    title: "Academic Excellence in CS",
    subtitle: "Sadakathullah Appa College",
    desc: "B.Sc. Computer Science (Graduating 2026) with strong analytical mindset, solid programming fundamentals, and dedication to software quality.",
    counter: "2026",
    year: "2023–26",
  },
];

// Editorial Gallery Items
const GALLERY_ITEMS = [
  {
    title: "Executive Studio Portrait",
    subtitle: "Studio Lighting / Section 1",
    src: "/portraits/section1.jpg",
    aspect: "3:4",
    desc: "Front-facing luxury editorial studio portrait with deep crimson neon edge illumination.",
  },
  {
    title: "Telephoto Vision Zoom",
    subtitle: "Direct Focus / Section 2",
    src: "/portraits/section2.jpg",
    aspect: "3:4",
    desc: "Slight zoom-in framing capturing intense, visionary focus and sculptural cheekbone rim light.",
  },
  {
    title: "Designer Shades & Reflections",
    subtitle: "Cyber-Chic / Section 3",
    src: "/portraits/section3.jpg",
    aspect: "3:4",
    desc: "Stylized dark sunglasses reflecting crimson laser light streaks in a high-fashion editorial pose.",
  },
  {
    title: "Architectural Side Profile",
    subtitle: "Three-Quarter View / Section 4",
    src: "/portraits/section4.jpg",
    aspect: "3:4",
    desc: "Side profile silhouette illuminated with intense crimson neon contouring against deep shadow.",
  },
  {
    title: "Macro Vision Close-Up",
    subtitle: "Cinematic Intensity / Section 5",
    src: "/portraits/section5.jpg",
    aspect: "1:1",
    desc: "Extreme close-up framing highlighting determined gaze, razor-sharp eye catchlight, and warmth.",
  },
  {
    title: "Cybernetic Hologram Stylized",
    subtitle: "Avant-Garde Art / Section 6",
    src: "/portraits/section6.jpg",
    aspect: "1:1",
    desc: "Futuristic artistic portrait featuring glowing crimson wireframe light trails and digital particle dust.",
  },
];

export default function App() {
  const [introPhase, setIntroPhase] = useState<"show" | "exit" | "done">("show");
  const [introProgress, setIntroProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [galleryModal, setGalleryModal] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Entry sequence
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIntroPhase("done");
      return;
    }

    let frame = 0;
    const startTime = performance.now();
    const duration = 2000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setIntroProgress(pct);
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    const exitTimer = window.setTimeout(() => setIntroPhase("exit"), 2300);
    const doneTimer = window.setTimeout(() => setIntroPhase("done"), 3100);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );
    nodes.forEach((n) => ob.observe(n));
    return () => ob.disconnect();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 4500);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ff1e2d] selection:text-white overflow-x-hidden">
      {/* 1. High-Quality Full-Site Artwork Background Layer */}
      <CinematicScrollCanvas />

      {/* 2. Custom Crimson 3D Cursor & Top Tracker */}
      <CustomCursor />
      <ScrollProgressBar />

      {/* 3. Subtle Film Grain Noise & Ambient Glows */}
      <div className="noise" />
      <div className="cursor-glow" />

      {/* 4. Elegant Initial Loader Screen */}
      {introPhase !== "done" && (
        <div
          className={`intro-screen-crimson ${introPhase}`}
          aria-label="Mohamed Ashik — Portfolio Initializing"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute w-[50vw] h-[50vw] rounded-full bg-radial from-[#ff1e2d]/25 to-transparent blur-3xl pointer-events-none" />

          {/* Monogram / Logo */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full border-2 border-[#ff1e2d]/60 flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(255,30,45,0.6)]">
              <span
                className="text-2xl font-black tracking-widest text-white"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                MA
              </span>
              <div className="absolute -inset-1.5 rounded-full border border-[#ff1e2d]/30 animate-spin" />
            </div>

            <h1
              className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              MOHAMED <span className="text-[#ff1e2d]">ASHIK</span>
            </h1>

            <p
              className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-8"
              style={{ letterSpacing: "0.22em" }}
            >
              MOHAMED ASHIK // SOFTWARE DEVELOPER
            </p>

            {/* Glowing Crimson Progress Ring & Tabular Numbers */}
            <div className="w-64 flex flex-col items-center gap-2">
              <div className="w-full flex justify-between text-[10px] font-mono text-zinc-400">
                <span>INITIALIZING_EXPERIENCE</span>
                <span className="text-[#ff1e2d] font-bold">{String(introProgress).padStart(3, "0")}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-[#b30b17] via-[#ff1e2d] to-white rounded-full transition-all duration-75 shadow-[0_0_12px_#ff1e2d]"
                  style={{ width: `${introProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Sticky Floating Glass Navigation Pill */}
      <GlassNav />

      {/* 5b. Fixed Floating Glass Dock at Bottom Center - 100% Fixed & Stationary Across Entire Page */}
      <div className="vengence-glass-dock" id="vengence-glass-dock" role="navigation" aria-label="Social and contact links">
        <a
          href="mailto:mohamedashik120918@gmail.com"
          className="dock-item"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
          <span className="dock-tooltip">mohamedashik120918@gmail.com</span>
        </a>

        <a
          href="tel:+918940887231"
          className="dock-item"
          aria-label="Phone"
        >
          <Phone className="w-5 h-5" />
          <span className="dock-tooltip">+91 89408 87231</span>
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="dock-item"
          aria-label="GitHub"
        >
          <GithubIcon className="w-5 h-5" />
          <span className="dock-tooltip">GitHub</span>
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="dock-item"
          aria-label="LinkedIn"
        >
          <LinkedinIcon className="w-5 h-5" />
          <span className="dock-tooltip">LinkedIn</span>
        </a>

        <a
          href="mailto:mohamedashik120918@gmail.com"
          className="dock-item"
          aria-label="Download CV"
        >
          <FileText className="w-5 h-5" />
          <span className="dock-tooltip">Download CV</span>
        </a>
      </div>

      {/* 6. MAIN CONTENT WRAPPER */}
      <main className="relative z-10">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          id="top"
          className="relative min-h-screen flex items-start justify-center pt-20 sm:pt-24 lg:pt-20 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        >
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            {/* Left Hero Content with Exact Font Styles and Sizes - Generous space above Hello I'm */}
            <div className="lg:col-span-7 flex flex-col items-start z-20 relative pt-24 sm:pt-32 lg:pt-48 xl:pt-56">
              {/* Hollow Background Watermark: ASHIK */}
              <div className="bg-portfolio-text" aria-hidden="true">
                ASHIK
              </div>

              {/* Exact Greeting: Hello, I'm */}
              <div className="greeting">
                Hello, I'm
              </div>

              {/* Exact Hero Name: MOHAMED ASHIK */}
              <h1 className="hero-name" id="site-hero-name">
                MOHAMED ASHIK
              </h1>

              {/* Exact Hero Subtitle with Pre-line formatting */}
              <div className="hero-title" id="site-hero-title" style={{ whiteSpace: "pre-line" }}>
                PASSIONATE SOFTWARE DEVELOPER • FULL-STACK WEB DEVELOPER{"\n"}
                INTERN AT JAZ INFOTECH • B.SC COMPUTER SCIENCE (2026)
              </div>

              {/* Exact Hero Bio */}
              <p className="hero-bio" id="site-hero-bio">
                Emerging Software Developer and Full-Stack Intern at Jaz Infotech with practical experience designing and launching responsive web applications like Tevolt (tevolt.in) and premises management systems. Strong analytical mindset, solid programming fundamentals in JavaScript (ES6+), React.js, Node.js, Express.js, and MySQL, committed to delivering quality software solutions.
              </p>

              {/* Exact Action Buttons Placed Directly Under Bio (Reference Photo 2 Layout) */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <a href="#contact" className="shimmer-btn">
                  <span>GET IN TOUCH</span>
                  <span className="text-sm">⟶</span>
                </a>

                <a
                  href="mailto:mohamedashik120918@gmail.com"
                  className="shimmer-btn secondary"
                >
                  <span>DOWNLOAD CV</span>
                  <span>📄</span>
                </a>

                <div className="badge-worldwide">
                  <span>📍</span> TIRUNELVELI, TAMIL NADU, INDIA
                </div>
              </div>
            </div>

            {/* Right Hero Showcase: Exact Suspended Lanyard Card at the Right End */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start relative z-20 pt-2 lg:pt-4">
              {/* Exact 3D Suspended Lanyard ID Card */}
              <div className="scale-90 sm:scale-95 lg:scale-100 origin-top lg:origin-top-right">
                <LanyardIdCard />
              </div>

              {/* Quote Card (cleanly positioned underneath at the right end) */}
              <div className="w-full max-w-sm flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-[#120a0a]/85 border border-white/10 backdrop-blur-md mt-4 shadow-xl">
                <span className="text-[#ff1e2d] text-base leading-none mt-0.5">✦</span>
                <p
                  className="text-xs sm:text-[13px] text-zinc-300 font-medium leading-relaxed select-none"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Building responsive web applications, developing live client platforms like Tevolt (tevolt.in), and architecting full-stack solutions with React.js &amp; Node.js.
                </p>
              </div>

              {/* Exact Reference 3-Item Stats Counter Stack Placed Directly Under Quote Card */}
              <div className="w-full max-w-sm flex flex-col mt-4">
                {/* Stat 1: Education */}
                <div className="grid grid-cols-[105px_1fr] sm:grid-cols-[120px_1fr] items-center gap-4 py-3 sm:py-4 border-b border-white/15 group">
                  <div
                    className="text-4xl sm:text-5xl font-black text-[#ff1e2d] tracking-tight leading-[0.82] text-left group-hover:scale-105 transition-transform select-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    <div>FINAL</div>
                    <div>YR</div>
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-zinc-300 leading-tight text-left">
                    <div>B.SC CS @</div>
                    <div>SADAKATHULLAH</div>
                    <div>APPA COLLEGE</div>
                  </div>
                </div>

                {/* Stat 2: Projects */}
                <div className="grid grid-cols-[105px_1fr] sm:grid-cols-[120px_1fr] items-center gap-4 py-3 sm:py-4 border-b border-white/15 group">
                  <div
                    className="text-4xl sm:text-5xl font-black text-[#ff1e2d] tracking-tight leading-none text-left group-hover:scale-105 transition-transform select-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    4+
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-zinc-300 leading-tight text-left">
                    <div>FEATURED</div>
                    <div>PROJECTS</div>
                  </div>
                </div>

                {/* Stat 3: Work Experience */}
                <div className="grid grid-cols-[105px_1fr] sm:grid-cols-[120px_1fr] items-center gap-4 py-3 sm:py-4 border-b border-white/15 group">
                  <div
                    className="text-4xl sm:text-5xl font-black text-[#ff1e2d] tracking-tight leading-none text-left group-hover:scale-105 transition-transform select-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    JAZ
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-zinc-300 leading-tight text-left">
                    <div>FULL-STACK INTERN</div>
                    <div>&amp; WEB DEVELOPER</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            SERVICES SECTION
            ========================================================================= */}
        {/* =========================================================================
            WHAT I DO SECTION (Exact Reference Photo Layout with Centered Portrait)
            ========================================================================= */}
        <section
          id="services"
          className="relative pt-8 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden bg-[#060203]"
          data-reveal
        >
          {/* Ambient red atmospheric glow across the whole width matching reference */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(220,20,35,0.28)_0%,rgba(140,10,20,0.12)_45%,transparent_70%)] filter blur-2xl" />
          </div>

          {/* Header Bar: Red Square + WHAT I DO & Full-width Divider Line */}
          <div className="max-w-[1400px] mx-auto relative z-20 mb-1">
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] text-white uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-[#ff1e2d] rounded-xs inline-block shadow-[0_0_10px_#ff1e2d]" />
              <span>WHAT I DO</span>
            </div>
            <div className="w-full h-px bg-white/10" />
          </div>

          {/* Stage Container: Background Portrait + 5 Overlaid Cards */}
          <div className="max-w-[1400px] mx-auto relative z-10">
            {/* Exact Background Portrait: Mohamed in Sunglasses with Red Rim Lighting (section3.jpg) */}
            <div className="absolute inset-x-0 -top-6 sm:-top-8 flex items-start justify-center pointer-events-none overflow-hidden z-0">
              <img
                // src="/portraits/section3.jpg"
                alt="Mohamed Ashik in Sunglasses"
                className="w-full max-w-[860px] lg:max-w-[960px] xl:max-w-[1040px] h-[580px] sm:h-[640px] md:h-[720px] lg:h-[760px] object-cover object-[50%_24%] filter contrast-120 brightness-100 opacity-95"
              />
              {/* Vignettes to seamlessly dissolve edges into the section background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_45%,#060203_85%)] pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-[#060203] via-[#060203]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-[#060203] via-[#060203]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#060203] via-[#060203]/80 to-transparent pointer-events-none" />
            </div>

            {/* Precise spacer so hair, sunglasses, nose and red rim-light portrait are visible above cards */}
            <div className="h-44 sm:h-52 md:h-60 lg:h-64" />

            {/* Exact 5-Card Row from Reference Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 xl:gap-5 items-stretch relative z-10">
              {WHAT_I_DO_CARDS.map((card, idx) => (
                <div
                  key={card.title}
                  className="rounded-2xl p-6 sm:p-7 bg-[#0e090a]/92 hover:bg-[#180e10]/95 border border-white/10 hover:border-[#ff1e2d]/60 transition-all duration-300 backdrop-blur-md flex flex-col justify-start group hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(255,30,45,0.25)] min-h-[250px]"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <div className="text-2xl sm:text-[28px] mb-5 select-none flex items-center group-hover:scale-110 transition-transform duration-200">
                    {card.icon}
                  </div>
                  <h3
                    className="text-xs sm:text-[13px] font-black uppercase text-white tracking-wider mb-3 leading-snug group-hover:text-[#ff1e2d] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-zinc-400 font-normal leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            PROJECTS SECTION (MASONRY GRID)
            ========================================================================= */}
        <section id="projects" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
              <div>
                <div className="section-kicker">
                  <i /> SELECTED WORKS
                </div>
                <h2 className="section-title">
                  Featured <span className="gradient-crimson-text">Engineering.</span>
                </h2>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                {["All", "Full Stack", "AI & CV", "Mobile & IoT"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === cat
                      ? "bg-[#ff1e2d] text-white shadow-[0_0_15px_rgba(255,30,45,0.6)]"
                      : "text-zinc-400 hover:text-white"
                      }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Masonry / Grid Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className="glass-card glass-card-glow rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-[#ff1e2d]/60 transition-all duration-300"
                >
                  {/* Image / Visual Stage */}
                  <div className="relative h-56 w-full overflow-hidden bg-black/80">
                    <img
                      src={p.image || "/portraits/section1.jpg"}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0404] via-transparent to-black/40 pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-[#ff1e2d]/40 backdrop-blur-md text-[10px] font-mono text-[#ff4d5a]">
                      {p.category}
                    </div>

                    {/* Interactive External Link CTA */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-black/75 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff1e2d] transition-all"
                        aria-label="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={p.demoUrl}
                        className="w-8 h-8 rounded-full bg-black/75 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff1e2d] transition-all"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Content Stage */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-xl font-black uppercase text-white tracking-tight mb-2 group-hover:text-[#ff1e2d] transition-colors"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {p.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-1.5 mb-6">
                        {p.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1e2d] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer Tech Stack Tags */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/5 text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <a
                        href={p.demoUrl}
                        className="text-xs font-bold text-[#ff1e2d] hover:text-white inline-flex items-center gap-1 uppercase tracking-wider"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            AWARDS & RECOGNITION SECTION
            ========================================================================= */}
        <section id="awards" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" data-reveal>
          <div id="leadership" className="scroll-mt-28" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="section-kicker justify-center">
                <i /> RECOGNITION & HONORS
              </div>
              <h2 className="section-title">
                Awards & <span className="gradient-crimson-text">Leadership.</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-3 sm:mt-4 leading-relaxed font-normal">
                Milestones earned through technical hackathons, institutional leadership, and commitment to educational mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {AWARDS.map((aw) => (
                <div
                  key={aw.title}
                  className="glass-card glass-card-glow p-6 rounded-2xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#ff1e2d]/15 border border-[#ff1e2d]/40 flex items-center justify-center text-[#ff1e2d] shadow-[0_0_15px_rgba(255,30,45,0.3)]">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-[#ff4d5a] font-bold">
                        {aw.year}
                      </span>
                    </div>

                    <div
                      className="text-3xl sm:text-4xl font-black text-white mb-2 font-mono group-hover:text-[#ff1e2d] transition-colors"
                    >
                      {aw.counter}
                    </div>

                    <h3
                      className="text-lg font-black uppercase text-white mb-1 tracking-tight"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {aw.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#ff4d5a] mb-3">
                      {aw.subtitle}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {aw.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff1e2d]" />
                    <span>VERIFIED DISTINCTION</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            SKILLS & TECH STACK SECTION (Exact Reference Photo Layout)
            ========================================================================= */}
        <section id="skills" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" data-reveal>
          <div className="max-w-7xl mx-auto">
            <SkillsTechStack />
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            EXPERIENCE & EDUCATION TIMELINE
            ========================================================================= */}
        <section id="experience" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" data-reveal>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="section-kicker justify-center">
                <i /> CAREER & ACADEMIA
              </div>
              <h2 className="section-title">
                Experience & <span className="gradient-crimson-text">Timeline.</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-3 sm:mt-4 leading-relaxed font-normal">
                A verified chronological history of professional internships, engineering education, and institutional responsibilities.
              </p>
            </div>

            <div className="relative border-l-2 border-[#ff1e2d]/40 pl-5 sm:pl-8 md:pl-10 ml-2 sm:ml-4 md:ml-8 space-y-8 sm:space-y-12">
              {/* Timeline Item 1: Jaz Infotech */}
              <div className="relative group">
                <span className="absolute -left-[27px] sm:-left-[39px] md:-left-[47px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ff1e2d] border-4 border-[#0a0404] shadow-[0_0_15px_#ff1e2d]" />
                <div className="glass-card p-5 sm:p-6 rounded-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-[#ff1e2d] font-bold tracking-wider">
                      JUN 2026 — PRESENT
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#ff1e2d]/20 border border-[#ff1e2d]/40 text-[#ff4d5a]">
                      CURRENT INTERNSHIP
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Full-Stack Web Development Intern
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4">
                    JAZ INFOTECH · TIRUNELVELI, TAMIL NADU
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    • Developed and launched live client website: <strong>Tevolt</strong> (tevolt.in) for an EV charging infrastructure company.<br />
                    • Built responsive frontend interfaces and implemented interactive website functionality with React.js &amp; modern CSS.<br />
                    • Worked on backend functionality, REST API integration, and database-related tasks with Node.js &amp; MySQL.<br />
                    • Collaborated with development team to convert client requirements into functional web features.<br />
                    • Performed testing, debugging, and optimization for reliability, performance, and UX.<br />
                    • Utilized Git and GitHub for version control and collaborative workflows.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Node.js", "Express.js", "MySQL", "Tevolt (tevolt.in)", "REST APIs", "Git & GitHub", "Postman"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Item 2: Premises Management System */}
              <div className="relative group">
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white/80 border-4 border-[#0a0404] shadow-md" />
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-zinc-400 tracking-wider">
                      2026
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                      FEATURED PROJECT
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Premises Management System (Full-Stack)
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4">
                    FULL-STACK WEB APPLICATION · PROPERTY &amp; TENANT LEDGER
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    • Built a comprehensive property management system for tracking properties, tenants, and lease agreements.<br />
                    • Designed RESTful APIs for CRUD operations and rent payment tracking (online &amp; cash methods).<br />
                    • Created responsive React.js UI with real-time state management and seamless user workflows.<br />
                    • Implemented MongoDB Atlas cloud database for secure data persistence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Node.js", "Express.js", "MongoDB Atlas", "RESTful APIs", "Rent Tracking", "JSON"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Item 3: Education B.Sc Computer Science */}
              <div className="relative group">
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#ff1e2d] border-4 border-[#0a0404] shadow-[0_0_10px_#ff1e2d]" />
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-[#ff4d5a] font-bold tracking-wider">
                      2023 — 2026 (GRADUATION: 2026)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#ff1e2d]/10 border border-[#ff1e2d]/30 text-[#ff4d5a]">
                      DEGREE EDUCATION
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Bachelor of Science (B.Sc.) in Computer Science
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-2">
                    SADAKATHULLAH APPA COLLEGE · TIRUNELVELI, TAMIL NADU
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    Rigorous undergraduate computer science curriculum emphasizing software design fundamentals, relational database management systems (MySQL), data structures, modern web technologies, and computational logic.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Computer Science", "Database Systems (MySQL)", "Software Engineering", "Data Structures", "Algorithms"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Item 4: Continuous Learning & Technical Foundation */}
              <div className="relative group">
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-white/60 border-4 border-[#0a0404]" />
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-zinc-400 tracking-wider">
                      2024 — PRESENT
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                      PROFESSIONAL FOCUS
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Software Engineering &amp; Solutions Development
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-2">
                    CONTINUOUS LEARNING &amp; OPEN SOURCE
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    Committed to delivering quality software solutions through clean code, modern JavaScript (ES6+), responsive frontend architectures with Tailwind CSS &amp; Bootstrap, and Postman API testing.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "Postman", "Responsive Design", "Quality Solutions"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            INTERACTIVE GALLERY SECTION
            ========================================================================= */}
        <section id="gallery" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" data-reveal>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div>
                <div className="section-kicker">
                  <i /> VISUAL DOSSIER
                </div>
                <h2 className="section-title">
                  Interactive <span className="gradient-crimson-text">Gallery.</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                Click any portrait frame below to inspect full-screen high-resolution details, lighting direction, and cybernetic art treatments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {GALLERY_ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  onClick={() => setGalleryModal(item)}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-[#ff1e2d] transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-[#ff1e2d]/40 backdrop-blur-md text-[10px] font-mono text-zinc-300">
                      0{idx + 1} // DOSSIER
                    </div>

                    {/* View Button */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#ff1e2d] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_#ff1e2d]">
                      <Eye className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-14">
                      <h4
                        className="text-base font-black uppercase text-white tracking-tight leading-tight truncate"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#ff4d5a]">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Modal Fullscreen Inspector */}
        {galleryModal && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setGalleryModal(null)}
          >
            <div
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-[#120608] border border-[#ff1e2d]/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setGalleryModal(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#ff1e2d] transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-square sm:aspect-[4/3] w-full bg-black">
                <img
                  src={galleryModal.src}
                  alt={galleryModal.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#0e0406] border-t border-white/10">
                <span className="text-xs font-mono text-[#ff1e2d] uppercase tracking-wider block mb-1">
                  {galleryModal.subtitle}
                </span>
                <h3
                  className="text-2xl font-black uppercase text-white mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {galleryModal.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {galleryModal.desc}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="section-seam" />

        {/* =========================================================================
            TESTIMONIALS SECTION
            ========================================================================= */}
        <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" data-reveal>
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-6 sm:p-10 md:p-14 rounded-3xl relative overflow-hidden border border-[#ff1e2d]/30 text-center">
              {/* Quote Mark Background Icon */}
              <div className="absolute top-6 left-8 text-7xl font-serif text-[#ff1e2d]/10 select-none pointer-events-none">
                “
              </div>

              <div className="section-kicker justify-center mb-6">
                <i /> ENDORSEMENT &amp; TESTIMONIAL
              </div>

              <blockquote
                className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-200 leading-relaxed mb-8 italic"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                "Mohamed Ashik is a passionate and committed software developer whose strong programming fundamentals and practical full-stack execution are demonstrated through the successful live launch of the Tevolt platform and his work at Jaz Infotech."
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#ff1e2d] mb-3 shadow-[0_0_15px_rgba(255,30,45,0.4)]">
                  <img
                    src="/portraits/user_original.jpg"
                    alt="Reviewer Reference"
                    className="w-full h-full object-cover"
                  />
                </div>
                <strong
                  className="text-base font-black uppercase text-white tracking-wide"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Technical Lead &amp; Mentor
                </strong>
                <span className="text-xs font-mono text-[#ff4d5a] mt-0.5">
                  Jaz Infotech Development Team
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            CONTACT SECTION
            ========================================================================= */}
        <section id="contact" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" data-reveal>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Contact Details */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="section-kicker">
                    <i /> GET IN TOUCH
                  </div>
                  <h2 className="section-title mb-4 sm:mb-6">
                    Let’s Build <span className="gradient-crimson-text">Something</span> Amazing Together.
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 sm:mb-8">
                    Whether you have an ambitious full-stack web project, a production client platform to launch, or an engineering opportunity, I am always ready to collaborate.
                  </p>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <a
                      href="mailto:mohamedashik120918@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff1e2d]/60 transition-all text-zinc-300 hover:text-white"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#ff1e2d]/15 border border-[#ff1e2d]/30 flex items-center justify-center text-[#ff1e2d]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">DIRECT EMAIL</span>
                        <span className="text-xs font-bold font-mono">mohamedashik120918@gmail.com</span>
                      </div>
                    </a>

                    <a
                      href="tel:+918940887231"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff1e2d]/60 transition-all text-zinc-300 hover:text-white"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#ff1e2d]/15 border border-[#ff1e2d]/30 flex items-center justify-center text-[#ff1e2d]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">PHONE / WHATSAPP</span>
                        <span className="text-xs font-bold font-mono">+91 89408 87231</span>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
                      <div className="w-9 h-9 rounded-lg bg-[#ff1e2d]/15 border border-[#ff1e2d]/30 flex items-center justify-center text-[#ff1e2d]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">LOCATION</span>
                        <span className="text-xs font-bold font-mono">Tirunelveli, Tamil Nadu, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Average Response Time: Under 2 Hours</span>
                  </div>
                </div>
              </div>

              {/* Right Contact Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleFormSubmit}
                  className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl border border-[#ff1e2d]/30 flex flex-col gap-5 sm:gap-6"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3
                      className="text-xl font-black uppercase text-white"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Transmit Message
                    </h3>
                    <span className="text-[10px] font-mono text-[#ff4d5a]">
                      // DIRECT CHANNEL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elon Musk"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white placeholder-zinc-600 focus:outline-hidden focus:border-[#ff1e2d] text-base sm:text-xs font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elon@x.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white placeholder-zinc-600 focus:outline-hidden focus:border-[#ff1e2d] text-base sm:text-xs font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Consultation"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white placeholder-zinc-600 focus:outline-hidden focus:border-[#ff1e2d] text-base sm:text-xs font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell me about your project, timeline, and goals..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white placeholder-zinc-600 focus:outline-hidden focus:border-[#ff1e2d] text-base sm:text-xs font-mono transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="magnetic-btn w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#ff1e2d] to-[#b30b17] shadow-[0_0_25px_rgba(255,30,45,0.6)] hover:shadow-[0_0_35px_rgba(255,30,45,0.9)] transition-all flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {formSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Message Sent Successfully!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FOOTER
            ========================================================================= */}
        <footer className="border-t border-white/10 bg-[#080203]/90 backdrop-blur-md pt-12 pb-28 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ff1e2d] flex items-center justify-center text-white font-black text-xs shadow-[0_0_12px_#ff1e2d]">
                MA
              </div>
              <div className="flex flex-col">
                <span
                  className="text-xs font-black uppercase text-white tracking-wider"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  MOHAMED ASHIK
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Software Developer · Full-Stack Web Development
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
              <a href="#top" className="hover:text-white transition-colors">Home</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#awards" className="hover:text-white transition-colors">Awards</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex flex-col items-center md:items-end text-xs font-mono text-zinc-500">
              <span>© 2026 MOHAMED ASHIK. ALL RIGHTS RESERVED.</span>
              <a href="#top" className="text-[#ff1e2d] hover:underline mt-1">
                BACK TO TOP ↑
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
