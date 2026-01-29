import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 2,
  title: 'Common Web Application Vulnerabilities',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/ROeGWy3cld4',
    textContent: `
# Common Web Application Vulnerabilities

Web application vulnerabilities are weaknesses in websites, web applications, or APIs that attackers exploit to compromise data, disrupt services, or gain unauthorized access. These vulnerabilities often stem from poor coding practices, misconfigurations, or outdated systems, making web application security critical for protecting sensitive data and maintaining user trust. With 26% of data breaches in 2024 involving web applications (per Verizon's 2024 DBIR) and an average breach cost of $4.45 million (per IBM's 2024 report), addressing these vulnerabilities is essential to mitigate financial losses, ensure compliance with regulations like GDPR and PCI-DSS, and safeguard digital ecosystems. Below is a detailed overview of common web application vulnerabilities, their mechanisms, impacts, real-world examples, and mitigation strategies.

## 🔓 1. SQL Injection (SQLi)

* Definition: SQL Injection (SQLi) occurs when an attacker injects malicious SQL queries into input fields, such as login forms or search bars, to manipulate a web application's database.

* Mechanism: Attackers exploit unvalidated or unsanitized inputs to execute unauthorized SQL commands, allowing them to read, modify, or delete database content. For example, entering ' OR '1'='1 in a login field could bypass authentication by altering the query logic.

* Examples: The 2014 eBay breach exploited an SQLi vulnerability to access 145 million user records. In 2023, an attacker used SQLi to extract customer data from an e-commerce site's poorly sanitized search function.

* Impact: SQLi can lead to data theft, unauthorized access, or database corruption, compromising sensitive information like customer records or financial details. It's a factor in 8% of web application breaches (per OWASP).

* Mitigation: Use parameterized queries or prepared statements to separate code from user input, employ Object-Relational Mapping (ORM) frameworks like SQLAlchemy, and validate/sanitize all inputs. Deploy Web Application Firewalls (WAFs) to filter malicious queries.

* Trends: Automated SQLi tools, like SQLMap, are increasingly used by attackers, while AI-driven WAFs enhance detection of complex injection patterns.

## 🧠 2. Cross-Site Scripting (XSS)

* Definition: Cross-Site Scripting (XSS) involves injecting malicious scripts into trusted websites, which execute in a user's browser to steal data, hijack sessions, or deface sites.

* Types:
  * Stored XSS: Malicious scripts are stored on the server (e.g., in a comment section) and executed for all users viewing the content. For example, a malicious script in a forum post could steal cookies from every visitor.
  * Reflected XSS: Scripts are embedded in URLs or inputs and executed when a user clicks a crafted link. A 2023 phishing campaign used reflected XSS to redirect users to fake login pages.

* Examples: In 2018, a stored XSS vulnerability in a social media platform allowed attackers to steal user session cookies, compromising accounts. A 2024 XSS attack targeted a banking site, injecting scripts to capture login credentials.

* Impact: XSS can lead to session hijacking, data theft, or malware delivery, affecting user trust and privacy. It's involved in 7% of web application attacks (per OWASP).

* Mitigation: Sanitize and validate all user inputs, escape outputs (e.g., convert < to &lt;), and use Content Security Policy (CSP) headers to restrict script execution. WAFs can block malicious scripts.

* Trends: AI-driven XSS attacks use generative models to craft sophisticated scripts, while modern frameworks like React with automatic escaping reduce XSS risks.

## 🔐 3. Cross-Site Request Forgery (CSRF)

* Definition: Cross-Site Request Forgery (CSRF) tricks an authenticated user into submitting a malicious request, such as transferring funds or changing account settings, without their knowledge.

* Mechanism: Attackers embed malicious requests in emails, websites, or images that execute when a user interacts with them while authenticated on a target site. For example, clicking a malicious link could trigger a bank transfer if the user is logged into their banking app.

* Examples: In 2023, a CSRF attack on a financial platform tricked users into initiating unauthorized transactions via a crafted email link. A 2019 CSRF vulnerability in a CMS allowed attackers to modify admin settings.

* Impact: CSRF can lead to unauthorized actions, financial fraud, or account compromise, undermining user trust and security.

* Mitigation: Use CSRF tokens (unique, per-session tokens in forms), implement referer header checks to verify request origins, and enforce secure session management. Require re-authentication for sensitive actions.

* Trends: CSRF attacks are declining due to widespread token adoption, but remain a risk for legacy applications lacking modern protections.

## 🗝️ 4. Broken Authentication

* Definition: Broken authentication vulnerabilities arise from flawed login or session management systems, allowing attackers to hijack sessions, brute-force credentials, or bypass authentication.

* Mechanism: Weaknesses like predictable session IDs, lack of MFA, or insecure password recovery enable attackers to compromise accounts. For instance, brute-forcing weak passwords or exploiting session cookies can grant unauthorized access.

* Examples: The 2016 Uber breach exploited broken authentication to steal 57 million user records via compromised developer credentials. In 2024, a retail site's weak session management allowed session hijacking via stolen cookies.

* Impact: Broken authentication leads to unauthorized access, data theft, or account takeovers, with credentials involved in 74% of breaches (per Verizon's 2024 DBIR).

* Mitigation: Enforce strong password policies, implement MFA, use secure session management (e.g., short-lived tokens, HTTPS cookies), and set session timeouts. Monitor for brute-force attempts.

* Trends: Passwordless authentication (e.g., FIDO2) and biometric MFA are reducing broken authentication risks, while AI-driven brute-force attacks increase sophistication.

## 📜 5. Security Misconfiguration

* Definition: Security misconfigurations occur when default settings, verbose error messages, or outdated libraries expose web applications to attacks, often due to oversight or lack of hardening.

* Mechanism: Insecure configurations, such as exposed admin panels, unpatched software, or unnecessary open ports, allow attackers to exploit vulnerabilities. For example, a misconfigured server revealing error details can disclose database structures.

* Examples: The 2019 Capital One breach exploited a misconfigured WAF, exposing 100 million customer records. In 2023, an unpatched CMS with default credentials led to a data breach.

* Impact: Misconfigurations are a factor in 31% of cloud-related breaches (per IBM's 2024 report), leading to data leaks, system compromise, and regulatory fines.

* Mitigation: Harden servers by disabling unnecessary features, use secure defaults, keep software and libraries updated, and suppress verbose error messages. Use tools like OWASP ZAP for configuration audits.

* Trends: Cloud Security Posture Management (CSPM) tools, like Microsoft Defender for Cloud, automate configuration checks, while DevSecOps integrates security into development pipelines.

## 🪪 6. Insecure Direct Object References (IDOR)

* Definition: Insecure Direct Object References (IDOR) allow attackers to access unauthorized data by manipulating URLs, IDs, or parameters, exploiting weak access controls.

* Mechanism: Attackers modify predictable identifiers (e.g., changing /user/123 to /user/124) to access restricted resources, such as other users' data or files, if access checks are missing.

* Examples: In 2021, a social media platform's IDOR vulnerability allowed attackers to access private user photos by altering profile IDs. A 2024 e-commerce IDOR breach exposed customer order details via manipulated URLs.

* Impact: IDOR leads to data exposure, privacy violations, and potential financial losses, compromising user trust and compliance.

* Mitigation: Enforce strict access control checks (e.g., server-side validation), use indirect references (e.g., UUIDs instead of sequential IDs), and never expose predictable identifiers. Regular penetration testing can identify IDOR risks.

* Trends: Automated scanners exploit IDOR at scale, while modern frameworks with built-in access controls (e.g., Django's permission system) reduce prevalence.
`
  }
};

export default lesson;

