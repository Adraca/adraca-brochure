
## 2026-01-29 - [Removing dangerouslySetInnerHTML]

**Vulnerability:** Found `dangerouslySetInnerHTML` being used to simply bold a keyword in a translation string. While the source was internal (translations file), this sets a bad precedent and increases the attack surface if translation files ever become untrusted.
**Learning:** Developers often reach for `dangerouslySetInnerHTML` for simple string replacements/formatting.
**Prevention:** Use `String.prototype.split()` with regex and `Array.prototype.map()` to inject React components into text segments instead. See `app/compliance/terms/page.tsx` for the pattern.

## 2026-02-03 - [Enforcing Analytics Gating]
**Vulnerability:** Found third-party trackers (Google Tag Manager, Google Analytics) being injected directly into the root layout, violating the project's Privacy Standard which requires explicit user consent before tracking.
**Learning:** Default Next.js component patterns often encourage direct injection in layouts, which can lead to compliance breaches if not carefully gated.
**Prevention:** Always wrap third-party scripts in a client-side gating component that checks for consent state. Use custom events to trigger immediate injection when consent is granted by the user without requiring a page reload.
