"use client";
import React, { useState, useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterviewDetails();
  }, []);

  const fetchInterviewDetails = async () => {
    try {
      const res = await fetch(`/api/interviews/${params.interviewId}`);
      if (!res.ok) throw new Error("Failed to fetch interview");
      const data = await res.json();

      // Safely parse questions
      let questions = null;
      try {
        questions = JSON.parse(data.jsonMockResp);
      } catch {
        // Try extracting JSON array from response
        const match = data.jsonMockResp?.match(/\[[\s\S]*\]/);
        if (match) {
          questions = JSON.parse(match[0]);
        }
      }

      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        setError("No questions found. Please create a new interview.");
        return;
      }

      setMockInterviewQuestion(questions);
      setInterviewData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load interview. Please go back and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading your interview questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md p-8 rounded-2xl border border-red-200 bg-red-50">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="font-bold text-lg text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <Link href="/dashboard">
            <Button>← Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-foreground">
            Question {activeQuestionIndex + 1} of {mockInterviewQuestion?.length}
          </span>
          <span className="text-sm text-muted-foreground">{interviewData?.jobPosition}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((activeQuestionIndex + 1) / mockInterviewQuestion?.length) * 100}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)'
            }}
          />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6 justify-end">
        {activeQuestionIndex > 0 && (
          <Button
            variant="outline"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            ← Previous
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            style={{background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff'}}
          >
            Next Question →
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}>
            <Button style={{background: 'linear-gradient(135deg,#059669,#0891b2)', color: '#fff'}}>
              🏁 End Interview & Get Feedback
            </Button>
          </Link>
        )}
      </div>

    </div>
  );
};

export default StartInterview;