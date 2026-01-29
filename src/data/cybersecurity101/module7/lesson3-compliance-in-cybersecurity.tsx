import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Compliance in Cybersecurity',
  duration: '35 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/nY_Da0AY2FI',
    textContent: `
# Compliance in Cybersecurity 📜

Compliance ensures that an organization follows laws, standards, and regulations designed to protect data.

## Common Compliance Frameworks

| Framework | Applies To |
|-----------|------------|
| **GDPR** | Organizations handling EU citizens' data |
| **HIPAA** | U.S. healthcare data privacy |
| **PCI-DSS** | Companies handling credit card data |
| **ISO/IEC 27001** | International info security standard |
| **NIST** | U.S. federal cybersecurity standards |

## Why Compliance Matters

### Avoid Fines and Legal Issues

Non-compliance can result in significant fines, lawsuits, and reputational damage. Organizations must adhere to regulations to avoid these consequences.

### Build Trust with Customers

Compliance demonstrates a commitment to protecting customer data, fostering trust and confidence in your organization's security practices.

### Ensure Systematic Security Controls

Compliance frameworks provide structured approaches to implementing and maintaining security controls, ensuring comprehensive protection across the organization.

## Key Compliance Requirements

### Data Protection

Regulations like GDPR require organizations to implement appropriate technical and organizational measures to protect personal data, including encryption, access controls, and data minimization.

### Breach Notification

Many regulations mandate timely notification of data breaches to affected individuals and regulatory authorities, typically within 72 hours of discovery.

### Regular Audits

Compliance frameworks often require regular security audits and assessments to verify that controls are functioning effectively and to identify areas for improvement.

### Documentation

Organizations must maintain detailed documentation of their security policies, procedures, and controls to demonstrate compliance during audits and investigations.

## Compliance Best Practices

### Stay Informed

Keep up-to-date with changes to regulations and standards that apply to your organization, ensuring your compliance program remains current.

### Implement Strong Controls

Deploy robust security controls that meet or exceed regulatory requirements, including encryption, access management, and monitoring systems.

### Conduct Regular Training

Educate employees about compliance requirements and their role in maintaining security, reducing the risk of human error and non-compliance.

### Engage Experts

Consider working with compliance consultants or legal experts to ensure your organization meets all applicable requirements and stays ahead of regulatory changes.

By prioritizing compliance, organizations can protect sensitive data, avoid legal penalties, and maintain stakeholder trust in an increasingly regulated digital landscape.
    `
  }
};

export default lesson;
