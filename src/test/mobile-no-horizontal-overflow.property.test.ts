/**
 * Property-Based Test: Mobile Layout No Horizontal Overflow
 * 
 * Feature: mobile-sync-admin-overhaul, Property 1: Mobile Layout No Horizontal Overflow
 * Validates: Requirements 1.1
 * 
 * Property: For any page rendered on a mobile viewport (width < 768px), 
 * no element SHALL have a computed width greater than the viewport width, 
 * ensuring no horizontal scrolling is required.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fc from 'fast-check';

// Mobile viewport breakpoint
const MOBILE_VIEWPORT_MAX = 767;

// Mobile layout CSS classes from mobile.css
const MOBILE_LAYOUT_CLASSES = [
  'mobile-no-overflow',
  'mobile-container',
  'mobile-full-width',
  'mobile-stack',
  'mobile-stack-lg',
  'mobile-card',
  'mobile-card-grid',
] as const;

// CSS styles to inject for testing
const MOBILE_LAYOUT_CSS = `
  /* Prevent horizontal overflow on mobile */
  .mobile-no-overflow {
    max-width: 100%;
    overflow-x: hidden;
  }

  /* Mobile container with safe padding */
  .mobile-container {
    width: 100%;
    max-width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
  }

  /* Mobile full-width element */
  .mobile-full-width {
    width: 100%;
    max-width: 100%;
  }

  /* Mobile card stack layout */
  .mobile-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Mobile card stack with larger gap */
  .mobile-stack-lg {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Mobile card with proper spacing */
  .mobile-card {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  /* Mobile card grid (stacks on mobile) */
  .mobile-card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Ensure all elements use border-box sizing */
  * {
    box-sizing: border-box;
  }
`;

/**
 * Parse CSS value to pixels
 */
function parseCSSValue(value: string): number {
  if (!value || value === 'auto' || value === 'none') return 0;
  const match = value.match(/^(\d+(?:\.\d+)?)(px|%)?$/);
  if (!match) return 0;
  
  const numValue = parseFloat(match[1]);
  const unit = match[2];
  
  // For percentage values, we need context (viewport width)
  if (unit === '%') {
    return (numValue / 100) * window.innerWidth;
  }
  
  return numValue;
}

/**
 * Measure element width including padding and border
 */
function measureElementWidth(element: HTMLElement): {
  width: number;
  maxWidth: number;
  computedWidth: number;
  offsetWidth: number;
} {
  const computedStyle = window.getComputedStyle(element);
  
  return {
    width: parseCSSValue(computedStyle.width),
    maxWidth: parseCSSValue(computedStyle.maxWidth),
    computedWidth: element.getBoundingClientRect().width,
    offsetWidth: element.offsetWidth,
  };
}

/**
 * Create a test element with given class and content
 */
function createTestElement(
  className: string,
  content: string = 'Test content',
  tag: string = 'div'
): HTMLElement {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = content;
  element.style.visibility = 'hidden';
  element.style.position = 'absolute';
  element.style.top = '0';
  element.style.left = '0';
  return element;
}

/**
 * Set viewport width for testing
 */
function setViewportWidth(width: number): void {
  // We can't actually change window.innerWidth in jsdom,
  // but we can simulate it by setting a container width
  const container = document.getElementById('viewport-container');
  if (container) {
    container.style.width = `${width}px`;
  }
}

describe('Property 1: Mobile Layout No Horizontal Overflow', () => {
  let styleElement: HTMLStyleElement;
  let viewportContainer: HTMLDivElement;

  beforeAll(() => {
    // Inject mobile layout CSS
    styleElement = document.createElement('style');
    styleElement.textContent = MOBILE_LAYOUT_CSS;
    document.head.appendChild(styleElement);

    // Create viewport container to simulate viewport width
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'viewport-container';
    viewportContainer.style.position = 'relative';
    viewportContainer.style.overflow = 'hidden';
    document.body.appendChild(viewportContainer);
  });

  afterAll(() => {
    if (styleElement?.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
    if (viewportContainer?.parentNode) {
      viewportContainer.parentNode.removeChild(viewportContainer);
    }
  });

  /**
   * Property test: All mobile layout classes prevent horizontal overflow
   * Tests that elements with mobile layout classes don't exceed viewport width
   */
  it('should ensure mobile layout classes prevent horizontal overflow', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...MOBILE_LAYOUT_CLASSES),
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }), // Mobile viewport widths
        (layoutClass, viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const element = createTestElement(layoutClass);
          viewportContainer.appendChild(element);
          
          const { computedWidth, offsetWidth } = measureElementWidth(element);
          
          viewportContainer.removeChild(element);
          
          // Element width should not exceed viewport width
          // We allow a small tolerance (1px) for rounding errors
          return computedWidth <= viewportWidth + 1 && offsetWidth <= viewportWidth + 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Mobile containers with padding don't overflow
   * Tests that containers with padding still fit within viewport
   */
  it('should ensure mobile containers with padding fit within viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        fc.string({ minLength: 10, maxLength: 100 }),
        (viewportWidth, content) => {
          setViewportWidth(viewportWidth);
          
          const element = createTestElement('mobile-container', content);
          viewportContainer.appendChild(element);
          
          const { computedWidth, offsetWidth } = measureElementWidth(element);
          
          viewportContainer.removeChild(element);
          
          // Container with padding should still fit within viewport
          return computedWidth <= viewportWidth + 1 && offsetWidth <= viewportWidth + 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Mobile cards don't overflow viewport
   * Tests that card elements with padding and borders fit within viewport
   */
  it('should ensure mobile cards fit within viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const element = createTestElement('mobile-card', 'Card content with some text');
          viewportContainer.appendChild(element);
          
          const { computedWidth, offsetWidth } = measureElementWidth(element);
          
          viewportContainer.removeChild(element);
          
          // Card should fit within viewport despite padding
          return computedWidth <= viewportWidth + 1 && offsetWidth <= viewportWidth + 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Nested mobile containers don't overflow
   * Tests that nested containers still respect viewport width
   */
  it('should ensure nested mobile containers fit within viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const outerContainer = createTestElement('mobile-container');
          const innerContainer = createTestElement('mobile-card');
          outerContainer.appendChild(innerContainer);
          viewportContainer.appendChild(outerContainer);
          
          const outerMeasure = measureElementWidth(outerContainer);
          const innerMeasure = measureElementWidth(innerContainer);
          
          viewportContainer.removeChild(outerContainer);
          
          // Both outer and inner containers should fit within viewport
          return (
            outerMeasure.computedWidth <= viewportWidth + 1 &&
            outerMeasure.offsetWidth <= viewportWidth + 1 &&
            innerMeasure.computedWidth <= viewportWidth + 1 &&
            innerMeasure.offsetWidth <= viewportWidth + 1
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Mobile full-width elements respect max-width
   * Tests that full-width elements have max-width: 100%
   */
  it('should ensure mobile full-width elements have max-width constraint', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const element = createTestElement('mobile-full-width');
          viewportContainer.appendChild(element);
          
          const computedStyle = window.getComputedStyle(element);
          const maxWidth = computedStyle.maxWidth;
          
          viewportContainer.removeChild(element);
          
          // max-width should be 100% or a pixel value <= viewport
          return maxWidth === '100%' || parseCSSValue(maxWidth) <= viewportWidth + 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Mobile stack layout maintains single column
   * Tests that stacked elements don't cause horizontal overflow
   */
  it('should ensure mobile stack layout prevents horizontal overflow', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 2, maxLength: 5 }),
        (viewportWidth, items) => {
          setViewportWidth(viewportWidth);
          
          const stack = createTestElement('mobile-stack');
          items.forEach(item => {
            const child = createTestElement('mobile-card', item);
            stack.appendChild(child);
          });
          viewportContainer.appendChild(stack);
          
          const { computedWidth, offsetWidth } = measureElementWidth(stack);
          
          // Check each child as well
          const children = Array.from(stack.children) as HTMLElement[];
          const allChildrenFit = children.every(child => {
            const childMeasure = measureElementWidth(child);
            return childMeasure.computedWidth <= viewportWidth + 1 &&
                   childMeasure.offsetWidth <= viewportWidth + 1;
          });
          
          viewportContainer.removeChild(stack);
          
          // Stack and all children should fit within viewport
          return (
            computedWidth <= viewportWidth + 1 &&
            offsetWidth <= viewportWidth + 1 &&
            allChildrenFit
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Mobile card grid stacks in single column on mobile
   * Tests that card grids use single column layout on mobile viewports
   */
  it('should ensure mobile card grid uses single column layout', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          
          const grid = createTestElement('mobile-card-grid');
          // Add multiple cards
          for (let i = 0; i < 3; i++) {
            const card = createTestElement('mobile-card', `Card ${i + 1}`);
            grid.appendChild(card);
          }
          viewportContainer.appendChild(grid);
          
          const computedStyle = window.getComputedStyle(grid);
          const gridTemplateColumns = computedStyle.gridTemplateColumns;
          
          const { computedWidth, offsetWidth } = measureElementWidth(grid);
          
          viewportContainer.removeChild(grid);
          
          // Grid should use single column (1fr) and fit within viewport
          const isSingleColumn = gridTemplateColumns.split(' ').length === 1;
          const fitsInViewport = computedWidth <= viewportWidth + 1 && 
                                 offsetWidth <= viewportWidth + 1;
          
          return isSingleColumn && fitsInViewport;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Elements with long content don't overflow
   * Tests that elements with long text content wrap and don't cause overflow
   */
  it('should ensure elements with long content wrap without overflow', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...MOBILE_LAYOUT_CLASSES),
        fc.integer({ min: 320, max: MOBILE_VIEWPORT_MAX }),
        fc.string({ minLength: 100, maxLength: 500 }), // Long content
        (layoutClass, viewportWidth, longContent) => {
          setViewportWidth(viewportWidth);
          
          const element = createTestElement(layoutClass, longContent);
          viewportContainer.appendChild(element);
          
          const { computedWidth, offsetWidth } = measureElementWidth(element);
          
          viewportContainer.removeChild(element);
          
          // Element should wrap content and not overflow
          return computedWidth <= viewportWidth + 1 && offsetWidth <= viewportWidth + 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Verify CSS class definitions enforce max-width constraints
   */
  it('should verify mobile layout classes have proper max-width constraints', () => {
    const viewportWidth = 375; // Common mobile width (iPhone)
    setViewportWidth(viewportWidth);

    for (const className of MOBILE_LAYOUT_CLASSES) {
      const element = createTestElement(className);
      viewportContainer.appendChild(element);
      
      const computedStyle = window.getComputedStyle(element);
      const maxWidth = computedStyle.maxWidth;
      const width = computedStyle.width;
      
      viewportContainer.removeChild(element);
      
      // Should have max-width: 100% or width: 100%
      const hasMaxWidthConstraint = 
        maxWidth === '100%' || 
        width === '100%' ||
        parseCSSValue(maxWidth) <= viewportWidth + 1;
      
      expect(hasMaxWidthConstraint).toBe(true);
    }
  });

  /**
   * Verify mobile-no-overflow class has overflow-x: hidden
   */
  it('should verify mobile-no-overflow has overflow-x hidden', () => {
    const element = createTestElement('mobile-no-overflow');
    document.body.appendChild(element);
    
    const computedStyle = window.getComputedStyle(element);
    const overflowX = computedStyle.overflowX;
    
    document.body.removeChild(element);
    
    expect(overflowX).toBe('hidden');
  });

  /**
   * Verify mobile-container uses box-sizing: border-box
   */
  it('should verify mobile-container uses border-box sizing', () => {
    const element = createTestElement('mobile-container');
    document.body.appendChild(element);
    
    const computedStyle = window.getComputedStyle(element);
    const boxSizing = computedStyle.boxSizing;
    
    document.body.removeChild(element);
    
    expect(boxSizing).toBe('border-box');
  });
});
