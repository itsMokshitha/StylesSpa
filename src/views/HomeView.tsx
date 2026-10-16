import React, { useState, useEffect } from 'react';
import { ThreeHeroBedroom } from '../components/ThreeHeroBedroom';
import { Product, ProductCategory } from '../types/furniture';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { STORE_ADDRESS, STORE_PHONE_DISPLAY, STORE_GOOGLE_MAPS_URL, STORE_PHONE_NUMERIC } from '../data/furnitureData';
import { getAllShowroomPhotos, ShowroomPhoto } from '../data/furnitureImages';
import { getActiveProducts } from '../data/productStore';
import { ProductCard } from '../components/ProductCard';
import { FurnitureVisual } from '../components/FurnitureVisual';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowRight, Sparkles, MapPin, Phone, MessageSquareShare, ShieldCheck, CheckCircle2, Compass, Layers, Camera, Eye, Pencil } from 'lucide-react';

interface Props {
  onNavigate: (tab: string, categoryFilter?: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onOpenImageModal?: (productId?: string) => void;
  onOpenEditModal?: (productId: string) => void;
}

export const HomeView: React.FC<Props> = ({
  onNavigate,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
  onOpenImageModal,
  onOpenEditModal,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>(getActiveProducts());
  const [showroomPhotos, setShowroomPhotos] = useState<ShowroomPhoto[]>(getAllShowroomPhotos());
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>('All');

  useEffect(() => {
    const handleImagesUpdate = () => {
      setShowroomPhotos(getAllShowroomPhotos());
    };
    const handleProductsUpdate = () => {
      setAllProducts(getActiveProducts());
    };
    window.addEventListener('stylespa_images_updated', handleImagesUpdate);
    window.addEventListener('stylespa_products_updated', handleProductsUpdate);
    return () => {
      window.removeEventListener('stylespa_images_updated', handleImagesUpdate);
      window.removeEventListener('stylespa_products_updated', handleProductsUpdate);
    };
  }, []);

  const featuredProducts = allProducts.filter((p) => p.isPopular).slice(0, 6);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Section — Immersive 3D Experience */}
      <section className="relative">
        <ThreeHeroBedroom
          onExploreClick={() => onNavigate('catalog')}
          onShowroomClick={() => onNavigate('contact')}
        />
      </section>

      {/* 2. Brand Trust Strip */}
      <ScrollReveal as="section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C5A880] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1E1B18] mb-0.5">Physical Showroom</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Experience beds, recliners & fabrics in person at Tadithota, Rajamahendravaram.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C5A880] shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1E1B18] mb-0.5">Seasoned Hardwoods</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Kiln-dried teakwood, American smoked walnut, and premium high-density core plywood.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C5A880] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1E1B18] mb-0.5">Custom Dimensions</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Bespoke headboard paneling, tailored sofas, and custom wardrobes for your floor plan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C5A880] shrink-0">
              <MessageSquareShare className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1E1B18] mb-0.5">WhatsApp Consultations</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Instant quotes, fabric sample videos, and delivery tracking directly on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 3. Furniture Collections (10 Categories) */}
      <ScrollReveal as="section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-2">
              Curated Showroom Portfolios
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B18]">
              Furniture Collections
            </h2>
          </div>
          <button
            onClick={() => onNavigate('collections')}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#1E1B18] hover:text-[#C5A880] transition-colors"
          >
            <span>View All 10 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES_DATA.map((cat, index) => (
            <ScrollReveal
              key={cat.id}
              delay={(index % 5) * 60}
              className="h-full"
            >
              <div
                onClick={() => onNavigate('catalog', cat.id)}
                className="group cursor-pointer bg-white rounded-lg border border-[#E8E2D9] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] hover:-translate-y-1 transition-all duration-200 shadow-xs h-full"
              >
                <div className="h-40 bg-[#F3EFEA] overflow-hidden">
                  <FurnitureVisual
                    imageId={cat.id}
                    category={cat.id}
                    name={cat.title}
                    aspect="4/3"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[#1E1B18] group-hover:text-[#3E2723] transition-colors line-clamp-1 mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-[#78716C] line-clamp-2 leading-relaxed mb-3">
                      {cat.tagline}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#F3EFEA] flex items-center justify-between text-[11px] font-semibold text-[#8C7456]">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* 4. Interactive 3D Room Designer Callout Feature */}
      <ScrollReveal as="section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#241F1C] text-white rounded-2xl p-8 md:p-12 overflow-hidden relative shadow-xl border border-[#3E2723]">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3E2723] text-[#C5A880] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Three.js Real-Time Technology</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-balance leading-tight">
              Design Your Bedroom in Virtual 3D
            </h2>

            <p className="text-sm md:text-base text-[#D6CEBF] leading-relaxed">
              Step inside our interactive virtual room. Customize wood finishes, swap upholstery textures, inspect room layouts in 360°, and share your customized design directly with our Rajamahendravaram showroom on WhatsApp.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('designer')}
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#B39262] text-[#1E1B18] text-xs md:text-sm font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
              >
                Launch 3D Room Designer
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded border border-white/20 transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          </div>

          {/* Decorative Background Accents */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden lg:block">
            <div className="w-full h-full bg-gradient-to-l from-[#C5A880]/30 to-transparent" />
          </div>
        </div>
      </ScrollReveal>

      {/* 5. Featured Showroom Highlights (Product Cards) */}
      <ScrollReveal as="section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-2">
              Showroom Favorites
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B18]">
              Featured Furniture Pieces
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {onOpenEditModal && (
              <button
                onClick={() => onOpenEditModal('')}
                className="px-3.5 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#1E1B18] border border-[#E8E2D9] hover:border-[#C5A880] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-2xs inline-flex items-center gap-1.5"
                title="Edit prices and dimensions for any product"
              >
                <Pencil className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden sm:inline">Edit Prices & Sizes</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#1E1B18] hover:text-[#C5A880] transition-colors"
            >
              <span>View Full Showroom Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              animationDelay={(index % 3) * 80}
              isWishlisted={wishlist.some((w) => w.id === product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onOpenImageModal={onOpenImageModal}
              onOpenEditModal={onOpenEditModal}
            />
          ))}
        </div>
      </ScrollReveal>

      {/* 6. Showroom Photo Gallery & Visual Tour */}
      <ScrollReveal as="section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1.5 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Showroom Photographs</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B18]">
              Showroom Photo Gallery
            </h2>
            <p className="text-xs md:text-sm text-[#78716C] mt-1 max-w-xl">
              Photographs from our live bedroom exhibits, recliner lounge, and custom millwork galleries at Tadithota, Rajamahendravaram.
            </p>
          </div>

          {onOpenImageModal && (
            <button
              onClick={() => onOpenImageModal()}
              className="px-4 py-2 bg-white hover:bg-[#FAF8F5] text-[#1E1B18] border border-[#E8E2D9] hover:border-[#C5A880] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-2xs inline-flex items-center gap-2 shrink-0"
            >
              <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Add Furniture Images</span>
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showroomPhotos.slice(0, 6).map((photo, index) => (
            <ScrollReveal
              key={photo.id}
              delay={(index % 3) * 80}
              className="h-full"
            >
              <div className="group bg-white rounded-xl border border-[#E8E2D9] overflow-hidden flex flex-col hover:border-[#C5A880] hover:shadow-md transition-all duration-300 h-full">
                <div className="relative h-64 bg-[#F3EFEA] overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-black/60 text-white rounded-sm backdrop-blur-xs">
                      {photo.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1E1B18] group-hover:text-[#3E2723] transition-colors mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#F3EFEA] flex items-center justify-between text-[11px] text-[#8C7456] font-medium">
                    <span>STYLE SPA Rajamahendravaram</span>
                    <a
                      href={`https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent(`Hello STYLE SPA FURNITURE, I saw the photo of ${photo.title} on your website. Is this set currently on display?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-[#25D366]"
                    >
                      <MessageSquareShare className="w-3 h-3" />
                      <span>Ask about this set</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* 7. Honest Showroom Experience Highlight */}
      <ScrollReveal as="section" className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xs">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456]">
              Visit Us in Tadithota, Rajahmundry
            </div>
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B18] leading-tight">
              Furniture Crafted for Real Homes, Built to Last Generations
            </h3>
            <p className="text-xs md:text-sm text-[#57534E] leading-relaxed">
              At STYLE SPA FURNITURE, we believe bedroom and home furniture is an intimate personal investment. We avoid flimsy flat-pack compromises. Every piece on our showroom floor is selected for structural resilience, ergonomic posture, and timeless aesthetics.
            </p>
            <div className="space-y-2 pt-2 text-xs text-[#44403C]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Over 120 tactile fabric, velvet, and leather swatches to touch in-store</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Custom king, queen, and bespoke mattress dimension fittings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Direct carpenter coordination for master headboard paneling</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={STORE_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1E1B18] hover:bg-[#3E2723] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Get Directions</span>
              </a>
              <a
                href={`tel:${STORE_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 bg-[#FAF8F5] hover:bg-[#E8E2D9] text-[#1E1B18] border border-[#E8E2D9] text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call {STORE_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Showroom Vignette Card */}
          <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E8E2D9] space-y-4">
            <h4 className="font-serif font-bold text-lg text-[#1E1B18]">
              Showroom Address & Hours
            </h4>
            <div className="space-y-2 text-xs text-[#57534E] leading-relaxed">
              <p>
                <strong className="text-[#1E1B18]">STYLE SPA FURNITURE</strong><br />
                {STORE_ADDRESS}
              </p>
              <p className="pt-2 border-t border-[#E8E2D9]">
                <strong className="text-[#1E1B18]">Landmark:</strong> Opposite Neta Bazar, Old Bypass Road, Tadithota
              </p>
              <p className="pt-2 border-t border-[#E8E2D9]">
                <strong className="text-[#1E1B18]">Business Timings:</strong><br />
                Monday – Saturday: 10:00 AM – 9:00 PM<br />
                Sunday: 10:30 AM – 8:30 PM
              </p>
            </div>
            <div className="pt-3">
              <a
                href={`https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent('Hello STYLE SPA FURNITURE, I would like to schedule a showroom visit in Tadithota.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Book Showroom Visit on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
