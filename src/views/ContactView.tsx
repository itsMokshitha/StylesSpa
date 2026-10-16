import React, { useState } from 'react';
import {
  STORE_ADDRESS,
  STORE_PHONE_DISPLAY,
  STORE_PHONE_NUMERIC,
  STORE_GOOGLE_MAPS_URL,
} from '../data/furnitureData';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  MapPin,
  Phone,
  MessageSquareShare,
  Clock,
  Navigation,
  Car,
  CheckCircle2,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    categoryOfInterest: 'Luxury Beds',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello STYLE SPA FURNITURE, my name is ${formData.name || 'a customer'} (Phone: ${formData.phone}). I would like to enquire about ${formData.categoryOfInterest}. Notes: ${formData.notes || 'Looking for showroom visit and price details.'}`;
    const url = `https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent(msg)}`;
    
    // Clean anchor navigation without window.open popup restrictions
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      {/* Editorial Header */}
      <ScrollReveal>
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-2">
          Store Information & Location
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1E1B18] mb-3">
          Visit Our Showroom
        </h1>
        <p className="text-xs md:text-sm text-[#78716C] max-w-2xl leading-relaxed">
          Experience our bedroom displays, ergonomic seating, and material finishes firsthand at our Tadithota showroom in Rajamahendravaram.
        </p>
      </ScrollReveal>

      {/* Main Grid: Location Card & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Location & Showroom Details */}
        <ScrollReveal delay={60} className="bg-white rounded-xl border border-[#E8E2D9] p-6 md:p-8 space-y-6 shadow-xs h-full">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C7456]">
              Showroom Address
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#1E1B18]">
              STYLE SPA FURNITURE
            </h2>
            <p className="text-xs md:text-sm text-[#44403C] leading-relaxed">
              44-15-16, Old Bypass Road,<br />
              Opposite Neta Bazar, Tadithota,<br />
              Rajamahendravaram, Andhra Pradesh 533104
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={STORE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#1E1B18] hover:bg-[#3E2723] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <Navigation className="w-4 h-4 text-[#C5A880]" />
              <span>Get Directions</span>
            </a>

            <a
              href={`tel:${STORE_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#E8E2D9] text-[#1E1B18] border border-[#E8E2D9] text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>Call: {STORE_PHONE_DISPLAY}</span>
            </a>

            <a
              href={`https://wa.me/${STORE_PHONE_NUMERIC}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Verified Store Timings */}
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span>Verified Store Timings</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#57534E]">
              <div>
                <span className="font-semibold text-[#1E1B18]">Monday – Saturday:</span>
                <p className="font-mono tabular-nums">10:00 AM – 9:00 PM</p>
              </div>
              <div>
                <span className="font-semibold text-[#1E1B18]">Sunday:</span>
                <p className="font-mono tabular-nums">10:30 AM – 8:30 PM</p>
              </div>
            </div>
          </div>

          {/* Parking & Landmark Assistance */}
          <div className="space-y-3 pt-2 text-xs text-[#57534E]">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span><strong>Landmark:</strong> Directly opposite Neta Bazar on the Old Bypass Road stretch in Tadithota.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Car className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span><strong>Parking:</strong> Dedicated vehicle parking space available right outside the showroom for customers.</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Interactive Consultation / WhatsApp Form */}
        <ScrollReveal delay={120} className="bg-white rounded-xl border border-[#E8E2D9] p-6 md:p-8 space-y-6 shadow-xs h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C7456]">
              Consultation & Enquiry
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B18] mt-1">
              Send an Enquiry to Our Showroom
            </h3>
            <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
              Fill in your details below and click Send to immediately connect with our Rajamahendravaram team via WhatsApp with your requirements.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
              <h4 className="font-serif font-bold text-base text-[#1E1B18]">
                Opening WhatsApp...
              </h4>
              <p className="text-xs text-[#57534E]">
                Your enquiry was prepared and forwarded to STYLE SPA FURNITURE WhatsApp (+91 80749 21404).
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#8C7456] underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#1E1B18] font-bold mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded focus:outline-hidden focus:border-[#C5A880] focus:bg-white text-xs text-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block text-[#1E1B18] font-bold mb-1">
                  Contact Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98480 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded focus:outline-hidden focus:border-[#C5A880] focus:bg-white text-xs text-[#1E1B18]"
                />
              </div>

              <div>
                <label className="block text-[#1E1B18] font-bold mb-1">
                  Primary Category of Interest
                </label>
                <select
                  value={formData.categoryOfInterest}
                  onChange={(e) => setFormData({ ...formData, categoryOfInterest: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded focus:outline-hidden focus:border-[#C5A880] focus:bg-white text-xs text-[#1E1B18]"
                >
                  <option value="Luxury Beds">Luxury Beds</option>
                  <option value="Modern Sofas">Modern Sofas</option>
                  <option value="Recliners">Recliners</option>
                  <option value="Wardrobes">Wardrobes</option>
                  <option value="Dining Tables and Chairs">Dining Tables and Chairs</option>
                  <option value="Bedroom Furniture Sets">Bedroom Furniture Sets</option>
                  <option value="Office Chairs">Office Chairs</option>
                  <option value="Hospital and Comfort Chairs">Hospital and Comfort Chairs</option>
                  <option value="Side Tables and Bedside Cabinets">Side Tables and Bedside Cabinets</option>
                  <option value="Custom Furniture">Custom Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1E1B18] font-bold mb-1">
                  Specific Requirements / Dimensions / Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Looking for a King bed with walnut headboard and 2 nightstands for my master bedroom..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded focus:outline-hidden focus:border-[#C5A880] focus:bg-white text-xs text-[#1E1B18]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Submit & Chat on WhatsApp</span>
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
};
