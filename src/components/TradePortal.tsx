import React, { useState } from "react";
import {
  Building2,
  Hotel,
  Home,
  Anchor,
  UploadCloud,
  FileCheck,
  Send,
  CheckCircle,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

export const TradePortal: React.FC = () => {
  const [projectScope, setProjectScope] = useState<string>("Hospitality");
  const [firmName, setFirmName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [leadTime, setLeadTime] = useState("8–12 Weeks");
  const [rugCount, setRugCount] = useState("3–5 Rugs");
  const [fileName, setFileName] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <section id="trade" className="py-24 sm:py-32 px-6 sm:px-12 md:px-24 bg-linen border-b border-craftBorder relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-8 bg-terracotta" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-terracotta">
            Architectural & Trade Specifications
          </span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian uppercase tracking-tight font-normal leading-tight">
              Collaborate With <br />
              <span className="italic font-light text-terracotta">Our Bhadohi Ateliers.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-obsidian/70 font-light leading-relaxed">
              We partner with global architecture firms, luxury interior designers, and hospitality specifiers
              for custom loom reservations, exclusive colorways, and scale CAD floorplan execution.
            </p>
          </div>
        </div>

        {/* Main B2B Specifier Form & Trade Guarantee Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-alabaster p-8 sm:p-12 border border-craftBorder shadow-luxury-soft">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 border border-terracotta flex items-center justify-center mx-auto text-terracotta">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl text-obsidian uppercase">
                  Trade Dossier Received
                </h3>
                <p className="text-xs sm:text-sm font-mono text-obsidian/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-obsidian">{contactPerson}</span> from{" "}
                  <span className="font-semibold text-obsidian">{firmName}</span>. Naman Dubey and our senior
                  loom engineer will review your {projectScope.toLowerCase()} CAD package and respond within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-obsidian text-alabaster font-mono text-xs uppercase tracking-widest hover:bg-terracotta transition-colors"
                  >
                    Submit Another Project Spec
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
                {/* Scope selector pills */}
                <div>
                  <label className="block text-obsidian/60 uppercase mb-2 font-semibold tracking-wider">
                    1. Select Architectural Scope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "Hospitality", icon: Hotel },
                      { id: "High-End Residential", icon: Home },
                      { id: "Commercial Headquarters", icon: Building2 },
                      { id: "Yacht / Marine", icon: Anchor },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = projectScope === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProjectScope(item.id)}
                          className={`p-3 text-left border transition-all flex flex-col justify-between h-20 ${
                            isSelected
                              ? "bg-obsidian text-alabaster border-obsidian shadow-sm"
                              : "bg-linen text-obsidian/70 border-craftBorder hover:border-obsidian"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? "text-terracotta" : "text-obsidian/60"}`} />
                          <span className="text-[10px] uppercase font-semibold leading-tight">
                            {item.id}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Firm & Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Architecture / Design Firm</label>
                    <input
                      type="text"
                      required
                      value={firmName}
                      onChange={(e) => setFirmName(e.target.value)}
                      placeholder="e.g. Studio Lissoni / Kengo Kuma & Assoc."
                      className="w-full bg-white border border-craftBorder px-3.5 py-2.5 text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Principal / Specifier Name</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Matteo Beretta"
                      className="w-full bg-white border border-craftBorder px-3.5 py-2.5 text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Professional Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="spec@architecturereview.com"
                      className="w-full bg-white border border-craftBorder px-3.5 py-2.5 text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Direct Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+39 02 ... / +1 212 ..."
                      className="w-full bg-white border border-craftBorder px-3.5 py-2.5 text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                </div>

                {/* Lead time & rug count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Target Project Completion</label>
                    <select
                      value={leadTime}
                      onChange={(e) => setLeadTime(e.target.value)}
                      className="w-full bg-white border border-craftBorder px-3.5 py-2.5 text-obsidian uppercase focus:outline-none focus:border-obsidian"
                    >
                      <option>Under 8 Weeks (Expedited Hand-Loom)</option>
                      <option>8–12 Weeks (Hand-Tufted / Hand-Loom)</option>
                      <option>12–20 Weeks (Hand-Knotted Heirloom)</option>
                      <option>Flexible / Tender Phase</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-obsidian/60 uppercase mb-1">Estimated Rug Quantity</label>
                    <select
                      value={rugCount}
                      onChange={(e) => setRugCount(e.target.value)}
                      className="w-full bg-white border border-craftBorder px-3.5 py-2.5 text-obsidian uppercase focus:outline-none focus:border-obsidian"
                    >
                      <option>1 Large Statement Rug (50+ sq. m)</option>
                      <option>2–5 Bespoke Pieces</option>
                      <option>6–15 Luxury Hospitality Suites</option>
                      <option>20+ Full Property Program</option>
                    </select>
                  </div>
                </div>

                {/* CAD Floorplan Uploader Simulation */}
                <div>
                  <label className="block text-obsidian/60 uppercase mb-1 font-semibold">
                    Upload CAD Floorplan / Render Dossier (.DWG, .PDF, .DXF, .ZIP)
                  </label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-craftBorder hover:border-terracotta bg-linen/50 cursor-pointer transition-colors">
                    {fileName ? (
                      <div className="flex items-center space-x-2 text-terracotta font-semibold">
                        <FileCheck className="w-5 h-5" />
                        <span>{fileName} (Attached)</span>
                      </div>
                    ) : (
                      <div className="text-center space-y-1 text-obsidian/60">
                        <UploadCloud className="w-6 h-6 text-terracotta mx-auto" />
                        <span className="block font-medium">Click to select architectural drawing</span>
                        <span className="text-[10px]">Maximum bundle size 50MB</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".dwg,.pdf,.dxf,.zip,.png,.jpg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Project notes */}
                <div>
                  <label className="block text-obsidian/60 uppercase mb-1">Special Weaving Notes / Custom Dimensions</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify target colors, organic cutouts, edge finishes, acoustic requirements, etc."
                    className="w-full bg-white border border-craftBorder px-3.5 py-2.5 text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-obsidian text-alabaster tracking-widest uppercase hover:bg-terracotta transition-colors flex items-center justify-center space-x-2 font-semibold shadow-luxury-soft"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Architectural Spec to Bhadohi Studio</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Trade Program Standards & Concierge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-alabaster p-8 border border-craftBorder shadow-luxury-soft space-y-4">
              <span className="font-mono text-xs text-terracotta uppercase tracking-widest">
                Trade Advantage Program
              </span>
              <h3 className="font-serif text-2xl text-obsidian uppercase">
                Direct Loom Reservation
              </h3>
              <ul className="space-y-3 font-mono text-xs text-obsidian/80">
                <li className="flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Tiered trade pricing with zero intermediary broker markup.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Complimentary express air-freight yarn pom kits and strike-offs.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Weekly photographic loom progress reports sent directly from Bhadohi.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                  <span>Door-to-door insured international white-glove customs clearance.</span>
                </li>
              </ul>
            </div>

            {/* Direct Studio Hotline */}
            <div className="bg-obsidian text-alabaster p-8 border border-obsidian space-y-4">
              <span className="font-mono text-[10px] text-terracotta tracking-widest uppercase block">
                Urgent Specifier Line
              </span>
              <h4 className="font-serif text-xl text-alabaster uppercase">
                Direct WhatsApp Concierge
              </h4>
              <p className="text-xs font-mono text-alabaster/70 leading-relaxed">
                Connect directly with our studio director for instant loom availability and real-time custom yarn quotes:
              </p>
              <div className="space-y-2 pt-2 font-mono text-xs">
                <a
                  href="tel:+917317076787"
                  className="flex items-center space-x-2 text-alabaster hover:text-terracotta transition-colors"
                >
                  <Phone className="w-4 h-4 text-terracotta" />
                  <span>+91 7317076787 (Director Mobile / WhatsApp)</span>
                </a>
                <a
                  href="tel:+917905775130"
                  className="flex items-center space-x-2 text-alabaster hover:text-terracotta transition-colors"
                >
                  <Phone className="w-4 h-4 text-terracotta" />
                  <span>+91 7905775130 (Studio Inquiries)</span>
                </a>
                <a
                  href="mailto:info@namanrugs.com"
                  className="flex items-center space-x-2 text-alabaster hover:text-terracotta transition-colors"
                >
                  <Mail className="w-4 h-4 text-terracotta" />
                  <span>info@namanrugs.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradePortal;
