const quiz = {
  id: 1,
  title: 'Module 2 Quiz: Types of Cyber Threats',
  duration: '30 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What does malware stand for?',
        options: [
          'Multiple software',
          'Malfunctioning hardware',
          'Malicious software',
          'Manual software'
        ],
        correct: 2,
        explanation: 'Malware stands for malicious software, which is any program designed to cause harm to systems, networks, or data.'
      },
      {
        question: 'Which of these is a type of malware that locks data and demands payment?',
        options: [
          'Worm',
          'Trojan',
          'Ransomware',
          'Spyware'
        ],
        correct: 2,
        explanation: 'Ransomware encrypts files or systems and demands payment for decryption.'
      },
      {
        question: 'What is a phishing attack?',
        options: [
          'Virus spreading via USB',
          'Attacking a website DNS',
          'Tricking users into revealing personal data',
          'Overloading a server'
        ],
        correct: 2,
        explanation: 'Phishing involves fraudulent attempts to obtain sensitive information by masquerading as trustworthy entities.'
      },
      {
        question: 'Which attack uses multiple systems to flood a server?',
        options: [
          'SQL injection',
          'MITM',
          'Brute force',
          'DDoS'
        ],
        correct: 3,
        explanation: 'DDoS (Distributed Denial-of-Service) attacks use multiple compromised devices to flood a server with traffic.'
      },
      {
        question: 'A zero-day exploit targets a vulnerability that is:',
        options: [
          'Fully patched',
          'Known and fixed',
          'Unknown to the software provider',
          'Detected by antivirus'
        ],
        correct: 2,
        explanation: 'Zero-day exploits target unknown vulnerabilities before developers can issue patches.'
      },
      {
        question: 'Which attack manipulates database queries?',
        options: [
          'Keylogger',
          'Buffer overflow',
          'SQL injection',
          'Packet sniffing'
        ],
        correct: 2,
        explanation: 'SQL injection involves inserting malicious SQL queries into input fields to manipulate databases.'
      },
      {
        question: 'Which is a social engineering technique?',
        options: [
          'Port scanning',
          'Spear phishing',
          'DDoS',
          'Firewall bypass'
        ],
        correct: 1,
        explanation: 'Spear phishing is a social engineering technique that uses highly targeted attacks with personalized information.'
      },
      {
        question: 'Which attack occurs during data transmission between two parties?',
        options: [
          'Man-in-the-Middle',
          'SQL Injection',
          'Ransomware',
          'Keylogging'
        ],
        correct: 0,
        explanation: 'Man-in-the-Middle (MitM) attacks intercept and potentially alter communications between two parties.'
      },
      {
        question: 'What is credential stuffing?',
        options: [
          'Encrypting passwords',
          'Trying many stolen usernames/passwords',
          'Sending fake updates',
          'Guessing file types'
        ],
        correct: 1,
        explanation: 'Credential stuffing uses stolen username-password pairs from one breach to access other systems.'
      },
      {
        question: 'Which threat comes from within an organization?',
        options: [
          'Botnet',
          'Insider Threat',
          'IoT Malware',
          'Cloud Attack'
        ],
        correct: 1,
        explanation: 'Insider threats arise from employees, contractors, or trusted individuals who compromise security.'
      }
    ]
  }
};

export default quiz;

