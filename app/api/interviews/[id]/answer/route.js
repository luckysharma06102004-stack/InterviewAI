// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { createChatSession } from "@/utils/LlamaAIModal";
// import { rateLimit } from "@/utils/rateLimit";

// export async function POST(request, { params }) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();
//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const rl = rateLimit(`record-answer:${userId}`, { limit: 30, windowMs: 5 * 60_000 });
//     if (!rl.success) {
//       return NextResponse.json(
//         { error: "Too many requests. Please slow down." },
//         { status: 429 }
//       );
//     }

//     const { id } = params;
//     const body = await request.json();
//     const { question, correctAns, userAns } = body;

//     if (!question || !userAns) {
//       return NextResponse.json(
//         { error: "question and userAns are required" },
//         { status: 400 }
//       );
//     }

//     // Default values — used if Gemini fails
//     let rating = "5";
//     let feedback = "Your answer has been saved. AI feedback is temporarily unavailable due to API quota limits. Please try again later for detailed feedback.";

//     // Try Gemini — but never crash if it fails
//     try {
//       const feedbackPrompt = `Question: ${question}
// User Answer: ${userAns}
// Expected Answer: ${correctAns || ""}

// Rate this interview answer from 1-10 and give 3-5 lines of specific improvement feedback.
// Respond ONLY with valid JSON, no extra text:
// {"rating": 7, "feedback": "Your feedback here."}`;

//       const session = createChatSession();
//       const aiResult = await session.sendMessage(feedbackPrompt);
//       let responseText = aiResult.response.text()
//         .replace(/```json/gi, "")
//         .replace(/```/g, "")
//         .trim();

//       // Extract JSON object from response
//       const match = responseText.match(/\{[\s\S]*\}/);
//       if (match) {
//         const parsed = JSON.parse(match[0]);
//         if (parsed.rating) rating = String(parsed.rating);
//         if (parsed.feedback) feedback = parsed.feedback;
//       }
//     } catch (aiErr) {
//       // Log but don't crash — answer still gets saved below
//       console.warn("[answer] AI feedback skipped:", aiErr.message?.substring(0, 100));
//     }

//     // Always save to DB
//     const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
//     const createdAt = new Date().toISOString().split("T")[0];

//     await db.insert(UserAnswer).values({
//       mockIdRef: id,
//       question: question.substring(0, 500),
//       correctAns: correctAns ?? "",
//       userAns: userAns.substring(0, 2000),
//       feedback,
//       rating,
//       userEmail,
//       createdAt,
//     });

//     return NextResponse.json({ feedback, rating });

//   } catch (error) {
//     console.error("[POST /api/interviews/[id]/answer]", error);
//     return NextResponse.json(
//       { error: "Failed to save answer. Please try again." },
//       { status: 500 }
//     );
//   }
// }








// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { createChatSession } from "@/utils/LlamaAIModal";
// import { rateLimit } from "@/utils/rateLimit";

// export async function POST(request, { params }) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ Rate limit
//     const rl = rateLimit(`record-answer:${userId}`, {
//       limit: 30,
//       windowMs: 5 * 60_000,
//     });

//     if (!rl.success) {
//       return NextResponse.json(
//         { error: "Too many requests. Please slow down." },
//         { status: 429 }
//       );
//     }

//     const { id } = params;
//     const body = await request.json();

//     console.log("📥 BODY RECEIVED:", body); // DEBUG

//     const { question, correctAns, userAns } = body;

//     if (!question || !userAns || userAns.trim().length < 3) {
//       return NextResponse.json(
//         { error: "Valid question and userAns are required" },
//         { status: 400 }
//       );
//     }

//     // ✅ Default fallback (if Gemini fails)
//     let rating = "5";
//     let feedback =
//       "Your answer has been saved. AI feedback is temporarily unavailable due to API quota limits.";

//     // 🧠 Try Gemini (safe mode)
//     try {
//       const feedbackPrompt = `Question: ${question}
// User Answer: ${userAns}
// Expected Answer: ${correctAns || ""}

// Rate this interview answer from 1-10 and give 3-5 lines of improvement feedback.
// Respond ONLY in JSON:
// {"rating": 7, "feedback": "Your feedback here."}`;

//       const session = createChatSession();
//       const aiResult = await session.sendMessage(feedbackPrompt);

//       let responseText = aiResult.response
//         .text()
//         .replace(/```json/gi, "")
//         .replace(/```/g, "")
//         .trim();

//       console.log("🤖 RAW AI:", responseText);

//       const match = responseText.match(/\{[\s\S]*\}/);

//       if (match) {
//         const parsed = JSON.parse(match[0]);

//         if (parsed.rating) rating = String(parsed.rating);
//         if (parsed.feedback) feedback = parsed.feedback;
//       }
//     } catch (aiErr) {
//       console.warn(
//         "[answer] AI feedback skipped:",
//         aiErr.message?.substring(0, 100)
//       );
//     }

//     const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
//     const createdAt = new Date().toISOString();

//     // ✅ FIX: Save BOTH keys
//     const savedData = {
//       mockIdRef: id,
//       question: question.substring(0, 500),
//       correctAns: correctAns ?? "",

//       // 🔥 IMPORTANT FIX
//       userAns: userAns.substring(0, 2000),
//       userAnswer: userAns.substring(0, 2000), // ✅ ADD THIS LINE

//       feedback,
//       rating,
//       userEmail,
//       createdAt,
//     };

//     console.log("💾 SAVING:", savedData);

//     await db.insert(UserAnswer).values(savedData);

//     return NextResponse.json({
//       success: true,
//       feedback,
//       rating,
//     });

//   } catch (error) {
//     console.error("[POST /api/interviews/[id]/answer]", error);

//     return NextResponse.json(
//       { error: "Failed to save answer. Please try again." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { createChatSession } from "@/utils/LlamaAIModal";
// import { rateLimit } from "@/utils/rateLimit";

// // ✅ helper
// const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// export async function POST(request, { params }) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ Rate limit
//     const rl = rateLimit(`record-answer:${userId}`, {
//       limit: 30,
//       windowMs: 5 * 60_000,
//     });

//     if (!rl.success) {
//       return NextResponse.json(
//         { error: "Too many requests. Please slow down." },
//         { status: 429 }
//       );
//     }

//     const { id } = params;
//     const body = await request.json();

//     console.log("📥 BODY RECEIVED:", body);

//     const { question, correctAns, userAns } = body;

//     if (!question || !userAns || userAns.trim().length < 3) {
//       return NextResponse.json(
//         { error: "Valid question and userAns are required" },
//         { status: 400 }
//       );
//     }

//     // ✅ Default fallback
//     let rating = "5";
//     let feedback =
//       "Your answer has been saved. AI feedback is temporarily unavailable ";

//     let aiSuccess = false;

//     // 🧠 Gemini with retry
//     const feedbackPrompt = `Question: ${question}
// User Answer: ${userAns}
// Expected Answer: ${correctAns || ""}

// Rate this interview answer from 1-10 and give 3-5 lines of improvement feedback.

// Respond ONLY in JSON:
// {"rating": 7, "feedback": "Your feedback here."}`;

//     const session = createChatSession();

//     for (let i = 0; i < 3; i++) {
//       try {
//         const aiResult = await session.sendMessage(feedbackPrompt);

//         let responseText = aiResult.response
//           .text()
//           .replace(/```json/gi, "")
//           .replace(/```/g, "")
//           .trim();

//         console.log("🤖 RAW AI:", responseText);

//         const match = responseText.match(/\{[\s\S]*\}/);

//         if (match) {
//           const parsed = JSON.parse(match[0]);

//           if (parsed.rating) rating = String(parsed.rating);
//           if (parsed.feedback) feedback = parsed.feedback;

//           aiSuccess = true;
//           break;
//         }
//       } catch (err) {
//         console.warn(`⚠️ Retry ${i + 1} failed`);
//         await sleep(2000); // wait 2s before retry
//       }
//     }

//     // ❗ Final fallback (if all retries fail)
//     if (!aiSuccess) {
//       feedback =
//         "Please try again later.";
//     }

//     const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
//     const createdAt = new Date().toISOString();

//     const savedData = {
//       mockIdRef: id,
//       question: question.substring(0, 500),
//       correctAns: correctAns ?? "",

//       // ✅ Important
//       userAns: userAns.substring(0, 2000),
//       userAnswer: userAns.substring(0, 2000),

//       feedback,
//       rating,
//       userEmail,
//       createdAt,
//     };

//     console.log("💾 SAVING:", savedData);

//     await db.insert(UserAnswer).values(savedData);

//     return NextResponse.json({
//       success: true,
//       feedback,
//       rating,
//     });

//   } catch (error) {
//     console.error("[POST /api/interviews/[id]/answer]", error);

//     return NextResponse.json(
//       { error: "Failed to save answer. Please try again." },
//       { status: 500 }
//     );
//   }
// // }
// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { createChatSession } from "@/utils/LlamaAIModal";
// import { rateLimit } from "@/utils/rateLimit";

// // helper
// const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// // safe JSON extract
// function extractJSON(text) {
//   try {
//     const match = text.match(/\{[\s\S]*\}/);
//     if (!match) return null;
//     return JSON.parse(match[0]);
//   } catch {
//     return null;
//   }
// }

// export async function POST(request, { params }) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // rate limit
//     const rl = rateLimit(`record-answer:${userId}`, {
//       limit: 30,
//       windowMs: 5 * 60_000,
//     });

//     if (!rl.success) {
//       return NextResponse.json(
//         { error: "Too many requests" },
//         { status: 429 }
//       );
//     }

//     const { id } = params;
//     const body = await request.json();

//     const { question, correctAns, userAns } = body;

//     if (!question || !userAns || userAns.trim().length < 3) {
//       return NextResponse.json(
//         { error: "Valid question and userAns required" },
//         { status: 400 }
//       );
//     }

//     // defaults
//     let rating = "5";
//     let feedback = "AI feedback unavailable. Try again later.";
//     let aiSuccess = false;

//     const prompt = `Question: ${question}
// User Answer: ${userAns}
// Expected Answer: ${correctAns || ""}

// Rate from 1-10 and give improvement feedback.

// Return JSON only:
// {"rating": 7, "feedback": "text"}`;

//     // 🔥 retry loop (FIXED)
//     for (let i = 0; i < 3; i++) {
//       try {
//         const session = createChatSession(); // ✅ moved inside loop

//         const aiResult = await Promise.race([
//           session.sendMessage(prompt),
//           new Promise((_, reject) =>
//             setTimeout(() => reject(new Error("Timeout")), 10000)
//           ),
//         ]);

//         let text = aiResult.response
//           .text()
//           .replace(/```json/gi, "")
//           .replace(/```/g, "")
//           .trim();

//         console.log("🤖 AI:", text);

//         const parsed = extractJSON(text);

//         if (parsed) {
//           if (!isNaN(parsed.rating)) {
//             rating = String(parsed.rating);
//           }

//           if (parsed.feedback) {
//             feedback = parsed.feedback;
//           }

//           aiSuccess = true;
//           break;
//         }
//       } catch (err) {
//         console.warn(`Retry ${i + 1} failed:`, err.message);
//         await sleep(1500);
//       }
//     }

//     // final fallback
//     if (!aiSuccess) {
//       feedback =
//         "Your answer was saved. AI feedback unavailable due to limits.";
//     }

//     const userEmail = user.primaryEmailAddress?.emailAddress ?? "";

//     const savedData = {
//       mockIdRef: id,
//       question: question.substring(0, 500),
//       correctAns: correctAns ?? "",
//       userAns: userAns.substring(0, 2000),
//       userAnswer: userAns.substring(0, 2000),
//       feedback,
//       rating,
//       userEmail,
//       createdAt: new Date().toISOString(),
//     };

//     await db.insert(UserAnswer).values(savedData);

//     return NextResponse.json({
//       success: true,
//       feedback,
//       rating,
//     });

//   } catch (error) {
//     console.error("ANSWER API ERROR:", error);

//     return NextResponse.json(
//       { error: "Failed to save answer" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { createChatSession } from "@/utils/GeminiAIModal"; // ✅ fixed import
import { rateLimit } from "@/utils/rateLimit";

// POST /api/interviews/[id]/answer — evaluate answer with Gemini and save to DB
export async function POST(request, { params }) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 30 answers per 5 minutes per user
    const rl = rateLimit(`record-answer:${userId}`, { limit: 30, windowMs: 5 * 60_000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { question, correctAns, userAns } = body;

    if (!question || !userAns) {
      return NextResponse.json({ error: "question and userAns are required" }, { status: 400 });
    }

    // Build Gemini feedback prompt
    const feedbackPrompt = `Question: ${question}
User Answer: ${userAns}

Evaluate the user's answer for the given interview question.
Provide a rating out of 10 and feedback (3-5 lines) for improvement.
Respond in this exact JSON format:
{
  "rating": 7,
  "feedback": "Your feedback here."
}`;

    let rating = "5";
    let feedback = "Keep practicing and focus on clear, structured answers.";

    try {
      const session = createChatSession();
      const aiResult = await session.sendMessage(feedbackPrompt);
      let responseText = aiResult.response.text();

      const cleanedResponse = responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const feedbackJson = JSON.parse(cleanedResponse);

      if (feedbackJson?.rating) rating = String(feedbackJson.rating);
      if (feedbackJson?.feedback) feedback = feedbackJson.feedback;
    } catch (aiError) {
      console.error("[Answer route] AI/parse error:", aiError);
      // Fall through to save with default rating/feedback
    }

    const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
    const createdAt = new Date().toISOString().split("T")[0];

    await db.insert(UserAnswer).values({
      mockIdRef: id,
      question,
      correctAns: correctAns ?? "",
      userAns,
      feedback,
      rating,
      userEmail,
      createdAt,
    });

    return NextResponse.json({ feedback, rating });
  } catch (error) {
    console.error("[POST /api/interviews/[id]/answer]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}