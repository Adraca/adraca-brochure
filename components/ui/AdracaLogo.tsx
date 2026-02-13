"use client";
import { motion, Variants } from "framer-motion";

interface AdracaLogoProps {
    className?: string;
    variant?: "icon" | "full" | "gif";
    animated?: boolean;
}

export default function AdracaLogo({ className = "w-10 h-10", variant = "icon", animated = true }: AdracaLogoProps) {

    // ANIMATION VARIANTS
    const drawVariant: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative aspect-square h-full flex items-center justify-center">
                <motion.svg
                    viewBox="0 0 120 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-md"
                >
                    <defs>
                        {/* Metallic Silver Gradient for Border */}
                        <linearGradient id="silver_metal" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#e2e8f0" />
                            <stop offset="30%" stopColor="#94a3b8" />
                            <stop offset="50%" stopColor="#f1f5f9" />
                            <stop offset="70%" stopColor="#64748b" />
                            <stop offset="100%" stopColor="#cbd5e1" />
                        </linearGradient>

                        {/* Matte Black Fill */}
                        <linearGradient id="matter_black" x1="60" y1="0" x2="60" y2="130" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                    </defs>

                    {/* Shield Container */}
                    <motion.path
                        d="M60 10 L105 35 V95 L60 120 L15 95 V35 L60 10Z"
                        stroke="url(#silver_metal)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="url(#matter_black)"
                        initial={animated ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* The 'A' Shape */}
                    <motion.path
                        d="M38 95 L60 30 L82 95"
                        stroke="white"
                        strokeWidth="9"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        variants={drawVariant}
                        initial={animated ? "hidden" : "visible"}
                        animate="visible"
                        transition={{ delay: 0.3 }}
                    />

                    {/* Blue Crossbar */}
                    <motion.path
                        d="M48 68 H72"
                        stroke="#0ea5e9"
                        strokeWidth="9"
                        strokeLinecap="butt"
                        variants={drawVariant}
                        initial={animated ? "hidden" : "visible"}
                        animate="visible"
                        transition={{ delay: 0.8 }}
                    />
                </motion.svg>
            </div>

            {/* Typography */}
            {variant === "full" && (
                <div className="flex flex-col justify-center">
                    <motion.span
                        initial={animated ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="font-bold text-slate-900 dark:text-white tracking-[0.2em] text-sm leading-none uppercase"
                    >
                        ADRACA
                    </motion.span>
                </div>
            )}
        </div>
    );
}
