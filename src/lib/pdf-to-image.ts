import { extractText, renderPageAsImage } from "unpdf";

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

async function getCanvasImport() {
  if (typeof window === "undefined") {
    return () => import("@napi-rs/canvas");
  }
  return undefined;
}

export async function convertPdfToImage(
  pdfBuffer: ArrayBuffer,
  scale: number = 1.5,
): Promise<string | null> {
  try {
    const canvasImport = await getCanvasImport();
    const imageResult = await renderPageAsImage(pdfBuffer, 1, {
      scale,
      toDataURL: true,
      canvasImport,
    });
    
    return imageResult as string;
  } catch (error) {
    console.error("[PDF] Error converting to image:", error);
    return null;
  }
}

export async function convertPdfToImageBuffer(
  pdfBuffer: ArrayBuffer,
): Promise<Buffer | null> {
  try {
    const canvasImport = await getCanvasImport();
    const imageResult = await renderPageAsImage(pdfBuffer, 1, {
      scale: 1.5,
      toDataURL: false,
      canvasImport,
    });
    
    return Buffer.from(imageResult as ArrayBuffer);
  } catch (error) {
    console.error("[PDF] Error converting to image buffer:", error);
    return null;
  }
}