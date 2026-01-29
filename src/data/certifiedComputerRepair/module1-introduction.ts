import { Module } from '@/types/course';

const certifiedComputerRepairModule1: Module = {
  id: 1,
  title: 'Introduction to Computer Hardware',
  description: 'This module introduces learners to the core components of computers and laptops, laying the foundation for repair skills. By exploring the CPU, RAM, motherboard, PSU, GPU, storage devices, and I/O ports, students will understand how each part functions, interacts, and contributes to system performance.',
  lessons: [
    {
      id: 1,
      title: 'CPU, RAM, Motherboard, PSU, GPU',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# CPU, RAM, Motherboard, PSU, GPU

## Key Features
**Comprehensive Component Overview**: Learners gain a deep understanding of each hardware component's role, specifications, and common issues, enabling confident identification and troubleshooting. This foundational knowledge is critical for diagnosing and repairing systems effectively, aligning with industry standards like CompTIA A+.

The comprehensive overview ensures learners grasp the purpose and functionality of each component, from the CPU's processing power to the motherboard's connectivity. By studying specifications like clock speed, wattage, and compatibility, students can pinpoint issues such as overheating or faulty connections. Interactive diagrams and videos make complex concepts accessible, while real-world examples prepare learners for practical repair scenarios. This approach fosters a solid understanding of hardware interactions, essential for both personal repairs and professional certifications, ensuring learners are well-equipped to handle diverse repair challenges.

## Central Processing Unit (CPU)

**Definition**: Often called the "brain" of the computer, the CPU processes instructions and performs calculations, acting like a chef in a busy kitchen, coordinating tasks and executing programs swiftly.

**Function**: Executes program instructions through arithmetic, logic, control, and input/output operations.

### Key Features:
- **Cores**: Multiple cores enable parallel processing, allowing simultaneous task execution, like a chef managing multiple dishes at once.
- **Clock Speed**: Measured in GHz, indicates cycles per second, determining processing speed.
- **Cache**: Fast on-chip memory storing frequently accessed data for quick retrieval.
- **Types**: Intel (Core i3, i5, i7, i9), AMD (Ryzen series).
- **Common Issues**: Overheating, improper installation, bent pins, compatibility problems.

## Random Access Memory (RAM)

**Definition**: Volatile memory that temporarily stores data and instructions for active programs, acting as a fast workspace that clears when powered off.

**Function**: Provides rapid read/write access for running applications.

### Key Features:
- **DDR Standards**: DDR3, DDR4, DDR5 offer increasing speeds and efficiency.
- **Form Factors**: DIMM for desktops, SO-DIMM for laptops.
- **Capacity**: Measured in GB; more RAM supports multitasking and large applications.
- **Common Issues**: Faulty or incompatible RAM causing crashes or blue screens.

## Motherboard

**Definition**: The main circuit board connecting all hardware components, serving as the system's communication hub.

**Function**: Houses CPU socket, RAM slots, expansion slots, and connectors for storage and I/O.

### Key Features:
- **Chipset**: Controls communication between CPU, RAM, and peripherals, determining compatibility.
- **BIOS/UEFI**: Firmware initializing hardware during boot, critical for system startup.
- **Common Issues**: Damaged circuits, failing capacitors, BIOS corruption, faulty ports.

## Power Supply Unit (PSU)

**Definition**: Converts AC power from the wall into DC power for computer components.

**Function**: Supplies regulated power at various voltages to all hardware.

### Key Features:
- **Wattage**: Determines power capacity (e.g., 500W, 750W).
- **Efficiency Rating**: 80 PLUS certification ensures energy efficiency.
- **Connectors**: Includes motherboard, CPU, SATA, and PCIe power connectors.
- **Common Issues**: Failure to power on, unstable voltages, overheating.

## Graphics Processing Unit (GPU)

**Definition**: Specialized processor for rendering images, videos, and animations.

**Function**: Handles graphics calculations, essential for gaming and video editing.

### Key Features:
- **Types**: Integrated (built into CPU/motherboard) vs. dedicated (separate card with VRAM).
- **Common Brands**: NVIDIA GeForce, AMD Radeon.
- **Common Issues**: Driver conflicts, overheating, screen artifacts.
        `
      }
    },
    {
      id: 2,
      title: 'Storage Devices: HDD, SSD, NVMe',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/r3Jy5dHOj3g',
        textContent: `
# Storage Devices: HDD, SSD, NVMe

## Key Features
**Versatile Storage Solutions**: Learners explore HDDs for cost-effective bulk storage, SSDs for speed, and NVMe for high-performance tasks, enabling informed repair and upgrade decisions.

This section dives into the strengths of HDDs, SSDs, and NVMe drives, helping learners choose the right storage for specific needs. HDDs offer large capacities at low costs, ideal for backups, while SSDs and NVMe drives provide blazing-fast speeds for OS and gaming. Understanding their differences ensures learners can recommend upgrades or troubleshoot issues like slow boot times effectively, enhancing system performance and user satisfaction.

## Hard Disk Drive (HDD)
**Definition**: Uses spinning magnetic platters for data storage, offering large capacities at low cost.

### Key Features:
- **Capacity**: Ranges from 500GB to several TB, ideal for mass storage.
- **Speed**: Slower read/write speeds (80-160 MB/s) due to mechanical parts.
- **Common Issues**: Clicking noises, bad sectors, mechanical failure.

## Solid State Drive (SSD)
**Definition**: Uses NAND flash memory for faster, more durable storage than HDDs.

### Key Features:
- **Speed**: 200-550 MB/s for SATA SSDs, enhancing system responsiveness.
- **Durability**: No moving parts, resistant to shock and vibration.
- **Common Issues**: Firmware bugs, wear leveling over time.

## NVMe (Non-Volatile Memory Express)
**Definition**: High-speed SSD interface using PCIe for ultra-fast data transfer.

### Key Features:
- **Speed**: 2000-7000 MB/s, ideal for high-performance tasks.
- **Form Factors**: M.2 or U.2, requiring specific motherboard slots.
- **Common Issues**: Overheating, driver support needs.
        `
      }
    },
    {
      id: 3,
      title: 'I/O Ports: USB, HDMI, Ethernet, Audio',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/Wb0xM_5iYl0',
        textContent: `
# I/O Ports: USB, HDMI, Ethernet, Audio

## Key Features
**Seamless Connectivity**: Learners master the role of USB, HDMI, Ethernet, and audio ports in connecting peripherals, enabling efficient troubleshooting and system integration.

This section equips learners with the knowledge to manage connectivity through various I/O ports. USB ports enable versatile peripheral connections, HDMI delivers high-quality audio/video, Ethernet ensures stable networking, and audio ports support sound input/output. Understanding their specifications and common issues ensures learners can diagnose connectivity problems and recommend solutions for seamless device integration, enhancing user experience.

## Universal Serial Bus (USB)
**Definition**: Interface for connecting peripherals like keyboards, mice, and storage devices.

### Key Features:
- **Versions**: USB 1.1 (12 Mbps) to USB4 (40 Gbps).
- **Connectors**: Type-A, Type-C, Mini, Micro.
- **Common Issues**: Loose connections, driver conflicts.

## High-Definition Multimedia Interface (HDMI)
**Definition**: Transmits uncompressed audio/video to displays.

### Key Features:
- **Versions**: HDMI 1.4 (4K@30Hz) to 2.1 (8K, high refresh rates).
- **Common Issues**: No signal, HDCP handshake failures.

## Ethernet Port (RJ-45)
**Definition**: Provides wired network connections via twisted pair cables.

### Key Features:
- **Speeds**: Fast Ethernet (100 Mbps) to 10 Gigabit Ethernet.
- **Common Issues**: Damaged cables, configuration errors.

## Audio Ports
**Definition**: Transmit audio input/output for headphones, microphones, and speakers.

### Key Features:
- **Connectors**: 3.5mm, RCA, Optical, USB audio.
- **Common Issues**: No sound, ground loop noise.
        `
      }
    },
    {
      id: 4,
      title: 'Quiz: Introduction to Computer Hardware',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary function of the CPU in a computer?',
            options: ['Store user files', 'Render graphics', 'Execute program instructions', 'Supply power to the components'],
            correct: 2,
            explanation: 'The CPU (Central Processing Unit) is responsible for executing program instructions and performing calculations.'
          },
          {
            question: 'What does RAM do in a computer system?',
            options: ['Stores data permanently', 'Provides power to other components', 'Temporarily holds data for quick access', 'Connects all hardware parts together'],
            correct: 2,
            explanation: 'RAM (Random Access Memory) temporarily stores data and instructions for active programs, providing rapid read/write access.'
          },
          {
            question: 'Which of the following is NOT a component found on a motherboard?',
            options: ['CPU socket', 'RAM slot', 'Power switch', 'PCIe slot'],
            correct: 2,
            explanation: 'The power switch is typically located on the computer case, not on the motherboard itself.'
          },
          {
            question: 'What does the power supply unit (PSU) do?',
            options: ['Boosts graphics processing', 'Provides temporary data storage', 'Converts AC power to DC power', 'Connects to the internet'],
            correct: 2,
            explanation: 'The PSU converts AC power from the wall outlet into DC power that computer components can use.'
          },
          {
            question: 'Which specification indicates how fast a CPU can process instructions?',
            options: ['RAM speed', 'Clock speed (GHz)', 'Wattage', 'Cache size'],
            correct: 1,
            explanation: 'Clock speed, measured in GHz, indicates how many cycles per second the CPU can process.'
          },
          {
            question: 'What is the function of the GPU?',
            options: ['Manage audio input', 'Perform graphical processing', 'Control boot-up sequences', 'Supply power to RAM'],
            correct: 1,
            explanation: 'The GPU (Graphics Processing Unit) handles graphics calculations and renders images, videos, and animations.'
          },
          {
            question: 'Which type of GPU is integrated into the CPU or motherboard?',
            options: ['Dedicated GPU', 'External GPU', 'Integrated GPU', 'Modular GPU'],
            correct: 2,
            explanation: 'Integrated GPUs are built into the CPU or motherboard, while dedicated GPUs are separate cards.'
          },
          {
            question: 'Which of the following could be a symptom of a faulty RAM module?',
            options: ['No internet connection', 'Slow file downloads', 'Blue screen of death (BSOD)', 'No image on monitor'],
            correct: 2,
            explanation: 'Faulty RAM can cause system crashes and blue screen errors due to memory corruption.'
          },
          {
            question: 'What determines how many applications a system can handle at once?',
            options: ['GPU clock speed', 'Motherboard model', 'PSU wattage', 'Amount of RAM'],
            correct: 3,
            explanation: 'The amount of RAM determines how many applications can run simultaneously and how much data can be processed at once.'
          },
          {
            question: 'A failing PSU might cause which of the following issues?',
            options: ['High-resolution video lag', 'Loud audio output', 'Random system shutdowns', 'File corruption'],
            correct: 2,
            explanation: 'A failing power supply can cause random system shutdowns due to unstable power delivery.'
          }
        ]
      }
    }
  ]
};

export default certifiedComputerRepairModule1; 