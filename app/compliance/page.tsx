"use client";
import React from 'react';
import { Shield, Gavel, Scale, FileText, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function ComplianceHub() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 pt-32 pb-20 px-6">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] opacity-50 dark:opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Hero */}
                <header className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Compliance <span className="text-blue-600 dark:text-blue-400">Hub</span>
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            Centralized access to Adraca's legal frameworks, security protocols, and corporate policies. We operate with transparency and strict adherence to global standards.
                        </p>
                    </motion.div>
                </header>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">

                    <ComplianceCard
                        href="/compliance/privacy"
                        icon={<Shield size={32} className="text-blue-500" />}
                        title={t('privacy_policy')}
                        desc="Detailed breakdown of how we collect, process, and protect your data according to GDPR and global standards."
                        delay={0.1}
                    />

                    <ComplianceCard
                        href="/compliance/terms"
                        icon={<Gavel size={32} className="text-purple-500" />}
                        title={t('terms_of_service')}
                        desc="The legal agreement governing your use of Adraca's services, intellectual property rights, and user obligations."
                        delay={0.2}
                    />

                    <ComplianceCard
                        href="/impressum"
                        icon={<Scale size={32} className="text-emerald-500" />}
                        title={t('impressum')}
                        desc="Company information, managing directors, and legal registration details as required by law."
                        delay={0.3}
                    />

                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500">
                        <FileText size={14} />
                        <span>All documents last updated: January 2026</span>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

function ComplianceCard({ href, icon, title, desc, delay }: { href: string; icon: React.ReactNode; title: string, desc: string, delay: number }) {
    return (
        <Link href={href} className="block group">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.5 }}
                className="h-full"
            >
                <GlassCard className="h-full flex flex-col items-start bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-colors">
                    <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                        {desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        View Document <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </GlassCard>
            </motion.div>
        </Link>
    );
}
