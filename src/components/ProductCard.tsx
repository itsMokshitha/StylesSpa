import React from 'react';
import { Product } from '../types/furniture';
import { FurnitureVisual } from './FurnitureVisual';
import { Heart, MessageSquareShare, ArrowUpRight, Camera, Pencil } from 'lucide-react';
import { createWhatsAppUrl } from '../data/furnitureData';
import { useScrollReveal } from './ScrollReveal';

interface Props {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onOpenImageModal?: (productId: string) => void;
  onOpenEditModal?: (productId: string) => void;
  animationDelay?: number;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onOpenImageModal,
  onOpenEditModal,
  animationDelay = 0,
}) => {
  const whatsappUrl = createWhatsAppUrl(product.name, product.price, product.id);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px',
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${animationDelay}ms` }}
      className={`reveal-init ${isVisible ? 'reveal-visible' : ''} group relative bg-white border border-[#E8E2D9] rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-[#C5A880]/60`}
    >
      {/* Visual Area */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative cursor-pointer overflow-hidden bg-[#F3EFEA]"
      >
        <FurnitureVisual
          productId={product.id}
          imageId={product.images.primary}
          category={product.category}
          name={product.name}
          aspect="4/3"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-white/95 text-[#44403C] rounded-sm backdrop-blur-xs border border-[#E8E2D9] shadow-2xs">
            {product.availability}
          </span>
        </div>

        {/* Action Buttons: Edit, Image Edit, Wishlist */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {onOpenEditModal && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenEditModal(product.id);
              }}
              className="p-2 rounded-full bg-white/95 text-[#44403C] hover:bg-white hover:text-[#C5A880] transition-colors border border-[#E8E2D9] shadow-xs opacity-0 group-hover:opacity-100"
              title="Edit Price & Dimensions"
              aria-label="Edit Price & Dimensions"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenImageModal && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenImageModal(product.id);
              }}
              className="p-2 rounded-full bg-white/95 text-[#44403C] hover:bg-white hover:text-[#C5A880] transition-colors border border-[#E8E2D9] shadow-xs opacity-0 group-hover:opacity-100"
              title="Add or Change Photo"
              aria-label="Add or Change Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="p-2 rounded-full bg-white/90 text-[#44403C] hover:bg-white hover:text-[#B91C1C] transition-colors border border-[#E8E2D9] shadow-xs"
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isWishlisted ? 'text-[#B91C1C] fill-[#B91C1C]' : 'text-[#57534E]'
              }`}
            />
          </button>
        </div>

        {/* Hover Quick View Overlay Banner */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-black/75 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-xs font-semibold text-white gap-1 pointer-events-none">
          <span>Inspect Specifications</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C7456] mb-1">
            {product.category}
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-base font-serif font-bold text-[#1E1B18] group-hover:text-[#3E2723] transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>

          {/* Dimensions snippet with quick edit click */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#78716C] mb-3">
            <span>{product.specifications.woodType.split(' ')[0]}</span>
            <span aria-hidden="true">·</span>
            <span
              onClick={(e) => {
                if (onOpenEditModal) {
                  e.stopPropagation();
                  onOpenEditModal(product.id);
                }
              }}
              className={onOpenEditModal ? 'hover:text-[#1E1B18] hover:underline cursor-pointer' : ''}
              title="Click to edit dimensions"
            >
              {product.dimensions.width}
            </span>
          </div>
        </div>

        {/* Price & Actions Row */}
        <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between gap-2">
          <div
            onClick={(e) => {
              if (onOpenEditModal) {
                e.stopPropagation();
                onOpenEditModal(product.id);
              }
            }}
            className={onOpenEditModal ? 'cursor-pointer group/price' : ''}
            title="Click to edit price"
          >
            <div className="text-base font-bold text-[#1E1B18] font-mono tabular-nums flex items-center gap-1">
              <span>₹{product.price.toLocaleString('en-IN')}</span>
              {onOpenEditModal && (
                <Pencil className="w-2.5 h-2.5 text-[#C5A880] opacity-0 group-hover/price:opacity-100 transition-opacity" />
              )}
            </div>
            <div className="text-[10px] text-[#A8A29E]">
              Showroom estimate
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectProduct(product)}
              className="px-2.5 py-1.5 text-xs font-semibold text-[#1E1B18] bg-[#F3EFEA] hover:bg-[#E8E2D9] rounded transition-colors"
            >
              Details
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded flex items-center gap-1 transition-colors shadow-xs"
              title="Enquire on WhatsApp"
            >
              <MessageSquareShare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
