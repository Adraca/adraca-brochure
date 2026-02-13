"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden">
            {/* 1. The High-Contrast Transport Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* 2. The Data Conduit (The "Transport" Line) */}
            <div className="relative w-full max-w-md px-10">
                <div className="h-[2px] w-full bg-slate-100 relative overflow-hidden">
                    {/* Moving Packet of Light */}
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "circIn"
                        }}
                        className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-600 to-transparent shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                    />
                </div>

                {/* 3. Status Metadata */}
                <div className="mt-6 flex justify-between items-center font-mono text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        Establishing Link...
                    </motion.span>
                    <div className="flex gap-2">
                        <span className="text-blue-600">Secure</span>
                        <span className="opacity-30">Encrypted</span>
                    </div>
                </div>
            </div>

            {/* 4. Abstract "Mesh" Particles (Subtle Transport Visuals) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: "-10vw", y: `${20 * i + 10}vh`, opacity: 0 }}
                        animate={{ x: "110vw", opacity: [0, 0.5, 0] }}
                        transition={{
                            duration: 2 + i,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "linear"
                        }}
                        className="absolute h-px w-32 bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                    />
                ))}
            </div>
        </div>
    );
}
