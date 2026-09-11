import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "SERVICES", href: "#services", id: "services" },
  { name: "PROJECTS", href: "#projects", id: "projects" },
  { name: "HONORS & LEADERSHIP", href: "#leadership", id: "leadership" },
  { name: "AWARDS & CERTIFICATIONS", href: "#awards", id: "awards" },
  { name: "SKILLS", href: "#skills", id: "skills" },
  { name: "EXPERIENCE", href: "#experience", id: "experience" },
  { name: "GALLERY", href: "#gallery", id: "gallery" },
  { name: "CONTACT", href: "#contact", id: "contact" },
];

export default function GlassNav() {
  const [activeSection, setActiveSection] = useState<string>("services");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + 220;
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec) {
          const top = sec.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(NAV_ITEMS[i].id);
            return;
          }
        }
      }

      // Default to services if scrolled a bit or top if above
      if (window.scrollY < 400) {
        setActiveSection("services");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-4 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full transition-all duration-300 max-w-[1380px] w-full ${scrolled
            ? "bg-[#0a0305]/90 border border-[#ff1e2d]/30 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(255,30,45,0.15)] backdrop-blur-xl"
            : "bg-[#0c0406]/80 border border-[#2a0e13] shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-md"
          }`}
      >
        {/* Brand: Single-Line, Responsive for mobile */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center whitespace-nowrap text-xs sm:text-[13px] tracking-wider uppercase select-none group transition-opacity hover:opacity-90"
          style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
        >
          <span className="text-white font-black tracking-wider group-hover:text-white transition-colors">
            MOHAMED ASHIK
          </span>
          <span className="hidden sm:inline text-[#ff1e2d] font-black mx-2 sm:mx-2.5">/</span>
          <span className="hidden sm:inline text-zinc-300 font-bold tracking-wider">
            SOFTWARE DEVELOPER
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`whitespace-nowrap rounded-full text-[11px] font-extrabold tracking-wider transition-all duration-200 uppercase px-3.5 py-1.5 ${isActive
                    ? "text-white bg-[#ff1e2d] shadow-[0_0_18px_rgba(255,30,45,0.75)]"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Medium Screen Navigation (slightly more compact to fit without wrapping) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`whitespace-nowrap rounded-full text-[10px] font-extrabold tracking-tight transition-all duration-200 uppercase px-2.5 py-1.5 ${isActive
                    ? "text-white bg-[#ff1e2d] shadow-[0_0_15px_rgba(255,30,45,0.75)]"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
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
          className="lg:hidden p-1.5 rounded-full text-zinc-300 hover:text-white bg-white/5 border border-white/10 ml-auto transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto fixed top-16 sm:top-20 left-4 right-4 p-4 rounded-2xl bg-[#0e0406]/95 border border-[#ff1e2d]/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-3 py-1 border-b border-white/5">
            // NAVIGATION MENU
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${isActive
                    ? "text-white bg-[#ff1e2d] shadow-[0_0_15px_rgba(255,30,45,0.6)]"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
              >
                <span>{item.name}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
