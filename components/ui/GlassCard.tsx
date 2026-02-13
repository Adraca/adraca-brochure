"use client";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", float = false }: { children: React.ReactNode; className?: string; float?: boolean }) {
    return (
        <motion.div
            animate={float ? { y: [0, -10, 0] } : {}}
            transition={float ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
            className={`bg-white/60 backdrop-blur-xl border border-white/80 shadow-glass-base rounded-glass p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
}
