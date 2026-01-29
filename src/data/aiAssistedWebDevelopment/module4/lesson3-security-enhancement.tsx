import type { Lesson } from '@/types/course';

export const lesson3SecurityEnhancement: Lesson = {
  id: 3,
  title: 'Security Enhancement',
  duration: '30 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Security Enhancement</h1>

<div class="intro-section">
<p class="lead-text">Learn how to use AI tools to identify and fix security vulnerabilities in web applications, implementing best practices for secure development.</p>
</div>

<h2>Why Security Matters</h2>

<div class="security-importance-section">
<div class="importance-item">
<h3>🛡️ Protect User Data</h3>
<p>Secure applications protect sensitive user information from unauthorized access.</p>
</div>

<div class="importance-item">
<h3>🔒 Prevent Attacks</h3>
<p>Security measures prevent common web attacks like XSS, CSRF, and SQL injection.</p>
</div>

<div class="importance-item">
<h3>📋 Compliance</h3>
<p>Many industries require security compliance (GDPR, HIPAA, PCI DSS).</p>
</div>

<div class="importance-item">
<h3>💰 Business Protection</h3>
<p>Security breaches can result in financial losses and damage to reputation.</p>
</div>
</div>

<h2>Common Security Vulnerabilities</h2>

<div class="security-vulnerabilities-section">
<div class="vulnerability">
<h3>❌ Cross-Site Scripting (XSS)</h3>
<p>Malicious scripts injected into web pages to steal user data or perform unauthorized actions.</p>
</div>

<div class="vulnerability">
<h3>🔗 Cross-Site Request Forgery (CSRF)</h3>
<p>Unauthorized commands transmitted from a user that the website trusts.</p>
</div>

<div class="vulnerability">
<h3>💉 SQL Injection</h3>
<p>Malicious SQL code inserted into input fields to manipulate databases.</p>
</div>

<div class="vulnerability">
<h3>🔑 Authentication Issues</h3>
<p>Weak passwords, improper session management, or insecure authentication flows.</p>
</div>

<div class="vulnerability">
<h3>📡 Insecure Communication</h3>
<p>Data transmitted over unencrypted connections (HTTP instead of HTTPS).</p>
</div>
</div>

<h2>AI Tools for Security Analysis</h2>

<div class="ai-security-tools-section">
<div class="tool">
<h3>🔍 OWASP ZAP</h3>
<p>Open-source web application security scanner that can identify vulnerabilities.</p>
</div>

<div class="tool">
<h3>🛡️ Snyk</h3>
<p>AI-powered security platform that finds and fixes vulnerabilities in dependencies.</p>
</div>

<div class="tool">
<h3>🔒 SonarQube</h3>
<p>Code quality and security analysis tool with AI-powered vulnerability detection.</p>
</div>

<div class="tool">
<h3>🤖 AI Code Assistants</h3>
<p>GitHub Copilot, Cursor, and Claude can suggest security improvements.</p>
</div>
</div>

<h2>AI-Assisted Security Enhancement Techniques</h2>

<div class="security-techniques-section">
<div class="technique">
<h3>🔍 Vulnerability Detection</h3>
<p>AI can analyze code and identify potential security vulnerabilities.</p>
<pre><code>// Ask AI: "Check this code for security vulnerabilities"

const handleUserInput = (input) => {
  const query = "SELECT * FROM users WHERE name = '" + input + "'";
  return database.execute(query);
};

// AI Response: "This code is vulnerable to SQL injection.
// Use parameterized queries or prepared statements instead."</code></pre>
</div>

<div class="technique">
<h3>🛡️ Input Validation</h3>
<p>AI can suggest proper input validation and sanitization techniques.</p>
<pre><code>// Before (vulnerable)
const displayUserInput = (userInput) => {
  document.getElementById('output').innerHTML = userInput;
};

// After (AI can suggest this)
const displayUserInput = (userInput) => {
  const sanitizedInput = DOMPurify.sanitize(userInput);
  document.getElementById('output').innerHTML = sanitizedInput;
};</code></pre>
</div>

<div class="technique">
<h3>🔐 Authentication Enhancement</h3>
<p>AI can suggest secure authentication and authorization patterns.</p>
<pre><code>// AI can suggest:
// - Implement proper password hashing (bcrypt, Argon2)
// - Use JWT tokens with proper expiration
// - Implement rate limiting
// - Add two-factor authentication
// - Use secure session management</code></pre>
</div>

<div class="technique">
<h3>🔒 Data Protection</h3>
<p>AI can suggest encryption and data protection measures.</p>
<pre><code>// AI can suggest:
// - Encrypt sensitive data at rest
// - Use HTTPS for all communications
// - Implement proper CORS policies
// - Use Content Security Policy (CSP)
// - Sanitize and validate all inputs</code></pre>
</div>
</div>

<h2>Practical Security Examples</h2>

<div class="security-examples-section">
<div class="example">
<h3>🛡️ Preventing XSS Attacks</h3>
<pre><code>// Ask AI: "How can I prevent XSS in this React component?"

const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <div dangerouslySetInnerHTML={{ __html: user.description }} />
    </div>
  );
};

// AI Response: "Avoid using dangerouslySetInnerHTML.
// Use a sanitization library like DOMPurify or
// render content as plain text instead."

const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <div>{user.description}</div> {/* Render as plain text */}
    </div>
  );
};</code></pre>
</div>

<div class="example">
<h3>🔐 Secure Password Handling</h3>
<pre><code>// Ask AI: "How should I handle passwords securely?"

// AI Response: "Use bcrypt for password hashing and
// implement proper validation rules."

const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};</code></pre>
</div>

<div class="example">
<h3>🔒 Secure API Endpoints</h3>
<pre><code>// Ask AI: "How can I secure this API endpoint?"

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = getUserById(userId);
  res.json(user);
});

// AI Response: "Add authentication, authorization,
// input validation, and rate limiting."

const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/api/users/:id', limiter, authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  // Check if user has permission to access this data
  if (req.user.id !== userId && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});</code></pre>
</div>
</div>

<h2>Security Best Practices</h2>

<div class="security-best-practices-section">
<div class="practice-item">
<h3>✅ Input Validation</h3>
<p>Always validate and sanitize all user inputs on both client and server sides.</p>
</div>

<div class="practice-item">
<h3>🔐 Authentication</h3>
<p>Implement strong authentication with proper password hashing and session management.</p>
</div>

<div class="practice-item">
<h3>🔒 Authorization</h3>
<p>Use role-based access control and verify permissions for all sensitive operations.</p>
</div>

<div class="practice-item">
<h3>📡 HTTPS</h3>
<p>Use HTTPS for all communications and implement proper SSL/TLS configuration.</p>
</div>

<div class="practice-item">
<h3>🔄 Regular Updates</h3>
<p>Keep all dependencies and frameworks updated to patch security vulnerabilities.</p>
</div>

<div class="practice-item">
<h3>📊 Security Headers</h3>
<p>Implement security headers like CSP, HSTS, and X-Frame-Options.</p>
</div>
</div>

<h2>Security Headers Implementation</h2>

<div class="security-headers-section">
<div class="header">
<h3>🛡️ Content Security Policy (CSP)</h3>
<pre><code>// AI can suggest CSP implementation:
Content-Security-Policy: default-src 'self'; 
                        script-src 'self' 'unsafe-inline'; 
                        style-src 'self' 'unsafe-inline'; 
                        img-src 'self' data: https:;</code></pre>
</div>

<div class="header">
<h3>🔒 HTTP Strict Transport Security (HSTS)</h3>
<pre><code>// AI can suggest HSTS implementation:
Strict-Transport-Security: max-age=31536000; includeSubDomains</code></pre>
</div>

<div class="header">
<h3>🖼️ X-Frame-Options</h3>
<pre><code>// AI can suggest X-Frame-Options:
X-Frame-Options: DENY</code></pre>
</div>

<div class="header">
<h3>🔍 X-Content-Type-Options</h3>
<pre><code>// AI can suggest X-Content-Type-Options:
X-Content-Type-Options: nosniff</code></pre>
</div>
</div>

<h2>Security Testing with AI</h2>

<div class="security-testing-section">
<div class="testing-tool">
<h3>🔍 Automated Scanning</h3>
<p>Use AI-powered tools to automatically scan for vulnerabilities.</p>
</div>

<div class="testing-tool">
<h3>🧪 Penetration Testing</h3>
<p>AI can help create and execute penetration testing scenarios.</p>
</div>

<div class="testing-tool">
<h3>📊 Security Auditing</h3>
<p>AI can analyze code for security compliance and best practices.</p>
</div>

<div class="testing-tool">
<h3>🚨 Vulnerability Assessment</h3>
<p>AI can assess the severity and impact of identified vulnerabilities.</p>
</div>
</div>

<h2>Common Security Tools</h2>

<div class="security-tools-section">
<div class="tool">
<h3>🛡️ OWASP ZAP</h3>
<p>Free security testing tool for finding vulnerabilities in web applications.</p>
</div>

<div class="tool">
<h3>🔒 Snyk</h3>
<p>AI-powered security platform for finding and fixing vulnerabilities.</p>
</div>

<div class="tool">
<h3>🔍 SonarQube</h3>
<p>Code quality and security analysis with vulnerability detection.</p>
</div>

<div class="tool">
<h3>🛠️ ESLint Security</h3>
<p>ESLint plugin for identifying security vulnerabilities in JavaScript code.</p>
</div>

<div class="tool">
<h3>🔐 Helmet.js</h3>
<p>Express.js middleware for setting security headers.</p>
</div>
</div>

<h2>Security Checklist</h2>

<div class="security-checklist-section">
<div class="checklist-item">
<h3>✅ Authentication & Authorization</h3>
<ul>
<li>Strong password policies</li>
<li>Multi-factor authentication</li>
<li>Secure session management</li>
<li>Role-based access control</li>
</ul>
</div>

<div class="checklist-item">
<h3>🛡️ Input Validation</h3>
<ul>
<li>Validate all user inputs</li>
<li>Sanitize data before processing</li>
<li>Use parameterized queries</li>
<li>Implement CSRF protection</li>
</ul>
</div>

<div class="checklist-item">
<h3>🔒 Data Protection</h3>
<ul>
<li>Encrypt sensitive data</li>
<li>Use HTTPS everywhere</li>
<li>Implement proper CORS</li>
<li>Set security headers</li>
</ul>
</div>

<div class="checklist-item">
<h3>📊 Monitoring & Testing</h3>
<ul>
<li>Regular security audits</li>
<li>Vulnerability scanning</li>
<li>Penetration testing</li>
<li>Security monitoring</li>
</ul>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> AI tools can significantly enhance security by identifying vulnerabilities and suggesting improvements. However, security is an ongoing process that requires regular monitoring, testing, and updates to protect against evolving threats.
</div>

</div>`
  }
};
