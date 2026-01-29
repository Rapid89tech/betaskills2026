const quiz = {
  id: 1,
  title: 'Module 4 Quiz: Network Security Fundamentals',
  duration: '30 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is the main purpose of network security?',
        options: [
          'Improve internet speed',
          'Design user interfaces',
          'Protect data and resources in a network',
          'Format hard drives'
        ],
        correct: 2,
        explanation: 'Network security protects the integrity, confidentiality, and availability of data and resources transmitted across networks.'
      },
      {
        question: 'Which device acts as a gatekeeper to filter network traffic?',
        options: [
          'Printer',
          'Router',
          'Firewall',
          'Switch'
        ],
        correct: 2,
        explanation: 'Firewalls act as gatekeepers, filtering incoming and outgoing network traffic based on predefined security rules.'
      },
      {
        question: 'What does a VPN do?',
        options: [
          'Compresses video files',
          'Encrypts data over a network',
          'Deletes malware',
          'Hosts websites'
        ],
        correct: 1,
        explanation: 'VPNs create secure, encrypted tunnels for data transmission over public or insecure networks.'
      },
      {
        question: 'Which protocol is commonly used for secure VPNs?',
        options: [
          'FTP',
          'IPsec',
          'HTTP',
          'Telnet'
        ],
        correct: 1,
        explanation: 'IPSec provides robust encryption and authentication, widely used in enterprise VPNs.'
      },
      {
        question: 'What is DNS poisoning?',
        options: [
          'A form of email spam',
          'Redirecting users to fake websites',
          'Encrypting DNS records',
          'Deleting DNS zones'
        ],
        correct: 1,
        explanation: 'DNS poisoning corrupts DNS cache or servers to redirect users to malicious websites.'
      },
      {
        question: 'What is the main difference between IDS and IPS?',
        options: [
          'IDS blocks threats, IPS only detects',
          'IDS monitors, IPS blocks',
          'IPS is outdated',
          'IDS is used for emails only'
        ],
        correct: 1,
        explanation: 'IDS monitors and generates alerts, while IPS actively blocks or mitigates threats in real time.'
      },
      {
        question: 'Which of the following is NOT a network threat?',
        options: [
          'Spoofing',
          'Phishing',
          'Sniffing',
          'DDoS'
        ],
        correct: 1,
        explanation: 'Phishing is primarily an email-based attack, not a network infrastructure threat like spoofing, sniffing, or DDoS.'
      },
      {
        question: 'Which principle means giving users only the access they need?',
        options: [
          'Zero Trust',
          'Least Privilege',
          'Full Access',
          'Public Key'
        ],
        correct: 1,
        explanation: 'Least Privilege grants users, devices, or applications only the access necessary for their roles.'
      },
      {
        question: 'A rogue access point refers to:',
        options: [
          'An outdated server',
          'A duplicate router',
          'An unauthorized Wi-Fi connection',
          'A slow-loading page'
        ],
        correct: 2,
        explanation: 'Rogue access points are unauthorized wireless access points that trick users into connecting.'
      },
      {
        question: 'Which tool helps monitor traffic and analyze threats?',
        options: [
          'WordPress',
          'SIEM',
          'HTML',
          'Photoshop'
        ],
        correct: 1,
        explanation: 'SIEM (Security Information and Event Management) tools aggregate and analyze network logs to detect threats.'
      }
    ]
  }
};

export default quiz;

