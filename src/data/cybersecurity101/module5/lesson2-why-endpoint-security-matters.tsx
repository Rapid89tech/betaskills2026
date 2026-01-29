import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'Why Endpoint Security Matters',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/83pCkSSj1IQ',
    textContent: `
# Why Endpoint Security Matters

Endpoint security is a critical component of cybersecurity due to the pivotal role endpoints play in network access and the increasing sophistication of cyber threats. As organizations adopt remote work, Bring Your Own Device (BYOD) policies, and cloud-based systems, endpoints have become more vulnerable, necessitating robust protection to prevent breaches and ensure operational continuity.

* Endpoints are often the weakest link in a security chain: Endpoints are frequent entry points for attackers due to their accessibility and user interaction. Human errors, such as clicking phishing links or neglecting updates, make devices vulnerable. For example, the 2017 WannaCry ransomware attack exploited unpatched Windows endpoints, infecting 200,000 devices globally.

* Remote work and BYOD increase exposure: The shift to remote work, with 40% of employees working remotely in 2024 (per Gartner), and BYOD policies expand the attack surface. Personal devices often lack enterprise-grade security, increasing risks of compromise. A 2023 BYOD-related breach exposed corporate data when an employee's unsecured smartphone was hacked.

* Threat actors target endpoints to gain unauthorized access to networks: Attackers use endpoints as gateways to infiltrate broader networks, deploying malware, stealing credentials, or escalating privileges. The 2019 Capital One breach began with a compromised server endpoint, exposing 100 million customer records.

Impact: Endpoint vulnerabilities contribute to significant financial losses, with cybercrime costing $10.5 trillion annually by 2025 (per Cybersecurity Ventures). Breaches via endpoints can lead to data theft, ransomware payouts ($1.1 billion in 2023, per Chainalysis), reputational damage, and regulatory fines.

## Mitigation Strategies

* Deploy EDR solutions to monitor and respond to threats in real time.

* Enforce device encryption and MFA to secure access, reducing 74% of credential-based attacks (per Microsoft).

* Implement patch management to address vulnerabilities promptly, as unpatched systems were a factor in 30% of breaches (per Verizon's 2024 DBIR).

* Use Mobile Device Management (MDM) tools, like Microsoft Intune, to enforce security policies on BYOD and remote devices.

* Conduct regular security awareness training to reduce human errors, a factor in 68% of breaches (per Verizon's 2024 DBIR).
`
  }
};

export default lesson;

