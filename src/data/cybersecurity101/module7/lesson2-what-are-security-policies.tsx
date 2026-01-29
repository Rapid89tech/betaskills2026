import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'What Are Security Policies?',
  duration: '40 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/nY_Da0AY2FI',
    textContent: `
# What Are Security Policies? 📋

A security policy is a documented set of rules and procedures that defines how an organization manages and protects its digital assets. These policies provide a blueprint for maintaining security, ensuring compliance, and fostering a culture of accountability. They are designed to be dynamic, evolving with technological advancements, emerging threats, and regulatory changes.

## Key Security Policy Types

### Acceptable Use Policy (AUP)

Defines proper use of IT resources, including hardware, software, and networks. It outlines acceptable and prohibited behaviors, such as personal use of company systems or installing unauthorized software, to prevent misuse and reduce vulnerabilities.

### Access Control Policy

Specifies who can access what resources, when, and under what conditions. This policy enforces the principle of least privilege, ensuring users only have access to the data and systems necessary for their roles. It may include role-based access control (RBAC) or multi-factor authentication (MFA) requirements.

### Password Policy

Provides guidelines for creating, managing, and securing passwords. Common requirements include minimum length, complexity (e.g., mix of letters, numbers, and symbols), regular updates, and prohibitions on password reuse or sharing to enhance system security.

### Data Classification Policy

Categorizes data based on its sensitivity, such as public, internal, confidential, or restricted. This policy dictates how data should be handled, stored, and shared, ensuring sensitive information receives appropriate protections, like encryption or restricted access.

### Incident Response Policy

Outlines a structured process for identifying, responding to, and recovering from cybersecurity incidents. It includes steps like incident detection, containment, eradication, and recovery, as well as communication protocols and post-incident reviews to improve future responses.

## Additional Security Policy Types

### Remote Work Policy

Governs secure access to organizational resources for employees working remotely. It may include requirements for secure VPN usage, endpoint protection, and restrictions on using personal devices for work purposes.

### Bring Your Own Device (BYOD) Policy

Defines security standards for personal devices used in the workplace. This includes mandatory antivirus software, device encryption, and procedures for data wiping in case of loss or theft.

### Change Management Policy

Establishes procedures for implementing changes to IT systems, ensuring updates or modifications do not introduce vulnerabilities. It typically includes risk assessments, testing, and approval processes.

### Data Retention and Disposal Policy

Specifies how long different types of data should be retained and how to securely dispose of it when no longer needed. This helps comply with legal requirements and minimizes risks from outdated or unnecessary data.

## Importance of Security Policies

### Risk Mitigation

They reduce vulnerabilities by standardizing secure practices across the organization.

### Compliance

Policies ensure adherence to regulations like GDPR, HIPAA, or PCI-DSS, avoiding penalties and reputational damage.

### Consistency

They provide a uniform approach to security, reducing errors from ad-hoc decisions.

### Accountability

Policies assign clear roles and responsibilities, fostering a security-conscious culture.

### Incident Preparedness

Well-defined policies enable swift, coordinated responses to cyber threats.

By integrating these policies into daily operations, organizations can proactively address cybersecurity challenges while aligning with legal and industry standards.
    `
  }
};

export default lesson;
