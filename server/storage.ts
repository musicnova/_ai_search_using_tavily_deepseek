import { searches, type Search, type InsertSearch } from "@shared/schema";

export interface IStorage {
  createSearch(search: InsertSearch): Promise<Search>;
  getSearch(id: number): Promise<Search | undefined>;
  updateSearch(id: number, aiResponse: string, searchResults: any): Promise<Search | undefined>;
  getRecentSearches(limit?: number): Promise<Search[]>;
}

export class MemStorage implements IStorage {
  private searches: Map<number, Search>;
  private currentId: number;

  constructor() {
    this.searches = new Map();
    this.currentId = 1;
  }

  async createSearch(insertSearch: InsertSearch): Promise<Search> {
    const id = this.currentId++;
    const search: Search = {
      ...insertSearch,
      id,
      aiResponse: null,
      searchResults: null,
      createdAt: new Date(),
    };
    this.searches.set(id, search);
    return search;
  }

  async getSearch(id: number): Promise<Search | undefined> {
    return this.searches.get(id);
  }

  async updateSearch(id: number, aiResponse: string, searchResults: any): Promise<Search | undefined> {
    const search = this.searches.get(id);
    if (!search) return undefined;

    const updatedSearch: Search = {
      ...search,
      aiResponse,
      searchResults,
    };
    this.searches.set(id, updatedSearch);
    return updatedSearch;
  }

  async getRecentSearches(limit: number = 10): Promise<Search[]> {
    return Array.from(this.searches.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
