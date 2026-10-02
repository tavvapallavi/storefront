import { renderHook, act } from '@testing-library/react';
import useDebounce from '../hooks/useDebounce.js';

describe('useDebounce', () => {
  it('updates the value only after the delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), { initialProps: { v: 'a' } });
    rerender({ v: 'ab' });
    expect(result.current).toBe('a');
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('ab');
    vi.useRealTimers();
  });
});
