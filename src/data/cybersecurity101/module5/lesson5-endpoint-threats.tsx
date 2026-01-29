import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 5,
  title: 'Endpoint Threats',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/CK-DK_QAzP8',
    textContent: `
# Endpoint Threats

| Threat | Description |
|--------|-------------|
| Ransomware | Encrypts files and demands payment |
| Keyloggers | Records keystrokes to steal credentials |
| Rootkits | Provides hidden admin access |
| Phishing Emails | Tricks users into clicking malicious links |
| Removable Media Threats | USB drives carrying malware |
`
  }
};

export default lesson;

