import type { Lesson } from '@/types/course';

export const lesson3BenefitsAndLimitationsOfAITools: Lesson = {
  id: 3,
  title: 'Benefits & Limitations of AI Tools',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/dPmqmDLKv5c',
    textContent: `<div class="lesson-content">

<h1>Benefits & Limitations of AI Tools</h1>

<div class="intro-section">
<p class="lead-text">Evaluate the advantages and challenges of AI-assisted development to make informed decisions about tool usage.</p>
</div>

<h2>Benefits</h2>

<div class="benefits-section">
<div class="benefit-item">
<h3>📈 Increased Productivity</h3>
<p>AI automates repetitive tasks (e.g., boilerplate code, CSS styling), allowing developers to focus on complex logic or creative design. Example: GitHub Copilot reduces coding time by up to 40% for routine tasks (based on GitHub's 2023 studies).</p>
</div>

<div class="benefit-item">
<h3>🎓 Accessibility for Beginners</h3>
<p>AI lowers the entry barrier by generating code or designs from simple prompts, enabling non-experts to create functional websites (e.g., Wix AI for small business owners).</p>
</div>

<div class="benefit-item">
<h3>✅ Error Reduction</h3>
<p>AI tools suggest fixes for syntax errors, logical bugs, or design inconsistencies, improving code/design quality (e.g., Cursor's real-time debugging).</p>
</div>

<div class="benefit-item">
<h3>⚡ Rapid Prototyping</h3>
<p>AI generates wireframes, mockups, or codebases quickly, speeding up iteration cycles (e.g., Framer AI creates a draft website in seconds).</p>
</div>

<div class="benefit-item">
<h3>🔄 Cross-Functional Support</h3>
<p>AI assists with coding, design, content generation, and documentation, streamlining multidisciplinary workflows.</p>
</div>

<div class="benefit-item">
<h3>📚 Learning Aid</h3>
<p>AI explains complex concepts or code (e.g., Claude explaining React hooks), helping developers upskill.</p>
</div>
</div>

<h2>Limitations</h2>

<div class="limitations-section">
<div class="limitation-item">
<h3>⚠️ Accuracy Issues</h3>
<p>AI may generate incorrect or suboptimal code/designs, requiring human validation (e.g., ChatGPT suggesting deprecated HTML tags).</p>
</div>

<div class="limitation-item">
<h3>🔍 Lack of Context</h3>
<p>AI struggles with project-specific nuances or undocumented requirements, leading to generic outputs (e.g., Copilot missing custom API constraints).</p>
</div>

<div class="limitation-item">
<h3>🔄 Dependency Risk</h3>
<p>Over-reliance on AI can hinder learning core programming/design skills or lead to homogenized outputs.</p>
</div>

<div class="limitation-item">
<h3>⚖️ Ethical Concerns</h3>
<p>AI-generated code may include biases, security vulnerabilities, or unlicensed code snippets, risking legal issues (e.g., Copilot reproducing copyrighted code).</p>
</div>

<div class="limitation-item">
<h3>🐌 Performance Overhead</h3>
<p>Some AI tools (e.g., heavy IDE plugins) may slow down systems, especially on low-spec hardware.</p>
</div>

<div class="limitation-item">
<h3>💰 Cost and Accessibility</h3>
<p>Premium AI tools (e.g., GitHub Copilot Pro, Claude Pro) require subscriptions, which may be prohibitive for freelancers or students.</p>
</div>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>✅ Always Validate AI Outputs</h3>
<p>Always validate AI outputs with manual reviews, unit tests (e.g., Jest for JavaScript), or design audits (e.g., Lighthouse for web accessibility).</p>
</div>

<div class="practice-item">
<h3>🎯 Use AI for Inspiration</h3>
<p>Use AI tools for inspiration or scaffolding, not as a replacement for critical thinking or domain expertise.</p>
</div>

<div class="practice-item">
<h3>📝 Document AI Usage</h3>
<p>Document AI usage in projects to ensure transparency, especially for client work or open-source contributions.</p>
</div>

<div class="practice-item">
<h3>⚖️ Stay Informed About Legal Issues</h3>
<p>Stay informed about legal and ethical guidelines (e.g., GitHub's Copilot licensing policies) to avoid intellectual property issues.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> AI tools are powerful allies in web development, but they work best when combined with human expertise, critical thinking, and proper validation. Understanding both their benefits and limitations helps you make informed decisions about when and how to use them effectively.
</div>

</div>`
  }
};
