import { cache } from "react";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { MockInterview, Question, UserAnswer } from "./schema";
import { eq } from "drizzle-orm";

/* =========================
   GET ALL MOCK INTERVIEWS
========================= */
export const getMockInterviews = cache(async () => {
  try {
    const { userId } = await auth();

    if (!userId) return [];

    const data = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, userId));

    return data;
  } catch (error) {
    console.error("Error fetching mock interviews:", error);
    throw error;
  }
});

/* =========================
   GET QUESTIONS BY MOCK ID
========================= */
export const getQuestionsByMockId = cache(async (mockId: string) => {
  try {
    const data = await db
      .select()
      .from(Question)
      .where(eq(Question.mockId, mockId));

    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
});

/* =========================
   GET USER ANSWERS
========================= */
export const getUserAnswers = cache(async (mockId: string) => {
  try {
    const { userId } = await auth();

    if (!userId) return [];

    const data = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, mockId));

    return data;
  } catch (error) {
    console.error("Error fetching user answers:", error);
    throw error;
  }
});