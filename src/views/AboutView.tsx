import React from 'react';
import { STORE_ADDRESS, STORE_PHONE_DISPLAY, STORE_PHONE_NUMERIC, STORE_GOOGLE_MAPS_URL } from '../data/furnitureData';
import { ScrollReveal } from '../components/ScrollReveal';
import { MapPin, Phone, MessageSquareShare, CheckCircle2, Shield, HeartHandshake, Eye } from 'lucide-react';

interface Props {
  onNavigate: (tab: string) => void;
}

export const AboutView: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      {/* Editorial Header */}
      <ScrollReveal className="max-w-3xl">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-2">
          About Our Showroom · Rajamahendravaram
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1E1B18] mb-4">
          Thoughtfully Designed Furniture for Everyday Living
        </h1>
        <p className="text-sm md:text-base text-[#57534E] leading-relaxed">
          STYLE SPA FURNITURE is a dedicated bedroom and home furniture showroom located in Tadithota, Rajamahendravaram. We curate pieces that combine aesthetic grace with structural longevity.
        </p>
      </ScrollReveal>

      {/* Showroom Story & Focus */}
      <ScrollReveal className="bg-white rounded-xl border border-[#E8E2D9] p-8 md:p-12 shadow-xs space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#1E1B18]">
              The Comfort Philosophy
            </h2>
            <p className="text-xs md:text-sm text-[#57534E] leading-relaxed">
              Your bedroom is your private sanctuary. When you spend a third of your life in bed, the design of your frame, headboard ergonomics, and supportive cushioning directly influence your well-being.
            </p>
            <p className="text-xs md:text-sm text-[#57534E] leading-relaxed">
              We founded our showroom on Old Bypass Road to provide homeowners and interior designers in Andhra Pradesh a space where they can touch seasoned wood grains, feel Belgian linens and boucle fabrics, test motorized recliners, and inspect joint work prior to placing an order.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-lg border border-[#E8E2D9] space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1E1B18]">
              Our Core Showroom Principles
            </h3>
            <div className="space-y-3 text-xs text-[#57534E]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong>No Cheap Particle Board:</strong> We prioritize seasoned teak, ash, smoked walnut veneer, and commercial ply frames.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong>Ergonomic Testing:</strong> Every chair and bed is measured for optimal lumbar, back, and neck support.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong>Transparent WhatsApp Pricing:</strong> We share verified showroom prices, delivery schedules, and clear warranty terms.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong>Local White-Glove Installation:</strong> Our own delivery team delivers and assembles all furniture in Rajamahendravaram.</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Showroom Visual Gallery */}
      <ScrollReveal className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1">
              Live Showroom Walkthrough
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1E1B18]">
              Inside Our Tadithota Showroom
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollReveal delay={0} className="h-full">
            <div className="group bg-white rounded-xl border border-[#E8E2D9] overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-shadow h-full">
              <div className="h-56 overflow-hidden bg-[#F3EFEA]">
                <img
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1000&q=80"
                  alt="Master Bedroom Suite Display"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-base text-[#1E1B18]">Master Bedroom Suites</h4>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  King and queen platform beds with upholstered acoustic headboards, floating nightstands, and matching wardrobes.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} className="h-full">
            <div className="group bg-white rounded-xl border border-[#E8E2D9] overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-shadow h-full">
              <div className="h-56 overflow-hidden bg-[#F3EFEA]">
                <img
                  src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1000&q=80"
                  alt="Living & Recliner Studio Display"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-base text-[#1E1B18]">Living & Recliner Studio</h4>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Curved sofas in stain-resistant boucle, modular L-shapes, and dual-motor zero-gravity power recliners.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="h-full">
            <div className="group bg-white rounded-xl border border-[#E8E2D9] overflow-hidden flex flex-col shadow-2xs hover:shadow-md transition-shadow h-full">
              <div className="h-56 overflow-hidden bg-[#F3EFEA]">
                <img
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80"
                  alt="Dining & Craftsmanship Studio"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-base text-[#1E1B18]">Marble Dining & Custom Millwork</h4>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Solid marble tables, ergonomically curved dining chairs, and modular wardrobe systems.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Direct Contact Banner */}
      <ScrollReveal className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#1E1B18] mb-1">
            Plan a Visit to STYLE SPA FURNITURE
          </h3>
          <p className="text-xs text-[#57534E]">
            {STORE_ADDRESS} · Open Mon–Sat 10 AM to 9 PM, Sun 10:30 AM to 8:30 PM
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={STORE_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#1E1B18] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#3E2723] transition-colors inline-flex items-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Map Directions</span>
          </a>
          <a
            href={`https://wa.me/${STORE_PHONE_NUMERIC}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#20BA5A] transition-colors inline-flex items-center gap-2"
          >
            <MessageSquareShare className="w-3.5 h-3.5" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
};
