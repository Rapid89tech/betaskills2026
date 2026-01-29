const quiz = {
  id: 7,
  title: 'Module 3 Quiz: Self-Regulation',
  duration: '20 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is self-regulation?',
        options: [
          'Ignoring your emotions',
          'Controlling and managing your emotions and actions',
          'Acting on every feeling',
          'Letting others manage your feelings'
        ],
        correct: 1,
        explanation: 'Self-regulation is the ability to manage and control one\'s emotions, thoughts, and behaviors in a positive, constructive way, particularly in challenging or stressful situations.'
      },
      {
        question: 'What is one technique used in self-regulation?',
        options: [
          'Shouting to release emotion',
          'Deep breathing',
          'Multitasking',
          'Avoiding responsibility'
        ],
        correct: 1,
        explanation: 'Deep breathing is a key technique for self-regulation, helping to slow down the nervous system and bring calm during stressful moments.'
      },
      {
        question: 'What does impulse control mean?',
        options: [
          'Doing things quickly',
          'Thinking before acting',
          'Acting on emotions',
          'Ignoring your feelings'
        ],
        correct: 1,
        explanation: 'Impulse control involves pausing to evaluate emotions and potential consequences before acting or speaking, preventing reactive or regrettable behavior.'
      },
      {
        question: 'Cognitive reframing means:',
        options: [
          'Ignoring problems',
          'Blaming others',
          'Viewing situations in a more positive way',
          'Avoiding tough situations'
        ],
        correct: 2,
        explanation: 'Cognitive reframing involves identifying and reshaping negative or unhelpful thoughts into constructive, balanced perspectives to manage emotional responses.'
      },
      {
        question: 'A self-regulated person will likely:',
        options: [
          'React aggressively',
          'Respond calmly under stress',
          'Blame others',
          'Overreact'
        ],
        correct: 1,
        explanation: 'Self-regulated individuals maintain composure under pressure, responding thoughtfully rather than reacting impulsively, which demonstrates emotional control and maturity.'
      },
      {
        question: 'Which is NOT a benefit of self-regulation?',
        options: [
          'Improved focus',
          'Better stress management',
          'Impulsive behaviour',
          'Stronger relationships'
        ],
        correct: 2,
        explanation: 'Impulsive behaviour is the opposite of self-regulation. Benefits of self-regulation include improved focus, better stress management, and stronger relationships.'
      },
      {
        question: 'Adaptability means:',
        options: [
          'Sticking to one way only',
          'Getting angry at change',
          'Adjusting calmly to new situations',
          'Avoiding change altogether'
        ],
        correct: 2,
        explanation: 'Adaptability is the ability to adjust emotions, thoughts, and behaviors to suit unexpected changes or challenges while maintaining composure.'
      },
      {
        question: 'One sign of poor self-regulation is:',
        options: [
          'Listening patiently',
          'Exploding with anger',
          'Taking deep breaths',
          'Being flexible'
        ],
        correct: 1,
        explanation: 'Exploding with anger indicates poor self-regulation, as it shows an inability to manage and control emotional responses in challenging situations.'
      },
      {
        question: 'Self-discipline helps you:',
        options: [
          'Quit when things get hard',
          'Act on emotions',
          'Stay focused on goals',
          'React without thinking'
        ],
        correct: 2,
        explanation: 'Self-discipline involves maintaining focus on goals and commitments, resisting distractions, and persevering through challenges to achieve objectives.'
      },
      {
        question: 'Taking a mindful break can help you:',
        options: [
          'Escape problems permanently',
          'Avoid people',
          'Regain focus and manage emotions',
          'Forget responsibilities'
        ],
        correct: 2,
        explanation: 'Mindful breaks involve stepping away from overwhelming situations to reset emotions and thoughts, creating space for clarity and composure, which helps regain focus.'
      }
    ]
  }
};

export default quiz;
