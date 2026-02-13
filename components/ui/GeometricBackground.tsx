"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function GeometricBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement
    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Handle mouse move
    useEffect(() => {
        let ticking = false;
        let lastEvent: MouseEvent | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            lastEvent = e;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (lastEvent) {
                        const { innerWidth, innerHeight } = window;
                        mouseX.set((lastEvent.clientX / innerWidth) * 2 - 1);
                        mouseY.set((lastEvent.clientY / innerHeight) * 2 - 1);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax Transforms for different layers
    const x1 = useTransform(springX, [-1, 1], [-50, 50]);
    const y1 = useTransform(springY, [-1, 1], [-50, 50]);

    const x2 = useTransform(springX, [-1, 1], [30, -30]); // Moves opposite
    const y2 = useTransform(springY, [-1, 1], [30, -30]);

    const rotate = useTransform(springX, [-1, 1], [-5, 5]);

    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-background overflow-hidden">

            {/* 1. The Technical Grid (Base Layer) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* 2. Primary Shape: Large Abstract Glass Prism (Top Right) */}
            <motion.div
                style={{ x: x1, y: y1, rotate: rotate }}
                animate={{
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-30"
            >
                {/* SVG Polygon */}
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#F1F5F9" d="M45.7,-70.5C58.9,-62.5,69.3,-51.2,76.5,-38.5C83.6,-25.8,87.6,-11.7,85.7,1.8C83.9,15.4,76.2,28.3,66.8,39.2C57.4,50.1,46.3,58.9,34.4,65.3C22.5,71.7,9.8,75.7,-1.8,78.2C-13.5,80.7,-24,81.7,-34.5,76.7C-45,71.7,-55.5,60.7,-64.1,48.5C-72.7,36.3,-79.4,22.9,-80.5,9.2C-81.6,-4.5,-77.2,-18.5,-69.5,-30.7C-61.9,-42.9,-51,-53.4,-39.3,-62.2C-27.6,-71,-15,-78.2,-1.2,-76.5C12.6,-74.9,25.2,-64.3,32.5,-78.5Z" transform="translate(100 100)" />
                </svg>
            </motion.div>

            {/* 3. Secondary Shape: Floating Triangle (Bottom Left) */}
            <motion.div
                style={{ x: x2, y: y2 }}
                animate={{
                    y: [0, -40, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[40%] -left-20 w-[500px] h-[500px] opacity-20"
            >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="url(#grad1)" d="M41.5,-48.8C54.4,-38.5,66,-27.1,70.5,-13.3C75,0.5,72.4,16.7,64.2,30.5C56,44.3,42.2,55.8,27.2,62.3C12.2,68.8,-4,70.3,-19.6,66.5C-35.2,62.7,-50.2,53.6,-60.8,40.7C-71.4,27.8,-77.6,11.1,-74.6,-4.2C-71.6,-19.5,-59.4,-33.4,-47.1,-43.8C-34.8,-54.2,-22.4,-61.1,-9.5,-61.2C3.4,-61.3,16.3,-54.6,28.6,-59.1L41.5,-48.8Z" transform="translate(100 100)" />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#2563EB', stopOpacity: 0.2 }} />
                            <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 0.1 }} />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* 4. Accent Lines: Thin geometric lines (Center) */}
            <motion.div
                style={{ x: x1 }}
                className="absolute top-1/4 left-1/4 w-full h-full pointer-events-none"
            >
                <div className="absolute top-20 left-20 w-32 h-32 border border-slate-200 rounded-full opacity-40"></div>
                <div className="absolute top-40 left-40 w-16 h-16 border border-azure/20 rotate-45 opacity-60"></div>
            </motion.div>

        </div>
    );
}
