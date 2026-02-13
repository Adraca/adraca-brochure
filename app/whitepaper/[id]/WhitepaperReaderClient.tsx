"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, Download, Hash, Shield, Calendar, Eye, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";
import { whitepapers } from "@/utils/whitepapers";

const processTextWithCitations = (text: string) => {
    // Split by URLs first
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
        if (part.match(/^https?:\/\//)) {
            return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{part}</a>;
        }

        // Then split by citation pattern (.NUMBER)
        // We look for dot followed by digits
        const fragments = part.split(/(\.\d+)/g);

        return fragments.map((frag, j) => {
            const citationMatch = frag.match(/^\.(\d+)$/);
            if (citationMatch) {
                // Check if previous fragment ended with a digit
                const prev = fragments[j - 1];
                if (prev && /\d$/.test(prev)) {
                    return <span key={`${i}-${j}`}>{frag}</span>;
                }

                const num = citationMatch[1];
                return (
                    <span key={`${i}-${j}`}>
                        .<sup><a href={`#ref-${num}`} className="text-blue-500 hover:text-blue-700 font-bold ml-0.5">{num}</a></sup>
                    </span>
                );
            }
            return <span key={`${i}-${j}`}>{frag}</span>;
        });
    });
};

export default function WhitepaperReaderClient() {
    const { t } = useLanguage();
    const params = useParams();
    const [progress, setProgress] = useState(0);

    // Find the paper
    const paper = whitepapers.find(p => p.id === params.id);

    // Parse sections from dynamic content
    // The content is now an array of { title: string, content: string[] }
    // We cast it to any because we changed the schema
    const sections = (paper?.content as any) || [];

    // Scroll Progress Logic
    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress((window.scrollY / total) * 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!paper) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Document not found within the vault.</div>;
    }

    // Handle Copy to Clipboard
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here, but for now just simple action
    };

    // Handle Print
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-background text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-100 selection:text-cyan-900 dark:selection:bg-cyan-900 dark:selection:text-cyan-100 transition-colors duration-500">

            {/* --- PRINT ONLY HEADER (Branding) --- */}
            <div className="hidden print-only-header">
                <div className="text-2xl font-bold tracking-widest text-slate-900">ADRACA AI</div>
                <div className="text-sm text-slate-500 uppercase">Sovereign Intelligence • Confidential</div>
            </div>

            {/* --- EFFECT 1: Circuit Grid Background --- */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-[-1]"
                style={{ backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-white via-transparent to-white dark:from-slate-950 dark:via-transparent dark:to-slate-950 opacity-80 z-[-1]"></div>

            {/* Reading Progress Bar (Top) */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 z-[60] transition-all duration-100 progress-bar-container" style={{ width: `${progress}%` }} />

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

                {/* LEFT: Metadata Sidebar (Sticky) */}
                <aside className="lg:col-span-3 lg:h-[calc(100vh-100px)] lg:sticky lg:top-32 flex flex-col gap-8 no-print">
                    <Link href="/whitepaper" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest group">
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t('return_to_vault')}
                    </Link>

                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex justify-between items-center">
                            <span>{t('document_data')}</span>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <Hash size={16} className="text-blue-500" />
                                <span className="font-mono text-xs font-bold">{paper.id.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <Shield size={16} className="text-blue-500" />
                                <span className="font-mono text-xs font-bold">{t('clearance_sovereign')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <Calendar size={16} className="text-blue-500" />
                                <span className="font-mono text-xs font-bold">{paper.date.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <Eye size={16} className="text-blue-500" />
                                <span className="font-mono text-xs font-bold flex items-center gap-2">
                                    {paper.readTime} <span className="text-[10px] text-emerald-500 animate-pulse">● {t('live')}</span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handlePrint}
                                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 group"
                            >
                                <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" /> {t('download_encrypted_pdf')} <span className="opacity-50 text-[10px]">({paper.downloadSize})</span>
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Table of Contents */}
                    <nav className="hidden lg:block pl-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 bg-background/95 backdrop-blur z-10 py-2 sticky top-0">{t('navigation_index')}</div>
                        <ul className="space-y-1 border-l border-slate-200 dark:border-slate-800 ml-1 font-mono text-xs">
                            {sections.filter((s: any, i: number) => !(!s.title || s.title.trim() === "" || (i === 0 && paper.title && s.title.toLowerCase().includes(paper.title.toLowerCase().substring(0, 20))))).map((section: any, index: number) => {
                                // Filter Logic moved inside map but essentially we skip invalid
                                if (!section.title || section.title.trim() === "") return null;
                                if (index === 0 && paper.title && section.title.toLowerCase().includes(paper.title.toLowerCase().substring(0, 20))) return null;

                                const numberMatch = section.title.match(/^(\d+(\.\d+)*)/);

                                // Proper sequencing logic requires a pre-filtered list, checking index here is naive.
                                // However, to minimize refactor risk without validation, we try to use the title number.
                                // If index is used, we format it nicely.
                                let displayNumber = numberMatch ? numberMatch[1] : (index + 1).toString().padStart(2, '0');

                                // Filter out likely page numbers (e.g. "835 Works Cited") or Addendums
                                if ((parseInt(displayNumber) > 50 && !displayNumber.includes('.')) || section.title.toLowerCase().includes('addendum')) {
                                    displayNumber = "";
                                }

                                const displayTitle = numberMatch ? section.title.replace(/^[\d\.]+\s*/, '') : section.title;
                                const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                const indentLevel = displayNumber.includes('.') ? displayNumber.split('.').length - 1 : 0;

                                return (
                                    <li key={index}>
                                        <a href={`#${id}`} className={`block py-2 text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:border-l-2 hover:border-blue-600 hover:-ml-[2px] transition-all truncate ${indentLevel > 0 ? 'pl-' + (4 + indentLevel * 2) : 'pl-4'}`} title={section.title}>
                                            <span className="text-slate-400 dark:text-slate-500 mr-2 font-bold opacity-70">{displayNumber}</span> {displayTitle}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* RIGHT: The Paper (Content) */}
                <motion.article
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="lg:col-span-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-3xl p-8 md:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent fixed-effect"></div>

                    {/* Cover Page Image (Top) */}
                    {paper.coverImage && (
                        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200 dark:border-slate-800 max-w-sm mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src={paper.coverImage}
                                alt={paper.title}
                                width={paper.coverImageWidth || 1024}
                                height={paper.coverImageHeight || 1024}
                                priority
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    <header className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-12">
                        <div className="flex items-center justify-between mb-6">
                            <span className="inline-block px-3 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800/50">
                                {paper.category}
                            </span>
                            <Cpu size={20} className="text-slate-300 dark:text-slate-600 animate-spin-slow no-print" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                            {paper.title}
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-serif leading-relaxed italic pl-6 border-l-4 border-blue-200 dark:border-blue-800">
                            &quot;{paper.summary}&quot;
                        </p>
                    </header>

                    <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl">

                        {sections.map((section: any, idx: number) => {
                            if (!section.title && (!section.content || section.content.length === 0)) return null;
                            if (idx === 0 && paper.title && section.title && section.title.toLowerCase().includes(paper.title.toLowerCase().substring(0, 20))) return null;

                            const numberMatch = section.title ? section.title.match(/^(\d+(\.\d+)*)/) : null;
                            let displayNumber = numberMatch ? numberMatch[1] : `0${idx + 1}`;
                            const isReferenceSection = section.title && (section.title.toLowerCase().includes('works cited') || section.title.toLowerCase().includes('references') || section.title.toLowerCase().includes('bibliography'));

                            // Filter out "835" etc or Addendums
                            if ((parseInt(displayNumber) > 50 && !displayNumber.includes('.')) || section.title.toLowerCase().includes('addendum')) {
                                displayNumber = "";
                            }

                            const displayTitle = numberMatch ? section.title.replace(/^[\d\.]+\s*/, '') : section.title;
                            const id = section.title ? section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `section-${idx}`;

                            return (
                                <div key={idx} className="mb-12">
                                    {section.title && (
                                        <h3 id={id} className={`scroll-mt-32 flex items-center gap-2 text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 ${isReferenceSection ? 'text-base uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2' : ''}`}>
                                            {!isReferenceSection && displayNumber && <span className="text-blue-500 font-mono text-sm opacity-50">{displayNumber}</span>} {displayTitle}
                                        </h3>
                                    )}

                                    {section.content.map((item: any, cIdx: number) => {
                                        // 0. Lists (New)
                                        if (item.type === 'list') {
                                            return (
                                                <ol key={cIdx} start={1} className="list-decimal pl-5 space-y-3 mb-8 ml-4 marker:text-slate-400 marker:font-bold">
                                                    {item.items.map((li: string, i: number) => {
                                                        const linkedText = li.split(/(https?:\/\/[^\s]+)/g).map((part: string, pi: number) =>
                                                            part.match(/^https?:\/\//) ? <a key={pi} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{part}</a> : part
                                                        );
                                                        return (
                                                            <li key={i} id={isReferenceSection ? `ref-${i + 1}` : undefined} className="pl-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed scroll-mt-32">
                                                                {linkedText}
                                                            </li>
                                                        );
                                                    })}
                                                </ol>
                                            );
                                        }

                                        // 1. Paragraphs (Objects)
                                        if (item.type === 'paragraph') {
                                            const pClass = isReferenceSection ? "mb-2 text-sm text-slate-500 dark:text-slate-400 leading-snug" : "mb-4 text-slate-600 dark:text-slate-300 leading-relaxed";
                                            return <p key={cIdx} className={pClass}>{processTextWithCitations(item.text)}</p>;
                                        }

                                        // 1. Strings (Paragraphs)
                                        if (typeof item === 'string') {
                                            // Smaller text for References
                                            const pClass = isReferenceSection ? "mb-2 text-sm text-slate-500 dark:text-slate-400 leading-snug" : "mb-4 text-slate-600 dark:text-slate-300 leading-relaxed";
                                            return <p key={cIdx} className={pClass}>{processTextWithCitations(item)}</p>;
                                        }

                                        // 2. Code Blocks
                                        if (item.type === 'code') {
                                            const code = item.text;
                                            // ... syntax highlight logic (same as before) ...
                                            const highlighted = code.split(/(\n)/).map((line: string, i: number) => {
                                                if (line === '\n') return '\n';
                                                if (line.trim().startsWith('#') || line.trim().startsWith('//')) return <span key={i} className="text-emerald-600 dark:text-emerald-500 italic">{line}</span>;
                                                const keyMatch = line.match(/^(\s*)([\w\-\_]+)(:)(.*)/);
                                                if (keyMatch) return (<span key={i}>{keyMatch[1]}<span className="text-sky-600 dark:text-cyan-400 font-bold">{keyMatch[2]}</span><span className="text-slate-400">{keyMatch[3]}</span>{keyMatch[4]}</span>);
                                                const parts = line.split(/(\b(?:version|services|image|container_name|restart|ports|environment|deploy|resources|reservations|devices|volumes|const|import|from|return|function|class|def)\b)/g);
                                                return <span key={i}>{parts.map((part, pIdx) => (/^(version|services|image|container_name|restart|ports|environment|deploy|resources|reservations|devices|volumes|const|import|from|return|function|class|def)$/.test(part) ? <span key={pIdx} className="text-purple-600 dark:text-purple-400 font-bold">{part}</span> : part))}</span>;
                                            });

                                            return (
                                                <div key={cIdx} className="bg-slate-50 dark:bg-[#0f172a] rounded-xl my-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                                                    {/* macOS Window Header */}
                                                    <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                                        <div className="flex gap-2">
                                                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                                                        </div>
                                                        <div className="text-[10px] font-mono text-slate-400 font-bold">main.py</div> {/* Generic Name */}
                                                        <button
                                                            onClick={() => handleCopy(item.text)}
                                                            className="text-slate-400 hover:text-blue-500 transition-colors"
                                                            title="Copy Code"
                                                        >
                                                            <div className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded shadow-sm hover:shadow">COPY</div>
                                                        </button>
                                                    </div>
                                                    <pre className="p-6 overflow-x-auto custom-scrollbar leading-relaxed font-mono text-xs md:text-sm text-slate-800 dark:text-slate-300"><code>{highlighted}</code></pre>
                                                </div>
                                            );
                                        }

                                        // 3. Tables
                                        if (item.type === 'table') {
                                            return (
                                                <div key={cIdx} className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                                                    <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                                                        <tbody>
                                                            {item.data.map((row: string[], rIdx: number) => (
                                                                <tr key={rIdx} className={`border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${rIdx === 0 ? 'bg-slate-50/80 dark:bg-slate-900/50 font-bold text-slate-800 dark:text-slate-200' : ''}`}>
                                                                    {row.map((cell, cellIdx) => (
                                                                        <td key={cellIdx} className={`p-4 align-top border-r border-slate-100 dark:border-slate-800 last:border-0 ${cellIdx === 0 ? 'font-bold text-slate-700 dark:text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                                                                            {cell}
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        }

                                        const text = item.text || "";
                                        // Fallback for objects without type
                                        return <p key={cIdx} className="mb-4 text-slate-600 dark:text-slate-300">{text}</p>;
                                    })}

                                    {/* Infographic Area - Smart Positioning to avoid duplication */}
                                    {(() => {
                                        const isIntro = section.title?.toLowerCase().includes('introduction');
                                        const hasIntro = sections.some((s: any) => s.title?.toLowerCase().includes('introduction'));
                                        const shouldShow = paper.infographicImage && (isIntro || (!hasIntro && idx === 1));

                                        if (shouldShow) {
                                            return (
                                                <figure className="my-12 p-2 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl group hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                                    <div className="relative overflow-hidden rounded-xl bg-slate-900">
                                                        <Image
                                                            src={paper.infographicImage}
                                                            alt={`${paper.title} Infographic`}
                                                            width={paper.infographicImageWidth || 1024}
                                                            height={paper.infographicImageHeight || 1024}
                                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                                                    </div>
                                                    <figcaption className="text-center text-xs text-slate-500 dark:text-slate-500 font-mono mt-3 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                                                        {t('fig_1_1')} • System Architecture
                                                    </figcaption>
                                                </figure>
                                            );
                                        }
                                        return null;
                                    })()}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer / Signature */}
                    <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 bg-slate-50/50 dark:bg-slate-900/50 p-8 rounded-2xl">
                        {/* ... same as before ... */}
                        <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-slate-600 shadow-md shrink-0">
                            {(paper as any).author?.avatar ? (
                                <img src={(paper as any).author.avatar} alt={(paper as any).author.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-xl">
                                    {/* Initials Logic */}
                                    {(paper as any).author?.name ? (paper as any).author.name.split(' ').map((n: string) => n[0]).join('') : 'AT'}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1">{(paper as any).author?.name || "Dr. Aris Thorne"}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mb-4">{(paper as any).author?.role || "Chief Research Officer, Adraca AI Pvt. Ltd."}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 italic">&quot;{(paper as any).author?.thought || "We are not building faster horses. We are engineering the warp drive."}&quot;</p>
                        </div>
                    </div>
                </motion.article>
            </main>
        </div>
    );

}
