"use client";
import React, { useEffect, useRef, useState } from "react";
// We are using the provided HTML's specific Navbar for this page, so we don't import the global one.
// However, the global navbar is in layout.tsx. We'll have to live with it or maybe this page overlays it.
// The provided code has a transparent/glassy navbar.

import { useLanguage } from "@/context/LanguageContext";

export default function SecuritySovereignty() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- 1. Defense Grid Canvas ---
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let nodes: any[] = [];
        const mouse = { x: -1000, y: -1000 };

        class Node {
            x: number; y: number; vx: number; vy: number;
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const angle = Math.atan2(dy, dx);
                    const force = (200 - dist) / 200;
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initNodes = () => {
            nodes = [];
            const count = width > 768 ? 80 : 40;
            for (let i = 0; i < count; i++) nodes.push(new Node());
        };

        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update();
                nodes[i].draw();
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        const mouseDist = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
                        if (mouseDist < 200) {
                            ctx.strokeStyle = `rgba(14, 165, 233, ${1 - dist / 120})`;
                            ctx.lineWidth = 1;
                        } else {
                            ctx.strokeStyle = `rgba(203, 213, 225, ${0.5 - dist / 240})`;
                            ctx.lineWidth = 0.5;
                        }
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Cursor Logic
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        initNodes();
        animateCanvas();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        // --- Hover Logic & Redaction ---
        const targets = document.querySelectorAll('.interactive-target');
        const redacted = document.querySelectorAll('.redacted');
        const wrapper = wrapperRef.current;

        const addHover = () => wrapper?.classList.add('hovering');
        const removeHover = () => wrapper?.classList.remove('hovering');

        const revealText = (e: Event) => {
            const el = e.currentTarget as HTMLElement;
            const secret = el.getAttribute('data-text');
            if (secret && el.innerText.includes('█')) {
                el.innerText = secret;
                el.classList.add('revealed');
            }
        }

        targets.forEach(el => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        redacted.forEach(el => {
            el.addEventListener('mouseenter', revealText);
        });

        return () => {
            targets.forEach(el => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
            redacted.forEach(el => el.removeEventListener('mouseenter', revealText));
        }
    }, []);

    useEffect(() => {
        // --- Scroll Reveal ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.reveal-up');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapperRef} className="sovereign-page min-h-screen bg-background text-slate-800 dark:text-slate-100 font-[Outift] overflow-x-hidden selection:bg-sky-100 selection:text-sky-900 cursor-none relative transition-colors duration-500">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet" />

            {/* --- Styles --- */}
            <style jsx global>{`
        .sovereign-page { font-family: 'Outfit', sans-serif; cursor: none; }
        .tech-font { font-family: 'Rajdhani', sans-serif; }

        /* Cursor */
        #cursor-lock {
            position: fixed; top: 0; left: 0;
            pointer-events: none; z-index: 9999;
            transform: translate(-50%, -50%);
            display: flex; justify-content: center; align-items: center;
            mix-blend-mode: exclusion;
        }
        .cursor-frame {
            width: 40px; height: 40px;
            border: 2px solid white;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
        }
        .cursor-frame::before, .cursor-frame::after {
            content: ''; position: absolute; width: 10px; height: 10px;
            border: 2px solid white; transition: all 0.3s;
        }
        .cursor-frame::before { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .cursor-frame::after { bottom: -2px; right: -2px; border-left: none; border-top: none; }
        
        .cursor-icon {
            font-family: "Font Awesome 6 Free"; font-weight: 900;
            font-size: 10px; color: white; opacity: 0; position: absolute; transition: opacity 0.2s;
        }

        /* Hover State */
        .sovereign-page.hovering #cursor-lock .cursor-frame {
            width: 60px; height: 60px; border-color: transparent; transform: rotate(45deg);
        }
        .sovereign-page.hovering #cursor-lock .cursor-frame::before { top: 0; left: 0; border-color: #0ea5e9; }
        .sovereign-page.hovering #cursor-lock .cursor-frame::after { bottom: 0; right: 0; border-color: #0ea5e9; }
        .sovereign-page.hovering #cursor-lock .cursor-icon { opacity: 1; content: "\\f023"; }

        /* Shield Animation Keyframes */
        @keyframes float-shield { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes pulse-core { 0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) translateZ(-20px) scale(1); } 50% { opacity: 0.8; transform: translate(-50%, -50%) translateZ(-20px) scale(1.2); } }
        @keyframes scan-down { 0% { top: 0%; } 100% { top: 100%; } }

        /* Utilities */
        .reveal-up { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-up.active { opacity: 1; transform: translateY(0); }
        .clip-corner { clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
        .redacted { background: #e2e8f0; color: transparent; border-radius: 4px; user-select: none; transition: all 0.5s ease; cursor: help; }
        .dark .redacted { background: #1e293b; }
        .redacted.revealed { background: transparent; color: inherit; }
      `}</style>

            {/* Access Cursor */}
            <div id="cursor-lock" ref={cursorRef}>
                <div className="cursor-frame">
                    <i className="cursor-icon"></i>
                </div>
            </div>

            {/* Defense Grid Background */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-white/0 dark:bg-slate-950/20"></canvas>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 min-h-screen flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">

                    {/* Left: Typography */}
                    <div className="relative z-10 order-2 lg:order-1">
                        <div className="reveal-up">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] tech-font">{t('perimeter_secure')}</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 leading-[0.9] tracking-tighter">
                                {t('data_sovereignty_hero')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-600 dark:from-white dark:to-cyan-400">{t('sovereignty_hero')}</span>
                            </h1>

                            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mb-12 font-light leading-relaxed">
                                {t('security_hero_desc_start')}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-slate-900 dark:bg-sky-600 text-white px-8 py-4 font-bold shadow-xl hover:bg-sky-600 dark:hover:bg-sky-500 transition-all flex items-center gap-3 interactive-target clip-corner">
                                    <i className="fa-solid fa-fingerprint"></i> {t('authorize_access')}
                                </button>
                                <div className="px-6 py-4 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono flex items-center gap-2">
                                    {t('encryption_aes')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Shield */}
                    <div className="relative z-10 order-1 lg:order-2 flex justify-center lg:justify-start items-center h-full perspective-container interactive-target pl-0 lg:pl-12">
                        <div className="shield-stage group">
                            <div className="shield-assembly w-full h-full absolute transform-style-3d animate-[float-shield_6s_ease-in-out_infinite]">
                                <div className="shield-core absolute top-1/2 left-1/2 w-20 h-20 bg-sky-500 -translate-x-1/2 -translate-y-1/2 -translate-z-20 blur-xl rounded-full animate-[pulse-core_4s_infinite]"></div>
                                <div className="absolute inset-0 flex items-center justify-center border border-white/60 dark:border-white/10 bg-white/40 dark:bg-sky-500/10 backdrop-blur-md transition-transform duration-500 transform-style-3d group-hover:translate-z-10 group-hover:rotate-x-12 z-30" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                                    <i className="fa-solid fa-lock text-6xl text-slate-800/80 dark:text-white/80"></i>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center border border-white/60 dark:border-white/10 bg-white/30 dark:bg-sky-500/5 backdrop-blur-sm transition-transform duration-500 transform-style-3d group-hover:-translate-z-10 group-hover:rotate-x-6 scale-90 z-20 opacity-70" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                                <div className="absolute inset-0 flex items-center justify-center border border-white/60 dark:border-white/10 bg-white/20 dark:bg-sky-500/5 backdrop-blur-sm scale-75 z-10 opacity-40" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </section >

            {/* CARDS SECTION (Frost Vaults) */}
            < section className="py-32 relative z-10" >
                <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-end reveal-up">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tech-font uppercase">Defense Protocols</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md">Hover to scan for details.</p>
                    </div>
                    <div className="text-3xl text-slate-300 dark:text-slate-700">
                        <i className="fa-solid fa-shield-halved"></i>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="reveal-up interactive-target group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-3xl p-10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.15)] hover:border-sky-500 dark:hover:border-sky-500">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-[0_0_15px_#0ea5e9] opacity-0 group-hover:opacity-100 group-hover:animate-[scan-down_1s_linear_forwards] pointer-events-none z-10"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex items-center justify-center text-2xl mb-6 clip-corner">
                                <i className="fa-solid fa-server"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('sovereign_cloud')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {t('sovereign_cloud_desc')}
                            </p>

                            <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-[100px] group-hover:opacity-100 group-hover:mt-6 group-hover:pt-6 border-t border-sky-500/20">
                                <ul className="space-y-2 text-xs font-mono text-sky-700 dark:text-sky-300">
                                    <li>{t('geo_lock_active')}</li>
                                    <li>{t('cross_border_denied')}</li>
                                    <li>{t('audit_log_immutable')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="reveal-up interactive-target group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-3xl p-10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.15)] hover:border-sky-500 dark:hover:border-sky-500" style={{ transitionDelay: '100ms' }}>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-[0_0_15px_#0ea5e9] opacity-0 group-hover:opacity-100 group-hover:animate-[scan-down_1s_linear_forwards] pointer-events-none z-10"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-2xl mb-6 clip-corner">
                                <i className="fa-solid fa-user-secret"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('private_ai')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {t('private_ai_desc')}
                            </p>

                            <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-[100px] group-hover:opacity-100 group-hover:mt-6 group-hover:pt-6 border-t border-sky-500/20">
                                <ul className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                                    <li>{t('zero_knowledge_true')}</li>
                                    <li>{t('raw_data_unseen')}</li>
                                    <li>{t('model_weights_secure')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="reveal-up interactive-target group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-3xl p-10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(244,63,94,0.15)] hover:border-rose-500 dark:hover:border-rose-500" style={{ transitionDelay: '200ms' }}>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_15px_#f43f5e] opacity-0 group-hover:opacity-100 group-hover:animate-[scan-down_1s_linear_forwards] pointer-events-none z-10"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center text-2xl mb-6 clip-corner">
                                <i className="fa-solid fa-radar"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('threat_sentinel')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {t('threat_sentinel_desc')}
                            </p>

                            <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-[100px] group-hover:opacity-100 group-hover:mt-6 group-hover:pt-6 border-t border-rose-500/20">
                                <ul className="space-y-2 text-xs font-mono text-rose-700 dark:text-rose-300">
                                    <li>{t('anomaly_detect_99')}</li>
                                    <li>{t('poison_filter_on')}</li>
                                    <li>{t('response_automated')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section >

            {/* LIVE THREAT MAP (Abstract) */}
            < section className="py-24 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 relative overflow-hidden text-white" >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="reveal-up">
                        <h2 className="text-4xl font-bold mb-6 tech-font uppercase">{t('global_watchtower')}</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            {t('watchtower_desc')}
                        </p>

                        <div className="space-y-4 font-mono text-xs">
                            <div className="flex justify-between border-b border-slate-700 pb-2">
                                <span className="text-sky-400">{t('node_berlin')}</span>
                                <span className="text-emerald-400">{t('secure_integrity')}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-700 pb-2">
                                <span className="text-sky-400">{t('node_tokyo')}</span>
                                <span className="text-emerald-400">{t('secure_integrity')}</span>
                            </div>

                        </div>
                    </div>

                    {/* Hex Grid Visualization */}
                    <div className="h-80 relative flex items-center justify-center interactive-target group">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 border border-sky-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                            <div className="w-48 h-48 border border-sky-500/50 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                        </div>

                        {/* Central Shield Icon */}
                        <div className="relative z-10 w-24 h-24 bg-slate-800 border-2 border-sky-500 flex items-center justify-center clip-corner shadow-[0_0_30px_rgba(14,165,233,0.3)] group-hover:shadow-[0_0_50px_rgba(14,165,233,0.6)] transition-shadow">
                            <i className="fa-solid fa-lock text-3xl text-white"></i>
                        </div>

                        <div className="absolute bottom-0 text-center w-full font-mono text-[10px] text-slate-500">
                            {t('system_status_armor')}
                        </div>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16" >
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-slate-900 dark:text-white font-bold tracking-tight text-lg tech-font uppercase">{t('adraca_sec')}</span>
                    </div>
                    <div className="text-slate-400 text-sm font-medium">
                        {t('clearance_required')}
                    </div>
                    <div className="flex gap-6 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
                        <a href="#" className="hover:text-sky-600 transition interactive-target">{t('compliance')}</a>
                        <a href="#" className="hover:text-sky-600 transition interactive-target">{t('audits')}</a>
                        <a href="#" className="hover:text-sky-600 transition interactive-target">{t('contact_sec')}</a>
                    </div>
                </div>
            </footer >
        </div >
    );
}
