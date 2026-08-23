export interface VerifiedLink {
  title: string;
  url: string;
  category: string;
  description: string;
}

export const VERIFIED_TECH_DOCS: Record<string, VerifiedLink> = {
  kubernetes_operator: {
    title: "Kubernetes Operator Pattern & CRDs",
    url: "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/",
    category: "Cloud/Orchestration",
    description: "Official guide to custom controllers and resources in Kubernetes."
  },
  kubebuilder: {
    title: "Kubebuilder Book & Quickstart",
    url: "https://book.kubebuilder.io/quick-start.html",
    category: "Cloud/Orchestration",
    description: "SDK for building production-ready Kubernetes APIs using CRDs."
  },
  redis_clustering: {
    title: "Redis Cluster Specification & Invalidation",
    url: "https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/",
    category: "Storage/Caching",
    description: "Official Redis specification on distributed key slot hashing and sharding."
  },
  kafka_streams: {
    title: "Apache Kafka Exactly-Once Processing",
    url: "https://kafka.apache.org/documentation/streams/",
    category: "Event Streaming",
    description: "Kafka Streams client library for high-throughput stream processing."
  },
  webgl_fundamentals: {
    title: "WebGL Fundamentals",
    url: "https://webglfundamentals.org/",
    category: "Frontend/Graphics",
    description: "From fundamentals to 3D shaders and hardware acceleration."
  },
  vllm_docs: {
    title: "vLLM High-Throughput LLM Serving",
    url: "https://docs.vllm.ai/en/latest/",
    category: "AI/ML Infrastructure",
    description: "PagedAttention and fast memory-efficient inference serving for LLMs."
  },
  pgvector: {
    title: "pgvector Vector Similarity Search",
    url: "https://github.com/pgvector/pgvector",
    category: "AI/ML Databases",
    description: "Open-source vector similarity search for PostgreSQL with HNSW indexing."
  }
};
