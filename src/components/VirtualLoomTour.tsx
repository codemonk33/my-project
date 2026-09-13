import React, { useState } from "react";
import { Video, Check } from "lucide-react";
import confetti from "canvas-confetti";

export const VirtualLoomTour: React.FC = () => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("14:30 - 15:30 IST");
  const [designerName, setDesignerName] = useState("");
  const [studioEmail, setStudioEmail] = useState("");
  const [tourSubject, setTourSubject] = useState("Bespoke Hand-Knotted Commission Review");
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setIsBooked(false), 4000);
  };

  return (
    <section id="virtual-tour" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-alabaster border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            Live Atelier Experience
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Virtual Loom Tour & <br />
              <span className="italic font-light text-terracotta">Design Consultation.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              Step inside our Bhadohi weaving workshop from anywhere in the world. Inspect loom tension,
              view physical yarn pom strike-offs under studio lighting, and confer live with Naman Dubey.
            </p>
          </div>
        </div>

        {/* Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-linen p-8 sm:p-12 border border-craftBorder shadow-luxury-soft">
          {/* Left: Interactive Video Workshop Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative h-72 sm:h-96 overflow-hidden border border-craftBorder shadow-luxury-soft group">
              <img
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
                alt="Live Loom Video Feed from Bhadohi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-obsidian/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-alabaster border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Loom 04 Feed Available</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="font-mono text-[10px] tracking-widest text-terracotta uppercase">
                  Maryadpatti Weaving Atelier
                </span>
                <h3 className="font-serif text-2xl text-alabaster uppercase">
                  HD Virtual Studio Broadcast
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs text-obsidian/80">
              <div className="p-3 bg-alabaster border border-craftBorder">
                <span className="text-obsidian/50 block text-[10px] uppercase">Format</span>
                <span className="font-semibold text-obsidian">Zoom / Google Meet HD</span>
              </div>
              <div className="p-3 bg-alabaster border border-craftBorder">
                <span className="text-obsidian/50 block text-[10px] uppercase">Direct With</span>
                <span className="font-semibold text-obsidian">Naman Dubey & Master Dyer</span>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-6 bg-alabaster p-8 border border-craftBorder shadow-sm">
            {isBooked ? (
              <div className="text-center py-12 space-y-3">
                <Check className="w-10 h-10 text-terracotta mx-auto" />
                <h3 className="font-serif text-2xl text-obsidian uppercase">Virtual Tour Reserved</h3>
                <p className="font-mono text-xs text-obsidian/70 max-w-sm mx-auto">
                  A calendar invite with HD video access coordinates has been dispatched to {studioEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <span className="font-mono text-xs text-terracotta uppercase tracking-wider block mb-1">
                    Book Private Session
                  </span>
                  <h4 className="font-serif text-xl text-obsidian uppercase">
                    Select Your Date & Time
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Architect / Specifier</label>
                    <input
                      type="text"
                      required
                      value={designerName}
                      onChange={(e) => setDesignerName(e.target.value)}
                      placeholder="e.g. Pierre Yovanovitch"
                      className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Studio Email</label>
                    <input
                      type="email"
                      required
                      value={studioEmail}
                      onChange={(e) => setStudioEmail(e.target.value)}
                      placeholder="design@studio.com"
                      className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Time Slot (Bhadohi IST)</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian uppercase focus:outline-none focus:border-obsidian"
                    >
                      <option>11:00 - 12:00 IST (Morning Light)</option>
                      <option>14:30 - 15:30 IST (Afternoon Sunlight)</option>
                      <option>17:30 - 18:30 IST (Grazing Sunset)</option>
                      <option>20:00 - 21:00 IST (European / US Morning Sync)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-obsidian/60 uppercase mb-1">Consultation Agenda</label>
                  <select
                    value={tourSubject}
                    onChange={(e) => setTourSubject(e.target.value)}
                    className="w-full bg-white border border-craftBorder px-3 py-2 text-obsidian uppercase focus:outline-none focus:border-obsidian"
                  >
                    <option>Bespoke Hand-Knotted Commission Review</option>
                    <option>Yarn Dye Vat Color Matching & Swatch Inspection</option>
                    <option>Hospitality Project Multi-Loom Reservation</option>
                    <option>General Factory & Artisan Guild Virtual Tour</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-obsidian text-alabaster uppercase tracking-widest hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 font-semibold shadow-sm"
                >
                  <Video className="w-4 h-4" />
                  <span>Confirm Live Virtual Loom Appointment</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualLoomTour;
