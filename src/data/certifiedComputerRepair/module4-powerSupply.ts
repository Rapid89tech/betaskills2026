import { Module } from '@/types/course';

const certifiedComputerRepairModule4: Module = {
  id: 4,
  title: 'Power Supply & Battery Repair',
  description: 'This module equips learners with the skills to diagnose and resolve power-related issues in laptops and desktops, focusing on power supply failures, battery issues, and DC jack repairs. Students will learn to use multimeters and diagnostic tools to test adapters, jacks, and batteries.',
  lessons: [
    {
      id: 13,
      title: 'Types of Power Issues',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/wqL3ZT26i4c',
        textContent: `
# Types of Power Issues

## Key Features
**Comprehensive Power Diagnostics**: Learners develop expertise in identifying and resolving power issues, from dead systems to battery failures, ensuring reliable device operation.

This section covers common power issues like no power, battery not charging, and random shutdowns, teaching learners to diagnose causes and apply fixes. Video tutorials and simulations provide practical experience in testing power components, enabling learners to restore functionality efficiently and align with professional repair standards.

## No Power / Dead System
**Symptoms**: No lights, sounds, display, fan movement, or charging indicators.
**Possible Causes**: Faulty AC adapter, damaged DC jack, shorted motherboard circuit, blown fuse, dead battery/CMOS battery, component short.
**Solutions**: Test charger with multimeter (~19V), check DC jack continuity, use known good battery/charger, inspect motherboard for damage, reset CMOS, bench test with minimal components.

## Battery Not Charging
**Symptoms**: Runs only on AC, "Not Charging" status, stuck percentage, no charging light.
**Possible Causes**: Faulty battery, defective adapter, malfunctioning charging circuit/BMS, outdated BIOS, loose battery connection.
**Solutions**: Replace battery, test adapter voltage, update BIOS, reseat/clean connectors, replace charging IC.

## Intermittent Power / Random Shutdowns
**Symptoms**: Random power-offs, multiple boot attempts, sudden restarts.
**Possible Causes**: Overheating, power supply instability, loose motherboard/battery connector, corrupted OS/malware, failing RAM/drive.
**Solutions**: Clean fan/heatsink, replace thermal paste, replace adapter, reseat RAM/drive, scan for viruses.

## Overheating and Thermal Shutdown
**Symptoms**: Hot device, loud fan, automatic shutdowns, BIOS temperature alerts.
**Possible Causes**: Blocked vents, broken fan, dried thermal compound, dust buildup, overclocking/faulty BIOS.
**Solutions**: Clean vents/fan, replace thermal paste, replace fan, adjust power settings, update BIOS.

## Continuous Reboot Loop (Boot Loop)
**Symptoms**: System restarts immediately, cannot reach BIOS/OS.
**Possible Causes**: Faulty RAM/CPU, corrupt BIOS, power delivery failure, faulty PSU, malware/OS corruption.
**Solutions**: Reseat/replace RAM, flash BIOS, check PSU voltages, boot from clean media, scan/fix with recovery tools.

## Short Circuit / Burnt Smell
**Symptoms**: No power, burnt plastic smell, adapter light off when plugged in, visible component damage.
**Possible Causes**: Component failure (MOSFETs, capacitors), power surge, liquid spill, incorrect charger.
**Solutions**: Inspect motherboard, replace shorted components, clean corrosion, use proper charger.

## Power Button Not Working
**Symptoms**: No response to power button, works when jump-started on motherboard.
**Possible Causes**: Faulty power button/cable, broken solder joint, disconnected ribbon.
**Solutions**: Test button continuity, replace/re-solder button, jump-start to confirm.

## Conclusion
Identifying power issues requires systematic observation, testing with multimeters and POST codes, isolating components, and applying targeted repairs. Learners will adopt safe, methodical approaches, ensuring professional power system repairs.
        `
      }
    },
    {
      id: 14,
      title: 'Laptop Battery Replacement',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ba4ToTzqF2o',
        textContent: `
# Laptop Battery Replacement

## Key Features
**Safe and Effective Battery Repairs**: Learners master the identification, testing, and replacement of laptop batteries, ensuring safe and reliable power solutions.

This section teaches learners to diagnose battery issues, perform safe replacements, and verify functionality. Video tutorials and simulations cover removable and internal battery procedures, equipping learners with practical skills for professional repairs and CompTIA A+ certification.

## Understanding Laptop Batteries
**Battery Types**: Li-ion (high capacity, durable), Li-Po (slimmer, sensitive).
**Form Factors**: Removable (external latches), internal (requires disassembly).

## Signs of a Failing Battery
- **Rapid Discharge**: Loss of cell capacity.
- **Laptop Shuts Off Randomly**: Battery no longer holds charge.
- **Battery Not Detected**: Connection or failure issue.
- **Battery Status "Replace Soon" or "Not Charging"**: Firmware/hardware fault.
- **Physical Bulging**: Critical swelling, requires immediate replacement.

## Tools Required for Battery Replacement
Phillips/Torx screwdrivers, plastic spudger, anti-static wrist strap, replacement battery (OEM recommended), tweezers, multimeter.

## Battery Replacement Procedure
**For Removable Batteries**: Power off, unplug, slide latches, remove, insert new battery, secure, test boot-up.
**For Internal Batteries**: Power off, unplug, use ESD strap, remove bottom panel, disconnect cable, unscrew battery, remove, install new battery, reassemble, test.

## Testing After Replacement
- Check Battery Settings (Windows/Linux/macOS) for detection.
- Use HWMonitor/BatteryInfoView for monitoring.
- Test charge for 30–60 minutes to confirm behavior.

## Safety Precautions
- Never puncture/bend battery (fire hazard).
- Avoid third-party batteries unless verified.
- Isolate swollen batteries in fire-safe bags, do not reuse.
- Dispose at certified e-waste centers.

## Quick Reference Checklist
1. Power off and unplug laptop.
2. Use ESD protection.
3. Access battery (panel/latches).
4. Disconnect/remove old battery.
5. Install new battery, reconnect cable.
6. Test charging/health.
7. Recycle old battery responsibly.
        `
      }
    },
    {
      id: 15,
      title: 'DC Jack and Adapter Testing',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/AdGHqfVFQdY',
        textContent: `
# DC Jack and Adapter Testing

## Key Features
**Precise Power Input Diagnostics**: Learners master testing and repairing DC jacks and adapters, ensuring reliable power delivery.

This section covers diagnosing DC jack and adapter issues using multimeters, identifying symptoms, and performing replacements. Video tutorials and simulations teach safe testing and repair techniques, preparing learners for professional power system repairs and certification.

## Understanding the Components
**DC Jack**: Connects external power to motherboard, soldered or cable-attached.
**Adapter/Charger**: Converts AC to DC (~19V, 3.42A), uses barrel/USB-C connector.

## Common Symptoms of DC Jack or Adapter Problems
- **Laptop Not Charging**: Faulty adapter/jack.
- **Adapter Light Off When Plugged**: Shorted jack/motherboard.
- **Hot Adapter**: Overcurrent/short.
- **Loose/Wobbly Connector**: Damaged jack.
- **Intermittent Charging**: Broken pins/solder joints.

## Tools Required for Testing
Digital multimeter (DC voltage/continuity), known-good adapter, tweezers, screwdriver kit, ESD gear.

## Testing the Laptop Adapter
1. **Check Label Specifications**: Confirm output (~19V, 3.42A).
2. **Set Multimeter to DC Voltage**: Red probe to inner pin (positive), black to outer ring (ground), expect ~19V.
3. **Wiggle Test**: Check for voltage fluctuations indicating cable damage.

## Testing the DC Jack
1. **Visual Inspection**: Check for cracks, bent pins, looseness, burn marks.
2. **Power-On Voltage Test**: Measure battery terminals (~12–19V).
3. **Continuity Test**: Disconnect power/battery, test pin-to-motherboard trace.
4. **Live Voltage Test**: Probe jack terminals for incoming voltage.

## Repair or Replacement
**DC Jack**: Replace cable-type or desolder board-soldered jacks, ensure clean pads.
**Adapter**: Match voltage, current, connector type, prefer OEM.

## Safety Precautions
- Unplug power, remove battery before testing.
- Use anti-static tools, grounding straps.
- Avoid touching live DC pins.
- Use known-good adapter for testing.

## DC Jack & Adapter Troubleshooting Flowchart
1. Press START or Power Button.
2. Is Laptop Powering On?
   - If Yes: Good.
   - If No: DC Jack/Adapter Issue (Check other components).
3. Is Power Adapter LED On?
   - If No: Test Adapter with Multimeter.
   - If No Output: Replace Adapter.
   - If Output OK: Problem in Laptop/DC Jack.
4. If Yes: Adapter LED is On.
5. Does Adapter Voltage Match Label (~19V)?
   - If No: Replace Adapter.
   - If Yes: Wiggle Adapter Plug — Does Voltage Fluctuate?
     - If Yes: Cable Damage — Replace Adapter.
     - If No: Does Adapter Fit Snugly in DC Jack?
       - If No: DC Jack Loose/Broken — Inspect/Replace Jack.
       - If Yes: Open Laptop, Inspect DC Jack Solder Points.
         - If Cracked/Burnt: Resolder/Replace DC Jack.
         - Check Continuity from DC Jack to Motherboard.
           - If No Continuity: Broken Trace/Jack — Repair/Replace.
           - If Yes: Check Voltage at Motherboard Power Rails.
             - If No Voltage: Power Circuit Issue (Refer to Board-Level Repair).
             - If Yes: Is Battery Charging?
               - If No: Test/Replace Battery or Charging IC.
               - If Yes: Laptop Works Normally — Problem Solved.

## Tips for Using This Flowchart
- Start with adapter test before opening laptop.
- Use known-good universal adapter for comparison.
- Use ESD protection for internal testing.
- Escalate board-level issues to advanced repair if needed.
        `
      }
    },
    {
      id: 16,
      title: 'Quiz: Power Supply & Battery Repair',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which of the following is NOT a typical symptom of a laptop with no power?',
            options: ['No display or lights', 'Fan spins but no charging light', 'BIOS error message', 'No fan or sound when pressing power'],
            correct: 2,
            explanation: 'A BIOS error message would appear after the system has powered on, so it\'s not a symptom of no power.'
          },
          {
            question: 'What is the most common voltage output for a standard laptop adapter?',
            options: ['5V', '12V', '19V', '24V'],
            correct: 2,
            explanation: 'Most laptop adapters output around 19V DC, though the exact voltage varies by manufacturer.'
          },
          {
            question: 'A laptop runs fine on AC but shows "Plugged in, not charging." What is the LEAST likely cause?',
            options: ['Faulty battery', 'Defective charger', 'Bad display cable', 'Damaged charging IC'],
            correct: 2,
            explanation: 'A bad display cable would affect the screen, not the charging functionality.'
          },
          {
            question: 'What tool should you use to test continuity between a DC jack and the motherboard?',
            options: ['Oscilloscope', 'Signal tracer', 'Digital multimeter', 'Voltage regulator'],
            correct: 2,
            explanation: 'A digital multimeter set to continuity mode can test the electrical connection between the DC jack and motherboard.'
          },
          {
            question: 'During a wiggle test on an adapter, the voltage reading cuts in and out. What does this indicate?',
            options: ['Dead CMOS battery', 'Bad RAM', 'Loose or broken adapter wiring', 'BIOS failure'],
            correct: 2,
            explanation: 'Fluctuating voltage during a wiggle test indicates loose or broken wiring inside the adapter cable.'
          },
          {
            question: 'What is the first step before replacing an internal laptop battery?',
            options: ['Open the laptop\'s display', 'Remove the SSD', 'Power off and unplug the device', 'Format the hard drive'],
            correct: 2,
            explanation: 'Always power off and unplug the device before working on internal components to prevent electrical damage.'
          },
          {
            question: 'Which of the following is a sign of a failing lithium battery?',
            options: ['Laptop charges faster than normal', 'Battery lasts longer than usual', 'Battery percentage drops suddenly', 'Battery icon turns red'],
            correct: 2,
            explanation: 'Sudden drops in battery percentage indicate the battery is losing capacity and may be failing.'
          },
          {
            question: 'If a laptop restarts randomly, what is the FIRST thing you should check?',
            options: ['Internet connection', 'Thermal paste and cooling fan', 'Printer settings', 'Display brightness'],
            correct: 1,
            explanation: 'Random restarts are often caused by overheating, so checking thermal paste and cooling should be the first step.'
          },
          {
            question: 'A burnt smell and adapter LED turning off when plugged in may indicate:',
            options: ['Normal behavior', 'Dead battery', 'Short circuit on motherboard', 'BIOS update required'],
            correct: 2,
            explanation: 'A burnt smell and adapter LED turning off typically indicates a short circuit on the motherboard.'
          },
          {
            question: 'When testing a barrel-type adapter with a multimeter, the red probe should contact:',
            options: ['Outer shell (negative)', 'Power switch', 'Inner pin (positive)', 'Laptop battery terminal'],
            correct: 2,
            explanation: 'The red probe should contact the inner pin (positive) while the black probe contacts the outer shell (negative/ground).'
          }
        ]
      }
    }
  ]
};

export default certifiedComputerRepairModule4; 