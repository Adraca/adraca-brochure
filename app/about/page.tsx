"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown, Lightbulb, Globe, Cpu, Rocket, Box, Eye, Leaf, Target, Layers, Radio, Quote, Linkedin } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollStage, setScrollStage] = useState(0);
    const [historyIndex, setHistoryIndex] = useState(0);

    // --- 1. Blueprint Canvas Logic (Unchanged) ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        const points: any[] = [];
        const mouse = { x: -1000, y: -1000 };

        class Point {
            x: number; y: number; ox: number; oy: number; vx: number; vy: number;
            constructor(x: number, y: number) {
                this.x = x; this.y = y; this.ox = x; this.oy = y; this.vx = 0; this.vy = 0;
            }
            update() {
                const dx = this.ox - this.x;
                const dy = this.oy - this.y;
                this.vx += dx * 0.05; this.vy += dy * 0.05;
                const mdx = mouse.x - this.x;
                const mdy = mouse.y - this.y;
                const dist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    const angle = Math.atan2(mdy, mdx);
                    this.vx -= Math.cos(angle) * force * 5;
                    this.vy -= Math.sin(angle) * force * 5;
                }
                this.vx *= 0.9; this.vy *= 0.9;
                this.x += this.vx; this.y += this.vy;
            }
        }

        const init = () => {
            points.length = 0;
            const gap = 60;
            for (let x = 0; x <= width; x += gap) {
                for (let y = 0; y <= height; y += gap) {
                    points.push(new Point(x, y));
                }
            }
        };
        init();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            points.forEach(p => {
                p.update();
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            });
            ctx.fill();
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; init(); };
        const handleMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouse);
        return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouse); };
    }, []);

    // --- 2. Scroll Spy (Unchanged) ---
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.scroll-observer');
            let current = 0;
            if (window.scrollY < window.innerHeight / 2) current = 0;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                    current = index + 1;
                }
            });
            setScrollStage(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- 3. Reveal Animation (Unchanged) ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const historyEvents = [
        { year: "2020", title: t('hist_2020_title'), desc: t('hist_2020_desc'), icon: <Lightbulb size={24} /> },
        { year: "2022", title: t('hist_2022_title'), desc: t('hist_2022_desc'), icon: <Globe size={24} /> },
        { year: "2024", title: t('hist_2024_title'), desc: t('hist_2024_desc'), icon: <Cpu size={24} /> },
        { year: "2025", title: t('hist_2025_title'), desc: t('hist_2025_desc'), icon: <Rocket size={24} /> },
    ];

    return (
        <div className={`min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 selection:bg-blue-100 selection:text-blue-900 stage-${scrollStage}`}>

            <div className="artifact-container">
                <div className="artifact"></div>
            </div>

            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0" />

            {/* Hero Header without duplicate Navbar. The Navbar is in Layout. */}

            {/* --- UPGRADED HERO: The Master Plan --- */}
            <section className="min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden pt-24 pb-12 z-10">

                {/* 1. Header Block */}
                <div className="max-w-6xl mx-auto px-6 w-full text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur border border-white/50 dark:border-white/10 mb-6 reveal-up shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{t('est_2020')}</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[0.9] reveal-up delay-100 tracking-tight">
                        {t('building_tomorrows_core')}
                    </h1>
                </div>

                {/* 2. The Manifesto Grid (Fills the empty space) */}
                <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-3 gap-6 reveal-up delay-200">

                    {/* Pillar 1: Mission */}
                    <div className="glass-panel p-8 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('our_north_star')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {t('north_star_desc')}
                        </p>
                    </div>

                    {/* Pillar 2: Architecture */}
                    <div className="glass-panel p-8 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 hover:-translate-y-2 transition-transform duration-500 delay-100">
                        <div className="w-12 h-12 rounded-lg bg-cyan-50 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('the_architecture')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {t('architecture_desc')}
                        </p>
                    </div>

                    {/* Pillar 3: Status */}
                    <div className="glass-panel p-8 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 hover:-translate-y-2 transition-transform duration-500 delay-200">
                        <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                            <Radio size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('operational_status')}</h3>
                        <div className="space-y-3 mt-2">
                            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                <span>{t('nodes_active')}</span>
                                <span className="text-slate-900 dark:text-white">8,402</span>
                            </div>
                            <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[85%]"></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                                <span>{t('uptime')}</span>
                                <span className="text-slate-900 dark:text-white">99.99%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[99%]"></div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Scroll Indicator (Pushed down) */}
                <div className="mt-12 flex flex-col items-center gap-2 reveal-up delay-300 opacity-60">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{t('history_below')}</span>
                    <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"></div>
                </div>
            </section>

            {/* SECTION 1: OUR FOUNDATION (The Rising Skyline) */}
            <section className="py-20 relative scroll-observer z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 reveal-up">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{t('our_foundation')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            {t('foundation_desc')}
                        </p>
                    </div>

                    {/* The Growth Skyline Grid */}
                    <div className="grid md:grid-cols-4 gap-6 items-end h-auto md:h-[420px]">
                        {historyEvents.map((event, index) => {
                            // Light Mode, High-End Glass Gradients
                            const gradients = [
                                "from-blue-50 via-blue-100 to-white dark:from-blue-900/50 dark:via-blue-800/20 dark:to-slate-900",             // 2020 - Solid Foundation
                                "from-cyan-50 via-cyan-100 to-white dark:from-cyan-900/50 dark:via-cyan-800/20 dark:to-slate-900",             // 2022 - Clean Scale
                                "from-teal-50 via-teal-100 to-white dark:from-teal-900/50 dark:via-teal-800/20 dark:to-slate-900",             // 2024 - Fresh Tech
                                "from-fuchsia-50 via-fuchsia-100 to-white dark:from-fuchsia-900/50 dark:via-fuchsia-800/20 dark:to-slate-900"        // 2025 - Bright Future
                            ];

                            return (
                                <div
                                    key={index}
                                    className="group relative w-full backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-t-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-all duration-700 ease-out hover:-translate-y-2 overflow-hidden"
                                    style={{
                                        height: `${(index + 1) * 20 + 35}%`,
                                        transitionDelay: `${index * 100}ms`
                                    }}
                                >
                                    {/* 1. The Gradient Body (Lighter & Vibrant) */}
                                    <div className={`absolute inset-0 bg-gradient-to-b ${gradients[index]} opacity-85`}></div>

                                    {/* 2. Animated Shimmer Overlay */}
                                    <div className="absolute inset-0 -translate-y-full animate-[shimmer_3s_infinite] bg-gradient-to-t from-transparent via-white/30 to-transparent pointer-events-none"></div>

                                    {/* 3. Content Container */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">

                                        {/* Floating Big Year (Dark & Prominent) */}
                                        <div className="text-6xl font-black text-slate-900/10 dark:text-white/10 absolute top-4 right-4 z-0 group-hover:scale-110 transition-transform duration-700 select-none">
                                            {event.year}
                                        </div>

                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 shadow-sm ring-1 ring-slate-200 dark:ring-white/10 group-hover:scale-110 transition-transform">
                                                {event.icon}
                                            </div>

                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="h-[2px] w-4 bg-slate-400 rounded-full"></div>
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider">EST. {event.year}</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight drop-shadow-none">{event.title}</h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                {event.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Top Edge Highlight - "Clean Lip" */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 2: TEAM */}
            <section className="py-24 relative scroll-observer z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 reveal-up">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 block">{t('our_architects')}</span>
                        <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">{t('meet_the_builders')}</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
                        <XRayCard
                            name="Dipti A. Khaparde"
                            role="Founder & CEO"
                            stat="100%"
                            statLabel="Vision Execution"
                            specialty="Scientific Computing & Industrial Processes"
                            img="/images/team/founder.jpg"
                            imageStyle={{ backgroundSize: '135%', backgroundPosition: 'center 20%' }}
                            bio="Expert in Chemical Engineering and complex process simulation. Dipti leads the translation of physical industrial constraints into digital twin architectures."
                            linkedin="https://www.linkedin.com/"
                        />
                        <XRayCard
                            name="Vaishali Aathavale"
                            role="Founder"
                            stat="12+"
                            statLabel="Years of Experience"
                            specialty="High-Performance Computing"
                            img="/images/team/vaishali.jpg"
                            imageStyle={{ backgroundSize: '135%', backgroundPosition: 'center 20%' }}
                            bio="Leading HPC strategies and patent-pending innovations in distributed computing architectures."
                            linkedin="https://www.linkedin.com/"
                        />
                        <XRayCard
                            name="Abhishek K."
                            role="CTO"
                            stat="Ph.D."
                            statLabel="Candidate (IITK)"
                            specialty="Sovereign Data Infrastructures"
                            img="/images/team/abhishek.jpg"
                            imageStyle={{ backgroundSize: '135%', backgroundPosition: 'center 20%' }}
                            bio="Senior Architect aligning technical stacks with EU Data Act & DORA mandates. Architects the 'Third Way' of digital sovereignty."
                            linkedin="https://www.linkedin.com/in/abhishek-k-172285358/"
                        />
                    </div>

                    {/* Founders' Statement */}
                    <div className="max-w-4xl mx-auto text-center reveal-up">
                        <div className="relative p-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/60 dark:border-white/10 shadow-xl">
                            <Quote size={48} className="text-blue-200 dark:text-blue-900 absolute top-6 left-6 -z-10" />
                            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 italic font-light leading-relaxed mb-6">
                                "{t('founders_quote')}"
                            </p>
                            <div className="flex justify-center gap-4 items-center">
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-slate-900 dark:text-white">Dipti A. Khaparde</span>
                                    <span className="block text-xs text-slate-500 dark:text-slate-400">Founder & CEO</span>
                                </div>
                                <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-slate-900 dark:text-white">Vaishali K.</span>
                                    <span className="block text-xs text-slate-500 dark:text-slate-400">CTO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: VALUES */}
            <section className="py-24 relative scroll-observer z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-20 text-center reveal-up">{t('principles_of_design')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Monolith icon={<Box size={32} />} title={t('modular')} desc={t('modular_desc')} color="blue" />
                        <Monolith icon={<Eye size={32} />} title={t('transparent')} desc={t('transparent_desc')} color="purple" delay="100ms" />
                        <Monolith icon={<Leaf size={32} />} title={t('sustainable')} desc={t('sustainable_desc')} color="emerald" delay="200ms" />
                    </div>
                </div>
            </section>

        </div>
    );
}

// --- SUB-COMPONENTS (Unchanged) ---
function XRayCard({ name, role, stat, statLabel, specialty, img, imageStyle, bio, linkedin }: any) {
    const handleMouseMove = (e: React.MouseEvent) => {
        const card = e.currentTarget as HTMLDivElement;
        const rect = card.getBoundingClientRect();
        const layer = card.querySelector('.xray-layer') as HTMLDivElement;
        if (layer) {
            layer.style.setProperty('--x', `${e.clientX - rect.left}px`);
            layer.style.setProperty('--y', `${e.clientY - rect.top}px`);
        }
    };
    return (
        <div className="xray-card group reveal-up relative h-[450px] w-full" onMouseMove={handleMouseMove}>
            <div className="absolute inset-0 bg-cover bg-center transition-opacity" style={{ backgroundImage: `url('${img}')`, ...imageStyle }}></div>
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

            <div className="absolute bottom-6 left-6 z-20 group-hover:opacity-0 transition-opacity duration-300">
                <h4 className="text-xl font-bold text-white drop-shadow-md">{name}</h4>
                <p className="text-white/80 font-mono text-xs">{role}</p>
            </div>

            <div className="xray-layer z-30 pointer-events-none group-hover:pointer-events-auto">
                <div className="border border-blue-500/50 p-6 rounded-lg text-center backdrop-blur-md bg-slate-950/90 h-full flex flex-col justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <div className="text-3xl font-bold text-white mb-1">{stat}</div>
                    <div className="text-[10px] uppercase tracking-widest text-blue-300 mb-4">{statLabel}</div>
                    <div className="h-px w-full bg-blue-500/30 my-3"></div>
                    <p className="text-[10px] uppercase tracking-wide text-blue-400 mb-2">Specialty</p>
                    <p className="text-xs text-slate-300 mb-4 font-medium leading-snug">{specialty}</p>
                    {bio && <p className="text-xs text-slate-400 italic leading-relaxed border-t border-slate-800 pt-3">{bio}</p>}

                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 mx-auto inline-flex items-center justify-center p-2 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all pointer-events-auto">
                            <Linkedin size={16} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

function Monolith({ icon, title, desc, color, delay }: any) {
    const colorClasses: any = {
        blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        purple: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
        emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
    };
    return (
        <div className="group relative h-[300px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[100px] flex flex-col justify-center items-center text-center p-8 overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-2xl reveal-up" style={{ transitionDelay: delay }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent dark:from-slate-800 dark:to-transparent transform translate-y-full transition-transform duration-500 group-hover:translate-y-0 -z-10"></div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colorClasses[color]}`}>{icon}</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
