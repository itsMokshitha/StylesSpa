import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoomType } from '../types/furniture';
import { createRoomWhatsAppUrl } from '../data/furnitureData';
import { RotateCcw, Eye, Sparkles, MessageSquareShare, Layers, Palette, Grid } from 'lucide-react';

interface Props {
  initialRoom?: RoomType;
}

export const ThreeRoomDesigner: React.FC<Props> = ({ initialRoom = 'bedroom' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [roomType, setRoomType] = useState<RoomType>(initialRoom);
  const [layoutMode, setLayoutMode] = useState<'spacious' | 'intimate' | 'grand'>('spacious');
  const [woodFinish, setWoodFinish] = useState<'walnut' | 'teak' | 'ash' | 'espresso'>('walnut');
  const [fabricFinish, setFabricFinish] = useState<'oatmeal' | 'emerald' | 'charcoal' | 'cognac'>('oatmeal');
  const [floorType, setFloorType] = useState<'parquet' | 'marble' | 'travertine'>('parquet');
  const [cameraView, setCameraView] = useState<'iso' | 'front' | 'top'>('iso');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const furnitureGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);

  // Dynamic PBR Materials
  const woodMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const fabricMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const accentMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Initialize Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F0EA);
    scene.fog = new THREE.FogExp2(0xF5F0EA, 0.04);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.5, 4.2, 5.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 3.2;
    controls.maxDistance = 14;
    controls.target.set(0, 1.1, 0);
    controlsRef.current = controls;

    // Floor texture
    const floorGeo = new THREE.PlaneGeometry(18, 18);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x6E4F38,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Architectural Studio Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xEAE4DC, roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), wallMat);
    backWall.position.set(0, 4, -4);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), wallMat);
    sideWall.rotation.y = Math.PI / 2;
    sideWall.position.set(-4.5, 4, 0);
    sideWall.receiveShadow = true;
    scene.add(sideWall);

    // Dynamic Materials
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x4E3524, roughness: 0.4, metalness: 0.05 });
    woodMatRef.current = woodMat;

    const fabricMat = new THREE.MeshStandardMaterial({ color: 0xEDE7DF, roughness: 0.85 });
    fabricMatRef.current = fabricMat;

    const accentMat = new THREE.MeshStandardMaterial({ color: 0xC5A880, metalness: 0.8, roughness: 0.25 });
    accentMatRef.current = accentMat;

    // Furniture Container
    const furnitureGroup = new THREE.Group();
    scene.add(furnitureGroup);
    furnitureGroupRef.current = furnitureGroup;

    // 3-Point Lighting
    const keyLight = new THREE.DirectionalLight(0xFFF3E2, 2.3);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xFFFBF5, 0xDDD0C0, 1.2);
    scene.add(fillLight);

    // Warm ambient point light
    const warmPoint = new THREE.PointLight(0xFFB354, 1.5, 8);
    warmPoint.position.set(0, 2.8, 0);
    scene.add(warmPoint);

    renderer.compile(scene, camera);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

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

  // Update Materials colors on state changes
  useEffect(() => {
    if (!woodMatRef.current || !fabricMatRef.current || !floorMeshRef.current) return;

    // Wood
    if (woodFinish === 'walnut') woodMatRef.current.color.setHex(0x4E3524);
    else if (woodFinish === 'teak') woodMatRef.current.color.setHex(0x8C5E35);
    else if (woodFinish === 'ash') woodMatRef.current.color.setHex(0xC2AD8F);
    else if (woodFinish === 'espresso') woodMatRef.current.color.setHex(0x241C18);

    // Fabric
    if (fabricFinish === 'oatmeal') fabricMatRef.current.color.setHex(0xEDE7DF);
    else if (fabricFinish === 'emerald') fabricMatRef.current.color.setHex(0x1A382F);
    else if (fabricFinish === 'charcoal') fabricMatRef.current.color.setHex(0x32353C);
    else if (fabricFinish === 'cognac') fabricMatRef.current.color.setHex(0x8A4F23);

    // Floor
    const floorMat = floorMeshRef.current.material as THREE.MeshStandardMaterial;
    if (floorType === 'parquet') {
      floorMat.color.setHex(0x6E4F38);
      floorMat.roughness = 0.35;
    } else if (floorType === 'marble') {
      floorMat.color.setHex(0xEEEAE4);
      floorMat.roughness = 0.15;
    } else if (floorType === 'travertine') {
      floorMat.color.setHex(0xDCD5C8);
      floorMat.roughness = 0.55;
    }
  }, [woodFinish, fabricFinish, floorType]);

  // Rebuild 3D Furniture objects based on roomType and layoutMode
  useEffect(() => {
    const group = furnitureGroupRef.current;
    if (!group || !woodMatRef.current || !fabricMatRef.current || !accentMatRef.current) return;

    // Clear previous furniture
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    const woodMat = woodMatRef.current;
    const fabricMat = fabricMatRef.current;
    const accentMat = accentMatRef.current;

    // Layout offset factor
    const spread = layoutMode === 'spacious' ? 1.0 : layoutMode === 'intimate' ? 0.78 : 1.25;

    if (roomType === 'bedroom') {
      // 1. King Bed
      const bed = new THREE.Group();
      // Base
      const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 2.6), woodMat);
      base.position.set(0, 0.1, 0);
      base.castShadow = true;
      bed.add(base);

      // Headboard
      const head = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.16), woodMat);
      head.position.set(0, 1.2, -1.3);
      head.castShadow = true;
      bed.add(head);

      // Fluted Fabric Headboard Cushion
      const headCushion = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.5, 0.12), fabricMat);
      headCushion.position.set(0, 1.2, -1.2);
      bed.add(headCushion);

      // Mattress
      const mat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 2.4), fabricMat);
      mat.position.set(0, 0.4, 0);
      mat.castShadow = true;
      bed.add(mat);

      // Pillows
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.45), fabricMat);
      p1.position.set(-0.55, 0.68, -0.8);
      p1.rotation.x = 0.2;
      bed.add(p1);

      const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.45), fabricMat);
      p2.position.set(0.55, 0.68, -0.8);
      p2.rotation.x = 0.2;
      bed.add(p2);

      group.add(bed);

      // 2. Nightstands
      const createStand = (x: number) => {
        const stand = new THREE.Group();
        stand.position.set(x * spread, 0, -1.2);
        const stMesh = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.45), woodMat);
        stMesh.position.set(0, 0.25, 0);
        stMesh.castShadow = true;
        stand.add(stMesh);

        // Lamp
        const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.35), accentMat);
        lampStem.position.set(0, 0.68, 0);
        stand.add(lampStem);

        const shade = new THREE.Mesh(
          new THREE.ConeGeometry(0.16, 0.22, 16),
          new THREE.MeshStandardMaterial({ color: 0xFFF7EC, emissive: 0xFFD89B, emissiveIntensity: 0.5 })
        );
        shade.position.set(0, 0.9, 0);
        stand.add(shade);

        return stand;
      };
      group.add(createStand(-1.9));
      group.add(createStand(1.9));

      // 3. Wardrobe on side
      const wardrobe = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.6, 2.2), woodMat);
      wardrobe.position.set(-3.2 * spread, 1.8, 0.2);
      wardrobe.castShadow = true;
      group.add(wardrobe);

      // 4. Area Rug
      const rug = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 4), new THREE.MeshStandardMaterial({ color: 0xE6DFD5, roughness: 0.95 }));
      rug.rotation.x = -Math.PI / 2;
      rug.position.set(0, 0.02, 0.4);
      rug.receiveShadow = true;
      group.add(rug);

    } else if (roomType === 'living') {
      // 1. Curved Modern 3-Seater Sofa
      const sofa = new THREE.Group();
      sofa.position.set(0, 0, -0.4);

      // Base & Cushions
      const seat = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.4, 0.9), fabricMat);
      seat.position.set(0, 0.35, 0);
      seat.castShadow = true;
      sofa.add(seat);

      const back = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.65, 0.3), fabricMat);
      back.position.set(0, 0.8, -0.32);
      back.castShadow = true;
      sofa.add(back);

      const armL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.55, 0.9), fabricMat);
      armL.position.set(-1.35, 0.5, 0);
      sofa.add(armL);

      const armR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.55, 0.9), fabricMat);
      armR.position.set(1.35, 0.5, 0);
      sofa.add(armR);

      // Wooden plinth base
      const sBase = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 0.85), woodMat);
      sBase.position.set(0, 0.08, 0);
      sofa.add(sBase);
      group.add(sofa);

      // 2. Sculptural Travertine Coffee Table
      const table = new THREE.Group();
      table.position.set(0, 0, 1.2 * spread);
      const top = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 0.06, 32),
        new THREE.MeshStandardMaterial({ color: 0xE8E1D5, roughness: 0.4 })
      );
      top.position.set(0, 0.38, 0);
      top.castShadow = true;
      table.add(top);

      const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.36, 16), woodMat);
      leg1.position.set(-0.35, 0.18, 0.2);
      table.add(leg1);
      const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.36, 16), woodMat);
      leg2.position.set(0.35, 0.18, 0.2);
      table.add(leg2);
      const leg3 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.36, 16), woodMat);
      leg3.position.set(0, 0.18, -0.35);
      table.add(leg3);
      group.add(table);

      // 3. Accent Lounge Armchair
      const chair = new THREE.Group();
      chair.position.set(2.1 * spread, 0, 0.8);
      chair.rotation.y = -Math.PI / 4;
      const cSeat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.8), fabricMat);
      cSeat.position.set(0, 0.35, 0);
      cSeat.castShadow = true;
      chair.add(cSeat);
      const cBack = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.2), fabricMat);
      cBack.position.set(0, 0.7, -0.3);
      chair.add(cBack);
      const cLegs = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.15, 0.75), woodMat);
      cLegs.position.set(0, 0.1, 0);
      chair.add(cLegs);
      group.add(chair);

      // 4. Low-profile Credenza TV console against back wall
      const credenza = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.5, 0.5), woodMat);
      credenza.position.set(0, 0.3, -3.2);
      credenza.castShadow = true;
      group.add(credenza);

      // 5. Living Room Rug
      const rug = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 4.4), new THREE.MeshStandardMaterial({ color: 0xDDD6CB, roughness: 0.9 }));
      rug.rotation.x = -Math.PI / 2;
      rug.position.set(0, 0.02, 0.5);
      rug.receiveShadow = true;
      group.add(rug);

    } else if (roomType === 'dining') {
      // 1. Solid Calacatta Marble Dining Table
      const dTable = new THREE.Group();
      dTable.position.set(0, 0, 0);

      // Marble Top
      const marbleTop = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.08, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xF7F5F0, roughness: 0.2, metalness: 0.05 })
      );
      marbleTop.position.set(0, 0.78, 0);
      marbleTop.castShadow = true;
      dTable.add(marbleTop);

      // Sculptural Teakwood Pedestal Base
      const pedL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.74, 0.8), woodMat);
      pedL.position.set(-0.9, 0.37, 0);
      pedL.castShadow = true;
      dTable.add(pedL);

      const pedR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.74, 0.8), woodMat);
      pedR.position.set(0.9, 0.37, 0);
      pedR.castShadow = true;
      dTable.add(pedR);
      group.add(dTable);

      // 2. Six Dining Chairs
      const createChair = (x: number, z: number, rotY: number) => {
        const c = new THREE.Group();
        c.position.set(x, 0, z);
        c.rotation.y = rotY;

        // Seat
        const s = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.46), fabricMat);
        s.position.set(0, 0.48, 0);
        s.castShadow = true;
        c.add(s);

        // Curved Back
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.42, 0.06), fabricMat);
        b.position.set(0, 0.7, -0.2);
        c.add(b);

        // Legs
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.45, 0.4), woodMat);
        leg.position.set(0, 0.23, 0);
        c.add(leg);

        return c;
      };

      // Top side chairs
      group.add(createChair(-0.8 * spread, -0.9 * spread, 0));
      group.add(createChair(0, -0.9 * spread, 0));
      group.add(createChair(0.8 * spread, -0.9 * spread, 0));

      // Bottom side chairs
      group.add(createChair(-0.8 * spread, 0.9 * spread, Math.PI));
      group.add(createChair(0, 0.9 * spread, Math.PI));
      group.add(createChair(0.8 * spread, 0.9 * spread, Math.PI));

      // 3. Sideboard Buffet on back wall
      const buffet = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 0.55), woodMat);
      buffet.position.set(0, 0.45, -3.2);
      buffet.castShadow = true;
      group.add(buffet);

      // 4. Dining Room Floor Rug
      const rug = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 3.4), new THREE.MeshStandardMaterial({ color: 0xDCD5C9, roughness: 0.9 }));
      rug.rotation.x = -Math.PI / 2;
      rug.position.set(0, 0.02, 0);
      rug.receiveShadow = true;
      group.add(rug);
    }
  }, [roomType, layoutMode]);

  // Handle camera viewpoint switch
  const handleCameraChange = (view: 'iso' | 'front' | 'top') => {
    setCameraView(view);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (view === 'iso') {
      camera.position.set(4.5, 4.2, 5.8);
      controls.target.set(0, 1.1, 0);
    } else if (view === 'front') {
      camera.position.set(0, 2.2, 6.5);
      controls.target.set(0, 1.2, 0);
    } else if (view === 'top') {
      camera.position.set(0.1, 8.5, 0.1);
      controls.target.set(0, 0, 0);
    }
  };

  const handleReset = () => {
    setRoomType('bedroom');
    setLayoutMode('spacious');
    setWoodFinish('walnut');
    setFabricFinish('oatmeal');
    setFloorType('parquet');
    handleCameraChange('iso');
  };

  const whatsappUrl = createRoomWhatsAppUrl(
    roomType,
    woodFinish.toUpperCase(),
    fabricFinish.toUpperCase(),
    `${layoutMode.toUpperCase()} Layout (${floorType} flooring)`
  );

  return (
    <div className="w-full bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] overflow-hidden shadow-sm">
      {/* Designer Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:px-6 bg-white border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Showroom Experience</span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B18]">
            Virtual Room Designer
          </h2>
        </div>

        {/* Room Type Switcher Tabs */}
        <div className="flex items-center p-1 bg-[#F3EFEA] rounded-lg">
          <button
            onClick={() => setRoomType('bedroom')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              roomType === 'bedroom' ? 'bg-[#1E1B18] text-white shadow-xs' : 'text-[#57534E] hover:text-[#1E1B18]'
            }`}
          >
            Master Bedroom
          </button>
          <button
            onClick={() => setRoomType('living')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              roomType === 'living' ? 'bg-[#1E1B18] text-white shadow-xs' : 'text-[#57534E] hover:text-[#1E1B18]'
            }`}
          >
            Living Room
          </button>
          <button
            onClick={() => setRoomType('dining')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              roomType === 'dining' ? 'bg-[#1E1B18] text-white shadow-xs' : 'text-[#57534E] hover:text-[#1E1B18]'
            }`}
          >
            Dining Room
          </button>
        </div>
      </div>

      {/* 3D Viewport with Orbit Canvas */}
      <div className="relative w-full h-[480px] md:h-[580px] bg-[#F5F0EA] overflow-hidden select-none">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top-Right Camera Angle & Reset Pills */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/90 p-1 rounded-lg border border-[#E8E2D9] shadow-xs">
          <button
            onClick={() => handleCameraChange('iso')}
            className={`px-2.5 py-1 text-xs font-medium rounded ${
              cameraView === 'iso' ? 'bg-[#1E1B18] text-white' : 'text-[#57534E] hover:bg-[#F3EFEA]'
            }`}
          >
            3D Angle
          </button>
          <button
            onClick={() => handleCameraChange('front')}
            className={`px-2.5 py-1 text-xs font-medium rounded ${
              cameraView === 'front' ? 'bg-[#1E1B18] text-white' : 'text-[#57534E] hover:bg-[#F3EFEA]'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => handleCameraChange('top')}
            className={`px-2.5 py-1 text-xs font-medium rounded ${
              cameraView === 'top' ? 'bg-[#1E1B18] text-white' : 'text-[#57534E] hover:bg-[#F3EFEA]'
            }`}
          >
            Floorplan
          </button>
          <div className="w-[1px] h-4 bg-[#E8E2D9] mx-0.5" />
          <button
            onClick={handleReset}
            className="p-1 text-[#57534E] hover:text-[#1E1B18] hover:bg-[#F3EFEA] rounded transition-colors"
            title="Reset Room"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3D Interaction Helper Hint */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/80 border border-[#E8E2D9] rounded text-[11px] text-[#57534E] pointer-events-none">
          <Eye className="w-3 h-3 text-[#C5A880]" />
          <span>Click & drag to rotate 360° · Scroll to zoom</span>
        </div>
      </div>

      {/* Interactive Customization Studio Controls */}
      <div className="p-4 md:p-6 bg-white border-t border-[#E8E2D9] space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Wood Finishes */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#78716C]">
              <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Wood Finish</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setWoodFinish('walnut')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  woodFinish === 'walnut' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#4E3524] border border-black/10 shrink-0" />
                <span className="truncate">Smoked Walnut</span>
              </button>
              <button
                onClick={() => setWoodFinish('teak')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  woodFinish === 'teak' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#8C5E35] border border-black/10 shrink-0" />
                <span className="truncate">Natural Teak</span>
              </button>
              <button
                onClick={() => setWoodFinish('ash')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  woodFinish === 'ash' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#C2AD8F] border border-black/10 shrink-0" />
                <span className="truncate">White Ash</span>
              </button>
              <button
                onClick={() => setWoodFinish('espresso')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  woodFinish === 'espresso' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#241C18] border border-black/10 shrink-0" />
                <span className="truncate">Espresso</span>
              </button>
            </div>
          </div>

          {/* 2. Fabric & Upholstery */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#78716C]">
              <Palette className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Upholstery</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setFabricFinish('oatmeal')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  fabricFinish === 'oatmeal' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#EDE7DF] border border-black/10 shrink-0" />
                <span className="truncate">Oatmeal Linen</span>
              </button>
              <button
                onClick={() => setFabricFinish('emerald')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  fabricFinish === 'emerald' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#1A382F] border border-black/10 shrink-0" />
                <span className="truncate">Emerald Velvet</span>
              </button>
              <button
                onClick={() => setFabricFinish('charcoal')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  fabricFinish === 'charcoal' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#32353C] border border-black/10 shrink-0" />
                <span className="truncate">Charcoal Bouclé</span>
              </button>
              <button
                onClick={() => setFabricFinish('cognac')}
                className={`flex items-center gap-2 p-1.5 text-xs rounded border transition-all ${
                  fabricFinish === 'cognac' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#8A4F23] border border-black/10 shrink-0" />
                <span className="truncate">Cognac Leather</span>
              </button>
            </div>
          </div>

          {/* 3. Flooring */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#78716C]">
              <Grid className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Flooring Tone</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setFloorType('parquet')}
                className={`p-1.5 text-xs text-center rounded border transition-all ${
                  floorType === 'parquet' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                Smoked Oak
              </button>
              <button
                onClick={() => setFloorType('marble')}
                className={`p-1.5 text-xs text-center rounded border transition-all ${
                  floorType === 'marble' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                Italian Marble
              </button>
              <button
                onClick={() => setFloorType('travertine')}
                className={`p-1.5 text-xs text-center rounded border transition-all ${
                  floorType === 'travertine' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                Travertine
              </button>
            </div>
          </div>

          {/* 4. Room Layout Arrangement */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#78716C]">
              <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Arrangement</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setLayoutMode('spacious')}
                className={`p-1.5 text-xs text-center rounded border transition-all ${
                  layoutMode === 'spacious' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                Spacious
              </button>
              <button
                onClick={() => setLayoutMode('intimate')}
                className={`p-1.5 text-xs text-center rounded border transition-all ${
                  layoutMode === 'intimate' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                Intimate
              </button>
              <button
                onClick={() => setLayoutMode('grand')}
                className={`p-1.5 text-xs text-center rounded border transition-all ${
                  layoutMode === 'grand' ? 'border-[#3E2723] bg-[#FAF8F5] font-semibold' : 'border-[#E8E2D9] hover:bg-[#FAF8F5]'
                }`}
              >
                Grand
              </button>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#78716C]">
            <span>Configuring: </span>
            <strong className="text-[#1E1B18] capitalize">
              {roomType} Suite with {woodFinish} wood & {fabricFinish} fabric
            </strong>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded hover:bg-[#20BA5A] transition-colors shadow-sm"
          >
            <MessageSquareShare className="w-4 h-4" />
            <span>Enquire This Room on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
