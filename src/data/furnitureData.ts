import { Product } from '../types/furniture';

export const STORE_PHONE_DISPLAY = '080749 21404';
export const STORE_PHONE_NUMERIC = '918074921404';
export const STORE_ADDRESS = '44-15-16, Old Bypass Road, opposite Neta Bazar, Tadithota, Rajamahendravaram, Andhra Pradesh 533104';
export const STORE_GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=STYLE+SPA+FURNITURE+44-15-16+Old+Bypass+Road+opposite+Neta+Bazar+Tadithota+Rajamahendravaram+Andhra+Pradesh+533104';

export const createWhatsAppUrl = (productName: string, price: number, id?: string) => {
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;
  const message = `Hello STYLE SPA FURNITURE, I am interested in ${productName} (Sample Price: ${formattedPrice}). Please share the verified showroom price, available colors, and delivery details for Rajamahendravaram.`;
  return `https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent(message)}`;
};

export const createRoomWhatsAppUrl = (roomType: string, wood: string, fabric: string, layout: string) => {
  const message = `Hello STYLE SPA FURNITURE, I designed a 3D ${roomType.toUpperCase()} in the virtual studio with ${wood} wood finish, ${fabric} upholstery, and ${layout} layout. Could you guide me on customizing this for my home and schedule a showroom consultation?`;
  return `https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent(message)}`;
};

export const PRODUCTS_DATA: Product[] = [
  // 1. Luxury Beds
  {
    id: 'sp-bed-01',
    name: 'Aura Fluted King Bed',
    category: 'Luxury Beds',
    price: 64500,
    originalPrice: 76000,
    shortDescription: 'Grand fluted upholstered headboard with solid teak wood floating frame and hidden underbed warm mood lighting.',
    description: 'The Aura King Bed is our flagship bedroom centerpiece. Meticulously upholstered in stain-resistant Belgian linen, paired with hand-finished Indian teakwood side rails. The high-rebound cushioned backrest provides supreme reading ergonomics before sleep.',
    dimensions: {
      width: '78 inches',
      length: '84 inches',
      height: '52 inches',
      mattressSize: '72 x 78 inches (King)',
    },
    materials: ['Solid Indian Teak', 'Belgian Textured Linen', 'Marine Ply Sub-Base', 'Brass Caps'],
    colors: [
      { name: 'Oatmeal Linen', hex: '#E6DFD5' },
      { name: 'Walnut Beige', hex: '#C2B69D' },
      { name: 'Charcoal Weave', hex: '#3B3A39' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Kiln-dried Seasoned Teakwood',
      upholstery: '380 GSM Heavy Belgian Linen Blend',
      foamDensity: '32 High Resilient Foam Backing',
      hardware: 'Concealed German Steel Bed Fittings',
      warranty: '5 Years Structural Warranty',
      assembly: 'Complimentary Free Assembly at your home',
    },
    isNewArrival: true,
    isPopular: true,
    style: 'Contemporary Luxury',
    images: {
      primary: 'bed-aura',
      angles: ['bed-aura-angle', 'bed-aura-headboard', 'bed-aura-side'],
    },
  },
  {
    id: 'sp-bed-02',
    name: 'Elysian Smoked Walnut Wingback Bed',
    category: 'Luxury Beds',
    price: 82000,
    originalPrice: 94000,
    shortDescription: 'Curved acoustic wingback silhouette with channel tufting and integrated dual soft-touch brass USB reading lights.',
    description: 'Designed for master bedrooms requiring dramatic elegance. The Elysian features sheltering upholstered wings that soften ambient room sound, resting on tapered smoked walnut legs.',
    dimensions: {
      width: '82 inches',
      length: '86 inches',
      height: '56 inches',
      mattressSize: '72 x 78 inches (King)',
    },
    materials: ['Seasoned Smoked Walnut', 'Italian Cotton Velvet', 'Solid Core Birch', 'Brushed Brass'],
    colors: [
      { name: 'Warm Taupe', hex: '#8F8275' },
      { name: 'Deep Olive', hex: '#4B5320' },
      { name: 'Midnight Navy', hex: '#1C2833' },
    ],
    availability: 'Ready for Delivery',
    specifications: {
      woodType: 'American Smoked Walnut Veneer & Teak Structure',
      upholstery: 'Italian Micro-Velvet (Water Repellent)',
      foamDensity: '40D Sleep Comfort Cushioning',
      warranty: '5 Years Structural Warranty',
      assembly: 'Showroom Delivery Team Assembly',
    },
    isPopular: true,
    style: 'Classic Royal',
    images: {
      primary: 'bed-elysian',
      angles: ['bed-elysian-front', 'bed-elysian-wing', 'bed-elysian-wood'],
    },
  },
  {
    id: 'sp-bed-03',
    name: 'Solace Low-Platform Queen Bed',
    category: 'Luxury Beds',
    price: 49000,
    originalPrice: 56000,
    shortDescription: 'Low Japanese-inspired platform bed with extended floating bedside ledges and slatted wooden headboard.',
    description: 'The Solace brings mindful tranquility and airy grounded proportions. Features seamless continuous wood grain along the perimeter ledge, ideal for modern apartments.',
    dimensions: {
      width: '88 inches (incl. ledges)',
      length: '84 inches',
      height: '36 inches',
      mattressSize: '60 x 78 inches (Queen)',
    },
    materials: ['Natural White Ash Wood', 'Matte Polyurethane Coat', 'Solid Ply Slats'],
    colors: [
      { name: 'Natural Ash', hex: '#D8C6A5' },
      { name: 'Smoked Oak', hex: '#634832' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Solid Ash with Organic Matte Sealer',
      hardware: 'Anti-Creak Slatted Base Connectors',
      warranty: '5 Years Structural Warranty',
      assembly: 'Included by Style Spa Specialists',
    },
    style: 'Modern Minimalist',
    images: {
      primary: 'bed-solace',
      angles: ['bed-solace-side', 'bed-solace-detail'],
    },
  },

  // 2. Modern Sofas
  {
    id: 'sp-sofa-01',
    name: 'Verona Curved 3-Seater Sofa',
    category: 'Modern Sofas',
    price: 58000,
    originalPrice: 68000,
    shortDescription: 'Organic sculptural curve sofa wrapped in cloud-soft off-white bouclé with recessed dark walnut base.',
    description: 'An architectural statement piece tailored for comfortable living rooms. Its welcoming crescent form encourages intimate conversation while offering high-density pocket spring seating.',
    dimensions: {
      width: '92 inches',
      length: '38 inches depth',
      height: '31 inches',
    },
    materials: ['High Resilience Cloud Foam', 'Textured Bouclé Fabric', 'Hardwood Pine Frame', 'Walnut Plinth'],
    colors: [
      { name: 'Ivory Bouclé', hex: '#F0ECE1' },
      { name: 'Pebble Grey', hex: '#9E9D99' },
      { name: 'Warm Terracotta', hex: '#A85A44' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Kiln-Dried Hardwood Internal Frame',
      upholstery: 'Heavyweight Loop Bouclé (Rub Count: 45,000)',
      foamDensity: 'Dual Layer 35D + Pocket Spring Support',
      warranty: '5 Years Frame & Spring Guarantee',
      assembly: 'Delivered fully assembled with felt pads',
    },
    isPopular: true,
    isNewArrival: true,
    style: 'Contemporary Luxury',
    images: {
      primary: 'sofa-verona',
      angles: ['sofa-verona-curve', 'sofa-verona-texture'],
    },
  },
  {
    id: 'sp-sofa-02',
    name: 'Montrose L-Shape Modular Sectional',
    category: 'Modern Sofas',
    price: 92000,
    originalPrice: 108000,
    shortDescription: 'Deep-seat sectional with broad feather-blend back cushions, reversible chaise lounge, and stain-resistant fabric.',
    description: 'Generously proportioned for movie nights and family gatherings. Featuring extra deep 42-inch cushions with removable dry-cleanable covers and durable structural corner blocks.',
    dimensions: {
      width: '114 inches',
      length: '68 inches chaise',
      height: '33 inches',
    },
    materials: ['Pocket Spring Base', 'Hydro-Shield Chenille Fabric', 'Reinforced Teak Frame'],
    colors: [
      { name: 'Charcoal Slate', hex: '#373A40' },
      { name: 'Almond Khaki', hex: '#D6C7B2' },
      { name: 'Ocean Spruce', hex: '#2C4A48' },
    ],
    availability: 'Custom Made to Order',
    specifications: {
      woodType: 'Solid Salwood & Commercial Ply Structure',
      upholstery: 'Water & Spill Repellent Woven Chenille',
      foamDensity: '40 Density High Recovery Core',
      warranty: '5 Years Frame Warranty',
      assembly: 'Modular Interlocking Pins, free installation',
    },
    style: 'Contemporary Luxury',
    images: {
      primary: 'sofa-montrose',
      angles: ['sofa-montrose-chaise', 'sofa-montrose-depth'],
    },
  },

  // 3. Recliners
  {
    id: 'sp-rec-01',
    name: 'Sereno Motorized Zero-Gravity Recliner',
    category: 'Recliners',
    price: 46000,
    originalPrice: 54000,
    shortDescription: 'Dual-motor German powered recliner with independent back & footrest controls and integrated USB-C fast charging.',
    description: 'Engineered for optimal spine decompression. Reclines to a true 160-degree zero-gravity ergonomic posture, easing pressure on lumbar discs and enhancing circulatory flow.',
    dimensions: {
      width: '36 inches',
      length: '38 inches (closed) / 66 inches (reclined)',
      height: '42 inches',
    },
    materials: ['Full-Grain Italian Semi-Aniline Leather', 'Heavy-Duty Steel Chassis', 'Okin Motor Drive'],
    colors: [
      { name: 'Caramel Cognac', hex: '#8E5A2A' },
      { name: 'Espresso Black', hex: '#262220' },
      { name: 'Warm Cream', hex: '#EAE5D9' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Reinforced Metal Articulated Mechanism',
      upholstery: '1.4mm Thick Semi-Aniline Leather',
      hardware: 'German OKIN Whisper Motor (Quiet < 45dB)',
      warranty: '3 Years Comprehensive Motor & Mechanism Warranty',
      assembly: 'Ready to use out of box',
    },
    isPopular: true,
    style: 'Ergonomic',
    images: {
      primary: 'recliner-sereno',
      angles: ['recliner-sereno-open', 'recliner-sereno-side'],
    },
  },
  {
    id: 'sp-rec-02',
    name: 'Haven Manual Rocker Glider Recliner',
    category: 'Recliners',
    price: 32000,
    originalPrice: 38000,
    shortDescription: 'Gentle 360-degree swivel, soothing rocking motion, and simple pull-lever reclining for nursery and relaxation.',
    description: 'A customer-favorite armchair at our Rajamahendravaram showroom. Silky gliding motion combined with overstuffed pillow-top arms makes this the most comforting seat in any home.',
    dimensions: {
      width: '35 inches',
      length: '37 inches',
      height: '40 inches',
    },
    materials: ['Plush Micro-Suede Fabric', 'Anti-Rust Powder-Coated Swivel Base'],
    colors: [
      { name: 'Dove Grey', hex: '#B2B1B9' },
      { name: 'Camel Tan', hex: '#BD9354' },
    ],
    availability: 'Ready for Delivery',
    specifications: {
      woodType: 'Seasoned Hardwood with Steel Rocker Tracks',
      upholstery: 'Stain-resistant Micro-Suede',
      warranty: '3 Years Mechanical Guarantee',
      assembly: 'Simple tool-free two-piece click assembly',
    },
    style: 'Contemporary Luxury',
    images: {
      primary: 'recliner-haven',
      angles: ['recliner-haven-reclined'],
    },
  },

  // 4. Wardrobes
  {
    id: 'sp-ward-01',
    name: 'Palazzo 4-Door Glass & Walnut Wardrobe',
    category: 'Wardrobes',
    price: 115000,
    originalPrice: 135000,
    shortDescription: 'Grand 8-foot floor-to-ceiling wardrobe with smoked fluted glass doors, soft LED sensor lighting, and valet accessories.',
    description: 'The Palazzo turns dressing into a boutique ritual. Features custom trouser racks, jewelry pull-out drawers with velvet lining, tie holders, and automatic sensor illumination on door open.',
    dimensions: {
      width: '96 inches (8 feet)',
      length: '24 inches depth',
      height: '96 inches (8 feet)',
    },
    materials: ['Smoked Tempered Fluted Glass', 'Solid Teak Ply Core', 'Anodized Champagne Gold Aluminium Frames'],
    colors: [
      { name: 'Champagne & Smoked Oak', hex: '#4A3B32' },
      { name: 'Matte Charcoal & Glass', hex: '#262626' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'BWP Grade Marine Plywood 18mm with Laminate Interior',
      hardware: 'Blum Austria Soft-Close Hinges & Dampers',
      warranty: '10 Years Structural & Termite Warranty',
      assembly: 'Installed on site by expert carpenters',
    },
    isPopular: true,
    style: 'Contemporary Luxury',
    images: {
      primary: 'wardrobe-palazzo',
      angles: ['wardrobe-palazzo-open', 'wardrobe-palazzo-drawers'],
    },
  },
  {
    id: 'sp-ward-02',
    name: 'Linear 3-Door Sliding Wardrobe',
    category: 'Wardrobes',
    price: 74000,
    originalPrice: 85000,
    shortDescription: 'Space-saving smooth dual-track sliding wardrobe with full-length mirror panel and matte walnut veneer.',
    description: 'Perfect for contemporary bedrooms where swing doors would restrict floor space. Features silent bottom-roller ball bearings and generous shelving for blankets, luggage, and hanging garments.',
    dimensions: {
      width: '72 inches (6 feet)',
      length: '24 inches depth',
      height: '84 inches (7 feet)',
    },
    materials: ['Heavy Duty Aluminium Sliding Tracks', 'High Density MR Ply', 'Beveled Silver Mirror'],
    colors: [
      { name: 'American Walnut & Mirror', hex: '#543D2B' },
      { name: 'Scandinavian White & Oak', hex: '#D2C3B2' },
    ],
    availability: 'Ready for Delivery',
    specifications: {
      woodType: 'Moisture-Resistant 18mm Engineered Hardwood',
      hardware: 'Hettich TopLine Heavy-Duty Sliding Mechanism',
      warranty: '5 Years Sliding Track Guarantee',
      assembly: 'Showroom carpenter installation included',
    },
    style: 'Modern Minimalist',
    images: {
      primary: 'wardrobe-linear',
      angles: ['wardrobe-linear-interior'],
    },
  },

  // 5. Dining Tables and Chairs
  {
    id: 'sp-din-01',
    name: 'Calacatta 6-Seater Marble Dining Suite',
    category: 'Dining Tables and Chairs',
    price: 78000,
    originalPrice: 92000,
    shortDescription: 'Solid Italian Calacatta gold marble tabletop with sculpted solid teak pedestal base and 6 upholstered chairs.',
    description: 'Gather your family around this magnificent marble dining centerpiece. The 20mm beveled stone tabletop is treated with food-grade stain sealant, paired with curved armless dining chairs.',
    dimensions: {
      width: '38 inches',
      length: '72 inches',
      height: '30 inches',
    },
    materials: ['Natural Calacatta Marble', 'Solid Indian Teak Base', 'Stain-Resistant Chair Fabric'],
    colors: [
      { name: 'Calacatta Gold & Warm Teak', hex: '#D7CEC7' },
      { name: 'Nero Marquina & Walnut', hex: '#2A2928' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Solid Seasoned Teak Base & Chairs',
      foamDensity: '32D Resilient Seat Cushions',
      warranty: '5 Years Table Frame & Chair Warranty',
      assembly: 'Delivered and assembled with marble polish',
    },
    isPopular: true,
    style: 'Contemporary Luxury',
    images: {
      primary: 'dining-calacatta',
      angles: ['dining-calacatta-chairs', 'dining-calacatta-marble'],
    },
  },
  {
    id: 'sp-din-02',
    name: 'Kobenhavn Teak 4-Seater Dining Set',
    category: 'Dining Tables and Chairs',
    price: 44000,
    originalPrice: 51000,
    shortDescription: 'Scandinavian rounded rectangular solid teak dining table with 4 ergonomic wishbone-style wood chairs.',
    description: 'Compact yet comfortably spacious dining for breakfast corners and urban homes. Rounded bullnose corners ensure child-friendly safety, and the hand-rubbed oil finish highlights golden teak grain.',
    dimensions: {
      width: '36 inches',
      length: '54 inches',
      height: '30 inches',
    },
    materials: ['100% Solid Indian Teakwood', 'Natural Hand-Rubbed Linseed Oil Finish'],
    colors: [
      { name: 'Golden Teak', hex: '#B87333' },
      { name: 'Dark Honey', hex: '#874A1B' },
    ],
    availability: 'Ready for Delivery',
    specifications: {
      woodType: 'Pure Seasoned Teakwood',
      warranty: '7 Years Termite & Borer Warranty',
      assembly: 'Easy 4-bolt leg attachment with provided tool',
    },
    style: 'Scandinavian',
    images: {
      primary: 'dining-kobenhavn',
      angles: ['dining-kobenhavn-chairs'],
    },
  },

  // 6. Bedroom Furniture Sets
  {
    id: 'sp-set-01',
    name: 'Royale 4-Piece Master Bedroom Suite',
    category: 'Bedroom Furniture Sets',
    price: 185000,
    originalPrice: 215000,
    shortDescription: 'Comprehensive luxury master suite: King Bed with upholstered headboard, 2 bedside nightstands, and 6-foot wardrobe.',
    description: 'Complete room harmony designed to eliminate the guesswork of matching individual pieces. Coordinated in warm smoked walnut tones with brushed champagne gold hardware.',
    dimensions: {
      width: 'Complete suite layout',
      length: 'Fits 12x14 ft and larger bedrooms',
      height: 'Standard master room fit',
    },
    materials: ['Matching Seasoned Walnut Veneer', 'High Grade Plywood', 'Soft-touch Bouclé', 'Champagne Brass'],
    colors: [
      { name: 'Harmonious Smoked Walnut', hex: '#443226' },
      { name: 'Warm Cashmere & Oak', hex: '#C2B29F' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Solid Teak Frame & High-Density Calibrated Plywood',
      warranty: '7 Years Full Suite Warranty',
      assembly: 'Master carpenter white-glove installation',
    },
    isPopular: true,
    style: 'Contemporary Luxury',
    images: {
      primary: 'set-royale',
      angles: ['set-royale-room', 'set-royale-nightstand'],
    },
  },

  // 7. Office Chairs
  {
    id: 'sp-off-01',
    name: 'ErgoPro Executive High-Back Chair',
    category: 'Office Chairs',
    price: 18500,
    originalPrice: 22000,
    shortDescription: 'Ergonomic mesh chair with self-calibrating weight tension synchro-tilt, 3D armrests, and 2-way adjustable lumbar.',
    description: 'Tested for 10+ hour continuous seating comfort for home offices and study desks. High-grade breathable Korean elastomeric mesh keeps your back cool throughout Andhra Pradesh summers.',
    dimensions: {
      width: '26 inches',
      length: '26 inches base',
      height: '46 to 52 inches (gas lift)',
    },
    materials: ['Reinforced Nylon Chassis', 'Korean Dual-Woven Mesh', 'Die-Cast Polished Aluminum Base'],
    colors: [
      { name: 'Graphite Grey', hex: '#333333' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Mist Silver', hex: '#A8A8A8' },
    ],
    availability: 'Ready for Delivery',
    specifications: {
      woodType: 'BIFMA Class 4 Heavy-Duty Hydraulic Gas Lift Cylinder',
      hardware: '60mm Smooth Polyurethane Castor Wheels',
      warranty: '3 Years Comprehensive Mechanism Warranty',
      assembly: 'Simple 3-step assembly, tool included',
    },
    isPopular: true,
    style: 'Ergonomic',
    images: {
      primary: 'office-ergopro',
      angles: ['office-ergopro-back', 'office-ergopro-side'],
    },
  },
  {
    id: 'sp-off-02',
    name: 'Presidential Tufted Leather Desk Chair',
    category: 'Office Chairs',
    price: 28000,
    originalPrice: 34000,
    shortDescription: 'Hand-tufted deep padded executive chair with solid teakwood arm caps and mahogany base.',
    description: 'An authoritative presence for executive study rooms and home libraries. Deep diamond button-tufting with generous high-resilience foam padding.',
    dimensions: {
      width: '28 inches',
      length: '29 inches',
      height: '48 to 53 inches',
    },
    materials: ['Supple Bonded Leather', 'Solid Teak Wooden Caps', 'Heavy Gauge Steel Core'],
    colors: [
      { name: 'Vintage Cigar Brown', hex: '#523420' },
      { name: 'Royal Jet Black', hex: '#1C1C1C' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Solid Teak Wood Accents',
      foamDensity: '45D Multi-Layer Moulded Cushion',
      warranty: '3 Years Warranty',
      assembly: 'Delivered fully assembled',
    },
    style: 'Classic Royal',
    images: {
      primary: 'office-presidential',
      angles: ['office-presidential-detail'],
    },
  },

  // 8. Hospital and Comfort Chairs
  {
    id: 'sp-hosp-01',
    name: 'CareEase Motorized Power-Lift Patient Chair',
    category: 'Hospital and Comfort Chairs',
    price: 49500,
    originalPrice: 58000,
    shortDescription: 'Electric lift-assist chair that gently elevates seniors and recovering patients to a standing position with zero knee stress.',
    description: 'Specifically chosen by doctors and caregivers in Rajamahendravaram. Quiet electric motor smoothly tilts forward so elderly individuals or patients can stand up effortlessly. Handheld wired remote included.',
    dimensions: {
      width: '34 inches',
      length: '36 inches (closed) / 64 inches (extended)',
      height: '43 inches',
    },
    materials: ['Medical-Grade Antimicrobial PU Leather', 'Heavy Tubular Steel Framework', 'Quiet Linear Actuator'],
    colors: [
      { name: 'Hospitality Brown', hex: '#583D28' },
      { name: 'Warm Sand', hex: '#C2B8A3' },
      { name: 'Clinical Navy', hex: '#1D3557' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: 'Heavy duty steel lift mechanism rated for 150 kg',
      upholstery: 'Antimicrobial, wipe-clean stain resistant coating',
      warranty: '2 Years Motor & Mechanism Warranty',
      assembly: 'Delivered and demonstrated by our technician',
    },
    isPopular: true,
    style: 'Ergonomic',
    images: {
      primary: 'hospital-careease',
      angles: ['hospital-careease-lifted', 'hospital-careease-remote'],
    },
  },
  {
    id: 'sp-hosp-02',
    name: 'Attendant Recliner-to-Bed Companion Chair',
    category: 'Hospital and Comfort Chairs',
    price: 29000,
    originalPrice: 34000,
    shortDescription: 'Compact daytime armchair that pulls out smoothly into a full 6-foot flat sleeper bed for patient attendants and visitors.',
    description: 'Designed for hospital private rooms, clinics, and home elderly care. Converts from an elegant armchair to a comfortable flat cot in under 5 seconds with zero lifting required.',
    dimensions: {
      width: '34 inches',
      length: '36 inches (chair) / 74 inches (bed mode)',
      height: '35 inches',
    },
    materials: ['Washable Commercial Fabric', 'Internal Steel Linkage Frame', 'Orthopaedic Foam Cushioning'],
    colors: [
      { name: 'Slate Teal', hex: '#3B6978' },
      { name: 'Steel Grey', hex: '#50565F' },
    ],
    availability: 'Ready for Delivery',
    specifications: {
      woodType: 'Reinforced Steel Chassis with Seasoned Hardwood Blocks',
      foamDensity: '36D High-Density Ortho Foam',
      hardware: 'Smooth Ball-Bearing Pull-Out Tracks',
      warranty: '3 Years Warranty',
      assembly: 'Ready to use out of box',
    },
    style: 'Modern Minimalist',
    images: {
      primary: 'hospital-attendant',
      angles: ['hospital-attendant-bed'],
    },
  },

  // 9. Side Tables and Bedside Cabinets
  {
    id: 'sp-side-01',
    name: 'Lumina Dual-Drawer Teak Nightstand',
    category: 'Side Tables and Bedside Cabinets',
    price: 14500,
    originalPrice: 17500,
    shortDescription: 'Solid teak bedside cabinet with travertine stone top, curved corners, and soft-close under-mount drawer slides.',
    description: 'An elegant bedside companion that matches our luxury bed collections. Features a stain-resistant natural travertine inset top for resting water glasses or reading lamps without fear of ring marks.',
    dimensions: {
      width: '20 inches',
      length: '18 inches depth',
      height: '21 inches',
    },
    materials: ['Solid Teak Wood', 'Natural Honed Travertine Slab', 'Brushed Brass Bar Handle'],
    colors: [
      { name: 'Warm Teak & Travertine', hex: '#A3683E' },
      { name: 'Smoked Walnut & Nero Marble', hex: '#3A2E28' },
    ],
    availability: 'In Showroom Display',
    specifications: {
      woodType: '100% Solid Indian Teak',
      hardware: 'Hettich Soft-Close Drawer Runners',
      warranty: '5 Years Warranty',
      assembly: 'Delivered fully assembled',
    },
    isPopular: true,
    style: 'Contemporary Luxury',
    images: {
      primary: 'side-lumina',
      angles: ['side-lumina-top', 'side-lumina-open'],
    },
  },
  {
    id: 'sp-side-02',
    name: 'Kyoto Minimalist Floating Bedside Shelf',
    category: 'Side Tables and Bedside Cabinets',
    price: 8500,
    originalPrice: 10500,
    shortDescription: 'Wall-mounted floating bedside ledge with hidden drawer and integrated cable grommet for smartphone charging.',
    description: 'Keeps floor space completely clear for effortless room cleaning. Sturdy French cleat mounting system supports up to 25 kg easily.',
    dimensions: {
      width: '18 inches',
      length: '14 inches depth',
      height: '7 inches',
    },
    materials: ['Solid White Ash', 'Concealed Heavy-Duty Steel Mounting Cleats'],
    colors: [
      { name: 'Natural Ash', hex: '#D6C5A9' },
      { name: 'Espresso Stain', hex: '#362B28' },
    ],
    availability: 'Ready for Delivery',
    specifications: {
      woodType: 'Kiln-dried White Ash',
      warranty: '3 Years Warranty',
      assembly: 'Hardware and wall plugs provided',
    },
    style: 'Modern Minimalist',
    images: {
      primary: 'side-kyoto',
      angles: ['side-kyoto-mounted'],
    },
  },

  // 10. Custom Furniture
  {
    id: 'sp-cust-01',
    name: 'Bespoke Architectural Master Headboard & Paneling',
    category: 'Custom Furniture',
    price: 120000,
    originalPrice: 145000,
    shortDescription: 'Custom-measured full-wall fluted wood paneling with integrated floating bedside tables, ambient backlighting, and fabric inserts.',
    description: 'Tailor-made for your exact bedroom wall dimensions in Rajamahendravaram. Our master carpenters visit your home for measurement, draft 3D renders, and fabricate the panels to millimeter precision.',
    dimensions: {
      width: 'Customized to your wall (e.g. 10 to 16 feet)',
      length: '4 inches depth',
      height: 'Floor to ceiling (up to 10 feet)',
    },
    materials: ['Custom Choice: Teak / Walnut / Smoked Oak', 'Acoustic Upholstered Panels', 'Concealed LED Warm Strips'],
    colors: [
      { name: 'Custom Wood Veneer & Linen', hex: '#8C7456' },
      { name: 'Fluted Charcoal & Champagne Brass', hex: '#363432' },
    ],
    availability: 'Custom Made to Order',
    specifications: {
      woodType: 'Bespoke Selected Woods & Finishes',
      warranty: '10 Years Structural & Craftsmanship Warranty',
      assembly: 'End-to-end measurement, fabrication, and installation',
    },
    isPopular: true,
    style: 'Contemporary Luxury',
    images: {
      primary: 'custom-headboard',
      angles: ['custom-headboard-detail'],
    },
  },
  {
    id: 'sp-cust-02',
    name: 'Tailored L-Shape Sectional to Fit Your Living Room',
    category: 'Custom Furniture',
    price: 95000,
    originalPrice: 115000,
    shortDescription: 'Customized sofa length, seat depth, cushion firmness, and fabric selection curated directly with our showroom designers.',
    description: 'Never settle for a sofa that is 2 inches too long or too short for your hall. Choose from over 120 imported fabric swatches at our Tadithota showroom, from pet-friendly performance textiles to supple Italian leathers.',
    dimensions: {
      width: 'Custom to your room dimensions',
      length: 'Custom chaise depth',
      height: 'Standard or low profile',
    },
    materials: ['Choice of 120+ Swatches', 'Custom Density Foams', 'Solid Hardwood Frame'],
    colors: [
      { name: 'Customer Choice Palette', hex: '#C5A880' },
    ],
    availability: 'Custom Made to Order',
    specifications: {
      woodType: 'Handcrafted Kiln-Dried Hardwood Structure',
      warranty: '7 Years Frame Guarantee',
      assembly: 'Delivered and styled directly in your home',
    },
    style: 'Contemporary Luxury',
    images: {
      primary: 'custom-sofa',
      angles: ['custom-sofa-swatches'],
    },
  },
];
