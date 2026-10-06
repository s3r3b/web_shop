'use client';

import { useEffect } from 'react';

/**
 * Defensive sanitizer preventing Next.js layout-router or third-party libraries
 * from passing circular HTMLElement references into console.warn/error in dev iframe environments.
 */
export default function ConsoleSanitizer() {
  useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args: unknown[]) => {
      try {
        const sanitized = args.map((arg) => {
          if (typeof arg === 'object' && arg !== null && 'nodeType' in arg) {
            const el = arg as HTMLElement;
            return `[HTMLElement <${(el.tagName || 'element').toLowerCase()}${el.id ? ` id="${el.id}"` : ''}>]`;
          }
          return arg;
        });
        originalWarn.apply(console, sanitized);
      } catch {
        // Fallback to original
        originalWarn.apply(console, args);
      }
    };

    console.error = (...args: unknown[]) => {
      try {
        const sanitized = args.map((arg) => {
          if (typeof arg === 'object' && arg !== null && 'nodeType' in arg) {
            const el = arg as HTMLElement;
            return `[HTMLElement <${(el.tagName || 'element').toLowerCase()}${el.id ? ` id="${el.id}"` : ''}>]`;
          }
          return arg;
        });
        originalError.apply(console, sanitized);
      } catch {
        originalError.apply(console, args);
      }
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}
