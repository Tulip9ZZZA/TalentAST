# 🌲 TalentAST

> **The Abstract Syntax Tree (AST) & Semantic Diff Engine for Technical Hiring.**

TalentAST treats technical hiring as a deterministic compiler problem. It deconstructs Job Descriptions (JDs) and Candidate Resumes into structured competency AST nodes, computes a high-fidelity semantic diff (Matched, Adjacent, Critical Gap), generates ATS-optimized bullet enhancements, and outputs 7-day proof-of-work project blueprints for missing skills.

---

## ✨ Core Features

- 🌲 **Deterministic Competency AST**: Parses technical requirements into categorized nodes (Languages, Concurrency, Architecture, Cloud/Infra, Storage, Observability).
- 🔍 **Git-Style Semantic Diff**: Visual Green (`+ MATCHED`), Yellow (`~ ADJACENT / RE-FRAME`), and Red (`- CRITICAL GAP`) cards with side-by-side evidence context and actionable patch tips.
- 📄 **ATS-Optimized Tailored Resume Studio**: Bullet-by-bullet patches with enhancement badges (`QUANTIFICATION`, `KEYWORD_ALIGNMENT`, `IMPACT_REFRAME`) plus complete copyable and printable Markdown resume.
- 🚀 **7-Day Proof-of-Work Sprint Blueprints**: Actionable engineering project blueprints with architecture summaries, interactive deliverables checklists, and verified official documentation links (Kubernetes, Redis, vLLM, etc.).
- 📁 **Resume File Upload**: Direct support for uploading `.pdf`, `.txt`, `.md`, and `.json` resume files with instant text extraction.
- 🌐 **GitHub & Portfolio Profile Import**: Input any GitHub username (`github.com/username`) or portfolio link to automatically fetch and format public repositories, stars, and languages into the candidate profile.
- 📊 **Visual Score Radar & Category Meters**: Category-by-category proficiency breakdown and overall ATS Parity Index score.
- 🔬 **Raw AST Syntax Tree Inspector**: JSON tree viewer with Zod schema validation pass status for judges.
- ⚡ **Zero-Latency Presets + Multi-LLM Engine**: Instant 1-click benchmarks (Go Backend, Frontend Architect, AI/ML Engineer) with support for Google Gemini, OpenAI (GPT-4o), Groq (Llama 3.3), and OpenRouter.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS (Analog Static Noir / Brutalist High-Contrast Design System)
- **Validation**: Zod (strict schema validation for AI JSON output)
- **Icons**: Lucide React
- **AI SDK**: `@google/generative-ai` & OpenAI-compatible endpoints

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/talent-ast.git
cd talent-ast
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Zero-Configuration 1-Click Demo

TalentAST includes built-in presets ready to test immediately with zero API keys required:
1. **Senior Go / Distributed Systems Engineer** (Go, Redis Clustering, Kubernetes Operators, Kafka)
2. **React / Frontend Systems Architect** (Next.js 14 App Router, WebGL, Design Systems, Core Web Vitals)
3. **AI/ML & LLM Platform Engineer** (PyTorch, vLLM, FlashAttention, PEFT/LoRA, Vector DBs)

---

## 📜 License

MIT License. Built for hackathon submission and high-stakes technical hiring evaluations.
