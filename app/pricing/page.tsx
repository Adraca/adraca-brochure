"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from "@/components/ui/Navbar";
import { motion } from 'framer-motion';
import { useLanguage } from "@/context/LanguageContext";
import { Check, Terminal, Users, Shield, Minus, HelpCircle } from 'lucide-react';

export default function PricingPage() {
    const { t } = useLanguage();

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 }
        })
    };

    const tiers = [
        {
            title: t('price_dev_title'),
            price: t('price_dev_cost'),
            priceSub: '/ mo',
            features: [
                t('feat_local_scan'),
                t('feat_1_user'),
                t('feat_comm_support')
            ],
            buttonText: t('price_dev_btn'),
            buttonVariant: 'secondary',
            icon: <Terminal size={24} />,
            highlight: false
        },
        {
            title: t('price_team_title'),
            price: t('price_team_cost'),
            priceSub: '', // Included in cost string if needed, or split
            features: [
                t('feat_5_cloud'),
                t('feat_dora_pdf'),
                t('feat_cicd'),
                t('feat_email_support')
            ],
            buttonText: t('price_team_btn'),
            buttonVariant: 'primary',
            icon: <Users size={24} />,
            highlight: true
        },
        {
            title: t('price_ent_title'),
            price: t('price_ent_cost'),
            priceSub: '',
            features: [
                t('feat_air_gap'),
                t('feat_unlimited'),
                t('feat_custom_opa'),
                t('feat_ded_support') // 24/7 SLA
            ],
            buttonText: t('price_ent_btn'),
            buttonVariant: 'secondary',
            icon: <Shield size={24} />,
            highlight: false
        }
    ];

    // Feature Matrix Data
    const complianceRows = [
        { feature: t('matrix_row_dora'), dev: t('matrix_val_manual'), team: t('matrix_val_daily'), ent: t('matrix_val_realtime') },
        { feature: t('matrix_row_annex'), dev: '-', team: `✅ ${t('matrix_val_pdf')}`, ent: `✅ ${t('matrix_val_dashboard')}` },
        { feature: t('matrix_row_policy'), dev: t('matrix_val_community'), team: t('matrix_val_std_opa'), ent: `✅ ${t('matrix_val_custom_rego')}`, highlightEnt: true },
    ];
    const infraRows = [
        { feature: t('matrix_row_cloud'), dev: '1', team: '5', ent: t('matrix_val_unlimited') },
        { feature: t('matrix_row_residency'), dev: t('matrix_val_local'), team: t('matrix_val_eu'), ent: `✅ ${t('matrix_val_airgap')}`, highlightEnt: true },
        { feature: t('matrix_row_rate'), dev: t('matrix_val_10'), team: t('matrix_val_1000'), ent: t('matrix_val_unlimited') },
    ];
    const supportRows = [
        { feature: t('matrix_row_sla'), dev: t('matrix_val_community'), team: t('matrix_val_24h'), ent: `✅ ${t('matrix_val_dedicated')}` },
    ];

    const renderRow = (row: any, idx: number) => (
        <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900/40' : 'bg-white dark:bg-slate-950'}>
            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
                {row.feature}
            </td>
            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 text-center">
                {row.dev === '-' ? <Minus size={16} className="mx-auto text-slate-300" /> : row.dev}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 text-center bg-blue-50/50 dark:bg-blue-900/10">
                {row.team}
            </td>
            <td className={`px-6 py-4 text-sm font-bold border-b border-slate-100 dark:border-slate-800 text-center ${row.highlightEnt ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                {row.ent}
            </td>
        </tr>
    );

    // FAQ Data
    const faqs = [
        {
            category: t('faq_cat_technical'),
            items: [
                { q: t('faq_sovereignty_q'), a: t('faq_sovereignty_a') },
                { q: t('faq_dora_compliance_q'), a: t('faq_dora_compliance_a') }
            ]
        },
        {
            category: t('faq_cat_billing'),
            items: [
                { q: t('faq_cancel_q'), a: t('faq_cancel_a') },
                { q: t('faq_api_limit_q'), a: t('faq_api_limit_a') }
            ]
        },
        {
            category: t('faq_cat_support'),
            items: [
                { q: t('faq_airgap_q'), a: t('faq_airgap_a') },
                { q: t('faq_whitelabel_q'), a: t('faq_whitelabel_a') }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-slate-900 dark:text-white font-sans selection:bg-blue-100 overflow-x-hidden">
            <Navbar />

            {/* Subtle Texture - Reduced Opacity */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02] dark:opacity-[0.02]"
                style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <main className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Compact Hero Section */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
                            {t('pricing_hero_title')}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-xl mx-auto">
                            {t('pricing_hero_subtitle')}
                        </motion.p>
                    </div>

                    {/* 3-Column Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
                        {tiers.map((tier, idx) => (
                            <motion.div
                                key={idx}
                                custom={idx}
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                                className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${tier.highlight
                                        ? 'bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-2xl z-10 scale-105'
                                        : 'bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                            >
                                {tier.highlight && (
                                    <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
                                        <span className="bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        {tier.icon}
                                        {tier.title}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                            {tier.price && typeof tier.price === 'string' ? tier.price.replace(' / mo', '').replace(' / Monat', '') : tier.price}
                                        </span>
                                        {tier.price && typeof tier.price === 'string' && (tier.price.includes('/ mo') || tier.price.includes('/ Monat')) && (
                                            <span className="text-sm font-medium text-slate-500">/mo</span>
                                        )}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                            <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                                }`}>
                                                <Check size={10} strokeWidth={3} />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${tier.buttonVariant === 'primary'
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-white'
                                    }`}>
                                    {tier.buttonText}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature Comparison Matrix */}
                    <div className="max-w-6xl mx-auto mb-24 overflow-x-auto">
                        <h2 className="text-2xl font-bold text-center mb-12">Feature Comparison Matrix</h2>
                        <table className="w-full min-w-[800px] border-collapse relative">
                            <thead>
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-slate-200 dark:border-slate-800 w-1/4">
                                        {t('matrix_header_feature')}
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b-2 border-slate-200 dark:border-slate-800 w-1/4">
                                        {t('matrix_header_dev')}
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider border-b-2 border-blue-500 w-1/4 bg-blue-50/50 dark:bg-blue-900/10">
                                        {t('matrix_header_team')}
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b-2 border-slate-200 dark:border-slate-800 w-1/4">
                                        {t('matrix_header_ent')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {/* Compliance Section */}
                                <tr className="bg-slate-100 dark:bg-slate-800">
                                    <td colSpan={4} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        {t('matrix_cat_compliance')}
                                    </td>
                                </tr>
                                {complianceRows.map((row, idx) => renderRow(row, idx))}

                                {/* Infrastructure Section */}
                                <tr className="bg-slate-100 dark:bg-slate-800">
                                    <td colSpan={4} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-4">
                                        {t('matrix_cat_infra')}
                                    </td>
                                </tr>
                                {infraRows.map((row, idx) => renderRow(row, idx))}

                                {/* Support Section */}
                                <tr className="bg-slate-100 dark:bg-slate-800">
                                    <td colSpan={4} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-4">
                                        {t('matrix_cat_support')}
                                    </td>
                                </tr>
                                {supportRows.map((row, idx) => renderRow(row, idx))}
                            </tbody>
                        </table>
                    </div>


                    {/* Expanded FAQ Section */}
                    <div className="max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-16">
                        <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {faqs.map((category, idx) => (
                                <div key={idx} className={idx === 2 ? "md:col-span-2 md:max-w-2xl md:mx-auto w-full" : ""}>
                                    <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                            <HelpCircle size={18} />
                                        </div>
                                        {category.category}
                                    </h3>
                                    <div className="space-y-8">
                                        {category.items.map((item, qIdx) => (
                                            <div key={qIdx} className="pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                                                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                                                    {item.q}
                                                </h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                                    {item.a}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
