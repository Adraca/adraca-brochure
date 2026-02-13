"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    ChevronDown,
    ShieldCheck,
    Cpu,
    Globe,
    Zap,
    Users,
    ArrowRight
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';

import { useLanguage } from '@/context/LanguageContext';

const PricingCard = ({
    title,
    subtitle,
    badge,
    priceTitle,
    features,
    ctaText,
    ctaLink,
    isMostCommon,
    icon: Icon,
    delay
}: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay }}
            whileHover={{ y: -10 }}
            className={`relative group rounded-3xl p-8 h-full flex flex-col transition-all duration-500
        ${isMostCommon
                    ? 'bg-white/70 dark:bg-slate-800/80 border-2 border-orange-400 shadow-[0_20px_50px_rgba(249,115,22,0.15)] z-10'
                    : 'bg-white/40 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700/60 hover:border-blue-200 dark:hover:border-blue-500/30 shadow-xl'
                } backdrop-blur-xl`}
        >
            {/* Glossy Overlay Effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 dark:from-white/5 to-transparent opacity-50" />
            </div>

            {isMostCommon && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Most Common
                </div>
            )}

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl ${isMostCommon ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-blue-50 dark:bg-blue-900/20'} text-blue-600 dark:text-blue-400`}>
                        <Icon size={28} className={isMostCommon ? 'text-orange-500' : 'text-blue-600 dark:text-blue-400'} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase bg-slate-100/50 dark:bg-slate-700/50 px-3 py-1 rounded-md border border-slate-200/50 dark:border-slate-600/50">
                        {badge}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300 mb-8 min-h-[40px] leading-relaxed">{subtitle}</p>

                <div className="mb-8">
                    <h4 className={`text-lg font-mono font-semibold tracking-tight ${isMostCommon ? 'text-blue-700 dark:text-blue-300' : 'text-blue-600 dark:text-blue-400'}`}>
                        {priceTitle}
                    </h4>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                    {features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 group/item">
                            <div className={`p-0.5 rounded-full ${isMostCommon ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                                <Check size={14} strokeWidth={3} />
                            </div>
                            <span className="text-sm text-slate-600 dark:text-slate-100 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors font-medium">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {ctaLink ? (
                    <a
                        href={ctaLink}
                        className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn
                ${isMostCommon
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-orange-300 hover:scale-[1.02]'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 hover:shadow-md'
                            }`}
                    >
                        {ctaText}
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                ) : (
                    <button
                        className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn
            ${isMostCommon
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-orange-300 hover:scale-[1.02]'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 hover:shadow-md'
                            }`}
                    >
                        {ctaText}
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200/60 dark:border-slate-700/60 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
            >
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-slate-400 group-hover:text-blue-500"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const BackgroundEffects = () => (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Animated Blobs */}
        <motion.div
            animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40"
        />
        <motion.div
            animate={{
                x: [0, -80, 0],
                y: [0, 100, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40"
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-radial from-blue-50/50 dark:from-slate-900/50 to-transparent opacity-60" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
    </div>
);

export default function LicensingPage() {
    const { t } = useLanguage();
    const [deploymentType, setDeploymentType] = useState('cloud'); // cloud vs sovereign

    const plans = [
        {
            title: t('price_core_title'),
            subtitle: t('price_core_desc'),
            badge: t('price_core_price'), // Using price as badge to match "License"
            priceTitle: t('price_core_price'),
            icon: ShieldCheck,
            features: [
                t('feat_risk_tiering'),
                t('feat_annex_iv'),
                t('feat_single_region'),
                t('feat_standard_support')
            ],
            ctaText: t('price_core_btn'),
            ctaLink: '/contact?subject=Free_Trial',
            isMostCommon: false
        },
        {
            title: t('price_ent_title'),
            subtitle: t('price_ent_desc'),
            badge: t('price_ent_price'), // "Sovereign Deployment" -> "Custom Annual"
            priceTitle: t('price_ent_price'),
            icon: Cpu,
            features: [
                t('feat_all_core_bias'),
                t('feat_deterministic_ledger'),
                t('feat_dedicated_node'),
                t('feat_prio_support')
            ],
            ctaText: t('price_ent_btn'),
            ctaLink: '/contact?subject=Strategy_Audit',
            isMostCommon: true
        },
        {
            title: t('price_oem_title'),
            subtitle: t('price_oem_desc'),
            badge: 'Integration', // Need key or keep hardcoded if not changed
            priceTitle: t('price_oem_price'),
            icon: Globe,
            features: [
                t('feat_white_label'),
                t('feat_headless_api'),
                t('feat_rev_share'),
                t('feat_co_marketing')
            ],
            ctaText: t('price_oem_btn'),
            ctaLink: 'mailto:partnerships@adraca.io',
            isMostCommon: false
        }
    ];

    return (
        <div className="min-h-screen font-sans text-slate-900 dark:text-white selection:bg-blue-100 overflow-x-hidden">
            <BackgroundEffects />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-6 relative z-10 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-200/50 dark:border-blue-700/50">
                        {t('enterprise_stability')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                        {t('pricing_eyebrow')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Licensing</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        {t('pricing_subtitle')}
                    </p>
                </motion.div>

                {/* Toggle Interaction */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center mb-16"
                >
                    <div className="p-1 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl flex gap-1">
                        <button
                            onClick={() => setDeploymentType('cloud')}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${deploymentType === 'cloud' ? 'bg-white dark:bg-slate-700 shadow-lg text-blue-600 dark:text-blue-300 scale-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                        >
                            {t('managed_cloud')}
                        </button>
                        <button
                            onClick={() => setDeploymentType('sovereign')}
                            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${deploymentType === 'sovereign' ? 'bg-white dark:bg-slate-700 shadow-lg text-blue-600 dark:text-blue-300 scale-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                        >
                            {t('sovereign_node')}
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Pricing Grid */}
            <section className="pb-32 px-6 max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <PricingCard key={idx} {...plan} delay={idx * 0.15} />
                    ))}
                </div>
            </section>

            {/* Features Detail Section */}
            <section className="py-24 px-6 bg-white/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('core_capabilities_title')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{t('core_capabilities_desc')}</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { title: t('feat_dora_title'), desc: t('feat_dora_desc'), icon: ShieldCheck },
                            { title: t('feat_model_agnostic_title'), desc: t('feat_model_agnostic_desc'), icon: Zap },
                            { title: t('feat_local_processing_title'), desc: t('feat_local_processing_desc'), icon: Globe },
                            { title: t('feat_expert_support_title'), desc: t('feat_expert_support_desc'), icon: Users }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
                            >
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 px-6 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{t('faq_questions_title')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{t('faq_questions_subtitle')}</p>
                </div>

                <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-white/60 dark:border-slate-700/60 shadow-xl">
                    <FAQItem
                        question={t('faq_q1')}
                        answer={t('faq_a1')}
                    />
                    <FAQItem
                        question={t('faq_q2')}
                        answer={t('faq_a2')}
                    />
                    <FAQItem
                        question={t('faq_q3')}
                        answer={t('faq_a3')}
                    />
                    <FAQItem
                        question={t('faq_q4')}
                        answer={t('faq_a4')}
                    />
                </div>
            </section>


        </div>
    );
}
