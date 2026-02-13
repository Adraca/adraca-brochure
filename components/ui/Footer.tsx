"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp, Activity, Globe, Shield, Wifi, ShieldCheck, Cpu, ArrowUpRight, Lock } from "lucide-react";
import AdracaLogo from "./AdracaLogo";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const pathname = usePathname();
    const { t } = useLanguage();





    return (
        <footer className="relative bg-slate-950 text-slate-400 overflow-hidden pt-10 pb-6 border-t border-slate-900">

            {/* 1. THE SCANNER BEAM */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent absolute top-0 animate-[scan_6s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,41,59,1)_0%,rgba(2,6,23,1)_100%)]" />
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* TOP SECTION - NEW COMPACT LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-8 items-start">

                    {/* COL 1: Branding (Compact) */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <AdracaLogo className="h-8 w-auto" variant="full" animated={false} />
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-xs">
                            {t('footer_desc')}
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all cursor-pointer">
                                <Globe size={14} />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all cursor-pointer">
                                <Lock size={14} />
                            </div>
                        </div>
                    </div>

                    {/* COL 2: Contact / HQ (Fills the previous empty gap) */}
                    <div className="lg:col-span-1 pt-1">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Global R&D HQ</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-slate-400 text-xs font-medium mb-1">+91 79722 40757 (India)</p>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Plot 39, Line No 2, Kasturba Nagar, Nagpur - 440014 Maharashtra, India
                                </p>
                            </div>
                            <div>
                                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">EU Representative</h5>
                                <p className="text-slate-400 text-xs font-medium">+49 163 7235019 (Germany)</p>
                            </div>
                        </div>
                    </div>

                    {/* COLS 3-5: Links & Trust (Spans remaining 3 cols) */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Capabilities */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">{t('capabilities')}</h4>
                            <div className="space-y-2">
                                <MagneticLink href="/products/cloud-infrastructure">{t('infrastructure')}</MagneticLink>
                                <MagneticLink href="/products/data-migration">{t('data_migration')}</MagneticLink>
                                <MagneticLink href="/products/security-sovereignty">{t('sovereignty')}</MagneticLink>
                                <MagneticLink href="/intelligence">{t('intelligence')}</MagneticLink>
                            </div>
                        </div>

                        {/* Industries */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">{t('industries')}</h4>
                            <div className="space-y-2">
                                <MagneticLink href="/industries/consumer-goods">{t('consumer_goods')}</MagneticLink>
                                <MagneticLink href="/industries/retail">{t('retail')}</MagneticLink>
                                <MagneticLink href="/industries/cmt">{t('cmt')}</MagneticLink>
                                <MagneticLink href="/industries/finance">{t('finance')}</MagneticLink>
                                <MagneticLink href="/industries/energy">{t('energy')}</MagneticLink>
                                <MagneticLink href="/industries/automotive">{t('automotive')}</MagneticLink>
                                <MagneticLink href="/industries/health">{t('health')}</MagneticLink>
                            </div>
                        </div>

                        {/* Trust Center (Card) */}
                        <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors h-fit">
                            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-[10px]">{t('trust_center')}</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                    <ShieldCheck size={14} className="text-emerald-500" /> SOC2 SECURED
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                    <Cpu size={14} className="text-blue-500" /> HIPAA / GDPR READY
                                </div>
                                <div className="h-px bg-white/10 my-3" />
                                <Link href="/compliance" className="text-xs font-bold text-white flex items-center gap-2 group hover:text-blue-400 transition-colors">
                                    {t('legal_framework')} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                {/* MIDDLE SECTION: Telemetry Bar REMOVED per request */}

                {/* BOTTOM SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-slate-600 font-mono">
                        © 2026 ADRACA AI PVT. LTD. {t('all_rights_reserved').toUpperCase()}
                    </p>
                    <div className="flex gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <Link href="/compliance/privacy" className="hover:text-white transition-colors">{t('privacy_policy')}</Link>
                        <Link href="/impressum" className="hover:text-white transition-colors">{t('impressum')}</Link>
                        <Link href="/compliance/terms" className="hover:text-white transition-colors">{t('terms_of_services')}</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">{t('global_offices')}</Link>
                    </div>

                </div>

            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    15% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </footer>
    );
}

function TelemetryItem({ icon, label, value, color = "text-slate-300", dynamic = false, range = [0, 100], suffix = "" }: any) {
    const [displayValue, setDisplayValue] = useState(value);
    useEffect(() => {
        if (!dynamic) return;
        const interval = setInterval(() => {
            const random = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
            setDisplayValue(random.toLocaleString() + suffix);
        }, 2000);
        return () => clearInterval(interval);
    }, [dynamic]);
    return (
        <div className="flex items-center gap-2 min-w-[100px]">
            <div className="opacity-60">{icon}</div>
            <div className="flex gap-2">
                <span className="font-bold text-slate-600 uppercase tracking-wider">{label}:</span>
                <span className={`font-mono font-medium ${color}`}>{displayValue}</span>
            </div>
        </div>
    );
}

function MagneticLink({ children, href }: { children: React.ReactNode, href: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const pull = 0.3;
            x.set((e.clientX - centerX) * pull);
            y.set((e.clientY - centerY) * pull);
        }
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="w-fit"
        >
            <Link href={href} className="block text-slate-400 hover:text-white transition-colors text-sm font-medium relative group">
                <span className="relative z-10">{children}</span>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
        </motion.div>
    );
}
