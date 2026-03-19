"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Blog Data
import { blogs } from "@/data/blogs";

export default function BlogRepository() {
    const { t } = useLanguage();
    // State
    const [activeShape, setActiveShape] = useState("shape-default");
    const [activeImage, setActiveImage] = useState(blogs[0].coverImage);
    const [activeColor, setActiveColor] = useState(blogs[0].color);

    // Refs
    const listRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // --- 1. Custom Cursor Logic ---
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;

                // Hover State
                const target = e.target as HTMLElement;
                if (target.closest('.blog-item') || target.closest('button')) {
                    cursorRef.current.classList.add('w-12', 'h-12', 'bg-white/10', 'backdrop-invert');
                    cursorRef.current.classList.remove('w-4', 'h-4', 'bg-slate-800');
                } else {
                    cursorRef.current.classList.remove('w-12', 'h-12', 'bg-white/10', 'backdrop-invert');
                    cursorRef.current.classList.add('w-4', 'h-4', 'bg-slate-800');
                }
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // --- 2. Chromatic Scroll Velocity ---
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let rafId: number;

        const loop = () => {
            if (!listRef.current) return;
            const currentScrollY = window.scrollY;
            const velocity = Math.abs(currentScrollY - lastScrollY);

            if (velocity > 2) {
                const shift = Math.min(velocity / 2, 4);
                listRef.current.style.transform = `skewY(${velocity * 0.02}deg)`;
                // Simulate chromatic aberration with text shadow
                listRef.current.style.textShadow = `${shift}px 0 rgba(255,0,0,0.2), -${shift}px 0 rgba(0,0,255,0.2)`;
            } else {
                listRef.current.style.transform = 'none';
                listRef.current.style.textShadow = 'none';
            }

            lastScrollY = currentScrollY;
            rafId = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(rafId);
    }, []);

    // --- 3. Interaction Handler ---
    const handleHover = (article: typeof blogs[0]) => {
        setActiveShape(article.shape);
        setActiveImage(article.coverImage);
        setActiveColor(article.color);
        document.documentElement.style.setProperty('--active-color', article.color);
    };

    return (
        <div className="min-h-screen bg-background text-slate-800 dark:text-slate-100 selection:bg-slate-200 selection:text-slate-900 dark:selection:bg-slate-700 dark:selection:text-white cursor-none transition-colors duration-500">

            {/* Ambient Mood Light */}
            <div className="mood-light" />

            {/* Custom Cursor */}
            <div ref={cursorRef} className="fixed top-0 left-0 w-4 h-4 bg-slate-800 dark:bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out border border-slate-400/50 dark:border-white/50" />

            {/* Removed duplicate Navbar based on previous context. */}

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">

                {/* Header */}
                <header className="mb-24 text-center max-w-3xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-slate-800 dark:bg-sky-400 animate-pulse"></span>
                        {t('intelligence_stream')}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
                        {t('the_stream')}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                        {t('stream_desc')}
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-16 relative">

                    {/* LEFT: The Stream List */}
                    <div className="lg:col-span-7 transition-transform duration-100 ease-linear" ref={listRef}>
                        {blogs.map((article) => (
                            // WRAPPER ADDED HERE
                            <Link key={article.id} href={`/blog/${article.id}`} className="block">
                                <article
                                    className="blog-item group relative py-12 border-b border-slate-200 dark:border-slate-800 cursor-pointer transition-all duration-300 hover:pl-8"
                                    onMouseEnter={() => handleHover(article)}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="bg-white/50 dark:bg-slate-900/50 border border-white dark:border-slate-700 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 shadow-sm">
                                            {t(article.tag)}
                                        </span>
                                        <span className="font-serif italic text-slate-400 dark:text-slate-500 text-lg group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                            {article.date} • {t(article.readTime)}
                                        </span>
                                    </div>

                                    <h2
                                        className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors chromatic-text"
                                        style={{ color: activeColor === article.color ? undefined : undefined }}
                                    >
                                        <span className="group-hover:text-[var(--active-color)] transition-colors">{t(article.title)}</span>
                                    </h2>

                                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-lg mb-4">
                                        {t(article.summary)}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-widest">
                                        {t('read_article')} <ArrowUpRight size={14} />
                                    </div>

                                    {/* Frequency Line */}
                                    <div className="freq-line" />
                                </article>
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT: The Prism Window (Sticky) */}
                    <div className="lg:col-span-5 hidden lg:block">
                        <div className="sticky top-32 h-[600px] flex items-center justify-center">
                            <div className="relative w-full h-[500px] perspective-1000">

                                {/* The Prism Artifact */}
                                <div className={`prism-artifact ${activeShape} border-2 border-slate-200 dark:border-slate-800`}>
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImage}
                                            src={activeImage}
                                            alt="Preview"
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    {/* Overlay UI */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent">
                                        <div className="flex items-center gap-4">
                                            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors">
                                                <Play size={20} fill="currentColor" />
                                            </button>
                                            <span className="text-white/80 font-mono text-xs uppercase tracking-widest">
                                                {t('preview_mode')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Decor */}
                                <div className="mt-8 flex justify-between items-center text-xs font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest px-4">
                                    <span>{t('adraca_archive')}</span>
                                    <span>SECURE // 2025</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 text-center text-slate-400 text-sm">
                {t('footer_copyright')}
            </footer>
        </div>
    );
}
