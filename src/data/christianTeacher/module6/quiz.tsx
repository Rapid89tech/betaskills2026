import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 5,
  title: 'Quiz: Discipleship Through Teaching',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary goal of forming spiritual lives beyond academics?',
        options: [
          'To memorize more Bible verses',
          'To internalize and live out one\'s faith',
          'To attend more church services',
          'To read more theological books'
        ],
        correctAnswer: 1,
        explanation: 'The primary goal is to internalize and live out one\'s faith, not just knowing facts or doctrines but embodying those truths in daily life.'
      },
      {
        id: 2,
        question: 'Which of the following is NOT a key element of teaching prayer?',
        options: [
          'Prayer as relationship',
          'Different types of prayer',
          'The Lord\'s Prayer as a model',
          'Prayer as a religious duty only'
        ],
        correctAnswer: 3,
        explanation: 'Prayer should be taught as a vital relationship with God, not just as a religious duty. The other options are all key elements of teaching prayer.'
      },
      {
        id: 3,
        question: 'What is the biblical foundation for obedience in the Christian context?',
        options: [
          'Fear of punishment',
          'Loving response to God\'s love and wisdom',
          'Social pressure',
          'Legal requirements'
        ],
        correctAnswer: 1,
        explanation: 'Biblical obedience is about loving response to God\'s love and wisdom, not fear or legalism.'
      },
      {
        id: 4,
        question: 'What is the main purpose of Christian mentorship in education?',
        options: [
          'To improve academic performance only',
          'To guide students in spiritual, academic, and personal development',
          'To replace parents\' responsibilities',
          'To enforce school rules'
        ],
        correctAnswer: 1,
        explanation: 'Christian mentorship guides students in spiritual, academic, and personal development, modeling Jesus\' relationship with His disciples.'
      },
      {
        id: 5,
        question: 'Which biblical principle supports the concept of pastoral care in the classroom?',
        options: [
          'Being shepherds of God\'s flock under your care',
          'Teaching only academic subjects',
          'Maintaining strict discipline',
          'Focusing solely on test scores'
        ],
        correctAnswer: 0,
        explanation: '1 Peter 5:2-3 supports pastoral care by calling teachers to be shepherds of God\'s flock under their care.'
      },
      {
        id: 6,
        question: 'What is the core principle of Christian service?',
        options: [
          'Gaining recognition',
          'Following Jesus\' model of serving others',
          'Earning rewards',
          'Meeting requirements'
        ],
        correctAnswer: 1,
        explanation: 'The core principle is following Jesus\' model who came "not to be served, but to serve" (Mark 10:45).'
      },
      {
        id: 7,
        question: 'What is the Great Commission that forms the foundation for missions?',
        options: [
          'To build the largest church',
          'To go and make disciples of all nations',
          'To collect offerings',
          'To organize events'
        ],
        correctAnswer: 1,
        explanation: 'Matthew 28:19-20 commands us to "go and make disciples of all nations," which is the Great Commission.'
      },
      {
        id: 8,
        question: 'What type of leadership does Jesus model for Christian leaders?',
        options: [
          'Authoritarian leadership',
          'Servant leadership',
          'Democratic leadership',
          'Laissez-faire leadership'
        ],
        correctAnswer: 1,
        explanation: 'Jesus models servant leadership, as shown in Mark 10:42-45 where He teaches about serving others rather than being served.'
      },
      {
        id: 9,
        question: 'How do service, missions, and leadership work together?',
        options: [
          'They are completely separate activities',
          'Service develops leadership, leadership enables service, and missions requires both',
          'They compete with each other for time and resources',
          'Only one can be practiced at a time'
        ],
        correctAnswer: 1,
        explanation: 'These three areas are interconnected: service develops leadership, leadership enables service, and missions requires both service and leadership.'
      },
      {
        id: 10,
        question: 'What is the ultimate goal of encouraging service, missions, and leadership in students?',
        options: [
          'To create perfect students',
          'To develop well-rounded Christian leaders equipped to serve God and others',
          'To increase school enrollment',
          'To meet curriculum requirements'
        ],
        correctAnswer: 1,
        explanation: 'The ultimate goal is to develop well-rounded Christian leaders who are equipped to serve God and others effectively.'
      }
    ]
  }
};
