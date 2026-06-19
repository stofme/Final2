export interface DesignBrief {
  id: string;
  clientName: string;
  industry: string;
  projectType: string;
  targetAudience: string;
  brandPersonality: string;
  projectGoal: string;
  deliverables: string;
  constraint: string;
  deadline: string;
  visualDirections: string[];
  keywords: string[];
  searchTerms: string;
  colorPalette: string[]; // hex codes e.g. ["#4d41df", "#c4c0ff", "#1b1b24", "#fcf8ff"]
  typography: {
    head: string;
    body: string;
    weight: string;
  };
  createdAt: string;
}
