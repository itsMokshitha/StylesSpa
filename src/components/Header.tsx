import React, { useState } from 'react';
import { Heart, Menu, X, Phone, MessageSquareShare, Camera, Image as ImageIcon, Pencil } from 'lucide-react';
import { STORE_PHONE_DISPLAY, STORE_PHONE_NUMERIC } from '../data/furnitureData';

interface Props {
  activeTab: string;
  onNavigate: (tab: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenImageStudio: () => void;
  onOpenEditPrices: () => void;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onNavigate,
  wishlistCount,
  onOpenWishlist,
  onOpenImageStudio,
  onOpenEditPrices,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'designer', label: '3D Designer' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Visit Showroom' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
      {/* Top micro bar for showroom contact & WhatsApp */}
      <div className="bg-[#1E1B18] text-[#E8E2D9] px-4 md:px-8 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#C5A880] font-medium hidden sm:inline">Showroom:</span>
          <span className="truncate">Tadithota, Rajamahendravaram · Opposite Neta Bazar</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={`tel:${STORE_PHONE_DISPLAY.replace(/\s+/g, '')}`}
            className="hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3 h-3 text-[#C5A880]" />
            <span className="font-mono tabular-nums">{STORE_PHONE_DISPLAY}</span>
          </a>
          <span className="text-[#57534E]" aria-hidden="true">|</span>
          <a
            href={`https://wa.me/${STORE_PHONE_NUMERIC}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 text-[#25D366] transition-colors"
          >
            <MessageSquareShare className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp Chat</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar Contract: Exactly 3 Zones */}
      <div className="flex items-center justify-between gap-8 px-4 md:px-8 py-4">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left whitespace-nowrap shrink-0 group focus:outline-hidden"
        >
          <span className="block text-lg md:text-xl font-serif font-bold tracking-wider text-[#1E1B18] group-hover:text-[#3E2723] transition-colors">
            STYLE SPA FURNITURE
          </span>
          <span className="block text-[10px] tracking-widest text-[#8C7456] uppercase -mt-0.5">
            Luxury Showroom · Rajahmundry
          </span>
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#44403C]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#1E1B18] ${
                activeTab === item.id ? 'text-[#1E1B18] font-semibold' : ''
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Edit Prices, Image Studio, Wishlist Drawer) + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenEditPrices}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1E1B18] bg-[#FAF8F5] border border-[#E8E2D9] rounded hover:border-[#C5A880] hover:bg-white hover:text-[#3E2723] transition-colors shadow-2xs whitespace-nowrap shrink-0"
            title="Edit product prices and dimensions"
          >
            <Pencil className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Edit Prices & Sizes</span>
          </button>

          <button
            onClick={onOpenImageStudio}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1E1B18] bg-[#FAF8F5] border border-[#E8E2D9] rounded hover:border-[#C5A880] hover:bg-white hover:text-[#3E2723] transition-colors shadow-2xs whitespace-nowrap shrink-0"
            title="Upload or customize furniture photos"
          >
            <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline">Add Images</span>
          </button>

          <button
            onClick={onOpenWishlist}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1E1B18] bg-white border border-[#E8E2D9] rounded hover:border-[#C5A880] hover:text-[#3E2723] transition-colors shadow-xs whitespace-nowrap shrink-0"
            title="View Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#B91C1C] fill-[#B91C1C]' : 'text-[#78716C]'}`} />
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#3E2723] text-white rounded text-[11px] font-mono tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#44403C] hover:text-[#1E1B18] rounded border border-[#E8E2D9] bg-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8E2D9] px-4 py-4 space-y-2 shadow-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2 text-sm rounded ${
                activeTab === item.id ? 'bg-[#FAF8F5] text-[#1E1B18] font-bold' : 'text-[#57534E] hover:bg-[#FAF8F5]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEditPrices();
            }}
            className="w-full text-left px-3 py-2.5 text-sm rounded bg-[#FAF8F5] text-[#1E1B18] font-semibold flex items-center gap-2 border border-[#E8E2D9]"
          >
            <Pencil className="w-4 h-4 text-[#C5A880]" />
            <span>Edit Prices & Dimensions</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenImageStudio();
            }}
            className="w-full text-left px-3 py-2.5 text-sm rounded bg-[#FAF8F5] text-[#1E1B18] font-semibold flex items-center gap-2 border border-[#E8E2D9]"
          >
            <Camera className="w-4 h-4 text-[#C5A880]" />
            <span>Add / Upload Furniture Images</span>
          </button>
          <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#78716C]">
            <span>Showroom: 080749 21404</span>
            <span className="text-[#25D366] font-semibold">WhatsApp Available</span>
          </div>
        </div>
      )}
    </header>
  );
};
