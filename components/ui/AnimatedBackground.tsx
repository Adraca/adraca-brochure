"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-background overflow-hidden">
            {/* Orb 1: Azure (Top Left) */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-azure/20 rounded-full blur-[100px]"
            />

            {/* Orb 2: Violet (Top Right) */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet/15 rounded-full blur-[120px]"
            />

            {/* Orb 3: Magenta (Bottom/Center - Subtle) */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[40%] left-[30%] w-[800px] h-[800px] bg-magenta/5 rounded-full blur-[150px]"
            />

            {/* Grid Pattern Overlay for "Technical" Feel */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>
    );
}
