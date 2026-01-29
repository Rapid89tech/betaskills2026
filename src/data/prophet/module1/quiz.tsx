const quiz = {
  id: 6,
  title: 'Module 1 Quiz: The Office of the Prophet',
  duration: '15 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What distinguishes the prophetic office from prophetic gifting?',
        options: [
          'It\'s louder',
          'It\'s more emotional',
          'It involves ongoing equipping and leadership',
          'It\'s available to everyone'
        ],
        correct: 2,
        explanation: 'The prophetic office involves ongoing equipping and leadership, unlike prophetic gifting which is available to all Spirit-filled believers and is often situational.'
      },
      {
        question: 'Which scripture outlines the fivefold ministry?',
        options: [
          'Romans 8',
          'Genesis 1',
          'Ephesians 4:11–13',
          'Revelation 3'
        ],
        correct: 2,
        explanation: 'Ephesians 4:11–13 outlines the fivefold ministry: "And He gave some to be apostles, some prophets, some evangelists, and some pastors and teachers..."'
      },
      {
        question: 'Who foretold a famine in the New Testament?',
        options: [
          'Elijah',
          'Agabus',
          'Moses',
          'Isaiah'
        ],
        correct: 1,
        explanation: 'Agabus, a New Testament prophet, foretold a famine (Acts 11:27–28) and also predicted Paul\'s imprisonment (Acts 21:10–11).'
      },
      {
        question: 'Which of the following is NOT a purpose of prophetic office?',
        options: [
          'Entertainment',
          'Strategic revelation',
          'Equipping the saints',
          'Spiritual alignment'
        ],
        correct: 0,
        explanation: 'Entertainment is not a purpose of the prophetic office. The true purposes include strategic revelation, equipping the saints, and spiritual alignment with God\'s will.'
      },
      {
        question: 'What is one function of a modern-day prophet?',
        options: [
          'Write hymns',
          'Provide fashion advice',
          'Issue correction in love',
          'Perform miracles on demand'
        ],
        correct: 2,
        explanation: 'Modern-day prophets issue correction in love and truth, aiming to restore rather than condemn, as Paul advised in Ephesians 4:15.'
      },
      {
        question: 'Elijah\'s ministry included:',
        options: [
          'Writing Psalms',
          'Governmental confrontation',
          'Temple building',
          'Political campaigning'
        ],
        correct: 1,
        explanation: 'Elijah\'s ministry included governmental confrontation, particularly with King Ahab and Queen Jezebel, challenging idolatry at a national level (1 Kings 18).'
      },
      {
        question: 'Who was called to be a prophet from the womb?',
        options: [
          'Paul',
          'Peter',
          'Jeremiah',
          'John the Baptist'
        ],
        correct: 2,
        explanation: 'Jeremiah was called to be a prophet from the womb (Jeremiah 1:4–10): "Before I formed you in the womb I knew you, before you were born I set you apart; I appointed you as a prophet to the nations."'
      },
      {
        question: 'Prophets help align the church with:',
        options: [
          'Political parties',
          'Personal opinions',
          'Heaven\'s agenda',
          'Traditional customs'
        ],
        correct: 2,
        explanation: 'Prophets help align the church with heaven\'s agenda, ensuring its actions and priorities reflect God\'s divine will and purposes.'
      },
      {
        question: 'What should accompany the prophetic office?',
        options: [
          'Flashy branding',
          'Humor and sarcasm',
          'Maturity and accountability',
          'Superstition'
        ],
        correct: 2,
        explanation: 'The prophetic office should be accompanied by maturity and accountability to ensure reliability, alignment with scripture, and protection against deception.'
      },
      {
        question: 'The function of the fivefold ministry is to:',
        options: [
          'Entertain the congregation',
          'Replace the Bible',
          'Equip the saints and build the body',
          'Compete with one another'
        ],
        correct: 2,
        explanation: 'The function of the fivefold ministry is to equip the saints for ministry, build up the body of Christ, and bring unity and maturity in faith (Ephesians 4:12–13).'
      }
    ],
    passingScore: 70
  }
};

export default quiz;
