"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Play, ArrowRight, X, ShieldCheck, HeartPulse, Box, Activity, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function UseCasesPage() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState("all");
    const [demoOpen, setDemoOpen] = useState(false);
    const [demoData, setDemoData] = useState<any>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const logContainerRef = useRef<HTMLDivElement>(null);
    const navBlobRef = useRef<HTMLDivElement>(null);

    // Memoized chart data to prevent flickering on re-renders
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        setChartData(Array.from({ length: 20 }).map(() => Math.random() * 100));
    }, []);

    // --- 1. Gooey Filter Logic ---
    const handleFilter = (filter: string, e: React.MouseEvent) => {
        setActiveFilter(filter);
        const target = e.currentTarget as HTMLElement;
        const parent = target.parentElement?.getBoundingClientRect();
        const rect = target.getBoundingClientRect();

        if (navBlobRef.current && parent) {
            navBlobRef.current.style.width = `${rect.width}px`;
            navBlobRef.current.style.transform = `translateX(${rect.left - parent.left}px)`;
        }
    };

    // --- 2. Demo Simulation Logic ---
    const openDemo = (title: string, type: string) => {
        setDemoData({ title, type });
        setDemoOpen(true);
        setLogs([]);

        // Simulate Boot Sequence
        const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

        setTimeout(() => addLog(`[SYSTEM] Initializing ${title} v2.4...`), 200);
        setTimeout(() => addLog(`[NETWORK] Handshake successful (14ms)`), 600);
        setTimeout(() => addLog(`[AUTH] Token verified: 0x8F...2A`), 1000);
        setTimeout(() => addLog(`[DATA] Loading visualization modules...`), 1500);

        // Live Loop
        const interval = setInterval(() => {
            const actions = ['Processing batch...', 'Anomaly score: 0.02', 'Syncing node...', 'Optimizing route...', 'Packet received'];
            if (Math.random() > 0.6) addLog(`[CORE] ${actions[Math.floor(Math.random() * actions.length)]}`);
        }, 1000);

        // Cleanup
        return () => clearInterval(interval);
    };

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-500">

            {/* SVG Filter for Gooey Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>

            {/* HERO */}
            <section className="relative pt-40 pb-20 text-center">
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        {t('system_online')}
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[0.9] tracking-tight">
                        {t('holographic_repo_1')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 dark:from-blue-400 dark:via-cyan-300 dark:to-sky-400">{t('holographic_repo_2')}</span>
                    </h1>

                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
                        {t('use_cases_desc')}
                    </p>

                    {/* Gooey Filter Bar */}
                    <div className="flex justify-center">
                        <div className="relative bg-white dark:bg-slate-900 p-2 rounded-full shadow-lg border border-slate-100 dark:border-slate-800 flex gap-2 gooey-filter">
                            <div ref={navBlobRef} className="gooey-blob absolute transition-all duration-500 ease-out bg-slate-900 dark:bg-slate-700" style={{ width: '90px', transform: 'translateX(0px)' }}></div>
                            {['all', 'fintech', 'health', 'retail'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={(e) => handleFilter(filter, e)}
                                    className={`relative z-10 px-6 py-2 rounded-full font-bold text-sm capitalize transition-colors duration-300 ${activeFilter === filter ? 'text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* REPOSITORY GRID */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <RepoCard
                        category="fintech" activeFilter={activeFilter} title={t('fraud_engine')} desc={t('fraud_desc')}
                        icon={<ShieldCheck size={18} />} color="text-blue-600 dark:text-blue-400"
                        href="/use-cases/dora-fraud"
                        img="/images/use-cases/dora-fraud.png"
                    />
                    <RepoCard
                        category="health" activeFilter={activeFilter} title={t('patient_sync')} desc={t('patient_sync_desc')}
                        icon={<HeartPulse size={18} />} color="text-pink-600 dark:text-pink-400"
                        href="/use-cases/ehds-privacy"
                        img="/images/use-cases/ehds-privacy.png"
                    />
                    <RepoCard
                        category="retail" activeFilter={activeFilter} title={t('supply_twin')} desc={t('supply_twin_desc')}
                        icon={<Box size={18} />} color="text-orange-600 dark:text-orange-400"
                        href="/use-cases/espr-passport"
                        img="/images/use-cases/espr-passport.png"
                    />
                    <RepoCard
                        category="fintech" activeFilter={activeFilter} title={t('ledger_vis')} desc={t('ledger_vis_desc')}
                        icon={<Activity size={18} />} color="text-purple-600 dark:text-purple-400"
                        href="/use-cases/audit-ledger"
                        img="/images/use-cases/audit-ledger.png"
                    />
                    <RepoCard
                        category="retail" activeFilter={activeFilter} title={t('inventory_ai')} desc={t('inventory_ai_desc')}
                        icon={<ShoppingCart size={18} />} color="text-emerald-600 dark:text-emerald-400"
                        href="/use-cases/edge-velocity"
                        img="/images/use-cases/retail-grid.png"
                    />
                    <RepoCard
                        category="retail" activeFilter={activeFilter} title={t('fleet_command')} desc={t('fleet_command_desc')}
                        icon={<Truck size={18} />} color="text-sky-600 dark:text-sky-400"
                        href="/use-cases/catena-telemetry"
                        img="/images/use-cases/catena-data-space.png"
                    />
                </div>
            </section>

            {/* DEMO OVERLAY (Cinema Mode) */}
            <div className={`demo-overlay ${demoOpen ? 'active' : ''}`}>
                <div className="demo-stage relative">

                    {/* Left: Terminal */}
                    <div className="bg-slate-900 border-r border-slate-800 text-cyan-400 font-mono p-6 text-xs flex flex-col">
                        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-slate-500 ml-auto">bash --verbose</span>
                        </div>
                        <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-2">
                            {logs.map((log, i) => (
                                <div key={i} className="log-line">{log}</div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visualizer */}
                    <div className="relative bg-slate-50 dark:bg-slate-900 flex flex-col">
                        <button
                            onClick={() => setDemoOpen(false)}
                            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition dark:text-white"
                        >
                            <X size={18} />
                        </button>

                        <div className="h-12 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 justify-between">
                            <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{demoData?.title}</span>
                            <span className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live
                            </span>
                        </div>

                        <div className="flex-1 p-8 flex items-center justify-center">
                            {/* Simulated Chart */}
                            <div className="w-full h-64 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-end gap-2 p-4">
                                {chartData.map((height, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-blue-500 dark:bg-blue-600 rounded-t transition-all duration-500"
                                        style={{ height: `${height}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

// --- SUB-COMPONENTS ---

// --- SUB-COMPONENTS ---

function RepoCard({ category, activeFilter, title, desc, icon, color, href, img }: any) {
    const { t } = useLanguage();
    if (activeFilter !== 'all' && activeFilter !== category) return null;

    return (
        <Link href={href} className="block">
            <div
                className="repo-card group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300"
            >
                {/* Image Area */}
                <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden group-hover:shadow-inner transition-all">
                    {img ? (
                        <img
                            src={img}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-50 dark:from-slate-800 dark:to-slate-900"></div>
                    )}

                    {/* Overlay Gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>

                    <div className={`absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-xs font-bold ${color} shadow-sm z-10`}>
                        {icon} {category.toUpperCase()}
                    </div>
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[1px]">
                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform">
                            <Play size={24} className="text-slate-900 dark:text-white ml-1 fill-current" />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">{desc}</p>
                    <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('stable_version')}</span>
                        <span className={`text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${color}`}>
                            {t('run_sim')} <ArrowRight size={14} />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
