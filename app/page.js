// import React from 'react'
// import Contect from './_components/Contect';
// import Link from 'next/link';

// export const metadata = {
//   title: 'AI Mock Interview',
//   description: 'Ace your next interview with AI-powered mock interviews and get personalized feedback.',
// };

// const page = () => {
//   return (
//     <>
//       <main className="min-h-screen">
//         {/* Header Section */}
//         <header className="w-full py-8 bg-gray-100 shadow-md">
//           <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
//             <h1 className="text-3xl font-bold text-primary">AI Mock Interview</h1>
//             <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-4">
//               {}

//               <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
//                 <a href="#features" className="text-lg text-gray-800 mx-2 md:mx-4">Features</a>
//                 <a href="#testimonials" className="text-lg text-gray-800 mx-2 md:mx-4">Testimonials</a>
//                 <a href="#contact" className="text-lg text-gray-800 mx-2 md:mx-4">Contact</a>
//               </div>
//             </nav>
//           </div>
//         </header>

//         {/* Hero Section */}
//         <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-gray-900 to-gray-400  px-6 md:px-0">
//           <h2 className="text-4xl md:text-5xl font-bold text-white">Ace Your Next Interview</h2>
//           <p className="mt-4 text-lg md:text-xl text-white ">Practice with AI-powered mock interviews and get personalized feedback</p>
//           <div className="mt-6 flex flex-col md:flex-row">
//             <a
//               href="/dashboard"
//               className="px-6 py-3 mb-4 md:mb-0 md:mr-4 text-lg font-semibold bg-white !text-primary-600 rounded-lg shadow-lg hover:bg-gray-100"
//             >
//               Get Started
//             </a>
//             <a
//               href="#features"
//               className="px-6 py-3 text-lg font-semibold border border-white rounded-lg hover:bg-white hover:text-black-600"
//             >
//               Learn More
//             </a>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="py-16 bg-white px-6 md:px-0">
//           <div className="container mx-auto text-center">
//             <h2 className="text-4xl font-bold text-gray-800">Features</h2>
//             <p className="mt-4 text-lg text-gray-800">
//               Our AI Mock Interview platform offers a range of powerful features:
//             </p>
//             <div className="flex flex-wrap justify-center mt-8">
//               <div className="w-full md:w-1/3 px-4 py-8">
//                 <div className="bg-blue-100 rounded-lg p-6 shadow-md">
//                   <h3 className="text-2xl font-semibold text-black-600">AI Mock Interviews</h3>
//                   <p className="mt-2 text-gray-600">Experience realistic interview scenarios with our advanced AI.</p>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/3 px-4 py-8">
//                 <div className="bg-blue-100 rounded-lg p-6 shadow-md">
//                   <h3 className="text-2xl font-semibold text-black-600">Instant Feedback</h3>
//                   <p className="mt-2 text-gray-600">Get instant, personalized feedback to improve your performance.</p>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/3 px-4 py-8">
//                 <div className="bg-blue-100 rounded-lg p-6 shadow-md">
//                   <h3 className="text-2xl font-semibold text-black-600">Comprehensive Reports</h3>
//                   <p className="mt-2 text-gray-600">Receive detailed reports highlighting your strengths and weaknesses.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section id="testimonials" className="py-16 bg-gray-50 px-6 md:px-0">
//           <div className="container mx-auto text-center">
//             <h2 className="text-4xl font-bold text-gray-800">What Our Users Say</h2>
//             <div className="flex flex-wrap justify-center mt-8">
//               <div className="w-full md:w-1/2 px-4 py-8">
//                 <div className="bg-white rounded-lg p-6 shadow-md">
//                   <p className="text-gray-600">
//                     "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview."
//                   </p>
//                   <h4 className="mt-4 text-lg font-semibold text-blue-600">- Alex Johnson</h4>
//                 </div>
//               </div>
//               <div className="w-full md:w-1/2 px-4 py-8">
//                 <div className="bg-white rounded-lg p-6 shadow-md">
//                   <p className="text-gray-600">
//                     "The feedback was spot on and helped me improve my answers. Highly recommend this service!"
//                   </p>
//                   <h4 className="mt-4 text-lg font-semibold text-blue-600">- Sarah Williams</h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Contact Section */}
//         <section id="contact" className="py-16 bg-white px-6 md:px-0">
//           <Contect />
//         </section>
//       </main>

//       <footer className="py-8 bg-black text-white text-center">
//         <p>© 2024 AI Mock Interview. All rights reserved.</p>
//       </footer>
//     </>
//   )
// }

// export default page



// "use client";
// import React from 'react'
// import Link from 'next/link'

// export default function Home() {
//   return (
//     <main style={{background:'#ffffff', color:'#0f172a', fontFamily:'Outfit, sans-serif', minHeight:'100vh'}}>

//       {/* HEADER */}
//       <header style={{borderBottom:'1px solid #f1f5f9', background:'rgba(255,255,255,0.95)', backdropFilter:'blur(10px)', position:'sticky', top:0, zIndex:50}}>
//         <div style={{maxWidth:'1100px', margin:'0 auto', padding:'0 24px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
//           <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
//             <div style={{width:36, height:36, borderRadius:'10px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:'0.9rem'}}>AI</div>
//             <span style={{fontWeight:800, fontSize:'1.1rem', color:'#0f172a', letterSpacing:'-0.02em'}}>Mock<span style={{color:'#6366f1'}}>Interview</span></span>
//           </div>
//           <nav style={{display:'flex', alignItems:'center', gap:'8px'}}>
//             <a href="#features" style={{padding:'8px 16px', borderRadius:'8px', color:'#64748b', fontSize:'0.9rem', textDecoration:'none', fontWeight:500}}>Features</a>
//             <a href="#howitworks" style={{padding:'8px 16px', borderRadius:'8px', color:'#64748b', fontSize:'0.9rem', textDecoration:'none', fontWeight:500}}>How it Works</a>
//             <Link href="/dashboard" style={{padding:'9px 20px', borderRadius:'9px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', fontSize:'0.9rem', textDecoration:'none', fontWeight:700, marginLeft:'8px'}}>
//               Get Started →
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* HERO */}
//       <section style={{padding:'80px 24px 60px', textAlign:'center', maxWidth:'900px', margin:'0 auto'}}>
//         <div style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'99px', background:'#f0f0ff', border:'1px solid #c7d2fe', color:'#4f46e5', fontSize:'0.8rem', fontWeight:600, marginBottom:'28px'}}>
//           <span style={{width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block'}}></span>
//           AI-Powered · Real-Time Feedback · Manual Job Role Based Interviews · Resume-Based Interviews
//         </div>

//         <h1 style={{fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:900, lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:'20px', color:'#0f172a'}}>
//           The Smartest Way to
//           <br />
//           <span style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
//             Prepare for Interviews
//           </span>
//         </h1>

//         <p style={{fontSize:'1.1rem', color:'#64748b', maxWidth:'600px', margin:'0 auto 36px', lineHeight:1.7}}>
//           Practice with AI that adapts to your resume, gives real-time feedback,
//           and scores your answers live as you speak.
//         </p>

//         <div style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
//           <Link href="/dashboard" style={{padding:'14px 32px', borderRadius:'12px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 24px rgba(99,102,241,0.35)'}}>
//             Start Free Interview →
//           </Link>
//           <a href="#howitworks" style={{padding:'14px 32px', borderRadius:'12px', border:'1.5px solid #e2e8f0', color:'#475569', fontWeight:600, fontSize:'1rem', textDecoration:'none'}}>
//             See How It Works
//           </a>
//         </div>

//         {/* Stats */}
//         <div style={{display:'flex', justifyContent:'center', gap:'48px', marginTop:'56px', flexWrap:'wrap'}}>
//   {[
//     ['🚀', 'Fast Setup', 'Get started in under 5 minutes'],
//     ['🧠', 'AI Powered', 'Real interview simulation with feedback'],
//     ['🎯', 'Skill Focused', 'Practice based on your resume & role']
//   ].map(([icon, v, l]) => (
//     <div key={l} style={{textAlign:'center'}}>
//       <div style={{fontSize:'1.8rem'}}>{icon}</div>
//       <div style={{fontSize:'1.2rem', fontWeight:900, color:'#6366f1', marginTop:'6px'}}>
//         {v}
//       </div>
//       <div style={{fontSize:'0.78rem', color:'#94a3b8', marginTop:'2px'}}>
//         {l}
//       </div>
//     </div>
//   ))}
// </div>

//         {/* Preview card */}
//         <div style={{marginTop:'60px', borderRadius:'20px', border:'1px solid #e2e8f0', boxShadow:'0 20px 60px rgba(0,0,0,0.08)', overflow:'hidden', textAlign:'left', maxWidth:'640px', marginLeft:'auto', marginRight:'auto'}}>
//           <div style={{padding:'12px 20px', background:'#f8fafc', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', gap:'8px'}}>
//             <div style={{width:10,height:10,borderRadius:'50%',background:'#fca5a5'}}/>
//             <div style={{width:10,height:10,borderRadius:'50%',background:'#fcd34d'}}/>
//             <div style={{width:10,height:10,borderRadius:'50%',background:'#86efac'}}/>
//             <span style={{marginLeft:'auto', fontSize:'0.72rem', color:'#94a3b8', fontWeight:600}}>Live Interview Session</span>
//           </div>
//           <div style={{padding:'20px', background:'#fff'}}>
//             <div style={{padding:'14px 16px', borderRadius:'12px', background:'#f5f3ff', border:'1px solid #ede9fe', marginBottom:'16px'}}>
//               <div style={{fontSize:'0.68rem', fontWeight:700, color:'#7c3aed', marginBottom:'6px', letterSpacing:'0.05em'}}>🤖 AI INTERVIEWER</div>
//               <div style={{fontSize:'0.92rem', color:'#1e1b4b', lineHeight:1.5}}>Describe a challenging project you built. What was your approach and what did you learn?</div>
//             </div>
//             <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px'}}>
//               {[['Live Score','8.4/10','#22c55e'],['Filler Words','2 detected','#f59e0b'],['Words','94 spoken','#6366f1']].map(([label,val,color]) => (
//                 <div key={label} style={{padding:'12px', borderRadius:'10px', background:'#f8fafc', border:'1px solid #f1f5f9', textAlign:'center'}}>
//                   <div style={{fontSize:'0.65rem', color:'#94a3b8', marginBottom:'4px', fontWeight:600}}>{label}</div>
//                   <div style={{fontWeight:800, color, fontSize:'0.95rem'}}>{val}</div>
//                 </div>
//               ))}
//             </div>
//             <div style={{marginTop:'12px', padding:'10px 14px', borderRadius:'10px', background:'#f0fdf4', border:'1px solid #bbf7d0', fontSize:'0.78rem', color:'#15803d', fontWeight:500}}>
//               ✅ Strong answer! Try to reduce filler words — pause briefly instead of saying "um".
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section id="features" style={{padding:'80px 24px', background:'#f8fafc'}}>
//         <div style={{maxWidth:'1100px', margin:'0 auto'}}>
//           <div style={{textAlign:'center', marginBottom:'56px'}}>
//             <div style={{display:'inline-block', padding:'4px 14px', borderRadius:'99px', background:'#ede9fe', color:'#7c3aed', fontSize:'0.75rem', fontWeight:700, marginBottom:'14px', letterSpacing:'0.05em'}}>FEATURES</div>
//             <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, color:'#0f172a', letterSpacing:'-0.02em', marginBottom:'12px'}}>
//               Everything You Need to <span style={{color:'#6366f1'}}>Get Placed</span>
//             </h2>
//             <p style={{color:'#64748b', fontSize:'1rem', maxWidth:'500px', margin:'0 auto'}}>Features built specifically for placement season</p>
//           </div>

//           <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'20px'}}>
//             {[
//               {icon:'🤖', title:'AI Mock Interviews', desc:'Practice with an AI interviewer that asks role-specific questions, adapts to your responses, and simulates real interview pressure.', color:'#6366f1', bg:'#eef2ff'},
//               {icon:'📄', title:'Resume-Based Interview', desc:'Upload your resume and get a fully personalized interview tailored to your skills, projects, and experience gaps.', color:'#7c3aed', bg:'#f5f3ff', badge:'NEW'},
//               {icon:'⚡', title:'Instant Deep Feedback', desc:'Receive a score out of 10 after every answer along with ideal responses, improvement tips, and filler word analysis.', color:'#0891b2', bg:'#ecfeff'},
//               {icon:'🎙️', title:'Real-Time Live Coaching', desc:'Get live feedback and continuously updates your performance score.', color:'#059669', bg:'#f0fdf4'},
//               {icon:'📊', title:'Comprehensive Reports', desc:'Get a full interview report with per-question breakdown, overall rating, and targeted improvement suggestions.', color:'#d97706', bg:'#fffbeb'},
//               {icon:'🔊', title:'Voice Mode', desc:'AI reads questions aloud and listens to your spoken answers. Closest thing to a real interview experience you can get.', color:'#dc2626', bg:'#fef2f2'},
//             ].map(f => (
//               <FeatureCard key={f.title} {...f} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section id="howitworks" style={{padding:'80px 24px', background:'#fff'}}>
//         <div style={{maxWidth:'900px', margin:'0 auto', textAlign:'center'}}>
//           <div style={{display:'inline-block', padding:'4px 14px', borderRadius:'99px', background:'#f0fdf4', color:'#15803d', fontSize:'0.75rem', fontWeight:700, marginBottom:'14px', letterSpacing:'0.05em'}}>HOW IT WORKS</div>
//           <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, color:'#0f172a', letterSpacing:'-0.02em', marginBottom:'48px'}}>
//             Interview Ready in <span style={{color:'#6366f1'}}>4 Simple Steps</span>
//           </h2>
//           <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px'}}>
//             {[
//               {n:'1', icon:'⚙️', title:'Set Up Your Interview', desc:'Choose your role and experience level, or upload your resume for a personalised session.'},
//               {n:'2', icon:'🎤', title:'Answer Questions', desc:'AI conducts your interview via voice or text, simulating real-world pressure in a safe practice environment.'},
//               {n:'3', icon:'🧠', title:'Get Live Scores', desc:'Watch your score, filler words, and hints update in real-time as you speak.'},
//               {n:'4', icon:'📈', title:'Review & Improve', desc:'Get a full report, see the ideal answers, and track your improvement over sessions.'},
//             ].map((s) => (
//               <div key={s.n} style={{padding:'24px 16px', borderRadius:'16px', border:'1px solid #f1f5f9', background:'#fafafa'}}>
//                 <div style={{width:48, height:48, borderRadius:'14px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', margin:'0 auto 14px'}}>
//                   {s.icon}
//                 </div>
//                 <div style={{fontSize:'0.65rem', fontWeight:800, color:'#a5b4fc', letterSpacing:'0.1em', marginBottom:'8px'}}>STEP {s.n}</div>
//                 <h3 style={{fontWeight:700, fontSize:'0.95rem', color:'#0f172a', marginBottom:'8px'}}>{s.title}</h3>
//                 <p style={{color:'#64748b', fontSize:'0.82rem', lineHeight:1.6}}>{s.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section style={{padding:'80px 24px', background:'#f8fafc'}}>
//         <div style={{maxWidth:'600px', margin:'0 auto', textAlign:'center', padding:'56px 40px', borderRadius:'24px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow:'0 20px 60px rgba(99,102,241,0.3)'}}>
//           <div style={{fontSize:'2.8rem', marginBottom:'16px'}}>🚀</div>
//           <h2 style={{fontSize:'2rem', fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:'12px'}}>Ready to Get Placed?</h2>
//           <p style={{color:'rgba(255,255,255,0.75)', fontSize:'1rem', marginBottom:'28px'}}>Free to use. No credit card. Start in under 2 minutes.</p>
//           <Link href="/dashboard" style={{display:'inline-block', padding:'14px 36px', borderRadius:'12px', background:'#fff', color:'#6366f1', fontWeight:800, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 16px rgba(0,0,0,0.15)'}}>
//             Launch Your First Interview →
//           </Link>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer style={{borderTop:'1px solid #f1f5f9', padding:'32px 24px', textAlign:'center', background:'#fff'}}>
//         <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'8px'}}>
//           <div style={{width:28,height:28,borderRadius:'8px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:'0.75rem'}}>AI</div>
//           <span style={{fontWeight:700, color:'#475569', fontSize:'0.95rem'}}>Mock<span style={{color:'#6366f1'}}>Interview</span></span>
//         </div>
//         <p style={{color:'#94a3b8', fontSize:'0.82rem'}}>© 2025 AI Mock Interview. Built for placement season.</p>
//       </footer>

//     </main>
//   )
// }

// // Separate client component for hover effects on feature cards
// function FeatureCard({ icon, title, desc, bg, badge }) {
//   const [hovered, setHovered] = React.useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: '#fff',
//         borderRadius: '16px',
//         padding: '24px',
//         border: hovered ? '1px solid #c7d2fe' : '1px solid #f1f5f9',
//         boxShadow: hovered ? '0 8px 30px rgba(99,102,241,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
//         transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
//         transition: 'all 0.2s',
//         position: 'relative',
//         overflow: 'hidden',
//         cursor: 'default',
//       }}
//     >
//       {badge && (
//         <div style={{position:'absolute', top:16, right:16, padding:'2px 10px', borderRadius:'99px', background:'#6366f1', color:'#fff', fontSize:'0.65rem', fontWeight:800}}>
//           {badge}
//         </div>
//       )}
//       <div style={{width:44, height:44, borderRadius:'12px', background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', marginBottom:'14px'}}>
//         {icon}
//       </div>
//       <h3 style={{fontWeight:700, fontSize:'1rem', color:'#0f172a', marginBottom:'8px'}}>{title}</h3>
//       <p style={{color:'#64748b', fontSize:'0.85rem', lineHeight:1.65}}>{desc}</p>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <main style={{background:'#ffffff', color:'#0f172a', fontFamily:'"DM Sans", Outfit, system-ui, sans-serif', minHeight:'100vh', overflowX:'hidden'}}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .hero-title { animation: fadeUp 0.7s ease both; }
        .hero-sub { animation: fadeUp 0.7s 0.15s ease both; }
        .hero-btns { animation: fadeUp 0.7s 0.25s ease both; }
        .hero-stats { animation: fadeUp 0.7s 0.35s ease both; }
        .hero-card { animation: fadeUp 0.8s 0.45s ease both; }
        .float-card { animation: float 4s ease-in-out infinite; }
        .feature-card:hover { transform:translateY(-4px) !important; border-color:#c7d2fe !important; box-shadow:0 12px 40px rgba(99,102,241,0.14) !important; }
        .feature-card { transition: all 0.22s ease !important; }
        .step-card:hover { background:#fafafa !important; }
        .nav-link:hover { background:#f8fafc; color:#0f172a !important; }
      `}</style>

      {/* HEADER */}
      <header style={{borderBottom:'1px solid #f1f5f9', background:'rgba(255,255,255,0.96)', backdropFilter:'blur(12px)', position:'sticky', top:0, zIndex:50}}>
        <div style={{maxWidth:'1100px', margin:'0 auto', padding:'0 24px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <div style={{width:36, height:36, borderRadius:'10px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:'0.88rem', boxShadow:'0 4px 12px rgba(99,102,241,0.3)'}}>AI</div>
            <span style={{fontWeight:800, fontSize:'1.1rem', color:'#0f172a', letterSpacing:'-0.02em'}}>Mock<span style={{color:'#6366f1'}}>Interview</span></span>
          </div>
          <nav style={{display:'flex', alignItems:'center', gap:'4px'}}>
            <a href="#features" className="nav-link" style={{padding:'8px 14px', borderRadius:'8px', color:'#64748b', fontSize:'0.88rem', textDecoration:'none', fontWeight:500, transition:'all 0.15s'}}>Features</a>
            <a href="#howitworks" className="nav-link" style={{padding:'8px 14px', borderRadius:'8px', color:'#64748b', fontSize:'0.88rem', textDecoration:'none', fontWeight:500, transition:'all 0.15s'}}>How it Works</a>
            <Link href="/dashboard" style={{padding:'9px 20px', borderRadius:'9px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', fontSize:'0.88rem', textDecoration:'none', fontWeight:700, marginLeft:'8px', boxShadow:'0 4px 14px rgba(99,102,241,0.35)', transition:'opacity 0.15s'}}>
              Get Started →
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{padding:'88px 24px 64px', textAlign:'center', maxWidth:'920px', margin:'0 auto', position:'relative'}}>

        {/* Soft glow blob */}
        <div style={{position:'absolute', top:'0', left:'50%', transform:'translateX(-50%)', width:'700px', height:'500px', background:'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 65%)', pointerEvents:'none', zIndex:0}} />

        <div className="hero-title" style={{position:'relative', zIndex:1}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'99px', background:'#f0f0ff', border:'1px solid #c7d2fe', color:'#4f46e5', fontSize:'0.78rem', fontWeight:700, marginBottom:'28px', letterSpacing:'0.02em'}}>
            <span style={{width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 0 2px rgba(34,197,94,0.2)'}}></span>
            AI-Powered · Resume-Based · Voice Answers · Instant Scoring
          </div>

          <h1 style={{fontSize:'clamp(2.5rem,5.5vw,4.2rem)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.04em', marginBottom:'20px', color:'#0f172a'}}>
            The Smartest Way to
            <br />
            <span style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
              Ace Your Interviews
            </span>
          </h1>
        </div>

        <p className="hero-sub" style={{position:'relative', zIndex:1, fontSize:'1.08rem', color:'#64748b', maxWidth:'580px', margin:'0 auto 36px', lineHeight:1.75}}>
          Enter your job role or upload your resume. Get 5 tailored AI questions,
          record your answers by voice or text, and receive an instant score with detailed feedback.
        </p>

        <div className="hero-btns" style={{position:'relative', zIndex:1, display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
          <Link href="/dashboard" style={{padding:'14px 32px', borderRadius:'12px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 6px 28px rgba(99,102,241,0.38)', transition:'transform 0.15s'}}>
            Start Free Interview →
          </Link>
          <a href="#howitworks" style={{padding:'14px 32px', borderRadius:'12px', border:'1.5px solid #e2e8f0', color:'#475569', fontWeight:600, fontSize:'1rem', textDecoration:'none', background:'#fff'}}>
            See How It Works
          </a>
        </div>

        {/* Real stats */}
        <div className="hero-stats" style={{position:'relative', zIndex:1, display:'flex', justifyContent:'center', gap:'40px', marginTop:'52px', flexWrap:'wrap'}}>
          {[
            ['📄', 'Resume-Based', 'Questions from your actual PDF'],
            ['🎙️', 'Voice Recording', 'Speak your answers naturally'],
            ['⚡', '10-point Scoring', 'AI rates every answer instantly'],
          ].map(([icon, v, l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:'1.7rem'}}>{icon}</div>
              <div style={{fontSize:'1.05rem', fontWeight:800, color:'#6366f1', marginTop:'6px'}}>{v}</div>
              <div style={{fontSize:'0.76rem', color:'#94a3b8', marginTop:'3px'}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Preview card — shows actual app flow */}
        <div className="hero-card float-card" style={{position:'relative', zIndex:1, marginTop:'60px', borderRadius:'20px', border:'1px solid #e2e8f0', boxShadow:'0 24px 70px rgba(0,0,0,0.09)', overflow:'hidden', textAlign:'left', maxWidth:'620px', marginLeft:'auto', marginRight:'auto'}}>
          <div style={{padding:'12px 20px', background:'#f8fafc', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', gap:'8px'}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:'#fca5a5'}}/>
            <div style={{width:10,height:10,borderRadius:'50%',background:'#fcd34d'}}/>
            <div style={{width:10,height:10,borderRadius:'50%',background:'#86efac'}}/>
            <span style={{marginLeft:'auto', fontSize:'0.7rem', color:'#94a3b8', fontWeight:600}}>AI Interview Session · Question 3 of 5</span>
          </div>
          <div style={{padding:'20px', background:'#fff'}}>
            {/* AI Question */}
            <div style={{padding:'14px 16px', borderRadius:'12px', background:'#f5f3ff', border:'1px solid #ede9fe', marginBottom:'14px'}}>
              <div style={{fontSize:'0.65rem', fontWeight:700, color:'#7c3aed', marginBottom:'6px', letterSpacing:'0.06em'}}>🤖 AI INTERVIEWER</div>
              <div style={{fontSize:'0.9rem', color:'#1e1b4b', lineHeight:1.55}}>Your resume mentions a React dashboard project — walk me through your state management decisions and why you chose that approach.</div>
            </div>
            {/* Answer recorded */}
            <div style={{padding:'10px 14px', borderRadius:'10px', background:'#f8fafc', border:'1px solid #e2e8f0', marginBottom:'14px', display:'flex', alignItems:'center', gap:'8px'}}>
              <span style={{fontSize:'1rem'}}>🎙️</span>
              <span style={{fontSize:'0.82rem', color:'#475569', fontWeight:500}}>Answer recorded · <strong style={{color:'#0f172a'}}>52 words</strong> transcribed</span>
              <span style={{marginLeft:'auto', padding:'3px 10px', borderRadius:'99px', background:'#f0fdf4', border:'1px solid #bbf7d0', fontSize:'0.68rem', color:'#16a34a', fontWeight:700}}>✓ Saved</span>
            </div>
            {/* Score + Feedback */}
            <div style={{display:'grid', gridTemplateColumns:'100px 1fr', gap:'12px', alignItems:'stretch'}}>
              <div style={{padding:'16px 12px', borderRadius:'12px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(99,102,241,0.25)'}}>
                <div style={{fontSize:'0.62rem', color:'rgba(255,255,255,0.7)', fontWeight:700, letterSpacing:'0.06em', marginBottom:'6px'}}>SCORE</div>
                <div style={{fontSize:'2rem', fontWeight:900, color:'#fff', lineHeight:1}}>8<span style={{fontSize:'1rem', color:'rgba(255,255,255,0.6)'}}>/10</span></div>
              </div>
              <div style={{padding:'14px 16px', borderRadius:'12px', background:'#f0fdf4', border:'1px solid #bbf7d0'}}>
                <div style={{fontSize:'0.62rem', fontWeight:700, color:'#16a34a', letterSpacing:'0.06em', marginBottom:'6px'}}>🤖 AI FEEDBACK</div>
                <p style={{fontSize:'0.82rem', color:'#14532d', lineHeight:1.55, margin:0}}>Good depth on context. Strengthen your answer by mentioning a specific trade-off you considered.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{padding:'88px 24px', background:'#f8fafc'}}>
        <div style={{maxWidth:'1100px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom:'56px'}}>
            <div style={{display:'inline-block', padding:'4px 14px', borderRadius:'99px', background:'#ede9fe', color:'#7c3aed', fontSize:'0.73rem', fontWeight:700, marginBottom:'14px', letterSpacing:'0.06em'}}>FEATURES</div>
            <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, color:'#0f172a', letterSpacing:'-0.03em', marginBottom:'12px'}}>
              Everything You Need to <span style={{color:'#6366f1'}}>Get Placed</span>
            </h2>
            <p style={{color:'#64748b', fontSize:'0.98rem', maxWidth:'480px', margin:'0 auto'}}>Built specifically for placement season</p>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'18px'}}>
            {[
              {icon:'🤖', title:'AI Mock Interviews', desc:'Enter your job role and tech stack. Groq AI generates 5 tailored interview questions and evaluates every single answer you give.', bg:'#eef2ff'},
              {icon:'📄', title:'Resume-Based Questions', desc:'Upload your PDF resume and get questions that directly reference your actual projects, tech stack, and work experience.', bg:'#f5f3ff', badge:'NEW'},
              {icon:'🎙️', title:'Voice Recording', desc:'Hit record and speak your answer. Your voice is transcribed automatically and sent to AI for evaluation — just like a real interview.', bg:'#f0fdf4'},
              {icon:'⚡', title:'Instant AI Scoring', desc:'Every answer gets a score out of 10 , along with specific improvement tips — delivered immediately after you submit.', bg:'#ecfeff'},
              {icon:'📊', title:'Full Feedback Report', desc:'After all 5 questions, get a complete report: overall rating, your answer vs model answer, and AI feedback for every question.', bg:'#fffbeb'},
              {icon:'🔒', title:'Secure & Personal', desc:'Your interviews are tied to your Clerk account  Only you can access your results and history.', bg:'#fef2f2'},
            ].map(f => (
              <div key={f.title} className="feature-card" style={{background:'#fff', borderRadius:'16px', padding:'24px', border:'1px solid #f1f5f9', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', position:'relative', cursor:'default'}}>
                {f.badge && (
                  <div style={{position:'absolute', top:16, right:16, padding:'2px 10px', borderRadius:'99px', background:'#6366f1', color:'#fff', fontSize:'0.62rem', fontWeight:800}}>
                    {f.badge}
                  </div>
                )}
                <div style={{width:44, height:44, borderRadius:'12px', background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', marginBottom:'14px'}}>{f.icon}</div>
                <h3 style={{fontWeight:700, fontSize:'1rem', color:'#0f172a', marginBottom:'8px'}}>{f.title}</h3>
                <p style={{color:'#64748b', fontSize:'0.85rem', lineHeight:1.65, margin:0}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" style={{padding:'88px 24px', background:'#fff'}}>
        <div style={{maxWidth:'900px', margin:'0 auto', textAlign:'center'}}>
          <div style={{display:'inline-block', padding:'4px 14px', borderRadius:'99px', background:'#f0fdf4', color:'#15803d', fontSize:'0.73rem', fontWeight:700, marginBottom:'14px', letterSpacing:'0.06em'}}>HOW IT WORKS</div>
          <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, color:'#0f172a', letterSpacing:'-0.03em', marginBottom:'48px'}}>
            Interview Ready in <span style={{color:'#6366f1'}}>4 Simple Steps</span>
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:'16px'}}>
            {[
              {n:'1', icon:'⚙️', title:'Set Up', desc:'Enter your job role and experience level, or switch to Resume mode and upload your PDF for personalised questions.'},
              {n:'2', icon:'🎤', title:'Answer 5 Questions', desc:'AI-generated questions appear one by one. Record your voice or type your answer — your choice for each question.'},
              {n:'3', icon:'🧠', title:'Get Scored Instantly', desc:'After each answer, Groq AI gives you a score out of 10 and specific feedback on what to improve.'},
              {n:'4', icon:'📈', title:'Review Your Report', desc:'See your full interview report: overall rating, your answers vs model answers, and feedback for every question.'},
            ].map((s) => (
              <div key={s.n} className="step-card" style={{padding:'24px 18px', borderRadius:'16px', border:'1px solid #f1f5f9', background:'#fafafa', transition:'background 0.2s', textAlign:'left'}}>
                <div style={{width:46, height:46, borderRadius:'13px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', marginBottom:'16px', boxShadow:'0 4px 12px rgba(99,102,241,0.25)'}}>
                  {s.icon}
                </div>
                <div style={{fontSize:'0.62rem', fontWeight:800, color:'#a5b4fc', letterSpacing:'0.1em', marginBottom:'8px'}}>STEP {s.n}</div>
                <h3 style={{fontWeight:700, fontSize:'0.95rem', color:'#0f172a', marginBottom:'8px'}}>{s.title}</h3>
                <p style={{color:'#64748b', fontSize:'0.82rem', lineHeight:1.65, margin:0}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'88px 24px', background:'#f8fafc'}}>
        <div style={{maxWidth:'600px', margin:'0 auto', textAlign:'center', padding:'56px 40px', borderRadius:'24px', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow:'0 24px 64px rgba(99,102,241,0.32)'}}>
          <div style={{fontSize:'2.8rem', marginBottom:'16px'}}>🚀</div>
          <h2 style={{fontSize:'2rem', fontWeight:900, color:'#fff', letterSpacing:'-0.03em', marginBottom:'12px'}}>Ready to Get Placed?</h2>
          <p style={{color:'rgba(255,255,255,0.72)', fontSize:'1rem', marginBottom:'28px', lineHeight:1.6}}>Free to use. No credit card. Create your first AI interview in under 2 minutes.</p>
          <Link href="/dashboard" style={{display:'inline-block', padding:'14px 36px', borderRadius:'12px', background:'#fff', color:'#6366f1', fontWeight:800, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 18px rgba(0,0,0,0.15)'}}>
            Launch Your First Interview →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid #f1f5f9', padding:'32px 24px', textAlign:'center', background:'#fff'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'8px'}}>
          <div style={{width:28,height:28,borderRadius:'8px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:900,fontSize:'0.72rem'}}>AI</div>
          <span style={{fontWeight:700, color:'#475569', fontSize:'0.92rem'}}>Mock<span style={{color:'#6366f1'}}>Interview</span></span>
        </div>
        <p style={{color:'#94a3b8', fontSize:'0.8rem'}}>© 2025 AI MockInterview · Built for placement season</p>
      </footer>

    </main>
  )
}