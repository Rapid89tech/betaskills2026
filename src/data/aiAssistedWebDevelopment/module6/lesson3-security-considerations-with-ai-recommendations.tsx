import type { Lesson } from '@/types/course';

export const lesson3SecurityConsiderationsWithAIRecommendations: Lesson = {
  id: 3,
  title: 'Security Considerations with AI Recommendations',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/example',
    textContent: `<div class="lesson-content">

<h1>Security Considerations with AI Recommendations</h1>

<p><strong>Purpose</strong>: Apply AI-driven recommendations to secure hosted websites, protecting against vulnerabilities like XSS, CSRF, or data breaches.</p>

<h2>Details</h2>

<h3>AI Recommendations</h3>
<ul>
  <li>AI suggests security configurations (e.g., HTTP headers, input sanitization).</li>
  <li>Example Prompt: "ChatGPT, secure a Node.js Express app on Vercel."</li>
  <li>Example Output:
    <pre><code>const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet()); // Sets security headers (e.g., Content-Security-Policy)
app.use(express.json({ limit: '10kb' })); // Limits request size to prevent attacks</code></pre>
  </li>
  <li>AI recommends HTTPS, environment variables for secrets, and rate limiting.</li>
</ul>

<h3>Security Practices</h3>
<ul>
  <li><strong>HTTPS</strong>: Enable free SSL certificates on Netlify, Vercel, or GitHub Pages.</li>
  <li><strong>Input Validation</strong>: Use AI to generate sanitization code (e.g., sanitize-html for Node.js).</li>
  <li><strong>Headers</strong>: Configure Content-Security-Policy (CSP), X-Frame-Options, and Strict-Transport-Security via AI suggestions.</li>
  <li><strong>Secrets Management</strong>: Store API keys in .env files (e.g., NETLIFY_API_TOKEN) and exclude from Git.</li>
  <li><strong>Rate Limiting</strong>: Implement limits to prevent DDoS attacks (e.g., express-rate-limit).</li>
</ul>

<h3>Practical Examples</h3>
<ul>
  <li>A developer uses Grok to add helmet middleware to a Netlify-hosted Express app, preventing XSS attacks.</li>
  <li>A team uses Claude to configure Vercel's vercel.json for secure headers, enhancing site security.</li>
  <li>A student uses ChatGPT to secure a GitHub Pages site by enabling HTTPS and adding a CSP meta tag.</li>
</ul>

<h2>Tools</h2>
<ul>
  <li><strong>AI Assistants</strong>: ChatGPT, Claude, Grok for security code and configurations.</li>
  <li><strong>Security Tools</strong>: OWASP ZAP (vulnerability scanning), Snyk (dependency security).</li>
  <li><strong>Dependencies</strong>: helmet (Node.js), express-rate-limit, sanitize-html.</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Run security scans with OWASP ZAP or Snyk after applying AI recommendations.</li>
  <li>Use AI to generate secure form validation (e.g., prevent SQL injection in API inputs).</li>
  <li>Monitor security logs via platform dashboards (e.g., Netlify's audit logs).</li>
  <li>Regularly update dependencies to patch vulnerabilities (e.g., npm audit fix).</li>
</ul>

</div>`
  }
};
