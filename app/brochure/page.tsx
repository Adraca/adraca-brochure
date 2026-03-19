import type { Metadata } from "next";
import BrochureClient from "./BrochureClient";

export const metadata: Metadata = {
  title: "Adraca — Strategic Technical Report 2026",
  description: "Hard Engineering for the Sovereign Enterprise. A complete technical overview of Adraca AI's four core products and infrastructure philosophy.",
};

export default function BrochurePage() {
  return <BrochureClient />;
}
