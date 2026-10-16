/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductModal } from './components/ProductModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FurnitureImageModal } from './components/FurnitureImageModal';
import { ProductEditModal } from './components/ProductEditModal';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { CollectionsView } from './views/CollectionsView';
import { DesignerRoomView } from './views/DesignerRoomView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { Product, ProductCategory } from './types/furniture';
import { getActiveProducts } from './data/productStore';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(getActiveProducts());

  // Image Studio state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalProductId, setImageModalProductId] = useState<string | undefined>(undefined);

  // Price & Dimension Editor state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalProductId, setEditModalProductId] = useState<string | undefined>(undefined);

  // Sync products on mount and when overrides change
  useEffect(() => {
    const handleProductsUpdated = () => {
      const updatedList = getActiveProducts();
      setProducts(updatedList);

      // Keep selectedProduct in sync with edited price/dimensions
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const fresh = updatedList.find((p) => p.id === prev.id);
        return fresh || prev;
      });

      // Keep wishlist items in sync with edited price/dimensions
      setWishlist((prev) => {
        return prev.map((item) => {
          const fresh = updatedList.find((p) => p.id === item.id);
          return fresh ? fresh : item;
        });
      });
    };

    window.addEventListener('stylespa_products_updated', handleProductsUpdated);
    return () => window.removeEventListener('stylespa_products_updated', handleProductsUpdated);
  }, []);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stylespa_wishlist');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        // Re-hydrate with current active prices and dimensions
        const activeList = getActiveProducts();
        const synced = parsed.map((item) => {
          const fresh = activeList.find((p) => p.id === item.id);
          return fresh || item;
        });
        setWishlist(synced);
      }
    } catch (e) {
      console.warn('Failed to parse saved wishlist', e);
    }
  }, []);

  // Save wishlist to localStorage
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      let updated: Product[];
      if (exists) {
        updated = prev.filter((item) => item.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      try {
        localStorage.setItem('stylespa_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save wishlist', e);
      }
      return updated;
    });
  };

  const handleRemoveWishlistItem = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('stylespa_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save wishlist', e);
      }
      return updated;
    });
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    try {
      localStorage.removeItem('stylespa_wishlist');
    } catch (e) {
      console.warn('Failed to clear wishlist', e);
    }
  };

  const handleNavigate = (tab: string, catFilter?: ProductCategory) => {
    setActiveTab(tab);
    if (catFilter) {
      setCategoryFilter(catFilter);
    } else {
      setCategoryFilter(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenImageStudio = (productId?: string) => {
    setImageModalProductId(productId);
    setIsImageModalOpen(true);
  };

  const handleOpenEditModal = (productId?: string) => {
    setEditModalProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = (updated: Product) => {
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18] antialiased">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onNavigate={(tab) => handleNavigate(tab)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenImageStudio={() => handleOpenImageStudio()}
        onOpenEditPrices={() => handleOpenEditModal()}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={(p) => setSelectedProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenImageModal={(prodId) => handleOpenImageStudio(prodId)}
            onOpenEditModal={(prodId) => handleOpenEditModal(prodId)}
          />
        )}

        {activeTab === 'catalog' && (
          <ShopView
            initialCategory={categoryFilter}
            onSelectProduct={(p) => setSelectedProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenImageModal={(prodId) => handleOpenImageStudio(prodId)}
            onOpenEditModal={(prodId) => handleOpenEditModal(prodId)}
            products={products}
          />
        )}

        {activeTab === 'collections' && (
          <CollectionsView
            onSelectCategory={(cat) => handleNavigate('catalog', cat)}
            onOpenImageModal={() => handleOpenImageStudio()}
          />
        )}

        {activeTab === 'designer' && <DesignerRoomView />}

        {activeTab === 'about' && (
          <AboutView onNavigate={(tab) => handleNavigate(tab)} />
        )}

        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => handleNavigate(tab)} />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={wishlist.some((w) => w.id === selectedProduct?.id)}
        onToggleWishlist={handleToggleWishlist}
        onOpenImageModal={(prodId) => handleOpenImageStudio(prodId)}
        onOpenEditModal={(prodId) => handleOpenEditModal(prodId)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={handleRemoveWishlistItem}
        onClearWishlist={handleClearWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onExploreCollections={() => handleNavigate('collections')}
      />

      {/* Furniture Image Studio Modal */}
      <FurnitureImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        initialProductId={imageModalProductId}
      />

      {/* Product Price & Dimensions Editor Modal */}
      <ProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        targetProductId={editModalProductId}
        onProductUpdated={handleProductUpdated}
      />
    </div>
  );
}
