
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might have better error handling or a fallback.
  // For this example, we'll log an error if the key is missing.
  console.error("Gemini API key is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const explainBlockchainConcept = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "Gemini API key not configured. Please set the API_KEY environment variable.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert in blockchain and supply chain management. Explain the concept clearly and concisely for a business professional, avoiding overly technical jargon.",
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while fetching an explanation from the AI. Please try again later.";
  }
};
