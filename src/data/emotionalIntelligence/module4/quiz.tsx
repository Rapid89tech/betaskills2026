const quiz = {
  id: 7,
  title: 'Module 4 Quiz: Motivation',
  duration: '20 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is intrinsic motivation?',
        options: [
          'Motivation from money',
          'Motivation from rewards',
          'Motivation that comes from within',
          'Motivation from pressure'
        ],
        correct: 2,
        explanation: 'Intrinsic motivation arises from internal drives, where individuals engage in an activity because they find it inherently enjoyable, meaningful, or aligned with their values.'
      },
      {
        question: 'Which of these is an example of extrinsic motivation?',
        options: [
          'Reading because you enjoy it',
          'Painting for fun',
          'Exercising for personal health',
          'Studying to win a scholarship'
        ],
        correct: 3,
        explanation: 'Extrinsic motivation is driven by external incentives, such as money, praise, recognition, or rewards like scholarships.'
      },
      {
        question: 'What does SMART stand for in goal setting?',
        options: [
          'Simple, Manageable, Acceptable, Realistic, Timed',
          'Specific, Measurable, Achievable, Relevant, Time-bound',
          'Short, Measured, Active, Real, Testable',
          'Strong, Motivated, Accurate, Reliable, Time-based'
        ],
        correct: 1,
        explanation: 'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound, providing a structured framework to ensure goals are clear and attainable.'
      },
      {
        question: 'Which is a benefit of setting goals?',
        options: [
          'Increases confusion',
          'Helps you give up faster',
          'Provides direction and purpose',
          'Makes tasks harder'
        ],
        correct: 2,
        explanation: 'Setting meaningful goals provides purpose and direction, aligning actions with personal values and fostering motivation to achieve success.'
      },
      {
        question: 'Optimism helps motivation by:',
        options: [
          'Making you ignore problems',
          'Helping you stay focused and positive',
          'Encouraging unrealistic thinking',
          'Avoiding difficult tasks'
        ],
        correct: 1,
        explanation: 'Optimism sustains motivation by encouraging individuals to view setbacks as temporary and surmountable, fostering resilience and maintaining a positive outlook.'
      },
      {
        question: 'What is resilience?',
        options: [
          'The ability to avoid failure',
          'The ability to keep going despite setbacks',
          'Being lazy during hard times',
          'Ignoring all challenges'
        ],
        correct: 1,
        explanation: 'Resilience is the ability to recover quickly from challenges, setbacks, or adversity, maintaining emotional strength and adaptability.'
      },
      {
        question: 'Intrinsic motivation is strongest when you:',
        options: [
          'Are afraid of being punished',
          'Do something out of love or interest',
          'Want to impress others',
          'Expect a reward'
        ],
        correct: 1,
        explanation: 'Intrinsic motivation is strongest when individuals engage in activities because they find them inherently enjoyable, meaningful, or aligned with their personal values and interests.'
      },
      {
        question: 'What helps boost motivation?',
        options: [
          'Comparing yourself to others',
          'Waiting for the perfect moment',
          'Celebrating small wins',
          'Ignoring your goals'
        ],
        correct: 2,
        explanation: 'Celebrating small wins triggers dopamine release, reinforcing positive behavior and maintaining momentum toward larger goals.'
      },
      {
        question: 'A motivated person is likely to:',
        options: [
          'Quit easily',
          'Keep trying after failure',
          'Avoid setting goals',
          'Blame others for setbacks'
        ],
        correct: 1,
        explanation: 'Motivated individuals demonstrate persistence, viewing failure as a learning opportunity and continuing to pursue their goals despite setbacks.'
      },
      {
        question: 'Positive self-talk helps motivation by:',
        options: [
          'Distracting from work',
          'Making you overconfident',
          'Encouraging perseverance and belief',
          'Replacing real effort'
        ],
        correct: 2,
        explanation: 'Positive self-talk counters self-doubt, fosters a motivated and optimistic outlook, and enhances confidence in achieving goals.'
      }
    ]
  }
};

export default quiz;
