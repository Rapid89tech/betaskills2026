import type { Lesson } from '@/types/course';

export const lesson3AskingAIForCodeSnippetsAndExplanations: Lesson = {
  id: 3,
  title: 'Asking AI for Code Snippets & Explanations',
  duration: '20 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Asking AI for Code Snippets & Explanations</h1>

<div class="intro-section">
<p class="lead-text">Use AI tools to generate code snippets and explain concepts in plain language, enhancing understanding and speeding up development.</p>
</div>

<h2>Code Snippets</h2>

<div class="code-snippets-section">
<p>Prompt AI tools like ChatGPT, Claude, or Grok to generate specific code (e.g., "Write an HTML form with CSS styling for a login page").</p>

<div class="example-section">
<h3>Example Prompt</h3>
<p>"Create a responsive CSS Grid layout for a blog with three columns on desktop and one on mobile."</p>

<h3>Example Output (from ChatGPT)</h3>
<pre><code>.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}</code></pre>
</div>
</div>

<h2>Explanations</h2>

<div class="explanations-section">
<p>Ask AI to clarify concepts (e.g., "Explain how CSS Flexbox works with examples").</p>

<div class="example-section">
<h3>Example Response (from Grok)</h3>
<p>"Flexbox is a CSS layout module for arranging elements in a flexible container. For example, display: flex; flex-direction: row; aligns items horizontally, while justify-content: center; centers them."</p>

<p>Use AI to break down errors (e.g., "Why does document.querySelector return null?").</p>
</div>
</div>

<h2>Tools</h2>

<div class="tools-section">
<div class="tool-item">
<h3>🤖 ChatGPT (OpenAI)</h3>
<p>Generates code and explains concepts (available via chat.openai.com, free tier or GPT-4 subscription).</p>
</div>

<div class="tool-item">
<h3>🧠 Claude (Anthropic)</h3>
<p>Provides clear, safe explanations and code snippets (available via anthropic.com, free tier limited).</p>
</div>

<div class="tool-item">
<h3>🤖 Grok (xAI)</h3>
<p>Conversational AI for code generation and explanations (available via grok.com or X apps, free tier with quotas).</p>
</div>

<div class="tool-item">
<h3>🚀 GitHub Copilot</h3>
<p>Suggests code snippets in real-time within IDEs like VS Code (subscription-based, $10/month).</p>
</div>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>📝 Write Specific Prompts</h3>
<p>Write specific, detailed prompts (e.g., "Generate a JavaScript function to toggle a mobile menu" instead of "Help with JavaScript").</p>
</div>

<div class="practice-item">
<h3>🔍 Validate AI Outputs</h3>
<p>Validate AI-generated code with linters (e.g., ESLint for JS, Stylelint for CSS) and test in a browser (e.g., Chrome).</p>
</div>

<div class="practice-item">
<h3>📚 Use for Learning</h3>
<p>Use AI explanations to reinforce learning, then practice manually to build muscle memory.</p>
</div>

<div class="practice-item">
<h3>💾 Save Useful Snippets</h3>
<p>Save useful snippets in a code repository (e.g., GitHub Gist) for future reference.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> AI tools can significantly accelerate your learning and development by providing code snippets and explanations on demand. However, always validate the outputs and use them as learning aids rather than complete solutions.
</div>

</div>`
  }
};
