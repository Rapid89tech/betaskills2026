import type { Lesson } from '@/types/course';

export const quiz4: Lesson = {
  id: 4,
  title: '📝 Quiz 4: Ethics and Empathy in AI Systems',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is a primary source of bias in AI systems?',
        options: [
          'User preferences for certain colors',
          'Training data reflecting societal inequalities',
          'Hardware limitations of AI systems',
          'Lack of internet connectivity'
        ],
        correctAnswer: 1,
        explanation: 'Training data often embeds historical biases, such as societal inequalities, which AI can perpetuate if not addressed.'
      },
      {
        id: 2,
        question: 'Which type of bias occurs when important groups are omitted from AI data or analysis?',
        options: [
          'Sample bias',
          'Measurement bias',
          'Exclusion bias',
          'Confirmation bias'
        ],
        correctAnswer: 2,
        explanation: 'Exclusion bias happens when certain groups or variables are left out, leading to skewed AI outcomes.'
      },
      {
        id: 3,
        question: 'What does demographic parity in AI fairness aim to achieve?',
        options: [
          'Equal outcomes across groups like gender or race',
          'Prioritizing one group over another',
          'Ignoring demographic differences entirely',
          'Maximizing model accuracy only'
        ],
        correctAnswer: 0,
        explanation: 'Demographic parity seeks equal outcomes across groups to ensure equitable treatment.'
      },
      {
        id: 4,
        question: 'Why is transparency important in AI systems?',
        options: [
          'It increases processing speed',
          'It builds user trust and accountability',
          'It eliminates the need for data auditing',
          'It simplifies AI model design'
        ],
        correctAnswer: 1,
        explanation: 'Transparency fosters trust by making AI processes understandable and enables accountability through audits.'
      },
      {
        id: 5,
        question: 'Which technique helps address bias by reviewing datasets before AI training?',
        options: [
          'Explainable AI (XAI)',
          'Data auditing',
          'Human-in-the-loop',
          'Algorithmic fairness constraints'
        ],
        correctAnswer: 1,
        explanation: 'Data auditing identifies biases in datasets to ensure fairer AI outcomes.'
      },
      {
        id: 6,
        question: 'What is a common feature of an ethical dilemma in decision-making?',
        options: [
          'A clear, universally accepted solution',
          'Conflicting values or duties',
          'No stakeholders involved',
          'Guaranteed positive outcomes'
        ],
        correctAnswer: 1,
        explanation: 'Ethical dilemmas involve conflicting values, such as honesty vs. loyalty, making decisions complex.'
      },
      {
        id: 7,
        question: 'Which ethical theory focuses on achieving the greatest good for the greatest number?',
        options: [
          'Deontology',
          'Virtue ethics',
          'Utilitarianism',
          'Ethics of care'
        ],
        correctAnswer: 2,
        explanation: 'Utilitarianism prioritizes actions that maximize overall good or happiness.'
      },
      {
        id: 8,
        question: 'In AI decision-making, what complicates ethical choices?',
        options: [
          'Always having complete information',
          'Time pressure and cultural differences',
          'Lack of any consequences',
          'Uniform global ethical standards'
        ],
        correctAnswer: 1,
        explanation: 'Factors like time pressure and cultural differences make ethical decision-making challenging.'
      },
      {
        id: 9,
        question: 'What can AI currently simulate in terms of empathy?',
        options: [
          'Genuine emotional feelings',
          'Pre-programmed empathetic responses',
          'Subjective consciousness',
          'Moral agency'
        ],
        correctAnswer: 1,
        explanation: 'AI can mimic empathy through programmed responses but lacks genuine emotional experience.'
      },
      {
        id: 10,
        question: 'What is an ethical concern with AI simulating empathy?',
        options: [
          'Improving user experience',
          'Potential for emotional manipulation',
          'Reducing processing times',
          'Enhancing data accuracy'
        ],
        correctAnswer: 1,
        explanation: 'Simulated empathy risks manipulating users\' emotions, especially if not disclosed as AI-driven.'
      },
      {
        id: 11,
        question: 'What does value-sensitive design (VSD) aim to achieve in AI development?',
        options: [
          'Maximize computational efficiency',
          'Integrate ethical values throughout the design process',
          'Eliminate human involvement in AI',
          'Reduce development costs'
        ],
        correctAnswer: 1,
        explanation: 'Value-sensitive design integrates ethical values like fairness and privacy into AI development to align with human values.'
      },
      {
        id: 12,
        question: 'Which human value is emphasized by GDPR regulations in AI systems?',
        options: [
          'Transparency',
          'Privacy and autonomy',
          'Efficiency',
          'Creativity'
        ],
        correctAnswer: 1,
        explanation: 'GDPR emphasizes protecting user privacy and autonomy through strict data handling regulations.'
      },
      {
        id: 13,
        question: 'What is a challenge in designing AI with human values?',
        options: [
          'Lack of computational power',
          'Conflicts between values like fairness and efficiency',
          'Inability to program algorithms',
          'Uniform cultural values worldwide'
        ],
        correctAnswer: 1,
        explanation: 'Balancing conflicting values, such as fairness vs. efficiency, complicates aligning AI with human values.'
      },
      {
        id: 14,
        question: 'Why is human-in-the-loop important for ethical AI systems?',
        options: [
          'It reduces the need for data collection',
          'It allows humans to review or refine AI outputs',
          'It eliminates all biases automatically',
          'It speeds up AI processing'
        ],
        correctAnswer: 1,
        explanation: 'Human-in-the-loop systems enable human oversight to ensure ethical and fair AI decisions.'
      },
      {
        id: 15,
        question: 'What is a key benefit of designing AI with human-centered design principles?',
        options: [
          'Prioritizing user needs and inclusion',
          'Reducing development costs',
          'Eliminating the need for transparency',
          'Automating all design processes'
        ],
        correctAnswer: 0,
        explanation: 'Human-centered design focuses on user needs, accessibility, and inclusion for ethical AI systems.'
      }
    ]
  }
};
