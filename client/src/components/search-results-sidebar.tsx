import { ExternalLink, Clock } from "lucide-react";
import type { SearchResponse } from "../types/search";

interface SearchResultsSidebarProps {
  searchData: SearchResponse | null;
  isVisible: boolean;
  onResultClick?: (url: string) => void;
}

export function SearchResultsSidebar({ searchData, isVisible, onResultClick }: SearchResultsSidebarProps) {
  if (!isVisible || !searchData?.searchResults) {
    return null;
  }

  const results = searchData.searchResults.results || [];

  const handleResultClick = (url: string) => {
    if (onResultClick) {
      onResultClick(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <aside className="w-80 bg-secondary-dark/30 border-l border-dark overflow-y-auto hidden lg:block">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-accent-gold">Search Results</h3>
          <span className="text-muted text-sm">{results.length} sources</span>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result.url)}
              className="bg-secondary-dark/50 border border-dark rounded-lg p-4 hover:bg-secondary-dark transition-all duration-200 cursor-pointer group"
            >
              <h4 className="font-medium text-primary mb-2 line-clamp-2 group-hover:text-accent-gold transition-colors">
                {result.title}
              </h4>
              <p className="text-muted text-sm mb-3 line-clamp-3">
                {result.content}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-accent-gold text-xs font-medium flex items-center space-x-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>{new URL(result.url).hostname}</span>
                </span>
                <span className="text-muted text-xs flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(searchData.createdAt)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Related Topics */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-secondary mb-4">Related Topics</h4>
          <div className="space-y-2">
            {[
              "Deep Learning",
              "Neural Networks", 
              "Machine Learning Applications",
              "AI Ethics"
            ].map((topic) => (
              <button
                key={topic}
                className="block w-full text-left text-sm text-muted hover:text-accent-gold transition-colors p-2 rounded-lg hover:bg-secondary-dark/30"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
