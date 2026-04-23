// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { eq } from "drizzle-orm";

// // GET /api/interviews/[id]
// export async function GET(request, context) {
//   try {
//     // ✅ Auth check
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     // ✅ Params (safe destructuring)
//     const { id } = context.params || {};

//     if (!id) {
//       return NextResponse.json(
//         { error: "Interview ID is required" },
//         { status: 400 }
//       );
//     }

//     // ✅ DB Query
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, id));

//     if (!result || result.length === 0) {
//       return NextResponse.json(
//         { error: "Interview not found" },
//         { status: 404 }
//       );
//     }

//     // ✅ Return single object
//     return NextResponse.json(result[0], { status: 200 });

//   } catch (error) {
//     console.error("[GET /api/interviews/[id]] ERROR:", error);

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { eq } from "drizzle-orm";

// // GET /api/interviews/[id]
// export async function GET(request, { params }) {
//   try {
//     // -------------------------
//     // 1. AUTH CHECK (FIXED)
//     // -------------------------
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     // -------------------------
//     // 2. SAFE PARAMS ACCESS
//     // -------------------------
//     const id = params?.id;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: "Interview ID is required" },
//         { status: 400 }
//       );
//     }

//     // -------------------------
//     // 3. DATABASE QUERY
//     // -------------------------
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, id));

//     // -------------------------
//     // 4. NOT FOUND HANDLING
//     // -------------------------
//     if (!result || result.length === 0) {
//       return NextResponse.json(
//         { success: false, error: "Interview not found" },
//         { status: 404 }
//       );
//     }

//     // -------------------------
//     // 5. SUCCESS RESPONSE
//     // -------------------------
//     return NextResponse.json({
//       success: true,
//       interview: result[0],
//     });

//   } catch (error) {
//     console.error("[GET /api/interviews/[id]] ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Internal server error",
//         details: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

// GET /api/interviews/[id] — fetch a single interview by mockId
export async function GET(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Interview ID is required" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id))
      .limit(1);

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    // ✅ Return the interview object directly (NOT nested under a key)
    // Frontend reads: data.mockId, data.jobPosition, data.jsonMockResp etc.
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("[GET /api/interviews/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}