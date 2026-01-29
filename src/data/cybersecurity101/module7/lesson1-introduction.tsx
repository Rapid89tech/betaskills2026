import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 1,
  title: 'Introduction',
  duration: '30 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/nY_Da0AY2FI',
    textContent: `
# Introduction

Security policies, compliance, and governance form the strategic framework for managing cybersecurity across organizations. While tools protect systems, policies and governance ensure consistent, lawful, and aligned cybersecurity practices. This framework establishes a structured approach to safeguarding digital assets, aligning with organizational objectives, regulatory requirements, and industry best practices. By defining clear expectations and responsibilities, these elements help organizations mitigate risks, respond effectively to threats, and maintain trust with stakeholders.
`
  }
};

export default lesson;

