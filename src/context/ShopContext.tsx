import React, { createContext, useContext, useState } from "react";
import type { RugProduct } from "../components/CollectionsGallery";

export type Currency = "INR" | "USD" | "EUR" | "GBP" | "AED";

export interface CartItem {
  id: string;
  product: RugProduct;
  size: string;
  widthFt: number;
  lengthFt: number;
  fiber: string;
  primaryColor: string;
  price: number;
  quantity: number;
  isSample?: boolean;
}

interface ShopContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInINR: number) => string;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: RugProduct[];
  toggleWishlist: (product: RugProduct) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const RATES: Record<Currency, { rate: number; symbol: string }> = {
  INR: { rate: 1, symbol: "₹" },
  USD: { rate: 0.012, symbol: "$" },
  EUR: { rate: 0.011, symbol: "€" },
  GBP: { rate: 0.0095, symbol: "£" },
  AED: { rate: 0.044, symbol: "AED " },
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<RugProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const formatPrice = (amountInINR: number) => {
    const { rate, symbol } = RATES[currency];
    const converted = Math.round(amountInINR * rate);
    if (currency === "INR") {
      return `${symbol}${converted.toLocaleString("en-IN")}`;
    }
    return `${symbol}${converted.toLocaleString()}`;
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === item.product.id &&
          i.size === item.size &&
          i.fiber === item.fiber &&
          i.isSample === item.isSample
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleWishlist = (product: RugProduct) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
