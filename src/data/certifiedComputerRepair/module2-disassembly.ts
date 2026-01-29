import { Module } from '@/types/course';

const certifiedComputerRepairModule2: Module = {
  id: 2,
  title: 'Laptop Disassembly and Identification',
  description: 'This module equips learners with the skills to safely disassemble laptops and identify key components, focusing on the battery, cooling fan, keyboard, and screen. Students will master the use of essential tools and ESD safety precautions, ensuring they can handle delicate hardware without damage.',
  lessons: [
    {
      id: 5,
      title: 'Laptop Parts: Battery, Cooling Fan, Keyboard, Screen',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/zKAdv-dTL5I',
        textContent: `
# Laptop Parts: Battery, Cooling Fan, Keyboard, Screen

## Key Features
**Comprehensive Component Mastery**: Learners develop expertise in identifying, handling, and maintaining critical laptop parts, enabling safe disassembly and effective repairs.

This section provides in-depth knowledge of laptop components like the battery, cooling fan, keyboard, and screen, crucial for successful repairs. By understanding their functions, specifications, and common issues, learners can diagnose problems like battery swelling or screen flickering and perform maintenance or replacements. Video tutorials and virtual simulations make complex disassembly processes accessible, while practical tips ensure safe handling, aligning with professional repair standards and preparing learners for CompTIA A+ certification.

## Battery

**Purpose**: Provides portable power to the laptop when not connected to an external power source.

### Key Features:
- **Types**: Lithium-ion (Li-ion) and Lithium-polymer (Li-Po) offer high energy density and flexibility.
- **Components**: Cells and battery management system (BMS) monitor charge, temperature, and health.
- **Key Specs**: Voltage (e.g., 11.1V, 14.8V) and capacity (mAh or Wh) determine battery life.
- **Common Issues**: Reduced life, swelling, failure to charge due to faulty circuits or DC jack.
- **Maintenance Tips**: Avoid full discharges, keep cool, use approved chargers.

## Cooling Fan

**Purpose**: Prevents overheating by dissipating heat from CPU, GPU, and other components.

### Key Features:
- **Components**: Fan blades, motor, air vents, and heat sinks (copper or aluminum).
- **Operation**: Fans adjust speed based on temperature sensors and system load.
- **Common Issues**: Noise from dust, fan failure causing shutdowns, blocked vents.
- **Maintenance Tips**: Clean regularly, replace faulty fans, avoid blocking vents.

## Keyboard

**Purpose**: Primary input device for typing and controlling the laptop.

### Key Features:
- **Types**: Membrane (cost-effective) and mechanical (rare in laptops).
- **Components**: Keycaps, membrane/switches, ribbon cable to motherboard.
- **Common Issues**: Stuck/unresponsive keys, ribbon cable damage, liquid spills.
- **Maintenance Tips**: Clean regularly, avoid spills, replace after damage.

## Screen (Display)

**Purpose**: Visual output device for displaying the OS, applications, and videos.

### Key Features:
- **Types**: LCD, LED, IPS, and TN panels offer varied performance.
- **Components**: LCD panel, backlight, digitizer (touchscreens), display cable.
- **Common Issues**: Dead pixels, flickering, cracks, backlight failure.
- **Maintenance Tips**: Handle gently, avoid flexing, replace faulty parts.
        `
      }
    },
    {
      id: 6,
      title: 'Tools for Disassembly',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/huJFlml1zuM',
        textContent: `
# Tools for Disassembly

## Key Features
**Safe and Efficient Disassembly**: Learners master the use of specialized tools to disassemble laptops safely, preventing damage to delicate components.

This section covers essential tools like precision screwdrivers, pry tools, and anti-static straps, critical for safe laptop disassembly. Learners will understand each tool's function, from removing screws to handling delicate connectors, ensuring damage-free repairs. Video demonstrations and practical exercises teach proper tool use, aligning with professional repair standards and preparing learners for hands-on tasks.

## Essential Disassembly Tools and Their Functions

### Precision Screwdriver Set
Removes small screws (Phillips, Torx, flathead).
Screwdrivers are vital for accessing laptop interiors. Learners will select correct sizes to avoid stripping screws, ensuring smooth disassembly and reassembly.

### Plastic Pry Tools/Spudger
Opens plastic casings without damage.
Pry tools prevent scratches or cracks during case opening. Learners will use spudgers for safe disassembly, preserving laptop aesthetics and functionality.

### Tweezers
Picks up small screws and connectors.
Tweezers handle tiny components precisely. Learners will use them to manage screws and cables, ensuring accurate and safe repairs.

### Anti-static Wrist Strap
Protects components from electrostatic discharge (ESD).
ESD straps prevent static damage to sensitive parts. Learners will use straps to safeguard components, ensuring reliable repairs.

### Magnetic Mat/Screw Tray
Organizes screws during disassembly.
Magnetic mats prevent screw loss. Learners will use trays to track screws, simplifying reassembly and avoiding errors.

### Plastic Card/Guitar Pick
Separates screen bezels or cases.
Plastic cards aid in gentle case opening. Learners will use them to avoid damage, ensuring professional-quality repairs.

### Suction Cup Tool
Lifts screens or glass panels.
Suction cups enable safe screen removal. Learners will apply them to handle displays without pressure damage, ensuring safe repairs.

### Isopropyl Alcohol (90%+)
Cleans thermal paste or dust safely.
Alcohol cleans components without residue. Learners will use it to remove old thermal paste, ensuring effective cooling post-repair.

### Compressed Air Can
Removes dust from fans and ports.
Compressed air clears debris for optimal performance. Learners will use it to clean fans and ports, preventing overheating issues.

### Thermal Paste
Applied between CPU/GPU and heat sink.
Thermal paste ensures efficient heat transfer. Learners will apply it correctly during reassembly, maintaining cooling efficiency.

### Multimeter
Measures voltage, continuity, and resistance.
Multimeters diagnose power issues. Learners will use them to test circuits, ensuring accurate troubleshooting and repairs.

### Mini Flashlight/Headlamp
Illuminates internal components.
Flashlights improve visibility in tight spaces. Learners will use them to inspect components, ensuring precise repairs.

### Brush (Anti-static)
Cleans dirt from circuit boards.
Anti-static brushes safely clean boards. Learners will use them to remove corrosion, maintaining component integrity.

## Notes for Students
- Match screwdriver size to screw head to avoid stripping.
- Use plastic tools, not metal, to prevent electrical shorts and cosmetic damage.
- Ground yourself with an ESD strap before touching components.
- Take pictures during disassembly to aid reassembly.
- Work on a clean, non-conductive surface like a rubber mat or wooden table.
        `
      }
    },
    {
      id: 7,
      title: 'ESD Safety and Precautions',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/NAAQfPpbkEw',
        textContent: `
# ESD Safety and Precautions

## Key Features
**Electrostatic Discharge Protection**: Learners master ESD safety to prevent damage to sensitive components during repairs, ensuring professional reliability.

This section teaches the critical importance of preventing electrostatic discharge (ESD), which can silently damage laptop components like CPUs and motherboards. Learners will adopt industry-standard precautions, such as using anti-static wrist straps and mats, to protect delicate hardware. Video tutorials and practical exercises reinforce safe handling practices, preparing learners for professional repairs and CompTIA A+ certification.

## What is ESD?
**Electrostatic Discharge (ESD)**: Sudden flow of electricity between objects with different potentials, often from static buildup.
ESD can destroy sensitive components like CPUs and RAM. Learners will understand its risks and adopt preventive measures, ensuring safe repairs.

## Why is ESD Dangerous?
Damages components, causing immediate or latent failures.
Even low-voltage ESD (10V) can harm modern ICs. Learners will learn to mitigate risks, ensuring component longevity and reliable repairs.

## Sources of Static Electricity
Walking on carpet, synthetic clothing, plastic chairs, low humidity environments.
Learners will identify static sources and avoid them during repairs, maintaining a safe workspace for delicate components.

## ESD Safety Precautions

### Use an Anti-static Wrist Strap
Grounds technician's body.
Straps prevent static buildup. Learners will use them consistently, ensuring component safety during repairs.

### Work on an ESD Mat
Grounds workspace.
ESD mats create a safe work environment. Learners will use grounded mats, preventing static damage.

### Avoid Synthetic Materials
Wear cotton, avoid plastic shoes.
Cotton clothing reduces static. Learners will choose appropriate attire, minimizing ESD risks.

### Touch a Grounded Object
Discharges static before handling components.
Touching grounded metal prevents ESD. Learners will adopt this habit, ensuring safe component handling.

### Handle Components by Edges
Avoid touching pins or circuits.
Edge handling prevents damage. Learners will practice safe component handling, preserving functionality.

### Use Anti-static Bags
Store and transport components safely.
Anti-static bags protect parts. Learners will use them for storage, ensuring component safety.

### Work in Humid Environment
40%-60% humidity reduces static.
Maintaining humidity prevents static buildup. Learners will control workspace conditions, enhancing safety.

## ESD-Proof Tools and Materials
- **Anti-static Wrist Strap**: Grounds technician's body.
- **Anti-static Mat**: Grounds workspace.
- **Anti-static Bag**: Safe storage/transport for electronics.
- **ESD-safe Brush**: Cleans circuit boards safely.
- **ESD-safe Tweezers**: Handles small components safely.

## Common Mistakes to Avoid
- Working on carpet or plastic surfaces.
- Wearing wool or synthetic clothes.
- Touching component contacts directly.
- Not grounding yourself or tools.

## Summary
Electrostatic discharge can silently damage expensive components. Practicing proper ESD safety procedures is critical for every repair technician and should become second nature before handling any internal hardware.
        `
      }
    },
    {
      id: 8,
      title: 'Quiz: Laptop Disassembly and Identification',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary function of a laptop battery?',
            options: ['Cool internal components', 'Provide portable power', 'Display visual output', 'Enable user input'],
            correct: 1,
            explanation: 'The laptop battery provides portable power when the device is not connected to an external power source.'
          },
          {
            question: 'Which battery issue is a safety hazard requiring immediate replacement?',
            options: ['Reduced battery life', 'Swelling or bulging', 'Slow charging', 'Incorrect voltage'],
            correct: 1,
            explanation: 'Battery swelling or bulging is a serious safety hazard that requires immediate replacement to prevent potential fire or explosion.'
          },
          {
            question: 'What is the purpose of a cooling fan in a laptop?',
            options: ['Power the system', 'Prevent overheating', 'Store data', 'Connect peripherals'],
            correct: 1,
            explanation: 'The cooling fan dissipates heat from the CPU, GPU, and other components to prevent overheating.'
          },
          {
            question: 'Which maintenance tip helps extend cooling fan performance?',
            options: ['Use approved chargers', 'Clean regularly with compressed air', 'Avoid full discharges', 'Handle gently to avoid cracks'],
            correct: 1,
            explanation: 'Regular cleaning with compressed air helps remove dust and debris that can impede fan performance.'
          },
          {
            question: 'What is a common issue with laptop keyboards?',
            options: ['Dead pixels', 'Liquid spills causing short circuits', 'Overheating', 'Firmware bugs'],
            correct: 1,
            explanation: 'Liquid spills can cause short circuits and damage to laptop keyboards, making them unresponsive.'
          },
          {
            question: 'Which display type offers better viewing angles and color accuracy?',
            options: ['TN', 'LCD', 'IPS', 'LED'],
            correct: 2,
            explanation: 'IPS (In-Plane Switching) displays offer superior viewing angles and color accuracy compared to other panel types.'
          },
          {
            question: 'Which tool is used to safely open plastic laptop casings?',
            options: ['Precision screwdriver', 'Plastic pry tool/spudger', 'Multimeter', 'Compressed air'],
            correct: 1,
            explanation: 'Plastic pry tools or spudgers are designed to safely open plastic casings without causing damage or scratches.'
          },
          {
            question: 'What is the purpose of an anti-static wrist strap?',
            options: ['Organize screws', 'Prevent electrostatic discharge', 'Clean thermal paste', 'Illuminate components'],
            correct: 1,
            explanation: 'Anti-static wrist straps ground the technician\'s body to prevent electrostatic discharge that can damage sensitive components.'
          },
          {
            question: 'Which environment condition reduces static buildup?',
            options: ['Low humidity', '40%-60% humidity', 'High temperature', 'Carpeted surfaces'],
            correct: 1,
            explanation: 'Maintaining 40%-60% humidity helps reduce static electricity buildup in the work environment.'
          },
          {
            question: 'Which is NOT an ESD-safe practice?',
            options: ['Using an anti-static mat', 'Wearing synthetic clothes', 'Handling components by edges', 'Using ESD-safe tweezers'],
            correct: 1,
            explanation: 'Wearing synthetic clothes can generate static electricity and is not an ESD-safe practice.'
          }
        ]
      }
    }
  ]
};

export default certifiedComputerRepairModule2; 