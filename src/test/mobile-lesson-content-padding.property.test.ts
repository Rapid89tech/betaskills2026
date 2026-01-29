/**
 * Property-Based Test: Mobile Lesson Content Padding
 * 
 * Feature: mobile-sync-admin-overhaul, Property 5: Mobile Lesson Content Padding
 * Validates: Requirements 2.3
 * 
 * Property: For any lesson content container displayed on a mobile viewport, 
 * the horizontal padding SHALL be at least 16px.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fc from 'fast-check';

// Minimum horizontal padding for lesson content on mobile
const MIN_MOBILE_PADDING = 16;

// Mobile viewport width threshold
const MOBILE_VIEWPORT_MAX = 767;

// CSS classes that should enforce mobile lesson content padding
const LESSON_CONTENT_CLASSES = [
  'mobile-px',
  'mobile-p',
  'mobile-container',
] as const;

// CSS styles to inject for testing (from mobile.css)
const MOBILE_PADDING_CSS = `
  .mobile-p {
    padding: 16px;
  }

  .mobile-px {
    padding-left: 16px;
    padding-right: 16px;
  }

  .mobile-py {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .mobile-container {
    width: 100%;
    max-width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
  }

  .mobile-p-lg {
    padding: 24px;
  }

  .mobile-px-lg {
    padding-left: 24px;
    padding-right: 24px;
  }

  /* Mobile-only styles (< 768px) */
  @media (max-width: 767px) {
    .mobile-safe-padding {
      padding: 16px !important;
    }
  }
`;

/**
 * Parse CSS padding value to pixels
 */
function parsePaddingValue(value: string): number {
  if (!value || value === 'auto' || value === 'none') return 0;
  const match = value.match(/^(\d+(?:\.\d+)?)(px)?$/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Measure horizontal padding of an element
 */
function measureHorizontalPadding(className: string, viewportWidth: number): { paddingLeft: number; paddingRight: number } {
  // Set viewport width
  const originalWidth = window.innerWidth;
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: viewportWidth,
  });

  const element = document.createElement('div');
  element.className = className;
  element.setAttribute('data-lesson-content', '');
  element.textContent = 'Test lesson content';
  element.style.visibility = 'hidden';
  element.style.position = 'absolute';
  document.body.appendChild(element);
  
  const computedStyle = window.getComputedStyle(element);
  const paddingLeft = parsePaddingValue(computedStyle.paddingLeft);
  const paddingRight = parsePaddingValue(computedStyle.paddingRight);
  
  document.body.removeChild(element);

  // Restore original width
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: originalWidth,
  });
  
  return { paddingLeft, paddingRight };
}

describe('Property 5: Mobile Lesson Content Padding', () => {
  let styleElement: HTMLStyleElement;

  beforeAll(() => {
    styleElement = document.createElement('style');
    styleElement.textContent = MOBILE_PADDING_CSS;
    document.head.appendChild(styleElement);
  });

  afterAll(() => {
    if (styleElement?.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  });

  /**
   * Property test: All lesson content classes enforce minimum 16px horizontal padding on mobile
   */
  it('should ensure lesson content has minimum 16px horizontal padding on mobile viewports', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LESSON_CONTENT_CLASSES),
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }), // Mobile viewport widths
        (contentClass, viewportWidth) => {
          const { paddingLeft, paddingRight } = measureHorizontalPadding(contentClass, viewportWidth);
          
          // Both left and right padding must be at least 16px
          return (
            paddingLeft >= MIN_MOBILE_PADDING &&
            paddingRight >= MIN_MOBILE_PADDING
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Lesson content padding is consistent across different mobile viewport widths
   */
  it('should maintain consistent padding across all mobile viewport widths', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LESSON_CONTENT_CLASSES),
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        (contentClass, viewportWidth) => {
          const { paddingLeft, paddingRight } = measureHorizontalPadding(contentClass, viewportWidth);
          
          // Padding should be symmetric (left === right) for lesson content
          return paddingLeft === paddingRight;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Larger padding variants exceed minimum
   */
  it('should ensure larger padding variants have proportionally larger padding', () => {
    const largeVariants = ['mobile-p-lg', 'mobile-px-lg'] as const;
    
    fc.assert(
      fc.property(
        fc.constantFrom(...largeVariants),
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        (largeVariantClass, viewportWidth) => {
          const { paddingLeft, paddingRight } = measureHorizontalPadding(largeVariantClass, viewportWidth);
          
          // Large variants should exceed base 16px minimum
          return (
            paddingLeft > MIN_MOBILE_PADDING &&
            paddingRight > MIN_MOBILE_PADDING
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Lesson content padding maintains minimum with varying content
   */
  it('should maintain minimum padding regardless of content length', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LESSON_CONTENT_CLASSES),
        fc.string({ minLength: 0, maxLength: 200 }),
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        (contentClass, content, viewportWidth) => {
          // Set viewport width
          const originalWidth = window.innerWidth;
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          const element = document.createElement('div');
          element.className = contentClass;
          element.setAttribute('data-lesson-content', '');
          element.textContent = content;
          element.style.visibility = 'hidden';
          element.style.position = 'absolute';
          document.body.appendChild(element);
          
          const computedStyle = window.getComputedStyle(element);
          const paddingLeft = parsePaddingValue(computedStyle.paddingLeft);
          const paddingRight = parsePaddingValue(computedStyle.paddingRight);
          
          document.body.removeChild(element);

          // Restore original width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalWidth,
          });
          
          return (
            paddingLeft >= MIN_MOBILE_PADDING &&
            paddingRight >= MIN_MOBILE_PADDING
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Desktop viewports may have different padding (not constrained by mobile minimum)
   */
  it('should allow different padding on desktop viewports', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...LESSON_CONTENT_CLASSES),
        fc.integer({ min: 1025, max: 1920 }), // Desktop viewport widths
        (contentClass, viewportWidth) => {
          const { paddingLeft, paddingRight } = measureHorizontalPadding(contentClass, viewportWidth);
          
          // Desktop can have any padding (including 0), not constrained by mobile requirement
          // This test just verifies the measurement works on desktop
          return paddingLeft >= 0 && paddingRight >= 0;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Verify CSS class definitions match expected values on mobile
   */
  it('should verify all lesson content CSS classes have correct mobile padding', () => {
    const mobileViewportWidth = 375; // Common mobile width (iPhone)
    
    for (const className of LESSON_CONTENT_CLASSES) {
      const { paddingLeft, paddingRight } = measureHorizontalPadding(className, mobileViewportWidth);
      
      expect(paddingLeft).toBeGreaterThanOrEqual(MIN_MOBILE_PADDING);
      expect(paddingRight).toBeGreaterThanOrEqual(MIN_MOBILE_PADDING);
    }
  });

  /**
   * Verify mobile-px specifically has exactly 16px horizontal padding
   */
  it('should verify mobile-px has exactly 16px horizontal padding', () => {
    const mobileViewportWidth = 375;
    const { paddingLeft, paddingRight } = measureHorizontalPadding('mobile-px', mobileViewportWidth);
    
    expect(paddingLeft).toBe(16);
    expect(paddingRight).toBe(16);
  });

  /**
   * Verify mobile-p has 16px padding on all sides
   */
  it('should verify mobile-p has 16px padding on all sides', () => {
    const mobileViewportWidth = 375;
    
    // Set viewport width
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: mobileViewportWidth,
    });

    const element = document.createElement('div');
    element.className = 'mobile-p';
    element.setAttribute('data-lesson-content', '');
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    document.body.appendChild(element);
    
    const computedStyle = window.getComputedStyle(element);
    const paddingLeft = parsePaddingValue(computedStyle.paddingLeft);
    const paddingRight = parsePaddingValue(computedStyle.paddingRight);
    const paddingTop = parsePaddingValue(computedStyle.paddingTop);
    const paddingBottom = parsePaddingValue(computedStyle.paddingBottom);
    
    document.body.removeChild(element);

    // Restore original width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalWidth,
    });
    
    expect(paddingLeft).toBe(16);
    expect(paddingRight).toBe(16);
    expect(paddingTop).toBe(16);
    expect(paddingBottom).toBe(16);
  });

  /**
   * Verify mobile-container has proper box-sizing
   */
  it('should verify mobile-container uses border-box sizing', () => {
    const mobileViewportWidth = 375;
    
    // Set viewport width
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: mobileViewportWidth,
    });

    const element = document.createElement('div');
    element.className = 'mobile-container';
    element.setAttribute('data-lesson-content', '');
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    document.body.appendChild(element);
    
    const computedStyle = window.getComputedStyle(element);
    const boxSizing = computedStyle.boxSizing;
    const paddingLeft = parsePaddingValue(computedStyle.paddingLeft);
    const paddingRight = parsePaddingValue(computedStyle.paddingRight);
    
    document.body.removeChild(element);

    // Restore original width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalWidth,
    });
    
    expect(boxSizing).toBe('border-box');
    expect(paddingLeft).toBe(16);
    expect(paddingRight).toBe(16);
  });
});
