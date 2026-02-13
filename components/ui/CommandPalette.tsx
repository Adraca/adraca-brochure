"use client";
import React, { useState, useEffect } from "react";
import { Search, Command, ArrowRight, Hash, Globe, FileText, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const quickLinks = [
    { name: "Whitepapers", href: "/whitepaper", icon: <FileText size={16} /> },
    { name: "Industries", href: "/industries", icon: <Globe size={16} /> },
    { name: "Blog Stream", href: "/blog", icon: <Zap size={16} /> },
    { name: "Careers", href: "/careers", icon: <Hash size={16} /> }
];

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const allItems = [
        ...quickLinks,
        { name: "Retail Intelligence", href: "/industries/retail", icon: <Globe size={16} /> },
        { name: "Consumer Goods", href: "/industries/consumer-goods", icon: <Globe size={16} /> },
        { name: "Data Migration", href: "/products/data-migration", icon: <Zap size={16} /> },
        { name: "Licensing", href: "/licensing", icon: <FileText size={16} /> },
        { name: "Contact Sales", href: "/contact", icon: <Hash size={16} /> },
        { name: "Sovereign Cloud", href: "/products/sovereign-cloud", icon: <Zap size={16} /> }
    ];

    const filteredItems = allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command Palette"
                    >
                        <div className="flex items-center px-6 py-4 border-b border-slate-100">
                            <Search className="text-slate-400 mr-4" size={20} />
                            <input
                                autoFocus
                                placeholder="Neural Query: Search through the Adraca Mesh..."
                                className="w-full bg-transparent border-none outline-none text-slate-800 font-medium placeholder:text-slate-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search commands"
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-400">
                                <Command size={10} /> K
                            </div>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
                                {searchQuery ? "Search Results" : "Quick Navigation"}
                            </p>
                            <div className="grid grid-cols-1 gap-1">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((link) => (
                                        <Link
                                            key={link.name} href={link.href}
                                            onClick={() => { setOpen(false); setSearchQuery(""); }}

                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-4 text-slate-600 group-hover:text-blue-600 transition-colors">
                                                {link.icon}
                                                <span className="font-semibold text-sm">{link.name}</span>
                                            </div>
                                            <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-slate-400 text-sm">
                                        No results found for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-50 px-6 py-3 text-[10px] font-mono text-slate-400 border-t border-slate-100">
                            SECURE UPLINK ACTIVE // PRESS ESC TO EXIT
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
