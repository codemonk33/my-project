import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Globe,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import type { Currency } from "../context/ShopContext";

interface MegaMenuHeaderProps {
  onNavClick?: (sectionId: string) => void;
  onOpenPDP?: () => void;
  onOpenTrade?: () => void;
}

export const MegaMenuHeader: React.FC<MegaMenuHeaderProps> = ({
  onNavClick,
  onOpenPDP,
  onOpenTrade,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
  } = useShop();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
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

  const handleLink = (id: string, path?: string) => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);

    if (path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (onNavClick) onNavClick(id);
      }, 100);
    } else {
      if (onNavClick) onNavClick(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-alabaster/95 backdrop-blur-md border-b border-craftBorder shadow-luxury-soft"
          : "bg-alabaster/90 backdrop-blur-sm border-b border-craftBorder/50"
      }`}
    >
      {/* 1. Top Utility Notification & Currency Bar (Jaipur Rugs Signature Strip) */}
      <div className="bg-obsidian text-alabaster px-4 sm:px-8 xl:px-12 py-1.5 text-[10px] font-mono tracking-widest flex items-center justify-between border-b border-white/10 overflow-x-auto whitespace-nowrap no-scrollbar">
        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-terracotta uppercase font-semibold">[ BHADOHI ATELIER ]</span>
          <span className="text-white/20">|</span>
          <span className="hidden md:inline text-alabaster/70">
            Free Worldwide White-Glove Air Shipping on Orders Over ₹50,000 / $600
          </span>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
          <div className="hidden sm:flex items-center space-x-1.5 text-alabaster/70">
            <span>STUDIO TIME:</span>
            <span className="text-white font-semibold">{bhadohiTime}</span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          {/* Currency Switcher */}
          <div className="flex items-center space-x-1">
            <Globe className="w-3 h-3 text-terracotta" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-white text-[10px] font-mono uppercase focus:outline-none cursor-pointer"
            >
              <option value="INR" className="bg-obsidian text-white">INR (₹)</option>
              <option value="USD" className="bg-obsidian text-white">USD ($)</option>
              <option value="EUR" className="bg-obsidian text-white">EUR (€)</option>
              <option value="GBP" className="bg-obsidian text-white">GBP (£)</option>
              <option value="AED" className="bg-obsidian text-white">AED</option>
            </select>
          </div>

          <span className="hidden lg:inline text-white/20">|</span>

          {/* Direct WhatsApp Specifier Strip */}
          <a
            href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20am%20inquiring%20about%20your%20handcrafted%20carpets."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center space-x-1.5 text-emerald-400 hover:text-white transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>WhatsApp Specifier: +91 7317076787</span>
          </a>
        </div>
      </div>

      {/* 2. Primary Navigation Bar */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 xl:px-12 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Architectural Wordmark with authentic NRI monogram */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center space-x-3 shrink-0"
        >
          {/* Authentic NRI Monogram Icon */}
          <div className="w-9 h-9 rounded-full bg-obsidian text-alabaster flex items-center justify-center font-serif text-sm font-semibold tracking-tighter border border-terracotta/60 group-hover:bg-terracotta transition-colors shrink-0">
            NRI
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-normal tracking-tight text-obsidian uppercase group-hover:text-terracotta transition-colors leading-none whitespace-nowrap">
              Naman Rugs & Carpets
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-obsidian/60 mt-1 whitespace-nowrap">
              Handmade in Bhadohi • Est. 1999
            </span>
          </div>
        </Link>

        {/* Desktop Mega Menu Navigation Links (Clean Single-Line Layout) */}
        <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-6 text-[11px] font-mono tracking-[0.14em] uppercase text-obsidian/80">
          {/* Shop Mega Menu Trigger */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveMegaMenu("shop")}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button
              onClick={() => handleLink("collections", "/collections")}
              className="flex items-center space-x-1 hover:text-terracotta transition-colors whitespace-nowrap"
            >
              <span>Shop Rugs</span>
              <ChevronDown className="w-3 h-3 text-obsidian/50" />
            </button>

            {/* Mega Menu Flyout Panel */}
            {activeMegaMenu === "shop" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[840px] bg-alabaster border border-craftBorder shadow-luxury-elevated p-8 animate-in fade-in slide-in-from-top-2 duration-200 grid grid-cols-4 gap-8">
                {/* Col 1: By Weaving Technique */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-terracotta uppercase tracking-widest block font-semibold border-b border-craftBorder pb-1">
                    By Weave Division
                  </span>
                  <ul className="space-y-2 text-xs normal-case font-sans text-obsidian/70">
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Hand-Knotted (Heirloom)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Hand-Tufted (Sculpted Relief)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Flatweave Dhurries
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("manchaha", "/manchaha")} className="hover:text-terracotta font-semibold text-terracotta text-left">
                        Manchaha (Weaver Art)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("techniques", "/about")} className="hover:text-terracotta text-left">
                        All 8 Loom Stages
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Col 2: By Style Curations */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-terracotta uppercase tracking-widest block font-semibold border-b border-craftBorder pb-1">
                    Design Aesthetics
                  </span>
                  <ul className="space-y-2 text-xs normal-case font-sans text-obsidian/70">
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Modern Geometric
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Sculpted Naturals
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Soft Ombre & Gradient
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Moroccan Trellis
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Heritage Check Dhurries
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Col 3: By Room Placement */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-terracotta uppercase tracking-widest block font-semibold border-b border-craftBorder pb-1">
                    Room Placement
                  </span>
                  <ul className="space-y-2 text-xs normal-case font-sans text-obsidian/70">
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Grand Living Salon
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Dining Suites
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Bedroom Sanctuaries
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta text-left">
                        Hallways & Gallery Runners
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("size-guide", "/size-guide")} className="hover:text-terracotta text-terracotta font-semibold text-left">
                        Room Size Visualizer Guide →
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Col 4: Featured Editorial Spotlight */}
                <div className="bg-linen p-4 border border-craftBorder flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-terracotta uppercase tracking-widest font-semibold block">
                      Atelier Spotlight
                    </span>
                    <h5 className="font-serif text-sm font-normal text-obsidian mt-1 uppercase">
                      Bespoke 3D Weaver Studio
                    </h5>
                    <p className="text-[11px] text-obsidian/70 font-sans mt-2 leading-relaxed">
                      Custom square footages, wool knot counts, and organic dye vats.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (onOpenPDP) onOpenPDP();
                      handleLink("configurator", "/custom-studio");
                    }}
                    className="mt-4 text-[10px] font-mono uppercase tracking-widest text-white bg-obsidian py-2 px-3 hover:bg-terracotta transition-colors text-center font-semibold"
                  >
                    Open 3D Studio
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct Collections Subpage */}
          <button onClick={() => handleLink("collections", "/collections")} className="hover:text-terracotta transition-colors whitespace-nowrap">
            Collections
          </button>

          {/* Size Guide Subpage */}
          <button onClick={() => handleLink("size-guide", "/size-guide")} className="hover:text-terracotta transition-colors whitespace-nowrap">
            Size Visualizer
          </button>

          {/* Manchaha Subpage */}
          <button onClick={() => handleLink("manchaha", "/manchaha")} className="hover:text-terracotta transition-colors whitespace-nowrap">
            Manchaha
          </button>

          {/* Care & Wash Subpage */}
          <button onClick={() => handleLink("services", "/services")} className="hover:text-terracotta transition-colors whitespace-nowrap">
            Care & Wash
          </button>

          {/* Trade Subpage */}
          <button onClick={() => handleLink("trade", "/trade")} className="hover:text-terracotta transition-colors whitespace-nowrap">
            Trade
          </button>

          {/* Heritage Subpage */}
          <button onClick={() => handleLink("heritage", "/about")} className="hover:text-terracotta transition-colors whitespace-nowrap">
            Heritage
          </button>

          {/* Contact Subpage */}
          <button onClick={() => handleLink("dossier", "/contact")} className="hover:text-terracotta transition-colors whitespace-nowrap">
            Contact
          </button>
        </nav>

        {/* Right Customer & Specifier Action Toolbar */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-obsidian hover:text-terracotta transition-colors"
            title="Search Rugs"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Trigger with Badge */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-obsidian hover:text-terracotta transition-colors"
            title="View Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-mono flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart / Shopping Bag Trigger with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-obsidian hover:text-terracotta transition-colors"
            title="View Loom Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-obsidian text-alabaster text-[9px] font-mono flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>

          {/* 3D Configurator CTA */}
          <button
            onClick={() => {
              if (onOpenPDP) onOpenPDP();
              handleLink("configurator", "/custom-studio");
            }}
            className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-craftBorder bg-linen/50 text-obsidian text-[11px] font-mono tracking-wider uppercase hover:border-obsidian hover:bg-white transition-all whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 text-terracotta" />
            <span>3D Studio</span>
          </button>

          {/* Refined Luxury WhatsApp Concierge Pill */}
          <a
            href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20would%20like%20to%20connect%20with%20an%20atelier%20specialist%20regarding%20handcrafted%20carpets."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-obsidian hover:bg-terracotta text-white text-[11px] font-mono tracking-wider uppercase transition-all duration-300 border border-obsidian/20 hover:border-terracotta shadow-luxury-soft group whitespace-nowrap"
            title="Connect with Bhadohi Atelier Concierge"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white transition-colors" />
            <span className="font-semibold">WhatsApp</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-obsidian hover:text-terracotta transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-alabaster border-b border-craftBorder px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 text-sm font-mono tracking-widest uppercase">
            <button onClick={() => handleLink("collections", "/collections")} className="text-left py-1 hover:text-terracotta">
              All Collections & Rugs
            </button>
            <button onClick={() => handleLink("configurator", "/custom-studio")} className="text-left py-1 hover:text-terracotta text-terracotta font-semibold">
              Bespoke 3D Studio
            </button>
            <button onClick={() => handleLink("size-guide", "/size-guide")} className="text-left py-1 hover:text-terracotta">
              Room Size & Placement Guide
            </button>
            <button onClick={() => handleLink("manchaha", "/manchaha")} className="text-left py-1 hover:text-terracotta">
              Manchaha (Weaver Canvas)
            </button>
            <button onClick={() => handleLink("services", "/services")} className="text-left py-1 hover:text-terracotta">
              Rug Care, Cleaning & Wash
            </button>
            <button onClick={() => handleLink("trade", "/trade")} className="text-left py-1 hover:text-terracotta">
              Trade & Specifiers Portal
            </button>
            <button onClick={() => handleLink("heritage", "/about")} className="text-left py-1 hover:text-terracotta">
              Our 25-Year Heritage
            </button>
            <button onClick={() => handleLink("dossier", "/contact")} className="text-left py-1 hover:text-terracotta">
              Factory & Showroom Dossier
            </button>

            <div className="pt-4 border-t border-craftBorder flex flex-col space-y-2.5">
              <a
                href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20would%20like%20to%20chat%20on%20WhatsApp."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 font-semibold"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp (+91 7317076787)</span>
              </a>
              <button
                onClick={() => {
                  if (onOpenPDP) onOpenPDP();
                  setMobileMenuOpen(false);
                  navigate("/custom-studio");
                }}
                className="w-full py-3 bg-obsidian text-alabaster text-xs font-mono uppercase tracking-widest"
              >
                Launch 3D Configurator
              </button>
              <button
                onClick={() => {
                  if (onOpenTrade) onOpenTrade();
                  setMobileMenuOpen(false);
                  navigate("/trade");
                }}
                className="w-full py-3 border border-obsidian text-obsidian text-xs font-mono uppercase tracking-widest"
              >
                Architectural Trade Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MegaMenuHeader;
