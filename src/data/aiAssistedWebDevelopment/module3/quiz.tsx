import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 3,
  title: 'Quiz: AI Code Assistants',
  description: 'This quiz tests your understanding of AI code assistants including GitHub Copilot, Cursor, Claude, advanced prompting techniques, and integrating multiple AI tools. Each question includes a correct answer and explanation.',
  questions: [
    {
      id: 1,
      question: 'What is GitHub Copilot primarily designed for?',
      options: [
        'Creating complete websites from scratch',
        'Providing real-time code completion and suggestions as you type',
        'Generating documentation for existing code',
        'Debugging complex applications automatically'
      ],
      correctAnswer: 1,
      explanation: 'GitHub Copilot is an AI-powered code completion tool that suggests entire lines or blocks of code as you type, appearing in gray text that you can accept with Tab or continue typing to ignore.'
    },
    {
      id: 2,
      question: 'Which AI tool is built on top of VS Code and provides integrated AI chat capabilities?',
      options: [
        'GitHub Copilot',
        'Cursor',
        'Claude',
        'ChatGPT'
      ],
      correctAnswer: 1,
      explanation: 'Cursor is an AI-powered code editor built on top of VS Code that integrates large language models directly into the development environment, providing intelligent code completion, refactoring, debugging assistance, and natural language code generation.'
    },
    {
      id: 3,
      question: 'What is one of Claude\'s key strengths for web development?',
      options: [
        'Real-time code completion in IDEs',
        'Strong reasoning and clear explanations of code concepts',
        'Generating complete applications from single prompts',
        'Automatic debugging without human intervention'
      ],
      correctAnswer: 1,
      explanation: 'Claude excels at understanding complex requirements and breaking them down into logical, implementable solutions, and provides detailed, well-structured explanations of code concepts, making it excellent for learning and documentation.'
    },
    {
      id: 4,
      question: 'What is the purpose of role-based prompting in advanced prompting techniques?',
      options: [
        'To assign different roles to team members',
        'To assign a specific role to the AI to get more targeted responses',
        'To create different user roles in applications',
        'To manage project permissions'
      ],
      correctAnswer: 1,
      explanation: 'Role-based prompting involves assigning a specific role to the AI (like "Act as a senior React developer with 10 years of experience") to get more targeted and contextually appropriate responses.'
    },
    {
      id: 5,
      question: 'Why should you use multiple AI tools in web development?',
      options: [
        'To increase costs and complexity',
        'To leverage specialized strengths of different tools and achieve better results',
        'To confuse the development process',
        'To avoid learning any single tool properly'
      ],
      correctAnswer: 1,
      explanation: 'Different AI tools excel at different tasks - combining them leverages their unique strengths, provides complementary capabilities, helps validate solutions, and can significantly speed up development workflows.'
    },
    {
      id: 6,
      question: 'What is a best practice when using GitHub Copilot?',
      options: [
        'Accept all suggestions without review',
        'Always review Copilot\'s suggestions before accepting them',
        'Use Copilot only for simple tasks',
        'Ignore Copilot\'s suggestions entirely'
      ],
      correctAnswer: 1,
      explanation: 'Always review Copilot\'s suggestions before accepting them to ensure they match your requirements and coding standards, and to understand the code being generated.'
    },
    {
      id: 7,
      question: 'What is the purpose of chain-of-thought prompting?',
      options: [
        'To create complex code chains',
        'To ask AI to think through the problem step by step before providing a solution',
        'To link multiple AI tools together',
        'To create sequential programming tasks'
      ],
      correctAnswer: 1,
      explanation: 'Chain-of-thought prompting asks AI to think through the problem step by step (analyzing requirements, choosing technologies, structuring solutions, identifying challenges) before providing the implementation.'
    },
    {
      id: 8,
      question: 'Which AI tool is best suited for generating complex React components with project-wide context?',
      options: [
        'GitHub Copilot',
        'Cursor',
        'ChatGPT',
        'Claude'
      ],
      correctAnswer: 1,
      explanation: 'Cursor is best suited for generating complex React components because it can understand relationships between multiple files in your project, providing more accurate suggestions with project-wide context.'
    },
    {
      id: 9,
      question: 'What is a common challenge when integrating multiple AI tools?',
      options: [
        'Tools working too efficiently together',
        'Context switching being time-consuming and disruptive',
        'Having too many good suggestions',
        'Tools being too similar in capabilities'
      ],
      correctAnswer: 1,
      explanation: 'Context switching between tools can be time-consuming and disruptive. The solution is to establish clear workflows and use tools that complement each other seamlessly.'
    },
    {
      id: 10,
      question: 'What should you do when using AI tools for code generation?',
      options: [
        'Use the code immediately in production',
        'Always test AI-generated code to ensure it works correctly in your specific context',
        'Ignore the generated code and write everything manually',
        'Share the code with others without review'
      ],
      correctAnswer: 1,
      explanation: 'Always test AI-generated code to ensure it works correctly in your specific context. This includes validating the code, understanding it, and testing it thoroughly before use.'
    }
  ]
};
