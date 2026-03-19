"use client";
import { motion } from "framer-motion";
import AdracaLogo from "@/components/ui/AdracaLogo";

export default function BrochureCover() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-8 pt-8"
    >
      {/* Hero Logo Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-40 h-40 rounded-[2rem] p-[3px] bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-600 shadow-[0_20px_60px_rgba(59,130,246,0.35)]">
          <div className="w-full h-full rounded-[1.85rem] bg-white flex items-center justify-center overflow-hidden">
            <AdracaLogo className="w-28 h-28" variant="icon" animated={true} />
          </div>
        </div>
        {/* glow ring */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-cyan-400/10 to-violet-500/20 blur-xl -z-10 scale-110" />
      </motion.div>

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
        Strategic Technical Report · 2026
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.05]"
      >
        Hard Engineering<br />
        <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 bg-clip-text text-transparent">
          for the Sovereign
        </span>
        <br />Enterprise
      </motion.h1>

      {/* Divider */}
      <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600" />

      {/* Badge row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        {[
          { label: "SOC2 Secured", color: "blue" },
          { label: "HIPAA / GDPR Ready", color: "emerald" },
          { label: "EU Compliance Ready", color: "violet" },
        ].map((b) => (
          <span
            key={b.label}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide
              ${b.color === "blue" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400" : ""}
              ${b.color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/40 text-emerald-600 dark:text-emerald-400" : ""}
              ${b.color === "violet" ? "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700/40 text-violet-600 dark:text-violet-400" : ""}
            `}
          >
            {b.label}
          </span>
        ))}
      </motion.div>

      {/* Sub-card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-2xl px-8 py-4 shadow-glass-base"
      >
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          PhD Researcher · IITs · Advanced Data Systems &amp; AI Strategy
        </p>
        <p className="text-xs text-slate-400 mt-1 font-mono tracking-wider">adraca.io · contact@adraca.io</p>
      </motion.div>
    </motion.section>
  );
}
