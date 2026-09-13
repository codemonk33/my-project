import React, { useState } from "react";
import {
  Compass,
  Palette,
  Shuffle,
  Scissors,
  Droplets,
  Sparkles,
  CheckCircle2,
  Package,
  Clock,
  Check,
} from "lucide-react";

interface ProcessStage {
  step: string;
  name: string;
  tagline: string;
  duration: string;
  description: string;
  technicalSpecs: string[];
  artisanRole: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGES: ProcessStage[] = [
  {
    step: "01",
    name: "Design & Planning",
    tagline: "Loom drafting & CAD pixel mapping",
    duration: "1–2 Weeks",
    description:
      "Every design begins as a high-resolution talim (knot-by-knot graph chart) or CAD matrix. We calculate warp thread density, knot coordinates, and color allocations to ensure the physical rug matches the architect's floorplan with millimeter fidelity.",
    technicalSpecs: ["1:1 Vector Weaver Talim Mapping", "Pantone & ARS Yarn Color Grading", "Loom Scale Ratio Calibration"],
    artisanRole: "Senior Loom Drafter & Design Archivist",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    icon: Compass,
  },
  {
    step: "02",
    name: "Yarn Selection & Dyeing",
    tagline: "Natural pot dyeing & fiber carding",
    duration: "10–14 Days",
    description:
      "We source mountain-grazed New Zealand wool for resilient crimp, paired with Chinese Mulberry silk or lustrous Bamboo silk. Yarns are carded and pot-dyed in small artisanal dye-vats using natural and eco-certified mineral pigments.",
    technicalSpecs: ["Pure NZ Wool & Botanical Viscose", "Herbal & Chrome-Free Mineral Pigments", "Hand-Sorted Color Poms"],
    artisanRole: "Master Dyer (Rangsaaz)",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    icon: Palette,
  },
  {
    step: "03",
    name: "Weaving & Knotting",
    tagline: "Slow rhythmic hands at the loom",
    duration: "8–24 Weeks",
    description:
      "Tensioning the vertical cotton warp on upright wooden looms, master weavers tie individual asymmetrical Tibetan or Persian knots, row by rhythmic row. Up to 400,000 knots per square meter tied purely by hand.",
    technicalSpecs: ["60 to 180 Knots Per Square Inch (KPSI)", "Hand-Operated Wooden Shuttle Looms", "Hand-Tufted Pneumatic Needle Insertion"],
    artisanRole: "Master Weavers & Knotters of Bhadohi",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80",
    icon: Shuffle,
  },
  {
    step: "04",
    name: "Trimming & Carving",
    tagline: "Hand shear relief sculpting",
    duration: "5–8 Days",
    description:
      "Once cut from the loom, the rug undergoes precise scissor carving. Skilled finishers hand-bevel transitions between design contours, creating tactile high-low depths, crisp dimensional borders, and architectural shadows.",
    technicalSpecs: ["Curved Artisan Hand Shears", "Multi-Level High-Low Pile Relief", "0.5mm Edge Bevel Precision"],
    artisanRole: "Relief Carving Specialist",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    icon: Scissors,
  },
  {
    step: "05",
    name: "Natural Washing",
    tagline: "Herbal baths & sun drying",
    duration: "4–6 Days",
    description:
      "Rugs are washed thoroughly with natural botanical conditioners and fresh ground water on stone slates, then brushed with wooden paddles to bring out fiber luster and remove excess surface wool, before slow sun-drying under Bhadohi skies.",
    technicalSpecs: ["Pure Softened Water Wash", "Sun-Drying in Natural Ambient Air", "Luster Enhancement Wash"],
    artisanRole: "Master Washer & Finisher",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    icon: Droplets,
  },
  {
    step: "06",
    name: "Finishing & Edge Serging",
    tagline: "Hand binding & fringe alignment",
    duration: "3–5 Days",
    description:
      "The perimeter edges are meticulously hand-bound with matching wool or linen thread (serging) to prevent fraying and ensure structural integrity. Fringes are hand-braided or tucked according to specification.",
    technicalSpecs: ["Hand-Whipped Edge Serging", "Cotton Twill Backing Binding", "End-Hem Lock Stitching"],
    artisanRole: "Hand Binding Craftsman",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    icon: Sparkles,
  },
  {
    step: "07",
    name: "Quality Check & Caliper True-Check",
    tagline: "1:1 knot density & rectangularity check",
    duration: "48 Hours",
    description:
      "Our inspection team examines every square inch under high-intensity grazing light. We verify rectangular squaring, diagonal caliper measurements, pile thickness uniformity, and color fastness before certification.",
    technicalSpecs: ["1:1 Knot Density Verification", "Diagonal Squareness True-Tolerance (<0.5%)", "Light-Grazing Color Fastness Audit"],
    artisanRole: "Quality Assurance Controller",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=80",
    icon: CheckCircle2,
  },
  {
    step: "08",
    name: "Packing & Global Export",
    tagline: "Climate-controlled international dispatch",
    duration: "Dispatched in 24h",
    description:
      "Rolled around moisture-absorbing rigid kraft cores, wrapped in heavy protective waterproof canvas, and crated for sea or air freight to design studios in Milan, Paris, New York, and Dubai.",
    technicalSpecs: ["Rigid Core Protective Rolling", "Double-Layer Waterproof Hermetic Wrap", "Air Freight & Sea Cargo Tracking"],
    artisanRole: "Global Logistics Coordinator",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    icon: Package,
  },
];

export const ProcessPipeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const stage = STAGES[activeStage];

  return (
    <section id="process" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-linen border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            The Authentic Lifecycle
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              A Rug Takes Time. <br />
              <span className="italic font-light text-terracotta">That Is Part of Its Beauty.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              Every step is carefully completed by generational artisans in Bhadohi to ensure the exact color, 
              tactile relief, structural longevity, and true dimensional finish.
            </p>
          </div>
        </div>

        {/* Stage Timeline Buttons */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-2 border-b border-craftBorder no-scrollbar">
          {STAGES.map((s, idx) => {
            const IconComponent = s.icon;
            const isActive = idx === activeStage;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStage(idx)}
                className={`flex-shrink-0 flex items-center space-x-3 px-4 py-3 border transition-all text-left ${
                  isActive
                    ? "bg-obsidian text-alabaster border-obsidian shadow-sm"
                    : "bg-alabaster/80 text-obsidian/70 border-craftBorder hover:border-obsidian"
                }`}
              >
                <span className={`font-mono text-xs ${isActive ? "text-terracotta" : "text-obsidian/40"}`}>
                  {s.step}
                </span>
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-terracotta" : "text-obsidian/50"}`} />
                <span className="font-mono text-xs uppercase tracking-wider whitespace-nowrap">
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-alabaster p-8 sm:p-12 border border-craftBorder shadow-luxury-soft">
          {/* Left: Stage Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-craftBorder pb-4">
              <div className="flex items-center space-x-3">
                <span className="font-serif text-4xl text-terracotta font-normal">{stage.step}</span>
                <div>
                  <h3 className="font-serif text-2xl text-obsidian uppercase">{stage.name}</h3>
                  <span className="font-mono text-[11px] text-obsidian/60 tracking-wider">
                    {stage.tagline}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 font-mono text-xs text-obsidian/60 bg-linen px-2.5 py-1 border border-craftBorder">
                <Clock className="w-3.5 h-3.5 text-terracotta" />
                <span>{stage.duration}</span>
              </div>
            </div>

            <p className="text-base text-obsidian/80 font-light leading-relaxed">
              {stage.description}
            </p>

            {/* Technical Specifications */}
            <div className="space-y-2 pt-2">
              <span className="block font-mono text-[10px] tracking-widest uppercase text-obsidian/50">
                Quality Criteria & Spec:
              </span>
              <ul className="space-y-1.5">
                {stage.technicalSpecs.map((spec, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs font-mono text-obsidian/80">
                    <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Artisan Role Badge */}
            <div className="pt-4 border-t border-craftBorder flex items-center justify-between font-mono text-xs">
              <span className="text-obsidian/60 uppercase">Crafted By:</span>
              <span className="font-semibold text-terracotta uppercase">{stage.artisanRole}</span>
            </div>
          </div>

          {/* Right: Stage Visual */}
          <div className="lg:col-span-6 relative h-80 sm:h-96 overflow-hidden border border-craftBorder shadow-luxury-soft group">
            <img
              src={stage.image}
              alt={stage.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-alabaster font-mono text-xs">
                <span className="text-terracotta uppercase block text-[10px] tracking-widest">
                  Workshop Archive
                </span>
                <span>Stage {stage.step} — Maryadpatti Facility, Bhadohi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessPipeline;
