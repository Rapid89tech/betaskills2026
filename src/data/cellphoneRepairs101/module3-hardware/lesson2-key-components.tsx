import type { VideoLesson } from '@/types/course';

export const lesson2KeyComponents: VideoLesson = {
  id: 2,
  title: 'The Role of Key Components: Processors, Memory Chips, and Display Modules',
  duration: '55 minutes',
  type: 'video',
  content: {
    videoUrl: 'GDYrCD5KlDg',
    textContent: `## The Role of Key Components: Processors, Memory Chips, and Display Modules

### Processors (CPU/SoC): The Central Nervous System

The processor, or System-on-Chip (SoC), is the smartphone's computational core, integrating the CPU, GPU, modem, neural engine, and power management into a single chip. Examples include Apple's A-series (e.g., A16 Bionic), Qualcomm Snapdragon, Samsung Exynos, MediaTek Dimensity, and Google Tensor. The SoC determines performance in multitasking, gaming, AI tasks (e.g., voice recognition), and battery efficiency. Soldered to the motherboard via BGA (Ball Grid Array), processors are rarely replaced due to complexity, requiring micro-soldering, hot air stations, and reflow machines for tasks like reballing or chip replacement. Failure symptoms include boot failures, lagging, overheating, or app crashes, often caused by drops, liquid damage, or thermal stress. Diagnostics involve visual inspection for physical damage, multimeter voltage checks, or power supply tester analysis of boot behavior. Technicians must understand SoC architecture to diagnose motherboard issues accurately and decide whether repair or replacement is viable. This knowledge is critical for advanced repairs, ensuring technicians can address performance issues and maintain device reliability for customers.

### Memory Chips: RAM and Internal Storage

Memory chips, encompassing RAM (Random Access Memory) and internal storage (e.g., NAND Flash, eMMC, UFS), manage data processing and storage. **RAM** (4–16GB in modern phones) handles active processes, enabling multitasking; faults cause app crashes, freezes, or boot loops. **Internal storage** (32GB–1TB) stores the OS, apps, and user data; failures lead to boot errors, data loss, or "No OS" messages. Both are soldered to the motherboard, requiring advanced tools like NAND programmers or eMMC readers for repair or data recovery. Diagnostics involve software tools (e.g., ADB, DFU mode) to detect corruption or hardware issues, and microscopes to inspect solder joints. Common issues include corrupted storage from failed updates or physical damage from drops. Replacing memory chips demands micro-soldering skills and precise reballing to avoid motherboard damage. Technicians must prioritize data recovery before chip replacement and use OEM parts to ensure compatibility. Understanding memory chip roles and failure patterns enables accurate diagnostics, effective repairs, and data preservation, critical for customer satisfaction and professional credibility.`
  }
};
