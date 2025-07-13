import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is not defined in environment variables");

const ai = new GoogleGenAI({ apiKey });

export async function generateSummary(
  content: string,
  contentType: "YouTube" | "TikTok" | "article"
): Promise<string> {
  const userInput = `
I need a concise summary of the following ${contentType} content:
CONTENT:
${content}
`;

  const systemPrompt = `You are a helpful and accurate language summarizer.
Summarize clearly in English.
Focus on main points, arguments, and conclusions.
Use bullet points and clear sections.
Mention if content is incomplete.
NEVER fabricate information.

IMPORTANT to follow:
- Format the output with visual clarity: add relevant emojis to section titles, use headers and subheaders, bullet lists, proper spacing, and clean logical structure.
- Do NOT return a raw chunk of text; organize output by themes, story flow, or highlights.
`;

  const config = {
    responseMimeType: "text/plain",
    systemInstruction: [{ text: systemPrompt }],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      config,
      contents: [{ role: "user", parts: [{ text: userInput }] }],
    });
    return response.text || "Summary not available.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to generate summary. Please try again later.";
  }
}