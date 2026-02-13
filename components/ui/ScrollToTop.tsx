"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" // Blue glow
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full 
                     bg-slate-900 text-white
                     dark:bg-white dark:text-slate-900
                     border border-slate-700 dark:border-white/20
                     shadow-lg hover:scale-110 active:scale-95
                     transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={16} strokeWidth={2.5} />

                    {/* Subtle Ring Ping Animation for visibility */}
                    <span className="absolute inset-0 rounded-full border border-white/30 dark:border-slate-400/30 animate-ping opacity-75"></span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
