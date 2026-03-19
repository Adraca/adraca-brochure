import React from "react";
import UseCaseDashboardClient from "./UseCaseDashboardClient";

// Required for Static Export
export async function generateStaticParams() {
    return [
        { id: 'demo' },
        { id: 'dora-fraud' },
        { id: 'ehds-privacy' },
        { id: 'espr-passport' },
        { id: 'audit-ledger' },
        { id: 'edge-velocity' },
        { id: 'catena-telemetry' }
    ];
}

export default function UseCaseDashboardPage({ params }: { params: { id: string } }) {
    return <UseCaseDashboardClient id={params.id} />;
}
