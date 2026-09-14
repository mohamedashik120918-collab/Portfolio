import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "SERVICES", href: "#services", id: "services" },
  { name: "PROJECTS", href: "#projects", id: "projects" },
  { name: "RECOGNITION & ACHIEVEMENTS", href: "#awards", id: "awards" },
  { name: "SKILLS", href: "#skills", id: "skills" },
  { name: "EXPERIENCE", href: "#experience", id: "experience" },
  { name: "CONTACT", href: "#contact", id: "contact" },
];

export default function GlassNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // During manual click smooth scroll, keep the user's selected active button
      if (isManualScrollRef.current) return;

      // When near top of the page (Hero Section), no nav section button is active
      const servicesEl = document.getElementById("services");
      const servicesTop = servicesEl ? servicesEl.getBoundingClientRect().top + scrollY : 600;
      if (scrollY < servicesTop - 180) {
        setActiveSection("");
        return;
      }

      // If scrolled to the bottom of the page, activate Contact
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // Reading zone buffer below sticky navbar (approx 160px)
      const navBuffer = 160;

      // Evaluate in reverse order so lower sections on page take precedence as scrolled past
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= navBuffer) {
          setActiveSection(item.id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // 1. Immediately highlight the selected item in glowing red
    setActiveSection(item.id);

    // 2. Lock scroll spy during smooth scroll so intermediate sections don't steal the active state
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 950);

    // 3. Smooth scroll with comfortable navbar offset
    const target = document.querySelector(item.href);
    if (target) {
      const navOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
      <div
        className={`pointer-events-auto relative flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 w-full max-w-[96vw] 2xl:max-w-[94vw] overflow-hidden ${
          scrolled
            ? "bg-[#0b0306]/70 border border-white/20 border-t-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,30,45,0.18),inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-180"
            : "bg-[#0e0408]/55 border border-white/15 border-t-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(255,30,45,0.1),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-150"
        }`}
        style={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        {/* Glass Specular Top Rim Highlight */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Ambient Subtle Red Glass Aura */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff1e2d]/6 via-transparent to-[#ff1e2d]/6 pointer-events-none rounded-full" />

        {/* Brand: Single-Line, Responsive */}
        <a
          href="#top"
          onClick={handleBrandClick}
          className="flex items-center whitespace-nowrap text-xs sm:text-[13px] tracking-wider uppercase select-none group transition-all hover:opacity-90 outline-hidden focus:outline-hidden relative z-10"
          style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
        >
          <span className="text-white font-black tracking-wider group-hover:text-white transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            MOHAMED ASHIK
          </span>
          <span className="hidden sm:inline text-[#ff1e2d] font-black mx-2 sm:mx-2.5 drop-shadow-[0_0_8px_rgba(255,30,45,0.6)]">/</span>
          <span className="hidden sm:inline text-zinc-300 font-bold tracking-wider">
            SOFTWARE DEVELOPER
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2 relative z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`whitespace-nowrap rounded-full text-[11px] font-extrabold tracking-wider transition-all duration-300 uppercase px-3.5 py-1.5 outline-hidden focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#ff1e2d]/60 relative select-none cursor-pointer ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#ff1e2d] via-[#ee1525] to-[#c70b19] shadow-[0_0_20px_rgba(255,30,45,0.75),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(0,0,0,0.3)] border border-white/30 scale-[1.03]"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/15 border border-transparent hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                }`}
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Medium Screen Navigation (slightly more compact to fit without wrapping) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1 relative z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`whitespace-nowrap rounded-full text-[10px] font-extrabold tracking-tight transition-all duration-300 uppercase px-2.5 py-1.5 outline-hidden focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#ff1e2d]/60 relative select-none cursor-pointer ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#ff1e2d] via-[#ee1525] to-[#c70b19] shadow-[0_0_18px_rgba(255,30,45,0.75),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(0,0,0,0.3)] border border-white/30 scale-[1.03]"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/15 border border-transparent hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                }`}
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Mobile / Tablet Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-full text-zinc-300 hover:text-white bg-white/5 border border-white/15 hover:border-white/30 ml-auto transition-all relative z-10 outline-hidden focus:outline-hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown with Deep Frosted Glass Effect */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden pointer-events-auto fixed top-16 sm:top-20 left-4 right-4 p-4 rounded-3xl bg-[#0e0408]/85 border border-white/15 border-t-white/35 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,30,45,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] z-50 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-4 duration-300"
          style={{
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase px-3 py-1 border-b border-white/10 flex items-center justify-between">
            <span>// NAVIGATION MENU</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e2d] shadow-[0_0_8px_#ff1e2d]" />
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all outline-hidden ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#ff1e2d] to-[#c70b19] shadow-[0_0_18px_rgba(255,30,45,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/25"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.08]"
                }`}
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
              >
                <span>{item.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
