import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductCategory } from '../types/furniture';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ProductCard } from '../components/ProductCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { getActiveProducts } from '../data/productStore';
import { Search, SlidersHorizontal, RotateCcw, Pencil } from 'lucide-react';

interface Props {
  initialCategory?: ProductCategory | null;
  onSelectProduct: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onOpenImageModal?: (productId: string) => void;
  onOpenEditModal?: (productId: string) => void;
  products?: Product[];
}

export const ShopView: React.FC<Props> = ({
  initialCategory,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  onOpenImageModal,
  onOpenEditModal,
  products: propProducts,
}) => {
  const [internalProducts, setInternalProducts] = useState<Product[]>(getActiveProducts());
  const products = propProducts || internalProducts;

  useEffect(() => {
    const handleUpdate = () => {
      setInternalProducts(getActiveProducts());
    };
    window.addEventListener('stylespa_products_updated', handleUpdate);
    return () => window.removeEventListener('stylespa_products_updated', handleUpdate);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'newest'>('popular');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesMaterials = item.materials.some((m) => m.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesMaterials) return false;
      }

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Price Range
      if (selectedPriceRange === 'under-30k' && item.price >= 30000) return false;
      if (selectedPriceRange === '30k-60k' && (item.price < 30000 || item.price > 60000)) return false;
      if (selectedPriceRange === '60k-100k' && (item.price < 60000 || item.price > 100000)) return false;
      if (selectedPriceRange === 'above-100k' && item.price <= 100000) return false;

      // Style
      if (selectedStyle !== 'all' && item.style !== selectedStyle) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // Default: popular
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedStyle, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedStyle('all');
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Page Header */}
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-2">
            Showroom Catalog · Rajamahendravaram
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1E1B18] mb-3">
            Explore All Furniture
          </h1>
          <p className="text-xs md:text-sm text-[#78716C] max-w-2xl leading-relaxed">
            Browse our complete selection of luxury beds, plush lounge sofas, motorized recliners, wardrobes, and bespoke custom units. Prices and dimensions can be customized below.
          </p>
        </div>

        {onOpenEditModal && (
          <button
            onClick={() => onOpenEditModal('')}
            className="px-4 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#1E1B18] border border-[#E8E2D9] hover:border-[#C5A880] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-2xs inline-flex items-center gap-2 self-start md:self-auto shrink-0"
            title="Edit prices and dimensions for any product"
          >
            <Pencil className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Edit Prices & Dimensions</span>
          </button>
        )}
      </ScrollReveal>

      {/* Search & Filter Toolbar */}
      <ScrollReveal delay={100} className="bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-xs space-y-4">
        {/* Top row: Search input & Sorting */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by bed, sofa, recliner, teak, velvet, dimensions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg focus:outline-hidden focus:border-[#C5A880] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#78716C] hover:text-[#1E1B18]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg text-[#1E1B18] font-medium focus:outline-hidden focus:border-[#C5A880]"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Sort: Newest Arrivals</option>
            </select>

            {(selectedCategory !== 'all' || selectedPriceRange !== 'all' || selectedStyle !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="p-2 text-xs font-semibold text-[#78716C] hover:text-[#1E1B18] bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg flex items-center gap-1 shrink-0 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#1E1B18] text-white'
                : 'bg-[#FAF8F5] text-[#57534E] hover:bg-[#F3EFEA]'
            }`}
          >
            All Categories ({products.length})
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#1E1B18] text-white'
                  : 'bg-[#FAF8F5] text-[#57534E] hover:bg-[#F3EFEA]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Secondary Filters (Price Range & Style) */}
        <div className="pt-2 border-t border-[#F3EFEA] flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#78716C] font-semibold uppercase text-[10px]">Price:</span>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="px-2 py-1 bg-[#FAF8F5] border border-[#E8E2D9] rounded text-xs text-[#1E1B18]"
            >
              <option value="all">All Prices</option>
              <option value="under-30k">Under ₹30,000</option>
              <option value="30k-60k">₹30,000 – ₹60,000</option>
              <option value="60k-100k">₹60,000 – ₹1,00,000</option>
              <option value="above-100k">Above ₹1,00,000</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#78716C] font-semibold uppercase text-[10px]">Style:</span>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-2 py-1 bg-[#FAF8F5] border border-[#E8E2D9] rounded text-xs text-[#1E1B18]"
            >
              <option value="all">All Styles</option>
              <option value="Contemporary Luxury">Contemporary Luxury</option>
              <option value="Modern Minimalist">Modern Minimalist</option>
              <option value="Classic Royal">Classic Royal</option>
              <option value="Scandinavian">Scandinavian</option>
              <option value="Ergonomic">Ergonomic</option>
            </select>
          </div>

          <div className="text-[#78716C] ml-auto text-xs font-mono tabular-nums">
            Showing <strong>{filteredProducts.length}</strong> items
          </div>
        </div>
      </ScrollReveal>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-12 text-center space-y-3">
          <p className="font-serif font-bold text-lg text-[#1E1B18]">
            No matching furniture pieces found
          </p>
          <p className="text-xs text-[#78716C] max-w-md mx-auto">
            Try adjusting your search query, price tier, or category filter to discover pieces in our showroom catalog.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-[#1E1B18] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#3E2723] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              animationDelay={(index % 6) * 60}
              isWishlisted={wishlist.some((w) => w.id === product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onOpenImageModal={onOpenImageModal}
              onOpenEditModal={onOpenEditModal}
            />
          ))}
        </div>
      )}
    </div>
  );
};
