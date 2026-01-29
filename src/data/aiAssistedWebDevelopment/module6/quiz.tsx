import type { Quiz } from '@/types/course';

export const module6Quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Deployment & Optimization with AI',
  description: 'This quiz tests your understanding of deploying web applications using Netlify, Vercel, and GitHub Pages, and leveraging AI for performance optimization, SEO, content generation, and security. It covers the hands-on project to deploy an AI-assisted portfolio site, along with practical applications, best practices, and ethical considerations. Each question includes a correct answer and explanation.',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of using Netlify, Vercel, or GitHub Pages in this module?',
      options: [
        'To develop backend APIs',
        'To host and deploy static and dynamic web applications',
        'To generate wireframes for websites',
        'To write server-side JavaScript'
      ],
      correctAnswer: 1,
      explanation: 'Netlify, Vercel, and GitHub Pages are platforms for hosting static sites and, in some cases, dynamic functionality (e.g., serverless functions). They do not focus on backend API development, wireframing, or server-side coding.'
    },
    {
      id: 2,
      question: 'What does the following AI-generated Netlify configuration do?\n\n# netlify.toml\n\n[[headers]]\n  for = "/*"\n  [headers.values]\n    Content-Security-Policy = "default-src \'self\'"\n    X-Frame-Options = "DENY"\n    X-Content-Type-Options = "nosniff"',
      options: [
        'Configures a database connection',
        'Sets security headers for a Netlify-hosted site',
        'Generates a sitemap for SEO',
        'Defines a build command'
      ],
      correctAnswer: 1,
      explanation: 'The netlify.toml file configures security headers (e.g., CSP, X-Frame-Options) to protect a Netlify site from vulnerabilities like XSS or clickjacking. It does not handle databases, SEO sitemaps, or build commands.'
    },
    {
      id: 3,
      question: 'Which platform is best suited for hosting a Next.js application with zero-config deployment?',
      options: [
        'GitHub Pages',
        'Vercel',
        'Netlify',
        'Firebase'
      ],
      correctAnswer: 1,
      explanation: 'Vercel offers zero-config deployment for Next.js apps, with automatic scaling and built-in support for serverless functions. Netlify supports Next.js but requires more configuration, GitHub Pages is for static sites, and Firebase is not optimized for Next.js.'
    },
    {
      id: 4,
      question: 'What is an example of an AI-generated optimization for page speed?',
      options: [
        'Adding a backend API endpoint',
        'Converting images to WebP and adding loading="lazy"',
        'Writing a MongoDB schema',
        'Generating a navigation menu'
      ],
      correctAnswer: 1,
      explanation: 'AI can suggest optimizations like using WebP images and lazy loading to reduce load times. Backend APIs, database schemas, and navigation menus are unrelated to page speed optimization.'
    },
    {
      id: 5,
      question: 'Which AI tool is best suited for generating an SEO-optimized meta description for a portfolio site?',
      options: [
        'Lighthouse',
        'Grok',
        'BrowserStack',
        'TinyPNG'
      ],
      correctAnswer: 1,
      explanation: 'Grok generates SEO-optimized meta descriptions (e.g., 120–160 characters) based on prompts, enhancing search visibility. Lighthouse audits SEO, BrowserStack tests responsiveness, and TinyPNG compresses images, not content.'
    },
    {
      id: 6,
      question: 'What is a best practice when using AI-generated content for a portfolio site?',
      options: [
        'Use content without checking for uniqueness',
        'Ensure content is unique to avoid SEO penalties',
        'Avoid editing AI-generated text',
        'Ignore brand alignment'
      ],
      correctAnswer: 1,
      explanation: 'Checking AI-generated content for uniqueness (e.g., with Copyscape) prevents SEO penalties for duplication. Editing for tone/brand alignment is recommended, not avoided.'
    },
    {
      id: 7,
      question: 'In the hands-on project, what is a key requirement for the AI-assisted portfolio site?',
      options: [
        'It must include a backend database',
        'It must be a static site with AI-generated content and optimizations',
        'It must use Django for the frontend',
        'It must avoid Tailwind CSS'
      ],
      correctAnswer: 1,
      explanation: 'The project requires a static portfolio site with AI-generated content, meta tags, and performance/security optimizations, deployed on Netlify, Vercel, or GitHub Pages. It does not use a backend database, Django, or avoid Tailwind CSS.'
    },
    {
      id: 8,
      question: 'What is an ethical consideration when using AI in the project\'s deployment?',
      options: [
        'Running Lighthouse audits',
        'Disclosing AI usage in project documentation for transparency',
        'Using Git for version control',
        'Testing responsiveness with BrowserStack'
      ],
      correctAnswer: 1,
      explanation: 'Disclosing AI usage ensures transparency for clients or teams, an ethical necessity. Audits, version control, and testing are practical steps, not ethical concerns.'
    },
    {
      id: 9,
      question: 'Which tool is recommended for auditing the performance of the deployed portfolio site?',
      options: [
        'GitHub Copilot',
        'Google PageSpeed Insights',
        'Yoast SEO',
        'Claude'
      ],
      correctAnswer: 1,
      explanation: 'Google PageSpeed Insights analyzes site performance and suggests optimizations (e.g., minify CSS). Copilot and Claude are for code/content generation, and Yoast SEO validates meta tags, not performance.'
    },
    {
      id: 10,
      question: 'What is a recommended resource for learning about deploying to Netlify or Vercel?',
      options: [
        'General news websites',
        'Netlify and Vercel documentation',
        'Non-technical social media',
        'Local library books'
      ],
      correctAnswer: 1,
      explanation: 'Netlify and Vercel\'s official documentation provide accurate, up-to-date guides for deployment. General news, non-technical social media, and library books are less relevant or outdated for this purpose.'
    }
  ]
};
