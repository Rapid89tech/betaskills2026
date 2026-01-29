import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Introduction',
  duration: '30 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/kBBXlkKlzdA',
    textContent: `
# Introduction

Cybersecurity technologies and tools are critical for defending systems, networks, and data against an ever-evolving landscape of cyber threats, including malware, phishing, ransomware, and advanced persistent threats (APTs). These tools operate across multiple levels—hardware, software, network, application, and data—to create layered defense mechanisms, often referred to as defense-in-depth. By integrating detection, prevention, response, and recovery capabilities, these technologies ensure the confidentiality, integrity, and availability of digital assets (the CIA triad). As cyber threats grow in sophistication, with global cybercrime costs projected to reach $10.5 trillion annually by 2025 (per Cybersecurity Ventures), these tools are essential for individuals, organizations, and governments to mitigate risks, comply with regulations like GDPR and HIPAA, and maintain trust in digital ecosystems. From firewalls to encryption, cybersecurity technologies provide a robust framework to counter threats in an increasingly connected world.
`
  }
};

export default lesson;

