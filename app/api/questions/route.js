// import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { Question } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";

// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(request) {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();
//     const { jobPosition, jobDesc, jobExperience, typeQuestion, company } = body;

//     if (!jobPosition || !jobDesc || !typeQuestion || !company) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const email = user.primaryEmailAddress?.emailAddress;

//     const prompt = `
//     Given the following details:
//     - Job Position: ${jobPosition}
//     - Job Description: ${jobDesc}
//     - Years of Experience: ${jobExperience}
//     - Type of Question: ${typeQuestion}
//     - Previous Questions from this Company: ${company}
  
//     Please generate 5 interview questions relevant to the job position, experience level, and question type provided. Each question should be accompanied by a comprehensive answer. The output should be in JSON format with "Question" and "Answer" as fields.
  
//     Example format:
//     [
//       {
//         "Question": "Your question here",
//         "Answer": "The corresponding answer here"
//       }
//     ]
//     `;

//     const genAI = new GoogleGenerativeAI(process.env.GROQ_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//     const result = await model.generateContent(prompt);

//     const MockQuestionJsonResp = result.response
//       .text()
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     const mockId = uuidv4();

//     await db.insert(Question).values({
//       mockId,
//       MockQuestionJsonResp,
//       jobPosition,
//       jobDesc,
//       jobExperience: jobExperience?.toString() || "0",
//       typeQuestion,
//       company,
//       createdBy: email,
//       createdAt: new Date().toISOString().split("T")[0],
//     });

//     return NextResponse.json({ mockId });
//   } catch (error) {
//     console.error("[POST /api/questions]", error);
//     return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      jobPosition,
      jobDesc,
      jobExperience,
      typeQuestion,
      company,
    } = body;

    if (!jobPosition || !jobDesc || !typeQuestion || !company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const email = user.primaryEmailAddress?.emailAddress;

    /* ---------------- PROMPT ---------------- */
    const prompt = `
You are a technical interviewer.

Generate 5 interview questions based on:

Job Position: ${jobPosition}
Job Description: ${jobDesc}
Experience: ${jobExperience}
Question Type: ${typeQuestion}
Company: ${company}

Return ONLY valid JSON in this format:
[
  {
    "Question": "...",
    "Answer": "..."
  }
]
`;

    /* ---------------- GROQ CALL ---------------- */
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Return ONLY valid JSON array. No explanation, no markdown.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    let responseText =
      completion.choices?.[0]?.message?.content || "";

    // clean markdown
    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // extract JSON safely
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : responseText;

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (err) {
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }

    const mockId = uuidv4();

    await db.insert(Question).values({
      mockId,
      MockQuestionJsonResp: JSON.stringify(parsed),
      jobPosition,
      jobDesc,
      jobExperience: jobExperience?.toString() || "0",
      typeQuestion,
      company,
      createdBy: email,
      createdAt: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ mockId });
  } catch (error) {
    console.error("[POST /api/questions]", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}