import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Galaxy3D from "@/components/ui/Galaxy3D";
import Analytics from "@/components/Analytics";
import ConditionalChrome from "@/components/ConditionalChrome";


const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: "Adraca | Sovereign AI",
    template: "%s | Adraca"
  },
  description: "Enterprise Data & AI Infrastructure. Sovereignty by Design. Intelligence by Engineering.",
  keywords: ["Sovereign AI", "Data Infrastructure", "Industrial AI", "GreenOps", "GDPR", "DORA"],
  openGraph: {
    title: "Adraca | Sovereign AI",
    description: "Enterprise Data & AI Infrastructure.",
    url: "https://adraca.io",
    siteName: "Adraca",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adraca | Sovereign AI",
    description: "Enterprise Data & AI Infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

import ClientLayout from "@/components/ClientLayout";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${outfit.variable} ${jetbrains.variable} bg-background min-h-screen relative overflow-x-hidden selection:bg-azure selection:text-white`} suppressHydrationWarning>
        <Providers>
          {/* The New Motion Engine */}
          <Galaxy3D />

          {/* All nav/chatbot/breadcrumbs/footer — hidden on /brochure */}
          <ConditionalChrome>
            <ClientLayout>
              {children}
            </ClientLayout>
          </ConditionalChrome>
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}
