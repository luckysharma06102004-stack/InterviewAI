// import Head from "next/head";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const HowItWorks = () => {
//   return (
//     <>
//       <Head>
//         <title>How It Works - AI Mock Interview</title>
//         <meta
//           name="description"
//           content="Learn how our AI Mock Interview works."
//         />
//       </Head>
//       <main className="bg-gray-100 p-8 mt-10">
//         <h1 className="text-4xl font-bold text-center mb-8">How It Works</h1>
//         <section className="space-y-8">
//           <Accordion type="single" collapsible>
//             <AccordionItem value="item-1">
//               <AccordionTrigger>
//                 <h2 className="text-xl md:text-2xl font-semibold mb-4">
//                   Step 1: Prepare for the Interview
//                 </h2>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <p className="text-gray-700">
//                   Get ready by selecting the type of interview and providing
//                   some details about the job position.
//                 </p>
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-2">
//               <AccordionTrigger>
//                 {" "}
//                 <h2 className="text-xl md:text-2xl font-semibold mb-4">
//                   Step 2: Start the AI Interview
//                 </h2>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <p className="text-gray-700">
//                   Our AI will ask you a series of questions and evaluate your
//                   responses in real-time.
//                 </p>
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-3">
//               <AccordionTrigger>
//                 <h2 className="text-xl md:text-2xl font-semibold mb-4">
//                   Step 3: Receive Feedback
//                 </h2>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <p className="text-gray-700">
//                   Get detailed feedback on your performance, including strengths
//                   and areas for improvement.
//                 </p>
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </section>
//       </main>
//     </>
//   );
// };

// export default HowItWorks;




import React from "react";

const steps = [
  {n:"01", icon:"🎯", title:"Create Your Interview", desc:"Enter your target role, tech stack, and experience level. MockInterview AI generates 5 tailored questions using Gemini AI."},
  {n:"02", icon:"🎤", title:"Answer with Real-Time Coaching", desc:'Record your voice answers. The AI coach detects filler words ("um", "like"), hesitations, and gives you live tips as you speak.'},
  {n:"03", icon:"🔄", title:"Get detailed analytics", desc:'After each answer, the AI may ask "Why?", "What if scale is 10×?", or "How would you test this?" — just like a real interviewer.'},
  {n:"04", icon:"📊", title:"Get Detailed Feedback", desc:"Each answer is scored on a 10-point scale with your answer vs. the model answer and specific improvement tips."},
  {n:"05", icon:"📈", title:"Track Your Progress", desc:"Your Analytics Dashboard shows your readiness %, topic weak spots, confidence trends, and filler word count over time."},
];

export default function HowItWorks() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse inline-block"/>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Guide</span>
        </div>
        <h1 className="text-3xl font-black text-foreground">How MockInterview AI Works</h1>
        <p className="text-muted-foreground mt-2">From setup to feedback in 5 simple steps.</p>
      </div>

      <div className="space-y-4">
        {steps.map(s => (
          <div key={s.n}
            className="rounded-2xl border border-border bg-card p-6 flex gap-5 items-start stat-card hover:border-[#7c3aed]/40 transition-all">
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{background:"rgba(124,58,237,0.1)"}}>
              {s.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black font-mono" style={{color:"rgba(124,58,237,0.5)"}}>
                  {s.n}
                </span>
                <h3 className="font-bold text-foreground">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-[#7c3aed]/30 bg-card p-8 text-center">
        <div className="text-4xl mb-3">🚀</div>
        <h3 className="font-black text-lg mb-2 text-foreground">Ready to Start?</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Create your first interview and experience real-time AI coaching.
        </p>
        <a href="/dashboard"
          className="btn-gradient inline-block px-8 py-3 rounded-xl font-bold text-sm text-white">
          Go to Dashboard →
        </a>
      </div>
    </div>
  );
}