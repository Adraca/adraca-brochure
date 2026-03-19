"use client";
import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { ShieldCheck, Lock, Eye, Zap, ShieldAlert, FileText } from "lucide-react";

export default function ValidatorPage() {
    return (
        <ProductDetailTemplate
            title="Sovereign Validator"
            subtitle="Realized-State Compliance & Sovereign Guardrails"
            description="The definitive enforcement layer for the Sovereign AI Operating System. Sovereign Validator parses Terraform state (.tfstate) to provide automated, immutable audits for DORA, GDPR, and EBA compliance using OPA-driven policy gates."
            videoTitle="VALIDATOR-ENFORCEMENT-CORE"
            heroImageSrc="/assets/products/validator/hero_demo.webp"
            evidenceItems={[
                { 
                    title: "Executive Command Dashboard",
                    imageSrc: "/assets/products/validator/screenshots/dashboard.png"
                },
                { 
                    title: "Realized-State Parsing",
                    imageSrc: "/assets/products/validator/screenshots/parsing.png"
                },
                { 
                    title: "Compliance Risk Heatmap",
                    imageSrc: "/assets/products/validator/screenshots/risk_map.png"
                },
                { 
                    title: "Cryptographic Vault Check",
                    imageSrc: "/assets/products/validator/screenshots/vault.png"
                }
            ]}
            features={[
                {
                    title: "Realized-State Auditing",
                    desc: "Parses .tfstate instead of HCL to inspect the absolute ground truth of running infrastructure, catching obfuscations.",
                    icon: <FileText size={24} />
                },
                {
                    title: "Sovereign Key Control",
                    desc: "Enforces Customer Managed Keys (CMK) and BYOK compliance supporting strict EBA data custody guidelines.",
                    icon: <Lock size={24} />
                },
                {
                    title: "Operational Resilience",
                    desc: "Verifies physical and logical segregation of backups in accordance with DORA Art 12 and immutability (WORM).",
                    icon: <ShieldCheck size={24} />
                }
            ]}
            specs={[
                { label: "Core Layer", value: "OPA Rego Policy Engine" },
                { label: "Compliance", value: "DORA / GDPR / EBA Guidelines" },
                { label: "Audit Type", value: "Realized State (.tfstate)" },
                { label: "Multi-Cloud", value: "AWS & Azure Native" }
            ]}
            terminalLogs={[
                "VALIDATOR-V4.0 INITIALIZING...",
                "INGESTING TERRAFORM STATE [SCHEMA V4]...",
                "FLATTENING MODULE DEPENDENCIES...",
                "EVALUATING REGO POLICIES [OPA ENGINE]...",
                "ENFORCING DORA ARTICLE 12 BACKUP SEGREGATION...",
                "WARNING: AWS_S3_BUCKET USES DEFAULT SSE-S3 ENCRYPTION.",
                "EBA COMPLIANCE GATE FAILED: CMK REQUIRED for PII Data.",
                "BROADCASTING PROOF OF TRUST TO AUDIT LOG."
            ]}
        />
    );
}
