import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 6,
  title: 'Secure Network Design Principles',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/l2jzCrhKGlQ',
    textContent: `
# Secure Network Design Principles

Secure network design principles provide a strategic framework for building resilient networks that withstand cyber threats. These principles ensure robust defenses, minimize vulnerabilities, and maintain service continuity, even during attacks. They are critical for protecting complex, hybrid environments involving cloud, IoT, and remote work.

## Defense in Depth

Employs multiple layers of security controls to protect networks, ensuring no single point of failure. This includes firewalls, intrusion prevention systems (IPS), VPNs, and antivirus software. For example, during the 2020 SolarWinds attack, organizations with layered defenses (e.g., firewalls and IPS) contained the breach more effectively. 

**Application:** Combine network firewalls (e.g., Palo Alto Networks NGFW), endpoint security, and SIEM for comprehensive protection. 

**Trend:** AI-driven threat detection enhances layered defenses, as seen in CrowdStrike's Falcon platform.

## Least Privilege

Grants users, devices, or applications only the access necessary for their roles, reducing the risk of unauthorized access or insider threats. In 2023, a misconfigured admin account was exploited, but least privilege policies limited the damage. 

**Application:** Use role-based access control (RBAC) via tools like Microsoft Entra ID, regularly audit permissions, and restrict privileged accounts. 

**Trend:** Integration with zero trust models enforces granular access controls.

## Zero Trust Model

Assumes no user or device is inherently trustworthy, requiring continuous verification of access requests. This mitigates insider threats and lateral movement, which were factors in 19% of breaches in 2024 (per IBM). For instance, Google's BeyondCorp zero trust implementation secured remote access during a 2024 phishing campaign. 

**Application:** Implement MFA, device health checks, and micro-segmentation. 

**Trend:** Zero trust is evolving with secure access service edge (SASE), combining network security and access control.

## Redundancy and Failover

Incorporates backup components and systems to ensure continuity during failures or attacks, such as DDoS incidents. In 2023, a bank maintained service availability during a DDoS attack using redundant servers and failover systems. 

**Application:** Deploy load balancers, maintain offsite backups, and use cloud-based redundancy (e.g., AWS Multi-AZ). 

**Trend:** Cloud-native failover solutions enhance resilience in hybrid environments.
`
  }
};

export default lesson;

