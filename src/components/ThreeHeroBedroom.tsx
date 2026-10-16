import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, Eye, RotateCcw, Sun, Moon, MessageSquareShare } from 'lucide-react';
import { createRoomWhatsAppUrl } from '../data/furnitureData';

type FinishScheme = 'walnut-linen' | 'ash-boucle' | 'ebony-velvet';

interface Props {
  onExploreClick: () => void;
  onShowroomClick: () => void;
}

export const ThreeHeroBedroom: React.FC<Props> = ({ onExploreClick, onShowroomClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [finishScheme, setFinishScheme] = useState<FinishScheme>('walnut-linen');
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeCameraView, setActiveCameraView] = useState<'front' | 'detail' | 'overhead'>('front');
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Store references for dynamic manipulation without re-mounting Three scene
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 3.8, 6.2));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 0));
  const animFrameRef = useRef<number | null>(null);

  // Dynamic mesh material references
  const headboardMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const woodMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const fabricMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const brassMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const lampLightLeftRef = useRef<THREE.PointLight | null>(null);
  const lampLightRightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F0EA);
    scene.fog = new THREE.FogExp2(0xF5F0EA, 0.04);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.2);
    cameraRef.current = camera;

    // 2. Renderer with PBR standards
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // prevent going below floor
    controls.minDistance = 3;
    controls.maxDistance = 12;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // 5. Procedural Textures (Parquet floor & Rug weave)
    const createFloorCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#6D4C33';
      ctx.fillRect(0, 0, 512, 512);

      // Parquet planks
      ctx.strokeStyle = '#513622';
      ctx.lineWidth = 3;
      for (let y = 0; y < 512; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 128) {
        for (let y = 0; y < 512; y += 64) {
          const shift = (y / 64) % 2 === 0 ? 0 : 64;
          ctx.beginPath();
          ctx.moveTo(x + shift, y);
          ctx.lineTo(x + shift, y + 64);
          ctx.stroke();
        }
      }
      return canvas;
    };

    const floorTex = new THREE.CanvasTexture(createFloorCanvas());
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(6, 6);
    floorTex.colorSpace = THREE.SRGBColorSpace;

    // 6. Materials
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.35,
      metalness: 0.05,
    });

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xECE6DE,
      roughness: 0.9,
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x4E3524,
      roughness: 0.4,
      metalness: 0.05,
    });
    woodMatRef.current = woodMat;

    const fabricMat = new THREE.MeshStandardMaterial({
      color: 0xEDE7DF,
      roughness: 0.85,
    });
    fabricMatRef.current = fabricMat;

    const headboardMat = new THREE.MeshStandardMaterial({
      color: 0xD7CBBF,
      roughness: 0.75,
    });
    headboardMatRef.current = headboardMat;

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xC5A880,
      metalness: 0.85,
      roughness: 0.25,
    });
    brassMatRef.current = brassMat;

    const rugMat = new THREE.MeshStandardMaterial({
      color: 0xE2DDD5,
      roughness: 0.95,
    });

    // 7. Architectural Room Shell
    // Floor
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Back Accent Wall
    const backWallGeo = new THREE.PlaneGeometry(16, 9);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 4.5, -3.8);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Fluted Wood Feature Wall Panel behind bed
    const flutedWallGroup = new THREE.Group();
    for (let i = -14; i <= 14; i++) {
      const slatGeo = new THREE.BoxGeometry(0.08, 6, 0.04);
      const slat = new THREE.Mesh(slatGeo, woodMat);
      slat.position.set(i * 0.16, 3, -3.76);
      slat.castShadow = true;
      slat.receiveShadow = true;
      flutedWallGroup.add(slat);
    }
    scene.add(flutedWallGroup);

    // Plush Area Rug
    const rugGeo = new THREE.PlaneGeometry(5.2, 4.2);
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.02, 0.4);
    rug.receiveShadow = true;
    scene.add(rug);

    // 8. Composite King-Size Bed (Multi-part THREE.Group)
    const bedGroup = new THREE.Group();
    bedGroup.position.set(0, 0, 0);

    // 8a. Wooden Platform Plinth
    const plinthGeo = new THREE.BoxGeometry(2.5, 0.22, 2.7);
    const plinth = new THREE.Mesh(plinthGeo, woodMat);
    plinth.position.set(0, 0.11, 0);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    bedGroup.add(plinth);

    // 8b. Bed Side Rails & Footboard
    const railMat = woodMat;
    const footboardGeo = new THREE.BoxGeometry(2.54, 0.38, 0.12);
    const footboard = new THREE.Mesh(footboardGeo, railMat);
    footboard.position.set(0, 0.28, 1.35);
    footboard.castShadow = true;
    bedGroup.add(footboard);

    // 8c. Fluted Upholstered Headboard
    const headboardBackGeo = new THREE.BoxGeometry(3.6, 2.1, 0.16);
    const headboardBack = new THREE.Mesh(headboardBackGeo, woodMat);
    headboardBack.position.set(0, 1.45, -1.35);
    headboardBack.castShadow = true;
    headboardBack.receiveShadow = true;
    bedGroup.add(headboardBack);

    // Headboard soft padded channel flutes
    for (let f = -5; f <= 5; f++) {
      const fluteGeo = new THREE.BoxGeometry(0.24, 1.85, 0.08);
      const fluteMesh = new THREE.Mesh(fluteGeo, headboardMat);
      fluteMesh.position.set(f * 0.28, 1.45, -1.25);
      fluteMesh.castShadow = true;
      bedGroup.add(fluteMesh);
    }

    // 8d. Luxury Mattress
    const mattressGeo = new THREE.BoxGeometry(2.32, 0.42, 2.45);
    const mattress = new THREE.Mesh(mattressGeo, fabricMat);
    mattress.position.set(0, 0.44, 0.05);
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // 8e. Layered Duvet & Quilt
    const duvetGeo = new THREE.BoxGeometry(2.36, 0.28, 1.8);
    const duvet = new THREE.Mesh(duvetGeo, fabricMat);
    duvet.position.set(0, 0.52, 0.42);
    duvet.castShadow = true;
    bedGroup.add(duvet);

    // Folded Bed Runner Throw in accent tone
    const runnerGeo = new THREE.BoxGeometry(2.4, 0.06, 0.6);
    const runner = new THREE.Mesh(runnerGeo, brassMat);
    runner.position.set(0, 0.68, 0.8);
    runner.castShadow = true;
    bedGroup.add(runner);

    // 8f. Two Pillows (Pair)
    const pillowGeo = new THREE.BoxGeometry(0.85, 0.2, 0.5);
    const pillowL = new THREE.Mesh(pillowGeo, fabricMat);
    pillowL.position.set(-0.6, 0.75, -0.85);
    pillowL.rotation.x = 0.25;
    pillowL.castShadow = true;
    bedGroup.add(pillowL);

    const pillowR = new THREE.Mesh(pillowGeo, fabricMat);
    pillowR.position.set(0.6, 0.75, -0.85);
    pillowR.rotation.x = 0.25;
    pillowR.castShadow = true;
    bedGroup.add(pillowR);

    scene.add(bedGroup);

    // 9. Floating / Pedestal Bedside Nightstands
    const createNightstand = (x: number) => {
      const standGroup = new THREE.Group();
      standGroup.position.set(x, 0, -1.15);

      // Wood body
      const bodyGeo = new THREE.BoxGeometry(0.65, 0.55, 0.48);
      const body = new THREE.Mesh(bodyGeo, woodMat);
      body.position.set(0, 0.35, 0);
      body.castShadow = true;
      body.receiveShadow = true;
      standGroup.add(body);

      // Travertine top slab
      const topGeo = new THREE.BoxGeometry(0.68, 0.04, 0.5);
      const topSlab = new THREE.Mesh(topGeo, fabricMat);
      topSlab.position.set(0, 0.64, 0);
      topSlab.castShadow = true;
      standGroup.add(topSlab);

      // Brass horizontal handle
      const handleGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.24);
      const handle = new THREE.Mesh(handleGeo, brassMat);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0, 0.38, 0.25);
      standGroup.add(handle);

      // Modern Table Lamp with glowing shade
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35);
      const stem = new THREE.Mesh(stemGeo, brassMat);
      stem.position.set(0, 0.83, 0);
      standGroup.add(stem);

      const shadeGeo = new THREE.ConeGeometry(0.18, 0.24, 24, 1, true);
      const shadeMat = new THREE.MeshStandardMaterial({
        color: 0xFFF7EB,
        roughness: 0.3,
        emissive: 0xFFD89B,
        emissiveIntensity: 0.6,
      });
      const shade = new THREE.Mesh(shadeGeo, shadeMat);
      shade.position.set(0, 1.05, 0);
      standGroup.add(shade);

      return standGroup;
    };

    scene.add(createNightstand(-1.8));
    scene.add(createNightstand(1.8));

    // 10. Modern Minimalist Wardrobe on Left Side
    const wardrobeGroup = new THREE.Group();
    wardrobeGroup.position.set(-3.8, 0, 0);

    const wardBodyGeo = new THREE.BoxGeometry(0.9, 4.2, 2.6);
    const wardBody = new THREE.Mesh(wardBodyGeo, woodMat);
    wardBody.position.set(0, 2.1, 0);
    wardBody.castShadow = true;
    wardBody.receiveShadow = true;
    wardrobeGroup.add(wardBody);

    // Fluted vertical glass/wood doors
    for (let d = -1; d <= 1; d++) {
      const doorPanelGeo = new THREE.BoxGeometry(0.04, 4.1, 0.8);
      const doorPanel = new THREE.Mesh(doorPanelGeo, headboardMat);
      doorPanel.position.set(0.46, 2.1, d * 0.84);
      wardrobeGroup.add(doorPanel);

      // Long vertical brass door pull
      const doorPullGeo = new THREE.CylinderGeometry(0.014, 0.014, 1.1);
      const doorPull = new THREE.Mesh(doorPullGeo, brassMat);
      doorPull.position.set(0.5, 2.1, d * 0.84 + 0.3);
      wardrobeGroup.add(doorPull);
    }
    scene.add(wardrobeGroup);

    // 11. Soft Contact Shadow Plane Grounding (Three.js Directive)
    const contactShadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const contactShadowCanvas = document.createElement('canvas');
    contactShadowCanvas.width = 128;
    contactShadowCanvas.height = 128;
    const sCtx = contactShadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(30, 20, 15, 0.7)');
    grad.addColorStop(0.5, 'rgba(40, 25, 20, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);

    const contactShadowTex = new THREE.CanvasTexture(contactShadowCanvas);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: contactShadowTex,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, 0.01, 0.1);
    scene.add(contactShadow);

    // 12. 3-Point Studio Lighting Rig
    // Warm Key Light with soft shadow
    const dirLight = new THREE.DirectionalLight(0xFFF3E0, 2.2);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 18;
    dirLight.shadow.camera.left = -5;
    dirLight.shadow.camera.right = 5;
    dirLight.shadow.camera.top = 5;
    dirLight.shadow.camera.bottom = -5;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Fill Light: Soft Sky/Ground Hemisphere
    const hemiLight = new THREE.HemisphereLight(0xFFFBF2, 0xD4C8B8, 1.1);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    // Warm Bedside Point Lights
    const lampLightL = new THREE.PointLight(0xFFB454, 1.8, 4.5, 1.2);
    lampLightL.position.set(-1.8, 1.3, -1.1);
    lampLightL.castShadow = false;
    scene.add(lampLightL);
    lampLightLeftRef.current = lampLightL;

    const lampLightR = new THREE.PointLight(0xFFB454, 1.8, 4.5, 1.2);
    lampLightR.position.set(1.8, 1.3, -1.1);
    lampLightR.castShadow = false;
    scene.add(lampLightR);
    lampLightRightRef.current = lampLightR;

    // Pre-warm shaders
    renderer.compile(scene, camera);
    setIsCanvasReady(true);

    // 13. Render Loop with Frame-Rate Independent Camera Lerping
    let lastTime = performance.now();
    const animate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth Camera view interpolation
      camera.position.lerp(targetCamPosRef.current, delta * 2.8);
      controls.target.lerp(targetLookAtRef.current, delta * 2.8);
      controls.update();

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    // 14. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Material Finishes when user clicks swatches
  useEffect(() => {
    if (!woodMatRef.current || !fabricMatRef.current || !headboardMatRef.current) return;

    if (finishScheme === 'walnut-linen') {
      woodMatRef.current.color.setHex(0x4E3524); // Warm Walnut
      woodMatRef.current.roughness = 0.4;
      fabricMatRef.current.color.setHex(0xEDE7DF); // Oatmeal Linen
      headboardMatRef.current.color.setHex(0xD7CBBF);
      if (brassMatRef.current) brassMatRef.current.color.setHex(0xC5A880);
    } else if (finishScheme === 'ash-boucle') {
      woodMatRef.current.color.setHex(0xC4AA89); // Natural Scandinavian Ash
      woodMatRef.current.roughness = 0.55;
      fabricMatRef.current.color.setHex(0xFAF8F5); // Crisp Ivory Bouclé
      headboardMatRef.current.color.setHex(0xEAE4DC);
      if (brassMatRef.current) brassMatRef.current.color.setHex(0xB8976C);
    } else if (finishScheme === 'ebony-velvet') {
      woodMatRef.current.color.setHex(0x231E1C); // Smoked Charcoal Oak
      woodMatRef.current.roughness = 0.35;
      fabricMatRef.current.color.setHex(0x2B3A42); // Velvet Slate/Navy
      headboardMatRef.current.color.setHex(0x3E4E59);
      if (brassMatRef.current) brassMatRef.current.color.setHex(0xD4AF37);
    }
  }, [finishScheme]);

  // Update Day / Night Lighting
  useEffect(() => {
    if (!dirLightRef.current || !hemiLightRef.current || !lampLightLeftRef.current || !lampLightRightRef.current) return;

    if (isNightMode) {
      // Warm, moody night ambiance
      dirLightRef.current.intensity = 0.6;
      dirLightRef.current.color.setHex(0xFFD29E);
      hemiLightRef.current.intensity = 0.5;
      hemiLightRef.current.color.setHex(0x8C7866);
      lampLightLeftRef.current.intensity = 3.2;
      lampLightRightRef.current.intensity = 3.2;
      if (sceneRef.current) {
        sceneRef.current.background = new THREE.Color(0x221D1A);
        sceneRef.current.fog = new THREE.FogExp2(0x221D1A, 0.05);
      }
    } else {
      // Golden day showroom illumination
      dirLightRef.current.intensity = 2.2;
      dirLightRef.current.color.setHex(0xFFF3E0);
      hemiLightRef.current.intensity = 1.1;
      hemiLightRef.current.color.setHex(0xFFFBF2);
      lampLightLeftRef.current.intensity = 1.6;
      lampLightRightRef.current.intensity = 1.6;
      if (sceneRef.current) {
        sceneRef.current.background = new THREE.Color(0xF5F0EA);
        sceneRef.current.fog = new THREE.FogExp2(0xF5F0EA, 0.04);
      }
    }
  }, [isNightMode]);

  // Smooth camera position transitions
  const setCameraView = (view: 'front' | 'detail' | 'overhead') => {
    setActiveCameraView(view);
    if (view === 'front') {
      targetCamPosRef.current.set(0, 3.8, 6.2);
      targetLookAtRef.current.set(0, 1.2, 0);
    } else if (view === 'detail') {
      targetCamPosRef.current.set(1.4, 2.1, 2.8);
      targetLookAtRef.current.set(0.2, 1.3, -0.4);
    } else if (view === 'overhead') {
      targetCamPosRef.current.set(0.1, 8.5, 0.5);
      targetLookAtRef.current.set(0, 0.2, 0);
    }
  };

  const handleResetCamera = () => {
    setCameraView('front');
  };

  const currentWoodTitle = finishScheme === 'walnut-linen' ? 'Solid Smoked Walnut' : finishScheme === 'ash-boucle' ? 'Scandinavian Natural Ash' : 'Charcoal Oak & Velvet';
  const whatsappUrl = createRoomWhatsAppUrl('Master Bedroom', currentWoodTitle, isNightMode ? 'Evening Ambient' : 'Daylight Suite', 'Flagship Suite Layout');

  return (
    <div className="relative w-full h-[620px] md:h-[720px] lg:h-[780px] bg-[#FAF8F5] overflow-hidden select-none">
      {/* 3D WebGL Canvas Mount (Clean container with no backdrop-blur on canvas) */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Semantic Hero DOM Overlays (Top-Left Zone) */}
      <div className="absolute top-6 left-6 md:top-12 md:left-14 max-w-xl pointer-events-none z-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C5A880] mb-3">
          <span>Showroom Experience</span>
          <span aria-hidden="true">·</span>
          <span>Rajamahendravaram</span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1E1B18] leading-[1.12] tracking-tight text-balance mb-4">
          Transform Your Space. Elevate Your Living.
        </h1>
        <p className="text-sm md:text-base text-[#57534E] leading-relaxed max-w-lg mb-6">
          Discover thoughtfully designed furniture that brings comfort, elegance, and timeless beauty to your home.
        </p>

        {/* Primary CTA Buttons with pointer-events-auto */}
        <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
          <button
            onClick={onExploreClick}
            className="px-6 py-3 bg-[#1E1B18] text-white text-xs md:text-sm font-semibold tracking-wide uppercase rounded hover:bg-[#3E2723] transition-all duration-200 shadow-sm"
          >
            Explore Collection
          </button>
          <button
            onClick={onShowroomClick}
            className="px-5 py-3 bg-white/90 text-[#1E1B18] text-xs md:text-sm font-semibold tracking-wide uppercase rounded border border-[#E8E2D9] hover:bg-white transition-all duration-200 shadow-sm"
          >
            Discover Showroom
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#25D366] text-white text-xs md:text-sm font-semibold tracking-wide uppercase rounded hover:bg-[#20BA5A] transition-all duration-200 shadow-sm inline-flex items-center gap-2"
          >
            <MessageSquareShare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Interactive 3D Orbit Helper Badge (Top-Right Zone) */}
      <div className="absolute top-6 right-6 md:top-12 md:right-14 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-[#E8E2D9] rounded text-xs text-[#57534E]">
        <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>Drag to rotate 3D bedroom · Scroll to zoom</span>
      </div>

      {/* Sleek Collapsible Bottom Dock (Three.js Directive: Zero Viewport Occlusion) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl z-20 transition-all duration-300">
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setControlsCollapsed(!controlsCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1E1B18]/90 text-white text-[11px] font-medium tracking-wide uppercase rounded-t hover:bg-[#1E1B18] transition-colors"
          >
            {controlsCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show 3D Bedroom Studio</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls</span>
              </>
            )}
          </button>
        </div>

        {/* Unified Bottom Control Dock */}
        {!controlsCollapsed && (
          <div className="p-3 md:p-4 bg-white/95 border border-[#E8E2D9] rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            {/* 1. Finish Swatches */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] mr-1">
                Finish:
              </span>
              <button
                onClick={() => setFinishScheme('walnut-linen')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-all ${
                  finishScheme === 'walnut-linen'
                    ? 'bg-[#3E2723] text-white font-semibold'
                    : 'bg-[#F3EFEA] text-[#44403C] hover:bg-[#E8E2D9]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#5C4028]" />
                <span>Walnut & Linen</span>
              </button>
              <button
                onClick={() => setFinishScheme('ash-boucle')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-all ${
                  finishScheme === 'ash-boucle'
                    ? 'bg-[#3E2723] text-white font-semibold'
                    : 'bg-[#F3EFEA] text-[#44403C] hover:bg-[#E8E2D9]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#CBB598]" />
                <span>Ash & Bouclé</span>
              </button>
              <button
                onClick={() => setFinishScheme('ebony-velvet')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-all ${
                  finishScheme === 'ebony-velvet'
                    ? 'bg-[#3E2723] text-white font-semibold'
                    : 'bg-[#F3EFEA] text-[#44403C] hover:bg-[#E8E2D9]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F2937]" />
                <span>Ebony & Velvet</span>
              </button>
            </div>

            {/* 2. Camera View & Lighting Presets */}
            <div className="flex items-center gap-2">
              {/* Camera Views */}
              <div className="flex items-center bg-[#F3EFEA] p-0.5 rounded">
                <button
                  onClick={() => setCameraView('front')}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                    activeCameraView === 'front' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#78716C]'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setCameraView('detail')}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                    activeCameraView === 'detail' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#78716C]'
                  }`}
                >
                  Headboard
                </button>
                <button
                  onClick={() => setCameraView('overhead')}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                    activeCameraView === 'overhead' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#78716C]'
                  }`}
                >
                  Floorplan
                </button>
              </div>

              {/* Day / Night Toggle */}
              <button
                onClick={() => setIsNightMode(!isNightMode)}
                className={`p-1.5 rounded border border-[#E8E2D9] transition-colors ${
                  isNightMode ? 'bg-[#2E2824] text-amber-300' : 'bg-white text-[#78716C] hover:text-[#1E1B18]'
                }`}
                title={isNightMode ? 'Switch to daylight' : 'Switch to evening warm lights'}
              >
                {isNightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {/* Reset Camera Button */}
              <button
                onClick={handleResetCamera}
                className="p-1.5 rounded border border-[#E8E2D9] bg-white text-[#78716C] hover:text-[#1E1B18] transition-colors"
                title="Reset Camera Angle"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* WhatsApp Enquiry for This Custom Setup */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1B18] text-[#C5A880] text-xs font-semibold rounded hover:bg-[#3E2723] transition-colors"
              >
                <span>Enquire This Bedroom</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
