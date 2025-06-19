import { Lightbulb, ExternalLink } from "lucide-react";
import type { SearchResponse } from "../types/search";

interface AIResponseProps {
  searchData: SearchResponse;
  isLoading: boolean;
}

export function AIResponse({ searchData, isLoading }: AIResponseProps) {
  if (isLoading) {
    return (
      <div className="bg-secondary-dark/50 border border-dark rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-gold to-accent-gold-hover rounded-full flex items-center justify-center animate-pulse">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-secondary ml-2">Searching the web and generating response...</span>
            </div>
            <div className="w-full bg-border-dark rounded-full h-2">
              <div className="bg-gradient-to-r from-accent-gold to-yellow-300 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!searchData.aiResponse) {
    return null;
  }

  const resultsCount = searchData.searchResults?.results?.length || 0;

  return (
    <div className="bg-secondary-dark/50 border border-dark rounded-xl p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 bg-gradient-to-br from-accent-gold to-accent-gold-hover rounded-full flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-3 text-accent-gold">AI Response</h3>
          <div className="prose prose-invert max-w-none">
            <div className="text-primary leading-relaxed whitespace-pre-wrap">
              {searchData.aiResponse?.includes("AI response generation is currently unavailable") ? (
                <div>
                  <div className="text-yellow-400 mb-3">
                    🔍 Search completed successfully! AI response is temporarily unavailable.
                  </div>
                  <div className="text-gray-300">
                    {searchData.aiResponse}
                  </div>
                </div>
              ) : (
                searchData.aiResponse
              )}
            </div>
          </div>

          {/* Source Attribution */}
          <div className="mt-4 pt-4 border-t border-dark">
            <p className="text-muted text-sm flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Response generated from {resultsCount} web sources</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
