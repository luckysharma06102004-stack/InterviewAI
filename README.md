
Claude finished the response
LuckySharma_Resume (29).pdf
pdf

create a good reademe 
Skip to content
luckysharma06102004-stack
InterviewAI
Repository navigation
Code
Issues
Pull requests
Actions
Projects
Wiki
Security and quality
Insights
Settings
Owner avatar
InterviewAI
Public
luckysharma06102004-stack/InterviewAI
Go to file
t
T
Name        
luckysharma06102004-stack
luckysharma06102004-stack
cleanup project
9c7143c
 · 
last month
app
cleanup project
last month
components
Initial commit - AI Mock Interview
last month
lib
Initial commit - AI Mock Interview
last month
public
Initial commit - AI Mock Interview
last month
utils
cleanup project
last month
.dockerignore
Initial commit - AI Mock Interview
last month
.gitignore
Initial commit - AI Mock Interview
last month
Dockerfile
Initial commit - AI Mock Interview
last month
README.Docker.md
Initial commit - AI Mock Interview
last month
README.md
Initial commit - AI Mock Interview
last month
components.json
Initial commit - AI Mock Interview
last month
compose.yaml
Initial commit - AI Mock Interview
last month
drizzle.config.js
Initial commit - AI Mock Interview
last month
jsconfig.json
Initial commit - AI Mock Interview
last month
middleware.js
Initial commit - AI Mock Interview
last month
next.config.mjs
Initial commit - AI Mock Interview
last month
package-lock.json
Initial commit - AI Mock Interview
last month
package.json
Initial commit - AI Mock Interview
last month
postcss.config.mjs
Initial commit - AI Mock Interview
last month
tailwind.config.js
Initial commit - AI Mock Interview
last month
tsconfig.json
Initial commit - AI Mock Interview
last month
Repository files navigation
README
🧠 AI Mock Interview
A modern AI-powered interview preparation platform that simulates real interviews, gives instant feedback, and helps users improve based on role and resume.
🚀 Features
🤖 AI-powered mock interviews
📄 Resume-based personalized questions
⚡ Instant feedback with scoring
🧠 Real-time performance analysis
🎯 Role-based interview practice
📊 Detailed performance reports
🎙️ Voice mode ready (future enhancement)
🖥️ Tech Stack
Next.js (App Router)
React.js
Inline CSS styling
Next.js Routing (next/link)
📁 Project Structure
/app ├── page.js (Home Page UI) ├── dashboard (Interview system entry)
components ├── FeatureCard.jsx
/public ├── assets
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/luckysharma06102004-stack/InterviewAI.git
2. Install dependencies
npm install
3. Run development server
npm run dev
4. Open in browser
http://localhost:3003
🎯 Purpose
This project helps users:
Practice real interview scenarios
Get AI-based feedback instantly
Improve communication skills
Track progress over time
🔮 Future Improvements
🎤 Voice-based AI interviews
🧑‍💼 Company-specific interview modes  
📊 Advanced analytics dashboard
💾 User progress tracking system
🌐 Backend AI integration (Gemini / OpenAI/ Groq )
About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 1 star
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
1
@luckysharma06102004-stack
luckysharma06102004-stack
Languages
JavaScript
95.9%

TypeScript
2.4%

CSS
1.7%
Suggested workflows
Based on your tech stack
Datadog Synthetics logo
Datadog Synthetics
Run Datadog Synthetic tests within your GitHub Actions workflow
Webpack logo
Webpack
Build a NodeJS project with npm and webpack.
Deno logo
Deno
Test your Deno project
More workflows
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information

Of this project adding the Live Link https://ai-mock-interview-lucky.netlify.app/

Show more
7:17 PM

Reading frontend design skill
Reading frontend design skill
Now I have everything I need. Let me create a professional, visually stunning README for the MockInterviewAI project.


Created a file, read a file
Created a file, read a file
Here's your polished README! Here's what's included:

Structure highlights:

Live demo badge linking to https://ai-mock-interview-lucky.netlify.app/
Tech stack badges (Next.js, Groq, PostgreSQL, Netlify)
ASCII pipeline diagram showing the 4-module architecture
Complete features table with emoji icons
Full API endpoints table (6 routes)
Setup guide with all env variables needed (Groq, Clerk, NeonDB)
Docker usage section (since you already have a Dockerfile)
Roadmap with checkboxes — including the "future enhancements" from your old README + new ideas
Things to update before pushing:

Add your actual LinkedIn URL in the Author section
Drop real screenshots once you have them — the placeholder is there
Adjust the API route names if they differ from what I inferred from the resume description
This README is significantly stronger than the original and positions the project as production-quality, which aligns well with your portfolio goals. 🚀


Readme
Document · MD 






Claude is AI and can make mistakes. Please double-check responses.
Readme · MD
<div align="center">
<img src="https://ai-mock-interview-lucky.netlify.app/favicon.ico" width="80" height="80" alt="MockInterviewAI Logo" />
# 🧠 MockInterviewAI
 
### AI-Powered Mock Interview Platform
 
Practice real interviews. Get instant AI feedback. Land your dream job.
 
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-MockInterviewAI-4F46E5?style=for-the-badge)](https://ai-mock-interview-lucky.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Groq](https://img.shields.io/badge/Groq_LLaMA_3.1-F55036?style=for-the-badge)](https://groq.com/)
[![PostgreSQL](https://img.shields.io/badge/NeonDB_PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Netlify](https://img.shields.io/badge/Deployed_on_Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)
 
</div>
---
 
## ✨ Overview
 
**MockInterviewAI** is a full-stack AI mock interview platform that simulates real-world interview scenarios, provides instant AI-generated feedback, and helps candidates track their improvement over time. Built with **Next.js 14**, **Groq LLaMA 3.1**, and **NeonDB PostgreSQL**, it delivers end-to-end AI evaluation and database persistence within **3.5 seconds per request**.
 
> 💡 Whether you're a fresh graduate or a seasoned professional, MockInterviewAI helps you walk into your next interview with confidence.
 
---
 
## 🚀 Live Demo
 
🌐 **[https://ai-mock-interview-lucky.netlify.app/](https://ai-mock-interview-lucky.netlify.app/)**
 
---
 
## 🎯 Key Features
 
| Feature | Description |
|---|---|
| 🤖 **AI-Powered Questions** | Generates 5 personalized questions per session using Groq LLaMA 3.1 |
| 📄 **Resume-Based Interviews** | Upload your PDF resume for tailored, context-aware questions |
| 🎤 **Voice Mode** | Browser-native Web Speech API for real-time voice recording & transcription |
| ⚡ **Instant AI Feedback** | Per-answer scoring on a 10-point scale with detailed improvement tips |
| 🧠 **Model Answers** | AI-generated ideal answers for every interview question |
| 📊 **Progress Analytics** | Historical interview tracking to monitor performance trends |
| 🔒 **Auth with Clerk** | Secure authentication and protected user sessions |
| 🗄️ **Persistent Storage** | NeonDB PostgreSQL + Drizzle ORM for session and result persistence |
 
---
 
## 🏗️ Architecture
 
MockInterviewAI follows a **4-module decoupled pipeline**:
 
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   1. Question   │───▶│  2. Voice / Text │───▶│  3. AI Evaluate │───▶│  4. Analytics   │
│   Generation    │    │    Capture       │    │   & Scoring     │    │   & History     │
│                 │    │                 │    │                 │    │                 │
│ Groq LLaMA 3.1  │    │ Web Speech API  │    │ 10-pt scoring   │    │ NeonDB persist  │
│ Role + Resume   │    │ Free-text input │    │ Model answers   │    │ Trend tracking  │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```
 
---
 
## 🛠️ Tech Stack
 
### Frontend
- **[Next.js 14](https://nextjs.org/)** — App Router, SSR, file-based routing
- **[React.js](https://react.dev/)** — Component-based UI
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
### Backend & AI
- **[Groq API (LLaMA 3.1)](https://groq.com/)** — Ultra-fast LLM inference for question generation & evaluation
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** — 6 REST endpoints
### Database & ORM
- **[NeonDB PostgreSQL](https://neon.tech/)** — Serverless Postgres
- **[Drizzle ORM](https://orm.drizzle.team/)** — Type-safe database queries
### Auth & Media
- **[Clerk](https://clerk.com/)** — Authentication and user management
- **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)** — Browser-native voice recording (no external deps)
### Deployment
- **[Netlify](https://netlify.com/)** — CI/CD and hosting
---
 
## 📁 Project Structure
 
```
MockInterviewAI/
├── app/
│   ├── page.js                  # Home/Landing page
│   ├── dashboard/               # Interview dashboard
│   │   └── interview/           # Interview session flow
│   └── api/                     # REST API endpoints (6 routes)
│       ├── generate-questions/
│       ├── evaluate-answer/
│       └── ...
├── components/
│   ├── FeatureCard.jsx          # Landing page feature highlights
│   └── ...
├── lib/
│   └── db.js                    # Drizzle ORM DB config
├── utils/
│   └── ...
├── public/
│   └── assets/
├── drizzle.config.js
├── middleware.js                 # Clerk auth middleware
└── next.config.mjs
```
 
---
 
## ⚙️ Getting Started
 
### Prerequisites
 
- **Node.js** v18+
- **npm** or **yarn**
- **Groq API Key** — [Get one free](https://console.groq.com/)
- **Clerk Account** — [Sign up](https://clerk.com/)
- **NeonDB Account** — [Sign up](https://neon.tech/)
### 1. Clone the Repository
 
```bash
git clone https://github.com/luckysharma06102004-stack/InterviewAI.git
cd InterviewAI
```
 
### 2. Install Dependencies
 
```bash
npm install
```
 
### 3. Configure Environment Variables
 
Create a `.env.local` file in the root directory:
 
```env
# Groq AI
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
 
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
 
# NeonDB PostgreSQL
DATABASE_URL=your_neondb_connection_string
```
 
### 4. Set Up the Database
 
```bash
npx drizzle-kit push
```
 
### 5. Run the Development Server
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
---
 
## 🔌 API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate-questions` | Generate 5 personalized interview questions |
| `POST` | `/api/evaluate-answer` | Score and evaluate a user's answer (0–10) |
| `GET`  | `/api/interviews` | Fetch all interviews for the current user |
| `POST` | `/api/interviews` | Save a new interview session |
| `GET`  | `/api/interviews/[id]` | Get details of a specific session |
| `POST` | `/api/parse-resume` | Extract structured data from uploaded PDF resume |
 
---
 
## 📸 Screenshots
 
> _Coming soon — add screenshots of the dashboard, interview flow, and results page here._
 
---
 
## 🔮 Roadmap
 
- [ ] 🎤 **Voice-only interview mode** — full end-to-end voice conversations
- [ ] 🏢 **Company-specific interview prep** — Google, Amazon, Microsoft modes
- [ ] 📊 **Advanced analytics dashboard** — skill gap analysis and improvement graphs
- [ ] 🌐 **Multi-language support** — interviews in Spanish, Hindi, French, and more
- [ ] 🧑‍💼 **Behavioural & HR question bank** — STAR-method guidance
- [ ] 🤝 **Peer mock interviews** — real-time sessions with other users
---
 
## 🐳 Docker Support
 
A `Dockerfile` and `compose.yaml` are included for containerized deployment.
 
```bash
# Build and run with Docker Compose
docker compose up --build
```
 
See [README.Docker.md](./README.Docker.md) for detailed Docker instructions.
 
---
 
## 🤝 Contributing
 
Contributions, issues, and feature requests are welcome!
 
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request
---
 
## 👨‍💻 Author
 
**Lucky Sharma**
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/luckysharma06102004)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/luckysharma06102004-stack)
 
> B.Tech Computer Science Engineering @ KIIT University | Full Stack Developer
 
---
 
<div align="center">
Made with ❤️ by Lucky Sharma
 
⭐ **Star this repo if you found it helpful!**
 
</div>
 

