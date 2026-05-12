"use client";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from "@/components/ui/Navbar";
import {
    Brain, ShoppingCart, Zap, TrendingUp, Users, Box,
    ArrowRight, Activity, Layers, Search, Tag, Truck,
    Smartphone, ScanLine, Shield, Database, Check
} from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import Link from 'next/link';
import { retailPageData } from '@/data/industries/retail';

export default function RetailPage() {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans selection:bg-blue-500/30 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-500">
            <Navbar />

            <Hero />
            <DataTicker />

            {/* HARD ENGINEERING SOLUTIONS (Scanner Grid) */}
            <section className="py-24 bg-slate-50 dark:bg-transparent relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            Hard Engineering Solutions
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            The Sovereign Retail Stack
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            Purpose-built infrastructure for privacy-first commerce, real-time inventory, and regulatory compliance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Mapped Solutions to ScannerCards */}
                        <ScannerCard
                            icon={Shield}
                            title="Sovereign CDP"
                            subtitle="EKM-Secured Intelligence"
                            description="GDPR-native customer insights with differential privacy guarantees."
                            stats="100% GDPR Audit"
                            link="#"
                        />
                        <ScannerCard
                            icon={Box}
                            title="Edge-Shelf Sync"
                            subtitle="Arch Linux Edge Nodes"
                            description="Hardened Arch Linux kernels for <100ms shelf-to-cloud updates."
                            stats="<100ms Latency"
                            link="#"
                        />
                        <ScannerCard
                            icon={ScanLine}
                            title="DPP Retail Node"
                            subtitle="Digital Product Passport"
                            description="Consumer-facing provenance engine. GS1 Digital Link compliant QR generation with W3C Verifiable Credentials."
                            stats="100% Traceability"
                            link="#"
                        />
                    </div>
                </div>
            </section>

            <SupplyChain />


            {/* CTA Section */}
            <section className="relative z-10 py-24 bg-slate-50 dark:bg-transparent border-t border-slate-100 dark:border-slate-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to Architect Your Sovereign Retail Stack?</h2>
                    <div className="flex justify-center mt-8">
                        <Link href="/contact?subject=Retail_Compliance_Audit" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl hover:bg-blue-600 dark:hover:bg-blue-300 transition-all flex items-center gap-2">
                            Request a Retail Architecture Audit <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scan { 0% { left: -100%; opacity: 0; } 50% { opacity: 1; } 100% { left: 200%; opacity: 0; } }
        @keyframes orbit { from { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg) translateX(140px) rotate(-360deg); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes float { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-15px); } }
        @keyframes shimmer-slide { 0% { left: -50%; } 100% { left: 150%; } }
        .animate-scan { animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-shimmer-slide { animation: shimmer-slide 3s linear infinite; }
      `}} />
        </div>
    );
}

// --- SUB-COMPONENTS ---

function Hero() {
    const { hero } = retailPageData;
    return (
        <div className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap size={14} className="fill-current" /> Local Vector Store
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[0.95]">
                        Zero-Latency <br />
                        <span className="text-blue-600 dark:text-blue-400">Edge Search.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
                        {hero.subhead}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact?subject=Retail_Compliance_Audit" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl hover:bg-blue-600 dark:hover:bg-blue-300 transition-all flex items-center gap-2">
                            {hero.ctaText} <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
                <div className="lg:w-1/2 flex justify-center items-center relative h-[500px]">
                    <RetailCarousel />
                </div>
            </div>
        </div>
    );
}

function ScannerCard({ icon: Icon, title, subtitle, description, stats, link }: any) {
    return (
        <div className="relative group overflow-hidden rounded-3xl border border-white dark:border-slate-800 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 shadow-sm hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-500">
            <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent skew-x-12 group-hover:animate-scan pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-blue-900/30 text-white dark:text-blue-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                    </div>
                    <ScanLine className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" size={20} />
                </div>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">{subtitle}</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow text-sm font-medium">{description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Impact</div>
                        <div className="text-lg font-black text-slate-900 dark:text-white">{stats}</div>
                    </div>
                    <Link href={link || "#"} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-300 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all">
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

const CAROUSEL_ICONS = [Tag, Box, Users, Truck];

function RetailCarousel() {
    return (
        <div className="relative w-[400px] h-[400px] grid place-items-center">
            {/* Center Pulse */}
            <div className="col-start-1 row-start-1 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

            {/* Center Brain */}
            <div className="col-start-1 row-start-1 w-24 h-24 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center z-10 border border-slate-100 dark:border-slate-700">
                <Brain size={40} className="text-slate-900 dark:text-white" />
            </div>

            {/* Orbiting Satellites */}
            <div className="col-start-1 row-start-1 w-full h-full relative pointer-events-none z-20">
                {CAROUSEL_ICONS.map((Icon, i) => (
                    <div key={i}
                        className="absolute"
                        style={{
                            top: '50%',
                            left: '50%',
                            width: '48px',
                            height: '48px',
                            animation: `orbit 20s linear infinite`,
                            animationDelay: `-${i * (20 / CAROUSEL_ICONS.length)}s`
                        }}>
                        <div className="w-full h-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-125 transition-transform text-blue-600 dark:text-blue-400 flex items-center justify-center pointer-events-auto">
                            <Icon size={24} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const tickerItems = ["LIVE: GDPR Compliant", "CDP: 100% Key Control", "EDGE: <100ms Sync", "DPP: Full Traceability", "AI: Privacy-Preserving", "OMNI: Real-time ATP"];
const duplicatedTickerItems = [...tickerItems, ...tickerItems];

function DataTicker() {
    return (
        <div className="w-full bg-slate-900 text-white overflow-hidden py-4 border-y border-white/10 relative z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                {duplicatedTickerItems.map((item, i) => (
                    <div key={i} className="mx-8 text-xs font-mono tracking-widest flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

function SupplyChain() {
    // const { t } = useLanguage();
    return (
        <section className="py-24 bg-white dark:bg-slate-950 relative">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-16">End-to-End Data Flow</h2>
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 dark:bg-slate-800 -translate-y-1/2 hidden md:block overflow-hidden">
                        <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer-slide" />
                    </div>
                    {[
                        { icon: Box, title: "Ingest", sub: "POS / ERP / IoT" },
                        { icon: Truck, title: "Process", sub: "Edge Compute" },
                        { icon: Search, title: "Enrich", sub: "Privacy AI" },
                        { icon: Smartphone, title: "Activate", sub: "Personalization" }
                    ].map((step, i) => (
                        <div key={i} className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:-translate-y-2 transition-all z-10">
                            <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <step.icon size={28} className="text-slate-600 dark:text-slate-400 group-hover:text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight">{step.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const SHELF_ITEMS = Array.from({ length: 8 });


