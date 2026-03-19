"use client";
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "@/components/ui/Navbar";
import { financePageData } from '@/data/industries/finance';
import Link from 'next/link';
import {
    Vault, Shield, Cloud, ArrowRight, Check,
    Activity, Lock, TrendingUp, Brain, Terminal,
    Globe, Server, Cpu, Zap
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";


function QuantumDataStream() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);
        const drops: number[] = new Array(columns).fill(1);

        // Fintech symbols + Hex
        const chars = "0123456789ABCDEF$€£¥₿%.";

        const draw = () => {
            if (!ctx) return;

            // Fading trail effect
            ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // Slate-900 with very low opacity
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#6366f1'; // Indigo-500
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Randomly vary opacity for "glitch" effect
                ctx.globalAlpha = Math.random() > 0.95 ? 1 : 0.3;
                ctx.fillText(text, x, y);
                ctx.globalAlpha = 1;

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-init drops
            const newCols = Math.ceil(width / fontSize);
            if (newCols > columns) {
                for (let i = columns; i < newCols; i++) drops[i] = 1;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen" />;
}

export default function FinancePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-500">
            <style jsx global>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.65);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.9);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
                }
                .dark .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
                }
                .text-liquid {
                    background: linear-gradient(to right, #4f46e5 20%, #818cf8 40%, #a5b4fc 60%, #4f46e5 80%);
                    background-size: 200% auto;
                    color: transparent;
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: shine 5s linear infinite;
                }
                .dark .text-liquid {
                    background: linear-gradient(to right, #fff 20%, #a5b4fc 40%, #c4b5fd 60%, #fff 80%);
                    background-clip: text;
                }
                @keyframes shine {
                    to { background-position: 200% center; }
                }
            `}</style>

            <Navbar />

            {/* QUANTUM DATA STREAM SIMULATION */}
            <QuantumDataStream />


            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 text-indigo-600 dark:text-indigo-300 text-xs font-medium tracking-widest uppercase mb-8 backdrop-blur-md shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-[ping_2s_linear_infinite]"></span>
                            {t(financePageData.hero.badge)}
                        </div>

                        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-slate-900 dark:text-white">
                            {t(financePageData.hero.headline).replace("DORA", "").replace("Period", "")} <br />
                            <span className="text-liquid">
                                {t('finance_hero_headline').includes("DORA") ? "DORA Era." : "DORA Era."}
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-12 leading-relaxed font-light">
                            {t(financePageData.hero.subhead)}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/contact?subject=DORA_Compliance_Audit" className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
                                <div className="flex items-center gap-2 relative z-10">
                                    {t(financePageData.hero.ctaText)} <ArrowRight size={18} />
                                </div>
                            </Link>
                            <Link href="#" className="px-8 py-4 glass-card rounded-2xl font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-white/30 transition-all flex items-center justify-center group">
                                <span className="group-hover:translate-x-1 transition-transform">{t(financePageData.hero.secondaryCta)}</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* 3D Visual - Crystalline Brain */}
                    <div className="relative h-[600px] flex items-center justify-center perspective-[1000px]">
                        <CrystallineBrain />
                    </div>
                </div>
            </section>

            {/* SOLUTIONS GRID (Prismatic Glass) */}
            <section className="relative py-32 z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('tier_core_desc')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{t('finance_hero_subhead')}</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {financePageData.solutions.map((sol, i) => (
                            <SpotlightCard key={sol.id} data={sol} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES LIST */}
            <section className="py-24 relative z-10 border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">{t('fin_cap_title_main')}</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-light">
                                {t('fin_cap_desc_main')}
                            </p>

                            {/* Dashboard Preview */}
                            <div className="relative aspect-video rounded-3xl overflow-hidden glass-card group hover:scale-[1.02] transition-transform duration-500 shadow-xl dark:shadow-none">
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] opacity-10">
                                    {[...Array(200)].map((_, i) => (
                                        <div key={i} className="border-[0.5px] border-slate-900/20 dark:border-white/20"></div>
                                    ))}
                                </div>

                                <div className="absolute bottom-8 left-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <div className="font-mono text-xs text-indigo-600 dark:text-indigo-300">SYSTEM_OPTIMAL</div>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">Risk Telemetry</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {financePageData.capabilities?.map((cap, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-6 rounded-2xl glass-card hover:bg-white/80 dark:hover:bg-white/5 transition-colors group cursor-default"
                                >
                                    <div className="flex gap-5">
                                        <div className="mt-1 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <Check size={14} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors text-lg">{t(cap.title)}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-light leading-relaxed">{t(cap.description)}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PIPELINE VISUALIZATION */}
            <section className="py-40 relative z-10 border-t border-slate-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-3 tracking-[0.2em] uppercase">{t('audit_verify_label')}</span>
                        <h2 className="text-5xl font-bold text-slate-900 dark:text-white">{t('immutable_pipeline_title')}</h2>
                    </div>

                    <div className="relative w-full max-w-4xl mx-auto">
                        {/* Animated Signal Path */}
                        <svg className="w-full h-48 overflow-visible" viewBox="0 0 800 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            {/* Base Path */}
                            <path d="M0,50 Q200,50 400,50 T800,50" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="2" />

                            {/* Active Data Flow */}
                            <motion.path
                                d="M0,50 Q200,50 400,50 T800,50"
                                fill="none"
                                stroke="url(#lineGrad)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Nodes */}
                        <div className="absolute top-0 w-full h-full flex justify-between items-center px-10 pointer-events-none">
                            {[t('node_ingest'), t('node_hsm'), t('node_dora')].map((label, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.3 }}
                                    className="relative group"
                                >
                                    <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 shadow-lg dark:shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:scale-110 transition-transform bg-white dark:bg-slate-950">
                                        {i === 0 && <Activity size={24} className="text-indigo-500 dark:text-indigo-400" />}
                                        {i === 1 && <Shield size={24} className="text-purple-500 dark:text-purple-400" />}
                                        {i === 2 && <TrendingUp size={24} className="text-blue-500 dark:text-blue-400" />}
                                    </div>
                                    <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap font-medium text-sm text-slate-600 dark:text-indigo-200 tracking-wide">{label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function CrystallineBrain() {
    return (
        <motion.div
            className="relative w-80 h-80"
            animate={{
                rotateY: [0, 360],
            }}
            transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            {/* Core Brain with Glow */}
            <div className="absolute inset-0 flex items-center justify-center filter drop-shadow-[0_0_40px_rgba(99,102,241,0.4)] dark:drop-shadow-[0_0_60px_rgba(99,102,241,0.6)]">
                <Brain size={140} className="text-indigo-600 dark:text-white/90" strokeWidth={0.5} />
            </div>

            {/* Orbital Rings representing 'Crystal' structure */}
            <div className="absolute inset-0 rounded-full border border-indigo-400/30 dark:border-indigo-400/20 animate-[spin_10s_linear_infinite]" style={{ transform: 'rotateX(75deg)' }}></div>
            <div className="absolute inset-[-40px] rounded-full border border-purple-400/30 dark:border-purple-400/20 animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'rotateX(45deg)' }}></div>

            {/* Prismatic Nodes */}
            <OrbitCrystal angle={0} color="#a5b4fc" delay={0} />
            <OrbitCrystal angle={120} color="#c4b5fd" delay={1} />
            <OrbitCrystal angle={240} color="#93c5fd" delay={2} />
        </motion.div>
    );
}

function OrbitCrystal({ angle, color, delay }: { angle: number, color: string, delay: number }) {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 rounded-full bg-white shadow-md dark:shadow-[0_0_20px_white]"
            style={{
                rotate: angle,
                // In light mode, simple shadow. In dark mode, glow.
                // Note: inline styles don't support media queries easily, so we rely on the class shadow-md (light) and override with box-shadow in dark mode if needed, or just keep glowing.
            }}
            animate={{ rotate: angle + 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
        </motion.div>
    );
}

function SpotlightCard({ data, index }: { data: any, index: number }) {
    const { t } = useLanguage();
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const Icon = index === 0 ? Vault : index === 1 ? Shield : Cloud;

    return (
        <div
            className="group relative border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] rounded-3xl p-8 overflow-hidden shadow-xl dark:shadow-none"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(99, 102, 241, 0.1),
                            transparent 80%
                        )
                    `
                }}
            />
            {/* Dark mode spotlight needs to be brighter/different opacity if 0.1 is too subtle on dark */}

            {/* Content layer */}
            <div className="relative h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-white/10 dark:to-white/0 border border-indigo-100 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-white mb-6 shadow-sm dark:shadow-lg">
                    <Icon size={28} />
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t(data.title)}</h3>
                    <p className="text-xs font-medium text-indigo-500 dark:text-indigo-300 uppercase tracking-widest">{t(data.subtitle)}</p>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {t(data.description)}
                </p>

                {/* Glass HUD/Code Reveal */}
                <div className="relative mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
                    <div className="absolute -top-3 left-0 px-2 bg-[#f0f9ff] dark:bg-slate-950 text-[10px] text-slate-400 font-mono">technical_spec</div>
                    <div className="grid grid-cols-2 gap-4">
                        {data.stats.slice(0, 2).map((s: any) => (
                            <div key={s.label}>
                                <div className="text-slate-900 dark:text-white font-mono font-bold">{s.value}</div>
                                <div className="text-[10px] text-slate-500 uppercase">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
