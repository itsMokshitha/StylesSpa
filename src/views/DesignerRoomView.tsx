import React from 'react';
import { ThreeRoomDesigner } from '../components/ThreeRoomDesigner';
import { ScrollReveal } from '../components/ScrollReveal';
import { Sparkles, MessageSquareShare } from 'lucide-react';
import { STORE_PHONE_NUMERIC } from '../data/furnitureData';

export const DesignerRoomView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
      {/* Editorial Header */}
      <ScrollReveal>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Virtual Studio</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1E1B18] mb-3">
          Virtual Room Designer
        </h1>
        <p className="text-xs md:text-sm text-[#78716C] max-w-2xl leading-relaxed">
          Experiment with room layouts, wood stains, and fabric textures in real-time 3D. When you are satisfied with a layout, send the exact specifications directly to our showroom on WhatsApp for a custom quotation.
        </p>
      </ScrollReveal>

      {/* Main 3D Studio Canvas & Controls */}
      <ScrollReveal delay={60}>
        <ThreeRoomDesigner />
      </ScrollReveal>

      {/* How the Custom Planning Works in Rajamahendravaram */}
      <ScrollReveal delay={100} className="bg-white rounded-xl border border-[#E8E2D9] p-6 md:p-10 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B18] mb-2">
            How Custom Furniture Design Works at STYLE SPA
          </h3>
          <p className="text-xs md:text-sm text-[#78716C] leading-relaxed">
            Planning a new home or bedroom renovation in Rajamahendravaram? Here is how our team assists you from 3D concept to on-site assembly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] space-y-2">
            <div className="w-8 h-8 rounded bg-[#1E1B18] text-[#C5A880] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1E1B18]">
              Virtual Preview & Swatches
            </h4>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Use this 3D designer to align on colors, wood finishes, and space arrangement. Share the design with us on WhatsApp.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] space-y-2">
            <div className="w-8 h-8 rounded bg-[#1E1B18] text-[#C5A880] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1E1B18]">
              Showroom Consultation & Measurement
            </h4>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Visit our Tadithota showroom to feel the actual fabrics and woods in person. For custom wardrobes and paneling, our carpenter can visit your home for precision measurements.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] space-y-2">
            <div className="w-8 h-8 rounded bg-[#1E1B18] text-[#C5A880] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1E1B18]">
              Artisanal Build & Home Assembly
            </h4>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Crafted with seasoned teak, walnut veneer, and commercial grade hardware. Delivered and installed cleanly in your bedroom with full structural warranty.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#57534E]">
            Have an architect floorplan or interior drawing?
          </div>
          <a
            href={`https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent('Hello STYLE SPA FURNITURE, I have an interior floorplan/drawing and would like custom furniture guidance.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <MessageSquareShare className="w-4 h-4" />
            <span>Send Floorplan on WhatsApp</span>
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
};
