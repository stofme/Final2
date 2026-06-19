import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sparkles, Bookmark, Info, Home, Plus } from "lucide-react";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1A1A]/10 bg-[#F4F1EA]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2.5 group transition-transform hover:scale-[1.01]">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-none border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] group-hover:bg-[#F4F1EA] group-hover:text-[#1A1A1A] transition-colors duration-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-serif text-xl font-black italic tracking-tighter text-[#1A1A1A]">
            Briefify<span className="text-zinc-500 font-sans not-italic font-bold text-xs ml-1 font-mono">№42</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 text-xs font-sans uppercase tracking-widest font-bold transition-all ${
                isActive
                  ? "border-b-2 border-[#1A1A1A] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
              }`
            }
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/generator"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 text-xs font-sans uppercase tracking-widest font-bold transition-all ${
                isActive
                  ? "border-b-2 border-[#1A1A1A] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
              }`
            }
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Brief Generator</span>
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 text-xs font-sans uppercase tracking-widest font-bold transition-all ${
                isActive
                  ? "border-b-2 border-[#1A1A1A] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
              }`
            }
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Saved Briefs</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-4 py-2 text-xs font-sans uppercase tracking-widest font-bold transition-all ${
                isActive
                  ? "border-b-2 border-[#1A1A1A] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
              }`
            }
          >
            <Info className="h-3.5 w-3.5" />
            <span>About</span>
          </NavLink>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/generator")}
            className="inline-flex items-center gap-1.5 rounded-none border border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest text-[#F4F1EA] transition-all hover:bg-transparent hover:text-[#1A1A1A] active:scale-[0.98] shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Brief</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Rail (Only visible on small devices at bottom for extreme convenience and tactile feel) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#1A1A1A]/10 bg-[#F4F1EA]/95 backdrop-blur-lg px-4 py-2.5">
        <div className="flex items-center justify-around">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
                isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"
              }`
            }
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/generator"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
                isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"
              }`
            }
          >
            <Sparkles className="h-5 w-5" />
            <span>Generator</span>
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
                isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"
              }`
            }
          >
            <Bookmark className="h-5 w-5" />
            <span>Saved</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider transition-colors ${
                isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"
              }`
            }
          >
            <Info className="h-5 w-5" />
            <span>About</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
