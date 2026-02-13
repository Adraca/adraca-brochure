import { render } from '@testing-library/react';
import WhitepaperReaderClient from './WhitepaperReaderClient';
import { vi, describe, it, expect } from 'vitest';
import React from 'react';

// Mocks
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'wp-001' }),
}));

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));

// Mock Link since it's used in the component
vi.mock('next/link', () => ({
    default: ({ children }: { children: React.ReactNode }) => <a>{children}</a>
}));

// Mock framer-motion to avoid animation overhead in tests if possible,
// though for this benchmark we want to be somewhat realistic,
// deep rendering might be slow.
// However, framer-motion might complain in JSDOM environment without proper setup.
// Let's mock it to be safe and focus on the React render cycle overhead of the function definition.
vi.mock('framer-motion', () => ({
    motion: {
        article: ({ children, className }: any) => <article className={className}>{children}</article>,
        div: ({ children, className }: any) => <div className={className}>{children}</div>,
    }
}));

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
Object.defineProperty(window, 'print', { value: vi.fn(), writable: true });


describe('WhitepaperReaderClient Performance', () => {
  it('measures render time', () => {
    const start = performance.now();
    const iterations = 50;

    for (let i = 0; i < iterations; i++) {
      render(<WhitepaperReaderClient />);
    }

    const end = performance.now();
    const duration = end - start;
    console.log(`Rendered ${iterations} times in ${duration.toFixed(2)}ms`);
    console.log(`Average time per render: ${(duration / iterations).toFixed(4)}ms`);

    expect(duration).toBeGreaterThan(0);
  });
});
