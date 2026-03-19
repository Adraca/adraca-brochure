import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Monitor, Terminal as TerminalIcon, Cpu, Shield, Globe, Activity } from "lucide-react";
import Link from "next/link";
import GlossButton from "@/components/ui/GlossButton";

interface EvidenceItem {
    title: string;
    imageSrc?: string;
}

interface Feature {
    title: string;
    desc: string;
    icon: React.ReactNode;
}

interface TechnicalSpec {
    label: string;
    value: string;
}

interface ProductDetailTemplateProps {
    title: string;
    description: string;
    subtitle: string;
    videoTitle: string;
    videoSrc?: string;
    heroImageSrc?: string;
    evidenceItems: EvidenceItem[];
    features?: Feature[];
    specs: TechnicalSpec[];
    terminalLogs: string[];
}

export default function ProductDetailTemplate({
    title,
    description,
    subtitle,
    videoTitle,
    videoSrc,
    heroImageSrc,
    evidenceItems,
    features,
    specs,
    terminalLogs
}: ProductDetailTemplateProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-slate-800 dark:text-slate-200">
            {/* Nav Padding */}
            <div className="h-20" />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Link href="/products" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2">
                    ← Back to Products
                </Link>
            </div>

            {/* HERO SECTION: VIDEO */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white dark:border-slate-800 shadow-2xl group bg-slate-200 dark:bg-slate-900">
                    {/* Video Player or Placeholder */}
                    {videoSrc ? (
                        <video 
                            src={videoSrc} 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    ) : heroImageSrc ? (
                        <img 
                            src={heroImageSrc} 
                            alt={videoTitle}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Monitor className="w-24 h-24 text-slate-400 dark:text-slate-700 opacity-20" />
                        </div>
                    )}
                    
                    {/* Play Overlay (Only if no videoSrc/heroImageSrc or as a subtle filter) */}
                    <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] flex flex-col items-center justify-center transition-all group-hover:bg-slate-950/10 group-hover:backdrop-blur-none cursor-pointer">
                        {!videoSrc && !heroImageSrc && (
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center mb-4 shadow-2xl"
                            >
                                <Play fill="white" className="text-white ml-1" size={28} />
                            </motion.div>
                        )}
                        <span className="text-white font-bold tracking-widest uppercase text-xs opacity-80">
                            {videoSrc ? 'Demo Active' : 'Play Demonstration'}
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950/80 to-transparent">
                        <div className="text-white/60 text-xs font-mono mb-2">LIVE SOFTWARE DEMO // {videoTitle}</div>
                    </div>
                </div>

                <div className="mt-12 text-center lg:text-left">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        {subtitle}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-light">
                        {description}
                    </p>
                </div>
            </section>

            {/* EVIDENCE GRID: INTERFACE & CAPABILITIES */}
            <section className="bg-slate-50 dark:bg-slate-900/30 py-32 border-y border-slate-200 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Interface & Capabilities</h2>
                        <div className="w-20 h-1 bg-blue-600 rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {evidenceItems.map((item, id) => (
                            <div key={id} className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
                                {/* Browser Toolbar */}
                                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 ml-4 flex-1 truncate">
                                        adraca.network/ui/{item.title.toLowerCase().replace(/\s+/g, '-')}
                                    </div>
                                </div>
                                {/* Image Content */}
                                <div className="aspect-[16/10] bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative overflow-hidden">
                                     {item.imageSrc ? (
                                         <img 
                                            src={item.imageSrc} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                         />
                                     ) : (
                                         <>
                                            <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Monitor size={120} className="text-slate-500" />
                                            </div>
                                            <span className="relative z-10 text-slate-400 dark:text-slate-600 font-medium text-lg uppercase tracking-widest">{item.title}</span>
                                         </>
                                     )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION: THE THREE PILLARS */}
            {features && (
                <section className="py-24 max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {features.map((feature, i) => (
                            <div key={i} className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* TECHNICAL SPECS: TERMINAL */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Deployment Specifications</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {specs.map((spec, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 shadow-sm">
                                        <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">{spec.label}</div>
                                        <div className="text-lg font-bold text-slate-900 dark:text-white">{spec.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12">
                                <GlossButton className="w-full sm:w-auto">Request Full Documentation</GlossButton>
                            </div>
                        </div>

                        {/* Terminal Block */}
                        <div className="bg-[#0D1117] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 font-mono text-xs sm:text-sm">
                            <div className="bg-[#161B22] px-4 py-3 flex items-center gap-2 border-b border-slate-800">
                                <TerminalIcon size={16} className="text-slate-500" />
                                <span className="text-slate-400">adraca_kernel_v4.0 --log-stream</span>
                            </div>
                            <div className="p-6 space-y-1.5 text-emerald-500/80 leading-relaxed">
                                {terminalLogs.map((log, i) => (
                                    <div key={i} className="flex gap-4 text-[10px] sm:text-xs">
                                        <span className="text-slate-600 shrink-0 min-w-[70px]">
                                            [{mounted ? new Date().toLocaleTimeString() : '--:--:--'}]
                                        </span>
                                        <span className={log.includes('CRITICAL') ? 'text-red-400' : log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : ''}>{log}</span>
                                    </div>
                                ))}
                                <motion.div 
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-2 h-4 bg-emerald-500 inline-block mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
