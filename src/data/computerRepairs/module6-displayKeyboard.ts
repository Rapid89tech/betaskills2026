
import type { Module } from '@/types/course';

export const module6DisplayKeyboard: Module = {
  id: 6,
  title: 'Module 6: Display and Keyboard Troubleshooting',
  description: 'Master display and keyboard troubleshooting, repair, and replacement procedures for both desktop and laptop systems, including LCD/OLED technology and input device diagnostics.',
  learningObjectives: [
    'Diagnose display issues and problems systematically',
    'Troubleshoot keyboard and input device problems',
    'Replace laptop displays and keyboards safely',
    'Understand LCD/OLED technology and components',
    'Repair desktop monitors and peripherals',
    'Configure display settings and resolutions',
    'Implement proper testing and quality control'
  ],
  lessons: [
    {
      id: 6,
      title: 'Display and Keyboard Troubleshooting',
      duration: '75 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/mPzcsU8Cpco',
        textContent: `
# 🖥️ Module 6: Display and Keyboard Troubleshooting

This module covers comprehensive troubleshooting and repair procedures for displays and keyboards in both desktop and laptop systems. Students will learn to diagnose, repair, and replace these critical input/output components.

## 📺 Display Technology Fundamentals

### **Display Types**
- **LCD (Liquid Crystal Display)**: Most common, backlit technology
- **OLED (Organic Light Emitting Diode)**: Self-illuminating, better contrast
- **LED**: LCD with LED backlighting
- **CRT (Cathode Ray Tube)**: Older technology, rarely used today

### **Display Components**
- **Panel**: The actual display surface
- **Backlight**: Illuminates the display (LCD only)
- **Digitizer**: Touch-sensitive layer (if applicable)
- **Controller Board**: Processes video signals
- **Cables**: Connect to motherboard/graphics card

### **Resolution and Refresh Rate**
- **Resolution**: Number of pixels (e.g., 1920x1080, 4K)
- **Refresh Rate**: How often image updates (60Hz, 120Hz, 144Hz)
- **Response Time**: How quickly pixels change color
- **Color Depth**: Number of colors displayed (8-bit, 10-bit)

## 🔍 Display Troubleshooting

### **Common Display Problems**

#### **No Display**
- **Check Power**: Verify monitor is powered on
- **Check Cables**: Ensure video cables are connected
- **Check Source**: Verify correct input is selected
- **Test with External Monitor**: Isolate laptop vs. external display
- **Check Graphics Card**: Test with integrated graphics

#### **Distorted or Flickering Display**
- **Update Drivers**: Install latest graphics drivers
- **Check Refresh Rate**: Match monitor's native refresh rate
- **Test Different Cables**: Try different video cables
- **Check for Interference**: Move away from electrical interference
- **Test in Safe Mode**: Rule out software issues

#### **Dead Pixels**
- **Pixel Testing**: Use pixel testing software
- **Pressure Method**: Apply gentle pressure (risky)
- **Replacement**: Replace display if under warranty
- **Acceptance**: Some dead pixels may be acceptable

#### **Color Issues**
- **Color Calibration**: Use calibration tools
- **Driver Settings**: Adjust color settings in drivers
- **Hardware Test**: Test with different graphics card
- **Panel Replacement**: May need new display panel

### **Laptop Display Issues**

#### **Cracked Screen**
- **Assessment**: Determine if digitizer is also damaged
- **Replacement Options**: Full assembly vs. panel only
- **Cost Consideration**: Compare repair vs. replacement costs
- **DIY vs. Professional**: Consider skill level required

#### **Backlight Problems**
- **Inverter Issues**: Check inverter board (older laptops)
- **LED Backlight**: Check LED strips and power
- **Power Supply**: Verify adequate power to display
- **Cable Issues**: Check display cable connections

#### **Display Cable Problems**
- **Visual Inspection**: Check for damage or loose connections
- **Reseat Cable**: Remove and reconnect display cable
- **Cable Replacement**: Replace damaged cables
- **Hinge Issues**: Check if hinge damage affects cable

## ⌨️ Keyboard Troubleshooting

### **Keyboard Types**
- **Mechanical**: Individual switches, tactile feedback
- **Membrane**: Rubber dome switches, quiet operation
- **Scissor Switch**: Laptop keyboards, low profile
- **Optical**: Light-based switches, gaming keyboards

### **Common Keyboard Problems**

#### **Non-Responsive Keys**
- **Clean Keyboard**: Remove debris and dust
- **Check for Sticky Keys**: Clean under keycaps
- **Test in Different Applications**: Rule out software issues
- **Check Language Settings**: Verify correct keyboard layout
- **Driver Issues**: Update or reinstall keyboard drivers

#### **Ghost Typing**
- **Clean Spills**: Remove liquid and clean thoroughly
- **Check for Short Circuits**: Look for damaged traces
- **Test Individual Keys**: Identify problematic keys
- **Replace Keyboard**: If cleaning does not resolve issue

#### **Wrong Characters**
- **Language Settings**: Check keyboard language
- **Num Lock**: Verify Num Lock status
- **Function Keys**: Check if Fn key is stuck
- **Driver Issues**: Update keyboard drivers

### **Laptop Keyboard Issues**

#### **Spilled Liquid**
- **Immediate Action**: Power off and remove battery
- **Cleaning Process**: Use isopropyl alcohol carefully
- **Drying Time**: Allow 24-48 hours to dry completely
- **Testing**: Test thoroughly before reassembly

#### **Broken Keycaps**
- **Keycap Replacement**: Replace individual keycaps
- **Full Keyboard Replacement**: If multiple keys damaged
- **Compatibility**: Ensure replacement parts match model
- **Installation**: Follow manufacturer guidelines

#### **Keyboard Assembly**
- **Ribbon Cable**: Handle flex cables carefully
- **Alignment**: Ensure proper alignment with case
- **Screws**: Use correct screws and torque
- **Testing**: Test all keys after installation

## 🛠️ Display Repair Procedures

### **Laptop Display Replacement**

#### **Pre-Installation**
- **Backup Data**: Ensure all data is backed up
- **Documentation**: Take photos of current setup
- **Parts Verification**: Confirm replacement part compatibility
- **Tool Preparation**: Gather necessary tools

#### **Disassembly Process**
1. **Remove Battery**: Disconnect power completely
2. **Remove Bezel**: Carefully pry off display bezel
3. **Disconnect Cables**: Remove display and camera cables
4. **Remove Hinges**: Unscrew display from base
5. **Separate Display**: Remove display from lid assembly

#### **Installation Process**
1. **Install New Display**: Place in lid assembly
2. **Connect Cables**: Reconnect all display cables
3. **Attach Hinges**: Secure display to base
4. **Replace Bezel**: Snap bezel back into place
5. **Test Display**: Power on and verify functionality

### **Desktop Monitor Repair**

#### **Power Supply Issues**
- **Check Power Cable**: Test with known-good cable
- **Internal Power Supply**: Test or replace power board
- **Capacitor Issues**: Look for bulging capacitors
- **Professional Repair**: Consider professional service

#### **Backlight Problems**
- **Inverter Board**: Replace inverter (older monitors)
- **LED Strips**: Replace LED backlight strips
- **Power Distribution**: Check power distribution board
- **Cost Analysis**: Compare repair vs. replacement

## 🔧 Keyboard Repair Procedures

### **Laptop Keyboard Replacement**

#### **Removal Process**
1. **Power Off**: Disconnect all power sources
2. **Remove Bottom Panel**: Access keyboard from underside
3. **Disconnect Ribbon**: Carefully disconnect keyboard cable
4. **Remove Screws**: Unscrew keyboard mounting screws
5. **Lift Keyboard**: Remove keyboard from case

#### **Installation Process**
1. **Position Keyboard**: Align with mounting points
2. **Connect Cable**: Reconnect keyboard ribbon cable
3. **Secure Screws**: Install mounting screws
4. **Replace Panel**: Reinstall bottom panel
5. **Test Functionality**: Verify all keys work

### **Desktop Keyboard Repair**

#### **Mechanical Keyboard**
- **Switch Replacement**: Replace individual switches
- **PCB Repair**: Repair damaged circuit board
- **Keycap Replacement**: Replace damaged keycaps
- **Cleaning**: Deep clean switches and PCB

#### **Membrane Keyboard**
- **Membrane Replacement**: Replace damaged membrane
- **Dome Replacement**: Replace worn rubber domes
- **Case Repair**: Repair or replace keyboard case
- **Cost Consideration**: Often cheaper to replace

## 📊 Testing and Quality Control

### **Display Testing**
- **Power On Test**: Verify display powers on
- **Image Quality**: Check for dead pixels and color accuracy
- **Touch Functionality**: Test touch response (if applicable)
- **Brightness and Contrast**: Verify proper adjustment
- **Viewing Angles**: Check from different angles

### **Keyboard Testing**
- **All Keys**: Test every key for proper function
- **Special Functions**: Test function keys and shortcuts
- **Backlight**: Test keyboard backlight (if applicable)
- **Response Time**: Check key response and repeat rate
- **Noise Level**: Verify acceptable noise level

### **Integration Testing**
- **System Boot**: Ensure system boots properly
- **Driver Installation**: Verify drivers install correctly
- **Performance**: Check for performance impact
- **Compatibility**: Test with different software
- **Long-term Stability**: Monitor for issues over time

## ⚠️ Safety Considerations

### **Electrical Safety**
- **Power Disconnection**: Always disconnect power before working
- **Static Protection**: Use anti-static protection
- **High Voltage**: Be aware of high voltage in displays
- **Capacitor Discharge**: Discharge capacitors safely

### **Physical Safety**
- **Sharp Edges**: Be careful with display glass and metal edges
- **Heavy Components**: Handle displays carefully due to weight
- **Chemical Safety**: Use appropriate cleaning chemicals
- **Eye Protection**: Wear safety glasses when needed

### **Component Handling**
- **Fragile Components**: Handle displays and keyboards gently
- **Cable Management**: Avoid damaging flex cables
- **Screw Organization**: Keep track of all screws
- **Documentation**: Document all disassembly steps

## 📋 Best Practices

### **Diagnostic Approach**
- **Systematic Testing**: Test components methodically
- **Documentation**: Record all findings and actions
- **Customer Communication**: Keep customers informed
- **Cost Analysis**: Provide repair vs. replacement options

### **Quality Assurance**
- **Thorough Testing**: Test all functions after repair
- **Warranty Consideration**: Check warranty status
- **Customer Approval**: Get approval before major repairs
- **Follow-up**: Check with customer after repair

## 🎯 Learning Outcomes

By the end of this module, students will be able to:
- Diagnose display issues and problems systematically
- Troubleshoot keyboard and input device problems
- Replace laptop displays and keyboards safely
- Understand LCD/OLED technology and components
- Repair desktop monitors and peripherals
- Configure display settings and resolutions
- Implement proper testing and quality control

This module provides essential skills for display and keyboard troubleshooting and repair, emphasizing safety, accuracy, and customer satisfaction.
        `
      }
    },
    {
      id: 16,
      title: 'Quiz: Display and Keyboard Troubleshooting (Module 6)',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the most common display technology used today?',
            options: [
              'CRT (Cathode Ray Tube)',
              'LCD (Liquid Crystal Display)',
              'OLED (Organic Light Emitting Diode)',
              'Plasma'
            ],
            correct: 1,
            explanation: 'LCD (Liquid Crystal Display) is the most common display technology used today, especially in laptops and desktop monitors.'
          },
          {
            question: 'What should you do first when troubleshooting a "no display" issue?',
            options: [
              'Replace the graphics card',
              'Check if the monitor is powered on',
              'Reinstall the operating system',
              'Replace the motherboard'
            ],
            correct: 1,
            explanation: 'Always start with the basics: check if the monitor is powered on and connected properly before assuming hardware failure.'
          },
          {
            question: 'Which component provides backlighting for LCD displays?',
            options: [
              'The LCD panel itself',
              'LED strips or CCFL tubes',
              'The graphics card',
              'The motherboard'
            ],
            correct: 1,
            explanation: 'LCD displays require backlighting, which is provided by LED strips or CCFL tubes behind the LCD panel.'
          },
          {
            question: 'What is a "dead pixel"?',
            options: [
              'A pixel that is always black',
              'A pixel that is always white',
              'A pixel that does not change color',
              'All of the above'
            ],
            correct: 3,
            explanation: 'A dead pixel can be always black, always white, or stuck on a specific color and does not change when the display content changes.'
          },
          {
            question: 'What should you do immediately after spilling liquid on a laptop keyboard?',
            options: [
              'Continue using it normally',
              'Power off and remove the battery',
              'Wipe it with a cloth',
              'Turn it upside down'
            ],
            correct: 1,
            explanation: 'Immediately power off the laptop and remove the battery to prevent electrical damage from the liquid.'
          },
          {
            question: 'Which keyboard type is most common in laptops?',
            options: [
              'Mechanical keyboards',
              'Membrane keyboards',
              'Scissor switch keyboards',
              'Optical keyboards'
            ],
            correct: 2,
            explanation: 'Scissor switch keyboards are most common in laptops due to their low profile and quiet operation.'
          },
          {
            question: 'What is "ghost typing"?',
            options: [
              'Typing without looking at the keyboard',
              'Keys registering without being pressed',
              'Typing in a different language',
              'Using keyboard shortcuts'
            ],
            correct: 1,
            explanation: 'Ghost typing occurs when keys register input without being physically pressed, often due to liquid damage or electrical issues.'
          },
          {
            question: 'What should you check if characters appear wrong when typing?',
            options: [
              'The keyboard language settings',
              'The graphics card',
              'The hard drive',
              'The power supply'
            ],
            correct: 0,
            explanation: 'Wrong characters often indicate incorrect keyboard language settings or layout configuration.'
          },
          {
            question: 'What is the purpose of a digitizer in a display?',
            options: [
              'To provide backlighting',
              'To make the display touch-sensitive',
              'To improve color accuracy',
              'To increase brightness'
            ],
            correct: 1,
            explanation: 'A digitizer is a touch-sensitive layer that allows the display to respond to touch input.'
          },
          {
            question: 'What should you do before replacing a laptop display?',
            options: [
              'Backup all data',
              'Update the BIOS',
              'Replace the hard drive',
              'Install new drivers'
            ],
            correct: 0,
            explanation: 'Always backup all data before performing any hardware repairs to prevent data loss.'
          }
        ]
      }
    }
  ]
};
