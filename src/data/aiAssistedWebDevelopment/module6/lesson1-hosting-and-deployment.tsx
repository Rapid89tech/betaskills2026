import type { Lesson } from '@/types/course';

export const lesson1HostingAndDeployment: Lesson = {
  id: 1,
  title: 'Hosting & Deployment (Netlify, Vercel, GitHub Pages)',
  content: (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none">
        <h2>Hosting & Deployment (Netlify, Vercel, GitHub Pages)</h2>
        
        <p><strong>Purpose</strong>: Understand how to deploy static and dynamic web applications to Netlify, Vercel, and GitHub Pages, leveraging their features for scalability, ease of use, and performance.</p>
        
        <h3>Details</h3>
        
        <h4>Netlify</h4>
        <ul>
          <li><strong>Role</strong>: A platform for hosting static sites and serverless functions, with automated builds, CDN distribution, and domain management.</li>
          <li><strong>Features</strong>:
            <ul>
              <li>Automatic scaling and global CDN for fast load times.</li>
              <li>Serverless functions for dynamic functionality (e.g., form submissions).</li>
              <li>Built-in CI/CD with Git integration (e.g., deploy on git push).</li>
              <li>Custom domain support and free SSL certificates.</li>
            </ul>
          </li>
          <li><strong>Setup Steps</strong>:
            <ul>
              <li>Create a Netlify account and connect a GitHub repository.</li>
              <li>Configure build settings (e.g., build command: npm run build, publish directory: dist).</li>
              <li>Deploy via CLI (netlify deploy --prod) or drag-and-drop for static files.</li>
            </ul>
          </li>
          <li><strong>Example</strong>: Deploy a React portfolio site by linking a GitHub repo and setting build: npm run build.</li>
        </ul>

        <h4>Vercel</h4>
        <ul>
          <li><strong>Role</strong>: A platform for hosting static sites, Next.js apps, and serverless APIs, with a focus on developer experience and performance.</li>
          <li><strong>Features</strong>:
            <ul>
              <li>Zero-config deployments for Next.js, React, or Vue apps.</li>
              <li>Automatic HTTPS and domain management.</li>
              <li>Serverless functions and Edge Functions for dynamic logic.</li>
              <li>Preview deployments for every Git branch.</li>
            </ul>
          </li>
          <li><strong>Setup Steps</strong>:
            <ul>
              <li>Create a Vercel account and import a GitHub repository.</li>
              <li>Configure vercel.json for custom settings (e.g., redirects, headers).</li>
              <li>Deploy via CLI (vercel --prod) or Vercel dashboard.</li>
            </ul>
          </li>
          <li><strong>Example</strong>: Deploy a Next.js blog with vercel --prod after pushing to GitHub.</li>
        </ul>

        <h4>GitHub Pages</h4>
        <ul>
          <li><strong>Role</strong>: A free hosting service for static sites, integrated with GitHub repositories, ideal for portfolios or documentation.</li>
          <li><strong>Features</strong>:
            <ul>
              <li>Hosts static HTML/CSS/JS files from a gh-pages branch or docs/ folder.</li>
              <li>Free custom domains and HTTPS via GitHub.</li>
              <li>Simple setup for personal or project sites (e.g., username.github.io).</li>
            </ul>
          </li>
          <li><strong>Setup Steps</strong>:
            <ul>
              <li>Create a repository (e.g., username.github.io).</li>
              <li>Push static files to the main branch or gh-pages branch.</li>
              <li>Enable GitHub Pages in repository settings (e.g., source: main, folder: /).</li>
            </ul>
          </li>
          <li><strong>Example</strong>: Host a portfolio site by pushing index.html to a gh-pages branch.</li>
        </ul>

        <h4>Practical Examples</h4>
        <ul>
          <li>A developer deploys a static portfolio to Netlify, enabling form submissions via serverless functions.</li>
          <li>A team uses Vercel to host a Next.js e-commerce app with automatic scaling for Black Friday traffic.</li>
          <li>A student hosts a personal blog on GitHub Pages, linking a custom domain for free.</li>
        </ul>

        <h3>Tools</h3>
        <ul>
          <li><strong>Platforms</strong>: Netlify (netlify.com), Vercel (vercel.com), GitHub Pages (pages.github.com).</li>
          <li><strong>CLI Tools</strong>: Netlify CLI (npm install -g netlify-cli), Vercel CLI (npm install -g vercel).</li>
          <li><strong>Version Control</strong>: Git, GitHub for repository management.</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use Git for version control, committing changes with descriptive messages (e.g., "Updated build script for Netlify").</li>
          <li>Test deployments in preview/staging environments (e.g., Vercel's branch previews) before production.</li>
          <li>Configure custom domains with DNS settings (e.g., CNAME for Netlify) and enable HTTPS.</li>
          <li>Monitor deployment logs via platform dashboards to troubleshoot build failures.</li>
        </ul>

        <div className="my-8">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Video content will be available here</p>
          </div>
        </div>
      </div>
    </div>
  )
};
