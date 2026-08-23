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
    name: "Go / Distributed Systems",
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
        }
      ],
      tailored_resume_markdown: `# Alex Rivera
**Senior Backend & Distributed Systems Engineer**
alex.rivera@example.com • github.com/alexrivera-dev • linkedin.com/in/alexrivera-dev

---

### EXECUTIVE SUMMARY
Performance-driven Backend Systems Engineer with 4.5+ years specializing in low-latency Go microservices, distributed caching, and scalable SQL architecture. Experienced in handling 15M+ daily requests, optimizing p99 database response times by 40%, and managing containerized microservices on Kubernetes.`,
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
            }
          ]
        }
      ]
    }
  },

  frontend: {
    id: "frontend",
    name: "React / Frontend Architect",
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
          category: "Canvas & WebGL Engines",
          skill_name: "WebGL / 2D Canvas Interactive Rendering",
          importance: "CRITICAL",
          status: "CRITICAL_GAP",
          jd_requirement_context: "Complex canvas / WebGL / WebAssembly graphics or interactive visual diffing engines.",
          candidate_evidence: "Used SVG and Recharts DOM-based charting; no direct WebGL/Canvas shader experience.",
          gap_reasoning: "Candidate uses standard DOM/SVG charting and lacks hardware-accelerated WebGL / Canvas pipeline experience.",
          actionable_fix: "Build a 7-day 60FPS Canvas/WebGL AST Visualizer proof-of-work project."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Optimized bundle size and asset loading, improving Lighthouse performance score from 68 to 94.",
          tailored_bullet: "Architected modern chunk-splitting and dynamic import strategies across Next.js 14 App Router, reducing LCP by 1.8s, improving INP to <50ms, and elevating Lighthouse performance from 68 to 96.",
          targeted_skill: "Web Performance & Core Web Vitals",
          enhancement_type: "QUANTIFICATION"
        }
      ],
      tailored_resume_markdown: `# Elena Vance
**Staff Frontend Systems Architect**
elena.vance@example.com • github.com/elenavance • linkedin.com/in/elenavance

---

### PROFESSIONAL PROFILE
Frontend Architect with 6+ years specializing in Next.js App Router, high-scale Design Systems, and Core Web Vitals optimization.`,
      proof_of_work_plans: [
        {
          target_gap_skill: "WebGL / 2D Canvas Interactive Rendering",
          project_title: "PixAST: High-Performance Canvas AST Visualizer",
          timeline_days: 7,
          architecture_summary: "Build an interactive 60fps canvas-based hierarchical graph renderer capable of visualizing 10,000+ AST nodes with spatial hashing and WebGL particle shaders.",
          key_deliverables: [
            "Custom 2D HTML5 Canvas rendering loop with requestAnimationFrame and quadtree spatial indexing",
            "Hardware-accelerated WebGL glow/diff shader for node status highlights",
            "Interactive pinch-to-zoom, node drag-and-drop, and minimap viewport indicator"
          ],
          learning_resources: [
            {
              title: "HTML5 Canvas Deep Dive & Optimizations",
              url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas"
            }
          ]
        }
      ]
    }
  },

  aiml: {
    id: "aiml",
    name: "AI/ML & LLM Platform",
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

SKILLS
- Python, PyTorch, Hugging Face, Scikit-Learn
- FastAPI, Docker, AWS (SageMaker, S3, EC2)
- Vector DBs: pgvector, Pinecone`,
    mockResult: {
      role_title: "Staff AI/ML Infrastructure Engineer",
      overall_match_score: 72,
      category_scores: {
        "PyTorch & Transformers": 88,
        "Inference Serving & GPU Optimization": 50,
        "Vector Search & RAG": 82,
        "API & Streaming Infrastructure": 90
      },
      competencies: [
        {
          category: "Inference Serving & GPU Optimization",
          skill_name: "vLLM, TensorRT-LLM & PagedAttention",
          importance: "CRITICAL",
          status: "CRITICAL_GAP",
          jd_requirement_context: "Deep expertise in PyTorch, CUDA kernel profiling, and GPU memory optimization (vLLM, TensorRT-LLM, FlashAttention-2).",
          candidate_evidence: "Used managed OpenAI APIs and standard SageMaker inference endpoints without low-level vLLM engine orchestration.",
          gap_reasoning: "Lacks hands-on experience configuring high-throughput continuous batching engines (vLLM / TensorRT-LLM) or CUDA kernel tuning.",
          actionable_fix: "Execute the 7-day vLLM-StreamHub proof-of-work project implementing dynamic batching and FlashAttention."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Built semantic search service using pgvector and LangChain to power internal document Q&A.",
          tailored_bullet: "Engineered low-latency hybrid RAG retrieval pipeline with pgvector HNSW indexing and reciprocal rank fusion, achieving sub-45ms vector search across 3M embeddings.",
          targeted_skill: "Vector Database Optimization",
          enhancement_type: "QUANTIFICATION"
        }
      ],
      tailored_resume_markdown: `# Marcus Thorne
**AI/ML & LLM Platform Infrastructure Engineer**
marcus.thorne@example.com • github.com/marcusthorne-ai • linkedin.com/in/marcusthorne-ai`,
      proof_of_work_plans: [
        {
          target_gap_skill: "vLLM, TensorRT-LLM & PagedAttention",
          project_title: "vLLM-StreamHub: High-Throughput Token Serving Engine",
          timeline_days: 7,
          architecture_summary: "Deploy a high-throughput, self-hosted LLM inference gateway using vLLM and PagedAttention with continuous batching and token-level SSE streaming.",
          key_deliverables: [
            "Dockerized vLLM serving container configured with FlashAttention-2",
            "FastAPI reverse proxy with request queueing and client-disconnect token cancellation",
            "Benchmarking suite measuring TTFT and tokens/sec under 100 concurrent requests"
          ],
          learning_resources: [
            {
              title: "vLLM Official Documentation",
              url: "https://docs.vllm.ai/en/latest/"
            }
          ]
        }
      ]
    }
  },

  devops: {
    id: "devops",
    name: "DevOps & Cloud Platform",
    badge: "DEVOPS_ARCHITECT",
    jdTitle: "Lead Cloud Infrastructure & Platform Engineer (AWS / K8s / IaC)",
    jd: `Role: Lead Cloud Platform & DevOps Engineer
Requirements:
- 6+ years managing multi-region cloud infrastructure on AWS (VPC, Transit Gateway, IAM, EKS).
- Production Infrastructure as Code (Terraform, Terragrunt, OpenTofu) with automated drift detection.
- Multi-cluster Kubernetes management, ArgoCD GitOps, Helm charts, and service mesh (Istio/Linkerd).
- Observability pipelines with Prometheus, Grafana Mimir, Loki, Tempo, and OpenTelemetry.
- Zero-trust security, HashiCorp Vault secrets management, SOC2/HIPAA compliance automation.
- CI/CD automation with GitHub Actions, reusable workflows, container scanning (Trivy), and cosign signing.`,
    resume: `Devon Chen
Senior DevOps Engineer | devon.chen@example.com | github.com/devonchen-ops

SUMMARY
DevOps Engineer with 5 years managing AWS infrastructure, Docker container pipelines, and CI/CD automation. Strong Linux administration background and monitoring expertise.

EXPERIENCE
DevOps Engineer - CloudScale Dynamics (2021 - Present)
- Wrote Terraform modules to provision AWS EC2, S3, RDS, and Application Load Balancers.
- Deployed microservices to AWS EKS clusters using Helm charts and Jenkins CI/CD.
- Configured CloudWatch alarms and basic Prometheus/Grafana dashboards for server metrics.
- Automated daily database snapshots and cross-region S3 bucket replication.

SysAdmin / Infrastructure Tech - NextGen Hosting (2019 - 2021)
- Managed Linux Ubuntu/CentOS servers, firewall rules, and SSL certificate renewals.
- Built bash and Python scripts to automate user provisioning and log rotation.

SKILLS
- AWS (EC2, S3, RDS, IAM, EKS), Terraform, Docker, Helm, Linux (Ubuntu/CentOS), Bash, Python, Git`,
    mockResult: {
      role_title: "Lead Cloud Platform & DevOps Engineer",
      overall_match_score: 74,
      category_scores: {
        "Cloud Infrastructure (AWS)": 88,
        "IaC & Terraform": 82,
        "GitOps & Kubernetes": 60,
        "Observability & Telemetry": 70,
        "Security & Zero-Trust": 45
      },
      competencies: [
        {
          category: "GitOps & Kubernetes",
          skill_name: "ArgoCD GitOps & Istio Service Mesh",
          importance: "CRITICAL",
          status: "CRITICAL_GAP",
          jd_requirement_context: "Multi-cluster Kubernetes management, ArgoCD GitOps, Helm charts, and service mesh (Istio/Linkerd).",
          candidate_evidence: "Uses standard Helm charts and Jenkins push-based deployments; no declared GitOps or Service Mesh experience.",
          gap_reasoning: "Missing declarative GitOps controller (ArgoCD/Flux) and mTLS service mesh traffic management.",
          actionable_fix: "Build the 7-day ArgoGitOps-Mesh lab project to demonstrate progressive canary syncs and mTLS."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Wrote Terraform modules to provision AWS EC2, S3, RDS, and Application Load Balancers.",
          tailored_bullet: "Architected modular, reusable Terraform Infrastructure-as-Code modules provisioning multi-tier AWS environments with automated state locking in DynamoDB and CI drift detection.",
          targeted_skill: "Terraform Infrastructure as Code",
          enhancement_type: "QUANTIFICATION"
        }
      ],
      tailored_resume_markdown: `# Devon Chen
**Lead Cloud Platform & DevOps Engineer**
devon.chen@example.com • github.com/devonchen-ops`,
      proof_of_work_plans: [
        {
          target_gap_skill: "ArgoCD GitOps & Istio Service Mesh",
          project_title: "GitOps-MeshOps: Declarative Multi-Cluster ArgoCD Engine",
          timeline_days: 7,
          architecture_summary: "Set up a declarative GitOps repository using ArgoCD ApplicationSets and Istio service mesh to manage zero-downtime canary deployments with automated rollback.",
          key_deliverables: [
            "ArgoCD ApplicationSet manifests managing multi-environment cluster targets",
            "Istio VirtualService and DestinationRule canary routing configuration",
            "Automated Prometheus metric analysis for canary rollback"
          ],
          learning_resources: [
            {
              title: "ArgoCD Official Documentation",
              url: "https://argo-cd.readthedocs.io/"
            }
          ]
        }
      ]
    }
  },

  fullstack: {
    id: "fullstack",
    name: "Full-Stack Product Engineer",
    badge: "FULLSTACK_ENGINEER",
    jdTitle: "Senior Full-Stack Product Engineer (TypeScript / Next.js / Node / PostgreSQL)",
    jd: `Role: Senior Full-Stack Product Engineer
Requirements:
- 5+ years of full-stack web development shipping end-to-end user-facing products.
- Deep expertise in TypeScript across both frontend (React, Next.js App Router, Tailwind CSS) and backend (Node.js, Express, NestJS).
- Relational database modeling with PostgreSQL, Prisma ORM, Drizzle, and transactional integrity.
- Real-time features with WebSockets, SSE (Server-Sent Events), or Redis pub/sub.
- Third-party API integrations (Stripe payments, OAuth 2.0 / Auth0, Resend email).
- Writing clean, testable code with Vitest, Playwright, and GitHub Actions CI/CD.`,
    resume: `Maya Lin
Full-Stack Developer | maya.lin@example.com | github.com/mayalin-dev

SUMMARY
Full-Stack Software Engineer with 4 years building web applications with React, Node.js, and PostgreSQL. Experienced in API development and responsive modern UIs.

EXPERIENCE
Full-Stack Developer - NovaTech Solutions (2022 - Present)
- Built user onboarding dashboards and customer portals using React, TypeScript, and Tailwind CSS.
- Developed REST APIs in Node.js and Express with PostgreSQL database and Prisma ORM.
- Integrated Stripe checkout APIs for subscription billing and webhook notifications.
- Wrote unit and integration tests using Jest.

Frontend Developer - Spark Digital (2020 - 2022)
- Built responsive customer-facing web pages in React and CSS Modules.
- Connected frontend components to backend REST endpoints.

SKILLS
- TypeScript, JavaScript, React, Next.js, Node.js, Express, PostgreSQL, Prisma, Tailwind CSS, Jest, Git`,
    mockResult: {
      role_title: "Senior Full-Stack Product Engineer",
      overall_match_score: 86,
      category_scores: {
        "TypeScript & Modern React": 94,
        "Node.js & Backend APIs": 90,
        "PostgreSQL & Database Modeling": 88,
        "Real-Time Architecture": 55,
        "Testing & CI/CD": 80
      },
      competencies: [
        {
          category: "Real-Time Architecture",
          skill_name: "WebSockets & Event Streams (SSE)",
          importance: "PREFERRED",
          status: "ADJACENT",
          jd_requirement_context: "Real-time features with WebSockets, SSE (Server-Sent Events), or Redis pub/sub.",
          candidate_evidence: "Built webhook event processors for Stripe; no direct bidirectional WebSocket socket.io implementation listed.",
          gap_reasoning: "Webhook receivers handle inbound HTTP events; WebSockets maintain persistent full-duplex client connections.",
          actionable_fix: "Highlight real-time event broadcasting and optimistic UI state synchronization."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Integrated Stripe checkout APIs for subscription billing and webhook notifications.",
          tailored_bullet: "Architected end-to-end Stripe billing subscription engine handling webhooks with idempotent database updates, processing $250k+ in ARR with 99.9% billing transaction accuracy.",
          targeted_skill: "Payment Systems & Webhook Idempotency",
          enhancement_type: "QUANTIFICATION"
        }
      ],
      tailored_resume_markdown: `# Maya Lin
**Senior Full-Stack Product Engineer**
maya.lin@example.com • github.com/mayalin-dev`,
      proof_of_work_plans: [
        {
          target_gap_skill: "WebSockets & Event Streams (SSE)",
          project_title: "SyncRoom: Real-Time Collaborative Document Canvas",
          timeline_days: 7,
          architecture_summary: "Build a real-time collaborative workspace with WebSockets, Redis pub/sub message distribution, and CRDT conflict resolution.",
          key_deliverables: [
            "WebSocket gateway in Node.js with Redis backplane scaling",
            "Optimistic state sync with offline recovery queue",
            "Multi-client presence cursor indicators"
          ],
          learning_resources: [
            {
              title: "WebSocket Protocol Specification",
              url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
            }
          ]
        }
      ]
    }
  },

  systems: {
    id: "systems",
    name: "Rust / Systems & Low-Latency",
    badge: "SYSTEMS_ENGINEER",
    jdTitle: "Staff Systems Engineer - Low-Latency Engine (Rust / C++)",
    jd: `Role: Staff Systems Engineer - High-Performance Execution Engine
Requirements:
- 6+ years of systems programming in Rust and modern C++ (C++17/20).
- Deep mastery of low-latency systems (lock-free data structures, memory alignment, cache-line efficiency, SIMD vectorization).
- Asynchronous runtime architecture with Tokio, epoll/io_uring, and non-blocking network I/O.
- Memory safety, zero-cost abstractions, custom allocators (jemalloc), and benchmark profiling (perf, flamegraphs).
- High-throughput protocol serialization (FlatBuffers, Cap'n Proto, Protobuf).
- Linux kernel tuning (CPU pinning, isolcpus, huge pages, socket bypass).`,
    resume: `Jonas Richter
Systems & C++ Software Engineer | jonas.richter@example.com | github.com/jonasrichter-sys

SUMMARY
Systems Engineer with 5 years building high-performance backend tools and C++ applications. Experienced in memory profiling and multithreading.

EXPERIENCE
C++ Software Engineer - QuantCore Technologies (2021 - Present)
- Developed order routing microservices in C++17 with socket communication.
- Profiling memory allocation using Valgrind and GDB to minimize heap fragmentation.
- Implemented multithreaded worker pools processing incoming market ticker streams.

Software Developer - BaseLine Systems (2019 - 2021)
- Built internal file parsing utilities in C++ and Python.
- Refactored legacy serialization code, improving parsing speeds by 25%.

SKILLS
- C++, C, Python, Multithreading, Linux, GDB, CMake, Git, Socket Programming`,
    mockResult: {
      role_title: "Staff Systems Engineer - Low-Latency Engine",
      overall_match_score: 70,
      category_scores: {
        "C++ Systems Programming": 92,
        "Rust & Tokio Runtime": 35,
        "Low-Latency & Lock-Free Data Structures": 60,
        "Kernel Tuning & Linux I/O": 65
      },
      competencies: [
        {
          category: "Rust & Tokio Runtime",
          skill_name: "Rust Memory Safety & Tokio Async Engine",
          importance: "CRITICAL",
          status: "CRITICAL_GAP",
          jd_requirement_context: "6+ years of systems programming in Rust and modern C++ (C++17/20).",
          candidate_evidence: "Strong C++17 experience with multithreading; no explicit production Rust or Tokio projects mentioned.",
          gap_reasoning: "Candidate is a skilled C++ systems programmer who needs to demonstrate Rust borrow checker and Tokio async mastery.",
          actionable_fix: "Complete the 7-day Rust-Tokio-LSM storage engine proof-of-work project."
        }
      ],
      tailored_bullet_patches: [
        {
          original_bullet: "Profiling memory allocation using Valgrind and GDB to minimize heap fragmentation.",
          tailored_bullet: "Engineered zero-allocation hot paths and custom memory arena pools in C++17, reducing p99 order execution latency from 1.2ms to 180μs under heavy load.",
          targeted_skill: "Low-Latency Memory Optimization",
          enhancement_type: "QUANTIFICATION"
        }
      ],
      tailored_resume_markdown: `# Jonas Richter
**Staff Systems & Low-Latency Engineer**
jonas.richter@example.com • github.com/jonasrichter-sys`,
      proof_of_work_plans: [
        {
          target_gap_skill: "Rust Memory Safety & Tokio Async Engine",
          project_title: "RustAsyncKV: Lock-Free Tokio Storage Engine",
          timeline_days: 7,
          architecture_summary: "Build an ultra-fast embedded key-value storage engine in Rust using Tokio, io_uring, and lock-free crossbeam channels.",
          key_deliverables: [
            "Lock-free MemTable using skip-lists in Rust",
            "Write-Ahead-Log (WAL) with direct I/O zero-copy buffer writes",
            "Criterion benchmarks comparing throughput against RocksDB"
          ],
          learning_resources: [
            {
              title: "The Rust Programming Language",
              url: "https://doc.rust-lang.org/book/"
            }
          ]
        }
      ]
    }
  }
};

export const MOCK_BACKEND_RESULT = DEMO_PRESETS.backend.mockResult;
