export interface CMTSolution {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technicalDepth: string;
    icon: string;
    stats: { label: string; value: string }[];
    blueprintLink: string;
}

export interface CMTCapability {
    title: string;
    description: string;
}

export const cmtPageData = {
    hero: {
        badge: "Sovereign CMT Engineering",
        headline: "The Sovereign Backbone of Digital Media.",
        subhead: "From sub-millisecond streaming to DSA-compliant content safety. We build the high-bandwidth, high-trust infrastructure for the 2026 European CMT sector.",
        ctaText: "Request a CMT Infrastructure Audit",
        secondaryCta: "View Technical Documentation"
    },
    solutions: [
        {
            id: "low-latency-streaming",
            title: "Low-Latency Streaming",
            subtitle: "Custom Kernel & eBPF Optimization",
            description: "Custom Kernel & eBPF Optimization. Optimized Linux network stacks for wire-speed processing, eliminating user-space overhead for latency-critical media workloads.",
            technicalDepth: "Our streaming stack uses custom-patched Linux kernels (PREEMPT_RT) with XDP (eXpress Data Path) for kernel-bypass networking. eBPF programs handle packet steering and load balancing at line rate. QUIC protocol with 0-RTT resumption for minimized connection setup. FFmpeg with NVENC/VAAPI for hardware-accelerated transcoding.",
            icon: "zap",
            stats: [
                { label: "Latency", value: "<5ms" },
                { label: "Throughput", value: "100Gbps" },
                { label: "Packet Loss", value: "0.001%" }
            ],
            blueprintLink: "#"
        },
        {
            id: "dsa-governance",
            title: "DSA Content Governance",
            subtitle: "Sovereign AI Moderation Engine",
            description: "Automated content moderation with full Digital Services Act (DSA) compliance. We deploy sovereign AI models for harmful content detection.",
            technicalDepth: "Our DSA engine uses fine-tuned LLaMA models hosted on sovereign GPU clusters (no external API calls). Content decisions are logged to an append-only PostgreSQL instance with cryptographic timestamping (RFC 3161). Automated 'Notice and Action' workflows integrated with national regulators via secure API gateways. Full GDPR Article 22 compliance for automated decision-making.",
            icon: "shield",
            stats: [
                { label: "Detection", value: "99.7%" },
                { label: "Audit Trail", value: "Immutable" },
                { label: "Response", value: "<1hr" }
            ],
            blueprintLink: "#"
        },
        {
            id: "open-telco-cloud",
            title: "Open Telco-Cloud",
            subtitle: "Nix Reproducibility & EKM",
            description: "Carrier-grade cloud infrastructure built on open standards. We use Nix for fully reproducible telco deployments and External Key Management (EKM) for subscriber data sovereignty—no vendor lock-in, full auditability.",
            technicalDepth: "Our telco stack is defined entirely in NixOS for bit-for-bit reproducible builds across all environments. Kubernetes operators for 5G Core Network Functions (AMF, SMF, UPF). Subscriber data encrypted with AES-256-GCM, keys managed via Thales CipherTrust EKM with customer-controlled HSMs. OpenTelemetry for observability, Prometheus/Grafana for SLA monitoring.",
            icon: "cloud",
            stats: [
                { label: "Reproducibility", value: "100%" },
                { label: "Key Control", value: "Full" },
                { label: "Uptime SLA", value: "99.999%" }
            ],
            blueprintLink: "#"
        }
    ] as CMTSolution[],
    capabilities: [
        {
            title: "High-Performance Packet Processing",
            description: "XDP/eBPF programs for kernel-bypass packet processing at 100Gbps+ line rates. DPDK integration for specialized network functions."
        },
        {
            title: "Sovereign Metadata Enclaves",
            description: "Intel SGX/AMD SEV-based secure enclaves for protecting intellectual property rights metadata and DRM key material."
        },
        {
            title: "Automated DSA Reporting Pipelines",
            description: "dbt + Airflow workflows generating DSA Article 15 transparency reports and 'Notice and Action' compliance logs."
        },
        {
            title: "Multi-CDN Orchestration",
            description: "Real-time traffic steering across multiple CDN providers with sovereign EU failover. Anycast DNS with sub-second failover."
        },
        {
            title: "Adaptive Bitrate Intelligence",
            description: "ML-driven ABR algorithms that optimize quality based on real-time network conditions. Per-viewer quality optimization."
        },
        {
            title: "Rights Management Infrastructure",
            description: "DRM-agnostic key server architecture supporting Widevine, PlayReady, and FairPlay with unified policy management."
        }
    ] as CMTCapability[]
};
