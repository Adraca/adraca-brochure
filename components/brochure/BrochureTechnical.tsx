"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Pillar { label: string; color: string; desc: string; }
interface BrochureTechnicalProps {
  tag: string; tagColor?: string; title: string; titleAccent: string; accentColor?: string;
  description: string; imageSrc: string; imageAlt: string; pillars: Pillar[];
  laymanSummary?: string; laymanTitle?: string;
}

const tagColors: Record<string, string> = {
  violet: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700/40 text-violet-600 dark:text-violet-400",
  blue:   "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400",
};
const dotColors: Record<string, string> = { violet: "bg-violet-500", blue: "bg-blue-500" };
const pillarHeadColors: Record<string, string> = {
  violet: "text-violet-600 dark:text-violet-400",
  azure:  "text-blue-600 dark:text-blue-400",
  emerald:"text-emerald-600 dark:text-emerald-400",
};

export default function BrochureTechnical({ 
  tag, tagColor = "violet", title, titleAccent, accentColor = "hot", 
  description, imageSrc, imageAlt, pillars, laymanSummary, laymanTitle 
}: BrochureTechnicalProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center gap-8 text-center"
    >
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase ${tagColors[tagColor]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[tagColor]}`} /> {tag}
      </span>

      <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
        {title}<br />
        <span className={accentColor === "hot"
          ? "bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
          : "bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 bg-clip-text text-transparent"
        }>{titleAccent}</span>
      </h2>

      <div className="max-w-3xl space-y-4">
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{description}</p>
        
        {laymanSummary && (
          <div className="bg-violet-50/50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800/30 rounded-2xl p-6 text-left">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-500 dark:text-violet-400 mb-2">{laymanTitle || "Why This Matters"}</div>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {laymanSummary}
            </p>
          </div>
        )}
      </div>

      {/* Screenshot */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-white/80 dark:border-slate-700/40 shadow-[0_20px_60px_rgba(124,58,237,0.15)] bg-white dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none z-10" />
        <Image src={imageSrc} alt={imageAlt} width={1200} height={700} className="w-full h-auto object-cover" unoptimized />
      </div>

      {/* Pillar cards */}
      <div className="grid md:grid-cols-3 gap-5 w-full text-left">
        {pillars.map((p) => (
          <div key={p.label} className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-2xl p-6 shadow-glass-base hover:shadow-lg transition-all duration-300 hover:border-violet-200 dark:hover:border-violet-700/50">
            <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${pillarHeadColors[p.color] || "text-blue-600"}`}>{p.label}</div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
