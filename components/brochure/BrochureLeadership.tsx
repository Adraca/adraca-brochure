"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const leaders = [
  {
    name: "Dipti A. Khaparde",
    role: "Founder & CEO",
    stat: "100%",
    statLabel: "Vision Execution",
    specialty: "Scientific Computing & Industrial Processes",
    bio: "Expert in Chemical Engineering and complex process simulation. Dipti leads the translation of physical industrial constraints into digital twin architectures.",
    img: "/brochure/dipti.jpg",
    linkedin: "https://www.linkedin.com/",
    accent: "from-blue-500 to-violet-500",
    border: "border-blue-200 dark:border-blue-700/50",
    tag: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  },
  {
    name: "Vaishali Aathavale",
    role: "Founder",
    stat: "12+",
    statLabel: "Years of Experience",
    specialty: "High-Performance Computing",
    bio: "Leading HPC strategies and patent-pending innovations in distributed computing architectures for sovereign enterprise workloads.",
    img: "/brochure/vaishali.jpg",
    linkedin: "https://www.linkedin.com/",
    accent: "from-violet-500 to-pink-500",
    border: "border-violet-200 dark:border-violet-700/50",
    tag: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
  },
  {
    name: "Abhishek K.",
    role: "CTO",
    stat: "Ph.D.",
    statLabel: "Candidate (IITs)",
    specialty: "Sovereign Data Infrastructures",
    bio: "Senior Architect aligning technical stacks with EU Data Act & DORA mandates. Architects the 'Third Way' of digital sovereignty.",
    img: "/brochure/abhishek.jpg",
    linkedin: "https://www.linkedin.com/in/abhishek-k-172285358/",
    accent: "from-cyan-500 to-blue-500",
    border: "border-cyan-200 dark:border-cyan-700/50",
    tag: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
  },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function BrochureLeadership() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="space-y-16"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700/40 text-violet-600 dark:text-violet-400 text-xs font-bold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
          Sovereign Engineering
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Product{" "}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 bg-clip-text text-transparent">
            Leadership
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Built by engineers who have operated at industrial scale — not theorists chasing demos.
        </p>
      </div>

      {/* Leader Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {leaders.map((leader, i) => (
          <motion.div
            key={leader.name}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`group relative bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-glass-base hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${leader.border}`}
          >
            {/* Photo */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={leader.img}
                alt={leader.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-transparent" />
              {/* Name overlay */}
              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="text-lg font-bold text-white drop-shadow">{leader.name}</h3>
                <p className="text-xs text-white/70 font-mono">{leader.role}</p>
              </div>
              {/* Gradient accent bar at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${leader.accent}`} />
            </div>

            {/* Card body */}
            <div className="p-5 space-y-4">
              {/* Stat row */}
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded-xl ${leader.tag} text-xs font-bold`}>
                  <span className="text-lg font-black">{leader.stat}</span>
                  <span className="ml-1 opacity-70 normal-case text-[10px]">{leader.statLabel}</span>
                </div>
              </div>

              {/* Specialty */}
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Specialty</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{leader.specialty}</div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3 italic">
                {leader.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Founders Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="relative bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/40 rounded-3xl p-10 shadow-glass-base">
          {/* Big quote mark */}
          <div className="absolute top-4 left-6 text-8xl font-black text-blue-100 dark:text-blue-900/50 leading-none select-none pointer-events-none">
            "
          </div>
          <p className="relative text-xl md:text-2xl text-slate-700 dark:text-slate-200 italic font-light leading-relaxed mb-8">
            We are building the neural infrastructure for a sovereign future. Adraca is not just about intelligence; it is about trust, resilience, and the power of decentralised systems to reshape industries.
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-right">
              <span className="block text-sm font-bold text-slate-900 dark:text-white">Dipti A. Khaparde</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Founder & CEO</span>
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-blue-400 to-violet-400" />
            <div className="text-left">
              <span className="block text-sm font-bold text-slate-900 dark:text-white">Abhishek K.</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">CTO</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
