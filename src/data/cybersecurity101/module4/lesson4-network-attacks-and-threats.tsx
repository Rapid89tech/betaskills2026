import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'Network Attacks and Threats',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_3qo9FFDshs',
    textContent: `
# Network Attacks and Threats

Network attacks exploit vulnerabilities in network infrastructure to intercept, manipulate, or disrupt communications, posing significant risks to data and service availability. Below is a detailed overview of common network threats, their mechanisms, impacts, and mitigation strategies.

| Threat | Description |
|--------|-------------|
| Sniffing | Intercepting unencrypted data on the network to steal sensitive information, such as passwords or financial details. |
| Spoofing | Impersonating a trusted source (e.g., IP, ARP) to deceive systems or users into granting access or revealing data. |
| Man-in-the-Middle (MitM) | Attacker intercepts and potentially alters communication between two parties, often on unsecured networks. |
| DDoS Attacks | Flooding network services with traffic to cause denial of service, disrupting availability. |
| Rogue Access Points | Unauthorized wireless access points that trick users into connecting, enabling data theft or network access. |
| DNS Poisoning | Redirects traffic to malicious websites by corrupting DNS resolution, compromising user trust and data. |

## Detailed Threat Analysis

### Sniffing

* Mechanism: Attackers use tools like Wireshark to capture unencrypted data packets on networks, often on public Wi-Fi, to steal credentials or sensitive information.

* Example: In 2023, attackers sniffed unencrypted login credentials on a coffee shop Wi-Fi, compromising user accounts.

* Impact: Leads to data breaches and identity theft, undermining confidentiality.

* Mitigation: Use encrypted protocols (e.g., HTTPS, TLS), deploy VPNs, and monitor network traffic for sniffing tools.

### Spoofing

* Mechanism: Attackers forge IP addresses, ARP tables, or email headers to impersonate trusted sources, tricking systems or users into granting access. For example, ARP spoofing redirects traffic to a malicious device.

* Example: The 2016 DNC hack used email spoofing to deliver phishing emails, leading to data leaks.

* Impact: Enables unauthorized access, data theft, or malware delivery.

* Mitigation: Implement anti-spoofing measures (e.g., IP source verification), use secure email gateways, and enable DMARC for email authentication.

### Man-in-the-Middle (MitM)

* Mechanism: Attackers position themselves between communicating parties, intercepting or altering data, often on unsecured networks. Techniques include session hijacking or SSL stripping.

* Example: The 2014 Heartbleed vulnerability enabled MitM attacks by exposing SSL/TLS keys, compromising secure connections.

* Impact: Compromises data confidentiality and integrity, leading to fraud or data theft.

* Mitigation: Use end-to-end encryption, certificate pinning, and VPNs. Avoid unsecured Wi-Fi networks.

### DDoS Attacks

* Mechanism: Floods servers or networks with excessive traffic, often via botnets, to overwhelm resources and disrupt services. DDoS attacks can target specific applications or infrastructure.

* Example: The 2016 Dyn attack, powered by the Mirai botnet, disrupted major websites like Twitter and Netflix.

* Impact: Causes downtime, financial losses, and reputational damage, with 15% of organizations affected in 2024 (per Cloudflare).

* Mitigation: Deploy DDoS protection services (e.g., Cloudflare, AWS Shield), use rate limiting, and maintain redundant infrastructure.

### Rogue Access Points

* Mechanism: Attackers set up unauthorized Wi-Fi access points to lure users, enabling data theft or network infiltration. Often used in public spaces like airports.

* Example: In 2023, a rogue access point at a conference tricked attendees into connecting, exposing login credentials.

* Impact: Compromises data and network security, enabling further attacks like MitM.

* Mitigation: Use NAC to restrict unauthorized devices, educate users on verifying Wi-Fi networks, and monitor for rogue APs.

### DNS Poisoning

* Mechanism: Attackers corrupt DNS cache or servers to redirect users to malicious websites, often for phishing or malware delivery.

* Example: In 2019, DNS poisoning redirected users to fake banking sites, stealing credentials.

* Impact: Undermines user trust, enables data theft, and supports phishing campaigns.

* Mitigation: Implement DNSSEC (DNS Security Extensions), use secure DNS resolvers (e.g., Cloudflare 1.1.1.1), and monitor DNS traffic.
`
  }
};

export default lesson;

