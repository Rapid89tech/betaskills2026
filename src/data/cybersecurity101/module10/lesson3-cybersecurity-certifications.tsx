import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Cybersecurity Certification Pathways',
  duration: '35 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/Gfy8Ng1-ccI',
    textContent: `
# Cybersecurity Certification Pathways 📜

## Popular Cybersecurity Certifications

| Certification | Level | Offered By | Focus |
|---------------|-------|------------|-------|
| **CompTIA Security+** | Beginner | CompTIA | Foundational knowledge, risk management |
| **CEH (Certified Ethical Hacker)** | Intermediate | EC-Council | Penetration testing, ethical hacking |
| **CISSP (Certified Information Systems Security Professional)** | Advanced | (ISC)² | Security architecture, policy, leadership |
| **CISM (Certified Information Security Manager)** | Advanced | ISACA | Risk management and governance |
| **OSCP (Offensive Security Certified Professional)** | Advanced | Offensive Security | Hands-on penetration testing |
| **CySA+ (Cybersecurity Analyst)** | Intermediate | CompTIA | Threat detection, SIEM, behavioral analytics |

## Certification Details

### CompTIA Security+ (Beginner)

**Focus**: Foundational cybersecurity knowledge covering network security, compliance, operational security, threats, and vulnerabilities.

**Who Should Take It**: Entry-level professionals or those transitioning into cybersecurity from other IT roles.

**Benefits**: Widely recognized, vendor-neutral certification that provides a solid foundation for cybersecurity careers.

**Exam Details**: 90 questions, 90 minutes, passing score of 750/900.

### CEH - Certified Ethical Hacker (Intermediate)

**Focus**: Ethical hacking techniques, penetration testing methodologies, and vulnerability assessment.

**Who Should Take It**: Security professionals interested in offensive security and penetration testing.

**Benefits**: Demonstrates proficiency in identifying and exploiting vulnerabilities ethically.

**Exam Details**: 125 questions, 4 hours, passing score of 70%.

### CISSP - Certified Information Systems Security Professional (Advanced)

**Focus**: Comprehensive coverage of security architecture, engineering, management, and operations.

**Who Should Take It**: Experienced security professionals seeking leadership or architect roles.

**Benefits**: Globally recognized certification demonstrating expertise in designing and managing security programs.

**Requirements**: Minimum 5 years of paid work experience in two or more CISSP domains.

**Exam Details**: 100-150 questions, 3 hours, passing score of 700/1000.

### CISM - Certified Information Security Manager (Advanced)

**Focus**: Information security governance, risk management, incident management, and program development.

**Who Should Take It**: Security managers and those aspiring to management roles.

**Benefits**: Demonstrates ability to manage and govern enterprise information security programs.

**Requirements**: Minimum 5 years of information security work experience, with at least 3 years in management.

**Exam Details**: 150 questions, 4 hours, passing score of 450/800.

### OSCP - Offensive Security Certified Professional (Advanced)

**Focus**: Hands-on penetration testing skills in a practical, exam-based environment.

**Who Should Take It**: Experienced penetration testers seeking to validate practical skills.

**Benefits**: Highly respected certification demonstrating real-world penetration testing abilities.

**Exam Details**: 24-hour practical exam requiring successful exploitation of multiple systems.

### CySA+ - Cybersecurity Analyst (Intermediate)

**Focus**: Threat detection, analysis, and response using behavioral analytics and SIEM tools.

**Who Should Take It**: Security analysts and SOC professionals.

**Benefits**: Validates skills in detecting and responding to security threats.

**Exam Details**: 85 questions, 165 minutes, passing score of 750/900.

## Career Development Tips

### Build a Home Lab

Practice tools (Kali Linux, Wireshark, etc.) in a safe environment to develop hands-on skills.

### Join Communities

Engage with cybersecurity communities on Reddit, LinkedIn, Discord, and professional forums.

### Contribute to Open-Source or CTFs

Participate in Capture The Flag competitions and contribute to open-source security projects.

### Stay Current

Follow cybersecurity blogs, news sites, and podcasts to stay informed about emerging threats and trends.

### Gain Practical Experience

Seek internships, volunteer projects, or entry-level positions to build real-world experience.

## Average Salary Ranges (ZAR)

| Role | Entry-Level | Mid-Level | Senior |
|------|-------------|-----------|--------|
| **Security Analyst** | R1,072,500 | R1,560,000 | R2,145,000+ |
| **Penetration Tester** | R1,267,500 | R1,755,000 | R2,535,000+ |
| **Security Engineer** | R1,365,000 | R1,950,000 | R2,730,000+ |
| **Chief Information Security Officer (CISO)** | – | – | R2,925,000–R4,875,000 |

*Note: Salaries may vary based on location, experience, industry, and organization size.*

## Choosing the Right Certification Path

### For Beginners

Start with CompTIA Security+ to build foundational knowledge, then progress to specialized certifications based on your career interests.

### For Technical Roles

Consider CEH or OSCP for penetration testing, or CySA+ for security analysis and threat detection.

### For Management Roles

Pursue CISM or CISSP to demonstrate leadership capabilities and strategic security management skills.

### For Specialized Areas

Look into cloud security certifications (AWS Certified Security, Azure Security Engineer) or specialized vendor certifications based on your technology stack.

## Continuous Learning

Cybersecurity is a rapidly evolving field. Maintain your certifications through continuing education, stay updated on emerging threats and technologies, and continuously expand your skill set to remain competitive and effective in your role.
    `
  }
};

export default lesson;
