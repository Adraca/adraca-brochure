"use client";
import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Shield, Activity, Landmark, FileText, Brain, Database } from "lucide-react";

export default function SyntheticPage() {
    return (
        <ProductDetailTemplate
            title="Synthetic Patient Engine"
            subtitle="Anonymization Middleware for Secondary R&D"
            description="Transmute sensitive Personal Data into secure, legally Anonymous Statistical Assets. The Adraca Engine models multi-dimensional joint probability distributions with Gaussian Copula statistics, certifying re-identification risk strictly below EMA/Health Canada 9% thresholds."
            videoTitle="SYNTHETIC-PATIENT-ALPHA-V4"
            videoSrc="/assets/products/synthetic/hero_demo.mp4"
            evidenceItems={[
                { 
                    title: "Real-time R&D Insights",
                    imageSrc: "/assets/products/synthetic/screenshots/dashboard.png"
                },
                { 
                    title: "Clinical Utility Analytics",
                    imageSrc: "/assets/products/synthetic/screenshots/clinical.png"
                },
                { 
                    title: "Sovereign Edge Mesh",
                    imageSrc: "/assets/products/synthetic/screenshots/network.png"
                },
                { 
                    title: "Differential Privacy Guard",
                    imageSrc: "/assets/products/synthetic/screenshots/privacy.png"
                }
            ]}
            features={[
                {
                    title: "Legal Anonymity Index",
                    desc: "Algorithmically guarantees re-identification risks remain below the 0.09 (9%) threshold mandated by EMA Policy 0070 and Health Canada.",
                    icon: <Shield size={24} />
                },
                {
                    title: "Compute on Local CPU",
                    desc: "Ditch heavy adversarial networks (GANs). Achieve full covariance extraction on 1M+ rows in minutes using stable Gaussian Copula processing.",
                    icon: <Activity size={24} />
                },
                {
                    title: "EHDS Air-Gapped Trust",
                    desc: "Sits seamlessly within Secure Processing Environments (SPE) that prohibit row-level data downloads, enabling authorized release of statistical twins.",
                    icon: <Landmark size={24} />
                }
            ]}
            specs={[
                { label: "Algorithm", value: "Gaussian Copula / TVAE (SDV Framework)" },
                { label: "Privacy Metric", value: "Distance to Closest Record (DCR)" },
                { label: "Risk Constraint", value: "< 0.09 (EMA Standard)" },
                { label: "Compliance", value: "GDPR Recital 26 / EHDS Article 73" }
            ]}
            terminalLogs={[
                "INITIALIZING SOVEREIGN HEALTH KERNEL...",
                "LOADING EHR-SOURCE-ENCLAVE: /imports/clinical_rwd.csv...",
                "SUCCESS: 1,000,000 PATIENT RECORDS INGESTED.",
                "MODELING MULTI-DIMENSIONAL JOINT PROBABILITY DISTRIBUTIONS...",
                "COMPUTING GAUSSIAN SPACE COVARIANCE MATRIX [6.4 MINUTES]...",
                "CALCULATING DISTANCE TO CLOSEST RECORD (DCR) INDEX...",
                "RUNNING PRIVACY GAUNTLET: RE-IDENTIFICATION RISK = 0.081% [SUCCESS].",
                "READY FOR SECURE AIR-GAPPED EXPORT."
            ]}
        />
    );
}
