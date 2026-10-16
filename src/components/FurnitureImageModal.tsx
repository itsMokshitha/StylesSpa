import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Check, RefreshCw, Trash2, Plus, Sparkles, ExternalLink, AlertCircle } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/furnitureData';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { ProductCategory } from '../types/furniture';
import {
  loadCustomImageStore,
  saveCustomImageStore,
  DEFAULT_PRODUCT_IMAGES,
  CATEGORY_IMAGE_MAP,
  DEFAULT_SHOWROOM_PHOTOS,
  ShowroomPhoto,
} from '../data/furnitureImages';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: string;
  initialCategory?: ProductCategory;
}

export const FurnitureImageModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialProductId,
  initialCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'showroom'>('upload');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || PRODUCTS_DATA[0].id
  );
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    initialCategory || 'Luxury Beds'
  );
  const [targetType, setTargetType] = useState<'product' | 'category' | 'showroom'>('product');
  const [imageSlot, setImageSlot] = useState<'primary' | 'angle'>('primary');

  const [inputUrl, setInputUrl] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [showroomTitle, setShowroomTitle] = useState('');
  const [showroomCaption, setShowroomCaption] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentStore = loadCustomImageStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewDataUrl(result);
      setInputUrl('');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyImage = () => {
    const finalUrl = previewDataUrl || inputUrl.trim();
    if (!finalUrl) {
      setErrorMessage('Please upload an image file or enter an image URL.');
      return;
    }
    setErrorMessage(null);

    const store = loadCustomImageStore();

    if (targetType === 'product') {
      const prod = PRODUCTS_DATA.find((p) => p.id === selectedProductId);
      const existing = store.productImages[selectedProductId] || {
        primary: DEFAULT_PRODUCT_IMAGES[selectedProductId]?.primary || '',
        angles: DEFAULT_PRODUCT_IMAGES[selectedProductId]?.angles ? [...DEFAULT_PRODUCT_IMAGES[selectedProductId].angles] : [],
      };

      if (imageSlot === 'primary') {
        store.productImages[selectedProductId] = {
          ...existing,
          primary: finalUrl,
        };
      } else {
        const currentAngles = existing.angles ? [...existing.angles] : [];
        currentAngles.push(finalUrl);
        store.productImages[selectedProductId] = {
          ...existing,
          angles: currentAngles,
        };
      }

      saveCustomImageStore(store);
      setSuccessMessage(`Image applied to ${prod?.name || 'product'} successfully!`);
    } else if (targetType === 'category') {
      store.categoryImages[selectedCategory] = finalUrl;
      saveCustomImageStore(store);
      setSuccessMessage(`Cover photo updated for ${selectedCategory}!`);
    } else if (targetType === 'showroom') {
      const newPhoto: ShowroomPhoto = {
        id: `custom-sr-${Date.now()}`,
        title: showroomTitle.trim() || 'Showroom Display',
        caption: showroomCaption.trim() || 'Captured at STYLE SPA FURNITURE showroom',
        category: selectedCategory,
        imageUrl: finalUrl,
      };
      store.showroomPhotos = [newPhoto, ...(store.showroomPhotos || [])];
      saveCustomImageStore(store);
      setSuccessMessage('New photo added to the Showroom Gallery!');
    }

    setPreviewDataUrl(null);
    setInputUrl('');
    setShowroomTitle('');
    setShowroomCaption('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3500);
  };

  const handleResetProductImage = (productId: string) => {
    const store = loadCustomImageStore();
    delete store.productImages[productId];
    saveCustomImageStore(store);
    setSuccessMessage('Reset to curated original photo.');
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  const handleResetAll = () => {
    saveCustomImageStore({
      productImages: {},
      categoryImages: {},
      showroomPhotos: [],
    });
    setSuccessMessage('All images restored to showroom defaults.');
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  const selectedProduct = PRODUCTS_DATA.find((p) => p.id === selectedProductId) || PRODUCTS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#E8E2D9] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#1E1B18] text-white flex items-center justify-between border-b border-[#3E2723]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Furniture Image Studio
              </h3>
              <p className="text-[11px] text-[#D6CEBF]">
                Upload, customize, and add real furniture photos to STYLE SPA FURNITURE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E2D9] bg-[#FAF8F5] px-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 border-b-2 transition-colors inline-flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-[#C5A880] text-[#1E1B18] font-bold'
                : 'border-transparent text-[#78716C] hover:text-[#1E1B18]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Add / Upload Image</span>
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-3 px-4 border-b-2 transition-colors inline-flex items-center gap-2 ${
              activeTab === 'manage'
                ? 'border-[#C5A880] text-[#1E1B18] font-bold'
                : 'border-transparent text-[#78716C] hover:text-[#1E1B18]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Manage Product Photos</span>
          </button>
          <button
            onClick={() => setActiveTab('showroom')}
            className={`py-3 px-4 border-b-2 transition-colors inline-flex items-center gap-2 ${
              activeTab === 'showroom'
                ? 'border-[#C5A880] text-[#1E1B18] font-bold'
                : 'border-transparent text-[#78716C] hover:text-[#1E1B18]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Showroom Gallery Photos</span>
          </button>
        </div>

        {/* Notification Toast */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] rounded-lg text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#059669]" />
              <span>{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-[#065F46]/60 hover:text-[#065F46]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] rounded-lg text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#DC2626]" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-[#991B1B]/60 hover:text-[#991B1B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              {/* Destination Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTargetType('product')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    targetType === 'product'
                      ? 'border-[#C5A880] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#E8E2D9] hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-bold text-[#1E1B18]">Product Image</div>
                  <div className="text-[11px] text-[#78716C]">Assign to specific bed, sofa, or chair</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetType('category')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    targetType === 'category'
                      ? 'border-[#C5A880] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#E8E2D9] hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-bold text-[#1E1B18]">Category Cover</div>
                  <div className="text-[11px] text-[#78716C]">Update collection card banner</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetType('showroom')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    targetType === 'showroom'
                      ? 'border-[#C5A880] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#E8E2D9] hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-bold text-[#1E1B18]">Showroom Gallery</div>
                  <div className="text-[11px] text-[#78716C]">Add to showroom walk-in tour</div>
                </button>
              </div>

              {/* Target Details */}
              {targetType === 'product' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D9]">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1.5">
                      Select Furniture Product
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full text-xs font-medium bg-white border border-[#E8E2D9] rounded-lg px-3 py-2.5 text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                    >
                      {PRODUCTS_DATA.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1.5">
                      Placement Slot
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setImageSlot('primary')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          imageSlot === 'primary'
                            ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                            : 'bg-white text-[#57534E] border-[#E8E2D9]'
                        }`}
                      >
                        Primary Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageSlot('angle')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          imageSlot === 'angle'
                            ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                            : 'bg-white text-[#57534E] border-[#E8E2D9]'
                        }`}
                      >
                        + Gallery Angle
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {targetType === 'category' && (
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D9]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1.5">
                    Select Furniture Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
                    className="w-full text-xs font-medium bg-white border border-[#E8E2D9] rounded-lg px-3 py-2.5 text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                  >
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {targetType === 'showroom' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D9]">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1.5">
                      Showroom Photo Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Master Bedroom Vignette"
                      value={showroomTitle}
                      onChange={(e) => setShowroomTitle(e.target.value)}
                      className="w-full text-xs bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7456] mb-1.5">
                      Description / Caption
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Displayed on 1st Floor, Tadithota"
                      value={showroomCaption}
                      onChange={(e) => setShowroomCaption(e.target.value)}
                      className="w-full text-xs bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              )}

              {/* Upload Dropzone */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7456]">
                  Upload Image File or Enter URL
                </label>

                {/* File Drop Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#C5A880]/60 hover:border-[#C5A880] bg-[#FAF8F5] hover:bg-[#F5F0E6] rounded-xl p-8 text-center cursor-pointer transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-white shadow-xs mx-auto flex items-center justify-center text-[#C5A880] mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-[#1E1B18] mb-1">
                    Click to browse or drop furniture photo
                  </div>
                  <p className="text-xs text-[#78716C]">
                    Supports JPEG, PNG, WEBP, HEIC from your device or phone camera
                  </p>
                </div>

                {/* Or enter URL */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs text-[#78716C] uppercase font-semibold">Or</span>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image web URL (e.g. https://...)"
                      value={inputUrl}
                      onChange={(e) => {
                        setInputUrl(e.target.value);
                        setPreviewDataUrl(null);
                      }}
                      className="flex-1 text-xs bg-white border border-[#E8E2D9] rounded-lg px-3 py-2 text-[#1E1B18] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              {(previewDataUrl || inputUrl.trim()) && (
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D9] space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8C7456] flex items-center justify-between">
                    <span>Image Preview</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewDataUrl(null);
                        setInputUrl('');
                      }}
                      className="text-[11px] text-[#B91C1C] hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="h-52 rounded-lg overflow-hidden bg-black/5 relative flex items-center justify-center">
                    <img
                      src={previewDataUrl || inputUrl.trim()}
                      alt="Furniture Preview"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#1E1B18] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyImage}
                  disabled={!previewDataUrl && !inputUrl.trim()}
                  className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#3E2723] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Save Image to Showroom</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E1B18]">
                    Showroom Product Images
                  </h4>
                  <p className="text-xs text-[#78716C]">
                    View all 20+ furniture pieces. You can replace or reset any image anytime.
                  </p>
                </div>
                <button
                  onClick={handleResetAll}
                  className="text-xs font-semibold text-[#B91C1C] hover:underline inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {PRODUCTS_DATA.map((product) => {
                  const custom = currentStore.productImages[product.id];
                  const activeImg = custom?.primary || DEFAULT_PRODUCT_IMAGES[product.id]?.primary || CATEGORY_IMAGE_MAP[product.category];

                  return (
                    <div
                      key={product.id}
                      className="p-3 bg-white border border-[#E8E2D9] rounded-xl flex items-center gap-3.5 shadow-2xs"
                    >
                      <div className="w-16 h-16 rounded-lg bg-[#FAF8F5] overflow-hidden shrink-0 border border-[#E8E2D9]">
                        <img
                          src={activeImg}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase font-bold text-[#8C7456] truncate">
                          {product.category}
                        </div>
                        <div className="text-xs font-serif font-bold text-[#1E1B18] truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-[#78716C] mt-0.5">
                          {custom ? (
                            <span className="text-[#059669] font-semibold">Customized Photo</span>
                          ) : (
                            <span>Curated Showroom Photo</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedProductId(product.id);
                            setTargetType('product');
                            setActiveTab('upload');
                          }}
                          className="px-2 py-1 text-[11px] font-semibold bg-[#FAF8F5] hover:bg-[#E8E2D9] text-[#1E1B18] rounded border border-[#E8E2D9]"
                        >
                          Change
                        </button>
                        {custom && (
                          <button
                            onClick={() => handleResetProductImage(product.id)}
                            className="p-1 text-[#B91C1C] hover:bg-red-50 rounded"
                            title="Reset to original"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'showroom' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E1B18]">
                    Showroom Tour Photographs
                  </h4>
                  <p className="text-xs text-[#78716C]">
                    Photographs of Style Spa showroom interior, bedroom galleries, and finishes in Rajamahendravaram.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTargetType('showroom');
                    setActiveTab('upload');
                  }}
                  className="px-3 py-1.5 bg-[#1E1B18] hover:bg-[#3E2723] text-white text-xs font-semibold rounded inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Showroom Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {DEFAULT_SHOWROOM_PHOTOS.map((photo) => (
                  <div
                    key={photo.id}
                    className="group bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl overflow-hidden flex flex-col"
                  >
                    <div className="h-32 bg-black/10 overflow-hidden relative">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-semibold rounded">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-serif font-bold text-[#1E1B18]">
                        {photo.title}
                      </div>
                      <p className="text-[11px] text-[#78716C] line-clamp-2 mt-0.5">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
