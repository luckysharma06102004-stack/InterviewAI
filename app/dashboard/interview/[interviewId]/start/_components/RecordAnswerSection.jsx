// "use client";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { Mic, MicOff, Camera, CameraOff } from "lucide-react";
// import { toast } from "sonner";
// import { WebCamContext } from "@/app/dashboard/layout";

// const RecordAnswerSection = ({
//   mockInterviewQuestion,
//   activeQuestionIndex,
//   interviewData,
// }) => {
//   const [userAnswer, setUserAnswer] = useState("");
//   const [liveTranscript, setLiveTranscript] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [fillerCount, setFillerCount] = useState(0);
//   const [wordCount, setWordCount] = useState(0);
//   const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
//   const recognitionRef = useRef(null);
//   const finalTranscriptRef = useRef("");

//   const FILLERS = ["um", "uh", "like", "basically", "you know", "literally", "so", "actually"];

//   useEffect(() => {
//     setUserAnswer("");
//     setLiveTranscript("");
//     setFillerCount(0);
//     setWordCount(0);
//     finalTranscriptRef.current = "";
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       recognitionRef.current = null;
//     }
//   }, [activeQuestionIndex]);

//   const countFillers = (text) => {
//     const lower = text.toLowerCase();
//     let count = 0;
//     FILLERS.forEach(f => {
//       const matches = lower.match(new RegExp(`\\b${f}\\b`, "gi"));
//       if (matches) count += matches.length;
//     });
//     return count;
//   };

//   const saveAnswer = useCallback(async (answer) => {
//     if (!answer || answer.trim().length <= 10) {
//       toast.error("Answer too short. Please speak more.");
//       return;
//     }
//     if (!interviewData?.mockId || !mockInterviewQuestion?.[activeQuestionIndex]) return;

//     try {
//       setLoading(true);
//       const res = await fetch(`/api/interviews/${interviewData.mockId}/answer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: mockInterviewQuestion[activeQuestionIndex].Question,
//           correctAns: mockInterviewQuestion[activeQuestionIndex].Answer,
//           userAns: answer,
//         }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || "Failed to save answer");
//       }

//       toast.success("Answer saved successfully! ✅");
//       setUserAnswer(answer);
//       setLiveTranscript("");
//     } catch (err) {
//       toast.error(err.message || "Error saving answer.");
//     } finally {
//       setLoading(false);
//     }
//   }, [activeQuestionIndex, interviewData, mockInterviewQuestion]);

//   const startRecording = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       toast.error("Your browser doesn't support speech recognition. Please use Chrome.");
//       return;
//     }

//     finalTranscriptRef.current = "";
//     setLiveTranscript("");
//     setUserAnswer("");
//     setFillerCount(0);
//     setWordCount(0);

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       let interim = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscriptRef.current += transcript + " ";
//         } else {
//           interim = transcript;
//         }
//       }
//       const full = (finalTranscriptRef.current + interim).trim();
//       setLiveTranscript(full);
//       setFillerCount(countFillers(full));
//       setWordCount(full.split(/\s+/).filter(Boolean).length);
//     };

//     recognition.onerror = (e) => {
//       if (e.error !== "no-speech") {
//         toast.error("Speech recognition error: " + e.error);
//       }
//     };

//     recognition.onend = () => {
//       // Auto-restart if still recording
//       if (recognitionRef.current) {
//         try { recognition.start(); } catch {}
//       }
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//     setIsRecording(true);
//   };

//   const stopRecording = async () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.onend = null; // Prevent auto-restart
//       recognitionRef.current.stop();
//       recognitionRef.current = null;
//     }
//     setIsRecording(false);

//     const finalAnswer = finalTranscriptRef.current.trim() || liveTranscript.trim();
//     if (finalAnswer) {
//       await saveAnswer(finalAnswer);
//     } else {
//       toast.error("No speech detected. Please try again.");
//     }
//   };

//   const liveScore = Math.max(1, Math.min(10,
//     10 - (fillerCount * 0.5) + (wordCount > 50 ? 1 : 0)
//   ));

//   return (
//     <div className="flex flex-col gap-4">

//       {/* Camera */}
//       <div className="rounded-2xl overflow-hidden bg-black border border-border relative"
//         style={{aspectRatio:'16/9', display:'flex', alignItems:'center', justifyContent:'center'}}>
//         {webCamEnabled ? (
//           <Webcam mirrored={true} style={{width:'100%', height:'100%', objectFit:'cover'}} />
//         ) : (
//           <div className="text-center text-white/40 p-8">
//             <CameraOff className="w-10 h-10 mx-auto mb-2 opacity-50" />
//             <p className="text-sm">Camera off</p>
//           </div>
//         )}
//         {isRecording && (
//           <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
//             style={{background:'rgba(220,38,38,0.9)'}}>
//             <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
//             REC
//           </div>
//         )}
//       </div>

//       {/* Live coaching panel */}
//       {(isRecording || liveTranscript) && (
//         <div className="rounded-xl border border-border bg-card p-4 space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold text-foreground">🧠 Live Coach</span>
//             {isRecording && <span className="text-xs text-green-500 font-bold animate-pulse">● LISTENING</span>}
//           </div>

//           {/* Metrics */}
//           <div className="grid grid-cols-3 gap-2">
//             {[
//               ['Score', `${liveScore.toFixed(1)}/10`, liveScore >= 7 ? '#22c55e' : liveScore >= 5 ? '#f59e0b' : '#ef4444'],
//               ['Words', wordCount, '#6366f1'],
//               ['Fillers', fillerCount, fillerCount > 3 ? '#ef4444' : '#22c55e'],
//             ].map(([label, val, color]) => (
//               <div key={label} className="rounded-lg p-2 text-center bg-secondary">
//                 <div className="text-xs text-muted-foreground mb-1">{label}</div>
//                 <div className="font-bold text-sm" style={{color}}>{val}</div>
//               </div>
//             ))}
//           </div>

//           {/* Hints */}
//           <div className="text-xs space-y-1">
//             {fillerCount >= 3 && <p className="text-amber-500">💡 Try pausing instead of saying "um" or "like"</p>}
//             {wordCount < 20 && isRecording && <p className="text-blue-500">💬 Keep going — add more detail</p>}
//             {liveScore >= 8 && wordCount > 30 && <p className="text-green-500">✅ Great answer! Clear and structured.</p>}
//           </div>

//           {/* Live transcript */}
//           {liveTranscript && (
//             <div className="text-xs text-muted-foreground bg-secondary rounded-lg p-3 max-h-24 overflow-y-auto">
//               {liveTranscript}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Saved answer */}
//       {userAnswer && !isRecording && (
//         <div className="rounded-xl border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 p-3">
//           <div className="text-xs font-bold text-green-700 dark:text-green-400 mb-1">✅ Answer Saved</div>
//           <p className="text-xs text-green-700 dark:text-green-400">{userAnswer}</p>
//         </div>
//       )}

//       {/* Controls */}
//       <div className="flex gap-3">
//         <Button
//           variant="outline"
//           className="flex-1"
//           onClick={() => setWebCamEnabled(prev => !prev)}
//         >
//           {webCamEnabled
//             ? <><CameraOff className="w-4 h-4 mr-2" />Disable Camera</>
//             : <><Camera className="w-4 h-4 mr-2" />Enable Camera</>
//           }
//         </Button>

//         <Button
//           className="flex-1 font-bold text-white"
//           style={isRecording
//             ? {background:'#dc2626'}
//             : {background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}
//           }
//           onClick={isRecording ? stopRecording : startRecording}
//           disabled={loading}
//         >
//           {isRecording ? (
//             <><MicOff className="w-4 h-4 mr-2" />Stop & Save Answer</>
//           ) : loading ? (
//             "Saving..."
//           ) : (
//             <><Mic className="w-4 h-4 mr-2" />Record Answer</>
//           )}
//         </Button>
//       </div>

//     </div>
//   );
// };

// export default RecordAnswerSection;

// "use client";

// import { Button } from "@/components/ui/button";
// import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { Mic, MicOff, Camera, CameraOff } from "lucide-react";
// import { toast } from "sonner";
// import { WebCamContext } from "@/app/dashboard/layout";

// const RecordAnswerSection = ({
//   mockInterviewQuestion,
//   activeQuestionIndex,
//   interviewData,
// }) => {
//   const [userAnswer, setUserAnswer] = useState("");
//   const [liveTranscript, setLiveTranscript] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [fillerCount, setFillerCount] = useState(0);
//   const [wordCount, setWordCount] = useState(0);
//   const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);

//   const recognitionRef = useRef(null);
//   const isRecordingRef = useRef(false); // tracks recording state for async callbacks
//   const finalTranscriptRef = useRef("");
//   const liveTranscriptRef = useRef("");

//   const FILLERS = ["um", "uh", "like", "basically", "you know", "literally", "so", "actually"];

//   useEffect(() => {
//     return () => {
//       // Cleanup on unmount
//       isRecordingRef.current = false;
//       if (recognitionRef.current) {
//         recognitionRef.current.onend = null;
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     setUserAnswer("");
//     setLiveTranscript("");
//     setFillerCount(0);
//     setWordCount(0);
//     finalTranscriptRef.current = "";
//     liveTranscriptRef.current = "";
//     isRecordingRef.current = false;
//     if (recognitionRef.current) {
//       recognitionRef.current.onend = null;
//       recognitionRef.current.stop();
//       recognitionRef.current = null;
//     }
//     setIsRecording(false);
//   }, [activeQuestionIndex]);

//   const countFillers = (text) => {
//     const lower = text.toLowerCase();
//     let count = 0;
//     FILLERS.forEach(f => {
//       const matches = lower.match(new RegExp(`\\b${f}\\b`, "gi"));
//       if (matches) count += matches.length;
//     });
//     return count;
//   };

//   const saveAnswer = useCallback(async (answer) => {
//     const trimmed = answer?.trim();
//     if (!trimmed || trimmed.length < 5) {
//       toast.error("No answer captured. Please try speaking again.");
//       return;
//     }
//     if (!interviewData?.mockId || !mockInterviewQuestion?.[activeQuestionIndex]) {
//       toast.error("Interview data missing. Please reload the page.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch(`/api/interviews/${interviewData.mockId}/answer`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: mockInterviewQuestion[activeQuestionIndex].Question,
//           correctAns: mockInterviewQuestion[activeQuestionIndex].Answer,
//           userAns: trimmed,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save");

//       toast.success("Answer saved! ✅");
//       setUserAnswer(trimmed);
//       setLiveTranscript("");
//       liveTranscriptRef.current = "";
//     } catch (err) {
//       toast.error(err.message || "Error saving answer.");
//     } finally {
//       setLoading(false);
//     }
//   }, [activeQuestionIndex, interviewData, mockInterviewQuestion]);

//   const createRecognition = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return null;

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event) => {
//       let interim = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const t = event.results[i].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscriptRef.current += t + " ";
//         } else {
//           interim = t;
//         }
//       }
//       const full = (finalTranscriptRef.current + interim).trim();
//       liveTranscriptRef.current = full;
//       setLiveTranscript(full);
//       setFillerCount(countFillers(full));
//       setWordCount(full.split(/\s+/).filter(Boolean).length);
//     };

//     recognition.onerror = (e) => {
//       console.warn("Speech error:", e.error);
//       // network error or aborted — restart if still recording
//       if (e.error === "network" || e.error === "aborted") {
//         if (isRecordingRef.current) {
//           setTimeout(() => {
//             if (isRecordingRef.current) {
//               try {
//                 recognitionRef.current = createRecognition();
//                 recognitionRef.current?.start();
//               } catch {}
//             }
//           }, 300);
//         }
//       }
//     };

//     recognition.onend = () => {
//       // Auto-restart as long as we're still in recording mode
//       if (isRecordingRef.current) {
//         setTimeout(() => {
//           if (isRecordingRef.current) {
//             try {
//               recognitionRef.current = createRecognition();
//               recognitionRef.current?.start();
//             } catch {}
//           }
//         }, 100);
//       }
//     };

//     return recognition;
//   };

//   const startRecording = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       toast.error("Please use Google Chrome for voice recording.");
//       return;
//     }

//     finalTranscriptRef.current = "";
//     liveTranscriptRef.current = "";
//     setLiveTranscript("");
//     setUserAnswer("");
//     setFillerCount(0);
//     setWordCount(0);

//     isRecordingRef.current = true;
//     setIsRecording(true);

//     const recognition = createRecognition();
//     if (!recognition) {
//       toast.error("Could not start speech recognition.");
//       return;
//     }

//     recognitionRef.current = recognition;
//     try {
//       recognition.start();
//     } catch (e) {
//       toast.error("Could not start microphone: " + e.message);
//       isRecordingRef.current = false;
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = async () => {
//     isRecordingRef.current = false;
//     setIsRecording(false);

//     if (recognitionRef.current) {
//       recognitionRef.current.onend = null;
//       recognitionRef.current.onerror = null;
//       try { recognitionRef.current.stop(); } catch {}
//       recognitionRef.current = null;
//     }

//     // Wait a tiny bit for final results to flush
//     await new Promise(r => setTimeout(r, 300));

//     const finalAnswer = finalTranscriptRef.current.trim() || liveTranscriptRef.current.trim();
//     console.log("Captured answer:", finalAnswer); // debug

//     if (finalAnswer && finalAnswer.length >= 5) {
//       await saveAnswer(finalAnswer);
//     } else {
//       toast.error("No speech captured. Make sure your microphone is working and try again.");
//     }
//   };

//   const liveScore = Math.max(1, Math.min(10,
//     10 - (fillerCount * 0.5) + (wordCount > 50 ? 1 : 0)
//   ));

//   return (
//     <div className="flex flex-col gap-4">

//       {/* Camera */}
//       <div
//         className="rounded-2xl overflow-hidden bg-black border border-border relative"
//         style={{ aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         {webCamEnabled ? (
//           <Webcam mirrored={true} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//         ) : (
//           <div className="text-center text-white/40 p-8">
//             <CameraOff className="w-10 h-10 mx-auto mb-2 opacity-50" />
//             <p className="text-sm">Camera off</p>
//           </div>
//         )}
//         {isRecording && (
//           <div
//             className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
//             style={{ background: "rgba(220,38,38,0.9)" }}
//           >
//             <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
//             REC
//           </div>
//         )}
//       </div>

//       {/* Live coaching panel */}
//       {(isRecording || liveTranscript) && (
//         <div className="rounded-xl border border-border bg-card p-4 space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold text-foreground">🧠 Live Coach</span>
//             {isRecording && (
//               <span className="text-xs text-green-500 font-bold animate-pulse">● LISTENING</span>
//             )}
//           </div>

//           <div className="grid grid-cols-3 gap-2">
//             {[
//               ["Score", `${liveScore.toFixed(1)}/10`, liveScore >= 7 ? "#22c55e" : liveScore >= 5 ? "#f59e0b" : "#ef4444"],
//               ["Words", wordCount, "#6366f1"],
//               ["Fillers", fillerCount, fillerCount > 3 ? "#ef4444" : "#22c55e"],
//             ].map(([label, val, color]) => (
//               <div key={label} className="rounded-lg p-2 text-center bg-secondary">
//                 <div className="text-xs text-muted-foreground mb-1">{label}</div>
//                 <div className="font-bold text-sm" style={{ color }}>{val}</div>
//               </div>
//             ))}
//           </div>

//           <div className="text-xs space-y-1">
//             {fillerCount >= 3 && <p className="text-amber-500">💡 Try pausing instead of saying "um" or "like"</p>}
//             {wordCount < 20 && isRecording && <p className="text-blue-500">💬 Keep going — add more detail</p>}
//             {liveScore >= 8 && wordCount > 30 && <p className="text-green-500">✅ Great answer!</p>}
//           </div>

//           {liveTranscript && (
//             <div className="text-xs text-muted-foreground bg-secondary rounded-lg p-3 max-h-32 overflow-y-auto leading-relaxed">
//               {liveTranscript}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Saved answer */}
//       {userAnswer && !isRecording && (
//         <div className="rounded-xl border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 p-3">
//           <div className="text-xs font-bold text-green-700 dark:text-green-400 mb-1">✅ Answer Saved</div>
//           <p className="text-xs text-green-700 dark:text-green-400 leading-relaxed">{userAnswer}</p>
//         </div>
//       )}

//       {/* Controls */}
//       <div className="flex gap-3">
//         <Button
//           variant="outline"
//           className="flex-1"
//           onClick={() => setWebCamEnabled(prev => !prev)}
//         >
//           {webCamEnabled
//             ? <><CameraOff className="w-4 h-4 mr-2" />Disable Camera</>
//             : <><Camera className="w-4 h-4 mr-2" />Enable Camera</>
//           }
//         </Button>

//         <Button
//           className="flex-1 font-bold text-white"
//           style={isRecording ? { background: "#dc2626" } : { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
//           onClick={isRecording ? stopRecording : startRecording}
//           disabled={loading}
//         >
//           {isRecording ? (
//             <><MicOff className="w-4 h-4 mr-2" />Stop & Save Answer</>
//           ) : loading ? (
//             "Saving..."
//           ) : (
//             <><Mic className="w-4 h-4 mr-2" />Record Answer</>
//           )}
//         </Button>
//       </div>

//     </div>
//   );
// };

// export default RecordAnswerSection;







"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Mic, MicOff, Camera, CameraOff } from "lucide-react";
import { toast } from "sonner";
import { WebCamContext } from "@/app/dashboard/layout";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [fillerCount, setFillerCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);

  const recognitionRef = useRef(null);
  const isRecordingRef = useRef(false);
  const finalTranscriptRef = useRef("");
  const liveTranscriptRef = useRef("");

  const FILLERS = ["um", "uh", "like", "basically", "you know", "literally", "so", "actually"];

  useEffect(() => {
    return () => {
      isRecordingRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    setUserAnswer("");
    setLiveTranscript("");
    setFillerCount(0);
    setWordCount(0);
    finalTranscriptRef.current = "";
    liveTranscriptRef.current = "";
    isRecordingRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsRecording(false);
  }, [activeQuestionIndex]);

  const countFillers = (text) => {
    const lower = text.toLowerCase();
    let count = 0;
    FILLERS.forEach(f => {
      const matches = lower.match(new RegExp(`\\b${f}\\b`, "gi"));
      if (matches) count += matches.length;
    });
    return count;
  };

  const saveAnswer = useCallback(async (answer) => {
    const cleanAnswer = typeof answer === "string" ? answer.trim() : "";

    console.log("SAVE ANSWER:", cleanAnswer);

    if (!cleanAnswer || cleanAnswer.length < 5) {
      toast.error("No answer captured. Please try speaking again.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        question: mockInterviewQuestion[activeQuestionIndex].Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex].Answer,
        userAns: cleanAnswer,
      };

      const res = await fetch(`/api/interviews/${interviewData.mockId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setUserAnswer(cleanAnswer);
      setLiveTranscript("");
      toast.success("Answer saved! ✅");

    } catch (err) {
      toast.error(err.message || "Error saving answer.");
    } finally {
      setLoading(false);
    }
  }, [activeQuestionIndex, interviewData, mockInterviewQuestion]);

  const createRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + " ";
        } else {
          interim = transcript;
        }
      }

      const full = (finalTranscriptRef.current + interim).trim();

      console.log("LIVE:", full);

      liveTranscriptRef.current = full;
      setLiveTranscript(full);
      setFillerCount(countFillers(full));
      setWordCount(full.split(/\s+/).filter(Boolean).length);
    };

    recognition.onerror = (e) => {
      console.warn("Speech error:", e.error);
    };

    recognition.onend = () => {
      if (isRecordingRef.current) {
        try {
          recognitionRef.current = createRecognition();
          recognitionRef.current?.start();
        } catch {}
      }
    };

    return recognition;
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Use Google Chrome for voice recording.");
      return;
    }

    finalTranscriptRef.current = "";
    liveTranscriptRef.current = "";
    setLiveTranscript("");
    setUserAnswer("");
    setFillerCount(0);
    setWordCount(0);

    isRecordingRef.current = true;
    setIsRecording(true);

    const recognition = createRecognition();
    if (!recognition) {
      toast.error("Could not start recognition.");
      return;
    }

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      toast.error("Mic error: " + e.message);
      isRecordingRef.current = false;
      setIsRecording(false);
    }
  };

  // ✅ FIXED STOP RECORDING
  const stopRecording = async () => {
    isRecordingRef.current = false;
    setIsRecording(false);

    if (!recognitionRef.current) return;

    const recognition = recognitionRef.current;

    const finalAnswerPromise = new Promise((resolve) => {
      recognition.onend = () => {
        const finalAnswer =
          finalTranscriptRef.current.trim() ||
          liveTranscriptRef.current.trim();

        resolve(finalAnswer);
      };
    });

    try {
      recognition.stop();
    } catch {}

    recognitionRef.current = null;

    const finalAnswer = await finalAnswerPromise;

    console.log("FINAL ANSWER:", finalAnswer);

    if (finalAnswer && finalAnswer.length >= 5) {
      await saveAnswer(finalAnswer);
    } else {
      toast.error("No speech captured. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Camera */}
      <div className="rounded-2xl overflow-hidden bg-black border border-border relative"
        style={{ aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {webCamEnabled ? (
          <Webcam mirrored style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div className="text-center text-white/40 p-8">
            <CameraOff className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Camera off</p>
          </div>
        )}
      </div>

      {/* Transcript */}
      {liveTranscript && (
        <div className="p-3 border rounded text-sm">
          {liveTranscript}
        </div>
      )}

      {/* Saved Answer */}
      {userAnswer && (
        <div className="p-3 border bg-green-100 rounded text-sm">
          ✅ {userAnswer}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <Button onClick={() => setWebCamEnabled(prev => !prev)}>
          {webCamEnabled ? "Disable Camera" : "Enable Camera"}
        </Button>

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
        >
          {isRecording ? "Stop & Save" : "Record Answer"}
        </Button>
      </div>
    </div>
  );
};

export default RecordAnswerSection;