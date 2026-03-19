"use client";
import React from 'react';
import TechnicalDocTemplate, { TechModule, PipelineStep, TechSpec } from '@/components/TechnicalDocTemplate';
import { Search, Brain, Zap, Database, Cpu } from 'lucide-react';

export default function SearchTechPage() {
    const modules: TechModule[] = [
        {
            icon: <Brain size={24} />,
            name: "Inference Layer (Local-First)",
            desc: "Bypasses external LLMs to insulate headers. Employs Distillation & Quantization over 7B-parameter local weights."
        },
        {
            icon: <Database size={24} />,
            name: "Retrieval Layer (Qdrant HNSW)",
            desc: "Hierarchical Navigable Small World (HNSW) graphs index nodes for sub-10ms localized vector lookup."
        },
        {
            icon: <Zap size={24} />,
            name: "Fusion Layer (Query Routing)",
            desc: "Dual pipelines feeding lexical (BM25) and conceptual embeds parallelly to compute maximum ranking parity."
        },
        {
            icon: <Cpu size={24} />,
            name: "Hardware AVX-512 Layer",
            desc: "Utilizes advanced CPU multipliers bypassing discrete GPU loops for high memory bandwidth scaling."
        }
    ];

    const pipeline: PipelineStep[] = [
        { stage: "Stage 01", title: "Semantic Chunking", desc: "Maps continuous input documents into cohesive contextual indices instead of static boundaries." },
        { stage: "Stage 02", title: "Embed Computation", desc: "Aggregates localized vector transforms in air-gapped secure enclaves." },
        { stage: "Stage 03", title: "Lexical Scan", desc: "Runs BM25 sparse index scan yielding exact SKU term matchers correctly." },
        { stage: "Stage 04", title: "Reciprocal Fusion", desc: "Fuses items back utilizing reciprocal weighing to prioritize dense lookup outputs." }
    ];

    const specs: TechSpec[] = [
        { label: "Vector Index", value: "Qdrant HNSW Graph" },
        { label: "Fusion Matrix", value: "RRF (Reciprocal Rank Fusion)" },
        { label: "Inference Threshold", value: "Distilled Local CPU Transforms" },
        { label: "Topology", value: "Stateless / Ephemeral sessions" }
    ];

    const mathSection = {
        title: "Reciprocal Rank Fusion (RRF) Logic",
        formula: "RRF(d) = Σ (1 / (60 + rank(d, r)))",
        variables: [
            { name: "d", desc: "Target Document node item" },
            { name: "r", desc: "Pipeline rank order (BM25 or Dense)" },
            { name: "rank", desc: "Positional index of document outputs" }
        ]
    };

    return (
        <TechnicalDocTemplate
            title="Sovereign Search Engine"
            badge="Hybrid RRF Fusion Core"
            description="Deep architecture blueprint outlining the local-first design capable of fusing lexical BM25 precision with Dense Vector concept embeddings securely."
            modules={modules}
            pipeline={pipeline}
            specs={specs}
            mathSection={mathSection}
        />
    );
}
