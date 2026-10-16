import React, { useState, useEffect } from 'react';
import { ProductCategory } from '../types/furniture';
import { getProductPrimaryImage, getCategoryImage } from '../data/furnitureImages';

interface Props {
  imageId?: string;
  imageUrl?: string;
  productId?: string;
  category: ProductCategory;
  name: string;
  className?: string;
  aspect?: '4/3' | '16/9' | '1/1' | 'auto';
  objectFit?: 'cover' | 'contain';
}

export const FurnitureVisual: React.FC<Props> = ({
  imageId,
  imageUrl,
  productId,
  category,
  name,
  className = '',
  aspect = '4/3',
  objectFit = 'cover',
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Resolve best photo URL (direct prop > productId lookup > imageId if URL > category default)
  const resolveImage = () => {
    if (imageUrl) return imageUrl;
    if (imageId && (imageId.startsWith('http') || imageId.startsWith('data:') || imageId.startsWith('/'))) {
      return imageId;
    }
    if (productId) {
      return getProductPrimaryImage(productId, category);
    }
    return getCategoryImage(category);
  };

  useEffect(() => {
    const resolved = resolveImage();
    setImgSrc(resolved);
    setHasError(false);
    setIsLoaded(false);
  }, [productId, imageUrl, imageId, category]);

  // Listen to custom updates from the Furniture Image Studio
  useEffect(() => {
    const handleUpdate = () => {
      const resolved = resolveImage();
      setImgSrc(resolved);
      setHasError(false);
      setIsLoaded(false);
    };
    window.addEventListener('stylespa_images_updated', handleUpdate);
    return () => window.removeEventListener('stylespa_images_updated', handleUpdate);
  }, [productId, imageUrl, imageId, category]);

  // Palette and thematic styling based on item (used as high-fidelity fallback)
  const renderVisual = () => {
    switch (category) {
      case 'Luxury Beds':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EFECE6" />
                <stop offset="100%" stopColor="#DFD9D0" />
              </linearGradient>
              <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7A5C43" />
                <stop offset="100%" stopColor="#5C4028" />
              </linearGradient>
              <linearGradient id="woodHead" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4A3525" />
                <stop offset="50%" stopColor="#5A4230" />
                <stop offset="100%" stopColor="#3E2A1C" />
              </linearGradient>
              <linearGradient id="linenSheet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#E2DDD5" />
              </linearGradient>
              <linearGradient id="duvetFold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D5CDC1" />
                <stop offset="100%" stopColor="#C4BAAC" />
              </linearGradient>
              <linearGradient id="lampGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFECC7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFECC7" stopOpacity="0" />
              </linearGradient>
              <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Architectural Room Backdrop */}
            <rect x="0" y="0" width="400" height="200" fill="url(#wallGrad)" />
            {/* Parquet Floor with perspective */}
            <polygon points="0,200 400,200 400,300 0,300" fill="url(#floorGrad)" />

            {/* Fluted Wood Wall Detail */}
            <g opacity="0.25">
              {[...Array(20)].map((_, i) => (
                <rect key={i} x={60 + i * 14} y="30" width="8" height="170" fill="#3E2723" rx="2" />
              ))}
            </g>

            {/* Designer Warm Pendant Glow */}
            <circle cx="50" cy="90" r="35" fill="url(#lampGlow)" />
            <line x1="50" y1="0" x2="50" y2="85" stroke="#C5A880" strokeWidth="1.5" />
            <circle cx="50" cy="88" r="6" fill="#FFFDF9" />

            <circle cx="350" cy="90" r="35" fill="url(#lampGlow)" />
            <line x1="350" y1="0" x2="350" y2="85" stroke="#C5A880" strokeWidth="1.5" />
            <circle cx="350" cy="88" r="6" fill="#FFFDF9" />

            {/* Left & Right Nightstands */}
            <rect x="30" y="170" width="44" height="42" rx="3" fill="#4A3525" filter="url(#softShadow)" />
            <rect x="33" y="185" width="38" height="2" fill="#C5A880" />
            <rect x="326" y="170" width="44" height="42" rx="3" fill="#4A3525" filter="url(#softShadow)" />
            <rect x="329" y="185" width="38" height="2" fill="#C5A880" />

            {/* Fluted Bed Headboard */}
            <g filter="url(#softShadow)">
              <rect x="75" y="65" width="250" height="135" rx="8" fill="url(#woodHead)" />
              {/* Upholstered Channel Tufting */}
              <rect x="85" y="75" width="230" height="115" rx="6" fill="#D7CEC2" />
              {[...Array(9)].map((_, i) => (
                <rect key={i} x={95 + i * 24} y="77" width="18" height="111" rx="4" fill="#E8E1D5" opacity="0.9" />
              ))}
            </g>

            {/* Mattress Base & Platform */}
            <rect x="80" y="180" width="240" height="35" rx="4" fill="url(#linenSheet)" filter="url(#softShadow)" />
            {/* Duvet Quilted Layer */}
            <path d="M 80 200 Q 200 210 320 200 L 320 245 Q 200 252 80 245 Z" fill="url(#duvetFold)" />
            {/* Luxurious Folded Bed Throw */}
            <path d="M 80 230 Q 200 236 320 230 L 320 250 Q 200 255 80 250 Z" fill="#9E8262" />

            {/* Fluffy Pillows */}
            <rect x="105" y="160" width="85" height="32" rx="8" fill="#FFFDF9" filter="url(#softShadow)" />
            <rect x="210" y="160" width="85" height="32" rx="8" fill="#FFFDF9" filter="url(#softShadow)" />
            <rect x="120" y="170" width="60" height="25" rx="5" fill="#EAE5DC" />
            <rect x="220" y="170" width="60" height="25" rx="5" fill="#EAE5DC" />

            {/* Bed Platform Plinth & Shadow */}
            <rect x="90" y="248" width="220" height="12" fill="#2E1C12" rx="2" />
          </svg>
        );

      case 'Modern Sofas':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="sofaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5F3EF" />
                <stop offset="100%" stopColor="#E2DDD5" />
              </linearGradient>
              <linearGradient id="sofaBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A4E57" />
                <stop offset="100%" stopColor="#2E323B" />
              </linearGradient>
              <linearGradient id="cushionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5E636E" />
                <stop offset="100%" stopColor="#3C4049" />
              </linearGradient>
              <filter id="sofaShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="16" stdDeviation="12" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Clean Studio Neutral Ground */}
            <rect x="0" y="0" width="400" height="300" fill="#F8F6F2" />
            {/* Ground Contact Shadow */}
            <ellipse cx="200" cy="245" rx="150" ry="18" fill="#D3CBC0" opacity="0.6" />

            {/* Backrest curved shell */}
            <g filter="url(#sofaShadow)">
              <path d="M 60 155 Q 60 95 110 95 L 290 95 Q 340 95 340 155 L 340 215 L 60 215 Z" fill="url(#sofaBody)" />
              {/* Back Soft Cushions */}
              <rect x="75" y="105" width="75" height="85" rx="12" fill="url(#cushionGrad)" />
              <rect x="162" y="105" width="75" height="85" rx="12" fill="url(#cushionGrad)" />
              <rect x="250" y="105" width="75" height="85" rx="12" fill="url(#cushionGrad)" />

              {/* Deep Seat Cushions */}
              <rect x="65" y="180" width="85" height="45" rx="10" fill="#4B505A" />
              <rect x="157" y="180" width="85" height="45" rx="10" fill="#4B505A" />
              <rect x="250" y="180" width="85" height="45" rx="10" fill="#4B505A" />

              {/* Curved Armrests */}
              <path d="M 50 150 Q 50 135 65 135 L 75 135 L 75 220 L 55 220 Q 50 220 50 205 Z" fill="#3D424B" />
              <path d="M 350 150 Q 350 135 335 135 L 325 135 L 325 220 L 345 220 Q 350 220 350 205 Z" fill="#3D424B" />
            </g>

            {/* Accent Cushions */}
            <rect x="85" y="150" width="40" height="40" rx="8" fill="#C5A880" transform="rotate(-6 85 150)" />
            <rect x="275" y="145" width="40" height="40" rx="8" fill="#DFD7CB" transform="rotate(8 275 145)" />

            {/* Sculptural Solid Walnut Legs */}
            <polygon points="75,225 80,225 83,248 72,248" fill="#4A3425" />
            <polygon points="155,225 160,225 161,248 154,248" fill="#4A3425" />
            <polygon points="240,225 245,225 246,248 239,248" fill="#4A3425" />
            <polygon points="325,225 330,225 333,248 322,248" fill="#4A3425" />
          </svg>
        );

      case 'Recliners':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="leatherGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9C6634" />
                <stop offset="50%" stopColor="#7E4C20" />
                <stop offset="100%" stopColor="#5D3512" />
              </linearGradient>
              <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0E0E0" />
                <stop offset="50%" stopColor="#A0A0A0" />
                <stop offset="100%" stopColor="#E0E0E0" />
              </linearGradient>
              <filter id="recShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="14" stdDeviation="10" floodOpacity="0.25" />
              </filter>
            </defs>
            <rect x="0" y="0" width="400" height="300" fill="#FAF7F2" />
            <ellipse cx="200" cy="250" rx="100" ry="14" fill="#D3C9BD" opacity="0.6" />

            <g filter="url(#recShadow)">
              {/* Backrest Ergonomic Contour */}
              <path d="M 140 70 Q 200 60 260 70 L 250 175 Q 200 180 150 175 Z" fill="url(#leatherGrad)" />
              {/* Headrest pillow */}
              <rect x="155" y="75" width="90" height="35" rx="12" fill="#B37841" />
              {/* Lumbar Support Pillows */}
              <rect x="150" y="125" width="100" height="35" rx="10" fill="#885223" />
              {/* Deep Seat */}
              <path d="M 130 170 Q 200 165 270 170 L 280 215 Q 200 225 120 215 Z" fill="url(#leatherGrad)" />
              {/* Padded Arms */}
              <rect x="110" y="140" width="30" height="70" rx="12" fill="#854F22" />
              <rect x="260" y="140" width="30" height="70" rx="12" fill="#854F22" />
              {/* Footrest section */}
              <rect x="135" y="215" width="130" height="22" rx="6" fill="#6A3D18" />
            </g>

            {/* Brushed Chrome Swivel Base */}
            <rect x="195" y="235" width="10" height="15" fill="url(#chromeGrad)" />
            <ellipse cx="200" cy="249" rx="50" ry="8" fill="url(#chromeGrad)" />
          </svg>
        );

      case 'Wardrobes':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#252427" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#3C3942" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#252427" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="ledStrip" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE8B3" />
                <stop offset="100%" stopColor="#FFAA33" />
              </linearGradient>
              <filter id="wardShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="16" stdDeviation="12" floodOpacity="0.3" />
              </filter>
            </defs>
            <rect x="0" y="0" width="400" height="300" fill="#F4EFEA" />
            <ellipse cx="200" cy="275" rx="130" ry="12" fill="#CEC3B5" opacity="0.6" />

            {/* Wardrobe Outer Frame */}
            <g filter="url(#wardShadow)">
              <rect x="90" y="25" width="220" height="245" rx="4" fill="#382E2B" />
              {/* Interior Back Panel */}
              <rect x="96" y="31" width="208" height="233" fill="#4D3F3B" />

              {/* Internal Shelving & LED Lights */}
              <rect x="96" y="31" width="3" height="233" fill="url(#ledStrip)" opacity="0.8" />
              <rect x="301" y="31" width="3" height="233" fill="url(#ledStrip)" opacity="0.8" />
              <line x1="96" y1="90" x2="304" y2="90" stroke="#68554F" strokeWidth="3" />
              <line x1="96" y1="180" x2="304" y2="180" stroke="#68554F" strokeWidth="3" />
              <line x1="200" y1="31" x2="200" y2="264" stroke="#68554F" strokeWidth="3" />

              {/* Hanging Rail & Garments silhouette */}
              <line x1="102" y1="105" x2="194" y2="105" stroke="#C5A880" strokeWidth="2" />
              <path d="M 115 110 L 135 110 L 140 170 L 110 170 Z" fill="#2E2420" opacity="0.7" />
              <path d="M 145 110 L 165 110 L 170 165 L 140 165 Z" fill="#6B5951" opacity="0.7" />

              {/* Drawers in Right Column */}
              <rect x="206" y="190" width="92" height="30" rx="2" fill="#5A4A44" />
              <rect x="248" y="202" width="10" height="2" fill="#C5A880" />
              <rect x="206" y="226" width="92" height="30" rx="2" fill="#5A4A44" />
              <rect x="248" y="238" width="10" height="2" fill="#C5A880" />

              {/* Smoked Fluted Glass Doors */}
              <rect x="96" y="31" width="101" height="233" fill="url(#glassGrad)" />
              <rect x="203" y="31" width="101" height="233" fill="url(#glassGrad)" />

              {/* Champagne Gold Long Vertical Handles */}
              <rect x="190" y="120" width="3" height="60" rx="1.5" fill="#D4AF37" />
              <rect x="207" y="120" width="3" height="60" rx="1.5" fill="#D4AF37" />
            </g>
          </svg>
        );

      case 'Dining Tables and Chairs':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="marbleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F5F3EF" />
                <stop offset="100%" stopColor="#E8E4DC" />
              </linearGradient>
              <filter id="dinShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="16" stdDeviation="12" floodOpacity="0.25" />
              </filter>
            </defs>
            <rect x="0" y="0" width="400" height="300" fill="#F8F6F1" />
            <ellipse cx="200" cy="255" rx="140" ry="14" fill="#DDD5C8" opacity="0.6" />

            {/* Back Dining Chairs */}
            <g opacity="0.85">
              <rect x="100" y="95" width="40" height="55" rx="6" fill="#8C7359" />
              <rect x="180" y="95" width="40" height="55" rx="6" fill="#8C7359" />
              <rect x="260" y="95" width="40" height="55" rx="6" fill="#8C7359" />
            </g>

            {/* Marble Dining Table */}
            <g filter="url(#dinShadow)">
              {/* Marble Tabletop Bevel */}
              <ellipse cx="200" cy="170" rx="135" ry="32" fill="url(#marbleGrad)" />
              {/* Marble Veins */}
              <path d="M 120 165 Q 160 162 200 172 Q 240 178 280 168" stroke="#D3C9BD" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M 150 172 Q 190 176 220 166" stroke="#C5B9AC" strokeWidth="1.5" fill="none" opacity="0.7" />

              {/* Sculptural Teakwood Pedestal Base */}
              <polygon points="175,175 225,175 215,248 185,248" fill="#4E3424" />
              <ellipse cx="200" cy="248" rx="45" ry="8" fill="#3D2719" />
            </g>

            {/* Front Upholstered Dining Chairs */}
            <g filter="url(#dinShadow)">
              {/* Left Chair */}
              <rect x="110" y="175" width="46" height="42" rx="8" fill="#B5A18C" />
              <polygon points="115,217 119,217 117,255 113,255" fill="#3E2723" />
              <polygon points="151,217 155,217 153,255 149,255" fill="#3E2723" />

              {/* Center Chair */}
              <rect x="177" y="180" width="46" height="42" rx="8" fill="#B5A18C" />
              <polygon points="182,222 186,222 184,260 180,260" fill="#3E2723" />
              <polygon points="218,222 222,222 220,260 216,260" fill="#3E2723" />

              {/* Right Chair */}
              <rect x="244" y="175" width="46" height="42" rx="8" fill="#B5A18C" />
              <polygon points="249,217 253,217 251,255 247,255" fill="#3E2723" />
              <polygon points="285,217 289,217 287,255 283,255" fill="#3E2723" />
            </g>
          </svg>
        );

      case 'Bedroom Furniture Sets':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="suiteWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ECE7E0" />
                <stop offset="100%" stopColor="#DDD5C8" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="400" height="200" fill="url(#suiteWall)" />
            <rect x="0" y="200" width="400" height="100" fill="#694C37" />

            {/* Wardrobe on Left */}
            <rect x="25" y="45" width="70" height="175" fill="#3A291E" rx="2" />
            <rect x="90" y="110" width="2" height="40" fill="#C5A880" />

            {/* King Bed in Center */}
            <rect x="115" y="80" width="180" height="105" rx="6" fill="#4B3627" />
            <rect x="125" y="90" width="160" height="85" rx="4" fill="#C5B39E" />
            <rect x="120" y="165" width="170" height="45" rx="4" fill="#F4EFEA" />
            <rect x="120" y="185" width="170" height="25" fill="#9C8164" />
            <rect x="135" y="150" width="60" height="22" rx="4" fill="#FFFDF9" />
            <rect x="215" y="150" width="60" height="22" rx="4" fill="#FFFDF9" />

            {/* Nightstands on Right */}
            <rect x="305" y="160" width="40" height="45" fill="#3A291E" rx="2" />
            <rect x="310" y="178" width="30" height="2" fill="#C5A880" />

            {/* Dresser Vanity Frame */}
            <rect x="355" y="140" width="30" height="65" fill="#4B3627" rx="2" />
            <circle cx="370" cy="115" r="15" fill="#E8DEC8" stroke="#C5A880" strokeWidth="2" />
          </svg>
        );

      case 'Office Chairs':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="meshGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3F444E" />
                <stop offset="100%" stopColor="#1E2024" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="400" height="300" fill="#F6F7F9" />
            <ellipse cx="200" cy="265" rx="75" ry="10" fill="#D3D6DC" />

            {/* High Backrest Mesh */}
            <path d="M 160 50 Q 200 45 240 50 L 235 155 Q 200 162 165 155 Z" fill="url(#meshGrad)" rx="8" />
            {/* Ergonomic Lumbar Cushion */}
            <rect x="172" y="125" width="56" height="20" rx="6" fill="#111315" />
            {/* Integrated Headrest */}
            <rect x="175" y="32" width="50" height="24" rx="8" fill="#1C1E22" />

            {/* Waterfall Seat */}
            <rect x="150" y="160" width="100" height="34" rx="10" fill="#2B2F38" />

            {/* 3D Armrests */}
            <path d="M 135 125 L 148 125 L 148 180 L 140 180 Z" fill="#1A1C20" />
            <path d="M 265 125 L 252 125 L 252 180 L 260 180 Z" fill="#1A1C20" />
            <rect x="130" y="120" width="24" height="8" rx="3" fill="#3F444E" />
            <rect x="246" y="120" width="24" height="8" rx="3" fill="#3F444E" />

            {/* Gas Lift Piston */}
            <rect x="196" y="194" width="8" height="40" fill="#9095A0" />

            {/* 5-Star Chrome Base */}
            <polygon points="200,234 140,255 144,260 200,238" fill="#B0B5BF" />
            <polygon points="200,234 260,255 256,260 200,238" fill="#B0B5BF" />
            <circle cx="140" cy="258" r="6" fill="#2B2F38" />
            <circle cx="260" cy="258" r="6" fill="#2B2F38" />
            <circle cx="200" cy="265" r="6" fill="#2B2F38" />
          </svg>
        );

      case 'Hospital and Comfort Chairs':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <rect x="0" y="0" width="400" height="300" fill="#F4F8F8" />
            <ellipse cx="200" cy="255" rx="85" ry="12" fill="#D0DDDC" />

            {/* Power Lift Sturdy Frame */}
            <path d="M 145 65 Q 200 58 255 65 L 250 170 Q 200 175 150 170 Z" fill="#385860" />
            <rect x="160" y="72" width="80" height="32" rx="8" fill="#4B6F78" />
            <rect x="155" y="120" width="90" height="30" rx="8" fill="#2E484F" />

            {/* Padded Seat Cushion */}
            <rect x="135" y="165" width="130" height="42" rx="10" fill="#385860" />

            {/* Padded Sturdy Armrests */}
            <rect x="120" y="130" width="22" height="75" rx="8" fill="#243C42" />
            <rect x="258" y="130" width="22" height="75" rx="8" fill="#243C42" />

            {/* Heavy-Duty Steel Scissor Lift Base */}
            <line x1="160" y1="207" x2="185" y2="245" stroke="#718E94" strokeWidth="6" />
            <line x1="240" y1="207" x2="215" y2="245" stroke="#718E94" strokeWidth="6" />
            <rect x="140" y="244" width="120" height="8" rx="3" fill="#243C42" />
          </svg>
        );

      case 'Side Tables and Bedside Cabinets':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="travertine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EFECE4" />
                <stop offset="50%" stopColor="#E5E0D5" />
                <stop offset="100%" stopColor="#D8D2C4" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="400" height="300" fill="#FAF8F5" />
            <ellipse cx="200" cy="255" rx="80" ry="12" fill="#DED6CB" />

            {/* Travertine Slab Inset Top */}
            <ellipse cx="200" cy="110" rx="85" ry="25" fill="url(#travertine)" />

            {/* Solid Teak Cabinet Body */}
            <rect x="125" y="125" width="150" height="110" rx="8" fill="#583B28" />

            {/* Top Drawer */}
            <rect x="133" y="133" width="134" height="44" rx="4" fill="#6A4731" />
            <rect x="185" y="153" width="30" height="3" fill="#C5A880" rx="1.5" />

            {/* Bottom Drawer */}
            <rect x="133" y="183" width="134" height="44" rx="4" fill="#6A4731" />
            <rect x="185" y="203" width="30" height="3" fill="#C5A880" rx="1.5" />

            {/* Rounded Teak Legs */}
            <rect x="135" y="235" width="10" height="18" fill="#422C1E" rx="2" />
            <rect x="255" y="235" width="10" height="18" fill="#422C1E" rx="2" />
          </svg>
        );

      case 'Custom Furniture':
      default:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <rect x="0" y="0" width="400" height="300" fill="#F7F4EE" />
            <ellipse cx="200" cy="255" rx="110" ry="14" fill="#DFD7CB" />

            {/* Architectural Blueprint Grid */}
            <g opacity="0.15">
              {[...Array(12)].map((_, i) => (
                <line key={`v-${i}`} x1={i * 35} y1="0" x2={i * 35} y2="300" stroke="#7A6046" strokeWidth="1" />
              ))}
              {[...Array(10)].map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="#7A6046" strokeWidth="1" />
              ))}
            </g>

            {/* Custom Millwork Wall Unit */}
            <rect x="70" y="45" width="260" height="195" rx="6" fill="#4E3B30" />
            <rect x="80" y="55" width="115" height="175" rx="4" fill="#C5A880" opacity="0.3" />
            <rect x="205" y="55" width="115" height="175" rx="4" fill="#3D2D24" />

            {/* Brass Inlay Ruler Marker */}
            <line x1="85" y1="215" x2="315" y2="215" stroke="#C5A880" strokeWidth="2" strokeDasharray="6,4" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#F3EFEA] flex items-center justify-center ${className}`}
      style={aspect !== 'auto' ? { aspectRatio: aspect } : undefined}
    >
      {imgSrc && !hasError ? (
        <>
          {/* Subtle loading shimmer */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#F0ECE1] via-[#E8E2D9] to-[#F0ECE1] animate-pulse" />
          )}

          <img
            src={imgSrc}
            alt={name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full ${
              objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'
            } transition-all duration-700 group-hover:scale-105 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
            }`}
          />
        </>
      ) : (
        renderVisual()
      )}
    </div>
  );
};
