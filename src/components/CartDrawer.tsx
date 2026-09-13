import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
import confetti from "canvas-confetti";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    formatPrice,
    addToCart,
  } = useShop();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const freeShippingThreshold = 50000;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckoutComplete(true);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      setCheckoutComplete(false);
      setIsCartOpen(false);
    }, 3000);
  };

  const addFreeSwatchSample = () => {
    if (cart.length > 0) {
      addToCart({
        id: `swatch-kit-${Date.now()}`,
        product: cart[0].product,
        size: "Yarn Pom Swatch Kit",
        widthFt: 1,
        lengthFt: 1,
        fiber: "Curated Fiber Box",
        primaryColor: "#C87D55",
        price: 0,
        isSample: true,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-obsidian/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-alabaster h-full shadow-luxury-elevated border-l border-craftBorder flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-craftBorder flex items-center justify-between">
          <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 text-terracotta" />
            <span className="font-semibold text-obsidian">Your Loom Bag ({cart.length})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-obsidian/60 hover:text-obsidian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-linen border-b border-craftBorder text-xs font-mono">
          <div className="flex justify-between text-[11px] mb-1">
            <span>
              {cartTotal >= freeShippingThreshold
                ? "✓ Free Insured Global Air Freight Unlocked"
                : `Add ${formatPrice(freeShippingThreshold - cartTotal)} for Free Air Shipping`}
            </span>
            <span className="font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-craftBorder rounded-full overflow-hidden">
            <div
              className="h-full bg-terracotta transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {checkoutComplete ? (
            <div className="text-center py-16 space-y-3">
              <Check className="w-12 h-12 text-terracotta mx-auto" />
              <h3 className="font-serif text-2xl text-obsidian uppercase">Proforma Confirmed</h3>
              <p className="text-xs font-mono text-obsidian/70 max-w-xs mx-auto">
                Thank you. Your bespoke loom reservation and trade specification order has been sent to our Bhadohi director.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 font-mono text-xs text-obsidian/50">
              <ShoppingBag className="w-8 h-8 mx-auto text-obsidian/30" />
              <p>Your bag is currently empty.</p>
              <a
                href="#collections"
                onClick={() => setIsCartOpen(false)}
                className="inline-block mt-2 px-4 py-2 bg-obsidian text-alabaster uppercase tracking-widest text-[10px]"
              >
                Explore Catalog
              </a>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-craftBorder bg-white flex items-start space-x-3 relative shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover border border-craftBorder flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 font-mono text-xs">
                    <span className="text-[10px] text-terracotta uppercase block">
                      {item.product.technique.replace("-", " ")}
                    </span>
                    <h4 className="font-serif text-sm text-obsidian uppercase truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-obsidian/70 block">
                      Size: {item.size} • {item.fiber.replace("-", " ")}
                    </span>
                    <span className="font-semibold text-obsidian block mt-1">
                      {item.price === 0 ? "FREE" : formatPrice(item.price)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 border border-craftBorder flex items-center justify-center hover:bg-linen"
                      >
                        <Minus className="w-3 h-3 text-obsidian" />
                      </button>
                      <span className="text-xs px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 border border-craftBorder flex items-center justify-center hover:bg-linen"
                      >
                        <Plus className="w-3 h-3 text-obsidian" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-obsidian/40 hover:text-terracotta p-1"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Complimentary Swatch Kit Upsell Banner */}
              {!cart.some((i) => i.isSample) && (
                <div className="p-4 bg-linen border border-dashed border-terracotta/60 text-xs font-mono flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-obsidian block">Complimentary Swatch Kit</span>
                    <span className="text-[10px] text-obsidian/60">Include yarn color poms with this order</span>
                  </div>
                  <button
                    onClick={addFreeSwatchSample}
                    className="px-3 py-1.5 bg-terracotta text-white uppercase text-[10px] tracking-wider hover:bg-terracotta-dark transition-colors"
                  >
                    + Add Free
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && !checkoutComplete && (
          <div className="p-6 border-t border-craftBorder bg-white space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-obsidian/60 uppercase">Estimated Total</span>
              <span className="font-serif text-2xl text-obsidian">{formatPrice(cartTotal)}</span>
            </div>

            <div className="text-[10px] font-mono text-obsidian/60 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
              <span>Includes 100% Artisan Authenticity Certificate & Direct Air Dispatch</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-obsidian text-alabaster font-mono text-xs uppercase tracking-widest hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 font-semibold shadow-luxury-soft"
            >
              <span>Proceed to Proforma / Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
