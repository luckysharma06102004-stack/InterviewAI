// utils/LlamaAIModal.js

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export function createChatSession() {
  return {
    async sendMessage(prompt) {
      try {
        const completion = await groq.chat.completions.create({
          // ✅ FIXED MODEL (WORKING)
          model: "llama-3.1-8b-instant",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.7,
          max_tokens: 2000,
        });

        const text =
          completion.choices?.[0]?.message?.content || "";

        return {
          response: {
            text: () => text,
          },
        };
      } catch (error) {
        console.error("❌ Llama API Error:", error);
        throw error;
      }
    },
  };
}