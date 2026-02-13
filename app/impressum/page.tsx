"use client";
import { useEffect, useRef, useState } from "react";
import { Scale, Building, User, Mail, Phone, FileText, PenTool, ArrowLeft, Globe, Shield } from "lucide-react";
import Link from "next/link";
import { delay, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// --- HELPERS ---

// 1. Text Decoding Helper
const useDecodeText = (text: string, trigger: boolean) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    useEffect(() => {
        if (!trigger) return;
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((char, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text, trigger]);

    return display;
};

// 2. Magnetic Button Helper
const MagneticWrap = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = "translate(0, 0)";
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="inline-block transition-transform duration-200 ease-out"
        >
            {children}
        </div>
    );
};

export default function Impressum() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- Neural Canvas Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        const nodes: any[] = [];
        const mouse = { x: -1000, y: -1000 };

        class Node {
            x: number; y: number; vx: number; vy: number; size: number;
            constructor() {
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
                ctx.fillStyle = document.documentElement.classList.contains("dark") ? "#475569" : "#cbd5e1";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) nodes.push(new Node());

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = document.documentElement.classList.contains("dark")
                ? 'rgba(96, 165, 250, 0.15)' // Blue-400 (Dark)
                : 'rgba(99, 102, 241, 0.15)'; // Indigo (Light)
            ctx.lineWidth = 1;

            nodes.forEach(node => {
                node.update();
                node.draw();
                const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
                if (dist < 250) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
        const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // --- 3D Tilt Logic ---
    const handleStageMove = (e: React.MouseEvent) => {
        if (!cardRef.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Sheen
        const cardRect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty('--x', `${x - cardRect.left}px`);
        cardRef.current.style.setProperty('--y', `${y - cardRect.top}px`);
    };

    const handleStageLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 perspective-1500 overflow-hidden relative bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />

            {/* Container for Tilt Context */}
            <div
                ref={containerRef}
                className="w-full max-w-2xl relative z-10 perspective-1500"
                onMouseMove={handleStageMove}
                onMouseLeave={handleStageLeave}
            >
                <motion.main
                    ref={cardRef}
                    initial={{ opacity: 0, y: 50, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-card p-10 md:p-16 bg-white/65 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 rounded-[2rem] shadow-2xl relative overflow-hidden transition-transform duration-100 ease-linear"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Dynamic Sheen Overlay (Pseudo-element handled via CSS/Style) */}
                    <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.8)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,130,246,0.2)_0%,transparent_60%)] opacity-0 hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay z-10" />

                    {/* NEW HERO SECTION: Engineering Digital Sovereignty */}
                    <header className="text-center mb-14 pb-8 relative z-20">
                        {/* 1. Main Mission Statement */}
                        <div className="mb-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg mb-6 text-3xl animate-pulse">
                                <Shield size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl mb-6 font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {t('mission_headline')}
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
                                {t('mission_subhead')}
                            </p>

                            {/* About Block */}
                            <div className="max-w-lg mx-auto bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-left relative overflow-hidden shadow-sm">
                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed pl-2">
                                    {t('mission_about')}
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-12"></div>

                        {/* 2. Impressum Header (Preserved Legal Section) */}
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center justify-center gap-3">
                                <Scale size={20} />
                                {t('comp_impressum_header')}
                            </h2>
                            <div className="mt-4 inline-block px-4 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                Information according to § 5 TMG
                            </div>
                        </div>
                    </header>

                    {/* Content Grid */}
                    <div className="space-y-10 relative z-20">

                        {/* Company */}
                        <Section delay={0.1} icon={<Building size={14} />} label="OPERATED BY">
                            <div className="group pl-6 border-l-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-blue-500 transition-colors duration-300">
                                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 block mb-1">Adraca AI Pvt. Ltd.</span>
                                <span className="text-xs font-bold text-indigo-500 dark:text-blue-400 uppercase tracking-wide block mb-2">Global R&D & APAC HQ</span>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Plot 39, Line No 2, Kasturba Nagar<br />
                                    Nagpur - 440014, Maharashtra<br />
                                    India
                                </p>
                            </div>
                        </Section>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Representation */}
                            <Section delay={0.2} icon={<User size={14} />} label="REPRESENTED BY">
                                <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-blue-500 transition-colors duration-300">
                                    <div className="mb-4">
                                        <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 block">Deepti A. Khaparde</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Founder & CEO</span>
                                    </div>
                                    <div>
                                        <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 block">Vaishali K.</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Chief Technology Officer</span>
                                    </div>
                                </div>
                            </Section>

                            {/* Contact */}
                            <Section delay={0.3} icon={<Phone size={14} />} label="CONTACT">
                                <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-blue-500 transition-colors duration-300 flex flex-col items-start gap-1">

                                    {/* EU Office */}
                                    <div className="mb-2">
                                        <span className="text-xs font-semibold text-slate-400 uppercase block mb-0.5">EU Representative (DE)</span>
                                        <MagneticWrap>
                                            <a href="tel:+491637235019" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-indigo-600 dark:hover:text-blue-400 transition-colors relative group/link">
                                                +49 163 7235019
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover/link:w-full"></span>
                                            </a>
                                        </MagneticWrap>
                                    </div>

                                    {/* R&D HQ */}
                                    <div className="mb-2">
                                        <span className="text-xs font-semibold text-slate-400 uppercase block mb-0.5">R&D HQ (IN)</span>
                                        <MagneticWrap>
                                            <a href="tel:+917972240757" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-indigo-600 dark:hover:text-blue-400 transition-colors relative group/link">
                                                +91 79722 40757
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover/link:w-full"></span>
                                            </a>
                                        </MagneticWrap>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <span className="text-xs font-semibold text-slate-400 uppercase block mb-0.5">Email</span>
                                        <MagneticWrap>
                                            <a href="mailto:contact@adraca.io" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-indigo-600 dark:hover:text-blue-400 transition-colors relative group/link">
                                                contact@adraca.io
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover/link:w-full"></span>
                                            </a>
                                        </MagneticWrap>
                                    </div>
                                </div>
                            </Section>
                        </div>

                        {/* Registration */}
                        <Section delay={0.4} icon={<FileText size={14} />} label="REGISTRATION">
                            <div className="bg-white/60 dark:bg-slate-800/60 p-5 rounded-2xl border border-white dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Registered in <strong className="text-slate-800 dark:text-slate-200">Companies Register of India</strong></p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase">CIN</span>
                                    <span className="font-mono text-indigo-600 dark:text-blue-400 bg-indigo-50 dark:bg-blue-900/30 px-3 py-1 rounded-md text-sm font-bold select-all">U62013MH2024PTC432539</span>
                                </div>
                            </div>
                        </Section>

                        {/* EU Dispute Resolution */}
                        <Section delay={0.5} icon={<Globe size={14} />} label="EU DISPUTE RESOLUTION">
                            <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-blue-500 transition-colors duration-300">
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-2">
                                    The European Commission provides a platform for online dispute resolution (ODR):
                                </p>
                                <MagneticWrap>
                                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-indigo-600 dark:hover:text-blue-400 transition-colors relative group/link">
                                        https://ec.europa.eu/consumers/odr/
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover/link:w-full"></span>
                                    </a>
                                </MagneticWrap>
                            </div>
                        </Section>

                    </div>

                </motion.main>
            </div>
        </div>
    );
}

function Section({ children, delay, icon, label }: { children: React.ReactNode, delay: number, icon: React.ReactNode, label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.8, ease: "easeOut" }}
        >
            <div className="flex items-center gap-2 text-[0.7rem] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em] mb-2">
                <span className="text-indigo-500 dark:text-blue-500">{icon}</span> {label}
            </div>
            {children}
        </motion.div>
    );
}

