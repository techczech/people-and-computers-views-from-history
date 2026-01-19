export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  quote: string;
}

export interface VideoItem {
  id: string;
  title: string;
  year: string;
  description: string;
  link: string;
}

export interface QuoteItem {
  videoTitle: string;
  year: string;
  quotes: { text: string; timecode: string; link: string }[];
}

export interface ThemeExample {
  context: string;
  quote: string;
  source: string;
}

export interface ThemeItem {
  title: string;
  description: string; // HTML/Markdown string
  examples: ThemeExample[];
}

export interface SummarySection {
  title: string;
  content: string; // HTML string for rich text preservation
}

export interface SummaryItem {
  id: string;
  title: string;
  metadata: {
    originalTitle: string;
    date: string;
    link: string;
    authors: string;
    commissioningAgency: string;
  };
  sections: SummarySection[];
}
