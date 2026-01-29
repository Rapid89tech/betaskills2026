import type { Lesson } from '@/types/course';

export const lesson1SettingUpBackendFrameworks: Lesson = {
  id: 1,
  title: 'Setting Up Node.js / Django / Flask with AI Guidance',
  duration: '45 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/example',
    textContent: `<div class="lesson-content">

<h1>Setting Up Node.js / Django / Flask with AI Guidance</h1>

<p><strong>Purpose</strong>: Use AI tools to automate and optimize the setup of backend frameworks (Node.js, Django, Flask) for building robust server-side applications.</p>

<h2>Details</h2>

<h3>Node.js</h3>
<ul>
  <li><strong>Role</strong>: A JavaScript runtime for building scalable, event-driven backend applications using Express.js for REST APIs.</li>
  <li><strong>AI Guidance</strong>:
    <ul>
      <li>Prompt AI (e.g., ChatGPT, Grok) to generate boilerplate code (e.g., "Create a Node.js Express server with routes for a blog API").</li>
      <li>Example Output:
        <pre><code>const express = require('express');
const app = express();
app.use(express.json());
app.get('/api/posts', (req, res) => {
  res.json([{ id: 1, title: 'Post 1' }]);
});
app.listen(3000, () => console.log('Server running on port 3000'));</code></pre>
      </li>
      <li>AI can initialize project structure (e.g., package.json, folder setup) or configure middleware (e.g., CORS, body-parser).</li>
    </ul>
  </li>
  <li><strong>Setup Steps</strong>:
    <ul>
      <li>Install Node.js and npm (e.g., node --version, npm init -y).</li>
      <li>Use AI to generate Express routes, error handling, or environment variables (e.g., .env with PORT=3000).</li>
      <li>Example Prompt: "Grok, set up a Node.js server with Express and dotenv."</li>
    </ul>
  </li>
</ul>

<h3>Django</h3>
<ul>
  <li><strong>Role</strong>: A Python framework for rapid development of secure, scalable web applications with built-in ORM and admin panel.</li>
  <li><strong>AI Guidance</strong>:
    <ul>
      <li>Prompt AI to create Django project structure, models, or views (e.g., "Generate a Django model for a user profile").</li>
      <li>Example Output:
        <pre><code>from django.db import models
class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)</code></pre>
      </li>
      <li>AI can configure settings.py, URLs, or migrations (e.g., python manage.py makemigrations).</li>
    </ul>
  </li>
  <li><strong>Setup Steps</strong>:
    <ul>
      <li>Install Python and Django (e.g., pip install django).</li>
      <li>Use AI to generate django-admin startproject commands or app-specific code (e.g., views, templates).</li>
      <li>Example Prompt: "ChatGPT, create a Django REST API for a todo app."</li>
    </ul>
  </li>
</ul>

<h3>Flask</h3>
<ul>
  <li><strong>Role</strong>: A lightweight Python micro-framework for building simple, flexible APIs or web applications.</li>
  <li><strong>AI Guidance</strong>:
    <ul>
      <li>Prompt AI to generate Flask app structure or routes (e.g., "Create a Flask API for a bookstore").</li>
      <li>Example Output:
        <pre><code>from flask import Flask, jsonify
app = Flask(__name__)
@app.route('/api/books', methods=['GET'])
def get_books():
    return jsonify([{'id': 1, 'title': 'Book 1'}])
if __name__ == '__main__':
    app.run(debug=True, port=5000)</code></pre>
      </li>
      <li>AI can set up Flask blueprints, error handlers, or middleware.</li>
    </ul>
  </li>
  <li><strong>Setup Steps</strong>:
    <ul>
      <li>Install Python and Flask (e.g., pip install flask).</li>
      <li>Use AI to create routes, templates, or configuration (e.g., Flask-CORS for cross-origin requests).</li>
      <li>Example Prompt: "Claude, generate a Flask app with REST endpoints for a blog."</li>
    </ul>
  </li>
</ul>

<h3>Practical Examples</h3>
<ul>
  <li>A developer uses Grok to set up a Node.js Express server with MongoDB for a social media API in 10 minutes.</li>
  <li>A team uses ChatGPT to generate Django models and views for an e-commerce platform, reducing setup time by 50%.</li>
  <li>A freelancer uses Claude to create a Flask API for a weather app, integrating AI-generated error handling.</li>
</ul>

<h2>Tools</h2>
<ul>
  <li><strong>AI Assistants</strong>: ChatGPT (chat.openai.com), Claude (anthropic.com), Grok (grok.com, X apps, free tier with quotas).</li>
  <li><strong>IDE Plugins</strong>: GitHub Copilot (VS Code, $10/month), Cursor (cursor.sh, free tier or subscription).</li>
  <li><strong>Dependencies</strong>: Node.js (npm), Python (pip), Express, Django, Flask.</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Validate AI-generated code with linters (e.g., ESLint for Node.js, Flake8 for Python) and test in a local environment (e.g., npm start, python manage.py runserver).</li>
  <li>Use AI to generate secure configurations (e.g., helmet for Express, CSRF protection for Django).</li>
  <li>Organize AI-generated code into modular files (e.g., routes, models, controllers) for maintainability.</li>
  <li>Test server functionality with tools like Postman or curl before deployment.</li>
</ul>

</div>`
  }
};
