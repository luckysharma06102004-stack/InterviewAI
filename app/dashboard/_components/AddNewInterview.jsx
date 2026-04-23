
// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   LoaderCircle,
//   FileText,
//   Briefcase,
//   Upload,
//   X,
//   Sparkles,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const AddNewInterview = () => {
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("manual");

//   const [jobPosition, setJobPosition] = useState("");
//   const [jobDesc, setJobDesc] = useState("");
//   const [jobExperience, setJobExperience] = useState("");

//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumeName, setResumeName] = useState("");
//   const [resumeText, setResumeText] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const reset = () => {
//     setJobPosition("");
//     setJobDesc("");
//     setJobExperience("");
//     setResumeFile(null);
//     setResumeName("");
//     setResumeText("");
//     setError("");
//   };

//   // ✅ Validate mockId is a real UUID before navigating
//   const navigateToInterview = (mockId) => {
//     if (!mockId || typeof mockId !== "string" || !mockId.includes("-")) {
//       setError("Server returned an invalid interview ID. Please try again.");
//       console.error("Bad mockId received:", mockId);
//       return;
//     }
//     setOpen(false);
//     reset();
//     router.push(`/dashboard/interview/${mockId}`);
//   };

//   // ---------------------------
//   // 📄 Resume Upload Handler
//   // ---------------------------
//   const onUploadResume = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Resume must be under 5MB.");
//       return;
//     }

//     if (!["application/pdf", "text/plain"].includes(file.type)) {
//       setError("Only PDF or TXT files are supported.");
//       return;
//     }

//     setResumeFile(file);
//     setResumeName(file.name);
//     setError("");

//     const reader = new FileReader();
//     reader.onload = (evt) => setResumeText(evt.target?.result ?? "");
//     reader.readAsText(file);
//   };

//   const removeResume = () => {
//     setResumeFile(null);
//     setResumeName("");
//     setResumeText("");
//   };

//   // ---------------------------
//   // 🤖 Resume-based Interview
//   // ---------------------------
//   const handleResumeInterview = async () => {
//     if (!resumeFile) {
//       setError("Please upload your resume first.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/interviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobPosition: jobPosition || "Software Developer",
//           jobDesc: resumeText
//             ? `Resume content:\n${resumeText.substring(0, 1000)}\n\nTech Stack: ${jobDesc || "General Software Engineering"}`
//             : jobDesc || "General Software Engineering",
//           jobExperience: jobExperience || "1",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to generate interview.");
//         return;
//       }

//       navigateToInterview(data.mockId);
//     } catch {
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------
//   // ✍️ Manual Interview
//   // ---------------------------
//   const handleManualSubmit = async (e) => {
//     e.preventDefault();

//     if (!jobPosition || !jobDesc || !jobExperience) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/interviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobPosition, jobDesc, jobExperience }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to create interview.");
//         return;
//       }

//       navigateToInterview(data.mockId);
//     } catch {
//       setError("Network error. Please check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ---------------- UI CARD ---------------- */}
//       <div
//         onClick={() => setOpen(true)}
//         className="group cursor-pointer rounded-2xl border-2 border-dashed border-purple-300 bg-white dark:bg-gray-900 hover:border-purple-500 hover:shadow-lg transition-all p-7 text-center"
//       >
//         <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center text-white">
//           <Sparkles size={22} />
//         </div>
//         <div className="font-bold text-lg">Create New Interview</div>
//         <div className="text-sm text-gray-500 mt-1">
//           Manual or AI Resume-Based
//         </div>
//       </div>

//       {/* ---------------- DIALOG ---------------- */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-xl">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">
//               Setup Interview
//             </DialogTitle>
//             <DialogDescription>
//               Choose manual or resume-based generation
//             </DialogDescription>
//           </DialogHeader>

//           {/* MODE SWITCH */}
//           <div className="grid grid-cols-2 gap-3 my-3">
//             <button
//               type="button"
//               onClick={() => setMode("manual")}
//               className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
//                 mode === "manual"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200"
//               }`}
//             >
//               <Briefcase />
//               <span className="text-sm font-semibold">Manual</span>
//             </button>

//             <button
//               type="button"
//               onClick={() => setMode("resume")}
//               className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
//                 mode === "resume"
//                   ? "border-purple-500 bg-purple-50"
//                   : "border-gray-200"
//               }`}
//             >
//               <FileText />
//               <span className="text-sm font-semibold">Resume AI</span>
//             </button>
//           </div>

//           {/* ERROR */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-2 rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* ---------------- FORM ---------------- */}
//           <form onSubmit={handleManualSubmit} className="flex flex-col gap-3">

//             {/* Resume Upload */}
//             {mode === "resume" && (
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Upload Resume (PDF / TXT)
//                 </label>
//                 {!resumeName ? (
//                   <label className="flex items-center gap-3 border border-dashed p-4 rounded-xl cursor-pointer hover:border-purple-500">
//                     <Upload size={18} />
//                     <span className="text-sm text-gray-600">
//                       Click to upload resume
//                     </span>
//                     <input
//                       type="file"
//                       hidden
//                       accept=".pdf,.txt"
//                       onChange={onUploadResume}
//                     />
//                   </label>
//                 ) : (
//                   <div className="flex justify-between items-center p-3 border rounded-xl bg-gray-50">
//                     <span className="text-sm font-medium truncate">
//                       {resumeName}
//                     </span>
//                     <button type="button" onClick={removeResume}>
//                       <X size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             <Input
//               placeholder="Job Role (e.g. Full Stack Developer)"
//               value={jobPosition}
//               onChange={(e) => { setJobPosition(e.target.value); setError(""); }}
//             />

//             <Textarea
//               placeholder="Tech Stack (React, Node.js, etc.)"
//               value={jobDesc}
//               onChange={(e) => { setJobDesc(e.target.value); setError(""); }}
//             />

//             <Input
//               type="number"
//               placeholder="Years of Experience"
//               min="0"
//               max="50"
//               value={jobExperience}
//               onChange={(e) => { setJobExperience(e.target.value); setError(""); }}
//             />

//             {/* ACTION BUTTONS */}
//             <div className="flex gap-3 pt-2">
//               <Button
//                 type="button"
//                 variant="ghost"
//                 onClick={() => { setOpen(false); reset(); }}
//               >
//                 Cancel
//               </Button>

//               {mode === "manual" && (
//                 <Button disabled={loading} type="submit">
//                   {loading ? (
//                     <LoaderCircle className="animate-spin mr-2" />
//                   ) : (
//                     "Start Interview"
//                   )}
//                 </Button>
//               )}

//               {mode === "resume" && (
//                 <Button
//                   type="button"
//                   disabled={loading || !resumeFile}
//                   onClick={handleResumeInterview}
//                   className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
//                 >
//                   {loading ? (
//                     <LoaderCircle className="animate-spin mr-2" />
//                   ) : (
//                     "Generate AI Interview"
//                   )}
//                 </Button>
//               )}
//             </div>

//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// // export default AddNewInterview;
// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   LoaderCircle,
//   FileText,
//   Briefcase,
//   Upload,
//   X,
//   Sparkles,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const AddNewInterview = () => {
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("manual");

//   const [jobPosition, setJobPosition] = useState("");
//   const [jobDesc, setJobDesc] = useState("");
//   const [jobExperience, setJobExperience] = useState("");

//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumeName, setResumeName] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const reset = () => {
//     setJobPosition("");
//     setJobDesc("");
//     setJobExperience("");
//     setResumeFile(null);
//     setResumeName("");
//     setError("");
//   };

//   // ✅ Validate mockId is a real UUID before navigating
//   const navigateToInterview = (mockId) => {
//     if (!mockId || typeof mockId !== "string" || !mockId.includes("-")) {
//       setError("Server returned an invalid interview ID. Please try again.");
//       console.error("Bad mockId received:", mockId);
//       return;
//     }
//     setOpen(false);
//     reset();
//     router.push(`/dashboard/interview/${mockId}`);
//   };

//   // ---------------------------
//   // 📄 Resume Upload Handler
//   // ---------------------------
//   const onUploadResume = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Resume must be under 5MB.");
//       return;
//     }

//     if (!["application/pdf", "text/plain"].includes(file.type)) {
//       setError("Only PDF or TXT files are supported.");
//       return;
//     }

//     setResumeFile(file);
//     setResumeName(file.name);
//     setError("");
//   };

//   const removeResume = () => {
//     setResumeFile(null);
//     setResumeName("");
//   };

//   // ---------------------------
//   // 🤖 Resume-based Interview
//   // ---------------------------
//   const handleResumeInterview = async () => {
//     if (!resumeFile) {
//       setError("Please upload your resume first.");
//       return;
//     }
//     if (!jobPosition?.trim()) {
//       setError("Please enter the job role.");
//       return;
//     }
//     if (!jobExperience?.trim()) {
//       setError("Please enter years of experience.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       // ✅ Send as FormData so server receives the actual file
//       const formData = new FormData();
//       formData.append("jobPosition", jobPosition);
//       formData.append("jobDesc", jobDesc || "General Software Engineering");
//       formData.append("jobExperience", jobExperience);
//       formData.append("resume", resumeFile);

//       const res = await fetch("/api/interviews", {
//         method: "POST",
//         // ✅ Do NOT set Content-Type — browser sets it with boundary automatically
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to generate interview.");
//         return;
//       }

//       navigateToInterview(data.mockId);
//     } catch {
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------
//   // ✍️ Manual Interview
//   // ---------------------------
//   const handleManualSubmit = async (e) => {
//     e.preventDefault();

//     if (!jobPosition || !jobDesc || !jobExperience) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/interviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobPosition, jobDesc, jobExperience }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to create interview.");
//         return;
//       }

//       navigateToInterview(data.mockId);
//     } catch {
//       setError("Network error. Please check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ---------------- UI CARD ---------------- */}
//       <div
//         onClick={() => setOpen(true)}
//         className="group cursor-pointer rounded-2xl border-2 border-dashed border-purple-300 bg-white dark:bg-gray-900 hover:border-purple-500 hover:shadow-lg transition-all p-7 text-center"
//       >
//         <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center text-white">
//           <Sparkles size={22} />
//         </div>
//         <div className="font-bold text-lg">Create New Interview</div>
//         <div className="text-sm text-gray-500 mt-1">
//           Manual or AI Resume-Based
//         </div>
//       </div>

//       {/* ---------------- DIALOG ---------------- */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-xl">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">
//               Setup Interview
//             </DialogTitle>
//             <DialogDescription>
//               Choose manual or resume-based generation
//             </DialogDescription>
//           </DialogHeader>

//           {/* MODE SWITCH */}
//           <div className="grid grid-cols-2 gap-3 my-3">
//             <button
//               type="button"
//               onClick={() => { setMode("manual"); setError(""); }}
//               className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
//                 mode === "manual"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200"
//               }`}
//             >
//               <Briefcase />
//               <span className="text-sm font-semibold">Manual</span>
//             </button>

//             <button
//               type="button"
//               onClick={() => { setMode("resume"); setError(""); }}
//               className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
//                 mode === "resume"
//                   ? "border-purple-500 bg-purple-50"
//                   : "border-gray-200"
//               }`}
//             >
//               <FileText />
//               <span className="text-sm font-semibold">Resume AI</span>
//             </button>
//           </div>

//           {/* ERROR */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-2 rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* ---------------- FORM ---------------- */}
//           <form onSubmit={handleManualSubmit} className="flex flex-col gap-3">

//             {/* Resume Upload — shown only in resume mode */}
//             {mode === "resume" && (
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Upload Resume (PDF / TXT) <span className="text-red-500">*</span>
//                 </label>
//                 {!resumeName ? (
//                   <label className="flex items-center gap-3 border border-dashed p-4 rounded-xl cursor-pointer hover:border-purple-500">
//                     <Upload size={18} />
//                     <span className="text-sm text-gray-600">
//                       Click to upload resume
//                     </span>
//                     <input
//                       type="file"
//                       hidden
//                       accept=".pdf,.txt"
//                       onChange={onUploadResume}
//                     />
//                   </label>
//                 ) : (
//                   <div className="flex justify-between items-center p-3 border rounded-xl bg-green-50 border-green-200">
//                     <div className="flex items-center gap-2">
//                       <FileText size={16} className="text-green-600" />
//                       <span className="text-sm font-medium text-green-700 truncate">
//                         {resumeName}
//                       </span>
//                     </div>
//                     <button type="button" onClick={removeResume}>
//                       <X size={16} className="text-gray-400 hover:text-gray-600" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Job Role */}
//             <Input
//               placeholder="Job Role (e.g. Full Stack Developer) *"
//               value={jobPosition}
//               onChange={(e) => { setJobPosition(e.target.value); setError(""); }}
//             />

//             {/* Tech Stack — optional in resume mode */}
//             <Textarea
//               placeholder={
//                 mode === "resume"
//                   ? "Tech Stack (optional — AI will use your resume)"
//                   : "Tech Stack (React, Node.js, etc.) *"
//               }
//               value={jobDesc}
//               onChange={(e) => { setJobDesc(e.target.value); setError(""); }}
//             />

//             {/* Experience */}
//             <Input
//               type="number"
//               placeholder="Years of Experience *"
//               min="0"
//               max="50"
//               value={jobExperience}
//               onChange={(e) => { setJobExperience(e.target.value); setError(""); }}
//             />

//             {/* ACTION BUTTONS */}
//             <div className="flex gap-3 pt-2">
//               <Button
//                 type="button"
//                 variant="ghost"
//                 onClick={() => { setOpen(false); reset(); }}
//               >
//                 Cancel
//               </Button>

//               {mode === "manual" && (
//                 <Button disabled={loading} type="submit">
//                   {loading ? (
//                     <LoaderCircle className="animate-spin mr-2" />
//                   ) : (
//                     "Start Interview"
//                   )}
//                 </Button>
//               )}

//               {mode === "resume" && (
//                 <Button
//                   type="button"
//                   disabled={loading || !resumeFile}
//                   onClick={handleResumeInterview}
//                   className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
//                 >
//                   {loading ? (
//                     <LoaderCircle className="animate-spin mr-2" />
//                   ) : (
//                     "Generate AI Interview"
//                   )}
//                 </Button>
//               )}
//             </div>

//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default AddNewInterview;








// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   LoaderCircle,
//   FileText,
//   Briefcase,
//   Sparkles,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const AddNewInterview = () => {
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("manual");

//   const [jobPosition, setJobPosition] = useState("");
//   const [jobDesc, setJobDesc] = useState("");
//   const [jobExperience, setJobExperience] = useState("");

//   const [resumeText, setResumeText] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const reset = () => {
//     setJobPosition("");
//     setJobDesc("");
//     setJobExperience("");
//     setResumeText("");
//     setError("");
//   };

//   const navigateToInterview = (mockId) => {
//     if (!mockId || typeof mockId !== "string") {
//       setError("Invalid interview ID");
//       return;
//     }
//     setOpen(false);
//     reset();
//     router.push(`/dashboard/interview/${mockId}`);
//   };

//   // ---------------- MANUAL ----------------
//   const handleManualSubmit = async (e) => {
//     e.preventDefault();

//     if (!jobPosition || !jobDesc || !jobExperience) {
//       setError("Fill all fields");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/interviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobPosition, jobDesc, jobExperience }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error);
//         return;
//       }

//       navigateToInterview(data.mockId);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- RESUME ----------------
//   const handleResumeInterview = async () => {
//     if (!resumeText?.trim()) {
//       setError("Paste your resume");
//       return;
//     }

//     if (!jobPosition || !jobExperience) {
//       setError("Enter job role & experience");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/interviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobPosition,
//           jobDesc: jobDesc || "Software Engineer",
//           jobExperience,
//           resumeText,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error);
//         return;
//       }

//       navigateToInterview(data.mockId);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* CARD */}
//       <div
//         onClick={() => setOpen(true)}
//         className="cursor-pointer border-2 border-dashed p-6 rounded-xl text-center hover:border-purple-500"
//       >
//         <Sparkles className="mx-auto mb-2" />
//         <h2 className="font-bold">Create New Interview</h2>
//         <p className="text-sm text-gray-500">Manual or AI Resume</p>
//       </div>

//       {/* DIALOG */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-xl">
//           <DialogHeader>
//             <DialogTitle>Create Interview</DialogTitle>
//             <DialogDescription>
//               Choose manual or resume mode
//             </DialogDescription>
//           </DialogHeader>

//           {/* MODE */}
//           <div className="flex gap-3 my-3">
//             <button onClick={() => setMode("manual")} className="border p-2 flex-1">
//               Manual
//             </button>
//             <button onClick={() => setMode("resume")} className="border p-2 flex-1">
//               Resume AI
//             </button>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <form onSubmit={handleManualSubmit} className="space-y-3">

//             {/* RESUME INPUT */}
//             {mode === "resume" && (
//               <Textarea
//                 placeholder="Paste your resume here..."
//                 value={resumeText}
//                 onChange={(e) => setResumeText(e.target.value)}
//                 className="min-h-[200px]"
//               />
//             )}

//             <Input
//               placeholder="Job Role"
//               value={jobPosition}
//               onChange={(e) => setJobPosition(e.target.value)}
//             />

//             <Textarea
//               placeholder="Tech stack (optional)"
//               value={jobDesc}
//               onChange={(e) => setJobDesc(e.target.value)}
//             />

//             <Input
//               type="number"
//               placeholder="Experience"
//               value={jobExperience}
//               onChange={(e) => setJobExperience(e.target.value)}
//             />

//             <div className="flex gap-3">
//               <Button type="button" onClick={() => setOpen(false)}>
//                 Cancel
//               </Button>

//               {mode === "manual" && (
//                 <Button disabled={loading} type="submit">
//                   {loading ? "Loading..." : "Start"}
//                 </Button>
//               )}

//               {mode === "resume" && (
//                 <Button
//                   type="button"
//                   onClick={handleResumeInterview}
//                   disabled={loading}
//                 >
//                   {loading ? "Generating..." : "Generate AI"}
//                 </Button>
//               )}
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// // export default AddNewInterview;
// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   LoaderCircle,
//   Briefcase,
//   FileText,
//   Sparkles,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const AddNewInterview = () => {
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("resume");

//   const [jobPosition, setJobPosition] = useState("");
//   const [jobDesc, setJobDesc] = useState("");
//   const [jobExperience, setJobExperience] = useState("");
//   const [resumeText, setResumeText] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const reset = () => {
//     setJobPosition("");
//     setJobDesc("");
//     setJobExperience("");
//     setResumeText("");
//     setError("");
//   };

//   const navigateToInterview = (mockId) => {
//     setOpen(false);
//     reset();
//     router.push(`/dashboard/interview/${mockId}`);
//   };

//   // ---------------- AI INTERVIEW ----------------
//   const handleSubmit = async () => {
//     if (!jobPosition || !jobExperience) {
//       setError("Job role & experience required");
//       return;
//     }

//     if (!resumeText.trim() && !jobDesc.trim()) {
//       setError("Please add resume text or tech stack");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/interviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobPosition,
//           jobDesc,
//           jobExperience,
//           resumeText,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed");
//         return;
//       }

//       navigateToInterview(data.mockId);
//     } catch {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* CARD */}
//       <div
//         onClick={() => setOpen(true)}
//         className="cursor-pointer rounded-2xl border-2 border-dashed border-purple-300 p-6 text-center hover:shadow-xl transition bg-white dark:bg-gray-900"
//       >
//         <Sparkles className="mx-auto mb-2 text-purple-600" />
//         <h2 className="font-bold text-lg">Create AI Interview</h2>
//         <p className="text-sm text-gray-500">
//           Resume-based smart questions
//         </p>
//       </div>

//       {/* DIALOG */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-xl">
//           <DialogHeader>
//             <DialogTitle>Create Interview</DialogTitle>
//             <DialogDescription>
//               AI will generate questions from your resume
//             </DialogDescription>
//           </DialogHeader>

//           {error && (
//             <div className="bg-red-50 text-red-600 p-2 text-sm rounded">
//               {error}
//             </div>
//           )}

//           <div className="space-y-3">
//             <Input
//               placeholder="Job Role (e.g. Full Stack Developer)"
//               value={jobPosition}
//               onChange={(e) => setJobPosition(e.target.value)}
//             />

//             <Textarea
//               placeholder="Tech Stack (optional)"
//               value={jobDesc}
//               onChange={(e) => setJobDesc(e.target.value)}
//             />

//             <Input
//               type="number"
//               placeholder="Years of Experience"
//               value={jobExperience}
//               onChange={(e) => setJobExperience(e.target.value)}
//             />

//             {/* ✅ NEW RESUME TEXT AREA */}
//             <Textarea
//               rows={10}
//               placeholder="Paste your FULL resume here..."
//               value={resumeText}
//               onChange={(e) => setResumeText(e.target.value)}
//               className="min-h-[200px]"
//             />

//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-500"
//             >
//               {loading ? (
//                 <LoaderCircle className="animate-spin" />
//               ) : (
//                 "Generate Interview"
//               )}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default AddNewInterview;
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  LoaderCircle,
  Briefcase,
  FileText,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [open, setOpen] = useState(false);

  // ✅ MODE SWITCH
  const [mode, setMode] = useState("resume"); // "manual" | "resume"

  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [resumeText, setResumeText] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const reset = () => {
    setJobPosition("");
    setJobDesc("");
    setJobExperience("");
    setResumeText("");
    setError("");
  };

  const navigateToInterview = (mockId) => {
    setOpen(false);
    reset();
    router.push(`/dashboard/interview/${mockId}`);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!jobPosition || !jobExperience) {
      setError("Job role & experience required");
      return;
    }

    // Manual mode validation
    if (mode === "manual") {
      if (!jobDesc.trim()) {
        setError("Please add tech stack / job description");
        return;
      }
    }

    // Resume mode validation
    if (mode === "resume") {
      if (!resumeText.trim()) {
        setError("Please paste your resume text");
        return;
      }
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobPosition,
          jobDesc: mode === "manual" ? jobDesc : jobDesc,
          jobExperience,
          resumeText: mode === "resume" ? resumeText : "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate interview");
        return;
      }

      navigateToInterview(data.mockId);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-purple-300 p-6 text-center hover:shadow-xl transition bg-white dark:bg-gray-900"
      >
        <Sparkles className="mx-auto mb-2 text-purple-600" />
        <h2 className="font-bold text-lg">Create AI Interview</h2>
        <p className="text-sm text-gray-500">
          Manual + Resume-based generation
        </p>
      </div>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Interview</DialogTitle>
            <DialogDescription>
              Choose manual or AI resume-based interview
            </DialogDescription>
          </DialogHeader>

          {/* MODE SWITCH */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              type="button"
              onClick={() => setMode("manual")}
              className={`p-3 rounded-xl border flex items-center gap-2 ${
                mode === "manual"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <Briefcase size={16} />
              Manual
            </button>

            <button
              type="button"
              onClick={() => setMode("resume")}
              className={`p-3 rounded-xl border flex items-center gap-2 ${
                mode === "resume"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              <FileText size={16} />
              Resume AI
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 text-red-600 p-2 text-sm rounded">
              {error}
            </div>
          )}

          <div className="space-y-3">

            {/* Job Role */}
            <Input
              placeholder="Job Role (e.g. Full Stack Developer)"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />

            {/* Tech Stack */}
            <Textarea
              placeholder={
                mode === "manual"
                  ? "Tech Stack (React, Node.js, etc.)"
                  : "Tech Stack (optional)"
              }
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />

            {/* Experience */}
            <Input
              type="number"
              placeholder="Years of Experience"
              value={jobExperience}
              onChange={(e) => setJobExperience(e.target.value)}
            />

            {/* Resume TEXT AREA ONLY IN RESUME MODE */}
            {mode === "resume" && (
              <Textarea
                rows={10}
                placeholder="Paste your FULL resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[200px]"
              />
            )}

            {/* BUTTON */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Generate Interview"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewInterview;