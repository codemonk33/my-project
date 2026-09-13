import React, { useState, useEffect } from "react";
import { Phone, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  onOpenPDP: () => void;
  onOpenTrade: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavClick,
  onOpenPDP,
  onOpenTrade,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bhadohiTime, setBhadohiTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    const updateClock = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setBhadohiTime(`${timeStr} IST`);
      } catch {
        setBhadohiTime("BHADOHI IST");
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { label: "Heritage", id: "heritage" },
    { label: "8-Stage Process", id: "process" },
    { label: "Weaving Divisions", id: "techniques" },
    { label: "Collections", id: "collections" },
    { label: "Factory Dossier", id: "dossier" },
  ];

  const handleLink = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-alabaster/95 backdrop-blur-md border-b border-craftBorder py-3 shadow-luxury-soft"
          : "bg-alabaster/80 backdrop-blur-sm border-b border-craftBorder/50 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Architectural Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex flex-col"
        >
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-obsidian uppercase group-hover:text-terracotta transition-colors">
            Naman
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-obsidian/60">
            Rugs & Carpets • Bhadohi
          </span>
        </a>

        {/* Desktop Editorial Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase text-obsidian/75">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLink(item.id)}
              className="hover:text-terracotta transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-terracotta hover:after:w-full after:transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Bar: Live Time + Specifier Actions */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="hidden xl:flex flex-col text-right font-mono text-[10px] text-obsidian/50 leading-tight pr-2 border-r border-craftBorder">
            <span>BHADOHI STUDIO</span>
            <span className="text-obsidian font-semibold">{bhadohiTime}</span>
          </div>

          <button
            onClick={onOpenPDP}
            className="flex items-center space-x-1.5 px-3.5 py-2 border border-obsidian/30 bg-alabaster text-obsidian text-xs font-mono tracking-wider uppercase hover:border-obsidian transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>3D Configurator</span>
          </button>

          <a
            href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20am%20an%20interior%20designer%20inquiring%20about%20bespoke%20handcrafted%20rugs."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-obsidian text-alabaster text-xs font-mono tracking-wider uppercase hover:bg-terracotta transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Concierge</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-obsidian hover:text-terracotta transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-alabaster border-b border-craftBorder px-6 py-8 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-5 text-sm font-mono tracking-widest uppercase">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLink(item.id)}
                className="text-left text-obsidian/80 hover:text-terracotta transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-craftBorder flex flex-col space-y-3">
              <button
                onClick={() => {
                  onOpenPDP();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 bg-obsidian text-alabaster text-xs font-mono tracking-widest uppercase hover:bg-terracotta transition-colors"
              >
                Launch 3D Configurator
              </button>
              <button
                onClick={() => {
                  onOpenTrade();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 border border-obsidian text-obsidian text-xs font-mono tracking-widest uppercase hover:bg-linen-200 transition-colors"
              >
                Trade & Hospitality Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
