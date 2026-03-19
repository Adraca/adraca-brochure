"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import {
    Clock, Check, Copy, Terminal, Hash, ArrowRight, ChevronLeft
} from "lucide-react";
import {
    motion, useScroll, useSpring, useMotionValue,
    useMotionTemplate
} from "framer-motion";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { blogs } from "@/data/blogs";

// --- Mock Content for Body ---
const mockContent = [
    { type: "paragraph", text: "blog_1_content_p1" },
    { type: "heading", text: "blog_1_h1", id: "friction-of-pixels" },
    { type: "paragraph", text: "blog_1_content_p2" },
    { type: "quote", text: "blog_1_quote" },
    { type: "paragraph", text: "blog_1_content_p3" },
    { type: "heading", text: "blog_1_h2", id: "ambient-computing" },
    { type: "paragraph", text: "blog_1_content_p4" },
    { type: "code", lang: "rust", code: `// Nexus Intent Prediction Engine\nfn predict_intent(context: &Context) -> Option<Action> {\n    let probability = calculate_entropy(context);\n    \n    // The "Ghost" Threshold\n    if probability > 0.95 {\n        return Some(Action::PreRender); \n    }\n    \n    None\n}` },
];

const mockNextPost = blogs.length > 0 ? {
    title: blogs[0].title,
    category: blogs[0].tag,
    image: blogs[0].coverImage
} : {
    title: "Next Article",
    category: "Tech",
    image: ""
};

// --- Utilities ---
const useMousePosition = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", updateMouse);
        return () => window.removeEventListener("mousemove", updateMouse);
    }, []);
    return { mouseX, mouseY };
};

// --- Components (Light Theme) ---

const SpotlightBackground = () => {
    const { mouseX, mouseY } = useMousePosition();
    return (
        <div className="fixed inset-0 z-0 bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden pointer-events-none transition-colors duration-500">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 dark:opacity-20" />
            {/* Blue Spotlight Reveal */}
            <motion.div className="absolute inset-0 opacity-100" style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08), transparent 80%)` }} />
        </div>
    );
};

const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    useEffect(() => {
        if (!text) return;
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(text.split("").map((char, index) => {
                if (index < iterations) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 2;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);
    return <span className={className}>{display}</span>;
};

const PixelImage = ({ src, alt }: { src: string, alt: string }) => {
    return (
        <div className="relative overflow-hidden group rounded-2xl border border-white/60 dark:border-white/20 shadow-2xl shadow-blue-900/10 dark:shadow-blue-900/30">
            <motion.div initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.2, ease: "circOut" }} viewport={{ once: true, margin: "-10%" }} className="w-full h-full">
                <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.2)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
        </div>
    );
};

const CodeBlock = ({ lang, code }: { lang: string, code: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="my-12 relative group rounded-xl overflow-hidden bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-300/30 dark:shadow-black/50">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b] border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-blue-400" />
                    <span className="text-xs font-mono text-slate-400 uppercase">{lang}</span>
                </div>
                <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">{copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}</button>
            </div>
            <div className="p-6 overflow-x-auto relative">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50" />
                <pre className="font-mono text-sm leading-relaxed text-slate-300">
                    <code>{code.split('\n').map((line, i) => (<div key={i} className="table-row"><span className="table-cell select-none text-slate-600 text-right pr-6">{i + 1}</span><span className="table-cell">{line}</span></div>))}</code>
                </pre>
            </div>
        </div>
    );
};

export default function BlogPostClient() {
    const { t } = useLanguage();
    const params = useParams();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const [activeSection, setActiveSection] = useState("");

    // Look up the post based on params.id
    const blogId = params?.id;
    const foundPost = blogs.find(b => b.id === blogId);

    // Determines the next post
    const currentIndex = blogs.findIndex(b => b.id === blogId);
    const nextIndex = (currentIndex + 1) % blogs.length;
    const nextBlog = blogs[nextIndex] || blogs[0];

    // Fallback if not found
    if (!foundPost && blogId) {
        // Ideally handle 404
    }

    // Adapt foundPost to the component's expected structure
    const post = foundPost ? {
        ...foundPost,
        subtitle: foundPost.summary,
        category: foundPost.tag,
        // Adapt author to object if string, or keep simple
        authorObj: {
            name: foundPost.author,
            role: "Engineering", // Default role
            avatar: foundPost.authorAvatar || "/images/authors/default-avatar.jpg"
        },
        content: foundPost.content && foundPost.content.length > 0 ? foundPost.content : mockContent,
        image: foundPost.coverImage
    } : {
        // Fallback default
        id: "0",
        title: "Loading...",
        subtitle: "",
        category: "Tech",
        date: "",
        readTime: "",
        authorObj: { name: "", role: "", avatar: "" },
        image: "",
        content: []
    };

    // Use the avatar from the post object (which comes from data/blogs.ts)
    // No hardcoded overwrite anymore.


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
        }, { rootMargin: "-20% 0px -50% 0px" });
        document.querySelectorAll("h2").forEach((h2) => observer.observe(h2));
        return () => observer.disconnect();
    }, []);

    // If not found, return null or 404 (optional)
    if (!foundPost) return <div className="min-h-screen flex items-center justify-center bg-background text-slate-800 dark:text-slate-100">Article not found</div>;

    return (
        <div className="min-h-screen bg-background text-slate-800 dark:text-slate-100 selection:bg-cyan-100 selection:text-cyan-900 dark:selection:bg-cyan-900 dark:selection:text-cyan-100 font-sans transition-colors duration-500">
            <SpotlightBackground />
            <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-400 origin-left z-[60]" style={{ scaleX }} />

            {/* Global Navbar Z-50 */}
            <div className="relative z-50">
                <Navbar />
            </div>

            <main className="relative z-10 pt-32 pb-32">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32">
                            {/* Back Link */}
                            <div className="mb-8">
                                <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest group">
                                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t('return_to_stream')}
                                </Link>
                            </div>

                            <div className="mb-8"><p className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">{t('published')}</p><p className="text-sm font-bold text-slate-900 dark:text-white">{post.date}</p></div>
                            <div className="mb-8"><p className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">{t('author')}</p><div className="flex items-center gap-3"><img src={post.authorObj.avatar} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" alt="Author" /><p className="text-sm font-bold text-slate-900 dark:text-white">{post.authorObj.name}</p></div></div>
                            <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-8" />
                            <p className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-wider">{t('contents')}</p>
                            <ul className="space-y-1 relative border-l border-slate-200 dark:border-slate-800 ml-1">
                                <motion.div className="absolute left-[-1px] w-[2px] bg-blue-600 h-6 top-0 transition-all duration-300" style={{ top: activeSection === "friction-of-pixels" ? "0px" : activeSection === "ambient-computing" ? "32px" : "0px", opacity: activeSection ? 1 : 0 }} />
                                {['Friction of Pixels', 'Ambient Computing'].map((item, i) => { const id = item.toLowerCase().replace(/ /g, '-'); return (<li key={i}><a href={`#${id}`} className={`block pl-4 py-1 text-sm font-medium transition-colors ${activeSection === id ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>{item}</a></li>); })}
                            </ul>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-9 max-w-3xl">
                        {/* Mobile Back Link */}
                        <div className="lg:hidden mb-8">
                            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest group">
                                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t('return_to_stream')}
                            </Link>
                        </div>

                        <header className="mb-12">
                            <div className="flex items-center gap-3 mb-6"><span className="px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">{t(post.category)}</span><span className="text-xs font-mono text-slate-400 flex items-center gap-1"><Clock size={12} /> {t(post.readTime)}</span></div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]"><ScrambleText text={t(post.title)} /></h1>
                            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">{t(post.subtitle)}</p>
                        </header>

                        <div className="mb-16 aspect-video w-full"><PixelImage src={post.image} alt="Hero" /><div className="mt-2 flex justify-between text-xs font-mono text-slate-400"><span>IMG_8422.RAW</span><span>100% RENDER</span></div></div>

                        <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400">
                            {post.content.map((block: any, idx) => {
                                if (block.type === 'paragraph' && block.text) return <p key={idx} className="mb-8 leading-relaxed">{t(block.text)}</p>;
                                if (block.type === 'heading' && block.text) return (<div key={idx} className="mt-16 mb-6 group cursor-default"><h2 id={block.id} className="text-3xl flex items-center gap-4"><span className="text-blue-200 dark:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity -ml-8">#</span>{t(block.text)}</h2></div>);
                                if (block.type === 'quote' && block.text) return (<blockquote key={idx} className="border-l-4 border-blue-500 pl-6 py-2 my-12 text-2xl font-serif italic text-slate-800 dark:text-slate-200 leading-normal bg-blue-50/50 dark:bg-blue-900/10 rounded-r-xl">"{t(block.text)}"</blockquote>);
                                if (block.type === 'code' && block.code && block.lang) return <CodeBlock key={idx} lang={block.lang} code={block.code} />;
                                if (block.type === 'image' && block.src) return (
                                    <div key={idx} className="my-12">
                                        <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                                            <img src={block.src} alt={block.alt || "Blog Image"} className="w-full h-auto" />
                                        </div>
                                        {block.caption && <p className="mt-3 text-sm text-slate-500 text-center font-mono">{t(block.caption)}</p>}
                                    </div>
                                );
                                return null;
                            })}
                        </article>

                        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800"><div className="flex flex-wrap gap-2">{['System Design', 'Rust', 'Future', 'Zero UI'].map(tag => (<span key={tag} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-1 shadow-sm"><Hash size={12} /> {tag}</span>))}</div></div>
                    </div>
                </div>
            </main>

            {/* Next Article (Glossy Card) */}
            <Link href={`/blog/${nextBlog.id}`}>
                <section className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-24 overflow-hidden group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <p className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold mb-4 tracking-widest uppercase">{t('next_transmission')}</p>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t(nextBlog.title)}</h2>
                            <div className="flex items-center gap-2 text-slate-400 group-hover:translate-x-2 transition-transform font-bold text-sm"><span>{t('read_article')}</span><ArrowRight size={16} /></div>
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                            {/* Use coverImage from nextBlog */}
                            <img src={nextBlog.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Next" />
                        </div>
                    </div>
                </section>
            </Link>
        </div>
    );
}
