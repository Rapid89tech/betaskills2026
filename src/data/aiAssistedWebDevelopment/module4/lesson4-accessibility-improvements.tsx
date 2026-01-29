import type { Lesson } from '@/types/course';

export const lesson4AccessibilityImprovements: Lesson = {
  id: 4,
  title: 'Accessibility Improvements',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Accessibility Improvements</h1>

<div class="intro-section">
<p class="lead-text">Learn how to use AI tools to identify and implement accessibility improvements, ensuring your web applications are usable by people with disabilities.</p>
</div>

<h2>Why Accessibility Matters</h2>

<div class="accessibility-importance-section">
<div class="importance-item">
<h3>♿ Inclusive Design</h3>
<p>Accessible websites ensure that people with disabilities can use and navigate your applications effectively.</p>
</div>

<div class="importance-item">
<h3>📋 Legal Compliance</h3>
<p>Many countries have laws requiring web accessibility (ADA, WCAG guidelines).</p>
</div>

<div class="importance-item">
<h3>📈 Business Benefits</h3>
<p>Accessible websites reach a broader audience and improve user experience for everyone.</p>
</div>

<div class="importance-item">
<h3>🔍 SEO Benefits</h3>
<p>Accessibility improvements often enhance search engine optimization.</p>
</div>
</div>

<h2>Common Accessibility Issues</h2>

<div class="accessibility-issues-section">
<div class="issue">
<h3>👁️ Visual Accessibility</h3>
<p>Poor color contrast, missing alt text for images, and insufficient text sizing.</p>
</div>

<div class="issue">
<h3>⌨️ Keyboard Navigation</h3>
<p>Elements that cannot be accessed or operated using only a keyboard.</p>
</div>

<div class="issue">
<h3>🔊 Screen Reader Support</h3>
<p>Missing ARIA labels, improper heading structure, and unclear content organization.</p>
</div>

<div class="issue">
<h3>🎯 Focus Management</h3>
<p>Poor focus indicators and logical tab order.</p>
</div>

<div class="issue">
<h3>📱 Mobile Accessibility</h3>
<p>Touch targets that are too small and content that doesn't adapt to different screen sizes.</p>
</div>
</div>

<h2>AI Tools for Accessibility Analysis</h2>

<div class="ai-accessibility-tools-section">
<div class="tool">
<h3>🔍 Lighthouse</h3>
<p>Google's automated tool that includes accessibility auditing capabilities.</p>
</div>

<div class="tool">
<h3>♿ WAVE</h3>
<p>Web Accessibility Evaluation Tool that identifies accessibility issues.</p>
</div>

<div class="tool">
<h3>🔊 axe DevTools</h3>
<p>Browser extension for automated accessibility testing.</p>
</div>

<div class="tool">
<h3>🤖 AI Code Assistants</h3>
<p>GitHub Copilot, Cursor, and Claude can suggest accessibility improvements.</p>
</div>
</div>

<h2>AI-Assisted Accessibility Techniques</h2>

<div class="accessibility-techniques-section">
<div class="technique">
<h3>🔍 Accessibility Auditing</h3>
<p>AI can analyze code and identify accessibility issues.</p>
<pre><code>// Ask AI: "Check this component for accessibility issues"

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

// AI Response: "Add proper ARIA labels and ensure
// the button has sufficient color contrast."</code></pre>
</div>

<div class="technique">
<h3>♿ ARIA Implementation</h3>
<p>AI can suggest proper ARIA attributes and roles.</p>
<pre><code>// Before
&lt;div class="modal"&gt;
  &lt;h2&gt;Login&lt;/h2&gt;
  &lt;form&gt;
    &lt;input type="email" placeholder="Email" /&gt;
    &lt;input type="password" placeholder="Password" /&gt;
    &lt;button&gt;Submit&lt;/button&gt;
  &lt;/form&gt;
&lt;/div&gt;

// After (AI can suggest this)
&lt;div class="modal" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description"&gt;
  &lt;h2 id="modal-title"&gt;Login&lt;/h2&gt;
  &lt;p id="modal-description"&gt;Please enter your credentials to log in.&lt;/p&gt;
  &lt;form&gt;
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email" aria-required="true" /&gt;
    &lt;label for="password"&gt;Password:&lt;/label&gt;
    &lt;input type="password" id="password" name="password" aria-required="true" /&gt;
    &lt;button type="submit"&gt;Submit&lt;/button&gt;
  &lt;/form&gt;
&lt;/div&gt;</code></pre>
</div>

<div class="technique">
<h3>🎨 Color and Contrast</h3>
<p>AI can suggest color combinations that meet WCAG contrast requirements.</p>
<pre><code>// AI can suggest:
// - Use tools like WebAIM's contrast checker
// - Ensure text has sufficient contrast (4.5:1 for normal text)
// - Provide alternative color schemes
// - Test with color blindness simulators</code></pre>
</div>

<div class="technique">
<h3>⌨️ Keyboard Navigation</h3>
<p>AI can suggest keyboard navigation improvements.</p>
<pre><code>// AI can suggest:
// - Ensure all interactive elements are keyboard accessible
// - Implement proper tab order
// - Add skip links for navigation
// - Handle focus management in modals and dropdowns</code></pre>
</div>
</div>

<h2>Practical Accessibility Examples</h2>

<div class="accessibility-examples-section">
<div class="example">
<h3>♿ Accessible Form Implementation</h3>
<pre><code>// Ask AI: "Make this form more accessible"

const LoginForm = () => {
  return (
    &lt;form&gt;
      &lt;input type="email" placeholder="Email" /&gt;
      &lt;input type="password" placeholder="Password" /&gt;
      &lt;button&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
};

// AI Response: "Add proper labels, error handling, and ARIA attributes."

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;div&gt;
        &lt;label htmlFor="email"&gt;Email Address:&lt;/label&gt;
        &lt;input 
          type="email" 
          id="email"
          name="email"
          aria-describedby="email-error"
          aria-invalid={!!errors.email}
          required
        /&gt;
        {errors.email && (
          &lt;div id="email-error" role="alert"&gt;
            {errors.email}
          &lt;/div&gt;
        )}
      &lt;/div&gt;
      
      &lt;div&gt;
        &lt;label htmlFor="password"&gt;Password:&lt;/label&gt;
        &lt;input 
          type="password" 
          id="password"
          name="password"
          aria-describedby="password-error"
          aria-invalid={!!errors.password}
          required
        /&gt;
        {errors.password && (
          &lt;div id="password-error" role="alert"&gt;
            {errors.password}
          &lt;/div&gt;
        )}
      &lt;/div&gt;
      
      &lt;button type="submit"&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
};</code></pre>
</div>

<div class="example">
<h3>🔊 Screen Reader Friendly Navigation</h3>
<pre><code>// Ask AI: "Improve this navigation for screen readers"

const Navigation = () => {
  return (
    &lt;nav&gt;
      &lt;a href="/"&gt;Home&lt;/a&gt;
      &lt;a href="/about"&gt;About&lt;/a&gt;
      &lt;a href="/contact"&gt;Contact&lt;/a&gt;
    &lt;/nav&gt;
  );
};

// AI Response: "Add proper ARIA labels and skip links."

const Navigation = () => {
  return (
    &lt;&gt;
      &lt;a href="#main-content" className="skip-link"&gt;
        Skip to main content
      &lt;/a&gt;
      
      &lt;nav role="navigation" aria-label="Main navigation"&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;a href="/" aria-current={location.pathname === '/' ? 'page' : undefined}&gt;Home&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href="/about" aria-current={location.pathname === '/about' ? 'page' : undefined}&gt;About&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href="/contact" aria-current={location.pathname === '/contact' ? 'page' : undefined}&gt;Contact&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/nav&gt;
      
      &lt;main id="main-content"&gt;
        {/* Main content */}
      &lt;/main&gt;
    &lt;/&gt;
  );
};</code></pre>
</div>

<div class="example">
<h3>🎯 Accessible Modal Implementation</h3>
<pre><code>// Ask AI: "Make this modal accessible"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    &lt;div className="modal-overlay"&gt;
      &lt;div className="modal"&gt;
        &lt;button onClick={onClose}&gt;×&lt;/button&gt;
        {children}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// AI Response: "Add proper ARIA attributes, focus management, and keyboard support."

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    &lt;div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    &gt;
      &lt;div 
        className="modal"
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      &gt;
        &lt;button 
          onClick={onClose}
          aria-label="Close modal"
          className="close-button"
        &gt;
          ×
        &lt;/button&gt;
        &lt;h2 id="modal-title"&gt;{title}&lt;/h2&gt;
        {children}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};</code></pre>
</div>
</div>

<h2>WCAG Guidelines Implementation</h2>

<div class="wcag-guidelines-section">
<div class="guideline">
<h3>🎯 Perceivable</h3>
<p>Information and user interface components must be presentable to users in ways they can perceive.</p>
<ul>
<li>Provide text alternatives for non-text content</li>
<li>Create content that can be presented in different ways</li>
<li>Make it easier for users to see and hear content</li>
</ul>
</div>

<div class="guideline">
<h3>🔧 Operable</h3>
<p>User interface components and navigation must be operable.</p>
<ul>
<li>Make all functionality available from a keyboard</li>
<li>Provide users enough time to read and use content</li>
<li>Do not design content in a way that is known to cause seizures</li>
<li>Provide ways to help users navigate and find content</li>
</ul>
</div>

<div class="guideline">
<h3>🧠 Understandable</h3>
<p>Information and operation of user interface must be understandable.</p>
<ul>
<li>Make text readable and understandable</li>
<li>Make web pages appear and operate in predictable ways</li>
<li>Help users avoid and correct mistakes</li>
</ul>
</div>

<div class="guideline">
<h3>💪 Robust</h3>
<p>Content must be robust enough to be interpreted by a wide variety of user agents.</p>
<ul>
<li>Maximize compatibility with current and future user tools</li>
</ul>
</div>
</div>

<h2>Accessibility Testing with AI</h2>

<div class="accessibility-testing-section">
<div class="testing-tool">
<h3>🔍 Automated Testing</h3>
<p>Use AI-powered tools to automatically test for accessibility issues.</p>
</div>

<div class="testing-tool">
<h3>👁️ Visual Testing</h3>
<p>AI can help test color contrast and visual accessibility.</p>
</div>

<div class="testing-tool">
<h3>⌨️ Keyboard Testing</h3>
<p>AI can help create automated keyboard navigation tests.</p>
</div>

<div class="testing-tool">
<h3>🔊 Screen Reader Testing</h3>
<p>AI can help test screen reader compatibility and content structure.</p>
</div>
</div>

<h2>Common Accessibility Tools</h2>

<div class="accessibility-tools-section">
<div class="tool">
<h3>♿ WAVE</h3>
<p>Web Accessibility Evaluation Tool for identifying accessibility issues.</p>
</div>

<div class="tool">
<h3>🔍 axe DevTools</h3>
<p>Browser extension for automated accessibility testing.</p>
</div>

<div class="tool">
<h3>🎨 Color Contrast Analyzer</h3>
<p>Tools to check color contrast ratios for WCAG compliance.</p>
</div>

<div class="tool">
<h3>🔊 NVDA/Screen Reader</h3>
<p>Screen reader software for testing with assistive technologies.</p>
</div>

<div class="tool">
<h3>🛠️ ESLint Accessibility</h3>
<p>ESLint plugin for identifying accessibility issues in JavaScript code.</p>
</div>
</div>

<h2>Accessibility Best Practices</h2>

<div class="accessibility-best-practices-section">
<div class="practice-item">
<h3>✅ Semantic HTML</h3>
<p>Use proper HTML elements and semantic markup for better accessibility.</p>
</div>

<div class="practice-item">
<h3>🔊 ARIA Labels</h3>
<p>Use ARIA attributes to provide additional context for screen readers.</p>
</div>

<div class="practice-item">
<h3>⌨️ Keyboard Navigation</h3>
<p>Ensure all interactive elements can be accessed and operated using only a keyboard.</p>
</div>

<div class="practice-item">
<h3>🎨 Color and Contrast</h3>
<p>Use sufficient color contrast and don't rely solely on color to convey information.</p>
</div>

<div class="practice-item">
<h3>📱 Responsive Design</h3>
<p>Ensure content is accessible across different screen sizes and devices.</p>
</div>

<div class="practice-item">
<h3>🧪 Regular Testing</h3>
<p>Test with real users and assistive technologies regularly.</p>
</div>
</div>

<h2>Accessibility Checklist</h2>

<div class="accessibility-checklist-section">
<div class="checklist-item">
<h3>✅ Content Structure</h3>
<ul>
<li>Proper heading hierarchy (h1, h2, h3, etc.)</li>
<li>Descriptive page titles</li>
<li>Alt text for images</li>
<li>Captions for videos</li>
</ul>
</div>

<div class="checklist-item">
<h3>🔊 Screen Reader Support</h3>
<ul>
<li>ARIA labels and roles</li>
<li>Proper form labels</li>
<li>Skip navigation links</li>
<li>Logical content flow</li>
</ul>
</div>

<div class="checklist-item">
<h3>⌨️ Keyboard Accessibility</h3>
<ul>
<li>All interactive elements keyboard accessible</li>
<li>Visible focus indicators</li>
<li>Logical tab order</li>
<li>Keyboard shortcuts for common actions</li>
</ul>
</div>

<div class="checklist-item">
<h3>🎨 Visual Accessibility</h3>
<ul>
<li>Sufficient color contrast</li>
<li>Text resizable up to 200%</li>
<li>No reliance on color alone</li>
<li>Clear visual hierarchy</li>
</ul>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> AI tools can significantly accelerate accessibility improvements by identifying issues and suggesting solutions. However, accessibility is about creating inclusive experiences, so always test with real users and assistive technologies to ensure your improvements are effective.
</div>

</div>`
  }
};
