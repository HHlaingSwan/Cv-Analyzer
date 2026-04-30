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
          model: "inclusionai/ling-2.6-1t:free",
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
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
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
