import type { Lesson } from '@/types/course';

const lesson: Lesson = {
  id: 3,
  title: 'Security Tools and Utilities',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/kBBXlkKlzdA',
    textContent: `
# Security Tools and Utilities

| Tool | Function |
|------|----------|
| Wireshark | Network protocol analyzer (packet inspection) |
| Nmap | Network scanner (detect open ports & services) |
| Metasploit | Penetration testing framework |
| Burp Suite | Web vulnerability scanner and proxy |
| Kali Linux | OS with built-in security testing tools |
| Fail2Ban | Bans IPs after failed login attempts |
| Snort | Open-source network intrusion detection system |
`
  }
};

export default lesson;

