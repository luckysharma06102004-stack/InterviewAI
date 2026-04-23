// import { UserButton } from "@clerk/nextjs";
// import React from "react";
// import AddNewInterview from "./_components/AddNewInterview";
// import InterviewList from "./_components/InterviewList";

// const Dashboard = () => {
//   return (
//     <div className="p-10" >
//       <h2 className="font-bold text-2xl" >Dashboard</h2>
//       <h2 className="text-gray-500" >Create and start your AI Mockup Interview</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 my-5" >
//         <AddNewInterview/>
//       </div>

//       <InterviewList/>
//     </div>
//   );
// };

// export default Dashboard;



// import React from "react";
// import AddNewInterview from "./_components/AddNewInterview";
// import InterviewList from "./_components/InterviewList";
// import Link from "next/link";

// const Dashboard = () => {
//   return (
//     <div className="p-6 md:p-10">

//       {/* Page header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse inline-block" />
//           <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
//             Mock Interview AI
//           </span>
//         </div>
//         <h1 className="text-3xl font-black text-foreground">Welcome Back 👋</h1>
//         <p className="text-muted-foreground mt-1">
//           Ready to practice? Start a new AI-powered mock interview below.
//         </p>
//       </div>

//       {/* Quick stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         {[
//           { label: "Interviews Done", value: "0", icon: "🎯" },
//           { label: "Avg. Score",      value: "0", icon: "📊" },
//           { label: "Readiness",       value: "0", icon: "🏆" },
//           { label: "Streak",          value: "0", icon: "🔥" },
//         ].map(s => (
//           <div
//             key={s.label}
//             className="rounded-xl p-4 border border-border bg-card stat-card
//               hover:border-[#7c3aed]/30 transition-all"
//           >
//             <div className="text-2xl mb-2">{s.icon}</div>
//             <div className="text-2xl font-black text-muted-foreground">{s.value}</div>
//             <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Action cards row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

//         {/* New Interview */}
//         <AddNewInterview />

//         {/* Analytics shortcut */}
//         <Link
//           href="/dashboard/analytics"
//           className="rounded-xl p-6 border border-border bg-card
//             hover:border-[#7c3aed]/30 transition-all cursor-pointer
//             flex flex-col justify-between group stat-card"
//         >
//           <div className="text-2xl mb-2">📈</div>
//           <div>
//             <h3 className="font-bold text-foreground group-hover:text-[#7c3aed] transition-colors">
//               View Analytics
//             </h3>
//             <p className="text-xs text-muted-foreground mt-1">
//               Scores, trends, readiness %
//             </p>
//           </div>
//         </Link>

//         {/* How it works shortcut */}
//         <Link
//           href="/dashboard/howit"
//           className="rounded-xl p-6 border border-border bg-card
//             hover:border-[#0d9488]/30 transition-all cursor-pointer
//             flex flex-col justify-between group stat-card"
//         >
//           <div className="text-2xl mb-2">💡</div>
//           <div>
//             <h3 className="font-bold text-foreground group-hover:text-[#0d9488] transition-colors">
//               How It Works
//             </h3>
//             <p className="text-xs text-muted-foreground mt-1">
//               Tips for best results
//             </p>
//           </div>
//         </Link>

//       </div>

//       {/* Previous interviews */}
//       <InterviewList />

//     </div>
//   );
// };

// export default Dashboard;








"use client";

import React, { useEffect, useState } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import Link from "next/link";

const Dashboard = () => {
  const [stats, setStats] = useState({
    interviews: 0,
    avgScore: 0,
    readiness: 0,
    streak: 0,
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch stats from backend
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();

        console.log("📊 STATS:", data);

        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse inline-block" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Mock Interview AI
          </span>
        </div>
        <h1 className="text-3xl font-black text-foreground">
          Welcome Back 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to practice? Start a new AI-powered mock interview below.
        </p>
      </div>

      {/* ✅ Dynamic Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Interviews Done", value: stats.interviews, icon: "🎯" },
          { label: "Avg. Score", value: stats.avgScore, icon: "📊" },
          { label: "Readiness", value: `${stats.readiness}%`, icon: "🏆" },
          { label: "Streak", value: stats.streak, icon: "🔥" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 border border-border bg-card
              hover:border-[#7c3aed]/30 transition-all"
          >
            <div className="text-2xl mb-2">{s.icon}</div>

            <div className="text-2xl font-black text-muted-foreground">
              {loading ? "..." : s.value}
            </div>

            <div className="text-xs text-muted-foreground mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <AddNewInterview />

        <Link
          href="/dashboard/analytics"
          className="rounded-xl p-6 border border-border bg-card
            hover:border-[#7c3aed]/30 transition-all cursor-pointer
            flex flex-col justify-between group"
        >
          <div className="text-2xl mb-2">📈</div>
          <div>
            <h3 className="font-bold group-hover:text-[#7c3aed] transition-colors">
              View Analytics
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Scores, trends, readiness %
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/howit"
          className="rounded-xl p-6 border border-border bg-card
            hover:border-[#0d9488]/30 transition-all cursor-pointer
            flex flex-col justify-between group"
        >
          <div className="text-2xl mb-2">💡</div>
          <div>
            <h3 className="font-bold group-hover:text-[#0d9488] transition-colors">
              How It Works
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Tips for best results
            </p>
          </div>
        </Link>

      </div>

      {/* Previous Interviews */}
      <InterviewList />
    </div>
  );
};

export default Dashboard;