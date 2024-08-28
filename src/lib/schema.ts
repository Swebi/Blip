export interface snippetState {
  code: string;
  logs: string;
  selectedLanguage: string;
  fileName: string;
  selectedTab: boolean;
  title: string;
  description: string;
  viewer: boolean;
  creator?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface snippet {
  slug: string;
  code: string;
  logs: string;
  language: string;
  fileName: string;
  title: string;
  description: string;
}
