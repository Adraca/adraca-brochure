"use client";
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "@/components/ui/Navbar";
import { cmtPageData } from '@/data/industries/cmt';
import Link from 'next/link';

export default function CMTPage() {
    // Refs
    const waveCanvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const tunerRingRef = useRef<HTMLDivElement>(null);
    const visContainerRef = useRef<HTMLDivElement>(null);

    const { hero, solutions } = cmtPageData;

    // State
    const [signalColor, setSignalColor] = useState('#8b5cf6'); // Default Violet
    const [activeChannel, setActiveChannel] = useState('5g');

    // --- 1. Signal Wave Canvas ---
    useEffect(() => {
        const canvas = waveCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        let time = 0;
        let animationId: number;
        const mouse = { x: -1000, y: -1000 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const drawWave = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = signalColor; // Use state color
            ctx.lineWidth = 1;
            const lines = 20;
            const gap = height / lines;
            const waveFrequency = activeChannel === '5g' ? 0.01 : (activeChannel === 'media' ? 0.02 : 0.005);

            for (let i = 0; i < lines; i++) {
                ctx.beginPath();
                const yBase = i * gap + gap / 2;
                for (let x = 0; x < width; x += 10) {
                    const dx = x - mouse.x;
                    const dy = yBase - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const mouseAmp = Math.max(0, (300 - dist) / 5);
                    const y = yBase + Math.sin(x * waveFrequency + time + i) * (20 + mouseAmp);
                    ctx.globalAlpha = 0.1 + (mouseAmp / 100);
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            time += 0.05;
            animationId = requestAnimationFrame(drawWave);
        };

        window.addEventListener('resize', resize);
        const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        drawWave();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [signalColor, activeChannel]);

    // --- 2. Frequency Cursor & Scroll Reveal ---
    useEffect(() => {
        const cursor = cursorRef.current;
        const tunerRing = tunerRingRef.current;
        if (!cursor || !tunerRing) return;

        const numBars = 12;
        if (tunerRing.childElementCount === 0) {
            for (let i = 0; i < numBars; i++) {
                const bar = document.createElement('div');
                bar.className = 'freq-bar';
                bar.style.transform = `rotate(${i * (360 / numBars)}deg) translateY(-25px)`;
                bar.style.backgroundColor = signalColor;
                tunerRing.appendChild(bar);
            }
        }
        const bars = tunerRing.querySelectorAll('.freq-bar') as NodeListOf<HTMLElement>;
        bars.forEach(bar => bar.style.backgroundColor = signalColor);

        let lastX = 0, lastY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            const dist = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);
            const scale = Math.min(dist / 2, 5);
            bars.forEach((bar) => {
                const jitter = Math.random() * scale * 5;
                bar.style.height = `${4 + jitter}px`;
                bar.style.backgroundColor = signalColor;
            });
            if (dist > 2) document.body.classList.add('hovering');
            else document.body.classList.remove('hovering');
            lastX = e.clientX; lastY = e.clientY;
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [signalColor]);

    const handleSetChannel = (channel: string) => {
        const colors: { [key: string]: string } = { '5g': '#8b5cf6', 'media': '#f472b6', 'cloud': '#06b6d4' };
        setSignalColor(colors[channel]);
        setActiveChannel(channel);
        document.documentElement.style.setProperty('--signal-color', colors[channel]);
    };

    return (
        <div className="font-sans text-slate-900 dark:text-white bg-[#F8FAFC] dark:bg-slate-950 overflow-x-hidden min-h-screen selection:bg-violet-100 selection:text-violet-900 dark:selection:bg-violet-900 dark:selection:text-violet-100 transition-colors duration-500">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Space+Grotesk:wght@300;500;700&display=swap');
                :root { --signal-color: ${signalColor}; }
                body { cursor: none; }
                .grotesk { font-family: 'Space Grotesk', sans-serif; }
                #wave-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 1; }
                #cursor-tuner { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); display: flex; justify-content: center; align-items: center; }
                .tuner-ring { width: 40px; height: 40px; border: 1px solid #0f172a; border-radius: 50%; position: absolute; }
                .freq-bar { position: absolute; background: var(--signal-color); width: 2px; height: 6px; border-radius: 2px; transform-origin: center 25px; }
                .cursor-dot { width: 4px; height: 4px; background: #0f172a; border-radius: 50%; z-index: 10; }
                /* Dark Mode Cursor */
                :global(.dark) .tuner-ring { border-color: #f8fafc; }
                :global(.dark) .cursor-dot { background: #f8fafc; }
                
                body.hovering .tuner-ring { width: 60px; height: 60px; border-color: var(--signal-color); border-width: 2px; }
                
                /* Tower CSS */
                .tower-stage { width: 300px; height: 400px; perspective: 1000px; position: relative; }
                .tower-assembly { width: 100%; height: 100%; position: absolute; transform-style: preserve-3d; animation: tower-float 6s ease-in-out infinite; }
                .spire { position: absolute; left: 50%; bottom: 50px; width: 4px; height: 200px; background: linear-gradient(to top, #e2e8f0, var(--signal-color)); transform: translateX(-50%); box-shadow: 0 0 20px var(--signal-color); }
                :global(.dark) .spire { background: linear-gradient(to top, #1e293b, var(--signal-color)); }

                .signal-ring { position: absolute; left: 50%; bottom: 150px; width: 100px; height: 100px; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 50%; transform: translateX(-50%) rotateX(70deg); transform-style: preserve-3d; }
                .dish { position: absolute; width: 60px; height: 60px; background: rgba(255,255,255,0.8); border: 1px solid white; backdrop-filter: blur(4px); border-radius: 50%; transform-style: preserve-3d; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                :global(.dark) .dish { background: rgba(30, 41, 59, 0.8); border-color: #334155; }

                .sr-1 { width: 200px; height: 200px; animation: broadcast 3s infinite linear; }
                .sr-2 { width: 150px; height: 150px; animation: broadcast 3s infinite linear 1s; }
                .sr-3 { width: 100px; height: 100px; animation: broadcast 3s infinite linear 2s; }
                .d-1 { top: 20%; left: 0%; transform: translateZ(50px) rotateY(30deg); animation: float-dish 5s infinite ease-in-out; }
                .d-2 { top: 40%; right: 0%; transform: translateZ(-50px) rotateY(-30deg); animation: float-dish 7s infinite ease-in-out reverse; }
                .d-3 { top: 10%; right: 20%; width: 40px; height: 40px; transform: translateZ(80px); animation: float-dish 6s infinite ease-in-out 1s; }
                @keyframes broadcast { 0% { transform: translateX(-50%) rotateX(70deg) scale(0.5); opacity: 1; border-color: var(--signal-color); } 100% { transform: translateX(-50%) rotateX(70deg) scale(2); opacity: 0; } }
                @keyframes tower-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                @keyframes float-dish { 0%, 100% { transform: translateY(0) rotateY(30deg); } 50% { transform: translateY(-10px) rotateY(35deg); } }

                /* Holo Cards */
                .holo-card { position: relative; background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.9); border-radius: 24px; padding: 2.5rem; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; transform-style: preserve-3d; }
                :global(.dark) .holo-card { background: rgba(15, 23, 42, 0.6); border-color: rgba(51, 65, 85, 0.5); }
                
                .holo-content { position: relative; z-index: 2; transition: transform 0.2s; }
                .holo-layer { position: absolute; inset: 0; padding: 2.5rem; background: transparent; opacity: 0; pointer-events: none; mix-blend-mode: multiply; transition: transform 0.1s, opacity 0.2s; display: flex; flex-direction: column; justify-content: space-between; }
                :global(.dark) .holo-layer { mix-blend-mode: screen; }

                .hl-red { color: rgba(255, 0, 0, 0.8); z-index: 1; }
                .hl-blue { color: rgba(0, 255, 255, 0.8); z-index: 1; }
                .holo-card:hover { transform: translateY(-5px); box-shadow: 0 30px 60px -15px rgba(139, 92, 246, 0.15); border-color: var(--signal-color); }
                .holo-card:hover .hl-red { opacity: 0.4; transform: translate(-2px, -1px); }
                .holo-card:hover .hl-blue { opacity: 0.4; transform: translate(2px, 1px); }
                
                .gradient-text { background: linear-gradient(135deg, #0f172a, var(--signal-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .dark .gradient-text { background: linear-gradient(135deg, #ffffff, var(--signal-color)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
                
                .reveal-up { opacity: 1; transform: translateY(0); } /* Simplified reveal for now */
            `}</style>

            <div id="cursor-tuner" ref={cursorRef}><div className="tuner-ring" ref={tunerRingRef}></div><div className="cursor-dot" ref={cursorDotRef}></div></div>
            <canvas id="wave-canvas" ref={waveCanvasRef}></canvas>
            <Navbar />

            {/* HERO */}
            <section className="relative pt-40 pb-20 min-h-screen flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
                    <div className="relative z-10 order-2 lg:order-1">
                        <div className="flex items-center gap-3 mb-8"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span><span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{hero.badge}</span></div>
                        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 leading-[0.9] tracking-tighter grotesk">
                            The Backbone of <br /><span className="gradient-text">Digital Media.</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mb-12 font-light leading-relaxed">{hero.subhead}</p>

                        {/* Channel Selector */}
                        <div className="mb-10">
                            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Select Domain</div>
                            <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-full p-1 relative">
                                <div className="absolute top-1 bottom-1 rounded-full transition-all duration-300"
                                    style={{ backgroundColor: signalColor, width: '80px', left: activeChannel === '5g' ? '4px' : (activeChannel === 'media' ? '88px' : '172px') }} />
                                {['5g', 'media', 'cloud'].map((ch) => (
                                    <button key={ch} onClick={() => handleSetChannel(ch)} className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase transition-colors ${activeChannel === ch ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>{ch}</button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact?subject=CMT_Infrastructure_Audit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2 group">
                                {hero.ctaText} <i className="fa-solid fa-wave-square ml-2 group-hover:animate-pulse"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="relative z-10 order-1 lg:order-2 flex justify-center items-center h-full">
                        <div className="tower-stage">
                            <div className="tower-assembly">
                                <div className="spire"></div>
                                <div className="signal-ring sr-1"></div><div className="signal-ring sr-2"></div><div className="signal-ring sr-3"></div>
                                <div className="dish d-1 flex items-center justify-center text-slate-300 dark:text-slate-600 text-2xl"><i className="fa-solid fa-satellite"></i></div>
                                <div className="dish d-2 flex items-center justify-center text-slate-300 dark:text-slate-600 text-xl"><i className="fa-solid fa-wifi"></i></div>
                                <div className="dish d-3 flex items-center justify-center text-slate-300 dark:text-slate-600 text-sm"><i className="fa-solid fa-cloud"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOLO CARDS */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 grotesk">Sovereign CMT Stack</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md">Hard engineering for high-bandwidth, high-trust networks.</p>
                </div>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    {solutions.map((sol, i) => (
                        <div key={sol.id} className="holo-card reveal-up group" style={{ transitionDelay: `${i * 100}ms` }}>
                            <div className="holo-layer hl-red">
                                <i className="fa-solid fa-microchip text-4xl mb-6"></i>
                                <h3 className="text-2xl font-bold mb-2">{sol.title}</h3>
                            </div>
                            <div className="holo-layer hl-blue">
                                <i className="fa-solid fa-microchip text-4xl mb-6"></i>
                                <h3 className="text-2xl font-bold mb-2">{sol.title}</h3>
                            </div>
                            <div className="holo-content h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-2xl mb-6 text-slate-700 dark:text-slate-300">
                                        <i className={`fa-solid ${i === 0 ? 'fa-bolt' : i === 1 ? 'fa-shield-halved' : 'fa-server'}`}></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 grotesk">{sol.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{sol.description}</p>
                                </div>
                                <div className="pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{sol.subtitle}</span>
                                    <Link href={sol.blueprintLink}><i className="fa-solid fa-arrow-right text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform"></i></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
