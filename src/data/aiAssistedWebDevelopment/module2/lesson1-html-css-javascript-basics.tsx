import type { Lesson } from '@/types/course';

export const lesson1HTMLCSSJavaScriptBasics: Lesson = {
  id: 1,
  title: 'HTML, CSS, JavaScript Basics',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>HTML, CSS, JavaScript Basics</h1>

<div class="intro-section">
<p class="lead-text">Review the foundational technologies that power web development, ensuring learners can build structured, styled, and interactive web pages.</p>
</div>

<h2>HTML (HyperText Markup Language)</h2>

<div class="html-section">
<h3>Role</h3>
<p>Provides the structure and content of a webpage using semantic tags to define elements like headings, paragraphs, images, and links.</p>

<div class="key-concepts">
<h3>Key Concepts</h3>

<div class="concept-item">
<h4>Tags and Elements</h4>
<p>Use tags like &lt;div&gt;, &lt;h1&gt;, &lt;p&gt;, &lt;img&gt;, &lt;a&gt; to structure content (e.g., &lt;h1&gt;Welcome&lt;/h1&gt; for a heading).</p>
</div>

<div class="concept-item">
<h4>Semantic HTML</h4>
<p>Employ tags like &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt; for better accessibility and SEO (e.g., &lt;nav&gt; for navigation menus).</p>
</div>

<div class="concept-item">
<h4>Attributes</h4>
<p>Add functionality or metadata (e.g., &lt;img src="logo.png" alt="Company Logo"&gt; for images).</p>
</div>

<div class="concept-item">
<h4>Forms</h4>
<p>Create interactive inputs (e.g., &lt;form&gt;&lt;input type="text" name="username"&gt;&lt;/form&gt; for user data collection).</p>
</div>
</div>

<div class="example-section">
<h3>Example: A simple webpage structure</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;My Website&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;&lt;h1&gt;Welcome&lt;/h1&gt;&lt;/header&gt;
  &lt;main&gt;&lt;p&gt;This is my first webpage.&lt;/p&gt;&lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>
</div>

<h2>CSS (Cascading Style Sheets)</h2>

<div class="css-section">
<h3>Role</h3>
<p>Styles the appearance of HTML elements, controlling layout, colors, fonts, and responsiveness.</p>

<div class="key-concepts">
<h3>Key Concepts</h3>

<div class="concept-item">
<h4>Selectors</h4>
<p>Target elements (e.g., h1 { color: blue; } styles all &lt;h1&gt; tags).</p>
</div>

<div class="concept-item">
<h4>Properties</h4>
<p>Define styles like color, font-size, margin, padding (e.g., p { font-size: 16px; }).</p>
</div>

<div class="concept-item">
<h4>Box Model</h4>
<p>Governs element dimensions (content, padding, border, margin).</p>
</div>

<div class="concept-item">
<h4>Flexbox and Grid</h4>
<p>Layout systems for arranging elements (e.g., display: flex; for flexible layouts, display: grid; for grid-based designs).</p>
</div>

<div class="concept-item">
<h4>External CSS</h4>
<p>Link stylesheets via &lt;link rel="stylesheet" href="styles.css"&gt;.</p>
</div>
</div>

<div class="example-section">
<h3>Example: Styling a webpage</h3>
<pre><code>body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
h1 {
  color: #333;
  text-align: center;
}</code></pre>
</div>
</div>

<h2>JavaScript</h2>

<div class="javascript-section">
<h3>Role</h3>
<p>Adds interactivity and dynamic behavior to webpages (e.g., form validation, animations, API calls).</p>

<div class="key-concepts">
<h3>Key Concepts</h3>

<div class="concept-item">
<h4>DOM Manipulation</h4>
<p>Access and modify HTML elements (e.g., document.getElementById("myId").textContent = "Hello";).</p>
</div>

<div class="concept-item">
<h4>Events</h4>
<p>Handle user actions (e.g., element.addEventListener("click", myFunction); for button clicks).</p>
</div>

<div class="concept-item">
<h4>Variables and Data Types</h4>
<p>Use let, const, or var for strings, numbers, arrays, etc.</p>
</div>

<div class="concept-item">
<h4>Functions</h4>
<p>Define reusable code (e.g., function toggleMenu() { ... } for navigation toggles).</p>
</div>

<div class="concept-item">
<h4>ES6+ Features</h4>
<p>Use arrow functions (e.g., () => console.log("Hi")), destructuring, and promises for modern coding.</p>
</div>
</div>

<div class="example-section">
<h3>Example: Adding interactivity</h3>
<pre><code>const button = document.querySelector("#myButton");
button.addEventListener("click", () => {
  alert("Button clicked!");
});</code></pre>
</div>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>✅ Write Semantic HTML</h3>
<p>Write semantic HTML for accessibility (e.g., use &lt;button&gt; instead of &lt;div&gt; for clickable elements).</p>
</div>

<div class="practice-item">
<h3>🎨 Use CSS Custom Properties</h3>
<p>Use CSS custom properties (e.g., --primary-color: #007bff;) for maintainable styles.</p>
</div>

<div class="practice-item">
<h3>📦 Organize JavaScript</h3>
<p>Organize JavaScript into modular functions or files to improve readability and scalability.</p>
</div>

<div class="practice-item">
<h3>🔍 Validate Code</h3>
<p>Validate HTML/CSS with tools like W3C Validator and JavaScript with ESLint to ensure standards compliance.</p>
</div>

<div class="practice-item">
<h3>💬 Comment Code</h3>
<p>Comment code (e.g., /* Reset margins */ in CSS, // Toggle menu visibility in JS) for clarity.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> HTML provides structure, CSS adds styling, and JavaScript enables interactivity. Mastering these three technologies is the foundation of web development, and AI tools can help accelerate learning and development in all three areas.
</div>

</div>`
  }
};
