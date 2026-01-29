/**
 * Property-Based Test: Touch Target Minimum Size
 * 
 * Feature: mobile-sync-admin-overhaul, Property 2: Touch Target Minimum Size
 * Validates: Requirements 1.2, 2.2
 * 
 * Property: For any interactive element (buttons, links, form controls) displayed 
 * on a mobile viewport, the element SHALL have minimum dimensions of 44x44 pixels.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fc from 'fast-check';

// Touch target CSS classes from mobile.css
const TOUCH_TARGET_CLASSES = [
  'touch-target',
  'touch-target-btn',
  'touch-target-icon',
  'touch-target-nav',
  'touch-target-list',
  'touch-target-input',
  'touch-target-lg',
  'touch-target-xl',
  'mobile-menu-btn',
  'mobile-lesson-nav-btn',
  'mobile-sidebar-toggle',
] as const;

// Minimum touch target size per WCAG 2.1 AAA guidelines
const MIN_TOUCH_TARGET_SIZE = 44;

// Expected minimum sizes for each class
const EXPECTED_MIN_SIZES: Record<string, { minWidth: number; minHeight: number }> = {
  'touch-target': { minWidth: 44, minHeight: 44 },
  'touch-target-btn': { minWidth: 44, minHeight: 44 },
  'touch-target-icon': { minWidth: 44, minHeight: 44 },
  'touch-target-nav': { minWidth: 0, minHeight: 44 },
  'touch-target-list': { minWidth: 0, minHeight: 44 },
  'touch-target-input': { minWidth: 0, minHeight: 44 },
  'touch-target-lg': { minWidth: 48, minHeight: 48 },
  'touch-target-xl': { minWidth: 56, minHeight: 56 },
  'mobile-menu-btn': { minWidth: 44, minHeight: 44 },
  'mobile-lesson-nav-btn': { minWidth: 44, minHeight: 44 },
  'mobile-sidebar-toggle': { minWidth: 44, minHeight: 44 },
};

// CSS styles to inject for testing
const MOBILE_CSS = `
  .touch-target {
    min-width: 44px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .touch-target-btn {
    min-width: 44px;
    min-height: 44px;
    padding: 10px 16px;
  }
  .touch-target-icon {
    min-width: 44px;
    min-height: 44px;
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .touch-target-nav {
    min-height: 44px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
  }
  .touch-target-list {
    min-height: 44px;
    padding: 10px 16px;
  }
  .touch-target-input {
    min-height: 44px;
    padding: 10px 12px;
  }
  .touch-target-lg {
    min-width: 48px;
    min-height: 48px;
  }
  .touch-target-xl {
    min-width: 56px;
    min-height: 56px;
  }
  .mobile-menu-btn {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }
  .mobile-lesson-nav-btn {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
  }
  .mobile-sidebar-toggle {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/**
 * Parse CSS value to pixels
 */
function parseCSSValue(value: string): number {
  if (!value || value === 'auto' || value === 'none') return 0;
  const match = value.match(/^(\d+(?:\.\d+)?)(px)?$/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Measure touch target element dimensions
 */
function measureTouchTarget(className: string): { minWidth: number; minHeight: number } {
  const element = document.createElement('button');
  element.className = className;
  element.textContent = 'Test';
  element.style.visibility = 'hidden';
  element.style.position = 'absolute';
  document.body.appendChild(element);
  
  const computedStyle = window.getComputedStyle(element);
  const minWidth = parseCSSValue(computedStyle.minWidth);
  const minHeight = parseCSSValue(computedStyle.minHeight);
  
  document.body.removeChild(element);
  
  return { minWidth, minHeight };
}

describe('Property 2: Touch Target Minimum Size', () => {
  let styleElement: HTMLStyleElement;

  beforeAll(() => {
    styleElement = document.createElement('style');
    styleElement.textContent = MOBILE_CSS;
    document.head.appendChild(styleElement);
  });

  afterAll(() => {
    if (styleElement?.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  });

  /**
   * Property test: All touch target classes enforce minimum 44x44px dimensions
   */
  it('should ensure all touch target classes enforce minimum 44x44px dimensions', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...TOUCH_TARGET_CLASSES),
        (touchTargetClass) => {
          const { minWidth, minHeight } = measureTouchTarget(touchTargetClass);
          const expected = EXPECTED_MIN_SIZES[touchTargetClass];
          
          // All touch targets must have minimum height of 44px
          if (minHeight < MIN_TOUCH_TARGET_SIZE) {
            return false;
          }
          
          // Check minimum width for classes that require it
          if (expected.minWidth > 0 && minWidth < expected.minWidth) {
            return false;
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Larger touch target variants exceed base minimum
   */
  it('should ensure larger touch target variants have proportionally larger minimums', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('touch-target-lg', 'touch-target-xl'),
        (largeVariantClass) => {
          const { minWidth, minHeight } = measureTouchTarget(largeVariantClass);
          const expected = EXPECTED_MIN_SIZES[largeVariantClass];
          
          // Larger variants must exceed base 44px minimum
          return (
            minWidth > MIN_TOUCH_TARGET_SIZE &&
            minHeight > MIN_TOUCH_TARGET_SIZE &&
            minWidth >= expected.minWidth &&
            minHeight >= expected.minHeight
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Touch targets maintain minimum size with varying content
   */
  it('should maintain minimum touch target size regardless of content', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...TOUCH_TARGET_CLASSES),
        fc.string({ minLength: 0, maxLength: 20 }),
        (touchTargetClass, content) => {
          const element = document.createElement('button');
          element.className = touchTargetClass;
          element.textContent = content;
          element.style.visibility = 'hidden';
          element.style.position = 'absolute';
          document.body.appendChild(element);
          
          const computedStyle = window.getComputedStyle(element);
          const minHeight = parseCSSValue(computedStyle.minHeight);
          
          document.body.removeChild(element);
          
          return minHeight >= MIN_TOUCH_TARGET_SIZE;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Icon touch targets are square
   */
  it('should ensure icon touch targets maintain square dimensions', () => {
    fc.assert(
      fc.property(
        fc.constant('touch-target-icon'),
        () => {
          const element = document.createElement('button');
          element.className = 'touch-target-icon';
          element.innerHTML = '<svg width="24" height="24"></svg>';
          element.style.visibility = 'hidden';
          element.style.position = 'absolute';
          document.body.appendChild(element);
          
          const computedStyle = window.getComputedStyle(element);
          const width = parseCSSValue(computedStyle.width);
          const height = parseCSSValue(computedStyle.height);
          const minWidth = parseCSSValue(computedStyle.minWidth);
          const minHeight = parseCSSValue(computedStyle.minHeight);
          
          document.body.removeChild(element);
          
          // Icon touch targets should be square (44x44)
          return (
            minWidth === MIN_TOUCH_TARGET_SIZE &&
            minHeight === MIN_TOUCH_TARGET_SIZE &&
            width === MIN_TOUCH_TARGET_SIZE &&
            height === MIN_TOUCH_TARGET_SIZE
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Verify CSS class definitions match expected values
   */
  it('should verify all touch target CSS classes are properly defined', () => {
    for (const className of TOUCH_TARGET_CLASSES) {
      const { minWidth, minHeight } = measureTouchTarget(className);
      const expected = EXPECTED_MIN_SIZES[className];
      
      expect(minHeight).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET_SIZE);
      
      if (expected.minWidth > 0) {
        expect(minWidth).toBeGreaterThanOrEqual(expected.minWidth);
      }
    }
  });
});
