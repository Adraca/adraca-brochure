"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlossButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    onClick?: () => void;
    className?: string;
}

export default function GlossButton({ children, variant = "primary", onClick, className = "" }: GlossButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative overflow-hidden rounded-full px-6 py-3 md:px-8 md:py-4 font-bold transition-all shadow-lg hover:shadow-xl ${isPrimary
                ? "bg-safetyOrange text-white"
                : "bg-white/50 backdrop-blur-sm border border-white/60 text-obsidian hover:bg-white/80 dark:bg-slate-800/50 dark:border-slate-700/60 dark:text-white dark:hover:bg-slate-700/80"
                } ${className}`}
        >
            {/* The Text */}
            <span className="relative z-10">{children}</span>

            {/* The Gloss Shimmer Effect */}
            <motion.div
                initial={{ x: "-100%", skewX: -45 }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full"
            />
        </motion.button>
    );
}
