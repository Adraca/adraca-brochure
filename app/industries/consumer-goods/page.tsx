"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/components/ui/Navbar";
import { motion } from 'framer-motion';
import {
    ArrowRight, Check, FileText, Leaf, ScanLine,
    Cpu, Database, ShoppingBag, Calculator, Sparkles
} from 'lucide-react';
import { cgsPageData } from '@/data/industries/cgs';

const iconMap: Record<string, React.ReactNode> = {
    "passport": <FileText className="w-7 h-7" />,
    "leaf": <Leaf className="w-7 h-7" />,
    "scan": <ScanLine className="w-7 h-7" />
};

const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
    "passport": { icon: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30", border: "border-purple-100 dark:border-purple-800" },
    "leaf": { icon: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30", border: "border-emerald-100 dark:border-emerald-800" },
    "scan": { icon: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-900/30", border: "border-cyan-100 dark:border-cyan-800" }
};

export default function ConsumerGoodsPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { hero, solutions, capabilities, roiCalculator } = cgsPageData;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        class Particle {
            x: number; y: number; vx: number; vy: number; size: number; id: number;
            constructor(id: number) {
                this.id = id;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
                ctx.fill();
            }
        }

        let particles: Particle[] = [];
        const initParticles = () => {
            particles = [];
            const count = Math.floor(window.innerWidth / 20);
            for (let i = 0; i < count; i++) particles.push(new Particle(i));
        };

        const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; initParticles(); };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            particles.forEach(p => {
                particles.forEach(p2 => {
                    if (p.id < p2.id) {
                        const dx = p.x - p2.x, dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 120) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(203, 213, 225, ${0.15 - dist / 800})`;
                            ctx.lineWidth = 1;
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                });
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        initParticles();
        const animId = requestAnimationFrame(animate);
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
    }, []);

    return (
        <div className="font-sans text-slate-900 bg-[#F8FAFC] dark:bg-slate-950 overflow-x-hidden min-h-screen transition-colors duration-500">
            {/* Background Canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

            {/* Background Orbs */}
            <div className="fixed w-96 h-96 bg-purple-200/50 dark:bg-purple-900/20 rounded-full blur-[100px] top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="fixed w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[100px] bottom-0 right-0 translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <Navbar />

            {/* ============================================= */}
            {/* HERO SECTION */}
            {/* ============================================= */}
            <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white dark:border-slate-700 shadow-sm mb-8">
                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-wide uppercase">{hero.badge}</span>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8">
                                {hero.headline.split('.')[0]}.<br />
                                <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                    {hero.headline.split('.')[1]?.trim() || 'Circular Consumption.'}
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
                                {hero.subhead}
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link href="/contact?subject=CGS_Architecture_Audit" className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                                    {hero.ctaText}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="px-8 py-4 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg hover:bg-white dark:hover:bg-slate-800 transition-all">
                                    {hero.secondaryCta}
                                </button>
                            </motion.div>
                        </div>

                        {/* Right: Image */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                            className="relative hidden lg:block">
                            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white dark:border-slate-700 rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700">
                                <Image src="/images/industries/cgs/digital-passport.jpg" alt="DPP Dashboard" width={700} height={450} className="rounded-xl" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700 rounded-xl p-4 shadow-lg flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                    <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 font-bold">DPP Coverage</div>
                                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200">100% SKUs</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============================================= */}
            {/* HARD ENGINEERING SOLUTIONS (3 Cards) */}
            {/* ============================================= */}
            <section id="solutions" className="relative z-10 py-24 bg-white/50 dark:bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Cpu size={12} /> Hard Engineering Solutions
                        </motion.div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">The Sovereign CGS Stack</h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Purpose-built data infrastructure for regulatory compliance, sustainability tracking, and operational intelligence.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutions.map((solution, idx) => (
                            <motion.div key={solution.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}
                                className="bg-white/70 dark:bg-slate-800/40 backdrop-blur-xl border border-white dark:border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group">
                                {/* Header */}
                                <div className="p-8 border-b border-slate-100 dark:border-slate-700">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border ${colorMap[solution.icon]?.bg} ${colorMap[solution.icon]?.border} ${colorMap[solution.icon]?.icon}`}>
                                            {iconMap[solution.icon]}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                                            {solution.subtitle.split(' ')[0]}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{solution.title}</h3>
                                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{solution.subtitle}</p>
                                </div>

                                {/* Body */}
                                <div className="p-8 flex-grow">
                                    {solution.tag && (
                                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                                            <Check size={10} /> {solution.tag}
                                        </div>
                                    )}
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{solution.description}</p>

                                    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-700">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-2">
                                            <Database size={12} /> Technical Architecture
                                        </div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{solution.technicalDepth}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        {solution.stats.map((stat) => (
                                            <div key={stat.label}>
                                                <div className="text-xl font-bold text-slate-800 dark:text-white">{stat.value}</div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-slate-100 dark:border-slate-700">
                                    <Link href={solution.blueprintLink}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-purple-600 dark:hover:bg-purple-600 text-slate-600 dark:text-slate-300 hover:text-white font-bold rounded-xl transition-all">
                                        View Technical Blueprint <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================= */}
            {/* ENGINEERING CAPABILITIES (Laundry List) */}
            {/* ============================================= */}
            <section className="relative z-10 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left: Header + Image */}
                        <div className="lg:sticky lg:top-32">
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Engineering Capabilities for CGS</h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                Our platform is built on battle-tested infrastructure components. No black boxes—just transparent, auditable engineering.
                            </p>
                            <Image src="/images/industries/cgs/cgs-compliance.jpg" alt="CGS Compliance" width={500} height={300} className="rounded-2xl border border-white dark:border-slate-700 shadow-xl" />
                        </div>

                        {/* Right: List */}
                        <div className="space-y-4">
                            {capabilities.map((cap, idx) => (
                                <motion.div key={cap.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * idx }}
                                    className="bg-white/70 dark:bg-slate-800/40 backdrop-blur-xl border border-white dark:border-slate-700 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                                            <Check size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{cap.title}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{cap.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================= */}
            {/* ROI CALCULATOR CTA */}
            {/* ============================================= */}
            <section className="relative z-10 py-24 bg-white/50 dark:bg-transparent">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl border border-purple-100 dark:border-purple-800 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-700 flex items-center justify-center mx-auto mb-6">
                                <Calculator size={32} className="text-purple-600 dark:text-purple-400" />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{roiCalculator.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">{roiCalculator.description}</p>

                            <Link href="/contact?subject=ESG_Readiness_Check" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <Calculator size={18} />
                                {roiCalculator.ctaText}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <p className="text-xs text-slate-400 mt-6">Coming Soon: Interactive Assessment Tool</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ============================================= */}
            {/* BOTTOM CTA */}
            {/* ============================================= */}
            <section className="relative z-10 py-24 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ShoppingBag size={40} className="text-slate-300 dark:text-slate-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to Engineer Your CGS Transformation?</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">Let&apos;s discuss how sovereign data infrastructure can accelerate your compliance and sustainability goals.</p>
                    <Link href="/contact?subject=CGS_Architecture_Audit" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:-translate-y-1 transition-all shadow-lg">
                        Schedule Architecture Review <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
