
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const transformImage = async (
  base64ImageData: string,
  mimeType: string,
  style: string
): Promise<string | null> => {
  try {
    const model = 'gemini-2.5-flash-image';
    const prompt = `Transform this photo into a/an ${style} style masterpiece. Maintain the core subject and composition of the original image while fully embracing the artistic characteristics of the chosen style.`;

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    return null;
  } catch (error) {
    console.error("Error transforming image with Gemini API:", error);
    throw new Error("Failed to generate image. The AI model may be overloaded or the input image is not supported.");
  }
};
