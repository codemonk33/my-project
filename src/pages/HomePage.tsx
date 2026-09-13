import React from "react";
import HeroSection from "../components/HeroSection";
import BrandStory from "../components/BrandStory";
import ProcessPipeline from "../components/ProcessPipeline";
import TechniquePortals from "../components/TechniquePortals";
import CollectionsGallery from "../components/CollectionsGallery";
import type { RugProduct } from "../components/CollectionsGallery";
import PDPConfigurator from "../components/PDPConfigurator";
import { RoomSizeVisualizer } from "../components/RoomSizeVisualizer";
import { ManchahaArtisanGallery } from "../components/ManchahaArtisanGallery";
import { RugCareService } from "../components/RugCareService";
import { VirtualLoomTour } from "../components/VirtualLoomTour";
import TradePortal from "../components/TradePortal";
import IndustrialDossier from "../components/IndustrialDossier";
import type { WeavingTechnique } from "../utils/rugTextureEngine";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  selectedProductForPDP: RugProduct;
  onSelectProductFor3D: (product: RugProduct) => void;
  onTechniqueSelected: (technique: WeavingTechnique) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  selectedProductForPDP,
  onSelectProductFor3D,
  onTechniqueSelected,
}) => {
  const navigate = useNavigate();


  return (
    <div>
      {/* Hero: The Digital Loom */}
      <HeroSection
        onExploreClick={() => navigate("/collections")}
        onOpenPDPClick={() => navigate("/custom-studio")}
        onTradeClick={() => navigate("/trade")}
      />

      {/* Brand Story & Generational Guild */}
      <BrandStory />

      {/* 8-Stage Interactive Workshop Pipeline */}
      <ProcessPipeline />

      {/* Technique Portals: Hand-Knotted, Tufted, Flatweave */}
      <TechniquePortals onSelectTechniqueForConfigurator={onTechniqueSelected} />

      {/* Curated Collections Preview */}
      <CollectionsGallery onSelectProductFor3D={onSelectProductFor3D} />

      {/* 3D WebGL Configurator */}
      <div id="configurator">
        <PDPConfigurator
          initialProduct={selectedProductForPDP}
          key={selectedProductForPDP.id}
        />
      </div>

      {/* Room Size Visualizer */}
      <RoomSizeVisualizer onSelectSizeFilter={() => navigate("/collections")} />

      {/* Manchaha Artisan Gallery */}
      <ManchahaArtisanGallery onSelectProductFor3D={onSelectProductFor3D} />

      {/* Rug Care & Restoration */}
      <RugCareService />

      {/* Virtual Loom Tour */}
      <VirtualLoomTour />

      {/* Trade Portal */}
      <TradePortal />

      {/* Industrial Dossier */}
      <IndustrialDossier />
    </div>
  );
};

export default HomePage;
