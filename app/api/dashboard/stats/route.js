import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;

    const interviews = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email));

    const answers = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.userEmail, email));

    const interviewCount = interviews.length;

    let avgScore = 0;
    if (answers.length > 0) {
      const total = answers.reduce(
        (sum, a) => sum + Number(a.rating || 0),
        0
      );
      avgScore = (total / answers.length).toFixed(1);
    }

    const readiness = avgScore ? Math.min(100, avgScore * 10) : 0;

    return NextResponse.json({
      interviews: interviewCount,
      avgScore,
      readiness,
      streak: interviewCount,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}