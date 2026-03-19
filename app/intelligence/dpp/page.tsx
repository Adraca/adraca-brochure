"use client";
import React from 'react';
import TechnicalDocTemplate, { TechModule, PipelineStep, TechSpec } from '@/components/TechnicalDocTemplate';
import { Database, FileCheck, Globe, RefreshCcw } from 'lucide-react';

export default function DPPTechPage() {
    const modules: TechModule[] = [
        {
            icon: <Database size={24} />,
            name: "Ingestion Layer (The Reader)",
            desc: "Parses CSV, Excel, and ERP dumps. Employs Fuzzy Matching Strategy to normalize material string variables into standardized indices."
        },
        {
            icon: <FileCheck size={24} />,
            name: "Validation Layer (The Gatekeeper)",
            desc: "Dynamic logic gates enforcing ISO 14021 recycled content formulas and REACH/SCIP Alert thresholds (> 0.1% concentration)."
        },
        {
            icon: <RefreshCcw size={24} />,
            name: "Semantic Transformation (The Translator)",
            desc: "Re-serializes raw dumps into strictly typed JSON-LD 1.1 aligned with GS1 Web Vocabulary schemas."
        },
        {
            icon: <Globe size={24} />,
            name: "Output Layer (The Writer)",
            desc: "Generates compressed GS1 Digital Link URI strings and syncs immutable audit trails securely via Apache Parquet aggregates."
        }
    ];

    const pipeline: PipelineStep[] = [
        { stage: "Stage 01", title: "Fuzzy Normalization", desc: "MaterialNormalizer parses complex composition strings to map inputs correctly into standard lists." },
        { stage: "Stage 02", title: "Regulatory Evaluation", desc: "Checks Carbon Lookups against LCA libraries (EcoInvent / Idemat) using absolute calculation indexes." },
        { stage: "Stage 03", title: "Semantic Loading", desc: "Constructing the circularityIndicator object graph containing exact mass fractions securely." },
        { stage: "Stage 04", title: "Index Resolution", desc: "Synthesizes final GS1 Digital Link and pushes secure analytics log to air-gapped Parquet storage." }
    ];

    const specs: TechSpec[] = [
        { label: "Data Pipeline", value: "Normalizer -> Guard -> Graph -> URI" },
        { label: "Semantic Struct", value: "JSON-LD 1.1 / type-mapping" },
        { label: "Standards Index", value: "ISO 14021 / GS1 Digital Link" },
        { label: "Audit Scheme", value: "Apache Parquet (immutability)" }
    ];

    const codeBlock = {
        title: "API Definition: DPP Builder",
        language: "json",
        code: `{
  "POST /v1/dpp/build": {
    "summary": "Translates raw SKU weights into JSON-LD 1.1",
    "request": {
      "sku_id": "848291",
      "materials": [
        {"name": "Polyester", "weight": "230g", "recycled": "40%"}
      ]
    },
    "response": {
      "gs1_uri": "http://id.adraca.com/01/848291",
      "recycled_fraction_mapped": 0.40,
      "scip_alert": false
    }
  }
}`
    };

    return (
        <TechnicalDocTemplate
            title="Digital Product Passport"
            badge="Compliance Compiler"
            description="High-level engineering blueprint of the Adraca DPP Engine, demonstrating step-by-step translation of heterogeneous data dumps into legally defensible machine-readable JSON-LD."
            modules={modules}
            pipeline={pipeline}
            specs={specs}
            codeBlock={codeBlock}
        />
    );
}
