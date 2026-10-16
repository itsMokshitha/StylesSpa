export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  dimensions: {
    width: string;
    length: string;
    height: string;
    mattressSize?: string;
  };
  materials: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  availability: 'In Showroom Display' | 'Ready for Delivery' | 'Custom Made to Order';
  specifications: {
    woodType: string;
    upholstery?: string;
    foamDensity?: string;
    hardware?: string;
    warranty: string;
    assembly: string;
  };
  isNewArrival?: boolean;
  isPopular?: boolean;
  images: {
    primary: string;
    angles: string[];
  };
  style: 'Modern Minimalist' | 'Contemporary Luxury' | 'Classic Royal' | 'Scandinavian' | 'Ergonomic';
}

export type ProductCategory =
  | 'Luxury Beds'
  | 'Modern Sofas'
  | 'Recliners'
  | 'Wardrobes'
  | 'Dining Tables and Chairs'
  | 'Bedroom Furniture Sets'
  | 'Office Chairs'
  | 'Hospital and Comfort Chairs'
  | 'Side Tables and Bedside Cabinets'
  | 'Custom Furniture';

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  tagline: string;
  description: string;
  count: number;
  featuredMaterial: string;
  accentColor: string;
  imagePrompt: string;
}

export type RoomType = 'bedroom' | 'living' | 'dining';

export interface RoomConfig {
  roomType: RoomType;
  layout: 'spacious' | 'intimate' | 'grand';
  woodFinish: 'walnut' | 'oak' | 'teak' | 'espresso';
  fabricFinish: 'oatmeal' | 'velvet-navy' | 'charcoal' | 'cognac-leather';
  floorType: 'parquet' | 'marble' | 'travertine';
  lightingMode: 'warm-evening' | 'bright-day' | 'golden-hour';
}
