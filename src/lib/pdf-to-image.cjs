const extractText = require("pdf-parse/lib/pdf-parse.js");

module.exports = async function extractTextFromPdf(pdfBuffer) {
  try {
    const data = await extractText(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

module.exports.convertPdfToImage = async function convertPdfToImage() {
  return null;
};

module.exports.convertPdfToImageBuffer = async function convertPdfToImageBuffer() {
  return null;
};