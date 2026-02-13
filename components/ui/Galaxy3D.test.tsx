import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Galaxy3D from './Galaxy3D';

// Mock framer-motion
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

describe('Galaxy3D Cleanup', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('should clean up event listeners and animation frames on unmount', () => {
    // Mock window methods
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    // Mock requestAnimationFrame
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    let frameId = 0;
    const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
        frameId++;
        return frameId;
    });

    // Mock canvas context
    const getContextMock = vi.fn().mockReturnValue({
        clearRect: vi.fn(),
        beginPath: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        createLinearGradient: vi.fn().mockReturnValue({
            addColorStop: vi.fn()
        }),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => getContextMock() as any);


    const { unmount } = render(<Galaxy3D />);

    // Check if resize listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    // Check if animation frame was requested
    expect(requestAnimationFrameSpy).toHaveBeenCalled();

    // Capture the resize handler
    const resizeHandler = addEventListenerSpy.mock.calls.find(call => call[0] === 'resize')?.[1];

    // Unmount
    unmount();

    // Check if resize listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', resizeHandler);

    // Check if animation frame was cancelled
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});
