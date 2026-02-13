export const blogs = [
    {
        id: "blog-001",
        tag: "KERNEL ENGINEERING",
        title: "Low-Latency Determinism: Custom Arch Linux Kernels for AI",
        date: "Jan 27, 2026",
        readTime: "4 min read",
        author: "Abhishek K.",
        authorAvatar: "/images/team/abhishek.jpg",
        summary: "Standard kernels fail at real-time inference. A deep dive into PREEMPT_RT patching and stripping bloat for millisecond-level latency on NVIDIA A100s.",
        coverImage: "/images/blogs/covers/blog-001-cover.jpg",
        diagramImage: "/images/blogs/diagrams/blog-001-dia.jpg",
        color: "#3b82f6", // Blue
        shape: "shape-default",
        content: [
            { type: "paragraph", text: "When we first started building our sovereign AI stack, the industry standard was clear: 'Just use Ubuntu LTS.' It’s stable, supported, and easy. But as soon as we started piping real-time industrial sensor data into our local LLMs, we hit a wall. Random latency spikes (jitter) of up to 15ms were destroying our determinism. This isn't a problem for a chatbot, but for a factory safety system, 15ms is an eternity. This is the story of why we ditched the standard distro and built a custom PREEMPT_RT kernel on Arch Linux." },
            { type: "heading", text: "The 'Jitter' Problem", id: "the-jitter-problem" },
            { type: "paragraph", text: "We ran a standard `cyclictest` on a fresh Ubuntu 24.04 install running on our NVIDIA A100 cluster. The results were terrifying. While the average latency was fine, the p99 outliers were hitting 12-15ms. The cause? The default Linux 'Completely Fair Scheduler' (CFS). It prioritizes 'fairness' across all tasks—meaning a background update service or a bluetooth daemon could technically stall our inference engine for a few milliseconds." },
            { type: "image", src: "/images/blogs/real-shots/blog-001-grafana.jpg", alt: "FIG 1: The 'Red Line of Death' - Stock Kernel Latency Spikes vs. Our Custom Build.", caption: "FIG 1: The 'Red Line of Death' - Stock Kernel Latency Spikes vs. Our Custom Build." },
            { type: "heading", text: "Compiling 'Linux-Hardened' from Scratch", id: "compiling-linux-hardened" },
            { type: "paragraph", text: "We realized we didn't need a general-purpose OS; we needed a missile guidance system. We turned to Arch Linux for its 'build-it-yourself' philosophy. The goal was simple: Strip everything that isn't strictly necessary for AI inference." },
            { type: "code", lang: "bash", code: `# /usr/src/linux/.config\n# ----------------------\n# 1. Enable Real-Time Preemption\nCONFIG_PREEMPT_RT=y\n\n# 2. Kill the Ticks (No Interrupts on AI Cores)\nCONFIG_NO_HZ_FULL=y\nCONFIG_RCU_NOCB_CPU=y\n\n# 3. Strip the Bloat (Attack Surface Reduction)\n# CONFIG_BLUETOOTH is not set\n# CONFIG_WLAN is not set\n# CONFIG_SOUND is not set\n# CONFIG_PRINTER is not set` },
            { type: "heading", text: "The Result: 2ms Determinism", id: "the-result" },
            { type: "paragraph", text: "After 4 hours of compilation and two failed boots (I forgot to load the NVMe driver—classic mistake), we finally got the system running. The difference was night and day. Our p99 latency dropped to a flat 2ms. More importantly, the memory footprint of the OS idle state dropped from 1.2GB to 300MB, leaving more VRAM for the actual models." },
            { type: "image", src: "/images/blogs/real-shots/blog-001-terminal.jpg", alt: "FIG 2: 'htop' showing the system idling at 300MB RAM with zero background noise.", caption: "FIG 2: 'htop' showing the system idling at 300MB RAM with zero background noise." },
            { type: "paragraph", text: "Building on Arch isn't for everyone. It requires maintenance, patience, and a lot of coffee. But for Adraca, where 'Sovereignty' means 'Total Control,' relying on a black-box kernel from a vendor was never an option. We own the stack, all the way down to the scheduler." }
        ]
    },
    {
        id: "blog-002",
        tag: "SOVEREIGNTY",
        title: "Cryptographic Sovereignty: Implementing GCP External Key Manager (EKM)",
        date: "Jan 25, 2026",
        readTime: "5 min read",
        author: "Abhishek K.",
        authorAvatar: "/images/team/abhishek.jpg",
        summary: "True sovereignty means holding your own keys. A technical guide to decoupling encryption from the cloud provider using Thales/Fortanix integration.",
        coverImage: "/images/blogs/covers/blog-002-cover.jpg",
        diagramImage: "/images/blogs/diagrams/blog-002-dia.jpg",
        color: "#ec4899", // Pink
        shape: "shape-circle",
        content: [
            { type: "paragraph", text: "For a European Enterprise, 'Data Residency' (storing data in Frankfurt) is a legal fiction. If the encryption keys are managed by a US provider (Google, AWS, Azure), that provider is legally compelled to turn them over under the US CLOUD Act. At Adraca, we operate under a 'Zero-Trust' infrastructure policy. We assume the cloud provider is compromised. This article details how we implement Google Cloud's 'External Key Manager' (EKM) to ensure that Google never sees the unencrypted bytes of our clients' data." },
            { type: "heading", text: "The Lie of 'Managed Keys'", id: "managed-keys-lie" },
            { type: "paragraph", text: "Most startups click 'Create Key' in the GCP console and move on. They are using Google-managed keys. This is convenient, but fatal for sovereignty. It means the keys live in the same memory space as the data. We needed a way to separate the 'Lock' (the encrypted data on GCP) from the 'Key' (the master material)." },
            { type: "image", src: "/images/blogs/real-shots/blog-002-ekm-arch.jpg", alt: "FIG 1: The 'Split-Brain' Architecture. Keys live in Munich; Data lives in Frankfurt.", caption: "FIG 1: The 'Split-Brain' Architecture. Keys live in Munich; Data lives in Frankfurt." },
            { type: "heading", text: "The Fix: Thales CipherTrust + GCP EKM", id: "thales-cipher-trust" },
            { type: "paragraph", text: "We deployed a Thales CipherTrust Manager cluster on bare metal in a German co-location center. We then peered this directly with Google's EKM API. The magic happens in the latency. GCP has to 'ask' our Thales box for permission to decrypt every single file. If we cut the connection, the data on Google Cloud instantly becomes cryptographic garbage." },
            { type: "heading", text: "Terraform: Enforcing External Protection", id: "terraform-protection" },
            { type: "code", lang: "hcl", code: `resource "google_kms_crypto_key" "sovereign-key-v1" {\n  name     = "adraca-eu-master-key"\n  key_ring = google_kms_key_ring.eu_ring.id\n  \n  # The Critical Line: DO NOT USE "SOFTWARE"\n  protection_level = "EXTERNAL_VPC" \n\n  version_template {\n    algorithm = "GOOGLE_SYMMETRIC_ENCRYPTION"\n    protection_level = "EXTERNAL_VPC"\n  }\n  \n  # Pointing to our Thales HSM URI\n  external_protection_level_options {\n    external_key_uri = "https://hsm.adraca.eu/keys/v1/..."\n  }\n}` },
            { type: "heading", text: "The Ultimate Audit Log", id: "audit-log" },
            { type: "paragraph", text: "The beauty of this system is observability. Every time BigQuery runs a query, we see a decryption request hit our local HSM logs. We know exactly *who* is looking at *what* and *when*. And if we see an anomaly? We revoke the key locally. Instantly, petabytes of data on the cloud become unreadable. That is true sovereignty." },
            { type: "paragraph", text: "We don't build on the cloud; we build *over* the cloud. By treating hyperscalers as commoditized utility providers and keeping the 'Crown Jewels' (the keys) on-premise, we offer the scale of Google with the privacy of a Swiss bank vault." }
        ]
    },
    {
        id: "blog-003",
        tag: "EU AI ACT",
        title: "Engineering Compliance: Technical Architecture for High-Risk AI",
        date: "Jan 22, 2026",
        readTime: "6 min read",
        author: "Dipti A. Khaparde",
        authorAvatar: "/images/team/founder.jpg",
        summary: "Moving beyond legal theory. How to implement data lineage, model observability, and risk classification pipelines that satisfy the 2026 EU AI Act mandates.",
        coverImage: "/images/blogs/covers/blog-003-cover-v2.jpg",
        diagramImage: "/images/blogs/diagrams/blog-003-dia.jpg",
        color: "#06b6d4", // Cyan
        shape: "shape-pill",
        content: [
            { type: "paragraph", text: "Most startups view the EU AI Act (2026) as a legal hurdle. At Adraca, we view it as a software engineering specification. If you cannot trace a prediction back to the specific training data row that influenced it, you don't just have a legal problem—you have a debugging problem. This article details the technical architecture we deploy for 'High-Risk' AI systems in the automotive and medical sectors." },
            { type: "heading", text: "Are We 'High-Risk'? (The Technical Test)", id: "high-risk-test" },
            { type: "paragraph", text: "The first question our clients ask is, 'Does this apply to us?' The answer lies in Annex III. If your AI is a safety component in a product covered by Union harmonization legislation (like a car or a medical device), you are High-Risk. We use a 'Compliance-as-Code' pipeline to tag every model at the repository level." },
            { type: "image", src: "/images/blogs/real-shots/blog-003-risk-matrix.jpg", alt: "FIG 1: Adraca's automated risk classification pipeline in CI/CD.", caption: "FIG 1: Adraca's automated risk classification pipeline in CI/CD." },
            { type: "heading", text: "Article 10: Data Governance & Management", id: "article-10" },
            { type: "paragraph", text: "Article 10.3 requires training, validation, and testing data sets to be 'relevant, representative, free of errors and complete.' You cannot achieve this with a CSV file on a laptop. We enforce this via a Data Contract Architecture." },
            { type: "heading", text: "The 'Data Passport' Schema (JSON)", id: "data-passport" },
            { type: "code", lang: "json", code: `{\n  "dataset_id": "ds-training-v4.2",\n  "compliance_check": {\n    "bias_audit": "PASSED (0.02% variance)",\n    "pii_scrub": "VERIFIED (Presidio v2.1)",\n    "lineage_hash": "sha256:8d9e..."\n  },\n  "governance": {\n    "owner": "dipti.k@adraca.io",\n    "retention_policy": "EU-GDPR-3Y"\n  }\n}` },
            { type: "heading", text: "Article 14: Human Oversight Interfaces", id: "article-14" },
            { type: "paragraph", text: "The law demands that natural persons can 'intervene' or 'interrupt' the system. We engineer this strictly: every AI agent we deploy has a 'Hardware Kill Switch' (for physical bots) or a 'Circuit Breaker' API (for software agents) that allows a human operator to override the model instantly." },
            { type: "paragraph", text: "The EU AI Act is forcing the industry to mature. It is moving us away from 'move fast and break things' to 'move fast with stable infrastructure.' For European enterprises, this isn't a burden—it's a competitive advantage." }
        ]
    },
    {
        id: "blog-004",
        tag: "DEV VELOCITY",
        title: "Velocity at Scale: Nix-Based Environments with Project IDX",
        date: "Jan 20, 2026",
        readTime: "3 min read",
        author: "Abhishek K.",
        authorAvatar: "/images/team/abhishek.jpg",
        summary: "How Adraca achieves rapid prototyping. Using Google's Antigravity (IDX) to define reproducible, cloud-based development environments in code.",
        coverImage: "/images/blogs/covers/blog-004-cover.jpg",
        diagramImage: "/images/blogs/diagrams/blog-004-dia.jpg",
        color: "#10b981", // Emerald
        shape: "shape-diamond"
    },
    {
        id: "blog-005",
        tag: "INDUSTRIAL IOT",
        title: "OT/IT Convergence: Binary Parsing of Legacy S7 & Modbus",
        date: "Jan 18, 2026",
        readTime: "7 min read",
        author: "Dipti A. Khaparde",
        authorAvatar: "/images/team/founder.jpg",
        summary: "The factory floor speaks binary. A guide to writing custom protocol buffers in Rust/Python to extract clean JSON data from 20-year-old Siemens PLCs.",
        coverImage: "/images/blogs/covers/blog-005-cover.jpg",
        diagramImage: "/images/blogs/diagrams/blog-005-dia.jpg",
        color: "#8b5cf6", // Purple
        shape: "shape-default"
    }
];
