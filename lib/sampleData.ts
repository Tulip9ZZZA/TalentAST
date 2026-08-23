import { TalentASTResponse } from "./schemas";

export interface DemoPreset {
  id: string;
  name: string;
  badge: string;
  jdTitle: string;
  jd: string;
  resume: string;
  mockResult: TalentASTResponse;
}

export const DEMO_PRESETS: Record<string, DemoPreset> = {
  backend: {
    id: "backend",
    name: "Senior Go / Distributed Systems",
    badge: "BACKEND_ENGINEER",
    jdTitle: "Senior Distributed Backend Engineer (Fintech Core)",
    jd: `Role: Senior Distributed Backend Engineer - Core Transaction Platform
Requirements:
- 5+ years building distributed, low-latency transaction processing services in Golang.
- Deep expertise in concurrency models (goroutines, worker pools, sync primitives, atomic operations).
- Production experience with Redis clustering, memory eviction algorithms, and distributed locks (Redlock).
- Extensive Kubernetes experience extending Kubernetes with custom CRDs, operator SDK, and reconciliation loops.
- Event-driven stream processing with Apache Kafka, consumer group rebalancing, exactly-once semantics.
- Strong SQL optimization in PostgreSQL, connection pooling (PgBouncer), and distributed schema migration.
- Zero-downtime canary deployments, Prometheus metrics, and OpenTelemetry distributed tracing.`,
    resume: `Alex Rivera
Senior Software Engineer | alex.rivera@example.com | github.com/alexrivera-dev

PROFESSIONAL SUMMARY
Backend Engineer with 4.5 years of experience building resilient microservices using Go and PostgreSQL. Proven track record in improving API response times and managing high-throughput message brokers.

EXPERIENCE
Software Engineer - Apex Cloud Solutions (2022 - Present)
- Developed and maintained 12+ REST microservices in Go, serving 15M daily requests.
- Added Redis caching layer for session management and user permissions, reducing query load on PostgreSQL.
- Implemented RabbitMQ messaging queues for asynchronous email and notification dispatching.
- Packaged services into Docker containers and deployed to managed Kubernetes (EKS) via Helm charts.
- Configured Grafana dashboards and Prometheus alerts for endpoint latency monitoring.

Backend Developer - HyperScale Labs (2020 - 2022)
- Built internal APIs in Go and Python to ingest telemetry data from edge IoT devices.
- Refactored legacy relational queries in PostgreSQL, indexing hot tables to speed up reports by 40%.
- Integrated Redis for rate limiting and token bucket throttling across public endpoints.

SKILLS
- Languages: Go (Golang), Python, SQL, Bash
- Databases: PostgreSQL, Redis (standalone), MySQL
- Infrastructure & Tools: Docker, Kubernetes (Deployments/Pods/Services), Helm, Git, Prometheus, Grafana, Linux`,
    mockResult: {
      role_title: "Senior Distributed Backend Engineer",
      overall_match_score: 76,
      category_scores: {
        "Languages & Concurrency": 94,
        "Distributed Caching & Storage": 82,
        "Cloud & Orchestration": 58,
        "Event Streaming & Queues": 65,
        "Observability & Reliability": 80
      },
      competencies: [
        {
          category: "Languages & Concurrency",
          skill_name: "Golang Microservices & Worker Pools",
          importance: "CRITICAL",
          status: "MATCHED",
          jd_requirement_context: "5+ years building distributed, low-latency transaction services in Golang.",
          candidate_evidence: "4.5 years writing production Go microservices handling 15M daily requests with worker pools.",
          gap_reasoning: "",
          actionable_fix: "Strong match. Highlight concurrent pipeline architecture and throughput in metrics."
        },
        {
          category: "Distributed Caching & Storage",
          skill_name: "Redis Clustering & Distributed Locking",
          importance: "CRITICAL",
          status: "ADJACENT",
          jd_requirement_context: "Deep experience with Redis clustering, eviction algorithms, and distributed locks (Redlock).",
          candidate_evidence: "Implemented standalone Redis for session management, token bucket rate-limiting, and query caching.",
          gap_reasoning: "Candidate demonstrates strong single-instance Redis proficiency but lacks explicit cluster sharding / Redlock experience.",
          actionable_fix: "Reframe resume bullets to highlight cache invalidation patterns, TTL eviction strategies, and p99 latency reduction."
        },
        {
          category: "Cloud & Orchestration",
          skill_name: "Kubernetes Custom Operators & CRDs",
          importance: "CRITICAL",
          status: "CRITICAL_GAP",
          jd_requirement_context: "Extensive Kubernetes experience extending Kubernetes with custom CRDs, operator SDK, and reconciliation loops.",
          candidate_evidence: "Basic Kubernetes usage (deployments, pods, Helm charts, Docker packaging).",
          gap_reasoning: "Candidate operates workloads on Kubernetes as a consumer rather than building custom Kubernetes controllers/operators.",
          actionable_fix: "Complete the 7-day KubeCron-Lite Operator proof-of-work project to demonstrate deep controller-runtime knowledge."
        },
        {
          category: "Event Streaming & Queues",
          skill_name: "Apache Kafka Stream Processing & Exactly-Once",
          importance: "PREFERRED",
          status: "ADJACENT",
          jd_requirement_context: "Event-driven stream processing with Apache Kafka, consumer group rebalancing, and exactly-once semantics.",
          candidate_evidence: "Experience using RabbitMQ for async message queues and event notification dispatch.",
          gap_reasoning: "RabbitMQ is message-queue oriented; Kafka is distributed log stream processing. Concepts of consumer offset and partitions need mapping.",
          actionable_fix: "Reframe message brokering experience to highlight idempotency keys, dead-letter exchanges, and high-volume stream ingestion."
        },
        {
          category: "Distributed Caching & Storage",
          skill_name: "PostgreSQL Query Optimization & PgBouncer",
          importance: "CRITICAL",
          status: "MATCHED",
          jd_requirement_context: "Strong SQL optimization in PostgreSQL, connection pooling (PgBouncer), and distributed schema migration.",
          candidate_evidence: "Optimized relational queries and indexed hot tables to speed up analytical reports by 40%.",
          gap_reasoning: "",
          actionable_fix: "Mention execution plan analysis (EXPLAIN ANALYZE) and connection pooling explicitly."
        },
        {
          category: "Observability & Reliability",
          skill_name: "Prometheus Metrics & OpenTelemetry Tracing",
          importance: "PREFERRED",
          status: "MATCHED",
          jd_requirement_context: "Zero-downtime canary deployments, Prometheus metrics, and OpenTelemetry distributed tracing.",
          candidate_evidence: "Configured Grafana dashboards and Prometheus alerts for endpoint latency monitoring.",
          gap_reasoning: "",
          actionable_fix: "Align with OpenTelemetry trace span propagation and golden signals (latency, traffic, errors, saturation)."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Added Redis caching layer for session management and user permissions, reducing query load on PostgreSQL.",
          tailored_bullet: "Architected high-throughput Go REST microservices utilizing Redis cache invalidation strategies and token-bucket throttling, reducing endpoint p99 latency by 38% and database load by 55%.",
          targeted_skill: "Redis Caching & Latency Optimization",
          enhancement_type: "QUANTIFICATION"
        },
        {
          original_bullet: "Implemented RabbitMQ messaging queues for asynchronous email and notification dispatching.",
          tailored_bullet: "Designed distributed event-driven messaging pipelines handling 2.5M asynchronous events daily with dead-letter queue resilience and idempotent processing guarantees.",
          targeted_skill: "Distributed Message Pipelines",
          enhancement_type: "IMPACT_REFRAME"
        },
        {
          original_bullet: "Packaged services into Docker containers and deployed to managed Kubernetes (EKS) via Helm charts.",
          tailored_bullet: "Engineered automated containerized deployment pipelines across AWS EKS using Helm and zero-downtime rolling update strategies for 12+ Go services.",
          targeted_skill: "Kubernetes Orchestration",
          enhancement_type: "KEYWORD_ALIGNMENT"
        }
      ],
      tailored_resume_markdown: `# Alex Rivera
**Senior Backend & Distributed Systems Engineer**
alex.rivera@example.com • github.com/alexrivera-dev • linkedin.com/in/alexrivera-dev

---

### EXECUTIVE SUMMARY
Performance-driven Backend Systems Engineer with 4.5+ years specializing in low-latency Go microservices, distributed caching, and scalable SQL architecture. Experienced in handling 15M+ daily requests, optimizing p99 database response times by 40%, and managing containerized microservices on Kubernetes.

---

### CORE TECHNICAL COMPETENCIES
- **Languages & Runtimes:** Go (Golang - Goroutines, Channels, sync.Mutex), Python, SQL, Bash
- **Distributed Systems & Caching:** Redis (Eviction, Token Bucket, Invalidation), RabbitMQ, Event Streams
- **Databases:** PostgreSQL (Query Tuning, Indexing, EXPLAIN ANALYZE), MySQL
- **Cloud & DevOps:** Kubernetes (EKS, Helm, Rolling Updates), Docker, AWS, Prometheus, Grafana, OpenTelemetry

---

### PROFESSIONAL EXPERIENCE

**Apex Cloud Solutions** — *Senior Backend Software Engineer*  
*2022 – Present*
- Architected and scaled 12+ Go microservices handling 15M daily requests with concurrent worker pool architectures.
- Engineered high-throughput Redis caching and rate-limiting layers, eliminating 55% of redundant database queries and reducing p99 API latency by 38%.
- Designed distributed event-driven asynchronous processing pipelines with idempotent delivery guarantees and dead-letter queues.
- Containerized and orchestrated production workloads on AWS EKS using Helm charts, implementing automated health probes and Prometheus alerting.

**HyperScale Labs** — *Backend Developer*  
*2020 – 2022*
- Built high-throughput telemetry ingestion APIs in Go and Python processing 5,000+ events/sec from distributed edge devices.
- Refactored legacy PostgreSQL queries, introducing composite indexing and query plan restructuring to achieve a 40% speedup on analytical queries.
- Integrated Redis-backed distributed token-bucket rate limiters protecting public-facing API gateways from traffic spikes.

---

### PROOF-OF-WORK & TECHNICAL PROJECTS
- **KubeCron-Lite (Operator SDK):** Custom Kubernetes CRD and reconciliation controller in Go to automate ephemeral batch job lifecycles with exponential backoff.
- **Go-Raft-KV:** Distributed key-value store implementing core Raft consensus algorithms for leader election and log replication.`,
      proof_of_work_plans: [
        {
          target_gap_skill: "Kubernetes Custom Operators & CRDs",
          project_title: "KubeCron-Lite: Ephemeral Worker Pod Operator",
          timeline_days: 7,
          architecture_summary: "Build a custom Kubernetes controller in Go using the official controller-runtime and Kubebuilder framework to reconcile custom CronTask CRDs, managing automated batch execution pods with status reporting.",
          key_deliverables: [
            "Custom Resource Definition (v1alpha1) with OpenAPI v3 schema validation",
            "Reconciliation controller loop with exponential backoff on transient pod failures",
            "Integration test suite utilizing envtest and fake client",
            "GitHub repository with clear architectural diagram and automated release manifest"
          ],
          learning_resources: [
            {
              title: "Official Kubernetes Operator Pattern",
              url: "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/"
            },
            {
              title: "Kubebuilder Book & Quickstart",
              url: "https://book.kubebuilder.io/quick-start.html"
            },
            {
              title: "Go Controller-Runtime Docs",
              url: "https://pkg.go.dev/sigs.k8s.io/controller-runtime"
            }
          ]
        }
      ]
    }
  },

  frontend: {
    id: "frontend",
    name: "React / Frontend Systems Architect",
    badge: "FRONTEND_ARCHITECT",
    jdTitle: "Staff Frontend Architect (Web Platform & Design Systems)",
    jd: `Role: Staff Frontend Architect - Web Platform
Requirements:
- 7+ years of deep JavaScript/TypeScript and React ecosystem experience.
- Expert-level Next.js (App Router, Server Components, Streaming SSR, Parallel Routes).
- Web Performance mastery (Core Web Vitals, LCP/INP/CLS optimization, bundle chunk splitting, tree-shaking).
- Design System architecture with Tailwind CSS, Radix UI primitives, WCAG 2.1 AAA accessibility.
- State management at scale (Zustand, TanStack Query, Optimistic UI updates).
- Complex canvas / WebGL / WebAssembly graphics or interactive visual diffing engines.
- Micro-frontends, module federation, and end-to-end testing with Playwright / Cypress.`,
    resume: `Elena Vance
Senior Frontend Engineer | elena.vance@example.com | github.com/elenavance

SUMMARY
Senior Frontend Engineer with 6 years building high-performance web applications using React, TypeScript, and Next.js. Passionate about design systems, responsive UX, and Core Web Vitals optimization.

EXPERIENCE
Senior Frontend Developer - Veloce Design Studio (2021 - Present)
- Led frontend development for enterprise SaaS portals using Next.js 14, React 18, and TypeScript.
- Created reusable component library used by 18 engineers across 4 product squads.
- Optimized bundle size and asset loading, improving Lighthouse performance score from 68 to 94.
- Built complex data visualization dashboards using Recharts and Tailwind CSS.
- Implemented automated UI testing with Jest and React Testing Library.

Frontend Developer - PixelGrid Technologies (2018 - 2021)
- Developed responsive SPAs in React, Redux Toolkit, and Styled Components.
- Collaborated with UX designers to ensure pixel-perfect accessibility across mobile and desktop.
- Integrated GraphQL endpoints using Apollo Client with optimistic cache updates.

SKILLS
- React, Next.js (App Router), TypeScript, JavaScript (ESNext)
- Tailwind CSS, CSS Modules, Radix UI, Storybook
- TanStack Query, Zustand, Redux Toolkit
- Jest, React Testing Library, Git, Webpack, Vite`,
    mockResult: {
      role_title: "Staff Frontend Architect",
      overall_match_score: 81,
      category_scores: {
        "React & Next.js Architecture": 95,
        "Design Systems & A11y": 88,
        "Web Performance & Core Vitals": 90,
        "Canvas & WebGL Engines": 42,
        "Testing & Tooling": 80
      },
      competencies: [
        {
          category: "React & Next.js Architecture",
          skill_name: "Next.js App Router & Server Components",
          importance: "CRITICAL",
          status: "MATCHED",
          jd_requirement_context: "Expert-level Next.js (App Router, Server Components, Streaming SSR, Parallel Routes).",
          candidate_evidence: "Led enterprise SaaS portals using Next.js 14 App Router, React 18, and TypeScript.",
          gap_reasoning: "",
          actionable_fix: "Highlight streaming SSR (Suspense boundaries) and Server Action patterns."
        },
        {
          category: "Web Performance & Core Vitals",
          skill_name: "Core Web Vitals & INP/LCP Optimization",
          importance: "CRITICAL",
          status: "MATCHED",
          jd_requirement_context: "Web Performance mastery (Core Web Vitals, LCP/INP/CLS optimization, bundle chunk splitting).",
          candidate_evidence: "Improved Lighthouse performance score from 68 to 94 through bundle chunk splitting.",
          gap_reasoning: "",
          actionable_fix: "Quantify real-world INP (Interaction to Next Paint) milliseconds and LCP metrics."
        },
        {
          category: "Canvas & WebGL Engines",
          skill_name: "WebGL / 2D Canvas Interactive Rendering",
          importance: "CRITICAL",
          status: "CRITICAL_GAP",
          jd_requirement_context: "Complex canvas / WebGL / WebAssembly graphics or interactive visual diffing engines.",
          candidate_evidence: "Used SVG and Recharts DOM-based charting; no direct WebGL/Canvas shader experience.",
          gap_reasoning: "Candidate uses standard DOM/SVG charting and lacks hardware-accelerated WebGL / Canvas pipeline experience.",
          actionable_fix: "Build a 7-day 60FPS Canvas/WebGL AST Visualizer proof-of-work project."
        },
        {
          category: "Design Systems & A11y",
          skill_name: "Design System Architecture & WCAG 2.1 AAA",
          importance: "PREFERRED",
          status: "ADJACENT",
          jd_requirement_context: "Design System architecture with Tailwind CSS, Radix UI primitives, WCAG 2.1 AAA accessibility.",
          candidate_evidence: "Created reusable component library for 18 engineers with Radix UI and Tailwind CSS.",
          gap_reasoning: "Strong design system experience; needs explicit demonstration of automated WCAG 2.1 AAA compliance testing.",
          actionable_fix: "Highlight ARIA live regions, keyboard navigation trap audits, and tokenized design systems."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Optimized bundle size and asset loading, improving Lighthouse performance score from 68 to 94.",
          tailored_bullet: "Architected modern chunk-splitting and dynamic import strategies across Next.js 14 App Router, reducing LCP by 1.8s, improving INP to <50ms, and elevating Lighthouse performance from 68 to 96.",
          targeted_skill: "Web Performance & Core Web Vitals",
          enhancement_type: "QUANTIFICATION"
        },
        {
          original_bullet: "Created reusable component library used by 18 engineers across 4 product squads.",
          tailored_bullet: "Engineered scalable design system with 45+ tokenized components using Radix UI primitives and Tailwind CSS, enforcing WCAG 2.1 AAA accessibility and cutting feature time-to-market by 35%.",
          targeted_skill: "Design System Architecture",
          enhancement_type: "IMPACT_REFRAME"
        }
      ],
      tailored_resume_markdown: `# Elena Vance
**Staff Frontend Systems Architect**
elena.vance@example.com • github.com/elenavance • linkedin.com/in/elenavance

---

### PROFESSIONAL PROFILE
Frontend Architect with 6+ years specializing in Next.js App Router, high-scale Design Systems, and Core Web Vitals optimization. Proven experience leading web platform initiatives, reducing LCP to under 1.2s, and building component ecosystems used across multi-squad engineering organizations.

---

### CORE EXPERTISE
- **Frameworks & Languages:** React 18/19, Next.js (App Router, Server Components, Streaming SSR), TypeScript
- **Design Systems & A11y:** Tailwind CSS, Radix UI, WCAG 2.1 AAA, Storybook, Design Tokens
- **Performance:** Core Web Vitals (LCP, INP, CLS), Bundle Splitting, Tree-Shaking, Web Workers
- **State & Data:** TanStack Query, Zustand, Optimistic UI, WebSocket real-time updates`,
      proof_of_work_plans: [
        {
          target_gap_skill: "WebGL / 2D Canvas Interactive Rendering",
          project_title: "PixAST: High-Performance Canvas AST Visualizer",
          timeline_days: 7,
          architecture_summary: "Build an interactive 60fps canvas-based hierarchical graph renderer capable of visualizing 10,000+ AST nodes with spatial hashing, smooth zooming/panning, and WebGL particle shaders for diff animations.",
          key_deliverables: [
            "Custom 2D HTML5 Canvas rendering loop with requestAnimationFrame and quadtree spatial indexing",
            "Hardware-accelerated WebGL glow/diff shader for node status highlights",
            "Interactive pinch-to-zoom, node drag-and-drop, and minimap viewport indicator",
            "Production demo deployed on Vercel with zero external graphing dependencies"
          ],
          learning_resources: [
            {
              title: "HTML5 Canvas Deep Dive & Optimizations",
              url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas"
            },
            {
              title: "WebGL Fundamentals",
              url: "https://webglfundamentals.org/"
            }
          ]
        }
      ]
    }
  },

  aiml: {
    id: "aiml",
    name: "AI/ML & LLM Platform Engineer",
    badge: "AI_ML_ENGINEER",
    jdTitle: "Staff AI/ML Infrastructure Engineer (LLM Inference & RAG)",
    jd: `Role: Staff AI Platform Engineer - LLM Inference & Serving
Requirements:
- 5+ years of experience building high-throughput machine learning infrastructure.
- Deep expertise in PyTorch, CUDA kernel profiling, and GPU memory optimization (vLLM, TensorRT-LLM, FlashAttention-2).
- Vector databases at scale (Qdrant, Milvus, pgvector) with hybrid sparse/dense search and HNSW indexing.
- Distributed training & fine-tuning pipelines using Ray, DeepSpeed, or Hugging Face PEFT/LoRA.
- Production agentic orchestration, semantic routing, and structured JSON output validation.
- FastAPI / gRPC microservices with token streaming, speculative decoding, and continuous batching.`,
    resume: `Marcus Thorne
Machine Learning Engineer | marcus.thorne@example.com | github.com/marcusthorne-ai

SUMMARY
ML Engineer with 4 years deploying machine learning models and NLP pipelines in production. Experienced with PyTorch, Hugging Face transformers, FastAPI, and vector embeddings.

EXPERIENCE
ML Engineer - CognitiveAI Labs (2022 - Present)
- Deployed BERT and Sentence-Transformer embedding pipelines on AWS SageMaker.
- Built semantic search service using pgvector and LangChain to power internal document Q&A.
- Developed FastAPI endpoints streaming LLM responses from OpenAI and Anthropic APIs.
- Fine-tuned open-source Llama-2 7B models on internal datasets using Hugging Face PEFT LoRA.
- Monitored model accuracy and inference latency using Weights & Biases.

Data Scientist / ML Developer - DataPoint Analytics (2020 - 2022)
- Built predictive churn and classification models in scikit-learn and XGBoost.
- Automated feature extraction pipelines using pandas, NumPy, and Apache Airflow.

SKILLS
- Python, PyTorch, Hugging Face, Scikit-Learn
- FastAPI, Docker, AWS (SageMaker, S3, EC2)
- Vector DBs: pgvector, Pinecone
- Git, MLflow, Weights & Biases`,
    mockResult: {
      role_title: "Staff AI/ML Infrastructure Engineer",
      overall_match_score: 72,
      category_scores: {
        "PyTorch & Transformers": 88,
        "Inference Serving & GPU Optimization": 50,
        "Vector Search & RAG": 82,
        "Distributed Orchestration & Ray": 48,
        "API & Streaming Infrastructure": 90
      },
      competencies: [
        {
          category: "PyTorch & Transformers",
          skill_name: "Hugging Face & PEFT/LoRA Fine-Tuning",
          importance: "CRITICAL",
          status: "MATCHED",
          jd_requirement_context: "Distributed training & fine-tuning pipelines using Ray, DeepSpeed, or Hugging Face PEFT/LoRA.",
          candidate_evidence: "Fine-tuned Llama-2 7B models on domain datasets using Hugging Face PEFT and LoRA adapters.",
          gap_reasoning: "",
          actionable_fix: "Highlight quantization parameters (QLoRA 4-bit) and dataset tokenization optimizations."
        },
        {
          category: "Inference Serving & GPU Optimization",
          skill_name: "vLLM, TensorRT-LLM & PagedAttention",
          importance: "CRITICAL",
          status: "CRITICAL_GAP",
          jd_requirement_context: "Deep expertise in PyTorch, CUDA kernel profiling, and GPU memory optimization (vLLM, TensorRT-LLM, FlashAttention-2).",
          candidate_evidence: "Used managed OpenAI APIs and standard SageMaker inference endpoints without low-level vLLM engine orchestration.",
          gap_reasoning: "Lacks hands-on experience configuring high-throughput continuous batching engines (vLLM / TensorRT-LLM) or CUDA kernel tuning.",
          actionable_fix: "Execute the 7-day vLLM-StreamHub proof-of-work project implementing dynamic batching and FlashAttention."
        },
        {
          category: "Vector Search & RAG",
          skill_name: "Vector Databases & Hybrid HNSW Search",
          importance: "CRITICAL",
          status: "MATCHED",
          jd_requirement_context: "Vector databases at scale (Qdrant, Milvus, pgvector) with hybrid sparse/dense search and HNSW indexing.",
          candidate_evidence: "Built production semantic search service using pgvector and Pinecone.",
          gap_reasoning: "",
          actionable_fix: "Reframe to emphasize HNSW index tuning, reciprocal rank fusion (RRF), and embedding cache layers."
        },
        {
          category: "Distributed Orchestration & Ray",
          skill_name: "Ray Distributed Clustering & DeepSpeed",
          importance: "PREFERRED",
          status: "ADJACENT",
          jd_requirement_context: "Distributed training & fine-tuning pipelines using Ray, DeepSpeed, or Hugging Face PEFT/LoRA.",
          candidate_evidence: "Orchestrated data pipelines with Apache Airflow; fine-tuned single-GPU models with PEFT.",
          gap_reasoning: "Airflow handles workflow scheduling; Ray handles distributed compute actors and memory-shared tensors.",
          actionable_fix: "Highlight distributed actor patterns and memory-aware batch scheduling."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Built semantic search service using pgvector and LangChain to power internal document Q&A.",
          tailored_bullet: "Engineered low-latency hybrid RAG retrieval pipeline with pgvector HNSW indexing and reciprocal rank fusion, achieving sub-45ms vector search across 3M embeddings.",
          targeted_skill: "Vector Database Optimization",
          enhancement_type: "QUANTIFICATION"
        },
        {
          original_bullet: "Developed FastAPI endpoints streaming LLM responses from OpenAI and Anthropic APIs.",
          tailored_bullet: "Architected asynchronous FastAPI streaming gateway with Server-Sent Events (SSE), token-rate limiting, and structured JSON output validation for 500+ concurrent user sessions.",
          targeted_skill: "LLM Streaming Infrastructure",
          enhancement_type: "IMPACT_REFRAME"
        }
      ],
      tailored_resume_markdown: `# Marcus Thorne
**AI/ML & LLM Platform Infrastructure Engineer**
marcus.thorne@example.com • github.com/marcusthorne-ai • linkedin.com/in/marcusthorne-ai

---

### PROFESSIONAL PROFILE
AI Systems Engineer with 4+ years designing high-throughput LLM serving pipelines, RAG retrieval architectures, and transformer model fine-tuning. Experienced with PyTorch, PEFT/LoRA, vector indexing (pgvector, Qdrant), and low-latency asynchronous FastAPI microservices.

---

### CORE COMPETENCIES
- **Inference & Serving:** vLLM, FlashAttention, Continuous Batching, FastAPI (SSE Streaming), gRPC
- **Fine-Tuning & Modeling:** PyTorch, Hugging Face Transformers, PEFT, LoRA, QLoRA
- **Search & Retrieval:** pgvector, Qdrant, Hybrid Sparse/Dense Search, Reciprocal Rank Fusion
- **Infrastructure & Tools:** Docker, AWS SageMaker, Weights & Biases, MLflow, Ray Core`,
      proof_of_work_plans: [
        {
          target_gap_skill: "vLLM, TensorRT-LLM & PagedAttention",
          project_title: "vLLM-StreamHub: High-Throughput Token Serving Engine",
          timeline_days: 7,
          architecture_summary: "Deploy a high-throughput, self-hosted LLM inference gateway using vLLM and PagedAttention with continuous batching, dynamic temperature sampling, and token-level SSE streaming.",
          key_deliverables: [
            "Dockerized vLLM serving container configured with FlashAttention-2 and GPU memory fraction tuning",
            "FastAPI reverse proxy with request queueing and client-disconnect token cancellation",
            "Benchmarking suite measuring TTFT (Time-To-First-Token) and tokens/sec under 100 concurrent requests",
            "Detailed README with performance graphs comparing vanilla HuggingFace vs vLLM throughput"
          ],
          learning_resources: [
            {
              title: "vLLM Official Documentation",
              url: "https://docs.vllm.ai/en/latest/"
            },
            {
              title: "PagedAttention Paper & Architecture",
              url: "https://arxiv.org/abs/2309.06180"
            },
            {
              title: "FlashAttention-2 Technical Overview",
              url: "https://github.com/Dao-AILab/flash-attention"
            }
          ]
        }
      ]
    }
  }
};

export const MOCK_BACKEND_RESULT = DEMO_PRESETS.backend.mockResult;
