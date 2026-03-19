"use client";
import { motion } from "framer-motion";

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } }),
};

export default function BrochureVision() {
  const stats = [
    { value: "$52M+", label: "Enterprise Revenue Impact", color: "from-blue-500 via-cyan-400 to-violet-600" },
    { value: "4", label: "Production-Grade AI Products", color: "from-blue-500 via-cyan-400 to-violet-600" },
    { value: "100%", label: "On-Premise · Zero Cloud Lockout", color: "from-blue-500 to-cyan-400" },
  ];

  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6"
      >
        <motion.span
          custom={0} variants={fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" /> Manifesto
        </motion.span>

        <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          The Sovereign{" "}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 bg-clip-text text-transparent">Vision</span>
        </motion.h2>

        <motion.p custom={2} variants={fadeUp} className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
          We replace experimental chaos with deterministic infrastructure. Adraca AI rejects technical debt in favor of industrial-grade reliability.
        </motion.p>

        <motion.ul custom={3} variants={fadeUp} className="space-y-3">
          {[
            { b: "PhD Analytics Leadership:", rest: "Founded on deep research from IITs — rigorous, not evangelical." },
            { b: "$52M+ Revenue Impact:", rest: "Proven track record at Accenture, PwC and global tier-1 firms." },
            { b: "Ironclad Sovereignty:", rest: "Zero vendor lock-in for all critical enterprise workloads." },
          ].map((item) => (
            <li key={item.b} className="flex gap-3 text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/40 rounded-xl px-4 py-3 border-l-2 border-l-blue-400">
              <span className="font-bold text-slate-700 dark:text-slate-300">{item.b}</span> {item.rest}
            </li>
          ))}
        </motion.ul>

        <motion.blockquote
          custom={4} variants={fadeUp}
          className="border-l-4 border-l-transparent pl-5 py-3 italic text-lg font-semibold text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-800/40 rounded-r-xl"
          style={{ borderImage: "linear-gradient(to bottom, #3B82F6, #8B5CF6) 1" }}
        >
          "We do not build wrappers.<br />We engineer foundations."
        </motion.blockquote>
      </motion.div>

      {/* Right — stat cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={fadeUp}
            className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-2xl px-6 py-5 shadow-glass-base hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300"
          >
            <div className={`text-3xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{s.label}</div>
          </motion.div>
        ))}
        <motion.div
          custom={3} variants={fadeUp}
          className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-2xl px-6 py-5 shadow-glass-base text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          Founded at the intersection of <span className="font-bold text-slate-700 dark:text-slate-300">research rigour</span> and{" "}
          <span className="font-bold text-slate-700 dark:text-slate-300">industrial engineering</span>, Adraca builds the infrastructure layer that enterprise AI requires to reach production.
        </motion.div>
      </motion.div>
    </section>
  );
}
