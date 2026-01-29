export const quiz6 = {
  id: 25,
  title: 'Module 6 Quiz: Legal and Psychological Implications of AI',
  duration: '15 minutes',
  type: 'quiz' as const,
  content: {
    questions: [
    {
      question: 'What is the central legal question raised by the increasing autonomy of AI systems?',
      options: [
        'How to improve AI performance',
        'Who is legally responsible when AI causes harm or behaves unpredictably',
        'How to design AI user interfaces',
        'How AI systems store data'
      ],
      correct: 1,
      explanation: 'The central legal question is determining who bears legal responsibility when AI systems cause harm or behave unpredictably, as AI can act autonomously without direct human control.'
    },
    {
      question: 'Which of the following best defines AI behavior?',
      options: [
        'Actions taken by a human programmer',
        'Actions or decisions made by AI based on programming, learning, and inputs',
        'Software bugs in AI systems',
        'Marketing strategies for AI products'
      ],
      correct: 1,
      explanation: 'AI behavior refers to actions or decisions made by AI systems based on their programming, machine learning algorithms, and input data.'
    },
    {
      question: 'What is "strict liability" in legal terms?',
      options: [
        'Liability that requires proving negligence',
        'Liability without fault for inherently risky activities',
        'Liability assigned to AI systems only',
        'Liability waived for manufacturers'
      ],
      correct: 1,
      explanation: 'Strict liability holds parties accountable without proving fault, often applied to high-risk activities like autonomous driving.'
    },
    {
      question: 'Why do traditional legal frameworks struggle with AI accountability?',
      options: [
        'AI systems always function predictably',
        'AI can act autonomously and learn, making causation and intent unclear',
        'Humans always control AI directly',
        'AI does not cause any harm'
      ],
      correct: 1,
      explanation: 'Traditional frameworks struggle because AI can act autonomously and learn, making causation and intent unclear, unlike human actors or static systems.'
    },
    {
      question: 'Which legal actor is generally NOT considered responsible for AI behavior under current laws?',
      options: [
        'AI developers',
        'AI users',
        'AI itself (legal personhood)',
        'Manufacturers'
      ],
      correct: 2,
      explanation: 'AI itself is generally not granted legal personhood under current laws, as AI lacks intent or moral agency.'
    },
    {
      question: 'What is a key challenge in assessing fault when AI causes harm?',
      options: [
        'Lack of AI in critical applications',
        'AI\'s complex machine learning processes that influence behavior unpredictably',
        'Clear human intent behind AI decisions',
        'AI systems never making errors'
      ],
      correct: 1,
      explanation: 'Assessing fault is challenging because AI\'s complex machine learning processes influence behavior unpredictably, making it difficult to trace causation.'
    },
    {
      question: 'Which emerging legal approach holds manufacturers or users liable regardless of fault for AI-related harm?',
      options: [
        'Fault-based liability',
        'Strict liability',
        'No liability',
        'Vicarious liability'
      ],
      correct: 1,
      explanation: 'Strict liability models hold manufacturers or users accountable for AI-related harm without proving fault, suitable for high-risk applications.'
    },
    {
      question: 'In the context of autonomous vehicles, who could potentially be held liable in the event of a crash?',
      options: [
        'Only the driver',
        'Only the software developer',
        'The manufacturer, software developer, or driver depending on the case',
        'No one'
      ],
      correct: 2,
      explanation: 'Liability could fall on the manufacturer, software developer, or driver depending on whether the failure was in hardware, algorithm, or oversight.'
    },
    {
      question: 'What is an "accountability gap" in AI legal responsibility?',
      options: [
        'When AI systems are fully accountable',
        'When no party is clearly responsible for AI-caused harm',
        'When AI is transparent and explainable',
        'When AI developers are always liable'
      ],
      correct: 1,
      explanation: 'An accountability gap occurs when no party is clearly responsible for AI-caused harm, creating a legal vacuum.'
    },
    {
      question: 'Why is transparency important in AI legal accountability?',
      options: [
        'To help AI learn faster',
        'To ensure public trust and determine who is responsible for decisions',
        'To increase AI speed',
        'To prevent AI from working autonomously'
      ],
      correct: 1,
      explanation: 'Transparency is crucial for ensuring public trust and determining who is responsible for AI decisions, enabling proper accountability.'
    },
    {
      question: 'What is a primary risk of over-reliance on AI systems?',
      options: [
        'Improved human judgment',
        'Reduced critical evaluation leading to errors or harm',
        'Increased user distrust',
        'Simplified decision-making processes'
      ],
      correct: 1,
      explanation: 'Over-reliance on AI can lead to reduced critical evaluation, causing users to accept AI outputs without scrutiny, potentially leading to errors or harm.'
    },
    {
      question: 'How can explainable AI (XAI) help manage trust?',
      options: [
        'By hiding AI decision processes',
        'By providing understandable reasons for AI decisions',
        'By reducing AI accuracy',
        'By eliminating human oversight'
      ],
      correct: 1,
      explanation: 'Explainable AI provides understandable reasons for AI decisions, enhancing transparency and helping users calibrate their trust appropriately.'
    },
    {
      question: 'What psychological theory suggests humans apply social rules to AI interactions?',
      options: [
        'Self-Determination Theory',
        'Social Presence Theory',
        'Computers as Social Actors (CASA) Paradigm',
        'Attachment Theory'
      ],
      correct: 2,
      explanation: 'The Computers as Social Actors (CASA) Paradigm notes that people apply social rules to AI, treating it as a social entity.'
    },
    {
      question: 'What is a potential negative psychological effect of AI interaction?',
      options: [
        'Enhanced human connections',
        'Over-dependence reducing human interactions',
        'Increased privacy security',
        'Reduced emotional confusion'
      ],
      correct: 1,
      explanation: 'Over-dependence on AI for social or emotional needs may reduce human connections, leading to isolation and negative psychological effects.'
    },
    {
      question: 'Why is transparency critical in AI interactions affecting human identity?',
      options: [
        'To increase AI autonomy',
        'To prevent deception about AI\'s non-human nature',
        'To reduce user engagement',
        'To limit emotional attachment'
      ],
      correct: 1,
      explanation: 'Transparency is critical to prevent deception about AI\'s non-human nature, ensuring users don\'t mistakenly believe AI genuinely cares or has human qualities.'
    }
  ]
  }
};
