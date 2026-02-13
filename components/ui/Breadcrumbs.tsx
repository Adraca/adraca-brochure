"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const { t } = useLanguage();

    // Hide on home page only
    if (pathname === "/") return null;
    const segments = pathname.split("/").filter(Boolean);

    // Map segments to translation keys
    const getSegmentName = (segment: string) => {
        const keyMap: { [key: string]: string } = {
            'about': 'about_us',
            'contact': 'contact_us',
            'legal': 'legal_disclosure',
            'privacy': 'privacy_policy',
            'impressum': 'impressum',
            'industries': 'industries',
            'capabilities': 'capabilities',
            'intelligence': 'intelligence',
            'company': 'company',
            'energy': 'energy',
            'finance': 'finance',
            'retail': 'retail',
            'automotive': 'automotive',
            'health': 'health',
            'consumer-goods': 'consumer_goods',
            'products': 'capabilities',
            'security-sovereignty': 'sovereignty',
            'cloud-infrastructure': 'infrastructure',
            'data-migration': 'data_migration',
            'use-cases': 'use_cases',
            'whitepaper': 'whitepaper'
        };

        const translationKey = keyMap[segment] || segment.replace(/-/g, '_');
        // Try to translate, fallback to formatted segment if translation returns the key itself (optional check, depends on implementation)
        // Since t() usually returns the key if missing, we might want a cleaner fallback.
        // But for now, let's assume t() works for known keys.

        // Simple heuristic: if translation exists (assumed via keyMap), use it.
        // Otherwise, format the segment.
        if (keyMap[segment]) {
            return t(translationKey);
        }

        return segment.replace(/-/g, " ");
    };

    return (
        <div className="fixed top-24 left-6 z-40 hidden md:flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-full shadow-sm text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider transition-colors duration-300">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                <Home size={12} />
                <span className="sr-only">Home</span>
            </Link>

            {segments.map((segment, index) => {
                const path = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;
                const displayName = getSegmentName(segment);

                return (
                    <div key={path} className="flex items-center gap-2">
                        <ChevronRight size={10} className="text-slate-400" />
                        {isLast ? (
                            <span className="text-slate-900 dark:text-white">{displayName}</span>
                        ) : (
                            <Link href={path} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {displayName}
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
