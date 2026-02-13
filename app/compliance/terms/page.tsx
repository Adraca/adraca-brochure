"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";
import { Scale, Gavel, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sigCanvasRef = useRef<HTMLCanvasElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // --- 1. Legal Grid Canvas ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let offset = 0;
        let animationFrameId: number;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            offset += 0.2;

            // Adapt color based on dark mode
            const isDark = document.documentElement.classList.contains("dark");
            ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)';
            ctx.lineWidth = 1;

            const gap = 60;

            // Draw moving grid
            for (let x = 0; x <= width; x += gap) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            for (let y = 0; y <= height; y += gap) {
                const yPos = (y + offset) % height;
                ctx.beginPath();
                ctx.moveTo(0, yPos);
                ctx.lineTo(width, yPos);
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animateCanvas);
        };
        animateCanvas();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // --- 2. 3D Card Tilt ---
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const x = (window.innerWidth / 2 - e.clientX) / 60;
        const y = (window.innerHeight / 2 - e.clientY) / 60;
        cardRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    // --- 3. Signature Canvas Logic ---
    useEffect(() => {
        const sigCanvas = sigCanvasRef.current;
        if (!sigCanvas) return;
        const sigCtx = sigCanvas.getContext('2d');
        if (!sigCtx) return;

        let isDrawing = false;

        const resizeSig = () => {
            const rect = sigCanvas.getBoundingClientRect();
            sigCanvas.width = rect.width;
            sigCanvas.height = rect.height;
        };
        resizeSig();
        window.addEventListener('resize', resizeSig);

        const getPos = (e: MouseEvent | TouchEvent) => {
            const rect = sigCanvas.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        };

        const startDraw = (e: any) => {
            isDrawing = true;
            e.preventDefault();
            const pos = getPos(e);
            sigCtx.beginPath();
            sigCtx.moveTo(pos.x, pos.y);
        };

        const draw = (e: any) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getPos(e);
            sigCtx.lineWidth = 2;
            sigCtx.lineCap = 'round';
            sigCtx.strokeStyle = '#6366f1'; // Indigo-500
            sigCtx.lineTo(pos.x, pos.y);
            sigCtx.stroke();
        };

        const stopDraw = () => {
            isDrawing = false;
            sigCtx.beginPath();
        };

        sigCanvas.addEventListener('mousedown', startDraw);
        sigCanvas.addEventListener('mousemove', draw);
        sigCanvas.addEventListener('mouseup', stopDraw);
        sigCanvas.addEventListener('mouseleave', stopDraw);
        sigCanvas.addEventListener('touchstart', startDraw);
        sigCanvas.addEventListener('touchmove', draw);
        sigCanvas.addEventListener('touchend', stopDraw);

        return () => {
            window.removeEventListener('resize', resizeSig);
            sigCanvas.removeEventListener('mousedown', startDraw);
            sigCanvas.removeEventListener('mousemove', draw);
            sigCanvas.removeEventListener('mouseup', stopDraw);
            sigCanvas.removeEventListener('mouseleave', stopDraw);
            sigCanvas.removeEventListener('touchstart', startDraw);
            sigCanvas.removeEventListener('touchmove', draw);
            sigCanvas.removeEventListener('touchend', stopDraw);
        };
    }, []);

    return (
        <div
            className="min-h-screen relative font-[family-name:var(--font-outfit)] perspective-1000 overflow-x-hidden bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500"
            onMouseMove={handleMouseMove}
        >
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20" />

            {/* Navigation Overlay */}
            <nav className="fixed w-full z-50 top-0 backdrop-blur-md bg-white/40 dark:bg-slate-900/40 border-b border-white/30 dark:border-slate-700/30 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                            <Scale size={18} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Adraca<span className="text-indigo-600 dark:text-indigo-400">.ai</span></span>
                    </div>
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors uppercase tracking-widest">
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                </div>
            </nav>

            <main className="pt-40 pb-32 px-6 relative z-10">
                <div
                    ref={cardRef}
                    className="max-w-4xl mx-auto bg-white/65 dark:bg-slate-900/65 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 rounded-[2rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05),inset_0_0_30px_rgba(255,255,255,0.6)] dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2),0_20px_40px_-5px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(255,255,255,0.05)] p-8 md:p-16 transition-transform duration-100 ease-linear transform-style-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Hero */}
                    <header className="text-center mb-16 relative z-10">
                        <div className="relative w-[120px] h-[120px] mx-auto mb-8 transform-style-3d animate-[float-gavel_6s_ease-in-out_infinite]">
                            <div className="absolute inset-0 flex items-center justify-center z-10 transform -rotate-12 drop-shadow-2xl">
                                <Gavel size={80} className="text-transparent stroke-[0] fill-[url(#gavel-gradient)]" />
                                <svg width="0" height="0">
                                    <linearGradient id="gavel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop stopColor="#6366f1" offset="0%" />
                                        <stop stopColor="#06b6d4" offset="100%" />
                                    </linearGradient>
                                </svg>
                                {/* Fallback/Overlay for the icon to ensure visibility if basic fill fails, though SVG gradient is standard */}
                                <Gavel size={80} className="absolute inset-0 text-indigo-500 opacity-20 blur-xl" />
                            </div>
                            <div className="absolute inset-[-20px] rounded-full border-2 border-indigo-500/20 animate-[spin_12s_linear_infinite]" style={{ transform: 'rotateX(60deg)' }} />
                            <div className="absolute inset-[-20px] rounded-full border-2 border-cyan-500/20 animate-[spin_18s_linear_infinite_reverse]" style={{ transform: 'rotateX(60deg) rotateY(90deg)' }} />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
                        >
                            Terms of Service
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-bold text-slate-400 dark:text-slate-500"
                        >
                            {t('last_updated')}
                        </motion.div>
                    </header>

                    {/* Content */}
                    <div className="space-y-12 relative z-10 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">

                        <Clause number="01" title={t('terms_intro_title')} delay={0.2} content={
                            <p>
                                {t('terms_intro_text').split(/(adraca\.io)/gi).map((part, i) =>
                                    part.toLowerCase() === 'adraca.io' ?
                                        <span key={i} className="text-indigo-600 dark:text-indigo-400 font-bold">{part}</span> :
                                        part
                                )}
                            </p>
                        } />

                        <Clause number="02" title={t('terms_ip_title')} delay={0.3} content={
                            <p>{t('terms_ip_text')}</p>
                        } />

                        <Clause number="03" title={t('terms_use_title')} delay={0.4} isAlert>
                            <div className="space-y-4">
                                <p>{t('terms_use_text')}</p>
                                <div className="bg-red-50/50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30 flex gap-4 items-start">
                                    <AlertTriangle className="text-red-500 mt-1 shrink-0" size={20} />
                                    <div>
                                        <p className="text-sm font-bold text-red-800 dark:text-red-400 mb-1">{t('terms_restricted_title')}</p>
                                        <p className="text-sm text-red-700/80 dark:text-red-300/70">
                                            {t('terms_restricted_text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Clause>

                        <Clause number="04" title={t('terms_warranty_title')} delay={0.5} content={
                            <p>{t('terms_warranty_text')}</p>
                        } />

                        <Clause number="05" title={t('terms_liability_title')} delay={0.6} content={
                            <p>{t('terms_liability_text')}</p>
                        } />

                        <Clause number="06" title={t('terms_governing_title')} delay={0.7} content={
                            <p>{t('terms_governing_text')}</p>
                        } />

                    </div>

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 pt-8 border-t border-slate-200/60 dark:border-slate-700/60"
                    >
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 text-center">{t('digital_ack')}</p>
                        <div className="relative group max-w-md mx-auto">
                            <canvas
                                ref={sigCanvasRef}
                                className="w-full h-[100px] bg-white/50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-crosshair touch-none"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                                <span className="text-slate-400/50 dark:text-slate-500/50 text-sm font-mono">{t('draw_to_ack')}</span>
                            </div>
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                                <CheckCircle size={16} /> {t('i_agree')}
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </main>

            <style jsx global>{`
                @keyframes float-gavel {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes spin {
                    from { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
                    to { transform: rotateX(60deg) rotateY(360deg) rotateZ(360deg); }
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    );
}

function Clause({ number, title, delay, content, children, isAlert = false }: any) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.6 }}
            className={`relative pl-8 border-l-2 transition-colors duration-300 ${isAlert ? 'border-red-200 hover:border-red-500 dark:border-red-900/50 dark:hover:border-red-500' : 'border-slate-200 hover:border-indigo-500 dark:border-slate-700 dark:hover:border-indigo-500'}`}
        >
            <div className={`flex items-center gap-3 mb-4`}>
                <span className={`font-bold font-mono ${isAlert ? 'text-red-500' : 'text-indigo-600 dark:text-indigo-400'}`}>{number}</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
            </div>
            {content}
            {children}
        </motion.section>
    );
}
