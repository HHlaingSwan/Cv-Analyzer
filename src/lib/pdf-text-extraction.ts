import { extractText } from "unpdf";

export async function extractTextFromPdf(
  pdfBuffer: ArrayBuffer,
): Promise<string> {
  try {
    const result = await extractText(pdfBuffer);
    const text = result.text.join("\n");
    
    if (!text || !text.trim()) {
      return "No text content could be extracted from PDF";
    }
    
    return text;
  } catch (error) {
    console.error("[PDF] Error extracting text:", error);
    return "Text extraction failed";
  }
}
