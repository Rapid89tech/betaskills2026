import type { Lesson } from '@/types/course';

export const lesson5CourseRoadmapAndExpectations: Lesson = {
  id: 5,
  title: 'Course Roadmap & Expectations',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/Yq0QkCxoTHM',
    textContent: `<div class="lesson-content">

<h1>Course Roadmap & Expectations</h1>

<div class="intro-section">
<p class="lead-text">Provide a structured learning path for mastering AI-assisted development, with clear expectations for skills, projects, and outcomes.</p>
</div>

<h2>Roadmap</h2>

<div class="roadmap-section">
<div class="week-block">
<h3>Week 1–2: Introduction to AI-Assisted Development</h3>
<div class="week-details">
<p><strong>Topics:</strong> Overview of AI in coding/design, benefits/limitations, introduction to tools (ChatGPT, GitHub Copilot, Wix AI).</p>
<p><strong>Activities:</strong> Set up accounts for AI tools, create a simple HTML/CSS page using ChatGPT, explore Wix AI for a basic site.</p>
<p><strong>Outcome:</strong> Understand AI tool capabilities and generate a static webpage.</p>
</div>
</div>

<div class="week-block">
<h3>Week 3–4: Mastering AI Code Assistants</h3>
<div class="week-details">
<p><strong>Topics:</strong> Using GitHub Copilot, Cursor, and Claude for coding (e.g., JavaScript, React, Python Flask).</p>
<p><strong>Activities:</strong> Build a responsive portfolio site with Copilot (HTML/CSS/JS), debug a Node.js app with Cursor, generate API documentation with Claude.</p>
<p><strong>Outcome:</strong> Create a functional front-end site and backend API using AI assistance.</p>
</div>
</div>

<div class="week-block">
<h3>Week 5–6: Exploring AI Website Builders</h3>
<div class="week-details">
<p><strong>Topics:</strong> Wix AI, Framer AI, Durable for rapid site creation, customizing AI-generated designs.</p>
<p><strong>Activities:</strong> Build an e-commerce site with Wix AI, create a startup landing page with Framer AI, optimize a Durable site for SEO.</p>
<p><strong>Outcome:</strong> Deploy three AI-generated websites with custom branding and responsiveness.</p>
</div>
</div>

<div class="week-block">
<h3>Week 7–8: Advanced AI Integration</h3>
<div class="week-details">
<p><strong>Topics:</strong> Combining AI tools for full-stack development, integrating AI with frameworks (e.g., Next.js, Django), automating testing/debugging.</p>
<p><strong>Activities:</strong> Develop a full-stack app (e.g., blog with React front-end and Django backend) using Copilot and ChatGPT, automate tests with AI-generated Jest scripts.</p>
<p><strong>Outcome:</strong> Deploy a full-stack web app with automated tests and documentation.</p>
</div>
</div>

<div class="week-block">
<h3>Week 9–10: Project and Portfolio Development</h3>
<div class="week-details">
<p><strong>Topics:</strong> Best practices for AI-assisted workflows, ethical considerations, building a professional portfolio.</p>
<p><strong>Activities:</strong> Create a capstone project (e.g., e-commerce site with AI-generated UI and backend), document AI usage, build a portfolio site showcasing projects.</p>
<p><strong>Outcome:</strong> Complete a professional portfolio with at least three AI-assisted projects, ready for job applications or client pitches.</p>
</div>
</div>
</div>

<h2>Expectations</h2>

<div class="expectations-section">
<div class="expectation-block">
<h3>🎯 Skill Level</h3>
<p>Suitable for beginners with basic HTML/CSS knowledge, intermediate developers, or designers transitioning to web development.</p>
</div>

<div class="expectation-block">
<h3>⏰ Time Commitment</h3>
<p>8–10 hours/week for 10 weeks, including lectures, hands-on activities, and project work.</p>
</div>

<div class="expectation-block">
<h3>💻 Technical Requirements</h3>
<ul>
<li>Computer with 8GB+ RAM, 256GB+ storage, and stable internet (for cloud-based AI tools).</li>
<li>Software: VS Code, Node.js, Python, browser (e.g., Chrome), and accounts for AI tools (e.g., GitHub, Wix, Framer).</li>
</ul>
</div>

<div class="expectation-block">
<h3>🎓 Learning Outcomes</h3>
<ul>
<li>Proficiency in using AI code assistants (e.g., Copilot, Cursor) for web development tasks.</li>
<li>Ability to create and customize websites using AI builders (e.g., Wix AI, Framer AI).</li>
<li>Understanding of AI's benefits/limitations and ethical use in professional workflows.</li>
<li>A portfolio of AI-assisted web projects demonstrating coding, design, and optimization skills.</li>
</ul>
</div>

<div class="expectation-block">
<h3>📊 Assessment</h3>
<ul>
<li>Weekly assignments (e.g., code snippets, site prototypes) graded for functionality and creativity.</li>
<li>Mid-term project: Build a static website using AI tools (30% of grade).</li>
<li>Final project: Develop a full-stack web app with AI assistance, documented in a portfolio (50% of grade).</li>
<li>Participation in discussions or peer reviews (20% of grade).</li>
</ul>
</div>
</div>

<h2>Best Practices</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>🌐 Engage with Communities</h3>
<p>Engage with online communities (e.g., X's #WebDev, Reddit's r/webdev) to share AI-assisted projects and seek feedback.</p>
</div>

<div class="practice-item">
<h3>📝 Document AI Usage</h3>
<p>Document all AI-generated code/designs with comments or a project log to track contributions and ensure transparency.</p>
</div>

<div class="practice-item">
<h3>🔧 Experiment with Multiple Tools</h3>
<p>Experiment with multiple AI tools to find the best fit for specific tasks (e.g., Copilot for coding, Framer AI for design).</p>
</div>

<div class="practice-item">
<h3>⏱️ Complete Assignments on Time</h3>
<p>Complete assignments on time and seek instructor feedback to refine skills.</p>
</div>
</div>

<h2>Recommended Learning Workflow</h2>

<div class="workflow-section">
<ol class="workflow-list">
<li>Set up a development environment with VS Code, Node.js, Python, and AI tool accounts (e.g., GitHub Copilot, Wix AI).</li>
<li>Complete weekly readings and tutorials on AI tools, focusing on their applications in web development.</li>
<li>Experiment with AI code assistants (e.g., ChatGPT, Cursor) to generate and debug code for a static website (e.g., HTML/CSS landing page).</li>
<li>Use AI website builders (e.g., Framer AI) to create a prototype site, customizing it with manual edits.</li>
<li>Validate all AI-generated outputs with linters, performance tools, and browser testing.</li>
<li>Build a mid-term project (e.g., portfolio site) using a mix of AI code assistants and builders.</li>
<li>Document AI usage and manual contributions in a project log for transparency.</li>
<li>Develop a full-stack capstone project (e.g., e-commerce app with React and Node.js) using AI tools for coding, design, and testing.</li>
<li>Create a portfolio website showcasing all projects, hosted on GitHub Pages or Vercel.</li>
<li>Present the final project to peers or instructors, incorporating feedback and sharing insights on X with #AIWebDev.</li>
</ol>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> This course provides a comprehensive, structured approach to mastering AI-assisted web development. By following the roadmap and meeting the expectations, you'll develop practical skills that combine AI tools with traditional web development expertise, creating a competitive advantage in the job market.
</div>

</div>`
  }
};
