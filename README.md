# 🌲 TalentAST

> **The Abstract Syntax Tree (AST) & Semantic Diff Engine for Technical Hiring.**  
> *Built for the Pixel Forge AI Hackathon 2026 ($18,000+ Prize Pool).*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://talent-25c8yuz0k-tulips-projects-761fdf43.vercel.app)
[![Demo Video](https://img.shields.io/badge/Watch_Demo-YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/hkeeHJyGh2c)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=for-the-badge)](LICENSE)
[![Next.js 14](https://img.shields.io/badge/Next.js_14-App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 📺 Demo Video & Live Application

- 🚀 **Live Production App**: **[https://talent-25c8yuz0k-tulips-projects-761fdf43.vercel.app](https://talent-25c8yuz0k-tulips-projects-761fdf43.vercel.app)**
- 🎥 **YouTube Video Walkthrough (3 Mins)**: **[https://youtu.be/hkeeHJyGh2c](https://youtu.be/hkeeHJyGh2c)**
- 📂 **GitHub Repository**: **[https://github.com/Tulip9ZZZA/TalentAST](https://github.com/Tulip9ZZZA/TalentAST)**

---

## 💡 The Problem: Why Technical Hiring is Broken

Traditional hiring and ATS (Applicant Tracking Systems) treat technical candidates like a blunt keyword search:
1. **Keyword stuffing wins over real engineering ability**.
2. **Candidates get rejected without actionable feedback** on what skills they are missing or how to bridge the gap.
3. **AI hallucinations in existing resume builders fabricate fake experience**, causing catastrophic interview failures.

---

## ⚡ The Solution: TalentAST

**TalentAST** re-imagines technical recruiting as a **deterministic compiler problem**. It deconstructs Job Descriptions (JDs) and Candidate Resumes into an **Abstract Syntax Tree (AST)** of engineering competencies, calculates a Git-style semantic diff, and generates verifiable **7-Day Proof-of-Work Project Blueprints** for missing skills.

```
┌───────────────────────────┐      ┌───────────────────────────┐
│     Target Job Spec       │      │   Candidate Experience    │
└─────────────┬─────────────┘      └─────────────┬─────────────┘
              │                                  │
              ▼                                  ▼
      [ AST JD Parser ]                  [ AST Candidate Parser ]
              │                                  │
              └───────────────┬──────────────────┘
                              │
                              ▼
                 [ SEMANTIC DIFF COMPILER ]
                              │
    ┌─────────────────────────┼─────────────────────────┐
    ▼                         ▼                         ▼
🟢 MATCHED (+)          🟡 ADJACENT (~)           🔴 CRITICAL GAP (-)
Direct Proven           Truthful Re-framing       Actionable 7-Day
Competency Nodes        & Quantification          Proof-of-Work Blueprint
```

---

## 🌟 Key Features

### 1. 🌲 Deterministic Competency AST & Semantic Diff
- Parses requirements into categorized nodes: *Languages & Concurrency*, *Distributed Caching & Storage*, *Cloud & Orchestration*, *AI/ML Serving*, *Event Streaming*.
- **Git-Style Visual Diff Cards**:
  - `🟢 + [MATCHED]`: Direct verified evidence.
  - `🟡 ~ [ADJACENT]`: Truthful keyword alignment & quantifiable re-framing tips.
  - `🔴 - [CRITICAL GAP]`: Hard missing requirements paired with actionable project roadmaps.

### 2. 📄 ATS-Optimized Tailored Resume Studio
- **Bullet-by-Bullet Diffing**: Side-by-side comparison with enhancement tags (`QUANTIFICATION`, `KEYWORD_ALIGNMENT`, `IMPACT_REFRAME`).
- **Zero Hallucination Guarantee**: Strict prompts prevent fabricating false experience.
- One-click **Copy Markdown**, **Copy TXT**, **.MD Download**, and **Print / PDF View**.

### 3. 🚀 7-Day Proof-of-Work Sprint Blueprints
- For every critical gap, TalentAST generates a complete 7-day engineering project spec.
- Includes architectural blueprints, interactive deliverable checklists, and verified links to official documentation (Kubernetes Operators, vLLM, Redis Clustering, Kafka, etc.).

### 4. 📁 Resume File Upload & GitHub Profile Importer
- **File Upload**: Direct drag-and-drop support for `.PDF`, `.TXT`, `.MD`, and `.JSON` resumes with client-side text stream extraction.
- **GitHub & URL Import**: Enter any `github.com/username` to automatically extract public repositories, stars, languages, and technical contributions.

### 5. 🎯 6 Built-In 1-Click Benchmarks
- Senior Go / Distributed Systems Engineer
- React / Frontend Systems Architect
- AI/ML & LLM Platform Engineer
- DevOps & Cloud Platform Architect
- Full-Stack Product Engineer
- Rust Systems & Low-Latency Engineer

### 6. 🔬 Raw AST Compiler Inspector
- Interactive collapsible JSON syntax tree viewer with Zod schema validation pass verification for judges.

---

## 🛠️ Technological Implementation & Architecture

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript 5, Tailwind CSS
- **Design System**: Analog Static Noir / Brutalist High-Contrast UI with CRT Scanlines, 1-bit dithering, and animated Stickman Agent mascot.
- **Validation**: Strict Zod Schema validation (`lib/schemas.ts`).
- **AI Core**: Multi-LLM engine (Google Gemini 1.5 Pro, OpenAI GPT-4o, Groq Llama 3.3, OpenRouter) with structured JSON mode + instant fallback local Dynamic AST engine (`lib/astCompiler.ts`).
- **Deployment**: Vercel Serverless Edge Platform.

---

## 🏆 Hackathon Judging Criteria Alignment

| Criterion | How TalentAST Excels |
| :--- | :--- |
| **Originality** | First tool to treat career competencies as an Abstract Syntax Tree (AST) compiler with Git-style semantic diffs instead of generic prompt templates. |
| **Design** | Analog Static Noir brutalist design system with CRT scanlines, 1-bit dithering, interactive Stickman mascot, and high-density information architecture. |
| **Potential Impact** | Solves the broken tech hiring loop by converting rejection into concrete 7-day proof-of-work project artifacts. |
| **Technological Implementation** | Zero TypeScript errors, Zod schema validation, multi-provider LLM support, client-side PDF/GitHub parsing, and production-ready Next.js 14 deployment. |

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/Tulip9ZZZA/TalentAST.git
cd TalentAST

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
