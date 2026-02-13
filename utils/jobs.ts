
export interface Job {
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    duration: string;
    description: string;
    responsibilities: string[];
    requirements: string[]; // Added requirements array
    listMetadata: {
        titleKey: string;
        typeKey: string;
        tags: string[];
        color: string;
    };
}

export const JOBS: Record<string, Job> = {
    // FULL TIME ROLES
    "rust-systems-engineer": {
        slug: "rust-systems-engineer",
        title: "Rust Systems Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full Time",
        duration: "Permanent",
        description: "You will build the core 'Sovereign Validator' node binary. This is a low-level systems role involving async Rust, Linux kernel interfaces, and secure enclave (SGX/SEV) handling. No Python glue code.",
        responsibilities: [
            "Architect and implement high-performance async Rust microservices.",
            "Optimize kernel-level networking for zero-copy data ingestion.",
            "Write foreign function interfaces (FFI) for legacy C library integration.",
            "Ensure memory safety and thread safety across the entire stack."
        ],
        requirements: [
            "Deep expertise in Rust (tokio, serde, async-std).",
            "Experience with Linux systems programming (eBPF, io_uring).",
            "Knowledge of Trusted Execution Environments (Intel SGX, AMD SEV).",
            "Contributed to open-source systems projects."
        ],
        listMetadata: {
            titleKey: "rust_systems",
            typeKey: "equity_salary",
            tags: ["Rust / Kernel", "Systems"],
            color: "emerald"
        }
    },
    "security-researcher-dora": {
        slug: "security-researcher-dora",
        title: "Security Researcher (DORA)",
        department: "Research",
        location: "Remote / EU",
        type: "Full Time",
        duration: "Permanent",
        description: "Define the automated compliance standards for the EU's Digital Operational Resilience Act (DORA). You will reverse-engineer regulatory text into executable OPA policies.",
        responsibilities: [
            "Translate legal texts (DORA, AI Act) into formal verification logic.",
            "Develop threat models for sovereign cloud deployments.",
            "Audit cryptographic implementations for side-channel attacks.",
            "Publish whitepapers on sovereign infrastructure security."
        ],
        requirements: [
            "Experience with formal verification or policy-as-code (OPA/Rego).",
            "Background in regulatory compliance (GDPR, DORA, NIS2) or InfoSec.",
            "Ability to read and interpret EU legislation.",
            "Penetration testing capability."
        ],
        listMetadata: {
            titleKey: "sec_research",
            typeKey: "equity_salary",
            tags: ["InfoSec / OPA", "Research"],
            color: "blue"
        }
    },
    "applied-cryptographer": {
        slug: "applied-cryptographer",
        title: "Applied Cryptographer",
        department: "Engineering",
        location: "Remote",
        type: "Full Time",
        duration: "Permanent",
        description: "Implement privacy-preserving protocols for Multi-Party Computation (MPC) and Zero-Knowledge Proofs (ZKPs). You will enable 'Blind Auditing' features for our enterprise clients.",
        responsibilities: [
            "Implement zk-SNARK circuits for verifiable computation.",
            "Optimize homomorphic encryption schemes for real-time inference.",
            "Review and audit internal crypto libraries.",
            "Bridge the gap between academic crypto papers and production code."
        ],
        requirements: [
            "Strong background in modular arithmetic and elliptic curve cryptography.",
            "Experience with ZK frameworks (Circom, Halo2, or zk-STARKs).",
            "Ability to implement papers from IACR ePrint.",
            "Proficiency in Rust or C++."
        ],
        listMetadata: {
            titleKey: "cryptographer",
            typeKey: "equity_salary",
            tags: ["ZK-Proofs / MPC", "Cryptography"],
            color: "cyan"
        }
    },

    // INTERNSHIPS
    "kernel-systems-intern": {
        slug: "kernel-systems-intern",
        title: "Kernel Systems Intern",
        department: "Engineering",
        location: "Remote",
        type: "Internship",
        duration: "Summer '26",
        description: "Go deep into the Linux kernel. You will work on isolating workloads using cgroups, namespaces, and eBPF. This is not a web dev internship.",
        responsibilities: [
            "Write eBPF programs for network observability and security monitoring.",
            "Optimize container runtime performance (runc/crun).",
            "Debug kernel panic logs and contribute upstream fixes.",
            "Benchmark syscall overhead in high-throughput environments."
        ],
        requirements: [
            "Solid C/C++ or Rust programming skills.",
            "Understanding of OS concepts (memory management, scheduling, VFS).",
            "Comfortable living in the terminal (vim/emacs, git, bash).",
            "Curiosity about how the cloud actually works under the hood."
        ],
        listMetadata: {
            titleKey: "kernel_intern",
            typeKey: "paid_internship",
            tags: ["eBPF / Linux", "Summer '26"],
            color: "blue"
        }
    },
    "zk-research-intern": {
        slug: "zk-research-intern",
        title: "Zero-Knowledge Research Intern",
        department: "Research",
        location: "Remote",
        type: "Internship",
        duration: "6 Months",
        description: "Help us build the next generation of private auditing tools. You will implement cryptographic circuits that prove compliance without revealing data.",
        responsibilities: [
            "Implement basic arithmetic circuits in Circom or Halo2.",
            "Research optimization techniques for ZK proof generation time.",
            "Help translate regulatory logic into mathematical constraints.",
            "Contribute to our open-source privacy libraries."
        ],
        requirements: [
            "Strong math background (number theory, algebra).",
            "Familiarity with cryptographic primitives (hashing, signatures).",
            "Python or Rust experience.",
            "Ability to read technical whitepapers."
        ],
        listMetadata: {
            titleKey: "zk_intern",
            typeKey: "paid_internship",
            tags: ["Cryptography", "Research"],
            color: "cyan"
        }
    },
    "distributed-infra-intern": {
        slug: "distributed-infra-intern",
        title: "Distributed Infrastructure Intern",
        department: "Engineering",
        location: "Remote",
        type: "Internship",
        duration: "Flexible",
        description: "Automate the deployment of sovereign nodes across bare-metal servers. Work with Kubernetes, Terraform, and Ansible to build self-healing infrastructure.",
        responsibilities: [
            "Write Kubernetes Operators in Go.",
            "Automate bare-metal provisioning with PXE/IPMI.",
            "Design chaos engineering tests to break our clusters.",
            "Optimize CI/CD pipelines for multi-architecture builds (ARM/x86)."
        ],
        requirements: [
            "Experience with Docker/Kubernetes.",
            "Go or Python scripting skills.",
            "Understanding of networking (BGP, DNS, Overlay Networks).",
            "Love for automation and removing toil."
        ],
        listMetadata: {
            titleKey: "infra_intern",
            typeKey: "paid_internship",
            tags: ["Kubernetes / Go", "DevOps"],
            color: "emerald"
        }
    }
};
