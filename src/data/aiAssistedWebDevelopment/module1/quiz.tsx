import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Quiz: What is AI-Assisted Development?',
  description: 'This quiz tests your understanding of AI-assisted development, including its applications in coding and design, benefits and limitations, tools for website creation, and best practices for effective and ethical use. Each question includes a correct answer and explanation.',
  questions: [
    {
      id: 1,
      question: 'What is the primary purpose of AI-assisted development in web development?',
      options: [
        'To replace human developers entirely',
        'To automate repetitive tasks, generate code, and enhance creative workflows',
        'To create static websites without any human input',
        'To focus solely on backend development'
      ],
      correctAnswer: 1,
      explanation: 'AI-assisted development leverages tools like LLMs and generative AI to streamline tasks such as code generation, debugging, and UI prototyping, enhancing productivity while requiring human oversight for accuracy and creativity.'
    },
    {
      id: 2,
      question: 'Which of the following is an example of an AI application in coding?',
      options: [
        'Generating placeholder text for a website',
        'Creating a wireframe for a homepage',
        'Auto-generating a Python script for a REST API',
        'Suggesting color schemes for branding'
      ],
      correctAnswer: 2,
      explanation: 'AI applications in coding include generating code snippets, debugging, and autocompletion. Creating wireframes or color schemes relates to design, while placeholder text is content creation, not coding.'
    },
    {
      id: 3,
      question: 'What is a key benefit of using AI tools like GitHub Copilot in web development?',
      options: [
        'They guarantee error-free code without validation',
        'They reduce coding time for routine tasks by up to 40%',
        'They eliminate the need for version control systems',
        'They work offline without an internet connection'
      ],
      correctAnswer: 1,
      explanation: 'GitHub Copilot automates repetitive coding tasks, reducing development time significantly (per GitHub\'s 2023 studies). However, it requires validation, an internet connection, and does not replace version control.'
    },
    {
      id: 4,
      question: 'What is a limitation of AI tools like ChatGPT in web development?',
      options: [
        'They cannot generate code in any programming language',
        'They may produce incorrect or generic code requiring human validation',
        'They are only available for free without subscriptions',
        'They are limited to frontend development tasks'
      ],
      correctAnswer: 1,
      explanation: 'ChatGPT can generate code but may produce inaccurate or generic outputs due to context limitations, requiring human review. It supports multiple languages, has subscription tiers, and applies to both frontend and backend tasks.'
    },
    {
      id: 5,
      question: 'Which AI tool is best suited for generating a responsive website layout with minimal coding expertise?',
      options: [
        'GitHub Copilot',
        'Wix AI',
        'Cursor',
        'Claude'
      ],
      correctAnswer: 1,
      explanation: 'Wix AI is an AI website builder that generates responsive websites from prompts, ideal for non-technical users. GitHub Copilot, Cursor, and Claude are code assistants focused on coding tasks, requiring more technical knowledge.'
    },
    {
      id: 6,
      question: 'What is a best practice when using AI code assistants like GitHub Copilot?',
      options: [
        'Use AI-generated code without testing in production',
        'Combine AI tools with linters like ESLint for code quality',
        'Rely solely on AI for project-specific requirements',
        'Avoid documenting AI usage in projects'
      ],
      correctAnswer: 1,
      explanation: 'Using linters (e.g., ESLint) with AI code assistants ensures code quality and catches errors. AI outputs should be tested, documented, and validated for project-specific needs, not used blindly.'
    },
    {
      id: 7,
      question: 'In the course roadmap, what is the focus of Weeks 5–6?',
      options: [
        'Introduction to AI-assisted development',
        'Exploring AI website builders like Wix AI and Framer AI',
        'Building a full-stack app with AI integration',
        'Creating a professional portfolio'
      ],
      correctAnswer: 1,
      explanation: 'Weeks 5–6 focus on using AI website builders (e.g., Wix AI, Framer AI) to create and customize websites, with activities like building an e-commerce site and optimizing for SEO.'
    },
    {
      id: 8,
      question: 'What is an ethical consideration when using AI tools for web development?',
      options: [
        'Using AI-generated code without verifying licensing for open-source projects',
        'Sharing AI tool subscriptions with team members',
        'Testing AI outputs in a sandbox environment',
        'Updating AI tool plugins regularly'
      ],
      correctAnswer: 0,
      explanation: 'AI-generated code (e.g., from Copilot) may include copyrighted snippets, posing legal risks in open-source projects. Verifying licensing is an ethical necessity, while other options are standard practices.'
    },
    {
      id: 9,
      question: 'Which AI tool is described as an "AI-powered IDE with real-time debugging" for web development?',
      options: [
        'ChatGPT',
        'Framer AI',
        'Cursor',
        'Durable'
      ],
      correctAnswer: 2,
      explanation: 'Cursor is an AI-powered IDE that integrates LLMs for code generation, autocompletion, and real-time debugging. ChatGPT and Claude are conversational tools, while Framer AI and Durable focus on website building.'
    },
    {
      id: 10,
      question: 'What is a recommended resource for staying updated on AI tool advancements?',
      options: [
        'Local library books on web development',
        'X posts with hashtags like #AIWebDev and #GitHubCopilot',
        'General news websites without tech focus',
        'Offline coding bootcamps'
      ],
      correctAnswer: 1,
      explanation: 'X posts with hashtags like #AIWebDev provide real-time updates and tutorials on AI tool advancements, making them a dynamic resource compared to static or less relevant options like library books or general news sites.'
    }
  ]
};
