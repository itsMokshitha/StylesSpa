import React, { useState } from 'react';
import { MessageSquareShare, X, Send, Sparkles, MapPin, Phone } from 'lucide-react';
import { STORE_PHONE_NUMERIC, STORE_PHONE_DISPLAY } from '../data/furnitureData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    'I would like to explore luxury king-size bedroom sets.',
    'I want to schedule a visit to the Tadithota showroom.',
    'Can you provide custom furniture dimensions and pricing?',
    'What are your delivery timelines across Rajamahendravaram?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || customMsg || 'Hello STYLE SPA FURNITURE, I am interested in exploring furniture collections for my home.';
    const url = `https://wa.me/${STORE_PHONE_NUMERIC}?text=${encodeURIComponent(text)}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expandable Quick Dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#E8E2D9] overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#1E1B18] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
                <MessageSquareShare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm tracking-wide">
                  STYLE SPA FURNITURE
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#C5A880]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span>Verified WhatsApp Helpdesk</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF8F5] space-y-3">
            <div className="p-3 bg-white rounded-lg border border-[#E8E2D9] text-xs text-[#57534E] leading-relaxed">
              Hello! Welcome to STYLE SPA FURNITURE, Rajamahendravaram. How can we help you furnish your home today?
            </div>

            {/* Quick buttons */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#78716C]">
                Quick Enquiries:
              </div>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2 text-xs bg-white hover:bg-[#F3EFEA] text-[#1E1B18] rounded border border-[#E8E2D9] transition-colors flex items-center justify-between gap-1 group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3 h-3 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="flex items-center gap-1.5 pt-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                className="flex-1 px-3 py-2 text-xs bg-white border border-[#E8E2D9] rounded focus:outline-hidden focus:border-[#C5A880]"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded transition-colors"
                title="Send via WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-between text-[10px] text-[#78716C]">
              <span>Phone: {STORE_PHONE_DISPLAY}</span>
              <span>Tadithota Showroom</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Chat with STYLE SPA FURNITURE on WhatsApp"
        title="Chat on WhatsApp (080749 21404)"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquareShare className="w-7 h-7" />
        )}
      </button>
    </div>
  );
};
