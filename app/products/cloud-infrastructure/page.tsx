"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
// Global Navbar is hidden for this route in components/ui/Navbar.tsx

import { useLanguage } from "@/context/LanguageContext";

export default function CloudInfrastructure() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // --- 1. Vapor Canvas & Cursor Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const cursor = cursorRef.current;
        if (!canvas || !cursor) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let packets: any[] = [];
        const mouse = { x: -1000, y: -1000 };

        class Packet {
            x: number = 0; y: number = 0; size: number = 0; speed: number = 0; opacity: number = 0; fadeState: string = 'in';
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 100;
                this.size = Math.random() * 20 + 5;
                this.speed = Math.random() * 2 + 0.5;
                this.opacity = 0;
                this.fadeState = 'in';
            }
            update() {
                this.y -= this.speed;
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) this.x += (dx / dist) * 2;

                if (this.fadeState === 'in') {
                    this.opacity += 0.01;
                    if (this.opacity >= 0.3) this.fadeState = 'hold';
                } else if (this.fadeState === 'hold') {
                    if (this.y < height * 0.5) this.fadeState = 'out';
                } else {
                    this.opacity -= 0.01;
                }
                if (this.y < -50 || this.opacity <= 0) this.init();
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity * 0.3})`;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        }

        const initParticles = () => {
            packets = [];
            const count = width > 768 ? 100 : 40;
            for (let i = 0; i < count; i++) packets.push(new Packet());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            packets.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            document.body.classList.add('hovering');
            // Reset hover state logic omitted for simplicity or can use a debounce
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    // --- 2. Monolith Stack Generation & Interaction ---
    useEffect(() => {
        const stack = stackRef.current;
        if (!stack) return;

        // Clear previous children to prevent duplication on re-renders (strict mode)
        stack.innerHTML = '';

        const bladeCount = 12;
        for (let i = 0; i < bladeCount; i++) {
            const blade = document.createElement('div');
            blade.className = 'server-blade';
            blade.style.top = `${i * 35}px`;
            blade.style.transform = `translateZ(${i * 2}px)`;
            blade.innerHTML = `
                <div class="flex gap-2">
                    <div class="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div class="w-1 h-1 bg-slate-300 rounded-full"></div>
                </div>
                <div class="w-10 h-1 bg-slate-200 rounded-full"></div>
            `;
            stack.appendChild(blade);
        }

        const handleHover = (e: MouseEvent) => {
            const blades = stack.querySelectorAll('.server-blade') as NodeListOf<HTMLElement>;
            const rect = stack.getBoundingClientRect();
            const y = e.clientY - rect.top;

            blades.forEach((b, i) => {
                const dist = Math.abs((i * 35) - y);
                if (dist < 150) {
                    const shift = (150 - dist) * 0.4;
                    b.style.transform = `translateZ(${shift}px) scale(1.05)`;
                    b.style.borderColor = 'rgba(56, 189, 248, 1)';
                    b.style.backgroundColor = 'rgba(255,255,255,0.8)';
                } else {
                    b.style.transform = `translateZ(0px) scale(1)`;
                    b.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                    b.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                }
            });
        };

        const handleLeave = () => {
            const blades = stack.querySelectorAll('.server-blade') as NodeListOf<HTMLElement>;
            blades.forEach(b => {
                b.style.transform = `translateZ(0px) scale(1)`;
                b.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                b.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            });
        }

        const interactiveArea = document.getElementById('hero-interactive');
        interactiveArea?.addEventListener('mousemove', handleHover);
        interactiveArea?.addEventListener('mouseleave', handleLeave);

        return () => {
            interactiveArea?.removeEventListener('mousemove', handleHover);
            interactiveArea?.removeEventListener('mouseleave', handleLeave);
        }
    }, []);

    // --- 3. Intersection Observer ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.condense-text').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);


    return (
        <div className="cloud-page min-h-screen bg-white dark:bg-slate-950 text-[#0f172a] dark:text-white font-[Inter] overflow-x-hidden selection:bg-sky-100 selection:text-sky-900 cursor-none relative">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Outfit:wght@300;500;700;900&display=swap" rel="stylesheet" />

            {/* --- Styles --- */}
            <style jsx global>{`
                :root {
                    --bg-color: #ffffff;
                    --text-main: #0f172a;
                    --accent-sky: #38bdf8;
                    --accent-vapor: #818cf8;
                    --blade-bg: rgba(255, 255, 255, 0.5);
                    --blade-border: rgba(255, 255, 255, 0.9);
                    --card-bg: rgba(255, 255, 255, 0.6);
                    --card-inner: rgba(255, 255, 255, 0.9);
                }
                .dark {
                    --bg-color: #020617;
                    --text-main: #f8fafc;
                    --blade-bg: rgba(30, 41, 59, 0.5);
                    --blade-border: rgba(51, 65, 85, 0.9);
                    --card-bg: rgba(15, 23, 42, 0.6);
                    --card-inner: rgba(30, 41, 59, 0.9);
                }
                .cloud-page { font-family: 'Inter', sans-serif; cursor: none; }
                .display-font { font-family: 'Outfit', sans-serif; }
                
                /* Cursor */
                #cursor-drone {
                    position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
                    transform: translate(-50%, -50%); display: flex; justify-content: center; align-items: center;
                    mix-blend-mode: exclusion;
                }
                .drone-blade {
                    position: absolute; width: 40px; height: 2px; background: white;
                    animation: spin-fast 0.5s linear infinite;
                }
                .drone-blade:nth-child(2) { transform: rotate(90deg); }
                .drone-core {
                    width: 8px; height: 8px; background: white; border-radius: 50%; z-index: 10; box-shadow: 0 0 10px white;
                }
                .cloud-page:hover .drone-blade { width: 60px; height: 4px; animation-duration: 0.2s; }
                @keyframes spin-fast { 100% { transform: rotate(360deg); } }

                /* Server Monolith */
                .monolith-stage { width: 300px; height: 500px; perspective: 2000px; position: relative; }
                .monolith { width: 100%; height: 100%; position: absolute; transform-style: preserve-3d; animation: float-monolith 8s ease-in-out infinite; }
                .server-blade {
                    position: absolute; left: 0; width: 300px; height: 40px;
                    background: var(--blade-bg); border: 1px solid var(--blade-border);
                    backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(56, 189, 248, 0.15);
                    display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
                    transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .server-blade::before {
                    content: ''; position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
                    width: 4px; height: 4px; border-radius: 50%; background: var(--accent-sky);
                    box-shadow: 0 0 10px var(--accent-sky); animation: blink 2s infinite;
                }
                @keyframes float-monolith { 0%, 100% { transform: rotateX(10deg) rotateY(-20deg) translateY(0); } 50% { transform: rotateX(15deg) rotateY(-10deg) translateY(-30px); } }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

                /* Cards */
                .cool-card {
                    position: relative; background: var(--card-bg); backdrop-filter: blur(20px);
                    border-radius: 24px; padding: 2px; overflow: hidden; transition: transform 0.4s ease;
                }
                .cool-card-inner {
                    background: var(--card-inner); height: 100%; width: 100%; border-radius: 22px;
                    padding: 2.5rem; position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between;
                }
                .cool-card::before {
                    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
                    background: conic-gradient(transparent, var(--accent-sky), var(--accent-vapor), transparent 30%);
                    animation: rotate-liquid 4s linear infinite; opacity: 0; transition: opacity 0.3s;
                }
                .cool-card:hover { transform: translateY(-10px); }
                .cool-card:hover::before { opacity: 1; }
                @keyframes rotate-liquid { 100% { transform: rotate(360deg); } }

                /* Condensation Text */
                .condense-text {
                    color: transparent; text-shadow: 0 0 20px rgba(15, 23, 42, 0.5);
                    transition: all 1s ease-out; transform: scale(1.1);
                }
                .condense-text.active {
                    color: var(--text-main); text-shadow: 0 0 0 rgba(15, 23, 42, 0); transform: scale(1);
                }
                .gradient-text { background: linear-gradient(135deg, var(--accent-sky), var(--accent-vapor)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .float-label {
                    position: absolute; background: rgba(255,255,255,0.8); backdrop-filter: blur(4px);
                    padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.3);
                    font-family: 'Inter'; font-size: 10px; font-weight: 700; color: var(--text-main);
                    transform: translateZ(50px); pointer-events: none;
                }
            `}</style>

            {/* Aero Cursor */}
            <div id="cursor-drone" ref={cursorRef}>
                <div className="drone-blade"></div>
                <div className="drone-blade"></div>
                <div className="drone-core"></div>
            </div>

            {/* Vapor Background */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10"></canvas>

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 min-h-screen flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">

                    {/* Left: Typography */}
                    <div className="relative z-10 order-2 lg:order-1">
                        <div className="mb-8">
                            <span className="px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-widest">
                                {t('region_global_west')}
                            </span>
                        </div>

                        <h1 className="text-7xl md:text-9xl font-black text-slate-900 mb-8 leading-[0.85] tracking-tight display-font condense-text">
                            {t('scale_vertical').split(' ')[0]} <br />
                            <span className="gradient-text">{t('scale_vertical').split(' ')[1]}</span>
                        </h1>

                        <p className="text-xl text-slate-500 max-w-lg mb-12 font-light leading-relaxed condense-text" style={{ transitionDelay: '0.2s' }}>
                            {t('cloud_hero_desc')}
                        </p>

                        <div className="flex flex-wrap gap-4 condense-text" style={{ transitionDelay: '0.4s' }}>
                            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:bg-sky-600 transition-colors flex items-center gap-3">
                                {t('launch_instance')}
                            </button>
                            <div className="flex items-center gap-4 px-4 border-l border-slate-200">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-slate-900 display-font">99.99%</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">{t('sla_uptime')}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Monolith */}
                    <div className="relative z-10 order-1 lg:order-2 flex justify-center items-center h-full perspective-container" id="hero-interactive">
                        <div className="monolith-stage">
                            <div className="monolith" id="server-stack" ref={stackRef}>
                                {/* Server Blades injected by JS */}
                            </div>
                            {/* Floating Labels */}
                            <div className="float-label" style={{ top: '20%', right: '-20px' }}>{t('node_alpha')}</div>
                            <div className="float-label" style={{ bottom: '30%', left: '-40px' }}>{t('cooling_active')}</div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FEATURES (Liquid Cards) */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-end condense-text">
                    <div>
                        <h2 className="text-5xl font-bold text-slate-900 mb-4 display-font">{t('the_stack')}</h2>
                        <p className="text-slate-500 max-w-md">{t('stack_desc')}</p>
                    </div>
                    <div className="text-4xl text-sky-200 animate-bounce">
                        <i className="fa-solid fa-arrow-down"></i>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="cool-card group">
                        <div className="cool-card-inner">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-2xl mb-8">
                                    <i className="fa-solid fa-server"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 display-font">{t('elastic_compute')}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {t('elastic_compute_desc')}
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                                <span>{t('vcpu_up_to')}</span>
                                <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="cool-card group" style={{ transitionDelay: '100ms' }}>
                        <div className="cool-card-inner">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-8">
                                    <i className="fa-solid fa-database"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 display-font">{t('liquid_storage')}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {t('liquid_storage_desc')}
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                                <span>{t('latency_5ms')}</span>
                                <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="cool-card group" style={{ transitionDelay: '200ms' }}>
                        <div className="cool-card-inner">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-2xl mb-8">
                                    <i className="fa-solid fa-microchip"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 display-font">{t('neural_core')}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {t('neural_core_desc')}
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                                <span>{t('h100_clusters')}</span>
                                <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </section>




        </div>
    );
}
