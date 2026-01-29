const quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Cybersecurity',
  duration: '30 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What does cybersecurity aim to protect?',
        options: [
          'Only mobile devices',
          'Printed documents',
          'Systems, networks, and data',
          'Natural disasters'
        ],
        correct: 2,
        explanation: 'Cybersecurity aims to protect systems, networks, and data from digital attacks and unauthorized access.'
      },
      {
        question: 'What is a key difference between cybersecurity and information security?',
        options: [
          'Cybersecurity includes physical security',
          'Information security does not apply to digital systems',
          'Cybersecurity focuses on digital threats',
          'They are exactly the same'
        ],
        correct: 2,
        explanation: 'Cybersecurity focuses specifically on digital threats, while information security encompasses both digital and physical information protection.'
      },
      {
        question: 'Which of the following is NOT a goal of cybersecurity?',
        options: [
          'Confidentiality',
          'Speed of internet',
          'Availability',
          'Integrity'
        ],
        correct: 1,
        explanation: 'The CIA triad consists of Confidentiality, Integrity, and Availability. Speed of internet is not a cybersecurity goal.'
      },
      {
        question: 'Which decade saw the rise of financially motivated cybercrime?',
        options: [
          '1980s',
          '1990s',
          '2000s',
          '1960s'
        ],
        correct: 2,
        explanation: 'The 2000s saw the rise of financially motivated cybercrime as the internet became more commercialized.'
      },
      {
        question: 'What does APT stand for in cybersecurity?',
        options: [
          'Advanced Protected Transmission',
          'Anonymous Proxy Threat',
          'Advanced Persistent Threat',
          'Active Passive Tactic'
        ],
        correct: 2,
        explanation: 'APT stands for Advanced Persistent Threat, referring to sophisticated, long-term cyberattacks.'
      },
      {
        question: 'Which virus was one of the first major email-based attacks?',
        options: [
          'Blaster',
          'Melissa',
          'Conficker',
          'Slammer'
        ],
        correct: 1,
        explanation: 'The Melissa virus, which spread via email in 1999, was one of the first major email-based attacks.'
      },
      {
        question: 'Why is cybersecurity critical for businesses?',
        options: [
          'To increase internet speed',
          'To reduce printing costs',
          'To protect data, finances, and reputation',
          'To run advertisements'
        ],
        correct: 2,
        explanation: 'Cybersecurity is critical for businesses to protect their data, finances, and reputation from cyber threats.'
      },
      {
        question: 'Which law ensures data privacy in Europe?',
        options: [
          'HIPAA',
          'PCI-DSS',
          'GDPR',
          'ISO 9001'
        ],
        correct: 2,
        explanation: 'GDPR (General Data Protection Regulation) is the European Union data privacy law.'
      },
      {
        question: 'Which of these is considered a modern cybersecurity threat?',
        options: [
          'CD viruses',
          'Zero-day exploits',
          'Fax attacks',
          'Floppy disk corruption'
        ],
        correct: 1,
        explanation: 'Zero-day exploits are modern cybersecurity threats that target unknown vulnerabilities before patches are available.'
      },
      {
        question: 'What does the principle of "availability" ensure in cybersecurity?',
        options: [
          'Data is encrypted',
          'Systems are accessible when needed',
          'Backups are stored offsite',
          'Hackers are monitored'
        ],
        correct: 1,
        explanation: 'Availability ensures that systems, applications, and data are accessible to authorized users when needed.'
      }
    ]
  }
};

export default quiz;

