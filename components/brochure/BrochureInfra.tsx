"use client";
import { motion } from "framer-motion";

export default function BrochureInfra() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Orbital Infographic */}
      <div className="flex items-center justify-center">
        <div className="relative w-72 h-72">
          {/* Rings */}
          {[0, 28, 56, 80].map((inset, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                inset: `${inset}px`,
                borderColor: i === 0 ? "rgba(59,130,246,0.25)" : i === 1 ? "rgba(6,182,212,0.2)" : i === 2 ? "rgba(124,58,237,0.2)" : "transparent",
              }}
            />
          ))}
          {/* Center */}
          <div className="absolute inset-[88px] rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-600 flex items-center justify-center text-white text-[10px] font-black tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            CORE
          </div>
          {/* Orbital dots */}
          {[
            { label: "DORA", color: "#3B82F6", pos: "top-1 left-1/2 -translate-x-1/2" },
            { label: "ESPR", color: "#7C3AED", pos: "bottom-1 left-1/2 -translate-x-1/2" },
            { label: "GDPR", color: "#06B6D4", pos: "top-1/2 right-1 -translate-y-1/2" },
            { label: "SOC2", color: "#DB2777", pos: "top-1/2 left-1 -translate-y-1/2" },
          ].map((dot) => (
            <div key={dot.label} className={`absolute ${dot.pos} flex flex-col items-center gap-1`}>
              <div className="w-3 h-3 rounded-full" style={{ background: dot.color, boxShadow: `0 0 10px ${dot.color}80` }} />
              <span className="text-[8px] font-black tracking-wider" style={{ color: dot.color }}>{dot.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="space-y-5">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" /> Core Infrastructure
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Sovereign{" "}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 bg-clip-text text-transparent">Landing Zones</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          We treat infrastructure as software. Terraform and Policy-as-Code vend cloud environments that are born compliant — not patched compliant.
        </p>
        <ul className="space-y-2">
          {[
            { b: "Regional Data Residency", rest: "enforcement at the platform layer", c: "border-l-blue-400" },
            { b: "Zero-Configuration Drift", rest: "via declarative state management", c: "border-l-violet-400" },
            { b: "Audit-Ready EU Transparency", rest: "with real-time compliance graphs", c: "border-l-cyan-400" },
          ].map((item) => (
            <li key={item.b} className={`flex gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/40 rounded-r-xl px-4 py-3 border-l-2 ${item.c}`}>
              <b className="text-slate-700 dark:text-slate-300">{item.b}</b> — {item.rest}
            </li>
          ))}
        </ul>
        <div className="bg-slate-900 dark:bg-black/60 text-emerald-400 text-xs rounded-2xl p-4 font-mono leading-7 shadow-xl">
          terraform plan → DORA_Landing_Zone_v3<br />
          <span className="text-slate-500">✓ 0 compliance violations detected</span>
        </div>
      </div>
    </motion.div>
  );
}
