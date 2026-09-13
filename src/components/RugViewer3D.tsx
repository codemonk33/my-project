import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { RugTextureEngine } from "../utils/rugTextureEngine";
import type { RugConfig } from "../utils/rugTextureEngine";
import {
  Smartphone,
  SunMedium,
} from "lucide-react";

export type CameraPreset = "flatlay" | "room" | "macro";

interface RugViewer3DProps {
  config: RugConfig;
  cameraPreset?: CameraPreset;
  interactiveLight?: boolean;
  showRoomContext?: boolean;
  enableRotationFloat?: boolean;
  className?: string;
  onPresetChange?: (preset: CameraPreset) => void;
}

// 3D Minimalist Architectural Room Furniture Context
function RoomContextSilhouettes({ rugWidth, rugLength }: { rugWidth: number; rugLength: number }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor boundary slab */}
      <mesh position={[0, 0, -0.06]} receiveShadow>
        <boxGeometry args={[rugWidth * 2.2, rugLength * 1.8, 0.04]} />
        <meshStandardMaterial
          color="#ECE8E0"
          roughness={0.92}
          metalness={0.05}
        />
      </mesh>

      {/* Minimalist modern low-profile credenza silhouette behind rug */}
      <group position={[0, rugLength * 0.58 + 0.5, 0.4]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[rugWidth * 0.8, 0.45, 0.8]} />
          <meshStandardMaterial color="#2B2623" roughness={0.7} />
        </mesh>
        {/* Ceramic vase silhouette on credenza */}
        <mesh position={[rugWidth * 0.25, 0, 0.65]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 0.45, 24]} />
          <meshStandardMaterial color="#F4EFEA" roughness={0.5} />
        </mesh>
      </group>

      {/* Minimalist architectural lounge chair silhouette at grazing edge */}
      <group position={[-(rugWidth * 0.58 + 0.35), 0, 0.35]} rotation={[0, 0, -Math.PI / 4]}>
        {/* Seat cushion */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.7, 0.25]} />
          <meshStandardMaterial color="#D7D0C5" roughness={0.85} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.3, 0.35]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.12, 0.5]} />
          <meshStandardMaterial color="#D7D0C5" roughness={0.85} />
        </mesh>
        {/* Slender legs */}
        <mesh position={[0.28, 0.28, -0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.01, 0.35, 12]} />
          <meshStandardMaterial color="#1A1816" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[-0.28, 0.28, -0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.01, 0.35, 12]} />
          <meshStandardMaterial color="#1A1816" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.28, -0.28, -0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.01, 0.35, 12]} />
          <meshStandardMaterial color="#1A1816" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[-0.28, -0.28, -0.2]} castShadow>
          <cylinderGeometry args={[0.015, 0.01, 0.35, 12]} />
          <meshStandardMaterial color="#1A1816" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Organic Subdivided Mesh with subtle cloth drape & corner curls
function RugMesh({ config, enableFloat }: { config: RugConfig; enableFloat?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Real-world architectural conversion (1 ft = 0.38 unit scale for viewport balance)
  const width = Math.max(1.5, config.widthFt * 0.38);
  const length = Math.max(2.0, config.lengthFt * 0.38);

  // Generate procedural PBR maps for current configuration
  const pbr = useMemo(() => {
    return RugTextureEngine.generatePBRSet(config);
  }, [
    config.technique,
    config.collection,
    config.fiber,
    config.primaryColor,
    config.secondaryColor,
    config.accentColor,
  ]);

  // Create adaptive subdivided geometry with organic textile drape
  const geometry = useMemo(() => {
    const segmentsX = 64;
    const segmentsY = 80;
    const geo = new THREE.PlaneGeometry(width, length, segmentsX, segmentsY);
    const pos = geo.attributes.position;

    const halfW = width / 2;
    const halfL = length / 2;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Subtle organic gravity sag across heavy wool fabric
      const normalizedDist = Math.sqrt((x / halfW) ** 2 + (y / halfL) ** 2);
      const fabricSag = -Math.sin(normalizedDist * Math.PI) * 0.018;

      // Soft corner curls representing heavy unrolled Indian rug
      const cornerFactor = Math.pow(Math.abs(x) / halfW, 3) * Math.pow(Math.abs(y) / halfL, 3);
      const cornerCurl = cornerFactor * 0.045;

      pos.setZ(i, fabricSag + cornerCurl);
    }

    geo.computeVertexNormals();
    return geo;
  }, [width, length]);

  // Adjust displacement and luster values based on documented technique and fiber
  const displacementScale =
    config.technique === "hand-tufted"
      ? 0.052 // Distinct high-low sculpted cut & loop pile
      : config.technique === "hand-knotted"
      ? 0.024 // Micro-grain tactile knot density
      : 0.016; // Low-profile hand-loom ribbed weft

  const roughnessVal =
    config.fiber === "wool-bamboo-silk"
      ? 0.55 // Luminous sheen
      : config.fiber === "linen"
      ? 0.78
      : config.fiber === "jute"
      ? 0.95
      : 0.88; // Pure New Zealand Wool matte absorption

  const metalnessVal = config.fiber === "wool-bamboo-silk" ? 0.22 : 0.04;

  const content = (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, 0, 0.02]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        map={pbr.albedo}
        normalMap={pbr.normal}
        roughnessMap={pbr.roughness}
        displacementMap={pbr.displacement}
        displacementScale={displacementScale}
        roughness={roughnessVal}
        metalness={metalnessVal}
        side={THREE.DoubleSide}
      />
    </mesh>
  );

  if (enableFloat) {
    return (
      <Float
        speed={1.5}
        rotationIntensity={0.15}
        floatIntensity={0.2}
        floatingRange={[-0.05, 0.05]}
      >
        {content}
      </Float>
    );
  }

  return content;
}

// Directional Grazing Light Rig with Interactive Mouse Drift
function GrazingLightRig({ interactive = true }: { interactive?: boolean }) {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());

  useFrame(({ mouse, clock }) => {
    if (!lightRef.current) return;
    if (interactive) {
      // Dynamic grazing angle drift casting deep relief shadows into pile carving
      const t = clock.getElapsedTime() * 0.4;
      const targetX = 3.5 + mouse.x * 2.0 + Math.sin(t) * 0.5;
      const targetY = -4.0 + mouse.y * 1.8 + Math.cos(t) * 0.5;
      lightRef.current.position.x = targetX;
      lightRef.current.position.y = targetY;
    }
  });

  return (
    <>
      <primitive object={targetRef.current} position={[0, 0, 0]} />
      {/* Primary Warm Architectural Grazing Light */}
      <directionalLight
        ref={lightRef}
        position={[3.8, -4.2, 3.2]}
        intensity={2.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0003}
        color="#FFF9F0"
        target={targetRef.current}
      />
      {/* Soft Ambient Skylight simulation */}
      <ambientLight intensity={0.95} color="#F2EFE9" />
      {/* Counter Cool Skylight Fill */}
      <directionalLight position={[-3.5, 4.0, 2.5]} intensity={0.8} color="#E8EEF5" />
      {/* Under-glow bounce */}
      <hemisphereLight args={["#FFFDF7", "#DCD5C9", 0.65]} />
    </>
  );
}

// Camera Presets Manager
function CameraController({ preset }: { preset: CameraPreset }) {
  useFrame(({ camera }) => {
    const targetPos = new THREE.Vector3(0, -3.2, 3.4);
    const targetLook = new THREE.Vector3(0, 0, 0);

    if (preset === "flatlay") {
      // 90° Overhead flat-lay pattern overview
      targetPos.set(0, 0.001, 5.0);
    } else if (preset === "macro") {
      // 1:1 Extreme close-up macro knot inspection
      targetPos.set(0.4, -0.6, 0.95);
      targetLook.set(0.2, -0.1, 0);
    } else {
      // Perspective Room Context (45° grazing perspective)
      targetPos.set(0, -3.4, 2.8);
    }

    camera.position.lerp(targetPos, 0.06);
    camera.lookAt(targetLook);
  });

  return null;
}

// Shimmer Skeleton Loading State
function ShimmerLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FBF9F5]/90 backdrop-blur-sm z-20 pointer-events-none transition-opacity duration-700">
      <div className="relative w-48 h-60 border border-craftBorder bg-linen-200/60 overflow-hidden flex flex-col justify-between p-4 shadow-luxury-soft">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-obsidian/40 uppercase">
          <span>Weaving 3D</span>
          <span>Bhadohi</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-terracotta/40 border-t-terracotta animate-spin self-center" />
        <div className="text-center font-mono text-[9px] tracking-widest text-terracotta uppercase">
          PBR Pile Shader Initializing
        </div>
      </div>
    </div>
  );
}

export const RugViewer3D: React.FC<RugViewer3DProps> = ({
  config,
  cameraPreset: externalPreset = "room",
  interactiveLight = true,
  showRoomContext = true,
  enableRotationFloat = false,
  className = "",
  onPresetChange,
}) => {
  const [internalPreset, setInternalPreset] = useState<CameraPreset>(externalPreset);
  const [isLoaded, setIsLoaded] = useState(false);
  const [arTriggered, setArTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const currentPreset = externalPreset || internalPreset;

  const handlePresetSelect = (preset: CameraPreset) => {
    setInternalPreset(preset);
    if (onPresetChange) onPresetChange(preset);
  };

  // Performance Guardrail: IntersectionObserver offscreen hibernation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      { rootMargin: "150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleArProjection = () => {
    setArTriggered(true);
    setTimeout(() => setArTriggered(false), 3000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] bg-gradient-to-b from-[#F5F2EB] to-[#EFECE6] border border-craftBorder overflow-hidden select-none ${className}`}
    >
      {/* Top HUD: Technical Coordinates & Knot Metrics */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between pointer-events-none gap-2">
        <div className="flex items-center space-x-2 bg-alabaster/90 backdrop-blur-md px-3 py-1.5 border border-craftBorder text-[10px] font-mono tracking-widest text-obsidian/75 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          <span className="uppercase">
            {config.technique.replace("-", " ")} — {config.widthFt}×{config.lengthFt} FT
          </span>
        </div>

        <div className="flex items-center space-x-2 pointer-events-auto">
          {/* AR QuickLook / WebXR Projector Trigger */}
          <button
            onClick={handleArProjection}
            className="flex items-center space-x-1.5 bg-obsidian text-alabaster px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase hover:bg-terracotta transition-colors shadow-sm"
            title="Project Rug at 1:1 Scale via Phone LiDAR / WebXR"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{arTriggered ? "AR Anchor Ready" : "View in AR (1:1)"}</span>
          </button>
        </div>
      </div>

      {!isLoaded && <ShimmerLoader />}

      {/* 3D WebGL Viewport */}
      {isIntersecting && (
        <Canvas
          shadows
          // Adaptive DPR capped at [1, 1.5] on mobile viewports for battery efficiency
          dpr={[1, 1.5]}
          camera={{ position: [0, -3.4, 2.8], fov: 42 }}
          // Demand rendering cuts mobile battery consumption and thermal throttling
          frameloop="demand"
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={null}>
            <CameraController preset={currentPreset} />
            <GrazingLightRig interactive={interactiveLight} />

            <group position={[0, 0, 0]}>
              {showRoomContext && currentPreset === "room" && (
                <RoomContextSilhouettes
                  rugWidth={config.widthFt * 0.38}
                  rugLength={config.lengthFt * 0.38}
                />
              )}

              <RugMesh config={config} enableFloat={enableRotationFloat} />

              {/* Realistic Contact Shadow on floor plane */}
              <ContactShadows
                position={[0, 0, -0.01]}
                opacity={0.7}
                scale={10}
                blur={1.8}
                far={1.5}
                resolution={1024}
                color="#28221E"
              />
            </group>

            {/* Clamped touch-friendly OrbitControls prohibiting camera below ground level */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              minDistance={1.2}
              maxDistance={11}
              // Prevent dipping below ground plane
              maxPolarAngle={Math.PI / 2 - 0.05}
              minPolarAngle={0.05}
              dampingFactor={0.08}
              rotateSpeed={0.8}
            />
          </Suspense>
        </Canvas>
      )}

      {/* Bottom Camera Presets Switcher Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-1.5 bg-alabaster/90 backdrop-blur-md p-1 border border-craftBorder shadow-sm pointer-events-auto">
          <button
            onClick={() => handlePresetSelect("flatlay")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all ${
              currentPreset === "flatlay"
                ? "bg-obsidian text-alabaster shadow-sm"
                : "text-obsidian/70 hover:text-obsidian hover:bg-linen-200"
            }`}
          >
            Overhead (90°)
          </button>
          <button
            onClick={() => handlePresetSelect("room")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all ${
              currentPreset === "room"
                ? "bg-obsidian text-alabaster shadow-sm"
                : "text-obsidian/70 hover:text-obsidian hover:bg-linen-200"
            }`}
          >
            Room Staging (45°)
          </button>
          <button
            onClick={() => handlePresetSelect("macro")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all ${
              currentPreset === "macro"
                ? "bg-obsidian text-alabaster shadow-sm"
                : "text-obsidian/70 hover:text-obsidian hover:bg-linen-200"
            }`}
          >
            1:1 Macro Knot
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2 bg-alabaster/80 backdrop-blur-md px-3 py-1.5 border border-craftBorder text-[9px] font-mono text-obsidian/60 tracking-wider">
          <SunMedium className="w-3 h-3 text-terracotta" />
          <span>GRAZING LIGHT SHADOW RIG ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default RugViewer3D;
