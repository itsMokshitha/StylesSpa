import React, { useState, useEffect } from 'react';
import { Product } from '../types/furniture';
import { FurnitureVisual } from './FurnitureVisual';
import { X, Heart, MessageSquareShare, Check, Shield, Truck, Ruler, Phone, Camera, ZoomIn, Pencil } from 'lucide-react';
import { createWhatsAppUrl, STORE_PHONE_DISPLAY } from '../data/furnitureData';
import { getProductPrimaryImage, getProductAngles } from '../data/furnitureImages';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenImageModal?: (productId?: string) => void;
  onOpenEditModal?: (productId: string) => void;
}

export const ProductModal: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenImageModal,
  onOpenEditModal,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setActivePhotoIndex(0);
    setSelectedColorIndex(0);
    setIsZoomed(false);
  }, [product?.id]);

  if (!isOpen || !product) return null;

  const whatsappUrl = createWhatsAppUrl(product.name, product.price, product.id);

  // Collect all photos available for this product (primary + angles)
  const primaryImg = getProductPrimaryImage(product.id, product.category);
  const angleImgs = getProductAngles(product.id);
  const allImages = [primaryImg, ...angleImgs].filter(Boolean);
  const currentImage = allImages[activePhotoIndex] || primaryImg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E8E2D9] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#44403C] hover:bg-white hover:text-black border border-[#E8E2D9] shadow-sm transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto flex-1">
          {/* Left Column: Visual Showcase & Gallery Angles */}
          <div className="bg-[#F3EFEA] p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E2D9]">
            <div className="space-y-3">
              {/* Main Visual Display */}
              <div className="relative rounded-xl overflow-hidden border border-[#E8E2D9] shadow-xs group bg-[#E8E2D9]/40">
                <FurnitureVisual
                  productId={product.id}
                  imageUrl={currentImage}
                  category={product.category}
                  name={product.name}
                  aspect="4/3"
                />

                {/* Photo Counter Badge */}
                <div className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono tracking-wider backdrop-blur-xs">
                  {activePhotoIndex + 1} / {allImages.length || 1}
                </div>

                {/* Change/Add Photo Quick Button */}
                {onOpenImageModal && (
                  <button
                    onClick={() => onOpenImageModal(product.id)}
                    className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-white/90 hover:bg-white text-[#1E1B18] text-[11px] font-semibold border border-[#E8E2D9] shadow-xs inline-flex items-center gap-1.5 transition-colors"
                    title="Upload or change photos for this furniture"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Add/Change Photos</span>
                  </button>
                )}
              </div>

              {/* Gallery Angles Thumbnails */}
              {allImages.length > 1 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#8C7456]">
                    Showroom Angles & Details
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`w-16 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-white ${
                          activePhotoIndex === idx
                            ? 'border-[#3E2723] scale-102 shadow-xs'
                            : 'border-[#E8E2D9] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} angle ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quality & Service Badges */}
            <div className="mt-6 pt-4 border-t border-[#E8E2D9] grid grid-cols-2 gap-3 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{product.specifications.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Rajahmundry Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Custom Size Options</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{STORE_PHONE_DISPLAY}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C7456]">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-[#FAF8F5] text-[#44403C] rounded border border-[#E8E2D9]">
                  {product.availability}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-serif font-bold text-[#1E1B18] mb-2">
                {product.name}
              </h2>

              {/* Price Row with Edit Action */}
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold font-mono text-[#1E1B18] tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-[#A8A29E] line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[11px] text-[#78716C]">
                    (Showroom display estimate)
                  </span>
                </div>

                {onOpenEditModal && (
                  <button
                    onClick={() => onOpenEditModal(product.id)}
                    className="px-2.5 py-1 text-xs font-semibold bg-[#FAF8F5] hover:bg-[#E8E2D9] text-[#1E1B18] rounded border border-[#E8E2D9] inline-flex items-center gap-1.5 transition-colors"
                    title="Edit Price & Dimensions for this product"
                  >
                    <Pencil className="w-3 h-3 text-[#C5A880]" />
                    <span>Edit Price & Dimensions</span>
                  </button>
                )}
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-[#57534E] leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Swatches / Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                    Available Finishes:{' '}
                    <span className="text-[#1E1B18] font-normal">
                      {product.colors[selectedColorIndex]?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColorIndex === idx
                            ? 'border-[#3E2723] scale-110 shadow-xs'
                            : 'border-transparent'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions Section with Edit Button */}
              <div className="mb-5 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Exact Dimensions</span>
                  </div>
                  {onOpenEditModal && (
                    <button
                      onClick={() => onOpenEditModal(product.id)}
                      className="text-[11px] font-semibold text-[#8C7456] hover:text-[#1E1B18] inline-flex items-center gap-1 hover:underline"
                    >
                      <Pencil className="w-2.5 h-2.5" />
                      <span>Edit Dimensions</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-[#1E1B18]">
                  <div className="p-2 bg-white rounded border border-[#E8E2D9]">
                    <span className="text-[#78716C] block text-[10px] uppercase font-semibold">Width</span>
                    <strong className="text-xs">{product.dimensions.width}</strong>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#E8E2D9]">
                    <span className="text-[#78716C] block text-[10px] uppercase font-semibold">Length</span>
                    <strong className="text-xs">{product.dimensions.length}</strong>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#E8E2D9]">
                    <span className="text-[#78716C] block text-[10px] uppercase font-semibold">Height</span>
                    <strong className="text-xs">{product.dimensions.height}</strong>
                  </div>
                </div>
                {product.dimensions.mattressSize && (
                  <div className="pt-1.5 border-t border-[#E8E2D9] text-[#78716C] text-[11px]">
                    Mattress / Fit: <strong className="text-[#1E1B18]">{product.dimensions.mattressSize}</strong>
                  </div>
                )}
              </div>

              {/* Specifications List */}
              <div className="space-y-1.5 text-xs text-[#57534E] mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                  <span>
                    <strong>Wood:</strong> {product.specifications.woodType}
                  </span>
                </div>
                {product.specifications.upholstery && (
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                    <span>
                      <strong>Upholstery:</strong> {product.specifications.upholstery}
                    </span>
                  </div>
                )}
                {product.specifications.foamDensity && (
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                    <span>
                      <strong>Foam & Support:</strong> {product.specifications.foamDensity}
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A880] mt-0.5 shrink-0" />
                  <span>
                    <strong>Assembly:</strong> {product.specifications.assembly}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-[#E8E2D9] flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-[#20BA5A] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-lg border transition-colors ${
                  isWishlisted
                    ? 'border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C]'
                    : 'border-[#E8E2D9] bg-white text-[#57534E] hover:border-[#C5A880]'
                }`}
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#B91C1C]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
