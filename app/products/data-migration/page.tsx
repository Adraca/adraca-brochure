"use client";
import React, { useEffect, useRef } from "react";
// Local navigation removed as requested. Global navbar is active.

import { useLanguage } from "@/context/LanguageContext";

export default function DataMigration() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const floaterRef = useRef<HTMLDivElement>(null);

    // --- 1. Stream-Line Canvas & Cursor ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles: any[] = [];
        const mouse = { x: -1000, y: -1000 };

        class Packet {
            x: number = 0; y: number = 0; speed: number = 0; len: number = 0; color: string = ''; width: number = 0;
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.speed = Math.random() * 3 + 1;
                this.len = Math.random() * 40 + 10;
                this.color = Math.random() > 0.5 ? '#93c5fd' : '#c4b5fd';
                this.width = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.speed;
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const angle = Math.atan2(dy, dx);
                    this.y += Math.sin(angle) * 2;
                }
                if (this.x > width) {
                    this.x = -this.len;
                    this.y = Math.random() * height;
                }
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.len, this.y);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.width;
                ctx.lineCap = 'round';
                ctx.globalAlpha = 0.4;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }

        const initParticles = () => {
            particles = [];
            const count = width > 768 ? 150 : 50;
            for (let i = 0; i < count; i++) particles.push(new Packet());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Interactive Hover Logic
        const interactives = document.querySelectorAll('button, a, .container-card, .interactive-target');
        const container = document.querySelector('.migration-page');

        const addHover = () => container?.classList.add('hovering');
        const removeHover = () => container?.classList.remove('hovering');

        interactives.forEach(el => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        }
    }, []);

    // --- 2. Floating Status Pill Logic ---
    useEffect(() => {
        const handleScroll = () => {
            if (!floaterRef.current) return;
            const currentScroll = window.scrollY;
            if (currentScroll > window.innerHeight * 0.5) {
                floaterRef.current.classList.add('visible');
            } else {
                floaterRef.current.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- 3. Scroll Reveal ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="migration-page min-h-screen bg-background text-[#0f172a] dark:text-slate-100 font-[Outfit] overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 cursor-none relative transition-colors duration-500">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

            <style jsx global>{`
                :root {
                    --bg-color: #f8fafc;
                    --text-main: #0f172a;
                    --accent-flow: #3b82f6;
                    --accent-dest: #8b5cf6;
                }
                .dark {
                    --bg-color: #020617;
                    --text-main: #f1f5f9;
                }

                .migration-page { font-family: 'Outfit', sans-serif; cursor: none; }
                .mono { font-family: 'JetBrains Mono', monospace; }

                /* Cursor */
                #cursor-scanner {
                    position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
                    transform: translate(-50%, -50%); display: flex; justify-content: center; align-items: center;
                }
                .scanner-bracket {
                    position: absolute; width: 20px; height: 20px; border: 2px solid var(--text-main);
                    transition: all 0.2s ease-out;
                }
                .sb-tl { top: -15px; left: -15px; border-right: 0; border-bottom: 0; }
                .sb-tr { top: -15px; right: -15px; border-left: 0; border-bottom: 0; }
                .sb-bl { bottom: -15px; left: -15px; border-right: 0; border-top: 0; }
                .sb-br { bottom: -15px; right: -15px; border-left: 0; border-top: 0; }
                .scanner-line {
                    width: 100%; height: 2px; background: var(--accent-flow);
                    position: absolute; top: 50%; transform: translateY(-50%);
                    animation: scan-vertical 1s ease-in-out infinite; opacity: 0.5;
                }
                .migration-page.hovering .scanner-bracket { margin: 10px; border-color: var(--accent-flow); }

                /* The Data Gate */
                .gate-stage { width: 400px; height: 400px; perspective: 1000px; position: relative; }
                .gate-assembly { width: 100%; height: 100%; position: absolute; transform-style: preserve-3d; animation: float 6s ease-in-out infinite; }
                .gate-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; border: 1px solid rgba(59, 130, 246, 0.2); transform-style: preserve-3d; }
                .gr-1 { width: 300px; height: 300px; transform: translate(-50%, -50%) translateZ(0px); animation: spin-gate 10s linear infinite; border-width: 2px; border-color: rgba(59, 130, 246, 0.4); }
                .gr-2 { width: 240px; height: 240px; transform: translate(-50%, -50%) translateZ(-50px); animation: spin-gate 8s linear infinite reverse; border-width: 4px; border-style: dashed; }
                .gr-3 { width: 180px; height: 180px; transform: translate(-50%, -50%) translateZ(-100px); animation: spin-gate 12s linear infinite; border-color: rgba(139, 92, 246, 0.5); }
                .core-stream {
                    position: absolute; top: 50%; left: 50%; width: 20px; height: 20px; background: white; border-radius: 50%;
                    transform: translate(-50%, -50%) translateZ(-150px); box-shadow: 0 0 50px 20px var(--accent-flow); animation: pulse-core 2s infinite;
                }

                /* Cards */
                .container-card {
                    position: relative; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.9); border-radius: 24px; overflow: hidden;
                    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s; cursor: none;
                }
                .dark .container-card {
                    background: rgba(2, 6, 23, 0.6);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .card-liquid {
                    position: absolute; bottom: 0; left: 0; width: 100%; height: 0%;
                    background: linear-gradient(to top, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05));
                    transition: height 0.5s ease-out; z-index: 0;
                }
                .card-liquid::after {
                    content: ''; position: absolute; top: -10px; left: 0; width: 200%; height: 20px;
                    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(59, 130, 246, 0.1)"></path></svg>');
                    background-size: 50% 100%; animation: wave 4s linear infinite;
                }
                .card-content { position: relative; z-index: 1; }
                .container-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.15); border-color: var(--accent-flow); }
                .container-card:hover .card-liquid { height: 100%; }

                /* Status Pill Toggle */
                .status-pill.visible { transform: translateY(0) !important; opacity: 1 !important; }

                /* Utils */
                .reveal-up { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
                .reveal-up.visible { opacity: 1; transform: translateY(0); }
                .gradient-text { background: linear-gradient(135deg, var(--accent-flow), var(--accent-dest)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .dark .gradient-text { background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

                /* Animations */
                @keyframes scan-vertical { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
                @keyframes slide-right {
                    0% { transform: translateX(-100px); }
                    100% { transform: translateX(600px); }
                }
                @keyframes spin-gate { 0% { transform: translate(-50%, -50%) translateZ(var(--z, 0)) rotateZ(0deg); } 100% { transform: translate(-50%, -50%) translateZ(var(--z, 0)) rotateZ(360deg); } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                @keyframes pulse-core { 0%, 100% { opacity: 0.5; scale: 1; } 50% { opacity: 1; scale: 1.5; } }
                @keyframes wave { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                
                .animate-slide-right-fast { animation: slide-right 2s linear infinite; }
                .animate-slide-right-slow { animation: slide-right 2.5s linear infinite; }
            `}</style>

            {/* Integrity Cursor */}
            <div id="cursor-scanner" ref={cursorRef}>
                <div className="scanner-bracket sb-tl"></div>
                <div className="scanner-bracket sb-tr"></div>
                <div className="scanner-bracket sb-bl"></div>
                <div className="scanner-bracket sb-br"></div>
                <div className="scanner-line"></div>
            </div>

            {/* Data Stream Background */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-white/0 dark:bg-slate-950/20"></canvas>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 min-h-[85vh] flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">

                    {/* Left: Typography */}
                    <div className="relative z-10 order-2 lg:order-1">
                        <div className="reveal-up">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mono">{t('connection_established')}</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 leading-[0.9] tracking-tight">
                                {t('legacy_to')} <br />
                                <span className="gradient-text">{t('limitless')}</span>
                            </h1>

                            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mb-12 font-light leading-relaxed">
                                {t('migration_hero_desc')}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-3 group">
                                    {t('initiate_pipeline')} <i className="fa-solid fa-play text-xs group-hover:text-blue-400 transition-colors"></i>
                                </button>
                                <div className="px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-600 dark:text-slate-400 text-xs font-mono">
                                    {t('speed_40gbs')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Data Gate */}
                    <div className="relative z-10 order-1 lg:order-2 flex justify-center items-center h-full perspective-container interactive-target">
                        <div className="gate-stage">
                            <div className="gate-assembly">
                                <div className="gate-ring gr-1" style={{ '--z': '0px' } as any}></div>
                                <div className="gate-ring gr-2" style={{ '--z': '-50px' } as any}></div>
                                <div className="gate-ring gr-3" style={{ '--z': '-100px' } as any}></div>
                                <div className="core-stream"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* CARDS SECTION (Liquid Fill) */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-end reveal-up">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('migration_engine')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md">{t('migration_engine_desc')}</p>
                    </div>
                    <div className="text-3xl text-blue-200 dark:text-blue-900">
                        <i className="fa-solid fa-database"></i>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="container-card p-8 h-[400px] flex flex-col justify-between reveal-up interactive-target">
                        <div className="card-liquid"></div>
                        <div className="card-content h-full flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl mb-8 border border-blue-100 dark:border-blue-800/50">
                                    <i className="fa-solid fa-truck-fast"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('express_transfer')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {t('express_transfer_desc')}
                                </p>
                            </div>
                            <div className="mono text-xs text-blue-600 dark:text-blue-400 font-bold border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
                                {t('protocol_tcp')}
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="container-card p-8 h-[400px] flex flex-col justify-between reveal-up interactive-target" style={{ transitionDelay: '100ms' }}>
                        <div className="card-liquid"></div>
                        <div className="card-content h-full flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-2xl mb-8 border border-violet-100 dark:border-violet-800/50">
                                    <i className="fa-solid fa-file-shield"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('schema_map')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {t('schema_map_desc')}
                                </p>
                            </div>
                            <div className="mono text-xs text-violet-600 dark:text-violet-400 font-bold border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
                                {t('conversion_auto')}
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="container-card p-8 h-[400px] flex flex-col justify-between reveal-up interactive-target" style={{ transitionDelay: '200ms' }}>
                        <div className="card-liquid"></div>
                        <div className="card-content h-full flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-2xl mb-8 border border-slate-200 dark:border-slate-700">
                                    <i className="fa-solid fa-check-double"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('live_validation')}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {t('live_validation_desc')}
                                </p>
                            </div>
                            <div className="mono text-xs text-slate-600 dark:text-slate-400 font-bold border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
                                {t('integrity_100')}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FLOATING STATUS PILL */}
            <div className="status-pill fixed bottom-8 right-8 z-[999] flex items-center gap-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/50 dark:border-white/10 px-8 py-5 rounded-3xl shadow-2xl transition-all duration-500 translate-y-12 opacity-0" id="status-floater" ref={floaterRef}>
                <div className="flex flex-col">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">{t('current_batch')}</span>
                    <span className="text-slate-900 dark:text-white font-bold">DB_SHARD_04</span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex flex-col">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">{t('speed_label')}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">12.4 GB/s</span>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-slate-100 border-t-blue-500 animate-spin"></div>
            </div>

            {/* PIPELINE VISUALIZATION (Abstract) */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                    <div className="reveal-up">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">{t('cutover_confidence')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                            {t('cutover_desc')}
                        </p>

                        <div className="space-y-4 font-mono text-xs text-slate-500 dark:text-slate-500">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{t('phase_1')}</span>
                                <span className="ml-auto text-slate-900 dark:text-white">{t('complete')}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{t('phase_2')}</span>
                                <span className="ml-auto text-slate-900 dark:text-white">{t('complete')}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span>{t('phase_3')}</span>
                                <span className="ml-auto text-blue-600 dark:text-blue-400">{t('in_progress')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Pipeline Graphic */}
                    <div className="relative h-64 bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-center items-center reveal-up p-8">

                        {/* Cutover Visualizer */}
                        <div className="w-full h-16 bg-slate-100 dark:bg-slate-900 rounded-full relative overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 mb-4">
                            {/* Phase 1: Snapshot (Green) */}
                            <div className="absolute top-0 left-0 h-full bg-green-500/20 w-full animate-pulse"></div>
                            <div className="absolute top-0 left-0 h-full bg-green-500 w-[100%] transition-all duration-1000 origin-left"></div>

                            {/* Scanning Line */}
                            <div className="absolute top-0 left-0 w-2 h-full bg-white/50 blur-sm animate-[slide-right_2s_linear_infinite]"></div>
                        </div>

                        {/* Dual-Write Sync Indicator */}
                        <div className="flex justify-between w-full text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {t('source_db_active')}</span>
                            <span className="text-blue-500 animate-pulse">{t('syncing_deltas')} &gt;&gt;&gt;</span>
                            <span className="flex items-center gap-2 text-slate-900 dark:text-white"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> {t('target_db_ready')}</span>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
