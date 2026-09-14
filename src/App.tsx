import React, { useState, useEffect, useRef } from "react";
import CinematicScrollCanvas from "@/components/ui/cinematic-scroll-canvas";
import LanyardIdCard from "@/components/ui/lanyard-id-card";
import GlassNav from "@/components/ui/glass-nav";
import CustomCursor from "@/components/ui/custom-cursor";
import ScrollProgressBar from "@/components/ui/scroll-progress";
import ThreeSkillCore from "@/components/ui/three-skill-core";
import SkillsTechStack from "@/components/ui/skills-tech-stack";
import SpidermanScrollTop from "@/components/ui/spiderman-scroll-top";
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
  ChevronLeft,
  ChevronRight,
  Bot,
  Globe,
  Radio,
  FileText,
  MapPin,
  Calendar,
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
  imageClassName?: string;
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
    image: "/projects/pms.png",
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
    id: "nila-tiles-studio",
    title: "Nila Tiles — Ceramic & Decor Studio",
    category: "Full Stack",
    description: "Modern architectural tile showcase and digital catalog platform engineered for Chennai homeowners and contractors, featuring interactive project previews and real-time quote telemetry.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Interactive 3D", "REST APIs"],
    image: "/projects/nila-tiles.png",
    imageClassName: "object-top",
    demoUrl: "#contact",
    githubUrl: "https://github.com",
    highlights: [
      "Interactive 3D project showcase with touch swipe & room finish previews",
      "Integrated instant WhatsApp consultation & dynamic quote request pipeline",
      "High-performance responsive catalog with Chennai showroom availability tracking"
    ],
    featured: true,
  },
  {
    id: "crm-pro-platform",
    title: "CRM Pro — Enterprise Sales & Analytics",
    category: "Full Stack",
    description: "Enterprise-grade Customer Relationship Management (CRM) platform featuring real-time revenue telemetry, visual Kanban deal pipelines, lead conversion tracking, and multi-tenant analytics.",
    tags: ["React.js", "React Router", "Recharts", "Tailwind CSS", "REST APIs"],
    image: "/projects/crm-dashboard.jpg",
    imageClassName: "object-top",
    demoUrl: "#contact",
    githubUrl: "https://github.com",
    highlights: [
      "Interactive analytics dashboard with Recharts revenue telemetry & lead metrics",
      "Visual Kanban sales pipeline for drag-and-drop deal stage management",
      "Comprehensive contact & activity drawer with automated notification workflows"
    ],
    featured: true,
  },
];

// Exact WHAT I DO Cards (Tailored Directly to Mohamed Ashik's Resume)
const WHAT_I_DO_CARDS = [
  {
    icon: "🌐",
    title: "FRONTEND WEB DEV",
    desc: "Building responsive, interactive web interfaces using React.js, Tailwind CSS, Bootstrap & modern HTML5/CSS3.",
  },
  {
    icon: "⚡",
    title: "BACKEND & REST APIS",
    desc: "Engineering server-side architectures, RESTful API endpoints, and structured JSON data interchange with Node.js & Express.js.",
  },
  {
    icon: "🗄️",
    title: "DATABASE MANAGEMENT",
    desc: "Modeling relational database schemas with MySQL and integrating cloud storage solutions with MongoDB Atlas.",
  },
  {
    icon: "🚀",
    title: "CLIENT WEB PRODUCTION",
    desc: "Developing and launching live client platforms like Tevolt (tevolt.in), converting business requirements into robust web features.",
  },
  {
    icon: "🛠️",
    title: "TESTING & OPTIMIZATION",
    desc: "API endpoint validation via Postman, testing & debugging, performance optimization, and Git/GitHub version control.",
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

// Interactive Spider-Web Timeline Anchor Component
function SpiderWebAnchor({ isCurrent = false }: { isCurrent?: boolean }) {
  return (
    <div className="absolute -left-7 sm:-left-10 md:-left-14 top-1.5 w-7 sm:w-10 md:w-14 h-24 pointer-events-none z-20 overflow-visible">
      <svg
        viewBox="0 0 56 80"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Radial Web Silk Tension Strands (Holding and clamping onto the card) */}
        <path
          d="M 0 16 Q 22 8, 56 4"
          className="stroke-[#ff1e2d]/60 group-hover:stroke-[#ff1e2d] transition-colors duration-300"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 16 Q 26 14, 56 16"
          className="stroke-white/80 group-hover:stroke-white transition-colors duration-300"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 16 Q 28 26, 56 38"
          className="stroke-[#ff1e2d]/60 group-hover:stroke-[#ff1e2d] transition-colors duration-300"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 16 Q 24 44, 56 66"
          className="stroke-[#ff1e2d]/40 group-hover:stroke-[#ff1e2d]/80 transition-colors duration-300"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Concentric Spider-Web Arcs (Authentic web lattice weave) */}
        <path
          d="M 14 13 Q 18 19, 14 24"
          className="stroke-[#ff4d5a]/50 group-hover:stroke-[#ff1e2d] transition-colors duration-300"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 28 10 Q 38 21, 30 35"
          className="stroke-white/50 group-hover:stroke-white/90 transition-colors duration-300"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 42 7 Q 54 23, 44 52"
          className="stroke-[#ff4d5a]/60 group-hover:stroke-[#ff1e2d] transition-colors duration-300"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Silk Corner Anchor Clamp wrapping onto the Card Corner */}
        <path
          d="M 52 10 L 58 16 L 52 22"
          className="stroke-[#ff1e2d] group-hover:stroke-white transition-colors duration-300"
          strokeWidth="1.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* Central Web Silk Knot / Spinneret Hub on Main Line */}
        <circle
          cx="0"
          cy="16"
          r="10"
          className="fill-[#ff1e2d]/25 group-hover:fill-[#ff1e2d]/50 transition-all duration-300 animate-pulse"
        />
        <circle
          cx="0"
          cy="16"
          r="4.5"
          className={isCurrent ? "fill-[#ff1e2d] stroke-white" : "fill-[#ff1e2d]/90 stroke-[#0a0404]"}
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 8px #ff1e2d)" }}
        />
        <circle cx="-1" cy="15" r="1.5" fill="#ffffff" />

        {/* Hanging Spider on Silk Thread (For current internship / active item) */}
        {isCurrent && (
          <g className="animate-spider-sway origin-[0px_16px]">
            {/* Hanging vertical silk line */}
            <line
              x1="0"
              y1="16"
              x2="0"
              y2="42"
              stroke="#ffffff"
              strokeWidth="0.9"
              strokeDasharray="2 1"
              opacity="0.85"
            />
            {/* Minimalist Spider Motif */}
            <g transform="translate(0, 44)">
              <ellipse cx="0" cy="0" rx="3.5" ry="4.5" fill="#ff1e2d" style={{ filter: "drop-shadow(0 0 6px #ff1e2d)" }} />
              <circle cx="0" cy="-3.5" r="2" fill="#ffffff" />
              <circle cx="-0.8" cy="-4" r="0.5" fill="#000000" />
              <circle cx="0.8" cy="-4" r="0.5" fill="#000000" />
              {/* Spider Legs */}
              <path d="M -2 -2 Q -6 -5 -7 -1" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
              <path d="M -3 0 Q -8 0 -8 4" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
              <path d="M -2 2 Q -7 4 -6 8" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
              <path d="M -1 3 Q -5 7 -4 10" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
              <path d="M 2 -2 Q 6 -5 7 -1" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
              <path d="M 3 0 Q 8 0 8 4" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
              <path d="M 2 2 Q 7 4 6 8" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
              <path d="M 1 3 Q 5 7 4 10" stroke="#ff1e2d" strokeWidth="0.8" fill="none" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

function SpiderWebCardWatermark() {
  return (
    <div className="absolute -top-3 -left-3 w-16 h-16 pointer-events-none opacity-20 group-hover:opacity-45 transition-opacity duration-300 z-0">
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full stroke-[#ff1e2d]">
        <path d="M 0 0 L 52 0 M 0 0 L 0 52 M 0 0 L 38 38" strokeWidth="0.9" />
        <path d="M 14 0 Q 14 14 0 14" strokeWidth="0.8" />
        <path d="M 28 0 Q 28 28 0 28" strokeWidth="0.8" />
        <path d="M 42 0 Q 42 42 0 42" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export default function App() {
  const [introPhase, setIntroPhase] = useState<"show" | "exit" | "done">("show");
  const [introProgress, setIntroProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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

  // Horizontal Project Slider State & Handlers
  const projectSliderRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const checkProjectScroll = () => {
    const el = projectSliderRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 15);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 15);

    const card = el.querySelector(".project-slide-card") as HTMLElement | null;
    const cardW = card ? card.offsetWidth + 24 : 380;
    const idx = Math.round(el.scrollLeft / cardW);
    setActiveProjectIdx(Math.min(filteredProjects.length - 1, Math.max(0, idx)));
  };

  const scrollProjectSlider = (direction: "left" | "right") => {
    const el = projectSliderRef.current;
    if (!el) return;
    const card = el.querySelector(".project-slide-card") as HTMLElement | null;
    const cardW = card ? card.offsetWidth + 24 : 380;
    const delta = direction === "left" ? -cardW : cardW;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const scrollToProjectSlide = (index: number) => {
    const el = projectSliderRef.current;
    if (!el) return;
    const card = el.querySelector(".project-slide-card") as HTMLElement | null;
    const cardW = card ? card.offsetWidth + 24 : 380;
    el.scrollTo({ left: index * cardW, behavior: "smooth" });
  };

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
    <div className="relative min-h-screen text-white selection:bg-[#ff1e2d] selection:text-white overflow-x-clip">
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

          {/* Spider-Man Logo Badge */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center">
              {/* Outer Rotating Glowing Crimson Ring */}
              <div
                className="absolute -inset-2 rounded-full border border-dashed border-[#ff1e2d]/60 animate-spin pointer-events-none"
                style={{ animationDuration: "8s" }}
              />
              <div className="absolute -inset-1 rounded-full border border-[#ff1e2d]/30 animate-pulse pointer-events-none" />

              {/* Spider-Man Circular Badge */}
              <div className="relative w-full h-full rounded-full border-2 border-[#ff1e2d] shadow-[0_0_35px_rgba(255,30,45,0.8),inset_0_0_15px_rgba(255,30,45,0.4)] bg-[#0d0305] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/spiderman-badge.png"
                  alt="Spider-Man Badge"
                  className="w-full h-full object-cover rounded-full select-none pointer-events-none"
                  draggable={false}
                />
                {/* Subtle Glass Reflection */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/35 pointer-events-none" />
              </div>
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
          href="/assets/Mohamed_Resume.docx"
          download="Mohamed_Resume.docx"
          className="dock-item"
          aria-label="Download Resume"
        >
          <FileText className="w-5 h-5" />
          <span className="dock-tooltip">Download Resume</span>
        </a>
      </div>

      {/* 5c. Floating Spider-Man Scroll-To-Top Button with Cinematic Web Pull */}
      <SpidermanScrollTop />

      {/* 6. MAIN CONTENT WRAPPER */}
      <main className="relative z-10">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          id="top"
          className="relative min-h-screen flex items-start justify-center pt-20 sm:pt-24 lg:pt-20 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28"
        >
          <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
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
                  href="/assets/Mohamed_Resume.docx"
                  download="Mohamed_Resume.docx"
                  className="shimmer-btn secondary"
                >
                  <span>DOWNLOAD RESUME</span>
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
                  <div className="flex items-center justify-start group-hover:scale-105 transition-transform duration-300 origin-left">
                    <img
                      src="/assets/graduation-cap.png"
                      alt="Graduation Cap"
                      className="h-12 sm:h-14 w-auto max-w-[95px] object-contain filter drop-shadow-[0_4px_18px_rgba(255,30,45,0.5)] select-none pointer-events-none"
                      draggable={false}
                    />
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
          className="relative pt-8 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 scroll-mt-24"
          data-reveal
        >
          {/* Header Bar: Red Square + WHAT I DO & Full-width Divider Line */}
          <div className="w-full mx-auto relative z-20 mb-8 sm:mb-10">
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] text-white uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-[#ff1e2d] rounded-xs inline-block shadow-[0_0_10px_#ff1e2d]" />
              <span>WHAT I DO</span>
            </div>
            <div className="w-full h-px bg-white/10" />
          </div>

          {/* Stage Container: 5 Overlaid Cards */}
          <div className="w-full mx-auto relative z-10">

            {/* Exact 5-Card Row from Reference Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 xl:gap-5 items-stretch relative z-10">
              {WHAT_I_DO_CARDS.map((card, idx) => (
                <div
                  key={card.title}
                  className="rounded-2xl p-6 sm:p-7 bg-[#0e090a]/75 hover:bg-[#180e10]/85 border border-white/10 hover:border-[#ff1e2d]/60 transition-all duration-300 backdrop-blur-md flex flex-col justify-start group hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(255,30,45,0.25)] min-h-[250px]"
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
            PROJECTS SECTION (HORIZONTAL SLIDER)
            ========================================================================= */}
        <section id="projects" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 scroll-mt-24" data-reveal>
          <div className="w-full mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-6">
              <div>
                <div className="section-kicker">
                  <i /> SELECTED WORKS
                </div>
                <h2 className="section-title">
                  Featured <span className="gradient-crimson-text">Engineering.</span>
                </h2>
              </div>

              {/* Slider Controls & Counter */}
              <div className="flex items-center gap-4 self-end sm:self-auto">
                {/* Counter Badge */}
                <div className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 text-xs font-mono text-zinc-400 flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <span className="text-[#ff1e2d] font-bold">
                    0{activeProjectIdx + 1}
                  </span>
                  <span>/</span>
                  <span>0{filteredProjects.length}</span>
                </div>

                {/* Left / Right Slider Nav Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollProjectSlider("left")}
                    disabled={!canScrollPrev}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      canScrollPrev
                        ? "border-white/20 bg-black/70 text-white hover:bg-[#ff1e2d] hover:border-[#ff1e2d] shadow-[0_0_15px_rgba(255,30,45,0.3)] cursor-pointer active:scale-95"
                        : "border-white/5 bg-black/40 text-zinc-600 cursor-not-allowed opacity-40"
                    }`}
                    aria-label="Previous project slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollProjectSlider("right")}
                    disabled={!canScrollNext}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      canScrollNext
                        ? "border-white/20 bg-black/70 text-white hover:bg-[#ff1e2d] hover:border-[#ff1e2d] shadow-[0_0_15px_rgba(255,30,45,0.3)] cursor-pointer active:scale-95"
                        : "border-white/5 bg-black/40 text-zinc-600 cursor-not-allowed opacity-40"
                    }`}
                    aria-label="Next project slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Slide Container (Single Line) */}
            <div className="relative group/slider">
              {/* Left Subtle Edge Fade */}
              {canScrollPrev && (
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#0a0404] to-transparent z-10 transition-opacity" />
              )}
              {/* Right Subtle Edge Fade */}
              {canScrollNext && (
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#0a0404] to-transparent z-10 transition-opacity" />
              )}

              <div
                ref={projectSliderRef}
                onScroll={checkProjectScroll}
                className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="project-slide-card w-[310px] sm:w-[370px] md:w-[410px] shrink-0 snap-start glass-card glass-card-glow rounded-2xl overflow-hidden flex flex-col group border border-white/10 hover:border-[#ff1e2d]/60 transition-all duration-300"
                  >
                    {/* Image / Visual Stage */}
                    <div className="relative h-56 w-full overflow-hidden bg-black/80">
                      <img
                        src={p.image || "/portraits/section1.jpg"}
                        alt={p.title}
                        className={`w-full h-full object-cover ${p.imageClassName || "object-center"} group-hover:scale-105 transition-transform duration-500 filter contrast-105`}
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

            {/* Interactive Slide Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToProjectSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeProjectIdx === i
                      ? "w-8 bg-[#ff1e2d] shadow-[0_0_12px_#ff1e2d]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            AWARDS & RECOGNITION SECTION
            ========================================================================= */}
        <section id="awards" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 scroll-mt-24" data-reveal>
          <div className="w-full mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="section-kicker justify-center">
                <i /> HONORS &amp; AWARDS
              </div>
              <h2 className="section-title">
                Recognition &amp; <span className="gradient-crimson-text">Achievements.</span>
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
        <section id="skills" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 scroll-mt-24" data-reveal>
          <div className="w-full mx-auto">
            <SkillsTechStack />
          </div>
        </section>

        <div className="section-seam" />

        {/* =========================================================================
            EXPERIENCE & EDUCATION TIMELINE
            ========================================================================= */}
        <section id="experience" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 scroll-mt-24" data-reveal>
          <div className="w-full max-w-[1800px] mx-auto">
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

            {/* Spider-Web Suspended Timeline Container */}
            <div className="relative pl-7 sm:pl-10 md:pl-14 ml-3 sm:ml-6 md:ml-10 space-y-8 sm:space-y-12">
              {/* Continuous Glowing Spider-Silk Main Filament */}
              <div className="absolute left-0 top-2 bottom-6 w-[2px] pointer-events-none -translate-x-1/2 z-10">
                {/* Ambient silk atmospheric glow */}
                <div className="absolute inset-y-0 -left-1 w-[4px] bg-[#ff1e2d]/35 blur-[2px] animate-pulse" />
                {/* Main silk thread */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#ff1e2d] via-white/80 to-[#ff1e2d]/70 shadow-[0_0_8px_#ff1e2d]" />
                {/* Animated traveling silk crawl light */}
                <div className="absolute w-full h-32 bg-gradient-to-b from-transparent via-white to-transparent animate-silk-crawl" />
              </div>

              {/* Timeline Item 1: Jaz Infotech */}
              <div className="relative group">
                <SpiderWebAnchor isCurrent={true} />
                <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group-hover:border-[#ff1e2d]/60 transition-all duration-300">
                  <SpiderWebCardWatermark />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 relative z-10">
                    <span className="text-xs font-mono text-[#ff1e2d] font-bold tracking-wider">
                      JUN 2026 — PRESENT
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#ff1e2d]/20 border border-[#ff1e2d]/40 text-[#ff4d5a]">
                      CURRENT INTERNSHIP
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1 relative z-10"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Full-Stack Web Development Intern
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4 relative z-10">
                    JAZ INFOTECH · TIRUNELVELI, TAMIL NADU
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4 relative z-10">
                    • Developed and launched live client website: <strong>Tevolt</strong> (tevolt.in) for an EV charging infrastructure company.<br />
                    • Built responsive frontend interfaces and implemented interactive website functionality with React.js &amp; modern CSS.<br />
                    • Worked on backend functionality, REST API integration, and database-related tasks with Node.js &amp; MySQL.<br />
                    • Collaborated with development team to convert client requirements into functional web features.<br />
                    • Performed testing, debugging, and optimization for reliability, performance, and UX.<br />
                    • Utilized Git and GitHub for version control and collaborative workflows.
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
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
                <SpiderWebAnchor isCurrent={false} />
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group-hover:border-[#ff1e2d]/60 transition-all duration-300">
                  <SpiderWebCardWatermark />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 relative z-10">
                    <span className="text-xs font-mono text-zinc-400 tracking-wider">
                      2026
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                      FEATURED PROJECT
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1 relative z-10"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Premises Management System (Full-Stack)
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4 relative z-10">
                    FULL-STACK WEB APPLICATION · PROPERTY &amp; TENANT LEDGER
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4 relative z-10">
                    • Built a comprehensive property management system for tracking properties, tenants, and lease agreements.<br />
                    • Designed RESTful APIs for CRUD operations and rent payment tracking (online &amp; cash methods).<br />
                    • Created responsive React.js UI with real-time state management and seamless user workflows.<br />
                    • Implemented MongoDB Atlas cloud database for secure data persistence.
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
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
                <SpiderWebAnchor isCurrent={false} />
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group-hover:border-[#ff1e2d]/60 transition-all duration-300">
                  <SpiderWebCardWatermark />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 relative z-10">
                    <span className="text-xs font-mono text-[#ff4d5a] font-bold tracking-wider">
                      2023 — 2026 (GRADUATION: 2026)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#ff1e2d]/10 border border-[#ff1e2d]/30 text-[#ff4d5a]">
                      DEGREE EDUCATION
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1 relative z-10"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Bachelor of Science (B.Sc.) in Computer Science
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-2 relative z-10">
                    SADAKATHULLAH APPA COLLEGE · TIRUNELVELI, TAMIL NADU
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4 relative z-10">
                    Rigorous undergraduate computer science curriculum emphasizing software design fundamentals, relational database management systems (MySQL), data structures, modern web technologies, and computational logic.
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
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
                <SpiderWebAnchor isCurrent={false} />
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group-hover:border-[#ff1e2d]/60 transition-all duration-300">
                  <SpiderWebCardWatermark />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 relative z-10">
                    <span className="text-xs font-mono text-zinc-400 tracking-wider">
                      2024 — PRESENT
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                      PROFESSIONAL FOCUS
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-white mb-1 relative z-10"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Software Engineering &amp; Solutions Development
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-2 relative z-10">
                    CONTINUOUS LEARNING &amp; OPEN SOURCE
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4 relative z-10">
                    Committed to delivering quality software solutions through clean code, modern JavaScript (ES6+), responsive frontend architectures with Tailwind CSS &amp; Bootstrap, and Postman API testing.
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
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
            TESTIMONIALS SECTION
            ========================================================================= */}
        <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 relative overflow-hidden" data-reveal>
          <div className="w-full max-w-[1600px] mx-auto">
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
        <section id="contact" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 relative scroll-mt-24" data-reveal>
          <div className="w-full mx-auto">
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
        <footer className="border-t border-white/10 bg-[#080203]/90 backdrop-blur-md pt-12 pb-28 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
          <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
              <a href="#awards" className="hover:text-white transition-colors">Recognition</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
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
