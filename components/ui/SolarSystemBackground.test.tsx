import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React, { useState } from 'react';
import SolarSystemBackground from './SolarSystemBackground';

// Mock framer-motion to avoid animation issues in JSDOM
vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, className, style }: any) => (
      <div className={className} style={style} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

describe('SolarSystemBackground Performance', () => {
  it('should maintain star positions on parent re-render', () => {
    const Wrapper = () => {
      const [, setCount] = useState(0);
      return (
        <div>
          <button data-testid="update-btn" onClick={() => setCount(c => c + 1)}>
            Update
          </button>
          <SolarSystemBackground />
        </div>
      );
    };

    render(<Wrapper />);

    const stars = document.querySelectorAll('.bg-slate-400');
    expect(stars.length).toBe(50);

    const firstStar = stars[0];
    const firstStarStyle = firstStar.getAttribute('style');

    // Force a re-render
    const btn = screen.getByTestId('update-btn');
    fireEvent.click(btn);

    // Get the stars again
    const starsAfter = document.querySelectorAll('.bg-slate-400');
    const firstStarAfter = starsAfter[0];
    const firstStarStyleAfter = firstStarAfter.getAttribute('style');

    // This assertion should PASS now, because positions are memoized
    expect(firstStarStyleAfter).toBe(firstStarStyle);
  });
});
