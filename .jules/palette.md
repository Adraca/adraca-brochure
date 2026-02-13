
## 2026-01-29 - [Command Palette Accessibility]

**Learning:** Custom "Command Palette" or "Spotlight" search modals often lack proper dialog semantics (`role="dialog"`, `aria-modal="true"`) and input labels (`aria-label`), making them confusing for screen reader users who don't know they've entered a new context.
**Action:** Always wrap custom modal components with `role="dialog"` and ensure the primary input has a clear accessible name.
