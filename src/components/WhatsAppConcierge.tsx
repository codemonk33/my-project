import React, { useState } from "react";
import { MessageCircle, X, Send, Phone, Sparkles, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";

interface WhatsAppConciergeProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({
  phoneNumber = "917317076787", // Primary Atelier line (Naman Dubey / Studio Principal)
  defaultMessage = "Hello Naman Rugs Atelier, I am exploring your handcrafted carpets and would like to speak with a specialist.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const presetQueries = [
    {
      title: "Custom Spec & Dimensions Quote",
      prompt: "Hello Naman Rugs, I would like a quote for a custom dimension rug for an interior design project.",
    },
    {
      title: "Schedule 1-on-1 Loom Video Tour",
      prompt: "Hello, I want to book a live video consultation with the weavers at your Bhadohi atelier.",
    },
    {
      title: "Request Physical Yarn Swatch Box",
      prompt: "Hello, I would like to request a complimentary yarn pom swatch kit for our design studio.",
    },
    {
      title: "Trade & Hospitality B2B Inquiry",
      prompt: "Hello Naman Dubey, I am an interior architect inquiring about your trade program and bulk project specifications.",
    },
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text || defaultMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Concierge Popover Dialog */}
      {isOpen && (
        <div className="mb-4 w-[360px] sm:w-[400px] max-w-[calc(100vw-32px)] bg-alabaster border border-craftBorder shadow-luxury-elevated rounded-none animate-in fade-in slide-in-from-bottom-4 duration-200 overflow-hidden">
          {/* Header */}
          <div className="bg-obsidian text-alabaster p-5 flex items-start justify-between border-b border-white/10">
            <div className="flex items-center space-x-3">
              {/* Monogram / WhatsApp Badge */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-obsidian rounded-full animate-pulse" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-serif text-base tracking-wide font-normal">Atelier WhatsApp Concierge</h4>
                  <span className="text-[9px] font-mono uppercase bg-terracotta/30 text-terracotta px-1.5 py-0.5 border border-terracotta/40">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-alabaster/70 font-sans mt-0.5">
                  Direct Line to Naman Dubey & Studio Specifiers
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-alabaster/60 hover:text-white p-1 transition-colors"
              aria-label="Close Concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subtitle / Availability Strip */}
          <div className="bg-linen px-5 py-2 text-[10px] font-mono text-obsidian/70 flex items-center justify-between border-b border-craftBorder">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3 h-3 text-terracotta" />
              <span>Bhadohi Studio: Mon–Sat (09:00 – 19:30 IST)</span>
            </div>
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 inline" />
              <span>Replies in ~5m</span>
            </span>
          </div>

          {/* Body Content */}
          <div className="p-5 space-y-4 max-h-[380px] overflow-y-auto">
            <p className="text-xs text-obsidian/80 font-sans leading-relaxed">
              Welcome to <strong>Naman Rugs & Carpets</strong>. Connect instantly with our Bhadohi loom masters for custom dimensions, live video inspections, or trade pricing.
            </p>

            {/* Quick Action Chips */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-obsidian/50">
                Frequent Inquiries:
              </div>
              {presetQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.prompt)}
                  className="w-full text-left p-2.5 bg-white hover:bg-terracotta/10 border border-craftBorder text-xs text-obsidian transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium text-obsidian/90 group-hover:text-obsidian">{q.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-obsidian/40 group-hover:text-terracotta transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-craftBorder">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-obsidian/60 mb-1.5">
                Or Type a Bespoke Message:
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="e.g., 9x12 ft Hand-Knotted for Mumbai villa..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(customMsg);
                  }}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-craftBorder focus:outline-none focus:border-obsidian font-sans"
                />
                <button
                  onClick={() => handleSend(customMsg)}
                  className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>

            {/* Direct Telephone Alternative */}
            <div className="text-center pt-2">
              <a
                href={`tel:+${phoneNumber}`}
                className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-terracotta hover:underline"
              >
                <Phone className="w-3 h-3" />
                <span>Prefer a direct phone call? +91 7317076787</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-3 bg-obsidian text-alabaster pl-4 pr-5 py-3 shadow-luxury-elevated border border-terracotta/40 hover:border-terracotta transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        aria-label="Direct WhatsApp Concierge"
      >
        {/* Glowing live dot */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
        </span>

        {/* WhatsApp Icon */}
        <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4 fill-current" />
        </div>

        {/* Label */}
        <div className="text-left">
          <div className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold flex items-center space-x-1.5">
            <span>WhatsApp Atelier</span>
            <Sparkles className="w-2.5 h-2.5 text-terracotta" />
          </div>
          <div className="text-[9px] font-sans text-alabaster/60 tracking-tight">
            Direct Specifier Line
          </div>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppConcierge;
