import { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Virus Removal and System Optimization',
  duration: '80 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/NMYbkzjI5EY',
    textContent: `
# Virus Removal and System Optimization

## **Malware Identification Expertise**

Learners master identifying and understanding various viruses and malware, enabling effective detection and prevention strategies.

[https://youtu.be/NMYbkzjI5EY](https://youtu.be/NMYbkzjI5EY)

---

## **Types of Viruses and Malware**

### **What is Malware?**

Malware is software created to damage systems, steal data, or disrupt operations. Includes viruses, worms, trojans, ransomware, spyware, adware, rootkits, keyloggers, and botnets.

### **Types of Viruses:**

- **File Infector Virus:** Attaches to executable files, spreads when run
- **Macro Virus:** Embeds in macro-enabled documents
- **Boot Sector Virus:** Infects MBR/boot sector
- **Resident Virus:** Embeds in memory
- **Polymorphic Virus:** Alters code to evade detection

### **Types of Malware (Beyond Viruses):**

**https://youtu.be/n8mbzU0X2nQ**

- **Worms:** Self-replicate, spread via networks
- **Trojan Horses:** Pose as legitimate software
- **Ransomware:** Encrypts data, demands ransom
- **Spyware:** Monitors activity, steals passwords
- **Adware:** Displays unwanted ads
- **Rootkits:** Gain root access, hide malicious activity
- **Keyloggers:** Record keystrokes
- **Botnets:** Control infected systems remotely

### **How Malware Spreads:**

**https://youtu.be/wobBxH83WKg**

- Email Attachments/Phishing
- Malicious Websites/Downloads
- Removable Drives
- Network Vulnerabilities
- Software Exploits
- Social Engineering

---

## **Detecting Malware**

### **Common Signs of Infection:**

- Slow system performance
- Frequent crashes/freezes
- Unexpected pop-ups
- Browser redirects
- Unknown programs running
- High CPU/memory usage
- Disabled antivirus
- Files encrypted/missing

### **Detection Tools:**

- **Antivirus Software:** Windows Defender, Malwarebytes, Avast, Norton
- **Anti-Malware Tools:** Malwarebytes, HitmanPro, AdwCleaner
- **System Monitors:** Task Manager, Process Explorer, Autoruns

---

## **Removing Malware**

### **Safe Mode Boot:**

Boot into Safe Mode to prevent malware from loading

### **Manual Removal Steps:**

1. Disconnect from internet
2. Boot into Safe Mode
3. Delete temporary files
4. Run antivirus/anti-malware scans
5. Check startup programs
6. Remove suspicious programs
7. Reset browser settings
8. Update OS and software

### **Using Antivirus Tools:**

- Full system scan
- Quarantine threats
- Delete infected files
- Update definitions regularly

---

## **System Optimization**

### **Performance Optimization:**

- **Disable Startup Programs:** Use Task Manager or msconfig
- **Clean Temporary Files:** Use Disk Cleanup or CCleaner
- **Defragment HDD:** Use built-in defragmenter (not for SSDs)
- **Update Drivers:** Keep all drivers current
- **Increase RAM:** Add more memory if needed
- **Upgrade to SSD:** Replace HDD with SSD for speed

### **Software Optimization:**

- Uninstall unused programs
- Disable visual effects
- Adjust power settings
- Update operating system
- Run disk error checking

### **Preventive Measures:**

- Install reliable antivirus
- Keep software updated
- Use strong passwords
- Enable firewall
- Backup data regularly
- Avoid suspicious links/downloads
- Use ad blockers
- Enable two-factor authentication

---

## **📚 Summary**

Virus removal requires identifying malware types, using detection tools, and performing systematic removal. System optimization involves cleaning, updating, and configuring settings for peak performance.
    `
  }
};
