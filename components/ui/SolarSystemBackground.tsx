"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function SolarSystemBackground() {
    const stars = useMemo(() => {
        return [...Array(50)].map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            opacity: Math.random(),
        }));
    }, []);

    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-background overflow-hidden flex items-center justify-center">

            {/* 1. The Starfield (Drifting Slowly) */}
            <div className="absolute inset-0 w-[200%] h-full animate-drift opacity-30">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-slate-400"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.width,
                            height: star.height,
                            opacity: star.opacity,
                        }}
                    />
                ))}
            </div>

            {/* 2. The Sun (Pulsing Core) */}
            <div className="relative z-10">
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
                />
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 shadow-[0_0_60px_rgba(255,165,0,0.6)] relative z-20" />
            </div>

            {/* 3. Orbit Track: Earth */}
            <div className="absolute border border-slate-200 rounded-full w-[500px] h-[500px] opacity-60" />

            {/* 4. Planet Earth System */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute w-[500px] h-[500px]" // Rotates the container to orbit
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {/* Earth Body */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-teal-400 shadow-lg relative">
                        {/* Earth Clouds/Texture effect */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 rounded-full"></div>

                        {/* The Moon Orbit */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2"
                        >
                            {/* The Moon */}
                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-slate-300 rounded-full shadow-sm -translate-x-1/2" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* 5. Orbit Track: Jupiter */}
            <div className="absolute border border-slate-200 rounded-full w-[800px] h-[800px] opacity-40" />

            {/* 6. Planet Jupiter System */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute w-[800px] h-[800px]"
            >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    {/* Jupiter Body */}
                    <div className="w-24 h-24 rounded-full bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-orange-200 via-amber-700 to-orange-100 shadow-xl relative overflow-hidden">
                        {/* Jupiter Bands */}
                        <div className="absolute top-1/3 w-full h-2 bg-black/10 blur-[2px]"></div>
                        <div className="absolute bottom-1/3 w-full h-3 bg-black/10 blur-[2px]"></div>

                        {/* Jupiter Moons (Europa, Ganymede, etc) */}
                        <motion.div
                            animate={{ rotate: -360 }} // Counter rotate to keep orientation or create chaotic orbit
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
                        >
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-amber-100 rounded-full -translate-x-1/2" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
                        >
                            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
