import { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Operating System Installation and Repair',
  duration: '95 min',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=zBkzqMYGcZ0',
    textContent: `
# Operating System Installation and Repair

## **Bootable Media Creation**

Learners master creating and verifying bootable USB/DVD media for OS installation and repair, ensuring reliable setups.

[https://www.youtube.com/watch?v=zBkzqMYGcZ0](https://www.youtube.com/watch?v=zBkzqMYGcZ0)

---

## **Preparing Installation Media (USB/DVD)**

### **What is Installation Media?**

Contains OS setup files for installation or repair. Used to boot systems independently of installed OS.

**Forms:** USB (faster, modern) or DVD (older systems)

### **Why Use USB or DVD Installation Media?**

**https://www.youtube.com/watch?v=R7VLs8FwD2M**

- **USB:** Faster, reusable, widely supported
- **DVD:** Used for older systems without USB boot support

### **Requirements:**

- **USB:** Minimum 8GB for modern OS
- **DVD:** Blank dual-layer disc, DVD burner
- Working computer with internet, OS ISO file

### **Obtaining the OS Image (ISO):**

- **Windows:** Download from Microsoft website or Media Creation Tool
- **Linux:** Official distribution sites (e.g., Ubuntu, Fedora)
- **macOS:** Apple App Store or recovery tools

### **Creating a Bootable USB Drive:**

**https://www.youtube.com/watch?v=c0TK0ynXLOo**

**Tools:** Rufus, Microsoft Media Creation Tool, balenaEtcher, UNetbootin, dd (Linux/macOS)

**Rufus Steps:**
1. Insert USB, open Rufus, select USB device
2. Choose ISO file
3. Set partition scheme (MBR for BIOS, GPT for UEFI)
4. Use FAT32/NTFS
5. Click Start, wait, eject safely

---

## **Installing Windows, Linux, and macOS**

### **Installing Windows:**

**https://www.youtube.com/watch?v=WDws3T_tRpg**

**Requirements:** Bootable USB/DVD, Windows product key, compatible hardware

**Steps:**
1. Boot from media, select language/time/keyboard
2. Click Install Now, enter product key (or skip), accept license
3. Choose Custom for clean install, partition/format disk
4. Copy files, restart multiple times
5. Configure user accounts/privacy
6. Install drivers via Windows Update or manually

### **Installing Linux:**

**https://m.youtube.com/watch?v=pwWfki7kx0w**

**Distributions:** Ubuntu, Fedora, Debian, Mint, CentOS

**Steps:**
1. Boot from media, choose Try or Install
2. Select language/keyboard
3. Choose installation type (dual boot, erase disk, custom)
4. Partition (root, home, swap), install GRUB bootloader
5. Set username/password/hostname
6. Copy files, restart, update via apt/dnf

### **Installing macOS:**

**https://www.youtube.com/watch?v=HCrl_4k0aqo**

**Methods:** Recovery mode or USB installer on Apple hardware

**Steps:**
1. Enter Recovery Mode (Cmd + R), select Reinstall macOS
2. Agree to terms, choose disk, install
3. Configure region/Apple ID/users
4. Update via App Store

---

## **Disk Partitioning and Formatting**

**https://youtu.be/eSMMs4cfMqY**

### **What is Disk Partitioning?**

Divides physical drive into logical partitions, acting as separate disks. Enables multiple OSes, separates system/user data.

### **Types of Partitions:**

**https://www.youtube.com/watch?v=wnfyb1nKHpQ**

- **Primary:** Bootable, up to 4 (MBR)
- **Extended:** Contains logical partitions
- **Logical:** Non-bootable, stores data/OS files
- **MBR:** Older, 4 partitions, 2TB limit
- **GPT:** Modern, 128 partitions, large disks, UEFI required

### **Common File Systems:**

- **NTFS:** Windows, supports large files/permissions
- **FAT32:** Universal, 4GB file size limit
- **exFAT:** Cross-platform, large files, USB drives
- **ext4:** Linux default
- **APFS:** Modern macOS
- **HFS+:** Older macOS

### **Partitioning Tools:**

- **Windows:** Disk Management, DiskPart
- **Linux:** GParted, fdisk, parted
- **macOS:** Disk Utility

---

## **Driver Installation and Updates**

**https://youtu.be/Pw6xZuR_yE8**

### **What Are Drivers?**

**https://youtu.be/GpCqSP4v4c4**

Software translating OS commands to hardware (e.g., GPU, printer, network). Without drivers, hardware may malfunction or fail.

### **Importance of Drivers:**

- Enable full hardware functionality/performance
- Fix bugs
- Provide security updates
- Ensure OS compatibility

### **Types of Drivers:**

- **Built-in:** OS-provided, basic functionality
- **Manufacturer:** Official, full features
- **Third-party:** Alternative, riskier

### **Methods of Driver Installation:**

- **Automatic:** OS/Windows Update installs basic drivers
- **Manual:** Download from manufacturer, use Device Manager/installer
- **Device Manager:** Update driver, search automatically or browse manually

### **Updating Drivers:**

Use OS utilities (Windows Update, Linux package managers), manufacturer tools (e.g., NVIDIA GeForce Experience), or download from official sites.

---

## **Troubleshooting Installation Errors**

### **Common Causes:**

**https://youtu.be/3D4CkPNDUf8**

- Corrupted Media
- Incompatible Hardware
- Insufficient Disk Space
- BIOS/UEFI Misconfiguration
- Driver Conflicts/Missing
- File System Issues
- Power Interruptions
- Software Conflicts

### **Step-by-Step Troubleshooting:**

1. Verify Media
2. Check Hardware
3. Review BIOS/UEFI
4. Prepare Disk
5. Load Drivers
6. Monitor Power
7. Disable Software

### **Specific Installation Error Examples:**

- "No boot device found": Adjust BIOS boot priority
- "Windows cannot be installed to this disk": Convert GPT/MBR for boot mode
- "Setup could not copy files": Recreate media
- "Driver missing": Load drivers from USB
- "Insufficient disk space": Repartition disk

---

## **📚 Summary**

Operating system installation requires preparing bootable media, understanding partitioning, installing drivers, and troubleshooting errors. Mastering these skills ensures successful OS deployments and repairs.
    `
  }
};
