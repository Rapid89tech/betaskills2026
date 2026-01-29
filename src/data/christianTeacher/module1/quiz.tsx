import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 7,
  title: 'Quiz: Understanding Ministry and Calling',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the core meaning of ministry in a religious context?',
        options: [
          'Accumulating personal wealth through religious activities',
          'Serving others through spiritual or charitable acts',
          'Leading political movements based on faith',
          'Teaching academic subjects in a church setting'
        ],
        correctAnswer: 1,
        explanation: 'Ministry involves serving others within a spiritual or religious framework, through leadership, guidance, or acts of compassion, such as preaching or charity work, as seen in roles like pastors or volunteers.'
      },
      {
        id: 2,
        question: 'Which of the following is an example of a clergy-led ministry?',
        options: [
          'A layperson organizing a community food drive',
          'A pastor delivering sermons and performing baptisms',
          'A volunteer teaching Sunday school',
          'A nurse providing care in a hospital'
        ],
        correctAnswer: 1,
        explanation: 'Clergy-led ministry involves formal roles like pastors or priests who lead worship and perform sacred rituals, unlike lay or secular roles.'
      },
      {
        id: 3,
        question: 'How did Ezra demonstrate spiritual leadership in his ministry?',
        options: [
          'By performing miracles to heal the sick',
          'By leading exiles back to Jerusalem and teaching the Law',
          'By writing epistles to early Christian churches',
          'By traveling globally to spread Christianity'
        ],
        correctAnswer: 1,
        explanation: 'Ezra\'s ministry (Ezra 7–10, Nehemiah 8) focused on guiding exiles and teaching the Law of Moses to restore Israel\'s spiritual identity, not miracles or global outreach.'
      },
      {
        id: 4,
        question: 'What is a key characteristic of a calling in religious contexts?',
        options: [
          'It is a casual decision to pursue a career',
          'It is a divine prompting to serve or live out faith',
          'It requires no personal commitment or sacrifice',
          'It is limited to secular professions like teaching'
        ],
        correctAnswer: 1,
        explanation: 'A calling is a profound, often divine, conviction to pursue a purpose, such as ministry or service, as seen in examples like Paul\'s call to preach to Gentiles (Galatians 1:15–16).'
      },
      {
        id: 5,
        question: 'Which activity is an example of the service and charity aspect of ministry?',
        options: [
          'Leading a Bible study group',
          'Running a church soup kitchen for the homeless',
          'Performing a wedding ceremony',
          'Writing theological books'
        ],
        correctAnswer: 1,
        explanation: 'Service and charity in ministry involve practical acts of compassion, like feeding the needy, reflecting values of love and care.'
      },
      {
        id: 6,
        question: 'How did Paul\'s ministry contribute to the spread of Christianity?',
        options: [
          'By focusing on rebuilding the temple in Jerusalem',
          'By performing miracles like Jesus',
          'By preaching to Gentiles and writing New Testament epistles',
          'By teaching the Law of Moses to exiles'
        ],
        correctAnswer: 2,
        explanation: 'Paul\'s missionary journeys and epistles (e.g., Romans, Ephesians) expanded Christianity to non-Jewish regions, shaping its theology and reach.'
      },
      {
        id: 7,
        question: 'What is an example of a specialized ministry?',
        options: [
          'A pastor leading weekly church services',
          'A youth minister organizing retreats for teenagers',
          'A layperson volunteering at a local charity',
          'A missionary preaching globally'
        ],
        correctAnswer: 1,
        explanation: 'Specialized ministry focuses on specific groups or needs, like youth or prison chaplaincy, distinct from general clergy or lay roles.'
      },
      {
        id: 8,
        question: 'How does a calling provide resilience, according to the provided information?',
        options: [
          'By guaranteeing financial success',
          'By motivating individuals to overcome obstacles',
          'By avoiding all challenges in ministry',
          'By limiting service to local communities'
        ],
        correctAnswer: 1,
        explanation: 'A strong sense of calling, like Paul\'s perseverance through persecution, drives individuals to endure hardships for their purpose.'
      },
      {
        id: 9,
        question: 'What role did Jesus\' ministry play in Christianity?',
        options: [
          'It restored Jewish worship practices post-exile',
          'It established core Christian teachings through miracles and parables',
          'It focused solely on writing theological letters',
          'It avoided non-Jewish communities'
        ],
        correctAnswer: 1,
        explanation: 'Jesus\' three-year ministry, marked by teachings (e.g., Good Samaritan parable) and miracles (e.g., healing the blind), laid the foundation for Christianity\'s message of love and salvation.'
      },
      {
        id: 10,
        question: 'How do modern ministries (2025) utilize digital platforms like X?',
        options: [
          'By avoiding online engagement to maintain tradition',
          'By sharing virtual sermons and fostering global outreach',
          'By replacing all in-person worship with digital services',
          'By limiting ministry to local communities'
        ],
        correctAnswer: 1,
        explanation: 'Modern ministries leverage platforms like X for virtual sermons and outreach, expanding their reach while emphasizing inclusivity and social justice.'
      }
    ]
  }
};
