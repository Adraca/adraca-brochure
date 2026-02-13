"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import GlassCard from "./GlassCard";
import { useLanguage } from "@/context/LanguageContext";

export default function UseCaseDeck() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const { t } = useLanguage();

    const useCases = [
        {
            id: 1,
            title: t('uc_supply_chain_title'),
            kpi: t('uc_supply_chain_kpi'),
            desc: t('uc_supply_chain_desc'),
            image: "/images/use-cases/catena-x-supply-chain.png"
        },
        {
            id: 2,
            title: t('uc_trading_title'),
            kpi: t('uc_trading_kpi'),
            desc: t('uc_trading_desc'),
            image: "/images/use-cases/algorithmic-trading.png"
        },
        {
            id: 3,
            title: t('uc_smart_grid_title'),
            kpi: t('uc_smart_grid_kpi'),
            desc: t('uc_smart_grid_desc'),
            image: "/images/use-cases/smart-grid.png"
        },
        {
            id: 4,
            title: t('uc_fraud_title'),
            kpi: t('uc_fraud_kpi'),
            desc: t('uc_fraud_desc'),
            image: "/images/use-cases/fraud-detection.png"
        },
        {
            id: 5,
            title: t('uc_genomic_title'),
            kpi: t('uc_genomic_kpi'),
            desc: t('uc_genomic_desc'),
            image: "/images/use-cases/ehds-research.png"
        },
        {
            id: 6,
            title: t('uc_fleet_title'),
            kpi: t('uc_fleet_kpi'),
            desc: t('uc_fleet_desc'),
            image: "/images/use-cases/catena-x-connector.png"
        },
    ];

    // Transform vertical scroll into horizontal movement
    // x goes from "1%" to "-95%" of the container width
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[250vh] bg-slate-50 dark:bg-background">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col justify-start pt-24 overflow-hidden">

                <div className="w-full px-12 pb-12 z-20">
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                        {t('deployed_impact').split(' ')[0]} <span className="text-blue-600 dark:text-blue-400">{t('deployed_impact').split(' ')[1]}</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">{t('scroll_to_explore')}</p>
                </div>

                {/* The Moving Deck */}
                <motion.div style={{ x }} className="flex gap-12 pl-12 pr-12">
                    {useCases.map((useCase) => (
                        <GlassCard key={useCase.id} className="min-w-[85vw] md:min-w-[450px] h-[550px] p-0 overflow-hidden group hover:scale-[1.02] transition-transform duration-500 border-none shadow-2xl bg-white dark:bg-slate-900">
                            {/* Snapshot Image */}
                            <div className="h-1/2 w-full overflow-hidden relative">
                                <Image
                                    src={useCase.image}
                                    alt={useCase.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 450px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* New Tag: Validator Report */}
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded text-white text-[10px] font-mono tracking-widest uppercase">
                                    Validator Report: REP-00{useCase.id}
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
                                    <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                                        {t('verified_success')}
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-8 flex flex-col justify-between h-1/2 bg-white dark:bg-slate-900">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{useCase.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{useCase.desc}</p>
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">{t('achievement')}</p>
                                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{useCase.kpi}</p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        →
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
