import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'Components of Network Security',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/7cQ8o_x8EuE',
    textContent: `
# Components of Network Security

| Component | Function |
|-----------|----------|
| Firewall | Blocks unauthorized access to or from a network by filtering traffic based on security rules. |
| Antivirus/Antimalware | Scans for and removes malicious software, such as viruses, worms, or ransomware, from network-connected devices. |
| Intrusion Detection & Prevention Systems (IDS/IPS) | Monitors network traffic for suspicious activity and mitigates threats in real time. |
| Virtual Private Network (VPN) | Encrypts data across public or insecure networks to ensure secure remote access and data transmission. |
| Network Access Control (NAC) | Restricts network access based on device status, user profile, or compliance with security policies. |
| Proxy Servers | Act as intermediaries between users and external networks to enhance privacy, control traffic, and filter malicious content. |

## Detailed Explanation of Components

### Firewall

* Function: Firewalls act as a gatekeeper, filtering incoming and outgoing network traffic based on predefined security rules, such as IP addresses, ports, or protocols. They block unauthorized access while allowing legitimate traffic, protecting against threats like malware or hacking attempts.

* Types: Includes network firewalls (hardware/software, e.g., Cisco ASA) for perimeter defense and host-based firewalls (e.g., Windows Defender Firewall) for individual devices.

* Examples: In 2024, a next-generation firewall (NGFW) from Palo Alto Networks blocked a ransomware attack targeting a corporate network by filtering malicious traffic. Firewalls mitigated the 2016 Dyn DDoS attack by limiting unauthorized access to DNS servers.

* Impact: Firewalls reduce the attack surface, preventing breaches and ensuring network integrity.

* Mitigation and Trends: Use NGFWs with deep packet inspection and AI-driven threat detection, regularly update rules, and integrate with IDS/IPS for layered defense.

### Antivirus/Antimalware

* Function: Antivirus and antimalware software detect, remove, and quarantine malicious programs, such as viruses, worms, ransomware, or spyware, protecting network-connected devices from infection and data theft.

* Mechanisms: Performs real-time scanning of files and network traffic, using signature-based and behavior-based detection to identify threats. Solutions like CrowdStrike Falcon or Malwarebytes also support cloud-based updates.

* Examples: In 2023, antivirus software neutralized a ransomware variant targeting healthcare systems, preventing data encryption. During the 2017 WannaCry attack, updated antimalware tools blocked infections exploiting the EternalBlue vulnerability.

* Impact: Prevents data loss, system compromise, and financial extortion, reducing the $1.1 billion in ransomware payments reported in 2023 (per Chainalysis).

* Mitigation and Trends: Deploy next-generation antivirus (NGAV) with AI and behavioral analysis, ensure real-time updates, and combine with endpoint detection and response (EDR) for comprehensive protection.

### Intrusion Detection & Prevention Systems (IDS/IPS)

* Function: IDS monitors network traffic or system logs for suspicious activity, generating alerts, while IPS actively blocks or mitigates threats in real time, such as stopping a brute-force attack.

* Examples: Snort (IDS) detected unauthorized login attempts in a 2023 corporate breach, enabling rapid response. Suricata (IPS) blocked a zero-day exploit during the 2021 Microsoft Exchange Server attack, limiting malware spread.

* Impact: Reduces attack dwell time (204 days on average in 2024, per IBM), minimizing damage from intrusions like APTs or malware.

* Mitigation and Trends: Integrate IDS/IPS with Security Information and Event Management (SIEM) systems, use machine learning for anomaly detection, and update signatures to address emerging threats.

### Virtual Private Network (VPN)

* Function: VPNs encrypt data transmitted across public or insecure networks, ensuring secure remote access and protecting against interception. They create encrypted tunnels between users and networks.

* Examples: In 2024, a VPN protected remote employees' data on public Wi-Fi, preventing MitM attacks. NordVPN and Cisco AnyConnect secured corporate communications during a 2023 data breach attempt.

* Impact: Ensures confidentiality and integrity of data in transit, critical for remote work and compliance with regulations like GDPR.

* Mitigation and Trends: Use VPNs with strong encryption (e.g., AES-256), implement split tunneling for efficiency, and adopt zero trust network access (ZTNA) as an emerging alternative for secure access.

### Network Access Control (NAC)

* Function: NAC restricts network access based on device status (e.g., patch level, antivirus presence) or user profile, ensuring only compliant and authorized devices connect.

* Examples: Cisco ISE (NAC) blocked an unpatched device from accessing a corporate network in 2023, preventing malware spread. NAC enforced compliance for IoT devices in a 2024 smart office deployment.

* Impact: Reduces risks from compromised or non-compliant devices, a factor in 30% of breaches (per Verizon's 2024 DBIR).

* Mitigation and Trends: Use NAC with zero trust principles, integrate with IAM for role-based access, and support IoT device management for growing ecosystems.

### Proxy Servers

* Function: Proxy servers act as intermediaries between users and external networks, enhancing privacy by masking IP addresses, controlling traffic, and filtering malicious content.

* Examples: In 2023, a proxy server blocked access to a phishing website, protecting corporate users. Squid proxy filtered malicious traffic during a 2024 DDoS attempt, maintaining service availability.

* Impact: Enhances privacy, prevents malware infections, and supports content filtering, reducing exposure to external threats.

* Mitigation and Trends: Use secure web gateways (e.g., Zscaler) for advanced proxy capabilities, integrate with WAFs, and leverage AI for real-time threat filtering.
`
  }
};

export default lesson;

