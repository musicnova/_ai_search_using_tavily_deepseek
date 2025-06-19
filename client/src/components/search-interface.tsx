import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search, Lightbulb, Clock, Monitor } from "lucide-react";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  hasSearched: boolean;
}

export function SearchInterface({ onSearch, isLoading, hasSearched }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleExampleQuery = (exampleQuery: string) => {
    setQuery(exampleQuery);
    onSearch(exampleQuery);
  };

  if (hasSearched) {
    return (
      <div className="border-t border-gray-700 bg-gray-900/95 backdrop-blur-sm p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Ask anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-800 border-gray-600 rounded-xl px-6 py-4 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-lg"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg px-4 py-2 font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Powered by Tavily search and DeepSeek AI
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-gold via-yellow-300 to-accent-gold bg-clip-text text-transparent">
              Ask AI Anything
            </h2>
            <p className="text-secondary text-lg lg:text-xl max-w-2xl mx-auto">
              Get intelligent answers powered by real-time web search and advanced AI. Ask questions, explore topics, and discover insights.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-secondary-dark/50 border border-dark rounded-xl p-6 hover:bg-secondary-dark transition-all duration-200 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-gold/20 to-accent-gold/30 rounded-lg flex items-center justify-center mb-4 group-hover:from-accent-gold/30 group-hover:to-accent-gold/40 transition-all">
                <Search className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-semibold mb-2 text-primary">Search the Internet</h3>
              <p className="text-muted text-sm">Get real-time information from across the web</p>
            </div>

            <div className="bg-secondary-dark/50 border border-dark rounded-xl p-6 hover:bg-secondary-dark transition-all duration-200 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-gold/20 to-accent-gold/30 rounded-lg flex items-center justify-center mb-4 group-hover:from-accent-gold/30 group-hover:to-accent-gold/40 transition-all">
                <Lightbulb className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-semibold mb-2 text-primary">AI-Powered Answers</h3>
              <p className="text-muted text-sm">Advanced AI provides comprehensive responses</p>
            </div>

            <div className="bg-secondary-dark/50 border border-dark rounded-xl p-6 hover:bg-secondary-dark transition-all duration-200 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-gold/20 to-accent-gold/30 rounded-lg flex items-center justify-center mb-4 group-hover:from-accent-gold/30 group-hover:to-accent-gold/40 transition-all">
                <Clock className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-semibold mb-2 text-primary">Chat History</h3>
              <p className="text-muted text-sm">Access your previous conversations and searches</p>
            </div>

            <div className="bg-secondary-dark/50 border border-dark rounded-xl p-6 hover:bg-secondary-dark transition-all duration-200 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-gold/20 to-accent-gold/30 rounded-lg flex items-center justify-center mb-4 group-hover:from-accent-gold/30 group-hover:to-accent-gold/40 transition-all">
                <Monitor className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="font-semibold mb-2 text-primary">Smart Assistant</h3>
              <p className="text-muted text-sm">Intelligent assistance for complex queries</p>
            </div>
          </div>

          {/* Example Queries */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center text-secondary">Try asking:</h3>
            <div className="grid gap-3">
              <button
                onClick={() => handleExampleQuery("What are the latest developments in artificial intelligence?")}
                className="bg-secondary-dark/30 border border-dark rounded-lg p-4 text-left hover:bg-secondary-dark/50 transition-all duration-200 group"
              >
                <span className="text-primary group-hover:text-accent-gold transition-colors">
                  "What are the latest developments in artificial intelligence?"
                </span>
              </button>
              <button
                onClick={() => handleExampleQuery("How does climate change affect ocean currents?")}
                className="bg-secondary-dark/30 border border-dark rounded-lg p-4 text-left hover:bg-secondary-dark/50 transition-all duration-200 group"
              >
                <span className="text-primary group-hover:text-accent-gold transition-colors">
                  "How does climate change affect ocean currents?"
                </span>
              </button>
              <button
                onClick={() => handleExampleQuery("Explain quantum computing for beginners")}
                className="bg-secondary-dark/30 border border-dark rounded-lg p-4 text-left hover:bg-secondary-dark/50 transition-all duration-200 group"
              >
                <span className="text-primary group-hover:text-accent-gold transition-colors">
                  "Explain quantum computing for beginners"
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="border-t border-gray-700 bg-gray-900/95 backdrop-blur-sm p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Ask anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-800 border-gray-600 rounded-xl px-6 py-4 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-lg"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg px-4 py-2 font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Powered by Tavily search and DeepSeek AI
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
