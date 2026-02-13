## 2024-05-23 - [Contact Form Accessibility]

**Learning:** Adding semantic HTML (`id` + `htmlFor`) to a custom input component using "floating labels" requires checking CSS sibling selectors (`~`). If the structure changes (e.g. wrapping in a div), the CSS selector might break.
**Action:** Always verify CSS combinators when refactoring for accessibility in highly styled custom components.

## 2024-10-27 - [OracleBot Accessibility]

**Learning:** Custom interactive components like `OracleBot` (chat widgets) often lack semantic structure (`role="dialog"`, `aria-modal`) and accessible names for icon-only buttons.
**Action:** When creating or auditing overlay components, explicitly check for `aria-label` on triggers/closers and proper dialog roles.

## 2026-01-29 - [Navbar Accessibility Gaps]

**Learning:** Critical navigation components (Search, Mobile Menu) were implemented as icon-only buttons without accessible names. This completely blocks screen reader users from key site functions.
**Action:** Always audit `Navbar.tsx` first in any new project for icon-only buttons (`aria-label`) and state toggles (`aria-expanded`).
