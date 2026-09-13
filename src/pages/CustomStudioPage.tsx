import React from "react";
import { Link } from "react-router-dom";
import PDPConfigurator from "../components/PDPConfigurator";
import type { RugProduct } from "../components/CollectionsGallery";
import { ArrowLeft, MessageCircle } from "lucide-react";

interface CustomStudioPageProps {
  initialProduct: RugProduct;
}

export const CustomStudioPage: React.FC<CustomStudioPageProps> = ({
  initialProduct,
}) => {
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
            <Link to="/collections" className="hover:text-terracotta transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span className="text-obsidian font-semibold">Bespoke 3D Studio</span>
            <span>/</span>
            <span className="text-terracotta">{initialProduct.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="h-[1px] w-8 bg-terracotta" />
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
                  Real-Time WebGL & PBR Weaver Rig
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
                BESPOKE 3D STUDIO. <br />
                <span className="italic font-light text-terracotta">ARCHITECTURAL CUSTOMIZATION.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-3 text-xs text-obsidian/80 font-sans leading-relaxed">
              <p>
                Configure custom square footages, knot densities, pile shearing depths, and ARS/Pantone wool pom selections. Inspect grazing light behaviors and realistic cloth drape in real time.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href={`https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20am%20customizing%20${encodeURIComponent(initialProduct.name)}%20in%20the%203D%20Studio%20and%20would%20like%20a%20bespoke%20quote.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Trade WhatsApp Inquire</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Configurator */}
      <PDPConfigurator initialProduct={initialProduct} key={initialProduct.id} />
    </div>
  );
};

export default CustomStudioPage;
