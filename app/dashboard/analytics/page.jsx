// "use client";
// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

// export default function AnalyticsPage() {
//   const { user } = useUser();
//   const [interviews, setInterviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetch("/api/interviews/list")
//         .then(r => r.json())
//         .then(d => { setInterviews(d); setLoading(false); })
//         .catch(() => setLoading(false));
//     }
//   }, [user]);

//   const total = interviews.length;
//   const readiness = Math.min(100, Math.round(total * 12));
//   const circumference = 2 * Math.PI * 40;
//   const dashOffset = circumference - (readiness / 100) * circumference;

//   const topics = [
//     { name: "System Design", score: Math.min(100, 45 + total * 5), color: "#7c3aed" },
//     { name: "DSA",           score: Math.min(100, 60 + total * 3), color: "#2563eb" },
//     { name: "Behavioral",    score: Math.min(100, 70 + total * 4), color: "#0d9488" },
//     { name: "Communication", score: Math.min(100, 55 + total * 6), color: "#f59e0b" },
//   ];

//   return (
//     <div className="p-6 md:p-10 max-w-5xl mx-auto">

//       {/* Page header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse inline-block" />
//           <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
//             Analytics Dashboard
//           </span>
//         </div>
//         <h1 className="text-3xl font-black text-foreground">Your Progress 📊</h1>
//         <p className="text-muted-foreground mt-1">
//           Track your interview readiness over time with MockInterview AI.
//         </p>
//       </div>

//       {/* Readiness circle */}
//       <div className="rounded-2xl border border-[#7c3aed]/20 bg-card p-8 mb-8
//         flex flex-col md:flex-row items-center gap-8">

//         <div className="relative w-36 h-36 shrink-0">
//           {mounted ? (
//             <svg
//               className="w-36 h-36 -rotate-90"
//               viewBox="0 0 100 100"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <circle
//                 cx="50" cy="50" r="40"
//                 fill="none"
//                 stroke="hsl(var(--muted))"
//                 strokeWidth="10"
//               />
//               <circle
//                 cx="50" cy="50" r="40"
//                 fill="none"
//                 stroke="url(#readGrad)"
//                 strokeWidth="10"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={dashOffset}
//                 strokeLinecap="round"
//                 style={{ transition: "stroke-dashoffset 1s ease" }}
//               />
//               <defs>
//                 <linearGradient id="readGrad" x1="0" y1="0" x2="1" y2="1">
//                   <stop offset="0%"   stopColor="#7c3aed" />
//                   <stop offset="100%" stopColor="#0d9488" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           ) : (
//             <div className="w-36 h-36 rounded-full bg-muted animate-pulse" />
//           )}

//           {mounted && (
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//               <span className="text-3xl font-black gradient-text">{readiness}%</span>
//               <span className="text-xs text-muted-foreground">Ready</span>
//             </div>
//           )}
//         </div>

//         <div>
//           <h2 className="text-2xl font-black text-foreground mb-2">
//             Interview Readiness Score
//           </h2>
//           <p className="text-muted-foreground text-sm mb-4">
//             {!mounted ? "Loading..." :
//               readiness < 40 ? "You're just getting started. Keep practicing!" :
//               readiness < 70 ? "Good progress! Focus on your weak topics below." :
//               "You're interview-ready! Keep your skills sharp."
//             }
//           </p>
//           <div className="flex gap-6 text-sm">
//             <div>
//               <span className="font-black text-[#7c3aed]">
//                 {mounted ? total : "–"}
//               </span>
//               <span className="text-muted-foreground ml-1">Interviews</span>
//             </div>
//             <div>
//               <span className="font-black text-[#0d9488]">
//                 {mounted ? total * 5 : "–"}
//               </span>
//               <span className="text-muted-foreground ml-1">Questions Answered</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Topic breakdown */}
//       <div className="rounded-2xl border border-border bg-card p-6 mb-6">
//         <h3 className="font-black text-lg text-foreground mb-5">Topic Breakdown</h3>
//         <div className="space-y-4">
//           {topics.map(t => (
//             <div key={t.name}>
//               <div className="flex justify-between mb-1.5">
//                 <span className="text-sm font-semibold text-foreground">{t.name}</span>
//                 <span className="text-sm font-black" style={{ color: t.color }}>
//                   {mounted ? t.score : 0}%
//                 </span>
//               </div>
//               <div className="w-full bg-muted rounded-full h-2">
//                 <div
//                   className="h-2 rounded-full score-bar-fill"
//                   style={{
//                     width: mounted ? `${t.score}%` : "0%",
//                     background: t.color,
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Stat cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         {[
//           { label: "Avg Score",    val: total ? "7.2/10" : "0", icon: "⭐", color: "#f59e0b" },
//           { label: "Filler Words", val: total ? "↓ 34%"  : "0", icon: "🗣️", color: "#0d9488" },
//           { label: "Confidence",   val: total ? "82%"    : "0", icon: "💪", color: "#7c3aed" },
//           { label: "Streak",       val: total ? `${total}d` : "0", icon: "🔥", color: "#ef4444" },
//         ].map(s => (
//           <div key={s.label}
//             className="rounded-xl border border-border bg-card p-4 stat-card">
//             <div className="text-2xl mb-1">{s.icon}</div>
//             <div className="text-xl font-black" style={{ color: s.color }}>
//               {mounted ? s.val : "0"}
//             </div>
//             <div className="text-xs text-muted-foreground">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Empty state */}
//       {mounted && !loading && total === 0 && (
//         <div className="rounded-2xl border border-border bg-card p-10 text-center">
//           <div className="text-4xl mb-3">🎯</div>
//           <h3 className="font-bold text-foreground mb-2">No data yet</h3>
//           <p className="text-sm text-muted-foreground mb-5">
//             Complete interviews to see your analytics here.
//           </p>
//           <Link
//             href="/dashboard"
//             className="btn-gradient inline-block px-6 py-2.5 rounded-xl font-semibold text-sm"
//           >
//             Start an Interview
//           </Link>
//         </div>
//       )}

//       {/* Loading state */}
//       {loading && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[1, 2, 3].map(i => (
//             <div key={i} className="h-36 rounded-xl bg-muted animate-pulse border border-border" />
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AnalyticsPage() {
  const { user } = useUser();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues (SVG mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch interviews
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/interviews/list");

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setInterviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // ---- Calculations ----
  const total = interviews.length;

  const readiness = Math.min(100, Math.round(total * 12));

  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (readiness / 100) * circumference;

  const topics = [
    { name: "System Design", score: Math.min(100, 45 + total * 5), color: "#7c3aed" },
    { name: "DSA", score: Math.min(100, 60 + total * 3), color: "#2563eb" },
    { name: "Behavioral", score: Math.min(100, 70 + total * 4), color: "#0d9488" },
    { name: "Communication", score: Math.min(100, 55 + total * 6), color: "#f59e0b" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black">Your Progress 📊</h1>
        <p className="text-muted-foreground mt-1">
          Track your interview readiness over time.
        </p>
      </div>

      {/* READINESS CARD */}
      <div className="rounded-2xl border p-8 mb-8 flex flex-col md:flex-row items-center gap-8">

        {/* Circle */}
        <div className="relative w-36 h-36">
          {mounted ? (
            <svg
              className="w-36 h-36 -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />

              {/* Progress */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 animate-pulse" />
          )}

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">
              {mounted ? `${readiness}%` : "--"}
            </span>
            <span className="text-xs text-gray-500">Ready</span>
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">
            Interview Readiness Score
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            {loading
              ? "Loading..."
              : readiness < 40
              ? "You're just getting started."
              : readiness < 70
              ? "Good progress. Keep going."
              : "You're interview-ready!"}
          </p>

          <div className="flex gap-6 text-sm">
            <div>
              <span className="font-bold">{total}</span>
              <span className="ml-1 text-gray-500">Interviews</span>
            </div>

            <div>
              <span className="font-bold">{total * 5}</span>
              <span className="ml-1 text-gray-500">Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOPICS */}
      <div className="rounded-2xl border p-6 mb-6">
        <h3 className="font-bold mb-5">Topic Breakdown</h3>

        {topics.map((t) => (
          <div key={t.name} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{t.name}</span>
              <span style={{ color: t.color }}>
                {mounted ? `${t.score}%` : "0%"}
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 rounded-full"
                style={{
                  width: mounted ? `${t.score}%` : "0%",
                  background: t.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Avg Score", val: total ? "7.2/10" : "0", icon: "⭐" },
          { label: "Confidence", val: total ? "82%" : "0", icon: "💪" },
          { label: "Streak", val: total ? `${total}d` : "0", icon: "🔥" },
          { label: "Answers", val: total * 5, icon: "🧠" },
        ].map((s) => (
          <div key={s.label} className="border p-4 rounded-xl">
            <div className="text-xl">{s.icon}</div>
            <div className="text-lg font-bold">
              {mounted ? s.val : "0"}
            </div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && total === 0 && (
        <div className="text-center border p-10 rounded-xl">
          <h3 className="font-bold mb-2">No data yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Start an interview to see analytics.
          </p>
          <Link href="/dashboard" className="underline">
            Go to Dashboard
          </Link>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500">
          Loading analytics...
        </div>
      )}
    </div>
  );
}