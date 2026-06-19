import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'editorial-paper': {
    label: 'Media Orchestration',
    mood: 'dark, trusted, product-led',
    fontDirection: 'modern sans with soft display headings',
    colors: {
      background: '#111010',
      foreground: '#f8f7f3',
      muted: '#a9a5a0',
      primary: '#77eee5',
      accent: '#77eee5',
      surface: '#252221',
    },
    shape: 'rounded dark panels, aqua actions, subtle product glow',
  },
  'luxury-atelier': {
    label: 'Premium Media Console',
    mood: 'premium, restrained, trusted',
    fontDirection: 'smooth sans headings with spacious rhythm',
    colors: {
      background: '#111010',
      foreground: '#ffffff',
      muted: '#bdb9b2',
      primary: '#77eee5',
      accent: '#8fb7ff',
      surface: '#1b1918',
    },
    shape: 'large dark panels, cool hairlines, generous negative space',
  },
  'brutalist-index': {
    label: 'Signal Index',
    mood: 'bold, useful, memorable',
    fontDirection: 'compact labels with large clean headings',
    colors: {
      background: '#111010',
      foreground: '#ffffff',
      muted: '#9c9892',
      primary: '#77eee5',
      accent: '#77eee5',
      surface: '#252221',
    },
    shape: 'dense panels, metric strips, offset media blocks',
  },
  'organic-journal': {
    label: 'Clear Release Desk',
    mood: 'calm, useful, trustworthy',
    fontDirection: 'humanist sans with soft captions',
    colors: {
      background: '#111010',
      foreground: '#f8f7f3',
      muted: '#aaa69f',
      primary: '#77eee5',
      accent: '#77eee5',
      surface: '#252221',
    },
    shape: 'rounded cards, calm spacing, luminous aqua details',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp mono data accents',
    colors: {
      background: '#111010',
      foreground: '#f8fbff',
      muted: '#a9b6c8',
      primary: '#77eee5',
      accent: '#77eee5',
      surface: '#1b1918',
    },
    shape: 'clean grids, pill filters, sharp information hierarchy',
  },
  'retro-bulletin': {
    label: 'Media Bulletin',
    mood: 'direct, lively, polished',
    fontDirection: 'friendly sans headings with crisp labels',
    colors: {
      background: '#111010',
      foreground: '#ffffff',
      muted: '#b9b5ae',
      primary: '#77eee5',
      accent: '#8fb7ff',
      surface: '#252221',
    },
    shape: 'tabs, framed modules, product-style dividers',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic, image-led, immersive',
    fontDirection: 'minimal sans with oversized display moments',
    colors: {
      background: '#111010',
      foreground: '#f8fbff',
      muted: '#a9b6c8',
      primary: '#77eee5',
      accent: '#8fb7ff',
      surface: '#1b1918',
    },
    shape: 'dark cards, large media, glass overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'visual-gallery'
      : slot4BrandConfig.productKind === 'editorial'
        ? 'editorial-paper'
        : slot4BrandConfig.productKind === 'directory'
          ? 'tech-directory'
          : 'organic-journal',
  radius: {
    sm: '0.35rem',
    md: '0.5rem',
    lg: '0.65rem',
    xl: '0.8rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.24em]',
    heroTitle: 'text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-medium uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'border border-black/10 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]',
    quiet: 'border border-black/10 bg-black/[0.03]',
    dark: 'border border-white/10 bg-black/30 shadow-[0_24px_70px_rgba(0,0,0,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
