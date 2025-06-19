import { apiRequest } from "./queryClient";
import type { SearchRequest, SearchResponse } from "../types/search";

export const searchApi = {
  performSearch: async (request: SearchRequest): Promise<SearchResponse> => {
    const response = await apiRequest("POST", "/api/search", request);
    return response.json();
  },

  getRecentSearches: async (): Promise<SearchResponse[]> => {
    const response = await apiRequest("GET", "/api/searches");
    return response.json();
  },

  getSearch: async (id: number): Promise<SearchResponse> => {
    const response = await apiRequest("GET", `/api/searches/${id}`);
    return response.json();
  },
};
