"use client";
import React, { useEffect, useRef } from "react";
import { Shield, Mail, Phone, Lock, FileText, Server, Globe, UserCheck, LockKeyhole } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from 'next/link';
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

// --- HELPERS ---

// 1. Magnetic Button Helper
const MagneticWrap = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((e.clientX - centerX) * 0.3);
            y.set((e.clientY - centerY) * 0.3);
        }
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
};

export default function PrivacyPolicy() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    // --- 1. Security Grid Background ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let time = 0;

        const animate = () => {
            // Theme-aware grid color
            const isDark = document.documentElement.classList.contains("dark");
            ctx.clearRect(0, 0, width, height);
            time += 0.005;

            ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(99, 102, 241, 0.1)';
            ctx.lineWidth = 1;

            const gap = 50;
            for (let x = 0; x < width; x += gap) {
                for (let y = 0; y < height; y += gap) {
                    const xOffset = Math.sin(y * 0.01 + time) * 10;
                    const yOffset = Math.cos(x * 0.01 + time) * 10;

                    if ((x / gap + y / gap) % 2 === 0) {
                        ctx.beginPath();
                        ctx.arc(x + xOffset, y + yOffset, 1, 0, Math.PI * 2);
                        ctx.fillStyle = isDark ? '#475569' : '#cbd5e1';
                        ctx.fill();
                    }
                }
            }
            requestAnimationFrame(animate);
        };
        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
        window.addEventListener("resize", handleResize);
        animate();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- 2. 3D Tilt Logic ---
    const handleStageMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        cardRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    return (
        <div
            className="min-h-screen pt-32 pb-20 px-4 md:px-8 perspective-1000 overflow-hidden relative bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500"
            onMouseMove={handleStageMove}
        >
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />

            {/* Doc Container */}
            <div className="max-w-4xl mx-auto perspective-1000 relative z-10">
                <main
                    ref={cardRef}
                    className="bg-white/65 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 rounded-[2rem] p-8 md:p-16 shadow-2xl transition-transform duration-100 ease-linear"
                    style={{ transformStyle: 'preserve-3d', boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1), inset 0 0 30px rgba(255,255,255,0.1)' }}
                >

                    {/* Header */}
                    <header className="text-center mb-16 relative z-10">
                        {/* 3D Shield Animation reused/adapted from concept */}
                        <div className="relative w-32 h-32 mx-auto mb-8 perspective-1000">
                            <div className="absolute inset-0 flex items-center justify-center animate-[float-shield_6s_ease-in-out_infinite]">
                                <Shield size={80} className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 drop-shadow-xl" fill="currentColor" fillOpacity={0.1} strokeWidth={1} />
                                <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full animate-[spin_10s_linear_infinite]" style={{ transform: 'rotateX(60deg)' }}></div>
                                <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'rotateX(60deg) rotateY(90deg)' }}></div>
                            </div>
                        </div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
                        >
                            {t('privacy_title')}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 dark:text-slate-400 font-mono text-sm uppercase tracking-widest"
                        >
                            {t('data_protection_decl')}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-bold text-slate-400"
                        >
                            {t('last_updated')}
                        </motion.div>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            {t('privacy_intro_main')}
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 inline-block"
                        >
                            <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                                {t('your_data_is_yours')}
                            </span>
                        </motion.div>
                    </header>

                    {/* Content */}
                    <div className="space-y-12 relative z-10 text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-left">

                        {/* 1. General Info */}
                        <Section delay={0.5} number="01" title={t('privacy_sec_1_title')} color="indigo">
                            <p className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">{t('privacy_sec_1_content')}</p>
                        </Section>

                        {/* 2. Controller Info */}
                        <Section delay={0.55} number="02" title={t('privacy_sec_2_title')} color="cyan">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                <p className="mb-6">{t('privacy_sec_2_content_pre')}</p>
                                <div className="bg-white/60 dark:bg-slate-800/50 p-6 rounded-2xl border border-white dark:border-slate-700 shadow-sm">
                                    <address className="not-italic mb-4 text-slate-800 dark:text-slate-200 font-medium whitespace-pre-line">
                                        {t('privacy_sec_2_address')}
                                    </address>
                                    <div className="flex flex-col gap-2 mb-4 text-base">
                                        <a href="mailto:contact@adraca.io" className="flex items-center gap-2 text-indigo-600 dark:text-blue-400 font-bold hover:underline">
                                            <Mail size={16} /> contact@adraca.io
                                        </a>
                                        <a href="tel:+917972240757" className="flex items-center gap-2 text-indigo-600 dark:text-blue-400 font-bold hover:underline">
                                            <Phone size={16} /> +91-7972240757
                                        </a>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">{t('privacy_sec_2_note')}</p>
                                </div>
                            </div>
                        </Section>

                        {/* 3. Information We Collect */}
                        <Section delay={0.6} number="03" title={t('privacy_sec_3_title')} color="indigo">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800 space-y-6">
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t('privacy_sec_3_1_title')}</h3>
                                    <p className="mb-2">{t('privacy_sec_3_1_content')}</p>
                                    <ul className="list-disc pl-5 space-y-1 mb-2 marker:text-indigo-500">
                                        {t('privacy_sec_3_1_list').split('|').map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t('privacy_sec_3_2_title')}</h3>
                                    <p className="mb-2">{t('privacy_sec_3_2_content')}</p>
                                    <ul className="list-disc pl-5 space-y-1 mb-2 marker:text-indigo-500">
                                        {t('privacy_sec_3_2_list').split('|').map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{t('privacy_sec_3_2_footer')}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t('privacy_sec_3_3_title')}</h3>
                                    <p>{t('privacy_sec_3_3_content')}</p>
                                </div>
                            </div>
                        </Section>

                        {/* 4. Purpose */}
                        <Section delay={0.65} number="04" title={t('privacy_sec_4_title')} color="cyan">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                <p className="mb-2">{t('privacy_sec_4_content')}</p>
                                <ul className="list-disc pl-5 space-y-1 marker:text-cyan-500">
                                    {t('privacy_sec_4_list').split('|').map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </Section>

                        {/* 5. Retention */}
                        <Section delay={0.7} number="05" title={t('privacy_sec_5_title')} color="indigo">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                <p className="mb-2">{t('privacy_sec_5_content')}</p>
                                <ul className="list-disc pl-5 space-y-1 marker:text-indigo-500">
                                    {t('privacy_sec_5_list').split('|').map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </Section>

                        {/* 6. Sharing */}
                        <Section delay={0.75} number="06" title={t('privacy_sec_6_title')} color="cyan">
                            <p className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">{t('privacy_sec_6_content')}</p>
                        </Section>

                        {/* 7. International Transfer */}
                        <Section delay={0.8} number="07" title={t('privacy_sec_7_title')} color="indigo">
                            <p className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">{t('privacy_sec_7_content')}</p>
                        </Section>

                        {/* 8. Your Rights */}
                        <Section delay={0.85} number="08" title={t('privacy_sec_8_title')} color="cyan">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                <p className="mb-4">{t('privacy_sec_8_content')}</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <RightCard icon={<FileText />} title={t('right_access')} desc="Access your data" />
                                    <RightCard icon={<UserCheck />} title={t('right_rect')} desc="Correct inaccurate data" />
                                    <RightCard icon={<Shield />} title={t('right_erase')} desc="Request deletion" />
                                    <RightCard icon={<Globe />} title={t('right_port')} desc="Data portability" />
                                </div>
                            </div>
                        </Section>



                        {/* 09. Automated Decision */}
                        <Section delay={0.95} number="09" title={t('privacy_sec_10_title')} color="cyan">
                            <p className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">{t('privacy_sec_10_content')}</p>
                        </Section>

                        {/* 10. Security */}
                        <Section delay={1.0} number="10" title={t('privacy_sec_11_title')} color="indigo">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                <LockKeyhole size={20} className="text-emerald-500" />
                                <p>{t('privacy_sec_11_content')}</p>
                            </div>
                        </Section>

                        {/* 11. Children */}
                        <Section delay={1.05} number="11" title={t('privacy_sec_12_title')} color="cyan">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                <p>{t('privacy_sec_12_content')}</p>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 italic">{t('privacy_sec_12_note')}</p>
                            </div>
                        </Section>

                        {/* 12. Third Party */}
                        <Section delay={1.1} number="12" title={t('privacy_sec_13_title')} color="indigo">
                            <p className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">{t('privacy_sec_13_content')}</p>
                        </Section>

                        {/* 13. Changes */}
                        <Section delay={1.15} number="13" title={t('privacy_sec_14_title')} color="cyan">
                            <p className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">{t('privacy_sec_14_content')}</p>
                        </Section>

                        {/* 14. Contact */}
                        <Section delay={1.2} number="14" title={t('privacy_sec_15_title')} color="indigo">
                            <div className="pl-12 border-l-2 border-slate-100 dark:border-slate-800">
                                <p className="mb-2">{t('privacy_sec_15_content')}</p>
                                <div className="font-bold text-slate-900 dark:text-white">Adraca</div>
                                <a href="mailto:contact@adraca.io" className="text-indigo-600 dark:text-blue-400 font-bold hover:underline">contact@adraca.io</a>
                            </div>
                        </Section>

                    </div>

                    {/* Footer Signature */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-700/50 text-center"
                    >
                        <div className="inline-flex items-center gap-2 text-slate-400 text-sm font-mono">
                            <Lock size={14} />
                            <span>{t('securely_signed')}</span>
                        </div>
                    </motion.div>

                </main>
            </div>

            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
                    to { transform: rotateX(60deg) rotateY(0deg) rotateZ(360deg); }
                }
                @keyframes float-shield {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
}

function Section({ children, delay, number, title, color }: { children: React.ReactNode, delay: number, number: string, title: string, color: "indigo" | "cyan" }) {
    const colorClasses = {
        indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
        cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
    };

    return (
        <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay, duration: 0.8 }}
        >
            <div className="flex items-center gap-4 mb-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${colorClasses[color]}`}>
                    {number}
                </span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h2>
            </div>
            {children}
        </motion.section>
    );
}

function RightCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-blue-800 transition-colors">
            <div className="text-indigo-500 dark:text-blue-400 mb-2">{icon}</div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
        </div>
    );
}

