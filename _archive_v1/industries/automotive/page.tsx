"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Share2, Shield, Activity, Database, Zap, Cpu, Scan, Monitor, Gauge } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/context/LanguageContext";
import { automotiveData } from "@/data/industries/automotive";
import Link from "next/link";


function NeuralSupplyChain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const nodes: Node[] = [];
        const maxNodes = 60;
        const connectionDistance = 150;

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
            }
            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx!.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Blue-500
                ctx!.fill();
            }
        }

        for (let i = 0; i < maxNodes; i++) nodes.push(new Node());

        function animate() {
            ctx!.clearRect(0, 0, width, height);

            nodes.forEach(node => {
                node.update();
                node.draw();

                nodes.forEach(otherNode => {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx!.beginPath();
                        ctx!.moveTo(node.x, node.y);
                        ctx!.lineTo(otherNode.x, otherNode.y);
                        ctx!.strokeStyle = `rgba(59, 130, 246, ${1 - distance / connectionDistance})`;
                        ctx!.stroke();
                    }
                });
            });
            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
}


function GlossyCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={`relative overflow-hidden rounded-3xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl ${className}`}
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(255, 255, 255, 0.8),
                          transparent 80%
                        )
                      `,
                }}
            />
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-overlay"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          350px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.4),
                          transparent 80%
                        )
                      `,
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

export default function AutomotivePage() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div ref={containerRef} className="auto-page min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-cyan-100 dark:selection:bg-cyan-900 selection:text-cyan-900 dark:selection:text-cyan-100 relative transition-colors duration-500">


            <NeuralSupplyChain />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-32 min-h-screen flex flex-col justify-center overflow-hidden perspective-1000">
                {/* Ambient Glows */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-300/30 to-purple-300/30 blur-[150px] rounded-full pointer-events-none mix-blend-multiply animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-t from-cyan-300/30 to-emerald-300/30 blur-[150px] rounded-full pointer-events-none mix-blend-multiply animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div style={{ y: yHero, scale: scaleHero, opacity: opacityHero }} className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring" }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 backdrop-blur-md shadow-lg"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">CATENA-X CERTIFIED</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
                            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 drop-shadow-sm">
                                THE SOVEREIGN
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 drop-shadow-lg text-glow pb-2">
                                NERVOUS SYSTEM
                            </span>
                            <br />
                            <span className="text-stroke-light text-transparent stroke-slate-400 opacity-50">
                                FOR AUTOMOTIVE
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium"
                        >
                            {t(automotiveData.hero.subhead)}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link href="/contact?subject=Automotive_Catena-X_Audit" className="relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden group shadow-2xl hover:shadow-[0_0_40px_rgba(15,23,42,0.4)] transition-all">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center gap-3">
                                    {t(automotiveData.hero.cta_primary)} <ArrowRight />
                                </span>
                            </Link>
                            <Link href="/platform" className="px-8 py-4 bg-white/50 border border-slate-300 text-slate-700 rounded-2xl font-bold backdrop-blur-md shadow-lg hover:bg-white transition-all flex items-center justify-center">
                                {t(automotiveData.hero.cta_secondary)}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* HERO VISUAL: 3D Floated Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20, rotateY: -20, scale: 0.8 }}
                        animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                        className="relative h-[600px] w-full perspective-2000"
                    >
                        <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-[1.02] hover:rotate-y-2">
                            {/* Main Dashboard Card */}
                            <div className="absolute inset-4 rounded-[2rem] overflow-hidden border border-white/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] bg-white/20 backdrop-blur-md z-20">
                                <Image
                                    src="/images/automotive/catena_dashboard.jpg"
                                    alt="Catena-X Dashboard"
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 mix-blend-overlay"></div>

                                {/* Scanning Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-[20%]"
                                    animate={{ top: ['-20%', '120%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            {/* Floating Stats Cards */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-8 top-20 p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-xl z-30 w-64"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600"><Activity size={20} /></div>
                                    <div className="text-sm font-bold text-slate-500">FLEET UPTIME</div>
                                </div>
                                <div className="text-4xl font-black text-slate-900">99.98%</div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[99.98%] shadow-[0_0_10px_#10b981]"></div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -right-4 bottom-32 p-6 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-2xl z-30 w-64 text-white"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><Database size={20} /></div>
                                    <div className="text-sm font-bold text-slate-400">DATA VOLUME</div>
                                </div>
                                <div className="text-4xl font-black">450 TB</div>
                                <div className="text-xs text-slate-500 mt-2 font-mono">ENCRYPTED • SHARDED</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SOLUTIONS: GLOSSY CARDS */}
            <section className="py-32 relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <h2 className="text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
                            HARD ENGINEERING
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto shadow-lg"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {automotiveData.solutions.map((sol, i) => (
                            <div key={sol.id} className="group">
                                <GlossyCard className="h-full p-8 flex flex-col justify-between bg-white/80 border-slate-200 shadow-xl hover:shadow-2xl transition-all">
                                    <div>
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm bg-slate-50 border border-slate-100`}>
                                            <sol.icon size={32} className="text-slate-600 group-hover:text-blue-500 transition-colors duration-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">{t(sol.title)}</h3>
                                        <p className="text-slate-600 leading-relaxed text-lg mb-8">
                                            {t(sol.desc)}
                                        </p>
                                    </div>
                                    <div className="flex items-end justify-between pt-8 border-t border-slate-100">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{t(sol.statLabel)}</div>
                                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 group-hover:from-blue-600 group-hover:to-cyan-500 transition-all">
                                                {sol.statValue}
                                            </div>
                                        </div>
                                        <div className="p-2 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-400 group-hover:text-white transition-all duration-300">
                                            <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </GlossyCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES: THE STACK */}
            <section className="py-40 relative overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-multiply"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>

                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative h-[600px] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl bg-white">
                            <Image
                                src="/images/automotive/sdv_telemetry.jpg"
                                alt="SDV Telemetry"
                                fill
                                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-full border border-white/50 flex items-center justify-center bg-white/50 backdrop-blur-md shadow-sm">
                                        <Cpu className="text-blue-600" />
                                    </div>
                                    <div className="text-blue-600 font-mono text-sm tracking-widest font-bold">SYSTEM ACTIVE</div>
                                </div>
                                <h3 className="text-4xl font-bold mb-2 text-slate-900">VSS Telemetry</h3>
                                <p className="text-slate-600">Capturing 500+ signals per second per vehicle.</p>
                            </div>
                        </div>
                    </motion.div>

                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black mb-16 leading-tight text-slate-900"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
                                MOBILITY
                            </span>
                            <br />
                            STACK.
                        </motion.h2>

                        <div className="grid gap-6">
                            {automotiveData.capabilities.items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
                                >
                                    <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <item.icon size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t(item.text)}</h4>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-0 transition-all">
                                        <ArrowRight className="text-blue-600" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
