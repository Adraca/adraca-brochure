"use client";
import { motion } from "framer-motion";
import AdracaLogo from "@/components/ui/AdracaLogo";

const contacts = [
  { label: "Web", value: "adraca.io" },
  { label: "Email", value: "contact@adraca.io" },
  { label: "Phone — EU", value: "+49 163 7235019" },
  { label: "Phone — India", value: "+91 79722 40757" },
  { label: "Location", value: "Europe / India Operations" },
];

const badges = [
  { label: "SOC2 Secured", color: "blue" },
  { label: "HIPAA / GDPR Ready", color: "emerald" },
  { label: "Estonian e-Residency", color: "violet" },
];

const badgeClasses: Record<string, string> = {
  blue:    "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400",
  emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/40 text-emerald-600 dark:text-emerald-400",
  violet:  "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700/40 text-violet-600 dark:text-violet-400",
};

export default function BrochureContact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center text-center gap-8 pb-16"
    >
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" /> Next Steps
      </span>

      <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
        Initialize{" "}
        <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 bg-clip-text text-transparent">Partnership</span>
      </h2>

      <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
        We begin with a <span className="font-bold text-slate-700 dark:text-slate-300">Free Sovereign Audit</span> — a technical review of your infrastructure against DORA, ESPR, and data sovereignty standards.
      </p>

      {/* Contact cards */}
      <div className="w-full max-w-md space-y-3 text-left">
        {contacts.map((c) => (
          <div key={c.label} className="flex items-center gap-4 bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-2xl px-6 py-4 shadow-glass-base hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-slate-400">{c.label}</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="flex gap-3 flex-wrap justify-center">
        {badges.map((b) => (
          <span key={b.label} className={`px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide ${badgeClasses[b.color]}`}>{b.label}</span>
        ))}
      </div>

      {/* Footer mark */}
      <div className="flex items-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600" />
        <p className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">Adraca AI Pvt. Ltd. · Strategic Technical Report · 2026</p>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600" />
      </div>
    </motion.section>
  );
}
