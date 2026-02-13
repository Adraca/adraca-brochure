import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import OracleBot from './OracleBot';

// Mock framer-motion to render children immediately
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, className, ...props }: any) => <div className={className} {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, className, onClick, ...props }: any) => <button className={className} onClick={onClick} {...props}>{children}</button>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('OracleBot Accessibility', () => {
  afterEach(() => {
    cleanup();
  });

  it('trigger button has accessible name and attributes', () => {
    render(<OracleBot />);
    const trigger = screen.getByRole('button', { name: /open support chat/i });
    expect(trigger).toBeDefined();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('opens dialog with correct roles when trigger is clicked', () => {
    render(<OracleBot />);
    const trigger = screen.getByRole('button', { name: /open support chat/i });
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-labelledby')).toBe('oracle-title');
  });

  it('form inputs have associated labels', () => {
    render(<OracleBot />);
    const trigger = screen.getByRole('button', { name: /open support chat/i });
    fireEvent.click(trigger);

    expect(screen.getByLabelText(/full name/i)).toBeDefined();
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
    expect(screen.getByLabelText(/inquiry details/i)).toBeDefined();
  });

  it('close button has accessible name', () => {
     render(<OracleBot />);
     const trigger = screen.getByRole('button', { name: /open support chat/i });
     fireEvent.click(trigger);

     const closeBtn = screen.getByRole('button', { name: /close chat/i });
     expect(closeBtn).toBeDefined();
  });
});
