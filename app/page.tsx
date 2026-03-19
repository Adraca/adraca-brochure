"use client";
import GlassCard from "@/components/ui/GlassCard";
import GlossButton from "@/components/ui/GlossButton";
import { motion } from "framer-motion";
import Link from "next/link";
import UseCaseDeck from "@/components/ui/UseCaseDeck";
import OrbitalHub from "@/components/ui/OrbitalHub";
import AdracaLogo from "@/components/ui/AdracaLogo";
import { useLanguage } from "@/context/LanguageContext";
import SovereignPricing from "@/components/SovereignPricing";
import { ClipboardCheck, FileCheck, Activity } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-6"
        >
          <AdracaLogo className="w-20 h-20 md:w-28 md:h-28 mb-6" variant="icon" animated={true} />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-5xl">
            {t('sovereignty_by_design')}
            <br />
            <span className="text-slate-400 dark:text-slate-500">{t('intelligence_by_engineering')}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
        >
          {t('hero_subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 mt-8"
        >
          <Link href="/contact?subject=Free_Audit">
            <GlossButton variant="primary">{t('engineer_your_foundation')}</GlossButton>
          </Link>
          <Link href="/products">
            <GlossButton variant="secondary">{t('view_capabilities')}</GlossButton>
          </Link>
        </motion.div>

        <div className="pt-24 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Sovereign Validator */}
          <GlassCard float={true} className="text-left bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-slate-700/60 group relative overflow-hidden">
            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-10">
              <div className="mb-4 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-wider">{t('product_validator_tag')}</div>
              <h3 className="text-blue-600 dark:text-blue-400 font-bold mb-2 text-lg">{t('product_validator_title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('product_validator_desc')}</p>
            </div>
            {/* Hover Code Reveal */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/90 backdrop-blur-sm p-4 text-center">
              <code className="text-xs font-mono text-emerald-400 break-words mb-4">
                {t('product_validator_code')}
              </code>
              <a href="http://100.66.68.10:4000" target="_blank" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-500 transition-colors">
                Launch Demo
              </a>
            </div>
          </GlassCard>

          {/* Card 2: DPP Engine */}
          <GlassCard float={true} className="text-left delay-100 bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-slate-700/60 group relative overflow-hidden">
            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-10">
              <div className="mb-4 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-purple-500 mb-2 uppercase tracking-wider">{t('product_dpp_tag')}</div>
              <h3 className="text-purple-600 dark:text-purple-400 font-bold mb-2 text-lg">{t('product_dpp_title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('product_dpp_desc')}</p>
            </div>
            {/* Hover Code Reveal */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/90 backdrop-blur-sm p-4 text-center">
              <code className="text-xs font-mono text-pink-400 break-words mb-4">
                {t('product_dpp_code')}
              </code>
              <a href="http://100.66.68.10:4002" target="_blank" className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-full hover:bg-purple-500 transition-colors">
                Launch Demo
              </a>
            </div>
          </GlassCard>

          {/* Card 3: Adraca Synthetic */}
          <GlassCard float={true} className="text-left delay-200 bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-slate-700/60 group relative overflow-hidden">
            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-10">
              <div className="mb-4 w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Activity className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-cyan-500 mb-2 uppercase tracking-wider">{t('product_synthetic_tag')}</div>
              <h3 className="text-cyan-600 dark:text-cyan-400 font-bold mb-2 text-lg">{t('product_synthetic_title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('product_synthetic_desc')}</p>
            </div>
            {/* Hover Code Reveal */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/90 backdrop-blur-sm p-4 text-center">
              <code className="text-xs font-mono text-cyan-400 break-words mb-4">
                {t('product_synthetic_code')}
              </code>
              <a href="http://100.66.68.10:4003" target="_blank" className="px-4 py-2 bg-cyan-600 text-white text-xs font-bold rounded-full hover:bg-cyan-500 transition-colors">
                Launch Demo
              </a>
            </div>
          </GlassCard>

          {/* Card 4: Sovereign Search (New) */}
          <GlassCard float={true} className="text-left delay-300 bg-white/40 dark:bg-slate-800/40 border-white/60 dark:border-slate-700/60 group relative overflow-hidden">
            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-10">
              <div className="mb-4 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <div className="w-6 h-6"> {/* Reusing generic icon or lucide-react Search if available, using Activity as placeholder or Search icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </div>
              </div>
              <div className="text-xs font-bold text-indigo-500 mb-2 uppercase tracking-wider">{t('product_search_tag')}</div>
              <h3 className="text-indigo-600 dark:text-indigo-400 font-bold mb-2 text-lg">{t('product_search_title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('product_search_desc')}</p>
            </div>
            {/* Hover Code Reveal */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/90 backdrop-blur-sm p-4 text-center">
              <code className="text-xs font-mono text-indigo-400 break-words mb-4">
                {t('product_search_code')}
              </code>
              <a href="http://100.66.68.10:4001" target="_blank" className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full hover:bg-indigo-500 transition-colors">
                Launch Demo
              </a>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* NEW: ORBITAL TECH HUB (3D Gyroscope) */}
      <OrbitalHub />

      {/* NEW: USE CASE DECK (Horizontal Scroll) */}
      <UseCaseDeck />

      {/* NEW: SOVEREIGN PRICING */}
      <SovereignPricing />



    </div>
  );
}
