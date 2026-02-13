"use client";
import React from 'react';
import { Check, Shield, Server, Box } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import GlossButton from './ui/GlossButton';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SovereignPricing() {
    const { t } = useLanguage();

    const pricingTiers = [
        {
            name: t('tier_core_name'),
            badge: t('tier_core_badge'),
            description: t('tier_core_desc'),
            price: t('tier_core_price'),
            features: [
                t('tier_core_f1'),
                t('tier_core_f2'),
                t('tier_core_f3'),
                t('tier_core_f4')
            ],
            icon: <Box className="w-6 h-6 text-cyan-400" />,
            highlight: false,
            cta: t('tier_core_cta')
        },
        {
            name: t('tier_ent_name'),
            badge: t('tier_ent_badge'),
            description: t('tier_ent_desc'),
            price: t('tier_ent_price'),
            features: [
                t('tier_ent_f1'),
                t('tier_ent_f2'),
                t('tier_ent_f3'),
                t('tier_ent_f4')
            ],
            icon: <Server className="w-6 h-6 text-purple-400" />,
            highlight: true,
            cta: t('tier_ent_cta')
        },
        {
            name: t('tier_oem_name'),
            badge: t('tier_oem_badge'),
            description: t('tier_oem_desc'),
            price: t('tier_oem_price'),
            features: [
                t('tier_oem_f1'),
                t('tier_oem_f2'),
                t('tier_oem_f3'),
                t('tier_oem_f4')
            ],
            icon: <Shield className="w-6 h-6 text-blue-400" />,
            highlight: false,
            cta: t('tier_oem_cta')
        }
    ];

    return (
        <section id="pricing" className="py-20 relative z-10 w-full max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                    {t('pricing_eyebrow')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    {t('pricing_subtitle')}
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => (
                    <GlassCard
                        key={index}
                        className={`relative flex flex-col h-full ${tier.highlight ? 'border-purple-500/50 dark:border-purple-400/50 ring-1 ring-purple-500/20' : ''}`}
                    >
                        {tier.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                {t('most_common')}
                            </div>
                        )}

                        <div className="mb-6 flex items-center justify-between">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                {tier.icon}
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">
                                {tier.badge}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 min-h-[40px]">{tier.description}</p>

                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-8 font-mono">
                            {tier.price}
                        </div>

                        <div className="space-y-4 mb-8 flex-grow">
                            {tier.features.filter(f => f && f.length > 0).map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/contact" className="w-full">
                            <GlossButton variant={tier.highlight ? 'primary' : 'secondary'} className="w-full justify-center">
                                {tier.cta}
                            </GlossButton>
                        </Link>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
