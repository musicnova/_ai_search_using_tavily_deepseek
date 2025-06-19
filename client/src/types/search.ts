export interface SearchResult {
  title: string;
  url: string;
  content: string;
  raw_content?: string;
  published_date?: string;
}

export interface SearchResponse {
  id: number;
  query: string;
  aiResponse: string | null;
  searchResults: {
    results: SearchResult[];
  } | null;
  createdAt: string;
}

export interface SearchRequest {
  query: string;
}
