import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Adraca — Strategic Technical Report 2026",
  description: "Hard Engineering for the Sovereign Enterprise.",
};

/**
 * Isolated layout for the /brochure route.
 * Intentionally excludes: Navbar, OracleBot, Breadcrumbs, Footer, CommandPalette, Galaxy3D.
 * Only provides fonts, global CSS, and theme providers.
 */
export default function BrochureLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrains.variable} font-outfit bg-background min-h-screen relative overflow-x-hidden selection:bg-azure selection:text-white`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
