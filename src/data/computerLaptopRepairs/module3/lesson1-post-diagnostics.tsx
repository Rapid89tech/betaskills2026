import { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Diagnosing POST Errors and Hardware Issues',
  duration: '80 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/F78v7edrNeA',
    textContent: `
# Diagnosing POST Errors and Hardware Issues

## **Systematic Hardware Diagnostics**

Learners develop expertise in identifying and resolving POST errors, enabling rapid isolation of hardware issues for efficient repairs.

This section covers the Power-On Self-Test (POST), a critical BIOS/UEFI diagnostic process that checks essential hardware before booting.

[https://youtu.be/F78v7edrNeA](https://youtu.be/F78v7edrNeA)

---

## **POST Process Overview**

**Power-On Self-Test (POST):** Diagnostic sequence run by BIOS/UEFI at startup.

POST checks CPU, RAM, motherboard chipset, graphics card, and peripherals, ensuring functionality before booting the OS.

### **Process:**
1. Power supplied
2. BIOS initializes
3. Components checked
4. Control passed to boot loader if no issues

### **Common Outputs:**
- **Beep codes** (e.g., 1 short for success)
- **LED patterns**
- **Error messages**
- **POST card codes**

---

## **Common POST Beep Codes**

- **1 Short Beep:** POST completed successfully
- **Continuous Beeps:** Power supply or motherboard issue
- **1 Long, 2 Short Beeps:** Graphics card error
- **3 Short Beeps:** RAM failure
- **5 Short Beeps:** CPU failure
- **No Beep:** Power, motherboard, or speaker issue

**Note:** Check motherboard manual for BIOS-specific codes (AMI, Award, Phoenix).

---

## **Common POST Error Messages**

**https://youtu.be/QvIVtmFq2cw**

- **Keyboard Error or No Keyboard Present:** Keyboard not connected or faulty
- **CMOS Checksum Error:** Corrupted BIOS settings or bad CMOS battery
- **No Boot Device Found:** Hard drive disconnected or failed
- **Memory Test Failed:** Faulty RAM
- **CPU Fan Error:** Fan not connected or malfunctioning

---

## **Diagnostic Steps for POST Errors**

1. **Listen and Count Beeps:** Identify pattern and refer to BIOS documentation
2. **Observe LED or Display Code:** Check onboard LEDs or numeric displays
3. **Check Hardware Connections:** Reseat RAM, GPU, and power cables; disconnect peripherals
4. **Test with Minimum Hardware:** Use only motherboard, CPU, cooler, RAM, PSU
5. **Clear CMOS/Reset BIOS:** Remove battery or use jumper for 1–2 minutes
6. **Use Diagnostic Tools:** POST cards for desktops, built-in diagnostics (F12/F9) for laptops

---

## **Common Hardware Issues**

### **Power Issues**

**https://www.youtube.com/watch?v=-u8Ioz1EaMc**

**Symptoms:** No power, no LEDs/fans, unexpected shutdowns, intermittent power loss

**Causes:** Faulty PSU, damaged power cable, defective DC jack, dead CMOS battery

**Fix:** Check/replace PSU or adapter, inspect cables, reseat/replace DC jack, test CMOS battery

### **Hard Drive/Storage Issues**

**https://youtu.be/OdlW3LyDz14**

**Symptoms:** OS won't boot, clicking noises, "Operating system not found," slow access/freezes

**Causes:** Drive failure, loose SATA/M.2 connection, corrupted file system, bad sectors

**Fix:** Use CrystalDiskInfo, reconnect/replace drive, attempt data recovery, reformat or replace

### **Display Problems**

**https://youtu.be/2uOZbmbIHDA**

**Symptoms:** Blank screen, flickering, lines, dim backlight

**Causes:** Loose/damaged display cable, faulty GPU, damaged screen, failed inverter

**Fix:** Reseat cable, test with external monitor, replace screen/GPU, check backlight/inverter

### **Overheating and Cooling Issues**

**https://youtu.be/1PTRCc_BRtQ**

**Symptoms:** Shutdowns, high fan noise, hot case, CPU/GPU throttling

**Causes:** Dust buildup, dried thermal paste, faulty fan, blocked airflow

**Fix:** Clean vents/fans, replace thermal paste, check fan in BIOS, replace faulty fan

---

## **Using Multimeters and Diagnostic Software**

**https://youtu.be/c89RojX624U**

### **How to Use a Multimeter for PC Repairs**

- **Testing a Laptop Charger/Adapter:** Set to DC Voltage (20V), test outer (ground) and inner pin (positive), compare to rating (~19V)
- **Testing a CMOS Battery:** Set to DC Voltage, expect ~3V for CR2032
- **Checking Continuity of a DC Jack:** Set to Continuity mode, test terminals for beep
- **Measuring Resistance in Fuses/Traces:** Expect near 0 ohms for continuity

### **Using Diagnostic Software**

**Common Tools:**
- **MemTest86:** Tests RAM errors/stability
- **CrystalDiskInfo:** Checks HDD/SSD S.M.A.R.T. data
- **HWiNFO/HWMonitor:** Monitors temps, fan speeds, voltages
- **CPU-Z/GPU-Z:** Identifies processor/graphics hardware
- **Speccy:** Provides detailed hardware profile
- **PC Doctor/PassMark:** Comprehensive system testing
- **BIOS Diagnostic Tools:** Built-in tests (F2, F12, Esc)

---

## **📚 Summary**

Diagnosing POST errors and hardware issues requires systematic testing, understanding beep codes, and using diagnostic tools. Learners will master troubleshooting techniques to isolate and resolve hardware problems efficiently.
    `
  }
};
