import { GoogleGenAI } from "@google/genai";

/**
 * Checks if the user has selected an API key via the AI Studio overlay.
 */
export const checkApiKeyAvailability = async (): Promise<boolean> => {
  const win = window as any;
  if (win.aistudio && win.aistudio.hasSelectedApiKey) {
    return await win.aistudio.hasSelectedApiKey();
  }
  return false;
};

/**
 * Opens the API key selection dialog.
 */
export const requestApiKey = async (): Promise<void> => {
  const win = window as any;
  if (win.aistudio && win.aistudio.openSelectKey) {
    await win.aistudio.openSelectKey();
  }
};

/**
 * Generates a verification video for a specific product using Veo.
 */
export const generateProductVerificationVideo = async (
  productName: string,
  productDescription: string
): Promise<string> => {
  
  const performGeneration = async () => {
      // Create a new instance right before the call to ensure fresh key usage
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `A realistic, handheld first-person view video of a warehouse worker carefully packing a product: ${productName} into a shipping box.
      The product is sitting on a clean, white packing table. 
      The worker places the item into the box with protective material.
      Lighting is neutral and bright warehouse lighting.
      Context: ${productDescription}. 
      Cinematic, high definition, 4k.`;

      console.log("Starting video generation for:", productName);

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Polling loop
      while (!operation.done) {
        console.log("Video generation in progress...");
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;

      if (!videoUri) {
        throw new Error("No video URI returned from generation.");
      }

      const downloadUrl = `${videoUri}&key=${process.env.API_KEY}`;
      const response = await fetch(downloadUrl);
      if (!response.ok) {
          throw new Error(`Failed to download video bytes: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
  };

  try {
    return await performGeneration();
  } catch (error: any) {
    console.error("Verification video generation failed:", error);
    
    // Check for permission errors or entity not found, which imply key issues
    // 403 PERMISSION_DENIED indicates the key doesn't have access (e.g. not a paid project)
    const errorStr = JSON.stringify(error);
    const isPermissionError = error.message?.includes('403') || 
                              error.message?.includes('PERMISSION_DENIED') ||
                              errorStr.includes('PERMISSION_DENIED') || 
                              errorStr.includes('403');
    
    const isEntityNotFoundError = error.message?.includes('Requested entity was not found');

    if (isPermissionError || isEntityNotFoundError) {
       console.log("API Key issue detected (403 or Not Found). Requesting fresh key...");
       await requestApiKey();
       // Retry once with the new key. 
       // Note: process.env.API_KEY is updated automatically by the environment when the user selects a key.
       return await performGeneration();
    }
    
    throw error;
  }
};