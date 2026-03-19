"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import OracleBot from "@/components/ui/OracleBot";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Footer from "@/components/ui/Footer";
import CommandPalette from "@/components/ui/CommandPalette";
import CookieConsent from "@/components/ui/CookieConsent";
import ScrollToTop from "@/components/ui/ScrollToTop";

const CHROME_FREE_ROUTES = ["/brochure"];

export default function ConditionalChrome() {
  const pathname = usePathname();
  const isChromeFree = CHROME_FREE_ROUTES.some((r) => pathname.startsWith(r));

  if (isChromeFree) return null;

  return (
    <>
      <CommandPalette />
      <Navbar />
      <OracleBot />
      <CookieConsent />
      <ScrollToTop />
      <Breadcrumbs />
      <Footer />
    </>
  );
}
