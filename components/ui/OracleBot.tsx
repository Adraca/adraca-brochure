"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, MessageSquare, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Protocol = {
    id: string;
    name: string;
    shortName: string;
    valueHook: string;
    color: string;
};

const PROTOCOLS: Protocol[] = [
    {
        id: 'dora',
        name: 'Finance (DORA)',
        shortName: 'DORA',
        valueHook: 'Our DORA engine handles sub-10ms interdiction for real-time fraud detection.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'ehds',
        name: 'Health (EHDS)',
        shortName: 'EHDS',
        valueHook: 'Our privacy enclave ensures GDPR compliance without compromising research velocity.',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        id: 'cgs',
        name: 'Retail (CGS/Velocity Sync)',
        shortName: 'CGS',
        valueHook: 'Our real-time shelf intelligence synchronizes demand across channels in milliseconds.',
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'espr',
        name: 'Supply Chain (ESPR)',
        shortName: 'ESPR',
        valueHook: 'Our product passport blockchain creates immutable compliance trails for circular economy tracking.',
        color: 'from-orange-500 to-red-500'
    },
    {
        id: 'audit',
        name: 'Fintech (Audit Ledger)',
        shortName: 'Audit Ledger',
        valueHook: 'Our deterministic audit system provides cryptographic proof of every transaction.',
        color: 'from-indigo-500 to-purple-500'
    },
    {
        id: 'catena',
        name: 'Automotive (Catena-X)',
        shortName: 'Catena-X',
        valueHook: 'Our sovereign data space enables secure multi-party computation without data exposure.',
        color: 'from-slate-500 to-zinc-500'
    }
];

type Stage = 'greeting' | 'value-hook' | 'confirm';

export default function SovereignValidatorBot() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [stage, setStage] = useState<Stage>('greeting');
    const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

    const handleProtocolSelect = (protocol: Protocol) => {
        setSelectedProtocol(protocol);
        setStage('value-hook');
    };

    const handleConnectArchitect = () => {
        if (selectedProtocol) {
            // Navigate to contact page with pre-populated data
            const params = new URLSearchParams({
                subject: 'Strategy Audit',
                message: `I'm interested in a Strategy Audit for ${selectedProtocol.shortName}.`
            });
            router.push(`/contact?${params.toString()}`);
            setIsOpen(false);
            // Reset state
            setTimeout(() => {
                setStage('greeting');
                setSelectedProtocol(null);
            }, 300);
        }
    };

    const handleBack = () => {
        setStage('greeting');
        setSelectedProtocol(null);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setStage('greeting');
            setSelectedProtocol(null);
        }, 300);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[900] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[90vw] md:w-96 bg-slate-950/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="sovereign-title"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                <span id="sovereign-title" className="text-xs font-bold uppercase tracking-widest text-cyan-400">Sovereign Validator</span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="hover:bg-white/10 p-1 rounded-full transition-colors"
                                aria-label="Close chat"
                            >
                                <X size={16} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 min-h-[400px] flex flex-col">
                            {stage === 'greeting' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Greeting */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Sparkles size={20} className="text-cyan-400" />
                                            <h3 className="text-lg font-bold text-white">Sovereign Validator Assistant</h3>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            Which 2026 regulatory protocol shall we simulate?
                                        </p>
                                        <p className="text-xs text-slate-500 italic border-l-2 border-cyan-500/30 pl-3">
                                            Founded on IIT PhD research in computational sovereignty and deterministic systems.
                                        </p>
                                    </div>

                                    {/* Protocol Menu */}
                                    <div className="grid grid-cols-1 gap-2">
                                        {PROTOCOLS.map((protocol, index) => (
                                            <motion.button
                                                key={protocol.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => handleProtocolSelect(protocol)}
                                                className="group relative overflow-hidden bg-slate-900/50 hover:bg-slate-800/70 border border-slate-700/50 hover:border-cyan-500/50 rounded-xl p-4 text-left transition-all"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-r ${protocol.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                                <div className="relative flex items-center justify-between">
                                                    <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                        {protocol.name}
                                                    </span>
                                                    <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {stage === 'value-hook' && selectedProtocol && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6 flex flex-col h-full"
                                >
                                    {/* Protocol Header */}
                                    <div className="space-y-2">
                                        <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${selectedProtocol.color} text-white text-xs font-bold`}>
                                            {selectedProtocol.shortName}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{selectedProtocol.name}</h3>
                                    </div>

                                    {/* Value Hook */}
                                    <div className="flex-1 space-y-4">
                                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-cyan-500/20 rounded-xl p-5">
                                            <p className="text-slate-200 text-sm leading-relaxed">
                                                {selectedProtocol.valueHook}
                                            </p>
                                        </div>

                                        {/* Conversion Prompt */}
                                        <div className="space-y-3">
                                            <p className="text-sm text-slate-300">
                                                Shall I connect you with our <span className="font-bold text-cyan-400">Senior Architect</span> for a Strategy Audit?
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="space-y-2">
                                                <button
                                                    onClick={handleConnectArchitect}
                                                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20"
                                                >
                                                    <span>Yes, connect me</span>
                                                    <ArrowRight size={16} />
                                                </button>
                                                <button
                                                    onClick={handleBack}
                                                    className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                                                >
                                                    <ArrowLeft size={14} />
                                                    <span className="text-sm">Select different protocol</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-slate-900 border border-cyan-500/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] relative overflow-hidden group"
                    aria-label="Open Sovereign Validator Assistant"
                    aria-expanded={isOpen}
                    aria-haspopup="dialog"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <MessageSquare size={20} className="text-cyan-400 relative z-10" />
                </motion.button>
            )}
        </div>
    );
}
