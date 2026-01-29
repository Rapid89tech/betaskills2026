import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 4,
  title: 'Identity and Access Management (IAM)',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/TbTUw2oz0EM',
    textContent: `
# Identity and Access Management (IAM)

* Definition: Identity and Access Management (IAM) controls user access to systems, networks, and data based on verified identities, ensuring only authorized individuals or entities gain access to resources. IAM is critical for securing digital environments by preventing unauthorized access, reducing insider threats, and ensuring compliance with regulations like GDPR and HIPAA.

* Key Components:
  * Authentication: Verifying a user's or system's identity to confirm they are who they claim to be. Common methods include:
    * Passwords: Traditional but vulnerable if weak or reused. Strong password policies reduce risks.
    * Biometrics: Uses unique physical traits like fingerprints or facial recognition for secure authentication. For example, smartphones often use biometric authentication for unlocking or payment apps.
    * Two-Factor Authentication (2FA) / Multi-Factor Authentication (MFA): Requires multiple verification factors (e.g., password plus a texted code), significantly reducing unauthorized access risks. In 2024, MFA prevented 74% of credential-based attacks, per Microsoft.
  * Authorization: Granting appropriate access levels based on roles or permissions after authentication. For instance, a finance employee might access budget data but not HR records, enforced via role-based access control (RBAC).
  * Single Sign-On (SSO): Allows users to authenticate once and access multiple services without re-logging, improving user experience while maintaining security. Tools like Okta or Ping Identity streamline SSO for enterprise applications.

* Examples: In 2023, a healthcare provider used MFA to block a phishing attempt targeting patient records. Okta's SSO solution enabled a multinational company to manage access across cloud and on-premises systems, reducing login fatigue.

* Impact: IAM prevents unauthorized access, mitigates insider threats, and ensures compliance. Misconfigured IAM policies contributed to 31% of cloud breaches in 2024, per IBM.

* Mitigation and Trends: Implement MFA across all systems, use zero trust principles to verify all access, adopt adaptive authentication (e.g., risk-based MFA), and regularly audit permissions. Emerging trends include passwordless authentication (e.g., FIDO2 standards) and AI-driven identity analytics to detect anomalous access patterns.
`
  }
};

export default lesson;

