import React from 'react';
import { MapPin, Phone, MessageSquareShare, Clock, Navigation } from 'lucide-react';
import {
  STORE_ADDRESS,
  STORE_PHONE_DISPLAY,
  STORE_PHONE_NUMERIC,
  STORE_GOOGLE_MAPS_URL,
} from '../data/furnitureData';

interface Props {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  // Check if store is currently open based on Indian Standard Time (IST)
  const isCurrentlyOpen = () => {
    // Current IST time
    const now = new Date();
    // UTC offset for IST is +5:30
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const istDate = new Date(utc + 3600000 * 5.5);
    const day = istDate.getDay(); // 0 is Sunday
    const hour = istDate.getHours();
    const minute = istDate.getMinutes();
    const timeInMins = hour * 60 + minute;

    if (day === 0) {
      // Sunday: 10:30 AM (630m) to 8:30 PM (1230m)
      return timeInMins >= 630 && timeInMins <= 1230;
    } else {
      // Mon-Sat: 10:00 AM (600m) to 9:00 PM (1260m)
      return timeInMins >= 600 && timeInMins <= 1260;
    }
  };

  const openNow = isCurrentlyOpen();

  return (
    <footer className="bg-[#1C1917] text-[#EDE7DF] border-t border-[#3E2723]">
      {/* Top Showroom Highlights Strip */}
      <div className="border-b border-[#2B2623] px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#2B2623] flex items-center justify-center text-[#C5A880] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white mb-1">
                Showroom Location
              </h4>
              <p className="text-xs text-[#A8A29E] leading-relaxed">
                44-15-16, Old Bypass Road, opposite Neta Bazar, Tadithota, Rajamahendravaram, AP 533104
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#2B2623] flex items-center justify-center text-[#C5A880] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-serif font-bold text-white">
                  Showroom Timings
                </h4>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    openNow ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {openNow ? 'Open Now' : 'Closed Now'}
                </span>
              </div>
              <p className="text-xs text-[#A8A29E] leading-relaxed">
                Mon – Sat: 10:00 AM – 9:00 PM<br />
                Sunday: 10:30 AM – 8:30 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#2B2623] flex items-center justify-center text-[#C5A880] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white mb-1">
                Direct Contact
              </h4>
              <p className="text-xs text-[#A8A29E] leading-relaxed mb-2">
                Phone: <span className="font-mono tabular-nums text-white">{STORE_PHONE_DISPLAY}</span><br />
                Primary channel: WhatsApp instant enquiry
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${STORE_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                  className="px-2.5 py-1 text-xs bg-[#2B2623] hover:bg-[#3E2723] text-white rounded transition-colors"
                >
                  Call Store
                </a>
                <a
                  href={`https://wa.me/${STORE_PHONE_NUMERIC}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-xs bg-[#25D366] hover:bg-[#20BA5A] text-white rounded transition-colors inline-flex items-center gap-1"
                >
                  <MessageSquareShare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="md:col-span-1 space-y-3">
          <span className="block text-xl font-serif font-bold tracking-wider text-white">
            STYLE SPA FURNITURE
          </span>
          <p className="text-xs text-[#A8A29E] leading-relaxed">
            Rajamahendravaram&apos;s premier destination for luxury bedroom collections, modern living room suites, ergonomic recliners, and bespoke woodwork.
          </p>
          <div className="pt-2">
            <a
              href={STORE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:text-white transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#C5A880] mb-3">
            Explore
          </h5>
          <ul className="space-y-2 text-xs text-[#D6CEBF]">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-white transition-colors"
              >
                Home Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('collections')}
                className="hover:text-white transition-colors"
              >
                10 Curated Collections
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('designer')}
                className="hover:text-white transition-colors"
              >
                Interactive 3D Room Designer
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('catalog')}
                className="hover:text-white transition-colors"
              >
                All Furniture Catalog
              </button>
            </li>
          </ul>
        </div>

        {/* Showroom Collections */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#C5A880] mb-3">
            Core Specialties
          </h5>
          <ul className="space-y-2 text-xs text-[#D6CEBF]">
            <li>Luxury King & Queen Beds</li>
            <li>Modern Curved Sofas & Sectionals</li>
            <li>Zero-Gravity Motorized Recliners</li>
            <li>Modular Master Wardrobes</li>
            <li>Italian Marble Dining Suites</li>
            <li>Hospital & Senior Comfort Chairs</li>
          </ul>
        </div>

        {/* Customer Assurance */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#C5A880] mb-3">
            Showroom Assurance
          </h5>
          <ul className="space-y-2 text-xs text-[#A8A29E] leading-relaxed">
            <li>· In-store touch-and-feel fabric & wood sample bar</li>
            <li>· Direct WhatsApp price confirmations & photos</li>
            <li>· Professional white-glove home delivery & assembly</li>
            <li>· Custom dimensions crafted for your floor plan</li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Address Strip */}
      <div className="border-t border-[#2B2623] px-4 md:px-8 py-6 text-center text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} STYLE SPA FURNITURE · Tadithota, Rajamahendravaram. All rights reserved.
          </div>
          <div className="text-[11px] text-[#A8A29E]">
            Sample prices shown for showroom reference · Verified quotes via WhatsApp or in-store consultation
          </div>
        </div>
      </div>
    </footer>
  );
};
