"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Feature {
  label: string;
  sub?: string;
  color?: string;
}

interface Stat {
  value: string;
  label: string;
  color?: string;
}

interface BrochureProductProps {
  tag: string;
  tagColor?: string;
  title: string;
  titleAccent: string;
  accentColor?: "primary" | "hot";
  description: string;
  features: Feature[];
  imageSrc: string;
  imageAlt: string;
  imageLeft?: boolean;
  code?: string;
  stat?: { value: string; label: string };
  dualStats?: Stat[];
  pills?: string[];
  note?: string;
  laymanSummary?: string;
  laymanTitle?: string;
}

const tagColors: Record<string, string> = {
  blue:    "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400",
  violet:  "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700/40 text-violet-600 dark:text-violet-400",
  cyan:    "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/40 text-cyan-600 dark:text-cyan-400",
  emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/40 text-emerald-600 dark:text-emerald-400",
  pink:    "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-700/40 text-pink-600 dark:text-pink-400",
};

const dotColors: Record<string, string> = {
  blue: "bg-blue-500", violet: "bg-violet-500", cyan: "bg-cyan-500", emerald: "bg-emerald-500", pink: "bg-pink-500",
};

const borderColors: Record<string, string> = {
  blue: "border-l-blue-400", violet: "border-l-violet-400", cyan: "border-l-cyan-400", emerald: "border-l-emerald-400",
};

const statColors: Record<string, string> = {
  blue:    "from-blue-500 to-cyan-500",
  cyan:    "from-cyan-500 to-blue-400",
  emerald: "from-emerald-500 to-teal-400",
  violet:  "from-violet-500 to-purple-400",
};

export default function BrochureProduct({
  tag, tagColor = "blue", title, titleAccent, accentColor = "primary",
  description, features, imageSrc, imageAlt, imageLeft = false,
  code, stat, dualStats, pills, note, laymanSummary, laymanTitle,
}: BrochureProductProps) {
  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageLeft ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="space-y-5 flex flex-col justify-center"
    >
      <span className={`inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase ${tagColors[tagColor]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[tagColor]}`} />
        {tag}
      </span>

      <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
        {title}<br />
        <span className={accentColor === "hot"
          ? "bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
          : "bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 bg-clip-text text-transparent"
        }>{titleAccent}</span>
      </h2>

      <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">{description}</p>
      
      {laymanSummary && (
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-5 space-y-2">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">{laymanTitle || "Business Impact"}</div>
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {laymanSummary}
          </p>
        </div>
      )}

      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f.label} className={`flex gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/40 rounded-r-xl px-4 py-3 border-l-2 ${borderColors[f.color || "blue"]}`}>
              <span><b className="text-slate-700 dark:text-slate-300">{f.label}</b>{f.sub ? ` — ${f.sub}` : ""}</span>
            </li>
          ))}
        </ul>
      )}

      {stat && (
        <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-2xl px-6 py-4 shadow-glass-base">
          <div className={`text-3xl font-black bg-gradient-to-r ${statColors[tagColor] || statColors.blue} bg-clip-text text-transparent`}>{stat.value}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
        </div>
      )}

      {dualStats && (
        <div className="grid grid-cols-2 gap-3">
          {dualStats.map((s) => (
            <div key={s.label} className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-2xl px-5 py-4 shadow-glass-base">
              <div className={`text-2xl font-black bg-gradient-to-r ${statColors[s.color || "blue"]} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {pills && (
        <div className="bg-white/50 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/40 rounded-2xl p-4">
          <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">Access Model</div>
          <div className="flex gap-2 flex-wrap">
            {pills.map((p) => (
              <span key={p} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 text-blue-600 dark:text-blue-400 text-xs font-bold">{p}</span>
            ))}
          </div>
        </div>
      )}

      {code && (
        <pre className="bg-slate-900 dark:bg-black/60 text-emerald-400 text-xs rounded-2xl p-5 leading-7 font-mono shadow-xl overflow-x-auto">{code}</pre>
      )}

      {note && (
        <div className="bg-white/50 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/40 rounded-xl px-4 py-3 text-xs text-slate-400 leading-relaxed italic">{note}</div>
      )}
    </motion.div>
  );

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden border border-white/80 dark:border-slate-700/40 shadow-[0_20px_60px_rgba(59,130,246,0.15)] bg-white dark:bg-slate-800"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/5 pointer-events-none z-10 rounded-2xl" />
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={800}
        height={500}
        className="w-full h-auto object-cover"
        unoptimized
      />
    </motion.div>
  );

  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">
      {imageLeft ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
    </section>
  );
}
