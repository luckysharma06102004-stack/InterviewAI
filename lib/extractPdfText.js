import pdf from "pdf-parse-fork";

export async function extractPdfText(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text || "";
  } catch (err) {
    console.error("PDF parse error:", err);
    return "";
  }
}