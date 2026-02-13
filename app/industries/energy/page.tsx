"use client";
import React, { useEffect, useRef, useState } from "react";
import { Brain, ArrowRight, Activity, CheckCircle, Zap, Car } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";
import { energyData } from "@/data/industries/energy";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function EnergyPage() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // --- SCROLL DRIVEN CIRCUIT PATH ---
    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    // Parallax Transforms
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // --- Smart Grid Flow Simulation ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const gridSize = 40;
        const electrons: Electron[] = [];
        const numElectrons = 50;

        class Electron {
            x: number; y: number;
            targetX: number; targetY: number;
            speed: number;
            axis: 'x' | 'y';

            constructor() {
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
                this.targetX = this.x;
                this.targetY = this.y;
                this.speed = Math.random() * 2 + 2;
                this.axis = Math.random() > 0.5 ? 'x' : 'y';
                this.setNewTarget();
            }

            setNewTarget() {
                if (Math.random() < 0.05) this.axis = this.axis === 'x' ? 'y' : 'x'; // Change direction occasionally

                const moveDist = (Math.floor(Math.random() * 5) + 2) * gridSize;

                if (this.axis === 'x') {
                    this.targetX = Math.random() > 0.5 ? this.x + moveDist : this.x - moveDist;
                    this.targetY = this.y;
                } else {
                    this.targetX = this.x;
                    this.targetY = Math.random() > 0.5 ? this.y + moveDist : this.y - moveDist;
                }

                // Keep within bounds
                if (this.targetX < 0) this.targetX = 0;
                if (this.targetX > width) this.targetX = width;
                if (this.targetY < 0) this.targetY = 0;
                if (this.targetY > height) this.targetY = height;
            }

            update() {
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.speed) {
                    this.x = this.targetX;
                    this.y = this.targetY;
                    this.setNewTarget();
                } else {
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * this.speed;
                    this.y += Math.sin(angle) * this.speed;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = '#06b6d4'; // Cyan-500
                ctx.fill();

                // Trail
                ctx.beginPath();
                if (Math.abs(this.targetX - this.x) > Math.abs(this.targetY - this.y)) {
                    ctx.moveTo(this.x - (this.targetX > this.x ? 10 : -10), this.y);
                } else {
                    ctx.moveTo(this.x, this.y - (this.targetY > this.y ? 10 : -10));
                }
                ctx.lineTo(this.x, this.y);
                ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
                ctx.stroke();
            }
        }

        for (let i = 0; i < numElectrons; i++) electrons.push(new Electron());

        // Draw Grid Lines (Static Background)
        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;

            ctx.beginPath();
            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x, 0); ctx.lineTo(x, height);
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y); ctx.lineTo(width, y);
            }
            ctx.stroke();
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            drawGrid();

            electrons.forEach(e => {
                e.update();
                e.draw();
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-init electrons on resize if needed or just let them find new targets
        };

        window.addEventListener('resize', handleResize);
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
    }, []);

    // --- 2. Interactive Scan Card ---
    const ScanCard = ({ icon: Icon, title, desc, statLabel, statValue, colorClass, beamColor, id, status, subStatus }: any) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const [isClicked, setIsClicked] = useState(false);

        const handleMouseMove = (e: React.MouseEvent) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const yPct = (y / rect.height) * 100;
            cardRef.current.style.setProperty('--scan-y', `${100 - yPct}%`);
            cardRef.current.classList.add('scanning');
        };

        const handleClick = () => {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 500); // Reset blast
        };

        return (
            <motion.div
                ref={cardRef}
                className="scan-card group relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.classList.remove('scanning');
                }}
                onClick={handleClick}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {isClicked && (
                    <span className="absolute inset-0 z-50 pointer-events-none animate-ping bg-cyan-400/20 rounded-full" />
                )}

                <div className="scan-beam" style={{ background: beamColor, boxShadow: `0 0 20px ${beamColor}` }}></div>

                <div className="scan-content p-8 h-full flex flex-col justify-between relative z-10 bg-white dark:bg-slate-800 transition-opacity duration-300">
                    <div>
                        <div className={`w-14 h-14 rounded-2xl bg-slate-50 ${colorClass} flex items-center justify-center mb-6`}>
                            <Icon size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t(title)}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t(desc)}</p>
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase">{t(statLabel)}</span>
                        <span className="text-lg font-mono font-bold text-slate-800">{statValue}</span>
                    </div>
                </div>

                <div className="scan-layer absolute inset-0 z-20 bg-white/95 backdrop-blur-xl flex flex-col p-8 justify-between opacity-0 pointer-events-none transition-[clip-path] duration-0" style={{ clipPath: 'inset(0 0 100% 0)' }}>
                    <div className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(${beamColor}33 1px, transparent 1px), linear-gradient(90deg, ${beamColor}33 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                    <div className="flex justify-between items-start relative z-30">
                        <span className="font-mono text-xs border px-2 py-1 rounded" style={{ color: beamColor, borderColor: `${beamColor}40` }}>ID: {id}</span>
                        <Activity size={20} className="animate-pulse" style={{ color: beamColor }} />
                    </div>
                    <div className="space-y-4 relative z-30">
                        <div>
                            <p className="text-xs text-slate-400 uppercase mb-1">Status</p>
                            <div className="w-full h-1 bg-slate-800 rounded">
                                <div className="h-full w-[85%]" style={{ background: beamColor }}></div>
                            </div>
                            <p className="text-xs text-right mt-1 font-bold" style={{ color: beamColor }}>{t(status)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase mb-1">Prediction</p>
                            <p className="text-sm text-slate-900 font-mono font-bold">{t(subStatus)}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div ref={containerRef} className="energy-page min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-cyan-100 dark:selection:bg-cyan-900 selection:text-cyan-900 dark:selection:text-cyan-100 relative transition-colors duration-500">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
                .energy-page { font-family: 'Outfit', sans-serif; }
                .mono { font-family: 'JetBrains Mono', monospace; }
                .scan-card.scanning .scan-layer { opacity: 1; clip-path: inset(0 0 var(--scan-y) 0) !important; }
                .scan-card.scanning .scan-beam { opacity: 1; top: calc(100% - var(--scan-y)); }
                .scan-beam { position: absolute; left: 0; right: 0; height: 4px; z-index: 30; opacity: 0; pointer-events: none; }
            `}</style>

            {/* --- VISIBLE CIRCUIT PATH (Background Visual) --- */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden hidden md:block">
                <svg className="w-full h-full absolute top-0 left-0" preserveAspectRatio="none" viewBox="0 0 100 400">
                    <defs>
                        <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Background Trace */}
                    <path
                        d="M50,40 C 50,100 20,120 20,160 C 20,200 50,220 50,260 C 50,300 80,320 80,360 L 80,400"
                        fill="transparent"
                        stroke="#cbd5e1"
                        strokeWidth="0.2"
                        strokeDasharray="1 1"
                        className="opacity-30"
                    />

                    {/* Active Trace (Glow) */}
                    <motion.path
                        d="M50,40 C 50,100 20,120 20,160 C 20,200 50,220 50,260 C 50,300 80,320 80,360 L 80,400"
                        fill="transparent"
                        stroke="url(#circuit-grad)"
                        strokeWidth="2"
                        style={{ pathLength }}
                        strokeLinecap="round"
                    />
                </svg>
            </div>



            <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

            {/* HERO */}
            <section className="relative pt-40 pb-20 min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute top-24 left-0 w-full z-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'Energy', href: '/industries/energy' }]} />
                    </div>
                </div>
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white text-cyan-600 text-xs font-bold uppercase tracking-widest mb-10 shadow-sm backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                            {t(energyData.hero.badge)}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[0.95] tracking-tighter"
                        >
                            {t(energyData.hero.headline)}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-light"
                        >
                            {t(energyData.hero.subhead)}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link href="/contact?subject=Energy_Grid_Audit" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-3">
                                <span>{t(energyData.hero.cta_primary)}</span>
                                <ArrowRight size={18} />
                            </Link>
                            <button className="px-8 py-4 bg-white/50 border border-white text-slate-700 rounded-2xl font-bold hover:bg-white transition-colors backdrop-blur-md">
                                {t(energyData.hero.cta_secondary)}
                            </button>
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative w-[400px] h-[400px] preserve-3d animate-[float_6s_ease-in-out_infinite]">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-white/10 backdrop-blur-md shadow-[0_0_60px_rgba(6,182,212,0.4)] flex items-center justify-center transform translate-z-50">
                                <Brain size={64} className="text-cyan-500 opacity-50" />
                            </div>
                            <div className="absolute inset-[-20%] rounded-full border border-cyan-400/30 animate-[spin_10s_linear_infinite]" style={{ transform: 'rotateX(70deg) rotateY(20deg)' }}></div>
                            <div className="absolute inset-[-20%] rounded-full border border-blue-400/30 animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'rotateX(70deg) rotateY(-20deg)' }}></div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* SECTION: GRID INFRASTRUCTURE */}
            <section className="py-20 relative overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-y border-slate-200 dark:border-slate-700">
                <div className="absolute inset-0 bg-[url('/images/energy/Whisk_33b517d6c2f4630be1542e96f457f32cdr.jpeg')] bg-cover bg-center opacity-5 fixed-bg"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <span className="text-cyan-600 font-bold tracking-widest uppercase text-xs mb-4 block">Infrastructure</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Grid 2.0 Physical Layer</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            Deploying the sensor fabric for the next century. Our hardware-agnostic ingestion layer connects
                            legacy SCADA systems with modern IoT arrays, creating a high-fidelity digital twin of your entire innovative grid.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                        className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group bg-white"
                    >
                        <Image
                            src="/images/energy/Whisk_a9df00c51962adda8714849f065e55dfdr.jpeg"
                            alt="Grid Infrastructure"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex items-end p-8">
                            <div className="w-full">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-xl font-bold text-white">Substation Alpha</h3>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-4 bg-cyan-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
                                    </div>
                                </div>
                                <p className="text-cyan-300 font-mono text-sm border-t border-white/20 pt-2 flex justify-between">
                                    <span>Status: Online</span>
                                    <span>50Hz // Stable</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION: HARD ENGINEERING */}
            <section id="models" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                        className="flex justify-between items-end mb-20"
                    >
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">{t('energy_models_title')}</h2>
                            <p className="text-slate-500 max-w-xl">{t('energy_models_desc')}</p>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {energyData.solutions.map((sol) => (
                            <ScanCard key={sol.id} {...sol} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION: ENERGY STACK */}
            <section id="capabilities" className="py-32 bg-white/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-700">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4 block">The Energy Stack</span>
                        <h2 className="text-4xl font-bold text-slate-900 mb-8">{t(energyData.capabilities.title)}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {energyData.capabilities.items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-cyan-300 transition-colors cursor-crosshair group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-cyan-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"></div>
                                <div className="p-3 bg-cyan-50 rounded-lg text-cyan-600 group-hover:bg-white group-hover:text-cyan-600 transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 text-lg leading-relaxed">{t(item.text)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


        </div >
    );
}
