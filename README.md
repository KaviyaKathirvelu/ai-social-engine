# 🚀 AI Social Content Engine

An interactive, multi-platform AI content studio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Groq API**. 

Transform raw concepts or draft notes into high-performing, formatted posts tailored for **LinkedIn**, **X (Twitter)**, and **Instagram**—complete with tone selection and dynamic model fallback handling.

---

## ✨ Features

- **Multi-Platform Output:** Single-input transformation into tailored post formats for LinkedIn, X (Twitter), and Instagram simultaneously.
- **Tone & Vibe Control:** Customizable content personas (e.g., *Pattern Interrupt*, *Modern Professional*, *Casual*).
- **Dynamic Model Failover:** Real-time API model status checking via Groq to prevent `404` deprecation or rate-limit errors gracefully.
- **SaaS Modern UI:** Responsive full-bleed layout powered by Tailwind CSS and shadcn/ui components.
- **Structured JSON Engine:** Strict JSON output formatting for consistent cross-platform parsing.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **AI Inference Engine:** [OpenAI Node.js SDK](https://github.com/openai/openai-node) routed to [Groq API](https://groq.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or `pnpm` / `yarn`
- A free [Groq API Key](https://console.groq.com/)

---

### 📥 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/KaviyaKathirvelu/ai-social-engine.git](https://github.com/KaviyaKathirvelu/ai-social-engine.git)
   cd ai-social-engine
   ```
   
2. **Install Dependencies**

  ```Bash
  npm install
  Configure Environment Variables
```

3. **Create a .env.local file in the root directory**

  ```Bash
  touch .env.local
```
4. **Add your Groq API key inside .env.local**

 ``` Code snippet
  GROQ_API_KEY=your_groq_api_key_here
```

5. **Run the Local Development Server**

  ```Bash
  npm run dev
```
6. **Open in Browser**

Navigate to http://localhost:3000 in your web browser to test the application.


📄 License
Distributed under the MIT License. See LICENSE for more information.
