import type { Lesson } from '@/types/course';

export const lesson2DatabasesAndAIQueryAssistance: Lesson = {
  id: 2,
  title: 'Databases & AI Query Assistance',
  duration: '35 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/zeIe_7npDrg',
    textContent: `<div class="lesson-content">

<h1>Databases & AI Query Assistance</h1>

<p><strong>Purpose</strong>: Leverage AI to craft efficient SQL/NoSQL queries, design database schemas, and optimize data operations for web applications.</p>

<h2>Details</h2>

<h3>SQL Queries</h3>
<ul>
  <li><strong>Role</strong>: Interact with relational databases (e.g., PostgreSQL, MySQL) for structured data operations.</li>
  <li><strong>AI Assistance</strong>:
    <ul>
      <li>Prompt AI to generate SQL queries (e.g., "Write a SQL query to fetch users with orders over $100").</li>
      <li>Example Output:
        <pre><code>SELECT u.name, u.email
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.total > 100;</code></pre>
      </li>
      <li>AI can optimize queries (e.g., adding indexes) or explain results (e.g., "Explain this JOIN query").</li>
      <li>Example Prompt: "ChatGPT, generate a SQL query to create a table for blog posts."</li>
    </ul>
  </li>
</ul>

<h3>NoSQL Queries</h3>
<ul>
  <li><strong>Role</strong>: Interact with non-relational databases (e.g., MongoDB, Firebase) for flexible, scalable data storage.</li>
  <li><strong>AI Assistance</strong>:
    <ul>
      <li>Prompt AI to generate NoSQL queries (e.g., "Write a MongoDB query to find products by category").</li>
      <li>Example Output:
        <pre><code>db.products.find({ category: "electronics" }).toArray();</code></pre>
      </li>
      <li>AI can design schemas or aggregations (e.g., MongoDB pipelines for analytics).</li>
      <li>Example Prompt: "Grok, create a MongoDB schema for a user profile."</li>
    </ul>
  </li>
</ul>

<h3>Database Schema Design</h3>
<ul>
  <li>AI generates schemas for SQL (e.g., tables with foreign keys) or NoSQL (e.g., JSON documents).</li>
  <li>Example Prompt: "Claude, design a PostgreSQL schema for an e-commerce app."</li>
  <li>Example Output:
    <pre><code>CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT REFERENCES categories(id)
);
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);</code></pre>
  </li>
</ul>

<h3>Practical Examples</h3>
<ul>
  <li>A developer uses Grok to generate a MongoDB aggregation pipeline for sales analytics, saving hours of manual query writing.</li>
  <li>A team uses ChatGPT to optimize a PostgreSQL query for faster performance, adding indexes based on AI suggestions.</li>
  <li>A freelancer uses Claude to design a Firebase schema for a real-time chat app, ensuring scalability.</li>
</ul>

<h2>Tools</h2>
<ul>
  <li><strong>AI Assistants</strong>: ChatGPT, Claude, Grok for query generation and explanations.</li>
  <li><strong>Databases</strong>: PostgreSQL, MySQL (SQL); MongoDB, Firebase (NoSQL).</li>
  <li><strong>Query Tools</strong>: pgAdmin (PostgreSQL), MongoDB Compass (MongoDB), Postman for API testing.</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Validate AI-generated queries with database tools (e.g., pgAdmin, MongoDB Compass) to ensure correctness.</li>
  <li>Test queries in a staging environment to avoid data loss or performance issues.</li>
  <li>Use AI to add security measures (e.g., parameterized queries to prevent SQL injection).</li>
  <li>Document AI-generated schemas and queries in a repository (e.g., GitHub) with comments.</li>
</ul>

</div>`
  }
};
