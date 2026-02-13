"use client";

import { useEffect, useState } from 'react';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

/**
 * Analytics component that gates Google Tag Manager and Google Analytics
 * behind explicit user consent, as per Adraca Privacy Standards.
 */
export default function Analytics() {
    const [consent, setConsent] = useState<string | null>(null);

    useEffect(() => {
        // Check for existing consent in localStorage
        const savedConsent = localStorage.getItem('adraca-cookie-consent');
        setConsent(savedConsent);

        // Listen for live consent updates from the CookieConsent component
        const handleConsentUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            setConsent(customEvent.detail);
        };

        window.addEventListener('adraca-consent-updated', handleConsentUpdate);
        return () => window.removeEventListener('adraca-consent-updated', handleConsentUpdate);
    }, []);

    // Gating logic: Only inject third-party scripts if consent is 'granted'
    if (consent !== 'granted') {
        return null;
    }

    return (
        <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        </>
    );
}
