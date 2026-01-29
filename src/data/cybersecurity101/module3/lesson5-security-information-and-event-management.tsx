import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Security Information and Event Management (SIEM)',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/IKzNfD8LpOA',
    textContent: `
# Security Information and Event Management (SIEM)

* Definition: Security Information and Event Management (SIEM) systems aggregate and analyze log data from various sources (e.g., servers, networks, applications) to detect threats, automate alerts, and support incident response. SIEM provides real-time visibility into security events, enabling organizations to identify and respond to threats quickly.

* Functionality: SIEM collects logs, correlates events, and uses analytics to identify suspicious activity, such as unauthorized logins or malware infections. It supports compliance by generating audit trails and automates incident response with predefined workflows. For example, SIEM can detect a brute-force attack by correlating multiple failed login attempts.

* Examples:
  * Splunk: A leading SIEM platform that uses machine learning to analyze logs and detect threats, widely used in enterprises for real-time monitoring.
  * IBM QRadar: Integrates with threat intelligence feeds to identify advanced persistent threats (APTs), as seen in its role in detecting the 2020 SolarWinds attack.
  * AlienVault (AT&T Cybersecurity): Offers unified security management for smaller organizations, combining SIEM with intrusion detection and vulnerability scanning.

* Real-World Application: In 2023, a financial institution used Splunk to detect a ransomware attack in its early stages, enabling rapid containment and preventing data encryption. QRadar's analytics helped identify a supply chain attack targeting a government agency in 2024.

* Impact: SIEM reduces attack dwell time (204 days on average in 2024, per IBM), improves incident response, and ensures compliance with regulations like PCI-DSS. It's critical for detecting sophisticated threats like APTs.

* Mitigation and Trends: Integrate SIEM with SOAR (Security Orchestration, Automation, and Response) for automated responses, use AI-driven analytics for faster threat detection, and maintain updated log sources. Trends include cloud-native SIEM (e.g., Splunk Cloud) and user and entity behavior analytics (UEBA) to detect insider threats.
`
  }
};

export default lesson;

