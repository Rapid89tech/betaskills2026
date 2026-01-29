import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 5,
  title: 'Quiz: Teaching Ethics and Christian Integrity',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does living what you teach mean in the context of Christian integrity?',
        options: [
          'Achieving perfection in all actions',
          'Aligning your actions with biblical values like love and humility',
          'Teaching only when you are flawless',
          'Focusing on academic knowledge over practical faith'
        ],
        correctAnswer: 1,
        explanation: 'Living what you teach, as modeled by Jesus (1 Corinthians 11:1), means ensuring your actions reflect biblical principles like love, humility, and service, not perfection.'
      },
      {
        id: 2,
        question: 'Which scripture emphasizes following Christ\'s example in living out faith?',
        options: [
          'John 14:6',
          '1 Corinthians 11:1',
          'Philippians 4:6–7',
          'James 1:5'
        ],
        correctAnswer: 1,
        explanation: 'Paul\'s call to "Follow my example, as I follow the example of Christ" (1 Corinthians 11:1) underscores the importance of living out faith authentically, as Jesus did.'
      },
      {
        id: 3,
        question: 'How did Jesus demonstrate compassion in His ministry?',
        options: [
          'By focusing only on religious leaders',
          'By showing care for the marginalized and suffering',
          'By avoiding emotional engagement with others',
          'By prioritizing His own comfort'
        ],
        correctAnswer: 1,
        explanation: 'Jesus\' compassion is evident in Matthew 9:36, where He cared for the "harassed and helpless," acting to help the marginalized, reflecting Christian integrity.'
      },
      {
        id: 4,
        question: 'What is a key aspect of avoiding favoritism in Christian teaching?',
        options: [
          'Treating certain individuals with preference based on status',
          'Seeing all people as equal in God\'s image',
          'Ignoring marginalized groups to maintain harmony',
          'Focusing only on those who agree with you'
        ],
        correctAnswer: 1,
        explanation: 'James 2:1–4 warns against favoritism, urging Christians to treat everyone with equal respect, as Jesus did by reaching out to outcasts (John 4:1–42).'
      },
      {
        id: 5,
        question: 'How can burnout be avoided when teaching Christian ethics?',
        options: [
          'By serving without rest to meet all expectations',
          'By setting boundaries and prioritizing spiritual renewal',
          'By delegating all responsibilities to others',
          'By ignoring personal well-being for ministry'
        ],
        correctAnswer: 1,
        explanation: 'Galatians 6:9 and Jesus\' practice of withdrawing to pray (Luke 5:16) highlight the need for rest and spiritual renewal to avoid burnout in ministry.'
      },
      {
        id: 6,
        question: 'What does emotional compromise in Christian integrity involve?',
        options: [
          'Acting in alignment with God\'s will despite feelings',
          'Letting emotions override biblical values',
          'Suppressing all emotions to maintain control',
          'Ignoring moral responsibilities for comfort'
        ],
        correctAnswer: 1,
        explanation: 'Emotional compromise occurs when feelings lead to actions misaligned with God\'s will, unlike Jesus, who showed emotion but stayed focused (e.g., John 11:35).'
      },
      {
        id: 7,
        question: 'Which scripture guides balancing legal responsibilities in Christian ethics?',
        options: [
          'Romans 13:1–2',
          'Matthew 9:36',
          'Philippians 2:3–4',
          '2 Peter 3:9'
        ],
        correctAnswer: 0,
        explanation: 'Romans 13:1–2 calls Christians to obey governing authorities as part of God\'s order, unless laws conflict with His commands, guiding legal responsibilities.'
      },
      {
        id: 8,
        question: 'How does humility contribute to teaching Christian integrity?',
        options: [
          'By promoting self-interest over others\' needs',
          'By valuing others above oneself, as Jesus did',
          'By avoiding service to maintain authority',
          'By focusing only on personal achievements'
        ],
        correctAnswer: 1,
        explanation: 'Philippians 2:3–4 and Jesus\' foot-washing (John 13:12–17) show humility as valuing others, a key aspect of teaching integrity.'
      },
      {
        id: 9,
        question: 'What is a practical way to teach moral responsibilities in ministry?',
        options: [
          'Encouraging actions based solely on legal requirements',
          'Modeling love and justice in daily interactions',
          'Ignoring moral dilemmas to avoid conflict',
          'Focusing only on spiritual duties'
        ],
        correctAnswer: 1,
        explanation: 'Moral responsibilities, like loving others (Matthew 22:39) and acting justly (Micah 6:8), are taught by modeling these values, as Jesus did in His ministry.'
      },
      {
        id: 10,
        question: 'How can modern ministers use platforms like X to teach Christian ethics?',
        options: [
          'By sharing content focused on personal gain',
          'By posting authentic, biblically grounded messages',
          'By avoiding digital platforms to maintain tradition',
          'By rushing content without reflection'
        ],
        correctAnswer: 1,
        explanation: 'In 2025, ministers can use X to share honest, compassionate messages rooted in scripture, reflecting integrity and inspiring others, as Paul\'s epistles did.'
      }
    ]
  }
};
