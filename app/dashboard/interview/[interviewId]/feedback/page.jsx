// "use client";
// import React, { useEffect, useState, useMemo } from "react";
// import { ChevronDown } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const Feedback = ({ params }) => {
//   const router = useRouter();
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

//   const fetchFeedback = async () => {
//     try {
//       const res = await fetch(`/api/interviews/${params.interviewId}/feedback`);
//       if (!res.ok) throw new Error("Failed to fetch feedback");
//       const data = await res.json();
//       setFeedbackList(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const overallRating = useMemo(() => {
//     if (feedbackList && feedbackList.length > 0) {
//       const total = feedbackList.reduce((sum, item) => sum + Number(item.rating), 0);
//       return (total / feedbackList.length).toFixed(1);
//     }
//     return 0;
//   }, [feedbackList]);

//   if (loading) {
//     return (
//       <div className="p-10 text-gray-500">Loading your feedback...</div>
//     );
//   }

//   return (
//     <div className="p-10">
//       {feedbackList.length === 0 ? (
//         <h2 className="font-bold text-xl text-gray-500 my-5">
//           No interview feedback record found.
//         </h2>
//       ) : (
//         <>
//           <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
//           <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
//           <h2 className="text-primary text-lg my-3">
//             Your overall interview rating{" "}
//             <strong
//               className={overallRating >= 5 ? "text-green-500" : "text-red-600"}
//             >
//               {overallRating}
//               <span className="text-black">/10</span>
//             </strong>
//           </h2>
//           <h2 className="text-sm text-gray-500">
//             Find below each question with the correct answer, your answer, and
//             feedback for improvement.
//           </h2>
//           {feedbackList.map((item, index) => (
//             <Collapsible key={index} className="mt-7">
//               <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
//                 {item.question} <ChevronDown className="h-5 w-5 shrink-0" />
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <div className="flex flex-col gap-2">
//                   <h2 className="text-red-500 p-2 border rounded-lg">
//                     <strong>Rating: </strong>{item.rating}
//                   </h2>
//                   <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
//                     <strong>Your Answer: </strong>{item.userAns}
//                   </h2>
//                   <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
//                     <strong>Correct Answer: </strong>{item.correctAns}
//                   </h2>
//                   <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary-900">
//                     <strong>Feedback: </strong>{item.feedback}
//                   </h2>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>
//           ))}
//         </>
//       )}
//       <Button className="mt-6" onClick={() => router.replace("/dashboard")}>
//         Go Home
//       </Button>
//     </div>
//   );
// };

// export default Feedback;












"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown, TrendingUp, ArrowLeft } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`/api/interviews/${params.interviewId}/feedback`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();
      setFeedbackList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const overallRating = useMemo(() => {
    if (!feedbackList.length) return 0;
    const total = feedbackList.reduce(
      (sum, item) => sum + Number(item.rating),
      0
    );
    return (total / feedbackList.length).toFixed(1);
  }, [feedbackList]);

  const ratingColor = (r) =>
    r >= 7 ? "#0d9488" : r >= 5 ? "#f59e0b" : "#ef4444";

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#7c3aed]/20 border-t-[#7c3aed] animate-spin" />
        <p className="text-muted-foreground text-sm">
          Loading your feedback…
        </p>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto text-center">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="text-xl font-black text-foreground mb-2">
          Could not load feedback
        </h2>
        <p className="text-muted-foreground text-sm mb-6">{error}</p>
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={fetchFeedback}
            className="border-border text-foreground hover:bg-muted"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.replace("/dashboard")}
            className="btn-gradient"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // ── No feedback ──
  if (feedbackList.length === 0) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-black text-foreground mb-2">
            No Feedback Found
          </h2>
          <p className="text-muted-foreground text-sm mb-2">
            No answers were recorded for this interview session.
          </p>
          <p className="text-muted-foreground text-xs mb-8 max-w-sm mx-auto">
            This happens when you end the interview without recording any
            answers. Start the interview again and click{" "}
            <strong className="text-foreground">Record Answer</strong> on at
            least one question.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  `/dashboard/interview/${params.interviewId}/start`
                )
              }
              className="border-border text-foreground hover:bg-muted"
            >
              ↩ Retry This Interview
            </Button>
            <Button
              onClick={() => router.replace("/dashboard")}
              className="btn-gradient"
            >
              Back to Dashboard →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Has feedback ──
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">

      {/* Back link */}
      <button
        onClick={() => router.replace("/dashboard")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground
          hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Score hero card */}
      <div className="rounded-2xl border border-[#7c3aed]/20 bg-card p-8 mb-8 text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-black text-foreground mb-1">
          Interview Complete!
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Here is your InterviewAI performance report
        </p>
        <div className="inline-flex items-end gap-2">
          <span
            className="text-6xl font-black"
            style={{ color: ratingColor(overallRating) }}
          >
            {overallRating}
          </span>
          <span className="text-2xl text-muted-foreground font-bold mb-2">
            /10
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Overall Score</p>
        <p className="text-sm text-muted-foreground mt-3">
          {overallRating >= 8
            ? "🔥 Excellent! You're interview-ready."
            : overallRating >= 6
            ? "👍 Good job! Review the feedback below to improve."
            : "💪 Keep practicing! Focus on the areas highlighted below."}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Communication",
            score: Math.min(100, Math.round(overallRating * 10)),
            color: "#7c3aed",
          },
          {
            label: "Tech Depth",
            score: Math.min(100, Math.round(overallRating * 9.5)),
            color: "#2563eb",
          },
          {
            label: "Confidence",
            score: Math.min(100, Math.round(overallRating * 10.5)),
            color: "#0d9488",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-border bg-card p-4 text-center stat-card"
          >
            <div className="text-2xl font-black" style={{ color: m.color }}>
              {m.score}%
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2 mb-1">
              <div
                className="h-1.5 rounded-full score-bar-fill"
                style={{ width: `${m.score}%`, background: m.color }}
              />
            </div>
            <div className="text-xs text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Per-question heading */}
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-5 h-5 text-[#7c3aed]" />
        <h3 className="font-black text-lg text-foreground">
          Question-by-Question Breakdown
        </h3>
        <span className="tag-purple">{feedbackList.length} questions</span>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        Click any question to see your answer, the model answer, and AI
        feedback.
      </p>

      {/* Collapsible questions */}
      <div className="space-y-3 mb-8">
        {feedbackList.map((item, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="w-full">
              <div
                className="rounded-xl border border-border bg-card p-4
                  flex items-center justify-between gap-4
                  hover:border-[#7c3aed]/30 transition-all text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center
                      text-xs font-black text-white shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                    }}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-foreground truncate">
                    {item.question}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-sm font-black"
                    style={{ color: ratingColor(item.rating) }}
                  >
                    {item.rating}/10
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-2 space-y-2 pl-2">

                {/* Your answer */}
                <div
                  className="rounded-xl border p-3
                    bg-red-50 border-red-100
                    dark:bg-red-900/10 dark:border-red-900/20"
                >
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                    ✏️ Your Answer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.userAns || "No answer recorded"}
                  </p>
                </div>

                {/* Model answer */}
                <div
                  className="rounded-xl border p-3
                    bg-green-50 border-green-100
                    dark:bg-green-900/10 dark:border-green-900/20"
                >
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
                    ✅ Model Answer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.correctAns}
                  </p>
                </div>

                {/* AI Feedback */}
                <div
                  className="rounded-xl border p-3
                    bg-blue-50 border-blue-100
                    dark:bg-blue-900/10 dark:border-blue-900/20"
                >
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    🤖 AI Feedback
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.feedback}
                  </p>
                </div>

              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() =>
            router.push(`/dashboard/interview/${params.interviewId}/start`)
          }
          className="border-border text-foreground hover:bg-muted"
        >
          ↩ Retry This Interview
        </Button>
        <Button
          onClick={() => router.replace("/dashboard")}
          className="btn-gradient"
        >
          Back to Dashboard →
        </Button>
      </div>

    </div>
  );
};

export default Feedback;