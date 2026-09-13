import React, { useState, useMemo } from "react";
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
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useShop } from "../context/ShopContext";

export interface RugProduct {
  id: string;
  name: string;
  collection: RugCollection;
  technique: WeavingTechnique;
  fiber: FiberMaterial;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  basePriceINR: number;
  standardSizes: string[];
  knotCount: string;
  pileHeight: string;
  roomCategory: "Living Room" | "Bedroom" | "Dining Room" | "Corridor / Runner" | "Outdoor";
  styleCategory: "Modern" | "Minimalist" | "Transitional" | "Traditional" | "Bohemian";
  tagline: string;
  image: string;
  flatlayImage: string;
  isNew?: boolean;
  isBestseller?: boolean;
  artisanName?: string;
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
    basePriceINR: 85000,
    standardSizes: ["5×8 ft", "8×10 ft", "9×12 ft", "Custom"],
    knotCount: "Multi-level cut & loop clusters",
    pileHeight: "14mm / 8mm Carved",
    roomCategory: "Living Room",
    styleCategory: "Modern",
    tagline: "Bold architectural contour with hand-sheared relief borders.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    isBestseller: true,
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
    basePriceINR: 125000,
    standardSizes: ["6×9 ft", "8×10 ft", "10×14 ft"],
    knotCount: "140 Knots / Sq. Inch",
    pileHeight: "10mm Uniform",
    roomCategory: "Living Room",
    styleCategory: "Minimalist",
    tagline: "High-contrast Milanese geometry woven with lustrous bamboo silk.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    isNew: true,
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
    basePriceINR: 98000,
    standardSizes: ["8×10 ft", "9×12 ft", "Organic Contour"],
    knotCount: "High-density sculpted loop",
    pileHeight: "18mm Sculpted High-Low",
    roomCategory: "Bedroom",
    styleCategory: "Minimalist",
    tagline: "Organic contours inspired by dry riverbeds of Uttar Pradesh.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    isBestseller: true,
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
    basePriceINR: 148000,
    standardSizes: ["8×10 ft", "9×12 ft", "12×15 ft"],
    knotCount: "160 Knots / Sq. Inch",
    pileHeight: "9mm Velveteen",
    roomCategory: "Dining Room",
    styleCategory: "Traditional",
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
    basePriceINR: 64000,
    standardSizes: ["5×8 ft", "8×10 ft", "9×12 ft", "Custom Runner"],
    knotCount: "Tight Flatloom Weft Interlock",
    pileHeight: "6mm Low-Profile Rib",
    roomCategory: "Bedroom",
    styleCategory: "Transitional",
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
    basePriceINR: 72000,
    standardSizes: ["6×9 ft", "8×10 ft", "9×12 ft"],
    knotCount: "Shuttle Loom Flatweave",
    pileHeight: "5mm Natural Texture",
    roomCategory: "Living Room",
    styleCategory: "Minimalist",
    tagline: "Deep indigo vat dip-dye creating moody transitions for calm sanctuaries.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    isNew: true,
  },
  {
    id: "mt-01",
    name: "Atlas Moroccan Diamond Trellis",
    collection: "moroccan-trellis",
    technique: "hand-loom",
    fiber: "pure-wool",
    primaryColor: "#2A2725", // Deep Charcoal
    secondaryColor: "#EFECE6", // Raw Off-White
    accentColor: "#C87D55",
    basePriceINR: 58000,
    standardSizes: ["5×8 ft", "8×10 ft", "9×12 ft", "Runner 2.5×10 ft"],
    knotCount: "High-density looped ribbing",
    pileHeight: "8mm Flatweave Relief",
    roomCategory: "Corridor / Runner",
    styleCategory: "Bohemian",
    tagline: "Generational Moroccan diamond geometry hand-loomed with natural undyed wool.",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    isBestseller: true,
  },
  {
    id: "sn-03",
    name: "Linear Cut-and-Loop Relief",
    collection: "sculpted-naturals",
    technique: "hand-tufted",
    fiber: "pure-wool",
    primaryColor: "#DDD7CD",
    secondaryColor: "#4B443F",
    accentColor: "#C87D55",
    basePriceINR: 88000,
    standardSizes: ["6×9 ft", "8×10 ft", "9×12 ft"],
    knotCount: "Alternating High-Low Rows",
    pileHeight: "16mm Raised Bars",
    roomCategory: "Living Room",
    styleCategory: "Minimalist",
    tagline: "Horizontal tactile rhythm of raised cut wool and sunken loop rows.",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hd-01",
    name: "Plaid Tartan Check Dhurrie",
    collection: "heritage-dhurrie",
    technique: "flatweave-dhurrie",
    fiber: "pure-wool",
    primaryColor: "#4E5762",
    secondaryColor: "#EAE6DF",
    accentColor: "#A86438",
    basePriceINR: 42000,
    standardSizes: ["4×6 ft", "5×8 ft", "6×9 ft", "8×10 ft"],
    knotCount: "Traditional Pit Loom Flatweave",
    pileHeight: "4mm Reversible Dhurrie",
    roomCategory: "Dining Room",
    styleCategory: "Transitional",
    tagline: "Authentic double-sided Indian cotton & wool dhurrie with architectural gridlines.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mg-03",
    name: "Bauhaus Circular Geometric Block",
    collection: "modern-geometric",
    technique: "hand-tufted",
    fiber: "wool-bamboo-silk",
    primaryColor: "#2B2623",
    secondaryColor: "#EAE6DF",
    accentColor: "#8E9A82",
    basePriceINR: 96000,
    standardSizes: ["6×9 ft", "8×10 ft", "10×14 ft"],
    knotCount: "Multi-level Cut & Loop",
    pileHeight: "12mm Carved",
    roomCategory: "Living Room",
    styleCategory: "Modern",
    tagline: "Playful interplay of circles, squares, and tonal architectural shading.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    isNew: true,
  },
  {
    id: "mc-01",
    name: "Manchaha: Cobalt & Ochre Expression",
    collection: "manchaha-artisan",
    technique: "hand-knotted",
    fiber: "silk-blend",
    primaryColor: "#C98E3A",
    secondaryColor: "#1B3B6F",
    accentColor: "#DDD7CD",
    basePriceINR: 165000,
    standardSizes: ["6×9 ft (One of a Kind)"],
    knotCount: "180 Knots / Sq. Inch",
    pileHeight: "8mm Velveteen",
    roomCategory: "Living Room",
    styleCategory: "Modern",
    artisanName: "Kailash Devi (Bhadohi)",
    tagline: "One-of-a-kind art carpet designed intuitively by the weaver using surplus spun silk.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    isBestseller: true,
  },
  {
    id: "sn-04",
    name: "Speckled Stippled Sandstone",
    collection: "sculpted-naturals",
    technique: "hand-loom",
    fiber: "pure-wool",
    primaryColor: "#3D3732",
    secondaryColor: "#EDE7DC",
    accentColor: "#A86438",
    basePriceINR: 76000,
    standardSizes: ["5×8 ft", "8×10 ft", "9×12 ft", "10×14 ft"],
    knotCount: "Fine Shuttle Interlock",
    pileHeight: "6mm Micro-grain",
    roomCategory: "Bedroom",
    styleCategory: "Minimalist",
    tagline: "Organic flecks of mineral-washed wool creating quiet acoustic warmth.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    flatlayImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
  },
];

interface CollectionsGalleryProps {
  onSelectProductFor3D: (product: RugProduct) => void;
}

export const CollectionsGallery: React.FC<CollectionsGalleryProps> = ({
  onSelectProductFor3D,
}) => {
  const { formatPrice, addToCart, toggleWishlist, isInWishlist } = useShop();

  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [activeTechnique, setActiveTechnique] = useState<string>("all");
  const [activeRoom, setActiveRoom] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [layoutMode, setLayoutMode] = useState<"grid" | "moodboard">("grid");

  const filtered = useMemo(() => {
    return CATALOG_PRODUCTS.filter((item) => {
      const matchCollection = activeCollection === "all" || item.collection === activeCollection;
      const matchTechnique = activeTechnique === "all" || item.technique === activeTechnique;
      const matchRoom = activeRoom === "all" || item.roomCategory === activeRoom;
      return matchCollection && matchTechnique && matchRoom;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.basePriceINR - b.basePriceINR;
      if (sortBy === "price-high") return b.basePriceINR - a.basePriceINR;
      if (sortBy === "bestseller") return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0; // featured default
    });
  }, [activeCollection, activeTechnique, activeRoom, sortBy]);

  return (
    <section id="collections" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-alabaster border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            The Curated Catalog & Collections
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Crafted For <br />
              <span className="italic font-light text-terracotta">Every Space & Scale.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              From Moroccan diamond trellis and textured natural ribs to bold Bauhaus geometries and one-of-a-kind
              Manchaha weaver masterworks — explore our complete handmade portfolio.
            </p>
          </div>
        </div>

        {/* Filter & Layout Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-y border-craftBorder font-mono text-xs">
          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-obsidian/40 uppercase tracking-wider mr-2 hidden sm:inline">
              Collection:
            </span>
            {[
              { id: "all", label: "All Curations" },
              { id: "modern-geometric", label: "Modern Geometric" },
              { id: "sculpted-naturals", label: "Sculpted Naturals" },
              { id: "soft-ombre", label: "Soft Ombre" },
              { id: "moroccan-trellis", label: "Moroccan Trellis" },
              { id: "heritage-dhurrie", label: "Heritage Dhurrie" },
              { id: "manchaha-artisan", label: "Manchaha" },
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

          {/* Faceted Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Room Filter */}
            <select
              value={activeRoom}
              onChange={(e) => setActiveRoom(e.target.value)}
              className="bg-alabaster border border-craftBorder px-3 py-1.5 text-xs font-mono uppercase text-obsidian focus:outline-none focus:border-obsidian"
            >
              <option value="all">All Rooms</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Dining Room">Dining Room</option>
              <option value="Corridor / Runner">Runner / Corridor</option>
            </select>

            {/* Technique Filter */}
            <select
              value={activeTechnique}
              onChange={(e) => setActiveTechnique(e.target.value)}
              className="bg-alabaster border border-craftBorder px-3 py-1.5 text-xs font-mono uppercase text-obsidian focus:outline-none focus:border-obsidian"
            >
              <option value="all">All Techniques</option>
              <option value="hand-knotted">Hand-Knotted</option>
              <option value="hand-tufted">Hand-Tufted</option>
              <option value="hand-loom">Hand-Loom</option>
              <option value="flatweave-dhurrie">Flatweave / Dhurrie</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-alabaster border border-craftBorder px-3 py-1.5 text-xs font-mono uppercase text-obsidian focus:outline-none focus:border-obsidian"
            >
              <option value="featured">Sort: Featured</option>
              <option value="bestseller">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Grid vs Moodboard Toggle */}
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

        {/* Showing Count */}
        <div className="flex justify-between items-center text-xs font-mono text-obsidian/60 mb-6">
          <span>Displaying {filtered.length} authentic handcrafted carpets</span>
          <span className="hidden sm:inline">100% Artisan Guaranteed • Bhadohi, India</span>
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

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                    <span className="bg-alabaster/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase text-obsidian/80 border border-craftBorder">
                      {rug.technique.replace("-", " ")}
                    </span>
                    {rug.isNew && (
                      <span className="bg-terracotta text-white px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase">
                        New Arrival
                      </span>
                    )}
                    {rug.isBestseller && (
                      <span className="bg-obsidian text-alabaster px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(rug)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-alabaster/90 backdrop-blur-md border border-craftBorder flex items-center justify-center text-obsidian hover:text-terracotta transition-colors shadow-sm"
                    title="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(rug.id) ? "fill-terracotta text-terracotta" : ""
                      }`}
                    />
                  </button>

                  {/* 3D Inspect & Quick Add Action Hover Overlay */}
                  <div className="absolute inset-0 bg-obsidian/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-3">
                    <button
                      onClick={() => onSelectProductFor3D(rug)}
                      className="w-full max-w-[220px] bg-alabaster text-obsidian px-4 py-3 text-xs font-mono tracking-widest uppercase flex items-center justify-center space-x-2 hover:bg-terracotta hover:text-white transition-colors shadow-luxury-soft"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Inspect in 3D WebGL</span>
                    </button>

                    <button
                      onClick={() =>
                        addToCart({
                          id: `${rug.id}-8x10`,
                          product: rug,
                          size: "8×10 ft",
                          widthFt: 8,
                          lengthFt: 10,
                          fiber: rug.fiber,
                          primaryColor: rug.primaryColor,
                          price: rug.basePriceINR,
                        })
                      }
                      className="w-full max-w-[220px] bg-obsidian text-alabaster border border-white/40 px-4 py-2.5 text-xs font-mono tracking-widest uppercase flex items-center justify-center space-x-2 hover:bg-white hover:text-obsidian transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Quick Add to Bag</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start text-xs font-mono text-terracotta uppercase mb-1">
                      <span>{rug.collection.replace("-", " ")}</span>
                      <span className="font-semibold text-obsidian text-sm">
                        {formatPrice(rug.basePriceINR)}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-obsidian uppercase">
                      {rug.name}
                    </h3>
                    {rug.artisanName && (
                      <span className="text-[11px] font-mono text-obsidian/60 block mt-0.5">
                        Artisan: <span className="font-semibold text-obsidian">{rug.artisanName}</span>
                      </span>
                    )}
                    <p className="text-xs text-obsidian/70 font-light mt-1 line-clamp-2">
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
                      <span>•</span>
                      <span className="text-terracotta font-semibold">{formatPrice(rug.basePriceINR)}</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-alabaster uppercase mb-2">
                      {rug.name}
                    </h3>
                    <p className="text-sm text-alabaster/80 font-light max-w-xl mb-4 line-clamp-2">
                      {rug.tagline}
                    </p>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onSelectProductFor3D(rug)}
                        className="inline-flex items-center space-x-2 bg-alabaster text-obsidian px-5 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-terracotta hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect in 3D Loom</span>
                      </button>
                      <button
                        onClick={() =>
                          addToCart({
                            id: `${rug.id}-8x10`,
                            product: rug,
                            size: "8×10 ft",
                            widthFt: 8,
                            lengthFt: 10,
                            fiber: rug.fiber,
                            primaryColor: rug.primaryColor,
                            price: rug.basePriceINR,
                          })
                        }
                        className="inline-flex items-center space-x-2 border border-white/60 text-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-white hover:text-obsidian transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
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
