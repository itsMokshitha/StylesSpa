import { ProductCategory } from '../types/furniture';

export interface ShowroomPhoto {
  id: string;
  title: string;
  caption: string;
  category: string;
  imageUrl: string;
}

// Default high-resolution curated photography for each product
export const DEFAULT_PRODUCT_IMAGES: Record<string, { primary: string; angles: string[] }> = {
  // 1. Luxury Beds
  'sp-bed-01': {
    primary: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-bed-02': {
    primary: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-bed-03': {
    primary: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 2. Modern Sofas
  'sp-sofa-01': {
    primary: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-sofa-02': {
    primary: 'https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 3. Recliners
  'sp-rec-01': {
    primary: 'https://images.unsplash.com/photo-1580481077111-94e823f99092?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-rec-02': {
    primary: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1580481077111-94e823f99092?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 4. Wardrobes
  'sp-ward-01': {
    primary: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-ward-02': {
    primary: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 5. Dining Tables and Chairs
  'sp-din-01': {
    primary: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-din-02': {
    primary: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 6. Bedroom Furniture Sets
  'sp-set-01': {
    primary: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-set-02': {
    primary: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 7. Office Chairs
  'sp-off-01': {
    primary: 'https://images.unsplash.com/photo-1580481077194-c4e207d5771c?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-off-02': {
    primary: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1580481077194-c4e207d5771c?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 8. Hospital and Comfort Chairs
  'sp-hosp-01': {
    primary: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1580481077111-94e823f99092?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-hosp-02': {
    primary: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 9. Side Tables and Bedside Cabinets
  'sp-side-01': {
    primary: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1533779283484-84e14e9758b0?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-side-02': {
    primary: 'https://images.unsplash.com/photo-1533779283484-84e14e9758b0?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  // 10. Custom Furniture
  'sp-cust-01': {
    primary: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  'sp-cust-02': {
    primary: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    angles: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    ],
  },
};

// Default high-resolution category hero photos
export const CATEGORY_IMAGE_MAP: Record<ProductCategory, string> = {
  'Luxury Beds': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'Modern Sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  'Recliners': 'https://images.unsplash.com/photo-1580481077111-94e823f99092?auto=format&fit=crop&w=1200&q=80',
  'Wardrobes': 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
  'Dining Tables and Chairs': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
  'Bedroom Furniture Sets': 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
  'Office Chairs': 'https://images.unsplash.com/photo-1580481077194-c4e207d5771c?auto=format&fit=crop&w=1200&q=80',
  'Hospital and Comfort Chairs': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  'Side Tables and Bedside Cabinets': 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
  'Custom Furniture': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
};

// Curated Showroom Photography for STYLE SPA FURNITURE, Rajamahendravaram
export const DEFAULT_SHOWROOM_PHOTOS: ShowroomPhoto[] = [
  {
    id: 'sr-01',
    title: 'Master Bedroom Suite Gallery',
    caption: 'Flagship bedroom vignettes styled with teak headboards, plush rugs, and soft ambient designer sconces.',
    category: 'Showroom Display',
    imageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sr-02',
    title: 'Modern Living & Lounge Pavilion',
    caption: 'Curved couches, deep-cushion modular sectionals, and solid wood coffee tables in natural daylight.',
    category: 'Showroom Display',
    imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sr-03',
    title: 'Italian Marble & Teak Dining Studio',
    caption: 'Handcrafted 6 & 8-seater dining suites with ergonomically curved chairs and warm overhead pendant lights.',
    category: 'Showroom Display',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sr-04',
    title: 'Bespoke Wardrobe & Closet Lab',
    caption: 'Floor-to-ceiling smoked glass sliding wardrobes with integrated warm LED light channels.',
    category: 'Custom Millwork',
    imageUrl: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sr-05',
    title: 'Ergonomic Recliner Comfort Lounge',
    caption: 'Zero-gravity power recliners with genuine top-grain leather and whisper-quiet motorized mechanisms.',
    category: 'Comfort Studio',
    imageUrl: 'https://images.unsplash.com/photo-1580481077111-94e823f99092?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sr-06',
    title: 'Timber Selection & Craftsmanship Details',
    caption: 'Kiln-dried seasoned Indian teak, American smoked walnut, and certified high-resilience foam core.',
    category: 'Craftsmanship',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
  },
];

const LOCAL_STORAGE_KEY = 'stylespa_custom_furniture_images';

export interface CustomImageStore {
  productImages: Record<string, { primary: string; angles?: string[] }>;
  categoryImages: Record<string, string>;
  showroomPhotos: ShowroomPhoto[];
}

export function loadCustomImageStore(): CustomImageStore {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not read custom furniture images from localStorage', err);
  }
  return {
    productImages: {},
    categoryImages: {},
    showroomPhotos: [],
  };
}

export function saveCustomImageStore(store: CustomImageStore): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
    // Trigger custom event so all active components reactively update
    window.dispatchEvent(new Event('stylespa_images_updated'));
  } catch (err) {
    console.error('Failed to save custom furniture images to localStorage', err);
  }
}

export function getProductPrimaryImage(productId: string, category: ProductCategory): string {
  const store = loadCustomImageStore();
  if (store.productImages[productId]?.primary) {
    return store.productImages[productId].primary;
  }
  if (DEFAULT_PRODUCT_IMAGES[productId]?.primary) {
    return DEFAULT_PRODUCT_IMAGES[productId].primary;
  }
  return CATEGORY_IMAGE_MAP[category] || '';
}

export function getProductAngles(productId: string): string[] {
  const store = loadCustomImageStore();
  const customAngles = store.productImages[productId]?.angles;
  if (customAngles && customAngles.length > 0) {
    return customAngles;
  }
  return DEFAULT_PRODUCT_IMAGES[productId]?.angles || [];
}

export function getCategoryImage(category: ProductCategory): string {
  const store = loadCustomImageStore();
  if (store.categoryImages[category]) {
    return store.categoryImages[category];
  }
  return CATEGORY_IMAGE_MAP[category] || '';
}

export function getAllShowroomPhotos(): ShowroomPhoto[] {
  const store = loadCustomImageStore();
  return [...(store.showroomPhotos || []), ...DEFAULT_SHOWROOM_PHOTOS];
}
