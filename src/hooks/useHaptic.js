import { useCallback } from "react";

export function useHaptic(pattern = 8) {
  return useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        /* silently ignore unsupported/unavailable haptics */
      }
    }
  }, [pattern]);
}
