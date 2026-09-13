import React, { useState } from "react";
import { Compass, Check, ArrowRight } from "lucide-react";

type RoomType = "living" | "dining" | "bedroom" | "runner";

interface PlacementRule {
  id: string;
  name: string;
  recommendedSize: string;
  metricSize: string;
  description: string;
  architecturalTip: string;
  diagramSvgType: string;
}

const ROOM_DATA: Record<RoomType, { label: string; rules: PlacementRule[] }> = {
  living: {
    label: "Living Room",
    rules: [
      {
        id: "all-legs-on",
        name: "All Furniture Legs On Rug",
        recommendedSize: "9 × 12 ft or 10 × 14 ft",
        metricSize: "270 × 360 cm / 300 × 420 cm",
        description:
          "Creates a unified conversation sanctuary in expansive living salons. Both front and back legs of sofas and armchairs rest comfortably on the rug.",
        architecturalTip: "Leave 12–18 inches (30–45 cm) of bare perimeter floor around the rug edges.",
        diagramSvgType: "all-on",
      },
      {
        id: "front-legs-on",
        name: "Front Legs Only On Rug (Most Popular)",
        recommendedSize: "8 × 10 ft",
        metricSize: "240 × 300 cm",
        description:
          "Connects seating together without overwhelming smaller rooms. Anchors the space while giving breathing room to walls.",
        architecturalTip: "Extend the rug 6–8 inches (15–20 cm) beyond both sides of the sofa.",
        diagramSvgType: "front-on",
      },
      {
        id: "coffee-table-only",
        name: "Floating Coffee Table Only",
        recommendedSize: "5 × 8 ft",
        metricSize: "150 × 240 cm",
        description:
          "Ideal for compact urban apartments and mid-century modern lounge configurations.",
        architecturalTip: "Ensure the rug is wider than the coffee table by at least 12 inches.",
        diagramSvgType: "table-only",
      },
    ],
  },
  dining: {
    label: "Dining Room",
    rules: [
      {
        id: "dining-8-seater",
        name: "8 to 10-Seater Grand Dining Table",
        recommendedSize: "9 × 12 ft or 10 × 14 ft",
        metricSize: "270 × 360 cm / 300 × 420 cm",
        description:
          "Allows all dining chairs to remain fully on the pile even when pushed back after guests are seated.",
        architecturalTip: "Add 24–30 inches (60–75 cm) beyond table edge on all 4 sides.",
        diagramSvgType: "dining-large",
      },
      {
        id: "dining-6-seater",
        name: "6-Seater Standard Dining Table",
        recommendedSize: "8 × 10 ft",
        metricSize: "240 × 300 cm",
        description:
          "Accommodates rectangular 6-person tables with effortless chair movement without catching hems.",
        architecturalTip: "Choose tight flatweave, hand-loom, or low-pile hand-knotted for seamless chair glide.",
        diagramSvgType: "dining-std",
      },
    ],
  },
  bedroom: {
    label: "Bedroom",
    rules: [
      {
        id: "bed-under-all",
        name: "King / Grand Master Suite Bed",
        recommendedSize: "9 × 12 ft or 10 × 14 ft",
        metricSize: "270 × 360 cm",
        description:
          "Encloses both the bed frame and both nightstands, offering soft warm wool underfoot as you wake.",
        architecturalTip: "Leave 24–36 inches (60–90 cm) of plush pile stepping room on either side of the mattress.",
        diagramSvgType: "bed-king",
      },
      {
        id: "bed-two-thirds",
        name: "Queen Bed (Lower Two-Thirds Placement)",
        recommendedSize: "8 × 10 ft",
        metricSize: "240 × 300 cm",
        description:
          "Slides horizontally underneath the bottom two-thirds of the bed, stopping just in front of nightstands.",
        architecturalTip: "Cost-effective architectural placement that keeps focus on floor visual weight.",
        diagramSvgType: "bed-queen",
      },
      {
        id: "bed-runners",
        name: "Flanking Bedside Runners",
        recommendedSize: "2.5 × 10 ft (Pair of Runners)",
        metricSize: "75 × 300 cm each",
        description:
          "Flank each side of the bed with a slender runner, perfect for highlighting beautiful hardwood floors.",
        architecturalTip: "Match runner length to your bed frame for crisp architectural alignment.",
        diagramSvgType: "bed-runners",
      },
    ],
  },
  runner: {
    label: "Hallways & Foyers",
    rules: [
      {
        id: "hallway-runner",
        name: "Corridors & Grand Vestibules",
        recommendedSize: "2.5 × 10 ft or 3 × 12 ft",
        metricSize: "75 × 300 cm / 90 × 360 cm",
        description:
          "Draws the eye down long gallery halls and protects high-traffic timber or stone flooring.",
        architecturalTip: "Maintain 4–6 inches (10–15 cm) of bare wood on both sides of the corridor.",
        diagramSvgType: "runner-corridor",
      },
    ],
  },
};

interface RoomSizeVisualizerProps {
  onSelectSizeFilter?: (sizeLabel: string) => void;
}

export const RoomSizeVisualizer: React.FC<RoomSizeVisualizerProps> = ({
  onSelectSizeFilter,
}) => {
  const [activeRoom, setActiveRoom] = useState<RoomType>("living");
  const [activeRuleIdx, setActiveRuleIdx] = useState<number>(0);

  const roomConfig = ROOM_DATA[activeRoom];
  const activeRule = roomConfig.rules[activeRuleIdx] || roomConfig.rules[0];

  return (
    <section id="size-guide" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-linen border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            Architectural Specification Tool
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Rug Size & Placement <br />
              <span className="italic font-light text-terracotta">Visualizer Guide.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              Choosing the correct rug scale transforms a room's proportions and acoustics.
              Use our studio specifier rules inspired by global interior architecture standards.
            </p>
          </div>
        </div>

        {/* Room Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-craftBorder pb-4">
          {(Object.keys(ROOM_DATA) as RoomType[]).map((key) => {
            const isSelected = key === activeRoom;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveRoom(key);
                  setActiveRuleIdx(0);
                }}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                  isSelected
                    ? "bg-obsidian text-alabaster border-obsidian shadow-sm font-semibold"
                    : "bg-alabaster/80 text-obsidian/70 border-craftBorder hover:border-obsidian"
                }`}
              >
                {ROOM_DATA[key].label}
              </button>
            );
          })}
        </div>

        {/* Interactive Floorplan Spec Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-alabaster p-8 sm:p-12 border border-craftBorder shadow-luxury-soft">
          {/* Left: Interactive Diagram Visualizer Canvas */}
          <div className="lg:col-span-6 bg-linen p-8 border border-craftBorder flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-obsidian/50 uppercase tracking-widest">
              Plan View • 1:25 Scale CAD Mockup
            </div>

            {/* Dynamic Scaled SVG Diagram */}
            <div className="w-full max-w-[340px] aspect-square relative flex items-center justify-center">
              {/* Floor boundary */}
              <div className="absolute inset-0 border border-craftBorder/80 bg-white/40 shadow-inner" />

              {/* Rug Shape */}
              <div
                className={`relative border-2 border-dashed border-terracotta bg-terracotta/15 flex items-center justify-center transition-all duration-500 ${
                  activeRule.diagramSvgType === "all-on" || activeRule.diagramSvgType === "bed-king" || activeRule.diagramSvgType === "dining-large"
                    ? "w-[85%] h-[80%]"
                    : activeRule.diagramSvgType === "front-on" || activeRule.diagramSvgType === "bed-queen" || activeRule.diagramSvgType === "dining-std"
                    ? "w-[72%] h-[68%]"
                    : activeRule.diagramSvgType === "runner-corridor" || activeRule.diagramSvgType === "bed-runners"
                    ? "w-[30%] h-[90%]"
                    : "w-[50%] h-[50%]"
                }`}
              >
                <span className="font-mono text-[10px] text-terracotta font-semibold uppercase tracking-wider text-center px-2">
                  {activeRule.recommendedSize}
                </span>

                {/* Furniture Silhouettes */}
                {activeRoom === "living" && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    {/* Sofa */}
                    <div className="w-44 h-12 bg-obsidian/75 border border-obsidian absolute -top-4 rounded-sm shadow-sm" />
                    {/* Coffee Table */}
                    <div className="w-24 h-14 bg-obsidian/30 border border-obsidian/60 rounded-sm" />
                    {/* Armchairs */}
                    <div className="w-12 h-12 bg-obsidian/60 border border-obsidian absolute -bottom-2 -left-2 rounded-sm" />
                    <div className="w-12 h-12 bg-obsidian/60 border border-obsidian absolute -bottom-2 -right-2 rounded-sm" />
                  </div>
                )}

                {activeRoom === "dining" && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    {/* Dining Table */}
                    <div className="w-36 h-20 bg-obsidian/75 border border-obsidian rounded-sm flex items-center justify-center">
                      <span className="text-[8px] font-mono text-white/70 uppercase">Dining Table</span>
                    </div>
                    {/* Chairs */}
                    <div className="w-6 h-6 bg-terracotta/60 rounded-full absolute -top-4 left-6" />
                    <div className="w-6 h-6 bg-terracotta/60 rounded-full absolute -top-4 right-6" />
                    <div className="w-6 h-6 bg-terracotta/60 rounded-full absolute -bottom-4 left-6" />
                    <div className="w-6 h-6 bg-terracotta/60 rounded-full absolute -bottom-4 right-6" />
                  </div>
                )}

                {activeRoom === "bedroom" && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    {/* Bed */}
                    <div className="w-36 h-48 bg-obsidian/75 border border-obsidian rounded-sm absolute -top-6 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-white/70 uppercase">Mattress</span>
                    </div>
                    {/* Nightstands */}
                    <div className="w-8 h-8 bg-obsidian/50 absolute -top-6 -left-10" />
                    <div className="w-8 h-8 bg-obsidian/50 absolute -top-6 -right-10" />
                  </div>
                )}

                {activeRoom === "runner" && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    <div className="w-12 h-4 bg-obsidian/40 absolute top-4" />
                    <div className="w-12 h-4 bg-obsidian/40 absolute bottom-4" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 font-mono text-[11px] text-obsidian/60 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-terracotta" />
              <span>Architectural Clearance Zone Active</span>
            </div>
          </div>

          {/* Right: Placement Rules Selector & Specification Notes */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-mono text-xs text-terracotta uppercase tracking-widest block mb-1">
                Select Layout Rule
              </span>
              <div className="space-y-2">
                {roomConfig.rules.map((rule, idx) => {
                  const isRuleActive = idx === activeRuleIdx;
                  return (
                    <button
                      key={rule.id}
                      onClick={() => setActiveRuleIdx(idx)}
                      className={`w-full p-4 text-left border transition-all flex items-center justify-between ${
                        isRuleActive
                          ? "bg-linen border-obsidian shadow-sm"
                          : "bg-alabaster border-craftBorder hover:border-obsidian"
                      }`}
                    >
                      <div>
                        <h4 className="font-serif text-lg text-obsidian uppercase font-medium">
                          {rule.name}
                        </h4>
                        <span className="font-mono text-xs text-terracotta">
                          Recommended: {rule.recommendedSize} ({rule.metricSize})
                        </span>
                      </div>
                      {isRuleActive && (
                        <Check className="w-4 h-4 text-terracotta flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rule Detailed Explanation */}
            <div className="space-y-3 pt-2">
              <p className="text-sm text-obsidian/80 font-light leading-relaxed">
                {activeRule.description}
              </p>

              <div className="bg-linen p-4 border-l-2 border-terracotta font-mono text-xs text-obsidian/90 space-y-1">
                <span className="text-[10px] text-terracotta uppercase tracking-wider block font-semibold">
                  Architectural Rule of Thumb:
                </span>
                <p>{activeRule.architecturalTip}</p>
              </div>
            </div>

            {/* Spec Action */}
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#collections"
                onClick={() => {
                  if (onSelectSizeFilter) onSelectSizeFilter(activeRule.recommendedSize);
                }}
                className="inline-flex items-center space-x-2 bg-obsidian text-alabaster px-6 py-3 text-xs font-mono tracking-widest uppercase hover:bg-terracotta transition-colors shadow-sm"
              >
                <span>Browse {activeRule.recommendedSize} Rugs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#configurator"
                className="inline-flex items-center space-x-2 border border-obsidian/40 px-5 py-3 text-xs font-mono tracking-widest uppercase text-obsidian hover:bg-linen transition-colors"
              >
                <span>Customize in 3D Loom</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomSizeVisualizer;
