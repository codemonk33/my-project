import React, { useState } from "react";
import { Navigation, Check } from "lucide-react";

export const IndustrialDossier: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="dossier" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-alabaster border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            Physical Coordinates & Ateliers
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Rooted in Bhadohi. <br />
              <span className="italic font-light text-terracotta">Industrial Footprint.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              Experience the weaving looms firsthand. We welcome international interior architects,
              curators, and design teams to our Maryadpatti factory and Carpet City gallery.
            </p>
          </div>
        </div>

        {/* Dual Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Facility 1: Factory */}
          <div className="bg-linen p-8 sm:p-10 border border-craftBorder shadow-luxury-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase text-terracotta bg-alabaster px-2.5 py-1 border border-craftBorder">
                  Manufacturing Facility & Dye Vats
                </span>
                <span className="font-mono text-xs text-obsidian/50">EST. 1999</span>
              </div>

              <h3 className="font-serif text-3xl text-obsidian uppercase">
                Maryadpatti Factory
              </h3>

              <p className="font-mono text-xs text-obsidian/70 leading-relaxed">
                Main Road, Maryadpatti, Bhadohi – 221401, Uttar Pradesh, India
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-obsidian/80">
                <div className="flex items-center space-x-2">
                  <span className="text-obsidian/40 uppercase">Operations:</span>
                  <span>Upright Looms, Dyeing, Relief Shearing & Washing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-obsidian/40 uppercase">Artisan Guild:</span>
                  <span>150+ Generational Knotters & Finishers</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-craftBorder flex items-center justify-between">
              <button
                onClick={() =>
                  copyToClipboard(
                    "Factory: Maryadpatti Main Road, Bhadohi - 221401 Uttar Pradesh, India",
                    "factory"
                  )
                }
                className="text-xs font-mono text-obsidian hover:text-terracotta transition-colors flex items-center space-x-1.5"
              >
                {copiedField === "factory" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-terracotta" />
                    <span>Coordinates Copied</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3.5 h-3.5 text-terracotta" />
                    <span>Copy Factory GPS Coordinates</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Facility 2: Showroom */}
          <div className="bg-linen p-8 sm:p-10 border border-craftBorder shadow-luxury-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase text-terracotta bg-alabaster px-2.5 py-1 border border-craftBorder">
                  Design Gallery & Trade Showroom
                </span>
                <span className="font-mono text-xs text-obsidian/50">CARPET CITY</span>
              </div>

              <h3 className="font-serif text-3xl text-obsidian uppercase">
                Carpet City Showroom
              </h3>

              <p className="font-mono text-xs text-obsidian/70 leading-relaxed">
                Plot No. 154, Carpet City, Bhadohi – 221401, Uttar Pradesh, India
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-obsidian/80">
                <div className="flex items-center space-x-2">
                  <span className="text-obsidian/40 uppercase">Exhibition:</span>
                  <span>500+ Curated Rugs, Yarn Pom Library & Lighting Booths</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-obsidian/40 uppercase">Appointments:</span>
                  <span>Private Specifier Consultations by Appointment</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-craftBorder flex items-center justify-between">
              <button
                onClick={() =>
                  copyToClipboard(
                    "Showroom: Plot No. 154, Carpet City, Bhadohi - 221401 Uttar Pradesh, India",
                    "showroom"
                  )
                }
                className="text-xs font-mono text-obsidian hover:text-terracotta transition-colors flex items-center space-x-1.5"
              >
                {copiedField === "showroom" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-terracotta" />
                    <span>Coordinates Copied</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3.5 h-3.5 text-terracotta" />
                    <span>Copy Showroom GPS Coordinates</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Studio Contact Information Table */}
        <div className="bg-alabaster border border-craftBorder p-8 sm:p-12 shadow-luxury-soft grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <span className="text-obsidian/50 uppercase block mb-1">Direct Lines</span>
            <a href="tel:+917317076787" className="block text-obsidian font-semibold hover:text-terracotta">
              +91 7317076787
            </a>
            <a href="tel:+917905775130" className="block text-obsidian/75 hover:text-terracotta">
              +91 7905775130
            </a>
          </div>

          <div>
            <span className="text-obsidian/50 uppercase block mb-1">Email Inquiries</span>
            <a href="mailto:info@namanrugs.com" className="block text-obsidian font-semibold hover:text-terracotta">
              info@namanrugs.com
            </a>
            <a href="mailto:namanrugsandcarpets@gmail.com" className="block text-obsidian/75 hover:text-terracotta">
              namanrugsandcarpets@gmail.com
            </a>
          </div>

          <div>
            <span className="text-obsidian/50 uppercase block mb-1">Online Catalog</span>
            <a href="https://www.namanrugs.com" target="_blank" rel="noopener noreferrer" className="block text-obsidian font-semibold hover:text-terracotta">
              www.namanrugs.com
            </a>
            <span className="text-obsidian/60 block">Global Sea & Air Export</span>
          </div>

          <div>
            <span className="text-obsidian/50 uppercase block mb-1">Studio Timings</span>
            <span className="block text-obsidian font-semibold">Mon – Sat: 09:00 – 19:30</span>
            <span className="text-obsidian/60 block">Sunday: By Specifier Appointment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialDossier;
