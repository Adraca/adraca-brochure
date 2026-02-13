"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ClipboardCheck, Scale, ShieldCheck, Blocks, Globe, Sparkles, ArrowRight } from "lucide-react";
import AdracaLogo from "./AdracaLogo";
import GlossButton from "./GlossButton"; // Import GlossButton
import Link from "next/link"; // Import Link for navigation

import { useLanguage } from "@/context/LanguageContext";

export default function OrbitalHub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    // Mouse Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 100 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 100 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXVal = e.clientX - rect.left;
            const mouseYVal = e.clientY - rect.top;
            const xPct = mouseXVal / width - 0.5;
            const yPct = mouseYVal / height - 0.5;
            mouseX.set(xPct);
            mouseY.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            className="py-32 min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 relative overflow-hidden gap-12"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {/* Left Alignment Container (Now showing Text & Box first) */}
            <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-20">

                {/* Left Side: Text & Glossy Box */}
                <div className="relative z-10 max-w-lg order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {t('system_online')}
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        {t('technical_gravity_top')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t('technical_gravity_bottom')}</span>
                    </h2>
                    <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                        {t('orbital_hub_desc')}
                    </p>

                    {/* NEW: Buttons Section */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Link href="/demo">
                            <GlossButton variant="primary" className="w-full sm:w-auto text-center justify-center">
                                {t('hero_book_demo')}
                            </GlossButton>
                        </Link>
                        <Link href="/compliance">
                            <GlossButton variant="secondary" className="w-full sm:w-auto text-center justify-center">
                                {t('compliance_roadmap')}
                            </GlossButton>
                        </Link>
                    </div>

                    {/* GLOSSY BOX - New Sections */}
                    <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700/60 p-6 rounded-2xl shadow-xl ring-1 ring-slate-900/5 dark:ring-white/5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white shadow-lg">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{t('new_modules')}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">v1.0 GA - DORA Compliant</p>
                                </div>
                            </div>
                            <div className="px-2 py-1 bg-slate-100 dark:bg-slate-700/50 rounded text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase">
                                {t('update')}
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                <span>{t('feature_risk_tiering')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span>{t('feature_tech_audit')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                <span>{t('feature_bias_detection')}</span>
                            </div>
                        </div>

                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-bold group-hover:gap-2 transition-all">
                            <span>{t('explore_architecture')}</span>
                            <ArrowRight size={14} className="ml-1" />
                        </div>
                    </div>
                </div>

                {/* Right Side: 3D Gyroscope (Orbit) */}
                <div className="relative w-full aspect-square max-w-[500px] md:max-w-[600px] flex-shrink-0 flex items-center justify-center order-1 md:order-2 md:-mr-72 mt-20 perspective-1000">

                    {/* CENTER CORE (Static - No Tilt) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_0_80px_rgba(37,99,235,0.3)] flex items-center justify-center z-20">
                        <AdracaLogo variant="icon" animated={false} className="w-20 h-20" />
                    </div>

                    {/* ROTATING ORBIT SYSTEM */}
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                    >
                        {/* ORBIT 1 (Inner) - Auditing (ClipboardCheck) & Regulation (Scale) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-slate-300/30 rounded-full animate-[spin_20s_linear_infinite]" style={{ transformStyle: "preserve-3d" }}>
                            <OrbitIcon icon={<ClipboardCheck />} angle={0} color="bg-blue-100 text-blue-600" />
                            <OrbitIcon icon={<Scale />} angle={180} color="bg-cyan-100 text-cyan-600" />
                        </div>

                        {/* ORBIT 2 (Middle) - Security (ShieldCheck) & Scalability (Blocks) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-slate-300/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" style={{ transformStyle: "preserve-3d" }}>
                            <OrbitIcon icon={<ShieldCheck />} angle={90} color="bg-rose-100 text-rose-600" />
                            <OrbitIcon icon={<Blocks />} angle={270} color="bg-purple-100 text-purple-600" />
                        </div>

                        {/* ORBIT 3 (Outer) - Keep Globe for "Global/World" context */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-300/10 rounded-full animate-[spin_40s_linear_infinite]" style={{ transformStyle: "preserve-3d" }}>
                            <OrbitIcon icon={<Globe />} angle={45} color="bg-slate-100 text-slate-600" />
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}

interface OrbitIconProps {
    icon: React.ReactNode;
    angle: number;
    color: string;
}

function OrbitIcon({ icon, angle, color }: OrbitIconProps) {
    return (
        <div
            className={`absolute top-0 left-0 w-full h-full pointer-events-none`}
            style={{ transform: `rotate(${angle}deg)` }}
        >
            <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${color} pointer-events-auto`}
                style={{ transform: `rotate(-${angle}deg)` }} // Counter-rotate to keep icon upright
            >
                {icon}
            </div>
        </div>
    );
}
