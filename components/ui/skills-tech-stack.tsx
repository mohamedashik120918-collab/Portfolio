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
      <svg className="w-8 h-8 rounded-lg" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#F7DF1E" />
        <path
          d="M28 68c2 3.5 5.5 6 10 6 5.5 0 9-3 9-8.5V30h-9v35c0 2-1 3-3 3-1.8 0-3-1-3.8-2.5L28 68zm30 5.5c4 3 9 4.8 14.5 4.8 9.5 0 15.5-5 15.5-12.8 0-7.8-5-11.2-12.2-14.3-5.5-2.4-8.3-4.5-8.3-8.2 0-3.3 2.6-5.8 7-5.8 4 0 7 1.8 9 5l6.5-4.5c-3.2-5-8.2-7.8-15.5-7.8-9.2 0-15.5 5.5-15.5 13 0 7.5 4.8 11 11.8 14 5.8 2.5 8.7 4.8 8.7 8.5 0 3.8-3.2 6.3-7.8 6.3-5.2 0-9-2.8-11.2-6.8L58 73.5z"
          fill="#000000"
        />
      </svg>
    ),
  },
  {
    name: "REACT.JS",
    category: "Frontend",
    icon: (
      <svg className="w-8 h-8" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1.1" fill="none">
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
      <svg className="w-8 h-8" viewBox="0 0 512 512" fill="none">
        <path fill="#E44D26" d="M107.6 461l-33-370h362.8l-33 370.2L255.7 504z" />
        <path fill="#F16529" d="M256 472.4l120.9-33.5 27.5-308.2H256z" />
        <path fill="#EBEBEB" d="M256 208.2H181.7l-5.6-62.8H256V85.7H114.8l16.7 186.8H256zm0 148.6l-.6.2-53.6-14.5-3.4-38.4H138.8l6.8 76.5 110.4 30.6.6-.2z" />
        <path fill="#FFFFFF" d="M255.9 208.2v64.3h58.3l-5.5 61.5-52.8 14.5v62.4l110.3-30.6 15.5-172.1zm0-122.5v59.7h136.2l5.3-59.7z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    category: "Frontend",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 512 512" fill="none">
        <path fill="#1572B6" d="M107.6 461l-33-370h362.8l-33 370.2L255.7 504z" />
        <path fill="#33A9DC" d="M256 472.4l120.9-33.5 27.5-308.2H256z" />
        <path fill="#EBEBEB" d="M256 208.2H181.7l-5.6-62.8H256V85.7H114.8l16.7 186.8H256zm0 148.6l-.6.2-53.6-14.5-3.4-38.4H138.8l6.8 76.5 110.4 30.6.6-.2z" />
        <path fill="#FFFFFF" d="M256 85.7v59.7h76.5l-5.5 62.8H256v64.3h71l-6.8 76-64.2 17.3v62.5l118.8-32.9 26.6-297.2z" />
      </svg>
    ),
  },

  // 2. Styling & Modern UI
  {
    name: "TAILWIND",
    category: "Styling",
    icon: (
      <svg className="w-8 h-8 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "BOOTSTRAP",
    category: "Styling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="22" fill="#7952B3" />
        <path
          d="M33 24h21.4c7.6 0 13.3 2.1 17.2 6.2 3.8 4.1 5.7 9.8 5.7 17.1 0 5.2-1.2 9.5-3.6 13-2.4 3.5-6 6-10.8 7.4 5.8 1.4 10.1 4.2 12.9 8.3 2.8 4.1 4.2 9.4 4.2 15.8 0 8.4-2.3 15-6.8 19.8-4.5 4.8-11.2 7.2-20.2 7.2H33V24zm14.8 35.8h7.2c4.3 0 7.4-1 9.3-3.1 1.9-2.1 2.8-5.3 2.8-9.6 0-4.1-.9-7.1-2.8-9.1-1.9-2-5-3-9.3-3h-7.2v24.8zm0 40h8.6c4.9 0 8.5-1.1 10.7-3.4 2.2-2.3 3.3-5.8 3.3-10.6 0-4.6-1.1-8-3.3-10.3-2.2-2.3-5.8-3.5-10.7-3.5h-8.6v27.8z"
          transform="scale(0.8) translate(12, 10)"
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
        <path d="M16 2.5L28.1 9.5V23.5L16 30.5L3.9 23.5V9.5L16 2.5Z" fill="#5FA04E" />
        <path d="M16 5.8L25.3 11.2V21.8L16 27.2L6.7 21.8V11.2L16 5.8Z" fill="#222222" />
        <path d="M16 8.5L23.2 12.7V20.3L16 24.5L8.8 20.3V12.7L16 8.5Z" fill="#83CD29" />
      </svg>
    ),
  },
  {
    name: "EXPRESS",
    category: "Backend",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#18181B" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path
          d="M20 22c-5.5 0-10 4.5-10 10s4.5 10 10 10c4.2 0 7.8-2.6 9.3-6.3h-4.3c-1.1 1.7-3 2.8-5 2.8-3.4 0-6.1-2.6-6.4-5.9h16.2c.1-.5.2-1.1.2-1.6 0-5.5-4.5-10-10-10zm-6.4 8.2c.4-3.1 3-5.4 6.4-5.4s6 2.3 6.4 5.4H13.6zm22.8-8.2l5.6 9.2 5.6-9.2h4.8l-8 12.6 8.4 13.4h-4.8l-6-9.8-6 9.8h-4.8l8.4-13.4-8-12.6h4.8z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },

  // 3. Backend, APIs & Architecture
  {
    name: "REST APIS",
    category: "Backend",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#00C7B7" fillOpacity="0.15" stroke="#00C7B7" strokeWidth="2.5" />
        <path
          d="M18 32h28M38 22l10 10-10 10M26 42L16 32l10-10"
          stroke="#00C7B7"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="4.5" fill="#00C7B7" />
      </svg>
    ),
  },
  {
    name: "JSON",
    category: "Core",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2.5" />
        <path
          d="M22 17c-4 0-6 2-6 6v5c0 3-2 4-4 4 2 0 4 1 4 4v5c0 4 2 6 6 6M42 17c4 0 6 2 6 6v5c0 3 2 4 4 4-2 0-4 1-4 4v5c0 4-2 6-6 6"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="32" r="2.5" fill="#F59E0B" />
        <circle cx="36" cy="32" r="2.5" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    name: "MYSQL",
    category: "Database",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="24" fill="#00758F" fillOpacity="0.15" stroke="#00758F" strokeWidth="3.5" />
        <g transform="translate(14, 16) scale(0.78)">
          <path
            d="M87.5 43.8c-1.8-6.8-6.4-12.4-12.8-15.8-6.4-3.4-14-4-20.9-1.8-7 2.2-12.8 7.3-16.2 13.9-3.4 6.6-4 14.3-1.8 21.4 2.2 7 7.3 12.8 13.9 16.2 6.6 3.4 14.3 4 21.4 1.8 5.8-1.8 10.8-5.6 14.2-10.7l-7.8-4.8c-2.2 3.4-5.6 5.8-9.5 7-4.8 1.4-9.9 1-14.3-1.3-4.4-2.3-7.8-6.2-9.3-10.9-1.5-4.7-1.1-9.9 1.2-14.3 2.3-4.4 6.2-7.8 10.9-9.3 4.7-1.5 9.9-1.1 14.3 1.2 4.2 2.2 7.3 5.8 8.8 10.2l7.8-3.5z"
            fill="#00758F"
          />
          <path
            d="M74.2 21.5c-4.2-3.8-9.8-6-15.5-6-6.8 0-13.2 3.1-17.5 8.4-4.2 5.3-5.8 12.2-4.2 18.8 1.5 6.6 5.8 12.1 11.6 15.2l3.8-7.2c-3.8-2-6.6-5.6-7.6-9.9-1-4.3 0-8.8 2.8-12.2 2.8-3.4 6.9-5.4 11.3-5.4 3.7 0 7.3 1.4 10.1 3.9l5.2-5.6z"
            fill="#F29111"
          />
          <circle cx="85" cy="38" r="4.5" fill="#F29111" />
        </g>
      </svg>
    ),
  },
  {
    name: "MONGODB",
    category: "Database",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <path
          d="M32 3c-.8 0-1.6.4-2 1.2-3.8 8.5-14 22.8-14 34.8 0 9.4 7.2 17 16 17s16-7.6 16-17c0-12-10.2-26.3-14-34.8-.4-.8-1.2-1.2-2-1.2z"
          fill="#47A248"
        />
        <path
          d="M32 56V3c-.2 0-.5.2-.8.5-4 8.5-13.2 22.5-13.2 34.5 0 8.5 5.8 15.5 13.8 16.8.1 0 .1.1.2.2v1z"
          fill="#499D4A"
        />
        <path
          d="M32 56v-3c8-1.3 13.8-8.3 13.8-16.8 0-12-9.2-26-13.2-34.5-.3-.3-.6-.5-.8-.5v54.8z"
          fill="#3FA037"
        />
        <path
          d="M32 56c-.5 0-1-.2-1.3-.6-.3-.4-.4-.9-.3-1.4l1.6-18.5 1.6 18.5c.1.5 0 1-.3 1.4-.3.4-.8.6-1.3.6z"
          fill="#E8ECEC"
        />
      </svg>
    ),
  },

  // 4. Tools & Developer Workflow
  {
    name: "GIT",
    category: "Tooling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#F05032" fillOpacity="0.15" stroke="#F05032" strokeWidth="2" />
        <g transform="translate(12, 12) scale(0.625)">
          <path
            d="M62.7 29.3L34.7 1.3a4.2 4.2 0 00-5.9 0L20 10.1l7.5 7.5a5 5 0 016.3 6.3l7.2 7.2a5 5 0 11-3 3l-6.8-6.8v17.4a5 5 0 11-4.2 0V33.6a5 5 0 01-2.7-6.5l-7.3-7.3-15.4 15.4a4.2 4.2 0 000 5.9l28 28a4.2 4.2 0 005.9 0l27.1-27.1a4.2 4.2 0 000-5.9z"
            fill="#F05032"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "GITHUB",
    category: "DevOps",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#18181B" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 14c-9.9 0-18 8.1-18 18 0 8 5.2 14.7 12.4 17.1.9.2 1.2-.4 1.2-.9v-3.2c-5 1.1-6.1-2.4-6.1-2.4-.8-2.1-2-2.7-2-2.7-1.6-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.2 2 5.2 1.5.2-1.2.6-2 1.1-2.5-4-.5-8.2-2-8.2-8.9 0-2 .7-3.6 1.9-4.8-.2-.5-.8-2.3.2-4.7 0 0 1.5-.5 5 1.9 1.4-.4 3-.6 4.5-.6s3.1.2 4.5.6c3.5-2.4 5-1.9 5-1.9 1 2.4.4 4.2.2 4.7 1.2 1.2 1.9 2.9 1.9 4.8 0 6.9-4.2 8.4-8.2 8.9.7.6 1.2 1.7 1.2 3.3v4.9c0 .5.3 1.1 1.2.9C46.8 46.7 52 40 52 32c0-9.9-8.1-18-18-18z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "VS CODE",
    category: "Tooling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="#007ACC" fillOpacity="0.12" stroke="#007ACC" strokeWidth="2" />
        <g transform="translate(10, 10) scale(0.68)">
          <path
            d="M47.7 5.6a3.8 3.8 0 00-3.6.9L19.4 25.4l-8-6.1a2.8 2.8 0 00-3.9.6 2.8 2.8 0 00.5 3.9l6.5 5-6.5 5a2.8 2.8 0 00-.5 3.9 2.8 2.8 0 003.9.6l8-6.1 24.7 18.9a3.8 3.8 0 005.9-3V8.6a3.8 3.8 0 00-2.3-3z"
            fill="#0066B8"
          />
          <path
            d="M47.7 5.6L19.4 27.2l8.8 6.7 22.3-17.1a3.8 3.8 0 00-2.8-11.2z"
            fill="#007ACC"
          />
          <path
            d="M47.7 58.4a3.8 3.8 0 002.8-11.2L28.2 30.1l-8.8 6.7 24.7 18.9a3.8 3.8 0 003.6 2.7z"
            fill="#1F9CF0"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "POSTMAN",
    category: "Tooling",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#FF6C37" />
        <g fill="#FFFFFF">
          <circle cx="36" cy="22" r="4.5" />
          <path d="M46 29c-1.5-1.5-3.5-2.2-5.5-2.2H32c-1.5 0-3 .5-4.2 1.4l-6.5-3.8c-.8-.5-1.8-.4-2.5.2l-3.2 2.8c-.7.6-.8 1.6-.3 2.4l4.5 7.2c.5.8 1.5 1.1 2.4.7l5.3-2.5v7.6c0 1.2.6 2.3 1.6 3l7.5 5c.6.4 1.3.6 2 .6 1 0 2-.4 2.7-1.2l6.5-7.5c1.2-1.4 1.5-3.3.8-5l-2.1-4.8 3.2-1.5c1-.5 1.7-1.3 2.1-2.4z" />
        </g>
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
