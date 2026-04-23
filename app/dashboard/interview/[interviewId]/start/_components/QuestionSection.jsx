"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text to speech.");
    }
  };

  if (!mockInterviewQuestion) return null;

  return (
    <div className="flex flex-col gap-4 p-5 border border-border rounded-2xl bg-card">

      {/* Question number pills */}
      <div className="flex flex-wrap gap-2">
        {mockInterviewQuestion.map((_, index) => (
          <div
            key={index}
            className="px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all"
            style={{
              background: activeQuestionIndex === index
                ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                : 'hsl(var(--secondary))',
              color: activeQuestionIndex === index
                ? '#fff'
                : 'hsl(var(--muted-foreground))',
            }}
          >
            Q{index + 1}
          </div>
        ))}
      </div>

      {/* Current question */}
      <div className="rounded-xl p-5 border border-[#6366f1]/20 bg-[#6366f1]/5">
        <div className="text-xs font-bold text-[#6366f1] mb-3 tracking-wider">
          QUESTION {activeQuestionIndex + 1}
        </div>
        <h2 className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>
      </div>

      {/* Speak button */}
      <button
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#6366f1] transition-colors w-fit"
      >
        <Volume2 size={16} />
        Read question aloud
      </button>

      {/* Tip box */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb size={15} className="text-amber-600" />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400">TIP</span>
        </div>
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || "Take a moment to structure your answer. Use the STAR method: Situation, Task, Action, Result."}
        </p>
      </div>

    </div>
  );
};

export default QuestionSection;