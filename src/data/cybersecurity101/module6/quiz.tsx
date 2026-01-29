const quiz = {
  id: 1,
  title: 'Module 6 Quiz: Web Application Security',
  duration: '30 min',
  type: 'quiz' as const,
  content: {
    questions: [
      {
        question: 'What is the goal of web application security?',
        options: [
          'Improve design speed',
          'Reduce server load',
          'Prevent exploitation of web app vulnerabilities',
          'Boost advertising revenue'
        ],
        correct: 2,
        explanation: 'Web application security aims to protect websites, web applications, and APIs from cyberattacks that exploit vulnerabilities.'
      },
      {
        question: 'What does SQL Injection exploit?',
        options: [
          'User authentication',
          'Database queries',
          'Image rendering',
          'Network traffic'
        ],
        correct: 1,
        explanation: 'SQL Injection occurs when an attacker injects malicious SQL queries into input fields to manipulate a web application database.'
      },
      {
        question: 'Which of the following is used to prevent CSRF attacks?',
        options: [
          'Input validation',
          'CAPTCHA',
          'CSRF tokens',
          'JavaScript encryption'
        ],
        correct: 2,
        explanation: 'CSRF tokens (unique, per-session tokens in forms) are used to prevent Cross-Site Request Forgery attacks.'
      },
      {
        question: 'Which vulnerability involves injecting scripts into trusted websites?',
        options: [
          'XSS',
          'CSRF',
          'SQLi',
          'SSRF'
        ],
        correct: 0,
        explanation: 'Cross-Site Scripting (XSS) involves injecting malicious scripts into trusted websites, which execute in a user browser.'
      },
      {
        question: 'What does OWASP stand for?',
        options: [
          'Online Web App Security Program',
          'Open Web Application Security Project',
          'Operational Web Attack Simulation Protocol',
          'Organized Web Access Security Portal'
        ],
        correct: 1,
        explanation: 'OWASP stands for Open Web Application Security Project, which publishes the OWASP Top 10 list of critical web application security risks.'
      },
      {
        question: 'Which tool is known for web application vulnerability scanning?',
        options: [
          'Wireshark',
          'Nikto',
          'Splunk',
          'Nmap'
        ],
        correct: 1,
        explanation: 'Nikto is an open-source web server scanner that identifies known vulnerabilities, misconfigurations, and outdated software on web servers.'
      },
      {
        question: 'What is a broken authentication issue?',
        options: [
          'Password encryption is too strong',
          'Firewall blocks login attempts',
          'Poor session handling allows hijacking',
          'Email fails to send confirmation'
        ],
        correct: 2,
        explanation: 'Broken authentication vulnerabilities arise from flawed login or session management systems, allowing attackers to hijack sessions or bypass authentication.'
      },
      {
        question: 'How can developers mitigate XSS?',
        options: [
          'Encrypt file uploads',
          'Use password hashing',
          'Sanitize user input and escape output',
          'Block IP addresses'
        ],
        correct: 2,
        explanation: 'To mitigate XSS, developers should sanitize and validate all user inputs, escape outputs, and use Content Security Policy (CSP) headers.'
      },
      {
        question: 'In an IDOR vulnerability, attackers access:',
        options: [
          'DNS records',
          'Randomized URLs',
          'Unauthorized resources by manipulating identifiers',
          'Encrypted session tokens'
        ],
        correct: 2,
        explanation: 'Insecure Direct Object References (IDOR) allow attackers to access unauthorized data by manipulating URLs, IDs, or parameters.'
      },
      {
        question: 'Which protocol ensures encrypted communication over the web?',
        options: [
          'HTTP',
          'FTP',
          'TLS/HTTPS',
          'SSH'
        ],
        correct: 2,
        explanation: 'TLS/HTTPS ensures encrypted communication over the web, protecting data in transit from interception and tampering.'
      }
    ]
  }
};

export default quiz;

