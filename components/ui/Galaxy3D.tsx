"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Galaxy3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // --- 1. Starfield & Meteor Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Entities
        const stars: any[] = [];
        const meteors: any[] = [];

        // Init Stars (Static Background)
        for (let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        // Meteor Logic
        const spawnMeteor = () => {
            meteors.push({
                x: Math.random() * width + 200,      // Start slightly off-screen right
                y: Math.random() * height * 0.5 - 200, // Top half
                length: Math.random() * 80 + 40,     // Longer trails
                speed: Math.random() * 10 + 5,       // Visible speed
                angle: Math.PI / 4 + 0.1,            // Diagonal
                opacity: 1
            });
        };

        // Spawn loop
        const spawner = setInterval(() => {
            if (Math.random() > 0.6) spawnMeteor(); // 40% chance per tick
        }, 600);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            {/* 1. Draw Stars */ }
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${star.opacity})`; // Blue-500
                ctx.fill();
            });

            // 2. Draw Meteors (Cyan/Blue)
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];

                m.x -= m.speed;
                m.y += m.speed;
                m.opacity -= 0.005;

                // Trail Gradient: Transparent -> Cyan/Blue -> Transparent
                const gradient = ctx.createLinearGradient(m.x, m.y, m.x + m.length, m.y - m.length);
                gradient.addColorStop(0, "rgba(6, 182, 212, 0)"); // Cyan transparent
                gradient.addColorStop(0.5, `rgba(59, 130, 246, ${m.opacity})`); // Blue visible
                gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2.5;
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x + m.length, m.y - m.length);
                ctx.stroke();

                // Meteor Head
                ctx.beginPath();
                ctx.fillStyle = `rgba(6, 182, 212, ${m.opacity})`; // Cyan Head
                ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
                ctx.fill();

                if (m.opacity <= 0 || m.x < -100 || m.y > height + 100) {
                    meteors.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => {
            clearInterval(spawner);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-background overflow-hidden pointer-events-none"
            style={{ backgroundImage: 'var(--cool-mesh)' }}>

            {/* 2. System Container (Left Anchor) */}
            <div className="absolute top-1/2 left-[-250px] -translate-y-1/2 w-[1400px] h-[1400px]">

                {/* SUN */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full z-10"
                    style={{
                        background: "radial-gradient(circle at center, var(--surface) 20%, #E0F2FE 60%, transparent 100%)", // Sky-100 glow
                        boxShadow: "0 0 150px 50px rgba(56, 189, 248, 0.4)" // Sky-400 glow
                    }}
                />

                {/* ORBIT 1: Mercury */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-blue-200/40 rounded-full" style={{ transform: "rotateX(65deg)" }} />
                <OrbitingPlanet
                    radiusX={225} radiusY={225 * Math.cos(65 * Math.PI / 180)}
                    duration={20} size={24} color="#BAE6FD" // Sky-200
                />

                {/* ORBIT 2: Earth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-blue-200/30 rounded-full" style={{ transform: "rotateX(65deg)" }} />
                <OrbitingPlanet
                    radiusX={375} radiusY={375 * Math.cos(65 * Math.PI / 180)}
                    duration={40} size={48} color="#60A5FA" // Blue-400
                    type="terrestrial" hasMoon={true}
                />

                {/* ORBIT 3: Jupiter */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-blue-200/20 rounded-full" style={{ transform: "rotateX(65deg)" }} />
                <OrbitingPlanet
                    radiusX={550} radiusY={550 * Math.cos(65 * Math.PI / 180)}
                    duration={80} size={90} color="#E0E7FF" // Indigo-100
                    type="gasGiant"
                />

                {/* ORBIT 4: Saturn (The Ringed Giant) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] border border-blue-200/10 rounded-full" style={{ transform: "rotateX(65deg)" }} />
                <OrbitingPlanet
                    radiusX={750} radiusY={750 * Math.cos(65 * Math.PI / 180)}
                    duration={120} size={70} color="#BFDBFE" // Blue-200
                    type="ringed"
                />

            </div>

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none"></div>
        </div>
    );
}

// --- Helper: Planet + 3D Ring Renderer ---
function OrbitingPlanet({ radiusX, radiusY, duration, size, color, hasMoon = false, type = "standard" }: any) {
    return (
        <motion.div
            initial={{ x: radiusX, y: 0, zIndex: 20 }}
            animate={{
                x: [radiusX, 0, -radiusX, 0, radiusX],
                y: [0, radiusY, 0, -radiusY, 0],
                zIndex: [20, 30, 0, 0, 20],
                scale: [1, 1.2, 0.8, 0.8, 1]
            }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
            style={{ width: size, height: size, background: `radial-gradient(circle at 30% 30%, #FFFFFF, ${color})` }}
        >
            {/* 1. Atmospheric Bands (For Gas Giants) */}
            {type === "gasGiant" && (
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-50">
                    <div className="absolute top-[20%] w-full h-[10%] bg-slate-400/20 blur-[1px]" />
                    <div className="absolute top-[40%] w-full h-[15%] bg-slate-400/30 blur-[2px]" />
                    <div className="absolute top-[70%] w-full h-[8%] bg-slate-400/20 blur-[1px]" />
                </div>
            )}

            {/* 2. TRUE 3D RINGS (The Fix) */}
            {type === "ringed" && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[220%]"
                    style={{ perspective: "500px" }} // Perspective container for the ring
                >
                    {/* The Ring Disc */}
                    <div
                        className="w-full h-full rounded-full border-[12px] border-slate-300/30 border-t-slate-400/60 shadow-inner"
                        style={{
                            transform: "rotateX(75deg) rotateY(10deg)", // Extreme tilt for 3D depth
                            boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)" // Inner shadow for thickness
                        }}
                    />
                </div>
            )}

            {/* 3. Moons */}
            {hasMoon && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] rounded-full border border-slate-400/20"
                >
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-slate-400 rounded-full -translate-x-1/2" />
                </motion.div>
            )}

            {/* 4. Multiple Moons for Giant */}
            {type === "gasGiant" && (
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full border border-slate-300/10">
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-slate-300 rounded-full" />
                </motion.div>
            )}
        </motion.div>
    );
}
