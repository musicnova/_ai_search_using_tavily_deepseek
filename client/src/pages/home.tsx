import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Search, Lightbulb, Clock, Monitor } from "lucide-react";
import { SearchInterface } from "../components/search-interface-simple";
import { AIResponse } from "../components/ai-response";
import { SearchResultsSidebar } from "../components/search-results-sidebar";
import { searchApi } from "../lib/api";
import { useToast } from "@/hooks/use-toast";
import type { SearchResponse } from "../types/search";

export default function Home() {
  const [currentSearch, setCurrentSearch] = useState<SearchResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchMutation = useMutation({
    mutationFn: searchApi.performSearch,
    onSuccess: (data) => {
      setCurrentSearch(data);
      setHasSearched(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Search Failed",
        description: error.message || "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (query: string) => {
    searchMutation.mutate({ query });
  };

  return (
    <div className="min-h-screen bg-primary-dark text-primary">
      {/* Header */}
      <header className="border-b border-dark bg-primary-dark/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-gold to-accent-gold-hover rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-accent-gold to-yellow-300 bg-clip-text text-transparent">
                  ASK AI ANYTHING
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Feature Icons */}
              <div className="hidden md:flex items-center space-x-2">
                <button className="p-2 rounded-lg border border-dark bg-secondary-dark/50 hover:bg-secondary-dark transition-all duration-200 group">
                  <Search className="w-5 h-5 text-secondary group-hover:text-accent-gold transition-colors" />
                </button>
                <button className="p-2 rounded-lg border border-dark bg-secondary-dark/50 hover:bg-secondary-dark transition-all duration-200 group">
                  <Lightbulb className="w-5 h-5 text-secondary group-hover:text-accent-gold transition-colors" />
                </button>
                <button className="p-2 rounded-lg border border-dark bg-secondary-dark/50 hover:bg-secondary-dark transition-all duration-200 group">
                  <Clock className="w-5 h-5 text-secondary group-hover:text-accent-gold transition-colors" />
                </button>
                <button className="p-2 rounded-lg border border-dark bg-secondary-dark/50 hover:bg-secondary-dark transition-all duration-200 group">
                  <Monitor className="w-5 h-5 text-secondary group-hover:text-accent-gold transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {!hasSearched ? (
            <SearchInterface
              onSearch={handleSearch}
              isLoading={searchMutation.isPending}
              hasSearched={hasSearched}
            />
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-4xl mx-auto">
                  {/* Query Display */}
                  {currentSearch && (
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-accent-gold to-yellow-300 rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-primary-dark">
                          {currentSearch.query}
                        </h2>
                      </div>
                    </div>
                  )}

                  {/* AI Response */}
                  <AIResponse
                    searchData={currentSearch!}
                    isLoading={searchMutation.isPending}
                  />
                </div>
              </div>

              <SearchInterface
                onSearch={handleSearch}
                isLoading={searchMutation.isPending}
                hasSearched={hasSearched}
              />
            </div>
          )}
        </main>

        {/* Search Results Sidebar */}
        <SearchResultsSidebar
          searchData={currentSearch}
          isVisible={hasSearched}
        />
      </div>
    </div>
  );
}
