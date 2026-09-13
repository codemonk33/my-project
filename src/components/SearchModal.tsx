import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { CATALOG_PRODUCTS } from "./CollectionsGallery";
import type { RugProduct } from "./CollectionsGallery";

interface SearchModalProps {
  onSelectProduct: (product: RugProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectProduct }) => {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? CATALOG_PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.technique.toLowerCase().includes(q) ||
          p.roomCategory.toLowerCase().includes(q) ||
          p.styleCategory.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelect = (product: RugProduct) => {
    onSelectProduct(product);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-obsidian/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-alabaster border-b border-craftBorder p-6 sm:p-10 shadow-luxury-elevated max-w-4xl w-full mx-auto mt-8 sm:mt-16">
        {/* Top Input Bar */}
        <div className="flex items-center justify-between border-b-2 border-obsidian pb-3">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="w-5 h-5 text-terracotta" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by collection, size (e.g. 8x10), style, technique or room..."
              className="w-full bg-transparent font-serif text-lg sm:text-2xl text-obsidian placeholder:text-obsidian/30 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-obsidian/60 hover:text-obsidian"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Trending Searches */}
        {!query && (
          <div className="pt-6 space-y-3">
            <span className="font-mono text-[10px] tracking-widest uppercase text-obsidian/50 block">
              Trending Architectural Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "Moroccan Trellis",
                "Bamboo Silk Ombre",
                "Manchaha Artisan",
                "Hand-Knotted 9x12",
                "Bauhaus Geometric",
                "Bestsellers",
                "Living Room",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-linen border border-craftBorder text-xs font-mono text-obsidian/80 hover:border-obsidian transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results Preview */}
        {query && (
          <div className="pt-6 max-h-[60vh] overflow-y-auto space-y-3">
            <div className="font-mono text-xs text-obsidian/60 mb-2">
              Found {results.length} results for "{query}"
            </div>

            {results.length === 0 ? (
              <div className="text-center py-10 font-mono text-xs text-obsidian/50">
                No bespoke rugs matched your criteria. Try searching "geometric", "wool", or "ombre".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((rug) => (
                  <div
                    key={rug.id}
                    onClick={() => handleSelect(rug)}
                    className="p-3 border border-craftBorder bg-linen/50 hover:bg-linen hover:border-obsidian cursor-pointer transition-all flex items-center space-x-3 group"
                  >
                    <img
                      src={rug.image}
                      alt={rug.name}
                      className="w-16 h-16 object-cover border border-craftBorder flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[10px] text-terracotta uppercase block">
                        {rug.technique.replace("-", " ")}
                      </span>
                      <h4 className="font-serif text-sm text-obsidian uppercase truncate group-hover:text-terracotta transition-colors">
                        {rug.name}
                      </h4>
                      <span className="font-mono text-xs text-obsidian font-semibold">
                        {formatPrice(rug.basePriceINR)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-obsidian/40 group-hover:text-terracotta transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
