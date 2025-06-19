import { useState } from "react";
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
      <div style={{ 
        borderTop: '1px solid #374151', 
        backgroundColor: '#111827', 
        padding: '24px' 
      }}>
        <div style={{ maxWidth: '896px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '0' }}>
              <input
                type="text"
                placeholder="Ask anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                style={{
                  flex: '1',
                  backgroundColor: '#1f2937',
                  border: '1px solid #4b5563',
                  borderRight: 'none',
                  borderRadius: '12px 0 0 12px',
                  padding: '16px 24px',
                  color: '#ffffff',
                  fontSize: '18px',
                  minHeight: '56px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#eab308';
                  e.target.style.boxShadow = '0 0 0 2px rgba(234, 179, 8, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#4b5563';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                style={{
                  backgroundColor: '#eab308',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '0 12px 12px 0',
                  padding: '16px 24px',
                  minHeight: '56px',
                  cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
                  opacity: isLoading || !query.trim() ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!isLoading && query.trim()) {
                    e.currentTarget.style.backgroundColor = '#d97706';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading && query.trim()) {
                    e.currentTarget.style.backgroundColor = '#eab308';
                  }
                }}
              >
                <Send size={20} />
                <span style={{ display: window.innerWidth < 640 ? 'none' : 'inline' }}>Search</span>
              </button>
            </div>
            <p style={{ 
              color: '#9ca3af', 
              fontSize: '14px', 
              marginTop: '8px', 
              textAlign: 'center' 
            }}>
              Powered by Tavily search and DeepSeek AI
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#0f172a'
    }}>
      <div style={{ 
        flex: '1', 
        padding: '32px 16px',
        overflowY: 'auto'
      }}>
        <div style={{ maxWidth: '896px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              background: 'linear-gradient(to right, #eab308, #fbbf24, #eab308)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Ask AI Anything
            </h2>
            <p style={{ 
              color: '#cbd5e1', 
              fontSize: '20px', 
              maxWidth: '512px', 
              margin: '0 auto' 
            }}>
              Get intelligent answers powered by real-time web search and advanced AI. Ask questions, explore topics, and discover insights.
            </p>
          </div>

          {/* Feature Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px', 
            marginBottom: '48px' 
          }}>
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.5)', 
              border: '1px solid #334155', 
              borderRadius: '12px', 
              padding: '24px',
              cursor: 'pointer'
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.3))', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '16px' 
              }}>
                <Search size={24} color="#eab308" />
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>Search the Internet</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Get real-time information from across the web</p>
            </div>

            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.5)', 
              border: '1px solid #334155', 
              borderRadius: '12px', 
              padding: '24px',
              cursor: 'pointer'
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.3))', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '16px' 
              }}>
                <Lightbulb size={24} color="#eab308" />
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>AI-Powered Answers</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Advanced AI provides comprehensive responses</p>
            </div>

            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.5)', 
              border: '1px solid #334155', 
              borderRadius: '12px', 
              padding: '24px',
              cursor: 'pointer'
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.3))', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '16px' 
              }}>
                <Clock size={24} color="#eab308" />
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>Chat History</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Access your previous conversations and searches</p>
            </div>

            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.5)', 
              border: '1px solid #334155', 
              borderRadius: '12px', 
              padding: '24px',
              cursor: 'pointer'
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.3))', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '16px' 
              }}>
                <Monitor size={24} color="#eab308" />
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>Smart Assistant</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Intelligent assistance for complex queries</p>
            </div>
          </div>

          {/* Example Queries */}
          <div style={{ maxWidth: '512px', margin: '0 auto' }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '16px', 
              textAlign: 'center', 
              color: '#cbd5e1' 
            }}>
              Try asking:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => handleExampleQuery("What are the latest developments in artificial intelligence?")}
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.3)',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'left',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                  e.currentTarget.style.color = '#eab308';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.3)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                "What are the latest developments in artificial intelligence?"
              </button>
              <button
                onClick={() => handleExampleQuery("How does climate change affect ocean currents?")}
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.3)',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'left',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                  e.currentTarget.style.color = '#eab308';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.3)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                "How does climate change affect ocean currents?"
              </button>
              <button
                onClick={() => handleExampleQuery("Explain quantum computing for beginners")}
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.3)',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'left',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                  e.currentTarget.style.color = '#eab308';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.3)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                "Explain quantum computing for beginners"
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ 
        borderTop: '1px solid #374151', 
        backgroundColor: '#111827', 
        padding: '24px' 
      }}>
        <div style={{ maxWidth: '896px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '0' }}>
              <input
                type="text"
                placeholder="Ask anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                style={{
                  flex: '1',
                  backgroundColor: '#1f2937',
                  border: '1px solid #4b5563',
                  borderRight: 'none',
                  borderRadius: '12px 0 0 12px',
                  padding: '16px 24px',
                  color: '#ffffff',
                  fontSize: '18px',
                  minHeight: '56px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#eab308';
                  e.target.style.boxShadow = '0 0 0 2px rgba(234, 179, 8, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#4b5563';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                style={{
                  backgroundColor: '#eab308',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '0 12px 12px 0',
                  padding: '16px 24px',
                  minHeight: '56px',
                  cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
                  opacity: isLoading || !query.trim() ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!isLoading && query.trim()) {
                    e.currentTarget.style.backgroundColor = '#d97706';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading && query.trim()) {
                    e.currentTarget.style.backgroundColor = '#eab308';
                  }
                }}
              >
                <Send size={20} />
                <span style={{ display: window.innerWidth < 640 ? 'none' : 'inline' }}>Search</span>
              </button>
            </div>
            <p style={{ 
              color: '#9ca3af', 
              fontSize: '14px', 
              marginTop: '8px', 
              textAlign: 'center' 
            }}>
              Powered by Tavily search and DeepSeek AI
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}