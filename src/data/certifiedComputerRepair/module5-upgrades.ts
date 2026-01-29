import { Module } from '@/types/course';

const certifiedComputerRepairModule5: Module = {
  id: 5,
  title: 'Replacing RAM, HDD, SSD, and Motherboards',
  description: 'This module equips learners with the skills to upgrade and replace critical system components, including RAM, HDD, SSD, and motherboards, to enhance performance and resolve hardware failures. Students will learn to identify compatible components, perform safe installations, and troubleshoot issues.',
  lessons: [
    {
      id: 17,
      title: 'Memory and Storage Upgrades',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/WwwkugPILgY',
        textContent: `
# Memory and Storage Upgrades

## Key Features
**Performance-Boosting Upgrades**: Learners master selecting and installing RAM, HDD, SSD, and NVMe drives to improve system speed and capacity.

This section covers upgrading memory and storage to enhance system performance, including identifying compatible RAM types (DDR3, DDR4, DDR5) and storage devices (HDD, SSD, NVMe). Video tutorials and simulations teach safe installation and data backup techniques, ensuring learners can perform upgrades confidently and align with professional repair standards.

## Understanding Memory (RAM) Upgrades

**What is RAM?**: Temporarily stores data for CPU access, improving multitasking and responsiveness.
**Types of RAM**: Desktop (DIMM), laptop (SO-DIMM); DDR3, DDR4, DDR5 (faster, lower power).
**Identifying RAM Specs**: Capacity (GB), speed (MHz), voltage (1.2–1.35V for DDR4), pins (DDR4 SO-DIMM: 260, DDR3: 204).
**Upgrading RAM**: Check motherboard support, match speeds/voltages, power off, insert at 45° angle, press until locked.

## Understanding Storage Upgrades

**Types of Storage Devices**:
- **HDD**: Magnetic, mechanical, slowest (~100 MB/s), 3.5" (desktop), 2.5" (laptop), SATA.
- **SSD**: Flash memory, faster (~500 MB/s), 2.5" or M.2, SATA/NVMe.
- **NVMe SSD**: PCIe, fastest (1,500–7,000 MB/s), M.2 (2280), PCIe.

**Why Upgrade Storage?**: Faster boot/load times, more space, lower noise/power use.
**HDD to SSD Upgrade**: SSDs offer speed/durability; swap drives, reinstall/clone OS.
**NVMe SSD Advantages**: Ultra-fast PCIe, M.2 form factor, motherboard compatibility required.

## Steps for Upgrading Storage
1. **Check Compatibility**: Confirm motherboard supports SATA, M.2 SATA, or NVMe; verify space/connectors.
2. **Backup Data**: Use external drive, cloud, NAS, or USB; commands like robocopy (Windows), rsync (Linux/macOS), or dd (Linux, caution).
3. **Physical Installation**: Power off, open case, remove old drive, install new drive, connect cables.
4. **Configure BIOS/UEFI**: Verify drive detection, set boot order for OS installation.
5. **Initialize and Format Drive**: Use OS tools to partition/format, install OS or restore backup.

## Additional Considerations
**Mixing Storage Devices**: Use SSD for boot, HDD for bulk storage, manage via OS settings.
**Performance Impact**: More RAM reduces disk swapping; faster storage boosts responsiveness.

## Safety Precautions
- Use anti-static wrist straps.
- Handle RAM by edges, avoid pin damage.

## Troubleshooting Upgrades
- **System Does Not Boot After RAM Upgrade**: Incorrect seating/incompatible RAM; re-seat, verify compatibility.
- **Storage Device Not Detected**: Loose connection/unsupported format; check cables, BIOS settings.
- **System Slow After Upgrade**: RAM speed mismatch/insufficient storage; use matched RAM, free space.
        `
      }
    },
    {
      id: 18,
      title: 'Identifying Form Factors',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/FU8YDnUtVls',
        textContent: `
# Identifying Form Factors

## Key Features
**Component Compatibility**: Learners master identifying RAM, storage, and motherboard form factors to ensure proper fit and functionality.

This section teaches learners to recognize physical sizes, shapes, and connectors for RAM, storage, and motherboards, ensuring compatibility during upgrades. Video tutorials and simulations provide practical identification skills, preparing learners for professional repairs and certification.

## What is a Form Factor?
**Form Factor**: Physical size, shape, layout, connector type; dictates component fit and compatibility.

## Common Form Factors in Computer Repair

### Memory (RAM):
- **DIMM**: Desktop, 133.35 mm, 240 pins (DDR3/DDR4).
- **SO-DIMM**: Laptop, 67.6 mm, 204 (DDR3) or 260 (DDR4) pins.

### Storage Devices:
- **3.5" HDD**: Desktop, SATA.
- **2.5" HDD/SSD**: Laptop/desktop, SATA.
- **M.2 SSD**: Laptop/desktop, SATA/NVMe, 2280 size common.
- **PCIe Card SSD**: Desktop, PCIe interface.

### Motherboards:
- **ATX**: Desktop, 305x244 mm.
- **Micro-ATX**: Compact desktop, 244x244 mm.
- **Mini-ITX**: Small desktop, 170x170 mm.
- **Laptop Motherboards**: Custom, model-specific.

## Why Identifying Form Factors Matters
Ensures compatibility, prevents damage, saves time, aids upgrade planning.

## How to Identify Form Factors
Check labels/markings, measure dimensions, consult manuals, compare connectors/pins, use online databases.

## Examples
- **RAM**: SO-DIMM DDR4 won't fit DIMM slots.
- **Storage**: 3.5" HDD incompatible with laptops; 2.5" SSD required.
- **Motherboard**: ATX case incompatible with Mini-ITX mounting holes.

## Practical Tips
- Power off/unplug before inspecting.
- Measure with ruler/caliper if unsure.
- Keep compatibility chart handy.
- Verify model numbers before ordering.
        `
      }
    },
    {
      id: 19,
      title: 'Motherboard Removal and Replacement',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/b2pd3Y6aBag',
        textContent: `
# Motherboard Removal and Replacement

## Key Features
**Critical Component Replacement**: Learners master safe removal and replacement of motherboards, ensuring system functionality and compatibility.

This section covers the step-by-step process for removing and replacing motherboards in desktops and laptops, including precautions and testing. Video tutorials and simulations teach safe handling and reconnection, preparing learners for professional repairs and CompTIA A+ certification.

## Introduction to the Motherboard
**Motherboard**: Main PCB connecting CPU, RAM, storage, GPU, power; houses sockets/slots.

## Precautions Before Starting
Power off, unplug, use ESD strap, document connections, organize screws/workspace.

## Tools Required
Phillips/flathead screwdrivers, anti-static wrist strap, plastic pry tools, tweezers, thermal paste.

## Step-by-Step Motherboard Removal (Desktop)
1. **Remove Side Panel**: Unscrew, slide off case panel.
2. **Disconnect Cables/Components**: Unplug 24-pin ATX, CPU power, SATA, front panel, remove expansion cards, RAM.
3. **Unscrew Motherboard**: Remove screws from standoffs, track locations.
4. **Remove Motherboard**: Lift gently, avoid snagging ports/cables.

## Step-by-Step Motherboard Removal (Laptop)
1. **Remove Battery/Power**: Power off, unplug, remove battery.
2. **Remove Back Cover**: Unscrew, pry open cover.
3. **Disconnect/Remove Components**: Unplug ribbon cables, storage, RAM, fan, heat sink.
4. **Unscrew Motherboard**: Remove mounting screws, note lengths.
5. **Remove Motherboard**: Lift gently, avoid damaging connectors.

## Replacing the Motherboard
1. **Prepare New Motherboard**: Inspect, transfer CPU/RAM/cooling, apply thermal paste.
2. **Place Motherboard**: Align with standoffs/ports, ensure proper fit.
3. **Secure Motherboard**: Insert screws, avoid overtightening.
4. **Reconnect Cables/Components**: Reattach power, SATA, front panel, RAM, storage, fan, display cables.
5. **Replace Covers/Battery**: Close case, replace screws/battery.

## Post-Replacement Checks
Verify connections, enter BIOS, confirm CPU/RAM/drive detection, check for errors, update BIOS if needed.

## Common Issues and Troubleshooting
- **No Power/POST**: Check power connections/standoffs.
- **Peripherals Not Working**: Verify cable seating.
- **Overheating**: Confirm cooling system/thermal paste.
- **BIOS Errors**: Reset CMOS, update BIOS.

## Summary
Motherboard replacement requires careful documentation, safety precautions, and systematic reassembly. Learners will master removal, installation, and testing, ensuring professional repairs.
        `
      }
    },
    {
      id: 20,
      title: 'Quiz: Memory, Storage, and Motherboard Upgrades',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which of the following memory types is commonly used in laptops?',
            options: ['DIMM', 'SO-DIMM', 'SIMM', 'L-DIMM'],
            correct: 1,
            explanation: 'SO-DIMM (Small Outline DIMM) is the memory type commonly used in laptops due to its smaller size.'
          },
          {
            question: 'What is the main benefit of upgrading from an HDD to an SSD?',
            options: ['Increased power consumption', 'Louder operation', 'Faster boot and load times', 'Larger physical size'],
            correct: 2,
            explanation: 'SSDs provide significantly faster boot and load times compared to traditional HDDs.'
          },
          {
            question: 'Which storage interface provides the highest speed performance?',
            options: ['SATA', 'NVMe (PCIe)', 'USB 2.0', 'IDE'],
            correct: 1,
            explanation: 'NVMe (Non-Volatile Memory Express) using PCIe provides the highest speed performance for storage devices.'
          },
          {
            question: 'Before installing or removing RAM, what safety measure should you take first?',
            options: ['Turn on the computer to discharge capacitors', 'Use a magnetic screwdriver', 'Wear an anti-static wrist strap', 'Heat the RAM module'],
            correct: 2,
            explanation: 'Always wear an anti-static wrist strap to prevent electrostatic discharge that could damage the RAM or other components.'
          },
          {
            question: 'What does the "M.2" form factor describe?',
            options: ['Motherboard size', 'Monitor resolution', 'Storage device type', 'RAM configuration'],
            correct: 2,
            explanation: 'M.2 is a form factor for storage devices, particularly SSDs, that are smaller and faster than traditional 2.5" drives.'
          },
          {
            question: 'What is the correct installation angle for inserting RAM into a slot?',
            options: ['90 degrees straight down', '30 degrees and twist', '45 degrees then press down', 'Horizontally slide in'],
            correct: 2,
            explanation: 'RAM should be inserted at a 45-degree angle and then pressed down until it clicks into place.'
          },
          {
            question: 'Which form factor is the standard for full-sized desktop motherboards?',
            options: ['Mini-ITX', 'Micro-ATX', 'ATX', 'Nano-ITX'],
            correct: 2,
            explanation: 'ATX (Advanced Technology eXtended) is the standard form factor for full-sized desktop motherboards.'
          },
          {
            question: 'What should you do before replacing a storage drive to prevent data loss?',
            options: ['Format the drive', 'Defragment the old drive', 'Back up important data', 'Unplug the keyboard'],
            correct: 2,
            explanation: 'Always back up important data before replacing a storage drive to prevent data loss.'
          },
          {
            question: 'If your system doesn\'t boot after a RAM upgrade, what\'s the most likely cause?',
            options: ['The CPU is overheating', 'The power supply is too strong', 'RAM is not properly seated or is incompatible', 'The CMOS battery is too new'],
            correct: 2,
            explanation: 'The most common cause of boot failure after a RAM upgrade is that the RAM is not properly seated or is incompatible with the motherboard.'
          },
          {
            question: 'What should you check in BIOS after replacing a motherboard or storage device?',
            options: ['The desktop wallpaper', 'USB driver status', 'Boot order and component detection', 'Printer connectivity'],
            correct: 2,
            explanation: 'After replacing a motherboard or storage device, you should check the boot order and ensure all components are properly detected in BIOS.'
          }
        ]
      }
    }
  ]
};

export default certifiedComputerRepairModule5; 