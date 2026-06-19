import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1A1A1A] bg-[#1A1A1A] py-12 pb-24 md:pb-12 text-[#F4F1EA]/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-none border border-[#F4F1EA]/20 bg-[#F4F1EA]/10 text-[#F4F1EA]">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-serif text-md font-bold text-[#F4F1EA]">
                Briefify<span className="text-[#F4F1EA]/50 font-sans font-bold text-[10px] ml-1 font-mono">№42</span>
              </span>
            </div>
            <p className="text-sm max-w-sm text-[#F4F1EA]/60 leading-relaxed font-serif italic">
              Synthesizing elite, professional portfolio briefs in brand identity, UI/UX, packaging, and digital strategy. Practice your skills with production-ready guidelines.
            </p>
          </div>

          <div>
            <h4 className="text-[#F4F1EA] font-semibold text-xs tracking-[0.2em] uppercase mb-4 font-sans">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/generator" className="hover:text-white transition-colors">Brief Generator</Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors">Saved Briefs</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">How it Works</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F4F1EA] font-semibold text-xs tracking-[0.2em] uppercase mb-4 font-sans">Legal & Info</h4>
            <p className="text-sm text-[#F4F1EA]/55 leading-relaxed">
              No subscription or sign-up required. All briefs are generated and stored privately in your browser's client database.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F4F1EA]/40 gap-4">
          <p>© {new Date().getFullYear()} Briefify. Engineered for creative craft and visual mastery.</p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-300">Fast Generation Mode</span>
            <span className="text-[#F4F1EA] flex items-center gap-1.5 opacity-80">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Core engine online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
