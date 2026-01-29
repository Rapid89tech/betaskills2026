import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 6,
  title: 'Best Practices for Endpoint Protection',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/CK-DK_QAzP8',
    textContent: `
# Best Practices for Endpoint Protection

* Enforce strong passwords and multi-factor authentication

* Regularly update software and operating systems

* Apply least privilege access for users

* Use centralized monitoring for endpoint activity

* Restrict use of USB ports and unauthorized software

* Educate users on safe practices and phishing awareness
`
  }
};

export default lesson;

