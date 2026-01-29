const quiz = {
  id: 7,
  title: 'Module 2 Quiz: Self-Awareness',
  duration: '20 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What does self-awareness primarily involve?',
        options: [
          'Judging others',
          'Understanding your emotions',
          'Avoiding conflict',
          'Telling people how you feel'
        ],
        correct: 1,
        explanation: 'Self-awareness is the ability to recognize and understand one\'s own thoughts, emotions, and behaviors, including their triggers and impact on oneself and others.'
      },
      {
        question: 'Which of the following is a tool for developing self-awareness?',
        options: [
          'Sleeping',
          'Watching TV',
          'Journaling',
          'Gossiping'
        ],
        correct: 2,
        explanation: 'Journaling is a powerful tool for building self-awareness by writing about daily experiences, emotions, and reactions to identify patterns and gain insight.'
      },
      {
        question: 'Being self-aware helps you to:',
        options: [
          'Control others',
          'React emotionally without thinking',
          'Improve decision-making',
          'Avoid responsibility'
        ],
        correct: 2,
        explanation: 'Self-awareness enhances decision-making by providing clarity about one\'s emotions, values, and biases, allowing for more rational and aligned choices.'
      },
      {
        question: 'Which of these is a sign of poor self-awareness?',
        options: [
          'Listening actively',
          'Blaming others constantly',
          'Accepting feedback',
          'Reflecting on behaviour'
        ],
        correct: 1,
        explanation: 'Blaming others constantly indicates poor self-awareness, as it shows an inability to recognize one\'s own role in situations and take responsibility for reactions.'
      },
      {
        question: 'What does mindfulness help with?',
        options: [
          'Avoiding your emotions',
          'Focusing on past mistakes',
          'Being present in the moment',
          'Making quick judgments'
        ],
        correct: 2,
        explanation: 'Mindfulness involves paying deliberate attention to the present moment, observing thoughts, emotions, and physical sensations without judgment, which enhances self-awareness.'
      },
      {
        question: 'One way to recognize your emotional triggers is to:',
        options: [
          'Ignore your feelings',
          'Reflect after emotional events',
          'Eat your favourite food',
          'Change your routine'
        ],
        correct: 1,
        explanation: 'Reflecting after emotional events helps identify what situations, events, or interactions spark specific emotional responses, enabling better understanding and management of triggers.'
      },
      {
        question: 'What is a benefit of high self-awareness?',
        options: [
          'More arguments',
          'Poor time management',
          'Stronger relationships',
          'Less productivity'
        ],
        correct: 2,
        explanation: 'High self-awareness enhances relationships by fostering empathy, effective communication, and trust through understanding one\'s emotional impact on others.'
      },
      {
        question: 'Which activity best supports emotional reflection?',
        options: [
          'Watching a movie',
          'Mindful meditation',
          'Playing video games',
          'Driving fast'
        ],
        correct: 1,
        explanation: 'Mindful meditation supports emotional reflection by helping individuals stay present and observe thoughts and emotions without judgment, enhancing self-awareness.'
      },
      {
        question: 'A person with low self-awareness may:',
        options: [
          'Own their mistakes',
          'Understand their emotions',
          'Blame others often',
          'Respond calmly under stress'
        ],
        correct: 2,
        explanation: 'People with low self-awareness often blame others because they lack the ability to recognize their own emotions, triggers, and role in situations.'
      },
      {
        question: 'Honest feedback from others can help you:',
        options: [
          'Feel bad',
          'Improve self-awareness',
          'Criticize yourself',
          'Lose confidence'
        ],
        correct: 1,
        explanation: 'Honest feedback from others provides external perspectives that can validate self-assessments, uncover blind spots, and enhance self-awareness.'
      }
    ]
  }
};

export default quiz;
