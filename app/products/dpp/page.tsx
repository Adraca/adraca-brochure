"use client";
import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Shield, RefreshCw, FileCheck, Globe, Zap, Link } from "lucide-react";

export default function DPPPage() {
    return (
        <ProductDetailTemplate
            title="Digital Product Passport Engine"
            subtitle="Ecodesign Compliance & Circular Data Middleware"
            description="Bridge the ESPR interoperability gap. The Adraca DPP Engine is a lightweight 'Compliance Compiler' that ingests heterogeneous supply chain documents (CSV, flat files, ERP dumps) and serializes them into legally defensible, machine-readable JSON-LD aligned with GS1 Web Vocabularies."
            videoTitle="DPP-COMPILER-LIVE"
            videoSrc="/assets/products/dpp/hero_demo.mp4"
            evidenceItems={[
                {
                    title: "circualrity Indicator Dashboard",
                    imageSrc: "/assets/products/dpp/screenshots/dashboard.jpg"
                },
                {
                    title: "Dynamic Passport Resolution",
                    imageSrc: "/assets/products/dpp/screenshots/resolution.jpg"
                },
                {
                    title: "Sovereign ZKP Validation",
                    imageSrc: "/assets/products/dpp/screenshots/minting.jpg"
                },
                {
                    title: "Recycled Mass Metrics",
                    imageSrc: "/assets/products/dpp/screenshots/recycler.jpg"
                }
            ]}
            features={[
                {
                    title: "Semantic Transformation",
                    desc: "Maps proprietary ERP data dumps into strictly typed JSON-LD 1.1 following GS1 Digital Link URIs, avoiding rip-and-replace overhead.",
                    icon: <Globe size={24} />
                },
                {
                    title: "Standards-Grade Validation",
                    desc: "Algorithmic logic gates enforcing ISO 14021 (Recycled mass computation) and ISO 13937 durability threshold checking.",
                    icon: <Shield size={24} />
                },
                {
                    title: "Substance Triggers (REACH/SCIP)",
                    desc: "Automated analysis of Bill-of-Materials. Flags concentration metrics over 0.1% for mandatory link alerts directly in indices.",
                    icon: <FileCheck size={24} />
                }
            ]}
            specs={[
                { label: "Engine Architecture", value: "Lightweight Python CLI Middleware" },
                { label: "Data Pipeline Standard", value: "JSON-LD 1.1 / GS1 Web Vocabulary" },
                { label: "Legal Frameworks", value: "EU ESPR 2024 / CSDDD Directive" },
                { label: "Audit Log Scheme", value: "Apache Parquet Audit Trails" }
            ]}
            terminalLogs={[
                "INITIALIZING DPP COMPLIANCE COMPILER...",
                "PARSING SKU DATA: INPUT_PATH=/exports/erp_lines.csv",
                "NORMALIZING HETEROGENEOUS BACKEND FIELDS [ISO 4180]...",
                "VALIDATING RECYCLED MASS FRACTION (ISO 14021: MASScall = M_calc)...",
                "TRIGGERING SCIP ALERT: SUBSTANCE-ID > 0.1% [ADDING AUDIT NODE]",
                "CONSTRUCTING GS1 DIGITAL LINK URI: http://id.adraca.com/01/...",
                "SERIALIZING COMPLIANCE GRAPH TO JSON-LD 1.1...",
                "DPP-V1-DIGITAL-TWIN MINTED SUCCESSFULLY [SUCCESS]."
            ]}
        />
    );
}
