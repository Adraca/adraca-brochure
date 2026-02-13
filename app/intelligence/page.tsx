"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Shield, Lock, Zap, Activity, Globe, Database } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function IntelligencePage() {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,41,59,0.5)_0%,rgba(2,6,23,1)_100%)]" />
                <div className="absolute top-0 left-0 w-full h-full opacity-20"
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-8 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            {t('neural_hub_online')}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            {t('sovereign')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t('intelligence')}</span>
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            {t('intelligence_hero_desc')}
                        </p>
                    </motion.div>
                </div>

                {/* VISUALIZATION: THE CORE */}
                <div className="max-w-6xl mx-auto px-6 mb-32 relative">
                    <div className="aspect-[16/6] md:aspect-[16/5] rounded-3xl border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden relative group">

                        {/* Abstract Grid Animation */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                {/* Rings */}
                                <div className="absolute inset-0 rounded-full border border-blue-500/30 w-64 h-64 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-0 rounded-full border border-cyan-500/20 w-80 h-80 -ml-8 -mt-8 animate-[spin_15s_linear_infinite_reverse]" />

                                {/* Central Brain Node */}
                                <div className="relative z-10 w-48 h-48 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                                    <Brain size={64} className="text-blue-400" />
                                </div>

                                {/* Floating Nodes */}
                                <div className="absolute top-1/2 left-1/2 -ml-64 -mt-32 p-3 bg-slate-900/80 border border-slate-700 rounded-lg backdrop-blur text-xs font-mono text-cyan-400">
                                    EDGE_NODE_01
                                </div>
                                <div className="absolute top-1/2 left-1/2 ml-48 mt-24 p-3 bg-slate-900/80 border border-slate-700 rounded-lg backdrop-blur text-xs font-mono text-purple-400">
                                    CORE_LINK_ACTIVE
                                </div>
                            </div>
                        </div>

                        {/* Overlay Text */}
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-white font-bold text-lg">{t('neural_mesh_v4')}</h3>
                            <p className="text-slate-500 text-sm">{t('real_time_inference')}</p>
                        </div>
                    </div>
                </div>

                {/* ARCHITECTURE GRID */}
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-32">
                    <FeatureCard
                        icon={<Network size={32} />}
                        title={t('federated_learning')}
                        desc={t('federated_learning_desc')}
                        color="text-blue-400"
                    />
                    <FeatureCard
                        icon={<Zap size={32} />}
                        title={t('edge_inference_title')}
                        desc={t('edge_inference_desc')}
                        color="text-cyan-400"
                    />
                    <FeatureCard
                        icon={<Lock size={32} />}
                        title={t('homomorphic_encryption')}
                        desc={t('homomorphic_encryption_desc')}
                        color="text-purple-400"
                    />
                </div>

                {/* SYSTEM SPECS */}
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">{t('system_specifications')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <SpecItem label="Latency" value="< 12ms" />
                        <SpecItem label={t('throughput')} value="40K TPS" />
                        <SpecItem label={t('nodes')} value="10M+" />
                        <SpecItem label={t('uptime')} value="99.999%" />
                        <SpecItem label={t('encryption')} value="AES-256" />
                        <SpecItem label={t('model_size')} value="7B Params" />
                        <SpecItem label={t('architecture')} value="Transformer" />
                        <SpecItem label={t('consensus')} value="PoS / DAG" />
                    </div>
                </div>

            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc, color }: any) {
    return (
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors group">
            <div className={`mb-6 ${color} group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
                {desc}
            </p>
        </div>
    );
}

function SpecItem({ label, value }: any) {
    return (
        <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</div>
            <div className="text-white font-mono font-bold text-lg">{value}</div>
        </div>
    );
}
