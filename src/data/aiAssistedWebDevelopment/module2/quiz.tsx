import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Quiz: Fundamentals of Web Development (AI-Augmented)',
  description: 'This quiz tests your understanding of HTML, CSS, JavaScript basics, responsive design principles, using AI for code snippets and explanations, AI-assisted debugging, and hands-on project development. Each question includes a correct answer and explanation.',
  questions: [
    {
      id: 1,
      question: 'What is the primary role of HTML in web development?',
      options: [
        'To style the appearance of webpages',
        'To provide structure and content using semantic tags',
        'To add interactivity and dynamic behavior',
        'To optimize website performance'
      ],
      correctAnswer: 1,
      explanation: 'HTML provides the structure and content of a webpage using semantic tags like &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt; to define elements and organize content.'
    },
    {
      id: 2,
      question: 'Which CSS property is used to create flexible layouts that adapt to different screen sizes?',
      options: [
        'position: relative;',
        'display: flex;',
        'float: left;',
        'clear: both;'
      ],
      correctAnswer: 1,
      explanation: 'display: flex; creates flexible layouts using Flexbox, which allows elements to adapt and arrange themselves based on available space and screen size.'
    },
    {
      id: 3,
      question: 'What is the purpose of media queries in responsive design?',
      options: [
        'To add animations to webpages',
        'To apply styles based on device characteristics like screen width',
        'To optimize images for faster loading',
        'To validate HTML code'
      ],
      correctAnswer: 1,
      explanation: 'Media queries allow you to apply different CSS styles based on device characteristics, such as screen width (e.g., @media (max-width: 768px) for mobile styles).'
    },
    {
      id: 4,
      question: 'How can AI tools help with code generation in web development?',
      options: [
        'By automatically deploying websites to production',
        'By generating code snippets based on natural language prompts',
        'By replacing the need for human developers entirely',
        'By only working with specific programming languages'
      ],
      correctAnswer: 1,
      explanation: 'AI tools like ChatGPT, Claude, and GitHub Copilot can generate code snippets based on natural language prompts, such as "Create a responsive CSS Grid layout for a blog."'
    },
    {
      id: 5,
      question: 'What is a best practice when using AI for debugging code?',
      options: [
        'Always use AI-suggested fixes without testing',
        'Share complete error messages and code snippets with AI for accurate debugging',
        'Ignore AI suggestions and rely only on manual debugging',
        'Use AI only for simple syntax errors'
      ],
      correctAnswer: 1,
      explanation: 'Sharing complete error messages and code snippets with AI provides the context needed for accurate debugging and better fix suggestions.'
    },
    {
      id: 6,
      question: 'Which JavaScript method is used to access HTML elements by their ID?',
      options: [
        'document.querySelector()',
        'document.getElementById()',
        'document.getElementsByClassName()',
        'document.getElementsByTagName()'
      ],
      correctAnswer: 1,
      explanation: 'document.getElementById() is used to access HTML elements by their unique ID attribute, returning a single element reference.'
    },
    {
      id: 7,
      question: 'What is the mobile-first design approach in responsive web development?',
      options: [
        'Designing only for mobile devices',
        'Starting with base styles for smaller screens, then adding styles for larger screens',
        'Using only mobile-specific CSS properties',
        'Ignoring desktop users entirely'
      ],
      correctAnswer: 1,
      explanation: 'Mobile-first design starts with base styles for smaller screens and progressively adds styles for larger screens via media queries, ensuring a solid foundation.'
    },
    {
      id: 8,
      question: 'Which AI tool is described as an "AI-powered IDE with real-time debugging"?',
      options: [
        'ChatGPT',
        'GitHub Copilot',
        'Cursor',
        'Claude'
      ],
      correctAnswer: 2,
      explanation: 'Cursor is an AI-powered IDE that integrates LLMs for code generation, autocompletion, and real-time debugging, making it ideal for development workflows.'
    },
    {
      id: 9,
      question: 'What should you do after receiving code suggestions from AI tools?',
      options: [
        'Use the code immediately in production',
        'Validate AI outputs with linters and test in a development environment',
        'Ignore the suggestions and write code manually',
        'Share the code with others without review'
      ],
      correctAnswer: 1,
      explanation: 'AI-generated code should always be validated with linters (like ESLint for JavaScript) and tested in a development environment before use to ensure quality and functionality.'
    },
    {
      id: 10,
      question: 'In the hands-on project, what is the recommended approach for customizing AI-generated designs?',
      options: [
        'Use the AI design exactly as generated without changes',
        'Customize the design to reflect personal style and preferences',
        'Avoid using AI for design entirely',
        'Only modify the color scheme'
      ],
      correctAnswer: 1,
      explanation: 'AI-generated designs should be customized to reflect personal style and preferences, ensuring the final product is unique and represents the developer\'s vision while leveraging AI assistance.'
    }
  ]
};
