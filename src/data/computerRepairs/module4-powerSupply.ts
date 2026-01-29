
import type { Module } from '@/types/course';

export const module4PowerSupply: Module = {
  id: 4,
  title: 'Module 4: Power Supply Troubleshooting and Repair',
  description: 'Master power supply diagnostics, testing, and replacement procedures for both desktop and laptop systems, including voltage testing, component safety, and power management.',
  learningObjectives: [
    'Understand power supply fundamentals and specifications',
    'Diagnose power-related issues systematically',
    'Test power supplies safely and accurately',
    'Replace power supplies in desktop and laptop systems',
    'Troubleshoot power management and battery issues',
    'Implement proper safety procedures for electrical work',
    'Optimize power efficiency and system stability'
  ],
  lessons: [
    {
      id: 4,
      title: 'Power Supply Fundamentals and Troubleshooting',
      duration: '70 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# ⚡ Module 4: Power Supply Troubleshooting and Repair

This module covers comprehensive power supply diagnostics, testing, and repair procedures for both desktop and laptop systems. Students will learn to identify power-related issues, test components safely, and implement effective solutions.

## 🔌 Power Supply Fundamentals

### **What is a Power Supply Unit (PSU)?**
A power supply unit converts alternating current (AC) from the wall outlet into direct current (DC) that computer components can use, providing stable voltages at different levels.

### **Power Supply Specifications**
- **Wattage**: Total power capacity (e.g., 500W, 750W, 1000W)
- **Efficiency Rating**: 80 Plus certification levels (Bronze, Silver, Gold, Platinum)
- **Modular Design**: Fully modular, semi-modular, or non-modular
- **Form Factor**: ATX, SFX, TFX for different case sizes
- **Connectors**: Various connectors for different components

### **Voltage Rails**
- **+3.3V**: Used by motherboard and some components
- **+5V**: Powers USB ports and some drives
- **+12V**: Powers CPU, GPU, and high-power components
- **-12V**: Used by some legacy components
- **+5VSB**: Standby power for wake-on-LAN and USB charging

## 🔍 Power Supply Testing

### **Visual Inspection**
- Check for physical damage or burns
- Look for bulging or leaking capacitors
- Verify all connectors are intact
- Check for dust buildup or overheating signs

### **Multimeter Testing**
- **Voltage Testing**: Measure output voltages at connectors
- **Continuity Testing**: Check for open or short circuits
- **Load Testing**: Test under various load conditions
- **Ripple Testing**: Check for voltage stability

### **Power Supply Tester**
- Use dedicated PSU testers for quick diagnosis
- Test all voltage rails simultaneously
- Verify proper voltage levels
- Check for proper power-on sequence

### **Paperclip Test (Desktop PSUs)**
- Connect green wire (PS_ON) to any black wire (ground)
- Power supply should turn on if functional
- Use only for basic functionality testing
- Not recommended for detailed diagnostics

## 🖥️ Desktop Power Supply Issues

### **Common Problems**
- **No Power**: Check wall outlet, power cord, and PSU switch
- **Intermittent Power**: Test under load, check for overheating
- **Insufficient Power**: Calculate power requirements, upgrade if needed
- **Unstable Voltages**: Check capacitors, test under load
- **Excessive Noise**: Clean dust, check fan operation

### **Power Calculation**
- **CPU**: 65W-150W depending on model
- **GPU**: 75W-350W depending on model
- **Motherboard**: 20W-50W
- **Storage**: 5W-15W per drive
- **RAM**: 5W-10W per module
- **Fans**: 2W-5W each

### **Replacement Procedures**
1. **Safety First**: Disconnect power and discharge capacitors
2. **Document Connections**: Take photos of all connections
3. **Remove Old PSU**: Unscrew and disconnect all cables
4. **Install New PSU**: Mount and connect all cables
5. **Test System**: Power on and verify all functions
6. **Cable Management**: Organize cables for airflow

## 💻 Laptop Power Issues

### **AC Adapter Problems**
- **No Charging**: Check adapter, cable, and charging port
- **Intermittent Charging**: Test with different adapter
- **Slow Charging**: Check adapter wattage and cable quality
- **Overheating**: Clean charging port, check for damage

### **Battery Issues**
- **No Battery Life**: Test battery health, consider replacement
- **Rapid Discharge**: Check for power-hungry applications
- **Battery Swelling**: Replace immediately for safety
- **Calibration Issues**: Recalibrate battery if needed

### **Charging Port Repair**
- **Loose Connection**: Check for broken solder joints
- **Physical Damage**: Replace charging port assembly
- **Corrosion**: Clean with isopropyl alcohol
- **Broken Pins**: Replace port or motherboard

## 🔋 Battery Technology and Maintenance

### **Battery Types**
- **Lithium-Ion (Li-ion)**: Most common, good energy density
- **Lithium-Polymer (Li-Po)**: Flexible form factor, higher cost
- **Nickel-Metal Hydride (NiMH)**: Older technology, lower capacity

### **Battery Health Monitoring**
- **Cycle Count**: Track charge/discharge cycles
- **Capacity**: Monitor remaining capacity vs. original
- **Temperature**: Check for overheating during use
- **Voltage**: Monitor cell voltages for balance

### **Battery Maintenance**
- **Avoid Deep Discharge**: Keep above 20% when possible
- **Temperature Control**: Avoid extreme temperatures
- **Regular Use**: Use battery regularly to maintain health
- **Proper Storage**: Store at 40-60% charge in cool location

## ⚠️ Safety Procedures

### **Electrical Safety**
- **Always disconnect power** before working on PSU
- **Discharge capacitors** using proper procedures
- **Use insulated tools** when working with live circuits
- **Work in dry conditions** to prevent electrical shock

### **Component Safety**
- **Handle components carefully** to prevent damage
- **Use anti-static protection** when working with electronics
- **Avoid touching live circuits** or exposed components
- **Follow manufacturer guidelines** for specific components

### **Personal Safety**
- **Wear safety glasses** for eye protection
- **Use proper lighting** to see clearly
- **Take regular breaks** to prevent fatigue
- **Keep workspace clean** and organized

## 🛠️ Diagnostic Tools and Equipment

### **Essential Tools**
- **Multimeter**: For voltage and continuity testing
- **Power Supply Tester**: For quick PSU diagnosis
- **Load Tester**: For testing under load conditions
- **Oscilloscope**: For detailed waveform analysis (advanced)

### **Software Tools**
- **Hardware Monitoring**: CPU-Z, HWiNFO for system monitoring
- **Battery Monitoring**: Built-in OS tools, third-party software
- **Power Management**: Windows Power Options, manufacturer utilities
- **Diagnostic Software**: Manufacturer-specific testing tools

## 📊 Troubleshooting Flowcharts

### **Desktop No Power**
1. Check wall outlet and power cord
2. Verify PSU switch is on
3. Test PSU with paperclip test
4. Check motherboard connections
5. Test with known-good PSU

### **Laptop No Power**
1. Check AC adapter and cable
2. Test with different adapter
3. Check charging port for damage
4. Test battery separately
5. Check motherboard power circuits

### **Intermittent Power**
1. Check for loose connections
2. Test under load conditions
3. Monitor temperatures
4. Check for component failures
5. Verify power requirements

## 🔧 Advanced Power Management

### **Power Efficiency**
- **80 Plus Certification**: Ensures 80%+ efficiency at various loads
- **Active PFC**: Power Factor Correction for better efficiency
- **Modular Design**: Reduces cable clutter and improves airflow
- **Fan Control**: Automatic fan speed adjustment based on load

### **Power Management Features**
- **Sleep Mode**: Low-power state for quick resume
- **Hibernation**: Saves system state to disk
- **Wake-on-LAN**: Remote power-on capability
- **USB Power Delivery**: Fast charging for devices

### **System Optimization**
- **Power Plan Settings**: Balance performance and efficiency
- **Background Processes**: Disable unnecessary services
- **Hardware Monitoring**: Track power consumption
- **Thermal Management**: Ensure proper cooling

## 📋 Quality Control and Testing

### **Pre-Installation Testing**
- Test PSU before installation
- Verify all voltage outputs
- Check for proper fan operation
- Test under load conditions

### **Post-Installation Verification**
- Power on system successfully
- Verify all components work
- Monitor temperatures and stability
- Test under various load conditions

### **Long-term Monitoring**
- Track power consumption
- Monitor component temperatures
- Check for performance degradation
- Schedule regular maintenance

## 🎯 Learning Outcomes

By the end of this module, students will be able to:
- Understand power supply fundamentals and specifications
- Diagnose power-related issues systematically
- Test power supplies safely and accurately
- Replace power supplies in desktop and laptop systems
- Troubleshoot power management and battery issues
- Implement proper safety procedures for electrical work
- Optimize power efficiency and system stability

This module provides essential skills for power supply troubleshooting and repair, emphasizing safety, accuracy, and systematic problem-solving approaches.
        `
      }
    },
    {
      id: 14,
      title: 'Quiz: Power Supply Troubleshooting (Module 4)',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary function of a power supply unit (PSU)?',
            options: [
              'To cool the computer components',
              'To convert AC to DC power for computer components',
              'To store data temporarily',
              'To connect to the internet'
            ],
            correct: 1,
            explanation: 'A PSU converts alternating current (AC) from the wall outlet into direct current (DC) that computer components can use.'
          },
          {
            question: 'Which voltage rail powers the CPU and GPU?',
            options: [
              '+3.3V',
              '+5V',
              '+12V',
              '-12V'
            ],
            correct: 2,
            explanation: 'The +12V rail powers high-power components like the CPU and GPU.'
          },
          {
            question: 'What is the paperclip test used for?',
            options: [
              'To test if a PSU can turn on',
              'To measure voltage output',
              'To check power efficiency',
              'To test battery life'
            ],
            correct: 0,
            explanation: 'The paperclip test connects the green wire (PS_ON) to a black wire (ground) to test if a PSU can turn on.'
          },
          {
            question: 'Which tool is best for measuring voltage output from a PSU?',
            options: [
              'Screwdriver',
              'Multimeter',
              'Power supply tester',
              'Oscilloscope'
            ],
            correct: 1,
            explanation: 'A multimeter is the best tool for measuring voltage output from a PSU accurately.'
          },
          {
            question: 'What should you do first when troubleshooting a "no power" issue?',
            options: [
              'Replace the power supply',
              'Check the wall outlet and power cord',
              'Test the motherboard',
              'Check the CPU'
            ],
            correct: 1,
            explanation: 'Always start with the basics: check the wall outlet and power cord before assuming hardware failure.'
          },
          {
            question: 'Which battery type is most commonly used in laptops?',
            options: [
              'Nickel-Metal Hydride (NiMH)',
              'Lithium-Ion (Li-ion)',
              'Lead-Acid',
              'Alkaline'
            ],
            correct: 1,
            explanation: 'Lithium-Ion (Li-ion) batteries are the most commonly used in laptops due to their good energy density and reliability.'
          },
          {
            question: 'What does 80 Plus certification ensure?',
            options: [
              '80% or higher efficiency at various loads',
              '80% or higher power output',
              '80% or higher reliability',
              '80% or higher compatibility'
            ],
            correct: 0,
            explanation: '80 Plus certification ensures that a PSU maintains 80% or higher efficiency at various load levels.'
          },
          {
            question: 'What should you do if a laptop battery is swollen?',
            options: [
              'Continue using it normally',
              'Replace it immediately for safety',
              'Try to fix it yourself',
              'Ignore the issue'
            ],
            correct: 1,
            explanation: 'Swollen batteries are a safety hazard and should be replaced immediately to prevent potential fire or explosion.'
          },
          {
            question: 'Which voltage rail powers USB ports?',
            options: [
              '+3.3V',
              '+5V',
              '+12V',
              '-12V'
            ],
            correct: 1,
            explanation: 'The +5V rail powers USB ports and some storage drives.'
          },
          {
            question: 'What is the purpose of Power Factor Correction (PFC)?',
            options: [
              'To increase power output',
              'To improve power efficiency',
              'To reduce noise',
              'To increase reliability'
            ],
            correct: 1,
            explanation: 'Power Factor Correction (PFC) improves power efficiency by ensuring the PSU draws power more efficiently from the electrical grid.'
          }
        ]
      }
    }
  ]
};
