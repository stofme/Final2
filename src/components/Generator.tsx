import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Save, Copy, Download, RefreshCw, Layers, 
  MapPin, Target, Calendar, ShieldAlert, Award, AlertCircle, ExternalLink 
} from "lucide-react";
import { DesignBrief } from "../types";

export const Generator: React.FC = () => {
  const [industry, setIndustry] = useState("");
  const [projectType, setProjectType] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedBrief, setGeneratedBrief] = useState<DesignBrief | null>(null);
  
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const INDUSTRIES = [
    "Technology", "Fintech", "Health & Wellness", "Renewable Energy", 
    "E-commerce", "Entertainment", "Urban Architecture", "Organic Skincare", 
    "Industrial Robotics", "Luxury Travel"
  ];

  const PROJECT_TYPES = [
    "Brand Identity", "Web Design", "Mobile Application", 
    "Marketing Campaign", "Packaging Design", "UI/UX Redesign"
  ];

  const LOADING_STEPS = [
    "Tuning creative context engine...",
    "Defining targeted demographic profiling...",
    "Synthesizing visual direction style presets...",
    "Selecting elegant color hex palettes...",
    "Engineering brand constraints & deliverable scopes..."
  ];

  const runTimedLoading = (callback: () => void) => {
    setLoading(true);
    setLoadingStep(0);
    setGeneratedBrief(null);
    setIsSaved(false);

    // Increment steps in sequence
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(interval);
          callback();
          return prev;
        }
        return prev + 1;
      });
    }, 850);
  };

  const handleGenerateBrief = async () => {
    runTimedLoading(async () => {
      try {
        const res = await fetch("/api/generate-brief", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            industryPreference: industry || undefined,
            projectTypePreference: projectType || undefined
          })
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        
        const data = await res.json();
        if (data.brief) {
          setGeneratedBrief(data.brief);
          return;
        } else {
          throw new Error("No brief in body");
        }
      } catch (err) {
        console.warn("API call failed or unavailable (e.g. GitHub pages static server fallback). Synthesizing offline procedural brief:", err);
        
        // Procedural generator helpers
        const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
        const pickMultipleRandom = <T,>(arr: T[], count: number): T[] => {
          const shuffled = [...arr].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        };

        const FALLBACK_CLIENTS = ["Lumina Global", "Solaris Tech", "Evergreen Organic", "Nova Stream", "Peak Performance", "Velvet & Vine", "Prisma Arch", "Nexus Fintech", "Terra Flora", "Orbit Robotics", "Bloom Beauty", "North Star Apps", "Echo Peak", "Bloom Digital", "AeroVelo", "Quasar Web", "Zenith Wear", "PentaCorp"];
        const FALLBACK_AUDIENCES = ["Gen Z Digital Nomads", "High-Net-Worth Investors", "First-Time Homeowners", "Eco-Conscious Parents", "Casual Gamers", "Corporate Executives", "Aspiring Entrepreneurs", "Local Artisans", "Design Students", "Tech Enthusiasts"];
        const FALLBACK_PERSONALITIES = ["Bold & Disruptive", "Minimal & Clean", "Friendly & Approachable", "Sophisticated & Elegant", "Energetic & Playful", "Trustworthy & Stable", "Futuristic & Tech-Forward", "Raw & Brutalist"];
        const FALLBACK_GOALS = [
          "Design an organic layout with ample whitespace highlighting pure formulations and natural ingredients.",
          "Draft a bold web presence maximizing micro-animations, neon brand accent colors, and brutalist layouts.",
          "Formulate an accessible, highly readable visual guide targeting non-technical senior custom clients.",
          "Formulate an elite high-contrast dark visual system to reduce screen stress during high-intensity trading.",
          "Map out a friendly digital product tour flow to streamline first-time user activation onboards."
        ];
        const FALLBACK_DELIVERABLES = [
          "Logo Suite, Brand Typography Guidelines, and interactive UI component guidelines.",
          "Fully-interactive 10-Page custom desktop layout prototypes and packaging guidelines.",
          "Responsive mobile layouts, brand style sheets, and three customizable social media templates.",
          "Interactive dashboard mockups with consistent button guidelines and detailed layout grids.",
          "Vector physical box illustrations, raw material details, and brand identity style guides."
        ];
        const FALLBACK_CONSTRAINTS = ["No use of gradients", "Mobile-first approach only", "Use strictly monochrome colors", "Must feature hand-drawn elements", "Avoid photography entirely", "Maximum of two typefaces", "Primary background must be high-contrast light"];
        const FALLBACK_DEADLINES = ["2 Weeks (Sprint)", "1 Month", "45 Days", "Q3 2026", "ASAP (Urgent)", "End of Quarter"];
        const FALLBACK_DIRECTIONS = ["Brutalist", "Soft Minimalism", "Swiss Style", "Cyberpunk", "Art Deco", "Rustic Modern", "Neo-Memphis", "Organic Fluidity", "Geometric", "Editorial Serif"];
        const FALLBACK_KEYWORDS = ["Agile", "Lush", "Crisp", "Nostalgic", "Vibrant", "Understated", "Dynamic", "Structured", "Whimsical", "Pristine", "Sleek", "Cohesive"];
        const FALLBACK_PALETTES = [
          ["#1A1A1A", "#EAE7DF", "#D6D1C5", "#736F63"],
          ["#1A1A1A", "#3D5A80", "#98C1D9", "#E0F2F1"],
          ["#1A1A1A", "#2B2E4A", "#E84545", "#903749"],
          ["#1A1A1A", "#0F4C81", "#F5F5F5", "#D8C3A5"],
          ["#1A1A1A", "#2E6F40", "#A8DADC", "#457B9D"]
        ];
        const FALLBACK_TYPEFACES = [
          { head: "Space Grotesk", body: "Inter", weight: "700" },
          { head: "Playfair Display", body: "Inter", weight: "600" },
          { head: "Outfit", body: "Inter", weight: "700" },
          { head: "JetBrains Mono", body: "Inter", weight: "600" }
        ];

        const finalIndustry = industry || pickRandom(INDUSTRIES);
        const finalProjectType = projectType || pickRandom(PROJECT_TYPES);

        const syntheticBrief: DesignBrief = {
          id: Date.now().toString(),
          clientName: pickRandom(FALLBACK_CLIENTS),
          industry: finalIndustry,
          projectType: finalProjectType,
          targetAudience: pickRandom(FALLBACK_AUDIENCES),
          brandPersonality: pickRandom(FALLBACK_PERSONALITIES),
          projectGoal: pickRandom(FALLBACK_GOALS),
          deliverables: pickRandom(FALLBACK_DELIVERABLES),
          constraint: pickRandom(FALLBACK_CONSTRAINTS),
          deadline: pickRandom(FALLBACK_DEADLINES),
          visualDirections: pickMultipleRandom(FALLBACK_DIRECTIONS, 3),
          keywords: pickMultipleRandom(FALLBACK_KEYWORDS, 4),
          searchTerms: `"${finalIndustry} ${finalProjectType} inspiration minimalist"`,
          colorPalette: pickRandom(FALLBACK_PALETTES),
          typography: pickRandom(FALLBACK_TYPEFACES),
          createdAt: new Date().toISOString()
        };

        setGeneratedBrief(syntheticBrief);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleSaveToProjects = () => {
    if (!generatedBrief) return;
    
    const raw = localStorage.getItem("briefify_saved_briefs");
    let currentSaved: DesignBrief[] = [];
    if (raw) {
      try {
        currentSaved = JSON.parse(raw);
      } catch (e) {
        console.error(e);
      }
    }

    // Check if copy already exists
    const exists = currentSaved.some((b) => b.id === generatedBrief.id);
    if (!exists) {
      const updated = [generatedBrief, ...currentSaved];
      localStorage.setItem("briefify_saved_briefs", JSON.stringify(updated));
    }
    
    setIsSaved(true);
  };

  const copyBriefToMarkdown = () => {
    if (!generatedBrief) return;
    const {
      clientName, industry, projectType, targetAudience, brandPersonality,
      projectGoal, deliverables, constraint, deadline, visualDirections, keywords
    } = generatedBrief;

    const md = `
# DESIGN BRIEF: ${clientName}
*Synthesized via Briefify*

- **Project Type:** ${projectType}
- **Industry Preference:** ${industry}
- **Target Audience:** ${targetAudience}
- **Brand Personality:** ${brandPersonality}
- **Timeframe / Deadline:** ${deadline}
- **Core Strategic Constraint:** ${constraint}

### Core Strategic Goal
${projectGoal}

### Expected Portfolio Deliverables
${deliverables}

### Visual & Stylistic Keywords
${keywords.join(", ")} | Stylistic: ${visualDirections.join(", ")}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    if (!generatedBrief) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(generatedBrief, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `briefify_${generatedBrief.clientName.replace(/\s+/g, "_").toLowerCase()}_brief.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8"
    >
      {/* Visual Launcher Banner header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="font-serif text-3xl font-black italic tracking-tighter text-[#1A1A1A] sm:text-4xl">
          Design Brief <span className="gradient-text">Generator</span>
        </h1>
        <p className="text-sm text-[#1A1A1A]/65 font-serif">
          Configure filters or let artificial intelligence surprise you with instant high-quality project briefs.
        </p>
      </div>

      {/* Controller Filters Card */}
      <div className="bg-white p-6 rounded-none border border-[#1A1A1A]/15 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end relative shadow-sm">
        <div className="space-y-2">
          <label className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-bold block">
            Select Industry (Optional)
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-none bg-[#EAE7DF]/30 border border-[#1A1A1A]/15 text-[#1A1A1A] px-4 py-2.5 text-sm font-serif italic focus:border-[#1A1A1A] outline-none transition-colors"
          >
            <option value="">Any / Surprise Me</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-bold block">
            Project Category (Optional)
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full rounded-none bg-[#EAE7DF]/30 border border-[#1A1A1A]/15 text-[#1A1A1A] px-4 py-2.5 text-sm font-serif italic focus:border-[#1A1A1A] outline-none transition-colors"
          >
            <option value="">Any / Surprise Me</option>
            {PROJECT_TYPES.map((pt) => (
              <option key={pt} value={pt}>{pt}</option>
            ))}
          </select>
        </div>

        {/* Action Trigger Button */}
        <div className="sm:col-span-2 flex justify-center pt-2">
          <button
            onClick={handleGenerateBrief}
            disabled={loading}
            className={`w-full sm:w-auto relative inline-flex items-center justify-center gap-2 rounded-none bg-[#1A1A1A] border border-[#1A1A1A] hover:bg-transparent hover:text-[#1A1A1A] px-8 py-3.5 text-xs font-sans font-bold uppercase tracking-widest text-[#F4F1EA] shadow-md transition-all ${
              loading ? "opacity-90 cursor-not-allowed" : ""
            }`}
          >
            <Sparkles className={`h-4.5 w-4.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Synthesizing..." : "Generate Custom Brief"}</span>
          </button>
        </div>
      </div>

      {/* Animation Loading State Screens */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-12 text-center space-y-6 max-w-md mx-auto"
          >
            <div className="relative mx-auto w-16 h-16">
              <div className="absolute inset-0 rounded-none border-2 border-[#1A1A1A]/10" />
              <div className="absolute inset-0 rounded-none border-t-2 border-[#1A1A1A] animate-spin" />
            </div>
            
            <div className="min-h-[48px] space-y-1">
              <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-bold animate-pulse">
                Phase {loadingStep + 1} of 5
              </p>
              <motion.p
                key={loadingStep}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-[#1A1A1A] font-serif italic font-medium"
              >
                {LOADING_STEPS[loadingStep]}
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Generated Brief Display View */}
        {!loading && generatedBrief && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#1A1A1A]/15 rounded-none overflow-hidden shadow-md"
          >
            
            {/* Top Info Bar */}
            <div className="p-6 md:p-8 border-b border-[#1A1A1A]/10 bg-[#EAE7DF]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-none bg-[#1A1A1A] text-[#F4F1EA] border border-[#1A1A1A]">
                    {generatedBrief.projectType}
                  </span>
                  <span className="text-xs text-[#1A1A1A]/40">•</span>
                  <span className="text-xs text-[#1A1A1A]/70 font-sans tracking-wide uppercase font-bold">{generatedBrief.industry}</span>
                </div>
                <h2 className="font-serif text-3xl font-black italic tracking-tighter text-[#1A1A1A] mt-1.5">
                  {generatedBrief.clientName}
                </h2>
              </div>

              {/* Action tools */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={copyBriefToMarkdown}
                  className="flex-1 sm:flex-initial px-3.5 py-2 bg-transparent text-[#1A1A1A] rounded-none text-xs font-sans font-bold uppercase tracking-widest border border-[#1A1A1A]/30 hover:border-[#1A1A1A] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="h-4 w-4 text-[#1A1A1A]/75" />
                  <span>{copied ? "Copied!" : "Copy Text"}</span>
                </button>
                <button
                  onClick={handleDownloadJSON}
                  className="flex-1 sm:flex-initial px-3.5 py-2 bg-transparent text-[#1A1A1A] rounded-none text-xs font-sans font-bold uppercase tracking-widest border border-[#1A1A1A]/30 hover:border-[#1A1A1A] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="h-4 w-4 text-[#1A1A1A]/75" />
                  <span>Download</span>
                </button>
                <button
                  onClick={handleSaveToProjects}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-none text-xs font-sans font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 border border-[#1A1A1A] transition-all ${
                    isSaved
                      ? "bg-green-50 border-green-600/30 text-green-800 cursor-default"
                      : "bg-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] shadow-sm"
                  }`}
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaved ? "Saved Project" : "Save Project"}</span>
                </button>
              </div>
            </div>

            {/* Core Specs Frame */}
            <div className="p-6 md:p-8 space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="space-y-1">
                  <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Target Audience</p>
                  <div className="flex items-start gap-2 text-[#1A1A1A]">
                    <Target className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                    <p className="text-sm font-serif italic">{generatedBrief.targetAudience}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Brand Personality</p>
                  <div className="flex items-start gap-2 text-[#1A1A1A]">
                    <Award className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                    <p className="text-sm font-serif italic">{generatedBrief.brandPersonality}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Timeline / Deadline</p>
                  <div className="flex items-start gap-2 text-[#1A1A1A]">
                    <Calendar className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                    <p className="text-sm font-serif italic">{generatedBrief.deadline}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-sans text-[#1A1A1A]/50 uppercase tracking-widest font-bold">Unique constraints</p>
                  <div className="flex items-start gap-2 text-[#1A1A1A]">
                    <ShieldAlert className="h-4 w-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                    <p className="text-sm font-serif italic">{generatedBrief.constraint}</p>
                  </div>
                </div>

              </div>

              {/* Strategy overview Box */}
              <div className="p-5 rounded-none bg-[#EAE7DF]/35 border border-[#1A1A1A]/10 space-y-1.5">
                <h4 className="font-sans text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                  Strategic Project Goal
                </h4>
                <p className="text-sm text-[#1A1A1A] leading-relaxed font-serif italic">
                  {generatedBrief.projectGoal}
                </p>
              </div>

              {/* Actionable Deliverables Box */}
              <div className="p-5 rounded-none bg-[#EAE7DF]/35 border border-[#1A1A1A]/10 space-y-1.5">
                <h4 className="font-sans text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                  Explicit Deliverables Checklist
                </h4>
                <p className="text-sm text-[#1A1A1A] leading-relaxed font-serif italic">
                  {generatedBrief.deliverables}
                </p>
              </div>

              {/* Design Details Divider */}
              <div className="border-t border-[#1A1A1A]/10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left: Interactive Visual Mood Guide */}
                <div className="space-y-4">
                  <h4 className="font-serif text-lg font-black italic text-[#1A1A1A]">Visual & Mood Direction</h4>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Stylistic Approaches</p>
                    <div className="flex flex-wrap gap-2">
                      {generatedBrief.visualDirections.map((dir, idx) => (
                        <span key={idx} className="text-xs font-serif italic px-2.5 py-1 rounded-none bg-[#EAE7DF]/50 border border-[#1A1A1A]/10 text-[#1A1A1A]">
                          {dir}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Keywords Playlist</p>
                    <div className="flex flex-wrap gap-2">
                      {generatedBrief.keywords.map((word, idx) => (
                        <span key={word} className="text-xs font-mono font-bold text-[#1A1A1A]/60 select-all">
                          #{word.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50" id="unsplash_inspiration">Search Inspiration Block</p>
                    <a
                      href={`https://unsplash.com/s/photos/${encodeURIComponent(generatedBrief.searchTerms)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#F4F1EA] bg-[#1A1A1A] border border-[#1A1A1A] px-3 py-1.5 rounded-none font-bold uppercase tracking-wider hover:bg-transparent hover:text-[#1A1A1A] transition-all shadow-sm"
                    >
                      <span>Search Unsplash</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Right: Visual layout settings (Palette & Type) */}
                <div className="space-y-6">
                  <h4 className="font-serif text-lg font-black italic text-[#1A1A1A]">Visual Identity Recommendation</h4>

                  {/* Colors */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Color Palette (Click Hex to copy)</p>
                      {copiedColor && (
                        <span className="text-[9px] font-mono text-[#F4F1EA] bg-[#1A1A1A] px-1.5 py-0.5">
                          Copied {copiedColor}!
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-2 h-14 rounded-none overflow-hidden border border-[#1A1A1A]/15 shadow-sm">
                      {generatedBrief.colorPalette.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => copyHex(color)}
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

                  {/* Fonts */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-sans uppercase font-bold text-[#1A1A1A]/50">Suggested Brand Typography</p>
                    <div className="p-4 rounded-none bg-[#EAE7DF]/20 border border-[#1A1A1A]/10 space-y-2">
                      <div>
                        <p className="text-[10px] font-sans uppercase font-semibold text-[#1A1A1A]/40">Heading font ({generatedBrief.typography.head})</p>
                        <p className="text-md text-[#1A1A1A] font-serif italic font-extrabold leading-none mt-1">
                          Spherical Harmony
                        </p>
                      </div>
                      <div className="border-t border-[#1A1A1A]/10 pt-2">
                        <p className="text-[10px] font-sans uppercase font-semibold text-[#1A1A1A]/40">Body font ({generatedBrief.typography.body})</p>
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
    </motion.div>
  );
};
