// import { Skeleton } from "@/components/ui/skeleton";

// export default function FeedbackLoading() {
//   return (
//     <div className="p-10">
//       <Skeleton className="h-9 w-64 mb-3" />
//       <Skeleton className="h-7 w-80 mb-3" />
//       <Skeleton className="h-6 w-56 mb-2" />
//       <Skeleton className="h-5 w-96 mb-8" />
//       {[...Array(5)].map((_, i) => (
//         <Skeleton key={i} className="h-10 rounded-lg mt-7" />
//       ))}
//       <Skeleton className="h-10 w-28 rounded-lg mt-6" />
//     </div>
//   );
// }
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <Skeleton className="h-8 w-48" />

      {/* Score card */}
      <div className="rounded-2xl border p-8 space-y-4">
        <Skeleton className="h-10 w-32 mx-auto" />
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-16 w-24 mx-auto" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>

      {/* Questions */}
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-14 rounded-xl" />
      ))}

    </div>
  );
}