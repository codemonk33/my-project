import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ManchahaArtisanGallery } from "../components/ManchahaArtisanGallery";
import type { RugProduct } from "../components/CollectionsGallery";
import { ArrowLeft, MessageCircle } from "lucide-react";

interface ManchahaPageProps {
  onSelectProductFor3D: (product: RugProduct) => void;
}

export const ManchahaPage: React.FC<ManchahaPageProps> = ({
  onSelectProductFor3D,
}) => {
  const navigate = useNavigate();

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
            <span className="text-obsidian font-semibold">Social Impact & Art</span>
            <span>/</span>
            <span className="text-terracotta">Manchaha: The Weaver's Canvas</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="h-[1px] w-8 bg-terracotta" />
                <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
                  Unguided Weaver Expression
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
                MANCHAHA. <br />
                <span className="italic font-light text-terracotta">"FROM MY HEART" ART RUGS.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-3 text-xs text-obsidian/80 font-sans leading-relaxed">
              <p>
                In Hindi, <em>Manchaha</em> signifies "express yourself freely". We untether our rural master knotters from rigid blueprints, allowing them to transform leftover dyed yarns into spontaneous, one-of-a-kind art tapestries.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://wa.me/917317076787?text=Hello%20Naman%20Rugs,%20I%20am%20interested%20in%20acquiring%20a%20one-of-a-kind%20Manchaha%20art%20carpet."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Acquire a Manchaha Piece</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Impact Stats Bar */}
      <div className="bg-white border-b border-craftBorder py-8 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 border border-craftBorder bg-alabaster">
            <div className="font-serif text-3xl sm:text-4xl text-obsidian font-normal">100%</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-terracotta mt-1">Artisan Royalties Shared</div>
          </div>
          <div className="p-4 border border-craftBorder bg-alabaster">
            <div className="font-serif text-3xl sm:text-4xl text-obsidian font-normal">0 kg</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-terracotta mt-1">Yarn Landfill Waste</div>
          </div>
          <div className="p-4 border border-craftBorder bg-alabaster">
            <div className="font-serif text-3xl sm:text-4xl text-obsidian font-normal">150+</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-terracotta mt-1">Women Knotters Empowered</div>
          </div>
          <div className="p-4 border border-craftBorder bg-alabaster">
            <div className="font-serif text-3xl sm:text-4xl text-obsidian font-normal">1 of 1</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-terracotta mt-1">Irrepeatable Masterpieces</div>
          </div>
        </div>
      </div>

      {/* Manchaha Gallery */}
      <ManchahaArtisanGallery onSelectProductFor3D={handleSelectProduct} />
    </div>
  );
};

export default ManchahaPage;
