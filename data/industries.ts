export interface Industry {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    engineeringMoat: string;
    tags: string[];
    image: string;
    link: string;
}

export const industries: Industry[] = [
    {
        id: "cgs",
        title: "Consumer Goods",
        subtitle: "GenAI Factory Governance",
        description: "Highlight my work on Nestlé's $14M GenAI Factory. Ensuring responsible AI across the value chain tailored for FMCG giants.",
        engineeringMoat: "Graph-Based Traceability (Neo4j/GNN)",
        tags: ["GenAI", "Governance", "Analytics"],
        image: "/images/industries/retail-blueprint.jpg",
        link: "/industries/consumer-goods"
    },
    {
        id: "retail",
        title: "Retail",
        subtitle: "Staffing Efficiency & Analytics",
        description: "Highlight 15% staffing efficiency gains. Specialized auditing for pricing engines, promotion analytics, and consumer-facing GenAI agents.",
        engineeringMoat: "Predictive Resource Allocation",
        tags: ["Efficiency", "Staffing", "Optimization"],
        image: "/images/industries/retail-blueprint.jpg",
        link: "/industries/retail"
    },
    {
        id: "cmt",
        title: "CMT (Telecom)",
        subtitle: "Call Center Volume Reduction",
        description: "Focus on the 22% call center volume reduction. Automated conformity assessments for customer service AI agents.",
        engineeringMoat: "Conversational AI Auditing",
        tags: ["Telecom", "Call Center", "Automation"],
        image: "/images/industries/finance-blueprint.jpg", // Placeholder
        link: "/industries/cmt"
    },
    {
        id: "finance",
        title: "Financial Services",
        subtitle: "DORA & High-Risk AI Auditing",
        description: "Focus on DORA and ROBERTa-based auditing. Automated conformity assessments for algorithmic trading and credit scoring models.",
        engineeringMoat: "Cryptographic Key Sharding (Thales/GCP EKM)",
        tags: ["DORA", "EU AI Act", "Auditing"],
        image: "/images/industries/finance-blueprint.jpg",
        link: "/industries/finance"
    },
    {
        id: "energy",
        title: "Energy & Utilities",
        subtitle: "Smart Grid & VPP Orchestration",
        description: "Highlight Smart Grid & VPP orchestration. High-frequency telemetry for decentralized energy resources using deterministic edge kernels.",
        engineeringMoat: "Deterministic Kernel Scheduling (PREEMPT_RT)",
        tags: ["Smart Grid", "VPP", "CSRD"],
        image: "/images/industries/energy-blueprint.jpg",
        link: "/industries/energy"
    },
    {
        id: "automotive",
        title: "Industrial & Automotive",
        subtitle: "Catena-X Supply Chain Accuracy",
        description: "Focus on Catena-X supply chain accuracy. Real-time validation for autonomous systems and predictive maintenance.",
        engineeringMoat: "Binary Protocol Parsing (S7comm/Modbus)",
        tags: ["Catena-X", "Edge AI", "VSS"],
        image: "/images/industries/manufacturing-blueprint.jpg",
        link: "/industries/automotive"
    },
    {
        id: "health",
        title: "Life Sciences & Pharma",
        subtitle: "EHDS & Research Enclaves",
        description: "Focus on EHDS and research enclaves. Privacy-preserving research environments using Trusted Execution Environments (TEE).",
        engineeringMoat: "Confidential Computing (Intel SGX/AMD SEV)",
        tags: ["EHDS", "GDPR", "Federated Learning"],
        image: "/images/industries/healthcare-blueprint.jpg",
        link: "/industries/health"
    }
];
