import React from "react";
import { ArrowUp, MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-obsidian text-alabaster pt-20 pb-12 px-6 sm:px-12 md:px-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid: Wordmark & Quick Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl uppercase tracking-tight text-alabaster block group-hover:text-terracotta transition-colors">
                Naman
              </span>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-alabaster/60 block">
                Rugs & Carpets • Bhadohi, India
              </span>
            </Link>
            <p className="text-xs font-light text-alabaster/70 max-w-sm leading-relaxed pt-1 font-sans">
              <em>Your Floor’s Forever Companion.</em> Made slowly. Made by hand. Made to last. 
              Elevating centuries of authentic Indian handcraft into high-fashion Milanese architectural rigor.
            </p>

            {/* Direct WhatsApp Concierge Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20am%20inquiring%20about%20your%20handcrafted%20carpet%20collections."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp (+91 7317076787)</span>
              </a>
            </div>
          </div>

          {/* Quick Subpages Col 1: Collections & Studio */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-terracotta uppercase tracking-widest block font-semibold">
              Curations
            </span>
            <ul className="space-y-2 text-alabaster/70">
              <li>
                <Link to="/collections" className="hover:text-alabaster transition-colors">
                  All Handcrafted Rugs
                </Link>
              </li>
              <li>
                <Link to="/custom-studio" className="hover:text-alabaster transition-colors text-terracotta font-semibold">
                  3D Customizer Studio
                </Link>
              </li>
              <li>
                <Link to="/manchaha" className="hover:text-alabaster transition-colors">
                  Manchaha Weaver Art
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="hover:text-alabaster transition-colors">
                  Room Size Visualizer
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-alabaster transition-colors">
                  Rug Care & Wash Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Subpages Col 2: Specifiers & Enterprise */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-terracotta uppercase tracking-widest block font-semibold">
              Atelier & Specifiers
            </span>
            <ul className="space-y-2 text-alabaster/70">
              <li>
                <Link to="/trade" className="hover:text-alabaster transition-colors">
                  Trade & Hospitality Portal
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-alabaster transition-colors">
                  Our 25-Year Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-alabaster transition-colors">
                  Visit Factory & Showroom
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20want%20to%20order%20a%20physical%20yarn%20swatch%20kit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta transition-colors"
                >
                  Request Swatch Kit Box
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917317076787?text=Hello,%20I%20would%20like%20to%20book%20a%20Virtual%20Loom%20Tour%20at%20Bhadohi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta transition-colors"
                >
                  Book Virtual Loom Tour
                </a>
              </li>
            </ul>
          </div>

          {/* Coordinates Col 3 */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-terracotta uppercase tracking-widest block font-semibold">
              Bhadohi Headquarters
            </span>
            <p className="text-alabaster/70 leading-relaxed font-sans text-xs">
              <strong>Factory:</strong> Maryadpatti Main Road, Bhadohi – 221401 <br />
              <strong>Showroom:</strong> Plot No. 154, Carpet City, Bhadohi – 221401, UP, India
            </p>
            <div className="pt-2 space-y-1 text-alabaster/90">
              <a href="tel:+917317076787" className="flex items-center space-x-1.5 hover:text-terracotta transition-colors">
                <Phone className="w-3.5 h-3.5 text-terracotta" />
                <span>+91 7317076787 / +91 7905775130</span>
              </a>
              <a href="mailto:info@namanrugs.com" className="flex items-center space-x-1.5 hover:text-terracotta transition-colors">
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                <span>info@namanrugs.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-alabaster/50">
          <div>
            © {new Date().getFullYear()} Naman Rugs & Carpets. All Rights Reserved. Founder & Studio Principal: Naman Dubey.
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
