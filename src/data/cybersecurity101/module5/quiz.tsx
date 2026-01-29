const quiz = {
  id: 1,
  title: 'Module 5 Quiz: Operating System and Endpoint Security',
  duration: '30 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is the primary goal of endpoint security?',
        options: [
          'To manage websites',
          'To protect individual devices from threats',
          'To design user interfaces',
          'To block advertisements'
        ],
        correct: 1,
        explanation: 'Endpoint security focuses on protecting individual devices (endpoints) that connect to enterprise networks from cyber threats.'
      },
      {
        question: 'Which of the following is an example of endpoint protection?',
        options: [
          'Cloudflare',
          'Antivirus software',
          'SIEM',
          'VPN'
        ],
        correct: 1,
        explanation: 'Antivirus software is a key endpoint protection solution that detects, removes, and quarantines malicious code on devices.'
      },
      {
        question: 'What does EDR stand for?',
        options: [
          'Endpoint Data Retrieval',
          'Endpoint Detection and Response',
          'Electronic Device Reporting',
          'External Device Recorder'
        ],
        correct: 1,
        explanation: 'EDR stands for Endpoint Detection and Response, which continuously monitors endpoints for suspicious activity and provides real-time threat detection.'
      },
      {
        question: 'Which tool is used to apply OS updates automatically?',
        options: [
          'Firewall',
          'Wireshark',
          'Patch Management',
          'Rootkit'
        ],
        correct: 2,
        explanation: 'Patch management tools automate the process of identifying, deploying, and verifying software updates to address vulnerabilities.'
      },
      {
        question: 'BitLocker is an example of what?',
        options: [
          'Anti-phishing tool',
          'Disk encryption',
          'Firewall rule',
          'Web scanner'
        ],
        correct: 1,
        explanation: 'BitLocker is Windows full-disk encryption feature that protects data at rest from unauthorized access.'
      },
      {
        question: 'Which threat captures keyboard activity to steal data?',
        options: [
          'Ransomware',
          'Trojan',
          'Keylogger',
          'Worm'
        ],
        correct: 2,
        explanation: 'Keyloggers record keystrokes to steal credentials and sensitive information typed by users.'
      },
      {
        question: 'UAC is a feature of which operating system?',
        options: [
          'Linux',
          'macOS',
          'Android',
          'Windows'
        ],
        correct: 3,
        explanation: 'User Account Control (UAC) is a Windows security feature that prompts users for permission before allowing applications to make significant system changes.'
      },
      {
        question: 'What is the purpose of Mobile Device Management (MDM)?',
        options: [
          'To create websites',
          'To monitor desktops',
          'To manage and secure mobile devices',
          'To delete malware'
        ],
        correct: 2,
        explanation: 'MDM solutions manage and secure smartphones, tablets, and other mobile devices, enforcing policies to protect data and ensure compliance.'
      },
      {
        question: 'What is a rootkit designed to do?',
        options: [
          'Encrypt a file',
          'Perform backups',
          'Hide malicious activity and gain admin access',
          'Generate reports'
        ],
        correct: 2,
        explanation: 'Rootkits provide hidden admin access and are designed to hide malicious activity from detection.'
      },
      {
        question: 'Which practice helps reduce endpoint vulnerabilities?',
        options: [
          'Disabling all security features',
          'Regularly updating software and operating systems',
          'Sharing passwords',
          'Using default settings'
        ],
        correct: 1,
        explanation: 'Regularly updating software and operating systems addresses vulnerabilities and reduces the risk of exploitation.'
      }
    ]
  }
};

export default quiz;

