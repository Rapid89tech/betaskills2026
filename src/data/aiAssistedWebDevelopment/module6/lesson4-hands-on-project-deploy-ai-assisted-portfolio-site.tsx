import type { Lesson } from '@/types/course';

export const lesson4HandsOnProjectDeployAIAssistedPortfolioSite: Lesson = {
  id: 4,
  title: 'Hands-on Project: Deploy an AI-Assisted Portfolio Site',
  duration: '45 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/kdY4-DugM04',
    textContent: `<div class="lesson-content">

<h1>Hands-on Project: Deploy an AI-Assisted Portfolio Site</h1>

<p><strong>Purpose</strong>: Build and deploy a professional portfolio site using AI to generate content, optimize performance, and secure the deployment on Netlify, Vercel, or GitHub Pages.</p>

<h2>Project Overview</h2>
<ul>
  <li>Create a static portfolio site with sections for home, about, projects, and contact, using HTML, CSS, JavaScript, and Tailwind CSS.</li>
  <li>Use AI to generate content, meta tags, and security configurations, ensuring responsiveness, accessibility, and performance.</li>
  <li>Deploy to Netlify, Vercel, or GitHub Pages, optimizing for speed and SEO.</li>
</ul>

<h2>Step-by-Step Guide</h2>

<h3>Plan the Portfolio</h3>
<ul>
  <li><strong>Features</strong>: Header (nav, logo), hero section, about section, project grid, contact form, footer.</li>
  <li><strong>Tech Stack</strong>: HTML, CSS, JavaScript, Tailwind CSS.</li>
  <li><strong>Example</strong>: A portfolio showcasing three projects with descriptions, images, and links.</li>
</ul>

<h3>Generate Frontend with AI</h3>
<ul>
  <li><strong>Prompt</strong>: "ChatGPT, create an HTML/CSS portfolio site with Tailwind CSS."</li>
  <li><strong>Example Output</strong>:
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta name="description" content="Explore my web development portfolio with responsive, AI-assisted projects."&gt;
  &lt;title&gt;My Portfolio&lt;/title&gt;
  &lt;link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"&gt;
&lt;/head&gt;
&lt;body class="font-sans"&gt;
  &lt;header class="bg-gray-800 text-white p-4"&gt;
    &lt;nav class="flex justify-center space-x-4"&gt;
      &lt;a href="#home" class="hover:underline"&gt;Home&lt;/a&gt;
      &lt;a href="#about" class="hover:underline"&gt;About&lt;/a&gt;
      &lt;a href="#projects" class="hover:underline"&gt;Projects&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  &lt;main&gt;
    &lt;section id="home" class="p-8 text-center"&gt;
      &lt;h1 class="text-4xl font-bold"&gt;Welcome to My Portfolio&lt;/h1&gt;
      &lt;img src="hero.webp" alt="Portfolio hero image" class="mx-auto max-w-full h-auto" loading="lazy"&gt;
    &lt;/section&gt;
    &lt;section id="about" class="p-8"&gt;
      &lt;h2 class="text-2xl font-bold"&gt;About Me&lt;/h2&gt;
      &lt;p&gt;I'm a web developer creating responsive, user-friendly websites.&lt;/p&gt;
    &lt;/section&gt;
    &lt;section id="projects" class="p-8"&gt;
      &lt;h2 class="text-2xl font-bold"&gt;Projects&lt;/h2&gt;
      &lt;div class="grid grid-cols-1 md:grid-cols-3 gap-4"&gt;&lt;/div&gt;
    &lt;/section&gt;
  &lt;/main&gt;
  &lt;footer class="bg-gray-800 text-white p-4 text-center"&gt;
    &lt;p&gt;Contact: &lt;a href="mailto:example@email.com"&gt;example@email.com&lt;/a&gt;&lt;/p&gt;
  &lt;/footer&gt;
  &lt;script src="script.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </li>
  <li><strong>Prompt</strong>: "Grok, add JavaScript for a project grid and mobile menu toggle."</li>
  <li><strong>Example Output</strong>:
    <pre><code>const projects = [
  { title: "Project 1", desc: "A React app", img: "project1.webp" },
  { title: "Project 2", desc: "A Node.js API", img: "project2.webp" }
];
const projectGrid = document.querySelector("#projects .grid");
projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "border p-4 rounded";
  card.innerHTML = '&lt;img src="' + project.img + '" alt="' + project.title + '" class="w-full h-48 object-cover"&gt;' +
                   '&lt;h3 class="text-lg font-bold"&gt;' + project.title + '&lt;/h3&gt;' +
                   '&lt;p&gt;' + project.desc + '&lt;/p&gt;';
  projectGrid.appendChild(card);
});
const nav = document.querySelector("nav");
const toggle = document.createElement("button");
toggle.textContent = "Menu";
toggle.className = "md:hidden p-2";
document.querySelector("header").prepend(toggle);
toggle.addEventListener("click", () => {
  nav.classList.toggle("hidden");
});</code></pre>
  </li>
</ul>

<h3>Optimize Performance with AI</h3>
<ul>
  <li><strong>Prompt</strong>: "Claude, optimize my portfolio site for page speed."</li>
  <li><strong>Example Fixes</strong>: Convert images to WebP, add loading="lazy", minify CSS/JS with tools like Webpack.</li>
  <li>Run Lighthouse audit to achieve a 90+ score.</li>
</ul>

<h3>Generate Content and SEO with AI</h3>
<ul>
  <li><strong>Prompt</strong>: "ChatGPT, write an about section and meta description for my portfolio."</li>
  <li><strong>Example Output</strong>:
    <ul>
      <li>About: "I'm a passionate web developer specializing in responsive, AI-assisted websites using modern frameworks like React and Tailwind CSS."</li>
      <li>Meta: &lt;meta name="description" content="Discover my portfolio of responsive, AI-enhanced web projects. Contact me for custom development solutions."&gt;</li>
    </ul>
  </li>
  <li>Use Yoast SEO to validate meta tags.</li>
</ul>

<h3>Secure the Site with AI</h3>
<ul>
  <li><strong>Prompt</strong>: "Grok, add security headers to my Netlify site."</li>
  <li><strong>Example Output</strong>:
    <pre><code># netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"</code></pre>
  </li>
  <li>Enable HTTPS and verify with OWASP ZAP.</li>
</ul>

<h3>Deploy to a Platform</h3>
<ul>
  <li><strong>Netlify</strong>: Link GitHub repo, set build command (npm run build), and deploy (netlify deploy --prod).</li>
  <li><strong>Vercel</strong>: Import repo, configure vercel.json, and deploy (vercel --prod).</li>
  <li><strong>GitHub Pages</strong>: Push to gh-pages branch, enable Pages in settings.</li>
</ul>

<h3>Test and Validate</h3>
<ul>
  <li>Test responsiveness with BrowserStack (320px, 768px, 1200px).</li>
  <li>Run Lighthouse for performance, SEO, and accessibility (aim for 90+ scores).</li>
  <li>Verify security headers with securityheaders.com.</li>
</ul>

<h3>Document and Share</h3>
<ul>
  <li>Document AI contributions in a README (e.g., "HTML/CSS by ChatGPT, security headers by Grok").</li>
  <li>Share on GitHub and X with #WebDev, #Portfolio for feedback.</li>
</ul>

<h2>Tools Required</h2>
<ul>
  <li><strong>Development</strong>: VS Code, Node.js, Tailwind CSS (CDN or npm).</li>
  <li><strong>AI Assistants</strong>: ChatGPT, Claude, Grok, GitHub Copilot.</li>
  <li><strong>Deployment</strong>: Netlify, Vercel, GitHub Pages, Git.</li>
  <li><strong>Testing</strong>: Lighthouse, BrowserStack, OWASP ZAP, Yoast SEO.</li>
</ul>

<h2>Best Practices</h2>
<ul>
  <li>Validate AI-generated code/content with linters (e.g., ESLint) and SEO tools.</li>
  <li>Test deployments in preview environments before going live.</li>
  <li>Use version control (Git) to track AI and manual changes.</li>
  <li>Ensure accessibility (e.g., ARIA labels, WCAG 2.1 compliance) in AI-generated content.</li>
</ul>

<h2>Additional Considerations</h2>

<h3>Ethical Use of AI</h3>
<ul>
  <li>Disclose AI usage in project documentation for transparency with clients or teams.</li>
  <li>Verify that AI-generated content is unique to avoid SEO penalties (use Copyscape).</li>
  <li>Avoid using AI-generated code in open-source projects without checking licensing (e.g., GitHub Copilot's terms).</li>
</ul>

<h3>Skill Development</h3>
<ul>
  <li>Practice manual deployment (e.g., configure Netlify.toml without AI) to build core skills.</li>
  <li>Use AI to explain deployment concepts (e.g., "Grok, explain Vercel's Edge Functions").</li>
  <li>Participate in hackathons (e.g., Hackerearth) to apply AI-assisted deployment skills.</li>
</ul>

<h3>Testing and Validation</h3>
<ul>
  <li>Run performance audits with PageSpeed Insights or GTmetrix post-deployment.</li>
  <li>Test accessibility with WAVE or axe DevTools to meet WCAG 2.1 standards.</li>
  <li>Use Snyk to scan dependencies for vulnerabilities (e.g., outdated npm packages).</li>
</ul>

<h3>Collaboration and Version Control</h3>
<ul>
  <li>Use Git branches (e.g., ai-content, manual-optimizations) to separate AI and manual work.</li>
  <li>Share projects via GitHub pull requests for team feedback.</li>
  <li>Post on X with #WebDev, #AIDev to gain community insights.</li>
</ul>

<h3>Resources</h3>
<ul>
  <li>Reference Netlify, Vercel, and GitHub Pages documentation for setup guides.</li>
  <li>Follow X posts with #Netlify, #Vercel, #WebHosting for real-time tips.</li>
  <li>Watch YouTube tutorials (e.g., "Deploy to Netlify in 5 Minutes," "Vercel Next.js Guide").</li>
  <li>Join communities like freeCodeCamp, Reddit's r/webdev, or DEV Community.</li>
</ul>

<h3>Future Trends</h3>
<ul>
  <li>Explore AI-driven CI/CD pipelines (e.g., GitHub Actions with AI-optimized workflows).</li>
  <li>Monitor advancements in hosting platforms (e.g., Vercel's Edge Network) via tech blogs or X.</li>
  <li>Experiment with AI for real-time performance monitoring (e.g., AI-powered analytics dashboards).</li>
</ul>

<h2>Recommended Learning Workflow</h2>
<ol>
  <li>Study Netlify, Vercel, and GitHub Pages documentation to understand deployment processes.</li>
  <li>Set up a development environment with VS Code, Git, and AI tools (e.g., ChatGPT, Grok).</li>
  <li>Build a portfolio site using AI-generated HTML, CSS, JavaScript, and Tailwind CSS.</li>
  <li>Use AI to optimize performance (e.g., minify assets, lazy-load images) and generate SEO content.</li>
  <li>Apply AI-recommended security measures (e.g., headers, HTTPS).</li>
  <li>Deploy the site to Netlify, Vercel, or GitHub Pages, testing in preview first.</li>
  <li>Test for performance (Lighthouse), accessibility (WAVE), and security (OWASP ZAP).</li>
  <li>Debug issues with AI assistance (e.g., "Claude, fix my Vercel build error").</li>
  <li>Document the project in a GitHub README, noting AI contributions.</li>
  <li>Share on X with #Portfolio, #WebDev, seeking feedback to refine skills.</li>
</ol>

</div>`
  }
};
