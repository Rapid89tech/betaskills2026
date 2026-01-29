import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 3,
  title: 'Quiz: Fostering Respect, Kindness, and Collaboration in Ministry',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of fostering respect, kindness, and collaboration in ministry?',
        options: [
          'To promote competition among students',
          'To create an environment where individuals feel valued and grow spiritually',
          'To focus solely on academic achievement',
          'To limit interactions to clergy-led activities'
        ],
        correctAnswer: 1,
        explanation: 'The purpose is to nurture spiritual and social growth, reflecting God\'s love and grace, as seen in Jesus\' inclusive ministry (John 4:1–42).'
      },
      {
        id: 2,
        question: 'Which scripture supports fostering kindness and respect in ministry?',
        options: [
          'Colossians 3:12',
          'Acts 9:1–19',
          'Ezra 7:6',
          'Galatians 1:15–16'
        ],
        correctAnswer: 0,
        explanation: 'Colossians 3:12 encourages believers to clothe themselves with compassion, kindness, humility, gentleness, and patience, providing a biblical foundation for these practices.'
      },
      {
        id: 3,
        question: 'How did Jesus model respect and kindness in His ministry?',
        options: [
          'By avoiding interactions with non-Jews',
          'By washing His disciples\' feet with humility',
          'By focusing only on miracles to gain attention',
          'By limiting His teachings to religious leaders'
        ],
        correctAnswer: 1,
        explanation: 'Jesus\' act of washing feet (John 13:12–17) demonstrated respect and kindness, modeling humble service to inspire His disciples.'
      },
      {
        id: 4,
        question: 'What is a practical way to encourage empathy in a ministry setting?',
        options: [
          'Discourage group discussions to maintain focus',
          'Use role-playing activities to understand diverse perspectives',
          'Focus only on individual achievements',
          'Avoid addressing students\' personal stories'
        ],
        correctAnswer: 1,
        explanation: 'Role-playing or group discussions help students build compassion and unity by seeing others\' viewpoints, fostering empathy.'
      },
      {
        id: 5,
        question: 'How did Ezra foster respect and collaboration in his ministry?',
        options: [
          'By performing miracles to unify Israel',
          'By patiently teaching the Law to unify exiles',
          'By traveling globally to spread his message',
          'By ignoring community issues to avoid conflict'
        ],
        correctAnswer: 1,
        explanation: 'Ezra\'s teaching (Nehemiah 8) modeled respect and fostered collaboration, unifying Israel through compassionate leadership.'
      },
      {
        id: 6,
        question: 'What is a key strategy for handling discipline with biblical principles?',
        options: [
          'Correcting harshly to ensure immediate obedience',
          'Praying for wisdom before disciplining',
          'Avoiding correction to maintain harmony',
          'Disciplining without referencing scripture'
        ],
        correctAnswer: 1,
        explanation: 'James 1:5 encourages seeking God\'s wisdom through prayer to discipline with love and grace, ensuring restoration rather than shame.'
      },
      {
        id: 7,
        question: 'How does praising effort over results contribute to a growth-oriented environment?',
        options: [
          'It discourages students from trying new tasks',
          'It promotes resilience and a growth mindset',
          'It focuses only on perfect outcomes',
          'It limits collaboration among students'
        ],
        correctAnswer: 1,
        explanation: 'Recognizing effort, as Jesus did with Peter\'s growth (Matthew 14:31), encourages students to persevere and view mistakes as learning opportunities.'
      },
      {
        id: 8,
        question: 'What role does partnering with parents and pastors play in ministry?',
        options: [
          'It isolates families from church activities',
          'It aligns values to create a cohesive spiritual environment',
          'It limits communication to clergy only',
          'It avoids addressing family challenges'
        ],
        correctAnswer: 1,
        explanation: 'Collaboration, like Ezra\'s unification efforts (Ezra 7:10), ensures shared goals and supports spiritual growth at home and church.'
      },
      {
        id: 9,
        question: 'How did Dorcas demonstrate kindness and collaboration in her service?',
        options: [
          'By preaching to large crowds',
          'By quietly serving widows with charitable acts',
          'By writing theological letters',
          'By leading military campaigns'
        ],
        correctAnswer: 1,
        explanation: 'Dorcas\' charity work (Acts 9:36–39) reflected kindness and strengthened her community, fostering collaboration through humble service.'
      },
      {
        id: 10,
        question: 'How can modern ministers use platforms like X to foster respect and kindness?',
        options: [
          'By sharing rushed, self-focused content',
          'By posting inclusive, thoughtful messages',
          'By avoiding digital platforms entirely',
          'By limiting outreach to local communities'
        ],
        correctAnswer: 1,
        explanation: 'In 2025, ministers use X to share high-quality, empathetic content, fostering respect and kindness in global digital faith communities.'
      }
    ]
  }
};
