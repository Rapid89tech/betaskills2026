import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'What is Endpoint Security?',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/83pCkSSj1IQ',
    textContent: `
# What is Endpoint Security?

Endpoint security focuses on protecting individual devices, known as endpoints, that connect to enterprise networks, ensuring they are not exploited as entry points for cyber threats. These devices, which include laptops, smartphones, tablets, desktops, and servers, serve as gateways to sensitive data and systems, making them prime targets for attackers. Endpoint security employs a combination of technologies, policies, and processes to safeguard these devices from threats like malware, ransomware, phishing, and unauthorized access. As endpoints are often the first point of contact for cyberattacks, robust endpoint security is critical for maintaining the confidentiality, integrity, and availability of data and networks in an increasingly connected world.

* Laptops: Portable devices used for work and personal tasks, vulnerable to theft, malware, or phishing attacks, especially on unsecured networks like public Wi-Fi.

* Smartphones: Mobile devices storing sensitive data (e.g., emails, banking apps), targeted by spyware or phishing via text messages (smishing). For example, a 2023 attack exploited unpatched smartphones to steal credentials.

* Tablets: Used in hybrid work environments, tablets face risks similar to laptops and smartphones, such as unencrypted data exposure.

* Desktops: Stationary workstations in offices or homes, often targeted by ransomware or remote desktop protocol (RDP) exploits, as seen in the 2021 Kaseya attack.

* Servers: Host critical applications and data, making them high-value targets for attacks like DDoS or Advanced Persistent Threats (APTs). The 2020 SolarWinds breach compromised servers to infiltrate networks.

Functionality: Endpoint security includes antivirus software, endpoint detection and response (EDR), disk encryption, patch management, and remote wipe capabilities. For instance, EDR tools like CrowdStrike Falcon detect and isolate threats on compromised devices in real time. Endpoint security also enforces policies, such as requiring updated software or blocking unauthorized USB devices, to reduce vulnerabilities.

Examples: In 2024, an EDR solution prevented a ransomware attack from spreading across a corporate network by isolating an infected laptop. Remote wipe capabilities protected sensitive data on a stolen executive's smartphone during a 2023 incident.

Impact: Endpoint security mitigates risks from the 30% of breaches involving compromised endpoints (per Verizon's 2024 DBIR), ensuring network integrity and compliance with regulations like GDPR and HIPAA.
`
  }
};

export default lesson;

