"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Shield, Zap, Terminal } from 'lucide-react';

export interface TechModule {
    icon: React.ReactNode;
    name: string;
    desc: string;
}

export interface PipelineStep {
    stage: string;
    title: string;
    desc: string;
}

export interface TechSpec {
    label: string;
    value: string;
}

interface TechnicalDocTemplateProps {
    title: string;
    badge: string;
    description: string;
    modules: TechModule[];
    pipeline: PipelineStep[];
    specs: TechSpec[];
    codeBlock?: {
        title: string;
        language: string;
        code: string;
    };
    mathSection?: {
        title: string;
        formula: string;
        variables: { name: string; desc: string }[];
    };
}

export default function TechnicalDocTemplate({
    title,
    badge,
    description,
    modules,
    pipeline,
    specs,
    codeBlock,
    mathSection
}: TechnicalDocTemplateProps) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 selection:bg-blue-500/20 transition-colors duration-500">
            {/* Background Layers */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(219,39,119,0.04)_0%,rgba(37,99,235,0.04)_50%,rgba(248,250,252,1)_100%)] dark:hidden" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,41,59,0.4)_0%,rgba(2,6,23,1)_100%)] hidden dark:block" />
            </div>

            <div className="relative z-10 pt-32 pb-20">

                {/* HERO */}
                <header className="max-w-5xl mx-auto px-6 mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-xs font-mono mb-6 tracking-widest uppercase">
                            <Cpu size={14} className="animate-spin" /> {badge}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-tight text-slate-900 dark:text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed text-base">
                            {description}
                        </p>
                    </motion.div>
                </header>

                {/* CORE MODULES (Cards Grid) */}
                <section className="max-w-6xl mx-auto px-6 mb-24">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">Core Architectural Stack</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {modules.map((mod, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-white/10 hover:shadow-lg backdrop-blur-sm transition-all group"
                            >
                                <div className="text-blue-500 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">{mod.icon}</div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">{mod.name}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{mod.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* PIPELINE / DATAFLOW TIMELINE */}
                <section className="max-w-4xl mx-auto px-6 mb-24">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">Operational Pipeline Flow</h2>
                    <div className="space-y-6">
                        {pipeline.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/[0.01] border border-slate-200/40 dark:border-white/5 backdrop-blur-sm hover:shadow-sm"
                            >
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400 font-mono text-sm">
                                    {step.stage}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{step.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs">{step.desc}</p>
                                </div>
                                <ArrowRight className="text-slate-300 dark:text-slate-700 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* MATHEMATICS / SCIENCE SECTION */}
                {mathSection && (
                    <section className="max-w-4xl mx-auto px-6 mb-24">
                        <div className="p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/10 shadow-lg text-center backdrop-blur-md">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{mathSection.title}</h2>
                            <div className="p-6 bg-white dark:bg-black/40 rounded-xl border border-slate-200/40 dark:border-white/5 font-mono text-xl text-blue-600 dark:text-cyan-400 shadow-inner inline-block my-4">
                                {mathSection.formula}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-left max-w-xl mx-auto mt-6">
                                {mathSection.variables.map((v, i) => (
                                    <div key={i} className="text-xs">
                                        <span className="font-bold text-slate-800 dark:text-white">{v.name}</span>: <span className="text-slate-600 dark:text-slate-400">{v.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* TECHNICAL SPECS & CODE BLOCK */}
                <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{title} Sub-items</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {specs.map((spec, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                                    <div className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">{spec.label}</div>
                                    <div className="text-slate-800 dark:text-white font-mono font-bold text-sm">{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {codeBlock && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                <Terminal size={20} /> {codeBlock.title}
                            </h2>
                            <pre className="p-6 rounded-2xl bg-black dark:bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto shadow-2xl leading-relaxed">
                                <code>{codeBlock.code}</code>
                            </pre>
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}
