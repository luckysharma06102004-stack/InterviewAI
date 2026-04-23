

// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { rateLimit } from "@/utils/rateLimit";
// import { v4 as uuidv4 } from "uuid";
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // POST /api/interviews — generate questions via Groq and save interview
// export async function POST(request) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();
//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Rate limit: 5 new interviews per minute per user
//     const rl = rateLimit(`create-interview:${userId}`, { limit: 5, windowMs: 60_000 });
//     if (!rl.success) {
//       return NextResponse.json(
//         { error: "Too many requests. Please wait before creating another interview." },
//         { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
//       );
//     }

//     // ── Parse request (JSON or multipart) ────────────────────────────
//     const contentType = request.headers.get("content-type") || "";
//     let jobPosition = "", jobDesc = "", jobExperience = "", resumeText = "";

//     if (contentType.includes("multipart/form-data")) {
//       const formData = await request.formData();
//       jobPosition   = formData.get("jobPosition") || "";
//       jobDesc       = formData.get("jobDesc")       || "";
//       jobExperience = formData.get("jobExperience") || "";

//       const file = formData.get("resume");
//       if (file && file.size > 0) {
//         if (file.type === "text/plain") {
//           resumeText = await file.text();
//         } else if (file.type === "application/pdf") {
//           try {
//             const arrayBuffer = await file.arrayBuffer();
//             const buffer = Buffer.from(arrayBuffer);
//             const pdfParse = (await import("pdf-parse")).default;
//             const parsed = await pdfParse(buffer);
//             console.log("Resume text length:", resumeText.length);
//             console.log("Resume preview:", resumeText.substring(0, 500));
//             resumeText = parsed.text?.trim() || "";
//           } catch (pdfErr) {
//             console.error("PDF parse error:", pdfErr);
//             resumeText = "";
//           }
//         }
//       }
//     } else {
//       const body    = await request.json();
//       jobPosition   = body.jobPosition   || "";
//       jobDesc       = body.jobDesc       || "";
//       jobExperience = body.jobExperience || "";
//       resumeText    = body.resumeText    || "";
//     }

//     // ── Validate ──────────────────────────────────────────────────────
//     if (!jobPosition?.trim() || !jobExperience?.trim()) {
//       return NextResponse.json({ error: "Job role and experience are required" }, { status: 400 });
//     }
//     if (!resumeText && !jobDesc?.trim()) {
//       return NextResponse.json({ error: "Please provide a tech stack or upload a resume" }, { status: 400 });
//     }
//     const expNum = parseInt(jobExperience);
//     if (isNaN(expNum) || expNum < 0 || expNum > 50) {
//       return NextResponse.json(
//         { error: "Years of experience must be between 0 and 50" },
//         { status: 400 }
//       );
//     }

//     // ── Sanitize ──────────────────────────────────────────────────────
//     const sanitize = (str) => str.replace(/[<>]/g, "").trim().substring(0, 500);
//     const position    = sanitize(jobPosition);
//     const description = sanitize(jobDesc || "General Software Engineering");
//     const experience  = sanitize(jobExperience);

//     // ── Build prompt ──────────────────────────────────────────────────
//     // Two different prompts: resume-specific vs generic
//     const prompt = resumeText.trim()
//       ? `You are a strict technical interviewer. The candidate has submitted their resume.

// Job Position: ${position}
// Years of Experience: ${experience}

// CANDIDATE RESUME:
// ---
// ${resumeText.substring(0, 3000)}
// ---

// Generate 5 interview questions STRICTLY based on this specific resume. You MUST:
// - Reference actual project names, technologies, or companies mentioned in the resume
// - Ask about specific implementations or decisions from their listed experience
// - Probe depth of knowledge in the exact tools and frameworks they claim to know
// - At least 3 questions must directly reference something specific from the resume

// For each Answer, explain what a strong response looks like.

// Return ONLY a valid JSON array, no extra text:
// [
//   {
//     "Question": "I see you worked on [specific project/tech from resume] — can you walk me through...?",
//     "Answer": "A strong answer would cover..."
//   }
// ]`
//       : `Generate 5 interview questions and answers for:
// Job Position: ${position}
// Job Description: ${description}
// Years of Experience: ${experience}

// Return ONLY a valid JSON array with this exact format, no extra text:
// [
//   {
//     "Question": "Your interview question here?",
//     "Answer": "Your detailed answer here."
//   }
// ]

// Keep questions professional and relevant to the job requirements.`;

//     // ── Call Groq ─────────────────────────────────────────────────────
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "system",
//           content: "You are a professional technical interviewer. Always respond with valid JSON only, no extra text before or after the array.",
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.7,
//       max_tokens: 2048,
//     });

//     let responseText = completion.choices?.[0]?.message?.content || "";

//     // ── Clean and parse JSON ──────────────────────────────────────────
//     const cleanedResponse = responseText
//       .replace(/```json/gi, "")
//       .replace(/```/g, "")
//       .trim();

//     const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
//     const jsonStr = jsonMatch ? jsonMatch[0] : cleanedResponse;

//     let parsedQuestions;
//     try {
//       parsedQuestions = JSON.parse(jsonStr);
//     } catch {
//       return NextResponse.json(
//         { error: "Failed to parse AI response. Please try again." },
//         { status: 502 }
//       );
//     }

//     if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
//       return NextResponse.json(
//         { error: "Invalid AI response format. Please try again." },
//         { status: 502 }
//       );
//     }

//     for (const item of parsedQuestions) {
//       if (!item.Question || !item.Answer) {
//         return NextResponse.json(
//           { error: "Invalid question format from AI. Please try again." },
//           { status: 502 }
//         );
//       }
//     }

//     // ── Save to DB ────────────────────────────────────────────────────
//     const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
//     const mockId    = uuidv4();
//     const createdAt = new Date().toISOString().split("T")[0];

//     await db.insert(MockInterview).values({
//       mockId,
//       jsonMockResp: JSON.stringify(parsedQuestions),
//       jobPosition:  position,
//       jobDesc:      description,
//       jobExperience: experience,
//       createdBy:    userEmail,
//       createdAt,
//     });

//     return NextResponse.json({ mockId }, { status: 201 });

//   } catch (error) {
//     console.error("[POST /api/interviews]", error);
//     return NextResponse.json(
//       { error: "Failed to create interview. Please try again." },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { rateLimit } from "@/utils/rateLimit";
// import { v4 as uuidv4 } from "uuid";
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // Manual PDF text extraction — no external library needed
// async function extractTextFromPDF(buffer) {
//   try {
//     const str = buffer.toString("latin1");
//     let extractedText = "";

//     // Extract text from BT...ET blocks (standard PDF text objects)
//     const textRegex = /BT([\s\S]*?)ET/g;
//     let match;
//     while ((match = textRegex.exec(str)) !== null) {
//       const textBlock = match[1];
//       const stringRegex = /\(([^)]{1,300})\)/g;
//       let strMatch;
//       while ((strMatch = stringRegex.exec(textBlock)) !== null) {
//         const text = strMatch[1]
//           .replace(/\\n/g, " ")
//           .replace(/\\r/g, " ")
//           .replace(/\\t/g, " ")
//           .replace(/\\\\/g, "\\")
//           .replace(/\\/g, "")
//           .trim();
//         if (text.length > 1) extractedText += text + " ";
//       }
//     }

//     // Fallback — extract readable ASCII from stream blocks
//     if (extractedText.length < 100) {
//       const streamRegex = /stream([\s\S]*?)endstream/g;
//       while ((match = streamRegex.exec(str)) !== null) {
//         const readable = match[1]
//           .replace(/[^\x20-\x7E\n]/g, " ")
//           .replace(/\s+/g, " ")
//           .trim();
//         if (readable.length > 50) extractedText += readable + " ";
//       }
//     }

//     const cleaned = extractedText
//       .replace(/\s+/g, " ")
//       .replace(/[^\w\s@.,;:()\-+#\/]/g, " ")
//       .trim()
//       .substring(0, 4000);

//     return cleaned.length > 50 ? cleaned : null;
//   } catch {
//     return null;
//   }
// }

// export async function POST(request) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();
//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Rate limit: 5 new interviews per minute per user
//     const rl = rateLimit(`create-interview:${userId}`, { limit: 5, windowMs: 60_000 });
//     if (!rl.success) {
//       return NextResponse.json(
//         { error: "Too many requests. Please wait before creating another interview." },
//         { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
//       );
//     }

//     // Parse request (JSON or multipart)
//     const contentType = request.headers.get("content-type") || "";
//     let jobPosition = "", jobDesc = "", jobExperience = "", resumeText = "";

//     if (contentType.includes("multipart/form-data")) {
//       const formData = await request.formData();
//       jobPosition   = formData.get("jobPosition") || "";
//       jobDesc       = formData.get("jobDesc") || "";
//       jobExperience = formData.get("jobExperience") || "";

//       const file = formData.get("resume");
//       if (file && file.size > 0) {
//         if (file.size > 5 * 1024 * 1024) {
//           return NextResponse.json(
//             { error: "Resume file must be under 5MB." },
//             { status: 400 }
//           );
//         }

//         if (file.type === "text/plain") {
//           resumeText = await file.text();
//           resumeText = resumeText.substring(0, 4000);
//         } else if (file.type === "application/pdf") {
//           const arrayBuffer = await file.arrayBuffer();
//           const buffer = Buffer.from(arrayBuffer);
//           const extracted = await extractTextFromPDF(buffer);

//           if (!extracted) {
//             return NextResponse.json(
//               { error: "Could not extract text from PDF. Please use a text-based PDF or upload a .txt file instead." },
//               { status: 400 }
//             );
//           }
//           resumeText = extracted;
//           console.log(`[resume] Extracted ${resumeText.length} chars from PDF`);
//           console.log(`[resume] Preview: ${resumeText.substring(0, 200)}`);
//         } else {
//           return NextResponse.json(
//             { error: "Only PDF and .txt resume files are supported." },
//             { status: 400 }
//           );
//         }
//       }
//     } else {
//       const body    = await request.json();
//       jobPosition   = body.jobPosition   || "";
//       jobDesc       = body.jobDesc       || "";
//       jobExperience = body.jobExperience || "";
//       resumeText    = body.resumeText    || "";
//     }

//     // Validate
//     if (!jobPosition?.trim() || !jobExperience?.trim()) {
//       return NextResponse.json(
//         { error: "Job role and experience are required" },
//         { status: 400 }
//       );
//     }
//     if (!resumeText && !jobDesc?.trim()) {
//       return NextResponse.json(
//         { error: "Please provide a tech stack or upload a resume" },
//         { status: 400 }
//       );
//     }
//     const expNum = parseInt(jobExperience);
//     if (isNaN(expNum) || expNum < 0 || expNum > 50) {
//       return NextResponse.json(
//         { error: "Years of experience must be between 0 and 50" },
//         { status: 400 }
//       );
//     }

//     // Sanitize
//     const sanitize = (str) => str.replace(/[<>]/g, "").trim().substring(0, 500);
//     const position    = sanitize(jobPosition);
//     const description = sanitize(jobDesc || "General Software Engineering");
//     const experience  = sanitize(jobExperience);

//     // Build prompt
//     const prompt = resumeText.trim()
//       ? `You are a strict technical interviewer. The candidate has submitted their resume.

// Job Position: ${position}
// Years of Experience: ${experience}

// CANDIDATE RESUME:
// ---
// ${resumeText.substring(0, 3000)}
// ---

// Generate 5 interview questions STRICTLY based on this specific resume. You MUST:
// - Reference actual project names, technologies, or companies mentioned in the resume
// - Ask about specific implementations or decisions from their listed experience
// - Probe depth of knowledge in the exact tools and frameworks they claim to know
// - At least 3 questions must directly reference something specific from the resume

// For each Answer, explain what a strong response looks like.

// Return ONLY a valid JSON array, no extra text:
// [
//   {
//     "Question": "I see you worked on [specific project/tech from resume] — can you walk me through...?",
//     "Answer": "A strong answer would cover..."
//   }
// ]`
//       : `Generate 5 interview questions and answers for:
// Job Position: ${position}
// Job Description: ${description}
// Years of Experience: ${experience}

// Return ONLY a valid JSON array with this exact format, no extra text:
// [
//   {
//     "Question": "Your interview question here?",
//     "Answer": "Your detailed answer here."
//   }
// ]

// Keep questions professional and relevant to the job requirements.`;

//     // Call Groq
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "system",
//           content: "You are a professional technical interviewer. Always respond with valid JSON only, no extra text before or after the array.",
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.7,
//       max_tokens: 2048,
//     });

//     let responseText = completion.choices?.[0]?.message?.content || "";

//     // Clean and parse JSON
//     const cleanedResponse = responseText
//       .replace(/```json/gi, "")
//       .replace(/```/g, "")
//       .trim();

//     const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
//     const jsonStr = jsonMatch ? jsonMatch[0] : cleanedResponse;

//     let parsedQuestions;
//     try {
//       parsedQuestions = JSON.parse(jsonStr);
//     } catch {
//       return NextResponse.json(
//         { error: "Failed to parse AI response. Please try again." },
//         { status: 502 }
//       );
//     }

//     if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
//       return NextResponse.json(
//         { error: "Invalid AI response format. Please try again." },
//         { status: 502 }
//       );
//     }

//     for (const item of parsedQuestions) {
//       if (!item.Question || !item.Answer) {
//         return NextResponse.json(
//           { error: "Invalid question format from AI. Please try again." },
//           { status: 502 }
//         );
//       }
//     }

//     // Save to DB
//     const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
//     const mockId    = uuidv4();
//     const createdAt = new Date().toISOString().split("T")[0];

//     await db.insert(MockInterview).values({
//       mockId,
//       jsonMockResp: JSON.stringify(parsedQuestions),
//       jobPosition:  position,
//       jobDesc:      description,
//       jobExperience: experience,
//       createdBy:    userEmail,
//       createdAt,
//     });

//     return NextResponse.json({ mockId }, { status: 201 });

//   } catch (error) {
//     console.error("[POST /api/interviews]", error);
//     return NextResponse.json(
//       { error: "Failed to create interview. Please try again." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { rateLimit } from "@/utils/rateLimit";
// import { v4 as uuidv4 } from "uuid";
// import Groq from "groq-sdk";
// import pdf from "pdf-parse";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// /* =========================
//    PDF EXTRACTION (FIXED)
// ========================= */
// async function extractTextFromPDF(buffer) {
//   try {
//     const data = await pdf(buffer);

//     const text = data.text
//       .replace(/[^\x20-\x7E\n]/g, " ")
//       .replace(/\s+/g, " ")
//       .replace(/�/g, " ")
//       .trim();

//     return text.length > 100 ? text.substring(0, 8000) : null;
//   } catch (err) {
//     console.error("PDF parse error:", err);
//     return null;
//   }
// }

// /* =========================
//    MAIN API
// ========================= */
// export async function POST(request) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     /* -------------------------
//        RATE LIMIT
//     ------------------------- */
//     const rl = rateLimit(`create-interview:${userId}`, {
//       limit: 5,
//       windowMs: 60_000,
//     });

//     if (!rl.success) {
//       return NextResponse.json(
//         { error: "Too many requests. Please wait." },
//         {
//           status: 429,
//           headers: {
//             "Retry-After": String(
//               Math.ceil((rl.resetAt - Date.now()) / 1000)
//             ),
//           },
//         }
//       );
//     }

//     /* -------------------------
//        INPUT PARSING
//     ------------------------- */
//     const contentType = request.headers.get("content-type") || "";

//     let jobPosition = "";
//     let jobDesc = "";
//     let jobExperience = "";
//     let resumeText = "";

//     if (contentType.includes("multipart/form-data")) {
//       const formData = await request.formData();

//       jobPosition = formData.get("jobPosition") || "";
//       jobDesc = formData.get("jobDesc") || "";
//       jobExperience = formData.get("jobExperience") || "";

//       const file = formData.get("resume");

//       if (file && file.size > 0) {
//         if (file.size > 5 * 1024 * 1024) {
//           return NextResponse.json(
//             { error: "File must be under 5MB" },
//             { status: 400 }
//           );
//         }

//         if (file.type === "text/plain") {
//           resumeText = await file.text();
//         } else if (file.type === "application/pdf") {
//           const buffer = Buffer.from(await file.arrayBuffer());
//           resumeText = await extractTextFromPDF(buffer);

//           if (!resumeText) {
//             return NextResponse.json(
//               { error: "Could not extract readable text from PDF" },
//               { status: 400 }
//             );
//           }
//         } else {
//           return NextResponse.json(
//             { error: "Only PDF or TXT allowed" },
//             { status: 400 }
//           );
//         }
//       }
//     } else {
//       const body = await request.json();

//       jobPosition = body.jobPosition || "";
//       jobDesc = body.jobDesc || "";
//       jobExperience = body.jobExperience || "";
//       resumeText = body.resumeText || "";
//     }

//     /* -------------------------
//        VALIDATION
//     ------------------------- */
//     if (!jobPosition || !jobExperience) {
//       return NextResponse.json(
//         { error: "Job position & experience required" },
//         { status: 400 }
//       );
//     }

//     const expNum = parseInt(jobExperience);
//     if (isNaN(expNum) || expNum < 0 || expNum > 50) {
//       return NextResponse.json(
//         { error: "Invalid experience range" },
//         { status: 400 }
//       );
//     }

//     /* -------------------------
//        CLEAN RESUME (IMPORTANT FIX)
//     ------------------------- */
//     if (resumeText) {
//       resumeText = resumeText
//         .replace(/[^\x20-\x7E\n]/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
//     }

//     const mockId = uuidv4();

//     /* -------------------------
//        PROMPT
//     ------------------------- */
//     const prompt = resumeText
//       ? `
// You are a strict technical interviewer.

// JOB: ${jobPosition}
// EXPERIENCE: ${jobExperience}

// RESUME:
// ${resumeText.slice(0, 4000)}

// Generate 5 technical interview questions STRICTLY based on resume.

// Return ONLY JSON:
// [
//   {
//     "Question": "...",
//     "Answer": "..."
//   }
// ]
// `
//       : `
// Generate 5 interview questions for:
// Role: ${jobPosition}
// Experience: ${jobExperience}

// Return ONLY JSON array:
// [
//   {
//     "Question": "...",
//     "Answer": "..."
//   }
// ]
// `;

//     /* -------------------------
//        GROQ CALL
//     ------------------------- */
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "system",
//           content:
//             "Return ONLY valid JSON array. No explanation. No markdown.",
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.5,
//       max_tokens: 2000,
//     });

//     let responseText =
//       completion.choices?.[0]?.message?.content || "";

//     responseText = responseText
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     const jsonMatch = responseText.match(/\[[\s\S]*\]/);
//     const jsonStr = jsonMatch ? jsonMatch[0] : responseText;

//     let parsed;

//     try {
//       parsed = JSON.parse(jsonStr);
//     } catch (e) {
//       return NextResponse.json(
//         { error: "AI returned invalid JSON" },
//         { status: 500 }
//       );
//     }

//     /* -------------------------
//        SAVE TO DB
//     ------------------------- */
//     await db.insert(MockInterview).values({
//       mockId,
//       jsonMockResp: JSON.stringify(parsed),
//       jobPosition,
//       jobDesc,
//       jobExperience,
//       createdBy: user.primaryEmailAddress?.emailAddress ?? "",
//       createdAt: new Date().toISOString().split("T")[0],
//     });

//     return NextResponse.json(
//       { success: true, mockId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("[POST /api/interviews]", error);

//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(request) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();

//     let {
//       jobPosition,
//       jobDesc,
//       jobExperience,
//       resumeText,
//     } = body;

//     if (!jobPosition || !jobExperience) {
//       return NextResponse.json(
//         { error: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     const exp = parseInt(jobExperience);
//     if (isNaN(exp) || exp < 0 || exp > 50) {
//       return NextResponse.json(
//         { error: "Invalid experience" },
//         { status: 400 }
//       );
//     }

//     // CLEAN RESUME (IMPORTANT FIX)
//     if (resumeText) {
//       resumeText = resumeText
//         .replace(/[^\x20-\x7E\n]/g, " ")
//         .replace(/\s+/g, " ")
//         .trim()
//         .slice(0, 5000);
//     }

//     const mockId = uuidv4();

//     const prompt = resumeText
//       ? `
// You are a strict technical interviewer.

// JOB: ${jobPosition}
// EXPERIENCE: ${jobExperience}

// RESUME:
// ${resumeText}

// RULES:
// - Use ONLY resume
// - Do NOT invent projects
// - Ask real technical questions

// Return ONLY JSON:
// [
//   {
//     "Question": "...",
//     "Answer": "..."
//   }
// ]
// `
//       : `
// Generate 5 interview questions for:
// Role: ${jobPosition}
// Experience: ${jobExperience}

// Return ONLY JSON.
// `;

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         {
//           role: "system",
//           content: "Return ONLY valid JSON array",
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.4,
//       max_tokens: 2000,
//     });

//     let text = completion.choices?.[0]?.message?.content || "";

//     text = text.replace(/```json/g, "").replace(/```/g, "");

//     const jsonMatch = text.match(/\[[\s\S]*\]/);
//     const jsonStr = jsonMatch ? jsonMatch[0] : text;

//     const parsed = JSON.parse(jsonStr);

//     await db.insert(MockInterview).values({
//       mockId,
//       jsonMockResp: JSON.stringify(parsed),
//       jobPosition,
//       jobDesc,
//       jobExperience,
//       createdBy: user.primaryEmailAddress?.emailAddress ?? "",
//       createdAt: new Date().toISOString().split("T")[0],
//     });

//     return NextResponse.json({ mockId }, { status: 201 });

//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    let {
      jobPosition,
      jobDesc,
      jobExperience,
      resumeText,
    } = body;

    if (!jobPosition || !jobExperience) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const exp = parseInt(jobExperience);
    if (isNaN(exp) || exp < 0 || exp > 50) {
      return NextResponse.json(
        { error: "Invalid experience" },
        { status: 400 }
      );
    }

    // CLEAN RESUME TEXT
    if (resumeText) {
      resumeText = resumeText
        .replace(/[^\x20-\x7E\n]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 5000);
    }

    const mockId = uuidv4();

    const prompt = resumeText
      ? `
You are a strict technical interviewer.

JOB: ${jobPosition}
EXPERIENCE: ${jobExperience}

RESUME:
${resumeText}

RULES:
- Use ONLY resume
- Do NOT invent projects
- Ask real technical questions

Return ONLY valid JSON array:
[
  {
    "Question": "...",
    "Answer": "..."
  }
]
`
      : `
Generate 5 interview questions for:
Role: ${jobPosition}
Experience: ${jobExperience}

Return ONLY valid JSON array:
[
  {
    "Question": "...",
    "Answer": "..."
  }
]
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You must return ONLY valid JSON array. No markdown. No text.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 2000,
    });

    let text = completion.choices?.[0]?.message?.content || "";

    // remove markdown
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // SAFE PARSING (FIX FOR MANUAL MODE)
    let parsed;

    try {
      const match = text.match(/\[[\s\S]*\]/);

      if (!match) {
        throw new Error("No JSON found");
      }

      parsed = JSON.parse(match[0]);

      if (!Array.isArray(parsed)) {
        throw new Error("Invalid format");
      }

      // normalize structure
      parsed = parsed.map((q) => ({
        Question: q.Question || q.question || "Question not generated",
        Answer: q.Answer || q.answer || "",
      }));
    } catch (err) {
      console.error("❌ JSON Parse Error:", err);
      console.log("RAW AI OUTPUT:", text);

      return NextResponse.json(
        { error: "AI returned invalid format. Try again." },
        { status: 500 }
      );
    }

    await db.insert(MockInterview).values({
      mockId,
      jsonMockResp: JSON.stringify(parsed),
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy: user.primaryEmailAddress?.emailAddress ?? "",
      createdAt: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ mockId }, { status: 201 });

  } catch (err) {
    console.error("[POST /api/interviews]", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}