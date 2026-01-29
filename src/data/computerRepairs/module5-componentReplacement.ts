
import type { Module } from '@/types/course';

export const module5ComponentReplacement: Module = {
  id: 5,
  title: 'Module 5: Component Replacement and Upgrades',
  description: 'Master the procedures for safely replacing and upgrading computer components including RAM, storage devices, motherboards, and other hardware components.',
  learningObjectives: [
    'Safely replace RAM modules in desktop and laptop systems',
    'Upgrade storage devices (HDD, SSD, NVMe)',
    'Replace motherboards with proper configuration',
    'Install and configure graphics cards',
    'Perform CPU upgrades and thermal management',
    'Handle component compatibility and BIOS settings',
    'Implement proper testing and verification procedures'
  ],
  lessons: [
    {
      id: 5,
      title: 'Component Replacement and Upgrade Procedures',
      duration: '80 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# 🔧 Module 5: Component Replacement and Upgrades

This module covers comprehensive procedures for safely replacing and upgrading computer components. Students will learn proper techniques for RAM, storage, motherboard, and other component replacements while ensuring system stability and performance.

## 🧠 RAM (Random Access Memory) Replacement

### **RAM Types and Compatibility**
- **DDR3**: Older standard, 240-pin DIMM
- **DDR4**: Current standard, 288-pin DIMM
- **DDR5**: Latest standard, 288-pin DIMM
- **SO-DIMM**: Laptop memory, smaller form factor

### **RAM Specifications**
- **Capacity**: 4GB, 8GB, 16GB, 32GB, 64GB
- **Speed**: Measured in MHz (e.g., 2400MHz, 3200MHz)
- **Timing**: CAS latency and other timing parameters
- **Voltage**: Standard and low-voltage options

### **Desktop RAM Installation**
1. **Power off and disconnect** all cables
2. **Open case** and locate RAM slots
3. **Release clips** on existing RAM modules
4. **Remove old RAM** by pulling straight up
5. **Align new RAM** with slot (notch position)
6. **Press down firmly** until clips snap
7. **Verify installation** and power on system

### **Laptop RAM Installation**
1. **Power off and remove battery**
2. **Access RAM compartment** (usually bottom panel)
3. **Release clips** holding existing RAM
4. **Remove old RAM** at 45-degree angle
5. **Insert new RAM** at 45-degree angle
6. **Press down** until it clicks into place
7. **Replace cover** and test system

### **RAM Configuration**
- **Dual Channel**: Install pairs in matching slots
- **Single Channel**: Install in any available slot
- **XMP Profile**: Enable in BIOS for optimal performance
- **Manual Timing**: Adjust in BIOS if needed

## 💾 Storage Device Upgrades

### **Storage Types**
- **HDD (Hard Disk Drive)**: Mechanical, high capacity, lower cost
- **SSD (Solid State Drive)**: Fast, reliable, moderate capacity
- **NVMe SSD**: Ultra-fast, PCIe interface, high cost
- **Hybrid Drives**: Combine HDD and SSD technologies

### **Desktop Storage Installation**
1. **Power off and disconnect** all cables
2. **Open case** and locate drive bays
3. **Mount drive** in appropriate bay
4. **Connect power** and data cables
5. **Secure drive** with screws or tool-less mounts
6. **Configure in BIOS** if needed
7. **Install operating system** or clone existing drive

### **Laptop Storage Installation**
1. **Power off and remove battery**
2. **Access storage compartment**
3. **Remove existing drive** (if applicable)
4. **Install new drive** in drive bay
5. **Connect cables** securely
6. **Replace cover** and test system
7. **Install OS** or restore from backup

### **Data Migration**
- **Clone Software**: Use tools like Clonezilla, Macrium Reflect
- **Fresh Install**: Install new OS and restore data
- **External Backup**: Use external drives or cloud storage
- **Verification**: Ensure all data transferred correctly

## 🔌 Motherboard Replacement

### **Pre-Installation Preparation**
- **Backup data** and document current configuration
- **Check compatibility** with existing components
- **Gather tools** and replacement parts
- **Create workspace** with proper lighting

### **Desktop Motherboard Installation**
1. **Remove all components** from old motherboard
2. **Remove old motherboard** from case
3. **Install I/O shield** in case
4. **Install standoffs** in case (if needed)
5. **Place new motherboard** in case
6. **Secure motherboard** with screws
7. **Reinstall all components**
8. **Connect all cables** and power
9. **Test system** and configure BIOS

### **Laptop Motherboard Installation**
1. **Remove all components** (keyboard, display, etc.)
2. **Disconnect all cables** and connectors
3. **Remove old motherboard** from chassis
4. **Install new motherboard** in chassis
5. **Reconnect all cables** and components
6. **Reassemble laptop** completely
7. **Test all functions** and features

### **BIOS Configuration**
- **Boot Order**: Set primary boot device
- **RAM Settings**: Configure XMP profiles
- **Storage Configuration**: Set SATA/AHCI modes
- **Security Settings**: Configure passwords and TPM
- **Power Management**: Set sleep and wake options

## 🎮 Graphics Card Installation

### **Graphics Card Types**
- **Integrated**: Built into CPU or motherboard
- **Discrete**: Separate card with dedicated memory
- **Workstation**: Professional cards for CAD/rendering
- **Gaming**: High-performance cards for gaming

### **Installation Procedure**
1. **Power off and disconnect** all cables
2. **Open case** and locate PCIe slot
3. **Remove slot cover** if necessary
4. **Insert graphics card** into PCIe slot
5. **Secure card** with screws or clips
6. **Connect power cables** (if required)
7. **Install drivers** and test performance

### **Power Requirements**
- **Check PSU wattage** and available connectors
- **Calculate power needs** for new card
- **Upgrade PSU** if necessary
- **Use proper power cables** and adapters

### **Driver Installation**
- **Download latest drivers** from manufacturer
- **Uninstall old drivers** completely
- **Install new drivers** and restart
- **Test performance** and stability

## 🔥 CPU Upgrades and Thermal Management

### **CPU Compatibility**
- **Socket Type**: Must match motherboard socket
- **Chipset Support**: Check motherboard compatibility
- **BIOS Version**: May need updated BIOS
- **Power Requirements**: Ensure adequate cooling

### **CPU Installation**
1. **Remove old CPU** and clean socket
2. **Check socket pins** for damage
3. **Install new CPU** with proper orientation
4. **Apply thermal paste** (pea-sized amount)
5. **Install CPU cooler** and secure properly
6. **Connect fan cables** and power
7. **Test system** and monitor temperatures

### **Thermal Paste Application**
- **Clean surfaces** with isopropyl alcohol
- **Apply small amount** (pea-sized)
- **Spread evenly** or let cooler spread it
- **Avoid over-application** which can cause issues
- **Use quality thermal paste** for best results

### **Cooling Solutions**
- **Air Cooling**: Heat sinks with fans
- **Liquid Cooling**: Closed-loop or custom systems
- **Passive Cooling**: Heat sinks without fans
- **Thermal Monitoring**: Software and hardware monitoring

## 🔧 Component Compatibility

### **Compatibility Factors**
- **Physical Fit**: Size and form factor
- **Interface Compatibility**: Sockets, slots, connectors
- **Power Requirements**: Wattage and voltage needs
- **BIOS Support**: Firmware compatibility
- **Driver Support**: Operating system compatibility

### **Compatibility Tools**
- **Manufacturer Websites**: Check compatibility lists
- **Online Tools**: PCPartPicker, UserBenchmark
- **System Information**: Use built-in OS tools
- **Third-party Software**: CPU-Z, HWiNFO

### **Common Compatibility Issues**
- **Socket Mismatch**: CPU doesn't fit motherboard
- **BIOS Version**: Outdated firmware
- **Power Insufficiency**: PSU can't handle load
- **Driver Conflicts**: Software incompatibility

## 🛠️ Testing and Verification

### **Post-Installation Testing**
- **Power On Test**: Verify system boots
- **Component Recognition**: Check BIOS/OS detection
- **Performance Testing**: Benchmark new components
- **Stability Testing**: Run stress tests
- **Temperature Monitoring**: Check thermal performance

### **Troubleshooting Common Issues**
- **No Boot**: Check connections and compatibility
- **Performance Issues**: Verify drivers and settings
- **Overheating**: Check cooling and thermal paste
- **Compatibility Problems**: Update BIOS or drivers

### **Quality Assurance**
- **Functionality Testing**: Test all features
- **Performance Verification**: Compare to expectations
- **Stability Validation**: Run extended tests
- **Documentation**: Record all changes made

## 📋 Best Practices

### **Safety Procedures**
- **Always power off** before working
- **Use anti-static protection** for all components
- **Handle components carefully** by edges
- **Follow manufacturer guidelines** exactly

### **Organization**
- **Document all changes** and configurations
- **Keep track of screws** and small parts
- **Take photos** of complex installations
- **Maintain clean workspace** throughout process

### **Customer Communication**
- **Explain upgrade benefits** clearly
- **Set realistic expectations** for performance gains
- **Provide maintenance recommendations**
- **Offer warranty information** for new components

## 🎯 Learning Outcomes

By the end of this module, students will be able to:
- Safely replace RAM modules in desktop and laptop systems
- Upgrade storage devices (HDD, SSD, NVMe)
- Replace motherboards with proper configuration
- Install and configure graphics cards
- Perform CPU upgrades and thermal management
- Handle component compatibility and BIOS settings
- Implement proper testing and verification procedures

This module provides hands-on skills for component replacement and upgrades, emphasizing safety, compatibility, and proper testing procedures.
        `
      }
    },
    {
      id: 15,
      title: 'Quiz: Component Replacement (Module 5)',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the most important safety step before replacing components?',
            options: [
              'Wear gloves',
              'Power off and disconnect all cables',
              'Clean the workspace',
              'Check the weather'
            ],
            correct: 1,
            explanation: 'Always power off and disconnect all cables before working on computer components to prevent electrical shock and damage.'
          },
          {
            question: 'Which RAM type is currently the most common standard?',
            options: [
              'DDR3',
              'DDR4',
              'DDR5',
              'SDRAM'
            ],
            correct: 1,
            explanation: 'DDR4 is currently the most common RAM standard, though DDR5 is becoming more prevalent in newer systems.'
          },
          {
            question: 'What should you do when installing RAM in a desktop?',
            options: [
              'Force it in any direction',
              'Align the notch and press down firmly',
              'Use a hammer to secure it',
              'Glue it in place'
            ],
            correct: 1,
            explanation: 'RAM should be aligned with the notch in the slot and pressed down firmly until the clips snap into place.'
          },
          {
            question: 'Which storage type offers the fastest performance?',
            options: [
              'HDD (Hard Disk Drive)',
              'SSD (Solid State Drive)',
              'NVMe SSD',
              'Hybrid Drive'
            ],
            correct: 2,
            explanation: 'NVMe SSDs offer the fastest performance due to their PCIe interface and optimized architecture.'
          },
          {
            question: 'What is the purpose of thermal paste?',
            options: [
              'To glue the CPU to the motherboard',
              'To improve heat transfer between CPU and cooler',
              'To make the CPU look better',
              'To prevent electrical shorts'
            ],
            correct: 1,
            explanation: 'Thermal paste improves heat transfer between the CPU and cooler, preventing overheating.'
          },
          {
            question: 'Which tool is essential for checking component compatibility?',
            options: [
              'Hammer',
              'Screwdriver',
              'Online compatibility tools',
              'Tape measure'
            ],
            correct: 2,
            explanation: 'Online compatibility tools like PCPartPicker help verify that components will work together properly.'
          },
          {
            question: 'What should you do after installing a new graphics card?',
            options: [
              'Nothing, it will work automatically',
              'Install the latest drivers',
              'Replace the power supply',
              'Format the hard drive'
            ],
            correct: 1,
            explanation: 'After installing a new graphics card, you should install the latest drivers for optimal performance and compatibility.'
          },
          {
            question: 'How much thermal paste should you apply to a CPU?',
            options: [
              'A large glob covering the entire CPU',
              'A pea-sized amount',
              'No thermal paste is needed',
              'Enough to fill the socket'
            ],
            correct: 1,
            explanation: 'A pea-sized amount of thermal paste is sufficient for proper heat transfer without causing issues.'
          },
          {
            question: 'What is dual-channel RAM configuration?',
            options: [
              'Using two different brands of RAM',
              'Installing RAM pairs in matching slots for better performance',
              'Using RAM from two different computers',
              'Installing RAM in any available slots'
            ],
            correct: 1,
            explanation: 'Dual-channel configuration involves installing RAM pairs in matching slots to improve memory bandwidth and performance.'
          },
          {
            question: 'What should you check before replacing a motherboard?',
            options: [
              'The weather forecast',
              'Component compatibility and BIOS requirements',
              'The price of the new motherboard',
              'The color of the case'
            ],
            correct: 1,
            explanation: 'Before replacing a motherboard, check component compatibility and whether the BIOS supports your CPU and other components.'
          }
        ]
      }
    }
  ]
};
