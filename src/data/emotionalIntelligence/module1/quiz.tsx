const quiz = {
  id: 3,
  title: 'Module 1 Quiz: Introduction to Emotional Intelligence',
  duration: '20 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is emotional intelligence (EI)?',
        options: [
          'The ability to solve mathematical problems',
          'The ability to understand and manage your own emotions and those of others',
          'The ability to speak multiple languages',
          'The ability to use technology effectively'
        ],
        correct: 1,
        explanation: 'Emotional Intelligence is the ability to perceive, understand, manage, and regulate emotions—both one\'s own and those of others—and to leverage this emotional awareness to guide thinking and behavior effectively.'
      },
      {
        question: 'Which of the following is NOT a component of emotional intelligence?',
        options: [
          'Self-awareness',
          'Self-regulation',
          'Empathy',
          'Logical reasoning'
        ],
        correct: 3,
        explanation: 'The five components of EI according to Daniel Goleman are: self-awareness, self-regulation, motivation, empathy, and social skills. Logical reasoning is part of IQ, not EI.'
      },
      {
        question: 'Which component of EI involves recognizing your own emotions?',
        options: [
          'Motivation',
          'Social skills',
          'Self-awareness',
          'Empathy'
        ],
        correct: 2,
        explanation: 'Self-awareness is the ability to recognize and understand one\'s own emotions, their triggers, and their impact on oneself and others.'
      },
      {
        question: 'Empathy means:',
        options: [
          'Ignoring others\' feelings',
          'Understanding and sharing the feelings of another person',
          'Telling people how to feel',
          'Controlling other people\'s emotions'
        ],
        correct: 1,
        explanation: 'Empathy is the ability to recognize, understand, and share the feelings of others, including emotional empathy, cognitive empathy, and compassionate empathy.'
      },
      {
        question: 'Which of the following best describes self-regulation?',
        options: [
          'Acting without thinking',
          'Avoiding all emotions',
          'Managing your emotions in healthy ways',
          'Always agreeing with others'
        ],
        correct: 2,
        explanation: 'Self-regulation is the capacity to manage and control disruptive emotions and impulses, maintaining composure, adapting to change, and acting with integrity.'
      },
      {
        question: 'What does it mean to have high emotional intelligence in a team setting?',
        options: [
          'You dominate conversations',
          'You control team decisions',
          'You listen, empathize, and communicate effectively',
          'You focus only on your own tasks'
        ],
        correct: 2,
        explanation: 'High EI in teams involves effective communication, empathy, active listening, and the ability to build and maintain healthy relationships.'
      },
      {
        question: 'Which skill helps you to build healthy relationships and resolve conflict?',
        options: [
          'Technical skills',
          'Social skills',
          'Physical strength',
          'Artistic talent'
        ],
        correct: 1,
        explanation: 'Social skills are the ability to build and maintain healthy relationships, communicate effectively, resolve conflicts, and influence others positively.'
      },
      {
        question: 'A person with high emotional intelligence is likely to:',
        options: [
          'Ignore feedback',
          'React impulsively',
          'Handle stress well',
          'Avoid emotions'
        ],
        correct: 2,
        explanation: 'People with high EI demonstrate self-regulation and resilience, enabling them to manage stress effectively and respond thoughtfully rather than impulsively.'
      },
      {
        question: 'Which of these is a sign of low emotional intelligence?',
        options: [
          'Active listening',
          'Managing stress effectively',
          'Blaming others frequently',
          'Expressing emotions appropriately'
        ],
        correct: 2,
        explanation: 'Blaming others frequently indicates poor self-awareness and self-regulation, which are key components of emotional intelligence.'
      },
      {
        question: 'Why is emotional intelligence important in the workplace?',
        options: [
          'It helps reduce salaries',
          'It leads to more technical knowledge',
          'It improves communication, teamwork, and leadership',
          'It eliminates the need for training'
        ],
        correct: 2,
        explanation: 'EI is critical for workplace success as it enhances communication, teamwork, conflict resolution, and leadership effectiveness, often surpassing technical skills in determining career advancement.'
      }
    ]
  }
};

export default quiz;
