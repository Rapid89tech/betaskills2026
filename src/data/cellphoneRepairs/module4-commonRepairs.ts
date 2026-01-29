
import type { Module } from '@/types/course';

export const module4CommonRepairs: Module = {
  id: 4,
  title: 'Common Repairs',
  description: 'Master essential smartphone repair techniques including screen diagnosis, safe removal procedures, and proper installation methods.',
  lessons: [
    {
      id: 16,
      title: 'Diagnosing Screen Issues',
      duration: '25 min',
      type: 'video',
      content: {
        videoUrl: '7dZwru1ujgo',
        textContent: `## 🔍 Diagnosing Screen Issues: Cracks, Unresponsive Touch, and More

[https://youtu.be/mTT8UgpbnOg?si=kBAy0oHU_wdJd9L7](https://youtu.be/mTT8UgpbnOg?si=kBAy0oHU_wdJd9L7)
**Diagnosing screen issues** is a foundational skill for smartphone repair technicians, as screens are the primary user interface and highly susceptible to damage due to their exposed position. Accurate diagnosis minimizes unnecessary part replacements, reduces repair costs, and enhances customer trust by ensuring precise solutions. A **screen assembly** integrates multiple layers: the **protective glass** (e.g., Corning Gorilla Glass Victus on Samsung Galaxy S23 or iPhone 14, designed for scratch and drop resistance), the **digitizer** (a capacitive layer detecting touch input, enabling gestures like swiping or pinching), and the **display panel** (LCD for budget devices like Motorola Moto G series or OLED/AMOLED for flagships like Google Pixel 8, rendering visuals). These layers are often laminated, meaning damage to one (e.g., cracked glass) typically requires replacing the entire assembly, especially in high-end devices where separating layers risks further damage.

**Cracked screens** show visible fractures, ranging from hairline cracks to spiderweb patterns, often resulting from drops or impacts (e.g., an iPhone 13 dropped face-down, showing cracks but retaining touch functionality). Diagnosis involves inspecting for glass shards, impact points, or compromised waterproof seals. Even if touch works, cracked screens risk worsening damage, as glass particles can infiltrate internals or impair digitizer performance. Recommend replacement to prevent user injury or further deterioration.

**Unresponsive touch/dead zones** occur when the screen fails to register touch entirely or in specific areas (e.g., a Samsung Galaxy A54 with an unresponsive bottom third after a drop). Causes include digitizer damage, loose flex cables, water exposure, or motherboard faults. Use diagnostic apps like **Touch Screen Test** (Android) or **Apple Configurator** (iOS) to map touch response, creating visual grids to identify dead zones. Boot in safe mode or perform a soft reset to rule out software glitches (e.g., an Android 14 bug causing touch lag). If software is not the issue, inspect flex cables or test with a replacement screen.

**Flickering/no display** manifests as a black screen, intermittent flickering, or distorted colors/lines (e.g., a Google Pixel 7 with a black screen but audible notifications). Causes include LCD/OLED failure, loose display connectors, or motherboard power delivery issues. Shine a flashlight at an angle to check for faint backlight activity, indicating a display fault. Connect a known-good screen to isolate the issue or use a multimeter to test connector voltages (e.g., 1.8V or 3.3V for display lines). If the screen remains blank, motherboard diagnostics may be needed.

**Ghost touch** occurs when the screen registers inputs without user interaction, such as random scrolling or typing (e.g., a Xiaomi 14 scrolling during calls). Causes include a faulty digitizer, static buildup, moisture under the glass, or software conflicts. Clean the screen with isopropyl alcohol, remove screen protectors, and test in safe mode to eliminate software causes. If persistent, replace the screen or check for moisture corrosion on connectors. For example, a water-exposed iPhone 12 exhibited ghost touch until the digitizer was replaced.

The **diagnostic process** is methodical to ensure accuracy:

1. **Visual inspection**: Examine the screen under a magnifying lamp for cracks, discoloration, dead pixels, or lifted edges. Check for signs of water damage (e.g., corrosion on flex cables) or battery swelling pressing against the screen (e.g., an iPhone SE 2020 with a lifted display).
2. **Power cycling**: Restart the device to rule out temporary software glitches. For non-booting devices, connect to a charger or computer to check for boot signals (e.g., iTunes detecting an iPhone in DFU mode).
3. **Diagnostic tools/apps**: Use apps like **Device Info HW** (Android) or built-in iOS diagnostics via Recovery Mode to test touch and display functionality. Multimeters measure voltage/continuity at screen connectors, while test screens confirm if the issue is screen-specific.
4. **Flex cable checks**: Power off, open the device, and inspect digitizer/display cables for tears, bends, or looseness. Reseat connectors gently using tweezers (e.g., reseating a loose cable on a Samsung S22 fixed flickering).
5. **Test screen swaps**: Temporarily connect a known-good screen to isolate faults. If the replacement works, the original screen is defective; if not, investigate motherboard or software issues (e.g., a Pixel 6 with no display required motherboard repair after a test screen failed).

**Key considerations** include:  
Removing screen protectors, as they can interfere with touch sensitivity (e.g., a thick tempered glass on a OnePlus 11 causing lag).  
Checking for **battery swelling**, which can lift screens or disrupt touch (e.g., a swollen battery in a Huawei P40).  
Assessing **moisture exposure**, as corrosion may not be immediately visible but can degrade connectors over time.  
Evaluating **software issues**, as updates or bugs (e.g., iOS 17 touch glitches) can mimic hardware faults—factory reset or safe mode testing helps.

**Tools** for diagnosis include multimeters (for electrical tests), magnifying lamps (for physical inspection), test screens (to isolate faults), plastic pry tools (for safe access), and diagnostic software. For example, diagnosing a Galaxy S23 with dead zones involved using Touch Screen Test to confirm digitizer failure, followed by a successful screen replacement. Mastering screen diagnosis ensures efficient, cost-effective repairs and builds a technician’s reputation for reliability.
`
      }
    },
    {
      id: 17,
      title: 'Advanced Diagnostic Techniques',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: 'mTT8UgpbnOg',
        textContent: `## Advanced Diagnostic Techniques

[https://youtu.be/mTT8UgpbnOg?si=kBAy0oHU_wdJd9L7](https://youtu.be/mTT8UgpbnOg?si=kBAy0oHU_wdJd9L7)

Effective diagnostics are crucial for successful smartphone repairs. This lesson covers advanced techniques for identifying hardware and software issues quickly and accurately.

### Diagnostic Process:
1. **Initial Assessment** - Customer complaint analysis
2. **Visual Inspection** - External damage assessment
3. **Functional Testing** - Basic operation verification
4. **Advanced Testing** - Component-level diagnostics

### Tools and Methods:
- **Multimeter Testing** - Voltage, continuity, resistance
- **Power Supply Analysis** - Current draw patterns
- **Thermal Imaging** - Heat pattern identification
- **Oscilloscope** - Signal analysis (advanced)

### Common Diagnostic Patterns:
- **Boot Loop** - Usually firmware or power management
- **No Power** - Battery, charging circuit, or power IC
- **Random Shutdowns** - Overheating or battery degradation
- **Signal Issues** - Antenna or baseband problems

Proper diagnosis saves time and ensures accurate repairs.`
      }
    },
    {
      id: 18,
      title: 'Safe Screen Removal Procedures',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: 'E0qAowF0MK4',
        textContent: `## Safe Screen Removal Procedures

(https://youtu.be/E0qAowF0MK4?si=kBAy0oHU_wdJd9L7)

Screen removal is one of the most common repair procedures but requires careful technique to avoid damaging the device or injuring yourself.

### Pre-Removal Preparation:
1. **Power Down** - Always disconnect battery first
2. **Tool Selection** - Heat gun, spudgers, suction cups
3. **Workspace Setup** - Clean, well-lit area
4. **Safety Gear** - Safety glasses, cut-resistant gloves

### Removal Techniques:
- **Heat Application** - Soften adhesive gradually
- **Separation Tools** - Use appropriate prying tools
- **Cable Management** - Carefully disconnect flex cables
- **Component Protection** - Avoid stress on fragile parts

### Common Mistakes to Avoid:
- Excessive heat application
- Forcing stubborn adhesive
- Improper tool selection
- Rushing the process
- Ignoring safety protocols

### Brand-Specific Considerations:
- **iPhone** - Pentalobe screws, strong adhesive
- **Samsung** - Curved displays require extra care
- **Android Variants** - Different clip and screw systems

Mastering safe removal prevents costly mistakes and ensures successful repairs.`
      }
    },
    {
      id: 19,
      title: 'Safe Screen Removal Techniques',
      duration: '30 min',
      type: 'video',
      content: {
        videoUrl: '',
        textContent: `## Safe Screen Removal Procedures

[https://youtu.be/E0qAowF0MK4?si=kBAy0oHU_wdJd9L7](https://youtu.be/E0qAowF0MK4?si=kBAy0oHU_wdJd9L7)

**Course Objective:** By the end of this lesson, students will be able to identify the tools, safety precautions, and step-by-step process required to safely remove a broken screen from a smartphone without causing further damage to internal components.

🔹 **1. Introduction: Why Safe Screen Removal Matters**

Removing a broken screen is one of the most common and delicate tasks in phone repair. The process requires precision, patience, and the correct tools. Improper removal can damage flex cables, connectors, the frame, or internal components like the motherboard. Whether the screen is cracked, shattered, or unresponsive, following proper removal techniques ensures successful replacement and preserves the device's integrity.

🔹 **2. Tools Required for Safe Screen Removal**

| Tool | Purpose |
|------|---------|
| Heat Gun/Heating Pad | Softens the adhesive that holds the screen in place |
| Plastic Pry Tools/Spudgers | Lifts screen without damaging internal parts |
| Suction Cup Tool | Helps separate the screen from the frame |
| Precision Screwdrivers | Opens screws (typically Philips #000 or Torx) |
| Tweezers | Handles tiny components and connectors |
| ESD Mat & Wrist Strap | Prevents electrostatic discharge |
| Plastic Cards/Shim Tools | Slide under the screen to break adhesive |
| Magnifying Lamp (optional) | Enhances visibility for intricate parts |

🔹 **3. Safety Precautions Before Starting**

- Power off the device completely
- Disconnect the battery first to prevent short circuits
- Use an anti-static mat and wrist strap to prevent electrostatic damage
- Work in a clean, dust-free, and organized workspace
- Do not use metal tools directly under the screen to avoid shorting or breaking components
- Be cautious of broken glass splinters—consider wearing safety glasses

🔹 **4. Preparation: Assess the Device**

Before proceeding with removal, assess:

**Type of screen (LCD or OLED):** OLEDs are more fragile and require extra care.

**Device construction:** Is it a unibody device? Does the screen come off from the front or the back?

**Level of damage:** If glass is shattered, applying packing tape or plastic film over the screen helps prevent shards from scattering.

**Screen bonding:** Some screens are fused (glass + digitizer + LCD), and removing just the glass is not feasible for beginners.

🔹 **5. Step-by-Step Screen Removal Process**

🔸 Step 1: Remove Back Cover & Screws
- Use a screwdriver to remove all visible screws from the back housing or midframe
- For unibody phones, gently heat and pry open the back panel if necessary

🔸 Step 2: Disconnect Battery
- Open the device housing and locate the battery connector
- Use a plastic spudger to safely disconnect the battery to avoid power flow during disassembly

🔸 Step 3: Heat the Edges of the Screen
- Use a heat gun or heating pad at 80–100°C (176–212°F) to soften adhesive
- Evenly heat around the screen edges for 1–2 minutes

🔸 Step 4: Use Suction Cup and Pry Tool
- Attach the suction cup near the screen's edge to lift a small gap
- Insert a plastic pick or card into the gap and begin sliding along the edge
- Continue slowly and carefully—do not force it

🔸 Step 5: Detach the Screen Connectors
- Once the screen is free, carefully lift it without pulling too hard
- Locate the screen flex cable connectors (usually shielded or taped)
- Disconnect the LCD and digitizer connectors using tweezers or spudgers

🔸 Step 6: Clean Remaining Adhesive
- After removal, clean the frame or chassis with isopropyl alcohol to remove leftover glue
- Be gentle to avoid bending the frame

🔹 **6. Tips for Difficult Removals**

- If the screen is badly shattered and suction doesn't work, use tape over the screen before lifting
- For OLED screens, apply less heat and use thinner pry tools to reduce risk of burn marks
- If the screen is fused, it's safer to replace the full assembly rather than attempt separating layers

🔹 **7. Final Inspection**

After the screen is removed:
- Inspect the motherboard and connectors for any damage or corrosion
- Ensure the flex cables and frame clips are intact
- Prepare the device for screen replacement or further diagnostics

🔹 **8. Common Mistakes to Avoid**

- **Applying too much heat** – can damage internal components
- **Using metal tools under the screen** – can scratch or short circuits
- **Forcing a cracked screen** – may damage the housing or break internals
- **Skipping battery disconnection** – can cause power surge and damage

## Conclusion

Screen removal is one of the most vital skills in smartphone repair. It combines technique, patience, and the right tools. With proper training and precautions, even severely damaged screens can be removed safely, preserving the device for quality repair and replacement.
`
      }
    },
    {
      id: 20,
      title: 'Display Installation Best Practices',
      duration: '35 min',
      type: 'video',
      content: {
        videoUrl: '',
        textContent: `## Proper Display Installation for Long-Lasting Performance

[https://youtu.be/-8muMM9KUX4?si=4eVz6KN-CoQxlHPo](https://youtu.be/-8muMM9KUX4?si=4eVz6KN-CoQxlHPo)

**Why Proper Installation Matters**

Replacing a display is more than just plugging in a new screen. A poorly installed display can cause:
- Touch sensitivity issues
- Gaps in the frame
- Loose connections
- Dust infiltration
- Premature failure

Proper installation is essential to restore full functionality, protect the internal components, and ensure customer satisfaction.

🔹 **2. Tools & Materials Needed**

| Tool | Purpose |
|------|---------|
| Replacement Screen (LCD/OLED Assembly) | New display part specific to device model |
| Heat Gun/Heating Pad | Softens adhesives |
| Precision Screwdrivers | Reassemble frame and housing |
| Plastic Pry Tools & Spudgers | Handle components safely |
| Tweezers | Connect delicate flex cables |
| Adhesive Strips/Liquid Glue (LOCA, B-7000) | Secure screen in place |
| Isopropyl Alcohol (90%+) | Clean surfaces before installation |
| Suction Cup Tool | Positioning and lifting the display |
| Screen Clamp Kit or Rubber Bands | Apply pressure while adhesive cures |
| ESD Strap/Mat | Prevent electrostatic discharge |

🔹 **3. Pre-Installation Checklist**

Before installing the new display:
- **Verify compatibility:** Correct model, connector type, and size
- **Inspect the new screen** for cracks, dead pixels, or missing components
- **Test the screen before final installation** by connecting it while the device is open
- **Ensure the battery is disconnected** to avoid electrical damage
- **Clean the phone's frame** to remove dust, adhesive residue, or glass particles

🔹 **4. Step-by-Step Display Installation Process**

🔸 Step 1: Connect and Test Before Final Mounting
- Temporarily plug in the new screen's flex cables to the motherboard
- Power on the device and test:
  - Display brightness and clarity
  - Touch response across entire screen
  - No dead spots or flickering
- If the screen works correctly, proceed to mount it

🔸 Step 2: Prepare the Frame
- Remove any old glue, tape, or broken glass fragments
- Clean the frame and edges with isopropyl alcohol
- If the frame is bent or warped, use light pressure to straighten it

🔸 Step 3: Apply Adhesive or Tape
Choose between:
- **Pre-cut double-sided adhesive** for clean installs (e.g., 3M tape)
- **Liquid adhesive (B-7000)** for stronger bond (requires drying time)
- Apply evenly along the edges—avoid adhesive near internal components

🔸 Step 4: Seat the New Display
- Gently align the new screen with the frame and begin pressing it into place from one side to the other
- Make sure the screen flex cables are not pinched or bent during installation
- Once seated, connect all flex cables securely and reattach shields if required

🔸 Step 5: Secure and Let Adhesive Cure
- Use clamps, screen holders, or rubber bands to hold the screen firmly in place
- Allow 2–4 hours for adhesive to cure (24 hours for full strength)
- Avoid powering on the device until the adhesive has partially set

🔸 Step 6: Reassemble the Device
- Reinstall internal screws, battery connector, and back cover
- Power on the phone and test all functions again:
  - Display
  - Touch
  - Front camera alignment
  - Proximity sensor and earpiece
- If everything functions properly, the replacement is complete

🔹 **5. Best Practices for Long-Lasting Display Performance**

- **Avoid overtightening screws:** Can warp the screen or damage threads
- **Use OEM-quality screens:** Cheaper screens may not last
- **Avoid using fingers on adhesive:** Oil can affect bonding
- **Always test the screen before final gluing:** Prevents repeated disassembly
- **Let adhesives fully cure** before returning the phone to the customer

🔹 **6. Common Installation Mistakes to Avoid**

| Mistake | Consequence |
|---------|-------------|
| Not testing before installation | Time wasted if the screen is defective |
| Forgetting to disconnect the battery | Can cause a short circuit |
| Leaving dust between screen and frame | Leads to display issues or weak bonding |
| Misaligned screen | Affects look and function; may lift over time |
| Skipping adhesive curing time | Screen may fall off or allow dust entry |

🔹 **7. Post-Installation Quality Check**

Run the device through a functionality checklist:
✔ Screen clarity, brightness, and touch accuracy
✔ No ghost touches or flickering
✔ Camera and proximity sensor alignment
✔ Frame flush with screen, no gaps
✔ No flexing or movement when applying light pressure

Optionally, use diagnostic apps to check touch zones and sensor alignment.

🔹 **8. Practical Tips from Industry Technicians**

- Always keep extra adhesive and clamps on hand for emergency fixes
- Keep a log of screen replacements and test results for quality control
- If you're doing high-volume repair, consider a UV curing station for faster adhesive setup
- Store replacement screens in anti-static bags and away from heat or pressure

📺 **YOUTUBE: Mobile Repair Course Video For Beginners - https://youtu.be/-8muMM9KUX4?si=4eVz6KN-CoQxlHPo**

## Conclusion

Proper installation of a smartphone display is an essential skill that blends technical knowledge, tool proficiency, and precision. Following a careful process ensures high-quality repairs, improves customer satisfaction, and extends the life of the device.
`
      }
    },
    {
      id: 21,
      title: 'Module 4 Quiz: Common Repairs',
      duration: '15 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which component is most commonly replaced when a smartphone screen is cracked but still partially functional?',
            options: [
              'Battery',
              'LCD/Digitizer Assembly',
              'Motherboard',
              'Charging Port'
            ],
            correct: 1,
            explanation: 'When a screen is cracked but still functional, the LCD/Digitizer Assembly is typically replaced to restore full functionality and prevent further damage or injury from glass fragments.'
          },
          {
            question: 'What is the first step you should take before beginning any repair on a smartphone?',
            options: [
              'Remove the screen',
              'Power off the device and disconnect the battery',
              'Heat the device to loosen adhesives',
              'Test the charging port'
            ],
            correct: 1,
            explanation: 'Always power off the device and disconnect the battery first to prevent electrical damage, short circuits, and ensure safety during repair procedures.'
          },
          {
            question: 'If a phone does not turn on, which of the following is the most common hardware component to check first?',
            options: [
              'Speaker',
              'Battery',
              'Camera Module',
              'Screen Digitizer'
            ],
            correct: 1,
            explanation: 'The battery is the most common cause of power issues. A faulty, dead, or swollen battery is often the culprit when a phone won\'t turn on.'
          },
          {
            question: 'What tool is best suited to remove small screws from a smartphone?',
            options: [
              'Hammer',
              'Precision screwdriver',
              'Pliers',
              'Tweezers'
            ],
            correct: 1,
            explanation: 'Precision screwdrivers (typically Philips #000 or Torx) are specifically designed for the small screws found in smartphones and provide the correct fit and control.'
          },
          {
            question: 'What is the likely cause of a smartphone battery swelling?',
            options: [
              'Software update',
              'Overcharging or faulty battery',
              'Broken screen',
              'Dust in the charging port'
            ],
            correct: 1,
            explanation: 'Battery swelling is typically caused by overcharging, manufacturing defects, heat exposure, or natural battery degradation over time, leading to gas buildup inside the battery.'
          },
          {
            question: 'When replacing a charging port, what precaution is critical to avoid damage?',
            options: [
              'Removing the battery connector first',
              'Using excessive heat',
              'Shaking the device vigorously',
              'Using metal pry tools on the motherboard'
            ],
            correct: 0,
            explanation: 'Always disconnect the battery first to prevent electrical damage or short circuits when working on charging ports or any internal components.'
          },
          {
            question: 'Which common repair involves replacing a part that is glued or adhered to the phone\'s frame?',
            options: [
              'Battery replacement',
              'Screen replacement',
              'SIM card tray replacement',
              'Speaker replacement'
            ],
            correct: 1,
            explanation: 'Screen replacement involves dealing with strong adhesives that bond the display assembly to the phone\'s frame, requiring heat and careful removal techniques.'
          },
          {
            question: 'If a touchscreen has dead zones (areas that don\'t respond), what is the best initial diagnostic step?',
            options: [
              'Replace the battery',
              'Clean the screen with alcohol',
              'Test the digitizer connection and try a screen replacement',
              'Reset the phone to factory settings'
            ],
            correct: 2,
            explanation: 'Dead zones typically indicate digitizer problems. Testing connections and trying a replacement screen helps determine if the issue is hardware-related.'
          },
          {
            question: 'What is the safest way to open a smartphone without damaging the screen?',
            options: [
              'Use a heat gun to soften adhesive, then pry gently with plastic tools',
              'Use a hammer to break the screen and open it quickly',
              'Use metal screwdrivers to force the screen off',
              'Apply water around the edges to loosen glue'
            ],
            correct: 0,
            explanation: 'Heating softens adhesive making it easier to separate components, and plastic tools prevent damage to delicate internal parts and screens.'
          },
          {
            question: 'Why is it important to test all device functions before final reassembly?',
            options: [
              'To ensure all repairs were successful and avoid reopening the device',
              'To save battery power',
              'To check the color of the screen',
              'It is not necessary to test before reassembly'
            ],
            correct: 0,
            explanation: 'Testing before final assembly prevents having to reopen the device if issues are discovered, saving time and reducing the risk of additional damage.'
          }
        ]
      }
    }
  ]
};
