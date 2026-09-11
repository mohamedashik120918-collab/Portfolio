import React from "react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

// Exactly the 16 skills explicitly documented in Mohamed Ashik's Resume:
// Languages: JavaScript (ES6+)
// Frontend: HTML5, CSS3, React.js, Bootstrap, Tailwind CSS
// Backend: Node.js, Express.js, REST APIs, JSON
// Database: MySQL, MongoDB Atlas
// Tools: Git, GitHub, VS Code, Postman
const RESUME_TECH_STACK: TechItem[] = [
  // 1. Core Language & Frontend
  {
    name: "JAVASCRIPT",
    category: "Language",
    icon: (
      <svg className="w-8 h-8 rounded-lg" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#F7DF1E" />
        <path
          d="M18.5 12h3v11c0 2.5-1.5 3.5-3.8 3.5-2.2 0-3.4-1.1-3.7-2.5l2.6-1.5c.2.8.7 1.3 1.3 1.3.8 0 1.2-.4 1.2-1.4V12zm-8.8 6.5l2.6-1.5c.6 1 1.2 1.8 2.4 1.8 1 0 1.6-.4 1.6-1.1 0-.8-.6-1.1-2-1.7-2.1-.9-3.5-1.8-3.5-3.8 0-1.9 1.5-3.3 3.8-3.3 1.7 0 2.9.6 3.7 2.1l-2.4 1.5c-.4-.8-.9-1.1-1.5-1.1-.6 0-1 .4-1 .9 0 .6.4.9 1.7 1.4 2.3 1 3.8 1.9 3.8 4 0 2.3-1.8 3.5-4.2 3.5-2.4 0-3.8-1.2-4.6-2.7z"
          fill="#000000"
        />
      </svg>
    ),
  },
  {
    name: "REACT.JS",
    category: "Frontend",
    icon: (
      <svg className="w-8 h-8" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "HTML5",
    category: "Frontend",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M5.5 3.5L7.8 27.5L16 29.8L24.2 27.5L26.5 3.5H5.5Z" fill="#E34F26" />
        <path d="M16 5.5V27.8L22.5 25.9L24.4 5.5H16Z" fill="#EF652A" />
        <path
          d="M16 11.2H10.8L11.2 15H16V18.8L12.4 17.8L12.2 15H9.4L9.8 20.5L16 22.2V11.2ZM16 11.2H21.2L20.8 15H16V11.2ZM16 18.8V22.2L22.2 20.5L22.6 15H19.8L19.6 17.8L16 18.8Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "CSS3",
    category: "Frontend",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M5.5 3.5L7.8 27.5L16 29.8L24.2 27.5L26.5 3.5H5.5Z" fill="#1572B6" />
        <path d="M16 5.5V27.8L22.5 25.9L24.4 5.5H16Z" fill="#33A9DC" />
        <path
          d="M16 11.2H10.8L11.2 15H16V18.8L12.4 17.8L12.2 15H9.4L9.8 20.5L16 22.2V11.2ZM16 11.2H21.2L20.8 15H16V11.2ZM16 18.8V22.2L22.2 20.5L22.6 15H19.8L19.6 17.8L16 18.8Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },

  // 2. Styling & Modern UI
  {
    name: "TAILWIND",
    category: "Styling",
    icon: (
      <svg className="w-8 h-8 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: "BOOTSTRAP",
    category: "Styling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#7952B3" />
        <path
          d="M6.5 6.5h4.5c1.8 0 2.8.8 2.8 2 0 .9-.5 1.6-1.3 1.8 1.1.2 1.8 1 1.8 2.1 0 1.4-1.2 2.3-3 2.3H6.5V6.5zm2.3 3.3h2c.6 0 1-.3 1-.8 0-.6-.4-.8-1-.8h-2v1.6zm0 3.5h2.2c.7 0 1.1-.3 1.1-.9 0-.6-.4-.9-1.1-.9H8.8v1.8z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "NODE.JS",
    category: "Backend",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L27.5 9.5V22.5L16 29L4.5 22.5V9.5L16 3Z" fill="#539E43" />
        <path d="M16 6L24.5 11V21L16 26L7.5 21V11L16 6Z" fill="#222222" />
        <path d="M16 11L21 14V18L16 21L11 18V14L16 11Z" fill="#83CD29" />
      </svg>
    ),
  },
  {
    name: "EXPRESS",
    category: "Backend",
    icon: (
      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-black text-white text-base tracking-tighter select-none">
        <span className="text-zinc-200">ex</span>
      </div>
    ),
  },

  // 3. Backend, APIs & Architecture
  {
    name: "REST APIS",
    category: "Backend",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#00c7b7" fillOpacity="0.15" stroke="#00c7b7" strokeWidth="1.5" />
        <path
          d="M8 16h6m4 0h6M11 11l-3 5 3 5m10-10l3 5-3 5"
          stroke="#00c7b7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "JSON",
    category: "Core",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="13"
          fontWeight="bold"
          fontFamily="monospace"
        >
          &#123; &#125;
        </text>
      </svg>
    ),
  },
  {
    name: "MYSQL",
    category: "Database",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4zm0 2c3.87 0 7 1.34 7 3s-3.13 3-7 3-7-1.34-7-3 3.13-3 7-3zm7 12c0 1.66-3.13 3-7 3s-7-1.34-7-3v-2.15c1.88 1.32 4.3 2.15 7 2.15s5.12-.83 7-2.15V17zm0-4c0 1.66-3.13 3-7 3s-7-1.34-7-3v-2.15c1.88 1.32 4.3 2.15 7 2.15s5.12-.83 7-2.15V13z"
          fill="#00758F"
        />
      </svg>
    ),
  },
  {
    name: "MONGODB",
    category: "Database",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.001 2.2c-.3 0-.6.1-.7.4C10 5.4 6 10.7 6 15c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4.3-4-9.6-5.3-12.4-.1-.3-.4-.4-.7-.4z"
          fill="#47A248"
        />
        <path
          d="M12.001 22V2.2c-.1 0-.2.1-.3.2C10.4 5.2 6.8 10.5 6.8 15c0 3 2.1 5.5 5 5.9.1 0 .1.1.2.1v1z"
          fill="#499D4A"
        />
        <path
          d="M12.001 22v-1.1c2.9-.4 5-2.9 5-5.9 0-4.5-3.6-9.8-4.9-12.6-.1-.1-.2-.2-.3-.2v19.8z"
          fill="#3FA037"
        />
      </svg>
    ),
  },

  // 4. Tools & Developer Workflow
  {
    name: "GIT",
    category: "Tooling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#F05032" fillOpacity="0.18" stroke="#F05032" strokeWidth="1.5" />
        <path
          d="M21.5 14.5l-4-4a2 2 0 00-2.8 0l-1.5 1.5v3.4a2.5 2.5 0 00-1.5 2.3 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5v-3.7l2.8 2.8a2 2 0 002.8 0l1.2-1.2a2 2 0 000-2.8l-2-2.1z"
          fill="#F05032"
        />
      </svg>
    ),
  },
  {
    name: "GITHUB",
    category: "DevOps",
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    name: "VS CODE",
    category: "Tooling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M17.5 2.5L7.2 10.7 3.4 7.8c-.5-.4-1.2-.3-1.6.2-.3.4-.3.9-.1 1.3l4.3 4.7-4.3 4.7c-.4.4-.4 1.1 0 1.5.4.4 1.1.4 1.5 0l3.8-2.9 10.4 8.2c.6.5 1.5.3 1.8-.4.2-.3.3-.6.3-.9V3.8c0-.6-.4-1.2-1-1.3h-.3z"
          fill="#007ACC"
        />
      </svg>
    ),
  },
  {
    name: "POSTMAN",
    category: "Tooling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#FF6C37" />
        <path
          d="M19.8 11.2c-.4-.5-1-.9-1.7-1.1-.7-.2-1.5-.2-2.2 0-.7.2-1.3.6-1.7 1.1-.4.5-.7 1.2-.7 1.9s.3 1.4.7 1.9c.4.5 1 .9 1.7 1.1.7.2 1.5.2 2.2 0 .7-.2 1.3-.6 1.7-1.1.4-.5.7-1.2.7-1.9s-.3-1.4-.7-1.9zM16 22.8c-2.3 0-4.3-1.2-5.4-3.1.5-.8 1.4-1.4 2.4-1.8.9-.4 2-.6 3-.6s2.1.2 3 .6c1 .4 1.9 1 2.4 1.8-1.1 1.9-3.1 3.1-5.4 3.1z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
];

export default function SkillsTechStack() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* =====================================================================
            Left Card: App Icon Grid (Exactly the 16 skills from Resume)
            ===================================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 rounded-3xl bg-[#120a0a]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          {/* Section Kicker */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-widest text-zinc-200 uppercase font-mono mb-6 sm:mb-8">
            <span className="w-2.5 h-2.5 bg-[#ff1e2d] rounded-xs inline-block shadow-[0_0_10px_#ff1e2d]" />
            <span>SKILLS &amp; TECH STACK</span>
          </div>

          {/* Balanced 4-Column App Icons Grid (16 Verified Resume Skills) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
            {RESUME_TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#ff1e2d]/60 hover:shadow-[0_0_22px_rgba(255,30,45,0.28)] transition-all duration-300 group cursor-pointer aspect-square"
                title={`${tech.name} • ${tech.category}`}
              >
                <div className="w-9 h-9 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  {tech.icon}
                </div>
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-zinc-300 group-hover:text-white transition-colors truncate max-w-full text-center select-none"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            Right Card: Crimson Philosophy / Quote Box (Matching Reference Photo)
            ===================================================================== */}
        <div className="lg:col-span-5 xl:col-span-5 rounded-3xl bg-gradient-to-br from-[#3b080e]/95 via-[#1e0306]/90 to-[#0d0103]/95 border border-[#ff1e2d]/30 p-7 sm:p-9 md:p-10 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Crimson Glow */}
          <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#ff1e2d]/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Red Quotation Mark */}
            <div
              className="text-5xl sm:text-6xl font-serif text-[#ff1e2d] font-black leading-none mb-6 select-none opacity-90"
            >
              “
            </div>

            {/* Philosophy Statement tailored to Mohamed Ashik's resume */}
            <p
              className="text-base sm:text-lg lg:text-[19px] text-zinc-200 font-normal leading-relaxed select-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              To become a skilled software engineer developing innovative and impactful technology solutions in web engineering, full-stack systems, and modern digital architectures.
            </p>
          </div>

          {/* Bottom Divider & Author Signature */}
          <div className="border-t border-white/15 pt-6 mt-10 flex items-end justify-between gap-4">
            <div>
              <h4
                className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                MOHAMED ASHIK
              </h4>
              <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                CS STUDENT &amp; FULL-STACK DEVELOPER
              </p>
            </div>

            {/* 5 Crimson Diamond Stars */}
            <div className="flex items-center gap-1.5 text-[#ff1e2d] text-xs sm:text-sm select-none tracking-widest">
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
