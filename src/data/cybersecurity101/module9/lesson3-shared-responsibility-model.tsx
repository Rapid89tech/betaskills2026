import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Shared Responsibility Model',
  duration: '30 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/XTNX40FJ_r0',
    textContent: `
# Shared Responsibility Model 🤝

The Shared Responsibility Model is a fundamental concept in cloud security that defines the division of security responsibilities between the cloud service provider (CSP) and the customer. This model ensures clarity on who is accountable for securing different aspects of the cloud environment, helping organizations implement effective security measures while leveraging the provider's infrastructure and services.

## Overview of the Shared Responsibility Model

In cloud environments, security is a collaborative effort:

* **Cloud Service Provider (CSP)**: Responsible for securing the underlying infrastructure and services, often referred to as "security of the cloud."
* **Customer**: Responsible for securing their data, applications, and configurations within the cloud, referred to as "security in the cloud."

This division allows CSPs to maintain a secure foundation while customers focus on protecting their specific workloads and data.

## Responsibilities by Layer

| Layer | Provider Responsibility | Customer Responsibility |
|-------|------------------------|------------------------|
| **Physical Security** | ✓ | |
| **Infrastructure** | ✓ | |
| **Platform & Hypervisor** | ✓ | |
| **Applications, Data, Access Control** | | ✓ |

## Detailed Responsibilities

### 1. Physical Security

**Provider Responsibility**:
* Secures physical data centers, including access controls, surveillance, and environmental protections (e.g., fire suppression, power redundancy).
* Ensures physical hardware (e.g., servers, storage, networking equipment) is protected from unauthorized access or tampering.

**Customer Responsibility**:
* None, as customers do not have access to or control over physical facilities.

**Example**: AWS secures its data center facilities with biometric access and 24/7 monitoring, while customers have no role in physical security.

### 2. Infrastructure

**Provider Responsibility**:
* Manages the security of foundational infrastructure, including compute, storage, and networking resources.
* Implements patches, updates, and hardening for underlying hardware and virtualization layers.

**Customer Responsibility**:
* None for the core infrastructure, but customers must ensure proper configuration of their virtual resources (e.g., virtual machines, storage buckets).

**Example**: Microsoft Azure maintains the security of its global network infrastructure, while customers configure security groups for their virtual networks.

### 3. Platform & Hypervisor

**Provider Responsibility**:
* Secures the virtualization layer (e.g., hypervisors) and platform services (e.g., operating systems, databases) provided in PaaS or IaaS models.
* Ensures the integrity and availability of managed services, such as container orchestration or serverless computing platforms.

**Customer Responsibility**:
* None for the platform itself, but customers must secure their use of platform services, such as APIs or managed databases.

**Example**: Google Cloud secures its Kubernetes Engine, but customers must configure access policies for their Kubernetes clusters.

### 4. Applications, Data, Access Control

**Provider Responsibility**:
* Limited to providing secure tools and services (e.g., encryption options, identity management platforms) for customers to use.
* Ensures the security of SaaS applications (e.g., email services like Microsoft 365) when applicable.

**Customer Responsibility**:
* Secures applications, data, and access controls, including encryption, authentication (e.g., multi-factor authentication), and authorization (e.g., role-based access control).
* Manages application configurations, patches, and secure coding practices.
* Implements data protection measures, such as encryption at rest and in transit, and data loss prevention (DLP) policies.

**Example**: A customer using AWS S3 must configure bucket permissions, enable encryption, and manage IAM roles to secure their data.

## Variations Across Service Models

The division of responsibilities shifts depending on the cloud service model:

### Infrastructure as a Service (IaaS) (e.g., AWS EC2, Azure VMs)

* **Provider**: Secures physical infrastructure, hypervisors, and network.
* **Customer**: Responsible for operating systems, applications, data, and access controls.

### Platform as a Service (PaaS) (e.g., AWS Elastic Beanstalk, Google App Engine)

* **Provider**: Secures infrastructure, platform, and runtime environments.
* **Customer**: Focuses on securing applications, data, and access controls.

### Software as a Service (SaaS) (e.g., Salesforce, Microsoft 365)

* **Provider**: Manages most security aspects, including infrastructure, platform, and application security.
* **Customer**: Responsible for user access management, data protection, and configuration of application settings.

## Benefits of Understanding the Shared Responsibility Model

* **Clarity**: Defines clear boundaries between provider and customer responsibilities, preventing security gaps.
* **Optimized Security**: Enables customers to focus on their specific security needs while leveraging provider-managed infrastructure.
* **Compliance**: Supports adherence to regulatory requirements by clarifying who is responsible for specific controls.
* **Risk Management**: Helps organizations identify and address their security obligations effectively.

By understanding and applying the Shared Responsibility Model, organizations can ensure comprehensive cloud security, balancing provider-managed protections with customer-specific controls to safeguard their cloud environments.
    `
  }
};

export default lesson;
