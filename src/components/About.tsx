import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle2, Award, Briefcase, Zap, Heart, Sparkles, BookOpen } from "lucide-react";

export const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16"
    >
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#1A1A1A] text-[#F4F1EA] text-[10px] font-bold tracking-[0.2em] uppercase font-sans border border-[#1A1A1A]">
          <Sparkles className="h-3 w-3" />
          The Design Companion
        </div>
        <h1 className="font-serif text-4xl font-black italic tracking-tighter text-[#1A1A1A] sm:text-5xl lg:text-6xl">
          Why <span className="gradient-text">Briefify?</span>
        </h1>
        <p className="text-md text-[#1A1A1A]/70 leading-relaxed font-serif italic text-lg">
          Too many designers gets stuck with "empty canvas syndrome." We synthesize production-ready briefs detailing business goals, deliverables, and style settings to help you master real-world requirements.
        </p>
      </div>

      {/* Visual Workspace Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl font-black italic tracking-tight text-[#1A1A1A]">
            Designed for growth, crafted for precision.
          </h2>
          <p className="text-[#1A1A1A]/80 leading-relaxed font-serif italic">
            Standard design prompts tell you to "make a restaurant website." Briefify gives you the depth of a real-world client assignment. You're given actual demographics, modern limitations, explicit visual directions, and modern font/color combinations to build your expertise.
          </p>
          <div className="space-y-4 pt-2">
            {[
              "Eliminate decision fatigue completely",
              "Practise with specific modern layout criteria",
              "Generate color palettes and typographic pairings automatically",
              "Build a highly relevant, diversified design portfolio"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#1A1A1A] mt-1 shrink-0" />
                <span className="text-sm text-[#1A1A1A]/80 font-serif italic font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 relative group">
          <div className="relative overflow-hidden rounded-none border border-[#1A1A1A]/35 bg-white">
            <img
              src="https://images.unsplash.com/photo-1541462608141-2ff030d64d58?auto=format&fit=crop&w=1200&q=80"
              alt="Designer working on a typography-rich layout"
              className="w-full object-cover aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.01] filter grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-20" />
            
            {/* Overlay specs to showcase luxury style */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-none border border-[#1A1A1A] bg-white flex items-center justify-between shadow-md">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono">active_workspace.svg</p>
                <p className="text-sm font-bold text-[#1A1A1A] font-serif mt-0.5">Brand & Layout Architecture</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded-none bg-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A]">
                № 042 / ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Bento Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-black italic tracking-tight text-[#1A1A1A]">The Briefify Tool Philosophy</h2>
          <p className="text-sm text-[#1A1A1A]/60 font-serif">
            We don't believe in generic templates. Our engine builds briefs structured for modern designers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-none border border-[#1A1A1A]/15 space-y-4 hover:border-[#1A1A1A]/40 hover:bg-[#EAE7DF]/30 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA]">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Structured Output</h3>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-serif italic">
              Every design brief contains client context, target audiences, real deadlines, design constraints, and actionable strategic deliverables.
            </p>
          </div>

          <div className="bg-white p-6 rounded-none border border-[#1A1A1A]/15 space-y-4 hover:border-[#1A1A1A]/40 hover:bg-[#EAE7DF]/30 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA]">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Hex & Type Playlists</h3>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-serif italic">
              Never browse font lists for hours. Get direct inspiration with Google font styles, visual keywords, and professional color hex combinations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-none border border-[#1A1A1A]/15 space-y-4 hover:border-[#1A1A1A]/40 hover:bg-[#EAE7DF]/30 transition-all duration-300 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA]">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Privately Persistent</h3>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-serif italic">
              Save your favorite generated briefs to your client-side dashboard with one click. Clear your storage or start fresh whenever you like.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative rounded-none overflow-hidden border border-[#1A1A1A]/15 bg-[#EAE7DF] py-16 px-6 text-center space-y-6">
        
        <h2 className="font-serif text-3xl font-black italic tracking-tight text-[#1A1A1A] relative z-10 sm:text-4xl">
          Ready to jumpstart your next design project?
        </h2>
        <p className="text-sm text-[#1A1A1A]/70 max-w-lg mx-auto relative z-10 leading-relaxed font-serif italic">
          Unlock your potential. Skip fake random tasks and model your layouts on pristine, comprehensive instructions generated by artificial intelligence.
        </p>
        <div className="pt-4 relative z-10">
          <Link
            to="/generator"
            className="inline-flex items-center gap-1.5 rounded-none border border-[#1A1A1A] bg-[#1A1A1A] px-6 py-3 text-xs font-sans uppercase tracking-widest font-bold text-[#F4F1EA] shadow-md transition-all hover:bg-transparent hover:text-[#1A1A1A] active:scale-[0.98]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Generate a Custom Brief
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
