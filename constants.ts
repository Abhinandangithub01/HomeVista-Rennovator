import { StyleTheme, QuickSuggestion } from './types';

export const STYLE_THEMES: StyleTheme[] = [
  { id: 'none', name: 'None' },
  { id: 'scandinavian-cozy', name: 'Scandinavian Cozy' },
  { id: 'modern-industrial', name: 'Modern Industrial' },
  { id: 'classic-colonial', name: 'Classic Colonial' },
  { id: 'bohemian-eclectic', name: 'Bohemian Eclectic' },
  { id: 'coastal-breezy', name: 'Coastal Breezy' },
  { id: 'minimalist-chic', name: 'Minimalist Chic' },
  { id: 'farmhouse-rustic', name: 'Farmhouse Rustic' },
  { id: 'mid-century-modern', name: 'Mid-Century Modern' },
];

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    name: 'Front Elevation',
    prompt: 'Completely redesign the front elevation of the house to be more modern. Focus on updating the windows, entryway, and adding new siding materials.',
  },
  {
    name: 'AI Suggestion',
    prompt: 'Analyze the image and suggest a creative and aesthetically pleasing improvement. I am open to any ideas, from color changes to structural additions.',
  },
  {
    name: 'Paint',
    prompt: "Change the exterior paint color to a stylish light gray with white trim. Ensure the color looks realistic in the given lighting.",
  },
  {
    name: 'Lighting',
    prompt: 'Add modern exterior lighting to enhance the architecture. Include warm, ambient uplighting on the facade and pathway lights along the walkway.',
  },
  {
    name: 'Plant Scaping',
    prompt: 'Improve the curb appeal with new landscaping. Add a variety of plants, including flowering shrubs, ornamental grasses, and a small tree, in a cohesive design.',
  },
  {
    name: 'Terracotta Tiles',
    prompt: "Apply terracotta tiles to the roof, giving it a classic, warm appearance. If it's an interior shot or doesn't have a visible roof, apply terracotta floor tiles or an accent wall with terracotta tiles.",
  }
];