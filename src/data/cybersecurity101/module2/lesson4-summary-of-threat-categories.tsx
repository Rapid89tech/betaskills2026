import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'Summary of Threat Categories',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/6mQ1L6YX9pY',
    textContent: `
# Summary of Threat Categories

Cyber threats are diverse, targeting various aspects of digital systems, networks, and human behavior to exploit vulnerabilities for malicious purposes, such as data theft, financial gain, or disruption. Understanding these threat categories is essential for developing effective cybersecurity strategies. Below is a detailed summary of key threat categories, including examples, mechanisms, impacts, real-world cases, and mitigation approaches.

| Category | Examples |
|----------|----------|
| Malware | Viruses, worms, ransomware |
| Network Attacks | Man-in-the-Middle (MitM), Distributed Denial-of-Service (DDoS) |
| Social Attacks | Phishing, social engineering |
| Application Attacks | SQL injection, buffer overflow |
| Insider Threats | Employees, contractors |

## Detailed Overview of Threat Categories

### Malware

* Definition: Malware (malicious software) refers to programs designed to harm systems, networks, or data by disrupting operations, stealing information, or extorting victims.

* Examples:
  * Viruses: Attach to legitimate files and spread when executed, corrupting data or systems. The 1999 Melissa virus spread via email, causing $80 million in damages by overwhelming servers.
  * Worms: Self-replicating programs that spread across networks without user interaction. The 2003 Blaster worm infected millions of Windows systems, exploiting unpatched vulnerabilities.
  * Ransomware: Encrypts files or systems, demanding payment for decryption. The 2021 Colonial Pipeline attack disrupted U.S. fuel supplies, costing millions in ransom and recovery.

* Mechanisms: Malware is often delivered via email attachments, malicious downloads, or compromised websites, exploiting vulnerabilities in software or user behavior.

* Impact: Malware can cause data loss, financial theft, system downtime, and reputational damage. In 2024, ransomware payments reached $1.1 billion, per Chainalysis.

* Mitigation: Deploy antivirus software (e.g., CrowdStrike, Malwarebytes), keep systems updated, use endpoint detection and response (EDR) tools, and avoid suspicious downloads or links.

### Network Attacks

* Definition: Network attacks target the infrastructure connecting devices, aiming to intercept, manipulate, or disrupt communications and services.

* Examples:
  * Man-in-the-Middle (MitM): Attackers intercept communications between two parties, often on unsecured networks like public Wi-Fi, to steal data or alter messages. The 2014 Heartbleed vulnerability enabled MitM attacks by exposing SSL/TLS keys.
  * Distributed Denial-of-Service (DDoS): Overwhelms systems with traffic from multiple sources (e.g., botnets) to disrupt services. The 2016 Dyn DDoS attack, powered by the Mirai botnet, disrupted major websites like Twitter and Netflix.

* Mechanisms: MitM attacks exploit unencrypted connections or weak authentication, while DDoS attacks leverage compromised devices to flood servers with requests.

* Impact: Network attacks can lead to data breaches, service outages, financial losses, and eroded user trust, particularly for online services or critical infrastructure.

* Mitigation: Use encrypted protocols (e.g., HTTPS, TLS), implement DDoS protection services (e.g., Cloudflare), monitor network traffic for anomalies, and use VPNs on public networks.

### Social Attacks

* Definition: Social attacks exploit human psychology to trick users into revealing sensitive information or performing actions that compromise security, relying on deception rather than technical exploits.

* Examples:
  * Phishing: Fraudulent emails, texts, or websites impersonate trusted entities to steal credentials or financial details. The 2016 DNC hack used spear phishing to access sensitive emails.
  * Social Engineering: Includes tactics like impersonation, baiting, or pretexting. The 2020 Twitter Bitcoin scam used compromised employee accounts to promote fake cryptocurrency giveaways.

* Mechanisms: Attackers craft convincing messages or scenarios, often using personal information for targeted attacks (e.g., spear phishing), exploiting trust or urgency.

* Impact: Social attacks can lead to identity theft, financial fraud, or unauthorized access. Human error contributed to 68% of breaches in 2024, per Verizon's DBIR.

* Mitigation: Conduct security awareness training, implement email filters (e.g., DMARC), use MFA, and verify requests for sensitive actions through secondary channels.

### Application Attacks

* Definition: Application attacks exploit vulnerabilities in software or web applications to manipulate, steal, or corrupt data, often targeting poorly coded or unpatched systems.

* Examples:
  * SQL Injection: Inserts malicious SQL queries into input fields to manipulate databases. The 2014 eBay breach used SQL injection to access 145 million user records.
  * Buffer Overflow: Overloads a program's memory buffer to execute malicious code, often gaining unauthorized access. The 2003 Slammer worm exploited a buffer overflow in Microsoft SQL Server.

* Mechanisms: Attackers target unvalidated inputs, outdated software, or weak configurations to inject code or crash systems, bypassing security controls.

* Impact: Application attacks can result in data breaches, system compromise, or operational disruptions, compromising sensitive information or functionality.

* Mitigation: Use parameterized queries, input validation, web application firewalls (WAFs), and regular patching. Conduct penetration testing to identify vulnerabilities.

### Insider Threats

* Definition: Insider threats arise from employees, contractors, or trusted individuals who intentionally (maliciously) or accidentally compromise security through actions like data theft, sabotage, or negligence.

* Examples:
  * Employees: A disgruntled employee might leak sensitive data, as seen in the 2020 Tesla sabotage attempt where an insider tried to sell proprietary information.
  * Contractors: The 2017 Equifax breach was exacerbated by a contractor's failure to patch a known vulnerability, exposing 147 million records.

* Mechanisms: Malicious insiders exploit access privileges to steal or sabotage, while accidental insiders cause breaches through errors like misconfigurations or falling for phishing scams.

* Impact: Insider threats can lead to data breaches, financial losses, or reputational damage, often bypassing external defenses. Insiders were involved in 19% of breaches in 2024, per IBM.

* Mitigation: Implement role-based access controls, monitor user activity with behavior analytics, conduct background checks, and provide regular security training.
`
  }
};

export default lesson;

