
import { Quiz } from '../../../types/course';

export const quiz7: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Ethical & Creative Considerations',
  questions: [
    {
      question: 'What is the best way to balance AI automation with human creativity?',
      options: [
        'Let AI make all creative decisions',
        'Use AI for drafts and iteration, then refine with human judgement',
        'Avoid AI completely',
        'Only use AI for final publishing'
      ],
      correct: 1,
      explanation: 'AI works best as a creative assistant for drafts and iteration; humans provide intent, taste, and final decisions.'
    },
    {
      question: 'Which practice helps ensure originality when using AI-generated assets?',
      options: [
        'Copy the first output exactly',
        'Use multiple references and add unique creative direction',
        'Never review AI outputs',
        'Remove credits from sources'
      ],
      correct: 1,
      explanation: 'Originality improves when you combine references, guide the AI with your own creative intent, and refine the results.'
    },
    {
      question: 'What should you do to avoid plagiarism risks?',
      options: [
        'Treat AI output as final and publish immediately',
        'Verify sources, rewrite/refine, and keep your own unique style',
        'Use only one prompt forever',
        'Ignore licensing'
      ],
      correct: 1,
      explanation: 'Review and refine outputs, verify originality, and ensure your final work reflects your own creative style and rights.'
    }
  ]
};

