import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Layout, Type, Palette, FolderGit } from "lucide-react";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const sampleCardClasses = "relative overflow-hidden rounded-none border border-[#1A1A1A]/15 bg-white p-6 flex flex-col justify-between hover:border-[#1A1A1A]/40 hover:bg-[#EAE7DF]/40 transition-all duration-300 group cursor-pointer shadow-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16"
    >
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 text-center space-y-6 overflow-hidden sm:pt-16 sm:pb-24">
        
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-bold tracking-[0.2em] uppercase font-sans border border-[#1A1A1A] shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          AI Brief Synthesis Engine is Active
        </div>

        <h1 className="mx-auto max-w-4xl font-serif text-4xl font-black italic tracking-tighter text-[#1A1A1A] sm:text-6xl lg:text-7xl leading-[1.05]">
          Build a portfolio that gets you <span className="gradient-text">hired.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-md text-[#1A1A1A]/70 leading-relaxed font-serif italic text-lg">
          Synthesizing elite, highly detailed design briefs with actionable strategic targets, structured constraints, colour palettes, and brand typography to practice like a senior designer.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 relative z-10">
          <button
            onClick={() => navigate("/generator")}
            className="group px-6 py-3.5 bg-[#1A1A1A] text-[#F4F1EA] font-sans font-bold uppercase tracking-widest text-xs rounded-none border border-[#1A1A1A] transition-all hover:bg-transparent hover:text-[#1A1A1A] flex items-center justify-center gap-2 shadow-md"
          >
            <span>Launch Brief Generator</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => navigate("/about")}
            className="px-6 py-3.5 bg-transparent text-[#1A1A1A] font-sans font-bold uppercase tracking-widest text-xs rounded-none border border-[#1A1A1A]/30 hover:border-[#1A1A1A] transition-all hover:bg-[#1A1A1A]/5 shadow-sm"
          >
            Explore Philosophy & Method
          </button>
        </div>
      </section>

      {/* Featured Examples / Bento Showcase */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-[#1A1A1A]/10 pb-4">
          <div>
            <h2 className="font-serif text-3xl font-black italic tracking-tight text-[#1A1A1A]">Example Layout Briefs</h2>
            <p className="text-sm text-[#1A1A1A]/60 font-serif">Example templates synthesized dynamically for our user community.</p>
          </div>
          <button
            onClick={() => navigate("/generator")}
            className="text-xs font-sans uppercase tracking-widest font-extrabold text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5"
          >
            <span>Create custom brief</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div
            onClick={() => navigate("/generator")}
            className={sampleCardClasses}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-sans px-2 py-0.5 rounded-none bg-[#1A1A1A]/5 text-[#1A1A1A] border border-[#1A1A1A]/10 font-bold uppercase tracking-wider">
                  UI/UX Audit
                </span>
                <span className="text-[10px] text-[#1A1A1A]/40 font-mono">ASAP (Urgent)</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-[#1A1A1A] text-xl group-hover:underline transition-colors">Nova Stream</h3>
                <p className="text-xs text-[#1A1A1A]/50 font-sans tracking-wide uppercase font-semibold">Fintech / Personal Banking</p>
              </div>
              <p className="text-sm text-[#1A1A1A]/70 line-clamp-3 leading-relaxed font-serif italic">
                Design a modern web ledger emphasizing high-contrast visual hierarchies and dark ambient color schemes to reduce visual screen fatigue for first-time retail investor clients.
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 mt-6 pt-4 text-xs">
              <div className="flex gap-1">
                <span className="h-3 w-3 rounded-full bg-[#1b1b24] outline outline-1 outline-[#1A1A1A]/10" />
                <span className="h-3 w-3 rounded-full bg-[#4d41df] outline outline-1 outline-[#1A1A1A]/10" />
                <span className="h-3 w-3 rounded-full bg-[#c4c0ff] outline outline-1 outline-[#1A1A1A]/10" />
              </div>
              <span className="text-[#1A1A1A]/50 font-mono text-[10px] uppercase">Space Grotesk</span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate("/generator")}
            className={sampleCardClasses}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-sans px-2 py-0.5 rounded-none bg-[#1A1A1A]/5 text-[#1A1A1A] border border-[#1A1A1A]/10 font-bold uppercase tracking-wider">
                  Packaging Design
                </span>
                <span className="text-[10px] text-[#1A1A1A]/40 font-mono">1 Month</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-[#1A1A1A] text-xl group-hover:underline transition-colors">Terra Flora</h3>
                <p className="text-xs text-[#1A1A1A]/50 font-sans tracking-wide uppercase font-semibold">Organic Skincare</p>
              </div>
              <p className="text-sm text-[#1A1A1A]/70 line-clamp-3 leading-relaxed font-serif italic">
                Develop a tactile premium packaging suite leveraging physical earthy materials and minimal typography to highlight clinical cleanliness and pure botanical formulations.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 mt-6 pt-4 text-xs">
              <div className="flex gap-1">
                <span className="h-3 w-3 rounded-full bg-[#006d77] outline outline-1 outline-[#1A1A1A]/10" />
                <span className="h-3 w-3 rounded-full bg-[#83c5be] outline outline-1 outline-[#1A1A1A]/10" />
                <span className="h-3 w-3 rounded-full bg-[#edf6f9] outline outline-1 outline-[#1A1A1A]/10" />
              </div>
              <span className="text-[#1A1A1A]/50 font-mono text-[10px] uppercase">Playfair Display</span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate("/generator")}
            className={sampleCardClasses}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-sans px-2 py-0.5 rounded-none bg-[#1A1A1A]/5 text-[#1A1A1A] border border-[#1A1A1A]/10 font-bold uppercase tracking-wider">
                  Brand Identity
                </span>
                <span className="text-[10px] text-[#1A1A1A]/40 font-mono">45 Days</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-[#1A1A1A] text-xl group-hover:underline transition-colors">Orbit Robotics</h3>
                <p className="text-xs text-[#1A1A1A]/50 font-sans tracking-wide uppercase font-semibold">Industrial Technology</p>
              </div>
              <p className="text-sm text-[#1A1A1A]/70 line-clamp-3 leading-relaxed font-serif italic">
                Formulate an approachable digital visual language and vector symbol-based mascot to unify multi-platform UI elements and simplify complex industrial operations commands.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 mt-6 pt-4 text-xs">
              <div className="flex gap-1">
                <span className="h-3 w-3 rounded-full bg-[#2a9d8f] outline outline-1 outline-[#1A1A1A]/10" />
                <span className="h-3 w-3 rounded-full bg-[#e9c46a] outline outline-1 outline-[#1A1A1A]/10" />
                <span className="h-3 w-3 rounded-full bg-[#f4a261] outline outline-1 outline-[#1A1A1A]/10" />
              </div>
              <span className="text-[#1A1A1A]/50 font-mono text-[10px] uppercase">JetBrains Mono</span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="bg-[#EAE7DF] border border-[#1A1A1A]/15 rounded-none p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-black italic tracking-tight text-[#1A1A1A]">
              Stop designing without strategic business purposes.
            </h2>
            <p className="text-[#1A1A1A]/80 leading-relaxed text-sm sm:text-base font-serif italic">
              Hiring managers aren't just looking for aesthetic color schemes. They need designers who understand real-world business constraints, targeted user personas, complex user flows, and brand personality guides. Briefify solves this.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center shrink-0 shadow-sm">
                  <Layout className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-sans uppercase tracking-wider text-xs font-bold text-[#1A1A1A]">Specific Deliverables</h4>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1 font-serif">Get precise specs (like page counts and layout goals) for your project files.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-sans uppercase tracking-wider text-xs font-bold text-[#1A1A1A]">Creative Limitations</h4>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1 font-serif">Practice under constraints (like restricting fonts or omitting gradients).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-none overflow-hidden aspect-[4/3] border border-[#1A1A1A]/35 bg-white">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"
              alt="Designer analyzing brand style definitions"
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
            
            {/* Overlay Specs and Stats */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-none border border-[#1A1A1A] bg-white text-[10px] font-mono space-y-1 text-[#1A1A1A]/80 shadow-md">
              <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1">
                <span>MODEL VERSION:</span>
                <span className="font-bold">GEMINI-2.5-PRO</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A]/10 py-1">
                <span>COMBINATIONS:</span>
                <span className="font-bold">100,000+ DYNAMIC VARIANTS</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>PRIVACY STATE:</span>
                <span className="font-bold text-green-700">100% PRIVATE ENGINE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signatures or Statistics banner */}
      <section className="border-t border-b border-[#1A1A1A] py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-[#EAE7DF]/30">
        <div>
          <p className="text-3xl font-black text-[#1A1A1A] font-serif tracking-tight">100%</p>
          <p className="text-[10px] text-[#1A1A1A]/50 font-sans tracking-wider uppercase font-bold mt-1">Client-Side Storage</p>
        </div>
        <div>
          <p className="text-3xl font-black text-[#1A1A1A] font-serif tracking-tight">2 Sec</p>
          <p className="text-[10px] text-[#1A1A1A]/50 font-sans tracking-wider uppercase font-bold mt-1">Synthesis Speed</p>
        </div>
        <div>
          <p className="text-3xl font-black text-[#1A1A1A] font-serif tracking-tight">Unlimited</p>
          <p className="text-[10px] text-[#1A1A1A]/50 font-sans tracking-wider uppercase font-bold mt-1">Custom Combos</p>
        </div>
        <div>
          <p className="text-3xl font-black text-[#1A1A1A] font-serif tracking-tight">Zero</p>
          <p className="text-[10px] text-[#1A1A1A]/50 font-sans tracking-wider uppercase font-bold mt-1">Sign-up Friction</p>
        </div>
      </section>
    </motion.div>
  );
};
