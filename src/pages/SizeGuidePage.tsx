import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RoomSizeVisualizer } from "../components/RoomSizeVisualizer";
import { ArrowLeft, MessageCircle } from "lucide-react";

export const SizeGuidePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-alabaster min-h-screen">
      {/* Sub-page Editorial Breadcrumb Banner */}
      <div className="bg-linen border-b border-craftBorder py-8 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-obsidian/60 mb-6">
            <Link to="/" className="hover:text-terracotta transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-obsidian font-semibold">Architectural Specification</span>
            <span>/</span>
            <span className="text-terracotta">Room Size & Placement Visualizer</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="h-[1px] w-8 bg-terracotta" />
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
                  Interior Proportions & Clearance
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
                RUG SIZE & PLACEMENT. <br />
                <span className="italic font-light text-terracotta">ARCHITECTURAL HARMONY.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-3 text-xs text-obsidian/80 font-sans leading-relaxed">
              <p>
                A well-proportioned rug establishes spatial gravity and acoustic intimacy. Use our interactive 1:25 scale floorplans to preview furniture boundaries and perimeter perimeter setbacks.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20have%20custom%20room%20dimensions%20and%20need%20advice%20on%20the%20ideal%20rug%20scale."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Send Floorplan on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer Component */}
      <RoomSizeVisualizer onSelectSizeFilter={() => navigate("/collections")} />

      {/* Quick Dimension Cheat Sheet */}
      <div className="py-16 px-6 sm:px-12 md:px-24 bg-white border-b border-craftBorder">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-serif text-2xl text-obsidian uppercase tracking-tight mb-8">
            Standard Architectural Scales & Conversions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 border border-craftBorder bg-alabaster">
              <div className="font-mono text-xs text-terracotta uppercase tracking-wider mb-1">Accent & Entry</div>
              <div className="font-serif text-xl text-obsidian font-semibold">5 × 8 ft</div>
              <div className="text-xs text-obsidian/70 font-mono mt-1">150 × 240 cm</div>
              <p className="text-xs text-obsidian/80 mt-3">Ideal for cozy conversation nooks, under floating coffee tables, or executive home studies.</p>
            </div>
            <div className="p-6 border border-craftBorder bg-alabaster">
              <div className="font-mono text-xs text-terracotta uppercase tracking-wider mb-1">Standard Living</div>
              <div className="font-serif text-xl text-obsidian font-semibold">8 × 10 ft</div>
              <div className="text-xs text-obsidian/70 font-mono mt-1">240 × 300 cm</div>
              <p className="text-xs text-obsidian/80 mt-3">Our most requested size worldwide. Anchors 3-seater sofas with front legs on the rug.</p>
            </div>
            <div className="p-6 border border-craftBorder bg-alabaster">
              <div className="font-mono text-xs text-terracotta uppercase tracking-wider mb-1">Grand Salon & Dining</div>
              <div className="font-serif text-xl text-obsidian font-semibold">9 × 12 ft</div>
              <div className="text-xs text-obsidian/70 font-mono mt-1">270 × 360 cm</div>
              <p className="text-xs text-obsidian/80 mt-3">Accommodates 8-seater dining suites with chair pullback clearance, or all living legs on.</p>
            </div>
            <div className="p-6 border border-craftBorder bg-alabaster">
              <div className="font-mono text-xs text-terracotta uppercase tracking-wider mb-1">Palatial Residence</div>
              <div className="font-serif text-xl text-obsidian font-semibold">10 × 14 ft +</div>
              <div className="text-xs text-obsidian/70 font-mono mt-1">300 × 420 cm +</div>
              <p className="text-xs text-obsidian/80 mt-3">Bespoke upright looms custom-warped in Bhadohi for multi-seating open-concept estates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
