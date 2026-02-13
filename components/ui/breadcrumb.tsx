import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
    items: {
        label: string;
        href: string;
    }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="inline-flex items-center">
                            {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />}
                            {index === 0 && <Home className="w-4 h-4 text-slate-400 mr-2" />}
                            <Link
                                href={item.href}
                                className={`inline-flex items-center text-sm font-medium ${isLast
                                    ? "text-slate-900 font-semibold pointer-events-none"
                                    : "text-slate-500 hover:text-slate-900 transition-colors"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
