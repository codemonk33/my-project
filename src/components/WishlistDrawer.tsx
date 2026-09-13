import React from "react";
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import type { RugProduct } from "./CollectionsGallery";

interface WishlistDrawerProps {
  onSelectProductFor3D: (product: RugProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  onSelectProductFor3D,
}) => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    formatPrice,
    addToCart,
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-obsidian/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-alabaster h-full shadow-luxury-elevated border-l border-craftBorder flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-craftBorder flex items-center justify-between">
          <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 text-terracotta fill-terracotta" />
            <span className="font-semibold text-obsidian">Saved Wishlist ({wishlist.length})</span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 text-obsidian/60 hover:text-obsidian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-3 font-mono text-xs text-obsidian/50">
              <Heart className="w-8 h-8 mx-auto text-obsidian/30" />
              <p>No rugs saved to your wishlist yet.</p>
              <a
                href="#collections"
                onClick={() => setIsWishlistOpen(false)}
                className="inline-block mt-2 px-4 py-2 bg-obsidian text-alabaster uppercase tracking-widest text-[10px]"
              >
                Browse Catalog
              </a>
            </div>
          ) : (
            wishlist.map((rug) => (
              <div
                key={rug.id}
                className="p-4 border border-craftBorder bg-white flex items-start space-x-3 relative shadow-sm"
              >
                <img
                  src={rug.image}
                  alt={rug.name}
                  className="w-16 h-20 object-cover border border-craftBorder flex-shrink-0"
                />
                <div className="flex-1 min-w-0 font-mono text-xs">
                  <span className="text-[10px] text-terracotta uppercase block">
                    {rug.technique.replace("-", " ")}
                  </span>
                  <h4 className="font-serif text-sm text-obsidian uppercase truncate">
                    {rug.name}
                  </h4>
                  <span className="font-semibold text-obsidian block mt-0.5">
                    {formatPrice(rug.basePriceINR)}
                  </span>

                  <div className="flex items-center space-x-2 mt-3">
                    <button
                      onClick={() => {
                        addToCart({
                          id: `${rug.id}-8x10`,
                          product: rug,
                          size: "8×10 ft",
                          widthFt: 8,
                          lengthFt: 10,
                          fiber: rug.fiber,
                          primaryColor: rug.primaryColor,
                          price: rug.basePriceINR,
                        });
                        toggleWishlist(rug);
                      }}
                      className="px-3 py-1 bg-obsidian text-alabaster uppercase text-[10px] tracking-wider hover:bg-terracotta transition-colors flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectProductFor3D(rug);
                        setIsWishlistOpen(false);
                      }}
                      className="px-2.5 py-1 border border-craftBorder text-obsidian uppercase text-[10px] hover:border-obsidian"
                    >
                      Inspect 3D
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(rug)}
                  className="text-obsidian/40 hover:text-terracotta p-1"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-craftBorder bg-white">
            <button
              onClick={() => {
                wishlist.forEach((rug) => {
                  addToCart({
                    id: `${rug.id}-8x10`,
                    product: rug,
                    size: "8×10 ft",
                    widthFt: 8,
                    lengthFt: 10,
                    fiber: rug.fiber,
                    primaryColor: rug.primaryColor,
                    price: rug.basePriceINR,
                  });
                });
                setIsWishlistOpen(false);
              }}
              className="w-full py-3 bg-obsidian text-alabaster font-mono text-xs uppercase tracking-widest hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 font-semibold"
            >
              <span>Move All to Bag ({wishlist.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
