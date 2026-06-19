import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client to avoid crashes if API key is not yet set
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("⚠️ GEMINI_API_KEY environment variable is not defined or is using the placeholder. Falling back to local procedural generation.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Lists for fallback procedural briefs
const CLIENTS = ["Lumina Global", "Solaris Tech", "Evergreen Organic", "Nova Stream", "Peak Performance", "Velvet & Vine", "Prisma Arch", "Nexus Fintech", "Terra Flora", "Orbit Robotics", "Bloom Beauty", "North Star Apps", "Echo Peak", "Bloom Digital", "AeroVelo", "Quasar Web", "Zenith Wear", "PentaCorp"];
const INDUSTRIES = ["Technology", "Fintech", "Health & Wellness", "Renewable Energy", "E-commerce", "Entertainment", "Urban Architecture", "Organic Skincare", "Industrial Robotics", "Luxury Travel", "Esports", "Finance", "Software", "Marketing", "Lifestyle", "Education"];
const PROJECT_TYPES = ["Brand Identity", "Web Design", "Mobile Application", "Marketing Campaign", "Packaging Design", "Social Media Strategy", "UI/UX Redesign", "Print Publication", "Motion Graphics", "UX Audit", "Market Entry Brief"];
const AUDIENCES = ["Gen Z Digital Nomads", "High-Net-Worth Investors", "First-Time Homeowners", "Eco-Conscious Parents", "Casual Gamers", "Corporate Executives", "Aspiring Entrepreneurs", "Local Artisans", "Design Students", "Tech Enthusiasts"];
const PERSONALITIES = ["Bold & Disruptive", "Minimal & Clean", "Friendly & Approachable", "Sophisticated & Elegant", "Energetic & Playful", "Trustworthy & Stable", "Futuristic & Tech-Forward", "Raw & Brutalist"];
const GOALS = ["Increase brand awareness", "Drive product conversions", "Establish market authority", "Create an emotional connection", "Simplify complex processes", "Attract premium clientele", "Unify multi-platform design language"];
const DELIVERABLES = ["Logo Suite & Style Guide", "10-Page Web Prototype", "Social Media Templates", "Custom Icon Set", "Brand Voice Document", "Physical Product Packaging", "Waitlist Landing Page", "Interactive UI Component Library"];
const CONSTRAINTS = ["No use of gradients", "Mobile-first approach only", "Use strictly monochrome colors", "Must feature hand-drawn elements", "Avoid photography entirely", "Maximum of two typefaces", "Primary background must be high-contrast light"];
const DEADLINES = ["2 Weeks (Sprint)", "1 Month", "45 Days", "Q3 2026", "ASAP (Urgent)", "End of Quarter"];
const DIRECTIONS = ["Brutalist", "Soft Minimalism", "Swiss Style", "Cyberpunk", "Art Deco", "Rustic Modern", "Neo-Memphis", "Organic Fluidity", "Geometric", "Editorial Serif"];
const KEYWORDS = ["Agile", "Lush", "Crisp", "Nostalgic", "Vibrant", "Understated", "Dynamic", "Structured", "Whimsical", "Pristine", "Sleek", "Cohesive"];
const PALETTES = [
  ["#4d41df", "#c4c0ff", "#1b1b24", "#fcf8ff"],
  ["#006d77", "#83c5be", "#edf6f9", "#ffddd2"],
  ["#264653", "#2a9d8f", "#e9c46a", "#f4a261"],
  ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c"],
  ["#1a1a1a", "#ffffff", "#cccccc", "#444444"],
  ["#6b705c", "#a5a58d", "#b7b7a4", "#ffe8d6"]
];
const TYPEFACES = [
  { head: "Space Grotesk", body: "Inter", weight: "700" },
  { head: "Playfair Display", body: "Inter", weight: "600" },
  { head: "Outfit", body: "Inter", weight: "700" },
  { head: "JetBrains Mono", body: "Inter", weight: "600" },
  { head: "Inter", body: "Inter", weight: "800" }
];

const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const pickMultipleRandom = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// GET health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

// POST generate brief
app.post("/api/generate-brief", async (req, res) => {
  const { industryPreference, projectTypePreference } = req.body;

  const ai = getGenAI();

  if (!ai) {
    // Generate high quality procedural brief
    const id = Date.now().toString();
    const ind = industryPreference || pickRandom(INDUSTRIES);
    const projType = projectTypePreference || pickRandom(PROJECT_TYPES);
    const client = pickRandom(CLIENTS);
    const audience = pickRandom(AUDIENCES);
    const personality = pickRandom(PERSONALITIES);
    const goal = pickRandom(GOALS);
    const deliverable = pickRandom(DELIVERABLES);
    const constraint = pickRandom(CONSTRAINTS);
    const deadline = pickRandom(DEADLINES);
    const vDirs = pickMultipleRandom(DIRECTIONS, 3);
    const keywords = pickMultipleRandom(KEYWORDS, 4);
    const searchTerms = `"${ind} ${projType} inspiration minimalist portfolio"`;
    const palette = pickRandom(PALETTES);
    const typo = pickRandom(TYPEFACES);

    const brief = {
      id,
      clientName: client,
      industry: ind,
      projectType: projType,
      targetAudience: audience,
      brandPersonality: personality,
      projectGoal: goal,
      deliverables: deliverable,
      constraint,
      deadline,
      visualDirections: vDirs,
      keywords,
      searchTerms,
      colorPalette: palette,
      typography: typo,
      createdAt: new Date().toISOString()
    };

    console.log("Procedural fallback brief generated.");
    return res.json({ brief, source: "procedural" });
  }

  try {
    const prompt = `Generate a comprehensive professional creative brief for a design project.
    ${industryPreference ? `Preferred Industry: ${industryPreference}.` : ""}
    ${projectTypePreference ? `Preferred Project Type: ${projectTypePreference}.` : ""}
    The brief must be detailed, exciting, and realistic. Make up a creative client name. Provide exactly 4 Hex values in the colorPalette representing a high-fashion modern cohesive palette. Use modern google fonts for typography (e.g. Space Grotesk, Inter, Outfit, Playfair Display, JetBrains Mono, Soruce Sans, Montserrat). Make sure the output fits the visual tone of modern premium tools.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite creative design director specializing in synthesizing high-fidelity professional branding and UI/UX design briefs for world-class design portfolios.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clientName: { type: Type.STRING, description: "Name of the fictional creative startup or client" },
            industry: { type: Type.STRING, description: "Industry sector (e.g., Fintech, Organics, Skincare)" },
            projectType: { type: Type.STRING, description: "Type of creative project needed (e.g., UI/UX Redesign, Packaging Design, Brand Identity)" },
            targetAudience: { type: Type.STRING, description: "Specific targeted user profile (e.g., Gen Z Digital Nomads, High-Net-Worth Investors)" },
            brandPersonality: { type: Type.STRING, description: "The core brand mood descriptors (e.g., Bold & Brutalist, Soft & Minimalist)" },
            projectGoal: { type: Type.STRING, description: "Actionable strategic business or creative goal" },
            deliverables: { type: Type.STRING, description: "Items to deliver (e.g., 10-Page Web Prototype, Logo Suite)" },
            constraint: { type: Type.STRING, description: "A unique design restriction or creative criteria (e.g., No use of gradients)" },
            deadline: { type: Type.STRING, description: "Realistic modern schedule or timeframe" },
            visualDirections: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 stylistic visual directions (e.g., Brutalist, Swiss Style, Soft Minimalism)"
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 keywords representing the brand vibe"
            },
            searchTerms: { type: Type.STRING, description: "Unedited minimalist string of keywords to search on unsplash, pinterest or dribbble" },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 4 high contrast professional Hex values (e.g., ['#4d41df', '#c4c0ff', '#1b1b24', '#fcf8ff'])"
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                head: { type: Type.STRING, description: "Primary display headline google font name" },
                body: { type: Type.STRING, description: "Legible clean body copy google font name" },
                weight: { type: Type.STRING, description: "Bold weight for headings (e.g., '700', '800')" }
              },
              required: ["head", "body", "weight"]
            }
          },
          required: [
            "clientName", "industry", "projectType", "targetAudience", "brandPersonality",
            "projectGoal", "deliverables", "constraint", "deadline", "visualDirections",
            "keywords", "searchTerms", "colorPalette", "typography"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response received from Gemini API");
    }

    const parsedBrief = JSON.parse(text);
    const briefWithId = {
      ...parsedBrief,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    console.log("Gemini brief generated successfully.");
    return res.json({ brief: briefWithId, source: "gemini-api" });

  } catch (error) {
    console.error("error in gemini-api brief generation model:", error);
    // Fallback to procedural generation on failure
    const id = Date.now().toString();
    const ind = industryPreference || pickRandom(INDUSTRIES);
    const projType = projectTypePreference || pickRandom(PROJECT_TYPES);
    const brief = {
      id,
      clientName: pickRandom(CLIENTS),
      industry: ind,
      projectType: projType,
      targetAudience: pickRandom(AUDIENCES),
      brandPersonality: pickRandom(PERSONALITIES),
      projectGoal: pickRandom(GOALS),
      deliverables: pickRandom(DELIVERABLES),
      constraint: pickRandom(CONSTRAINTS),
      deadline: pickRandom(DEADLINES),
      visualDirections: pickMultipleRandom(DIRECTIONS, 3),
      keywords: pickMultipleRandom(KEYWORDS, 4),
      searchTerms: `"${ind} ${projType} inspiration minimalist"`,
      colorPalette: pickRandom(PALETTES),
      typography: pickRandom(TYPEFACES),
      createdAt: new Date().toISOString()
    };
    return res.json({ brief, source: "procedural-fallback", error: (error as Error).message });
  }
});

async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Briefify Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
