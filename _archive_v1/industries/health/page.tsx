
"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from "@/context/LanguageContext";
import { healthcareData, type HealthSolution, type HealthCapability } from '@/data/industries/health';

export default function HealthcarePage() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const dnaCanvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // --- DNA Helix Canvas Simulation ---
    useEffect(() => {
        const canvas = dnaCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        let particles: DnaParticle[] = [];
        let angle = 0;
        let animationId: number;

        class DnaParticle {
            y: number; offset: number; color: string;
            x: number = 0; z: number = 0; radius: number;

            constructor(y: number, offset: number, color: string) {
                this.y = y;
                this.offset = offset;
                this.color = color;
                this.radius = Math.random() * 2 + 2;
            }

            update() {
                const amplitude = width > 768 ? 100 : 60;
                const currentAngle = angle + this.offset;
                this.x = width / 2 + Math.sin(currentAngle) * amplitude;
                this.z = Math.cos(currentAngle);
            }

            draw() {
                const scale = 1 + this.z * 0.3;
                const opacity = 0.5 + this.z * 0.4;

                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.radius * scale, 0, Math.PI * 2);
                ctx!.fillStyle = this.color.replace('OPACITY', opacity.toString());
                ctx!.fill();
            }
        }

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initDNA();
        };

        const initDNA = () => {
            particles = [];
            const rows = 40;
            const gap = height / rows;

            for (let i = 0; i < rows; i++) {
                const y = i * gap + gap / 2;
                const phase = i * 0.2;

                particles.push(new DnaParticle(y, phase, 'rgba(6, 182, 212, OPACITY)'));
                particles.push(new DnaParticle(y, phase + Math.PI, 'rgba(59, 130, 246, OPACITY)'));
            }
        };

        const animateDNA = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i += 2) {
                const p1 = particles[i];
                const p2 = particles[i + 1];

                p1.update();
                p2.update();

                const avgZ = (p1.z + p2.z) / 2;
                const opacity = 0.2 + avgZ * 0.2;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.5})`; // Cyan-400
                ctx.lineWidth = 1;
                ctx.stroke();

                p1.draw();
                p2.draw();
            }

            angle += 0.01;
            animationId = requestAnimationFrame(animateDNA);
        };

        window.addEventListener('resize', resize);
        resize();
        animateDNA();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-cyan-100 dark:selection:bg-cyan-900 selection:text-cyan-900 dark:selection:text-cyan-100 overflow-x-hidden relative transition-colors duration-500">
            {/* DNA Canvas Background */}
            <canvas
                ref={dnaCanvasRef}
                className="fixed inset-0 w-full h-full pointer-events-none opacity-30 z-0"
            />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
                
                .glass-panel {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    transition: all 0.3s ease;
                }
                .glass-card:hover {
                    background: rgba(255, 255, 255, 0.9);
                    border-color: rgba(6, 182, 212, 0.5);
                    box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);
                }
                .tech-text { font-family: 'Space Mono', monospace; }
                
                .hero-grid {
                    background-size: 50px 50px;
                    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    mask-image: radial-gradient(circle at center, black, transparent 80%);
                }
                @keyframes scan-vertical {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .scan-line {
                    position: absolute;
                    left: 0; width: 100%; height: 2px;
                    background: #06b6d4;
                    box-shadow: 0 0 10px #06b6d4;
                    animation: scan-vertical 3s linear infinite;
                }
            `}</style>

            {/* FontAwesome */}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 hero-grid pointer-events-none"></div>

                {/* Ambient Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-8">
                            <i className="fas fa-shield-virus"></i>
                            {t('hipaa_compliant')}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            {t(healthcareData.hero.headline)}
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 font-light leading-relaxed">
                            {t(healthcareData.hero.subhead)}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact?subject=Health_Data_Space_Audit" className="px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2">
                                <i className="fas fa-microchip"></i>
                                {t('req_secure_enclave')}
                            </Link>
                            <Link href="/platform" className="px-8 py-4 rounded-xl border border-slate-200 hover:border-cyan-500/50 text-slate-700 hover:text-cyan-600 transition-all bg-white/50 backdrop-blur-sm shadow-sm">
                                {t('view_technical_docs')}
                            </Link>
                        </div>
                    </motion.div>

                    {/* MOCKUP: Genomic Research Enclave */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Enclave Container */}
                        <div className="glass-panel text-slate-900 rounded-2xl p-1 shadow-2xl relative overflow-hidden group border-slate-200 bg-white/80 backdrop-blur-md">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 pointer-events-none"></div>

                            {/* Header Bar */}
                            <div className="bg-white/90 border-b border-slate-200 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <span className="ml-4 tech-text text-xs text-slate-500 uppercase">Secure Enclave :: TEE-AMD-SEV-SNP</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase">
                                    <i className="fas fa-lock"></i> Encrypted
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="bg-slate-50 p-6 h-[400px] relative overflow-hidden font-mono text-xs">
                                {/* Grid Overlay */}
                                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5 pointer-events-none">
                                    {Array.from({ length: 36 }).map((_, i) => (
                                        <div key={i} className="border border-slate-300"></div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-6 h-full relative z-10">
                                    {/* Left Panel: Genomic Data (Encrypted) */}
                                    <div className="border border-slate-200 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="text-slate-500 mb-2 uppercase tracking-wide font-semibold">Genomic Sequence (Encrypted)</div>
                                        <div className="space-y-1 text-slate-400 opacity-50 blur-[2px]">
                                            <div>ATGC-GCTA-TAGC-CGTA-1001</div>
                                            <div>CGTA-TAGC-ATGC-GCTA-1002</div>
                                            <div>TAGC-CGTA-GCTA-ATGC-1003</div>
                                            <div>GCTA-ATGC-CGTA-TAGC-1004</div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-center p-4 border border-dashed border-slate-300 rounded bg-slate-50">
                                            <i className="fas fa-lock text-3xl text-slate-400"></i>
                                        </div>
                                    </div>

                                    {/* Right Panel: Analytics Output (Decrypted in TEE) */}
                                    <div className="border border-cyan-200 bg-cyan-50 p-4 rounded-lg relative overflow-hidden shadow-sm">
                                        <div className="text-cyan-700 mb-2 uppercase tracking-wide flex justify-between font-semibold">
                                            <span>Analysis Output</span>
                                            <span className="animate-pulse">_</span>
                                        </div>
                                        <div className="space-y-2 text-cyan-800">
                                            <div className="flex justify-between">
                                                <span>&gt; Variant Risk Score:</span>
                                                <span className="font-bold">0.89</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>&gt; Population Match:</span>
                                                <span className="font-bold">94.2%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>&gt; Drug Sensitivity:</span>
                                                <span className="font-bold text-red-500">HIGH</span>
                                            </div>
                                        </div>

                                        {/* Dynamic Graph */}
                                        <div className="mt-6 h-32 flex items-end justify-between gap-1">
                                            {[40, 60, 30, 80, 50, 90, 70, 40].map((h, i) => (
                                                <div key={i} className="w-full bg-cyan-500 rounded-t opacity-80" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Scan Line */}
                                <div className="scan-line top-0 bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                            </div>
                        </div>

                        {/* Floating Security Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white border border-green-500/30 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                <i className="fas fa-shield-check"></i>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase">Security Level</div>
                                <div className="text-sm font-bold text-slate-900">Confidential L4</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* HARD ENGINEERING SOLUTIONS */}
            <section className="py-24 bg-white/60 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-700 relative backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                                Hard Engineering
                            </span> Solutions
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light">
                            {t(healthcareData.hero.subhead)}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {healthcareData.solutions.map((sol, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl rounded-2xl p-8 group relative overflow-hidden transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-2xl text-cyan-600 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                    <i className={sol.icon}></i>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-cyan-600 transition-colors">{t(sol.title)}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-8 border-b border-slate-200 pb-8 min-h-[80px]">
                                    {t(sol.description)}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {sol.metrics.map((m, i) => (
                                        <div key={i}>
                                            <div className="text-lg font-bold text-slate-900 font-mono">{m.value}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t(m.label)}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BIO-COMPUTE STACK */}
            <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 opacity-50"></div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 relative z-10">
                    <div>
                        <h2 className="text-4xl font-bold mb-8 text-slate-900">Bio-Compute Stack</h2>
                        <p className="text-slate-600 mb-12 text-lg">
                            An integrated platform for high-throughput life sciences. From raw sequencing data to FDA-ready submission packages.
                        </p>

                        <div className="space-y-6">
                            {healthcareData.capabilities.map((cap, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center shrink-0 group-hover:border-cyan-500 transition-colors">
                                        <span className="text-cyan-600 font-mono text-xs font-bold">0{index + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{t(cap.title)}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{t(cap.description)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Stack Visualization */}
                        <div className="absolute top-10 left-10 right-10 bottom-10 bg-cyan-200/20 blur-[100px]"></div>
                        <div className="relative space-y-4">
                            {['Application Layer', 'Orchestration Layer', 'Compute Layer', 'Hardware Layer'].map((layer, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="glass-panel bg-white/90 dark:bg-slate-800/90 p-6 rounded-xl border-l-4 border-l-cyan-500 flex justify-between items-center shadow-lg border-y border-r border-slate-100 dark:border-slate-700"
                                >
                                    <span className="font-mono text-sm uppercase tracking-widest text-slate-500">{layer}</span>
                                    <i className="fas fa-layer-group text-slate-400"></i>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="glass-panel bg-white dark:bg-slate-900 rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            {t('securely_signed')}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                            Deploy your first Confidential Computing enclave in under 24 hours.
                        </p>

                        <Link href="/contact?subject=Health_Data_Space_Audit" className="inline-block px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-colors shadow-2xl shadow-slate-900/20">
                            {t('req_secure_enclave')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
