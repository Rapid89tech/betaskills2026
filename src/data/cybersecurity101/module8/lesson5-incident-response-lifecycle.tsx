import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Incident Response Lifecycle (NIST Framework)',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/4MGVTpXAAmo',
    textContent: `
# Incident Response Lifecycle (NIST Framework) 🔄

The NIST Incident Response Lifecycle, outlined in NIST Special Publication 800-61, provides a structured framework for managing cybersecurity incidents. This lifecycle ensures organizations can prepare for, detect, respond to, and recover from incidents effectively, minimizing damage and improving future resilience. The framework consists of four key phases: Preparation, Detection & Analysis, Containment, Eradication & Recovery, and Post-Incident Activity.

## 1. Preparation

The preparation phase focuses on building the foundation for an effective incident response capability before incidents occur. This proactive step ensures organizations are ready to handle cybersecurity events efficiently.

### Key Actions

* **Train Staff**: Conduct regular training and simulations (e.g., tabletop exercises) to ensure employees understand their roles in incident response and are familiar with procedures.
* **Create Incident Response Plan (IRP)**: Develop a comprehensive IRP that outlines processes, roles, responsibilities, and communication protocols for handling incidents.
* **Identify Tools and Resources**: Deploy and maintain tools like intrusion detection systems (IDS), security information and event management (SIEM) platforms, and forensic software. Ensure access to resources such as backups, external expertise, and legal support.
* **Establish Policies and Procedures**: Define escalation paths, incident classification criteria, and coordination with external stakeholders (e.g., law enforcement, regulators).
* **Asset Inventory**: Maintain an up-to-date inventory of critical assets, systems, and data to prioritize protection and response efforts.

## 2. Detection & Analysis

This phase focuses on identifying and assessing potential cybersecurity incidents to confirm their occurrence, scope, and impact.

### Key Actions

* **Monitor Logs, Alerts, and Behaviors**: Use SIEM systems, network monitoring tools, and endpoint detection to identify anomalies, such as unusual login attempts, traffic spikes, or unauthorized changes.
* **Incident Identification**: Determine whether an event constitutes a security incident by analyzing indicators of compromise (IoCs), such as malware signatures or suspicious user activity.
* **Analyze Scope and Impact**: Assess the affected systems, data, or users, and evaluate the potential impact (e.g., data loss, operational disruption, financial damage).
* **Classify Incidents**: Categorize incidents by severity (e.g., low, medium, high) to prioritize response efforts and allocate resources effectively.
* **Document Findings**: Record all observations, including timelines, affected systems, and initial evidence, to support further investigation and compliance requirements.

## 3. Containment, Eradication & Recovery

This phase aims to limit the damage caused by an incident, eliminate the threat, and restore normal operations securely.

### Containment

* **Short-Term Containment**: Take immediate actions to stop the incident's spread, such as isolating affected systems, disabling compromised accounts, or blocking malicious IP addresses.
* **Long-Term Containment**: Implement temporary measures to maintain operations while preparing for eradication, such as rerouting network traffic or applying temporary patches.
* **Preserve Evidence**: Ensure forensic data is collected and preserved for analysis and potential legal action.

### Eradication

* Identify and remove the root cause of the incident, such as deleting malware, closing exploited vulnerabilities, or removing unauthorized access points.
* Verify that all traces of the threat are eliminated to prevent recurrence.
* Update security controls, such as firewalls or access policies, to address identified weaknesses.

### Recovery

* Restore affected systems and data from secure backups or rebuilt environments.
* Validate that restored systems are free from threats and fully operational.
* Monitor systems post-recovery to detect any signs of residual or recurring issues.

## 4. Post-Incident Activity

The post-incident phase focuses on analyzing the incident, documenting lessons learned, and improving future response capabilities.

### Key Actions

* **Document Lessons Learned**: Conduct a thorough review of the incident, including its cause, response effectiveness, and areas for improvement. Involve all relevant stakeholders, such as the incident response team, IT staff, and leadership.
* **Update Procedures**: Revise the IRP, policies, and controls based on findings to address gaps and strengthen defenses. For example, update training programs or implement new security tools.
* **Audit Response Effectiveness**: Evaluate the performance of the incident response team, tools, and processes. Identify successes and shortcomings to enhance future responses.
* **Share Knowledge**: Communicate lessons learned across the organization to improve awareness and preparedness. Share anonymized insights with industry peers or authorities when appropriate.
* **Monitor for Recurrence**: Continuously monitor systems and networks to ensure the incident has been fully resolved and to detect any related or new threats.

## Benefits of the NIST Incident Response Lifecycle

* **Structured Response**: Provides a clear, repeatable process for managing incidents, reducing chaos and errors during high-pressure situations.
* **Minimized Impact**: Enables rapid containment and recovery, limiting financial, operational, and reputational damage.
* **Continuous Improvement**: Encourages learning from incidents to strengthen security posture and prevent future occurrences.
* **Compliance Alignment**: Supports adherence to regulatory requirements, such as GDPR, HIPAA, or PCI-DSS, by ensuring documented and auditable response processes.

By following the NIST Incident Response Lifecycle, organizations can build a robust, proactive approach to managing cybersecurity incidents, ensuring resilience and preparedness in the face of evolving threats.
    `
  }
};

export default lesson;
