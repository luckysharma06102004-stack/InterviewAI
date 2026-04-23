// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.GROQ_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// // Most stable models first — gemini-1.5-flash is the most reliable
// const MODEL_PRIORITY = [
//   "gemini-1.5-flash",        // most stable, widely available
//   "gemini-1.5-flash-8b",     // lightweight fallback
//   "gemini-1.5-pro",          // higher quality fallback
//   "gemini-2.0-flash",        // newer, sometimes overloaded
//   "gemini-2.0-flash-lite",   // lighter 2.0 variant
// ];

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// const safetySettings = [
//   {
//     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//     threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//     threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
//   },
// ];

// // createChatSession — tries each model in order until one works
// export const createChatSession = () => {
//   return {
//     sendMessage: async (prompt) => {
//       let lastError;

//       for (const modelName of MODEL_PRIORITY) {
//         try {
//           const model = genAI.getGenerativeModel({ model: modelName });
//           const session = model.startChat({ generationConfig, safetySettings });
//           const result = await session.sendMessage(prompt);
//           console.log(`[Gemini] ✓ Used model: ${modelName}`);
//           return result;
//         } catch (err) {
//           console.warn(
//             `[Gemini] ✗ Model ${modelName} failed: ${err.status} ${err.message}`
//           );
//           lastError = err;

//           // Retry on these — skip to next model
//           if ([404, 429, 500, 503].includes(err.status)) {
//             continue;
//           }

//           // Any other error — throw immediately
//           throw err;
//         }
//       }

//       // All models failed
//       throw lastError;
//     },
//   };
// };

// // Legacy chatSession export — used by any old code
// export const chatSession = {
//   sendMessage: async (prompt) => {
//     return createChatSession().sendMessage(prompt);
//   },
// };