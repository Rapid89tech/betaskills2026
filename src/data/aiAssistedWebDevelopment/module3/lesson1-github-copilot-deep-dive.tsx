import type { Lesson } from '@/types/course';

export const lesson1GitHubCopilotDeepDive: Lesson = {
  id: 1,
  title: 'GitHub Copilot Deep Dive',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>GitHub Copilot Deep Dive</h1>

<div class="intro-section">
<p class="lead-text">Master GitHub Copilot's features, setup, and advanced usage for web development tasks.</p>
</div>

<h2>What is GitHub Copilot?</h2>

<div class="copilot-overview">
<p>GitHub Copilot is an AI-powered code completion tool that suggests entire lines or blocks of code as you type. It's trained on billions of lines of public code and can understand context from your comments, function names, and existing code.</p>
</div>

<h2>Setup and Installation</h2>

<div class="setup-section">
<div class="setup-step">
<h3>1. Prerequisites</h3>
<ul>
<li>GitHub account</li>
<li>VS Code or other supported IDE</li>
<li>GitHub Copilot subscription ($10/month for individuals)</li>
</ul>
</div>

<div class="setup-step">
<h3>2. Installation Steps</h3>
<ol>
<li>Install the GitHub Copilot extension in VS Code</li>
<li>Sign in with your GitHub account</li>
<li>Start a free trial or subscribe to Copilot</li>
<li>Restart VS Code to activate the extension</li>
</ol>
</div>
</div>

<h2>Core Features</h2>

<div class="features-section">
<div class="feature-item">
<h3>💡 Inline Suggestions</h3>
<p>Copilot provides real-time code suggestions as you type, appearing in gray text that you can accept with Tab or continue typing to ignore.</p>
</div>

<div class="feature-item">
<h3>🔍 Context-Aware Completions</h3>
<p>Copilot understands your project's context, including file structure, imports, and existing code patterns.</p>
</div>

<div class="feature-item">
<h3>📝 Comment-to-Code</h3>
<p>Write comments describing what you want, and Copilot generates the corresponding code.</p>
</div>

<div class="feature-item">
<h3>🔄 Function Completion</h3>
<p>Start writing a function signature, and Copilot completes the implementation based on the function name and parameters.</p>
</div>

<div class="feature-item">
<h3>🎯 Multi-Line Suggestions</h3>
<p>Copilot can suggest entire blocks of code, including loops, conditionals, and complex logic.</p>
</div>
</div>

<h2>Web Development Use Cases</h2>

<div class="use-cases-section">
<div class="use-case">
<h3>HTML Structure Generation</h3>
<p>Write comments like "Create a responsive navigation bar" and Copilot generates the HTML structure.</p>
</div>

<div class="use-case">
<h3>CSS Styling</h3>
<p>Start writing CSS selectors, and Copilot suggests complete style rules with modern CSS properties.</p>
</div>

<div class="use-case">
<h3>JavaScript Functions</h3>
<p>Define function signatures, and Copilot implements the logic based on the function name and parameters.</p>
</div>

<div class="use-case">
<h3>React Components</h3>
<p>Create React components with proper hooks, state management, and JSX structure.</p>
</div>

<div class="use-case">
<h3>API Integration</h3>
<p>Generate fetch requests, error handling, and data processing code for web APIs.</p>
</div>
</div>

<h2>Advanced Techniques</h2>

<div class="advanced-techniques-section">
<div class="technique">
<h3>🎯 Specific Prompts</h3>
<p>Use detailed comments to get more accurate suggestions:</p>
<pre><code>// Create a function that validates email format using regex
// Generate a responsive CSS grid layout for a blog
// Write a React hook for managing form state</code></pre>
</div>

<div class="technique">
<h3>🔄 Iterative Refinement</h3>
<p>Start with a basic suggestion and refine it by adding more specific requirements in subsequent comments.</p>
</div>

<div class="technique">
<h3>📚 Learning from Examples</h3>
<p>Show Copilot examples of your coding style by writing a few lines manually, then let it continue in the same pattern.</p>
</div>

<div class="technique">
<h3>🔧 Customizing Suggestions</h3>
<p>Use Copilot's settings to adjust suggestion frequency and customize the AI's behavior to match your preferences.</p>
</div>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>✅ Review All Suggestions</h3>
<p>Always review Copilot's suggestions before accepting them to ensure they match your requirements and coding standards.</p>
</div>

<div class="practice-item">
<h3>🔍 Understand the Code</h3>
<p>Don't accept code you don't understand. Take time to learn from Copilot's suggestions and improve your knowledge.</p>
</div>

<div class="practice-item">
<h3>📝 Use Clear Comments</h3>
<p>Write clear, specific comments to get better suggestions from Copilot.</p>
</div>

<div class="practice-item">
<h3>🔄 Iterate and Improve</h3>
<p>Use Copilot as a starting point and refine the generated code to match your project's specific needs.</p>
</div>

<div class="practice-item">
<h3>🧪 Test Generated Code</h3>
<p>Always test Copilot-generated code to ensure it works correctly in your specific context.</p>
</div>
</div>

<h2>Limitations and Considerations</h2>

<div class="limitations-section">
<div class="limitation">
<h3>⚠️ Code Quality</h3>
<p>Copilot may generate code that works but isn't optimal or follows best practices. Always review and refine suggestions.</p>
</div>

<div class="limitation">
<h3>🔒 Privacy and Security</h3>
<p>Be cautious when using Copilot with sensitive or proprietary code, as suggestions are based on public repositories.</p>
</div>

<div class="limitation">
<h3>📚 Learning Dependency</h3>
<p>Relying too heavily on Copilot can hinder learning. Use it as a tool to enhance productivity, not replace understanding.</p>
</div>

<div class="limitation">
<h3>🔄 Context Limitations</h3>
<p>Copilot may not always understand complex project-specific requirements or business logic.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> GitHub Copilot is a powerful tool that can significantly accelerate web development when used effectively. By understanding its features, limitations, and best practices, you can leverage it to enhance productivity while maintaining code quality and learning.
</div>

</div>`
  }
};
