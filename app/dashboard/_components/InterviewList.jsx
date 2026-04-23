// "use client";
// import React, { useEffect, useState } from "react";
// import InterviewItemCard from "./InterviewItemCard";
// import { Skeleton } from "@/components/ui/skeleton";

// const InterviewList = () => {
//   const [interviewList, setInterviewList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchInterviews();
//   }, []);

//   const fetchInterviews = async () => {
//     try {
//       const res = await fetch("/api/interviews/list");
//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();
//       setInterviewList(data);
//     } catch {
//       // silently fail — user just won't see the list
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
//           {[...Array(3)].map((_, i) => (
//             <Skeleton key={i} className="h-32 rounded-lg" />
//           ))}
//         </div>
//       ) : interviewList.length === 0 ? (
//         <p className="text-gray-500 my-3">No interviews yet. Create one above!</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
//           {interviewList.map((interview, index) => (
//             <InterviewItemCard key={index} interview={interview} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewList;
"use client";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("/api/interviews/list");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setInterviewList(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-black text-xl text-foreground">
          Previous Mock Interviews
        </h2>
        {!loading && interviewList.length > 0 && (
          <span className="text-xs tag-purple px-2 py-0.5 rounded-full font-semibold">
            {interviewList.length}
          </span>
        )}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="h-36 rounded-xl bg-muted animate-pulse border border-border"
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && interviewList.length === 0 && (
        <div className="rounded-xl p-10 border border-border bg-card text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-bold text-foreground mb-1">
            No interviews yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Create your first AI mock interview above!
          </p>
        </div>
      )}

      {/* Interview grid */}
      {!loading && interviewList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
        </div>
      )}

    </div>
  );
};

export default InterviewList;