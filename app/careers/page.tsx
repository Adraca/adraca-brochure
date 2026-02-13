"use client";
import { useEffect, useRef, useState } from "react";
import {
    Code2, Rocket, Layers, Terminal, Zap, Brain,
    ArrowRight, Users, GraduationCap, Calendar,
    Cpu, Server, Activity
} from "lucide-react";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import { JOBS } from "@/utils/jobs";

export default function CareersPage() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const terminalRef = useRef<HTMLSpanElement>(null);

    const handleScrollToOpenings = () => {
        const element = document.getElementById('job-openings');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- 1. Data Stream Canvas (Unchanged) ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        const particles: any[] = [];

        class Particle {
            x: number; y: number; speed: number; size: number; angle: number;
            constructor() {
                this.x = Math.random() * width; this.y = Math.random() * height;
                this.speed = Math.random() * 1.5 + 0.5; this.size = Math.random() * 2 + 0.5;
                this.angle = Math.PI / 4;
            }
            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (this.x > width) this.x = 0; if (this.y > height) this.y = 0;
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < 150; i++) particles.push(new Particle());
        };
        init();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; init(); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- 2. Terminal Typewriter (Unchanged) ---
    useEffect(() => {
        const text = "loading perks...\n> 100% remote work\n> modern stack (Rust/Go)\n> equity packages\n> mentorship from founders\n> ready to ship?";
        let i = 0;
        const typeWriter = () => {
            if (!terminalRef.current) return;
            if (i < text.length) {
                let char = text.charAt(i);
                if (char === '\n') char = '<br/>';
                terminalRef.current.innerHTML += char;
                i++;
                setTimeout(typeWriter, 30 + Math.random() * 50);
            }
        };
        setTimeout(typeWriter, 1000);
    }, []);

    // Helper to get translated job title/type
    const getJobDisplay = (job: any) => ({
        title: t(job.listMetadata.titleKey) === job.listMetadata.titleKey ? job.title : t(job.listMetadata.titleKey),
        type: t(job.listMetadata.typeKey),
        tags: job.listMetadata.tags,
        color: job.listMetadata.color,
        slug: job.slug
    });

    const jobs = Object.values(JOBS);
    const internships = jobs.filter(j => j.type === "Internship").map(getJobDisplay);
    const fulltime = jobs.filter(j => j.type === "Full Time").map(getJobDisplay);

    return (
        <div className="min-h-screen bg-background text-slate-800 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 overflow-x-hidden transition-colors duration-500">

            {/* Background Texture (Dot Pattern) */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            </div>

            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />


            {/* Main Layout Container (Borders add structure) */}
            <div className="max-w-6xl mx-auto border-x border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm min-h-screen shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 relative z-10">

                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 px-8 lg:px-16 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left: Text Content */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-100 dark:border-blue-800/50 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> {t('hiring_interns')}
                            </div>

                            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                                {t('dont_just_watch')}<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-slate-500 dark:to-slate-400">{t('architect_the_future')}</span>
                            </h1>

                            <p className="text-base text-slate-500 dark:text-slate-400 max-w-md mb-8 font-medium leading-relaxed">
                                {t('careers_hero_desc')}
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleScrollToOpenings}
                                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold shadow-lg hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-colors flex items-center gap-2 group text-sm"
                                >
                                    {t('view_openings')} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                </button>
                            </div>

                            {/* Hacker Terminal (Compacted) */}
                            <div className="mt-10 bg-slate-900/95 backdrop-blur-md rounded-lg border border-slate-700 shadow-xl max-w-sm w-full overflow-hidden" style={{ transform: 'rotateX(5deg)' }}>
                                <div className="bg-white/5 p-2 flex gap-1.5 border-b border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="p-3 text-xs text-cyan-300 font-mono leading-relaxed h-32">
                                    <span className="text-blue-400">user@adraca:~$</span> cat manifest.txt<br />
                                    <span ref={terminalRef} className="text-slate-300"></span><span className="animate-pulse">_</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: The Tesseract (Scaled Down slightly) */}
                        <div className="flex items-center justify-center order-1 lg:order-2 h-[300px] lg:h-[400px] relative pointer-events-none perspective-container">
                            <div className="tesseract-stage scale-75 lg:scale-90">
                                <div className="cube">
                                    {['f-front', 'f-back', 'f-right', 'f-left', 'f-top', 'f-bottom'].map(face => (
                                        <div key={face} className={`face ${face}`}></div>
                                    ))}
                                </div>
                                <div className="cube-inner">
                                    <div className="face-inner fi-front"><Code2 /></div>
                                    <div className="face-inner fi-back"><Rocket /></div>
                                    <div className="face-inner fi-right"><Layers /></div>
                                    <div className="face-inner fi-left"><Terminal /></div>
                                    <div className="face-inner fi-top"><Zap /></div>
                                    <div className="face-inner fi-bottom"><Brain /></div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500 rounded-full blur-[60px] animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PERKS SECTION */}
                <section className="py-20 px-8 lg:px-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('small_team_giant_impact')}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">{t('why_be_employee')}</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">{t('team_online')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <TiltCard icon={<Users size={20} />} title={t('mentorship')} desc={t('mentorship_desc')} color="blue" />
                        <TiltCard icon={<Zap size={20} />} title={t('real_ownership')} desc={t('real_ownership_desc')} color="cyan" />
                        <TiltCard icon={<Cpu size={20} />} title={t('best_gear')} desc={t('best_gear_desc')} color="purple" />
                        <TiltCard icon={<GraduationCap size={20} />} title={t('learning_budget')} desc={t('learning_budget_desc')} color="emerald" />
                        <TiltCard icon={<Calendar size={20} />} title={t('flexible_schedule')} desc={t('flexible_schedule_desc')} color="orange" />
                        <TiltCard icon={<Rocket size={20} />} title={t('conversion_path')} desc={t('conversion_path_desc')} color="indigo" />
                    </div>
                </section>

                {/* JOBS SECTION */}
                <section id="job-openings" className="py-24 px-8 lg:px-16 bg-slate-50 dark:bg-slate-900/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">{t('open_roles')}</h2>
                        <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-12">{t('open_roles_desc')}</p>

                        <div className="space-y-3">
                            {internships.length > 0 && (
                                <>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest py-2 mt-4">{t('internships')}</div>
                                    {internships.map((job) => (
                                        <JobRow key={job.slug} title={job.title} tags={job.tags} type={job.type} color={job.color} slug={job.slug} />
                                    ))}
                                </>
                            )}

                            {fulltime.length > 0 && (
                                <>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest py-2 mt-8">{t('full_time')}</div>
                                    {fulltime.map((job) => (
                                        <JobRow key={job.slug} title={job.title} tags={job.tags} type={job.type} color={job.color} slug={job.slug} />
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="text-center mt-12">
                            <a href="mailto:contact@adraca.io?subject=Pitching myself for Adraca" className="inline-block text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b-2 border-slate-200 dark:border-slate-800 hover:border-blue-600 pb-0.5">
                                {t('dont_see_role')}
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function TiltCard({ icon, title, desc, color }: any) {
    const colorClasses: any = {
        blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50",
        cyan: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-800/50",
        purple: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/50",
        emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50",
        orange: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/50",
        indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50",
    };

    const handleMove = (e: React.MouseEvent) => {
        const card = e.currentTarget as HTMLDivElement;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const xRot = (0.5 - y) * 10;
        const yRot = (x - 0.5) * 10;
        card.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
    };

    const handleLeave = (e: React.MouseEvent) => {
        (e.currentTarget as HTMLDivElement).style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    return (
        <div className="tilt-card-wrap h-full">
            <div className="tilt-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl h-full shadow-sm hover:shadow-md transition-shadow" onMouseMove={handleMove} onMouseLeave={handleLeave}>
                <div className="tilt-content h-full flex flex-col">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm border ${colorClasses[color]}`}>
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">{desc}</p>
                </div>
            </div>
        </div>
    );
}

// Add import Link if not already present at top of file, but since this is a partial replace, 
// I need to assume Link is imported. Checking file content... yes, Link is imported from "next/link" on line 2. Wait, line 2 is import Link... on original file?
// Use view_file showed: import Link from "next/link"; on line 5. OK.

function JobRow({ title, tags, type, color, slug }: any) {
    const textColors: any = {
        blue: "text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30",
        cyan: "text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900 bg-cyan-50 dark:bg-cyan-900/30",
        emerald: "text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/30"
    };

    return (
        <Link href={`/careers/${slug}`} className="block">
            <div className="job-row flex flex-col md:flex-row items-start md:items-center justify-between p-4 cursor-pointer bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group">
                <div className="relative z-10">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h4>
                    <div className="flex gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {tags.map((tag: string, i: number) => (
                            <span key={i} className="flex items-center gap-1"><Activity size={10} /> {tag}</span>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 mt-3 md:mt-0 flex items-center gap-3">
                    <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wide ${textColors[color]}`}>{type}</span>
                    <ArrowRight className="text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={16} />
                </div>
            </div>
        </Link>
    );
}
