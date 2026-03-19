"use client";
import React from 'react';
import TechnicalDocTemplate, { TechModule, PipelineStep, TechSpec } from '@/components/TechnicalDocTemplate';
import { Database, Shield, Lock, Activity } from 'lucide-react';

export default function SyntheticTechPage() {
    const modules: TechModule[] = [
        {
            icon: <Database size={24} />,
            name: "Model Selection (Gaussian Copula)",
            desc: "Extracts multi-dimensional joint probability distributions using CPU-efficient continuous matrices instead of adversarial networks (GANs)."
        },
        {
            icon: <Activity size={24} />,
            name: "Correlation Guard (Fidelity)",
            desc: "Preserves exact covariance structures of clinical record matrices guaranteeing that secondary researchers retain 98%+ validation parity."
        },
        {
            icon: <Lock size={24} />,
            name: "Distance Metric (Gower Distance)",
            desc: "Algorithm calculating absolute proximity ranges index on mixed data types (categorical + scalar) to inspect leakage paths."
        },
        {
            icon: <Shield size={24} />,
            name: "Privacy Guard (0.09 Metric)",
            desc: "Calibrates Differential Privacy Epsilon boundaries ensuring re-identification risk index meets absolute EMA Policy 0070 benchmarks."
        }
    ];

    const pipeline: PipelineStep[] = [
        { stage: "Stage 01", title: "Secure Ingestion", desc: "Maps continuous tabular EHR inputs and infers structural schema trees safely inside enclaves." },
        { stage: "Stage 02", title: "Transform/Process", desc: "Applies log-normal transforms over scalar scalars and one-hot encodes categorical distributions." },
        { stage: "Stage 03", title: "Copula Fitting", desc: "Learns correlation parameters on the loaded matrix without saving exact lookup-row coefficients node traces." },
        { stage: "Stage 04", title: "Privacy Validation", desc: "Measures distance indexes on the synthetic weight buffers certifying that data is 100% anonymous." }
    ];

    const specs: TechSpec[] = [
        { label: "Core Synthesizer", value: "Gaussian Copula (SDV Framework)" },
        { label: "Anonymity Index", value: "Distance to Closest Record (DCR)" },
        { label: "Risk Constraint", value: "< 0.09 (EMA benchmark)" },
        { label: "Audit Standard", value: "GDPR Recital 26 / EHDS Article 73" }
    ];

    const mathSection = {
        title: "Gower Distance (混 Data proximity Metric)",
        formula: "S(i, j) = Σ ( w_k * s_ijk ) / Σ w_k",
        variables: [
            { name: "S(i,j)", desc: "Similarity index between row i and row j" },
            { name: "w_k", desc: "Weight multiplier of variable k" },
            { name: "s_ijk", desc: "Relative Similarity score over variable k" }
        ]
    };

    return (
        <TechnicalDocTemplate
            title="Synthetic Patient Engine"
            badge="Gaussian Copula Synthesizer"
            description="High-level engineering blueprint demonstrating multi-dimensional joint distribution extracting techniques that render 100% anonymous statistical data twins safely inside air-gapped enclaves."
            modules={modules}
            pipeline={pipeline}
            specs={specs}
            mathSection={mathSection}
        />
    );
}
