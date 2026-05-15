export interface AnalysisResult {
  overall_score: number;
  summary: string;
  skills: {
    matched: string[];
    missing: string[];
    score: number;
  };
  experience: {
    relevance: string;
    years: number;
    alignment: string;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  keywords: {
    matched: string[];
    missing: string[];
  };
}

export async function analyzeCVWithOpenRouter(
  systemPrompt: string,
  userPrompt: string,
): Promise<AnalysisResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "CV Analyzer",
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL_KEY,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 4096,
        }),
      },
    );

    if (!response.ok) {
      const rawError = await response.text();
      let providerMessage = "";

      try {
        const parsed = JSON.parse(rawError) as {
          error?: { message?: string; code?: number | string };
        };
        providerMessage = parsed.error?.message ?? "";
      } catch {
        // keep providerMessage empty when response isn't valid JSON
      }

      const normalizedMessage = providerMessage.toLowerCase();
      const isModelNoLongerFree =
        response.status === 404 &&
        normalizedMessage.includes("no longer available as a free model");

      if (isModelNoLongerFree) {
        throw new Error(
          "AI analysis is temporarily unavailable because the selected model is no longer free on OpenRouter. Please ask support to switch to an available model and try again.",
        );
      }

      const fallbackMessage =
        providerMessage ||
        "The AI service returned an unexpected response. Please try again in a moment.";

      throw new Error(
        `OpenRouter request failed (${response.status}): ${fallbackMessage}`,
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned from OpenRouter API");
    }

    // Parse the JSON response
    const analysisResult: AnalysisResult = JSON.parse(content);

    // Validate the response structure
    if (typeof analysisResult.overall_score !== "number") {
      throw new Error("Invalid analysis result: missing overall_score");
    }

    return analysisResult;
  } catch (error) {
    console.error("Error analyzing CV with OpenRouter:", error);
    throw error;
  }
}
