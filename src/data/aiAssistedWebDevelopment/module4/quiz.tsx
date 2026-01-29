import type { Quiz } from '@/types/course';

export const module4Quiz: Quiz = {
  id: 4,
  title: 'Quiz: AI for Code Optimization',
  description: 'This quiz tests your understanding of using AI tools for code optimization including performance optimization, code refactoring, security enhancement, accessibility improvements, and best practices implementation. Each question includes a correct answer and explanation.',
  questions: [
    {
      id: 1,
      question: 'What is the primary goal of performance optimization in web development?',
      options: [
        'To make code more complex and feature-rich',
        'To improve loading times and user experience',
        'To reduce the amount of code written',
        'To increase the number of features'
      ],
      correctAnswer: 1,
      explanation: 'Performance optimization aims to improve loading times and user experience by making web applications faster and more responsive, which leads to better user satisfaction and reduced bounce rates.'
    },
    {
      id: 2,
      question: 'What is code refactoring?',
      options: [
        'Adding new features to existing code',
        'Restructuring existing code without changing its external behavior',
        'Completely rewriting code from scratch',
        'Deleting unnecessary code'
      ],
      correctAnswer: 1,
      explanation: 'Code refactoring is the process of restructuring existing code without changing its external behavior. The goal is to improve code quality, readability, maintainability, and reduce technical debt.'
    },
    {
      id: 3,
      question: 'Which of the following is a common security vulnerability that AI tools can help identify?',
      options: [
        'Slow loading times',
        'Cross-Site Scripting (XSS)',
        'Poor color contrast',
        'Large file sizes'
      ],
      correctAnswer: 1,
      explanation: 'Cross-Site Scripting (XSS) is a common security vulnerability where malicious scripts are injected into web pages. AI tools can help identify and suggest fixes for such security issues.'
    },
    {
      id: 4,
      question: 'What does WCAG stand for in accessibility?',
      options: [
        'Web Content Accessibility Guidelines',
        'Web Coding and Architecture Guidelines',
        'Web Component Accessibility Group',
        'Web Content Architecture Guide'
      ],
      correctAnswer: 0,
      explanation: 'WCAG stands for Web Content Accessibility Guidelines. These are international standards for making web content accessible to people with disabilities.'
    },
    {
      id: 5,
      question: 'What is the purpose of ARIA labels in web accessibility?',
      options: [
        'To make websites load faster',
        'To provide additional context for screen readers',
        'To improve SEO rankings',
        'To reduce file sizes'
      ],
      correctAnswer: 1,
      explanation: 'ARIA (Accessible Rich Internet Applications) labels provide additional context and information for screen readers, making web content more accessible to users with visual impairments.'
    },
    {
      id: 6,
      question: 'Which of the following is a best practice for error handling?',
      options: [
        'Ignoring all errors to keep code simple',
        'Always using try-catch blocks with proper error messages',
        'Only handling errors in production code',
        'Using console.log for all error reporting'
      ],
      correctAnswer: 1,
      explanation: 'Using try-catch blocks with proper error messages is a best practice for error handling. This helps with debugging, user experience, and maintaining code quality.'
    },
    {
      id: 7,
      question: 'What is the main benefit of following coding best practices?',
      options: [
        'To make code more complex',
        'To improve code quality, maintainability, and team collaboration',
        'To reduce the need for testing',
        'To make code run faster automatically'
      ],
      correctAnswer: 1,
      explanation: 'Following coding best practices improves code quality, maintainability, and team collaboration. It results in cleaner, more readable, and maintainable code that\'s easier for teams to work with.'
    },
    {
      id: 8,
      question: 'Which tool is commonly used for automated accessibility testing?',
      options: [
        'GitHub Copilot',
        'WAVE (Web Accessibility Evaluation Tool)',
        'ESLint',
        'Prettier'
      ],
      correctAnswer: 1,
      explanation: 'WAVE (Web Accessibility Evaluation Tool) is commonly used for automated accessibility testing. It helps identify accessibility issues in web applications.'
    },
    {
      id: 9,
      question: 'What is the purpose of code splitting in performance optimization?',
      options: [
        'To make code more complex',
        'To reduce initial bundle size and improve loading times',
        'To increase the number of files',
        'To make debugging easier'
      ],
      correctAnswer: 1,
      explanation: 'Code splitting reduces initial bundle size and improves loading times by splitting code into smaller chunks that can be loaded on demand, rather than loading everything at once.'
    },
    {
      id: 10,
      question: 'What should you do when AI suggests code improvements?',
      options: [
        'Always implement them immediately without review',
        'Understand the reasoning behind the suggestions and test them thoroughly',
        'Ignore all AI suggestions as they are usually wrong',
        'Only implement suggestions that reduce code size'
      ],
      correctAnswer: 1,
      explanation: 'When AI suggests code improvements, you should understand the reasoning behind the suggestions and test them thoroughly. Don\'t blindly apply AI suggestions - understand what they accomplish and ensure they\'re appropriate for your specific use case.'
    }
  ]
};
