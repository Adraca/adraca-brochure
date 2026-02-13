"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link"; // Import Link
import { Eye, Clock, Download, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Paper Data
import { whitepapers as papers } from "@/utils/whitepapers";

export default function WhitepaperVault() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const [warpActive, setWarpActive] = useState(false);
    const [bgImage, setBgImage] = useState(papers[0].coverImage);

    const projectorRef = useRef<HTMLDivElement>(null);
    const slabRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- 1. Projector Logic (Tilt & Warp) ---
    const handleProjectorMove = (e: React.MouseEvent) => {
        if (!projectorRef.current || !slabRef.current) return;
        const rect = projectorRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateX = ((y - centerY) / centerY) * -15;

        slabRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleProjectorLeave = () => {
        if (slabRef.current) slabRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    const selectPaper = (index: number) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
        setWarpActive(true);
        setTimeout(() => setBgImage(papers[index].coverImage), 300);
        setTimeout(() => setWarpActive(false), 600);
    };

    // --- 2. Grid Canvas Background ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let offset = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            offset += 0.5;
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            ctx.lineWidth = 1;

            const horizon = height * 0.3;
            const gap = 50;

            for (let x = 0; x <= width; x += gap * 2) {
                ctx.beginPath();
                ctx.moveTo(x, height);
                ctx.lineTo((x - width / 2) * 0.1 + width / 2, horizon);
                ctx.stroke();
            }
            for (let y = horizon; y <= height; y += gap) {
                const yPos = (y + offset) % height;
                if (yPos < horizon) continue;
                ctx.beginPath();
                ctx.moveTo(0, yPos);
                ctx.lineTo(width, yPos);
                ctx.stroke();
            }
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-background text-slate-800 dark:text-slate-200 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative transition-colors duration-500">

            {/* Z-Index 0: Background Canvas */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

            {/* Z-Index 50: Navbar (Forced Top) */}
            <div className="relative z-50">
            </div>

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

                {/* LEFT: Magnetic List */}
                <div className="lg:col-span-5">
                    <div className="mb-12">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 block">{t('repository')}</span>
                        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{t('intelligence_vault')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t('vault_desc')}</p>
                    </div>

                    <div ref={listRef} className="space-y-4">
                        {papers.map((paper, idx) => (
                            <Link key={paper.id} href={`/whitepaper/${paper.id}`} className="block">
                                <div
                                    onClick={() => selectPaper(idx)}
                                    onMouseEnter={() => selectPaper(idx)}
                                    className={`relative p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/80 dark:border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-white dark:hover:bg-slate-900 ${activeIndex === idx ? 'scale-105 shadow-xl bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-500/50 z-10' : 'opacity-80 hover:opacity-100'}`}
                                >
                                    {activeIndex === idx && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-2xl"></div>
                                    )}

                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded text-blue-600 bg-blue-50 dark:bg-opacity-20`}>{paper.category}</span>
                                        <span className="text-slate-400 text-xs font-mono">{paper.id.toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{paper.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">{paper.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Volumetric Projector */}
                <div
                    ref={projectorRef}
                    className={`lg:col-span-7 h-[600px] flex items-center justify-center perspective-1000 ${warpActive ? 'warp-active' : ''}`}
                    onMouseMove={handleProjectorMove}
                    onMouseLeave={handleProjectorLeave}
                >
                    <div ref={slabRef} className="slab-container">

                        {/* Floating Tags */}
                        <div className="absolute -top-6 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-lg" style={{ transform: 'translateZ(80px)' }}>PDF • 24MB</div>
                        <div className="absolute -bottom-6 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-500 shadow-lg" style={{ transform: 'translateZ(80px)' }}>v2.0</div>

                        {/* 3D Layers */}
                        <div className="slab-layer slab-back" />
                        <div className="slab-layer slab-content" style={{ backgroundImage: `url('${bgImage}')` }} />
                        <div className="slab-layer slab-front" />
                        <div className="slab-side side-right" />
                        <div className="slab-side side-left" />
                    </div>

                    {/* Actions - UPDATED: Now links to the dynamic page */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">

                        {/* LINK ADDED HERE */}
                        <Link href={`/whitepaper/${papers[activeIndex].id}`}>
                            <button className="chrome-btn flex items-center gap-2 group">
                                <span>{t('access_document')}</span>
                                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                            </button>
                        </Link>

                        <div className="text-xs text-slate-400 font-mono flex gap-4">
                            <span className="flex items-center gap-1"><Clock size={12} /> {t('read_time')}</span>
                            <span className="flex items-center gap-1"><Eye size={12} /> {t('views_count')}</span>
                        </div>
                    </div>
                </div>

            </main>


        </div>
    );
}