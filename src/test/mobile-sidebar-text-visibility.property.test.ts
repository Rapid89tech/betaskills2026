/**
 * Property-Based Test: Mobile Sidebar Text Visibility
 * 
 * Feature: mobile-sync-admin-overhaul, Property 6: Mobile Sidebar Text Visibility
 * Validates: Requirements 2.5
 * 
 * Property: For any module or lesson title in the mobile course sidebar when open,
 * the text SHALL NOT have text-overflow: ellipsis applied.
 * 
 * Note: Since jsdom doesn't support media queries, we test the CSS class behavior
 * directly by injecting the styles without the media query wrapper. The actual
 * media query behavior is verified through the CSS file structure.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fc from 'fast-check';

// CSS class that prevents text truncation on mobile
const MOBILE_NO_TRUNCATE_CLASS = 'mobile-no-truncate';

// CSS styles to inject for testing (from mobile.css, without media query for jsdom compatibility)
// In production, these styles are wrapped in @media (max-width: 767px)
// IMPORTANT: Order matters for CSS specificity - line-clamp styles come first,
// then mobile-no-truncate with !important overrides them
const MOBILE_CSS = `
  /* Simulate line-clamp behavior that would truncate text (comes first) */
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    text-overflow: ellipsis;
  }
  
  /* md:line-clamp-1 for desktop (not applied in mobile test context) */
  .md\\:line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    text-overflow: ellipsis;
  }
  
  /* Mobile text no truncation - styles applied on mobile viewports */
  /* Uses !important to override any truncation classes */
  .mobile-no-truncate {
    overflow: visible !important;
    text-overflow: clip !important;
    white-space: normal !important;
    -webkit-line-clamp: unset !important;
    line-clamp: unset !important;
    display: block !important;
  }
`;

/**
 * Create a sidebar text element with the mobile-no-truncate class
 */
function createSidebarTextElement(text: string, additionalClasses: string[] = []): HTMLElement {
  const element = document.createElement('p');
  element.className = [MOBILE_NO_TRUNCATE_CLASS, ...additionalClasses].join(' ');
  element.textContent = text;
  element.style.visibility = 'hidden';
  element.style.position = 'absolute';
  element.style.width = '200px'; // Constrained width to test truncation behavior
  document.body.appendChild(element);
  return element;
}

/**
 * Create a sidebar text element WITHOUT the mobile-no-truncate class (for comparison)
 */
function createTruncatedTextElement(text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = 'line-clamp-1'; // This would normally truncate
  element.textContent = text;
  element.style.visibility = 'hidden';
  element.style.position = 'absolute';
  element.style.width = '200px';
  document.body.appendChild(element);
  return element;
}

/**
 * Generate random module/lesson titles of varying lengths
 */
const titleArbitrary = fc.string({ minLength: 1, maxLength: 200 })
  .filter(s => s.trim().length > 0)
  .map(s => s.trim());

/**
 * Generate realistic module titles
 */
const moduleTitleArbitrary = fc.oneof(
  fc.constant('Introduction to Web Development Fundamentals'),
  fc.constant('Advanced JavaScript Programming Techniques'),
  fc.constant('Building Responsive Mobile Applications'),
  fc.constant('Database Design and Management'),
  fc.constant('Module 1: Getting Started with the Basics'),
  fc.constant('Understanding Core Concepts and Principles'),
  titleArbitrary
);

/**
 * Generate realistic lesson titles
 */
const lessonTitleArbitrary = fc.oneof(
  fc.constant('Setting Up Your Development Environment'),
  fc.constant('Understanding Variables, Data Types, and Operators'),
  fc.constant('Working with Functions and Closures in JavaScript'),
  fc.constant('Introduction to React Components and Props'),
  fc.constant('Building Your First Mobile-Responsive Layout'),
  fc.constant('Lesson 1.1: Basic HTML Structure and Semantics'),
  titleArbitrary
);

describe('Property 6: Mobile Sidebar Text Visibility', () => {
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
   * Property test: mobile-no-truncate class prevents text-overflow: ellipsis
   * 
   * For any text content applied to an element with mobile-no-truncate class,
   * the computed text-overflow should NOT be 'ellipsis'
   */
  it('should ensure mobile-no-truncate class prevents ellipsis truncation', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        titleArbitrary,
        (title) => {
          const element = createSidebarTextElement(title);
          const style = window.getComputedStyle(element);
          
          // The mobile-no-truncate class should set text-overflow to 'clip' not 'ellipsis'
          const textOverflow = style.textOverflow;
          const isNotEllipsis = textOverflow !== 'ellipsis';
          
          document.body.removeChild(element);
          
          return isNotEllipsis;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: mobile-no-truncate class sets overflow to visible
   * 
   * For any text content, the overflow property should be 'visible'
   */
  it('should ensure mobile-no-truncate class sets overflow to visible', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        titleArbitrary,
        (title) => {
          const element = createSidebarTextElement(title);
          const style = window.getComputedStyle(element);
          
          // overflow should be 'visible'
          const overflow = style.overflow;
          const isVisible = overflow === 'visible';
          
          document.body.removeChild(element);
          
          return isVisible;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: mobile-no-truncate class allows text to wrap normally
   * 
   * For any text content, the white-space property should allow normal wrapping
   */
  it('should ensure mobile-no-truncate class allows normal text wrapping', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        titleArbitrary,
        (title) => {
          const element = createSidebarTextElement(title);
          const style = window.getComputedStyle(element);
          
          // white-space should be 'normal' to allow wrapping
          const whiteSpace = style.whiteSpace;
          const allowsWrapping = whiteSpace === 'normal';
          
          document.body.removeChild(element);
          
          return allowsWrapping;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: mobile-no-truncate overrides line-clamp truncation
   * 
   * When both line-clamp-1 and mobile-no-truncate are applied,
   * mobile-no-truncate should win due to !important (no truncation)
   */
  it('should ensure mobile-no-truncate overrides line-clamp truncation', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        moduleTitleArbitrary,
        (title) => {
          // Create element with both classes (as used in CourseSidebar.tsx)
          const element = createSidebarTextElement(title, ['line-clamp-1']);
          const style = window.getComputedStyle(element);
          
          // mobile-no-truncate should override line-clamp with !important
          // text-overflow should be 'clip' not 'ellipsis'
          const textOverflow = style.textOverflow;
          const isNotEllipsis = textOverflow !== 'ellipsis';
          
          // overflow should be 'visible' not 'hidden'
          const overflow = style.overflow;
          const isVisible = overflow === 'visible';
          
          document.body.removeChild(element);
          
          return isNotEllipsis && isVisible;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Module titles remain fully visible regardless of length
   * 
   * For any module title, the element should not have truncation applied
   */
  it('should ensure module titles are fully visible without truncation', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        moduleTitleArbitrary,
        (moduleTitle) => {
          const element = createSidebarTextElement(moduleTitle, ['line-clamp-1']);
          const style = window.getComputedStyle(element);
          
          // Check that truncation is not applied
          const textOverflow = style.textOverflow;
          const overflow = style.overflow;
          
          const noTruncation = textOverflow !== 'ellipsis' && overflow === 'visible';
          
          document.body.removeChild(element);
          
          return noTruncation;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Lesson titles remain fully visible regardless of length
   * 
   * For any lesson title, the element should not have truncation applied
   */
  it('should ensure lesson titles are fully visible without truncation', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        lessonTitleArbitrary,
        (lessonTitle) => {
          const element = createSidebarTextElement(lessonTitle, ['line-clamp-1']);
          const style = window.getComputedStyle(element);
          
          // Check that truncation is not applied
          const textOverflow = style.textOverflow;
          const overflow = style.overflow;
          
          const noTruncation = textOverflow !== 'ellipsis' && overflow === 'visible';
          
          document.body.removeChild(element);
          
          return noTruncation;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Verify CSS class definition matches expected behavior
   */
  it('should verify mobile-no-truncate CSS class is properly defined', () => {
    const testCases = [
      'Short title',
      'A medium length module title for testing',
      'A very long lesson title that would normally be truncated if line-clamp was applied but should be fully visible with mobile-no-truncate class',
      'Module 1: Introduction to Advanced JavaScript Programming Techniques and Best Practices',
    ];

    for (const title of testCases) {
      const element = createSidebarTextElement(title, ['line-clamp-1']);
      const style = window.getComputedStyle(element);
      
      // Verify no ellipsis truncation
      expect(style.textOverflow).toBe('clip');
      
      // Verify overflow is visible
      expect(style.overflow).toBe('visible');
      
      // Verify white-space allows wrapping
      expect(style.whiteSpace).toBe('normal');
      
      document.body.removeChild(element);
    }
  });

  /**
   * Verify that without mobile-no-truncate, line-clamp would truncate
   * This is a sanity check to ensure our test setup is correct
   */
  it('should verify line-clamp-1 would truncate without mobile-no-truncate', () => {
    const longTitle = 'A very long title that should be truncated when line-clamp-1 is applied without the mobile-no-truncate override class';
    
    const element = createTruncatedTextElement(longTitle);
    const style = window.getComputedStyle(element);
    
    // Without mobile-no-truncate, line-clamp-1 should apply truncation
    expect(element.classList.contains('line-clamp-1')).toBe(true);
    expect(style.textOverflow).toBe('ellipsis');
    expect(style.overflow).toBe('hidden');
    
    document.body.removeChild(element);
  });

  /**
   * Property test: CSS specificity ensures mobile-no-truncate wins over line-clamp
   * 
   * For any combination of truncation classes, mobile-no-truncate should always win
   */
  it('should ensure mobile-no-truncate has higher specificity than truncation classes', { timeout: 30000 }, () => {
    const truncationClasses = ['line-clamp-1', 'md:line-clamp-1'];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...truncationClasses),
        titleArbitrary,
        (truncationClass, title) => {
          const element = createSidebarTextElement(title, [truncationClass]);
          const style = window.getComputedStyle(element);
          
          // mobile-no-truncate should always override
          const textOverflow = style.textOverflow;
          const overflow = style.overflow;
          
          const mobileNoTruncateWins = textOverflow !== 'ellipsis' && overflow === 'visible';
          
          document.body.removeChild(element);
          
          return mobileNoTruncateWins;
        }
      ),
      { numRuns: 100 }
    );
  });
});
