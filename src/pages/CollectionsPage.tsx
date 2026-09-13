import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CollectionsGallery from "../components/CollectionsGallery";
import type { RugProduct } from "../components/CollectionsGallery";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";

interface CollectionsPageProps {
  onSelectProductFor3D: (product: RugProduct) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  onSelectProductFor3D,
}) => {
  const navigate = useNavigate();
  const { currency } = useShop();

  const handleSelectProduct = (product: RugProduct) => {
    onSelectProductFor3D(product);
    navigate("/custom-studio");
  };

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
            <span className="text-obsidian font-semibold">Handcrafted Carpets & Rugs</span>
            <span>/</span>
            <span className="text-terracotta">All Curations ({currency})</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="h-[1px] w-8 bg-terracotta" />
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
                  Complete Bhadohi Portfolio
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
                HANDCRAFTED CARPETS. <br />
                <span className="italic font-light text-terracotta">UNHURRIED PRECISION.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-3 text-xs text-obsidian/80 font-sans leading-relaxed">
              <p>
                Every carpet is woven by hand across the villages of Bhadohi and Mirzapur using pure Himalayan wool, raw mulberry silk, and bamboo filaments.
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20am%20exploring%20your%20rug%20catalog%20and%20need%20assistance%20choosing%20a%20piece."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Stylist Consultation</span>
                </a>
                <Link
                  to="/size-guide"
                  className="text-[11px] font-mono uppercase tracking-wider text-obsidian/70 hover:text-terracotta underline"
                >
                  Floor Size Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Gallery Component */}
      <CollectionsGallery onSelectProductFor3D={handleSelectProduct} />
    </div>
  );
};

export default CollectionsPage;
