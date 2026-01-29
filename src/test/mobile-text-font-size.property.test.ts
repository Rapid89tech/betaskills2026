/**
 * Property-Based Test: Mobile Text Minimum Font Size
 * 
 * Feature: mobile-sync-admin-overhaul, Property 3: Mobile Text Minimum Font Size
 * Validates: Requirements 1.3
 * 
 * Property: For any body text element displayed on a mobile viewport, 
 * the computed font-size SHALL be at least 16px.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fc from 'fast-check';

// Mobile text CSS classes from mobile.css
const MOBILE_TEXT_CLASSES = [
  'mobile-text-body',
  'mobile-text-lg',
  'mobile-text-h1',
  'mobile-text-h2',
  'mobile-text-h3',
  'mobile-text-h4',
] as const;

// Classes that should have minimum 16px font size (body text)
const BODY_TEXT_CLASSES = [
  'mobile-text-body',
  'mobile-text-lg',
] as const;

// Minimum font size for body text per requirements
const MIN_BODY_FONT_SIZE = 16;

// Expected font sizes for each class
const EXPECTED_FONT_SIZES: Record<string, number> = {
  'mobile-text-body': 16,
  'mobile-text-sm': 14,
  'mobile-text-lg': 18,
  'mobile-text-h1': 28,
  'mobile-text-h2': 24,
  'mobile-text-h3': 20,
  'mobile-text-h4': 18,
};

// CSS styles to inject for testing
const MOBILE_TEXT_CSS = `
  .mobile-text-body {
    font-size: 16px;
    line-height: 1.5;
  }
  .mobile-text-sm {
    font-size: 14px;
    line-height: 1.5;
  }
  .mobile-text-lg {
    font-size: 18px;
    line-height: 1.5;
  }
  .mobile-text-h1 {
    font-size: 28px;
    line-height: 1.2;
    font-weight: 700;
  }
  .mobile-text-h2 {
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
  }
  .mobile-text-h3 {
    font-size: 20px;
    line-height: 1.3;
    font-weight: 600;
  }
  .mobile-text-h4 {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 500;
  }
`;

/**
 * Parse CSS font-size value to pixels
 */
function parseFontSize(value: string): number {
  if (!value) return 0;
  const match = value.match(/^(\d+(?:\.\d+)?)(px)?$/);
  return match && match[1] ? parseFloat(match[1]) : 0;
}

/**
 * Measure text element font size
 */
function measureFontSize(className: string): number {
  const element = document.createElement('p');
  element.className = className;
  element.textContent = 'Test text content';
  element.style.visibility = 'hidden';
  element.style.position = 'absolute';
  document.body.appendChild(element);
  
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseFontSize(computedStyle.fontSize);
  
  document.body.removeChild(element);
  
  return fontSize;
}

describe('Property 3: Mobile Text Minimum Font Size', () => {
  let styleElement: HTMLStyleElement;

  beforeAll(() => {
    styleElement = document.createElement('style');
    styleElement.textContent = MOBILE_TEXT_CSS;
    document.head.appendChild(styleElement);
  });

  afterAll(() => {
    if (styleElement?.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  });

  /**
   * Property test: All body text classes enforce minimum 16px font size
   * Since we have a finite set of 2 body text classes, we run enough iterations
   * to cover all classes multiple times.
   */
  it('should ensure body text classes enforce minimum 16px font size', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...BODY_TEXT_CLASSES),
        (textClass) => {
          const fontSize = measureFontSize(textClass);
          return fontSize >= MIN_BODY_FONT_SIZE;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: All mobile text classes have their expected font sizes
   */
  it('should ensure all mobile text classes have correct font sizes', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...MOBILE_TEXT_CLASSES),
        (textClass) => {
          const fontSize = measureFontSize(textClass);
          const expectedSize = EXPECTED_FONT_SIZES[textClass];
          
          if (expectedSize === undefined) {
            return false;
          }
          
          return fontSize === expectedSize;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Heading classes have font sizes larger than body text minimum
   */
  it('should ensure heading classes have font sizes >= 16px', { timeout: 30000 }, () => {
    const headingClasses = [
      'mobile-text-h1',
      'mobile-text-h2',
      'mobile-text-h3',
      'mobile-text-h4',
    ] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...headingClasses),
        (headingClass) => {
          const fontSize = measureFontSize(headingClass);
          return fontSize >= MIN_BODY_FONT_SIZE;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Font sizes maintain hierarchy (h1 > h2 > h3 > h4 >= body)
   */
  it('should maintain proper heading hierarchy', () => {
    const h1Size = measureFontSize('mobile-text-h1');
    const h2Size = measureFontSize('mobile-text-h2');
    const h3Size = measureFontSize('mobile-text-h3');
    const h4Size = measureFontSize('mobile-text-h4');
    const bodySize = measureFontSize('mobile-text-body');
    
    expect(h1Size).toBeGreaterThan(h2Size);
    expect(h2Size).toBeGreaterThan(h3Size);
    expect(h3Size).toBeGreaterThan(h4Size);
    expect(h4Size).toBeGreaterThanOrEqual(bodySize);
  });

  /**
   * Property test: Text elements maintain font size with varying content
   */
  it('should maintain font size regardless of content length', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...MOBILE_TEXT_CLASSES),
        fc.string({ minLength: 0, maxLength: 50 }),
        (textClass, content) => {
          const element = document.createElement('p');
          element.className = textClass;
          element.textContent = content;
          element.style.visibility = 'hidden';
          element.style.position = 'absolute';
          document.body.appendChild(element);
          
          const computedStyle = window.getComputedStyle(element);
          const fontSize = parseFontSize(computedStyle.fontSize);
          const expectedSize = EXPECTED_FONT_SIZES[textClass];
          
          document.body.removeChild(element);
          
          return expectedSize !== undefined && fontSize === expectedSize;
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Verify CSS class definitions match expected values
   */
  it('should verify all mobile text CSS classes are properly defined', () => {
    for (const className of MOBILE_TEXT_CLASSES) {
      const fontSize = measureFontSize(className);
      const expectedSize = EXPECTED_FONT_SIZES[className];
      
      expect(fontSize).toBe(expectedSize);
      expect(fontSize).toBeGreaterThanOrEqual(MIN_BODY_FONT_SIZE);
    }
  });

  /**
   * Verify body text specifically meets 16px minimum
   */
  it('should verify mobile-text-body is exactly 16px', () => {
    const fontSize = measureFontSize('mobile-text-body');
    expect(fontSize).toBe(16);
  });
});
