"use client";
import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Search, Brain, Zap, Globe, Shield, Activity } from "lucide-react";

export default function SearchPage() {
    return (
        <ProductDetailTemplate
            title="Sovereign Search Engine"
            subtitle="Local-First Vector Search & Privacy-Preserving Discovery"
            description="Insulate your enterprise from geopolitical legal instability. Adraca Sovereign Search is a hybrid retrieval microservice deployed strictly within European boundaries, eliminating trans-Atlantic round-trip latency to maximize Gross Merchandise Value (GMV)."
            videoTitle="SEARCH-FUSION-CORE-ALPHA"
            heroImageSrc="/assets/products/search/hero_demo.webp"
            evidenceItems={[
                { 
                    title: "Sovereign Pulse Intent Map",
                    imageSrc: "/assets/products/search/screenshots/pulse.png"
                },
                { 
                    title: "Multimodal Vision Search",
                    imageSrc: "/assets/products/search/screenshots/vision.png"
                },
                { 
                    title: "Cross-Lingual Knowledge Bridge",
                    imageSrc: "/assets/products/search/screenshots/lingual.png"
                },
                { 
                    title: "Visionary Command Stack",
                    imageSrc: "/assets/products/search/screenshots/command.png"
                }
            ]}
            features={[
                {
                    title: "Schrems II Data Boundary",
                    desc: "Operates safely within zero-trust architecture immune to outer CLOUD Acts. No sensitive query headers or clickstream logs are passed to external inference points.",
                    icon: <Shield size={24} />
                },
                {
                    title: "Hybrid Reciprocal Rank Fusion",
                    desc: "Parallels semantic vector reasoning with sparse keyword coordinates using RRF, optimizing relevance thresholds for exact SKU finding without manual fine-tuning.",
                    icon: <Zap size={24} />
                },
                {
                    title: "Explainable Relevance (GDPR Art 22)",
                    desc: "Audit-ready logging metrics explaining prioritization decisions. Includes a 'Neutral Search' override to safely disable automated profile-ranking pipelines.",
                    icon: <Brain size={24} />
                }
            ]}
            specs={[
                { label: "Core Architecture", value: "Hybrid BM25 + Vector Search (RRF)" },
                { label: "Inference Model", value: "In-House Local Transformer Mesh" },
                { label: "Privacy Gate", value: "Neutral Search Bypass / stateless tokens" },
                { label: "Latency Budget", value: "Target P99 < 100ms" }
            ]}
            terminalLogs={[
                "INITIALIZING HYBRID FUSION CORE...",
                "LOADING VECTOR INDICES [ATTACHED: LOCAL-SSD]...",
                "SUCCESS: 14M KNOWLEDGE NODES RESOLVED.",
                "CONNECTING TO SOVEREIGN PULSE INTENT ENGINE...",
                "RESOLVING MULTIMODAL TENSORS (VISION + TEXT)...",
                "CHECKING CONSENT MANAGEMENT TOKEN [CMP: STATERLESS]...",
                "RUNNING EXPLAINABLE RANKING PIPELINE...",
                "DISCOVERY COMPLETE: 0.042 SECONDS."
            ]}
        />
    );
}
