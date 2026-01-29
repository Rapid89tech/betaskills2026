const quiz = {
  id: 8,
  title: 'Module 6 Quiz: Social Skills',
  duration: '20 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What are social skills?',
        options: [
          'Ignoring people',
          'Communicating and interacting effectively with others',
          'Staying quiet in all situations',
          'Talking over others'
        ],
        correct: 1,
        explanation: 'Social skills are the abilities that enable individuals to communicate and interact effectively with others in various settings, essential for building relationships and collaborating successfully.'
      },
      {
        question: 'Which of these is an example of effective communication?',
        options: [
          'Interrupting often',
          'Speaking unclearly',
          'Listening actively and responding respectfully',
          'Avoiding difficult topics'
        ],
        correct: 2,
        explanation: 'Effective communication involves listening actively, speaking clearly and respectfully, and ensuring mutual understanding through thoughtful responses.'
      },
      {
        question: 'What is an "I" statement?',
        options: [
          'Blaming others',
          'A way to express your feelings without blaming',
          'Speaking loudly',
          'Ignoring emotions'
        ],
        correct: 1,
        explanation: '"I" statements frame your emotions and needs using "I" language to avoid blame and promote understanding, such as "I feel concerned when..." instead of "You always..."'
      },
      {
        question: 'Conflict resolution involves:',
        options: [
          'Attacking the person',
          'Ignoring the problem',
          'Finding solutions and staying respectful',
          'Shouting to win'
        ],
        correct: 2,
        explanation: 'Conflict resolution is the process of addressing disagreements constructively by staying calm, listening to all perspectives, and finding mutually acceptable solutions.'
      },
      {
        question: 'Which is a good strategy for building rapport?',
        options: [
          'Avoid eye contact',
          'Talk only about yourself',
          'Find common ground and be friendly',
          'Use sarcasm'
        ],
        correct: 2,
        explanation: 'Building rapport involves finding common interests, using positive body language, showing genuine interest, and being authentic to create trust and connection.'
      },
      {
        question: 'How can you positively influence others?',
        options: [
          'Manipulate them',
          'Be consistent, honest, and inspiring',
          'Always be the loudest',
          'Control the conversation'
        ],
        correct: 1,
        explanation: 'Positive influence involves leading by example, building trust through consistency and integrity, motivating respectfully, and empowering others while respecting their autonomy.'
      },
      {
        question: 'Which of the following shows poor collaboration?',
        options: [
          'Sharing ideas',
          'Respecting others\' input',
          'Refusing to compromise',
          'Team brainstorming'
        ],
        correct: 2,
        explanation: 'Poor collaboration is shown by refusing to compromise, as effective teamwork requires flexibility, valuing diverse perspectives, and finding solutions that benefit the group.'
      },
      {
        question: 'Positive body language includes:',
        options: [
          'Eye contact and open posture',
          'Crossing arms and frowning',
          'Looking at your phone',
          'Avoiding interaction'
        ],
        correct: 0,
        explanation: 'Positive body language includes maintaining appropriate eye contact, using open posture, smiling, and nodding to convey warmth, engagement, and attentiveness.'
      },
      {
        question: 'What is a benefit of strong social skills?',
        options: [
          'More arguments',
          'Less teamwork',
          'Better relationships and communication',
          'Isolation'
        ],
        correct: 2,
        explanation: 'Strong social skills lead to better relationships and communication by enabling effective interaction, reducing misunderstandings, enhancing collaboration, and supporting emotional well-being.'
      },
      {
        question: 'Collaboration means:',
        options: [
          'Competing with others',
          'Avoiding teamwork',
          'Working together toward a common goal',
          'Only listening to the leader'
        ],
        correct: 2,
        explanation: 'Collaboration involves working effectively with others toward shared goals, combining diverse skills and perspectives to achieve outcomes that benefit the group.'
      }
    ]
  }
};

export default quiz;
