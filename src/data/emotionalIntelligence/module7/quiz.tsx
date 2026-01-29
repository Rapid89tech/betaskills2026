const quiz = {
  id: 5,
  title: 'Module 7 Quiz: Applying Emotional Intelligence',
  duration: '25 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What does EI stand for?',
        options: ['Emotional Involvement', 'Emotional Intelligence', 'External Insight', 'Empathic Initiative'],
        correct: 1,
        explanation: 'EI stands for Emotional Intelligence, which is the ability to recognize, understand, and manage emotions in ourselves and others.'
      },
      {
        question: 'Which of these is a key element of EI in leadership?',
        options: ['Controlling people', 'Self-awareness', 'Arrogance', 'Avoiding team input'],
        correct: 1,
        explanation: 'Self-awareness is a key element of EI in leadership, helping leaders understand their motivations, emotions, and impact on others.'
      },
      {
        question: 'Why is empathy important in teamwork?',
        options: ['To ignore people\'s feelings', 'To manipulate others', 'To understand and support teammates', 'To take credit for others\' work'],
        correct: 2,
        explanation: 'Empathy is important in teamwork because it helps team members understand and support each other, fostering collaboration and trust.'
      },
      {
        question: 'Leaders with high EI usually:',
        options: ['Shout to show authority', 'Understand their emotions and those of others', 'React without thinking', 'Avoid feedback'],
        correct: 1,
        explanation: 'Leaders with high EI understand their own emotions and those of others, enabling them to lead with empathy and effectiveness.'
      },
      {
        question: 'What does high EI help you do in stressful situations?',
        options: ['Panic', 'Avoid problems', 'Stay calm and respond wisely', 'Blame others'],
        correct: 2,
        explanation: 'High EI helps you stay calm and respond wisely in stressful situations through self-regulation and emotional awareness.'
      },
      {
        question: 'One way to improve your EI is to:',
        options: ['Judge others quickly', 'Reflect on your emotional responses', 'Keep emotions bottled up', 'Speak without thinking'],
        correct: 1,
        explanation: 'Reflecting on your emotional responses through practices like journaling and self-reflection helps improve emotional intelligence.'
      },
      {
        question: 'Emotionally intelligent people tend to:',
        options: ['Avoid teamwork', 'Make rash decisions', 'Perform better in personal and professional life', 'Disregard others\' emotions'],
        correct: 2,
        explanation: 'Emotionally intelligent people tend to perform better in both personal and professional life due to better relationships, decision-making, and stress management.'
      },
      {
        question: 'Which is an example of poor EI in leadership?',
        options: ['Listening actively', 'Reacting with anger to bad news', 'Giving constructive feedback', 'Leading with empathy'],
        correct: 1,
        explanation: 'Reacting with anger to bad news demonstrates poor self-regulation and emotional control, which are key components of EI in leadership.'
      },
      {
        question: 'How does EI help in collaboration?',
        options: ['Creates more arguments', 'Enhances conflict and stress', 'Encourages open communication and harmony', 'Makes teams competitive'],
        correct: 2,
        explanation: 'EI helps in collaboration by encouraging open communication, empathy, active listening, and constructive conflict resolution, creating harmony.'
      },
      {
        question: 'A person with strong EI is most likely to:',
        options: ['Dismiss other\'s opinions', 'Build strong, respectful relationships', 'Work alone always', 'Avoid emotional topics'],
        correct: 1,
        explanation: 'A person with strong EI is most likely to build strong, respectful relationships through empathy, active listening, and effective communication.'
      }
    ]
  }
};

export default quiz;
