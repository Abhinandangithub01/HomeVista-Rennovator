import { GoogleGenAI, Modality } from "@google/genai";

const PROMPT_TEMPLATE = `
You are an expert architectural visualization assistant with an exceptional ability to generate photorealistic home and interior modification images.

The user has uploaded a photo of their house or room that will serve as the base image. Your task is to generate a realistic image that shows the requested modifications in a visually coherent and attractive manner.

Consider and apply the following instructions carefully:
- Preserve the original structure and perspective of the uploaded image while making the requested changes.
- For house elevation changes (exterior), add or modify architectural features like porches, windows, rooflines, colors, cladding materials, etc.
- For interior room modifications, rearrange or replace furniture, update wall colors, lighting, and décor.
- Pay close attention to material textures, such as the grain of wood, the reflectivity of glass, and the roughness of stone.
- Ensure new structural elements are seamlessly integrated with the existing architecture.
- Simulate realistic lighting and shadows cast by new additions to enhance photorealism.
- Maintain high resolution and clear details suitable for client presentation or social media sharing.
- If any style/mood theme is specified, ensure the overall image reflects its color palette, textures, and lighting sensibilities.

Modification Request: "{USER_PROMPT}"
Style/Mood Theme: "{STYLE_THEME}"

Generate this remodeled image based on the uploaded photo and user instructions.
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function remodelImage(
  base64ImageData: string,
  mimeType: string,
  userPrompt: string,
  styleTheme: string
): Promise<string> {
  const finalPrompt = PROMPT_TEMPLATE
    .replace('{USER_PROMPT}', userPrompt)
    .replace('{STYLE_THEME}', styleTheme);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          { text: finalPrompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image was generated in the response. The model may have refused the request.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image. Please check your prompt or try again later.");
  }
}
