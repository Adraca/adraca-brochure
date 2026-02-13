"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export default function CosmicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Star Configuration
        const starCount = 150;
        const connectionDistance = 100;
        const mouseRepelRadius = 150;

        // Star Object
        interface Star {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }

        const stars: Star[] = [];
        const mouse = { x: -1000, y: -1000 };

        // Initialize Stars
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2, // Slow drift
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2,
            });
        }

        // Handle Resize
        const handleResize = debounce(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, 200);
        window.addEventListener("resize", handleResize);

        // Handle Mouse
        let clientX = -1000;
        let clientY = -1000;
        let ticking = false;

        const updateMouse = () => {
            mouse.x = clientX;
            mouse.y = clientY;
            ticking = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            clientX = e.clientX;
            clientY = e.clientY;

            if (!ticking) {
                window.requestAnimationFrame(updateMouse);
                ticking = true;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update & Draw Stars
            stars.forEach((star, i) => {
                // Move
                star.x += star.vx;
                star.y += star.vy;

                // Bounce off edges
                if (star.x < 0 || star.x > width) star.vx *= -1;
                if (star.y < 0 || star.y > height) star.vy *= -1;

                // Mouse Interaction (Repulsion/Attraction)
                const dx = mouse.x - star.x;
                const dy = mouse.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRepelRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseRepelRadius - distance) / mouseRepelRadius;
                    // Gently push away
                    star.vx -= forceDirectionX * force * 0.05;
                    star.vy -= forceDirectionY * force * 0.05;
                }

                // Draw Star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(100, 116, 139, 0.5)"; // Slate-500 color
                ctx.fill();

                // Draw Constellation Lines (if close to neighbors)
                for (let j = i + 1; j < stars.length; j++) {
                    const other = stars[j];
                    const distX = star.x - other.x;
                    const distY = star.y - other.y;
                    const dist = Math.sqrt(distX * distX + distY * distY);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(100, 116, 139, ${0.1 - dist / connectionDistance * 0.1})`;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#F8FAFC] overflow-hidden">

            {/* 1. The Planets (Background Layer) */}

            {/* Planet 1: Large Azure Gas Giant (Top Left) */}
            <motion.div
                animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/50 to-blue-300/20 blur-[80px]"
            />

            {/* Planet 2: Small Violet Moon (Bottom Right) */}
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-100/50 to-pink-300/20 blur-[60px]"
            />

            {/* 2. The Stars (Interactive Canvas Layer) */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        </div>
    );
}
