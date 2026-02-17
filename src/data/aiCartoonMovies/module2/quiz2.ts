import { Quiz } from '../../../types/course';

export const quiz2: Quiz = {
  id: 'ai-cartoon-movies-module2-quiz',
  title: 'Module 2 Quiz: Pre-Production with AI',
  description: 'Test your understanding of AI-powered pre-production techniques including story generation, mood boards, scriptwriting, and iterative editing',
  questions: [
    {
      id: 'q1',
      question: 'Which AI tool is specifically mentioned as combining story generation with automated animation for rapid prototyping?',
      options: [
        'Photoshop',
        'Plotagon',
        'Microsoft Word',
        'Final Cut Pro'
      ],
      correctAnswer: 1,
      explanation: 'Plotagon combines scriptwriting with automated animation, allowing users to input dialogue and generate animated scenes for visualization and rapid prototyping.'
    },
    {
      id: 'q2',
      question: 'What is the primary benefit of using AI for generating story ideas and themes?',
      options: [
        'It eliminates the need for human creativity',
        'It provides rapid ideation and helps overcome creative blocks',
        'It makes stories longer',
        'It only works for one genre'
      ],
      correctAnswer: 1,
      explanation: 'AI tools provide rapid ideation, diverse concepts, and help creators overcome creative blocks by suggesting unique themes and plot points based on prompts.'
    },
    {
      id: 'q3',
      question: 'When creating AI-powered mood boards, what should you include in your prompts for best results?',
      options: [
        'Only one word',
        'Random unrelated terms',
        'Specific details about style, mood, composition, and lighting',
        'Just the character names'
      ],
      correctAnswer: 2,
      explanation: 'Detailed prompts that include style, mood, composition, lighting, and other specific details guide AI tools toward more accurate and relevant visual outputs for mood boards.'
    },
    {
      id: 'q4',
      question: 'Which tool is mentioned as using a "Story Engine" to expand brief prompts into detailed narratives?',
      options: [
        'Sudowrite',
        'Excel',
        'PowerPoint',
        'Blender'
      ],
      correctAnswer: 0,
      explanation: 'Sudowrite uses a "Story Engine" to expand brief prompts into detailed narratives with cohesive themes, suggesting subplots and character motivations.'
    },
    {
      id: 'q5',
      question: 'What is a key challenge when using AI for script drafts and dialogue generation?',
      options: [
        'AI is too expensive',
        'AI-generated content may lack emotional depth and require human refinement',
        'AI cannot generate any text',
        'AI only works in one language'
      ],
      correctAnswer: 1,
      explanation: 'While AI can generate scripts quickly, the content may lack emotional depth, nuance, or originality, requiring human refinement to add authenticity and artistic vision.'
    },
    {
      id: 'q6',
      question: 'What is the purpose of iterative editing in animation pre-production?',
      options: [
        'To make the project more expensive',
        'To repeatedly review and improve creative work based on feedback',
        'To delete all previous work',
        'To avoid making any changes'
      ],
      correctAnswer: 1,
      explanation: 'Iterative editing involves repeatedly reviewing and improving creative work based on feedback, ensuring scripts and concepts align with the project\'s vision.'
    },
    {
      id: 'q7',
      question: 'Which AI tool is mentioned for analyzing scripts and providing feedback on pacing, dialogue, and narrative flow?',
      options: [
        'Photoshop',
        'ChatGPT',
        'Illustrator',
        'After Effects'
      ],
      correctAnswer: 1,
      explanation: 'ChatGPT can analyze scripts and provide feedback on pacing, dialogue, and narrative flow, as well as suggest alternative dialogue or scene structures.'
    },
    {
      id: 'q8',
      question: 'What is a best practice when using AI for mood board creation?',
      options: [
        'Use only one image',
        'Never refine AI outputs',
        'Generate multiple variations and refine outputs manually or with additional tools',
        'Avoid using any prompts'
      ],
      correctAnswer: 2,
      explanation: 'Best practice includes generating multiple variations of concepts and refining AI outputs manually or with tools like Artbreeder to achieve the desired aesthetic.'
    },
    {
      id: 'q9',
      question: 'What should you do to maintain creative control when using AI for iterative editing?',
      options: [
        'Accept all AI suggestions without question',
        'Use AI as a tool, not a decision-maker, and trust your artistic instincts',
        'Never use AI feedback',
        'Let AI make all creative decisions'
      ],
      correctAnswer: 1,
      explanation: 'It\'s important to use AI as a tool rather than a decision-maker, trusting your artistic instincts when AI suggestions don\'t feel right, and remembering that AI feedback is just one perspective.'
    },
    {
      id: 'q10',
      question: 'Which technique is recommended for effective AI-assisted script refinement?',
      options: [
        'Making random changes',
        'Never asking for feedback',
        'Making specific feedback requests and incremental improvements',
        'Ignoring all suggestions'
      ],
      correctAnswer: 2,
      explanation: 'Effective refinement involves making specific feedback requests (rather than general questions) and making incremental improvements by focusing on one aspect at a time.'
    }
  ]
};
