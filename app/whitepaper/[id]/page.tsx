import React from "react";
import WhitepaperReaderClient from "./WhitepaperReaderClient";
import { whitepapers } from "@/utils/whitepapers";

// Required for Static Export
export async function generateStaticParams() {
    return whitepapers.map((paper) => ({
        id: paper.id,
    }));
}

export default function WhitepaperPage() {
    return <WhitepaperReaderClient />;
}