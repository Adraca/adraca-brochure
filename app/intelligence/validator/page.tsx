"use client";
import React from 'react';
import TechnicalDocTemplate, { TechModule, PipelineStep, TechSpec } from '@/components/TechnicalDocTemplate';
import { ShieldCheck, Lock, FileText, Cpu, Terminal } from 'lucide-react';

export default function ValidatorTechPage() {
    const modules: TechModule[] = [
        {
            icon: <ShieldCheck size={24} />,
            name: "Evaluation Engine (OPA Core)",
            desc: "Implements Open Policy Agent (OPA) with Rego to evaluate infrastructure compliance declarative rules against real-time JSON input contexts."
        },
        {
            icon: <FileText size={24} />,
            name: "Input Processor (.tfstate)",
            desc: "Recursive Parser traversing module hierarchies inside Terraform state files to inspect absolute realized architecture instead of code."
        },
        {
            icon: <Lock size={24} />,
            name: "Cryptographic Guard (EBA Check)",
            desc: "Hardened verification matrix checking encryption algorithms (AES-256 vs ChaCha20) and Customer Managed Key (CMK) associations."
        },
        {
            icon: <Cpu size={24} />,
            name: "CI/CD Decision Gate",
            desc: "Lightweight CLI running ephemeral least-privilege containers capable of issuing signed build-blocks conforming with tool Cosign."
        }
    ];

    const pipeline: PipelineStep[] = [
        { stage: "Stage 01", title: "State Ingestion", desc: "Maps .tfstate and flattens recursive module structures into static JSON dictionary graphs." },
        { stage: "Stage 02", title: "Rego Policy Evaluation", desc: "Validates backup retention time slots, backup physical isolation node segregation specs correctly." },
        { stage: "Stage 03", title: "Cryptographic Validation", desc: "Computes key defaults verifying that SSE-S3 standard handles bypass CMK bounds securely." },
        { stage: "Stage 04", title: "Secure Audit logging", desc: "Signs successful compliance event gates using Cosign supply chain signatures." }
    ];

    const specs: TechSpec[] = [
        { label: "Core Engine", value: "OPA Rego Framework" },
        { label: "State Standard", value: "Terraform .tfstate V4" },
        { label: "Encryption Guard", value: "AES-256 / ChaCha20-Poly1305" },
        { label: "Security Log", value: "Cosign Document signatures" }
    ];

    const codeBlock = {
        title: "Rego Policy Example: CMK Verification",
        language: "rego",
        code: `package validator.aws.encryption

deny[msg] {
  input.resource_type == "aws_s3_bucket"
  not has_cmk_encryption(input.properties)
  msg := "EBA Compliance Failure: S3 bucket must use KMS with BYOK/CMK"
}

has_cmk_encryption(props) {
  props.server_side_encryption_configuration.rule.apply_server_side_encryption_by_default.sse_algorithm == "aws:kms"
}`
    };

    return (
        <TechnicalDocTemplate
            title="Sovereign Validator"
            badge="OPA Rego Policy Core"
            description="High-level engineering blueprint of the continuous auditing engine. It parses Terraform state files (.tfstate) against DORA / EBA policy trees utilizing exact Rego query evaluators."
            modules={modules}
            pipeline={pipeline}
            specs={specs}
            codeBlock={codeBlock}
        />
    );
}
