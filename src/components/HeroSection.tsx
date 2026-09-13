import React, { useState } from "react";
import RugViewer3D from "./RugViewer3D";
import type { RugConfig } from "../utils/rugTextureEngine";
import { ArrowDownRight, Compass, Sparkles, ShieldCheck, MapPin } from "lucide-react";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onOpenPDPClick?: () => void;
  onTradeClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenPDPClick,
  onTradeClick,
}) => {
  // Hero 3D dynamic configuration: high-fashion Modern Geometric in Terracotta & Raw Wool
  const [heroRugConfig, setHeroRugConfig] = useState<RugConfig>({
    technique: "hand-tufted",
    collection: "modern-geometric",
    fiber: "pure-wool",
    primaryColor: "#C87D55", // Authentic Terracotta Dye
    secondaryColor: "#DDD7CD", // Raw Undyed Wool
    accentColor: "#1F2B37", // Deep Indigo Vat
    widthFt: 8,
    lengthFt: 10,
  });

  const [activePreset, setActivePreset] = useState<"flatlay" | "room" | "macro">("room");

  return (
    <section className="relative min-h-[92vh] w-full bg-alabaster border-b border-craftBorder flex flex-col justify-between overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-60" />
      <div className="absolute left-8 md:left-24 top-0 bottom-0 w-[1px] bg-craftBorder/60 pointer-events-none hidden sm:block" />
      <div className="absolute right-8 md:right-24 top-0 bottom-0 w-[1px] bg-craftBorder/60 pointer-events-none hidden sm:block" />

      {/* Top Monospaced Micro-Badges Bar */}
      <div className="relative z-10 pt-28 sm:pt-32 px-6 sm:px-12 md:px-24">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-craftBorder pb-4 text-[11px] font-mono tracking-widest uppercase text-obsidian/70">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-terracotta" />
            <span className="font-semibold text-obsidian">[ 25+ Years of Heritage ]</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 text-obsidian/60">
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            <span>[ Bhadohi, India — Global Carpet Capital ]</span>
          </div>
          <div className="flex items-center space-x-1.5 text-obsidian/60">
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
            <span>[ 100% Handcrafted by Artisans ]</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Hero Grid: Typography Left, Interactive 3D Loom Right */}
      <div className="relative z-10 px-6 sm:px-12 md:px-24 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Left Column: High-Fashion Milanese Editorial Content */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-8 bg-terracotta" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-terracotta">
                Milanese Editorial × Bhadohi Loom
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-obsidian font-normal tracking-tight">
              Unhurried <br />
              <span className="italic font-light text-terracotta font-serif">Handmade</span> Craft.
            </h1>
          </div>

          {/* Sub-tagline & Philosophy */}
          <div className="border-l-2 border-terracotta/40 pl-4 py-1 space-y-2">
            <p className="font-serif italic text-lg sm:text-xl text-obsidian/85">
              “Your Floor’s Forever Companion.”
            </p>
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed max-w-lg">
              Behind every carpet is a person — a weaver, a dyer, a finisher who gives it character. 
              Made slowly. Made by hand. Made to endure generations.
            </p>
          </div>

          {/* Quick Interactive Loom Switcher */}
          <div className="pt-2">
            <span className="block text-[10px] font-mono tracking-widest uppercase text-obsidian/50 mb-2">
              Select 3D Weaving Technique:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "hand-tufted", label: "Hand-Tufted (Sculpted)", color: "#C87D55" },
                { id: "hand-knotted", label: "Hand-Knotted (Heirloom)", color: "#1F2B37" },
                { id: "hand-loom", label: "Hand-Loom (Flatweave)", color: "#A86438" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setHeroRugConfig((prev) => ({
                      ...prev,
                      technique: item.id as any,
                      primaryColor: item.color,
                      collection:
                        item.id === "hand-tufted"
                          ? "sculpted-naturals"
                          : item.id === "hand-knotted"
                          ? "modern-geometric"
                          : "soft-ombre",
                    }))
                  }
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase border transition-all ${
                    heroRugConfig.technique === item.id
                      ? "bg-obsidian text-alabaster border-obsidian shadow-sm"
                      : "bg-alabaster/80 text-obsidian/70 border-craftBorder hover:border-obsidian"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenPDPClick}
              className="group inline-flex items-center space-x-3 bg-obsidian text-alabaster px-6 py-3.5 text-xs font-mono tracking-widest uppercase hover:bg-terracotta transition-colors shadow-luxury-soft"
            >
              <span>Launch 3D Bespoke Configurator</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center space-x-2 border border-obsidian/40 px-5 py-3.5 text-xs font-mono tracking-widest uppercase text-obsidian hover:bg-linen-200 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-terracotta" />
              <span>Explore Collections</span>
            </button>

            <button
              onClick={onTradeClick}
              className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-wider text-obsidian/70 hover:text-terracotta underline underline-offset-4"
            >
              <span>Architectural Trade Portal</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Loom Viewport */}
        <div className="lg:col-span-6 w-full h-[460px] sm:h-[540px] lg:h-[600px] relative">
          <div className="absolute -inset-2 bg-gradient-to-tr from-terracotta/10 via-transparent to-indigoVat/10 -z-10 blur-xl rounded-sm" />
          <RugViewer3D
            config={heroRugConfig}
            cameraPreset={activePreset}
            showRoomContext={true}
            interactiveLight={true}
            enableRotationFloat={true}
            className="shadow-luxury-elevated"
            onPresetChange={(p) => setActivePreset(p)}
          />

          {/* Floating Artisan Micro-Annotation */}
          <div className="absolute top-6 right-6 pointer-events-none hidden md:block">
            <div className="bg-alabaster/95 backdrop-blur-md p-3 border border-craftBorder text-[10px] font-mono text-obsidian/80 max-w-[200px] shadow-sm">
              <div className="text-terracotta font-semibold uppercase mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Live Shader Feed
              </div>
              <div>Subdivided mesh reacts to grazing angle daylight and organic warp drape.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Spec Strip */}
      <div className="relative z-10 px-6 sm:px-12 md:px-24 py-4 bg-linen border-t border-craftBorder grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="block text-[10px] text-obsidian/50 uppercase tracking-wider">FOUNDED</span>
          <span className="font-semibold text-obsidian">1999 • Bhadohi (U.P.)</span>
        </div>
        <div>
          <span className="block text-[10px] text-obsidian/50 uppercase tracking-wider">ANNUAL PRODUCTION</span>
          <span className="font-semibold text-obsidian">100% Handcrafted</span>
        </div>
        <div>
          <span className="block text-[10px] text-obsidian/50 uppercase tracking-wider">GLOBAL EXPORTS</span>
          <span className="font-semibold text-obsidian">Milan, London, NYC, Tokyo</span>
        </div>
        <div>
          <span className="block text-[10px] text-obsidian/50 uppercase tracking-wider">STUDIO CONCIERGE</span>
          <span className="font-semibold text-terracotta">+91 7317076787</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
