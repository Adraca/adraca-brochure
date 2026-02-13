export interface RetailSolution {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technicalDepth: string;
    icon: string;
    stats: { label: string; value: string }[];
    blueprintLink: string;
}

export interface RetailCapability {
    title: string;
    description: string;
}

export const retailPageData = {
    hero: {
        badge: "Local Vector Store",
        headline: "Zero-Latency Edge Search.",
        subhead: "Cloud-based search is too slow for in-store kiosks. Deploy Sovereign Search nodes on-premise for millisecond catalog queries.",
        ctaText: "Download Edge Node",
        secondaryCta: "View Architecture"
    },
    solutions: [
        {
            id: "sovereign-search", // Renamed ID
            title: "Sovereign Search",
            subtitle: "Vector-Native Catalog",
            description: "Self-hosted vector search engine for product catalogs. Zero data leakage to external search providers.",
            technicalDepth: "Our Sovereign Search architecture runs on local NVMe-optimized instances using Rust-based vector indexing (Qdrant/Tantivy wrappers). It supports hybrid keyword+vector queries with custom reranking models trained on your specific SKU taxonomy. Fully air-gapped capability for high-security retail environments.",
            icon: "search",
            stats: [
                { label: "Query Time", value: "<5ms" },
                { label: "Uptime", value: "100%" },
                { label: "Data Leak", value: "0%" }
            ],
            blueprintLink: "#"
        },
        {
            id: "edge-shelf-sync",
            title: "Edge-Shelf Sync",
            subtitle: "Low-Latency Arch Linux Nodes",
            description: "Hardened Arch Linux kernels for real-time shelf-to-cloud synchronization.",
            technicalDepth: "Our edge stack runs on custom Arch Linux images with PREEMPT_RT patched kernels for deterministic scheduling. LoRaWAN/NB-IoT connectivity for low-power, long-range shelf sensors. TensorFlow Lite models for on-device product recognition, with OTA updates via Mender.io. Zero-trust architecture with mTLS for all edge-to-cloud communication.",
            icon: "cpu",
            stats: [
                { label: "Sync Latency", value: "<100ms" },
                { label: "Uptime", value: "99.99%" },
                { label: "Power", value: "5W Edge" }
            ],
            blueprintLink: "/blueprints/edge-shelf"
        },
        {
            id: "dpp-retail-node",
            title: "DPP Retail Node",
            subtitle: "Consumer-Facing Product Passport",
            description: "The consumer interface for Digital Product Passports. Generate GS1-compliant QR codes backed by immutable ledger data.",
            technicalDepth: "DPP Retail Nodes use GS1 Digital Link standards for QR encoding, connected to a Neo4j graph database storing product lineage. W3C Verifiable Credentials ensure tamper-proof attestations. Consumer-facing PWA with 3D product visualization (Three.js) and AR try-on capabilities via WebXR Device API.",
            icon: "qr",
            stats: [
                { label: "Scan Time", value: "<1s" },
                { label: "SKU Coverage", value: "100%" },
                { label: "Data Points", value: "50+" }
            ],
            blueprintLink: "/blueprints/dpp-retail"
        }
    ] as RetailSolution[],
    capabilities: [
        {
            title: "Privacy-Preserving Personalization",
            description: "Differential Privacy algorithms that enable real-time personalization without exposing individual customer data. ε-differential guarantees configurable per use case."
        },
        {
            title: "Semantic Product Search",
            description: "Vector database integration (Pinecone/Weaviate) for natural language product search. Embedding models fine-tuned on retail taxonomies."
        },
        {
            title: "Automated CSRD Reporting",
            description: "dbt + Airflow pipelines that generate CSRD-compliant sustainability reports from POS, inventory, and supplier data."
        },
        {
            title: "Legacy POS Integration",
            description: "Pre-built connectors for Oracle Retail, SAP CAR, and legacy POS systems with real-time CDC (Debezium) to Cloud Data Mesh."
        },
        {
            title: "Inventory Heatmaps",
            description: "Computer vision-based inventory flow tracking. Optimize stock placement based on real-time movement data."
        },
        {
            title: "Omnichannel Orchestration",
            description: "Unified inventory view across physical stores, warehouses, and e-commerce. Real-time ATP (Available-To-Promise) calculations."
        }
    ] as RetailCapability[]
};
