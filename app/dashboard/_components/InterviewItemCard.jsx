// import React from 'react'
// import { Button } from "@/components/ui/button";
// import { useRouter } from 'next/navigation';

// const InterviewItemCard = ({interview}) => {

//     const router = useRouter()
//     const onStart = ()=>{
//         router.push("/dashboard/interview/"+interview?.mockId)
//     }
//     const onFeedback = ()=>{
//         router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
//     }
//   return (
//     <div className="border border-gray-500 shadow-sm rounded-lg p-3" >
//         <h2 className='font-bold text-primary' >{interview?.jobPosition}</h2>
//         <h2 className='text-sm text-gray-600' >{interview?.jobExperience} Years of experience</h2>
//         <h2 className="text-xs text-gray-400" >Created At:{interview.createdAt}</h2>

//         <div className='flex justify-between mt-2 gap-1 md:gap-5' >
//             <Button variant="super" onClick={onFeedback} size="sm"  className="w-full" >Feedback</Button>
//             <Button variant="superOutline" onClick={onStart} size="sm"  className="w-full">Start</Button>
//         </div>
//     </div>

//   )
// }

// export default InterviewItemCard


"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart    = () => router.push("/dashboard/interview/" + interview?.mockId);
  const onFeedback = () => router.push("/dashboard/interview/" + interview?.mockId + "/feedback");

  return (
    <div className="rounded-xl p-5 border border-border bg-card
      hover:border-[#7c3aed]/30 transition-all stat-card">

      {/* Header */}
      <div className="flex items-start gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#7c3aed] mt-1.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-sm truncate">
            {interview?.jobPosition}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {interview?.jobExperience} years of experience
          </p>
        </div>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-2 mb-4 pl-4">
        <span className="text-xs tag-purple px-2 py-0.5 rounded-full">
          {interview?.jobExperience} yrs exp
        </span>
        <span className="text-xs text-muted-foreground">
          {interview?.createdAt}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={onFeedback}
          variant="outline"
          size="sm"
          className="flex-1 text-xs border-border text-muted-foreground
            hover:border-[#7c3aed]/40 hover:text-[#7c3aed]
            transition-all"
        >
          View Feedback
        </Button>

        <Button
          onClick={onStart}
          size="sm"
          className="flex-1 text-xs btn-gradient font-semibold"
        >
          Start
        </Button>
      </div>

    </div>
  );
};

export default InterviewItemCard;