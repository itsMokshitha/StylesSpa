import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw, DollarSign, Ruler, Tag, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { Product } from '../types/furniture';
import {
  getActiveProducts,
  updateProductPriceAndDimensions,
  resetProductToDefault,
  resetAllProductsToDefault,
  loadProductOverrides,
  ProductOverride,
} from '../data/productStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetProductId?: string;
  onProductUpdated?: (updatedProduct: Product) => void;
}

export const ProductEditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetProductId,
  onProductUpdated,
}) => {
  const [products, setProducts] = useState<Product[]>(getActiveProducts());
  const [selectedId, setSelectedId] = useState<string>(targetProductId || products[0]?.id || '');
  const [viewMode, setViewMode] = useState<'single' | 'batch'>('single');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Form fields for single edit mode
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [mattressSize, setMattressSize] = useState<string>('');
  const [availability, setAvailability] = useState<Product['availability']>('In Showroom Display');

  // Sync products and form state
  const refreshProducts = () => {
    const list = getActiveProducts();
    setProducts(list);
    return list;
  };

  useEffect(() => {
    if (isOpen) {
      const list = refreshProducts();
      const currentTarget = targetProductId || selectedId || list[0]?.id;
      if (currentTarget) {
        setSelectedId(currentTarget);
        populateForm(currentTarget, list);
      }
    }
  }, [isOpen, targetProductId]);

  const populateForm = (id: string, currentList?: Product[]) => {
    const list = currentList || products;
    const prod = list.find((p) => p.id === id);
    if (!prod) return;

    setPrice(prod.price);
    setOriginalPrice(prod.originalPrice);
    setWidth(prod.dimensions.width);
    setLength(prod.dimensions.length);
    setHeight(prod.dimensions.height);
    setMattressSize(prod.dimensions.mattressSize || '');
    setAvailability(prod.availability);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedId(id);
    populateForm(id);
  };

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedId) || products[0];
  const overrides = loadProductOverrides();
  const hasOverride = Boolean(overrides[selectedId]);

  const handleSaveSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    if (isNaN(price) || price <= 0) {
      setErrorNotice('Please enter a valid price in Indian Rupees (₹).');
      return;
    }
    setErrorNotice(null);

    const updates: ProductOverride = {
      price: Math.round(price),
      originalPrice: originalPrice && originalPrice > 0 ? Math.round(originalPrice) : undefined,
      availability,
      dimensions: {
        width: width.trim() || currentProduct.dimensions.width,
        length: length.trim() || currentProduct.dimensions.length,
        height: height.trim() || currentProduct.dimensions.height,
        mattressSize: mattressSize.trim() || undefined,
      },
    };

    updateProductPriceAndDimensions(selectedId, updates);
    const updatedList = refreshProducts();
    const updated = updatedList.find((p) => p.id === selectedId);

    if (updated && onProductUpdated) {
      onProductUpdated(updated);
    }

    setSuccessNotice(`Updated ${currentProduct.name} (₹${price.toLocaleString('en-IN')})`);
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleResetCurrent = () => {
    resetProductToDefault(selectedId);
    const updatedList = refreshProducts();
    populateForm(selectedId, updatedList);
    const updated = updatedList.find((p) => p.id === selectedId);
    if (updated && onProductUpdated) {
      onProductUpdated(updated);
    }
    setSuccessNotice('Restored original showroom catalog values.');
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleResetAll = () => {
    resetAllProductsToDefault();
    const updatedList = refreshProducts();
    populateForm(selectedId, updatedList);
    setSuccessNotice('All products restored to original showroom values.');
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E8E2D9] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#1E1B18] text-white flex items-center justify-between border-b border-[#3E2723]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Edit Product Price & Dimensions
              </h3>
              <p className="text-[11px] text-[#D6CEBF]">
                Live updates for store pricing, room specifications, and WhatsApp enquiries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex border-b border-[#E8E2D9] bg-[#FAF8F5] px-6 text-xs font-semibold justify-between items-center">
          <div className="flex">
            <button
              onClick={() => setViewMode('single')}
              className={`py-3 px-4 border-b-2 transition-colors inline-flex items-center gap-2 ${
                viewMode === 'single'
                  ? 'border-[#C5A880] text-[#1E1B18] font-bold'
                  : 'border-transparent text-[#78716C] hover:text-[#1E1B18]'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Edit Single Product</span>
            </button>
            <button
              onClick={() => setViewMode('batch')}
              className={`py-3 px-4 border-b-2 transition-colors inline-flex items-center gap-2 ${
                viewMode === 'batch'
                  ? 'border-[#C5A880] text-[#1E1B18] font-bold'
                  : 'border-transparent text-[#78716C] hover:text-[#1E1B18]'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Full Catalog Quick Table</span>
            </button>
          </div>

          <button
            onClick={handleResetAll}
            className="text-[11px] font-semibold text-[#B91C1C] hover:underline inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All to Defaults</span>
          </button>
        </div>

        {/* Toast Alert */}
        {successNotice && (
          <div className="mx-6 mt-4 p-3 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] rounded-lg text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#059669]" />
              <span>{successNotice}</span>
            </div>
            <button
              onClick={() => setSuccessNotice(null)}
              className="text-[#065F46]/60 hover:text-[#065F46]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {errorNotice && (
          <div className="mx-6 mt-4 p-3 bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] rounded-lg text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#DC2626]" />
              <span>{errorNotice}</span>
            </div>
            <button
              onClick={() => setErrorNotice(null)}
              className="text-[#991B1B]/60 hover:text-[#991B1B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {viewMode === 'single' ? (
            <div className="space-y-6">
              {/* Product Selector Bar */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1.5">
                  Select Product to Edit
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedId}
                    onChange={(e) => handleSelectProduct(e.target.value)}
                    className="flex-1 text-xs md:text-sm font-medium bg-white border border-[#E8E2D9] rounded-lg px-3.5 py-2.5 text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₹{p.price.toLocaleString('en-IN')} ({p.category})
                      </option>
                    ))}
                  </select>

                  {hasOverride && (
                    <button
                      type="button"
                      onClick={handleResetCurrent}
                      className="px-3 py-2 text-xs font-semibold text-[#B91C1C] bg-[#FEF2F2] border border-[#FCA5A5] rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-1.5 shrink-0"
                      title="Reset this product to original default values"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset Product</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveSingle} className="space-y-6">
                {/* 1. Price Section */}
                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E2D9] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                        Showroom Pricing (₹)
                      </span>
                      {hasOverride && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                          Custom Price Active
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#78716C]">
                      Syncs with WhatsApp Quotes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Active Price (in ₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-[#78716C] font-mono text-xs">
                          ₹
                        </span>
                        <input
                          type="number"
                          min={1}
                          step={100}
                          value={price || ''}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          required
                          className="w-full pl-7 pr-3 py-2 text-sm font-mono font-semibold bg-white border border-[#E8E2D9] rounded-lg text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                          placeholder="e.g. 64500"
                        />
                      </div>
                      <p className="text-[11px] text-[#78716C] mt-1">
                        Formatted: <strong className="text-[#1E1B18]">₹{Number(price || 0).toLocaleString('en-IN')}</strong>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Original MRP / Comparison Price (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-[#78716C] font-mono text-xs">
                          ₹
                        </span>
                        <input
                          type="number"
                          min={1}
                          step={100}
                          value={originalPrice || ''}
                          onChange={(e) =>
                            setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)
                          }
                          className="w-full pl-7 pr-3 py-2 text-sm font-mono bg-white border border-[#E8E2D9] rounded-lg text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                          placeholder="e.g. 76000 (strike-through)"
                        />
                      </div>
                      <p className="text-[11px] text-[#78716C] mt-1">
                        Shown as strikethrough price when higher than active price
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Dimensions Section */}
                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E2D9] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                      Product Dimensions & Sizing
                    </span>
                    <span className="text-[11px] text-[#78716C]">
                      Shown in specifications & 3D designer
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Width *
                      </label>
                      <input
                        type="text"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs md:text-sm bg-white border border-[#E8E2D9] rounded-lg text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                        placeholder="e.g. 78 inches"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Length / Depth *
                      </label>
                      <input
                        type="text"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs md:text-sm bg-white border border-[#E8E2D9] rounded-lg text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                        placeholder="e.g. 84 inches"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Height *
                      </label>
                      <input
                        type="text"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs md:text-sm bg-white border border-[#E8E2D9] rounded-lg text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                        placeholder="e.g. 52 inches"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Mattress Size or Special Dimension Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={mattressSize}
                      onChange={(e) => setMattressSize(e.target.value)}
                      className="w-full px-3 py-2 text-xs md:text-sm bg-white border border-[#E8E2D9] rounded-lg text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                      placeholder="e.g. 72 x 78 inches (King) or 60 x 78 inches (Queen)"
                    />
                  </div>
                </div>

                {/* 3. Availability Status */}
                <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E2D9] space-y-3">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                    Showroom Availability Status
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(
                      [
                        'In Showroom Display',
                        'Ready for Delivery',
                        'Custom Made to Order',
                      ] as Product['availability'][]
                    ).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setAvailability(status)}
                        className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                          availability === status
                            ? 'bg-[#1E1B18] text-white border-[#1E1B18] shadow-xs'
                            : 'bg-white text-[#57534E] border-[#E8E2D9] hover:bg-gray-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D9]">
                  <div className="text-xs text-[#78716C] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Saved locally in browser and synced to WhatsApp links</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#1E1B18] transition-colors"
                    >
                      Close
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#3E2723] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm inline-flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-[#C5A880]" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Batch Quick Edit Table */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E1B18]">
                    Showroom Catalog Overview & Price Sheet
                  </h4>
                  <p className="text-xs text-[#78716C]">
                    Click any product to edit its price and dimensions, or inspect current showroom specifications.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto border border-[#E8E2D9] rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#78716C] uppercase font-bold text-[10px] tracking-wider border-b border-[#E8E2D9]">
                    <tr>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (₹)</th>
                      <th className="py-3 px-4">Dimensions (W × L × H)</th>
                      <th className="py-3 px-4">Availability</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D9]">
                    {products.map((p) => {
                      const isCustom = Boolean(overrides[p.id]);
                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-[#FAF8F5]/80 transition-colors"
                        >
                          <td className="py-3 px-4 font-serif font-bold text-[#1E1B18]">
                            <div>{p.name}</div>
                            {isCustom && (
                              <span className="text-[10px] font-sans font-semibold text-[#059669]">
                                Custom price
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-[#57534E]">{p.category}</td>
                          <td className="py-3 px-4 font-mono font-bold text-[#1E1B18] tabular-nums">
                            ₹{p.price.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-[#57534E] text-[11px]">
                            {p.dimensions.width} × {p.dimensions.length} × {p.dimensions.height}
                            {p.dimensions.mattressSize && (
                              <div className="text-[10px] text-[#8C7456]">
                                {p.dimensions.mattressSize}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FAF8F5] border border-[#E8E2D9] text-[#44403C]">
                              {p.availability}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                handleSelectProduct(p.id);
                                setViewMode('single');
                              }}
                              className="px-3 py-1.5 bg-white hover:bg-[#1E1B18] text-[#1E1B18] hover:text-white border border-[#E8E2D9] rounded text-[11px] font-semibold transition-colors"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
