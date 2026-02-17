import { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Replacing RAM, HDD, SSD, and Motherboards',
  duration: '85 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/WwwkugPILgY',
    textContent: `
# Replacing RAM, HDD, SSD, and Motherboards

## **Performance-Boosting Upgrades**

Learners master selecting and installing RAM, HDD, SSD, and NVMe drives to improve system speed and capacity.

[https://youtu.be/WwwkugPILgY](https://youtu.be/WwwkugPILgY)

---

## **Understanding Memory (RAM) Upgrades**

**What is RAM?** Temporarily stores data for CPU access, improving multitasking and responsiveness.

**Types of RAM:** Desktop (DIMM), laptop (SO-DIMM); DDR3, DDR4, DDR5 (faster, lower power)

**Identifying RAM Specs:** Capacity (GB), speed (MHz), voltage (1.2–1.35V for DDR4), pins (DDR4 SO-DIMM: 260, DDR3: 204)

**Upgrading RAM:** Check motherboard support, match speeds/voltages, power off, insert at 45° angle, press until locked

---

## **Understanding Storage Upgrades**

**https://youtu.be/r3Jy5dHOj3g**

### **Types of Storage Devices:**

**HDD:** Magnetic, mechanical, slowest (~100 MB/s), 3.5" (desktop), 2.5" (laptop), SATA

**SSD:** Flash memory, faster (~500 MB/s), 2.5" or M.2, SATA/NVMe

**NVMe SSD:** PCIe, fastest (1,500–7,000 MB/s), M.2 (2280), PCIe

**Why Upgrade Storage?** Faster boot/load times, more space, lower noise/power use

---

## **Steps for Upgrading Storage**

1. **Check Compatibility:** Confirm motherboard supports SATA, M.2 SATA, or NVMe
2. **Backup Data:** Use external drive, cloud, NAS, or USB
3. **Physical Installation:** Power off, open case, remove old drive, install new drive, connect cables
4. **Configure BIOS/UEFI:** Verify drive detection, set boot order
5. **Initialize and Format Drive:** Use OS tools to partition/format

---

## **Identifying Form Factors**

**https://youtu.be/FU8YDnUtVls**

**Form Factor:** Physical size, shape, layout, connector type; dictates component fit and compatibility

### **Common Form Factors:**

**Memory (RAM):**
- DIMM: Desktop, 133.35 mm, 240 pins (DDR3/DDR4)
- SO-DIMM: Laptop, 67.6 mm, 204 (DDR3) or 260 (DDR4) pins

**Storage Devices:**
- 3.5" HDD: Desktop, SATA
- 2.5" HDD/SSD: Laptop/desktop, SATA
- M.2 SSD: Laptop/desktop, SATA/NVMe, 2280 size common
- PCIe Card SSD: Desktop, PCIe interface

**Motherboards:**
- ATX: Desktop, 305x244 mm
- Micro-ATX: Compact desktop, 244x244 mm
- Mini-ITX: Small desktop, 170x170 mm
- Laptop Motherboards: Custom, model-specific

---

## **Motherboard Removal and Replacement**

**https://youtu.be/b2pd3Y6aBag**

### **Precautions Before Starting**

Power off, unplug, use ESD strap, document connections, organize screws/workspace

### **Step-by-Step Motherboard Removal (Desktop)**

1. Remove Side Panel
2. Disconnect Cables/Components
3. Unscrew Motherboard
4. Remove Motherboard

### **Step-by-Step Motherboard Removal (Laptop)**

**https://www.youtube.com/watch?v=UM-9wAUQCdU**

1. Remove Battery/Power
2. Remove Back Cover
3. Disconnect/Remove Components
4. Unscrew Motherboard
5. Remove Motherboard

### **Replacing the Motherboard**

**https://www.youtube.com/watch?v=5hT_rpXWYxo**

1. Prepare New Motherboard
2. Place Motherboard
3. Secure Motherboard
4. Reconnect Cables/Components
5. Replace Covers/Battery

### **Post-Replacement Checks**

Verify connections, enter BIOS, confirm CPU/RAM/drive detection, check for errors, update BIOS if needed

---

## **📚 Summary**

Memory and storage upgrades enhance system performance through proper component selection, installation, and configuration. Motherboard replacement requires careful documentation and systematic reassembly.
    `
  }
};
