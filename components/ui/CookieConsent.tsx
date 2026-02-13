"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage for existing consent
        const savedConsent = localStorage.getItem('adraca-cookie-consent');
        if (!savedConsent) {
            // Slight delay for better UX on load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            if (savedConsent === 'granted') {
                initializeAnalytics();
            }
        }
    }, []);

    const initializeAnalytics = () => {
        // TODO: Initialize GA here
        console.log("[CookieConsent] Analytics Initialized: Sovereignty Respected.");
    };

    const handleAcceptAll = () => {
        localStorage.setItem('adraca-cookie-consent', 'granted');
        // Notify gated components that consent has been granted
        window.dispatchEvent(new CustomEvent('adraca-consent-updated', { detail: 'granted' }));
        initializeAnalytics();
        setIsVisible(false);
    };

    const handleEssentialOnly = () => {
        localStorage.setItem('adraca-cookie-consent', 'denied');
        // Notify gated components that consent has been denied
        window.dispatchEvent(new CustomEvent('adraca-consent-updated', { detail: 'denied' }));
        console.log("[CookieConsent] Analytics Blocked: Privacy Preserved.");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-80"
                >
                    <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">

                        {/* Glass Gloss Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col gap-4">

                            {/* Header */}
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-blue-400" />
                                <h3 className="text-sm font-bold text-white tracking-wide">Privacy & Sovereignty</h3>
                            </div>

                            {/* Body */}
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                Adraca uses essential cookies for system security. We also use analytics to improve our fleet intelligence. You control your data.
                            </p>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 mt-1">
                                <button
                                    onClick={handleAcceptAll}
                                    className="w-full bg-white text-slate-950 text-xs font-bold py-2.5 rounded-lg hover:bg-slate-200 transition-colors shadow-lg"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleEssentialOnly}
                                    className="w-full bg-transparent border border-white/20 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    Essential Only
                                </button>
                            </div>

                            {/* Link */}
                            <div className="text-center mt-1">
                                <Link
                                    href="/compliance/privacy"
                                    className="text-[10px] text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-bold"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
