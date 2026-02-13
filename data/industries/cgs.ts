export interface CGSSolution {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technicalDepth: string;
    icon: string;
    stats: { label: string; value: string }[];
    blueprintLink: string;
    tag?: string;
}

export interface CGSCapability {
    title: string;
    description: string;
}

export const cgsPageData = {
    hero: {
        headline: "Immutable Product Passports.",
        subhead: "Deploy W3C-compliant decentralized identity networks for circular economy tracking. From ESPR compliance to anti-counterfeit verification.",
        badge: "Consumer Goods & Services",
        ctaText: "Deploy Passport Node",
        secondaryCta: "View API Specification"
    },
    solutions: [
        {
            id: "dpp",
            title: "Digital Product Passports",
            subtitle: "ESPR-Compliant Data Architecture",
            description: "Sovereign validation of supply chain provenance. We engineer graph-based data models that capture every touchpoint in your product lifecycle.",
            technicalDepth: "Our DPP architecture uses Neo4j for supply chain graph modeling, combined with W3C Verifiable Credentials for tamper-proof data attestations. We implement IPFS-based content addressing for document permanence and integrate with GS1 Digital Link standards for QR-code based consumer access.",
            icon: "passport",
            tag: "Annex IV Compliant Data Architecture.",
            stats: [
                { label: "Data Points", value: "500K+" },
                { label: "SKU Coverage", value: "100%" },
                { label: "Compliance Rate", value: "99.2%" }
            ],
            blueprintLink: "#"
        },
        {
            id: "scope3",
            title: "Scope 3 Audit Engine",
            subtitle: "Automated Carbon Accounting",
            description: "Automated CSRD/ESPR reporting pipelines for global supply chain transparency.",
            technicalDepth: "Our Scope 3 engine leverages Apache Kafka for real-time data streaming from ERP systems, combined with a custom-built emissions factor database (IPCC/GHG Protocol compliant). We use dbt for data transformation and Apache Superset for executive dashboards, all running on a sovereign cloud infrastructure.",
            icon: "leaf",
            stats: [
                { label: "Categories", value: "All 15" },
                { label: "Accuracy", value: "±3%" },
                { label: "Report Time", value: "< 24h" }
            ],
            blueprintLink: "#"
        },
        {
            id: "anti-counterfeit",
            title: "Anti-Counterfeit Mesh",
            subtitle: "Cryptographic Verification",
            description: "Eliminate gray market diversion with cryptographic tag verification at every scan point.",
            technicalDepth: "Our sensing stack deploys TensorFlow Lite models on NVIDIA Jetson edge devices, connected via LoRaWAN for low-power, long-range connectivity. Demand forecasting uses a hybrid LSTM/Transformer architecture trained on 3 years of POS data, integrated directly with SAP IBP or Oracle SCM Cloud.",
            icon: "scan",
            stats: [
                { label: "Detection", value: "< 500ms" },
                { label: "Accuracy", value: "98.7%" },
                { label: "Waste Reduction", value: "35%" }
            ],
            blueprintLink: "#"
        }
    ] as CGSSolution[],
    capabilities: [
        {
            title: "Graph-Based Supply Chain Mapping",
            description: "Neo4j / Graph Neural Networks (GNN) for multi-tier supplier visibility and risk propagation analysis."
        },
        {
            title: "Automated CSRD/ESPR Reporting Pipelines",
            description: "dbt + Apache Airflow workflows that generate audit-ready sustainability reports from raw ERP data."
        },
        {
            title: "Legacy ERP Integration (SAP/Oracle)",
            description: "Pre-built connectors for S/4HANA, Oracle Fusion, and JD Edwards with real-time CDC (Change Data Capture) via Debezium."
        },
        {
            title: "Edge AI for Shelf-Level Monitoring",
            description: "TensorFlow Lite models on NVIDIA Jetson for sub-second inventory detection without cloud latency."
        },
        {
            title: "Cryptographic Traceability",
            description: "W3C Verifiable Credentials + DID infrastructure for tamper-proof product provenance across fragmented supply chains."
        },
        {
            title: "Real-Time Demand Sensing",
            description: "Hybrid LSTM/Transformer models trained on POS, weather, and social data for 15%+ forecast accuracy improvement."
        }
    ] as CGSCapability[],
    roiCalculator: {
        title: "ESG Compliance Readiness Assessment",
        description: "Estimate your organization's readiness for ESPR, CSRD, and Digital Product Passport requirements.",
        ctaText: "Calculate Your ESG Compliance Readiness"
    }
};
