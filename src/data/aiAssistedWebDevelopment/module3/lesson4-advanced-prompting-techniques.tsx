import type { Lesson } from '@/types/course';

export const lesson4AdvancedPromptingTechniques: Lesson = {
  id: 4,
  title: 'Advanced Prompting Techniques',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Advanced Prompting Techniques</h1>

<div class="intro-section">
<p class="lead-text">Master advanced techniques for crafting effective prompts that yield high-quality, accurate code and solutions from AI assistants.</p>
</div>

<h2>Prompt Engineering Fundamentals</h2>

<div class="fundamentals-section">
<div class="fundamental">
<h3>🎯 Clarity and Specificity</h3>
<p>Clear, specific prompts produce better results. Avoid vague language and provide concrete requirements.</p>
</div>

<div class="fundamental">
<h3>📋 Context Provision</h3>
<p>Provide relevant context about your project, technologies, and constraints to help AI understand your needs.</p>
</div>

<div class="fundamental">
<h3>🔄 Iterative Refinement</h3>
<p>Start with basic prompts and refine them based on AI responses to achieve better results.</p>
</div>

<div class="fundamental">
<h3>📚 Learning from Examples</h3>
<p>Show AI examples of your desired output style to help it understand your preferences.</p>
</div>
</div>

<h2>Prompt Structure Techniques</h2>

<div class="structure-techniques-section">
<div class="technique">
<h3>🎭 Role-Based Prompting</h3>
<p>Assign a specific role to the AI to get more targeted responses.</p>
<pre><code>Example: "Act as a senior React developer with 10 years of experience. Create a component that..."</code></pre>
</div>

<div class="technique">
<h3>📝 Step-by-Step Instructions</h3>
<p>Break complex requests into clear, sequential steps.</p>
<pre><code>Example: "1. First, create the HTML structure
2. Then, add CSS styling
3. Finally, implement JavaScript functionality"</code></pre>
</div>

<div class="technique">
<h3>🔍 Detailed Specifications</h3>
<p>Include specific requirements about technologies, frameworks, and constraints.</p>
<pre><code>Example: "Use React 18 with TypeScript, Tailwind CSS for styling, and include proper error handling and loading states."</code></pre>
</div>

<div class="technique">
<h3>📊 Output Format Specification</h3>
<p>Specify the desired format and structure of the response.</p>
<pre><code>Example: "Provide the code with comments explaining each section, and include a brief explanation of the approach used."</code></pre>
</div>
</div>

<h2>Context Enhancement Strategies</h2>

<div class="context-strategies-section">
<div class="strategy">
<h3>📁 Project Context</h3>
<p>Share information about your project structure, existing code, and dependencies.</p>
<pre><code>Example: "This is part of a Next.js 13 app using App Router. The component should integrate with our existing authentication system."</code></pre>
</div>

<div class="strategy">
<h3>🎨 Design Context</h3>
<p>Provide design requirements, mockups, or style guidelines.</p>
<pre><code>Example: "The component should match our design system with primary color #007bff, use Inter font, and follow our spacing scale."</code></pre>
</div>

<div class="strategy">
<h3>🔧 Technical Constraints</h3>
<p>Specify technical limitations, browser support, or performance requirements.</p>
<pre><code>Example: "The solution must work in IE11, support screen readers, and load in under 2 seconds on 3G connections."</code></pre>
</div>

<div class="strategy">
<h3>📚 Code Style Preferences</h3>
<p>Share your coding style preferences and conventions.</p>
<pre><code>Example: "Use functional components with hooks, prefer const over let, and follow ESLint rules with Airbnb style guide."</code></pre>
</div>
</div>

<h2>Advanced Prompting Patterns</h2>

<div class="advanced-patterns-section">
<div class="pattern">
<h3>🔄 Chain-of-Thought Prompting</h3>
<p>Ask AI to think through the problem step by step before providing a solution.</p>
<pre><code>Example: "Think through this problem step by step:
1. What are the requirements?
2. What technologies should we use?
3. How should we structure the solution?
4. What are potential challenges?
Now provide the implementation."</code></pre>
</div>

<div class="pattern">
<h3>🎯 Few-Shot Learning</h3>
<p>Provide examples of input-output pairs to teach AI your preferred style.</p>
<pre><code>Example: "Here are examples of how I want the code structured:
Input: Create a button component
Output: [Your preferred button component code]

Now create a similar component for..."</code></pre>
</div>

<div class="pattern">
<h3>🔍 Self-Critique Prompting</h3>
<p>Ask AI to review and improve its own output.</p>
<pre><code>Example: "Generate the code, then review it for:
- Performance optimizations
- Security considerations
- Accessibility compliance
- Code maintainability"</code></pre>
</div>

<div class="pattern">
<h3>📊 Multi-Perspective Prompting</h3>
<p>Ask AI to consider multiple viewpoints or approaches.</p>
<pre><code>Example: "Consider both performance and maintainability when creating this solution. Provide two approaches: one optimized for speed, one for readability."</code></pre>
</div>
</div>

<h2>Web Development Specific Techniques</h2>

<div class="web-dev-techniques-section">
<div class="technique">
<h3>🎨 Component Specification</h3>
<p>Provide detailed component requirements including props, state, and behavior.</p>
<pre><code>Example: "Create a UserCard component that:
- Accepts user object with name, email, avatar
- Shows loading state while data loads
- Handles click events
- Is responsive on mobile
- Includes proper TypeScript types"</code></pre>
</div>

<div class="technique">
<h3>🔗 API Integration Prompts</h3>
<p>Specify API requirements, error handling, and data processing needs.</p>
<pre><code>Example: "Create a function to fetch user data from /api/users that:
- Handles loading states
- Implements error handling with retry logic
- Caches responses for 5 minutes
- Supports pagination
- Returns typed data"</code></pre>
</div>

<div class="technique">
<h3>📱 Responsive Design Prompts</h3>
<p>Specify responsive design requirements and breakpoints.</p>
<pre><code>Example: "Create a responsive layout that:
- Uses CSS Grid for desktop (3 columns)
- Switches to Flexbox for tablet (2 columns)
- Stacks vertically on mobile (1 column)
- Maintains consistent spacing across breakpoints"</code></pre>
</div>

<div class="technique">
<h3>♿ Accessibility Prompts</h3>
<p>Include accessibility requirements and WCAG compliance needs.</p>
<pre><code>Example: "Ensure the component meets WCAG 2.1 AA standards:
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios
- Focus management"</code></pre>
</div>
</div>

<h2>Debugging and Problem-Solving Prompts</h2>

<div class="debugging-prompts-section">
<div class="debugging-prompt">
<h3>🐛 Error Analysis</h3>
<p>Provide error messages and context for debugging assistance.</p>
<pre><code>Example: "I'm getting this error: [paste error message]
Context: React component, using useState hook
What I'm trying to do: [describe the goal]
Here's the relevant code: [paste code]"</code></pre>
</div>

<div class="debugging-prompt">
<h3>🔍 Performance Issues</h3>
<p>Describe performance problems and request optimization suggestions.</p>
<pre><code>Example: "My React component is re-rendering too frequently. Here's the code: [paste code]
What optimizations can I apply to reduce unnecessary re-renders?"</code></pre>
</div>

<div class="debugging-prompt">
<h3>🔧 Code Review Requests</h3>
<p>Ask for code review and improvement suggestions.</p>
<pre><code>Example: "Review this code for:
- Best practices
- Potential bugs
- Performance issues
- Security concerns
- Maintainability improvements"</code></pre>
</div>
</div>

<h2>Best Practices for Effective Prompting</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>✅ Be Specific and Detailed</h3>
<p>Include specific requirements, constraints, and desired outcomes in your prompts.</p>
</div>

<div class="practice-item">
<h3>🔍 Provide Context</h3>
<p>Share relevant project information, existing code, and technical constraints.</p>
</div>

<div class="practice-item">
<h3>🔄 Iterate and Refine</h3>
<p>Start with basic prompts and refine them based on AI responses to improve results.</p>
</div>

<div class="practice-item">
<h3>📚 Learn from Examples</h3>
<p>Show AI examples of your preferred output style to get better results.</p>
</div>

<div class="practice-item">
<h3>🧪 Test and Validate</h3>
<p>Always test AI-generated solutions and validate them against your requirements.</p>
</div>

<div class="practice-item">
<h3>📝 Document Successful Prompts</h3>
<p>Keep a record of effective prompts for future reference and reuse.</p>
</div>
</div>

<h2>Common Prompting Mistakes to Avoid</h2>

<div class="mistakes-section">
<div class="mistake">
<h3>❌ Vague Requirements</h3>
<p>Avoid prompts like "Create a website" - be specific about what you need.</p>
</div>

<div class="mistake">
<h3>❌ Missing Context</h3>
<p>Don't assume AI knows your project context - provide relevant information.</p>
</div>

<div class="mistake">
<h3>❌ Unrealistic Expectations</h3>
<p>Don't expect AI to create complete, production-ready applications from a single prompt.</p>
</div>

<div class="mistake">
<h3>❌ Ignoring AI Limitations</h3>
<p>Remember that AI has limitations and may not understand complex business logic or domain-specific requirements.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> Advanced prompting techniques significantly improve the quality and accuracy of AI-generated code. By mastering these techniques, you can leverage AI assistants more effectively and achieve better results in your web development projects.
</div>

</div>`
  }
};
