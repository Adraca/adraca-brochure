import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "Adraca | Sovereign Architecture"
    },
    description: "View the Adraca Kernel, TEE Hardware, and Zero-Trust Architecture.",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
