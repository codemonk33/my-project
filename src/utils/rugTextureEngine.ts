import * as THREE from "three";

export type WeavingTechnique = "hand-knotted" | "hand-tufted" | "hand-loom";
export type RugCollection = "modern-geometric" | "sculpted-naturals" | "soft-ombre";
export type FiberMaterial = "pure-wool" | "wool-bamboo-silk" | "jute" | "linen";

export interface RugConfig {
  technique: WeavingTechnique;
  collection: RugCollection;
  fiber: FiberMaterial;
  primaryColor: string; // Hex e.g. "#C87D55" (Terracotta)
  secondaryColor: string; // Hex e.g. "#DDD7CD" (Raw Wool)
  accentColor: string; // Hex e.g. "#1F2B37" (Indigo)
  widthFt: number; // e.g. 8
  lengthFt: number; // e.g. 10
}

/**
 * Procedurally generates high-resolution PBR Texture Maps (Albedo, Normal, Roughness, Displacement)
 * tailored to authentic Bhadohi rug weaving techniques and cc-tapis editorial aesthetics.
 */
export class RugTextureEngine {
  private static cache: Map<string, {
    albedo: THREE.CanvasTexture;
    normal: THREE.CanvasTexture;
    roughness: THREE.CanvasTexture;
    displacement: THREE.CanvasTexture;
  }> = new Map();

  public static generatePBRSet(config: RugConfig) {
    const key = `${config.technique}_${config.collection}_${config.fiber}_${config.primaryColor}_${config.secondaryColor}_${config.accentColor}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const width = 1024;
    const height = 1280;

    // 1. Albedo Canvas
    const albedoCanvas = document.createElement("canvas");
    albedoCanvas.width = width;
    albedoCanvas.height = height;
    const ctxA = albedoCanvas.getContext("2d")!;

    // 2. Height/Displacement Canvas (Grayscale)
    const heightCanvas = document.createElement("canvas");
    heightCanvas.width = width;
    heightCanvas.height = height;
    const ctxH = heightCanvas.getContext("2d")!;

    // Draw base design pattern onto Albedo & Height
    this.drawPattern(ctxA, ctxH, width, height, config);

    // Apply micro-texture noise depending on technique and fiber
    this.applyMicroWeave(ctxA, ctxH, width, height, config);

    // 3. Normal Map Generation from Height Canvas
    const normalCanvas = this.generateNormalMap(heightCanvas, width, height, config.technique);

    // 4. Roughness Map Generation
    const roughnessCanvas = this.generateRoughnessMap(heightCanvas, width, height, config.fiber);

    const albedo = new THREE.CanvasTexture(albedoCanvas);
    albedo.wrapS = THREE.ClampToEdgeWrapping;
    albedo.wrapT = THREE.ClampToEdgeWrapping;
    albedo.needsUpdate = true;

    const displacement = new THREE.CanvasTexture(heightCanvas);
    displacement.wrapS = THREE.ClampToEdgeWrapping;
    displacement.wrapT = THREE.ClampToEdgeWrapping;
    displacement.needsUpdate = true;

    const normal = new THREE.CanvasTexture(normalCanvas);
    normal.wrapS = THREE.ClampToEdgeWrapping;
    normal.wrapT = THREE.ClampToEdgeWrapping;
    normal.needsUpdate = true;

    const roughness = new THREE.CanvasTexture(roughnessCanvas);
    roughness.wrapS = THREE.ClampToEdgeWrapping;
    roughness.wrapT = THREE.ClampToEdgeWrapping;
    roughness.needsUpdate = true;

    const pbrSet = { albedo, normal, roughness, displacement };
    this.cache.set(key, pbrSet);
    return pbrSet;
  }

  private static drawPattern(
    ctxA: CanvasRenderingContext2D,
    ctxH: CanvasRenderingContext2D,
    w: number,
    h: number,
    config: RugConfig
  ) {
    const { collection, primaryColor, secondaryColor, accentColor } = config;

    // Albedo base fill
    ctxA.fillStyle = secondaryColor;
    ctxA.fillRect(0, 0, w, h);

    // Height base fill (mid-gray 128 = baseline pile)
    ctxH.fillStyle = "#808080";
    ctxH.fillRect(0, 0, w, h);

    if (collection === "modern-geometric") {
      // Architectural bold arch, checkerboard and curved shapes
      ctxA.fillStyle = primaryColor;
      ctxH.fillStyle = "#B8B8B8"; // Elevated pile
      ctxA.beginPath();
      ctxA.arc(w * 0.5, h * 0.38, w * 0.35, 0, Math.PI, false);
      ctxA.fill();
      ctxH.beginPath();
      ctxH.arc(w * 0.5, h * 0.38, w * 0.35, 0, Math.PI, false);
      ctxH.fill();

      // Sharp diagonal quadrant
      ctxA.fillStyle = accentColor;
      ctxH.fillStyle = "#959595";
      ctxA.fillRect(w * 0.1, h * 0.58, w * 0.38, h * 0.32);
      ctxH.fillRect(w * 0.1, h * 0.58, w * 0.38, h * 0.32);

      // Contrast geometric block
      ctxA.fillStyle = primaryColor;
      ctxH.fillStyle = "#CFCFCF";
      ctxA.beginPath();
      ctxA.arc(w * 0.68, h * 0.74, w * 0.22, 0, Math.PI * 2);
      ctxA.fill();
      ctxH.beginPath();
      ctxH.arc(w * 0.68, h * 0.74, w * 0.22, 0, Math.PI * 2);
      ctxH.fill();

      // Editorial inset border lines
      ctxA.strokeStyle = primaryColor;
      ctxA.lineWidth = 14;
      ctxA.strokeRect(36, 36, w - 72, h - 72);
      ctxH.strokeStyle = "#404040"; // Carved relief groove
      ctxH.lineWidth = 14;
      ctxH.strokeRect(36, 36, w - 72, h - 72);
    } else if (collection === "sculpted-naturals") {
      // Fluid organic shapes and relief floral leaf cuts
      ctxA.fillStyle = primaryColor;
      ctxH.fillStyle = "#D0D0D0"; // High pile

      // Flowing botanical contours
      ctxA.beginPath();
      ctxA.ellipse(w * 0.45, h * 0.4, w * 0.32, h * 0.24, Math.PI / 4, 0, Math.PI * 2);
      ctxA.fill();
      ctxH.beginPath();
      ctxH.ellipse(w * 0.45, h * 0.4, w * 0.32, h * 0.24, Math.PI / 4, 0, Math.PI * 2);
      ctxH.fill();

      ctxA.fillStyle = accentColor;
      ctxH.fillStyle = "#686868"; // Low carved pile
      ctxA.beginPath();
      ctxA.ellipse(w * 0.65, h * 0.65, w * 0.28, h * 0.2, -Math.PI / 6, 0, Math.PI * 2);
      ctxA.fill();
      ctxH.beginPath();
      ctxH.ellipse(w * 0.65, h * 0.65, w * 0.28, h * 0.2, -Math.PI / 6, 0, Math.PI * 2);
      ctxH.fill();

      // Sculpted rhythmic ridges
      for (let y = 100; y < h - 100; y += 70) {
        ctxA.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctxA.lineWidth = 6;
        ctxA.beginPath();
        ctxA.moveTo(80, y);
        ctxA.bezierCurveTo(w * 0.3, y - 30, w * 0.7, y + 30, w - 80, y);
        ctxA.stroke();

        ctxH.strokeStyle = "#E8E8E8";
        ctxH.lineWidth = 8;
        ctxH.beginPath();
        ctxH.moveTo(80, y);
        ctxH.bezierCurveTo(w * 0.3, y - 30, w * 0.7, y + 30, w - 80, y);
        ctxH.stroke();
      }
    } else {
      // Soft Ombre: Gradual vertical wash of natural mineral dyes
      const gradA = ctxA.createLinearGradient(0, 0, 0, h);
      gradA.addColorStop(0, primaryColor);
      gradA.addColorStop(0.35, accentColor);
      gradA.addColorStop(0.7, secondaryColor);
      gradA.addColorStop(1, primaryColor);
      ctxA.fillStyle = gradA;
      ctxA.fillRect(0, 0, w, h);

      // Subtle horizontal striations in height map
      for (let y = 0; y < h; y += 12) {
        const val = 120 + Math.floor(Math.sin(y / 24) * 25);
        ctxH.fillStyle = `rgb(${val},${val},${val})`;
        ctxH.fillRect(0, y, w, 6);
      }
    }

    // Authentic woven fringed ends
    ctxA.fillStyle = "#EAE5DC";
    ctxA.fillRect(0, 0, w, 22);
    ctxA.fillRect(0, h - 22, w, 22);
    ctxH.fillStyle = "#505050";
    ctxH.fillRect(0, 0, w, 22);
    ctxH.fillRect(0, h - 22, w, 22);
  }

  private static applyMicroWeave(
    ctxA: CanvasRenderingContext2D,
    ctxH: CanvasRenderingContext2D,
    w: number,
    h: number,
    config: RugConfig
  ) {
    const { technique } = config;
    const step = technique === "hand-knotted" ? 4 : technique === "hand-tufted" ? 7 : 5;

    // Add tactile fiber micro-dots
    const imgDataA = ctxA.getImageData(0, 0, w, h);
    const imgDataH = ctxH.getImageData(0, 0, w, h);
    const dataA = imgDataA.data;
    const dataH = imgDataH.data;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const idx = (y * w + x) * 4;
        const noise = (Math.random() - 0.5) * 26;

        // Modulate color channel slightly
        dataA[idx] = Math.min(255, Math.max(0, dataA[idx] + noise));
        dataA[idx + 1] = Math.min(255, Math.max(0, dataA[idx + 1] + noise));
        dataA[idx + 2] = Math.min(255, Math.max(0, dataA[idx + 2] + noise));

        // Modulate height based on technique
        if (technique === "hand-knotted") {
          // Micro-grain knots
          dataH[idx] = Math.min(255, Math.max(0, dataH[idx] + noise * 1.8));
        } else if (technique === "hand-tufted") {
          // Tuft loops / cut pile clusters
          const cluster = ((x % 14 < 7) ? 20 : -20);
          dataH[idx] = Math.min(255, Math.max(0, dataH[idx] + cluster + noise));
        } else {
          // Hand-loom ribbed horizontal weft lines
          const rib = (y % 10 < 5 ? 18 : -18);
          dataH[idx] = Math.min(255, Math.max(0, dataH[idx] + rib + noise * 0.8));
        }
      }
    }

    ctxA.putImageData(imgDataA, 0, 0);
    ctxH.putImageData(imgDataH, 0, 0);
  }

  private static generateNormalMap(
    heightCanvas: HTMLCanvasElement,
    w: number,
    h: number,
    technique: WeavingTechnique
  ): HTMLCanvasElement {
    const normalCanvas = document.createElement("canvas");
    normalCanvas.width = w;
    normalCanvas.height = h;
    const ctxN = normalCanvas.getContext("2d")!;

    const hCtx = heightCanvas.getContext("2d")!;
    const hData = hCtx.getImageData(0, 0, w, h).data;
    const nImg = ctxN.createImageData(w, h);
    const nData = nImg.data;

    const strength = technique === "hand-tufted" ? 3.2 : technique === "hand-knotted" ? 2.2 : 1.8;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const left = hData[((y * w) + (x - 1)) * 4];
        const right = hData[((y * w) + (x + 1)) * 4];
        const up = hData[(((y - 1) * w) + x) * 4];
        const down = hData[(((y + 1) * w) + x) * 4];

        const dx = ((left - right) / 255) * strength;
        const dy = ((up - down) / 255) * strength;
        const dz = 1.0;

        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const nx = (dx / len) * 0.5 + 0.5;
        const ny = (dy / len) * 0.5 + 0.5;
        const nz = (dz / len) * 0.5 + 0.5;

        const idx = (y * w + x) * 4;
        nData[idx] = Math.floor(nx * 255);
        nData[idx + 1] = Math.floor(ny * 255);
        nData[idx + 2] = Math.floor(nz * 255);
        nData[idx + 3] = 255;
      }
    }

    ctxN.putImageData(nImg, 0, 0);
    return normalCanvas;
  }

  private static generateRoughnessMap(
    heightCanvas: HTMLCanvasElement,
    w: number,
    h: number,
    fiber: FiberMaterial
  ): HTMLCanvasElement {
    const roughnessCanvas = document.createElement("canvas");
    roughnessCanvas.width = w;
    roughnessCanvas.height = h;
    const ctxR = roughnessCanvas.getContext("2d")!;

    // Wool has high diffuse absorption (roughness ~0.85-0.95)
    // Bamboo silk has reflective glancing luster (roughness ~0.35-0.65)
    const baseRoughness = fiber === "wool-bamboo-silk" ? 110 : fiber === "linen" ? 190 : fiber === "jute" ? 230 : 215;

    const hCtx = heightCanvas.getContext("2d")!;
    const hData = hCtx.getImageData(0, 0, w, h).data;
    const rImg = ctxR.createImageData(w, h);
    const rData = rImg.data;

    for (let i = 0; i < hData.length; i += 4) {
      const heightVal = hData[i];
      // Slightly more specular highlights on the peaks of the pile
      const roughVal = Math.min(255, Math.max(40, baseRoughness - Math.floor((heightVal - 128) * 0.3)));
      rData[i] = roughVal;
      rData[i + 1] = roughVal;
      rData[i + 2] = roughVal;
      rData[i + 3] = 255;
    }

    ctxR.putImageData(rImg, 0, 0);
    return roughnessCanvas;
  }
}
