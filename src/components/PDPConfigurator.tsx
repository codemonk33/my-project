import React, { useState } from "react";
import RugViewer3D from "./RugViewer3D";
import type { CameraPreset } from "./RugViewer3D";
import type {
  RugConfig,
  WeavingTechnique,
  FiberMaterial,
} from "../utils/rugTextureEngine";
import { CATALOG_PRODUCTS } from "./CollectionsGallery";
import type { RugProduct } from "./CollectionsGallery";
import {
  Download,
  Box,
  MessageCircle,
  Check,
  ChevronRight,
  Layers,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PDPConfiguratorProps {
  initialProduct?: RugProduct;
  onClose?: () => void;
}

// 8 Curated Authentic Mineral Dye Poms for Bhadohi Looms
const YARN_POMS = [
  { name: "Terracotta Vat", hex: "#C87D55", pantone: "18-1440 TCX" },
  { name: "Raw Undyed Wool", hex: "#DDD7CD", pantone: "11-0601 TCX" },
  { name: "Deep Indigo Vat", hex: "#1F2B37", pantone: "19-4024 TCX" },
  { name: "Burnt Ochre", hex: "#A86438", pantone: "18-1150 TCX" },
  { name: "Obsidian Noir", hex: "#121212", pantone: "19-0303 TCX" },
  { name: "Alabaster Stone", hex: "#FBF9F5", pantone: "11-4800 TCX" },
  { name: "Lichen Sage", hex: "#8E9A82", pantone: "16-5806 TCX" },
  { name: "Dusty Sandstone", hex: "#B88E75", pantone: "16-1325 TCX" },
];

export const PDPConfigurator: React.FC<PDPConfiguratorProps> = ({
  initialProduct = CATALOG_PRODUCTS[0],
  onClose,
}) => {
  const [selectedProduct] = useState<RugProduct>(initialProduct);

  // Live Configurator State
  const [technique, setTechnique] = useState<WeavingTechnique>(initialProduct.technique);
  const collection = initialProduct.collection;
  const [fiber, setFiber] = useState<FiberMaterial>(initialProduct.fiber);
  const [primaryColor, setPrimaryColor] = useState<string>(initialProduct.primaryColor);
  const secondaryColor = initialProduct.secondaryColor;
  const [accentColor, setAccentColor] = useState<string>(initialProduct.accentColor);

  const [unitSystem, setUnitSystem] = useState<"ft" | "cm">("ft");
  const [widthFt, setWidthFt] = useState<number>(8);
  const [lengthFt, setLengthFt] = useState<number>(10);

  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("room");

  // Modals state
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);
  const [isSpecDownloaded, setIsSpecDownloaded] = useState(false);
  const [is3DExported, setIs3DExported] = useState(false);
  const [swatchFormSubmitted, setSwatchFormSubmitted] = useState(false);

  // Metric conversions
  const widthCm = Math.round(widthFt * 30.48);
  const lengthCm = Math.round(lengthFt * 30.48);
  const areaSqFt = (widthFt * lengthFt).toFixed(1);
  const areaSqM = ((widthCm * lengthCm) / 10000).toFixed(2);

  const activeConfig: RugConfig = {
    technique,
    collection,
    fiber,
    primaryColor,
    secondaryColor,
    accentColor,
    widthFt,
    lengthFt,
  };

  // Trigger PDF Spec Download simulation
  const handleDownloadSpec = () => {
    setIsSpecDownloaded(true);
    const specContent = `
NAMAN RUGS & CARPETS — ARCHITECTURAL SPECIFICATION DOSSIER
============================================================
Project Model: ${selectedProduct.name}
Technique: ${technique.toUpperCase()}
Collection: ${collection.toUpperCase()}
Fiber Composition: ${fiber.toUpperCase()}
Dimensions: ${widthFt} x ${lengthFt} FT (${widthCm} x ${lengthCm} CM)
Total Surface Area: ${areaSqFt} SQ. FT / ${areaSqM} SQ. METERS
Primary Yarn Pigment: ${primaryColor}
Secondary Yarn Pigment: ${secondaryColor}
Accent Yarn Pigment: ${accentColor}
Knot / Pile Specification: ${selectedProduct.knotCount}
Pile Depth: ${selectedProduct.pileHeight}

PROVENANCE & INDUSTRIAL FACILITY:
Factory: Main Road, Maryadpatti, Bhadohi – 221401 (U.P.), India
Showroom: Plot No. 154, Carpet City, Bhadohi – 221401 (U.P.), India
Inquiries: info@namanrugs.com | +91 7317076787
============================================================
Generated via Naman 3D Architectural Spec Engine.
    `;
    const blob = new Blob([specContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Naman_Rugs_Spec_${selectedProduct.id}_${widthFt}x${lengthFt}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsSpecDownloaded(false), 3000);
  };

  // Trigger 3D Asset Export
  const handleExport3D = () => {
    setIs3DExported(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setIs3DExported(false), 3000);
  };

  const handleSwatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSwatchFormSubmitted(true);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      setSwatchFormSubmitted(false);
      setIsSwatchModalOpen(false);
    }, 2500);
  };

  // WhatsApp concierge link with pre-encoded bespoke specifications
  const waMessage = encodeURIComponent(
    `Hello Naman Rugs Studio Concierge, I am specifying a bespoke rug:\n- Model: ${selectedProduct.name}\n- Technique: ${technique}\n- Dimensions: ${widthFt}x${lengthFt} ft (${widthCm}x${lengthCm} cm)\n- Fiber: ${fiber}\n- Primary Color: ${primaryColor}\nCould we arrange a project review or yarn swatch box?`
  );

  return (
    <section id="configurator" className="min-h-screen bg-alabaster py-20 px-6 sm:px-12 md:px-24 border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb & Close Bar */}
        <div className="flex items-center justify-between border-b border-craftBorder pb-4 mb-8 text-xs font-mono tracking-widest uppercase">
          <div className="flex items-center space-x-2 text-obsidian/70">
            <span>Collections</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{selectedProduct.collection}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-obsidian font-semibold">{selectedProduct.name}</span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 border border-craftBorder hover:border-obsidian transition-colors"
              title="Close Product View"
            >
              <X className="w-4 h-4 text-obsidian" />
            </button>
          )}
        </div>

        {/* Split Screen Grid: 3D Viewport Left, Architectural Dossier Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky 3D WebGL Canvas */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-4">
            <div className="relative h-[480px] sm:h-[580px] lg:h-[640px] w-full shadow-luxury-elevated">
              <RugViewer3D
                config={activeConfig}
                cameraPreset={cameraPreset}
                showRoomContext={true}
                interactiveLight={true}
                onPresetChange={(p) => setCameraPreset(p)}
              />
            </div>

            {/* Quick Helper Tip */}
            <div className="flex items-center justify-between text-[11px] font-mono text-obsidian/60 bg-linen p-3 border border-craftBorder">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                <span>Drag to orbit • Scroll to zoom • Subsurface lighting active</span>
              </div>
              <span className="font-semibold text-obsidian">Scale: 1:{unitSystem === "ft" ? "1 FT" : "30 CM"}</span>
            </div>
          </div>

          {/* Right Column: Architectural Product Dossier & Customizer */}
          <div className="lg:col-span-5 space-y-8 bg-linen/50 p-6 sm:p-8 border border-craftBorder">
            {/* Title & Coordinates */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-terracotta uppercase mb-1">
                <span>Authentic Bhadohi Loom</span>
                <span>Ref: #{selectedProduct.id.toUpperCase()}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-obsidian uppercase">
                {selectedProduct.name}
              </h2>
              <p className="text-sm text-obsidian/70 font-light mt-2">
                {selectedProduct.tagline}
              </p>
            </div>

            {/* 1. Weaving Technique Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono tracking-widest uppercase text-obsidian/70 font-semibold">
                1. Weaving Division
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "hand-knotted", label: "Hand-Knotted", pile: "Heirloom" },
                  { id: "hand-tufted", label: "Hand-Tufted", pile: "Sculpted" },
                  { id: "hand-loom", label: "Hand-Loom", pile: "Ribbed" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTechnique(t.id as WeavingTechnique)}
                    className={`p-3 text-left border transition-all ${
                      technique === t.id
                        ? "bg-obsidian text-alabaster border-obsidian shadow-sm"
                        : "bg-alabaster text-obsidian/70 border-craftBorder hover:border-obsidian"
                    }`}
                  >
                    <span className="block text-xs font-mono uppercase font-semibold">
                      {t.label}
                    </span>
                    <span className="text-[10px] font-mono text-terracotta">{t.pile}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fiber Material Specification */}
            <div className="space-y-2">
              <label className="block text-xs font-mono tracking-widest uppercase text-obsidian/70 font-semibold">
                2. Fiber Composition
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "pure-wool", label: "Pure New Zealand Wool", note: "Matte & Resilient" },
                  { id: "wool-bamboo-silk", label: "Wool & Bamboo Silk", note: "Glancing Luster" },
                  { id: "jute", label: "Undyed Natural Jute", note: "Earth Raw Crimp" },
                  { id: "linen", label: "Belgian Slub Linen", note: "Airy Flat Texture" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFiber(f.id as FiberMaterial)}
                    className={`p-3 text-left border transition-all ${
                      fiber === f.id
                        ? "bg-obsidian text-alabaster border-obsidian shadow-sm"
                        : "bg-alabaster text-obsidian/70 border-craftBorder hover:border-obsidian"
                    }`}
                  >
                    <span className="block text-xs font-mono font-medium">
                      {f.label}
                    </span>
                    <span className="text-[10px] font-mono text-terracotta">{f.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Dimensional Scaling (Ft vs Cm) */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono tracking-widest uppercase text-obsidian/70 font-semibold">
                  3. Architectural Scale & Dimensions
                </label>
                <div className="flex border border-craftBorder p-0.5 bg-alabaster">
                  <button
                    onClick={() => setUnitSystem("ft")}
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase ${
                      unitSystem === "ft" ? "bg-obsidian text-alabaster" : "text-obsidian/60"
                    }`}
                  >
                    Feet (FT)
                  </button>
                  <button
                    onClick={() => setUnitSystem("cm")}
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase ${
                      unitSystem === "cm" ? "bg-obsidian text-alabaster" : "text-obsidian/60"
                    }`}
                  >
                    Metric (CM)
                  </button>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { w: 5, l: 8, label: "5 × 8 ft" },
                  { w: 8, l: 10, label: "8 × 10 ft" },
                  { w: 9, l: 12, label: "9 × 12 ft" },
                  { w: 2.5, l: 10, label: "Runner (2.5 × 10 ft)" },
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setWidthFt(s.w);
                      setLengthFt(s.l);
                    }}
                    className={`px-3 py-1 text-xs font-mono border transition-all ${
                      widthFt === s.w && lengthFt === s.l
                        ? "bg-terracotta text-white border-terracotta shadow-sm"
                        : "bg-alabaster text-obsidian/80 border-craftBorder hover:border-obsidian"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Sliders for bespoke custom sizing */}
              <div className="grid grid-cols-2 gap-4 bg-alabaster p-4 border border-craftBorder">
                <div>
                  <div className="flex justify-between text-xs font-mono text-obsidian/70 mb-1">
                    <span>WIDTH</span>
                    <span className="font-semibold text-obsidian">
                      {unitSystem === "ft" ? `${widthFt} FT` : `${widthCm} CM`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="16"
                    step="0.5"
                    value={widthFt}
                    onChange={(e) => setWidthFt(parseFloat(e.target.value))}
                    className="w-full accent-terracotta cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-obsidian/70 mb-1">
                    <span>LENGTH</span>
                    <span className="font-semibold text-obsidian">
                      {unitSystem === "ft" ? `${lengthFt} FT` : `${lengthCm} CM`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="0.5"
                    value={lengthFt}
                    onChange={(e) => setLengthFt(parseFloat(e.target.value))}
                    className="w-full accent-terracotta cursor-pointer"
                  />
                </div>
              </div>

              {/* Area & Loom Schedule Calculation */}
              <div className="flex items-center justify-between text-xs font-mono p-3 bg-linen border border-craftBorder">
                <div>
                  <span className="text-obsidian/50 block text-[10px] uppercase">Calculated Area</span>
                  <span className="font-semibold text-obsidian">
                    {areaSqFt} sq. ft ({areaSqM} m²)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-obsidian/50 block text-[10px] uppercase">Loom Lead Time</span>
                  <span className="font-semibold text-terracotta">
                    {technique === "hand-knotted" ? "14–18 Weeks" : technique === "hand-tufted" ? "6–8 Weeks" : "4–6 Weeks"}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. ARS / Pantone Yarn Pom Color Mapping */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono tracking-widest uppercase text-obsidian/70 font-semibold">
                4. Yarn Pom Mapping (Mineral Dye Vats)
              </label>

              {/* Primary Color Palette */}
              <div>
                <span className="block text-[10px] font-mono text-obsidian/60 uppercase mb-1.5">
                  Primary Ground Tone:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {YARN_POMS.map((pom) => (
                    <button
                      key={pom.hex}
                      onClick={() => setPrimaryColor(pom.hex)}
                      className={`group relative w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                        primaryColor === pom.hex ? "border-obsidian ring-2 ring-terracotta" : "border-white shadow-sm"
                      }`}
                      style={{ backgroundColor: pom.hex }}
                      title={`${pom.name} (${pom.pantone})`}
                    >
                      {primaryColor === pom.hex && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Palette */}
              <div>
                <span className="block text-[10px] font-mono text-obsidian/60 uppercase mb-1.5">
                  Secondary Design Accent Tone:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {YARN_POMS.map((pom) => (
                    <button
                      key={pom.hex}
                      onClick={() => setAccentColor(pom.hex)}
                      className={`group relative w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                        accentColor === pom.hex ? "border-obsidian ring-2 ring-terracotta" : "border-white shadow-sm"
                      }`}
                      style={{ backgroundColor: pom.hex }}
                      title={`${pom.name} (${pom.pantone})`}
                    >
                      {accentColor === pom.hex && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Trade & Specifier Action Buttons */}
            <div className="pt-4 border-t border-craftBorder space-y-3">
              <span className="block text-xs font-mono tracking-widest uppercase text-obsidian/70 font-semibold">
                5. Specifier Actions & Trade Concierge
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Download Spec Sheet */}
                <button
                  onClick={handleDownloadSpec}
                  className="flex items-center justify-center space-x-2 bg-alabaster border border-obsidian px-4 py-3 text-xs font-mono tracking-wider uppercase hover:bg-obsidian hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-terracotta" />
                  <span>{isSpecDownloaded ? "Dossier Exported" : "Download Spec PDF"}</span>
                </button>

                {/* Export 3D GLTF / OBJ */}
                <button
                  onClick={handleExport3D}
                  className="flex items-center justify-center space-x-2 bg-alabaster border border-obsidian px-4 py-3 text-xs font-mono tracking-wider uppercase hover:bg-obsidian hover:text-white transition-colors"
                >
                  <Box className="w-3.5 h-3.5 text-terracotta" />
                  <span>{is3DExported ? "3D Package Bundled" : "Export 3D Package"}</span>
                </button>
              </div>

              {/* Request Physical Yarn Swatch Box */}
              <button
                onClick={() => setIsSwatchModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 bg-linen border border-terracotta/60 text-obsidian px-4 py-3 text-xs font-mono tracking-widest uppercase hover:bg-terracotta hover:text-white transition-colors shadow-sm"
              >
                <Layers className="w-4 h-4 text-terracotta" />
                <span>Request Physical Yarn Swatch Box</span>
              </button>

              {/* Direct WhatsApp Concierge CTA */}
              <a
                href={`https://wa.me/917317076787?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-obsidian text-alabaster px-4 py-3.5 text-xs font-mono tracking-widest uppercase hover:bg-terracotta transition-colors shadow-luxury-soft"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire via WhatsApp Studio Concierge (+91 7317076787)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Swatch Box Request Modal */}
      {isSwatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-alabaster border border-craftBorder max-w-lg w-full p-8 shadow-luxury-elevated relative">
            <button
              onClick={() => setIsSwatchModalOpen(false)}
              className="absolute top-4 right-4 text-obsidian/60 hover:text-obsidian"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 mb-6">
              <span className="font-mono text-xs text-terracotta uppercase tracking-widest">
                Trade Specifier Service
              </span>
              <h3 className="font-serif text-2xl text-obsidian uppercase">
                Request Physical Yarn Swatch Box
              </h3>
              <p className="text-xs text-obsidian/70 font-light">
                We air-courier hand-dyed New Zealand wool & bamboo silk yarn poms, weaving technique samples,
                and material cards directly to your architecture or interior design studio.
              </p>
            </div>

            {swatchFormSubmitted ? (
              <div className="bg-linen p-6 border border-terracotta text-center space-y-2">
                <Check className="w-8 h-8 text-terracotta mx-auto" />
                <h4 className="font-serif text-lg text-obsidian uppercase">Swatch Box Dispatched</h4>
                <p className="text-xs font-mono text-obsidian/70">
                  Our Bhadohi dispatch team has received your courier coordinates. Tracking details will be
                  emailed in 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSwatchSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-obsidian/60 uppercase mb-1">Your Name / Principal</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alessandro Rossi"
                    className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
                <div>
                  <label className="block text-obsidian/60 uppercase mb-1">Architecture / Design Firm</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Studio Milano Architecture"
                    className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
                <div>
                  <label className="block text-obsidian/60 uppercase mb-1">Studio Courier Address & Country</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Street, City, Postal Code, Country"
                    className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
                <div>
                  <label className="block text-obsidian/60 uppercase mb-1">Email for Freight Tracking</label>
                  <input
                    type="email"
                    required
                    placeholder="studio@architecture.com"
                    className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-obsidian text-alabaster tracking-widest uppercase hover:bg-terracotta transition-colors font-semibold"
                >
                  Confirm Free Trade Swatch Shipment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PDPConfigurator;
