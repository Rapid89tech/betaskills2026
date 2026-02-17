import { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'BIOS and Firmware Issues',
  duration: '70 min',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=mzjqbvyDtWs',
    textContent: `
# BIOS and Firmware Issues

## **Firmware Fundamentals**

Learners master the roles and differences of BIOS and UEFI, enabling effective system initialization and troubleshooting.

[https://www.youtube.com/watch?v=mzjqbvyDtWs](https://www.youtube.com/watch?v=mzjqbvyDtWs)

---

## **Understanding BIOS and UEFI**

**BIOS (Basic Input/Output System)** and **UEFI (Unified Extensible Firmware Interface)** are firmware interfaces that initialize hardware and load the operating system during boot.

### **What is BIOS?**

BIOS, a traditional firmware, is stored on a ROM chip on the motherboard since the 1980s.

**Functions:**
- Performs POST (Power-On Self-Test)
- Initializes CPU, RAM, storage, and peripherals
- Loads bootloader or OS

**Limitations:**
- Uses 16-bit mode
- Limits boot drive size to 2.2 TB (MBR partitioning)
- Slow boot times
- Text-based interface with keyboard navigation

### **What is UEFI?**

**https://www.youtube.com/watch?v=yjehvavPbMA**

UEFI, the modern BIOS replacement, is stored in flash memory.

**Advantages:**
- Supports drives over 2.2 TB via GPT partitioning
- Faster boot times
- Graphical interface with mouse/keyboard support
- Secure Boot prevents unauthorized OS loading
- Network capabilities for remote diagnostics
- Runs in 32-bit/64-bit mode

### **BIOS vs UEFI – Key Differences**

**https://www.youtube.com/watch?v=VY3flvge2X0**

- **Interface:** BIOS is text-based, UEFI supports graphical with mouse
- **Boot Mode:** BIOS uses MBR, UEFI uses GPT for large disks
- **Security:** UEFI offers Secure Boot, BIOS lacks it
- **Speed:** UEFI boots faster
- **Extensibility:** UEFI supports modular drivers, network boot
- **Compatibility:** BIOS for older systems, UEFI for modern hardware

---

## **Accessing and Configuring BIOS Settings**

**https://www.youtube.com/watch?v=HaFLZKwG4C0**

### **How to Access BIOS Settings:**

**When:** During boot-up, before OS loads

**Keys:** DEL, F2, ESC, F10, F12 (varies by manufacturer)

**Method:** Press key repeatedly at startup

**UEFI via OS:** Windows > Settings > Update & Security > Recovery > Advanced Startup > UEFI Firmware Settings

### **Common BIOS Settings to Configure:**

**https://www.youtube.com/watch?v=oJs27kJlhEc**

- **Boot Order/Priority:** Sets device boot sequence
- **Enabling/Disabling Devices:** Controls USB, audio, GPU, network adapters
- **Date and Time:** Sets system clock
- **Security Settings:** BIOS passwords, Secure Boot, TPM
- **Hardware Monitoring:** Checks temperatures, fan speeds, voltages
- **Overclocking:** Adjusts CPU/RAM settings (advanced)

### **Saving and Exiting BIOS:**

- Save and Exit: Applies changes, reboots
- Discard Changes and Exit: Leaves without saving
- Load Defaults: Restores factory settings

---

## **Firmware Updates and Flashing**

**https://m.youtube.com/watch?v=7AidNAFjsBw**

### **What is Firmware?**

Firmware is low-level software for motherboards, SSDs, routers, etc. Stored in EEPROM/flash memory, acts as hardware-OS intermediary.

### **Why Update Firmware?**

**https://www.youtube.com/watch?v=NhfAnfVnztM**

- Fixes bugs/security vulnerabilities
- Adds hardware support
- Improves stability
- Resolves OS/peripheral compatibility issues

### **Understanding Firmware Flashing:**

**https://www.youtube.com/watch?v=pazWRQt-IUE**

Flashing rewrites firmware in device memory. Uses manufacturer tools, requires stable power to avoid bricking.

### **Firmware Update Methods:**

**https://www.youtube.com/watch?v=Em7SRaG3L_0**

- **BIOS/UEFI Interface:** Tools like ASUS EZ Flash or MSI M-Flash use USB
- **Manufacturer Software:** Windows/Linux utilities
- **Bootable Media:** USB with flashing tools for non-booting systems
- **Network-Based:** Routers/NAS update via web interfaces

### **Precautions Before Firmware Flashing:**

- Confirm hardware model/version
- Use official firmware
- Ensure stable power (UPS recommended)
- Close apps
- Follow instructions
- Backup data

---

## **Common BIOS Issues and Reset Methods**

**https://youtu.be/Q0ZJTNSAXF8**

### **Common BIOS Issues:**

- Failure to Boot/No POST
- BIOS Password Lost
- Incorrect Settings
- BIOS Update Failure
- Hardware Not Detected

### **Symptoms of BIOS Problems:**

Black screen, beep codes, boot loops, "BIOS checksum error," incorrect date/time, missing devices

### **BIOS Reset Methods:**

- **BIOS Menu:** Select "Load Setup Defaults"
- **CMOS Jumper:** Move CLR_CMOS jumper to reset pins for 5–10 seconds
- **CMOS Battery:** Remove for 5–10 minutes, reinsert
- **BIOS Recovery:** Use manufacturer recovery modes for failed updates

---

## **📚 Summary**

BIOS and UEFI manage system initialization and hardware configuration. Understanding their differences, accessing settings, performing updates, and troubleshooting issues are essential skills for computer repair.
    `
  }
};
