import { Module } from '@/types/course';

const certifiedComputerRepairModule3: Module = {
  id: 3,
  title: 'Troubleshooting & Diagnostics',
  description: 'This module equips learners with the skills to diagnose and resolve common hardware issues, focusing on Power-On Self-Test (POST) errors and systematic troubleshooting techniques. Students will learn to interpret beep codes, error messages, and diagnostic tool outputs.',
  lessons: [
    {
      id: 9,
      title: 'Diagnosing POST Errors',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/F78v7edrNeA',
        textContent: `
# Diagnosing POST Errors

## Key Features
**Systematic Hardware Diagnostics**: Learners develop expertise in identifying and resolving POST errors, enabling rapid isolation of hardware issues for efficient repairs.

This section covers the Power-On Self-Test (POST), a critical BIOS/UEFI diagnostic process that checks essential hardware before booting. Learners will interpret beep codes, LED patterns, and error messages to diagnose issues like RAM or CPU failures. Video tutorials and simulations teach systematic troubleshooting, ensuring learners can resolve boot issues confidently, aligning with professional standards and preparing for certification exams.

## POST Process Overview
**Power-On Self-Test (POST)**: Diagnostic sequence run by BIOS/UEFI at startup.
POST checks CPU, RAM, motherboard chipset, graphics card, and peripherals, ensuring functionality before booting the OS. Learners will understand the sequence to diagnose early-stage failures, ensuring quick identification of hardware issues.

**Process**: Power supplied, BIOS initializes, components checked, and control passed to boot loader if no issues.
Errors result in beep codes, LED patterns, screen messages, or POST card codes. Learners will analyze these outputs to pinpoint faults, streamlining repairs.

**Common Outputs**: Beep codes (e.g., 1 short for success), LED blinks, error messages, or diagnostic card displays.
Understanding output variations helps learners use motherboard manuals for precise diagnosis, ensuring accurate repairs.

## Common POST Beep Codes
- **1 Short Beep**: POST completed successfully.
- **Continuous Beeps**: Power supply or motherboard issue.
- **1 Long, 2 Short Beeps**: Graphics card error.
- **3 Short Beeps**: RAM failure.
- **5 Short Beeps**: CPU failure.
- **No Beep**: Power, motherboard, or speaker issue.

**Note**: Check motherboard manual for BIOS-specific codes (AMI, Award, Phoenix).

## Common POST Error Messages
- **Keyboard Error or No Keyboard Present**: Keyboard not connected or faulty.
- **CMOS Checksum Error**: Corrupted BIOS settings or bad CMOS battery.
- **No Boot Device Found**: Hard drive disconnected or failed.
- **Memory Test Failed**: Faulty RAM.
- **CPU Fan Error**: Fan not connected or malfunctioning.

## Diagnostic Steps for POST Errors
1. **Listen and Count Beeps**: Identify pattern and refer to BIOS documentation.
2. **Observe LED or Display Code**: Check onboard LEDs or numeric displays.
3. **Check Hardware Connections**: Reseat RAM, GPU, and power cables; disconnect peripherals.
4. **Test with Minimum Hardware**: Use only motherboard, CPU, cooler, RAM, PSU.
5. **Clear CMOS/Reset BIOS**: Remove battery or use jumper for 1–2 minutes.
6. **Use Diagnostic Tools**: POST cards for desktops, built-in diagnostics (F12/F9) for laptops.

## Best Practices
- Work methodically, testing one component at a time.
- Label removed parts for reassembly.
- Keep a POST code reference chart handy.
- Document symptoms and tests for accurate troubleshooting.

## Summary
Diagnosing POST errors is a critical first step in computer repair. Understanding beep codes, error messages, and minimal hardware testing enables learners to isolate hardware issues quickly, saving time and ensuring effective repairs, aligning with industry standards.
        `
      }
    },
    {
      id: 10,
      title: 'Common Hardware Issues',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/ba4ToTzqF2o',
        textContent: `
# Common Hardware Issues

## Key Features
**Systematic Issue Resolution**: Learners master diagnosing and fixing common hardware issues, from power failures to display problems, ensuring reliable system performance.

This section covers prevalent hardware issues like power, storage, display, and overheating, teaching learners to identify symptoms, pinpoint causes, and apply fixes. Video tutorials and simulations provide practical experience, enabling learners to troubleshoot efficiently and prepare for real-world repairs and CompTIA A+ certification.

## Power Issues
**Symptoms**: No power, no LEDs/fans, unexpected shutdowns, intermittent power loss.
**Causes**: Faulty PSU, damaged power cable, defective DC jack, dead CMOS battery.
**Fix**: Check/replace PSU or adapter, inspect cables, reseat/replace DC jack, test CMOS battery.

## Hard Drive/Storage Issues
**Symptoms**: OS won't boot, clicking noises, "Operating system not found," slow access/freezes.
**Causes**: Drive failure, loose SATA/M.2 connection, corrupted file system, bad sectors.
**Fix**: Use CrystalDiskInfo, reconnect/replace drive, attempt data recovery, reformat or replace.

## Display Problems
**Symptoms**: Blank screen, flickering, lines, dim backlight.
**Causes**: Loose/damaged display cable, faulty GPU, damaged screen, failed inverter.
**Fix**: Reseat cable, test with external monitor, replace screen/GPU, check backlight/inverter.

## Overheating and Cooling Issues
**Symptoms**: Shutdowns, high fan noise, hot case, CPU/GPU throttling.
**Causes**: Dust buildup, dried thermal paste, faulty fan, blocked airflow.
**Fix**: Clean vents/fans, replace thermal paste, check fan in BIOS, replace faulty fan.

## Keyboard and Touchpad Issues
**Symptoms**: Unresponsive/stuck keys, ghost typing, cursor jumps/freezes.
**Causes**: Loose ribbon cable, water damage, faulty keyboard/touchpad, driver issues.
**Fix**: Reconnect/replace cables, replace keyboard/touchpad, update drivers.

## RAM (Memory) Problems
**Symptoms**: Crashes, BSOD, failure to boot, beep codes.
**Causes**: Bad RAM module, incorrect configuration, dirty/damaged slots.
**Fix**: Test one RAM stick, clean slots, reseat/replace RAM.

## Motherboard Issues
**Symptoms**: No power/display, peripherals not working, POST errors, USB failures.
**Causes**: Damaged components/traces, failed capacitors, short circuits, liquid damage.
**Fix**: Inspect for damage, test minimal components, replace/repair motherboard.

## I/O Ports and Peripheral Issues
**Symptoms**: Devices not recognized, loose/broken ports, intermittent connectivity.
**Causes**: Faulty USB/HDMI/Ethernet port, driver conflicts, physical damage.
**Fix**: Check soldering, reinstall drivers, replace damaged ports.

## Audio Problems
**Symptoms**: No sound, audio cuts, distorted sound.
**Causes**: Driver issues, faulty jack/speaker, disabled BIOS audio.
**Fix**: Reinstall drivers, test external speakers, enable BIOS audio.

## Peripheral and Device Issues
**Symptoms**: Mouse/keyboard/printer not working, USB/Bluetooth/Wi-Fi failures.
**Causes**: Faulty ports, driver/software conflicts, hardware malfunctions.
**Fix**: Test alternate ports/devices, reinstall drivers, replace faulty devices.

## Diagnostic Tools to Use
- **Multimeter**: Tests voltage, continuity, DC jacks.
- **POST Card**: Diagnoses motherboard boot issues.
- **MemTest86**: Tests RAM for errors.
- **CrystalDiskInfo**: Checks HDD/SSD health.
- **HWMonitor**: Monitors temperatures, fan speeds, voltages.

## Summary
Systematic troubleshooting isolates hardware issues through symptom analysis and targeted fixes. Learners will master diagnosing power, storage, display, and other issues, ensuring reliable repairs and professional competency.
        `
      }
    },
    {
      id: 11,
      title: 'Using Multimeters and Diagnostic Software',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/c89RojX624U',
        textContent: `
# Using Multimeters and Diagnostic Software

## Key Features
**Precision Diagnostics**: Learners master multimeters and software for accurate hardware fault detection, enhancing repair efficiency.

This section teaches the use of multimeters for electrical testing and diagnostic software for system health analysis. Learners will test voltages, check component health, and interpret software data, ensuring precise diagnostics. Video tutorials and simulations provide hands-on practice, preparing learners for professional repairs and CompTIA A+ certification.

## How to Use a Multimeter for PC Repairs

### Testing a Laptop Charger/Adapter
Set to DC Voltage (20V), test outer (ground) and inner pin (positive), compare to rating (~19V).
Learners will verify charger functionality, ensuring proper power delivery.

### Testing a CMOS Battery
Set to DC Voltage, expect ~3V for CR2032.
Learners will confirm battery health, resolving CMOS errors.

### Checking Continuity of a DC Jack
Set to Continuity mode, test terminals for beep.
Learners will diagnose jack connectivity, ensuring power flow.

### Measuring Resistance in Fuses/Traces
Expect near 0 ohms for continuity.
Learners will test circuit integrity, identifying open circuits for repair.

## Multimeter Safety Tips
- Never measure current in live circuits unless instructed.
- Start with highest range, work downwards.
- Remove power before testing resistance/continuity.
- Use insulated probes and ESD strap.

## Using Diagnostic Software
**Purpose**: Identifies hardware status, thermal conditions, disk health, boot errors, RAM faults.

### Common Tools:
- **MemTest86**: Tests RAM errors/stability.
- **CrystalDiskInfo**: Checks HDD/SSD S.M.A.R.T. data.
- **HWiNFO/HWMonitor**: Monitors temps, fan speeds, voltages.
- **CPU-Z/GPU-Z**: Identifies processor/graphics hardware.
- **Speccy**: Provides detailed hardware profile.
- **PC Doctor/PassMark**: Comprehensive system testing.
- **BIOS Diagnostic Tools**: Built-in tests (F2, F12, Esc).

## Steps for Using Diagnostic Software
1. Install/run software (portable options available).
2. Review dashboard: temps (<90°C), HDD health, RAM/storage details.
3. Run tests: MemTest86 (4 passes), CrystalDiskInfo (S.M.A.R.T.), HWMonitor (voltages/thermals).
4. Document findings for repair reports.

## Interpreting Software Data
- **Slow system/crashes**: MemTest86 errors indicate RAM issues.
- **Freezing**: CrystalDiskInfo "Caution" signals drive issues.
- **Shutdowns**: HWMonitor temps >90°C indicate overheating.
- **GPU failures**: GPU-Z errors/no data.

## Optional Bootable Diagnostic Tools
- **Hiren's BootCD PE**: Full repair suite.
- **Ultimate Boot CD (UBCD)**: Hardware tests.
- **Windows Memory Diagnostic**: RAM testing (F8 or mdsched.exe).

## Summary
Multimeters and diagnostic software enable precise fault detection. Learners will master electrical testing and system health analysis, ensuring efficient, professional repairs.
        `
      }
    },
    {
      id: 12,
      title: 'Quiz: Troubleshooting & Diagnostics',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What does the POST process do during computer startup?',
            options: ['Installs drivers', 'Loads the operating system', 'Diagnoses essential hardware components', 'Updates BIOS firmware'],
            correct: 2,
            explanation: 'The POST (Power-On Self-Test) process diagnoses essential hardware components before booting the operating system.'
          },
          {
            question: 'Which of the following beep codes typically indicates a RAM failure?',
            options: ['1 short beep', 'Continuous beeps', '3 short beeps', '5 short beeps'],
            correct: 2,
            explanation: '3 short beeps typically indicate a RAM failure in most BIOS systems.'
          },
          {
            question: 'What might a "No boot device found" error message indicate?',
            options: ['Faulty RAM', 'Disconnected or failed storage drive', 'GPU failure', 'Corrupted BIOS'],
            correct: 1,
            explanation: 'A "No boot device found" error typically indicates that the hard drive is disconnected or has failed.'
          },
          {
            question: 'What should be your first step if a system has no power and no display?',
            options: ['Replace the hard drive', 'Check speaker cables', 'Test with minimum components', 'Install new drivers'],
            correct: 2,
            explanation: 'Testing with minimum components helps isolate the problem by eliminating potential faulty components.'
          },
          {
            question: 'Which tool helps you diagnose motherboard boot problems using numeric codes?',
            options: ['CrystalDiskInfo', 'Multimeter', 'POST diagnostic card', 'HWMonitor'],
            correct: 2,
            explanation: 'A POST diagnostic card displays numeric codes that help identify motherboard boot problems.'
          },
          {
            question: 'If a laptop shuts down due to overheating, which of the following is the most appropriate fix?',
            options: ['Format the hard drive', 'Clean fans and vents', 'Reinstall the OS', 'Reset the BIOS'],
            correct: 1,
            explanation: 'Cleaning fans and vents is the most appropriate fix for overheating issues.'
          },
          {
            question: 'What is the purpose of MemTest86?',
            options: ['Monitor fan speed', 'Diagnose power supply voltage', 'Test RAM for errors', 'Detect GPU driver problems'],
            correct: 2,
            explanation: 'MemTest86 is specifically designed to test RAM for errors and memory-related issues.'
          },
          {
            question: 'What reading should a healthy CMOS battery (CR2032) show on a multimeter?',
            options: ['1.5V', '5V', '3V', '12V'],
            correct: 2,
            explanation: 'A healthy CR2032 CMOS battery should read approximately 3V on a multimeter.'
          },
          {
            question: 'If you hear 1 long and 2 short beeps during POST, what is the likely issue?',
            options: ['RAM failure', 'CPU overheating', 'Graphics card error', 'No keyboard detected'],
            correct: 2,
            explanation: '1 long and 2 short beeps typically indicate a graphics card error during POST.'
          },
          {
            question: 'Which of the following best describes the purpose of CrystalDiskInfo?',
            options: ['Monitor CPU temperature', 'View BIOS version', 'Check HDD/SSD health and S.M.A.R.T. data', 'Benchmark gaming performance'],
            correct: 2,
            explanation: 'CrystalDiskInfo is designed to check hard drive and SSD health by reading S.M.A.R.T. data.'
          }
        ]
      }
    }
  ]
};

export default certifiedComputerRepairModule3; 