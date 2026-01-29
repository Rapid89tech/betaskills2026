const quiz = {
  id: 1,
  title: 'Module 3 Quiz: Cybersecurity Technologies and Tools',
  duration: '30 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is the main function of a firewall?',
        options: [
          'Encrypt files',
          'Block viruses',
          'Filter network traffic',
          'Update software'
        ],
        correct: 2,
        explanation: 'Firewalls filter network traffic based on predefined security rules to prevent unauthorized access.'
      },
      {
        question: 'What does IPS do differently from IDS?',
        options: [
          'It scans only external devices',
          'It prevents threats in real-time',
          'It creates backups',
          'It monitors Wi-Fi only'
        ],
        correct: 1,
        explanation: 'IPS (Intrusion Prevention System) actively blocks or mitigates threats in real time, while IDS only monitors and alerts.'
      },
      {
        question: 'Which tool is used to analyze network packets?',
        options: [
          'Nmap',
          'Metasploit',
          'Wireshark',
          'Burp Suite'
        ],
        correct: 2,
        explanation: 'Wireshark is a network protocol analyzer used for packet inspection and network traffic analysis.'
      },
      {
        question: 'Which encryption method is widely used for securing websites?',
        options: [
          'AES',
          'TLS',
          'XOR',
          'DES'
        ],
        correct: 1,
        explanation: 'TLS (Transport Layer Security) is widely used to secure data in transit, such as during online banking or website visits.'
      },
      {
        question: 'What does endpoint security protect?',
        options: [
          'Databases only',
          'Routers',
          'Individual user devices',
          'Firewalls'
        ],
        correct: 2,
        explanation: 'Endpoint security protects individual devices like laptops, smartphones, desktops, and IoT devices from threats.'
      },
      {
        question: 'What is Nmap mainly used for?',
        options: [
          'Website design',
          'Port scanning and network mapping',
          'Antivirus removal',
          'Password encryption'
        ],
        correct: 1,
        explanation: 'Nmap is a network scanner used to detect open ports and services on network devices.'
      },
      {
        question: 'Which of these is a penetration testing framework?',
        options: [
          'Snort',
          'Kali Linux',
          'Fail2Ban',
          'Metasploit'
        ],
        correct: 3,
        explanation: 'Metasploit is a penetration testing framework used for security testing and vulnerability assessment.'
      },
      {
        question: 'What does IAM stand for?',
        options: [
          'Internet Access Monitoring',
          'Identity and Access Management',
          'Internal Admin Management',
          'Integrated Antivirus Mode'
        ],
        correct: 1,
        explanation: 'IAM stands for Identity and Access Management, which controls user access to systems, networks, and data.'
      },
      {
        question: 'What does a SIEM system do?',
        options: [
          'Blocks spam emails',
          'Monitors physical security',
          'Analyzes security logs for threats',
          'Provides antivirus scanning'
        ],
        correct: 2,
        explanation: 'SIEM (Security Information and Event Management) systems aggregate and analyze log data to detect threats and support incident response.'
      },
      {
        question: 'Which tool helps prevent brute force login attempts?',
        options: [
          'Fail2Ban',
          'Nmap',
          'Wireshark',
          'Burp Suite'
        ],
        correct: 0,
        explanation: 'Fail2Ban bans IP addresses after failed login attempts, helping prevent brute force attacks.'
      }
    ]
  }
};

export default quiz;

