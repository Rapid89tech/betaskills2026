import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Key Roles and Responsibilities',
  duration: '30 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/nY_Da0AY2FI',
    textContent: `
# Key Roles and Responsibilities 👥

## Cybersecurity Team Structure

| Role | Responsibility |
|------|----------------|
| **CISO (Chief Information Security Officer)** | Leads cybersecurity strategy |
| **IT Manager** | Implements policies and manages infrastructure |
| **Compliance Officer** | Ensures regulatory alignment |
| **Security Analysts** | Monitor, detect, and respond to threats |
| **Auditors** | Review policy effectiveness and control integrity |

## Detailed Role Descriptions

### CISO (Chief Information Security Officer)

The CISO is the executive responsible for an organization's information and data security. They develop and implement the cybersecurity strategy, manage the security team, and communicate risks to senior leadership and the board.

**Key Responsibilities:**
* Developing and executing the organization's cybersecurity strategy
* Managing security budgets and resource allocation
* Overseeing incident response and recovery efforts
* Communicating security risks to executives and stakeholders
* Ensuring compliance with regulations and standards

### IT Manager

IT Managers oversee the day-to-day operations of IT infrastructure, ensuring systems are secure, reliable, and aligned with organizational needs.

**Key Responsibilities:**
* Implementing security policies and procedures
* Managing IT infrastructure and system configurations
* Coordinating with security teams on technical implementations
* Ensuring system availability and performance
* Managing IT staff and vendor relationships

### Compliance Officer

Compliance Officers ensure that the organization adheres to relevant laws, regulations, and industry standards related to data protection and cybersecurity.

**Key Responsibilities:**
* Monitoring regulatory changes and updating compliance programs
* Conducting compliance audits and assessments
* Developing and maintaining compliance documentation
* Training staff on compliance requirements
* Liaising with regulatory authorities and auditors

### Security Analysts

Security Analysts are on the front lines of cybersecurity, monitoring systems for threats, investigating incidents, and responding to security events.

**Key Responsibilities:**
* Monitoring security alerts and logs using SIEM tools
* Investigating potential security incidents
* Analyzing threat intelligence and vulnerability reports
* Documenting security events and response actions
* Recommending security improvements

### Auditors

Auditors assess the effectiveness of security controls, policies, and procedures, providing independent verification of an organization's security posture.

**Key Responsibilities:**
* Conducting security audits and assessments
* Reviewing compliance with policies and regulations
* Testing security controls for effectiveness
* Documenting findings and recommendations
* Reporting audit results to management and stakeholders

## Collaboration and Communication

Effective cybersecurity requires collaboration across all roles, with clear communication channels and shared responsibility for protecting organizational assets. Regular meetings, incident response drills, and cross-functional projects help ensure alignment and readiness.

## Career Progression

Many cybersecurity professionals start in technical roles like Security Analyst and progress to leadership positions like CISO, gaining experience and certifications along the way. Understanding these roles helps individuals plan their career paths and identify skill development opportunities.
    `
  }
};

export default lesson;
