import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Automating Workflows with AI',
  description: 'This quiz tests your understanding of the "Automating Workflows with AI" module, covering code generation pipelines, AI in CI/CD and testing, personalization and analytics, and no-code/low-code development. Each question includes four multiple-choice options and the correct answer with an explanation.',
  questions: [
    {
      id: 1,
      question: 'What is a primary benefit of AI-powered code generation pipelines?',
      options: [
        'Eliminates the need for version control',
        'Speeds up development by automating repetitive tasks',
        'Guarantees bug-free code',
        'Replaces all human developers'
      ],
      correctAnswer: 1,
      explanation: 'AI-powered code generation pipelines, like GitHub Copilot, automate tasks such as generating boilerplate code or suggesting completions, significantly reducing development time while allowing developers to focus on higher-level tasks.'
    },
    {
      id: 2,
      question: 'Which of the following is a challenge of AI-driven code generation?',
      options: [
        'Lack of programming language support',
        'Over-reliance on AI by developers',
        'Inability to generate documentation',
        'Excessive computational cost'
      ],
      correctAnswer: 1,
      explanation: 'A key challenge is that developers may become overly dependent on AI tools, potentially reducing their problem-solving skills, as the tools may not always provide contextually perfect solutions.'
    },
    {
      id: 3,
      question: 'How does AI enhance CI/CD pipelines?',
      options: [
        'By manually writing all test cases',
        'By predicting potential bugs and optimizing test coverage',
        'By eliminating the need for code commits',
        'By replacing all CI/CD tools'
      ],
      correctAnswer: 1,
      explanation: 'AI in CI/CD pipelines, such as tools like Testim, generates and prioritizes test cases, predicts bugs, and detects anomalies, improving efficiency and reliability.'
    },
    {
      id: 4,
      question: 'What is a key challenge of integrating AI into CI/CD pipelines?',
      options: [
        'Lack of compatible programming languages',
        'Data dependency for accurate predictions',
        'Inability to automate testing',
        'High cost of open-source AI tools'
      ],
      correctAnswer: 1,
      explanation: 'AI models in CI/CD require historical data to make accurate predictions, which can be limited in new projects, posing a challenge to their effectiveness.'
    },
    {
      id: 5,
      question: 'What does AI-driven personalization in analytics primarily aim to achieve?',
      options: [
        'Increase server storage capacity',
        'Deliver tailored user experiences',
        'Eliminate user data collection',
        'Simplify backend development'
      ],
      correctAnswer: 1,
      explanation: 'AI-driven personalization uses algorithms like collaborative filtering to provide customized recommendations, improving user satisfaction and engagement.'
    },
    {
      id: 6,
      question: 'Which regulation is a concern for AI personalization and analytics?',
      options: [
        'ISO 9001',
        'GDPR',
        'IEEE 802.11',
        'SOX'
      ],
      correctAnswer: 1,
      explanation: 'AI personalization involves collecting user data, which must comply with privacy regulations like GDPR to ensure user data is handled ethically and legally.'
    },
    {
      id: 7,
      question: 'How does AI enhance no-code/low-code development platforms?',
      options: [
        'By requiring advanced coding skills',
        'By automating complex tasks and generating code',
        'By limiting platform accessibility',
        'By increasing manual debugging efforts'
      ],
      correctAnswer: 1,
      explanation: 'AI in no-code/low-code platforms, like Bubble or Mendix, automates tasks such as generating code from visual designs or natural language inputs, simplifying development.'
    },
    {
      id: 8,
      question: 'What is a limitation of no-code/low-code platforms?',
      options: [
        'Inability to integrate with external APIs',
        'Limited customization for advanced functionality',
        'Lack of AI integration',
        'High cost of free platforms'
      ],
      correctAnswer: 1,
      explanation: 'No-code/low-code platforms may restrict complex customizations, requiring manual coding for specific or advanced use cases.'
    },
    {
      id: 9,
      question: 'What is an example of an AI tool used in CI/CD testing?',
      options: [
        'Adobe Photoshop',
        'Test.ai',
        'Microsoft Excel',
        'Blender'
      ],
      correctAnswer: 1,
      explanation: 'Test.ai is an AI-driven testing tool that automates test case generation and prioritization in CI/CD pipelines, unlike the other options, which are unrelated to CI/CD.'
    },
    {
      id: 10,
      question: 'What technique can mitigate privacy concerns in AI personalization?',
      options: [
        'Federated learning',
        'Centralized data storage',
        'Manual data collection',
        'Open-source data sharing'
      ],
      correctAnswer: 0,
      explanation: 'Federated learning enables AI models to train on decentralized user data, reducing the need to share sensitive data and addressing privacy concerns like GDPR compliance.'
    }
  ]
};
