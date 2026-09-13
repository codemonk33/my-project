import React, { useState } from "react";
import type { WeavingTechnique } from "../utils/rugTextureEngine";
import { Check, Sliders } from "lucide-react";

interface TechniqueInfo {
  id: WeavingTechnique;
  title: string;
  subtitle: string;
  philosophy: string;
  pileDepth: string;
  knotDensity: string;
  durability: string;
  leadTime: string;
  bestFor: string[];
  image: string;
  detailImage: string;
}

const TECHNIQUES: TechniqueInfo[] = [
  {
    id: "hand-knotted",
    title: "Hand-Knotted",
    subtitle: "Individual knots tied by hand. Lasting character.",
    philosophy:
      "The pinnacle of carpet weaving. Every single knot is individually hand-tied onto a vertical cotton warp. It creates an intricate, painterly surface that softens with time and endures across centuries as a collectible heirloom.",
    pileDepth: "8mm – 12mm Uniform",
    knotDensity: "100 – 180 Knots / Sq. Inch",
    durability: "Heirloom (100+ Years)",
    leadTime: "12 – 24 Weeks",
    bestFor: [
      "Master living salons & grand estates",
      "Collector residences & gallery spaces",
      "Intricate painterly & abstract gradients",
    ],
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    detailImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hand-tufted",
    title: "Hand-Tufted",
    subtitle: "Design freedom. Dimensional shapes & sculpted textures.",
    philosophy:
      "Crafted by shooting yarn strands into a stretched primary cloth backing using a handheld tool, followed by hand-scissor relief carving. Allows limitless shape contours, multi-level cut-and-loop pile depths, bold floral botanicals, and high-impact graphic checkerboards.",
    pileDepth: "12mm – 18mm Multi-Level Carved",
    knotDensity: "Dense Cut & Loop Clusters",
    durability: "High Residential & Hospitality (15–25 Years)",
    leadTime: "6 – 10 Weeks",
    bestFor: [
      "Sculpted organic rugs & non-rectangular shapes",
      "Luxury hotel suites & executive lounges",
      "Multi-dimensional tactile relief motifs",
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    detailImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hand-loom",
    title: "Hand-Woven / Loom",
    subtitle: "Simple construction. Versatile feel & relaxed character.",
    philosophy:
      "Woven on traditional wooden shuttle looms by interlacing horizontal weft yarns over longitudinal warp threads. Produces clean flatweave or low-profile ribbed surfaces, natural textured striations, earthy tones, and soothing ombre gradations.",
    pileDepth: "4mm – 7mm Low-Profile Ribbed",
    knotDensity: "Warp & Weft Interlock (Flatweave)",
    durability: "Heavy Commercial & Residential (20+ Years)",
    leadTime: "4 – 8 Weeks",
    bestFor: [
      "Modern minimalist bedrooms & dining spaces",
      "High-traffic corridors & outdoor transitions",
      "Geometric striations & calm ombre gradations",
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    detailImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
  },
];

interface TechniquePortalsProps {
  onSelectTechniqueForConfigurator: (tech: WeavingTechnique) => void;
}

export const TechniquePortals: React.FC<TechniquePortalsProps> = ({
  onSelectTechniqueForConfigurator,
}) => {
  const [activeTechId, setActiveTechId] = useState<WeavingTechnique>("hand-tufted");
  const current = TECHNIQUES.find((t) => t.id === activeTechId) || TECHNIQUES[0];

  return (
    <section id="techniques" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-alabaster border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            Weaving Divisions
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Three Distinct Divisions. <br />
              <span className="italic font-light text-terracotta">Infinite Tactile Expressions.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              Explore our documented manufacturing divisions in Bhadohi. Each method commands its own
              architectural texture, pile height, and tactile shadow profile.
            </p>
          </div>
        </div>

        {/* Technique Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {TECHNIQUES.map((tech) => {
            const isSelected = tech.id === activeTechId;
            return (
              <button
                key={tech.id}
                onClick={() => setActiveTechId(tech.id)}
                className={`p-6 text-left border transition-all relative ${
                  isSelected
                    ? "bg-linen border-obsidian shadow-luxury-soft"
                    : "bg-alabaster border-craftBorder hover:border-obsidian/60"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs text-terracotta uppercase tracking-wider">
                    {tech.pileDepth}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                  )}
                </div>
                <h3 className="font-serif text-2xl text-obsidian uppercase mb-1">
                  {tech.title}
                </h3>
                <p className="font-mono text-xs text-obsidian/60 line-clamp-1">
                  {tech.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Technique Editorial Spread */}
        <div className="bg-linen border border-craftBorder p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-luxury-soft">
          {/* Left: Technique Narrative & Architectural Spec Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-terracotta">
                Architectural Technique Spec
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-obsidian uppercase">
                {current.title}
              </h3>
              <p className="font-serif italic text-base text-obsidian/85">
                "{current.subtitle}"
              </p>
            </div>

            <p className="text-base text-obsidian/75 font-light leading-relaxed">
              {current.philosophy}
            </p>

            {/* Micro Metrics Table */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-craftBorder font-mono text-xs">
              <div>
                <span className="text-obsidian/50 block text-[10px] uppercase">Pile Height</span>
                <span className="font-semibold text-obsidian">{current.pileDepth}</span>
              </div>
              <div>
                <span className="text-obsidian/50 block text-[10px] uppercase">Knot Metric</span>
                <span className="font-semibold text-obsidian">{current.knotDensity}</span>
              </div>
              <div>
                <span className="text-obsidian/50 block text-[10px] uppercase">Durability Rating</span>
                <span className="font-semibold text-obsidian">{current.durability}</span>
              </div>
              <div>
                <span className="text-obsidian/50 block text-[10px] uppercase">Standard Lead Time</span>
                <span className="font-semibold text-obsidian">{current.leadTime}</span>
              </div>
            </div>

            {/* Best Architectural Applications */}
            <div className="space-y-2">
              <span className="block font-mono text-[10px] tracking-widest uppercase text-obsidian/50">
                Recommended Architectural Environments:
              </span>
              <ul className="space-y-1.5">
                {current.bestFor.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs font-mono text-obsidian/80">
                    <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onSelectTechniqueForConfigurator(current.id)}
                className="inline-flex items-center space-x-2 bg-obsidian text-alabaster px-6 py-3 text-xs font-mono tracking-widest uppercase hover:bg-terracotta transition-colors shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure {current.title} in 3D</span>
              </button>
            </div>
          </div>

          {/* Right: Dual Editorial Imagery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative h-80 overflow-hidden border border-craftBorder shadow-sm">
              <img
                src={current.image}
                alt={`${current.title} Room Perspective`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent flex items-end p-4">
                <span className="font-mono text-[10px] tracking-wider text-alabaster uppercase">
                  Room Setting
                </span>
              </div>
            </div>

            <div className="relative h-80 overflow-hidden border border-craftBorder shadow-sm">
              <img
                src={current.detailImage}
                alt={`${current.title} Craftsmanship Detail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent flex items-end p-4">
                <span className="font-mono text-[10px] tracking-wider text-alabaster uppercase">
                  Loom Macro Texture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechniquePortals;
