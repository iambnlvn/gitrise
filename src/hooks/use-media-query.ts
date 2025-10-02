"use client";

import { useEffect, useState } from "react";

/**
 *
 * @param query - The media query string to match (e.g., "(min-width: 768px)")
 * @param defaultValue - Default value to use during SSR (default: false)
 * @returns boolean indicating if the media query matches
 *
 * @example
 * ```tsx
 * const isDesktop = useMediaQuery("(min-width: 768px)");
 * const isMobile = useMediaQuery("(max-width: 767px)");
 * const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 * ```
 */
export function useMediaQuery(
  query: string,
  defaultValue: boolean = false,
): boolean {
  const [matches, setMatches] = useState(defaultValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Return early if window is not defined (SSR)
    if (typeof window === "undefined") {
      return;
    }

    // Create media query list
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Define listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener for changes
    // Use both methods for better browser compatibility
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers even if deprecated
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  // Return default value until mounted to avoid hydration mismatch
  if (!mounted) {
    return defaultValue;
  }

  return matches;
}
