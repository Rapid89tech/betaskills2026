import type { Lesson } from '@/types/course';

export const quiz6: Lesson = {
  id: 4,
  title: '📝 Module 6 Quiz: Legal and Psychological Implications',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is one of the main legal challenges in determining responsibility for AI actions?',
        options: [
          'AI systems are too expensive to regulate',
          'The distributed nature of AI development makes accountability complex',
          'AI cannot be held legally responsible',
          'There are no laws governing AI behavior'
        ],
        correct: 1,
        explanation: 'The distributed nature of AI development—involving designers, developers, users, and the AI itself—makes determining legal responsibility complex and challenging.'
      },
      {
        question: 'How can AI impact human identity and self-perception?',
        options: [
          'AI has no impact on human identity',
          'AI can influence how people view themselves through personalized feedback and recommendations',
          'AI only affects professional identity',
          'AI eliminates the need for self-reflection'
        ],
        correct: 1,
        explanation: 'AI systems that provide personalized feedback, recommendations, and interactions can significantly influence how individuals perceive themselves and their capabilities.'
      },
      {
        question: 'What psychological concern arises from over-reliance on AI assistants?',
        options: [
          'Increased creativity',
          'Enhanced problem-solving skills',
          'Potential erosion of critical thinking and decision-making abilities',
          'Improved memory retention'
        ],
        correct: 2,
        explanation: 'Over-reliance on AI assistants may lead to erosion of critical thinking, problem-solving skills, and independent decision-making abilities as people become dependent on AI for routine tasks.'
      },
      {
        question: 'What is a key consideration in establishing legal frameworks for AI?',
        options: [
          'Ensuring AI systems are completely autonomous',
          'Balancing innovation with protection of human rights and safety',
          'Eliminating all human oversight',
          'Preventing any AI development'
        ],
        correct: 1,
        explanation: 'Legal frameworks must balance encouraging innovation and technological advancement with protecting human rights, safety, privacy, and ensuring accountability.'
      },
      {
        question: 'How can AI affect human relationships?',
        options: [
          'AI has no effect on human relationships',
          'AI can mediate communication and potentially alter the nature of human connections',
          'AI only improves relationships',
          'AI completely replaces human relationships'
        ],
        correct: 1,
        explanation: 'AI systems that mediate communication (like social media algorithms or chatbots) can alter how people connect, potentially affecting the depth and authenticity of human relationships.'
      }
    ]
  }
};
