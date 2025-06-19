import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSearchSchema, tavilyResponseSchema } from "@shared/schema";
import { z } from "zod";

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || process.env.VITE_TAVILY_API_KEY || "";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || "";

export async function registerRoutes(app: Express): Promise<Server> {
  // Search endpoint
  app.post("/api/search", async (req, res) => {
    try {
      const { query } = insertSearchSchema.parse(req.body);
      
      // Create initial search record
      const search = await storage.createSearch({ query });
      
      // Perform Tavily search
      const searchResults = await performTavilySearch(query);
      
      // Generate AI response using DeepSeek
      const aiResponse = await generateDeepSeekResponse(query, searchResults);
      
      // Update search with results
      const updatedSearch = await storage.updateSearch(search.id, aiResponse, searchResults);
      
      res.json(updatedSearch);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ 
        error: "Failed to perform search", 
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get recent searches
  app.get("/api/searches", async (req, res) => {
    try {
      const searches = await storage.getRecentSearches();
      res.json(searches);
    } catch (error) {
      console.error("Failed to get searches:", error);
      res.status(500).json({ error: "Failed to get searches" });
    }
  });

  // Get specific search
  app.get("/api/searches/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const search = await storage.getSearch(id);
      
      if (!search) {
        return res.status(404).json({ error: "Search not found" });
      }
      
      res.json(search);
    } catch (error) {
      console.error("Failed to get search:", error);
      res.status(500).json({ error: "Failed to get search" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function performTavilySearch(query: string) {
  if (!TAVILY_API_KEY) {
    throw new Error("Tavily API key not configured");
  }

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        search_depth: "basic",
        include_raw_content: true,
        max_results: 5,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return tavilyResponseSchema.parse(data);
  } catch (error) {
    console.error("Tavily search error:", error);
    throw new Error("Failed to search the web");
  }
}

async function generateDeepSeekResponse(query: string, searchResults: any) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API key not configured");
  }

  const context = searchResults.results
    .map((result: any) => `Title: ${result.title}\nURL: ${result.url}\nContent: ${result.content}`)
    .join("\n\n");

  const prompt = `Based on the following web search results, provide a comprehensive and accurate answer to the user's question: "${query}"

Search Results:
${context}

Please provide a detailed, well-structured response that synthesizes information from these sources. Be factual and cite the information appropriately.`;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant that provides accurate, comprehensive answers based on web search results. Always be factual and well-structured in your responses."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Unable to generate response";
  } catch (error) {
    console.error("DeepSeek API error:", error);
    throw new Error("Failed to generate AI response");
  }
}
