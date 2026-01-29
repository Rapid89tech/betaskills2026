import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Network Security Best Practices',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/l2jzCrhKGlQ',
    textContent: `
# Network Security Best Practices

Network security best practices are essential for protecting the confidentiality, integrity, and availability of data and resources transmitted across computer networks. These practices mitigate risks from threats like malware, phishing, and Distributed Denial-of-Service (DDoS) attacks, which contribute to global cybercrime costs projected at $10.5 trillion annually by 2025 (per Cybersecurity Ventures). By implementing robust security measures, organizations and individuals can reduce vulnerabilities, ensure compliance with regulations like GDPR and PCI-DSS, and maintain operational continuity.

## Use strong passwords and multi-factor authentication (MFA)

Strong passwords—complex, unique, and at least 12 characters long—reduce the risk of credential theft. MFA adds additional verification layers (e.g., a password plus a texted code or biometric scan), preventing 74% of credential-based attacks in 2024 (per Microsoft). For example, a 2023 phishing campaign targeting a financial institution was thwarted by MFA, blocking unauthorized access despite stolen passwords. 

**Mitigation:** Enforce password policies via tools like Microsoft Entra ID, implement MFA across all systems, and use password managers to generate and store complex credentials.

## Enable encryption on all sensitive communication

Encryption ensures data in transit remains unreadable to unauthorized parties, using protocols like TLS for web traffic or IPsec for VPNs. For instance, in 2024, TLS encryption protected customer data during an attempted Man-in-the-Middle (MitM) attack on an e-commerce platform. 

**Mitigation:** Use end-to-end encryption, adopt AES-256 for sensitive data, and ensure all communication channels (e.g., email, VoIP) are encrypted.

## Patch and update all networked devices regularly

Regular patching addresses software vulnerabilities exploited by attackers, such as the 2021 Microsoft Exchange Server zero-day exploits. Unpatched systems contributed to 30% of breaches in 2024 (per Verizon's DBIR). 

**Mitigation:** Automate patch management with tools like WSUS or Qualys, maintain an inventory of devices, and prioritize critical updates to prevent exploits like EternalBlue.

## Segment networks (e.g., guest Wi-Fi vs internal network)

Network segmentation isolates critical systems from less secure ones, limiting lateral movement during attacks. For example, a 2023 ransomware attack was contained by segmenting a hospital's patient data network from its guest Wi-Fi. 

**Mitigation:** Use VLANs or software-defined networking (SDN) to create segments, enforce access controls, and monitor inter-segment traffic.

## Use secure network protocols (SSH, HTTPS, SFTP)

Secure protocols like SSH (for remote access), HTTPS (for web browsing), and SFTP (for file transfers) encrypt data to prevent interception. In 2019, HTTPS adoption mitigated data leaks during a sniffing attack on a corporate network. 

**Mitigation:** Disable insecure protocols (e.g., Telnet, FTP), enforce HTTPS via HSTS, and use secure configurations for SSH/SFTP.

## Monitor traffic with SIEM tools

Security Information and Event Management (SIEM) tools, like Splunk or IBM QRadar, aggregate and analyze network logs to detect threats in real time. In 2024, QRadar identified a brute-force attack on a government network, enabling rapid response. 

**Mitigation:** Integrate SIEM with threat intelligence feeds, configure automated alerts, and combine with SOAR for automated incident response.
`
  }
};

export default lesson;

