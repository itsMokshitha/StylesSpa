import React from 'react';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ProductCategory } from '../types/furniture';
import { FurnitureVisual } from '../components/FurnitureVisual';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';

interface Props {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenImageModal?: () => void;
}

export const CollectionsView: React.FC<Props> = ({ onSelectCategory, onOpenImageModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
      {/* Header */}
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-2">
            Showroom Portfolios · Rajamahendravaram
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1E1B18] mb-3">
            Furniture Collections
          </h1>
          <p className="text-xs md:text-sm text-[#78716C] max-w-2xl leading-relaxed">
            From master bedroom sanctuaries to sculpted dining suites and zero-gravity recliners. Each collection is curated for enduring craftsmanship, ergonomic comfort, and architectural elegance.
          </p>
        </div>

        {onOpenImageModal && (
          <button
            onClick={onOpenImageModal}
            className="px-4 py-2 bg-white hover:bg-[#FAF8F5] text-[#1E1B18] border border-[#E8E2D9] hover:border-[#C5A880] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-2xs inline-flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Customize Collection Photos</span>
          </button>
        )}
      </ScrollReveal>

      {/* 10 Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES_DATA.map((cat, index) => (
          <ScrollReveal
            key={cat.id}
            delay={(index % 2) * 90}
            className="h-full"
          >
            <div
              className="group bg-white rounded-xl border border-[#E8E2D9] overflow-hidden flex flex-col justify-between hover:border-[#C5A880] hover:shadow-lg transition-all duration-300 h-full"
            >
            {/* Visual Showcase */}
            <div className="h-64 sm:h-72 bg-[#F3EFEA] relative overflow-hidden">
              <FurnitureVisual
                imageId={cat.id}
                category={cat.id}
                name={cat.title}
                aspect="16/9"
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 text-xs font-mono font-semibold tracking-wide uppercase bg-white/90 text-[#44403C] rounded-sm backdrop-blur-xs border border-[#E8E2D9]">
                  0{index + 1}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B18] group-hover:text-[#3E2723] transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-[#78716C] font-mono tabular-nums">
                    {cat.count} Designs
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#8C7456] uppercase tracking-wider mb-2">
                  {cat.tagline}
                </div>
                <p className="text-xs md:text-sm text-[#57534E] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Material highlight & Explore CTA */}
              <div className="pt-4 border-t border-[#F3EFEA] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-[#78716C]">
                  <span>Featured: </span>
                  <strong className="text-[#1E1B18]">{cat.featuredMaterial}</strong>
                </div>

                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className="px-4 py-2 bg-[#1E1B18] group-hover:bg-[#3E2723] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
        ))}
      </div>
    </div>
  );
};
