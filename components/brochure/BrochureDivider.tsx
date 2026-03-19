"use client";
import { motion } from "framer-motion";

export default function BrochureDivider() {
  return (
    <div className="relative py-24 flex items-center justify-center overflow-hidden brochure-divider-container">
      {/* Central Line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent opacity-50" />
      </div>

      {/* Decorative Orb */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center z-10">
          <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 animate-pulse" />
        </div>
        
        {/* Glow behind */}
        <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full scale-150" />
      </motion.div>
    </div>
  );
}
