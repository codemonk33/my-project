import React, { useState } from "react";
import type {
  WeavingTechnique,
  RugCollection,
  FiberMaterial,
} from "../utils/rugTextureEngine";
import {
  Grid,
  LayoutGrid,
  Sparkles,
  ArrowUpRight,
  Eye,
} from "lucide-react";

export interface RugProduct {
  id: string;
  name: string;
  collection: RugCollection;
  technique: WeavingTechnique;
  fiber: FiberMaterial;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  standardSizes: string[];
  knotCount: string;
  pileHeight: string;
  tagline: string;
  image: string;
  flatlayImage: string;
}

export const CATALOG_PRODUCTS: RugProduct[] = [
  {
    id: "mg-01",
    name: "Architectural Quadrant 01",
    collection: "modern-geometric",
    technique: "hand-tufted",
    fiber: "pure-wool",
    primaryColor: "#C87D55", // Terracotta
    secondaryColor: "#EFECE6", // Linen
    accentColor: "#1F2B37", // Indigo
    standardSizes: ["5×8 ft", "8×10 ft", "9×12 ft", "Custom"],
    knotCount: "Multi-level cut & loop clusters",
    pileHeight: "14mm / 8mm Carved",
    tagline: "Bold architectural contour with hand-sheared relief borders.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mg-02",
    name: "Checkerboard Noir & Ivory",
    collection: "modern-geometric",
    technique: "hand-knotted",
    fiber: "wool-bamboo-silk",
    primaryColor: "#121212", // Obsidian
    secondaryColor: "#FBF9F5", // Alabaster
    accentColor: "#A86438", // Burnt Ochre
    standardSizes: ["6×9 ft", "8×10 ft", "10×14 ft"],
    knotCount: "140 Knots / Sq. Inch",
    pileHeight: "10mm Uniform",
    tagline: "High-contrast Milanese geometry woven with lustrous bamboo silk.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sn-01",
    name: "Sculpted Ribbed Ribbons",
    collection: "sculpted-naturals",
    technique: "hand-tufted",
    fiber: "pure-wool",
    primaryColor: "#DDD7CD", // Raw Wool
    secondaryColor: "#F5F2EB", // Warm Stone
    accentColor: "#C87D55", // Terracotta
    standardSizes: ["8×10 ft", "9×12 ft", "Organic Contour"],
    knotCount: "High-density sculpted loop",
    pileHeight: "18mm Sculpted High-Low",
    tagline: "Organic contours inspired by dry riverbeds of Uttar Pradesh.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sn-02",
    name: "Botanical Floral Relief",
    collection: "sculpted-naturals",
    technique: "hand-knotted",
    fiber: "wool-bamboo-silk",
    primaryColor: "#A86438", // Burnt Ochre
    secondaryColor: "#EFECE6", // Linen
    accentColor: "#1F2B37", // Deep Indigo
    standardSizes: ["8×10 ft", "9×12 ft", "12×15 ft"],
    knotCount: "160 Knots / Sq. Inch",
    pileHeight: "9mm Velveteen",
    tagline: "Intricate floral vines hand-carved with dimensional wool & silk luster.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "so-01",
    name: "Horizon Calm Ombre",
    collection: "soft-ombre",
    technique: "hand-loom",
    fiber: "pure-wool",
    primaryColor: "#A86438", // Ochre to Terracotta
    secondaryColor: "#EFECE6", // Raw Linen
    accentColor: "#C87D55",
    standardSizes: ["5×8 ft", "8×10 ft", "9×12 ft", "Custom Runner"],
    knotCount: "Tight Flatloom Weft Interlock",
    pileHeight: "6mm Low-Profile Rib",
    tagline: "Peaceful mineral gradation fading smoothly across the warp.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "so-02",
    name: "Indigo Mist Gradient",
    collection: "soft-ombre",
    technique: "hand-loom",
    fiber: "linen",
    primaryColor: "#1F2B37", // Indigo Vat
    secondaryColor: "#DDD7CD", // Raw Wool
    accentColor: "#758A99", // Misty Slate
    standardSizes: ["6×9 ft", "8×10 ft", "9×12 ft"],
    knotCount: "Shuttle Loom Flatweave",
    pileHeight: "5mm Natural Texture",
    tagline: "Deep indigo vat dip-dye creating moody transitions for calm sanctuaries.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
];

interface CollectionsGalleryProps {
  onSelectProductFor3D: (product: RugProduct) => void;
}

export const CollectionsGallery: React.FC<CollectionsGalleryProps> = ({
  onSelectProductFor3D,
}) => {
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [activeTechnique, setActiveTechnique] = useState<string>("all");
  const [layoutMode, setLayoutMode] = useState<"grid" | "moodboard">("grid");

  const filtered = CATALOG_PRODUCTS.filter((item) => {
    const matchCollection = activeCollection === "all" || item.collection === activeCollection;
    const matchTechnique = activeTechnique === "all" || item.technique === activeTechnique;
    return matchCollection && matchTechnique;
  });

  return (
    <section id="collections" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-alabaster border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            The Curated Catalog
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Crafted For <br />
              <span className="italic font-light text-terracotta">Every Space.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              From bold geometrics to soft, textured naturals — every rug is designed to bring warmth,
              tactile acoustics, and character to spaces people live in and love.
            </p>
          </div>
        </div>

        {/* Filter & Layout Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-10 border-y border-craftBorder font-mono text-xs">
          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-obsidian/40 uppercase tracking-wider mr-2 hidden sm:inline">
              Collection:
            </span>
            {[
              { id: "all", label: "All Collections" },
              { id: "modern-geometric", label: "Modern Geometric" },
              { id: "sculpted-naturals", label: "Sculpted Naturals" },
              { id: "soft-ombre", label: "Soft Ombre" },
            ].map((col) => (
              <button
                key={col.id}
                onClick={() => setActiveCollection(col.id)}
                className={`px-3 py-1.5 uppercase transition-all ${
                  activeCollection === col.id
                    ? "bg-obsidian text-alabaster shadow-sm"
                    : "text-obsidian/70 hover:text-obsidian hover:bg-linen"
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Technique Filter & Layout Mode Switcher */}
          <div className="flex items-center space-x-3">
            <select
              value={activeTechnique}
              onChange={(e) => setActiveTechnique(e.target.value)}
              className="bg-alabaster border border-craftBorder px-3 py-1.5 text-xs font-mono uppercase text-obsidian focus:outline-none focus:border-obsidian"
            >
              <option value="all">All Techniques</option>
              <option value="hand-knotted">Hand-Knotted</option>
              <option value="hand-tufted">Hand-Tufted</option>
              <option value="hand-loom">Hand-Woven / Loom</option>
            </select>

            {/* Strict Architectural Grid vs Editorial Moodboard Switcher */}
            <div className="hidden sm:flex items-center border border-craftBorder p-0.5 bg-linen">
              <button
                onClick={() => setLayoutMode("grid")}
                className={`p-1.5 transition-colors ${
                  layoutMode === "grid" ? "bg-alabaster text-obsidian shadow-sm" : "text-obsidian/40"
                }`}
                title="Strict Architectural Grid"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLayoutMode("moodboard")}
                className={`p-1.5 transition-colors ${
                  layoutMode === "moodboard" ? "bg-alabaster text-obsidian shadow-sm" : "text-obsidian/40"
                }`}
                title="Editorial Moodboard"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Catalog Showcase Container */}
        {layoutMode === "grid" ? (
          /* Strict Architectural Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((rug) => (
              <div
                key={rug.id}
                className="group bg-linen border border-craftBorder overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-luxury-elevated"
              >
                <div className="relative h-80 sm:h-96 overflow-hidden bg-alabaster">
                  <img
                    src={rug.image}
                    alt={rug.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Micro-badge overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-alabaster/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-obsidian/80 border border-craftBorder">
                      {rug.technique.replace("-", " ")}
                    </span>
                  </div>

                  {/* 3D Inspect Action Hover Overlay */}
                  <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                    <button
                      onClick={() => onSelectProductFor3D(rug)}
                      className="bg-alabaster text-obsidian px-5 py-3 text-xs font-mono tracking-widest uppercase flex items-center space-x-2 hover:bg-terracotta hover:text-white transition-colors shadow-luxury-soft"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inspect in 3D WebGL</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start text-xs font-mono text-terracotta uppercase mb-1">
                      <span>{rug.collection.replace("-", " ")}</span>
                      <span>{rug.pileHeight}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-obsidian uppercase">
                      {rug.name}
                    </h3>
                    <p className="text-xs text-obsidian/70 font-light mt-1">
                      {rug.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-craftBorder flex items-center justify-between text-xs font-mono">
                    <span className="text-obsidian/60">{rug.fiber.replace("-", " ")}</span>
                    <button
                      onClick={() => onSelectProductFor3D(rug)}
                      className="flex items-center space-x-1 text-obsidian font-semibold hover:text-terracotta transition-colors"
                    >
                      <span>Custom Spec</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Editorial Moodboard: Asymmetric cc-tapis Layout */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {filtered.map((rug, idx) => {
              const spanClass =
                idx % 3 === 0
                  ? "md:col-span-7 h-[460px]"
                  : idx % 3 === 1
                  ? "md:col-span-5 h-[400px]"
                  : "md:col-span-12 h-[420px]";
              return (
                <div
                  key={rug.id}
                  className={`group relative overflow-hidden border border-craftBorder shadow-luxury-soft bg-linen ${spanClass}`}
                >
                  <img
                    src={rug.image}
                    alt={rug.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-transparent flex flex-col justify-end p-8">
                    <div className="flex items-center space-x-3 text-alabaster/80 font-mono text-[10px] tracking-widest uppercase mb-1">
                      <span>{rug.technique}</span>
                      <span>•</span>
                      <span>{rug.collection}</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-alabaster uppercase mb-2">
                      {rug.name}
                    </h3>
                    <p className="text-sm text-alabaster/80 font-light max-w-xl mb-4 line-clamp-2">
                      {rug.tagline}
                    </p>
                    <div>
                      <button
                        onClick={() => onSelectProductFor3D(rug)}
                        className="inline-flex items-center space-x-2 bg-alabaster text-obsidian px-5 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-terracotta hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect in 3D Loom</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionsGallery;
