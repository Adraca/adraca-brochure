"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [text, setText] = useState("404_ERROR");

    // Glitch Text Effect
    useEffect(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let interval: any;

        const glitch = () => {
            let iterations = 0;
            const target = "404_LOST_SIGNAL";

            interval = setInterval(() => {
                setText(target.split("").map((char, i) => {
                    if (i < iterations) return target[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));

                if (iterations >= target.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 50);
        };

        const loop = setInterval(glitch, 3000); // Glitch every 3s
        glitch(); // Initial run

        return () => { clearInterval(loop); clearInterval(interval); };
    }, []);

    return (
        <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">

            {/* Noise Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>

            {/* Scanline */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

            <div className="relative z-20">
                <div className="inline-block px-4 py-1 border border-red-500/50 text-red-500 text-xs font-mono mb-8 bg-red-900/10 rounded animate-pulse">
                    CRITICAL_FAILURE // PATH_NOT_FOUND
                </div>

                <h1 className="text-6xl md:text-9xl font-mono font-bold text-white mb-6 tracking-tighter">
                    {text}
                </h1>

                <p className="text-slate-500 max-w-md mx-auto mb-10 font-mono text-sm">
                    The coordinates you entered do not map to a known sector in the Adraca sovereign network. The link may be decayed or restricted.
                </p>

                <Link href="/">
                    <button className="bg-white text-slate-950 px-8 py-3 rounded-full font-bold font-mono text-sm hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all">
                        INITIATE_REBOOT
                    </button>
                </Link>
            </div>
        </div>
    );
}
