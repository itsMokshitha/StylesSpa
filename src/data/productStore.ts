import { Product } from '../types/furniture';
import { PRODUCTS_DATA } from './furnitureData';

const LOCAL_STORAGE_PRODUCTS_KEY = 'stylespa_custom_products';

export interface ProductOverride {
  price?: number;
  originalPrice?: number;
  dimensions?: {
    width?: string;
    length?: string;
    height?: string;
    mattressSize?: string;
  };
  availability?: Product['availability'];
  name?: string;
}

export function loadProductOverrides(): Record<string, ProductOverride> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not read custom product overrides from localStorage', err);
  }
  return {};
}

export function saveProductOverrides(overrides: Record<string, ProductOverride>): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new Event('stylespa_products_updated'));
  } catch (err) {
    console.error('Failed to save product overrides to localStorage', err);
  }
}

export function getActiveProducts(): Product[] {
  const overrides = loadProductOverrides();
  return PRODUCTS_DATA.map((product) => {
    const override = overrides[product.id];
    if (!override) return product;

    return {
      ...product,
      name: override.name ?? product.name,
      price: override.price ?? product.price,
      originalPrice: override.originalPrice ?? product.originalPrice,
      availability: override.availability ?? product.availability,
      dimensions: {
        width: override.dimensions?.width ?? product.dimensions.width,
        length: override.dimensions?.length ?? product.dimensions.length,
        height: override.dimensions?.height ?? product.dimensions.height,
        mattressSize: override.dimensions?.mattressSize ?? product.dimensions.mattressSize,
      },
    };
  });
}

export function getActiveProductById(productId: string): Product | undefined {
  const products = getActiveProducts();
  return products.find((p) => p.id === productId);
}

export function updateProductPriceAndDimensions(
  productId: string,
  updates: ProductOverride
): void {
  const overrides = loadProductOverrides();
  const prev = overrides[productId] || {};
  overrides[productId] = {
    ...prev,
    ...updates,
    dimensions: {
      ...(prev.dimensions || {}),
      ...(updates.dimensions || {}),
    },
  };
  saveProductOverrides(overrides);
}

export function resetProductToDefault(productId: string): void {
  const overrides = loadProductOverrides();
  delete overrides[productId];
  saveProductOverrides(overrides);
}

export function resetAllProductsToDefault(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_KEY);
    window.dispatchEvent(new Event('stylespa_products_updated'));
  } catch (err) {
    console.error('Failed to clear product overrides', err);
  }
}
