import { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Power Supply & Battery Repair',
  duration: '70 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/wqL3ZT26i4c',
    textContent: `
# Power Supply & Battery Repair

## **Comprehensive Power Diagnostics**

Learners develop expertise in identifying and resolving power issues, from dead systems to battery failures, ensuring reliable device operation.

[https://youtu.be/wqL3ZT26i4c](https://youtu.be/wqL3ZT26i4c)

---

## **Types of Power Issues**

### **No Power / Dead System**

**https://youtu.be/ba4ToTzqF2o**

**Symptoms:** No lights, sounds, display, fan movement, or charging indicators

**Possible Causes:** Faulty AC adapter, damaged DC jack, shorted motherboard circuit, blown fuse, dead battery/CMOS battery

**Solutions:** Test charger with multimeter (~19V), check DC jack continuity, use known good battery/charger, inspect motherboard for damage

### **Battery Not Charging**

**https://youtu.be/Gdditi3KvW0**

**Symptoms:** Runs only on AC, "Not Charging" status, stuck percentage, no charging light

**Possible Causes:** Faulty battery, defective adapter, malfunctioning charging circuit/BMS, outdated BIOS

**Solutions:** Replace battery, test adapter voltage, update BIOS, reseat/clean connectors

### **Intermittent Power / Random Shutdowns**

**https://youtu.be/ipTyEY-fGNA**

**Symptoms:** Random power-offs, multiple boot attempts, sudden restarts

**Possible Causes:** Overheating, power supply instability, loose motherboard/battery connector

**Solutions:** Clean fan/heatsink, replace thermal paste, replace adapter, reseat RAM/drive

---

## **Laptop Battery Replacement**

### **Understanding Laptop Batteries**

**Battery Types:** Li-ion (high capacity, durable), Li-Po (slimmer, sensitive)

**Form Factors:** Removable (external latches), internal (requires disassembly)

### **Signs of a Failing Battery**

**https://youtu.be/ba4ToTzqF2o**

- Rapid Discharge
- Laptop Shuts Off Randomly
- Battery Not Detected
- Battery Status "Replace Soon" or "Not Charging"
- Physical Bulging (Critical - requires immediate replacement)

### **Tools Required for Battery Replacement**

Phillips/Torx screwdrivers, plastic spudger, anti-static wrist strap, replacement battery (OEM recommended), tweezers, multimeter

### **Battery Replacement Procedure**

**For Removable Batteries:** Power off, unplug, slide latches, remove, insert new battery, secure, test boot-up

**For Internal Batteries:** Power off, unplug, use ESD strap, remove bottom panel, disconnect cable, unscrew battery, remove, install new battery, reassemble, test

### **Safety Precautions**

- Never puncture/bend battery (fire hazard)
- Avoid third-party batteries unless verified
- Isolate swollen batteries in fire-safe bags, do not reuse
- Dispose at certified e-waste centers

---

## **DC Jack and Adapter Testing**

**https://youtu.be/AdGHqfVFQdY**

### **Understanding the Components**

**DC Jack:** Connects external power to motherboard, soldered or cable-attached

**Adapter/Charger:** Converts AC to DC (~19V, 3.42A), uses barrel/USB-C connector

### **Common Symptoms**

- Laptop Not Charging
- Adapter Light Off When Plugged
- Hot Adapter
- Loose/Wobbly Connector
- Intermittent Charging

### **Testing the Laptop Adapter**

**https://youtu.be/SW5c5b7b6AY**

1. Check Label Specifications: Confirm output (~19V, 3.42A)
2. Set Multimeter to DC Voltage
3. Red probe to inner pin (positive), black to outer ring (ground)
4. Expect ~19V
5. Wiggle Test: Check for voltage fluctuations

### **Testing the DC Jack**

**https://youtu.be/AdGHqfVFQdY**

- Visual Inspection: Check for cracks, bent pins, looseness, burn marks
- Power-On Voltage Test: Measure battery terminals (~12–19V)
- Continuity Test: Disconnect power/battery, test pin-to-motherboard trace
- Live Voltage Test: Probe jack terminals for incoming voltage

### **Repair or Replacement**

**https://youtu.be/b5rtZZB06fU**

**DC Jack:** Replace cable-type or desolder board-soldered jacks, ensure clean pads

**Adapter:** Match voltage, current, connector type, prefer OEM

---

## **📚 Summary**

Power supply and battery repair requires systematic diagnosis using multimeters, understanding common issues, and performing safe replacements. Learners will master power system troubleshooting for reliable repairs.
    `
  }
};
