"use client";
import { useEffect, useRef, useState } from "react";
import { Brain, Zap, Shield, Layers, Eye, Database, Cpu, Activity, Lock, Globe } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function CapabilitiesPage() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);

    // --- 1. Ferrofluid Canvas ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        const particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number; y: number; vx: number; vy: number; size: number;
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 300) {
                    this.vx += dx * 0.002;
                    this.vy += dy * 0.002;
                }
                this.vx *= 0.95; this.vy *= 0.95;
                this.x += this.vx; this.y += this.vy;

                if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(1, 100 / Math.max(1, Math.abs(this.vx * 20)))})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < 100; i++) particles.push(new Particle());
        };
        init();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; init(); };
        const handleMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouse);
        return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouse); };
    }, []);

    // --- 2. Kinetic Core Tilt ---
    const handleCoreMove = (e: React.MouseEvent) => {
        if (!coreRef.current) return;
        const rect = coreRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const core = document.getElementById('kinetic-core');
        if (core) {
            core.style.transform = `rotateY(${x * 40}deg) rotateX(${-y * 40}deg)`;
        }
    };

    return (
        <div className="min-h-screen bg-background text-slate-800 dark:text-slate-200 selection:bg-cyan-100 selection:text-cyan-900 overflow-x-hidden">

            <div className="scanner-line"></div>
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60 z-0" />


            {/* HERO: Kinetic Core */}
            <section className="relative pt-40 pb-20 min-h-screen flex items-center overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Info */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 border border-white dark:border-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-10 shadow-sm backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            {t('ops_efficiency')}
                        </div>

                        <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[0.95] tracking-tight">
                            {t('arch_possibility')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500">{t('of_possibility')}</span>
                        </h1>

                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mb-12 leading-relaxed font-light">
                            {t('cap_hero_desc')}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl hover:bg-blue-600 dark:hover:bg-blue-300 transition-colors flex items-center gap-2">
                                {t('inspect_engine')} <Cpu size={20} />
                            </button>
                            <button className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                                {t('inspect_kernel_source')} <Database size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right: 3D Core */}
                    <div
                        ref={coreRef}
                        className="flex items-center justify-center perspective-1000 h-[600px]"
                        onMouseMove={handleCoreMove}
                        onMouseLeave={() => { const c = document.getElementById('kinetic-core'); if (c) c.style.transform = 'rotateY(0deg) rotateX(0deg)'; }}
                    >
                        <div className="core-stage" id="kinetic-core">
                            <div className="core-ring core-ring-1"></div>
                            <div className="core-ring core-ring-2"></div>
                            <div className="core-ring core-ring-3"></div>
                            <div className="core-ring core-ring-4"></div>

                            <div className="absolute top-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-lg text-xs font-mono text-slate-500 dark:text-slate-400 shadow-lg animate-pulse">
                                CPU: 12% <br /> MEM: 4GB
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION: CAPABILITIES (Exploded Blueprint Grid) */}
            <section id="capabilities" className="py-32 bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-24">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">{t('functional_modules')}</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl">{t('hover_capability')}</p>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{t('sys_config_loaded')}</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">

                        {/* Card 1: Secure Enclaves */}
                        <BlueprintCard
                            title={t('tech_card_1_title')}
                            desc={t('tech_card_1_desc')}
                            version={t('tech_card_1_subtitle')}
                            icon={<Lock size={32} />}
                            wireIcon={<Lock size={48} />}
                            code={`fn decrypt_in_enclave(blob: &EncryptedData) -> Result<Tensor> {\n    // Hardware-level isolation\n    let key = tpm.get_attestation_key()?;\n    blob.decrypt(key)\n}`}
                        />

                        {/* Card 2: OPA Governance */}
                        <BlueprintCard
                            title={t('tech_card_2_title')}
                            desc={t('tech_card_2_desc')}
                            version={t('tech_card_2_subtitle')}
                            icon={<Shield size={32} />}
                            wireIcon={<Shield size={48} />}
                            code={`deny[msg] {\n  input.resource.type == "aws_s3_bucket"\n  not input.resource.tags.sovereignty == "eu-central-1"\n  msg = "DORA VIOLATION: Residency"\n}`}
                        />

                        {/* Card 3: Arch Linux Edge */}
                        <BlueprintCard
                            title={t('tech_card_3_title')}
                            desc={t('tech_card_3_desc')}
                            version={t('tech_card_3_subtitle')}
                            icon={<Cpu size={32} />}
                            wireIcon={<Cpu size={48} />}
                            code={`# Kernel Optimization\nsysctl -w net.core.rmem_max=16777216\nsystemctl start adraca-neural-mesh`}
                        />

                        {/* Card 4: Titanium Mesh */}
                        <BlueprintCard
                            title={t('tech_card_4_title')}
                            desc={t('tech_card_4_desc')}
                            version={t('tech_card_4_subtitle')}
                            icon={<Globe size={32} />}
                            wireIcon={<Globe size={48} />}
                            code={`def federated_step(local_model):\n    grads = local_model.compute_gradients()\n    # Only gradients are transmitted\n    mesh.broadcast(grads, secure=True)`}
                        />

                    </div>
                </div>
            </section>


            {/* SECTION: DEPLOYMENT ARCHITECTURE (Zero Trust) */}
            <section className="py-24 bg-white dark:bg-slate-950 relative z-10 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                            {t('deploy_arch_title')}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            {t('deploy_arch_body')}
                        </p>
                        <ul className="space-y-4">
                            {[t('deploy_arch_list_1'), t('deploy_arch_list_2'), t('deploy_arch_list_3')].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                        <Lock size={14} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Terminal Visual */}
                    <div className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 font-mono text-sm relative group">
                        {/* Terminal Header */}
                        <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                            </div>
                            <div className="text-xs text-slate-500 ml-2">Showcase Terminal // sovereign-validatord</div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 text-emerald-500 space-y-2 relative">
                            <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <p className="opacity-60">{t('term_log_1')}</p>
                            <p>{t('term_log_2')}</p>
                            <p>{t('term_log_3')}</p>
                            <p className="text-emerald-400 font-bold">{t('term_log_4')}</p>
                            <p className="text-red-400">{t('term_log_5')}</p>
                            <p className="text-emerald-400 animate-pulse">{t('term_log_6')}</p>
                            <div className="w-2 h-4 bg-emerald-500 animate-pulse mt-4 inline-block" />
                        </div>
                    </div>

                </div>
            </section>


        </div>
    );
}

// --- SUB-COMPONENTS ---

interface BlueprintCardProps {
    title: string;
    desc: string;
    version: string;
    icon: React.ReactNode;
    wireIcon: React.ReactNode;
    code: string;
}

function BlueprintCard({ title, desc, version, icon, wireIcon, code }: BlueprintCardProps) {
    return (
        <div className="blueprint-container">
            {/* Layer 1: Code */}
            <div className="bp-layer layer-code">
                <pre>{code}</pre>
            </div>

            {/* Layer 2: Wireframe */}
            <div className="bp-layer layer-wire text-blue-400 opacity-50">
                {wireIcon}
            </div>

            {/* Layer 3: UI */}
            <div className="bp-layer layer-ui p-10 flex flex-col justify-between h-full bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm">
                <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">{version}</div>
            </div>
        </div>
    );
}


