export interface FinanceSolution {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technicalDepth: string;
    icon: string;
    stats: { label: string; value: string }[];
    blueprintLink: string;
}

export interface FinanceCapability {
    title: string;
    description: string;
}

export const financePageData = {
    hero: {
        badge: "finance_hero_badge",
        headline: "finance_hero_headline",
        subhead: "finance_hero_subhead",
        ctaText: "finance_hero_cta",
        secondaryCta: "finance_hero_sec_cta"
    },
    solutions: [
        {
            id: "sovereign-vaults",
            title: "fin_sol_vaults_title",
            subtitle: "fin_sol_vaults_sub",
            description: "fin_sol_vaults_desc",
            technicalDepth: "Our vault architecture leverages Thales Luna HSMs (FIPS 140-2 Level 3) integrated with GCP Cloud KMS via EKM. AES-256-GCM encryption with customer-managed key hierarchies. Automatic key rotation with cryptographic attestation. PCI-DSS Level 1 certified infrastructure with air-gapped key ceremony procedures and M-of-N custodian quorums.",
            icon: "vault",
            stats: [
                { label: "Key Control", value: "100%" },
                { label: "HSM Uptime", value: "99.999%" },
                { label: "PCI-DSS", value: "Level 1" }
            ],
            blueprintLink: "#"
        },
        {
            id: "fraud-defense",
            title: "fin_sol_fraud_title",
            subtitle: "fin_sol_fraud_sub",
            description: "fin_sol_fraud_desc",
            technicalDepth: "Our fraud engine uses PyTorch Geometric for GNN inference on Neo4j-backed transaction graphs. Custom CUDA kernels for batched message passing achieve <10ms P99 latency. Real-time feature engineering via Apache Flink with exactly-once semantics. Explainable AI (XAI) outputs for regulatory audit with SHAP values per decision.",
            icon: "shield",
            stats: [
                { label: "Latency", value: "<10ms" },
                { label: "Detection", value: "99.4%" },
                { label: "False Pos.", value: "<0.1%" }
            ],
            blueprintLink: "/blueprints/fraud-defense"
        },
        {
            id: "multicloud-exit",
            title: "fin_sol_cloud_title",
            subtitle: "fin_sol_cloud_sub",
            description: "fin_sol_cloud_desc",
            technicalDepth: "Our exit strategy uses Terraform with custom providers for cross-cloud abstraction. NixOS for bit-reproducible infrastructure across all three hyperscalers. Automated chaos engineering (LitmusChaos) validates failover SLAs quarterly. Data replication via Debezium CDC to geographically-distributed PostgreSQL clusters with RPO <1 minute.",
            icon: "cloud",
            stats: [
                { label: "Failover", value: "<15min" },
                { label: "Portability", value: "100%" },
                { label: "RPO", value: "<1min" }
            ],
            blueprintLink: "/blueprints/multicloud-exit"
        }
    ] as FinanceSolution[],
    capabilities: [
        {
            title: "fin_cap_1_title",
            description: "fin_cap_1_desc"
        },
        {
            title: "fin_cap_2_title",
            description: "fin_cap_2_desc"
        },
        {
            title: "fin_cap_3_title",
            description: "fin_cap_3_desc"
        },
        {
            title: "fin_cap_4_title",
            description: "fin_cap_4_desc"
        },
        {
            title: "fin_cap_5_title",
            description: "fin_cap_5_desc"
        },
        {
            title: "fin_cap_6_title",
            description: "fin_cap_6_desc"
        }
    ] as FinanceCapability[]
};
