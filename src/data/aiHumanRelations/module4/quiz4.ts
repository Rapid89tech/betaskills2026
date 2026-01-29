export const quiz4 = {
  id: 16,
  title: 'Module 4 Quiz: Ethics and Empathy in AI Systems',
  duration: '15 minutes',
  type: 'quiz' as const,
  content: {
    questions: [
    {
      question: 'What is a primary source of bias in AI systems?',
      options: [
        'User preferences for certain colors',
        'Training data reflecting societal inequalities',
        'Hardware limitations of AI systems',
        'Lack of internet connectivity'
      ],
      correct: 1,
      explanation: 'Training data often embeds historical biases, such as societal inequalities, which AI can perpetuate if not addressed.'
    },
    {
      question: 'Which type of bias occurs when important groups are omitted from AI data or analysis?',
      options: [
        'Sample bias',
        'Measurement bias',
        'Exclusion bias',
        'Confirmation bias'
      ],
      correct: 2,
      explanation: 'Exclusion bias happens when certain groups or variables are left out, leading to skewed AI outcomes.'
    },
    {
      question: 'What does demographic parity in AI fairness aim to achieve?',
      options: [
        'Equal outcomes across groups like gender or race',
        'Prioritizing one group over another',
        'Ignoring demographic differences entirely',
        'Maximizing model accuracy only'
      ],
      correct: 0,
      explanation: 'Demographic parity seeks equal outcomes across groups to ensure equitable treatment.'
    },
    {
      question: 'Why is transparency important in AI systems?',
      options: [
        'It increases processing speed',
        'It builds user trust and accountability',
        'It eliminates the need for data auditing',
        'It simplifies AI model design'
      ],
      correct: 1,
      explanation: 'Transparency fosters trust by making AI processes understandable and enables accountability through audits.'
    },
    {
      question: 'Which technique helps address bias by reviewing datasets before AI training?',
      options: [
        'Explainable AI (XAI)',
        'Data auditing',
        'Human-in-the-loop',
        'Algorithmic fairness constraints'
      ],
      correct: 1,
      explanation: 'Data auditing identifies biases in datasets to ensure fairer AI outcomes.'
    },
    {
      question: 'What is a common feature of an ethical dilemma in decision-making?',
      options: [
        'A clear, universally accepted solution',
        'Conflicting values or duties',
        'No stakeholders involved',
        'Guaranteed positive outcomes'
      ],
      correct: 1,
      explanation: 'Ethical dilemmas involve conflicting values, such as honesty vs. loyalty, making decisions complex.'
    },
    {
      question: 'Which ethical theory focuses on achieving the greatest good for the greatest number?',
      options: [
        'Deontology',
        'Virtue ethics',
        'Utilitarianism',
        'Ethics of care'
      ],
      correct: 2,
      explanation: 'Utilitarianism prioritizes actions that maximize overall good or happiness.'
    },
    {
      question: 'In AI decision-making, what complicates ethical choices?',
      options: [
        'Always having complete information',
        'Time pressure and cultural differences',
        'Lack of any consequences',
        'Uniform global ethical standards'
      ],
      correct: 1,
      explanation: 'Factors like time pressure and cultural differences make ethical decision-making challenging.'
    },
    {
      question: 'What can AI currently simulate in terms of empathy?',
      options: [
        'Genuine emotional feelings',
        'Pre-programmed empathetic responses',
        'Subjective consciousness',
        'Moral agency'
      ],
      correct: 1,
      explanation: 'AI can mimic empathy through programmed responses but lacks genuine emotional experience.'
    },
    {
      question: 'What is an ethical concern with AI simulating empathy?',
      options: [
        'Improving user experience',
        'Potential for emotional manipulation',
        'Reducing processing times',
        'Enhancing data accuracy'
      ],
      correct: 1,
      explanation: 'Simulated empathy risks manipulating users\' emotions, especially if not disclosed as AI-driven.'
    },
    {
      question: 'What does value-sensitive design (VSD) aim to achieve in AI development?',
      options: [
        'Maximize computational efficiency',
        'Integrate ethical values throughout the design process',
        'Eliminate human involvement in AI',
        'Focus only on technical performance'
      ],
      correct: 1,
      explanation: 'Value-sensitive design integrates ethical values like fairness and privacy into AI development to align with human values.'
    },
    {
      question: 'Which human value is emphasized by GDPR regulations in AI systems?',
      options: [
        'Transparency',
        'Privacy and autonomy',
        'Efficiency',
        'Creativity'
      ],
      correct: 1,
      explanation: 'GDPR emphasizes protecting user privacy and autonomy through strict data handling regulations.'
    },
    {
      question: 'What is a challenge in designing AI with human values?',
      options: [
        'Lack of computational power',
        'Conflicts between values like fairness and efficiency',
        'Inability to program algorithms',
        'Uniform cultural values worldwide'
      ],
      correct: 1,
      explanation: 'Balancing conflicting values, such as fairness vs. efficiency, complicates aligning AI with human values.'
    },
    {
      question: 'Why is human-in-the-loop important for ethical AI systems?',
      options: [
        'It reduces the need for data collection',
        'It allows humans to review or refine AI outputs',
        'It eliminates all biases automatically',
        'It speeds up AI processing'
      ],
      correct: 1,
      explanation: 'Human-in-the-loop systems enable human oversight to ensure ethical and fair AI decisions.'
    },
    {
      question: 'What is a key benefit of designing AI with human-centered design principles?',
      options: [
        'Prioritizing user needs and inclusion',
        'Reducing development costs',
        'Eliminating the need for transparency',
        'Automating all design processes'
      ],
      correct: 0,
      explanation: 'Human-centered design focuses on user needs, accessibility, and inclusion for ethical AI systems.'
    }
  ]
  }
}; 