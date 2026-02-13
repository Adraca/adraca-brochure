"use client";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp, Activity, Globe, Shield, Wifi } from "lucide-react";

export default function CommandFooter() {
    const pathname = usePathname();

    // Hide on Whitepaper page (it has its own footer)
    if (pathname === '/whitepaper') return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-slate-950 text-slate-400 overflow-hidden pt-10 pb-6">

            {/* 1. THE SCANNER BEAM (Scanning Animation) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent absolute top-0 animate-[scan_6s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,41,59,1)_0%,rgba(2,6,23,1)_100%)]" />
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* TOP SECTION: Dense Layout */}
                <div className="grid lg:grid-cols-12 gap-8 mb-8 items-start">

                    {/* Left: Branding & Input */}
                    <div className="lg:col-span-5">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                            Architect <span className="text-blue-500">Reality.</span>
                        </h2>
                        <p className="text-sm text-slate-500 mb-4 max-w-sm">
                            Secure your infrastructure before the paradigm shift.
                        </p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Input Coordinates" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full max-w-xs" />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-500 transition-colors uppercase tracking-wider">
                                Init
                            </button>
                        </div>
                    </div>

                    {/* Right: Links (Compact Columns) */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Modules</h4>
                            <MagneticLink>Capabilities</MagneticLink>
                            <MagneticLink>Intelligence</MagneticLink>
                            <MagneticLink>Security</MagneticLink>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Protocol</h4>
                            <MagneticLink>About</MagneticLink>
                            <MagneticLink>Careers</MagneticLink>
                            <MagneticLink>Contact</MagneticLink>
                        </div>
                        <div className="space-y-2 hidden md:block">
                            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Social</h4>
                            <MagneticLink>Twitter</MagneticLink>
                            <MagneticLink>LinkedIn</MagneticLink>
                            <MagneticLink>GitHub</MagneticLink>
                        </div>
                    </div>
                </div>

                {/* MIDDLE SECTION: Slim Telemetry Bar */}
                <div className="border-y border-white/5 py-3 mb-6 bg-white/[0.01] backdrop-blur-sm">
                    <div className="flex flex-wrap justify-between items-center gap-4 text-xs">
                        <TelemetryItem icon={<Activity size={14} />} label="System" value="OPTIMAL" color="text-emerald-400" />
                        <div className="h-4 w-px bg-white/10 hidden md:block"></div>
                        <TelemetryItem icon={<Wifi size={14} />} label="Latency" value="12ms" dynamic={true} suffix="ms" range={[10, 45]} />
                        <div className="h-4 w-px bg-white/10 hidden md:block"></div>
                        <TelemetryItem icon={<Shield size={14} />} label="Threats" value="NONE" color="text-blue-400" />
                        <div className="h-4 w-px bg-white/10 hidden md:block"></div>
                        <TelemetryItem icon={<Globe size={14} />} label="Nodes" value="8,402" dynamic={true} range={[8400, 8450]} />
                    </div>
                </div>

                {/* BOTTOM SECTION: Minimal Footer */}
                <div className="flex justify-between items-end">
                    <div className="text-[10px] text-slate-600 font-mono">
                        <span className="block mb-1">ID: ADR-2026-X1</span>
                        © 2026 Adraca AI Pvt. Ltd. All rights reserved.
                    </div>

                    {/* Reactor Button (Small) */}
                    <button
                        onClick={scrollToTop}
                        className="group relative w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center hover:border-blue-500/50 transition-colors"
                    >
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ArrowUp size={14} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </button>
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

// --- SUB-COMPONENTS ---

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

function MagneticLink({ children }: { children: React.ReactNode }) {
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
            <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm font-medium relative group">
                <span className="relative z-10">{children}</span>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
        </motion.div>
    );
}
