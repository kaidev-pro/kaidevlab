export type Locale = "id" | "en" | "ja";

export interface NavTranslations {
  work: string;
  learn: string;
  labNotes: string;
  about: string;
  contact: string;
  letsTalk: string;
}

export interface HeroTranslations {
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  lead: string;
  exploreWork: string;
  meetKai: string;
  basedIn: string;
  buildingIndependently: string;
}

export interface WorkTranslations {
  eyebrow: string;
  heading: string;
  description: string;
  exploreAll: string;
}

export interface CapabilitiesTranslations {
  eyebrow: string;
  heading: string;
  description: string;
  items: {
    title: string;
    description: string;
  }[];
}

export interface NowTranslations {
  eyebrow: string;
  heading: string;
  description: string;
  buildingTitle: string;
  exploringTitle: string;
}

export interface CreativeTranslations {
  eyebrow: string;
  heading: string;
  description: string;
  exploreStory: string;
}

export interface NotesTranslations {
  eyebrow: string;
  heading: string;
  description: string;
  readNote: string;
}

export interface CtaTranslations {
  eyebrow: string;
  heading: string;
  description: string;
  button: string;
}

export interface FooterTranslations {
  tagline: string;
  rights: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  work: WorkTranslations;
  capabilities: CapabilitiesTranslations;
  now: NowTranslations;
  creative: CreativeTranslations;
  notes: NotesTranslations;
  cta: CtaTranslations;
  footer: FooterTranslations;
}
