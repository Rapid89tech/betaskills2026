import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 5,
  title: 'Quiz: Developing Christ-Centered Lesson Plans',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of a Christian lesson plan?',
        options: [
          'To entertain students',
          'To help students learn religious history',
          'To teach Christian values and principles based on scripture',
          'To fill time during church services'
        ],
        correctAnswer: 2,
        explanation: 'The primary purpose of a Christian lesson plan is to teach Christian values and principles based on scripture, helping students understand and apply biblical truths to their lives.'
      },
      {
        id: 2,
        question: 'Which element is essential in a Christian lesson plan?',
        options: [
          'A discussion of popular secular events',
          'Clear biblical references or scripture',
          'A variety of game-based activities',
          'Focus solely on memorization of Bible verses'
        ],
        correctAnswer: 1,
        explanation: 'Clear biblical references or scripture are essential in a Christian lesson plan as they provide the foundation and authority for the teachings being presented.'
      },
      {
        id: 3,
        question: 'How should a Christian lesson plan address diverse learning styles?',
        options: [
          'By focusing only on auditory learning techniques',
          'By incorporating activities that appeal to different senses and learning types',
          'By strictly using lectures and sermons',
          'By avoiding group work and focusing on individual tasks'
        ],
        correctAnswer: 1,
        explanation: 'A Christian lesson plan should incorporate activities that appeal to different senses and learning types to ensure all students can engage with and understand the material effectively.'
      },
      {
        id: 4,
        question: 'What role does prayer play in a Christian lesson plan?',
        options: [
          'It is optional and based on teacher preference',
          'It serves as a brief opening activity but is not essential',
          'It should be woven throughout the lesson to invite spiritual reflection',
          'It should only occur at the end of the lesson'
        ],
        correctAnswer: 2,
        explanation: 'Prayer should be woven throughout the lesson to invite spiritual reflection, helping students connect with God and internalize the biblical truths being taught.'
      },
      {
        id: 5,
        question: 'Which of the following is important when crafting the introduction of a Christian lesson?',
        options: [
          'To entertain students with funny jokes',
          'To establish a connection to the biblical passage and its relevance',
          'To focus primarily on historical church events',
          'To avoid any theological content'
        ],
        correctAnswer: 1,
        explanation: 'It is important to establish a connection to the biblical passage and its relevance when crafting the introduction, helping students understand why the lesson matters to their lives.'
      },
      {
        id: 6,
        question: 'When selecting Bible verses for a Christian lesson plan, which should be prioritized?',
        options: [
          'Verses that are simple and straightforward',
          'Verses that are complex and hard to understand',
          'Verses that reinforce the lesson\'s theme or objective',
          'Verses that are the longest'
        ],
        correctAnswer: 2,
        explanation: 'Verses that reinforce the lesson\'s theme or objective should be prioritized, as they directly support the learning goals and help students understand the biblical principles being taught.'
      },
      {
        id: 7,
        question: 'How can you integrate faith into science or history?',
        options: [
          'Faith supports scientific discovery by providing empirical data',
          'Faith contradicts the principles of the scientific method, which relies on evidence and experimentation',
          'Faith and science are two distinct fields that rarely intersect',
          'Faith can provide a guiding framework for the ethical use of scientific knowledge'
        ],
        correctAnswer: 3,
        explanation: 'Faith can provide a guiding framework for the ethical use of scientific knowledge, helping students understand how their beliefs inform their approach to learning and discovery.'
      },
      {
        id: 8,
        question: 'In the history of science, how did the Church\'s beliefs shape the development of early scientific thought?',
        options: [
          'The Church discouraged scientific inquiry entirely',
          'The Church funded many scientific discoveries and preserved ancient knowledge',
          'The Church promoted scientific progress exclusively in the fields of physics and chemistry',
          'The Church rejected the scientific method in favor of spiritual teachings'
        ],
        correctAnswer: 1,
        explanation: 'The Church funded many scientific discoveries and preserved ancient knowledge, playing a significant role in the development of early scientific thought and education.'
      },
      {
        id: 9,
        question: 'Which of the following is an example of a scientist who integrated faith into their work?',
        options: [
          'Isaac Newton, who believed that God created a rational and orderly universe',
          'Albert Einstein, who rejected the concept of any deity',
          'Charles Darwin, who was openly critical of religious beliefs',
          'Galileo Galilei, who condemned the Church\'s view of the universe'
        ],
        correctAnswer: 0,
        explanation: 'Isaac Newton is an example of a scientist who integrated faith into their work, believing that God created a rational and orderly universe that could be understood through scientific inquiry.'
      },
      {
        id: 10,
        question: 'How can religious beliefs influence the interpretation of historical events?',
        options: [
          'Religious beliefs provide an objective and neutral perspective on history',
          'Religious beliefs can shape the values and decisions of historians, leading to different interpretations of events',
          'Religious beliefs have no impact on the study of history',
          'Religious beliefs distort historical facts, making them unreliable'
        ],
        correctAnswer: 1,
        explanation: 'Religious beliefs can shape the values and decisions of historians, leading to different interpretations of events, as they provide a framework for understanding the moral and spiritual dimensions of historical developments.'
      }
    ]
  }
};
