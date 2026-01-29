import { Module } from '@/types/course';

export const module2ToolsAndEquipment: Module = {
  id: 2,
  title: 'Module 2: Tools and Equipment',
  description: 'Essential repair tools and diagnostic equipment for professional smartphone repair',
  lessons: [
    {
      id: 7,
      title: 'Essential Repair Tools',
      type: 'video',
      duration: '25 minutes',
      content: {
        videoUrl: '_7xtqBH7-M0',
        textContent: `## 🔧 Essential Repair Tools

### [https://youtu.be/_7xtqBH7-M0?si=qA3qSAr2gUXq7agr](https://youtu.be/_7xtqBH7-M0?si=qA3qSAr2gUXq7agr)

### 🪛 Screwdrivers
Screwdrivers are the cornerstone of smartphone repair, used to disassemble and reassemble devices by removing and securing tiny, specialized screws. Smartphones employ a variety of screw types, including **Phillips** (#00, #000 for precision work), **Pentalobe** (P2, P5, common in Apple devices), **Torx** (T3, T5, T6, used in Android devices), and occasionally **Tri-point** (Y000, Y0 for specific Apple components). A high-quality precision screwdriver set with ergonomic handles and hardened tips is essential to prevent stripping screws, which can damage frames or motherboards. **Magnetic tips** aid in handling small screws but must be used cautiously near magnetic sensors like compasses or gyroscopes to avoid interference. Technicians should invest in a versatile set with interchangeable bits to accommodate different screw types across brands like Apple, Samsung, or Xiaomi. During repairs, screws must be organized using magnetic mats or labeled trays to track their placement, as mismatched screws can misalign components or puncture delicate circuits. For example, using a longer screw in the wrong position can damage a motherboard’s traces. Regular maintenance, such as cleaning tips and storing in a dry environment to prevent rust, extends tool life. Mastering screwdriver use involves applying consistent pressure, aligning the tool precisely, and avoiding over-tightening, which ensures efficient repairs and protects device integrity, enhancing customer satisfaction and professional reputation.

### 🔨 Spudgers
Spudgers are non-conductive, ESD-safe tools designed to pry open smartphone casings, disconnect flex cables, and lift components like screens or batteries without causing damage. Available in materials like **plastic**, **nylon**, or **fiberglass**, spudgers vary in rigidity and shape—flat for broad prying, pointed for tight spaces, or hooked for accessing connectors. Unlike metal tools, spudgers minimize risks of scratches, short circuits, or punctures to delicate parts like display assemblies or logic boards. For instance, when removing an iPhone screen, a spudger is used to gently separate the adhesive at the edges, starting from designated notches to avoid cracking the glass. Technicians must apply controlled force and work slowly to prevent bending frames or tearing flex cables, especially in devices with heavy adhesive for waterproofing. Spudgers are also used to disconnect ribbon cables or battery connectors by gently lifting at the base, avoiding damage to fragile pins. Regular cleaning with isopropyl alcohol removes adhesive residue, ensuring the tool remains effective. A well-stocked toolkit includes multiple spudger types for versatility across devices like Samsung Galaxy or Google Pixel models. Proficiency with spudgers enhances repair precision, reduces component damage, and ensures a professional workflow, making them indispensable for both beginners and seasoned technicians.

### ✂️ Tweezers
Tweezers are critical for handling small, delicate components in smartphone repair, such as screws, connectors, SIM card trays, or motherboard ICs. **ESD-safe tweezers**—made from materials like stainless steel with anti-static coatings—are essential to prevent electrostatic discharge that could damage sensitive circuits. Available in **straight**, **curved**, or **angled** tips, tweezers cater to specific tasks: fine-point tips for precise work like placing tiny screws, and angled tips for accessing cramped areas like charging port connectors. For example, when repairing a Huawei device, curved tweezers can help maneuver around tightly packed components. A steady hand and firm grip are crucial to avoid dropping parts, which could dislodge other components or cause shorts. Technicians should avoid using excessive force, as this can bend or break fragile parts like flex cables. Regular maintenance involves cleaning tips with alcohol to remove debris and storing them in protective cases to preserve sharpness. Investing in high-quality tweezers from brands like iFixit or Jakemy ensures durability and precision. By mastering tweezers, technicians achieve greater control over intricate repairs, enhancing efficiency and reducing errors, which builds trust and reliability in their work.

### 🔥 Heat Guns
Heat guns are vital for softening adhesives that secure smartphone screens, back covers, batteries, and other components, particularly in modern waterproof devices like iPhones or Samsung Galaxy models. Operating at **100°C–300°C**, heat guns require adjustable temperature and airflow settings to suit different repair tasks. For example, a low setting (around 150°C) is ideal for loosening screen adhesive, while higher settings (up to 250°C) may be needed for stubborn battery glue. Proper technique involves holding the heat gun 3–5 inches from the surface and moving it in circular or sweeping motions to distribute heat evenly, preventing damage like warped plastic, discolored displays, or melted cables. Overheating is a common mistake—technicians must monitor component responses and limit exposure to 20–30 seconds per area. A **hot plate** can be an alternative for precise, localized heating. Safety precautions include wearing heat-resistant gloves, working in a ventilated area, and never leaving the heat gun unattended. Regular maintenance, such as cleaning the nozzle and storing it after cooling, ensures longevity. Mastering heat gun use allows technicians to perform clean, damage-free component removals, improving repair outcomes and maintaining device functionality for customers.`
      }
    },
    {
      id: 8,
      title: 'Testing and Diagnostic Equipment',
      type: 'video',
      duration: '30 minutes',
      content: {
        videoUrl: 'A7uQALjl6WE',
        textContent: `## 🔍 Testing and Diagnostic Equipment

[https://youtu.be/A7uQALjl6WE?si=OBsC70T3sEQJHh9-](https://youtu.be/A7uQALjl6WE?si=OBsC70T3sEQJHh9-)

### 📏 Multimeters
Digital multimeters (DMMs) are indispensable for diagnosing electrical issues in smartphone repair, measuring parameters like **voltage**, **current**, **resistance**, **continuity**, and **diode function**. They are used to test battery health (e.g., confirming 3.7–4.2V for lithium-ion batteries), detect short circuits on motherboards, verify charging port functionality, or check component integrity like fuses or capacitors. For instance, if a device fails to power on, a multimeter in continuity mode can identify a broken trace or shorted power IC by testing connections across the board. **ESD-safe probes** are critical to avoid damaging sensitive circuits, and technicians must calibrate the multimeter regularly for accuracy. Auto-ranging multimeters simplify use for beginners, while manual-ranging models offer precision for advanced diagnostics. When probing, technicians should use light, precise touches to avoid slipping and shorting adjacent pins. Multimeters are also useful for testing cable continuity or verifying USB charger output. Investing in a reliable model from brands like Fluke or Uni-T ensures durability and accuracy. Proficiency with multimeters enables technicians to move beyond guesswork, pinpointing issues with precision and enhancing repair success rates, which builds credibility and customer trust.

### ⚡ Power Supply Testers
Power supply testers, or DC power supplies with integrated ammeter and voltmeter displays, are advanced diagnostic tools that simulate battery input to test motherboard functionality. By connecting to the battery terminals, they deliver controlled voltage (typically 3.7–4.2V for smartphones) and monitor current draw to diagnose issues like short circuits, dead CPUs, or faulty power management ICs (PMICs). For example, a normal boot sequence might show a brief current spike (0.5–1A) followed by a steady draw (0.1–0.3A), while a short circuit causes an immediate high draw (>2A), and no draw indicates a dead board. These testers are critical for troubleshooting devices that fail to power on, even with a known-good battery. Adjustable voltage and current limits prevent damage during testing, and digital displays provide real-time feedback. Technicians must ensure proper polarity and secure connections to avoid false readings or board damage. Models with short-circuit protection and USB output testing add versatility. Regular calibration and maintenance, such as checking probe integrity, ensure reliability. Mastery of power supply testers allows technicians to perform board-level diagnostics with confidence, reducing unnecessary part replacements and improving repair efficiency.`
      }
    },
    {
      id: 9,
      title: 'Workspace Organization',
      type: 'video',
      duration: '20 minutes',
      content: {
        videoUrl: 'jXNmHyfZ1Yk',
        textContent: `## 🧹 Tips for Maintaining a Well-Organized Workspace

[https://youtu.be/jXNmHyfZ1Yk?si=u76Q2ZxYcyxXAk9E](https://youtu.be/jXNmHyfZ1Yk?si=u76Q2ZxYcyxXAk9E)
A well-organized workspace is a hallmark of professional smartphone repair, boosting efficiency, safety, and customer confidence. A sturdy workbench with an **ESD-safe mat** protects components from electrostatic discharge, while **bright LED lighting** (5000K–6500K) minimizes eye strain and illuminates tiny parts. **Tool organization** is critical—precision screwdrivers, spudgers, tweezers, and probes should be stored in magnetic holders, pegboards, or labeled drawers for quick access. Returning tools to their designated spots after use prevents clutter and saves time. **Component management** involves using magnetic mats or compartmentalized trays to sort screws, connectors, and small parts by device section, preventing mix-ups during reassembly. **Cable management** with ties, clips, or coiled sleeves keeps cords from soldering irons, power supplies, or USB testers tidy, reducing hazards. **Cleanliness** is vital—daily cleaning with microfiber cloths, compressed air, and isopropyl alcohol removes dust and adhesive residue, preventing contamination of device interiors. Chemicals like flux or alcohol must be stored in labeled, sealed containers away from heat. **Labeling and documentation** via repair tickets or digital systems track customer devices, issues, and progress, ensuring clarity in busy shops. **Workflow zones**—dedicated areas for disassembly, diagnostics, soldering, and testing—streamline processes and prevent cross-contamination. Digital organization, with structured folders for firmware, guides, and invoices, enhances software tasks. Regular audits to optimize tool placement or upgrade storage improve ergonomics and efficiency, fostering a professional environment that enhances repair quality and customer trust.`
      }
    },
    {
      id: 11,
      title: 'Cable Management',
      type: 'video',
      duration: '15 minutes',
      content: {
        videoUrl: '_7xtqBH7-M0',
        textContent: `# Cable Management
        
## Best Practices for Cable Organization

Cable management is a crucial aspect of maintaining a professional and efficient workspace. Proper cable organization not only improves the aesthetics of your workstation but also enhances safety, reduces troubleshooting time, and minimizes the risk of equipment damage.

### Why Cable Management Matters:
- **Safety**: Prevents tripping hazards and electrical risks
- **Efficiency**: Easier to locate and access equipment
- **Professionalism**: Creates a clean, organized appearance
- **Equipment Protection**: Reduces wear on cables and connectors
- **Maintenance**: Simplifies cleaning and equipment access

### Essential Cable Management Tools:
- **Cable ties and clips** - Secure loose cables
- **Coiled sleeves** - Bundle multiple wires
- **Cable channels** - Route cables along surfaces
- **Adhesive hooks** - Wall or desk mounting
- **Cable management trays** - Under-desk organization

### Best Practices:
1. Plan your cable routes before installation
2. Keep power and data cables separated
3. Use appropriate length cables to minimize excess
4. Label cables for easy identification
5. Maintain accessibility for future changes
6. Regular maintenance and updates as needed

Implementing proper cable management creates a safer, more professional workspace that enhances productivity and equipment longevity.`
      }
    },
    {
      id: 10,
      title: 'Module 2 Quiz: Tools and Equipment',
      type: 'quiz',
      duration: '20 minutes',
      content: {
        questions: [
          {
            question: 'Which tool is most commonly used to remove or tighten small screws in smartphones?',
            options: [
              'Heat gun',
              'Soldering iron',
              'Precision screwdriver',
              'Multimeter'
            ],
            correct: 2,
            explanation: 'Precision screwdrivers are specifically designed for the small screws found in smartphones and are the most commonly used tool for this purpose.'
          },
          {
            question: 'What is the purpose of a spudger in phone repair?',
            options: [
              'Test circuits',
              'Remove adhesive',
              'Measure voltage',
              'Pry open phone components safely'
            ],
            correct: 3,
            explanation: 'Spudgers are non-metal tools designed to safely pry open devices and disconnect components without causing scratches or short circuits.'
          },
          {
            question: 'Which tool is used to apply heat to loosen glue or adhesive in smartphones?',
            options: [
              'Tweezers',
              'Heat gun',
              'Screwdriver',
              'Magnifying glass'
            ],
            correct: 1,
            explanation: 'Heat guns are specifically designed to apply controlled heat to soften adhesives used in smartphone assembly.'
          },
          {
            question: 'What is the primary use of tweezers in phone repair?',
            options: [
              'Unscrew panels',
              'Cut wires',
              'Handle small, delicate components',
              'Apply thermal paste'
            ],
            correct: 2,
            explanation: 'Tweezers are precision tools used for handling small screws, components, and connectors in compact smartphone interiors.'
          },
          {
            question: 'A multimeter is used to:',
            options: [
              'Charge the battery',
              'View microscopic components',
              'Measure electrical values like voltage and continuity',
              'Store screws'
            ],
            correct: 2,
            explanation: 'Multimeters are diagnostic tools that measure electrical parameters such as voltage, current, resistance, and continuity.'
          },
          {
            question: 'What diagnostic tool helps identify physical damage to small circuits and solder joints?',
            options: [
              'Soldering iron',
              'Heat gun',
              'Microscope',
              'Power adapter'
            ],
            correct: 2,
            explanation: 'Microscopes provide the magnification needed to inspect tiny components, solder joints, and identify physical damage not visible to the naked eye.'
          },
          {
            question: 'Why is an organized workspace important in cell phone repair?',
            options: [
              'Helps impress customers',
              'Makes tools easier to sell',
              'Reduces mistakes and improves efficiency',
              'Increases heat in the room'
            ],
            correct: 2,
            explanation: 'An organized workspace directly impacts repair quality, reduces errors, prevents lost parts, and improves overall efficiency and professionalism.'
          },
          {
            question: 'True or False: A power supply tester helps check if a phone battery or charging circuit is working.',
            options: [
              'True',
              'False'
            ],
            correct: 0,
            explanation: 'Power supply testers can simulate battery power and help diagnose charging circuits and power-related issues.'
          },
          {
            question: 'True or False: You should always use your fingers instead of tweezers when handling internal parts.',
            options: [
              'True',
              'False'
            ],
            correct: 1,
            explanation: 'Tweezers should be used for handling small internal parts to avoid dropping components and to maintain precision and safety.'
          },
          {
            question: 'True or False: All screwdrivers are safe for use on any phone model.',
            options: [
              'True',
              'False'
            ],
            correct: 1,
            explanation: 'Different phone models use different screw types (Phillips, Pentalobe, Tri-point, Torx), requiring specific screwdriver types for each.'
          },
          {
            question: 'True or False: Microscopes are only used for reading serial numbers.',
            options: [
              'True',
              'False'
            ],
            correct: 1,
            explanation: 'Microscopes are used for many purposes including inspecting solder joints, identifying damage, aligning components, and board-level repairs.'
          },
          {
            question: 'True or False: A clean, static-free work area protects delicate electronic parts.',
            options: [
              'True',
              'False'
            ],
            correct: 0,
            explanation: 'ESD-safe, clean workspaces are essential to prevent static discharge and contamination that can damage sensitive electronic components.'
          },
          {
            question: 'True or False: You should unplug and power off a device before using diagnostic tools.',
            options: [
              'True',
              'False'
            ],
            correct: 0,
            explanation: 'Safety protocols require powering off and disconnecting devices before using most diagnostic tools to prevent damage and ensure safety.'
          },
          {
            question: 'True or False: A heat gun can damage internal components if not used carefully.',
            options: [
              'True',
              'False'
            ],
            correct: 0,
            explanation: 'Heat guns can warp plastic, discolor screens, or damage internal parts if overheated or used incorrectly, requiring careful technique.'
          },
          {
            question: 'True or False: Tools like magnetic mats and labeled trays can help keep small parts organized.',
            options: [
              'True',
              'False'
            ],
            correct: 0,
            explanation: 'Magnetic mats and labeled trays are essential organizational tools that prevent loss of small components and maintain order during repairs.'
          }
        ]
      }
    }
  ]
};