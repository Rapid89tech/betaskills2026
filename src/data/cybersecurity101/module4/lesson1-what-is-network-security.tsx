import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'What is Network Security?',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/l2jzCrhKGlQ',
    textContent: `
# What is Network Security?

Network security is the practice of protecting the integrity, confidentiality, and availability of data and resources as they are transmitted across or accessed through computer networks, such as local area networks (LANs), wide area networks (WANs), or the internet. It encompasses a range of technologies, processes, and policies designed to safeguard network infrastructure, devices, and data from cyber threats like malware, unauthorized access, and Distributed Denial-of-Service (DDoS) attacks. As networks underpin critical operations—such as online banking, remote work, and cloud services—network security is vital for ensuring operational continuity, protecting sensitive information, and maintaining trust in digital ecosystems. With global cybercrime costs projected to reach $10.5 trillion annually by 2025 (per Cybersecurity Ventures), network security plays a critical role in mitigating risks and ensuring compliance with regulations like GDPR and PCI-DSS.

Network security involves:

* Securing data in transit: Protecting data as it moves across networks using encryption protocols like Transport Layer Security (TLS) or IPsec to prevent interception or tampering, such as in man-in-the-middle (MitM) attacks.

* Preventing unauthorized access: Implementing access controls, authentication, and authorization to restrict network entry to legitimate users and devices, reducing risks from hackers or insider threats.

* Monitoring for intrusions: Using tools like intrusion detection systems to identify suspicious activity, such as unauthorized login attempts or malware propagation, enabling rapid response.

* Ensuring continuous service availability: Defending against disruptions like DDoS attacks through redundancy, load balancing, and mitigation tools to maintain network uptime for critical services.

Examples: In 2023, robust network security measures blocked a DDoS attack targeting a financial institution's online banking platform, ensuring uninterrupted customer access. Encryption prevented data exposure during a 2024 MitM attack on a corporate VPN.

Impact: Network security prevents data breaches, service outages, and financial losses while supporting compliance and trust in digital operations.
`
  }
};

export default lesson;

