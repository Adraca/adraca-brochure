"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown, Shield, FileText, Zap,
    Briefcase, BookOpen, Target, Search,
    Cpu, Layers, Landmark, ShoppingBag, Car, Radio, HeartPulse,
    Menu, X, Key
} from "lucide-react";

import AdracaLogo from "./AdracaLogo";
import { useLanguage, Language } from "@/context/LanguageContext";
import { ThemeToggle } from "../ThemeToggle";

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const languages = [
        { code: 'en', label: 'English', short: 'EN' },
        { code: 'de', label: 'Deutsch', short: 'DE' },
        { code: 'et', label: 'Eesti', short: 'ET' },
        { code: 'fr', label: 'Français', short: 'FR' },
        { code: 'it', label: 'Italiano', short: 'IT' },
    ];

    return (
        <>
            {/* 2. CENTERED FLOATING NAVBAR */}
            <motion.nav
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-fit max-w-[95vw]"
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-full px-3 py-1.5 shadow-glass-base flex items-center gap-1 w-fit relative">

                    {/* Brand (Static) */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0 mr-4 pl-1">
                        <AdracaLogo className="h-9 w-auto" variant="full" animated={false} />
                    </Link>

                    {/* Desktop Menu */}
                    <NavItem title={t('industries')} href="/industries" menuId="industries" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
                        <DropdownMenu>
                            <DropdownItem href="/industries/consumer-goods" icon={<ShoppingBag size={14} />} title={t('consumer_goods')} />
                            <DropdownItem href="/industries/retail" icon={<ShoppingBag size={14} />} title={t('retail')} />
                            <DropdownItem href="/industries/cmt" icon={<Radio size={14} />} title={t('cmt')} />
                            <DropdownItem href="/industries/finance" icon={<Landmark size={14} />} title={t('finance')} />
                            <DropdownItem href="/industries/energy" icon={<Zap size={14} />} title={t('energy')} />
                            <DropdownItem href="/industries/automotive" icon={<Car size={14} />} title={t('automotive')} />
                            <DropdownItem href="/industries/health" icon={<HeartPulse size={14} />} title={t('health')} />
                        </DropdownMenu>
                    </NavItem>

                    <NavItem title={t('capabilities')} href="/products" menuId="capabilities" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
                        <DropdownMenu>
                            <DropdownItem href="/products/security-sovereignty" icon={<Shield size={14} />} title={t('sovereignty')} />
                            <DropdownItem href="/products/cloud-infrastructure" icon={<Layers size={14} />} title={t('infrastructure')} />
                            <DropdownItem href="/products/data-migration" icon={<Cpu size={14} />} title={t('data_migration')} />
                            <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                            <DropdownItem href="/use-cases" icon={<Zap size={14} />} title={t('use_cases')} />

                        </DropdownMenu>
                    </NavItem>

                    <NavItem title={t('intelligence')} href="/pricing" menuId="intelligence" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
                        <DropdownMenu>
                            <DropdownItem href="/pricing" icon={<Zap size={14} />} title={t('plans')} />

                            <DropdownItem href="/contact" icon={<Briefcase size={14} />} title={t('contact_sales')} />
                        </DropdownMenu>
                    </NavItem>

                    <NavItem title={t('company')} href="/about" menuId="company" activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
                        <DropdownMenu>
                            <DropdownItem href="/about" icon={<Target size={14} />} title={t('about_us')} />
                            <DropdownItem href="/careers" icon={<Briefcase size={14} />} title={t('careers')} />
                            <div className="px-2 py-1.5 mt-1 mb-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-t border-slate-100 dark:border-slate-800/50 pt-2">
                                {t('research_insights')}
                            </div>

                            <DropdownItem href="/whitepaper" icon={<FileText size={14} />} title={t('whitepaper')} />
                            <DropdownItem href="/blog" icon={<BookOpen size={14} />} title={t('blog')} />
                        </DropdownMenu>
                    </NavItem>

                    {/* Language Selector */}
                    <div className="hidden md:flex items-center gap-1 ml-2 border-l border-slate-200 pl-2">
                        <NavItem
                            title={languages.find(l => l.code === language)?.short || 'EN'}
                            menuId="language"
                            activeMenu={activeMenu}
                            setActiveMenu={setActiveMenu}
                        >
                            <DropdownMenu>
                                {languages.map((lang) => (
                                    <DropdownActionItem
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code as Language);
                                            setActiveMenu(null);
                                        }}
                                        title={lang.label}
                                        isActive={language === lang.code}
                                    />
                                ))}
                            </DropdownMenu>
                        </NavItem>
                        <ThemeToggle />
                    </div>

                    {/* Search Trigger */}
                    <button
                        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }))}
                        className="hidden md:flex items-center justify-center w-8 h-8 hover:bg-slate-100 rounded-full transition-colors mr-1 group ml-2"
                        title="Search (Cmd+K)"
                        aria-label="Search"
                        aria-keyshortcuts="Meta+K"
                    >
                        <Search size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </button>

                    {/* Button */}
                    <Link href="/contact" className="hidden md:block shrink-0 ml-2">
                        <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl hover:bg-blue-600 transition-all flex items-center gap-2 whitespace-nowrap">
                            <span>{t('initialize')}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </button>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[90] bg-white/95 dark:bg-[#0B0E14]/95 backdrop-blur-3xl pt-24 px-6 md:hidden overflow-y-auto border-t border-slate-200 dark:border-white/10"
                    >
                        <div className="flex flex-col gap-6 dark:text-white">
                            <MobileNavItem href="/products" title={t('capabilities')}>
                                <MobileSubItem href="/products/security-sovereignty" icon={<Shield size={18} />} title={t('sovereignty')} />
                                <MobileSubItem href="/products/cloud-infrastructure" icon={<Layers size={18} />} title={t('infrastructure')} />
                                <MobileSubItem href="/products/data-migration" icon={<Cpu size={18} />} title={t('data_migration')} />
                                <div className="w-full h-px bg-slate-100 dark:bg-white/10 my-2"></div>
                                <MobileSubItem href="/use-cases" icon={<Zap size={18} />} title={t('use_cases')} />

                            </MobileNavItem>

                            <MobileNavItem href="/industries" title={t('industries')}>
                                <MobileSubItem href="/industries/consumer-goods" icon={<ShoppingBag size={18} />} title={t('consumer_goods')} />
                                <MobileSubItem href="/industries/retail" icon={<ShoppingBag size={18} />} title={t('retail')} />
                                <MobileSubItem href="/industries/cmt" icon={<Radio size={18} />} title={t('cmt')} />
                                <MobileSubItem href="/industries/finance" icon={<Landmark size={18} />} title={t('finance')} />
                                <MobileSubItem href="/industries/energy" icon={<Zap size={18} />} title={t('energy')} />
                                <MobileSubItem href="/industries/automotive" icon={<Car size={18} />} title={t('automotive')} />
                                <MobileSubItem href="/industries/health" icon={<HeartPulse size={18} />} title={t('health')} />
                            </MobileNavItem>

                            <MobileNavItem href="/pricing" title={t('intelligence')}>
                                <MobileSubItem href="/pricing" icon={<Zap size={18} />} title={t('plans')} />

                                <MobileSubItem href="/contact" icon={<Briefcase size={18} />} title={t('contact_sales')} />
                            </MobileNavItem>

                            <MobileNavItem href="/about" title={t('company')}>
                                <MobileSubItem href="/about" icon={<Target size={18} />} title={t('about_us')} />
                                <MobileSubItem href="/careers" icon={<Briefcase size={18} />} title={t('careers')} />
                                <div className="px-1 py-2 mt-2 text-xs uppercase tracking-wider text-slate-500 font-bold border-t border-slate-100 dark:border-white/10 pt-4">
                                    {t('research_insights')}
                                </div>

                                <MobileSubItem href="/whitepaper" icon={<FileText size={18} />} title={t('whitepaper')} />
                                <MobileSubItem href="/blog" icon={<BookOpen size={18} />} title={t('blog')} />
                            </MobileNavItem>

                            <div className="flex flex-wrap gap-4 mt-8 items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
                                <div className="flex flex-wrap gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code as Language)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border ${language === lang.code ? 'bg-slate-900 text-white border-transparent dark:bg-slate-100 dark:text-slate-900' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-white/5 dark:hover:bg-slate-800 dark:hover:text-white'}`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                                    <ThemeToggle />
                                </div>
                            </div>

                            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full bg-slate-900 dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-xl flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] transition-transform">
                                    <span>{t('initialize')}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-500/20" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// --- Helper Components ---

interface NavItemProps {
    title: string;
    href?: string;
    menuId: string;
    activeMenu: string | null;
    setActiveMenu: (id: string | null) => void;
    children: React.ReactNode;
}

function NavItem({ title, href, menuId, activeMenu, setActiveMenu, children }: NavItemProps) {
    const baseClasses = `px-2.5 py-1.5 text-xs font-bold transition-colors rounded-full flex items-center gap-0.5 cursor-pointer ${activeMenu === menuId ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`;

    return (
        <div className="relative" onMouseEnter={() => setActiveMenu(menuId)}>
            {href ? (
                <Link href={href} className={baseClasses}>
                    {title}
                    <ChevronDown size={10} strokeWidth={3} className={`transition-transform duration-200 ${activeMenu === menuId ? "rotate-180" : ""}`} />
                </Link>
            ) : (
                <button className={baseClasses}>
                    {title}
                    <ChevronDown size={10} strokeWidth={3} className={`transition-transform duration-200 ${activeMenu === menuId ? "rotate-180" : ""}`} />
                </button>
            )}

            <AnimatePresence>
                {activeMenu === menuId && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                        style={{ width: 'max-content', zIndex: 100 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface MobileNavItemProps {
    href?: string;
    title: string;
    children?: React.ReactNode;
}

function MobileNavItem({ href, title, children }: MobileNavItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex-1 text-left text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between group"
                >
                    {title}
                    {children && (
                        <ChevronDown
                            size={20}
                            className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    )}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pl-2 flex flex-col gap-4">
                            {href && (
                                <MobileSubItem href={href} title="Overview" />
                            )}
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}

function MobileSubItem({ href, title, icon }: { href: string, title: string, icon?: React.ReactNode }) {
    return (
        <Link href={href} className="text-lg font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-4 py-1 transition-colors">
            {icon && <span className="text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{icon}</span>}
            {title}
        </Link>
    )
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-2xl shadow-xl p-1.5 flex flex-col gap-0.5 ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden"
        >
            {children}
        </div>
    );
}

interface DropdownItemProps {
    href: string;
    icon: React.ReactNode;
    title: string;
}

function DropdownItem({ href, icon, title }: DropdownItemProps) {
    return (
        <Link href={href} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <div className="mt-0.5 text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-1.5 rounded-lg shadow-sm shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">{title}</div>
            </div>
        </Link>
    );
}
interface DropdownActionItemProps {
    onClick: () => void;
    title: string;
    isActive?: boolean;
}

function DropdownActionItem({ onClick, title, isActive }: DropdownActionItemProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center w-full gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group text-left"
        >
            <div className={`mt-0.5 transition-colors p-1.5 rounded-lg shadow-sm shrink-0 border ${isActive ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                <div className="text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                    {title.charAt(0)}
                </div>
            </div>
            <div className="min-w-0">
                <div className={`text-[11px] font-bold transition-colors ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                    {title}
                </div>
            </div>
        </button>
    );
}
