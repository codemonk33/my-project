import React from "react";
import { MapPin } from "lucide-react";

export const BrandStory: React.FC = () => {
  return (
    <section id="heritage" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-alabaster border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            Our Story & Provenance
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              More Than A Rug Company <br />
              <span className="italic font-light text-terracotta">A Family of Craftspeople</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-obsidian/75 font-light leading-relaxed">
              With more than 25 years of experience, Naman Rugs & Carpets brings together traditional Indian
              craftsmanship and contemporary global design. Rooted in Bhadohi — the historic carpet capital
              of the world — we shape unhurried heirloom rugs for international designers, boutique hotels,
              and private residences.
            </p>
          </div>
        </div>

        {/* Editorial Asymmetric Image & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Philosophical Quote & Statistics */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="bg-linen p-8 sm:p-10 border border-craftBorder relative shadow-luxury-soft">
              <span className="font-serif text-6xl text-terracotta/20 absolute top-4 left-6 leading-none">“</span>
              <p className="font-serif text-lg sm:text-xl text-obsidian/90 italic leading-relaxed relative z-10 pt-2">
                Behind every carpet is a person — a weaver, a dyer, a finisher — who gives it character. 
                We believe a rug should be made with care, not just manufactured, so that it lasts for generations.
              </p>
              <div className="mt-6 pt-4 border-t border-craftBorder/60 flex items-center justify-between font-mono text-xs">
                <span className="font-semibold text-obsidian">NAMAN DUBEY</span>
                <span className="text-obsidian/60 uppercase">Studio Principal, Bhadohi</span>
              </div>
            </div>

            {/* Documented Metrics */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-2 border-terracotta pl-5">
                <span className="block font-serif text-4xl sm:text-5xl text-obsidian font-normal">25+</span>
                <span className="font-mono text-xs tracking-wider uppercase text-obsidian/60">
                  Years of Unhurried Craft
                </span>
              </div>
              <div className="border-l-2 border-terracotta pl-5">
                <span className="block font-serif text-4xl sm:text-5xl text-obsidian font-normal">100%</span>
                <span className="font-mono text-xs tracking-wider uppercase text-obsidian/60">
                  Artisan Handmade in India
                </span>
              </div>
            </div>

            <div className="p-4 bg-alabaster border border-craftBorder flex items-center space-x-3 text-xs font-mono text-obsidian/80">
              <MapPin className="w-4 h-4 text-terracotta flex-shrink-0" />
              <span>Bhadohi, India — Where generations of carpet makers turn raw yarn into living art.</span>
            </div>
          </div>

          {/* Right Column: High-Resolution Authentic Workshop Triptych */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2">
            <div className="sm:col-span-2 relative h-72 sm:h-80 bg-linen overflow-hidden border border-craftBorder group shadow-luxury-soft">
              <img
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
                alt="Artisan weaver hand knotting luxury carpet at loom"
                className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent flex flex-col justify-end p-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-alabaster/70">
                  Loom Drafting & Tensioning
                </span>
                <h3 className="font-serif text-xl text-alabaster font-normal">
                  The Master Weaver’s Cadence
                </h3>
              </div>
            </div>

            <div className="relative h-60 bg-linen overflow-hidden border border-craftBorder group shadow-luxury-soft">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Natural dyed wool yarns and botanical fibers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-alabaster/70">
                  Raw Fiber Curation
                </span>
                <p className="font-serif text-sm text-alabaster">
                  Pure NZ Wool & Bamboo Silk Poms
                </p>
              </div>
            </div>

            <div className="relative h-60 bg-linen overflow-hidden border border-craftBorder group shadow-luxury-soft">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                alt="Washing and hand finishing handmade carpet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="font-mono text-[9px] tracking-widest uppercase text-alabaster/70">
                  Relief Shear & Hand Finishing
                </span>
                <p className="font-serif text-sm text-alabaster">
                  Dimensional Pile Depth Carving
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
