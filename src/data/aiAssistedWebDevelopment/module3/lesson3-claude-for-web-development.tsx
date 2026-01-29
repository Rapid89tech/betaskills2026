import type { Lesson } from '@/types/course';

export const lesson3ClaudeForWebDevelopment: Lesson = {
  id: 3,
  title: 'Claude for Web Development',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Claude for Web Development</h1>

<div class="intro-section">
<p class="lead-text">Learn how to leverage Claude's capabilities for web development tasks, from code generation to problem-solving.</p>
</div>

<h2>What is Claude?</h2>

<div class="claude-overview">
<p>Claude is an AI assistant developed by Anthropic, known for its safety-focused approach and ability to handle complex reasoning tasks. It excels at code generation, debugging, documentation, and explaining technical concepts in a clear, structured manner.</p>
</div>

<h2>Key Strengths for Web Development</h2>

<div class="strengths-section">
<div class="strength-item">
<h3>🧠 Strong Reasoning</h3>
<p>Claude excels at understanding complex requirements and breaking them down into logical, implementable solutions.</p>
</div>

<div class="strength-item">
<h3>📝 Clear Explanations</h3>
<p>Provides detailed, well-structured explanations of code concepts, making it excellent for learning and documentation.</p>
</div>

<div class="strength-item">
<h3>🔒 Safety-Focused</h3>
<p>Designed with safety in mind, reducing the risk of generating harmful or problematic code.</p>
</div>

<div class="strength-item">
<h3>🎯 Context Understanding</h3>
<p>Maintains context throughout conversations, allowing for iterative development and refinement.</p>
</div>

<div class="strength-item">
<h3>📚 Educational Approach</h3>
<p>Explains the reasoning behind code decisions, helping developers understand and learn from the solutions.</p>
</div>
</div>

<h2>Web Development Use Cases</h2>

<div class="use-cases-section">
<div class="use-case">
<h3>🚀 Project Planning</h3>
<p>Help plan web application architecture, choose appropriate technologies, and design system structures.</p>
</div>

<div class="use-case">
<h3>💻 Code Generation</h3>
<p>Generate HTML, CSS, JavaScript, and framework-specific code based on detailed requirements.</p>
</div>

<div class="use-case">
<h3>🐛 Debugging Assistance</h3>
<p>Analyze error messages, identify potential issues, and suggest fixes for web development problems.</p>
</div>

<div class="use-case">
<h3>📖 Documentation</h3>
<p>Create comprehensive documentation for code, APIs, and project setup instructions.</p>
</div>

<div class="use-case">
<h3>🎨 Design Implementation</h3>
<p>Convert design requirements into functional CSS and HTML code with responsive design considerations.</p>
</div>

<div class="use-case">
<h3>🔗 API Integration</h3>
<p>Generate code for API calls, data processing, and integration with external services.</p>
</div>
</div>

<h2>Effective Prompting Strategies</h2>

<div class="prompting-strategies-section">
<div class="strategy">
<h3>🎯 Be Specific</h3>
<p>Provide detailed requirements, including technologies, frameworks, and specific functionality needs.</p>
<pre><code>Example: "Create a React component for a user profile card that displays name, email, avatar, and edit button. Use TypeScript and include proper styling with CSS modules."</code></pre>
</div>

<div class="strategy">
<h3>📋 Provide Context</h3>
<p>Share relevant code snippets, error messages, or project structure to help Claude understand your context.</p>
</div>

<div class="strategy">
<h3>🔄 Iterative Development</h3>
<p>Start with basic requirements and gradually add complexity, refining the solution step by step.</p>
</div>

<div class="strategy">
<h3>❓ Ask for Explanations</h3>
<p>Request explanations of code decisions, best practices, and alternative approaches to enhance learning.</p>
</div>
</div>

<h2>Code Generation Examples</h2>

<div class="examples-section">
<div class="example">
<h3>HTML Structure</h3>
<pre><code>Prompt: "Create a semantic HTML structure for a blog post with header, navigation, main content, sidebar, and footer."

Claude Response:
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Blog Post Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    
    &lt;main&gt;
        &lt;article&gt;
            &lt;h1&gt;Blog Post Title&lt;/h1&gt;
            &lt;p&gt;Blog content here...&lt;/p&gt;
        &lt;/article&gt;
    &lt;/main&gt;
    
    &lt;aside&gt;
        &lt;h3&gt;Related Posts&lt;/h3&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a href="#"&gt;Related Post 1&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="#"&gt;Related Post 2&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/aside&gt;
    
    &lt;footer&gt;
        &lt;p&gt;&copy; 2024 Blog Name. All rights reserved.&lt;/p&gt;
    &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>

<div class="example">
<h3>CSS Styling</h3>
<pre><code>Prompt: "Create responsive CSS for the blog layout with a modern design using CSS Grid."

Claude Response:
/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Layout */
body {
    display: grid;
    grid-template-areas: 
        "header header"
        "main sidebar"
        "footer footer";
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

header {
    grid-area: header;
    background: #2c3e50;
    color: white;
    padding: 1rem;
}

main {
    grid-area: main;
    padding: 2rem;
}

aside {
    grid-area: sidebar;
    background: #f8f9fa;
    padding: 1rem;
}

footer {
    grid-area: footer;
    background: #34495e;
    color: white;
    text-align: center;
    padding: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
    body {
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
    }
}</code></pre>
</div>

<div class="example">
<h3>JavaScript Functionality</h3>
<pre><code>Prompt: "Create a JavaScript function to handle form validation for a contact form."

Claude Response:
function validateContactForm(formData) {
    const errors = [];
    
    // Validate email
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Validate name
    const name = formData.get('name');
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Validate message
    const message = formData.get('message');
    if (!message || message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Usage example
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const validation = validateContactForm(formData);
    
    if (validation.isValid) {
        // Submit form
        console.log('Form is valid, submitting...');
    } else {
        // Display errors
        validation.errors.forEach(error => {
            console.error(error);
        });
    }
});</code></pre>
</div>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>✅ Review and Test</h3>
<p>Always review Claude-generated code and test it thoroughly in your development environment.</p>
</div>

<div class="practice-item">
<h3>🔍 Understand the Code</h3>
<p>Take time to understand the generated code and ask for explanations of complex parts.</p>
</div>

<div class="practice-item">
<h3>📝 Provide Clear Requirements</h3>
<p>Be specific about your requirements, including technologies, frameworks, and constraints.</p>
</div>

<div class="practice-item">
<h3>🔄 Iterate and Refine</h3>
<p>Use Claude's responses as a starting point and refine them to match your specific needs.</p>
</div>

<div class="practice-item">
<h3>📚 Learn from Explanations</h3>
<p>Take advantage of Claude's educational approach to improve your understanding of web development concepts.</p>
</div>
</div>

<h2>Limitations and Considerations</h2>

<div class="limitations-section">
<div class="limitation">
<h3>⚠️ Code Quality</h3>
<p>While Claude generates good code, it may not always follow the latest best practices or your specific coding standards.</p>
</div>

<div class="limitation">
<h3>🔄 Context Limitations</h3>
<p>Claude may not always understand complex project-specific requirements or existing codebase patterns.</p>
</div>

<div class="limitation">
<h3>📚 Learning Dependency</h3>
<p>Relying too heavily on Claude can hinder learning. Use it as a tool to enhance understanding, not replace it.</p>
</div>

<div class="limitation">
<h3>🔒 Privacy Considerations</h3>
<p>Be cautious when sharing sensitive or proprietary code with Claude, as conversations may be used for training.</p>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> Claude is an excellent tool for web development, offering strong reasoning capabilities and clear explanations. By using it effectively with proper prompting strategies, you can accelerate development while improving your understanding of web technologies.
</div>

</div>`
  }
};
