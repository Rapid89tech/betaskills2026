import { Module } from '@/types/course';

const certifiedComputerRepairModule6: Module = {
  id: 6,
  title: 'Display, Keyboard, and Touchpad Repairs',
  description: 'This module equips learners with the skills to diagnose, troubleshoot, and replace faulty laptop displays, keyboards, and touchpads, addressing common input and output issues. Students will learn to identify display technologies, diagnose screen and input device failures, and perform safe replacements.',
  lessons: [
    {
      id: 21,
      title: 'Understanding Display Technology',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/vnxqJCFcze4',
        textContent: `
# Understanding Display Technology

## Key Features
**Display Identification and Repair**: Learners master identifying laptop display types, resolutions, and connectors, ensuring accurate diagnosis and replacement.

This section covers LCD, LED, IPS, and OLED displays, their resolutions, connectors, and backlighting systems, including inverter boards for older models. Video tutorials and simulations teach learners to differentiate technologies and handle repairs, aligning with professional standards and certification requirements.

## Introduction to Display Technology
**Display**: Critical for visual output, varies by size, resolution, panel type, and backlight.

### Types of Laptop Displays:
- **LCD**: CCFL backlight, inverter required, bulky, less efficient, mostly obsolete.
- **LED**: Modern, LED backlight, slim, energy-efficient, better color reproduction.
- **IPS**: LED subtype, superior color accuracy, wide viewing angles, used in premium laptops.
- **OLED**: Pixel-level light, vibrant colors, rare in laptops, expensive.

### Display Resolutions:
- **HD (1366x768)**: Basic laptops.
- **Full HD (1920x1080)**: Most modern laptops.
- **QHD (2560x1440)**: High-end laptops.
- **UHD/4K (3840x2160)**: Multimedia/professional use.

## Display Connectors
**Connectors**: Link screen to motherboard via ribbon cables.
- **eDP**: Modern, supports high resolutions, fast refresh rates.
- **LVDS**: Older, limited resolution support.
- **30-pin/40-pin**: Common connector types, must match during replacement.

## Backlight Types
- **CCFL**: Older LCDs, requires inverter, less efficient.
- **LED**: Modern, integrated, efficient, no inverter needed.

## Inverter Board (for LCDs)
Converts DC to AC for CCFL backlight; faulty inverter causes dim screens.
Not used in LED screens.

## Common Display Issues by Type
- **Dim Screen**: Faulty inverter/backlight (LCD).
- **Flickering Display**: Loose cable/failing screen (LCD/LED).
- **Color Distortion**: Damaged cable/GPU (all types).
- **No Display, Backlight Works**: Faulty panel (all types).
- **Dead Pixels**: Manufacturing defect/damage (all types).

## Display Replacement Considerations
Match size, resolution, connector (30-pin/40-pin), mounting brackets.
Use plastic pry tools, ESD protection, disconnect battery.

## Summary
Display technology varies by type (LCD, LED, IPS, OLED), resolution, and connector. Learners will diagnose and replace screens, ensuring compatibility and functionality, with careful handling to prevent damage.
        `
      }
    },
    {
      id: 22,
      title: 'Diagnosing Display Issues',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/e9iy30J00-k',
        textContent: `
# Diagnosing Display Issues

## Key Features
**Systematic Display Troubleshooting**: Learners master diagnosing display issues, distinguishing between screen, cable, and GPU problems for precise repairs.

This section covers diagnosing flickering, dim screens, dead pixels, and no-display issues using external monitors and systematic steps. Video tutorials and simulations teach learners to isolate causes, preparing them for professional repairs and certification.

## Introduction
Display issues stem from screen, cable, GPU, or software. Systematic diagnosis isolates causes efficiently.

## Common Display Symptoms and Causes
- **No Display/Black Screen**: Disconnected/broken cable, faulty screen, bad GPU.
- **Dim Screen**: Inverter (CCFL) or backlight (LED) failure.
- **Flickering Screen**: Loose connector, faulty cable, GPU instability.
- **Lines on Screen**: Damaged screen matrix, loose cable.
- **Distorted Colors**: Damaged screen, cable interference, driver issues.
- **Dead/Stuck Pixels**: Manufacturing defect, physical damage.
- **Backlight On, No Image**: GPU or screen failure.
- **External Monitor Works, Laptop Screen Doesn't**: Faulty screen/cable.

## Initial Diagnostic Steps
1. **Visual Inspection**: Check for cracks, discoloration, liquid damage.
2. **External Monitor Test**: Connect via HDMI/VGA/USB-C; working external display indicates screen/cable issue.
3. **Power Cycle**: Hold power button 15 seconds, reboot, observe changes.
4. **Boot into BIOS**: BIOS logo display confirms hardware functionality, else hardware issue likely.

## Detailed Troubleshooting by Symptom
- **No Display/Black Screen**: Check brightness, test external monitor, reset CMOS, reseat cable.
- **Dim Screen**: Use flashlight test; replace inverter (LCD) or screen (LED).
- **Lines/Artifacts**: Move screen to check flicker, reconnect/replace cable, replace screen if needed.
- **Flickering Screen**: Update drivers, test in Safe Mode, check cable.
- **Color Distortion**: Check OS/GPU settings, test external monitor, reseat/replace cable.

## Diagnostic Tools and Methods
- **External Monitor**: Tests GPU functionality.
- **Flashlight Test**: Detects backlight failure.
- **Multimeter**: Tests inverter/backlight voltage (advanced).
- **Driver Tools**: Update/roll back GPU drivers via Device Manager/Safe Mode.
- **BIOS Check**: Confirms hardware-level display function.

## Safety and Handling
Power off, remove battery, use ESD strap, handle screens gently.

## Quick Checklist for Display Diagnostics
1. External monitor test.
2. BIOS display test.
3. Flashlight backlight check.
4. Cable/connector inspection.
5. Screen panel inspection.
6. Driver updates/reinstallation.

## Summary
Diagnosing display issues requires step-by-step testing to isolate screen, cable, or GPU faults. Learners will use non-invasive tests and tools to ensure accurate, cost-effective repairs.
        `
      }
    },
    {
      id: 23,
      title: 'Laptop Screen Replacement',
      duration: '50 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/uMNIHeP3vu4',
        textContent: `
# Laptop Screen Replacement

## Key Features
**Safe Screen Replacement**: Learners master disassembling, replacing, and testing laptop screens, ensuring compatibility and functionality.

This section covers replacing LCD and LED screens, including bezel removal, cable handling, and post-installation testing. Video tutorials and simulations teach safe procedures, preparing learners for professional repairs and certification.

## Understanding Laptop Screen Types
- **LCD**: CCFL backlight, inverter, thicker, older.
- **LED**: Integrated backlight, slim, efficient, modern.

## Tools Required
Precision screwdrivers (#00/#0 Phillips), plastic pry tools, ESD strap, tweezers, soft cloth, replacement screen.

## Precautions Before Starting
Power off, disconnect adapter, remove battery, discharge power (hold button 10–15 seconds), use ESD strap.

## Identifying the Correct Replacement Screen
Check model number on screen back, match resolution, size, connector (30-pin/40-pin), brackets; verify via supplier.

## Step-by-Step Screen Replacement Procedure
1. **Remove Screen Bezel**: Pry gently with plastic tool, remove screws under bumpers.
2. **Unscrew Screen Panel**: Remove 2–6 bracket screws.
3. **Tilt Screen Forward**: Place on keyboard, avoid cable strain.
4. **Disconnect Video Cable**: Peel tape, pull connector straight, note webcam/sensor cables.
5. **Install New Screen**: Align, reconnect cable, tape connector, screw into brackets.
6. **Reassemble**: Snap bezel, reattach screws/bumpers.
7. **Power On and Test**: Check brightness, colors, pixel integrity, webcam/sensors.

## Post-Installation Checks
Adjust screen angle for stability, run color slideshow for pixel test, verify webcam/sensors.

## Common Mistakes to Avoid
- **Not Disconnecting Battery**: Risks short circuits.
- **Forcing Connector Backward**: Damages pins.
- **Using Metal Tools**: Risks cracks/scratches.
- **Wrong Screen Size/Resolution**: Causes incompatibility.
- **Not Taping Connector**: Causes flickering/no image.

## Best Practices
Work on clean, static-free surface, photograph disassembly, organize screws, handle screen by edges.

## Summary
Screen replacement requires careful disassembly, correct screen selection, and thorough testing. Learners will perform delicate repairs, ensuring functionality and durability.
        `
      }
    },
    {
      id: 24,
      title: 'Keyboard Troubleshooting & Replacement',
      duration: '45 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/bfzEwAzG830',
        textContent: `
# Keyboard Troubleshooting & Replacement

## Key Features
**Effective Keyboard Repairs**: Learners master diagnosing and replacing laptop keyboards, addressing unresponsive keys, ghost typing, and other issues.

This section covers troubleshooting sticky, unresponsive, or ghosting keyboards and performing replacements. Video tutorials and simulations teach safe procedures, preparing learners for professional repairs and certification.

## Introduction
Keyboards, critical input devices, fail due to physical damage, wear, or software issues. Systematic diagnosis and replacement restore functionality.

## Common Keyboard Issues
- **Unresponsive Keys**: Damaged membrane, bad cable, motherboard failure.
- **Ghost Typing**: Liquid damage, short, malware.
- **Some Keys Not Working**: Dust, worn switches, faulty matrix.
- **Sticky/Repeating Keys**: Debris, broken mechanism.
- **Keyboard Not Detected**: Faulty connector, BIOS/driver issue.
- **Backlight Not Working**: Power/LED failure, BIOS setting.

## Troubleshooting Process

### Software Troubleshooting:
1. **Check OS Settings**: Update/reinstall drivers in Device Manager, check accessibility settings.
2. **Use On-Screen Keyboard**: Windows (Win+Ctrl+O) to test software vs hardware.
3. **Boot to BIOS**: Functional BIOS keys indicate software issue.
4. **External USB Keyboard Test**: Confirms internal keyboard fault if USB works.

### Hardware Troubleshooting:
1. **Inspect for Damage**: Check for missing keys, water spots, residue.
2. **Check Ribbon Cable**: Reseat cable in motherboard connector.
3. **Test on Another System**: If detachable, test on compatible laptop.

## Causes of Keyboard Failure
- **Liquid Damage**: Corrosion, shorts.
- **Dust/Debris**: Blocks actuation, causes shorts.
- **Wear and Tear**: Breaks domes/switches.
- **Improper Handling**: Loosens connections.
- **BIOS/Driver Issues**: Mimics hardware failure.

## Tools Required
Precision screwdrivers (#0/#00 Phillips), plastic spudger, ESD strap, tweezers, soft cloth.

## Keyboard Replacement Procedure
1. **Preparation**: Power off, disconnect charger, remove battery, discharge power, use ESD strap.
2. **Disassembly**: Remove keyboard screws (check for icons), pry bezel, lift keyboard gently.
3. **Disconnecting Keyboard**: Release ribbon cable latch, remove cable.
4. **Install New Keyboard**: Insert ribbon, lock latch, align keyboard, screw/snap in place.
5. **Testing**: Power on, test keys in Notepad/tester, verify backlight.

## Post-Replacement Checklist
- All keys responsive.
- No ghost typing.
- Ribbon cable seated.
- Backlight functional.
- Bezel reattached securely.

## Tips and Best Practices
Avoid excessive force, check for hidden screws, use compressed air for minor issues, note top case replacements.

## Summary
Keyboard troubleshooting and replacement require careful diagnosis and precise installation. Learners will restore input functionality, ensuring reliable repairs.
        `
      }
    },
    {
      id: 25,
      title: 'Touchpad Troubleshooting & Replacement',
      duration: '40 min',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/embed/twFWB0sp3bk',
        textContent: `
# Touchpad Troubleshooting & Replacement

## Key Features
**Reliable Touchpad Repairs**: Learners master diagnosing and replacing laptop touchpads, addressing unresponsiveness, erratic behavior, and hardware failures.

This section covers troubleshooting touchpad issues like unresponsiveness or erratic cursor movement and performing replacements. Video tutorials and simulations teach safe procedures, preparing learners for professional repairs and CompTIA A+ certification.

## Introduction
Touchpads, critical for laptop navigation, fail due to hardware, software, or connection issues. Systematic diagnosis and replacement restore functionality.

## Common Touchpad Issues
- **Unresponsive Touchpad**: Faulty touchpad, loose cable, driver issue.
- **Erratic Cursor**: Liquid damage, dirt, driver conflict, hardware failure.
- **Gestures Not Working**: Disabled settings, outdated drivers.
- **Touchpad Not Detected**: Disconnected cable, BIOS/driver issue.

## Troubleshooting Process

### Software Troubleshooting:
1. **Check OS Settings**: Update/reinstall drivers in Device Manager, check touchpad settings (e.g., enable/disable toggle).
2. **Test in Safe Mode**: Isolates driver/software issues.
3. **External Mouse Test**: Confirms internal touchpad fault if USB mouse works.

### Hardware Troubleshooting:
1. **Inspect for Damage**: Check for cracks, liquid residue, wear.
2. **Check Ribbon Cable**: Reseat cable in motherboard connector.
3. **Clean Surface**: Use isopropyl alcohol for dirt/sticky residue.

## Causes of Touchpad Failure
- **Liquid Damage**: Corrosion, shorts.
- **Dirt/Debris**: Blocks sensors.
- **Wear and Tear**: Wears out sensors/buttons.
- **Loose Cables**: Disconnects touchpad.
- **Driver/BIOS Issues**: Mimics hardware failure.

## Tools Required
Precision screwdrivers (#0/#00 Phillips), plastic spudger, ESD strap, tweezers, replacement touchpad.

## Touchpad Replacement Procedure
1. **Preparation**: Power off, disconnect charger, remove battery, discharge power, use ESD strap.
2. **Disassembly**: Remove bottom cover or keyboard (model-specific), locate touchpad.
3. **Disconnect Touchpad**: Release ribbon cable latch, remove cable.
4. **Remove Touchpad**: Unscrew or unclip touchpad, note adhesive.
5. **Install New Touchpad**: Align, connect cable, secure with screws/adhesive.
6. **Reassemble and Test**: Power on, test cursor, gestures, buttons in OS/tester.

## Post-Replacement Checklist
- Cursor moves smoothly.
- Gestures/buttons functional.
- Ribbon cable seated.
- No erratic behavior.
- Cover reattached securely.

## Tips and Best Practices
Check model-specific guides, test before full reassembly, clean surface before replacement, note integrated touchpad/keyboard assemblies.

## Summary
Touchpad troubleshooting and replacement require careful diagnosis and precise installation. Learners will restore navigation functionality, ensuring reliable repairs.
        `
      }
    },
    {
      id: 26,
      title: 'Quiz: Display, Keyboard, and Touchpad Repairs',
      duration: '20 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is a key difference between LCD and LED laptop screens?',
            options: ['LCDs use LED backlighting', 'LEDs require inverter boards', 'LCDs use CCFL backlighting and need an inverter', 'LED screens are thicker and heavier'],
            correct: 2,
            explanation: 'LCD screens use CCFL (Cold Cathode Fluorescent Lamp) backlighting and require an inverter board, while LED screens use LED backlighting without an inverter.'
          },
          {
            question: 'Which of the following display types offers the widest viewing angles and best color accuracy?',
            options: ['LED', 'IPS', 'LCD', 'CCFL'],
            correct: 1,
            explanation: 'IPS (In-Plane Switching) displays offer the widest viewing angles and best color accuracy compared to other panel types.'
          },
          {
            question: 'What is the purpose of an inverter board in a laptop?',
            options: ['To improve resolution', 'To power USB ports', 'To convert DC to AC for CCFL backlights', 'To regulate GPU temperature'],
            correct: 2,
            explanation: 'An inverter board converts DC power to AC power to drive CCFL (Cold Cathode Fluorescent Lamp) backlights in older LCD screens.'
          },
          {
            question: 'If a laptop display shows a very faint image but is not backlit, what is the most likely cause?',
            options: ['Faulty GPU', 'Loose ribbon cable', 'Dead pixels', 'Backlight or inverter failure'],
            correct: 3,
            explanation: 'A faint image without backlight typically indicates a backlight failure (LED) or inverter failure (CCFL).'
          },
          {
            question: 'Which resolution is considered Full HD (FHD)?',
            options: ['1280×720', '1366×768', '1920×1080', '3840×2160'],
            correct: 2,
            explanation: '1920×1080 is considered Full HD (FHD) resolution.'
          },
          {
            question: 'What should you always do before replacing a laptop screen?',
            options: ['Install the new driver software', 'Run BIOS update', 'Disconnect battery and drain residual power', 'Format the hard drive'],
            correct: 2,
            explanation: 'Always disconnect the battery and drain residual power to prevent electrical damage during screen replacement.'
          },
          {
            question: 'A laptop shows a black screen, but an external monitor works fine. What is likely faulty?',
            options: ['The graphics card', 'The keyboard', 'The display panel or internal cable', 'The CPU'],
            correct: 2,
            explanation: 'If an external monitor works but the laptop screen doesn\'t, the issue is likely with the display panel or internal display cable.'
          },
          {
            question: 'What type of connector is most common in modern laptop screens?',
            options: ['LVDS', 'CCFL', 'eDP', 'VGA'],
            correct: 2,
            explanation: 'eDP (embedded DisplayPort) is the most common connector type in modern laptop screens.'
          },
          {
            question: 'During screen replacement, what mistake can cause display flickering or no image?',
            options: ['Using a microfiber cloth', 'Not grounding yourself', 'Forcing connector backward', 'Replacing screws out of order'],
            correct: 2,
            explanation: 'Forcing the display connector backward can damage the pins and cause flickering or no image.'
          },
          {
            question: 'Which of the following issues is most likely caused by a loose display cable?',
            options: ['GPU crash', 'Flickering screen when opening/closing the lid', 'Fan noise', 'Battery not charging'],
            correct: 1,
            explanation: 'A loose display cable can cause flickering when the screen is moved or the lid is opened/closed.'
          }
        ]
      }
    }
  ]
};

export default certifiedComputerRepairModule6; 