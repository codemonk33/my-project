import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Phone,
  Menu,
  X,
  ChevronDown,
  Globe,
  Sparkles,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import type { Currency } from "../context/ShopContext";

interface MegaMenuHeaderProps {
  onNavClick: (sectionId: string) => void;
  onOpenPDP: () => void;
  onOpenTrade: () => void;
}

export const MegaMenuHeader: React.FC<MegaMenuHeaderProps> = ({
  onNavClick,
  onOpenPDP,
  onOpenTrade,
}) => {
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

  const handleLink = (id: string) => {
    onNavClick(id);
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
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
      <div className="bg-obsidian text-alabaster px-6 sm:px-12 py-1.5 text-[10px] font-mono tracking-widest flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-4">
          <span className="text-terracotta uppercase font-semibold">[ BHADOHI ATELIER ]</span>
          <span className="hidden md:inline text-alabaster/70">
            Free Worldwide White-Glove Air Shipping on Orders Over ₹50,000 / $600
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-1 text-alabaster/70">
            <span>STUDIO TIME:</span>
            <span className="text-white font-semibold">{bhadohiTime}</span>
          </div>

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

          <a
            href="tel:+917317076787"
            className="hidden lg:inline text-terracotta hover:underline"
          >
            Direct Specifier Dial: +91 7317076787
          </a>
        </div>
      </div>

      {/* 2. Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
        {/* Brand Architectural Wordmark with authentic NRI monogram */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center space-x-3"
        >
          {/* Authentic NRI Monogram Icon */}
          <div className="w-9 h-9 rounded-full bg-obsidian text-alabaster flex items-center justify-center font-serif text-sm font-semibold tracking-tighter border border-terracotta/60 group-hover:bg-terracotta transition-colors">
            NRI
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-obsidian uppercase group-hover:text-terracotta transition-colors leading-none">
              Naman Rugs & Carpets
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-obsidian/60 mt-1">
              Handmade in Bhadohi • Est. 1999
            </span>
          </div>
        </a>

        {/* Desktop Mega Menu Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono tracking-widest uppercase text-obsidian/80">
          {/* Shop Mega Menu Trigger */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveMegaMenu("shop")}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button
              onClick={() => handleLink("collections")}
              className="flex items-center space-x-1 hover:text-terracotta transition-colors"
            >
              <span>Shop Rugs</span>
              <ChevronDown className="w-3 h-3 text-obsidian/50" />
            </button>

            {/* Shop Mega Menu Flyout */}
            {activeMegaMenu === "shop" && (
              <div className="absolute top-full -left-20 w-[780px] bg-alabaster border border-craftBorder shadow-luxury-elevated p-8 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {/* Column 1: Categories */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-terracotta uppercase tracking-wider block font-semibold border-b border-craftBorder pb-1">
                    Catalog Divisions
                  </span>
                  <ul className="space-y-2 text-xs font-mono text-obsidian/75">
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        View All Rugs
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        New Arrivals
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        Bestseller Curations
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("manchaha")} className="hover:text-terracotta font-semibold text-terracotta">
                        Manchaha (One-of-a-Kind)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("techniques")} className="hover:text-terracotta">
                        Heritage Flatloom Dhurries
                      </button>
                    </li>
                    <li>
                      <button onClick={() => onOpenPDP()} className="hover:text-terracotta text-obsidian font-medium">
                        Sample Swatch Box
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: By Standard Size */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-terracotta uppercase tracking-wider block font-semibold border-b border-craftBorder pb-1">
                    By Size (Feet)
                  </span>
                  <ul className="space-y-2 text-xs font-mono text-obsidian/75">
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        4 × 6 ft (Small)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        5 × 8 ft (Medium)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        8 × 10 ft (Large)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        9 × 12 ft (Grand Salon)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        10 × 14 ft (Palatial)
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        Runners & Hallways
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: By Room Placement */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-terracotta uppercase tracking-wider block font-semibold border-b border-craftBorder pb-1">
                    By Architectural Room
                  </span>
                  <ul className="space-y-2 text-xs font-mono text-obsidian/75">
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        Living Room Salons
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        Master Bedroom Suites
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        Dining Rooms
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("collections")} className="hover:text-terracotta">
                        Corridors & Galleries
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleLink("size-guide")} className="hover:text-terracotta text-terracotta font-semibold">
                        Size & Placement Guide →
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Curated Editorial Feature */}
                <div className="bg-linen p-4 border border-craftBorder flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-obsidian/60 uppercase tracking-widest">
                    Featured Collection
                  </span>
                  <div className="py-2">
                    <h5 className="font-serif text-base text-obsidian uppercase font-semibold">
                      Atlas Moroccan Trellis
                    </h5>
                    <p className="text-[11px] font-mono text-obsidian/70 mt-1">
                      Undyed wool flatloom geometric relief.
                    </p>
                  </div>
                  <button
                    onClick={() => handleLink("collections")}
                    className="w-full py-2 bg-obsidian text-alabaster text-[10px] font-mono uppercase tracking-widest hover:bg-terracotta transition-colors"
                  >
                    Explore Series
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Styles Menu */}
          <button onClick={() => handleLink("collections")} className="hover:text-terracotta transition-colors">
            Collections
          </button>

          {/* Size Guide Trigger */}
          <button onClick={() => handleLink("size-guide")} className="hover:text-terracotta transition-colors">
            Size Visualizer
          </button>

          {/* Manchaha */}
          <button onClick={() => handleLink("manchaha")} className="hover:text-terracotta transition-colors">
            Manchaha
          </button>

          {/* Services & Care */}
          <button onClick={() => handleLink("services")} className="hover:text-terracotta transition-colors">
            Care & Wash
          </button>

          {/* Virtual Loom Tour */}
          <button onClick={() => handleLink("virtual-tour")} className="hover:text-terracotta transition-colors">
            Virtual Tour
          </button>

          {/* Provenance */}
          <button onClick={() => handleLink("heritage")} className="hover:text-terracotta transition-colors">
            Heritage
          </button>
        </nav>

        {/* Right Customer & Specifier Action Toolbar */}
        <div className="flex items-center space-x-3">
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
            onClick={onOpenPDP}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 border border-obsidian/30 bg-alabaster text-obsidian text-xs font-mono tracking-wider uppercase hover:border-obsidian transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>3D Studio</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20am%20an%20interior%20designer%20inquiring%20about%20bespoke%20handcrafted%20rugs."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-1 px-3 py-1.5 bg-obsidian text-alabaster text-xs font-mono tracking-wider uppercase hover:bg-terracotta transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Concierge</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-obsidian hover:text-terracotta transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-alabaster border-b border-craftBorder px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 text-sm font-mono tracking-widest uppercase">
            <button onClick={() => handleLink("collections")} className="text-left py-1 hover:text-terracotta">
              All Collections & Rugs
            </button>
            <button onClick={() => handleLink("size-guide")} className="text-left py-1 hover:text-terracotta">
              Room Size & Placement Guide
            </button>
            <button onClick={() => handleLink("manchaha")} className="text-left py-1 hover:text-terracotta">
              Manchaha (Weaver Canvas)
            </button>
            <button onClick={() => handleLink("services")} className="text-left py-1 hover:text-terracotta">
              Rug Care, Cleaning & Wash
            </button>
            <button onClick={() => handleLink("virtual-tour")} className="text-left py-1 hover:text-terracotta">
              Virtual Loom Tour
            </button>
            <button onClick={() => handleLink("heritage")} className="text-left py-1 hover:text-terracotta">
              Provenance & Bhadohi Story
            </button>
            <button onClick={() => handleLink("dossier")} className="text-left py-1 hover:text-terracotta">
              Factory & Showroom Dossier
            </button>

            <div className="pt-4 border-t border-craftBorder flex flex-col space-y-2.5">
              <button
                onClick={() => {
                  onOpenPDP();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-obsidian text-alabaster text-xs font-mono uppercase tracking-widest"
              >
                Launch 3D Configurator
              </button>
              <button
                onClick={() => {
                  onOpenTrade();
                  setMobileMenuOpen(false);
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
