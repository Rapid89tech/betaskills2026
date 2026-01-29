import type { Lesson } from '@/types/course';

export const lesson2UnderstandingResponsiveDesign: Lesson = {
  id: 2,
  title: 'Understanding Responsive Design',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Understanding Responsive Design</h1>

<div class="intro-section">
<p class="lead-text">Learn to create websites that adapt seamlessly to different screen sizes and devices (e.g., desktops, tablets, mobiles).</p>
</div>

<h2>Core Principles</h2>

<div class="principles-section">
<div class="principle-item">
<h3>📐 Fluid Layouts</h3>
<p>Use relative units like percentages (%), viewport units (vw/vh), or rem/em for flexible sizing (e.g., width: 100%; for full-width containers).</p>
</div>

<div class="principle-item">
<h3>📱 Media Queries</h3>
<p>Apply styles based on device characteristics (e.g., @media (max-width: 768px) { ... } for mobile styles).</p>
</div>

<div class="principle-item">
<h3>🖼️ Responsive Images</h3>
<p>Use srcset or sizes attributes for adaptive images (e.g., &lt;img src="small.jpg" srcset="large.jpg 1024w"&gt;) and max-width: 100%; for scaling.</p>
</div>

<div class="principle-item">
<h3>🔲 Flexible Grids</h3>
<p>Implement CSS Flexbox or Grid for adaptive layouts (e.g., display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));).</p>
</div>

<div class="principle-item">
<h3>📱 Mobile-First Design</h3>
<p>Start with base styles for smaller screens, then progressively add styles for larger screens via media queries.</p>
</div>
</div>

<h2>Techniques</h2>

<div class="techniques-section">
<div class="technique-item">
<h3>🎯 Breakpoints</h3>
<p>Define common breakpoints (e.g., 576px for mobile, 768px for tablet, 992px for desktop) to adjust layouts.</p>
</div>

<div class="technique-item">
<h3>👆 Touch-Friendly Design</h3>
<p>Ensure buttons and links are large enough (e.g., 48x48px) for touch interactions.</p>
</div>

<div class="technique-item">
<h3>⚡ Performance Optimization</h3>
<p>Minimize CSS/JS file sizes and use lazy loading (e.g., loading="lazy" for images) to improve mobile performance.</p>
</div>

<div class="technique-item">
<h3>♿ Accessibility</h3>
<p>Ensure responsive designs meet WCAG standards (e.g., readable font sizes, sufficient color contrast).</p>
</div>
</div>

<div class="example-section">
<h2>Example: Responsive CSS with media queries</h2>
<pre><code>.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}</code></pre>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>🧪 Test Responsiveness</h3>
<p>Test responsiveness across devices using browser dev tools (e.g., Chrome DevTools) or services like BrowserStack.</p>
</div>

<div class="practice-item">
<h3>🎨 Use Frameworks</h3>
<p>Use frameworks like Tailwind CSS or Bootstrap for pre-built responsive utilities (e.g., Tailwind's sm:, md:, lg: classes).</p>
</div>

<div class="practice-item">
<h3>🖼️ Optimize Images</h3>
<p>Optimize images with tools like TinyPNG to reduce load times on mobile devices.</p>
</div>

<div class="practice-item">
<h3>📱 Mobile-First Approach</h3>
<p>Prioritize mobile-first design to ensure a solid base before scaling up to larger screens.</p>
</div>

<div class="practice-item">
<h3>♿ Audit Accessibility</h3>
<p>Audit accessibility with tools like Lighthouse or WAVE to ensure inclusive responsive designs.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> Responsive design is essential for modern web development. By using fluid layouts, media queries, and mobile-first design principles, you can create websites that provide excellent user experiences across all devices and screen sizes.
</div>

</div>`
  }
};
