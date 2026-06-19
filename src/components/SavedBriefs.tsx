import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bookmark, Trash2, Calendar, Target, ShieldAlert, Award, 
  MapPin, CheckCircle, Copy, Download, RefreshCw, FileText, ExternalLink 
} from "lucide-react";
import { DesignBrief } from "../types";

export const SavedBriefs: React.FC = () => {
  const [savedBriefs, setSavedBriefs] = useState<DesignBrief[]>([]);
  const [selectedBrief, setSelectedBrief] = useState<DesignBrief | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load briefs from localStorage on Mount
  useEffect(() => {
    const raw = localStorage.getItem("briefify_saved_briefs");
    if (raw) {
      try {
        const parsed: DesignBrief[] = JSON.parse(raw);
        setSavedBriefs(parsed);
        if (parsed.length > 0) {
          setSelectedBrief(parsed[0]);
        }
      } catch (e) {
        console.error("Failed to parse saved briefs:", e);
      }
    }
  }, []);

  const handleDeleteBrief = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedBriefs.filter((brief) => brief.id !== id);
    setSavedBriefs(updated);
    localStorage.setItem("briefify_saved_briefs", JSON.stringify(updated));
    
    // If the currently selected brief was deleted, adjust selection
    if (selectedBrief?.id === id) {
      setSelectedBrief(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to permanently delete all saved briefs?")) {
      setSavedBriefs([]);
      setSelectedBrief(null);
      localStorage.removeItem("briefify_saved_briefs");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyHexColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const downloadBriefAsJSON = (brief: DesignBrief) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(brief, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `briefify_${brief.clientName.replace(/\s+/g, "_").toLowerCase()}_brief.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCreateMockInitialBriefs = () => {
    const defaultBriefs: DesignBrief[] = [
      {
        id: "default-1",
        clientName: "Solaris Tech",
        industry: "Renewable Energy",
        projectType: "Mobile Application",
        targetAudience: "Eco-Conscious Suburban Homeowners",
        brandPersonality: "Trustworthy & Stable",
        projectGoal: "Increase local residential solar installations by 30% through intuitive ROI calculations.",
        deliverables: "High fidelity iOS/Android app prototype, onboarding flow graphics, custom icons",
        constraint: "Use strictly maximum of two typefaces & light-contrast backgrounds (no pure black screens exception for dashboard settings)",
        deadline: "45 Days",
        visualDirections: ["Geometric", "Soft Minimalism", "Swiss Style"],
        keywords: ["Dynamic", "Structured", "Agile", "Lush"],
        searchTerms: "solar panel minimalist architectural technology",
        colorPalette: ["#14b8a6", "#2dd4bf", "#1e293b", "#f8fafc"],
        typography: {
          head: "Outfit",
          body: "Inter",
          weight: "700"
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "default-2",
        clientName: "Velvet & Vine",
        industry: "E-commerce",
        projectType: "Brand Identity",
        targetAudience: "Vino connoisseurs & experimental wine curators (Ages 25-45)",
        brandPersonality: "Sophisticated & Elegant",
        projectGoal: "Re-establish visual shelf presence and packaging aesthetic to attract boutique hotel buyers.",
        deliverables: "Full packaging layout files, custom brand guidebook, logo suite",
        constraint: "No photoreal elements. Handdrawn line arts and minimalist layout grids only.",
        deadline: "2 Weeks (Sprint)",
        visualDirections: ["Editorial Serif", "Soft Minimalism", "Rustic Modern"],
        keywords: ["Nostalgic", "Understated", "Sleek", "Cohesive"],
        searchTerms: "luxury glass bottle vineyard illustration graphic design",
        colorPalette: ["#881337", "#fb7185", "#18181b", "#fafafa"],
        typography: {
          head: "Playfair Display",
          body: "Inter",
          weight: "600"
        },
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    setSavedBriefs(defaultBriefs);
    setSelectedBrief(defaultBriefs[0]);
    localStorage.setItem("briefify_saved_briefs", JSON.stringify(defaultBriefs));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-black italic tracking-tighter text-[#1A1A1A] flex items-center gap-3">
            <Bookmark className="h-8 w-8 text-[#1A1A1A]" />
            Saved Projects
          </h1>
          <p className="text-sm text-[#1A1A1A]/60 font-serif">
            Browse and manage briefs you have saved to practice your layout and typography skills.
          </p>
        </div>
        {savedBriefs.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 border border-red-500/30 rounded-none text-xs font-sans font-bold uppercase tracking-wider text-red-700 hover:bg-red-50 hover:border-red-500 transition-all flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete All Briefs
          </button>
        )}
      </div>

      {savedBriefs.length === 0 ? (
        <div className="text-center py-16 space-y-6 max-w-md mx-auto">
          <div className="mx-auto w-16 h-16 rounded-none border border-[#1A1A1A]/15 bg-[#EAE7DF] flex items-center justify-center text-[#1A1A1A]">
            <FileText className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-black text-xl text-[#1A1A1A]">No Saved Briefs Yet</h3>
            <p className="text-[#1A1A1A]/70 text-sm leading-relaxed font-serif italic">
              Generate customizable portfolios briefs or populate our curated mock projects to start visualizing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleCreateMockInitialBriefs}
              className="px-4 py-2 bg-transparent text-[#1A1A1A] rounded-none text-xs font-sans font-bold uppercase tracking-widest border border-[#1A1A1A]/30 hover:border-[#1A1A1A] transition-colors"
            >
              Populate Curated Defaults
            </button>
            <Link
              to="/generator"
              className="px-4 py-2 bg-[#1A1A1A] text-[#F4F1EA] rounded-none text-xs font-sans font-bold uppercase tracking-widest border border-[#1A1A1A] transition-all hover:bg-transparent hover:text-[#1A1A1A] text-center"
            >
              Start Custom Generator
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* List/Sidebar Panel (3 Lines on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-bold px-1">
              Brief list ({savedBriefs.length})
            </p>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {savedBriefs.map((brief) => {
                const isSelected = selectedBrief?.id === brief.id;
                return (
                  <div
                    key={brief.id}
                    onClick={() => setSelectedBrief(brief)}
                    className={`p-4 rounded-none border transition-all cursor-pointer text-left relative group ${
                      isSelected
                        ? "bg-[#EAE7DF] border-[#1A1A1A] shadow-sm"
                        : "bg-white border-[#1A1A1A]/10 hover:bg-[#EAE7DF]/30 hover:border-[#1A1A1A]/30"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className={`text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${
                          isSelected ? "bg-[#1A1A1A] text-[#F4F1EA] border-[#1A1A1A]" : "bg-[#1A1A1A]/5 text-[#1A1A1A] border-[#1A1A1A]/10"
                        }`}>
                          {brief.projectType}
                        </span>
                        <h4 className="font-serif font-black text-[#1A1A1A] text-md mt-2 group-hover:underline transition-colors">
                          {brief.clientName}
                        </h4>
                        <p className="text-xs text-[#1A1A1A]/60 font-serif italic line-clamp-1 mt-1">
                          {brief.industry} • {brief.targetAudience}
                        </p>
                        <p className="text-[10px] font-mono text-[#1A1A1A]/40 mt-2">
                          Saved {new Date(brief.createdAt).toLocaleDateString()}
                        </p>
                      </div>
 
                      {/* Delete icon */}
                      <button
                        onClick={(e) => handleDeleteBrief(brief.id, e)}
                        className="p-1.5 rounded-none text-[#1A1A1A]/40 hover:text-red-600 hover:bg-[#1A1A1A]/5 transition-colors"
                        title="Delete saved brief"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Detailed Brief Workspace Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedBrief && (
                <motion.div
                  key={selectedBrief.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-[#1A1A1A]/15 rounded-none shadow-md overflow-hidden"
                >
                  
                  {/* Brief Header Row */}
                  <div className="p-6 md:p-8 border-b border-[#1A1A1A]/10 bg-[#EAE7DF]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-none bg-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A]">
                          {selectedBrief.projectType}
                        </span>
                        <span className="text-xs text-[#1A1A1A]/40">•</span>
                        <span className="text-xs text-[#1A1A1A]/70 font-sans tracking-wide uppercase font-bold">{selectedBrief.industry}</span>
                      </div>
                      <h2 className="font-serif text-3xl font-black italic tracking-tighter text-[#1A1A1A] mt-2">
                        {selectedBrief.clientName}
                      </h2>
                    </div>
 
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(selectedBrief, null, 2), "clipboard")}
                        className="flex-1 sm:flex-initial px-3 py-1.5 bg-transparent text-[#1A1A1A] rounded-none text-xs font-sans font-bold uppercase tracking-widest border border-[#1A1A1A]/30 hover:border-[#1A1A1A] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedId === "clipboard" ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={() => downloadBriefAsJSON(selectedBrief)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 bg-[#1A1A1A] text-[#F4F1EA] rounded-none text-xs font-sans font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 border border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] transition-all shadow-sm"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
 
                  {/* Body Content */}
                  <div className="p-6 md:p-8 space-y-8">
                    
                    {/* Key Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Target Audience</p>
                        <div className="flex items-start gap-2 text-[#1A1A1A]">
                          <Target className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                          <p className="text-sm font-serif italic">{selectedBrief.targetAudience}</p>
                        </div>
                      </div>
 
                      <div className="space-y-1">
                        <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Brand Personality</p>
                        <div className="flex items-start gap-2 text-[#1A1A1A]">
                          <Award className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                          <p className="text-sm font-serif italic">{selectedBrief.brandPersonality}</p>
                        </div>
                      </div>
 
                      <div className="space-y-1">
                        <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Timeframe / Deadline</p>
                        <div className="flex items-start gap-2 text-[#1A1A1A]">
                          <Calendar className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                          <p className="text-sm font-serif italic">{selectedBrief.deadline}</p>
                        </div>
                      </div>
 
                      <div className="space-y-1">
                        <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Unique Constraints</p>
                        <div className="flex items-start gap-2 text-[#1A1A1A]">
                          <ShieldAlert className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                          <p className="text-sm font-serif italic">{selectedBrief.constraint}</p>
                        </div>
                      </div>
                    </div>
 
                    {/* Mission Focus Box */}
                    <div className="p-5 rounded-none bg-[#EAE7DF]/35 border border-[#1A1A1A]/10 space-y-2">
                      <h4 className="font-sans text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                        Strategic Goal & Overview
                      </h4>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed font-serif italic">
                        {selectedBrief.projectGoal}
                      </p>
                    </div>
 
                    {/* Actionable Deliverables */}
                    <div className="p-5 rounded-none bg-[#EAE7DF]/35 border border-[#1A1A1A]/10 space-y-2">
                      <h4 className="font-sans text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                        Explicit Portfolio Deliverables
                      </h4>
                      <p className="text-sm text-[#1A1A1A] leading-relaxed font-serif italic">
                        {selectedBrief.deliverables}
                      </p>
                    </div>
 
                    {/* Divider */}
                    <div className="border-t border-[#1A1A1A]/10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* Left: Interactive Visual Mood Guide */}
                      <div className="space-y-4">
                        <h4 className="font-serif text-lg font-black italic text-[#1A1A1A]">Visual & Mood Direction</h4>
                        
                        <div className="space-y-2">
                          <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Stylistic Approaches</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedBrief.visualDirections.map((dir, idx) => (
                              <span key={idx} className="text-xs font-serif italic px-2.5 py-1 rounded-none bg-[#EAE7DF]/50 border border-[#1A1A1A]/10 text-[#1A1A1A]">
                                {dir}
                              </span>
                            ))}
                          </div>
                        </div>
 
                        <div className="space-y-2">
                          <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Keywords Playlist</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedBrief.keywords.map((word, idx) => (
                              <span key={word} className="text-xs font-mono font-bold text-[#1A1A1A]/60">
                                #{word.toLowerCase()}
                              </span>
                            ))}
                          </div>
                        </div>
 
                        <div className="space-y-2 pt-2">
                          <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Search Inspiration Box</p>
                          <a
                            href={`https://unsplash.com/s/photos/${encodeURIComponent(selectedBrief.searchTerms)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#F4F1EA] bg-[#1A1A1A] border border-[#1A1A1A] px-3 py-1.5 rounded-none font-bold uppercase tracking-wider hover:bg-transparent hover:text-[#1A1A1A] transition-all shadow-sm"
                          >
                            <span>Search Unsplash</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
 
                      {/* Right: Visual Layout settings (Fonts & Palette) */}
                      <div className="space-y-6">
                        <h4 className="font-serif text-lg font-black italic text-[#1A1A1A]">Visual Identity Recommendation</h4>
 
                        {/* Color palette preview */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Modern Color Palette</p>
                            {copiedColor && (
                              <span className="text-[9px] font-mono text-[#F4F1EA] bg-[#1A1A1A] px-1.5 py-0.5">
                                Copied {copiedColor}!
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-4 gap-2 h-14 rounded-none overflow-hidden border border-[#1A1A1A]/15 shadow-sm">
                            {selectedBrief.colorPalette.map((color, i) => (
                              <button
                                key={i}
                                onClick={() => copyHexColor(color)}
                                style={{ backgroundColor: color }}
                                className="w-full h-full relative group transition-transform active:scale-95 border-r border-[#1A1A1A]/10 last:border-0"
                                title={`Copy ${color}`}
                              >
                                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[9px] font-mono text-white transition-opacity">
                                  {color}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
 
                        {/* Typography recommendation */}
                        <div className="space-y-3">
                          <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Brand Typography</p>
                          <div className="p-4 rounded-none bg-[#EAE7DF]/20 border border-[#1A1A1A]/10 space-y-2">
                            <div>
                              <p className="text-[10px] font-sans uppercase font-semibold text-[#1A1A1A]/40">Heading font ({selectedBrief.typography.head})</p>
                              <p className="text-md text-[#1A1A1A] font-serif italic font-extrabold leading-none mt-1">
                                Spherical Harmony
                              </p>
                            </div>
                            <div className="border-t border-[#1A1A1A]/10 pt-2">
                              <p className="text-[10px] font-sans uppercase font-semibold text-[#1A1A1A]/40">Body font ({selectedBrief.typography.body})</p>
                              <p className="text-xs text-[#1A1A1A]/85 font-mono leading-relaxed mt-1">
                                High contrast light elements with structured margins build immediate rhythm.
                              </p>
                            </div>
                          </div>
                        </div>
 
                      </div>
 
                    </div>
 
                  </div>
 
                </motion.div>
              )}
            </AnimatePresence>
          </div>
 
        </div>
      )}
    </motion.div>
  );
};
