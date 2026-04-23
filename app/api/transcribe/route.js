// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // POST /api/transcribe — transcribe audio blob via Gemini multimodal
// export async function POST(request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await request.formData();
//     const audioFile = formData.get("audio");

//     if (!audioFile) {
//       return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
//     }

//     // Convert to base64
//     const arrayBuffer = await audioFile.arrayBuffer();
//     const base64Audio = Buffer.from(arrayBuffer).toString("base64");

//     const genAI = new GoogleGenerativeAI(process.env.GROQ_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent([
//       "Transcribe the following audio accurately. Return only the transcribed text with no additional commentary.",
//       { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
//     ]);

//     const transcription = result.response.text().trim();
//     return NextResponse.json({ transcription });
//   } catch (error) {
//     console.error("[POST /api/transcribe]", error);
//     return NextResponse.json(
//       { error: "Transcription failed. Please try again." },
//       { status: 500 }
//     );
//   }
// }











// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Stable models — ordered by reliability
// const MODELS = [
//   "gemini-1.5-flash",
//   "gemini-1.5-flash-8b",
//   "gemini-1.5-pro",
//   "gemini-2.0-flash",
//   "gemini-2.0-flash-lite",
// ];

// async function transcribeWithRetry(base64Audio, mimeType) {
//   let lastError;

//   for (const modelName of MODELS) {
//     try {
//       console.log(`[transcribe] Trying: ${modelName}`);

//       const genAI = new GoogleGenerativeAI(process.env.GROQ_API_KEY);
//       const model = genAI.getGenerativeModel({ model: modelName });

//       const result = await model.generateContent([
//         {
//           inlineData: {
//             data: base64Audio,
//             mimeType: mimeType || "audio/webm",
//           },
//         },
//         {
//           text: "Transcribe this audio accurately. Return only the spoken words, nothing else.",
//         },
//       ]);

//       const text = result.response.text().trim();
//       console.log(`[transcribe] Success: ${modelName}`);
//       return { text, modelName };

//     } catch (err) {
//       lastError = err;
//       const status = err?.status || err?.statusCode;
//       console.warn(`[transcribe] ${modelName} failed (${status})`);

//       // Retry on these — skip to next model
//       if (status === 404 || status === 503 || status === 429) {
//         continue;
//       }

//       // Anything else — stop immediately
//       throw err;
//     }
//   }

//   throw lastError;
// }

// export async function POST(request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await request.formData();
//     const audioFile = formData.get("audio");

//     if (!audioFile) {
//       return NextResponse.json(
//         { error: "No audio file provided" },
//         { status: 400 }
//       );
//     }

//     const arrayBuffer = await audioFile.arrayBuffer();

//     if (arrayBuffer.byteLength < 500) {
//       return NextResponse.json(
//         { error: "Recording too short. Please speak for at least 2 seconds." },
//         { status: 400 }
//       );
//     }

//     const base64Audio = Buffer.from(arrayBuffer).toString("base64");
//     const mimeType = audioFile.type || "audio/webm";

//     const { text, modelName } = await transcribeWithRetry(base64Audio, mimeType);

//     if (!text) {
//       return NextResponse.json(
//         { error: "Could not transcribe. Please speak clearly and try again." },
//         { status: 502 }
//       );
//     }

//     return NextResponse.json({ transcription: text, model: modelName });

//   } catch (error) {
//     console.error("[POST /api/transcribe]", error);

//     const status = error?.status || error?.statusCode;

//     if (status === 503) {
//       return NextResponse.json(
//         {
//           error: "AI service overloaded. Please wait a moment and try again.",
//           retryable: true,
//         },
//         { status: 503 }
//       );
//     }

//     if (status === 429) {
//       return NextResponse.json(
//         {
//           error: "Rate limit reached. Please wait a few seconds and try again.",
//           retryable: true,
//         },
//         { status: 429 }
//       );
//     }

//     return NextResponse.json(
//       {
//         error: "Transcription failed. Please try again.",
//         fallbackToText: true,
//       },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file" }, { status: 400 });
    }

    const arrayBuffer = await audioFile.arrayBuffer();

    if (arrayBuffer.byteLength < 500) {
      return NextResponse.json(
        { error: "Recording too short. Please speak for at least 2 seconds." },
        { status: 400 }
      );
    }

    const base64Audio = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = audioFile.type || "audio/webm";

    const genAI = new GoogleGenerativeAI(process.env.GROQ_API_KEY);
    let lastError;

    for (const modelName of MODELS) {
      try {
        console.log(`[transcribe] Trying: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent([
          { text: "Transcribe this audio accurately. Return only the spoken words, nothing else." },
          { inlineData: { data: base64Audio, mimeType } },
        ]);

        const transcription = result.response.text()?.trim();
        if (!transcription) continue;

        console.log(`[transcribe] ✓ Success with: ${modelName}`);
        return NextResponse.json({ transcription, model: modelName });

      } catch (err) {
        lastError = err;
        const status = err?.status || err?.statusCode;
        console.warn(`[transcribe] ${modelName} failed (${status})`);
        if ([404, 429, 500, 503].includes(status)) continue;
        throw err;
      }
    }

    // All models failed — return error but don't crash
    // The client will fall back to Web Speech API transcript
    console.error("[transcribe] All models failed:", lastError?.message);
    return NextResponse.json(
      { error: "Transcription service unavailable. Your spoken answer may still be saved via browser transcription." },
      { status: 503 }
    );

  } catch (error) {
    console.error("[transcribe error]", error);
    return NextResponse.json(
      { error: "Transcription failed" },
      { status: 500 }
    );
  }
}