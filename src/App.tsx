import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { MegaMenuHeader } from "./components/MegaMenuHeader";
import Footer from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { SearchModal } from "./components/SearchModal";
import { WhatsAppConcierge } from "./components/WhatsAppConcierge";
import { CATALOG_PRODUCTS } from "./components/CollectionsGallery";
import type { RugProduct } from "./components/CollectionsGallery";
import type { WeavingTechnique } from "./utils/rugTextureEngine";

// Subpages
import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import CustomStudioPage from "./pages/CustomStudioPage";
import ManchahaPage from "./pages/ManchahaPage";
import SizeGuidePage from "./pages/SizeGuidePage";
import CareServicesPage from "./pages/CareServicesPage";
import TradePage from "./pages/TradePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const [selectedProductForPDP, setSelectedProductForPDP] = useState<RugProduct>(CATALOG_PRODUCTS[0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectProductFor3D = (product: RugProduct) => {
    setSelectedProductForPDP(product);
  };

  const handleTechniqueSelected = (technique: WeavingTechnique) => {
    const matched = CATALOG_PRODUCTS.find((p) => p.technique === technique) || CATALOG_PRODUCTS[0];
    handleSelectProductFor3D(matched);
  };

  return (
    <div className="min-h-screen bg-alabaster text-obsidian flex flex-col font-sans">
      <ScrollToTop />

      {/* 1. Milanese Editorial & Jaipur Mega-Menu Navigation */}
      <MegaMenuHeader
        onNavClick={scrollToSection}
        onOpenPDP={() => scrollToSection("configurator")}
        onOpenTrade={() => scrollToSection("trade")}
      />

      <main className="flex-1 pt-24 sm:pt-28">
        <Routes>
          {/* Main Editorial Home Journey */}
          <Route
            path="/"
            element={
              <HomePage
                selectedProductForPDP={selectedProductForPDP}
                onSelectProductFor3D={handleSelectProductFor3D}
                onTechniqueSelected={handleTechniqueSelected}
              />
            }
          />

          {/* Dedicated Subpages */}
          <Route
            path="/collections"
            element={<CollectionsPage onSelectProductFor3D={handleSelectProductFor3D} />}
          />
          <Route
            path="/custom-studio"
            element={<CustomStudioPage initialProduct={selectedProductForPDP} />}
          />
          <Route
            path="/manchaha"
            element={<ManchahaPage onSelectProductFor3D={handleSelectProductFor3D} />}
          />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/services" element={<CareServicesPage />} />
          <Route path="/trade" element={<TradePage />} />
          <Route
            path="/about"
            element={<AboutPage onTechniqueSelected={handleTechniqueSelected} />}
          />
          <Route path="/contact" element={<ContactPage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 2. Milanese Editorial Footer */}
      <Footer />

      {/* 3. Global E-Commerce Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer onSelectProductFor3D={handleSelectProductFor3D} />
      <SearchModal onSelectProduct={handleSelectProductFor3D} />

      {/* 4. Floating WhatsApp Atelier Concierge */}
      <WhatsAppConcierge
        phoneNumber="917317076787"
        defaultMessage="Hello Naman Rugs Atelier, I am inquiring about your handcrafted carpets and custom loom specifications."
      />
    </div>
  );
}

export function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
