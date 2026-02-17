import { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Data Recovery and Backup',
  duration: '75 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/example',
    textContent: `
# Data Recovery and Backup

## **Data Recovery Expertise**

Learners master recovering lost or corrupted data and implementing robust backup strategies to prevent data loss.

---

## **Understanding Data Loss**

### **Common Causes of Data Loss:**

- Hardware failure (HDD/SSD failure)
- Accidental deletion
- File system corruption
- Malware/ransomware attacks
- Physical damage (water, fire)
- Power surges
- Human error
- Software bugs

### **Types of Data Loss:**

- **Logical:** File system corruption, accidental deletion
- **Physical:** Hardware damage, mechanical failure
- **Firmware:** Controller failure, bad sectors

---

## **Data Recovery Methods**

### **Software-Based Recovery:**

**Tools:**
- Recuva (Windows)
- TestDisk/PhotoRec (Cross-platform)
- EaseUS Data Recovery
- Disk Drill
- R-Studio

**Steps:**
1. Stop using the affected drive immediately
2. Install recovery software on different drive
3. Scan for recoverable files
4. Preview and select files
5. Recover to different location

### **Hardware-Based Recovery:**

- Replace damaged components
- Use specialized equipment
- Professional data recovery services
- Clean room recovery for physical damage

### **Recovery from Backups:**

- Restore from cloud backup
- Restore from external drive
- Use system restore points
- Recover from network backup

---

## **Backup Strategies**

### **3-2-1 Backup Rule:**

- **3** copies of data
- **2** different media types
- **1** offsite copy

### **Backup Types:**

- **Full Backup:** Complete copy of all data
- **Incremental Backup:** Only changed files since last backup
- **Differential Backup:** Changed files since last full backup
- **Mirror Backup:** Exact copy, synced in real-time

### **Backup Solutions:**

**Local Backup:**
- External hard drives
- NAS (Network Attached Storage)
- USB flash drives

**Cloud Backup:**
- Google Drive
- OneDrive
- Dropbox
- Backblaze
- Carbonite

**System Backup:**
- Windows Backup and Restore
- Time Machine (macOS)
- System Image
- Disk cloning (Clonezilla, Macrium Reflect)

---

## **Best Practices**

### **Data Recovery:**

- Act quickly after data loss
- Don't write to affected drive
- Use reliable recovery software
- Consider professional help for critical data
- Test recovery process regularly

### **Backup:**

- Automate backups
- Test restore procedures
- Encrypt sensitive data
- Keep multiple versions
- Store offsite copies
- Document backup procedures
- Update backup strategy regularly

---

## **📚 Summary**

Data recovery requires understanding loss causes, using appropriate tools, and acting quickly. Effective backup strategies following the 3-2-1 rule prevent data loss and ensure business continuity.
    `
  }
};
