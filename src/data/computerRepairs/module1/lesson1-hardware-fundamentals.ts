
import type { VideoLesson } from '@/types/course';
import { cpuContent } from './components/cpu-content';
import { ramContent } from './components/ram-content';
import { motherboardContent } from './components/motherboard-content';
import { psuContent } from './components/psu-content';
import { gpuContent } from './components/gpu-content';
import { storageContent } from './components/storage-content';
import { ioPortsContent } from './components/io-ports-content';
import { summaryContent } from './components/summary-content';

export const lesson1HardwareFundamentals: VideoLesson = {
  id: 1,
  title: 'Introduction to Computer Hardware',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
    textContent: `
# 🖥️ Module 1: Introduction to Computer Hardware

This module introduces learners to the core components of computers and laptops, laying the foundation for repair skills. By exploring the CPU, RAM, motherboard, PSU, GPU, storage devices, and I/O ports, students will understand how each part functions, interacts, and contributes to system performance. Through engaging videos and interactive simulations, learners will gain confidence in identifying components and diagnosing issues, setting the stage for hands-on repair tasks.

## Topics
- CPU, RAM, Motherboard, PSU, GPU

---

## Central Processing Unit (CPU)
[![CPU Explained](https://img.youtube.com/vi/mPzcsU8Cpco/0.jpg)](https://youtu.be/mPzcsU8Cpco)

**Definition:** Often called the "brain" of the computer, the CPU processes instructions and performs calculations, acting like a chef in a busy kitchen, coordinating tasks and executing programs swiftly.

**Function:** Executes program instructions through arithmetic, logic, control, and input/output operations.

**Key Features:**
- **Cores:** Multiple cores enable parallel processing, allowing simultaneous task execution, like a chef managing multiple dishes at once.
- **Clock Speed:** Measured in GHz, indicates cycles per second, determining processing speed.
- **Cache:** Fast on-chip memory storing frequently accessed data for quick retrieval.
- **Types:** Intel (Core i3, i5, i7, i9), AMD (Ryzen series).

**Common Issues:** Overheating, improper installation, bent pins, compatibility problems.

[CPU Explained Simply: The Brain of Your Computer 🧠 | What Does a CPU Do?](https://www.youtube.com/watch?v=mPzcsU8Cpco)

---

## Random Access Memory (RAM)
[![RAM Explained](https://img.youtube.com/vi/PVad0c2cljo/0.jpg)](https://www.youtube.com/watch?v=PVad0c2cljo)

**Definition:** Volatile memory that temporarily stores data and instructions for active programs, acting as a fast workspace that clears when powered off.

**Function:** Provides rapid read/write access for running applications.

**Key Features:**
- **DDR Standards:** DDR3, DDR4, DDR5 offer increasing speeds and efficiency.
- **Form Factors:** DIMM for desktops, SO-DIMM for laptops.
- **Capacity:** Measured in GB; more RAM supports multitasking and large applications.

**Common Issues:** Faulty or incompatible RAM causing crashes or blue screens.

[RAM Explained - Random Access Memory](https://www.youtube.com/watch?v=PVad0c2cljo)

---

## Motherboard
[![Motherboards Explained](https://img.youtube.com/vi/b2pd3Y6aBag/0.jpg)](https://youtu.be/b2pd3Y6aBag)

**Definition:** The main circuit board connecting all hardware components, serving as the system’s communication hub.

**Function:** Houses CPU socket, RAM slots, expansion slots, and connectors for storage and I/O.

**Key Features:**
- **Chipset:** Controls communication between CPU, RAM, and peripherals, determining compatibility.
- **BIOS/UEFI:** Firmware initializing hardware during boot, critical for system startup.

**Common Issues:** Damaged circuits, failing capacitors, BIOS corruption, faulty ports.

[Motherboards Explained](https://youtu.be/b2pd3Y6aBag)

---

## Power Supply Unit (PSU)
[![PSU Explained](https://img.youtube.com/vi/T6UhLAXMv5c/0.jpg)](https://youtu.be/T6UhLAXMv5c)

**Definition:** Converts AC power from the wall into DC power for computer components.

**Function:** Supplies regulated power at various voltages to all hardware.

**Key Features:**
- **Wattage:** Determines power capacity (e.g., 500W, 750W).
- **Efficiency Rating:** 80 PLUS certification ensures energy efficiency.
- **Connectors:** Includes motherboard, CPU, SATA, and PCIe power connectors.

**Common Issues:** Failure to power on, unstable voltages, overheating.

[PSU Explained - Basics of the Power Supply Unit](https://youtu.be/T6UhLAXMv5c)

---

## Graphics Processing Unit (GPU)
[![GPUs Explained](https://img.youtube.com/vi/LfdK-v0SbGI/0.jpg)](https://youtu.be/LfdK-v0SbGI)

**Definition:** Specialized processor for rendering images, videos, and animations.

**Function:** Handles graphics calculations, essential for gaming and video editing.

**Key Features:**
- **Types:** Integrated (built into CPU/motherboard) vs. dedicated (separate card with VRAM).
- **Common Brands:** NVIDIA GeForce, AMD Radeon.

**Common Issues:** Driver conflicts, overheating, screen artifacts.

[GPUs Explained](https://youtu.be/LfdK-v0SbGI)

---

## Storage Devices: HDD, SSD, NVMe
[![SSD vs HDD vs NVMe Explained](https://img.youtube.com/vi/r3Jy5dHOj3g/0.jpg)](https://youtu.be/r3Jy5dHOj3g)

**Key Features:**
- **Versatile Storage Solutions:** Learners explore HDDs for cost-effective bulk storage, SSDs for speed, and NVMe for high-performance tasks, enabling informed repair and upgrade decisions.

**HDD:** Uses spinning magnetic platters for data storage, offering large capacities at low cost.
- **Capacity:** Ranges from 500GB to several TB, ideal for mass storage.
- **Speed:** Slower read/write speeds (80-160 MB/s) due to mechanical parts.
- **Common Issues:** Clicking noises, bad sectors, mechanical failure.

**SSD:** Uses NAND flash memory for faster, more durable storage than HDDs.
- **Speed:** 200-550 MB/s for SATA SSDs, enhancing system responsiveness.
- **Durability:** No moving parts, resistant to shock and vibration.
- **Common Issues:** Firmware bugs, wear leveling over time.

**NVMe:** High-speed SSD interface using PCIe for ultra-fast data transfer.
- **Speed:** 2000-7000 MB/s, ideal for high-performance tasks.
- **Form Factors:** M.2 or U.2, requiring specific motherboard slots.
- **Common Issues:** Overheating, driver support needs.

[SSD vs HDD vs NVMe Explained](https://youtu.be/r3Jy5dHOj3g)

---

## I/O Ports: USB, HDMI, Ethernet, Audio
[![I/O Ports Explained](https://img.youtube.com/vi/Wb0xM_5iYl0/0.jpg)](https://youtu.be/Wb0xM_5iYl0)

**Key Features:**
- **Seamless Connectivity:** Learners master the role of USB, HDMI, Ethernet, and audio ports in connecting peripherals, enabling efficient troubleshooting and system integration.

**USB:** Interface for connecting peripherals like keyboards, mice, and storage devices.
- **Versions:** USB 1.1 (12 Mbps) to USB4 (40 Gbps).
- **Connectors:** Type-A, Type-C, Mini, Micro.
- **Common Issues:** Loose connections, driver conflicts.

**HDMI:** Transmits uncompressed audio/video to displays.
- **Versions:** HDMI 1.4 (4K@30Hz) to 2.1 (8K, high refresh rates).
- **Common Issues:** No signal, HDCP handshake failures.

**Ethernet:** Provides wired network connections via twisted pair cables.
- **Speeds:** Fast Ethernet (100 Mbps) to 10 Gigabit Ethernet.
- **Common Issues:** Damaged cables, configuration errors.

**Audio Ports:** Transmit audio input/output for headphones, microphones, and speakers.
- **Connectors:** 3.5mm, RCA, Optical, USB audio.
- **Common Issues:** No sound, ground loop noise.

[I/O Ports Explained](https://youtu.be/Wb0xM_5iYl0)

---

## Summary Table
| Component   | Function                        | Common Problems                |
|-------------|----------------------------------|-------------------------------|
| CPU         | Processes instructions and tasks | Overheating, compatibility    |
| RAM         | Temporary fast-access memory     | Faulty modules, blue screens  |
| Motherboard | Connects all components         | Damaged circuits, BIOS issues |
| PSU         | Powers the computer             | Power failures, overheating   |
| GPU         | Renders graphics                | Driver issues, overheating    |

---

## Quiz: Introduction to Computer Hardware (Module 1)
1. What is the primary function of the CPU in a computer?
   - A) Store user files
   - B) Render graphics
   - C) Execute program instructions
   - D) Supply power to the components
   - **Answer:** C) Execute program instructions
2. What does RAM do in a computer system?
   - A) Stores data permanently
   - B) Provides power to other components
   - C) Temporarily holds data for quick access
   - D) Connects all hardware parts together
   - **Answer:** C) Temporarily holds data for quick access
3. Which of the following is NOT a component found on a motherboard?
   - A) CPU socket
   - B) RAM slot
   - C) Power switch
   - D) PCIe slot
   - **Answer:** C) Power switch
4. What does the power supply unit (PSU) do?
   - A) Boosts graphics processing
   - B) Provides temporary data storage
   - C) Converts AC power to DC power
   - D) Connects to the internet
   - **Answer:** C) Converts AC power to DC power
5. Which specification indicates how fast a CPU can process instructions?
   - A) RAM speed
   - B) Clock speed (GHz)
   - C) Wattage
   - D) Cache size
   - **Answer:** B) Clock speed (GHz)
6. What is the function of the GPU?
   - A) Manage audio input
   - B) Perform graphical processing
   - C) Control boot-up sequences
   - D) Supply power to RAM
   - **Answer:** B) Perform graphical processing
7. Which type of GPU is integrated into the CPU or motherboard?
   - A) Dedicated GPU
   - B) External GPU
   - C) Integrated GPU
   - D) Modular GPU
   - **Answer:** C) Integrated GPU
8. Which of the following could be a symptom of a faulty RAM module?
   - A) No internet connection
   - B) Slow file downloads
   - C) Blue screen of death (BSOD)
   - D) No image on monitor
   - **Answer:** C) Blue screen of death (BSOD)
9. What determines how many applications a system can handle at once?
   - A) GPU clock speed
   - B) Motherboard model
   - C) PSU wattage
   - D) Amount of RAM
   - **Answer:** D) Amount of RAM
10. A failing PSU might cause which of the following issues?
    - A) High-resolution video lag
    - B) Loud audio output
    - C) Random system shutdowns
    - D) File corruption
    - **Answer:** C) Random system shutdowns
`
  }
};
