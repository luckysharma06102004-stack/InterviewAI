// "use client";
// import { Lightbulb, WebcamIcon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Webcam from "react-webcam";
// import Link from "next/link";
// import { useContext } from "react";
// import { WebCamContext } from "../../layout";

// const Interview = ({ params }) => {
//   const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
//   const [interviewData, setInterviewData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchInterviewDetails();
//   }, []);

//   const fetchInterviewDetails = async () => {
//     try {
//       const res = await fetch(`/api/interviews/${params.interviewId}`);
//       if (!res.ok) throw new Error("Failed to fetch interview");
//       const data = await res.json();
//       setInterviewData(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="my-10 text-center text-gray-500">Loading interview details...</div>
//     );
//   }

//   if (!interviewData) {
//     return (
//       <div className="my-10 text-center text-red-500">Interview not found.</div>
//     );
//   }

//   return (
//     <div className="my-10">
//       <h2 className="font-bold text-2xl text-center">Let&apos;s Get Started</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="flex flex-col my-5 gap-5">
//           <div className="flex flex-col p-5 rounded-lg border gap-5">
//             <h2 className="text-lg">
//               <strong>Job Role/Job Position: </strong>
//               {interviewData.jobPosition}
//             </h2>
//             <h2 className="text-lg">
//               <strong>Job Description/Job Stack: </strong>
//               {interviewData.jobDesc}
//             </h2>
//             <h2 className="text-lg">
//               <strong>Years of Experience: </strong>
//               {interviewData.jobExperience}
//             </h2>
//           </div>
//           <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
//             <h2 className="flex gap-2 items-center text-yellow-700 mb-2">
//               <Lightbulb />
//               <strong>Information</strong>
//             </h2>
//             <h2 className="mt-3 text-yellow-500">
//               {process.env.NEXT_PUBLIC_INFORMATION}
//             </h2>
//           </div>
//         </div>
//         <div>
//           {webCamEnabled ? (
//             <div className="flex items-center justify-center p-10">
//               <Webcam
//                 onUserMedia={() => setWebCamEnabled(true)}
//                 onUserMediaError={() => setWebCamEnabled(false)}
//                 height={300}
//                 width={300}
//                 mirrored={true}
//               />
//             </div>
//           ) : (
//             <div>
//               <WebcamIcon className="h-72 w-full my-6 p-20 bg-secondary rounded-lg border" />
//             </div>
//           )}
//           <div>
//             <Button
//               className="w-full"
//               onClick={() => setWebCamEnabled((prev) => !prev)}
//             >
//               {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center my-4 md:my-0 md:justify-end md:items-end">
//         <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
//           <Button>Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Interview;


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lightbulb, Mic, Camera, AlertTriangle } from "lucide-react";

const InterviewPage = ({ params }) => {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/interviews/${params.interviewId}`)
      .then(r => r.json())
      .then(setInterview)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.interviewId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 rounded-full border-4 border-[#7c3aed]/20 border-t-[#7c3aed] animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">

      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse inline-block" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            MockInterview AI
          </span>
        </div>
        <h1 className="text-2xl font-black text-foreground">Let's Get Started! 🎯</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Interview details */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-bold text-[#7c3aed] mb-4">Interview Details</h3>
          <div className="space-y-3">
            {[
              { label: "Role",       val: interview?.jobPosition },
              { label: "Stack",      val: interview?.jobDesc },
              { label: "Experience", val: interview?.jobExperience ? `${interview.jobExperience} years` : null },
            ].map(d => d.val && (
              <div key={d.label}>
                <p className="text-xs text-muted-foreground">{d.label}</p>
                <p className="font-semibold text-sm text-foreground">{d.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-2xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-[#7c3aed]" />
            <h3 className="font-bold text-[#7c3aed]">MockInterview AI Features</h3>
          </div>
          <ul className="space-y-2">
            {[
              '🎙️ Live filler word detection ("um", "like")',
              "🔄 Get detailed analytics",
              "📊 Real-time confidence & clarity scoring",
              "⏱️ Pause detection & coaching tips",
              "📈 Analytics tracked to your dashboard",
            ].map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-[#7c3aed] mt-0.5">✓</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Permissions notice */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <h3 className="font-bold text-sm text-foreground">Before You Start</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Allow microphone & camera access for the best experience.
          MockInterview AI needs the mic to coach you in real-time.
        </p>
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground
            px-3 py-2 rounded-lg border border-border bg-background">
            <Mic className="w-3.5 h-3.5 text-[#7c3aed]" />
            Microphone (required)
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground
            px-3 py-2 rounded-lg border border-border bg-background">
            <Camera className="w-3.5 h-3.5 text-[#2563eb]" />
            Camera (optional)
          </div>
        </div>
      </div>

      <Button
        onClick={() => router.push(`/dashboard/interview/${params.interviewId}/start`)}
        className="btn-gradient px-8 py-3 font-bold text-base rounded-xl"
      >
        Start Interview →
      </Button>

    </div>
  );
};

export default InterviewPage;