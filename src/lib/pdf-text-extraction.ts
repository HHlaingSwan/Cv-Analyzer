import { extractText } from "unpdf";

export async function extractTextFromPdf(
  pdfBuffer: ArrayBuffer,
): Promise<string> {
  try {
    const result = await extractText(pdfBuffer);
    const text = result.text.join("\n");

    if (!text || !text.trim()) {
      throw new Error("PDF contains no extractable text");
    }

    return text;
  } catch (error) {
    console.error("[PDF] Error extracting text:", error);
    throw new Error(
      "We could not read text from this PDF. Please upload a text-based CV PDF (not a scanned image).",
    );
  }
}
