"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Lock, Zap, Globe } from 'lucide-react';

export default function IntelligencePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 selection:bg-blue-500/20 transition-colors duration-500">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Light Theme Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(219,39,119,0.05)_0%,rgba(37,99,235,0.05)_50%,rgba(248,250,252,1)_100%)] dark:hidden" />
                <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:hidden"
                    style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                </div>

                {/* Dark Theme Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,41,59,0.5)_0%,rgba(2,6,23,1)_100%)] hidden dark:block" />
                <div className="absolute top-0 left-0 w-full h-full opacity-20 hidden dark:block"
                    style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                </div>
            </div>

            <div className="relative z-10 pt-32 pb-20">

                {/* HERO SECTION */}
                <div className="max-w-7xl mx-auto px-6 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono mb-8 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            SOVEREIGN STACK ONLINE
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Intelligence</span>
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            High-level technology blueprints and compliance middleware enforcing rigid data boundaries absolute for European critical markets.
                        </p>
                    </motion.div>
                </div>

                {/* VISUALIZATION: THE CORE */}
                <div className="max-w-6xl mx-auto px-6 mb-32 relative">
                    <div className="aspect-[16/6] md:aspect-[16/5] rounded-3xl border border-white/80 dark:border-white/10 bg-white/40 dark:bg-black/50 backdrop-blur-md overflow-hidden relative group shadow-[0_8px_40px_rgba(0,0,0,0.03)] dark:shadow-none">

                        {/* Abstract Grid Animation */}
                        <div className="absolute inset-0 opacity-10 dark:opacity-30">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                {/* Rings */}
                                <div className="absolute inset-0 rounded-full border border-blue-500/20 dark:border-blue-500/30 w-64 h-64 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-0 rounded-full border border-cyan-500/10 dark:border-cyan-500/20 w-80 h-80 -ml-8 -mt-8 animate-[spin_15s_linear_infinite_reverse]" />

                                {/* Central Brain Node */}
                                <div className="relative z-10 w-48 h-48 bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(59,130,246,0.1)] dark:shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                                    <Brain size={64} className="text-blue-500 dark:text-blue-400" />
                                </div>

                                {/* Orbiting Satellite 1: Validator */}
                                <motion.div 
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute -top-12 -left-32 p-3 bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-blue-500/40 rounded-xl backdrop-blur-sm shadow-[0_4px_20px_rgba(37,99,235,0.06)] dark:shadow-[0_0_30px_rgba(37,99,235,0.2)] text-xs font-mono text-slate-700 dark:text-blue-400 flex items-center gap-2"
                                >
                                    <Shield size={14} className="text-blue-500 dark:text-blue-400" /> Validator (OPA Rego)
                                </motion.div>

                                {/* Orbiting Satellite 2: DPP */}
                                <motion.div 
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                    className="absolute -top-12 -right-32 p-3 bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-cyan-500/40 rounded-xl backdrop-blur-sm shadow-[0_4px_20px_rgba(6,182,212,0.06)] dark:shadow-[0_0_30px_rgba(6,182,212,0.2)] text-xs font-mono text-slate-700 dark:text-cyan-400 flex items-center gap-2"
                                >
                                    <Globe size={14} className="text-cyan-500 dark:text-cyan-400" /> DPP (JSON-LD 1.1)
                                </motion.div>

                                {/* Orbiting Satellite 3: Synthetic */}
                                <motion.div 
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                                    className="absolute -bottom-12 -left-32 p-3 bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-purple-500/40 rounded-xl backdrop-blur-sm shadow-[0_4px_20px_rgba(168,85,247,0.06)] dark:shadow-[0_0_30px_rgba(168,85,247,0.2)] text-xs font-mono text-slate-700 dark:text-purple-400 flex items-center gap-2"
                                >
                                    <Lock size={14} className="text-purple-500 dark:text-purple-400" /> Synthetic (Gaussian Copula)
                                </motion.div>

                                {/* Orbiting Satellite 4: Search */}
                                <motion.div 
                                    animate={{ y: [0, 6, 0] }}
                                    transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                                    className="absolute -bottom-12 -right-32 p-3 bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-teal-500/40 rounded-xl backdrop-blur-sm shadow-[0_4px_20px_rgba(20,184,166,0.06)] dark:shadow-[0_0_30px_rgba(20,184,166,0.2)] text-xs font-mono text-slate-700 dark:text-teal-400 flex items-center gap-2"
                                >
                                    <Zap size={14} className="text-teal-500 dark:text-teal-400" /> Search (RRF Hybrid)
                                </motion.div>
                            </div>
                        </div>

                        {/* Overlay Text */}
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-slate-800 dark:text-white font-bold text-lg">Sovereign Intelligence Architecture</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Realized-State & Zero-Trust Middleware Execution</p>
                        </div>
                    </div>
                </div>

                {/* ARCHITECTURE GRID */}
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 mb-32">
                    <FeatureCard
                        icon={<Shield size={32} />}
                        title="Realized-State Audit Core"
                        desc="Enforcing DORA compliance against absolute Ground Truth running environments with immutable OPA Rego computation."
                        color="text-blue-500 dark:text-blue-400"
                    />
                    <FeatureCard
                        icon={<Globe size={32} />}
                        title="Semantic Compliance Compiler"
                        desc="Compressing fragmented supply chain documents into machine-readable JSON-LD aligned with GS1 Web Vocabularies for ESPR."
                        color="text-cyan-500 dark:text-cyan-400"
                    />
                    <FeatureCard
                        icon={<Zap size={32} />}
                        title="Hybrid Vector Fusion (RRF)"
                        desc="Simultaneously resolving dual Lexical and Dense Vector retrieval passes inside enclaves immune to surveillance."
                        color="text-teal-500 dark:text-teal-400"
                    />
                    <FeatureCard
                        icon={<Lock size={32} />}
                        title="Gaussian Privacy Mesh"
                        desc="Generating synthetic statistical weights certified bound to drop re-identification risks below EMA index averages."
                        color="text-purple-500 dark:text-purple-400"
                    />
                </div>

                {/* SYSTEM SPECS */}
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">Sovereign Benchmarks</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <SpecItem label="Inference Latency" value="< 100ms (P99)" />
                        <SpecItem label="Compliance Support" value="DORA / ESPR / EHDS" />
                        <SpecItem label="Architecture" value="Microservice CLIs" />
                        <SpecItem label="Nodes Security" value="Local-First Guard" />
                        <SpecItem label="Encryption Standard" value="AES-256 GCM" />
                        <SpecItem label="Key Sovereignty" value="BYOK / CMK Enabled" />
                        <SpecItem label="Session Integrity" value="Stateless / Ephemeral" />
                        <SpecItem label="Data Origin" value="100% EU Native" />
                    </div>
                </div>

            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc, color }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/40 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-white/10 hover:shadow-lg dark:hover:shadow-none backdrop-blur-sm transition-all group">
            <div className={`mb-4 ${color} group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                {desc}
            </p>
        </div>
    );
}

function SpecItem({ label, value }: any) {
    return (
        <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-none">
            <div className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</div>
            <div className="text-slate-800 dark:text-white font-mono font-bold text-sm tracking-tight">{value}</div>
        </div>
    );
}
