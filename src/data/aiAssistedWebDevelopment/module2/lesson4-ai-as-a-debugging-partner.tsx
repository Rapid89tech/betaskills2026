import type { Lesson } from '@/types/course';

export const lesson4AIAsADebuggingPartner: Lesson = {
  id: 4,
  title: 'AI as a Debugging Partner',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>AI as a Debugging Partner</h1>

<div class="intro-section">
<p class="lead-text">Use AI tools to identify, explain, and fix errors in HTML, CSS, or JavaScript code, improving debugging efficiency.</p>
</div>

<h2>Error Identification</h2>

<div class="error-identification-section">
<p>Share error messages or code with AI (e.g., "Why is my CSS display: flex not working?").</p>

<div class="example-section">
<h3>Example Prompt</h3>
<p>"Debug this JavaScript: document.getElementById('btn').onclick = alert('Clicked'); shows an error."</p>

<h3>Example Response (from Claude)</h3>
<p>"The error occurs because alert is called immediately. Use a function: document.getElementById('btn').onclick = () => alert('Clicked');."</p>
</div>
</div>

<h2>Code Optimization</h2>

<div class="optimization-section">
<p>Ask AI to refactor code for better performance or readability (e.g., "Optimize this CSS for faster rendering").</p>

<div class="example-section">
<h3>Example</h3>
<p>AI suggests replacing margin-left: 10px; margin-right: 10px; with margin: 0 10px;.</p>
</div>
</div>

<h2>Real-Time Debugging</h2>

<div class="realtime-debugging-section">
<p>Tools like Cursor or GitHub Copilot highlight errors in IDEs and suggest fixes (e.g., fixing a missing semicolon in JavaScript).</p>

<div class="example-section">
<h3>Example</h3>
<p>Copilot suggests adding try/catch to handle API errors in a fetch request.</p>
</div>
</div>

<h2>Tools</h2>

<div class="tools-section">
<div class="tool-item">
<h3>💻 Cursor</h3>
<p>AI-powered IDE with real-time error detection and fix suggestions (available via cursor.sh, free tier or subscription).</p>
</div>

<div class="tool-item">
<h3>🚀 GitHub Copilot</h3>
<p>Detects syntax/logical errors in VS Code and suggests corrections (subscription-based).</p>
</div>

<div class="tool-item">
<h3>🤖 ChatGPT/Claude/Grok</h3>
<p>Analyze pasted code or error logs to provide fixes and explanations.</p>
</div>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>📋 Share Complete Information</h3>
<p>Share complete error messages or code snippets with AI for accurate debugging.</p>
</div>

<div class="practice-item">
<h3>🧪 Test in Development</h3>
<p>Test AI-suggested fixes in a development environment (e.g., CodePen, JSFiddle) before production.</p>
</div>

<div class="practice-item">
<h3>🔧 Combine with Dev Tools</h3>
<p>Combine AI debugging with browser dev tools (e.g., Chrome Console) to verify fixes.</p>
</div>

<div class="practice-item">
<h3>📝 Log Common Errors</h3>
<p>Log common errors and AI solutions in a digital notebook (e.g., Notion) for future reference.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> AI can be an excellent debugging partner, helping you identify and fix errors quickly. However, always test AI-suggested fixes and use them in combination with traditional debugging tools for the best results.
</div>

</div>`
  }
};
