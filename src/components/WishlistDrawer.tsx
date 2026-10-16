import React from 'react';
import { Product } from '../types/furniture';
import { X, Trash2, MessageSquareShare, ArrowRight, Heart } from 'lucide-react';
import { STORE_PHONE_NUMERIC } from '../data/furnitureData';
import { FurnitureVisual } from './FurnitureVisual';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveItem: (id: string) => void;
  onClearWishlist: () => void;
  onSelectProduct: (product: Product) => void;
  onExploreCollections: () => void;
}

export const WishlistDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem,
  onClearWishlist,
  onSelectProduct,
  onExploreCollections,
}) => {
  if (!isOpen) return null;

  const totalEstimate = wishlist.reduce((acc, item) => acc + item.price, 0);

  const createBundleWhatsAppUrl = () => {
    const itemsList = wishlist
      .map((item, idx) => `${idx + 1}. ${item.name} - ₹${item.price.toLocaleString('en-IN')}`)
      .join('\n');

    const message = `Hello STYLE SPA FURNITURE, I have selected the following pieces in my wishlist for my home in Rajamahendravaram:\n\n${itemsList}\n\nEstimated Total: ₹${totalEstimate.toLocaleString('en-IN')}\n\nPlease share bundled package pricing, showroom availability, and delivery details.`;

    return `https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 md:p-6 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B91C1C] fill-[#B91C1C]" />
            <h2 className="text-lg font-serif font-bold text-[#1E1B18]">
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#78716C] hover:text-[#1E1B18] hover:bg-[#E8E2D9] transition-colors"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#78716C]">
              <Heart className="w-12 h-12 text-[#D7CEC2] stroke-1 mb-3" />
              <p className="font-serif font-bold text-[#1E1B18] text-base mb-1">
                Your wishlist is empty
              </p>
              <p className="text-xs text-[#78716C] max-w-xs mb-6">
                Explore our curated luxury bedroom and home furniture collections and save items you love.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCollections();
                }}
                className="px-5 py-2.5 bg-[#1E1B18] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#3E2723] transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] hover:border-[#C5A880]/50 transition-colors"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  className="w-18 h-18 rounded overflow-hidden shrink-0 cursor-pointer bg-[#F3EFEA] border border-[#E8E2D9]"
                >
                  <FurnitureVisual
                    imageId={item.images.primary}
                    category={item.category}
                    name={item.name}
                    aspect="1/1"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C7456]">
                    {item.category}
                  </div>
                  <h4
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="text-xs font-bold font-serif text-[#1E1B18] truncate cursor-pointer hover:text-[#3E2723]"
                  >
                    {item.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-[#1E1B18] tabular-nums mt-0.5">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-[#A8A29E]">
                    {item.dimensions.width}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-[#A8A29E] hover:text-[#B91C1C] transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Bundle WhatsApp CTA */}
        {wishlist.length > 0 && (
          <div className="p-4 md:p-6 border-t border-[#E8E2D9] bg-[#FAF8F5] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#78716C]">Estimated Subtotal:</span>
              <span className="text-base font-bold font-mono text-[#1E1B18] tabular-nums">
                ₹{totalEstimate.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-[11px] text-[#A8A29E] leading-relaxed">
              *Prices shown are showroom reference rates. Exact package quote is provided directly by STYLE SPA FURNITURE team on WhatsApp.
            </p>

            <div className="space-y-2">
              <a
                href={createBundleWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#20BA5A] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Enquire All Items on WhatsApp</span>
              </a>

              <button
                onClick={onClearWishlist}
                className="w-full py-2 text-xs text-[#78716C] hover:text-[#B91C1C] transition-colors text-center"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
