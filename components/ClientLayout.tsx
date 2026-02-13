"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/utils/analytics";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        trackPageView(pathname);
    }, [pathname]);

    // Pages that handle their own layout/padding (Full Control)
    const isFullPage = pathname.startsWith('/whitepaper') || pathname === '/use-cases' || pathname === '/contact';

    if (isFullPage) {
        return <main>{children}</main>;
    }

    // Default Layout for standard pages
    return (
        <main className="pt-32 px-6 max-w-7xl mx-auto">
            {children}
        </main>
    );
}
