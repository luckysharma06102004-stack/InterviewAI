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


## 🔮 Roadmap

- [ ] 🎤 **Voice-only interview mode** — full end-to-end voice conversations
- [ ] 🏢 **Company-specific interview prep** — Google, Amazon, Microsoft modes
- [ ] 📊 **Advanced analytics dashboard** — skill gap analysis and improvement graphs
- [ ] 🌐 **Multi-language support** — interviews in Spanish, Hindi, French, and more
- [ ] 🧑‍💼 **Behavioural & HR question bank** — STAR-method guidance
- [ ] 🤝 **Peer mock interviews** — real-time sessions with other users

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

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucky-sharma-7a7792336/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/luckysharma06102004-stack)

> B.Tech Computer Science Engineering @ KIIT University | Full Stack Developer

---

<div align="center">

Made with ❤️ by Lucky Sharma

⭐ **Star this repo if you found it helpful!**

</div>
