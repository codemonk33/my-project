import React from "react";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-obsidian text-alabaster pt-20 pb-12 px-6 sm:px-12 md:px-24 border-t border-obsidian-200 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid: Wordmark & Quick Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-6 space-y-4">
            <span className="font-serif text-4xl sm:text-5xl uppercase tracking-tight text-alabaster block">
              Naman
            </span>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-alabaster/60 block">
              Rugs & Carpets • Bhadohi, India
            </span>
            <p className="text-sm font-light text-alabaster/70 max-w-md leading-relaxed pt-2">
              Your Floor’s Forever Companion. Made slowly. Made by hand. Made to last. 
              Translating centuries of Indian loom mastery into high-fashion Milanese interior architecture.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-terracotta uppercase tracking-widest block font-semibold">
              Weaving Divisions
            </span>
            <ul className="space-y-2 text-alabaster/70">
              <li>
                <a href="#techniques" className="hover:text-alabaster transition-colors">
                  Hand-Knotted (Heirloom)
                </a>
              </li>
              <li>
                <a href="#techniques" className="hover:text-alabaster transition-colors">
                  Hand-Tufted (Sculpted Relief)
                </a>
              </li>
              <li>
                <a href="#techniques" className="hover:text-alabaster transition-colors">
                  Hand-Loom / Flatweave
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-alabaster transition-colors">
                  Modern Geometric Series
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-alabaster transition-colors">
                  Sculpted Naturals Series
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-alabaster transition-colors">
                  Soft Ombre Series
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-terracotta uppercase tracking-widest block font-semibold">
              Bhadohi Ateliers
            </span>
            <p className="text-alabaster/70 leading-relaxed">
              Factory: Maryadpatti Main Road <br />
              Showroom: Plot No. 154, Carpet City <br />
              Bhadohi – 221401, U.P., India
            </p>
            <div className="pt-2 text-alabaster/90">
              <a href="tel:+917317076787" className="block hover:text-terracotta transition-colors">
                +91 7317076787
              </a>
              <a href="mailto:info@namanrugs.com" className="block hover:text-terracotta transition-colors">
                info@namanrugs.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 border-t border-obsidian-100/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-alabaster/50">
          <div>
            © {new Date().getFullYear()} Naman Rugs & Carpets. All Rights Reserved. Founder & Principal: Naman Dubey.
          </div>

          <div className="flex items-center space-x-6">
            <span>Bhadohi • Milan • New York • Dubai</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-alabaster hover:text-terracotta transition-colors uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
