import type { Lesson } from '@/types/course';

export const lesson4HandsOnProjectAIAssistedFullStackApp: Lesson = {
  id: 4,
  title: 'Hands-on Project: AI-Assisted Full-Stack App',
  duration: '50 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/B8Nx1junI1A',
    textContent: `<div class="lesson-content">

<h1>Hands-on Project: AI-Assisted Full-Stack App</h1>

<p><strong>Purpose</strong>: Build a full-stack web application (e.g., a task manager) using AI to scaffold the backend, manage databases, integrate AI APIs, and create a responsive frontend.</p>

<h2>Project Overview</h2>
<ul>
  <li>Develop a task manager app with a Node.js/Express backend, MongoDB database, and React frontend, enhanced with an OpenAI-powered chatbot for task suggestions.</li>
  <li>Use AI to generate backend code, database queries, API integrations, and frontend components, ensuring responsiveness and accessibility.</li>
  <li>Deploy the app to a platform like Vercel or Render.</li>
</ul>

<h2>Step-by-Step Guide</h2>

<h3>Plan the App</h3>
<ul>
  <li><strong>Features</strong>: User authentication, task CRUD (create, read, update, delete), chatbot for task suggestions (e.g., "Suggest tasks for a student").</li>
  <li><strong>Tech Stack</strong>: Node.js/Express (backend), MongoDB (database), React/Tailwind CSS (frontend), OpenAI API (chatbot).</li>
</ul>

<h3>Set Up Backend with AI</h3>
<ul>
  <li><strong>Prompt</strong>: "Grok, create a Node.js Express server with MongoDB for a task manager."</li>
  <li><strong>Example Output</strong>:
    <pre><code>const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost/task-manager', { useNewUrlParser: true });
const Task = mongoose.model('Task', new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
}));
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});
app.listen(3000, () => console.log('Server on port 3000'));</code></pre>
  </li>
  <li>Install dependencies: npm install express mongoose dotenv.</li>
</ul>

<h3>Design Database Schema with AI</h3>
<ul>
  <li><strong>Prompt</strong>: "ChatGPT, generate a MongoDB schema for tasks with title, description, and status."</li>
  <li><strong>Example Output</strong>:
    <pre><code>const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});</code></pre>
  </li>
  <li>Use MongoDB Compass to verify schema and test queries.</li>
</ul>

<h3>Integrate OpenAI API for Chatbot</h3>
<ul>
  <li><strong>Prompt</strong>: "Claude, integrate OpenAI API into Node.js for a task suggestion chatbot."</li>
  <li><strong>Example Output</strong>:
    <pre><code>const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
app.post('/api/chatbot', async (req, res) => {
  const { prompt } = req.body;
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Suggest tasks for: ' + prompt }]
  });
  res.json({ suggestion: response.data.choices[0].message.content });
});</code></pre>
  </li>
  <li>Test with Postman (e.g., POST /api/chatbot with {"prompt": "student"}).</li>
</ul>

<h3>Build Frontend with React and Tailwind CSS</h3>
<ul>
  <li><strong>Prompt</strong>: "GitHub Copilot, create a React component for a task list with Tailwind CSS."</li>
  <li><strong>Example Output</strong>:
    <pre><code>import React, { useState, useEffect } from 'react';
import axios from 'axios';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get('/api/tasks').then(res => setTasks(res.data));
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task._id} className="p-4 border rounded">
            <h2 className="text-lg">{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TaskList;</code></pre>
  </li>
  <li>Install dependencies: npx create-react-app frontend && npm install axios tailwindcss.</li>
</ul>

<h3>Add Form Handling and Validation</h3>
<ul>
  <li><strong>Prompt</strong>: "ChatGPT, generate a React form with validation for adding tasks."</li>
  <li><strong>Example Output</strong>:
    <pre><code>import React, { useState } from 'react';
import axios from 'axios';
const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    await axios.post('/api/tasks', { title, description, completed: false });
    setTitle('');
    setDescription('');
    setError('');
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded mb-4"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};
export default TaskForm;</code></pre>
  </li>
</ul>

<h3>Test and Debug with AI</h3>
<ul>
  <li><strong>Prompt</strong>: "Cursor, debug why my React form isn't submitting to the backend."</li>
  <li><strong>Example Fix</strong>: Ensure CORS is enabled on the Express server (e.g., npm install cors && app.use(cors())).</li>
  <li>Test API endpoints with Postman and frontend with Chrome DevTools.</li>
</ul>

<h3>Ensure Accessibility and UX</h3>
<ul>
  <li><strong>Prompt</strong>: "Grok, add accessibility to my React form."</li>
  <li><strong>Example Fix</strong>: Add ARIA labels (e.g., aria-label="Task title input") and ensure contrast ratios meet WCAG 2.1.</li>
  <li>Run Lighthouse audit for accessibility and performance.</li>
</ul>

<h3>Deploy the App</h3>
<ul>
  <li><strong>Backend</strong>: Deploy to Render or Heroku (e.g., push Node.js app to Render with MongoDB URI).</li>
  <li><strong>Frontend</strong>: Deploy to Vercel or Netlify (e.g., vercel --prod for React app).</li>
  <li><strong>Database</strong>: Use MongoDB Atlas for cloud-hosted NoSQL.</li>
</ul>

<h3>Document and Share</h3>
<ul>
  <li>Document AI contributions in a README (e.g., "Backend routes by Grok, React form by ChatGPT").</li>
  <li>Share on GitHub and X with #FullStack, #AIDev for feedback.</li>
</ul>

<h2>Tools Required</h2>
<ul>
  <li><strong>Backend</strong>: Node.js, Express, Flask, Django, MongoDB, PostgreSQL.</li>
  <li><strong>Frontend</strong>: React, Tailwind CSS, axios.</li>
  <li><strong>AI Tools</strong>: ChatGPT, Claude, Grok, GitHub Copilot, Cursor.</li>
  <li><strong>Testing/Deployment</strong>: Postman, Chrome DevTools, Lighthouse, Vercel, Render, MongoDB Atlas.</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Validate AI-generated code with linters (e.g., ESLint, Flake8) and test in a staging environment.</li>
  <li>Secure API keys in .env files and use HTTPS for API calls.</li>
  <li>Test responsiveness (BrowserStack) and accessibility (Lighthouse) for the frontend.</li>
  <li>Commit code to GitHub with descriptive messages (e.g., "Added AI-generated task routes").</li>
  <li>Document AI usage for transparency in project deliverables.</li>
</ul>

<h2>Additional Considerations</h2>

<h3>Ethical Use of AI</h3>
<ul>
  <li>Disclose AI usage in project documentation for transparency with clients or teams.</li>
  <li>Avoid using AI-generated code in open-source projects without verifying licensing (e.g., OpenAI's terms).</li>
  <li>Ensure AI-generated content (e.g., chatbot responses) is moderated to avoid biases or inappropriate outputs.</li>
</ul>

<h3>Skill Development</h3>
<ul>
  <li>Practice manual backend development (e.g., write Express routes without AI) to build core skills.</li>
  <li>Use AI to explain concepts (e.g., "Grok, explain MongoDB aggregations") to deepen understanding.</li>
  <li>Participate in coding challenges (e.g., LeetCode, HackerRank) to apply AI-assisted skills.</li>
</ul>

<h3>Testing and Validation</h3>
<ul>
  <li>Run unit tests (e.g., Jest for Node.js, pytest for Flask/Django) on AI-generated code.</li>
  <li>Use Postman to test API endpoints for correctness and performance.</li>
  <li>Audit accessibility with WAVE or axe DevTools to meet WCAG 2.1 standards.</li>
</ul>

<h3>Collaboration and Version Control</h3>
<ul>
  <li>Use Git branches (e.g., ai-backend, manual-frontend) to separate AI and manual code.</li>
  <li>Share projects via GitHub pull requests, integrating AI-generated code with team feedback.</li>
  <li>Post on X with #FullStack, #AIDev to gain community insights.</li>
</ul>

<h3>Resources</h3>
<ul>
  <li>Reference MDN Web Docs for Node.js/React, Django/Flask documentation for Python.</li>
  <li>Follow X posts with #NodeJS, #Django, #AIWebDev for real-time updates.</li>
  <li>Watch YouTube tutorials (e.g., "Node.js REST API with MongoDB," "Django Full-Stack App").</li>
  <li>Join communities like freeCodeCamp, Reddit's r/webdev, or DEV Community.</li>
</ul>

<h3>Future Trends</h3>
<ul>
  <li>Explore AI-driven serverless architectures (e.g., AWS Lambda with AI APIs).</li>
  <li>Monitor advancements in AI APIs (e.g., OpenAI's GPT-5, HuggingFace's new models) via tech blogs or X.</li>
  <li>Experiment with AI for real-time data processing (e.g., streaming analytics in Node.js).</li>
</ul>

<h2>Recommended Learning Workflow</h2>
<ol>
  <li>Study Node.js, Django, or Flask basics using official documentation or freeCodeCamp tutorials.</li>
  <li>Set up a development environment with VS Code, Node.js, Python, and AI tools (e.g., GitHub Copilot, Grok).</li>
  <li>Use AI to generate backend boilerplate (e.g., "Claude, create a Flask API for tasks") and validate manually.</li>
  <li>Design database schemas with AI (e.g., "ChatGPT, create a MongoDB task schema") and test with Compass.</li>
  <li>Integrate OpenAI API for a chatbot, testing with Postman and securing keys in .env.</li>
  <li>Build a React/Tailwind frontend with AI-generated components (e.g., "Copilot, create a task list component").</li>
  <li>Test the full-stack app for functionality (Postman), responsiveness (BrowserStack), and accessibility (Lighthouse).</li>
  <li>Debug issues with AI assistance (e.g., "Cursor, fix my API connection error").</li>
  <li>Deploy backend (Render) and frontend (Vercel), documenting the process in a README.</li>
  <li>Share the project on GitHub and X with #FullStack, seeking feedback to refine skills.</li>
</ol>

</div>`
  }
};
