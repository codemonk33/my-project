import React, { useState } from "react";
import { Sparkles, Heart, Eye } from "lucide-react";
import { useShop } from "../context/ShopContext";
import type { RugProduct } from "./CollectionsGallery";
import { CATALOG_PRODUCTS } from "./CollectionsGallery";

interface ManchahaArtisanGalleryProps {
  onSelectProductFor3D: (product: RugProduct) => void;
}

interface ArtisanStory {
  name: string;
  village: string;
  experience: string;
  rugName: string;
  rugId: string;
  story: string;
  portrait: string;
  rugImage: string;
  priceINR: number;
}

const ARTISANS: ArtisanStory[] = [
  {
    name: "Kailash Devi",
    village: "Maryadpatti, Bhadohi",
    experience: "22 Years at the Loom",
    rugName: "Cobalt & Ochre Expression",
    rugId: "mc-01",
    story:
      "“I didn’t use a graph sheet or designer sketch for this rug. I took the leftover cobalt blue yarn from the temple carpet order and paired it with warm raw ochre wool. As the loom turned, I wove the memory of monsoon clouds meeting the sunlit mustard fields of Bhadohi.”",
    portrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    rugImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    priceINR: 165000,
  },
  {
    name: "Ram Lakhan",
    village: "Carpet City Loom Guild, Bhadohi",
    experience: "31 Years of Hand Knotting",
    rugName: "Riverbed Whispers",
    rugId: "sn-01",
    story:
      "“When you tie 150 knots every minute, the rhythm becomes your breathing. This carpet holds the rippling textures of the Varuna riverbanks where my father first taught me the Tibetan knot fifty years ago.”",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    rugImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    priceINR: 98000,
  },
  {
    name: "Meera & Sanju",
    village: "Gopiganj Loom Atelier, Bhadohi",
    experience: "Mother & Daughter Weaver Duo",
    rugName: "Checkerboard Harmony",
    rugId: "mg-02",
    story:
      "“We wove from opposite sides of the 12-foot loom. As we worked towards the center over 14 weeks, we wove our daily laughter, wedding songs, and stories into every alternating block of black and ivory silk.”",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    rugImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    priceINR: 125000,
  },
];

export const ManchahaArtisanGallery: React.FC<ManchahaArtisanGalleryProps> = ({
  onSelectProductFor3D,
}) => {
  const { formatPrice, addToCart } = useShop();
  const [activeArtisanIdx, setActiveArtisanIdx] = useState<number>(0);
  const artisan = ARTISANS[activeArtisanIdx];

  const matchedProduct =
    CATALOG_PRODUCTS.find((p) => p.id === artisan.rugId) || CATALOG_PRODUCTS[0];

  return (
    <section id="manchaha" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-alabaster border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            The Weaver’s Canvas (Manchaha)
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Manchaha: <br />
              <span className="italic font-light text-terracotta">From The Heart of The Weaver.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              No blueprints. No client restrictions. We empower our Bhadohi weavers with surplus silk and wool
              to weave their personal dreams directly into one-of-a-kind museum collectibles.
            </p>
          </div>
        </div>

        {/* Artisan Story Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 border-b border-craftBorder no-scrollbar">
          {ARTISANS.map((item, idx) => {
            const isSelected = idx === activeArtisanIdx;
            return (
              <button
                key={item.name}
                onClick={() => setActiveArtisanIdx(idx)}
                className={`flex-shrink-0 flex items-center space-x-3 p-3 border transition-all text-left ${
                  isSelected
                    ? "bg-linen border-obsidian shadow-sm"
                    : "bg-alabaster text-obsidian/70 border-craftBorder hover:border-obsidian"
                }`}
              >
                <img
                  src={item.portrait}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-craftBorder"
                />
                <div>
                  <span className="block font-serif text-sm text-obsidian uppercase font-semibold">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-terracotta">{item.village}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Artisan Spotlight Spread */}
        <div className="bg-linen p-8 sm:p-12 border border-craftBorder shadow-luxury-soft grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Artisan Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={artisan.portrait}
                alt={artisan.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-terracotta/40 shadow-sm"
              />
              <div>
                <span className="font-mono text-xs text-terracotta uppercase tracking-wider block">
                  Master Artisan & Designer
                </span>
                <h3 className="font-serif text-3xl text-obsidian uppercase">
                  {artisan.name}
                </h3>
                <span className="font-mono text-xs text-obsidian/60">
                  {artisan.experience} • {artisan.village}
                </span>
              </div>
            </div>

            <div className="bg-alabaster p-6 border border-craftBorder relative">
              <span className="font-serif text-5xl text-terracotta/20 absolute top-2 left-4 leading-none">“</span>
              <p className="font-serif italic text-base sm:text-lg text-obsidian/90 leading-relaxed pt-2">
                {artisan.story}
              </p>
            </div>

            <div className="flex items-center justify-between font-mono text-xs border-y border-craftBorder py-3">
              <div>
                <span className="text-obsidian/50 block text-[10px] uppercase">Piece Name</span>
                <span className="font-semibold text-obsidian">{artisan.rugName}</span>
              </div>
              <div className="text-right">
                <span className="text-obsidian/50 block text-[10px] uppercase">Artisan Valuation</span>
                <span className="font-semibold text-terracotta text-sm">
                  {formatPrice(artisan.priceINR)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onSelectProductFor3D(matchedProduct)}
                className="inline-flex items-center space-x-2 bg-obsidian text-alabaster px-6 py-3 text-xs font-mono tracking-widest uppercase hover:bg-terracotta transition-colors shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect in 3D Loom</span>
              </button>

              <button
                onClick={() =>
                  addToCart({
                    id: `${matchedProduct.id}-one-of-a-kind`,
                    product: matchedProduct,
                    size: "One of a Kind",
                    widthFt: 6,
                    lengthFt: 9,
                    fiber: matchedProduct.fiber,
                    primaryColor: matchedProduct.primaryColor,
                    price: artisan.priceINR,
                  })
                }
                className="inline-flex items-center space-x-2 border border-obsidian px-5 py-3 text-xs font-mono tracking-widest uppercase text-obsidian hover:bg-alabaster transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-terracotta" />
                <span>Collect This Piece</span>
              </button>
            </div>
          </div>

          {/* Right: Rug Masterwork Artwork Visual */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[480px] overflow-hidden border border-craftBorder shadow-luxury-elevated group">
            <img
              src={artisan.rugImage}
              alt={artisan.rugName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center space-x-2 text-terracotta font-mono text-xs uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Certified One of a Kind</span>
              </div>
              <h4 className="font-serif text-2xl text-alabaster uppercase">
                {artisan.rugName}
              </h4>
              <span className="font-mono text-xs text-alabaster/70">
                100% Hand-Knotted by {artisan.name} • Signed on Cotton Warp
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManchahaArtisanGallery;
