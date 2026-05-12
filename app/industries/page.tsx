"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from "@/components/ui/Navbar";
import { motion } from 'framer-motion';
import {
    Landmark, Factory, Stethoscope,
    Zap, Building2, ShoppingBag, ArrowRight, ShieldCheck, Cpu,
    Car, Signal, Package, Search, Code2
} from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";

export default function IndustryHub() {
    const { t } = useLanguage();

    const products = [
        {
            id: 'validator',
            title: t('prod_validator_title'),
            subtitle: t('prod_validator_subtitle'),
            description: t('prod_validator_desc'),
            techSpec: t('prod_validator_tech'),
            link: '/industries/finance',
            linkText: t('prod_validator_link'),
            icon: <ShieldCheck size={32} />,
            color: 'emerald'
        },
        {
            id: 'dpp',
            title: t('prod_dpp_title'),
            subtitle: t('prod_dpp_subtitle'),
            description: t('prod_dpp_desc'),
            techSpec: t('prod_dpp_tech'),
            link: '/industries/consumer-goods',
            linkText: t('prod_dpp_link'),
            icon: <Factory size={32} />,
            color: 'amber'
        },
        {
            id: 'synthetic',
            title: t('prod_synthetic_title'),
            subtitle: t('prod_synthetic_subtitle'),
            description: t('prod_synthetic_desc'),
            techSpec: t('prod_synthetic_tech'),
            link: '/industries/health',
            linkText: t('prod_synthetic_link'),
            icon: <Stethoscope size={32} />,
            color: 'rose'
        },
        {
            id: 'search',
            title: t('prod_search_title'),
            subtitle: t('prod_search_subtitle'),
            description: t('prod_search_desc'),
            techSpec: t('prod_search_tech'),
            link: '/industries/retail',
            linkText: t('prod_search_link'),
            icon: <Search size={32} />,
            color: 'blue'
        }
    ];

    return (
        <div className="min-h-screen bg-background text-slate-900 dark:text-white font-sans selection:bg-blue-100 overflow-x-hidden">
            <Navbar />

            {/* Dynamic Background Mesh */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <main className="relative z-10 pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Hero Section */}
                    <div className="max-w-4xl mb-24">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-8">
                            {t('catalog_title')}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mb-10">
                            {t('catalog_subtitle')}
                        </motion.p>
                    </div>

                    {/* Detailed Software Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {products.map((product, idx) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={idx}
                            />
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}

function ProductCard({ product, index }: { product: any, index: number }) {
    const colors: Record<string, string> = {
        emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800",
        amber: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800",
        rose: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800",
        blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
        >
            <Link href={product.link} className="block group h-full">
                <div className="h-full p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col">

                    <div className="flex justify-between items-start mb-8">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${colors[product.color]}`}>
                            {product.icon}
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                {product.subtitle}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.title}
                    </h3>

                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                        {product.description}
                    </p>

                    {/* Tech Spec Badge */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400">
                            <Code2 size={12} className="text-slate-400" />
                            {product.techSpec}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:translate-x-2 transition-transform">
                        {product.linkText}
                    </div>

                </div>
            </Link>
        </motion.div>
    );
}
