import React, { useState } from "react";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";

export const RugCareService: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"care" | "stains" | "book">("care");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setBookingSubmitted(false), 3500);
  };

  return (
    <section id="services" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-linen border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            Services & Preservation
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Rug Care, Cleaning & <br />
              <span className="italic font-light text-terracotta">Artisan Restoration.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              A handmade carpet is an enduring organic creation. With proper unhurried maintenance,
              your rug will soften with age and survive for subsequent generations.
            </p>
          </div>
        </div>

        {/* Service Subpage Tabs */}
        <div className="flex gap-2 border-b border-craftBorder pb-4 mb-8">
          {[
            { id: "care", label: "Fiber-by-Fiber Care" },
            { id: "stains", label: "Emergency Stain Protocol" },
            { id: "book", label: "Book Professional Wash" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                activeTab === tab.id
                  ? "bg-obsidian text-alabaster border-obsidian shadow-sm font-semibold"
                  : "bg-alabaster text-obsidian/70 border-craftBorder hover:border-obsidian"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Fiber by Fiber Care */}
        {activeTab === "care" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-alabaster p-8 border border-craftBorder shadow-luxury-soft space-y-4">
              <span className="font-mono text-xs text-terracotta uppercase tracking-wider">
                100% Pure New Zealand Wool
              </span>
              <h3 className="font-serif text-2xl text-obsidian uppercase">
                Natural Wool Maintenance
              </h3>
              <p className="text-xs text-obsidian/75 font-light leading-relaxed">
                Wool fibers contain natural lanolin wax which acts as a protective barrier against spills and dust.
              </p>
              <ul className="space-y-2 font-mono text-xs text-obsidian/80 pt-2 border-t border-craftBorder">
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Vacuum weekly with suction only (avoid aggressive beater bars).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Rotate 180° every 6 months to balance sun exposure and traffic.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Initial shedding is normal for high-density cut pile wool.</span>
                </li>
              </ul>
            </div>

            <div className="bg-alabaster p-8 border border-craftBorder shadow-luxury-soft space-y-4">
              <span className="font-mono text-xs text-terracotta uppercase tracking-wider">
                Bamboo Silk & Mulberry Silk
              </span>
              <h3 className="font-serif text-2xl text-obsidian uppercase">
                Botanical Silk Luster
              </h3>
              <p className="text-xs text-obsidian/75 font-light leading-relaxed">
                Delicate light-catching fibers that provide breathtaking glancing sheen. Requires gentler handling.
              </p>
              <ul className="space-y-2 font-mono text-xs text-obsidian/80 pt-2 border-t border-craftBorder">
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Always blot immediately — never scrub or rub wet silk fibers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Brush pile gently in the direction of the nap with a soft bristle.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Avoid steam cleaners or hot water extraction machines.</span>
                </li>
              </ul>
            </div>

            <div className="bg-alabaster p-8 border border-craftBorder shadow-luxury-soft space-y-4">
              <span className="font-mono text-xs text-terracotta uppercase tracking-wider">
                Natural Jute & Flatloom Dhurrie
              </span>
              <h3 className="font-serif text-2xl text-obsidian uppercase">
                Plant Fiber & Dhurrie Care
              </h3>
              <p className="text-xs text-obsidian/75 font-light leading-relaxed">
                Earthy, highly durable flatweaves perfect for dining salons and busy family hallways.
              </p>
              <ul className="space-y-2 font-mono text-xs text-obsidian/80 pt-2 border-t border-craftBorder">
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Reversible dhurries can be flipped annually for double longevity.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Shake outdoors periodically to dislodge deep grit and sand.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Keep plant fibers dry; avoid prolonged high humidity.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Emergency Stain Protocol */}
        {activeTab === "stains" && (
          <div className="bg-alabaster p-8 sm:p-12 border border-craftBorder shadow-luxury-soft grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-terracotta uppercase tracking-wider block">
                Immediate Action Protocol
              </span>
              <h3 className="font-serif text-2xl text-obsidian uppercase">
                The Three Cardinal Rules
              </h3>
              <div className="space-y-3 font-mono text-xs text-obsidian/80">
                <div className="p-3 bg-linen border-l-2 border-terracotta">
                  <span className="font-semibold text-obsidian block">1. Blot, Never Rub:</span>
                  <span>Rubbing drives stains deep into the heart of the knot twisted warp.</span>
                </div>
                <div className="p-3 bg-linen border-l-2 border-terracotta">
                  <span className="font-semibold text-obsidian block">2. Work Perimeter to Center:</span>
                  <span>Prevents liquid stain rings from expanding outwards.</span>
                </div>
                <div className="p-3 bg-linen border-l-2 border-terracotta">
                  <span className="font-semibold text-obsidian block">3. Use Lukewarm Water:</span>
                  <span>Hot water sets vegetable protein dyes permanently.</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-terracotta uppercase tracking-wider block font-semibold">
                Stain Removal Quick Guide
              </span>
              <div className="border border-craftBorder divide-y divide-craftBorder">
                <div className="p-3 bg-white flex justify-between">
                  <span className="font-semibold text-obsidian">Red Wine / Coffee:</span>
                  <span className="text-obsidian/70">Blot with clean cloth + club soda & white vinegar</span>
                </div>
                <div className="p-3 bg-white flex justify-between">
                  <span className="font-semibold text-obsidian">Pet Accidents:</span>
                  <span className="text-obsidian/70">Enzymatic cleaner diluted with 1:3 lukewarm water</span>
                </div>
                <div className="p-3 bg-white flex justify-between">
                  <span className="font-semibold text-obsidian">Oils / Grease:</span>
                  <span className="text-obsidian/70">Sprinkle baking soda, let sit 20m, suction vacuum</span>
                </div>
                <div className="p-3 bg-white flex justify-between">
                  <span className="font-semibold text-obsidian">Candle Wax:</span>
                  <span className="text-obsidian/70">Place ice cube in bag to freeze, gently scrape</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Booking Form */}
        {activeTab === "book" && (
          <div className="bg-alabaster p-8 sm:p-12 border border-craftBorder shadow-luxury-soft max-w-2xl mx-auto">
            {bookingSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <Check className="w-10 h-10 text-terracotta mx-auto" />
                <h3 className="font-serif text-2xl text-obsidian uppercase">Service Request Logged</h3>
                <p className="font-mono text-xs text-obsidian/70">
                  Our master conservator will contact you within 24 hours to schedule white-glove pickup.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4 text-xs font-mono">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="font-serif text-2xl text-obsidian uppercase">
                    Book Master Restoration & Wash
                  </h3>
                  <p className="text-obsidian/60">
                    Natural herbal washing, edge re-serging, and fringe repair by Bhadohi artisans.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 ... / +1 ..."
                      className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Service Needed</label>
                    <select className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian uppercase">
                      <option>Traditional Herbal Wash</option>
                      <option>Edge Binding & Fringe Repair</option>
                      <option>Moth & Humidity Treatment</option>
                      <option>Full Heirloom Re-Knotting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Rug Approximate Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 8x10 ft Hand-Knotted"
                      className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-obsidian/60 uppercase mb-1">Pickup Address & City</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Street, City, Postal Code"
                    className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-obsidian text-alabaster tracking-widest uppercase hover:bg-terracotta transition-colors font-semibold"
                >
                  Confirm Restoration Request
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RugCareService;
