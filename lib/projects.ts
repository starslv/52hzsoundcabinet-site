export type Project = {
  slug: string;
  title: string;
  year: string;
  shortDescription: string;
  technologiesUsed: string[];
  keywords: string[];
};

export const projects: Project[] = [
  {
    slug: "tidal-listening-room",
    title: "Tidal Listening Room",
    year: "2024",
    shortDescription:
      "A multichannel installation translating coastal hydrophone recordings into an evolving sonic architecture.",
    technologiesUsed: ["Ambisonics", "Hydrophones", "Max/MSP", "Reaper"],
    keywords: ["ocean bioacoustics", "spatial audio", "installation"]
  },
  {
    slug: "urban-echo-cartography",
    title: "Urban Echo Cartography",
    year: "2023",
    shortDescription:
      "A research-led map of city resonance built from impulse response studies in transit infrastructures.",
    technologiesUsed: ["Binaural microphones", "Impulse response analysis", "Python", "QGIS"],
    keywords: ["field recording", "architecture", "acoustic mapping"]
  },
  {
    slug: "deep-current-choir",
    title: "Deep Current Choir",
    year: "2022",
    shortDescription:
      "An immersive performance combining live vocal processing with marine data sonification.",
    technologiesUsed: ["Ableton Live", "OSC", "Custom DSP patches"],
    keywords: ["performance", "sonification", "collective practice"]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
