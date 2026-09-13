import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BrandStory from "./components/BrandStory";
import ProcessPipeline from "./components/ProcessPipeline";
import TechniquePortals from "./components/TechniquePortals";
import CollectionsGallery, { CATALOG_PRODUCTS } from "./components/CollectionsGallery";
import type { RugProduct } from "./components/CollectionsGallery";
import PDPConfigurator from "./components/PDPConfigurator";
import TradePortal from "./components/TradePortal";
import IndustrialDossier from "./components/IndustrialDossier";
import Footer from "./components/Footer";
import type { WeavingTechnique } from "./utils/rugTextureEngine";

export function App() {
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

  return (
    <div className="min-h-screen bg-alabaster text-obsidian flex flex-col font-sans">
      {/* Milanese Editorial Navigation */}
      <Header
        onNavClick={scrollToSection}
        onOpenPDP={() => {
          scrollToSection("configurator");
        }}
        onOpenTrade={() => scrollToSection("trade")}
      />

      <main className="flex-1">
        {/* 1. Hero Section: The Digital Loom */}
        <HeroSection
          onExploreClick={() => scrollToSection("collections")}
          onOpenPDPClick={() => {
            scrollToSection("configurator");
          }}
          onTradeClick={() => scrollToSection("trade")}
        />

        {/* 2. Brand Story & Authentic Family of Craftspeople */}
        <BrandStory />

        {/* 3. The 8-Stage Interactive Workshop Lifecycle */}
        <ProcessPipeline />

        {/* 4. Weaving Divisions: Hand-Knotted, Hand-Tufted, Hand-Woven */}
        <TechniquePortals
          onSelectTechniqueForConfigurator={handleTechniqueSelected}
        />

        {/* 5. The Curated Collections Engine (Grid vs Moodboard) */}
        <CollectionsGallery
          onSelectProductFor3D={handleSelectProductFor3D}
        />

        {/* 6. Product Detail View (PDP) & Bespoke 3D WebGL Configurator */}
        <div id="configurator">
          <PDPConfigurator
            initialProduct={selectedProductForPDP}
            key={selectedProductForPDP.id}
          />
        </div>

        {/* 7. Architectural Trade Portal (B2B Specifiers) */}
        <TradePortal />

        {/* 8. Industrial Dossier (Maryadpatti Factory & Carpet City Showroom) */}
        <IndustrialDossier />
      </main>

      {/* 9. Minimalist Milanese Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;
