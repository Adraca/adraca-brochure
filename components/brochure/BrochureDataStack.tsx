"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BrochureDataStack() {
  const layers = [
    { name: "BRONZE", sub: "Raw Ingestion Layer", detail: "Kafka / S3 / Events → no transforms applied", width: "100%", color: "from-amber-700 to-amber-500" },
    { name: "SILVER", sub: "Cleaned & Conformed", detail: "dbt models → validated business entities", width: "80%", color: "from-slate-500 to-slate-400" },
    { name: "GOLD", sub: "Analytical Serving", detail: "Semantic layer → BI, ML, API exposure", width: "60%", color: "from-yellow-600 to-amber-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Text */}
      <div className="space-y-5">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700/40 text-violet-600 dark:text-violet-400 text-xs font-bold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" /> Data Strategy
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Declarative{" "}
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Pipelines</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          The Medallion Discipline: raw data is a liability; engineered data is an asset. We architect Bronze-Silver-Gold structures on Snowflake and Databricks.
        </p>
        <ul className="space-y-2">
          {[
            { b: "Automated Lineage Graphs", rest: "always know where data came from", c: "border-l-violet-400" },
            { b: "Strict Modular dbt Logic", rest: "no spaghetti transformations", c: "border-l-violet-400" },
            { b: "CI/CD-Enabled Reproduction", rest: "data as code, not as chaos", c: "border-l-violet-400" },
          ].map((item) => (
            <li key={item.b} className={`flex gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/40 rounded-r-xl px-4 py-3 border-l-2 ${item.c}`}>
              <b className="text-slate-700 dark:text-slate-300">{item.b}</b> — {item.rest}
            </li>
          ))}
        </ul>
      </div>

      {/* Medallion Image */}
      <div className="relative rounded-2xl overflow-hidden border border-white/80 dark:border-slate-700/40 shadow-[0_20px_60px_rgba(37,99,235,0.12)] bg-white dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-violet-500/5 pointer-events-none z-10 rounded-2xl" />
        <Image
          src="/brochure/ai_medallion.png"
          alt="Adraca Medallion Architecture"
          width={800}
          height={800}
          className="w-full h-auto object-cover"
          unoptimized
        />
      </div>
    </motion.div>
  );
}
