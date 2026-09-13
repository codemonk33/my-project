import { useState } from "react";
import { ShopProvider } from "./context/ShopContext";
import { MegaMenuHeader } from "./components/MegaMenuHeader";
import HeroSection from "./components/HeroSection";
import BrandStory from "./components/BrandStory";
import ProcessPipeline from "./components/ProcessPipeline";
import TechniquePortals from "./components/TechniquePortals";
import CollectionsGallery, { CATALOG_PRODUCTS } from "./components/CollectionsGallery";
import type { RugProduct } from "./components/CollectionsGallery";
import PDPConfigurator from "./components/PDPConfigurator";
import { RoomSizeVisualizer } from "./components/RoomSizeVisualizer";
import { ManchahaArtisanGallery } from "./components/ManchahaArtisanGallery";
import { RugCareService } from "./components/RugCareService";
import { VirtualLoomTour } from "./components/VirtualLoomTour";
import TradePortal from "./components/TradePortal";
import IndustrialDossier from "./components/IndustrialDossier";
import Footer from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { SearchModal } from "./components/SearchModal";
import type { WeavingTechnique } from "./utils/rugTextureEngine";

function AppContent() {
  const [selectedProductForPDP, setSelectedProductForPDP] = useState<RugProduct>(CATALOG_PRODUCTS[0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectProductFor3D = (product: RugProduct) => {
    setSelectedProductForPDP(product);
    const configEl = document.getElementById("configurator");
    if (configEl) {
      configEl.scrollIntoView({ behavior: "smooth" });
    } else {
      setTimeout(() => {
        const el = document.getElementById("configurator");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleTechniqueSelected = (technique: WeavingTechnique) => {
    const matched = CATALOG_PRODUCTS.find((p) => p.technique === technique) || CATALOG_PRODUCTS[0];
    handleSelectProductFor3D(matched);
  };

  const handleSizeGuideSelect = (_sizeLabel: string) => {
    scrollToSection("collections");
  };

  return (
    <div className="min-h-screen bg-alabaster text-obsidian flex flex-col font-sans">
      {/* 1. Milanese Editorial & Jaipur Mega-Menu Navigation */}
      <MegaMenuHeader
        onNavClick={scrollToSection}
        onOpenPDP={() => scrollToSection("configurator")}
        onOpenTrade={() => scrollToSection("trade")}
      />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* 2. Hero Section: The Digital Loom */}
        <HeroSection
          onExploreClick={() => scrollToSection("collections")}
          onOpenPDPClick={() => scrollToSection("configurator")}
          onTradeClick={() => scrollToSection("trade")}
        />

        {/* 3. Brand Story & Authentic Family of Craftspeople */}
        <BrandStory />

        {/* 4. The 8-Stage Interactive Workshop Lifecycle */}
        <ProcessPipeline />

        {/* 5. Weaving Divisions: Hand-Knotted, Hand-Tufted, Hand-Woven */}
        <TechniquePortals
          onSelectTechniqueForConfigurator={handleTechniqueSelected}
        />

        {/* 6. The Curated Collections Engine (Grid vs Moodboard with Faceted Filters) */}
        <CollectionsGallery
          onSelectProductFor3D={handleSelectProductFor3D}
        />

        {/* 7. Product Detail View (PDP) & Bespoke 3D WebGL Configurator */}
        <div id="configurator">
          <PDPConfigurator
            initialProduct={selectedProductForPDP}
            key={selectedProductForPDP.id}
          />
        </div>

        {/* 8. Signature Jaipur Rugs Feature: Interactive Room Size Visualizer & Floor Clearing Guide */}
        <RoomSizeVisualizer onSelectSizeFilter={handleSizeGuideSelect} />

        {/* 9. Signature Jaipur Rugs Feature: Manchaha Artisan Weaver Art Carpet Gallery */}
        <ManchahaArtisanGallery onSelectProductFor3D={handleSelectProductFor3D} />

        {/* 10. Signature Jaipur Rugs Feature: Rug Care, Cleaning & Restoration Guide */}
        <RugCareService />

        {/* 11. Signature Jaipur Rugs Feature: Live Atelier Virtual Loom Consultation Reservation */}
        <VirtualLoomTour />

        {/* 12. Architectural Trade Portal (B2B Specifiers, Hospitality, Custom CAD) */}
        <TradePortal />

        {/* 13. Industrial Dossier (Maryadpatti Factory & Carpet City Showroom Coordinates) */}
        <IndustrialDossier />
      </main>

      {/* 14. Minimalist Milanese Editorial Footer */}
      <Footer />

      {/* 15. Global E-Commerce Overlays (Cart Drawer, Wishlist Drawer, Live Search) */}
      <CartDrawer />
      <WishlistDrawer onSelectProductFor3D={handleSelectProductFor3D} />
      <SearchModal onSelectProduct={handleSelectProductFor3D} />
    </div>
  );
}

export function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
