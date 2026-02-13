"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import { Loader2, Send, CheckCircle, ChevronDown } from "lucide-react";

type ContactForm = {
    identity: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactPage() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState<ContactForm>({
        identity: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
            {/* Custom Cursor */}
            <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
            <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>

            {/* Background Canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none opacity-60 z-0" />

            <Suspense fallback={<div></div>}>
                <ContactContent
                    t={t}
                    canvasRef={canvasRef}
                    cardRef={cardRef}
                    glareRef={glareRef}
                    cursorDotRef={cursorDotRef}
                    cursorOutlineRef={cursorOutlineRef}
                    status={status}
                    setStatus={setStatus}
                    formData={formData}
                    setFormData={setFormData}
                />
            </Suspense>
        </div>
    );
}

function ContactContent({ t, canvasRef, cardRef, glareRef, cursorDotRef, cursorOutlineRef, status, setStatus, formData, setFormData }: any) {
    const searchParams = useSearchParams();

    // --- 0. URL Param Logic ---
    useEffect(() => {
        const subjectParam = searchParams.get('subject');
        const messageParam = searchParams.get('message');

        if (subjectParam || messageParam) {
            setFormData((prev: ContactForm) => ({
                ...prev,
                ...(subjectParam && { subject: subjectParam.replace(/_/g, ' ') }),
                ...(messageParam && { message: messageParam })
            }));
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwTXn-AJ1avMic5Ji9c518Q3mCFA6Bq3xyDi2B4Q8jN2E34_dV6iDRSTcZs2GlR9eYBkQ/exec';

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ ...formData, origin: 'contact_page_v1' }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch {
                // If not JSON, treat as plain text success if it contains "Success"
                result = { result: text.includes('Success') ? 'success' : 'error' };
            }

            if (result.result === 'success') {
                if (result.redirectUrl) {
                    window.location.href = result.redirectUrl;
                } else {
                    setStatus('success');
                    setFormData({ identity: "", email: "", subject: "General Inquiry", message: "" });
                }
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
            // Reset status after 5 seconds to allow retry
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    // --- 1. Canvas Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let particles: any[] = [];
        const mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number; y: number; vx: number; vy: number; size: number; baseColor: string;
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.baseColor = Math.random() > 0.5 ? 'rgba(71, 85, 105, ' : 'rgba(148, 163, 184, '; // Slate Colors
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                const dx = mouse.x - this.x; const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250) {
                    const force = (250 - dist) / 250;
                    this.vx -= (dx / dist) * force * 0.05 * 2;
                    this.vy -= (dy / dist) * force * 0.05 * 2;
                }
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.baseColor + '0.4)';
                ctx.fill();
            }
        }

        for (let i = 0; i < 300; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX; mouse.y = e.clientY;
            if (cursorDotRef.current) { cursorDotRef.current.style.left = `${e.clientX}px`; cursorDotRef.current.style.top = `${e.clientY}px`; }
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        return () => { window.removeEventListener("resize", handleResize); window.removeEventListener("mousemove", handleMouseMove); };
    }, []);

    // --- 2. Kinetic Type Logic ---
    useEffect(() => {
        const chars = document.querySelectorAll('.char');
        chars.forEach((char, index) => {
            setTimeout(() => char.classList.add('visible'), index * 30);
        });
    }, []);

    // --- 3. Tilt Logic ---
    const handleCardMove = (e: React.MouseEvent) => {
        if (!cardRef.current || !glareRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        glareRef.current.style.left = `${x}px`;
        glareRef.current.style.top = `${y}px`;
        glareRef.current.style.opacity = '1';
    };

    const handleCardLeave = () => {
        if (!cardRef.current || !glareRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        glareRef.current.style.opacity = '0';
    };

    // --- Render Helpers ---
    const wrapChars = (str: string) => str.split('').map((char, i) => (
        <span key={i} className="char" style={{ transitionDelay: `${i * 30}ms` }}>{char === ' ' ? '\u00A0' : char}</span>
    ));

    return (
        <main className="relative pt-32 pb-20 min-h-screen flex items-center justify-center z-10 px-6">
            <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                {/* LEFT: Typography */}
                <div className="lg:col-span-5 relative">
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-400"></span>
                            {t('secure_channel_open')}
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                            {wrapChars(t('create_the'))} <br />
                            <span className="text-slate-900 dark:text-white">
                                {wrapChars(t('extraordinary'))}
                            </span>
                        </h1>

                        <p className="text-base text-slate-600 dark:text-slate-400 mb-2 max-w-md">
                            We design and build sovereign infrastructure. Ready to engineer your foundation?
                        </p>

                        <p className="text-base text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                            Send a message using the secure form above.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:contact@adraca.io" className="flex items-center gap-5 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 text-xl transition-all duration-300 group-hover:scale-110">
                                    ✉️
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 font-medium">{t('transmission')}</p>
                                    <p className="text-lg text-slate-800 dark:text-white font-semibold">contact@adraca.io</p>
                                </div>
                            </a>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t('global_address'))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-5 group cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 text-xl transition-all duration-300 group-hover:scale-110">
                                    📍
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 font-medium">{t('global_rd_apac_hq_label')}</p>
                                    <p className="text-lg text-slate-800 dark:text-white font-semibold max-w-xs leading-tight">
                                        {t('global_address')}
                                    </p>
                                </div>
                            </a>


                        </div>
                    </div>
                </div>

                {/* RIGHT: Glass Form */}
                <div className="lg:col-span-7 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-slate-200/40 via-gray-200/40 to-slate-200/40 dark:from-slate-800/20 dark:via-cyan-900/10 dark:to-slate-900/20 blur-[80px] rounded-full -z-10 animate-pulse"></div>

                    <div
                        ref={cardRef}
                        className="glass-card-contact p-8 md:p-12 dark:bg-slate-900/50 dark:border-white/10"
                        onMouseMove={handleCardMove}
                        onMouseLeave={handleCardLeave}
                    >
                        <div ref={glareRef} className="glare"></div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('initiate_protocol')}</h2>
                            <p className="text-slate-500 dark:text-slate-400">{t('contact_form_desc')}</p>
                        </div>

                        {status === 'success' ? (
                            <div className="h-96 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle size={40} className="text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Transmission Complete</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Our secure channel has received your message.</p>
                                </div>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="input-group">
                                        <input
                                            id="contact-identity"
                                            type="text"
                                            className="input-field dark:text-white dark:border-slate-600"
                                            placeholder=" "
                                            required
                                            value={formData.identity}
                                            onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                                        />
                                        <label htmlFor="contact-identity" className="input-label dark:text-slate-400">{t('identity')}</label>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            id="contact-email"
                                            type="email"
                                            className="input-field dark:text-white dark:border-slate-600"
                                            placeholder=" "
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <label htmlFor="contact-email" className="input-label dark:text-slate-400">{t('coordinates_email')}</label>
                                    </div>
                                </div>

                                <div className="input-group relative">
                                    <select
                                        id="contact-subject"
                                        className="input-field dark:text-white dark:border-slate-600 appearance-none bg-transparent [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-white"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option value="Product Demo">Product Demo</option>
                                        <option value="Free Trial">Free Trial</option>
                                        <option value="Strategy Audit">Strategy Audit</option>
                                        <option value="CGS Architecture Audit">CGS Architecture Audit</option>
                                        <option value="Retail Compliance Audit">Retail Compliance Audit</option>
                                        <option value="CMT Infrastructure Audit">CMT Infrastructure Audit</option>
                                        <option value="DORA Compliance Audit">DORA Compliance Audit</option>
                                        <option value="Health Data Space Audit">Health Data Space Audit</option>
                                        <option value="Automotive Catena-X Audit">Automotive Catena-X Audit</option>
                                        <option value="Energy Grid Audit">Energy Grid Audit</option>
                                        <option value="ESG Readiness Check">ESG Readiness Check</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                    </select>
                                    <label htmlFor="contact-subject" className="input-label dark:text-slate-400">{t('subject')}</label>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <textarea
                                        id="contact-message"
                                        rows={3}
                                        className="input-field dark:text-white dark:border-slate-600 resize-none"
                                        placeholder=" "
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                    <label htmlFor="contact-message" className="input-label dark:text-slate-400">{t('message_payload')}</label>
                                </div>

                                <div className="pt-4 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="btn-liquid flex items-center gap-2 group disabled:opacity-70 disabled:cursor-wait"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Transmitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{t('transmit')}</span>
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
